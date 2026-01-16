import CONFIG from './config.js';

// --- NAV TOGGLE ---
const navBtn = document.querySelector('.nav-btn');
const navCurtain = document.querySelector('.nav-curtain');
if(navBtn) {
    navBtn.addEventListener('click', () => {
        navCurtain.classList.toggle('active');
        navBtn.innerHTML = navCurtain.classList.contains('active') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
}

// --- FLIP CARD LOGIC (SERVICES) ---
document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// --- TYPEWRITER EFFECT (HOME) ---
const brandText = document.querySelector('.brand-type');
if(brandText) {
    const text = "MVN FINHUB";
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            brandText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    setTimeout(typeWriter, 500);
}

// --- SUPABASE FORM LOGIC (CONTACT) ---
const contactForm = document.getElementById('secure-form');
if (contactForm && typeof supabase !== 'undefined') {
    const sb = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.querySelector('.submit-btn');
        btn.innerHTML = "TRANSMITTING... <i class='fa-solid fa-spinner fa-spin'></i>";
        
        const formData = {
            name: document.getElementById('name').value,
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        const { error } = await sb.from('contact_messages').insert([formData]);

        if (error) {
            alert('TRANSMISSION ERROR: ' + error.message);
            btn.innerHTML = "RETRY TRANSMISSION";
        } else {
            alert('SECURE TRANSMISSION SUCCESSFUL. REFERENCE ID: ' + Math.random().toString(36).substr(2, 9).toUpperCase());
            contactForm.reset();
            btn.innerHTML = "TRANSMIT REQUEST";
        }
    });
}

// --- CLIPBOARD COPY ---
window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("COPIED TO CLIPBOARD: " + text);
    });
}
