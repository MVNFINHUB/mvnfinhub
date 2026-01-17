/**
 * MVN FINHUB - FORM HANDLING LOGIC
 * -------------------------------------------------------
 * Manages the Enquiry Form submission.
 * In Phase 1: Validates input and simulates submission (Demo Mode).
 * In Phase 2: This will send data to Supabase.
 */

document.addEventListener('DOMContentLoaded', () => {

    const enquiryForm = document.getElementById('enquiryForm');
    const successMessage = document.getElementById('successMessage');
    const refIdDisplay = document.getElementById('refIdDisplay');

    // Only run this logic if the form exists on the current page
    if (enquiryForm) {

        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the page from reloading

            // 1. BASIC VALIDATION
            // (HTML5 'required' attributes handle most of this, but we add a double-check)
            const consentCheckbox = document.getElementById('consent');
            if (!consentCheckbox.checked) {
                alert("You must agree to the Privacy Policy to proceed.");
                return;
            }

            // 2. DISABLE BUTTON (Prevent double-clicking)
            const submitBtn = enquiryForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';

            // 3. SIMULATE SERVER DELAY (Makes it feel real)
            setTimeout(() => {
                
                // 4. GENERATE REFERENCE ID (Audit Trail)
                // Format: MVN-YYYY-RANDOM (e.g., MVN-2024-83921)
                const currentYear = new Date().getFullYear();
                const randomNum = Math.floor(10000 + Math.random() * 90000);
                const referenceID = `MVN-${currentYear}-${randomNum}`;

                // 5. UPDATE UI
                if (refIdDisplay) {
                    refIdDisplay.textContent = referenceID;
                }

                // Hide Form
                enquiryForm.style.display = 'none';
                
                // Show Success Message
                if (successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }

                console.log(`Enquiry Logged: ${referenceID}`); // For debugging

            }, 1500); // 1.5 second delay
        });
    }
});
