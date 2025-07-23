// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load cart items
    loadCartItems();
    
    // Load saved form data if exists
    loadFormData();
    
    // Setup form submission
    const shippingForm = document.getElementById('shippingForm');
    if (shippingForm) {
        shippingForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Setup customer service links
    setupCustomerServiceLinks();
    
    // Update cart count in header
    updateCartCount();
});

// Load cart items into the order summary
function loadCartItems() {
    const cartItemsContainer = document.getElementById('order-items');
    const cartSubtotal = document.getElementById('order-subtotal');
    const cartTotal = document.getElementById('order-total');
    
    // Get cart from localStorage
    const savedCart = localStorage.getItem('telfordCart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="uil uil-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        cartSubtotal.textContent = '$0.00';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Update the DOM
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="order-item-img">
            <div class="order-item-details">
                <div class="order-item-title">${item.name}</div>
                <div class="order-item-variant">
                    Color: <span class="color-dot" style="background-color: ${item.colorCode}; width: 12px; height: 12px; border-radius: 50%; display: inline-block; vertical-align: middle; margin-right: 5px;"></span>${item.color}
                </div>
                <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="order-item-quantity">Qty: ${item.quantity}</div>
            </div>
        </div>
    `).join('');
    
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${subtotal.toFixed(2)}`;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        country: document.getElementById('country').value,
        saveInfo: document.getElementById('saveInfo').checked
    };
    
    // Save form data if requested
    if (formData.saveInfo) {
        localStorage.setItem('telfordShippingInfo', JSON.stringify(formData));
    } else {
        localStorage.removeItem('telfordShippingInfo');
    }
    
    // In a real app, you would process the order here
    // For demo, we'll just show a success message and clear the cart
    alert('Order placed successfully! Thank you for shopping with Telford.');
    
    // Clear the cart
    localStorage.removeItem('telfordCart');
    
    // Redirect to confirmation page or home
    window.location.href = 'home.html';
}

// Load saved form data if available
function loadFormData() {
    const savedData = localStorage.getItem('telfordShippingInfo');
    if (!savedData) return;
    
    try {
        const formData = JSON.parse(savedData);
        
        // Populate form fields
        for (const [key, value] of Object.entries(formData)) {
            if (key === 'saveInfo') continue;
            const input = document.getElementById(key);
            if (input) input.value = value;
        }
        
        // Check the save info checkbox
        const saveInfo = document.getElementById('saveInfo');
        if (saveInfo) saveInfo.checked = true;
    } catch (error) {
        console.error('Error loading saved form data:', error);
    }
}

// Setup customer service links
function setupCustomerServiceLinks() {
    const serviceLinks = ['trackOrder', 'returns', 'shipping', 'faq'];
    
    serviceLinks.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                alert(`This is a demo. In a real application, this would take you to the ${id.replace(/([A-Z])/g, ' $1').toLowerCase()} page.`);
            });
        }
    });
}

// Update cart count in header
function updateCartCount() {
    const savedCart = localStorage.getItem('telfordCart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(countElement => {
        countElement.textContent = totalItems > 0 ? totalItems : '';
        countElement.style.display = totalItems > 0 ? 'inline-flex' : 'none';
    });
}
