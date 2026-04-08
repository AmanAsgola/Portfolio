// Subtle fade-in on scroll
function initFadeIn() {
  const elements = document.querySelectorAll('.fadein');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
}

// Active nav highlight as you scroll
function updateActiveNav() {
  const navLinks = document.querySelectorAll('#main-nav a, #mobile-nav a');
  const sections = document.querySelectorAll('main .section');
  const scroll = window.scrollY + 160;
  let found = false;

  for (let i = sections.length - 1; i >= 0; i -= 1) {
    const sec = sections[i];
    if (scroll > sec.offsetTop) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks.forEach(link => {
        if (link.getAttribute('href').replace('#', '') === sec.id) {
          link.classList.add('active');
        }
      });
      found = true;
      break;
    }
  }

  if (!found) {
    navLinks.forEach(link => link.classList.remove('active'));
  }
}

// Mobile menu
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobile-nav');
if (burger && mobileNav) {
  burger.onclick = function () {
    mobileNav.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };
  mobileNav.onclick = function (e) {
    if (e.target.tagName === 'A' || e.target === mobileNav) {
      mobileNav.style.display = 'none';
      document.body.style.overflow = '';
    }
  };
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('DOMContentLoaded', () => {
  initFadeIn();
  updateActiveNav();
});
