const headers = document.querySelectorAll('.site-header, .content-header');
const updateHeader = () => headers.forEach(header => header.classList.toggle('scrolled', window.scrollY > 18));
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// Keep the branded favicon current without relying on a build pipeline.
const favicon = document.querySelector('link[rel="icon"]') ?? document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/png';
favicon.href = '/assets/logo.png?v=20260731';
if (!favicon.parentNode) document.head.appendChild(favicon);

const closeMenus = () => {
  document.querySelectorAll('.primary-nav.open, .content-nav.open').forEach(nav => nav.classList.remove('open'));
  document.querySelectorAll('.menu-button[aria-expanded="true"]').forEach(button => button.setAttribute('aria-expanded', 'false'));
  document.body.classList.remove('nav-open');
};

document.querySelectorAll('.menu-button').forEach(button => {
  const navId = button.getAttribute('aria-controls');
  const nav = navId ? document.getElementById(navId) : button.parentElement?.querySelector('.primary-nav, .content-nav');
  button.addEventListener('click', event => {
    event.stopPropagation();
    const open = !nav?.classList.contains('open');
    closeMenus();
    nav?.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenus));
});

document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner, .content-header .shell')) closeMenus();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenus();
});

const currentPath = window.location.pathname.replace(/index\.html$/, '');
document.querySelectorAll('.primary-nav a, .content-nav a').forEach(link => {
  const href = new URL(link.href, window.location.origin);
  const hrefPath = href.pathname.replace(/index\.html$/, '');
  const isCurrent = hrefPath !== '/' ? currentPath === hrefPath : currentPath === '/';
  if (isCurrent) link.setAttribute('aria-current', 'page');
});

const autoRevealSelectors = [
  '.page-hero > .shell',
  '.content-section > .shell',
  '.visual-paper',
  '.study-gallery article',
  '.publication',
  '.work',
  '.fact',
  '.topic',
  '.research-photo',
  '.project-lead-image'
];
document.querySelectorAll(autoRevealSelectors.join(',')).forEach((item, index) => {
  item.classList.add('reveal');
  if (!item.dataset.delay && index % 4) item.dataset.delay = String((index % 4) * 45);
});

const revealItems = document.querySelectorAll('.reveal');
revealItems.forEach(item => {
  if (item.dataset.delay) item.style.setProperty('--delay', `${item.dataset.delay}ms`);
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -24px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('in-view'));
}

const formatCount = value => new Intl.NumberFormat('en-US').format(value);
const countItems = document.querySelectorAll('[data-count]');
if (countItems.length) {
  const animateCount = element => {
    const target = Number(element.dataset.count || 0);
    const duration = 900;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = formatCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    }), { threshold: 0.6 });
    countItems.forEach(item => countObserver.observe(item));
  } else countItems.forEach(animateCount);
}

const filterButtons = document.querySelectorAll('.filter, .publication-filter');
const publications = document.querySelectorAll('.publication-list article, .publication-stack .publication');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter || 'all';
  publications.forEach(publication => {
    const topics = publication.dataset.topic?.split(' ') ?? [];
    publication.classList.toggle('hidden', filter !== 'all' && !topics.includes(filter));
  });
}));

const zoomImages = document.querySelectorAll('.flagship-media img, .visual-paper > img, .study-gallery img');
if (zoomImages.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Expanded research figure');
  lightbox.innerHTML = '<figure><button type="button" aria-label="Close expanded figure">×</button><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(lightbox);
  const expanded = lightbox.querySelector('img');
  const caption = lightbox.querySelector('figcaption');
  const closeButton = lightbox.querySelector('button');
  let previousFocus = null;
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.classList.remove('nav-open');
    previousFocus?.focus();
  };
  const openLightbox = image => {
    previousFocus = image;
    expanded.src = image.currentSrc || image.src;
    expanded.alt = image.alt;
    caption.textContent = image.alt;
    lightbox.classList.add('open');
    document.body.classList.add('nav-open');
    closeButton.focus();
  };
  zoomImages.forEach(image => {
    image.classList.add('image-zoom');
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `${image.alt}. Open larger view.`);
    image.addEventListener('click', () => openLightbox(image));
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });
  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}

document.querySelectorAll('#year, [data-year]').forEach(year => year.textContent = new Date().getFullYear());
