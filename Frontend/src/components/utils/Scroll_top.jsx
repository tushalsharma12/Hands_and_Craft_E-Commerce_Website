import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        const saveScrollPosition = () => {
            // Save current scroll position before navigating
            const currentPosition = window.scrollY;
            localStorage.setItem(`scrollPos-${pathname}`, currentPosition.toString());
        };

        // Add event listener for saving position
        window.addEventListener('beforeunload', saveScrollPosition);

        // Scroll logic
        if (pathname.includes('/products/')) {
            // Only scroll to top for product details
            window.scrollTo(0, 0);
        } else {
            // For other pages, try to restore position
            const savedPosition = localStorage.getItem(`scrollPos-${pathname}`);
            if (savedPosition) {
                requestAnimationFrame(() => {
                    window.scrollTo(0, parseInt(savedPosition));
                });
            }
        }

        return () => {
            saveScrollPosition();
            window.removeEventListener('beforeunload', saveScrollPosition);
        };
    }, [pathname]);

    return null;
}

export default ScrollToTop;