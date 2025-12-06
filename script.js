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

    // Subtle scroll reveal animations
    const animatedElements = document.querySelectorAll(
        'section, h1, h2, h3, h4, h5, p, .card, .service-card, .value-box, .feature-card, .process-step, .metric, .cta-strip'
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
