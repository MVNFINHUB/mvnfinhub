/**
 * MVN FINHUB - APP CONTROLLER (FINAL v2026.PLATINUM)
 * Integrated: Mobile Logic, Theme Engine, Supabase Forms, Performance
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. DYNAMIC THEME ENGINE (Meta Tag Sync)
    // ==========================================
    function updateMetaThemeColor(isDark) {
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', isDark ? '#020617' : '#F8FAFC');
        }
    }

    // Initialize Theme on Load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateMetaThemeColor(true);
        const btn = document.getElementById('footer-theme-btn');
        if(btn) btn.textContent = '☀️';
    } else {
        updateMetaThemeColor(false);
    }

    // Global Toggle Function
    window.toggleTheme = function() {
        const html = document.documentElement;
        const btn = document.querySelector('.theme-btn'); 
        const current = html.getAttribute('data-theme');
        
        if (current === 'light' || !current) {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if(btn) btn.textContent = '☀️';
            updateMetaThemeColor(true);
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            if(btn) btn.textContent = '🌙';
            updateMetaThemeColor(false);
        }
    };

    // ==========================================
    // 2. MOBILE MENU LOGIC (UNIFIED & STANDARDIZED)
    // ==========================================
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        
        // Internal State Manager
        const toggleMenu = (event) => {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            const isOpen = navLinks.classList.contains('active');
            
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        };

        const openMenu = () => {
            navLinks.classList.add('active');
            body.classList.add('menu-open'); // CSS handles scroll lock
            menuToggle.innerHTML = '✕';
            menuToggle.setAttribute('aria-expanded', 'true');
        };

        const closeMenu = () => {
            navLinks.classList.remove('active');
            body.classList.remove('menu-open'); // CSS unlocks scroll
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-expanded', 'false');
        };

        // 1. Main Toggle Listener
        menuToggle.addEventListener('click', toggleMenu);

        // 2. Close when clicking ANY link (UX Requirement)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // 3. Close when clicking OUTSIDE the menu
        document.addEventListener('click', (event) => {
            const isClickInside = navLinks.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInside && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // 4. Safety: Close on Desktop Resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // ==========================================
    // 3. PERFORMANCE: SCROLL REVEAL & LAZY LOAD
    // ==========================================
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                /* PERFORMANCE FIX: Ensure glass effect is applied consistently on scroll */
                header.style.background = 'var(--bg-glass)';
                header.style.backdropFilter = 'blur(12px)';
                header.style.borderBottom = '1px solid var(--border)';
            } else {
                /* DESKTOP SAFETY: Only clear backgrounds at top if width is desktop */
                if(window.innerWidth > 992) {
                    header.style.background = 'transparent';
                    header.style.backdropFilter = 'none';
                    header.style.borderBottom = 'none';
                }
            }
        }
    });

    // Reveal Elements on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // PERFORMANCE FIX: Native Lazy Loading enforcement
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // ==========================================
    // 4. DYNAMIC FOOTER YEAR
    // ==========================================
    const yearSpan = document.querySelector('.copyright-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // ==========================================
    // 5. DATABASE & FORM LOGIC (SUPABASE)
    // ==========================================
    const SUPABASE_URL = "https://fviufivewglglnxhlmmf.supabase.co";      
    const SUPABASE_KEY = "sb_publishable_HYE7g0GyJbUfmldKTTAbeA_OUdc0Rah";

    const enquiryForm = document.getElementById('enquiryForm');
    const successMessage = document.getElementById('successMessage');
    const refIdDisplay = document.getElementById('refIdDisplay');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const consentCheckbox = document.getElementById('consent');
            if (consentCheckbox && !consentCheckbox.checked) {
                alert("Please agree to the Privacy Policy."); return;
            }

            // UI Loading State
            let submitBtn = enquiryForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Submit';
            
            if(submitBtn) {
                submitBtn.disabled = true; 
                submitBtn.textContent = 'Sending...';
            }

            const refID = `MVN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
            
            const formData = {
                full_name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service_type: document.getElementById('service').value,
                message: document.getElementById('message').value,
                reference_id: refID,
                status: 'New'
            };

            try {
                if(!SUPABASE_URL || !SUPABASE_KEY) {
                    console.log("Supabase keys missing. Simulating success.");
                    await new Promise(r => setTimeout(r, 1500)); 
                    enquiryForm.style.display = 'none';
                    if(refIdDisplay) refIdDisplay.textContent = refID;
                    if(successMessage) {
                        successMessage.style.display = 'block';
                        successMessage.scrollIntoView({ behavior: 'smooth' });
                    }
                    return; 
                }

                const response = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_KEY,
                        'Authorization': `Bearer ${SUPABASE_KEY}`,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) throw new Error('Server Error');

                enquiryForm.style.display = 'none';
                if(refIdDisplay) refIdDisplay.textContent = refID;
                if(successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }

            } catch (error) {
                console.error(error);
                alert("Message could not be sent. Please contact us directly.");
                if(submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        });
    }
});