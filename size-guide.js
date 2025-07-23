document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart and update count
    const cart = window.cart || new Cart();
    updateCartCount();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Update cart count function
    function updateCartCount() {
        const cartItems = cart.getItems();
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        
        document.querySelectorAll('.cart-count').forEach(countElement => {
            countElement.textContent = totalItems > 0 ? totalItems : '';
            countElement.style.display = totalItems > 0 ? 'inline-flex' : 'none';
        });
    }
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});