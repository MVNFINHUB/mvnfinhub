/**
 * MVN FinHub - High-Fidelity Interaction Engine
 * Features: Spotlight Cards, Blur-Reveal, Sticky Header
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // State
    const state = {
        isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        isMobile: window.innerWidth < 900
    };

    // DOM Cache
    const dom = {
        header: document.querySelector('.site-header'),
        cards: document.querySelectorAll('.process-card, .service-card'),
        animatedElements: document.querySelectorAll('[data-animate], .trust-item, .situation-pill'),
        staggerParents: document.querySelectorAll('[data-stagger-children="true"]'),
        mobileToggle: document.querySelector('.mobile-toggle'),
        navMenu: document.querySelector('.nav-list')
    };

    /**
     * FEATURE 1: Spotlight Effect
     * Tracks mouse position over cards to create a localized glow.
     * Uses CSS variables for performant updating.
     */
    const initSpotlight = () => {
        if (state.isMobile || state.isReducedMotion) return;

        dom.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Set CSS variables on the card element
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    };

    /**
     * FEATURE 2: Sticky Header with Glassmorphism
     * Toggles class based on scroll position using RequestAnimationFrame.
     */
    const initStickyHeader = () => {
        if (!dom.header) return;
        let lastScrollY = window.scrollY;
        let ticking = false;

        const update = () => {
            if (window.scrollY > 20) {
                dom.header.classList.add('is-scrolled');
            } else {
                dom.header.classList.remove('is-scrolled');
            }
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
    };

    /**
     * FEATURE 3: Blur-In Reveal Animations
     * Uses IntersectionObserver to trigger 'is-visible' class.
     * Supports staggering for child elements.
     */
    const initRevealSystem = () => {
        if (state.isReducedMotion) {
            // Immediate reveal for accessibility
            document.querySelectorAll('[data-animate], .process-card').forEach(el => {
                el.classList.add('is-visible');
                el.style.opacity = 1;
                el.style.transform = 'none';
                el.style.filter = 'none';
            });
            return;
        }

        const observerConfig = {
            root: null,
            rootMargin: '0px 0px -10% 0px', // Trigger when element is 10% up from bottom
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    // Add visibility class
                    target.classList.add('is-visible');
                    
                    // Handle Staggered Children Logic
                    if (target.dataset.staggerChildren === "true") {
                        const children = Array.from(target.children);
                        children.forEach((child, index) => {
                            // Programmatic delay for smooth cascade
                            child.style.transitionDelay = `${index * 100}ms`;
                            child.classList.add('is-visible');
                            // Ensure child has base animate styles
                            child.setAttribute('data-animate', '');
                        });
                    }

                    obs.unobserve(target);
                }
            });
        }, observerConfig);

        // Observe elements
        dom.animatedElements.forEach(el => revealObserver.observe(el));
        dom.staggerParents.forEach(el => revealObserver.observe(el));
        
        // Also observe cards individually if not inside a stagger parent
        dom.cards.forEach(card => {
             if (!card.closest('[data-stagger-children="true"]')) {
                 card.setAttribute('data-animate', '');
                 revealObserver.observe(card);
             }
        });
    };

    /**
     * FEATURE 4: Mobile Menu
     * Simple toggle logic.
     */
    const initMobileMenu = () => {
        if (!dom.mobileToggle || !dom.navMenu) return;

        dom.mobileToggle.addEventListener('click', () => {
            const isExpanded = dom.mobileToggle.getAttribute('aria-expanded') === 'true';
            dom.mobileToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle visibility (CSS should handle position/z-index for .mobile-open)
            if (!isExpanded) {
                dom.navMenu.style.display = 'flex';
                dom.navMenu.style.flexDirection = 'column';
                dom.navMenu.style.position = 'fixed';
                dom.navMenu.style.top = '70px';
                dom.navMenu.style.left = '0';
                dom.navMenu.style.width = '100%';
                dom.navMenu.style.background = 'white';
                dom.navMenu.style.padding = '2rem';
                dom.navMenu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            } else {
                dom.navMenu.style.display = 'none';
            }
        });
    };

    // Initialize
    initSpotlight();
    initStickyHeader();
    initRevealSystem();
    initMobileMenu();
});
