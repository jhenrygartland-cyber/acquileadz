// Acquileadz Website JavaScript
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
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
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
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== SCROLL REVEAL ANIMATIONS =====
    const animatedElements = document.querySelectorAll(
        'section, h1, h2, h3, h4, h5, p, .card, .service-card, .service-detail, .value-box, .feature-card, .process-step, .step, .metric, .cta-strip, .about-card, .contact-form input, .contact-form textarea, .contact-form button'
    );

    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => observer.observe(element));

    // ===== NAV SCROLL EFFECT =====
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== 3D DASHBOARD SCROLL & MOUSE ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = document.getElementById('dashboard3d');
    
    if (dashboard) {
        let scrollTicking = false;
        let mouseTicking = false;
        
        // Scroll animation - optimized
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const heroHeight = document.querySelector('.hero').offsetHeight;
                    
                    const scrollProgress = Math.min(scrolled / heroHeight, 1);
                    
                    const rotateX = scrollProgress * 10 - 5;
                    const rotateY = scrollProgress * 15 - 7.5;
                    const translateZ = scrollProgress * 20;
                    
                    dashboard.style.transform = `
                        rotateX(${rotateX}deg) 
                        rotateY(${rotateY}deg) 
                        translateZ(${translateZ}px)
                    `;
                    
                    scrollTicking = false;
                });
                
                scrollTicking = true;
            }
        }, { passive: true });
        
        // Mouse parallax - throttled for performance
        const heroSection = document.querySelector('.hero');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroSection && heroVisual) {
            let lastMouseMove = 0;
            
            heroSection.addEventListener('mousemove', (e) => {
                const now = Date.now();
                if (now - lastMouseMove < 50) return; // Throttle to every 50ms
                lastMouseMove = now;
                
                if (!mouseTicking) {
                    window.requestAnimationFrame(() => {
                        const rect = heroSection.getBoundingClientRect();
                        const x = (e.clientX - rect.left) / rect.width - 0.5;
                        const y = (e.clientY - rect.top) / rect.height - 0.5;
                        
                        dashboard.style.transform = `
                            rotateX(${y * -8}deg) 
                            rotateY(${x * 8}deg) 
                            translateZ(15px)
                        `;
                        
                        mouseTicking = false;
                    });
                    
                    mouseTicking = true;
                }
            }, { passive: true });
            
            // Reset on mouse leave
            heroSection.addEventListener('mouseleave', () => {
                dashboard.style.transition = 'transform 0.3s ease';
                dashboard.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
                setTimeout(() => {
                    dashboard.style.transition = '';
                }, 300);
            });
        }
    }
});

// ===== CONTACT FORM VALIDATION & ENHANCEMENT =====
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        const result = document.getElementById('result');
        
        // Email validation
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        
        // Phone validation (basic)
        function isValidPhone(phone) {
            return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
        }
        
        // Add real-time validation
        const emailInput = form.querySelector('input[name="email"]');
        const phoneInput = form.querySelector('input[name="phone"]');
        
        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                if (emailInput.value && !isValidEmail(emailInput.value)) {
                    emailInput.classList.add('error');
                } else {
                    emailInput.classList.remove('error');
                }
            });
        }
        
        if (phoneInput) {
            phoneInput.addEventListener('blur', () => {
                if (phoneInput.value && !isValidPhone(phoneInput.value)) {
                    phoneInput.classList.add('error');
                } else {
                    phoneInput.classList.remove('error');
                }
            });
        }
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate before sending
            const email = emailInput.value;
            const phone = phoneInput.value;
            
            if (!isValidEmail(email)) {
                result.innerHTML = "Please enter a valid email address.";
                result.style.display = "block";
                result.style.backgroundColor = "#f8d7da";
                result.style.color = "#721c24";
                emailInput.classList.add('error');
                return;
            }
            
            if (!isValidPhone(phone)) {
                result.innerHTML = "Please enter a valid phone number.";
                result.style.display = "block";
                result.style.backgroundColor = "#f8d7da";
                result.style.color = "#721c24";
                phoneInput.classList.add('error');
                return;
            }
            
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending<span class="loading-spinner"></span>';
            
            result.innerHTML = "Sending your message...";
            result.style.display = "block";
            result.style.backgroundColor = "#d1ecf1";
            result.style.color = "#0c5460";

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "✓ Message sent successfully! We'll get back to you soon.";
                    result.style.backgroundColor = "#d4edda";
                    result.style.color = "#155724";
                    form.reset();
                    emailInput.classList.remove('error');
                    phoneInput.classList.remove('error');
                } else {
                    console.log(response);
                    result.innerHTML = json.message || "Something went wrong. Please try again.";
                    result.style.backgroundColor = "#f8d7da";
                    result.style.color = "#721c24";
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong. Please try again.";
                result.style.backgroundColor = "#f8d7da";
                result.style.color = "#721c24";
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                setTimeout(() => {
                    result.style.display = "none";
                }, 5000);
            });
        });
    }
});

// ============================================
// SCROLL-DRIVEN PROCESS FLOW (APPLE-STYLE)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const spiralProcess = document.getElementById('spiralProcess');

    if (spiralProcess) {
        const flowSteps = spiralProcess.querySelectorAll('.flow-step');
        console.log('🎬 Scroll-driven animation initialized. Steps found:', flowSteps.length);

        // Utility to clamp values for smooth scrubbing
        const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

        // Add a visible scrub bar up front so the first render has something to update
        const progressBar = document.createElement('div');
        progressBar.className = 'process-progress-bar';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        spiralProcess.appendChild(progressBar);

        const progressFill = progressBar.querySelector('.progress-fill');
        const arrowLengthCache = new WeakMap();

        // Make first step visible immediately
        if (flowSteps.length > 0) {
            const firstStep = flowSteps[0];
            firstStep.style.opacity = '1';
            firstStep.style.visibility = 'visible';
            firstStep.style.transform = 'translateY(0) scale(1)';
            
            // Show first step letters
            const firstLetters = firstStep.querySelectorAll('.letter');
            firstLetters.forEach(letter => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0)';
            });
        }
        
        function updateAnimationsOnScroll() {
            const processTop = spiralProcess.offsetTop;
            const processHeight = spiralProcess.offsetHeight;
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            // Map scroll position to a single normalized value for frame-by-frame scrubbing
            const scrubStart = processTop - viewportHeight * 0.35;
            const scrubEnd = processTop + processHeight - viewportHeight * 0.25;
            const scrubProgress = clamp((scrollY - scrubStart) / (scrubEnd - scrubStart));

            flowSteps.forEach((step, index) => {
                const totalSteps = flowSteps.length;
                const segmentSize = 1 / totalSteps;
                const segmentStart = segmentSize * index;
                const stepProgress = clamp((scrubProgress - segmentStart) / segmentSize);

                // First step still reacts to scrub so it feels alive
                if (index === 0) {
                    const introReveal = clamp(stepProgress * 1.2);
                    const introScale = 0.96 + (0.04 * introReveal);
                    const introY = 12 - (12 * introReveal);
                    step.style.opacity = '1';
                    step.style.visibility = 'visible';
                    step.style.transform = `translateY(${introY}px) scale(${introScale})`;

                    const introLetters = step.querySelectorAll('.letter');
                    introLetters.forEach((letter, letterIndex) => {
                        const letterDelay = letterIndex * 0.02;
                        const letterProgress = clamp((introReveal - letterDelay) / 0.5);
                        letter.style.opacity = letterProgress;
                        const letterY = 15 - (15 * letterProgress);
                        letter.style.transform = `translateY(${letterY}px)`;
                    });
                    return;
                }

                // Previous arrow connects to this step
                const previousStep = flowSteps[index - 1];
                const arrow = previousStep.querySelector('.arrow-connector');

                // Arrow draws during the first half of the segment
                const arrowProgress = clamp(stepProgress / 0.55);
                if (arrow) {
                    const arrowPath = arrow.querySelector('.arrow-path');
                    const arrowHead = arrow.querySelector('.arrow-head');

                    if (!arrowLengthCache.has(arrowPath)) {
                        arrowLengthCache.set(arrowPath, arrowPath.getTotalLength());
                    }

                    const totalLength = arrowLengthCache.get(arrowPath);
                    if (arrowProgress > 0) {
                        arrow.style.opacity = '1';
                        arrow.style.visibility = 'visible';

                        const drawLength = totalLength * (1 - arrowProgress);
                        arrowPath.style.strokeDasharray = totalLength;
                        arrowPath.style.strokeDashoffset = drawLength;

                        const headOpacity = clamp((arrowProgress - 0.65) / 0.35);
                        arrowHead.style.opacity = headOpacity;
                    } else {
                        arrow.style.opacity = '0';
                        arrow.style.visibility = 'hidden';
                        arrowPath.style.strokeDashoffset = totalLength;
                        arrowHead.style.opacity = '0';
                    }
                }

                // Step fades and scales in after arrow has begun drawing
                const boxReveal = clamp((stepProgress - 0.25) / 0.75);
                if (boxReveal > 0) {
                    const scale = 0.9 + (0.1 * boxReveal);
                    const translateY = 60 - (60 * boxReveal);
                    step.style.opacity = boxReveal;
                    step.style.visibility = 'visible';
                    step.style.transform = `translateY(${translateY}px) scale(${scale})`;
                    step.classList.toggle('active', boxReveal > 0.55);

                    // Animate letters like a type-on tied to scroll speed
                    const letters = step.querySelectorAll('.letter');
                    letters.forEach((letter, letterIndex) => {
                        const letterDelay = letterIndex * 0.02;
                        const letterProgress = clamp((boxReveal - letterDelay) / 0.45);
                        letter.style.opacity = letterProgress;
                        const letterY = 15 - (15 * letterProgress);
                        letter.style.transform = `translateY(${letterY}px)`;
                    });
                } else {
                    step.style.opacity = '0';
                    step.style.visibility = 'hidden';
                    step.style.transform = 'translateY(60px) scale(0.9)';
                    step.classList.remove('active');

                    const letters = step.querySelectorAll('.letter');
                    letters.forEach(letter => {
                        letter.style.opacity = '0';
                        letter.style.transform = 'translateY(15px)';
                    });
                }
            });

            if (progressFill) {
                progressFill.style.height = `${scrubProgress * 100}%`;
            }
        }
        
        // Use requestAnimationFrame for smooth 60fps updates
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateAnimationsOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        // Initial render
        setTimeout(() => {
            updateAnimationsOnScroll();
            console.log('✅ Initial animation update complete');
        }, 100);
        
        console.log('✅ Scroll-driven animation setup complete');
    } else {
        console.error('❌ Could not find #spiralProcess element');
    }
});

// ===== LETTER ANIMATION ENHANCEMENT =====
document.addEventListener('DOMContentLoaded', () => {
    const animatedTexts = document.querySelectorAll('.animated-text');
    
    animatedTexts.forEach(text => {
        const letters = text.querySelectorAll('.letter');
        
        // Add hover effect - letters bounce on hover
        text.addEventListener('mouseenter', () => {
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.animation = 'letterBounce 0.4s ease';
                }, index * 30);
            });
        });
        
        text.addEventListener('mouseleave', () => {
            letters.forEach(letter => {
                letter.style.animation = '';
            });
        });
    });
    
    // Add bounce animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes letterBounce {
            0%, 100% { transform: translateY(0) rotateX(0deg); }
            50% { transform: translateY(-8px) rotateX(10deg); }
        }
    `;
    document.head.appendChild(style);
});

// ===== MOBILE TOUCH OPTIMIZATION =====
if ('ontouchstart' in window) {
    document.addEventListener('DOMContentLoaded', () => {
        const flowSteps = document.querySelectorAll('.flow-step');
        
        flowSteps.forEach(step => {
            // Reduce motion for better mobile performance
            step.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
}
