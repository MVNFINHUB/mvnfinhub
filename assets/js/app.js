/**
 * MVN FINHUB - APP CONTROLLER (FINAL)
 * Handles: Database, Mobile Menu, and Footer Dark Mode.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION (PASTE YOUR KEYS HERE) ---
     const SUPABASE_URL = 'https://fviufivewglglnxhlmmf.supabase.co'; 
     const SUPABASE_KEY = 'sb_publishable_HYE7g0GyJbUfmldKTTAbeA_OUdc0Rah';'
    // -------------------------------------------

    // --- 1. DARK MODE LOGIC (STRICT FOOTER TARGET) ---
    // We target the specific ID we added to the HTML footer
    const themeBtn = document.getElementById('footer-theme-btn');
    const htmlElement = document.documentElement;

    // A. Check saved preference on load
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        // Update the icon to Sun if it's already dark mode
        if (themeBtn) themeBtn.textContent = '☀️';
    }

    // B. Toggle Function
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = htmlElement.getAttribute('data-theme') === 'dark';

            if (isDark) {
                // Switch to Light
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = '🌙'; 
            } else {
                // Switch to Dark
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeBtn.textContent = '☀️';
            }
        });
    }

    // --- 2. MOBILE MENU ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            // Toggle between Hamburger (☰) and Close (✕)
            menuToggle.textContent = isExpanded ? '✕' : '☰';
        });
    }

    // --- 3. DYNAMIC FOOTER YEAR ---
    // Automatically updates the year in the footer
    const yearSpan = document.querySelector('.copyright-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 4. FORM SUBMISSION (SUPABASE) ---
    const enquiryForm = document.getElementById('enquiryForm');
    const successMessage = document.getElementById('successMessage');
    const refIdDisplay = document.getElementById('refIdDisplay');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Check Consent Checkbox
            const consentCheckbox = document.getElementById('consent');
            if (consentCheckbox && !consentCheckbox.checked) {
                alert("Please agree to the Privacy Policy."); return;
            }

            const submitBtn = enquiryForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true; 
            submitBtn.textContent = 'Sending...';

            // Generate Reference ID: MVN-YYYY-RANDOM
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

                // Success State
                enquiryForm.style.display = 'none';
                if(refIdDisplay) refIdDisplay.textContent = refID;
                if(successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }

            } catch (error) {
                console.error(error);
                alert("Connection Error. Please try again.");
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});
