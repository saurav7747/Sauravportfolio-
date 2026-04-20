/* ==========================================
   SAURAV PORTFOLIO — script.js
   ========================================== */

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth follower animation
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Scale cursor on hoverable elements
document.querySelectorAll('a, button, .project-card, .about-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width   = '18px';
    cursor.style.height  = '18px';
    follower.style.width  = '50px';
    follower.style.height = '50px';
    follower.style.borderColor = 'rgba(59,130,246,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width   = '10px';
    cursor.style.height  = '10px';
    follower.style.width  = '32px';
    follower.style.height = '32px';
    follower.style.borderColor = 'rgba(59,130,246,0.5)';
  });
});


/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  // Animate bars
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => {
    s.style.transform = '';
    s.style.opacity   = '';
  });
}


/* ===== SCROLL TO SECTION ===== */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


/* ===== TYPING EFFECT ===== */
const typingPhrases = [
  "fast, responsive websites.",
  "clean user experiences.",
  "modern web interfaces.",
  "code-driven solutions.",
  "pixel-perfect layouts.",
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typedEl   = document.getElementById('typedText');

function typeEffect() {
  const phrase = typingPhrases[phraseIndex];
  const speed  = isDeleting ? 50 : 90;

  typedEl.textContent = phrase.slice(0, charIndex);

  if (!isDeleting && charIndex < phrase.length) {
    charIndex++;
    setTimeout(typeEffect, speed);
  } else if (!isDeleting && charIndex === phrase.length) {
    setTimeout(() => { isDeleting = true; typeEffect(); }, 1800);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, speed * 0.5);
  } else {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    setTimeout(typeEffect, 400);
  }
}


/* ===== SCROLL REVEAL (IntersectionObserver) ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards slightly
      const delay = entry.target.closest('.projects-grid, .about-cards, .tech-pills')
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
        : 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ===== SKILL BARS ANIMATION ===== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        const target = fill.getAttribute('data-width');
        fill.style.width = target + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-bars');
if (skillsSection) skillObserver.observe(skillsSection);


/* ===== PROJECT CARD — subtle mouse glow ===== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect  = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.querySelector('.project-glow').style.background =
      `radial-gradient(circle at ${x}% ${y}%, rgba(59,130,246,0.1) 0%, transparent 65%)`;
  });
});


/* ===== FOOTER YEAR ===== */
document.getElementById('year').textContent = new Date().getFullYear();


/* ===== INIT (after intro fades) ===== */
window.addEventListener('load', () => {
  // Start typing after intro (~1.6s delay + 0.5s animation)
  setTimeout(typeEffect, 2300);
});
