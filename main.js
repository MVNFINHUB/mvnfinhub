/**
 * MVN FinHub Main Script
 * Theme: Invisible Power, Performance, Accessibility
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================================================
    // Configuration & State
    // ==========================================================================
    
    const CONFIG = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        staggerDelay: 100 // ms
    };

    const SELECTORS = {
        header: '.site-header',
        animated: '[data-animate], .process-card, .service-card',
        staggerParents: '[data-stagger-children="true"]',
        mobileToggle: '.mobile-toggle',
        navMenu: '.nav-list',
        smoothLinks: 'a[href^="#"]:not([href="#"])'
    };

    const CLASSES = {
        scrolled: 'is-scrolled',
        visible: 'is-visible',
        active: 'is-active',
        noScroll: 'no-scroll'
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ==========================================================================
    // Feature: Sticky Header State
    // ==========================================================================

    const initStickyHeader = () => {
        const header = document.querySelector(SELECTORS.header);
        if (!header) return;

        let ticking = false;

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 10) {
                        header.classList.add(CLASSES.scrolled);
                    } else {
                        header.classList.remove(CLASSES.scrolled);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        // Initial check
        onScroll();
    };

    // ==========================================================================
    // Feature: Reveal Animations (IntersectionObserver)
    // ==========================================================================

    const initRevealAnimations = () => {
        // If reduced motion is requested, show everything immediately
        if (prefersReducedMotion) {
            document.querySelectorAll(SELECTORS.animated).forEach(el => {
                el.classList.add(CLASSES.visible);
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            document.querySelectorAll(SELECTORS.staggerParents).forEach(parent => {
                Array.from(parent.children).forEach(child => {
                    child.classList.add(CLASSES.visible);
                    child.style.opacity = '1';
                    child.style.transform = 'none';
                });
            });
            return;
        }

        const observerOptions = {
            threshold: CONFIG.threshold,
            rootMargin: CONFIG.rootMargin
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    // Handle Staggered Children
                    if (target.hasAttribute('data-stagger-children')) {
                        const children = Array.from(target.children);
                        children.forEach((child, index) => {
                            child.style.transitionDelay = `${index * CONFIG.staggerDelay}ms`;
                            child.classList.add(CLASSES.visible);
                        });
                    } else {
                        // Handle Single Elements
                        target.classList.add(CLASSES.visible);
                    }

                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        // Observe independent animated elements
        const animatedElements = document.querySelectorAll(SELECTORS.animated);
        animatedElements.forEach(el => revealObserver.observe(el));

        // Observe containers that stagger their children
        const staggerContainers = document.querySelectorAll(SELECTORS.staggerParents);
        staggerContainers.forEach(el => revealObserver.observe(el));
    };

    // ==========================================================================
    // Feature: Mobile Navigation Toggle
    // ==========================================================================

    const initMobileMenu = () => {
        const toggleBtn = document.querySelector(SELECTORS.mobileToggle);
        const navMenu = document.querySelector(SELECTORS.navMenu);

        if (!toggleBtn || !navMenu) return;

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            navMenu.style.display = isExpanded ? 'none' : 'flex';
            
            // Note: In production styles.css, ensure .nav-list is positioned absolute/fixed for mobile
            // This JS assumes CSS handles the visual layout of the open state
            if (!isExpanded) {
                navMenu.classList.add('mobile-open');
                // Basic styles injection for functionality if CSS is missing specific mobile hook
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = '#FFFFFF';
                navMenu.style.flexDirection = 'column';
                navMenu.style.padding = '24px';
                navMenu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                navMenu.style.borderBottom = '1px solid #E2E8F0';
            } else {
                navMenu.classList.remove('mobile-open');
                navMenu.style = ''; // Clear inline styles to revert to CSS
            }
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('mobile-open') && 
                !navMenu.contains(e.target) && 
                !toggleBtn.contains(e.target)) {
                
                toggleBtn.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('mobile-open');
                navMenu.style = '';
            }
        });
    };

    // ==========================================================================
    // Feature: Smooth Scrolling
    // ==========================================================================

    const initSmoothScroll = () => {
        const links = document.querySelectorAll(SELECTORS.smoothLinks);

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector(SELECTORS.navMenu);
                    const toggleBtn = document.querySelector(SELECTORS.mobileToggle);
                    if (navMenu && toggleBtn) {
                        navMenu.style = '';
                        toggleBtn.setAttribute('aria-expanded', 'false');
                    }

                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // ==========================================================================
    // Initialization
    // ==========================================================================

    const init = () => {
        initStickyHeader();
        initRevealAnimations();
        initMobileMenu();
        initSmoothScroll();
    };

    // Run
    init();
});
