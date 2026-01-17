(function() {
  'use strict';

  const SELECTORS = {
    header: 'header',
    darkModeToggle: '#dark-mode-toggle',
    revealElements: '[data-reveal], .section, .process-item, .hero h1, .hero p, .trust-list li, .service-list li'
  };

  const STORAGE_KEY = 'mvn_theme';
  
  function init() {
    setupDarkMode();
    setupStickyHeader();
    setupScrollReveal();
  }

  function setupDarkMode() {
    const toggleBtn = document.querySelector(SELECTORS.darkModeToggle);
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      if (newTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem(STORAGE_KEY, 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem(STORAGE_KEY, 'light');
      }
    });
  }

  function setupStickyHeader() {
    const header = document.querySelector(SELECTORS.header);
    if (!header) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 10) {
            header.classList.add('scrolled');
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          } else {
            header.classList.remove('scrolled');
            header.style.boxShadow = 'none';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  function setupScrollReveal() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll(SELECTORS.revealElements);
    
    if (elements.length === 0) return;

    if (reduceMotion) {
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
