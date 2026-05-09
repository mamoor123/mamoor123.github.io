/* ============================================
   MAMOOR AHMAD — Portfolio Shared JavaScript
   ============================================ */

(function () {
  'use strict';

  /* --- Theme Toggle --- */
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* --- Loader --- */
  const loader = document.querySelector('.loader-overlay');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 400);
    });
    // Failsafe
    setTimeout(() => loader.classList.add('hidden'), 3000);
  }

  /* --- Navigation --- */
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  const overlay = document.querySelector('.nav__overlay');
  const mobileLinks = document.querySelectorAll('.nav__mobile a');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const st = window.scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', st > 50);
    }
    lastScroll = st;
  }, { passive: true });

  // Hamburger toggle
  function toggleMobile(open) {
    if (hamburger) {
      hamburger.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
    }
    if (mobileMenu) mobileMenu.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      toggleMobile(!mobileMenu.classList.contains('open'));
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => toggleMobile(false));
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobile(false));
  });

  /* --- Custom Cursor --- */
  const cursorDot = document.querySelector('.cursor-dot');
  if (cursorDot && window.matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      if (!cursorDot.classList.contains('visible')) {
        cursorDot.classList.add('visible');
      }
    });
    function animateCursor() {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cursorDot.style.left = cx - 4 + 'px';
      cursorDot.style.top = cy - 4 + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    document.querySelectorAll('a, button, .project-card, .service-card, .filter-pill').forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
    });
  }

  /* --- Typing Effect --- */
  const typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    const strings = [
      'AI Agent Systems',
      'Full-Stack SaaS',
      'Chrome Extensions',
      'Data Visualization',
      'Climate Tech',
      'MVP Development'
    ];
    let si = 0, ci = 0, deleting = false, delay = 100;

    function type() {
      const current = strings[si];
      if (!deleting) {
        typedEl.textContent = current.slice(0, ci + 1);
        ci++;
        if (ci === current.length) {
          deleting = true;
          delay = 2000;
        } else {
          delay = 80 + Math.random() * 40;
        }
      } else {
        typedEl.textContent = current.slice(0, ci - 1);
        ci--;
        if (ci === 0) {
          deleting = false;
          si = (si + 1) % strings.length;
          delay = 500;
        } else {
          delay = 40;
        }
      }
      setTimeout(type, delay);
    }
    setTimeout(type, 1000);
  }

  /* --- Particle Animation --- */
  const particleCanvas = document.getElementById('particle-canvas');
  if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    let w, h;
    const PARTICLE_COUNT = 60;
    const CONNECT_DIST = 120;

    function resize() {
      w = particleCanvas.width = particleCanvas.parentElement.offsetWidth;
      h = particleCanvas.height = particleCanvas.parentElement.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1
      };
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Update & draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const isDark = root.getAttribute('data-theme') !== 'light';
        ctx.fillStyle = isDark ? 'rgba(100, 255, 218, 0.6)' : 'rgba(8, 145, 178, 0.5)';
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const isDark = root.getAttribute('data-theme') !== 'light';
            ctx.strokeStyle = isDark
              ? `rgba(100, 255, 218, ${alpha})`
              : `rgba(8, 145, 178, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', resize);
  }

  /* --- Scroll Reveal --- */
  function setupReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    els.forEach(el => observer.observe(el));
  }
  setupReveal();

  /* --- Counter Animation --- */
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          const duration = 2000;
          const start = performance.now();

          function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.round(eased * target);
            el.textContent = prefix + current + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  }
  animateCounters();

  /* --- Tech Stack Bar Animation --- */
  function animateTechBars() {
    const bars = document.querySelectorAll('.tech-item__bar-fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const pct = fill.getAttribute('data-width');
          setTimeout(() => {
            fill.style.width = pct + '%';
          }, 200);
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.2 });

    bars.forEach(b => observer.observe(b));
  }
  animateTechBars();

  /* --- GitHub Contribution Graph (Generated) --- */
  function generateContribGraph() {
    const grid = document.querySelector('.contrib-graph__grid');
    if (!grid) return;
    // 7 rows × 52 columns
    for (let week = 0; week < 52; week++) {
      for (let day = 0; day < 7; day++) {
        const cell = document.createElement('div');
        cell.className = 'contrib-graph__cell';
        // Random activity levels with realistic distribution
        const rand = Math.random();
        let level = 0;
        if (rand > 0.85) level = 4;
        else if (rand > 0.7) level = 3;
        else if (rand > 0.5) level = 2;
        else if (rand > 0.3) level = 1;
        cell.setAttribute('data-level', level);
        grid.appendChild(cell);
      }
    }
  }
  generateContribGraph();

  /* --- Smooth Scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Contact Form (demo) --- */
  const contactForm = document.querySelector('.contact__form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const origText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#059669';
        setTimeout(() => {
          btn.textContent = origText;
          btn.disabled = false;
          btn.style.background = '';
          this.reset();
        }, 2000);
      }, 1500);
    });
  }

  /* --- GSAP Scroll Animations (if loaded) --- */
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Stagger cards
    gsap.utils.toArray('.project-card, .service-card, .testimonial-card, .project-card--sm').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: (i % 3) * 0.1,
        ease: 'power2.out'
      });
    });

    // Section headers
    gsap.utils.toArray('.section__header').forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  }

  // Wait for GSAP to load
  if (typeof gsap !== 'undefined') {
    initGSAP();
  } else {
    window.addEventListener('load', () => {
      setTimeout(initGSAP, 100);
    });
  }

})();
