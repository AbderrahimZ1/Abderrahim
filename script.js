const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.primary-nav');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = !nav?.classList.contains('open');
  nav?.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

// Keep the homepage functional before the final photo library is copied from the
// previous portfolio. The GitHub portrait is public, stable and already associated
// with the same researcher identity.
const portrait = document.querySelector('.portrait-wrap img');
if (portrait) {
  portrait.src = 'https://avatars.githubusercontent.com/u/112680258?v=4';
  portrait.alt = 'Portrait of Dr Abderrahim Zermane, fire and process safety researcher';
}

// The user prefers a complete web profile rather than a downloadable CV.
const headerAction = document.querySelector('.header-cta');
if (headerAction) {
  headerAction.href = '/about.html';
  headerAction.textContent = 'About me';
}

document.querySelectorAll('a[href*="abderrahim-zermane-cv.pdf"]').forEach(link => {
  link.href = '/about.html';
  link.textContent = 'About';
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
  }, { threshold: 0.13 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('in-view'));
}

const filterButtons = document.querySelectorAll('.filter');
const publications = document.querySelectorAll('.publication-list article');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  publications.forEach(publication => {
    const topics = publication.dataset.topic?.split(' ') ?? [];
    publication.classList.toggle('hidden', filter !== 'all' && !topics.includes(filter));
  });
}));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
