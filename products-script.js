// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Product filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Product sorting
const sortSelect = document.querySelector('.sort-select');

sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    const productsGrid = document.querySelector('.products-grid');
    const products = Array.from(productCards);
    
    products.sort((a, b) => {
        switch (sortValue) {
            case 'price-low':
                const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
                return priceA - priceB;
            
            case 'price-high':
                const priceA2 = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
                const priceB2 = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
                return priceB2 - priceA2;
            
            case 'name':
                const nameA = a.querySelector('h3').textContent;
                const nameB = b.querySelector('h3').textContent;
                return nameA.localeCompare(nameB);
            
            default:
                return 0;
        }
    });
    
    // Clear and re-append sorted products
    productsGrid.innerHTML = '';
    products.forEach(product => {
        productsGrid.appendChild(product);
    });
});

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent.split(' ')[0];
        
        // Simple cart simulation
        alert(`Added "${productName}" to cart for ${productPrice}`);
        
        // Add visual feedback
        button.textContent = 'Added!';
        button.style.background = '#4CAF50';
        button.style.borderColor = '#4CAF50';
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.background = 'transparent';
            button.style.borderColor = '#ffeba7';
        }, 2000);
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email && email.includes('@')) {
            alert('Thank you for subscribing to our newsletter!');
            this.querySelector('input[type="email"]').value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(31, 32, 41, 0.98)';
    } else {
        navbar.style.background = 'rgba(31, 32, 41, 0.95)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add fadeIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});
