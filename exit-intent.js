/**
 * Exit Intent Popup Module
 * Handles exit intent detection and Calendly popup display
 * Used on contact page only
 */
(function() {
    'use strict';

    var EXIT_CONFIG = {
        MOUSE_VELOCITY_THRESHOLD: 50,
        MOUSE_TOP_POSITION_PX: 100,
        MOBILE_SWIPE_THRESHOLD_PX: 100,
        SCROLL_TOP_THRESHOLD_PX: 50
    };

    document.addEventListener('DOMContentLoaded', function() {
        var exitPopup = document.getElementById('exitPopup');
        var skipFormBtn = document.getElementById('skipFormBtn');

        if (!exitPopup) return;

        var popupShown = false;
        var SESSION_KEY = 'exitPopupShown';

        function wasPopupShown() {
            try {
                return sessionStorage.getItem(SESSION_KEY) === 'true';
            } catch (e) {
                return false;
            }
        }

        function markPopupShown() {
            try {
                sessionStorage.setItem(SESSION_KEY, 'true');
            } catch (e) {
                // sessionStorage unavailable
            }
        }

        var scrollPosition = 0;

        function showPopup(bypassSession) {
            if (popupShown || (!bypassSession && wasPopupShown())) return;
            popupShown = true;
            markPopupShown();
            // Store scroll position and lock body
            scrollPosition = window.pageYOffset;
            document.body.classList.add('popup-open');
            document.body.style.top = '-' + scrollPosition + 'px';
            exitPopup.classList.add('visible');
        }

        function hidePopup() {
            exitPopup.classList.remove('visible');
            // Restore scroll position and unlock body
            document.body.classList.remove('popup-open');
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        }

        // Skip button click - always shows popup (bypasses session check)
        if (skipFormBtn) {
            skipFormBtn.addEventListener('click', function() {
                popupShown = false;
                showPopup(true);
            });
        }

        // EXIT INTENT: Mouse leaving toward top of page
        document.addEventListener('mouseout', function(e) {
            var isNearTop = e.clientY <= 10;
            var isLeavingPage = !e.relatedTarget || e.relatedTarget.nodeName === 'HTML';
            if (isNearTop && isLeavingPage) {
                showPopup(false);
            }
        });

        // EXIT INTENT: Fast upward mouse movement
        var lastY = 0;
        document.addEventListener('mousemove', function(e) {
            var velocity = lastY - e.clientY;
            lastY = e.clientY;
            if (velocity > EXIT_CONFIG.MOUSE_VELOCITY_THRESHOLD &&
                e.clientY < EXIT_CONFIG.MOUSE_TOP_POSITION_PX) {
                showPopup(false);
            }
        });

        // Mobile: Pull-to-refresh gesture detection
        var touchStartY = 0;
        document.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', function(e) {
            var touchEndY = e.changedTouches[0].clientY;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop < EXIT_CONFIG.SCROLL_TOP_THRESHOLD_PX &&
                touchEndY - touchStartY > EXIT_CONFIG.MOBILE_SWIPE_THRESHOLD_PX) {
                showPopup(false);
            }
        }, { passive: true });

        // Close handlers
        var closeBtn = exitPopup.querySelector('.exit-popup-close');
        var dismissBtn = exitPopup.querySelector('.exit-popup-dismiss');

        if (closeBtn) {
            closeBtn.addEventListener('click', hidePopup);
        }
        if (dismissBtn) {
            dismissBtn.addEventListener('click', hidePopup);
        }
        exitPopup.addEventListener('click', function(e) {
            if (e.target === exitPopup) hidePopup();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') hidePopup();
        });
    });

})();
