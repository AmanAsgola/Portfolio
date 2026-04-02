// Typed headline
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


// Section fade-in
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
  let scroll = window.scrollY + 160; // fudge header height
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
// Dark mode toggle
const darkToggle = document.getElementById('dark-mode-toggle');
function setTheme(dark) {
  if(dark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
  localStorage.setItem('theme', dark ? "dark" : "light");
}
darkToggle.onclick = () => setTheme(!document.documentElement.classList.contains('dark'));
// Auto theme based on system/user
window.addEventListener('DOMContentLoaded', () => {
  const userPref = localStorage.getItem('theme');
  if(userPref) setTheme(userPref === "dark");
  else if(window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme(true);
});
