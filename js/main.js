/* =============================================
   main.js — Portfolio JavaScript
   Akshitha Kandagatla
   ============================================= */

'use strict';

// ── DOM Refs ──────────────────────────────────
const navbar       = document.getElementById('navbar');
const navToggle    = document.getElementById('navToggle');
const navLinks     = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');
const backToTop    = document.getElementById('backToTop');
const contactForm  = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const radarCanvas  = document.getElementById('radarChart');

// ── Scroll: Navbar & Back-To-Top ──────────────
function onScroll() {
  const scrollY = window.scrollY;

  // Sticky nav shadow
  navbar.classList.toggle('scrolled', scrollY > 20);

  // Back to top
  backToTop.classList.toggle('visible', scrollY > 400);

  // Active nav link
  const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && scrollY >= el.offsetTop - 130) current = id;
  });
  navLinkItems.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

// ── Mobile Nav Toggle ─────────────────────────
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav when a link is clicked
navLinkItems.forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Smooth Back To Top ────────────────────────
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── AOS (Animate On Scroll) ───────────────────
function initAOS() {
  const aosEls = document.querySelectorAll('[data-aos]');
  if (!aosEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.aosDelay || 0);
          setTimeout(() => entry.target.classList.add('aos-animate'), delay);

          // Animate skill bars once revealed
          const bars = entry.target.querySelectorAll('.skill-bar-fill');
          bars.forEach(bar => {
            const target = bar.getAttribute('data-width');
            setTimeout(() => {
              bar.style.width = target + '%';
            }, delay + 200);
          });
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  aosEls.forEach(el => observer.observe(el));
}

// ── Skill Bar Animation on Scroll ────────────
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const tw  = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = tw + '%'; }, 300);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ── Radar / Spider Chart ──────────────────────
function drawRadarChart(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2 + 10;
  const R  = Math.min(W, H) * 0.38;

  const skills = [
    { label: 'Python',         value: 0.90 },
    { label: 'Web Dev',        value: 0.85 },
    { label: 'Machine Learning', value: 0.80 },
    { label: 'React.js',       value: 0.82 },
    { label: 'Generative AI',  value: 0.75 },
    { label: 'Databases',      value: 0.72 },
  ];

  const N     = skills.length;
  const step  = (2 * Math.PI) / N;
  const levels = 5;

  // Background grid
  for (let level = 1; level <= levels; level++) {
    const r = (R * level) / levels;
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const angle = i * step - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth   = 1;
    ctx.stroke();
    ctx.fillStyle = level % 2 === 0 ? 'rgba(255,203,5,0.03)' : 'transparent';
    ctx.fill();
  }

  // Axis lines
  for (let i = 0; i < N; i++) {
    const angle = i * step - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth   = 1;
    ctx.stroke();
  }

  // Data polygon
  ctx.beginPath();
  for (let i = 0; i < N; i++) {
    const angle = i * step - Math.PI / 2;
    const r     = R * skills[i].value;
    const x     = cx + r * Math.cos(angle);
    const y     = cy + r * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle   = 'rgba(255,203,5,0.25)';
  ctx.fill();
  ctx.strokeStyle = '#FFCB05';
  ctx.lineWidth   = 2.5;
  ctx.stroke();

  // Data points
  for (let i = 0; i < N; i++) {
    const angle = i * step - Math.PI / 2;
    const r     = R * skills[i].value;
    const x     = cx + r * Math.cos(angle);
    const y     = cy + r * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFCB05';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth   = 2;
    ctx.stroke();
  }

  // Labels
  ctx.font = 'bold 11px Poppins, sans-serif';
  ctx.fillStyle  = '#333';
  ctx.textAlign  = 'center';
  for (let i = 0; i < N; i++) {
    const angle  = i * step - Math.PI / 2;
    const lx     = cx + (R + 28) * Math.cos(angle);
    const ly     = cy + (R + 28) * Math.sin(angle);
    ctx.fillText(skills[i].label, lx, ly + 4);
  }
}

// ── Contact Form ──────────────────────────────
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('#submitBtn');
    btn.disabled = true;
    btn.querySelector('.submit-btn-text').textContent = 'Sending…';

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formsubmit.co/ajax/akshithakandagatla4@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: `${data['First Name']} ${data['Last Name']}`.trim(),
          email: data.Email,
          _subject: data.Subject || 'New Message from Portfolio',
          message: data.Message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (response.ok) {
        formFeedback.className  = 'form-feedback success';
        formFeedback.textContent = '✅ Thanks for reaching out! I\'ll get back to you soon.';
        contactForm.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      formFeedback.className  = 'form-feedback';
      formFeedback.style.color = 'var(--clr-coral)';
      formFeedback.textContent = '❌ Oops! Something went wrong. Please email me directly.';
    } finally {
      btn.disabled = false;
      btn.querySelector('.submit-btn-text').textContent = 'Send Message';

      setTimeout(() => {
        formFeedback.className = 'form-feedback';
        formFeedback.style.color = '';
        formFeedback.textContent = '';
      }, 5000);
    }
  });
}

// ── Typing Effect for Hero Title ──────────────
function initTypingEffect() {
  const titleEl = document.querySelector('.hero-title');
  if (!titleEl) return;

  const phrases = [
    'Computer Science Engineer & AI Developer',
    'Full-Stack Web Developer',
    'Machine Learning Enthusiast',
    'Open Source Builder',
  ];

  let phraseIdx  = 0;
  let charIdx    = 0;
  let deleting   = false;
  let isPaused   = false;

  function type() {
    const current = phrases[phraseIdx];

    if (deleting) {
      charIdx--;
    } else {
      charIdx++;
    }

    titleEl.textContent = current.substring(0, charIdx);

    let delay = deleting ? 40 : 80;

    if (!deleting && charIdx === current.length) {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        deleting = true;
        type();
      }, 2200);
      return;
    }

    if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }

    if (!isPaused) setTimeout(type, delay);
  }

  setTimeout(type, 1800);
}

// ── Profile Photo Fallback ────────────────────
function initPhotoFallback() {
  const photos = document.querySelectorAll('.hero-photo, .about-photo');
  photos.forEach(img => {
    img.addEventListener('error', () => {
      // Draw a nice SVG avatar as fallback
      const svgData = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'>
        <rect width='400' height='400' fill='%23f0f0f0'/>
        <circle cx='200' cy='160' r='80' fill='%23ccc'/>
        <ellipse cx='200' cy='340' rx='130' ry='80' fill='%23ccc'/>
      </svg>`;
      img.src = `data:image/svg+xml,${svgData}`;
    });
  });
}

// ── Parallax Hero Image ───────────────────────
function initParallax() {
  const heroWrap = document.querySelector('.hero-image-wrap');
  if (!heroWrap) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    heroWrap.style.transform = `translate(${x}px, ${y}px)`;
  }, { passive: true });
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initSkillBars();
  initContactForm();
  initTypingEffect();
  initPhotoFallback();
  initParallax();
  onScroll(); // run once on load

  if (radarCanvas) {
    // Draw radar when in viewport
    const radarObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          drawRadarChart(radarCanvas);
          radarObserver.unobserve(radarCanvas);
        }
      });
    }, { threshold: 0.3 });
    radarObserver.observe(radarCanvas);
  }
});
