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
// BUTTER SMOOTH SCROLL-DRIVEN ANIMATION
// Frame-by-frame video-like control
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const spiralProcess = document.getElementById('spiralProcess');
    
    if (spiralProcess) {
        const flowSteps = spiralProcess.querySelectorAll('.flow-step');
        console.log('🎬 Ultra-smooth scroll animation initialized. Steps:', flowSteps.length);
        
        // Cache arrow path lengths for performance
        const arrowLengthCache = new WeakMap();
        
        // Always show first step
        if (flowSteps.length > 0) {
            const firstStep = flowSteps[0];
            firstStep.style.opacity = '1';
            firstStep.style.visibility = 'visible';
            firstStep.style.transform = 'translateY(0) scale(1)';
            
            const firstLetters = firstStep.querySelectorAll('.letter');
            firstLetters.forEach(letter => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0) scale(1)';
            });
        }
        
        // Smooth easing functions for natural motion
        function easeOutQuart(x) {
            return 1 - Math.pow(1 - x, 4);
        }
        
        function easeInOutCubic(x) {
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        }
        
        function updateAnimationsOnScroll() {
            const processTop = spiralProcess.offsetTop;
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            
            flowSteps.forEach((step, index) => {
                if (index === 0) return; // Skip first step
                
                const stepTop = step.offsetTop + processTop;
                const stepHeight = step.offsetHeight;
                
                // Calculate progress through this step's animation zone
                // Each step gets more scroll space for smoother control
                const animationStartY = stepTop - (viewportHeight * 0.8);
                const animationEndY = stepTop - (viewportHeight * 0.2);
                const animationRange = animationEndY - animationStartY;
                
                // Raw progress (0 to 1)
                const rawProgress = (scrollY - animationStartY) / animationRange;
                const progress = Math.max(0, Math.min(1, rawProgress));
                
                // Get elements
                const previousStep = flowSteps[index - 1];
                const arrow = previousStep ? previousStep.querySelector('.arrow-connector') : null;
                
                if (!arrow) return;
                
                const arrowPath = arrow.querySelector('.arrow-path');
                const arrowHead = arrow.querySelector('.arrow-head');
                const letters = step.querySelectorAll('.letter');
                
                // Cache path length
                if (!arrowLengthCache.has(arrowPath)) {
                    arrowLengthCache.set(arrowPath, arrowPath.getTotalLength());
                }
                const pathLength = arrowLengthCache.get(arrowPath);
                
                // PHASE 1: Line Drawing (0% - 50% of progress)
                const linePhaseProgress = Math.max(0, Math.min(1, progress / 0.5));
                const lineProgress = easeInOutCubic(linePhaseProgress);
                
                // PHASE 2: Arrow Head (45% - 55% of progress)
                const arrowHeadPhaseStart = 0.45;
                const arrowHeadPhaseEnd = 0.55;
                const arrowHeadPhaseProgress = Math.max(0, Math.min(1, 
                    (progress - arrowHeadPhaseStart) / (arrowHeadPhaseEnd - arrowHeadPhaseStart)
                ));
                const arrowHeadProgress = easeOutQuart(arrowHeadPhaseProgress);
                
                // PHASE 3: Box Fade (50% - 75% of progress)
                const boxPhaseStart = 0.5;
                const boxPhaseEnd = 0.75;
                const boxPhaseProgress = Math.max(0, Math.min(1,
                    (progress - boxPhaseStart) / (boxPhaseEnd - boxPhaseStart)
                ));
                const boxProgress = easeOutQuart(boxPhaseProgress);
                
                // PHASE 4: Letters (60% - 100% of progress)
                const lettersPhaseStart = 0.6;
                const lettersPhaseEnd = 1.0;
                const lettersPhaseProgress = Math.max(0, Math.min(1,
                    (progress - lettersPhaseStart) / (lettersPhaseEnd - lettersPhaseStart)
                ));
                
                // === APPLY LINE DRAWING ===
                if (lineProgress > 0) {
                    arrow.style.opacity = '1';
                    arrow.style.visibility = 'visible';
                    
                    const drawLength = pathLength - (pathLength * lineProgress);
                    arrowPath.style.strokeDasharray = pathLength;
                    arrowPath.style.strokeDashoffset = drawLength;
                } else {
                    arrow.style.opacity = '0';
                    arrow.style.visibility = 'hidden';
                }
                
                // === APPLY ARROW HEAD ===
                if (arrowHeadProgress > 0) {
                    arrowHead.style.opacity = arrowHeadProgress;
                    arrowHead.style.transform = `scale(${0.5 + (0.5 * arrowHeadProgress)})`;
                } else {
                    arrowHead.style.opacity = '0';
                    arrowHead.style.transform = 'scale(0.5)';
                }
                
                // === APPLY BOX FADE ===
                if (boxProgress > 0) {
                    step.style.opacity = boxProgress;
                    step.style.visibility = 'visible';
                    
                    const scale = 0.92 + (0.08 * boxProgress);
                    const translateY = 40 - (40 * boxProgress);
                    step.style.transform = `translateY(${translateY}px) scale(${scale})`;
                    
                    // Add active class for special effects
                    if (boxProgress > 0.6) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                } else {
                    step.style.opacity = '0';
                    step.style.visibility = 'hidden';
                    step.style.transform = 'translateY(40px) scale(0.92)';
                    step.classList.remove('active');
                }
                
                // === APPLY LETTERS ===
                if (lettersPhaseProgress > 0) {
                    letters.forEach((letter, letterIndex) => {
                        // Stagger letters
                        const letterDelay = (letterIndex / letters.length) * 0.4;
                        const letterProgress = Math.max(0, Math.min(1,
                            (lettersPhaseProgress - letterDelay) / 0.6
                        ));
                        const easedLetterProgress = easeOutQuart(letterProgress);
                        
                        if (easedLetterProgress > 0) {
                            letter.style.opacity = easedLetterProgress;
                            const letterY = 12 - (12 * easedLetterProgress);
                            const letterScale = 0.8 + (0.2 * easedLetterProgress);
                            letter.style.transform = `translateY(${letterY}px) scale(${letterScale})`;
                        } else {
                            letter.style.opacity = '0';
                            letter.style.transform = 'translateY(12px) scale(0.8)';
                        }
                    });
                } else {
                    letters.forEach(letter => {
                        letter.style.opacity = '0';
                        letter.style.transform = 'translateY(12px) scale(0.8)';
                    });
                }
            });
            
            // Update progress bar
            const progressFill = spiralProcess.querySelector('.progress-fill');
            if (progressFill) {
                const processHeight = spiralProcess.offsetHeight;
                const progress = Math.max(0, Math.min(1,
                    (scrollY - processTop + viewportHeight / 2) / processHeight
                ));
                progressFill.style.height = `${progress * 100}%`;
            }
        }
        
        // High-performance scroll handler with requestAnimationFrame
        let ticking = false;
        let lastKnownScrollPosition = 0;
        
        window.addEventListener('scroll', () => {
            lastKnownScrollPosition = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateAnimationsOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        // Also update on resize
        window.addEventListener('resize', () => {
            updateAnimationsOnScroll();
        }, { passive: true });
        
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'process-progress-bar';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        spiralProcess.appendChild(progressBar);
        
        // Initial render
        setTimeout(() => {
            updateAnimationsOnScroll();
            console.log('✅ Ultra-smooth animation ready!');
        }, 100);
    }
});
