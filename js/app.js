/* MVN FINHUB - UNIVERSAL LOGIC (NO SERVER REQUIRED) */

document.addEventListener('DOMContentLoaded', () => {
    console.log("System Initialized...");

    // 1. CONFIGURATION (Moved here to avoid Import errors)
    const CONFIG = {
        WHATSAPP_CODE: "OTE5ODc2NTQzMjEw", // Your encoded number
        EMAIL_ID: "mvnfinhub.connect@gmail.com"
    };

    // 2. NAVIGATION CURTAIN LOGIC
    const navBtn = document.querySelector('.nav-btn');
    const navCurtain = document.querySelector('.nav-curtain');
    
    if(navBtn && navCurtain) {
        navBtn.addEventListener('click', () => {
            navCurtain.classList.toggle('active');
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

    // 3. 3D CUBE SLIDER INITIALIZATION
    if (typeof Swiper !== 'undefined') {
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
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
        console.log("Cube Engine: ACTIVE");
    } else {
        console.error("Swiper Library not loaded!");
    }

    // 4. FLIP CARD LOGIC
    const cards = document.querySelectorAll('.flip-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
});

// GLOBAL UTILITY: CLIPBOARD COPY
window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("SECURELY COPIED: " + text);
    });
};
