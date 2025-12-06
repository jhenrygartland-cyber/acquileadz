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
    }, { threshold: 0.15 });

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
        let ticking = false;
        
        // Scroll animation
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const heroHeight = document.querySelector('.hero').offsetHeight;
                    
                    const scrollProgress = Math.min(scrolled / heroHeight, 1);
                    
                    const rotateX = scrollProgress * 15 - 7.5;
                    const rotateY = scrollProgress * 20 - 10;
                    const translateZ = scrollProgress * 30;
                    
                    dashboard.style.transform = `
                        rotateX(${rotateX}deg) 
                        rotateY(${rotateY}deg) 
                        translateZ(${translateZ}px)
                    `;
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
        
        // Extended mouse move parallax effect - track entire hero section
        const heroSection = document.querySelector('.hero');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroSection && heroVisual) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                dashboard.style.transform = `
                    rotateX(${y * -10}deg) 
                    rotateY(${x * 10}deg) 
                    translateZ(20px)
                `;
            });
            
            // Reset on mouse leave
            heroSection.addEventListener('mouseleave', () => {
                dashboard.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
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
