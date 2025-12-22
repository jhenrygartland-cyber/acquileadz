// Acquileadz Website JavaScript
// GSAP ScrollTrigger for scroll-linked animations

document.addEventListener('DOMContentLoaded', () => {
    // ===== COOKIE CONSENT BANNER =====
    const cookieBanner = document.querySelector('.cookie-banner');
    const cookieAccept = document.querySelector('.cookie-accept');
    const cookieDecline = document.querySelector('.cookie-decline');
    
    if (cookieBanner) {
        // Check if user has already made a choice
        const cookieChoice = localStorage.getItem('acquileadz_cookies');
        
        if (!cookieChoice) {
            // Show banner for fresh visits
            setTimeout(() => {
                cookieBanner.removeAttribute('hidden');
                cookieBanner.classList.add('visible');
            }, 1000); // Delay slightly for better UX
        }
        
        if (cookieAccept) {
            cookieAccept.addEventListener('click', () => {
                localStorage.setItem('acquileadz_cookies', 'all');
                hideCookieBanner();
                // Here you would initialize analytics if needed
            });
        }
        
        if (cookieDecline) {
            cookieDecline.addEventListener('click', () => {
                localStorage.setItem('acquileadz_cookies', 'essential');
                hideCookieBanner();
            });
        }
        
        function hideCookieBanner() {
            cookieBanner.classList.remove('visible');
            setTimeout(() => {
                cookieBanner.setAttribute('hidden', '');
            }, 300);
        }
    }

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Update aria-expanded for accessibility
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
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

    // ===== 3D DASHBOARD MOUSE EFFECT (full page width) =====
    const dashboard = document.getElementById('dashboard3d');
    
    if (dashboard) {
        // Track mouse across entire document for smooth effect
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            
            // Subtle rotation that follows cursor anywhere on page
            const rotateX = y * -6;
            const rotateY = x * 8;
            
            dashboard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        // Smooth reset when mouse leaves window
        document.addEventListener('mouseleave', () => {
            dashboard.style.transition = 'transform 0.5s ease-out';
            dashboard.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
            setTimeout(() => { dashboard.style.transition = ''; }, 500);
        });
    }

    // ===== GSAP SCROLL ANIMATIONS =====
    initGSAPAnimations();
});


// ===== CONTACT FORM (only on contact page) =====
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const result = document.getElementById('result');
    const emailInput = form.querySelector('input[name="email"]');
    const phoneInput = form.querySelector('input[name="phone"]');

    // Rate limiting configuration
    const RATE_LIMIT = {
        MAX_SUBMISSIONS: 3,
        TIME_WINDOW_MS: 60000, // 1 minute
        STORAGE_KEY: 'form_submissions'
    };

    // Check rate limit
    function checkRateLimit() {
        try {
            const submissions = JSON.parse(localStorage.getItem(RATE_LIMIT.STORAGE_KEY) || '[]');
            const now = Date.now();

            // Filter out old submissions outside time window
            const recentSubmissions = submissions.filter(time => now - time < RATE_LIMIT.TIME_WINDOW_MS);

            if (recentSubmissions.length >= RATE_LIMIT.MAX_SUBMISSIONS) {
                const oldestSubmission = Math.min(...recentSubmissions);
                const waitTime = Math.ceil((RATE_LIMIT.TIME_WINDOW_MS - (now - oldestSubmission)) / 1000);
                return { allowed: false, waitTime };
            }

            return { allowed: true };
        } catch (e) {
            return { allowed: true }; // Fail open if localStorage unavailable
        }
    }

    // Record submission
    function recordSubmission() {
        try {
            const submissions = JSON.parse(localStorage.getItem(RATE_LIMIT.STORAGE_KEY) || '[]');
            const now = Date.now();
            submissions.push(now);

            // Keep only recent submissions
            const recentSubmissions = submissions.filter(time => now - time < RATE_LIMIT.TIME_WINDOW_MS);
            localStorage.setItem(RATE_LIMIT.STORAGE_KEY, JSON.stringify(recentSubmissions));
        } catch (e) {
            // Silently fail if localStorage unavailable
        }
    }

    // Enhanced email validation (RFC 5322 compliant)
    function isValidEmail(email) {
        // Check length
        if (!email || email.length > 320) return false;

        // More robust email regex
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if (!emailRegex.test(email)) return false;

        // Check for suspicious patterns
        const suspiciousPatterns = [
            /\.\./,  // consecutive dots
            /^\./, // starts with dot
            /\.$/, // ends with dot
            /@\./,  // @ followed by dot
            /\.@/   // dot followed by @
        ];

        return !suspiciousPatterns.some(pattern => pattern.test(email));
    }

    // Enhanced phone validation
    function isValidPhone(phone) {
        if (!phone) return false;

        // Remove all non-digit characters
        const digitsOnly = phone.replace(/\D/g, '');

        // Must be between 10 and 15 digits (international format)
        if (digitsOnly.length < 10 || digitsOnly.length > 15) return false;

        // Check for suspicious patterns (all same digit)
        if (/^(.)\1+$/.test(digitsOnly)) return false;

        return true;
    }

    // Show message to user
    function showMessage(message, type) {
        if (!result) return;
        result.textContent = message;
        result.style.display = 'block';

        if (type === 'success') {
            result.style.backgroundColor = '#d4edda';
            result.style.color = '#155724';
            result.style.border = '1px solid #c3e6cb';
        } else if (type === 'error') {
            result.style.backgroundColor = '#f8d7da';
            result.style.color = '#721c24';
            result.style.border = '1px solid #f5c6cb';
        } else {
            result.style.backgroundColor = '#d1ecf1';
            result.style.color = '#0c5460';
            result.style.border = '1px solid #bee5eb';
        }
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Check rate limit
        const rateLimitCheck = checkRateLimit();
        if (!rateLimitCheck.allowed) {
            showMessage(`Too many submissions. Please wait ${rateLimitCheck.waitTime} seconds before trying again.`, 'error');
            return;
        }

        // Client-side validation
        if (!isValidEmail(emailInput.value)) {
            showMessage('Please enter a valid email address.', 'error');
            emailInput.focus();
            return;
        }

        if (!isValidPhone(phoneInput.value)) {
            showMessage('Please enter a valid phone number (at least 10 digits).', 'error');
            phoneInput.focus();
            return;
        }

        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton?.innerHTML || 'Send Message';

        try {
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = 'Sending...';
            }

            showMessage('Sending your message...', 'info');

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showMessage('✓ Message sent successfully! We\'ll get back to you soon.', 'success');
                form.reset();
                // Record successful submission for rate limiting
                recordSubmission();
                // Mark form as submitted for exit popup
                if (typeof sessionStorage !== 'undefined') {
                    sessionStorage.setItem('exitPopupDismissed', 'true');
                }
            } else {
                throw new Error(data.message || 'Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Something went wrong. Please try again or email us directly at hello@acquileadz.com', 'error');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
            // Auto-hide message after 8 seconds
            setTimeout(() => {
                if (result) result.style.display = 'none';
            }, 8000);
        }
    });
});
