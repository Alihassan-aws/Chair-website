// Alias loader to ensure compatibility with pages referencing cart.js
// Dynamically load the main cart logic (cart-script.js)
// Simple alias to guarantee Cart class is available before subsequent inline scripts.
(function () {
    if (window.__cartScriptLoaded) return;
    window.__cartScriptLoaded = true;
    if (!window.Cart) {
        // Load synchronously to guarantee availability for inline scripts following this tag
        document.write('<script src="cart-script.js"><\\/script>');
    }

    // Universal hamburger toggle once DOM ready
    if (!window.__globalHamburgerInit) {
        window.__globalHamburgerInit = true;
        document.addEventListener('DOMContentLoaded', () => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (!hamburger || !navMenu) return;
        
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        };
        hamburger.addEventListener('click', toggleMenu);
        
        // Close when nav-link clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
            });
        });
        // Close on outside click for mobile
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
            }
        });
    });
    }
})();
