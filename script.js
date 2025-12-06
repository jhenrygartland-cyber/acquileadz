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
// ANIMATED SPIRAL PROCESS FLOW
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const spiralProcess = document.getElementById('spiralProcess');
    
    if (spiralProcess) {
        const flowSteps = spiralProcess.querySelectorAll('.flow-step');
        
        // Intersection Observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.15, // Trigger when 15% of element is visible
            rootMargin: '0px 0px -20% 0px' // Trigger when element is 20% from bottom of screen
        };
        
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Small delay before adding visible class for smoother effect
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 50);
                    
                    // Unobserve after animation (one-time animation)
                    stepObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe each flow step
        flowSteps.forEach(step => {
            stepObserver.observe(step);
        });
        
        // ===== PROGRESS INDICATOR =====
        // Create progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'process-progress-bar';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        spiralProcess.appendChild(progressBar);
        
        const progressFill = progressBar.querySelector('.progress-fill');
        
        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const rect = spiralProcess.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const processTop = spiralProcess.offsetTop;
            const processHeight = spiralProcess.offsetHeight;
            
            const progress = Math.max(0, Math.min(1, 
                (scrolled - processTop + window.innerHeight / 2) / processHeight
            ));
            
            progressFill.style.height = `${progress * 100}%`;
        }, { passive: true });
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
