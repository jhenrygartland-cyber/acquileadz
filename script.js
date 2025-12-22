// Acquileadz Website JavaScript
// GSAP ScrollTrigger for scroll-linked animations

console.log('Acquileadz site loaded');

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
                console.log('All cookies accepted');
            });
        }
        
        if (cookieDecline) {
            cookieDecline.addEventListener('click', () => {
                localStorage.setItem('acquileadz_cookies', 'essential');
                hideCookieBanner();
                console.log('Essential cookies only');
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

