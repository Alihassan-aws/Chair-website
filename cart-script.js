// Cart Module
class Cart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.discount = {
            code: null,
            amount: 0
        };
        this.init();
    }
    
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.renderCart();
        this.updateCartCount();
        this.loadRecentlyViewed();
    }
    
    cacheDOM() {
        this.DOM = {
            cartContainer: document.getElementById('cart-items-container'),
            cartCount: document.getElementById('cart-count'),
            itemCount: document.getElementById('item-count'),
            subtotal: document.getElementById('subtotal'),
            shipping: document.getElementById('shipping'),
            tax: document.getElementById('tax'),
            discountAmount: document.getElementById('discount-amount'),
            total: document.getElementById('total'),
            checkoutBtn: document.getElementById('checkout-btn'),
            discountCode: document.getElementById('discount-code'),
            applyDiscount: document.getElementById('apply-discount'),
            recentlyViewed: document.getElementById('recently-viewed-grid'),
            hamburger: document.querySelector('.hamburger'),
            navMenu: document.querySelector('.nav-menu'),
            body: document.body
        };
    }
    
    bindEvents() {
        // Mobile menu toggle
        this.DOM.hamburger.addEventListener('click', this.toggleMenu.bind(this));
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.closeMenu.bind(this));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.DOM.navMenu.classList.contains('active') && 
                !e.target.closest('.nav-menu') && 
                !e.target.closest('.hamburger')) {
                this.closeMenu();
            }
        });
        
        // Checkout button
        this.DOM.checkoutBtn.addEventListener('click', this.handleCheckout.bind(this));
        
        // Apply discount
        this.DOM.applyDiscount.addEventListener('click', this.applyDiscount.bind(this));
        
        // Allow pressing Enter to apply discount\n        this.DOM.discountCode.addEventListener('keypress', (e) => {\n            if (e.key === 'Enter') {\n                this.applyDiscount();\n            }\n        });\n\n        // Remove item buttons (event delegation)\n        this.DOM.cartContainer.addEventListener('click', (e) => {\n            if (e.target.classList.contains('remove-item')) {\n                const id = e.target.getAttribute('data-id');\n                this.removeItem(id);\n            }\n        });
        this.DOM.discountCode.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.applyDiscount();
            }
        });
    }
    
    toggleMenu() {
        this.DOM.hamburger.classList.toggle('active');
        this.DOM.navMenu.classList.toggle('active');
        
        // Toggle body overflow and class
        if (this.DOM.navMenu.classList.contains('active')) {
            this.DOM.body.style.overflow = 'hidden';
            this.DOM.body.classList.add('menu-open');
        } else {
            this.DOM.body.style.overflow = '';
            this.DOM.body.classList.remove('menu-open');
        }
    }
    
    closeMenu() {
        this.DOM.hamburger.classList.remove('active');
        this.DOM.navMenu.classList.remove('active');
        this.DOM.body.style.overflow = '';
        this.DOM.body.classList.remove('menu-open');
    }
    
    // ---------------- Cart Core Functionality ----------------\n    /**\n     * Persist current cart array to localStorage.\n     */\n    saveCart() {\n        localStorage.setItem('cart', JSON.stringify(this.cart));\n    }\n\n    /**\n     * Add a product object to the cart. If it exists, increase quantity.\n     * @param {{id:string,name:string,price:number,qty?:number,image?:string}} product \n     */\n    addItem(product) {\n        const existing = this.cart.find(item => item.id === product.id);\n        if (existing) {\n            existing.qty += product.qty || 1;\n        } else {\n            this.cart.push({ ...product, qty: product.qty || 1 });\n        }\n        this.saveCart();\n        this.renderCart();\n        this.updateCartCount();\n    }\n\n    /**\n     * Remove item by ID.\n     * @param {string} id \n     */\n    removeItem(id) {\n        this.cart = this.cart.filter(item => item.id !== id);\n        this.saveCart();\n        this.renderCart();\n        this.updateCartCount();\n    }\n\n    /**\n     * Update the small badge in navbar showing cart quantity.\n     */\n    updateCartCount() {\n        if (this.DOM && this.DOM.cartCount) {\n            const totalQty = this.cart.reduce((sum, i) => sum + i.qty, 0);\n            this.DOM.cartCount.textContent = totalQty;\n        }\n        // Also update global nav on other pages if available\n        const globalBadge = document.getElementById('cart-count');\n        if (globalBadge) {\n            const totalQty = this.cart.reduce((sum, i) => sum + i.qty, 0);\n            globalBadge.textContent = totalQty;\n        }\n    }\n\n    /**\n     * Recalculate and render cart HTML in cart page.\n     */\n    renderCart() {\n        if (!this.DOM || !this.DOM.cartContainer) return;\n        const container = this.DOM.cartContainer;\n        container.innerHTML = '';\n\n        if (this.cart.length === 0) {\n            container.innerHTML = `\n                <div class="empty-cart-message">\n                    <i class="fas fa-shopping-cart"></i>\n                    <h3>Your cart is empty</h3>\n                    <p>Looks like you haven't added anything to your cart yet</p>\n                    <a href="products.html" class="btn btn-primary">\n                        <i class="fas fa-arrow-left"></i> Continue Shopping\n                    </a>\n                </div>`;\n            this.calculateTotals();\n            return;\n        }\n\n        this.cart.forEach(item => {\n            const div = document.createElement('div');\n            div.className = 'cart-item';\n            div.innerHTML = `\n                <div class="item-info">\n                    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}\n                    <h4>${item.name}</h4>\n                </div>\n                <div class="item-actions">\n                    <span class="item-price">$${(item.price * item.qty).toFixed(2)}</span>\n                    <button class="remove-item" data-id="${item.id}" aria-label="Remove">&times;</button>\n                </div>`;\n            container.appendChild(div);\n        });\n        this.calculateTotals();\n    }\n\n    /**\n     * Calculate and render subtotal, tax, total. Shipping is read from DOM.\n     */\n    calculateTotals() {\n        if (!this.DOM) return;\n        const subtotalVal = this.cart.reduce((acc, i) => acc + i.price * i.qty, 0);\n        const taxVal = subtotalVal * 0.10;\n        const shippingVal = parseFloat(this.DOM.shipping?.textContent.replace('$', '') || 0);\n        const totalVal = subtotalVal + taxVal + shippingVal - this.discount.amount;\n\n        this.DOM.subtotal.textContent = `$${subtotalVal.toFixed(2)}`;\n        this.DOM.tax.textContent = `$${taxVal.toFixed(2)}`;\n        this.DOM.total.textContent = `$${totalVal.toFixed(2)}`;\n        this.DOM.itemCount.textContent = `${this.cart.length} Items`;\n    }
}

// Initialize the cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart();
    
    // Make cart instance available globally for testing
    window.cart = cart;

    // Global delegated Add-to-Cart listener (works on all pages)
    document.addEventListener('click', function(e) {
        let btn = e.target;
        if (btn.id === 'add-to-cart') {
            // product-detail page button
        } else if (!btn.classList?.contains('add-to-cart')) {
            btn = btn.closest('.add-to-cart');
        }
        if (!btn) return;
        if (!btn) return;
        e.preventDefault();
        let product;
        if (btn.dataset.product) {
            try { product = JSON.parse(btn.dataset.product); } catch(err) { console.error('Invalid product data', err); }
        }
        if (!product) {
            const card = btn.closest('.product-card') || document.querySelector('.product-detail');
            if (!card) return;
            const name = card.querySelector('h3, h2, .product-name')?.textContent?.trim() || 'Product';
            const priceText = card.querySelector('.price')?.textContent || '0';
            const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
            const id = card.id || name.toLowerCase().replace(/\s+/g, '-');
            const image = card.querySelector('img')?.src || '';
            product = { id, name, price, image };
        }
        cart.addItem(product);
        // quick visual feedback
        btn.textContent = 'Added!';
        setTimeout(()=>{ btn.textContent='Add to Cart'; },1000);
    });
});