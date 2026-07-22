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
     LANGUAGE SELECTOR
     English is the source language in the HTML; Spanish copy is
     applied client-side and the visitor's preference is remembered.
     ────────────────────────────────────────────────────────── */
  const translations = {
    es: {
      homeLabel: 'Inicio',
      profileAlt: 'Foto de Santiago Ramirez Orozco',
      mainNavigation: 'Navegación principal',
      navAbout: 'Perfil',
      navProjects: 'Proyectos',
      navExperience: 'Experiencia',
      navSkills: 'Habilidades',
      navContact: 'Contacto',
      viewCv: 'Ver CV',
      openMenu: 'Abrir menú',
      heroTitle: 'Construyo software claro<br>para <em>problemas reales.</em>',
      heroSummary: 'Desarrollador con formación en química farmacéutica y experiencia en análisis de datos, desarrollo web y mejora de procesos. Actualmente en Jabil apoyando al área de Test Engineering con dashboards, bases de datos y soluciones de software orientadas a operaciones.',
      keyFacts: 'Datos clave',
      englishLevel: 'Inglés C1',
      availableDate: 'Disponible ago. 2026',
      exploreProjects: 'Explorar proyectos',
      contactAction: 'Contactar',
      activeInternship: 'Internship activo',
      provenImpact: 'Impacto comprobado',
      salesIncrease: 'incremento en ventas online · DermaSun',
      aboutEyebrow: 'Perfil',
      aboutTitle: 'Un perfil híbrido entre software, datos y ejecución operativa.',
      aboutDataTitle: 'Datos y desarrollo de software',
      aboutDataBody: 'Analizo datos de procesos de manufactura y desarrollo herramientas como dashboards en Power BI y bases de datos SQL para que los equipos tomen mejores decisiones con información clara y accionable.',
      aboutWebTitle: 'Desarrollo web con foco en negocio',
      aboutWebBody: 'He trabajado en sitios web, catálogos dinámicos y relanzamientos digitales con una mentalidad orientada a resultados: más conversión, mejor operación y una experiencia más clara para el usuario.',
      aboutOperationsTitle: 'Precisión operativa y colaboración',
      aboutOperationsBody: 'Mi formación en química farmacéutica me dio disciplina y documentación rigurosa. He coordinado proyectos técnicos y colaborado directamente con clientes desde el requerimiento hasta la entrega.',
      projectsEyebrow: 'Proyectos destacados',
      projectsTitle: 'Trabajo enfocado en impacto, no solo en implementación.',
      jabilProjectTitle: 'Dashboards y bases de datos para manufactura',
      jabilProjectBody: 'Análisis de datos de procesos de prueba y desarrollo de herramientas de software para el área de Test Engineering, apoyando la toma de decisiones con datos visuales y estructurados.',
      jabilFeature1: 'Dashboards operativos en Power BI',
      jabilFeature2: 'Diseño y mantenimiento de bases de datos',
      jabilFeature3: 'Automatización de reportes de proceso',
      onlineSalesMetric: '+200% ventas online',
      dermasunProjectTitle: 'Relanzamiento de e-commerce y presencia digital',
      dermasunProjectBody: 'Desarrollé y relancé la plataforma de comercio electrónico de la empresa, mejorando el canal online y apoyando la actualización continua del sitio y redes sociales.',
      dermasunFeature1: 'Relanzamiento completo del sitio',
      dermasunFeature2: 'Soporte a la operación digital de la marca',
      dermasunFeature3: 'Enfoque en resultados comerciales medibles',
      internalErp: 'ERP interno',
      dermasunAppBody: 'Sistema de gestión empresarial para dermasun.net enfocado en centralizar procesos internos y facilitar la administración operativa del negocio.',
      dermasunAppFeature1: 'Gestión interna de procesos empresariales',
      dermasunAppFeature2: 'Soporte a operación y seguimiento de información',
      dermasunAppFeature3: 'Desarrollo orientado a necesidades reales del negocio',
      personalWebsite: 'Sitio web profesional',
      ozctechBody: 'Sitio de mi operación personal y profesional para presentar servicios, proyectos, identidad digital y un punto de contacto con clientes y colaboradores.',
      ozctechFeature1: 'Presencia profesional y portafolio personal',
      ozctechFeature2: 'Canal directo de contacto y presentación de servicios',
      ozctechFeature3: 'Base para identidad digital y marca personal',
      academicItsm: 'Académico / ITSM',
      deployTrackBody: 'Sistema de gestión ITIL con dashboard de KPIs para dar visibilidad a incidencias, servicios y seguimiento operativo dentro de un flujo de soporte estructurado.',
      deployTrackFeature1: 'Dashboard de indicadores para gestión de servicios',
      deployTrackFeature2: 'Enfoque en procesos ITIL y trazabilidad',
      deployTrackFeature3: 'Vista ejecutiva para seguimiento operativo',
      milaBody: 'Web app en Node.js para administrar una quiniela del Mundial FIFA 2026, con gestión de participantes, partidos y dinámicas de seguimiento del torneo.',
      milaFeature1: 'Administración de quiniela y participantes',
      milaFeature2: 'Flujo web para seguimiento del torneo',
      milaFeature3: 'Backend orientado a reglas del juego y control operativo',
      customFullStack: 'Full-stack a medida',
      naturalHairBody: 'Arquitectura y desarrollo de un sitio de catálogo dinámico para la industria de belleza, trabajando de cerca con el cliente para aterrizar requerimientos y asegurar una entrega alineada al negocio.',
      naturalHairFeature1: 'Catálogo de productos y buscador de ubicaciones',
      naturalHairFeature2: 'Sección de preguntas y respuestas',
      naturalHairFeature3: 'Base de datos SQL personalizada',
      experienceEyebrow: 'Trayectoria',
      experienceTitle: 'Experiencia profesional y formación técnica.',
      jabilDates: 'Jun - Ago<br>2026',
      jabilLocation: 'Jabil · Guadalajara, México',
      jabilExperienceBody: 'Análisis de datos y desarrollo de software dentro del área de Test Engineering. Construcción de dashboards en Power BI, diseño y mantenimiento de bases de datos, y soporte técnico a procesos de prueba en manufactura.',
      presentDates: '2020<br>Presente',
      dermasunLocation: 'DermaSun · Zapopan, México',
      dermasunExperienceBody: 'Lidero iniciativas técnicas y operativas que van desde el desarrollo web hasta la mejora de procesos y la implementación de infraestructura de seguridad.',
      naturalHairMeta: 'Natural-hair.mx · Cliente del sector belleza',
      naturalHairExperienceBody: 'Diseñé y construí una solución web a medida, colaborando de forma directa con el cliente durante todo el ciclo del proyecto.',
      softwareEngineeringDegree: 'Ingeniería en Desarrollo de Software',
      softwareEducationBody: 'Formación actual enfocada en desarrollo de software y resolución de problemas técnicos.',
      chemistryDegree: 'Tecnólogo en Química Farmacéutica',
      chemistryEducationBody: 'Base científica y metodológica que hoy aplico en entornos de software, calidad y operaciones.',
      skillsEyebrow: 'Habilidades y certificaciones',
      skillsTitle: 'Stack técnico, herramientas profesionales y aprendizaje continuo.',
      technicalSkills: 'Técnicas',
      professionalSkills: 'Profesionales',
      highImpactPresentations: 'Presentaciones de alto impacto',
      certifications: 'Certificaciones',
      languages: 'Idiomas',
      spanishLevel: 'Español · Nativo',
      englishCertified: 'Inglés · C1 certificado',
      frenchLevel: 'Francés · A2 (principiante intermedio)',
      italianLevel: 'Italiano · A2 (principiante intermedio)',
      contactEyebrow: 'Contacto',
      contactTitle: 'Disponible para colaborar en proyectos donde la ejecución importe.',
      contactBody: 'Si buscas a alguien que combine criterio técnico, disciplina operativa y una forma clara de comunicar avances, conversemos.',
      contactLocation: 'Zapopan, Jalisco, México',
    },
  };

  const languageToggle = document.querySelector('.language-toggle');
  const translatableText = [...document.querySelectorAll('[data-i18n]')];
  const translatableHtml = [...document.querySelectorAll('[data-i18n-html]')];
  const translatableLabels = [...document.querySelectorAll('[data-i18n-aria-label]')];
  const translatableAlts = [...document.querySelectorAll('[data-i18n-alt]')];
  const englishText = new Map(translatableText.map(el => [el, el.textContent]));
  const englishHtml = new Map(translatableHtml.map(el => [el, el.innerHTML]));
  const englishLabels = new Map(translatableLabels.map(el => [el, el.getAttribute('aria-label')]));
  const englishAlts = new Map(translatableAlts.map(el => [el, el.getAttribute('alt')]));
  const metaDescription = document.querySelector('meta[name="description"]');
  const openGraphDescription = document.querySelector('meta[property="og:description"]');
  const englishMetaDescription = metaDescription?.getAttribute('content');
  const englishOpenGraphDescription = openGraphDescription?.getAttribute('content');

  const setLanguage = (language) => {
    const isSpanish = language === 'es';
    const dictionary = translations.es;

    translatableText.forEach(el => {
      el.textContent = isSpanish ? dictionary[el.dataset.i18n] : englishText.get(el);
    });
    translatableHtml.forEach(el => {
      el.innerHTML = isSpanish ? dictionary[el.dataset.i18nHtml] : englishHtml.get(el);
    });
    translatableLabels.forEach(el => {
      el.setAttribute('aria-label', isSpanish ? dictionary[el.dataset.i18nAriaLabel] : englishLabels.get(el));
    });
    translatableAlts.forEach(el => {
      el.setAttribute('alt', isSpanish ? dictionary[el.dataset.i18nAlt] : englishAlts.get(el));
    });

    document.documentElement.lang = language;
    languageToggle?.setAttribute('aria-pressed', String(isSpanish));
    languageToggle?.setAttribute('aria-label', isSpanish ? 'Cambiar idioma a inglés' : 'Switch language to Spanish');
    languageToggle?.setAttribute('title', isSpanish ? 'Cambiar idioma a inglés' : 'Switch language to Spanish');
    languageToggle?.querySelectorAll('[data-language]').forEach(option => {
      option.classList.toggle('active', option.dataset.language === language);
    });

    if (metaDescription) {
      metaDescription.setAttribute('content', isSpanish
        ? 'Portafolio de Santiago Ramirez Orozco. Desarrollador de software con experiencia en análisis de datos, e-commerce, ciberseguridad y mejora de procesos operativos.'
        : englishMetaDescription);
    }
    if (openGraphDescription) {
      openGraphDescription.setAttribute('content', isSpanish
        ? 'Análisis de datos, dashboards, desarrollo web y operaciones. Experiencia en Jabil, DermaSun y proyectos freelance.'
        : englishOpenGraphDescription);
    }

    try {
      localStorage.setItem('portfolio-language', language);
    } catch (error) {
      // The language switch still works when browser storage is unavailable.
    }
  };

  let initialLanguage = 'en';
  try {
    initialLanguage = localStorage.getItem('portfolio-language') === 'es' ? 'es' : 'en';
  } catch (error) {
    // English remains the default when browser storage is unavailable.
  }

  setLanguage(initialLanguage);

  languageToggle?.addEventListener('click', () => {
    setLanguage(document.documentElement.lang === 'en' ? 'es' : 'en');
  });

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
