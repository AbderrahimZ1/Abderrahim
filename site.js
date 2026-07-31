(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  const backTop = document.querySelector('.back-top');

  const updateScrollState = () => {
    const top = window.scrollY || root.scrollTop;
    const max = Math.max(root.scrollHeight - window.innerHeight, 1);
    header?.classList.toggle('scrolled', top > 18);
    if (progress) progress.style.width = `${Math.min((top / max) * 100, 100)}%`;
    backTop?.classList.toggle('visible', top > 650);
    if (!reduceMotion) {
      const heroPhoto = document.querySelector('.hero-photo');
      if (heroPhoto && top < window.innerHeight * 1.2) {
        heroPhoto.style.setProperty('--hero-shift', `${Math.min(top * .055, 34)}px`);
      }
    }
  };
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav');
  const setMenu = open => {
    nav?.classList.toggle('open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    const label = menuButton?.querySelector('.sr-only');
    if (label) label.textContent = open ? 'Close navigation' : 'Open navigation';
    body.classList.toggle('locked', open);
  };
  menuButton?.addEventListener('click', event => {
    event.stopPropagation();
    setMenu(!nav?.classList.contains('open'));
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', event => {
    if (!event.target.closest('.header-inner')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) setMenu(false);
  }, { passive: true });

  const normalise = path => path.replace(/index\.html$/, '') || '/';
  const siteOrigin = location.origin && location.origin !== 'null' ? location.origin : 'https://azermane.com';
  const currentPath = normalise(location.pathname);
  document.querySelectorAll('.nav a').forEach(link => {
    const target = new URL(link.href, siteOrigin);
    if (target.origin === siteOrigin && !target.hash && normalise(target.pathname) === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });

  if (currentPath === '/') {
    const sectionLinks = [...document.querySelectorAll('.nav a[href^="#"], .nav a[href^="/#"]')]
      .map(link => ({ link, id: new URL(link.href, siteOrigin).hash.slice(1) }))
      .filter(item => item.id && document.getElementById(item.id));
    if ('IntersectionObserver' in window && sectionLinks.length) {
      const sectionObserver = new IntersectionObserver(entries => {
        const active = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!active) return;
        sectionLinks.forEach(({ link, id }) => {
          if (id === active.target.id) link.setAttribute('aria-current', 'location');
          else if (link.getAttribute('aria-current') === 'location') link.removeAttribute('aria-current');
        });
      }, { rootMargin: '-25% 0px -58% 0px', threshold: [0.05, .2, .45] });
      sectionLinks.forEach(({ id }) => sectionObserver.observe(document.getElementById(id)));
    }
  }

  const autoReveal = [
    '.page-hero-grid', '.section-heading', '.arc-step', '.method-band', '.paper-feature', '.paper-compact',
    '.project-slide', '.timeline article', '.journey-panel', '.insight-link', '.contact-grid', '.editorial-split',
    '.capability', '.supporting-item', '.publication-item', '.project-story', '.project-index article',
    '.paper-layout', '.photo-mosaic figure'
  ];
  document.querySelectorAll(autoReveal.join(',')).forEach((item, index) => {
    item.classList.add('reveal');
    if (!item.dataset.delay && index % 4) item.dataset.delay = String((index % 4) * 55);
  });
  const revealItems = document.querySelectorAll('.reveal');
  revealItems.forEach(item => item.style.setProperty('--delay', `${item.dataset.delay || 0}ms`));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('in-view'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .06, rootMargin: '0px 0px -20px' });
    revealItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.08 && rect.bottom > 0) item.classList.add('in-view');
      else revealObserver.observe(item);
    });
    window.addEventListener('load', () => {
      revealItems.forEach(item => {
        if (item.classList.contains('in-view')) return;
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.08 && rect.bottom > 0) {
          item.classList.add('in-view');
          revealObserver.unobserve(item);
        }
      });
    }, { once: true });
  }

  const counters = document.querySelectorAll('[data-count]');
  const format = value => new Intl.NumberFormat('en-US').format(value);
  const animateCounter = element => {
    const target = Number(element.dataset.count || 0);
    if (reduceMotion) { element.textContent = format(target); return; }
    const start = performance.now();
    const duration = 950;
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      element.textContent = format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && !reduceMotion) {
    const countObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    }), { threshold: .7 });
    counters.forEach(item => countObserver.observe(item));
  } else counters.forEach(animateCounter);

  document.querySelectorAll('[data-project-rail]').forEach(rail => {
    const wrapper = rail.closest('.project-rail-shell');
    const prev = wrapper?.querySelector('[data-rail-prev]');
    const next = wrapper?.querySelector('[data-rail-next]');
    const status = wrapper?.querySelector('[data-rail-status]');
    const slides = [...rail.querySelectorAll('.project-slide')];
    const updateRail = () => {
      if (!slides.length) return;
      const center = rail.scrollLeft + rail.clientWidth / 2;
      let active = 0;
      let distance = Infinity;
      slides.forEach((slide, index) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const d = Math.abs(slideCenter - center);
        if (d < distance) { distance = d; active = index; }
      });
      if (status) status.textContent = `${String(active + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      prev?.toggleAttribute('disabled', active === 0);
      next?.toggleAttribute('disabled', active === slides.length - 1);
    };
    const move = direction => {
      const amount = slides[0]?.offsetWidth + 22 || rail.clientWidth * .85;
      rail.scrollBy({ left: amount * direction, behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    prev?.addEventListener('click', () => move(-1));
    next?.addEventListener('click', () => move(1));
    rail.addEventListener('scroll', updateRail, { passive: true });
    updateRail();
  });

  const filterButtons = document.querySelectorAll('.pub-filter');
  const publications = document.querySelectorAll('.publication-item');
  filterButtons.forEach(button => {
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    button.addEventListener('click', () => {
      filterButtons.forEach(item => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      const filter = button.dataset.filter || 'all';
      publications.forEach(item => {
        const topics = (item.dataset.topic || '').split(' ');
        item.classList.toggle('hidden', filter !== 'all' && !topics.includes(filter));
      });
    });
  });

  const zoomable = document.querySelectorAll('.zoomable, .figure-wrap img, .paper-figure img, .supporting-item img');
  if (zoomable.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Expanded research figure');
    lightbox.innerHTML = '<figure><button type="button" aria-label="Close expanded figure">×</button><img alt=""><figcaption></figcaption></figure>';
    body.appendChild(lightbox);
    const image = lightbox.querySelector('img');
    const caption = lightbox.querySelector('figcaption');
    const close = lightbox.querySelector('button');
    let previousFocus = null;
    const closeBox = () => {
      lightbox.classList.remove('open');
      body.classList.remove('locked');
      image.removeAttribute('src');
      previousFocus?.focus();
    };
    const openBox = source => {
      setMenu(false);
      previousFocus = source;
      image.src = source.currentSrc || source.src;
      image.alt = source.alt;
      caption.textContent = source.dataset.caption || source.alt;
      lightbox.classList.add('open');
      body.classList.add('locked');
      close.focus();
    };
    zoomable.forEach(source => {
      source.classList.add('zoomable');
      source.tabIndex = 0;
      source.setAttribute('role', 'button');
      source.setAttribute('aria-label', `${source.alt}. Open larger view.`);
      source.addEventListener('click', () => openBox(source));
      source.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openBox(source);
        }
      });
    });
    close.addEventListener('click', closeBox);
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeBox(); });
    document.addEventListener('keydown', event => {
      if (!lightbox.classList.contains('open')) return;
      if (event.key === 'Escape') closeBox();
      if (event.key === 'Tab') { event.preventDefault(); close.focus(); }
    });
  }

  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
})();
