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
// GITHUB REPOS (auto-fetch)
// Change GITHUB_USER below to update which repos are shown.
// ==========================================================
const GITHUB_USER = 'AmanAsgola';

const LANG_COLORS = {
  Python:     '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Java:       '#b07219',
  Go:         '#00ADD8',
  Rust:       '#dea584',
  Shell:      '#89e051',
  Jupyter:    '#DA5B0B',
};

async function loadGitHubRepos() {
  const grid = document.getElementById('repos-grid');
  if (!grid) return;

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`,
      { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);

    const repos = await res.json();

    // Drop forks and the profile-readme repo, show at most 6
    const shown = repos
      .filter(r => !r.fork && r.name.toLowerCase() !== GITHUB_USER.toLowerCase())
      .slice(0, 6);

    if (!shown.length) {
      grid.innerHTML = '<p class="repos-loading">No public repositories found.</p>';
      return;
    }

    grid.innerHTML = shown.map(repo => {
      const desc    = repo.description ? escapeHtml(repo.description) : 'No description provided.';
      const langDot = repo.language
        ? `<span class="repo-lang-dot" style="background:${LANG_COLORS[repo.language] || '#8b5cf6'}"></span>${escapeHtml(repo.language)}`
        : '';
      return `
        <a href="${repo.html_url}" target="_blank" rel="noopener" class="repo-card">
          <div class="repo-name">${escapeHtml(repo.name)}</div>
          <div class="repo-desc">${desc}</div>
          ${repo.language ? `<div class="repo-lang">${langDot}</div>` : ''}
        </a>`;
    }).join('');

  } catch {
    grid.innerHTML = '<p class="repos-loading">Could not load repositories. Check your connection.</p>';
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

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
  loadGitHubRepos();
});
