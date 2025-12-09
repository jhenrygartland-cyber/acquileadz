// Acquileadz Website JavaScript
// Scroll animations using Intersection Observer (works in all browsers)

console.log('Acquileadz site loaded');

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

    // ===== 3D DASHBOARD MOUSE EFFECT =====
    const dashboard = document.getElementById('dashboard3d');
    const heroSection = document.querySelector('.hero');
    
    if (dashboard && heroSection) {
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
    }

    // ===== SCROLL ANIMATIONS =====
    initScrollAnimations();
});

// ===== SCROLL ANIMATION SYSTEM =====
function initScrollAnimations() {
    // Elements to animate on scroll
    const animatedSelectors = [
        '.metric',
        '.value-box',
        '.feature-card',
        '.service-card',
        '.service-detail',
        '.about-card',
        '.flow-step'
    ];

    // Set initial states for all animated elements
    animatedSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });

    // Create intersection observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    animatedSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            fadeObserver.observe(el);
        });
    });

    // Initialize process flow arrows
    initArrowAnimations();
    
    // Initialize success badge
    initSuccessBadge();
}

// ===== ARROW ANIMATIONS =====
function initArrowAnimations() {
    const arrowPaths = document.querySelectorAll('.arrow-path');
    const arrowHeads = document.querySelectorAll('.arrow-head');
    
    // Initialize arrow paths with stroke dash
    arrowPaths.forEach(path => {
        const length = path.getTotalLength ? path.getTotalLength() : 150;
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.transition = 'stroke-dashoffset 0.8s ease-out';
    });
    
    // Initialize arrow heads (hidden)
    arrowHeads.forEach(head => {
        head.style.opacity = '0';
        head.style.transition = 'opacity 0.4s ease-out 0.6s';
    });
    
    // Create observer for arrows
    const arrowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const connector = entry.target;
            const path = connector.querySelector('.arrow-path');
            const head = connector.querySelector('.arrow-head');
            
            if (entry.isIntersecting) {
                if (path) {
                    path.style.strokeDashoffset = '0';
                }
                if (head) {
                    head.style.opacity = '1';
                }
            } else {
                // Reset when out of view for re-animation
                if (path) {
                    const length = path.getTotalLength ? path.getTotalLength() : 150;
                    path.style.strokeDashoffset = length;
                }
                if (head) {
                    head.style.opacity = '0';
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all arrow connectors
    document.querySelectorAll('.arrow-connector').forEach(connector => {
        arrowObserver.observe(connector);
    });
}

// ===== SUCCESS BADGE ANIMATION =====
function initSuccessBadge() {
    const successCircle = document.querySelector('.success-circle');
    const successCheck = document.querySelector('.success-check');
    
    if (successCircle) {
        successCircle.style.strokeDasharray = '176';
        successCircle.style.strokeDashoffset = '176';
        successCircle.style.transition = 'stroke-dashoffset 0.8s ease-out';
    }
    
    if (successCheck) {
        successCheck.style.strokeDasharray = '60';
        successCheck.style.strokeDashoffset = '60';
        successCheck.style.transition = 'stroke-dashoffset 0.5s ease-out 0.5s';
    }
    
    const badge = document.querySelector('.success-badge');
    if (badge) {
        const badgeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (successCircle) successCircle.style.strokeDashoffset = '0';
                    if (successCheck) successCheck.style.strokeDashoffset = '0';
                } else {
                    if (successCircle) successCircle.style.strokeDashoffset = '176';
                    if (successCheck) successCheck.style.strokeDashoffset = '60';
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });
        
        badgeObserver.observe(badge);
    }
}

// ===== CONTACT FORM (only on contact page) =====
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
