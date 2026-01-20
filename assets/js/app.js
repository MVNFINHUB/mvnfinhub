/**
 * MVN FINHUB - APP CONTROLLER (FINAL v2026)
 * Handles: Mobile Menu, Database, and DYNAMIC THEME COLORS.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. DYNAMIC THEME COLOR (FIXES WHITE FLASH)
    // ==========================================
    function updateMetaThemeColor(isDark) {
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            // Light Mode: #F8FAFC (White/Grey) | Dark Mode: #0F172A (Deep Blue)
            themeColorMeta.setAttribute('content', isDark ? '#0F172A' : '#F8FAFC');
        }
    }

    // ==========================================
    // 1. MOBILE MENU LOGIC (ACCESSIBILITY OPTIMIZED)
    // ==========================================
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.setAttribute('aria-expanded', 'false');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            menuToggle.textContent = isExpanded ? '✕' : '☰';
        });
    }

    // ==========================================
    // 2. THEME TOGGLE LOGIC (CONNECTED TO META TAG)
    // ==========================================
    window.toggleTheme = function() {
        const html = document.documentElement;
        const btn = document.getElementById('footer-theme-btn');
        const current = html.getAttribute('data-theme');
        
        if (current === 'light' || !current) {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if(btn) btn.textContent = '☀️';
            updateMetaThemeColor(true); // <--- Updates Phone Browser Color
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            if(btn) btn.textContent = '🌙';
            updateMetaThemeColor(false); // <--- Updates Phone Browser Color
        }
    };

    // Initialize Theme on Load (Double Check)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        updateMetaThemeColor(true);
    } else {
        updateMetaThemeColor(false);
    }

    // ==========================================
    // 3. DYNAMIC FOOTER YEAR
    // ==========================================
    const yearSpan = document.querySelector('.copyright-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // ==========================================
    // 4. DATABASE & FORM LOGIC (SUPABASE)
    // ==========================================
    // Replace these with your actual Supabase URL and Key when ready.
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

            const submitBtn = enquiryForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true; 
            submitBtn.textContent = 'Sending...';

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
                    await new Promise(r => setTimeout(r, 1500)); 
                    enquiryForm.style.display = 'none';
                    if(refIdDisplay) refIdDisplay.textContent = refID;
                    if(successMessage) successMessage.style.display = 'block';
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
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});