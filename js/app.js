/* MVN FINHUB - MAIN LOGIC ENGINE */
import CONFIG from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NAVIGATION CURTAIN LOGIC ---
    const navBtn = document.querySelector('.nav-btn');
    const navCurtain = document.querySelector('.nav-curtain');
    
    if(navBtn && navCurtain) {
        navBtn.addEventListener('click', () => {
            navCurtain.classList.toggle('active');
            
            // Switch Icon (Bars <-> X)
            const icon = navBtn.querySelector('i');
            if (navCurtain.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 2. 3D CUBE SLIDER (HOMEPAGE) ---
    // We check if the element exists first to avoid errors on other pages
    if (document.querySelector('.mySwiper')) {
        // Initialize Swiper (The 3D Engine)
        // Note: Swiper is loaded from the CDN in index.html, so 'Swiper' global exists
        var swiper = new Swiper(".mySwiper", {
            effect: "cube",
            grabCursor: true,
            cubeEffect: {
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: true, // Stops spinning if user touches it
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }

    // --- 3. FLIP CARD LOGIC (SERVICES) ---
    const cards = document.querySelectorAll('.flip-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // --- 4. CLIPBOARD COPY (CONTACT PAGE) ---
    // We attach this to the window so HTML can see it
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert("SECURELY COPIED: " + text);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };
});
