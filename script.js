// Acquileadz Website JavaScript with GSAP ScrollTrigger
console.log('Acquileadz site loaded successfully');

document.addEventListener('DOMContentLoaded', () => {
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== NAV SCROLL EFFECT =====
    let navTicking = false;
    window.addEventListener('scroll', () => {
        if (!navTicking) {
            window.requestAnimationFrame(() => {
                const nav = document.querySelector('.nav');
                if (window.pageYOffset > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                navTicking = false;
            });
            navTicking = true;
        }
    }, { passive: true });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== 3D DASHBOARD MOUSE ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = document.getElementById('dashboard3d');
    if (!dashboard) return;
    
    const heroSection = document.querySelector('.hero');
    
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        dashboard.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateZ(15px)`;
    });
    
    heroSection.addEventListener('mouseleave', () => {
        dashboard.style.transition = 'transform 0.3s ease';
        dashboard.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        setTimeout(() => { dashboard.style.transition = ''; }, 300);
    });
});

// ===== CONTACT FORM =====
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const result = document.getElementById('result');
    const emailInput = form.querySelector('input[name="email"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function isValidPhone(phone) {
        return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!isValidEmail(emailInput.value)) {
            result.innerHTML = "Please enter a valid email address.";
            result.style.display = "block";
            result.style.backgroundColor = "#f8d7da";
            result.style.color = "#721c24";
            return;
        }
        
        if (!isValidPhone(phoneInput.value)) {
            result.innerHTML = "Please enter a valid phone number.";
            result.style.display = "block";
            result.style.backgroundColor = "#f8d7da";
            result.style.color = "#721c24";
            return;
        }
        
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData));
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
        result.innerHTML = "Sending your message...";
        result.style.display = "block";
        result.style.backgroundColor = "#d1ecf1";
        result.style.color = "#0c5460";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: json
        })
        .then(async (response) => {
            let data = await response.json();
            if (response.status == 200) {
                result.innerHTML = "✓ Message sent successfully!";
                result.style.backgroundColor = "#d4edda";
                result.style.color = "#155724";
                form.reset();
            } else {
                result.innerHTML = data.message || "Something went wrong.";
                result.style.backgroundColor = "#f8d7da";
                result.style.color = "#721c24";
            }
        })
        .catch(() => {
            result.innerHTML = "Something went wrong. Please try again.";
            result.style.backgroundColor = "#f8d7da";
            result.style.color = "#721c24";
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            setTimeout(() => { result.style.display = "none"; }, 5000);
        });
    });
});

// ============================================
// GSAP SCROLL-TRIGGERED PROCESS ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    const container = document.getElementById('spiralProcess');
    if (!container) return;
    
    const steps = container.querySelectorAll('.flow-step');
    console.log('🎬 GSAP ScrollTrigger initialized. Steps:', steps.length);
    
    // Set initial states
    gsap.set(steps, {
        opacity: 0,
        y: 60,
        scale: 0.9
    });
    
    // Set initial state for arrows
    steps.forEach(step => {
        const path = step.querySelector('.arrow-path');
        const head = step.querySelector('.arrow-head');
        
        if (path) {
            const length = path.getTotalLength();
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length
            });
        }
        
        if (head) {
            gsap.set(head, { opacity: 0, scale: 0.5 });
        }
    });
    
    // Make first step visible immediately
    gsap.set(steps[0], { opacity: 1, y: 0, scale: 1 });
    
    // Animate first step's arrow when scrolling starts
    const firstArrowPath = steps[0].querySelector('.arrow-path');
    const firstArrowHead = steps[0].querySelector('.arrow-head');
    
    if (firstArrowPath) {
        const firstLength = firstArrowPath.getTotalLength();
        
        gsap.to(firstArrowPath, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: steps[1],
                start: "top 90%",
                end: "top 50%",
                scrub: 1
            }
        });
        
        if (firstArrowHead) {
            gsap.to(firstArrowHead, {
                opacity: 1,
                scale: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: steps[1],
                    start: "top 60%",
                    end: "top 50%",
                    scrub: 1
                }
            });
        }
    }
    
    // Animate each step (starting from step 2)
    steps.forEach((step, index) => {
        if (index === 0) return; // Skip first step
        
        const stepBox = step.querySelector('.step-box');
        const title = step.querySelector('.animated-text');
        const description = step.querySelector('.step-box p');
        const arrowPath = step.querySelector('.arrow-path');
        const arrowHead = step.querySelector('.arrow-head');
        
        // Create timeline for this step
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: step,
                start: "top 85%",
                end: "top 25%",
                scrub: 1,
                // markers: true // Uncomment to debug
            }
        });
        
        // Step box fades in and scales up
        tl.to(step, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        });
        
        // Title animates
        if (title) {
            tl.from(title, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.out"
            }, "-=0.2");
        }
        
        // Description fades in
        if (description) {
            tl.from(description, {
                opacity: 0,
                y: 10,
                duration: 0.3,
                ease: "power2.out"
            }, "-=0.2");
        }
        
        // Arrow draws (if not last step)
        if (arrowPath && index < steps.length - 1) {
            const pathLength = arrowPath.getTotalLength();
            
            tl.to(arrowPath, {
                strokeDashoffset: 0,
                duration: 0.4,
                ease: "none"
            }, "-=0.1");
            
            if (arrowHead) {
                tl.to(arrowHead, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.2,
                    ease: "back.out(1.7)"
                }, "-=0.1");
            }
        }
        
        // Special animation for final step's success badge
        if (index === steps.length - 1) {
            const successCircle = step.querySelector('.success-circle');
            const successCheck = step.querySelector('.success-check');
            
            if (successCircle) {
                gsap.set(successCircle, {
                    strokeDasharray: 176,
                    strokeDashoffset: 176
                });
                
                tl.to(successCircle, {
                    strokeDashoffset: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.1");
            }
            
            if (successCheck) {
                gsap.set(successCheck, {
                    strokeDasharray: 60,
                    strokeDashoffset: 60
                });
                
                tl.to(successCheck, {
                    strokeDashoffset: 0,
                    duration: 0.3,
                    ease: "power2.out"
                }, "-=0.2");
            }
        }
    });
    
    // Add active class on scroll for visual effects
    steps.forEach((step, index) => {
        if (index === 0) {
            step.classList.add('active', 'visible');
            return;
        }
        
        ScrollTrigger.create({
            trigger: step,
            start: "top 60%",
            end: "top 30%",
            onEnter: () => {
                step.classList.add('active', 'visible');
            },
            onLeaveBack: () => {
                step.classList.remove('active');
            }
        });
    });
    
    console.log('✅ GSAP Process animation ready!');
});

// ===== GENERAL SCROLL REVEAL (for other sections) =====
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;
    
    // Fade in metrics
    gsap.utils.toArray('.metric').forEach((metric, i) => {
        gsap.from(metric, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: metric,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Fade in value boxes
    gsap.utils.toArray('.value-box').forEach((box, i) => {
        gsap.from(box, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: box,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Fade in feature cards
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Fade in service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            delay: i * 0.08,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });
});
