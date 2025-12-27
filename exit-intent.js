// Exit Intent Popup - Only for Contact Page
document.addEventListener('DOMContentLoaded', () => {
    initExitIntentPopup();
});

function initExitIntentPopup() {
    // Configuration constants
    const EXIT_INTENT_CONFIG = {
        MOUSE_VELOCITY_THRESHOLD: 50,        // Pixels per mousemove event
        MOUSE_TOP_POSITION_PX: 100,          // Top area of viewport to trigger
        MOBILE_SWIPE_THRESHOLD_PX: 100,      // Swipe down distance to trigger
        SCROLL_TOP_THRESHOLD_PX: 50,         // Consider "at top" if scrollTop < this
        AUTO_SHOW_DELAY_MS: 20000            // Show after 20 seconds (capture contractors before they leave)
    };

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

    // Better exit intent detection - triggers when mouse leaves viewport at top
    document.addEventListener('mouseleave', (e) => {
        // Only trigger if mouse is leaving toward the top of the page
        if (e.clientY <= 0) {
            showPopup();
        }
    });

    // Alternative: detect when mouse moves to very top of page
    document.addEventListener('mouseout', (e) => {
        // Check if mouse is leaving the document
        if (!e.relatedTarget && !e.toElement) {
            showPopup();
        }
    });

    let lastY = 0;
    let velocity = 0;
    document.addEventListener('mousemove', (e) => {
        velocity = lastY - e.clientY;
        lastY = e.clientY;

        // Trigger if mouse moves up quickly and is near top of viewport
        if (velocity > EXIT_INTENT_CONFIG.MOUSE_VELOCITY_THRESHOLD &&
            e.clientY < EXIT_INTENT_CONFIG.MOUSE_TOP_POSITION_PX) {
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

        // Trigger if at top of page and swiping down (pull-to-refresh gesture)
        if (scrollTop < EXIT_INTENT_CONFIG.SCROLL_TOP_THRESHOLD_PX &&
            touchEndY - touchStartY > EXIT_INTENT_CONFIG.MOBILE_SWIPE_THRESHOLD_PX) {
            showPopup();
        }
    }, { passive: true });

    // Time-based fallback - show after user has been on page for a while
    setTimeout(() => {
        showPopup();
    }, EXIT_INTENT_CONFIG.AUTO_SHOW_DELAY_MS);
    
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
