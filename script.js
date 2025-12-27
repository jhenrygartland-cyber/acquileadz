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

function initGSAPAnimations() {
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.log('GSAP not loaded - skipping animations');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ===== METRICS SECTION =====
    gsap.utils.toArray('.metric').forEach((metric, i) => {
        gsap.fromTo(metric, 
            { 
                opacity: 0, 
                y: 50 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: metric,
                    start: 'top 85%',
                    end: 'top 50%',
                    scrub: 1
                }
            }
        );
    });

    // ===== VALUE BOXES =====
    gsap.utils.toArray('.value-box').forEach((box, i) => {
        gsap.fromTo(box,
            { 
                opacity: 0, 
                y: 50 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: box,
                    start: 'top 85%',
                    end: 'top 50%',
                    scrub: 1
                }
            }
        );
    });

    // ===== FEATURE CARDS =====
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.fromTo(card,
            { 
                opacity: 0, 
                y: 50 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'top 50%',
                    scrub: 1
                }
            }
        );
    });

    // ===== TESTIMONIAL CARDS =====
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.fromTo(card,
            { 
                opacity: 0, 
                y: 40 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    end: 'top 60%',
                    scrub: 1
                }
            }
        );
    });

    // ===== SERVICE DETAIL CARDS (services page) =====
    gsap.utils.toArray('.service-detail').forEach((card, i) => {
        gsap.fromTo(card,
            { 
                opacity: 0, 
                y: 50 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'top 50%',
                    scrub: 1
                }
            }
        );
    });

    // ===== PROBLEM ITEMS (services page) =====
    gsap.utils.toArray('.problem-item').forEach((item, i) => {
        gsap.fromTo(item,
            { 
                opacity: 0, 
                x: -30 
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    end: 'top 60%',
                    scrub: 1
                }
            }
        );
    });

    // ===== BENEFIT ITEMS (services page) =====
    gsap.utils.toArray('.benefit-item').forEach((item, i) => {
        gsap.fromTo(item,
            { 
                opacity: 0, 
                y: 20 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    end: 'top 70%',
                    scrub: 1
                }
            }
        );
    });

    // ===== OFFERING CARDS (services page) =====
    gsap.utils.toArray('.offering-card').forEach((card, i) => {
        gsap.fromTo(card,
            { 
                opacity: 0, 
                y: 40 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'top 55%',
                    scrub: 1
                }
            }
        );
    });

    // ===== PROCESS STEPS (services page) =====
    gsap.utils.toArray('.process-step').forEach((step, i) => {
        gsap.fromTo(step,
            { 
                opacity: 0, 
                y: 30 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: step,
                    start: 'top 85%',
                    end: 'top 60%',
                    scrub: 1
                }
            }
        );
    });

    // ===== FAQ ITEMS (services page) =====
    gsap.utils.toArray('.faq-item').forEach((item, i) => {
        gsap.fromTo(item,
            { 
                opacity: 0, 
                y: 30 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    end: 'top 65%',
                    scrub: 1
                }
            }
        );
    });

    // ===== PRICING ITEMS (services page) =====
    gsap.utils.toArray('.pricing-item').forEach((item, i) => {
        gsap.fromTo(item,
            { 
                opacity: 0, 
                y: 20 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    end: 'top 70%',
                    scrub: 1
                }
            }
        );
    });

    // ===== VALUE ITEMS (about page) =====
    gsap.utils.toArray('.value-item').forEach((item, i) => {
        gsap.fromTo(item,
            { 
                opacity: 0, 
                y: 30 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    end: 'top 60%',
                    scrub: 1
                }
            }
        );
    });

    // ===== TRAIT ITEMS (about page) =====
    gsap.utils.toArray('.trait-item').forEach((item, i) => {
        gsap.fromTo(item,
            { 
                opacity: 0, 
                x: -20 
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    end: 'top 70%',
                    scrub: 1
                }
            }
        );
    });

    // ===== PROOF STATS (about page) =====
    gsap.utils.toArray('.proof-stat').forEach((stat, i) => {
        gsap.fromTo(stat,
            { 
                opacity: 0, 
                y: 30 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 85%',
                    end: 'top 60%',
                    scrub: 1
                }
            }
        );
    });

    // ===== TEAM CARDS (about page) =====
    gsap.utils.toArray('.team-card').forEach((card, i) => {
        gsap.fromTo(card,
            { 
                opacity: 0, 
                y: 40 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'top 55%',
                    scrub: 1
                }
            }
        );
    });

    // ===== ABOUT CARDS =====
    gsap.utils.toArray('.about-card').forEach((card, i) => {
        gsap.fromTo(card,
            { 
                opacity: 0, 
                y: 50 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'top 50%',
                    scrub: 1
                }
            }
        );
    });

    // ===== DIFFERENTIATOR CARDS =====
    gsap.utils.toArray('.diff-card').forEach((card, i) => {
        gsap.fromTo(card,
            { 
                opacity: 0, 
                y: 30 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'top 60%',
                    scrub: 1
                }
            }
        );
    });

    // ===== FINAL CTA =====
    const finalCta = document.querySelector('.final-cta-content');
    if (finalCta) {
        gsap.fromTo(finalCta,
            { 
                opacity: 0, 
                y: 40 
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: finalCta,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                }
            }
        );
    }

    // ===== PROCESS FLOW STEPS =====
    initProcessFlowAnimations();
}

// ===== PROCESS FLOW ANIMATIONS =====
function initProcessFlowAnimations() {
    const flowSteps = document.querySelectorAll('.flow-step');
    
    if (flowSteps.length === 0) return;

    flowSteps.forEach((step, index) => {
        const stepBox = step.querySelector('.step-box');
        const title = step.querySelector('.animated-text');
        const description = step.querySelector('.step-box p');
        const arrowConnector = step.querySelector('.arrow-connector');
        const arrowPath = step.querySelector('.arrow-path');
        const arrowHead = step.querySelector('.arrow-head');
        const successBadge = step.querySelector('.success-badge');

        // Create timeline for this step
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 1
            }
        });

        // Animate step box
        if (stepBox) {
            gsap.set(stepBox, { opacity: 0, y: 60, scale: 0.95 });
            tl.to(stepBox, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            }, 0);
        }

        // Animate title
        if (title) {
            gsap.set(title, { opacity: 0, y: 20 });
            tl.to(title, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            }, 0.1);
        }

        // Animate description
        if (description) {
            gsap.set(description, { opacity: 0, y: 15 });
            tl.to(description, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            }, 0.2);
        }

        // Animate arrow path (draw effect)
        if (arrowPath) {
            const pathLength = arrowPath.getTotalLength ? arrowPath.getTotalLength() : 150;
            gsap.set(arrowPath, { 
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength 
            });
            tl.to(arrowPath, {
                strokeDashoffset: 0,
                duration: 0.4,
                ease: 'none'
            }, 0.3);
        }

        // Animate arrow head
        if (arrowHead) {
            gsap.set(arrowHead, { opacity: 0, scale: 0.5 });
            tl.to(arrowHead, {
                opacity: 1,
                scale: 1,
                duration: 0.2,
                ease: 'back.out(1.7)'
            }, 0.6);
        }

        // Success badge animation (only on final step)
        if (successBadge) {
            const circle = successBadge.querySelector('.success-circle');
            const check = successBadge.querySelector('.success-check');

            if (circle) {
                gsap.set(circle, { 
                    strokeDasharray: 176,
                    strokeDashoffset: 176 
                });
                tl.to(circle, {
                    strokeDashoffset: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                }, 0.4);
            }

            if (check) {
                gsap.set(check, { 
                    strokeDasharray: 60,
                    strokeDashoffset: 60 
                });
                tl.to(check, {
                    strokeDashoffset: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                }, 0.6);
            }
        }
    });
}



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
                showMessage('✓ Message sent successfully! Redirecting...', 'success');
                form.reset();
                // Record successful submission for rate limiting
                recordSubmission();
                // Mark form as submitted for exit popup
                if (typeof sessionStorage !== 'undefined') {
                    sessionStorage.setItem('exitPopupDismissed', 'true');
                }
                // Redirect to success page after brief delay
                setTimeout(() => {
                    window.location.href = 'success.html';
                }, 800);
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
