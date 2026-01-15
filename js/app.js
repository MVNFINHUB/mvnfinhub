// js/app.js
// v2.0 - Top 1% Logic (No Alerts, 3D Tilt)

import config from './config.js';

// --- 1. TOAST NOTIFICATION SYSTEM ---
const showToast = (message, type = 'info') => {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    if (type === 'error') toast.style.borderLeftColor = '#ff6b6b';
    
    container.appendChild(toast);
    
    // Animation
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
};

// --- 2. 3D TILT ENGINE ---
const initTilt = () => {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg tilt
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        });
    });
};

// --- 3. MOBILE MENU ---
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.toggle('active'));
}

// --- 4. FORM HANDLER ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Offline Check
        if (!navigator.onLine) {
            showToast('You are offline. Please check connection.', 'error');
            return;
        }

        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "Processing...";
        btn.disabled = true;

        // Simulate Network Request (Replace with Supabase Logic)
        setTimeout(() => {
            showToast('Enquiry received. We will contact you shortly.');
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', initTilt);
