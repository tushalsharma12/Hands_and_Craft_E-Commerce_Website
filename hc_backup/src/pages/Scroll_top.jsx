import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Save scroll position before navigating away
        const saveScrollPosition = () => {
            const currentPath = window.location.pathname;
            sessionStorage.setItem(`scrollPos-${currentPath}`, window.scrollY.toString());
        };

        // Save position when user clicks a link or navigates away
        const handleClick = () => {
            saveScrollPosition();
        };

        // Add event listeners
        document.addEventListener('click', handleClick);
        window.addEventListener('beforeunload', saveScrollPosition);

        return () => {
            document.removeEventListener('click', handleClick);
            window.removeEventListener('beforeunload', saveScrollPosition);
        };
    }, []);

    useEffect(() => {
        // Restore scroll position when navigating back
        const restoreScrollPosition = () => {
            const savedPosition = sessionStorage.getItem(`scrollPos-${pathname}`);
            
            if (pathname.includes('/products/')) {
                // If going to product details, scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (savedPosition) {
                // If returning to previous page, restore position
                setTimeout(() => {
                    window.scrollTo({
                        top: parseInt(savedPosition),
                        behavior: 'smooth'
                    });
                }, 100);
            } else {
                // Default to top for new pages
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        restoreScrollPosition();
    }, [pathname]);

    return null;
}

export default ScrollToTop;