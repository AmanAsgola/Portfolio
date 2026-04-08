// ==========================================================
// THEME TOGGLE
// Theme is initialised before render via inline <script> in
// <head> to prevent flash. This just wires up the button.
// ==========================================================
document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ==========================================================
// FADE-IN ON SCROLL
// ==========================================================
function initFadeIn() {
  const elements = document.querySelectorAll('.fadein');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);

      // Animate language progress bars once visible
      if (entry.target.classList.contains('lang-card')) {
        const fill = entry.target.querySelector('.lang-fill');
        if (fill) fill.style.width = fill.style.getPropertyValue('--pct') || '0%';
      }
    });
  }, { threshold: 0.08 });

  elements.forEach(el => observer.observe(el));
}

// ==========================================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================================
function updateActiveNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main .section');
  const scroll   = window.scrollY + 100;

  for (let i = sections.length - 1; i >= 0; i--) {
    if (scroll >= sections[i].offsetTop) {
      navLinks.forEach(l => l.classList.remove('active'));
      document.querySelector(`.nav-link[href="#${sections[i].id}"]`)
        ?.classList.add('active');
      break;
    }
  }
}

// ==========================================================
// MOBILE MENU
// ==========================================================
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu  = document.getElementById('close-menu');

burger?.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

closeMenu?.addEventListener('click', closeMobileMenu);
mobileMenu?.addEventListener('click', e => {
  if (e.target.tagName === 'A' || e.target === mobileMenu) closeMobileMenu();
});

// ==========================================================
// BACK TO TOP + CIRCULAR SCROLL PROGRESS
// ==========================================================
const backToTop    = document.getElementById('back-to-top');
const progressFill = document.querySelector('.progress-fill');

// circumference = 2π × r = 2π × 17 ≈ 106.81
const CIRCUMFERENCE = 2 * Math.PI * 17;

function updateScrollProgress() {
  const scrolled  = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress  = docHeight > 0 ? Math.min(scrolled / docHeight, 1) : 0;

  if (progressFill) {
    progressFill.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  }

  if (backToTop) {
    if (scrolled > 320) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
}

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================================
// INIT
// ==========================================================
window.addEventListener('scroll', () => {
  updateActiveNav();
  updateScrollProgress();
}, { passive: true });

window.addEventListener('DOMContentLoaded', () => {
  initFadeIn();
  updateActiveNav();
  updateScrollProgress();
});
