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
    // 2. MOBILE MENU LOGIC (SURGICAL FIX)
    // ==========================================
    /* MOBILE FIX: Targeted .mobile-toggle and .nav-links for strict CSS compatibility */
    const menuToggle = document.querySelector('.mobile-toggle') || document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // SAFETY: Force reset body scroll on page load (Fixes "Stuck" scroll on Back Button)
    document.body.style.overflow = '';

    if (menuToggle && navLinks) {
        
        // Internal Toggle Function to ensure state consistency
        const setMenuState = (isOpen) => {
            if (isOpen) {
                navLinks.classList.add('active');
                menuToggle.textContent = '✕';
                menuToggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden'; /* Lock Scroll */
            } else {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = ''; /* Unlock Scroll */
            }
        };

        // 1. Toggle Open/Close on Click
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();  
            e.stopPropagation();
            const isCurrentlyOpen = navLinks.classList.contains('active');
            setMenuState(!isCurrentlyOpen);
        });

        // 2. Close when clicking ANY link (Critical for UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                setMenuState(false);
            });
        });

        // 3. Close when clicking OUTSIDE the menu
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                setMenuState(false);
            }
        });

        // 4. SAFETY: Auto-close if screen resizes to Desktop (Prevents broken layout)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && navLinks.classList.contains('active')) {
                setMenuState(false);
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
                /* DESKTOP SAFETY: Only clear backgrounds at top if width is desktop (prevent mobile flicker) */
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