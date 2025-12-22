// Exit Intent Popup - Only for Contact Page
document.addEventListener('DOMContentLoaded', () => {
    initExitIntentPopup();
});

function initExitIntentPopup() {
    const exitPopup = document.getElementById('exitPopup');
    if (!exitPopup) return;
    
    const closeBtn = exitPopup.querySelector('.exit-popup-close');
    const dismissBtn = exitPopup.querySelector('.exit-popup-dismiss');
    const ctaBtn = exitPopup.querySelector('.exit-popup-cta');
    
    let popupShown = false;
    let formSubmitted = false;
    
    const popupDismissed = sessionStorage.getItem('exitPopupDismissed');
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            formSubmitted = true;
            sessionStorage.setItem('exitPopupDismissed', 'true');
        });
    }
    
    function showPopup() {
        if (popupShown || popupDismissed || formSubmitted) return;
        popupShown = true;
        exitPopup.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }
    
    function hidePopup() {
        exitPopup.classList.remove('visible');
        document.body.style.overflow = '';
        sessionStorage.setItem('exitPopupDismissed', 'true');
    }
    
    document.addEventListener('mouseout', (e) => {
        if (e.clientY <= 0 && e.relatedTarget === null) {
            showPopup();
        }
    });
    
    let lastY = 0;
    let velocity = 0;
    document.addEventListener('mousemove', (e) => {
        velocity = lastY - e.clientY;
        lastY = e.clientY;
        
        if (velocity > 50 && e.clientY < 100) {
            showPopup();
        }
    });
    
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop < 50 && touchEndY - touchStartY > 100) {
            showPopup();
        }
    }, { passive: true });
    
    setTimeout(() => {
        showPopup();
    }, 45000);
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hidePopup);
    }
    
    if (dismissBtn) {
        dismissBtn.addEventListener('click', hidePopup);
    }
    
    exitPopup.addEventListener('click', (e) => {
        if (e.target === exitPopup) {
            hidePopup();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && exitPopup.classList.contains('visible')) {
            hidePopup();
        }
    });
    
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            sessionStorage.setItem('exitPopupDismissed', 'true');
        });
    }
}
