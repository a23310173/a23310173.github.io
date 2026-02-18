document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
        }
      }
    });
  });

  // Sticky Header Background on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Form Submission Handling (Placeholder)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Here you would typically send the form data to a server
      // For now, we'll just show an alert
      alert('Gracias por tu mensaje. Me pondré en contacto contigo pronto.');
      contactForm.reset();
    });
  }
});
