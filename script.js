// Acquileadz Website JavaScript
// Future enhancements and interactions

console.log('Acquileadz site loaded successfully');

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

// Optional: Add loading animation fade-in
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});
```

---

## 📁 Your Complete File Structure:
```
acquileadz/
├── index.html
├── services.html
├── contact.html
├── styles.css
├── script.js
└── assets/
    ├── logo-light.png
    └── favicon.ico
