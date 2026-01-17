/**
 * MVN FINHUB - MAIN LOGIC (UNIFIED)
 * -------------------------------------------------------
 * Handles:
 * 1. Mobile Menu (UI)
 * 2. Footer Dates (UI)
 * 3. Contact Form Submission (Database Connection)
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION (PASTE YOUR SUPABASE KEYS HERE) ---
    const SUPABASE_URL = 'https://fviufivewglglnxhlmmf.supabase.co'; 
    const SUPABASE_KEY = 'sb_publishable_HYE7g0GyJbUfmldKTTAbeA_OUdc0Rah';
    // -------------------------------------------------------

    console.log('MVN FinHub: System Active');

    /* =========================================
       PART 1: UI LOGIC (MENU & DATES)
       ========================================= */
    
    // Dynamic Footer Year
    const copyrightSpan = document.querySelector('.copyright-year');
    if (copyrightSpan) {
        copyrightSpan.textContent = new Date().getFullYear();
    }

    // Mobile Menu Logic
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            menuToggle.textContent = !isExpanded ? '✕' : '☰';
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.textContent = '☰';
                }
            }
        });
    });

    /* =========================================
       PART 2: DATABASE LOGIC (SUPABASE)
       ========================================= */

    const enquiryForm = document.getElementById('enquiryForm');
    const successMessage = document.getElementById('successMessage');
    const refIdDisplay = document.getElementById('refIdDisplay');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // 1. Validate Consent
            const consentCheckbox = document.getElementById('consent');
            if (!consentCheckbox.checked) {
                alert("You must agree to the Privacy Policy to proceed.");
                return;
            }

            // 2. Lock Button
            const submitBtn = enquiryForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // 3. Prepare Data
            const formData = {
                full_name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service_type: document.getElementById('service').value,
                message: document.getElementById('message').value,
                reference_id: `MVN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
                status: 'New'
            };

            try {
                // 4. Send to Supabase via REST API (No external script needed)
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

                if (!response.ok) throw new Error('Network response was not ok');

                // 5. Success State
                if (refIdDisplay) refIdDisplay.textContent = formData.reference_id;
                enquiryForm.style.display = 'none';
                if (successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }

            } catch (error) {
                console.error('Error:', error);
                alert("Unable to send enquiry. Please check your connection or contact us directly.");
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});
