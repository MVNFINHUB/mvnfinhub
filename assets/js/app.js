/**
 * MVN FINHUB - MAIN JAVASCRIPT
 * -------------------------------------------------------
 * Handles global UI logic: Mobile Menu, Footer Dates, Scroll effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DYNAMIC FOOTER YEAR
    // Automatically updates the year so you don't have to edit code every January.
    const currentYear = new Date().getFullYear();
    const copyrightSpan = document.querySelector('.copyright-year');
    if (copyrightSpan) {
        copyrightSpan.textContent = currentYear;
    }

    // 2. MOBILE MENU TOGGLE (Logic)
    // Listens for clicks on the hamburger icon to show/hide the navigation.
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle State
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            // Toggle Icon (Simple text swap for lightweight performance)
            if (!isExpanded) {
                menuToggle.textContent = '✕'; // Close Icon
            } else {
                menuToggle.textContent = '☰'; // Hamburger Icon
            }
        });
    }

    // 3. SMOOTH SCROLLING
    // Makes clicking "Contact" or anchor links scroll smoothly down the page.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.textContent = '☰';
                }
            }
        });
    });

    console.log('MVN FinHub: System Active');
});
