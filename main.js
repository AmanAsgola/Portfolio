// Typed headline for sidebar
const headlineTyped = document.getElementById('headline-typed');
const headlineStrings = [
  "AI/ML & Data Engineer 👨‍💻",
  "Solving Problems at Scale.",
  "Python | Azure | Databricks",
  "Clean Data. Powerful Models."
];
let ht_i = 0, charIndex = 0, forward = true;
function typeWriter(){
  let txt = headlineStrings[ht_i].substring(0, charIndex);
  headlineTyped.textContent = txt;
  if(forward) {
    if(charIndex < headlineStrings[ht_i].length) {charIndex++;setTimeout(typeWriter,55);}
    else {forward = false; setTimeout(typeWriter, 1400);}
  } else {
    if(charIndex > 0) {charIndex--;setTimeout(typeWriter,35);}
    else {forward = true; ht_i=(ht_i+1)%headlineStrings.length; setTimeout(typeWriter,250);}
  }
}
if(headlineTyped) typeWriter();
// Interactive About Section Typing Animation
const aboutRoleTyped = document.getElementById('about-role-typed');
const aboutRoleStrings = [
  "AI/ML and Data Engineer",
  "Real-Time ETL Architect",
  "NLP Solutionist",
  "Problem Solver 💡"
];
let about_i = 0, aboutChar = 0, aboutFwd = true;
function aboutType(){
  let str = aboutRoleStrings[about_i].substring(0, aboutChar);
  if(aboutRoleTyped) aboutRoleTyped.textContent = str;
  if(aboutFwd) {
    if(aboutChar < aboutRoleStrings[about_i].length) {aboutChar++;setTimeout(aboutType,54);}
    else {aboutFwd = false; setTimeout(aboutType, 1300);}
  } else {
    if(aboutChar > 0) {aboutChar--;setTimeout(aboutType,34);}
    else {aboutFwd = true; about_i=(about_i+1)%aboutRoleStrings.length; setTimeout(aboutType,250);}
  }
}
if(aboutRoleTyped) aboutType();
// Section fade-in on scroll
function fadeInSections(){
  const fadeEls = document.querySelectorAll('.fadein');
  fadeEls.forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
document.addEventListener('scroll', fadeInSections);
window.addEventListener('DOMContentLoaded', fadeInSections);
// Active nav highlight as you scroll
function updateActiveNav(){
  let navLinks = document.querySelectorAll('#main-nav a, #mobile-nav a');
  let sections = document.querySelectorAll('main .section');
  let scroll = window.scrollY + 160;
  let found = false;
  for(let i=sections.length-1; i>=0; i--){
    let sec = sections[i];
    if(scroll > sec.offsetTop) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks.forEach(link => {
        if(link.getAttribute('href').replace('#','') === sec.id)
          link.classList.add('active');
      });
      found=true; break;
    }
  }
  if(!found) navLinks.forEach(link => link.classList.remove('active'));
}
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('DOMContentLoaded', updateActiveNav);
// Mobile menu
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobile-nav');
if(burger && mobileNav){
  burger.onclick = function(){
    mobileNav.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };
  mobileNav.onclick = function(e){
    if(e.target.tagName === 'A' || e.target === mobileNav){
      mobileNav.style.display = 'none';
      document.body.style.overflow = '';
    }
  };
}
// Dark mode toggle
const darkToggle = document.getElementById('dark-mode-toggle');
function setTheme(dark) {
  if(dark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
  localStorage.setItem('theme', dark ? "dark" : "light");
}
if(darkToggle){
  darkToggle.onclick = () => setTheme(!document.documentElement.classList.contains('dark'));
  window.addEventListener('DOMContentLoaded', () => {
    const userPref = localStorage.getItem('theme');
    if(userPref) setTheme(userPref === "dark");
    else if(window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme(true);
  });
}
// ==== Projects, Experience, Contact animated appear ====
// Helper for on-scroll reveal, with optional staggering
function setVisibleOnScroll(elements, stagger = 0.13) {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        if (stagger > 0) {
          entry.target.style.setProperty('--delay', `${idx * stagger}s`);
          entry.target.classList.add('stagger');
        }
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  elements.forEach(el => obs.observe(el));
}
// Animate-in for Projects, Experience, Contact
document.addEventListener('DOMContentLoaded', function() {
  setVisibleOnScroll(document.querySelectorAll('.project-card'), 0.08);
  setVisibleOnScroll(document.querySelectorAll('.experience-list .job-card'), 0.12);
  setVisibleOnScroll(document.querySelectorAll('.contact-list li'), 0.08);
});
document.addEventListener('DOMContentLoaded', function() {
  let exCards = document.querySelectorAll('section#experience .job-card');
  if(exCards.length && !document.querySelector('.experience-list')) {
    setVisibleOnScroll(exCards, 0.13);
  }
});
