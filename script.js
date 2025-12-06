// Acquileadz Website JavaScript
// Future enhancements and interactions
console.log('Acquileadz site loaded successfully');

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links (if you add them later)
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

    // Subtle scroll reveal animations - comprehensive selector list
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
});

// Optional: Add loading animation fade-in
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);

});

// 3D Dashboard Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = document.getElementById('dashboard3d');
    
    if (dashboard) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const heroHeight = document.querySelector('.hero').offsetHeight;
                    
                    // Calculate rotation based on scroll position within hero section
                    const scrollProgress = Math.min(scrolled / heroHeight, 1);
                    
                    // 3D rotation values
                    const rotateX = scrollProgress * 15 - 7.5; // -7.5 to 7.5 degrees
                    const rotateY = scrollProgress * 20 - 10;  // -10 to 10 degrees
                    const translateZ = scrollProgress * 30;     // Add depth
                    
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
        
        // Mouse move parallax effect
        const heroSection = document.querySelector('.hero');
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
});
