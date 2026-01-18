/**
 * MVN FINHUB - APP CONTROLLER (FINAL)
 * Handles: Mobile Menu and Database.
 * Note: Dark Mode logic is now handled inline in the HTML files 
 * to ensure zero-latency switching.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOBILE MENU LOGIC
    // ==========================================
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Optional: Change icon from Hamburger to X
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.textContent = isExpanded ? '✕' : '☰';
        });
    }

    // ==========================================
    // 2. DYNAMIC FOOTER YEAR
    // ==========================================
    const yearSpan = document.querySelector('.copyright-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();


    // ==========================================
    // 3. DATABASE & FORM LOGIC (SUPABASE)
    // ==========================================
    
    // --- CONFIGURATION ---
    // Replace these with your actual Supabase URL and Key when ready.
    const SUPABASE_URL = "https://fviufivewglglnxhlmmf.supabase.co"; 
    const SUPABASE_KEY = "sb_publishable_HYE7g0GyJbUfmldKTTAbeA_OUdc0Rah";
    // ---------------------

    const enquiryForm = document.getElementById('enquiryForm');
    const successMessage = document.getElementById('successMessage');
    const refIdDisplay = document.getElementById('refIdDisplay');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Check Consent
            const consentCheckbox = document.getElementById('consent');
            if (consentCheckbox && !consentCheckbox.checked) {
                alert("Please agree to the Privacy Policy."); return;
            }

            // Lock Button
            const submitBtn = enquiryForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true; 
            submitBtn.textContent = 'Sending...';

            // Generate Ref ID (MVN-YEAR-RANDOM)
            const refID = `MVN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

            // Collect Data
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
                // Check if Database is configured
                if(!SUPABASE_URL || !SUPABASE_KEY) {
                    console.warn("Supabase not configured. Simulating success.");
                    // Simulate success for demo purposes if no DB keys
                    await new Promise(r => setTimeout(r, 1500)); 
                    
                    // Show Success
                    enquiryForm.style.display = 'none';
                    if(refIdDisplay) refIdDisplay.textContent = refID;
                    if(successMessage) successMessage.style.display = 'block';
                    return; 
                }

                // Send to Supabase
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
                alert("Message could not be sent. Please contact us directly.");
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});
