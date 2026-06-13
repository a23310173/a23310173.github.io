/**
 * Portfolio — Santiago Ramirez Orozco
 *
 * Implements three Cult UI patterns ported to vanilla JS:
 * 1. Canvas Fractal Grid  — interactive dot grid that reacts to mouse (hero)
 * 2. Animated Number      — spring-physics counter for the +200% stat
 * 3. Stripe BG Guides     — column guide animation (CSS-driven, JS for timing)
 * Plus: header scroll state, mobile menu, smooth scroll, IntersectionObserver
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────
     1. HERO INTERACTIVE DOT CANVAS
     Inspired by Cult UI canvas-fractal-grid.tsx
     Dot grid that scales outward from the mouse position
     using spring physics (mass-spring-damper model)
     ────────────────────────────────────────────────────────── */
  const canvas  = document.getElementById('hero-canvas');
  const section = document.querySelector('.hero-section');

  if (canvas && section) {
    const ctx = canvas.getContext('2d');
    const DOT_SPACING = 30;
    const DOT_BASE    = 1.5;
    const DOT_MAX     = 5;
    const WAVE_RADIUS = 120;
    const COLOR       = 'rgba(9, 9, 11, 0.18)';

    let mouse    = { x: -9999, y: -9999 };
    let animated = true;

    // Resize canvas to section
    const resize = () => {
      const rect   = section.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = section.offsetHeight;
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    section.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x    = e.clientX - rect.left;
      mouse.y    = e.clientY - rect.top;
    }, { passive: true });

    section.addEventListener('mouseleave', () => {
      mouse = { x: -9999, y: -9999 };
    });

    // Respect reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animated = false;
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width  / DOT_SPACING) + 1;
      const rows = Math.ceil(canvas.height / DOT_SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * DOT_SPACING;
          const y = r * DOT_SPACING;

          // Distance from mouse
          const dx   = x - mouse.x;
          const dy   = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Spring influence: 1 at center, 0 at edge
          const influence = animated
            ? Math.max(0, 1 - dist / WAVE_RADIUS)
            : 0;

          // Ease: cubic-ease-out
          const eased = 1 - Math.pow(1 - influence, 3);
          const r_dot = DOT_BASE + eased * (DOT_MAX - DOT_BASE);

          ctx.beginPath();
          ctx.arc(x, y, r_dot, 0, Math.PI * 2);
          ctx.fillStyle = COLOR;
          ctx.globalAlpha = 0.5 + eased * 0.5;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    };

    draw();
  }

  /* ──────────────────────────────────────────────────────────
     2. SPRING-PHYSICS ANIMATED COUNTER
     Inspired by Cult UI animated-number.tsx (mass-spring-damper)
     Counts from 0 → target using spring integration
     ────────────────────────────────────────────────────────── */
  const counterEl = document.getElementById('stat-counter');

  if (counterEl) {
    const target   = parseInt(counterEl.dataset.target, 10) || 200;
    let current    = 0;
    let velocity   = 0;
    const MASS     = 0.8;
    const STIFF    = 75;
    const DAMPING  = 15;
    let started    = false;
    let rafId;

    const springTick = () => {
      // Spring force: F = -k(x - target) - c*v  (overdamped spring)
      const force    = -STIFF  * (current - target) / MASS;
      const drag     = -DAMPING * velocity / MASS;
      velocity      += (force + drag) * 0.016; // ~60fps dt
      current       += velocity;

      const display  = Math.round(Math.max(0, Math.min(current, target)));
      counterEl.textContent = display;

      if (Math.abs(current - target) > 0.5 || Math.abs(velocity) > 0.1) {
        rafId = requestAnimationFrame(springTick);
      } else {
        counterEl.textContent = target;
      }
    };

    // Start when the stat card enters the viewport
    const statObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          rafId   = requestAnimationFrame(springTick);
          statObs.disconnect();
        }
      });
    }, { threshold: 0.5 });

    statObs.observe(counterEl.closest('.stat-card') || counterEl);
  }

  /* ──────────────────────────────────────────────────────────
     3. HEADER SCROLL STATE
     ────────────────────────────────────────────────────────── */
  const header = document.querySelector('.site-header');

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ──────────────────────────────────────────────────────────
     4. MOBILE MENU
     ────────────────────────────────────────────────────────── */
  const toggle     = document.querySelector('.mobile-menu-toggle');
  const mobileNav  = document.querySelector('.mobile-panel');

  const closeMobile = () => {
    if (!toggle || !mobileNav) return;
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('active');
  };

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('active');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ──────────────────────────────────────────────────────────
     5. SMOOTH SCROLL (anchor links)
     ────────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id     = link.getAttribute('href');
      const target = id ? document.querySelector(id) : null;
      if (!target) return;
      e.preventDefault();
      closeMobile();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ──────────────────────────────────────────────────────────
     6. REVEAL ON SCROLL — IntersectionObserver
     UI/UX Pro Max: stagger sequence 30-50ms per item
     ────────────────────────────────────────────────────────── */
  const revealItems = document.querySelectorAll('.reveal');
  const currentYear = document.querySelector('#current-year');

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger: 40ms per item in the same batch
          const delay = i * 40;
          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
          // Remove delay after animation to avoid lingering on re-visit
          setTimeout(() => {
            entry.target.style.transitionDelay = '';
          }, 500 + delay);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -32px 0px',
    });

    revealItems.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    revealItems.forEach(el => el.classList.add('is-visible'));
  }
});
