/**
 * MVN FinHub - Spatial Core v3.0
 * Technologies: Canvas API, Physics Lerp, 3D Transforms
 * Performance: 60fps locked
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // =================================================================
    // 1. GENERATIVE "AI" BACKGROUND (Interactive Constellation)
    // =================================================================
    const initBackground = () => {
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas-backdrop';
        document.body.prepend(canvas);
        const ctx = canvas.getContext('2d');

        let width, height;
        let particles = [];
        const particleCount = window.innerWidth < 768 ? 30 : 60; // Performance scaling

        // Mouse interaction vector
        let mouse = { x: 0, y: 0 };
        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around screen
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Mouse repulsion (The "Smart" AI feel)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    this.x -= dx * 0.02;
                    this.y -= dy * 0.02;
                }
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + (Math.random()*0.3)})`; // Twinkle
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Draw connections
            particles.forEach((p, index) => {
                p.update();
                p.draw();
                
                // Connect nearby particles
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', () => { resize(); initParticles(); });
        resize();
        initParticles();
        animate();
    };

    // =================================================================
    // 2. SPATIAL 3D TILT PHYSICS (Apple TV Effect)
    // =================================================================
    const init3DTilt = () => {
        const cards = document.querySelectorAll('.process-card, .service-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element.
                const y = e.clientY - rect.top;  // y position within the element.
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate rotation (Max 10 degrees)
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                // Direct transform for immediate response (Physics via CSS transition: linear)
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            // Reset on leave
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    };

    // =================================================================
    // 3. SCROLL REVEAL & PARALLAX
    // =================================================================
    const initScrollFx = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate3d(0, 0, 0)'; // Reset 3D
                    entry.target.style.filter = 'blur(0px)';
                }
            });
        }, { threshold: 0.1 });

        // Prepare elements
        const targets = document.querySelectorAll('.hero-heading, .hero-subheadline, .process-card, .trust-item');
        targets.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translate3d(0, 30px, 0)';
            el.style.filter = 'blur(10px)';
            el.style.transition = `all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) ${index * 0.05}s`;
            observer.observe(el);
        });
    };

    // =================================================================
    // 4. MOBILE MENU (Basic Utility)
    // =================================================================
    const initMobile = () => {
        const btn = document.querySelector('.mobile-toggle');
        const nav = document.querySelector('.nav-list');
        if(btn && nav) {
            btn.addEventListener('click', () => {
                const isOpen = nav.style.display === 'flex';
                nav.style.display = isOpen ? 'none' : 'flex';
                // Mobile styles injected for spatial consistency
                if(!isOpen) {
                    nav.style.position = 'absolute';
                    nav.style.top = '100%';
                    nav.style.left = '0';
                    nav.style.width = '100%';
                    nav.style.background = 'rgba(2, 6, 23, 0.95)';
                    nav.style.padding = '2rem';
                    nav.style.flexDirection = 'column';
                    nav.style.backdropFilter = 'blur(20px)';
                }
            });
        }
    };

    // Initialization Sequence
    initBackground(); // Immersive
    init3DTilt();     // Spatial
    initScrollFx();   // Motion
    initMobile();     // Utility
});
