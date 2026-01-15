// js/app.js
import config from './config.js';

// Init Supabase
const { createClient } = window.supabase;
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

// Form Logic
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "TRANSMITTING...";
        btn.disabled = true;

        const formData = new FormData(contactForm);
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service_interest: formData.get('service'),
            message: formData.get('message'),
            created_at: new Date()
        };

        try {
            const { error } = await supabase.from('contact_messages').insert([payload]);

            if (error) {
                console.error("Supabase Error:", error);
                alert("Submission Error: " + error.message);
            } else {
                alert("Secure Transmission Successful!");
                contactForm.reset();
            }
        } catch (err) {
            console.error("Network Error:", err);
            alert("Connection Failed. Please check internet.");
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}
