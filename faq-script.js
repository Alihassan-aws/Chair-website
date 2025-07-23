// faq.js - Complete Mobile Menu Solution

document.addEventListener('DOMContentLoaded', function() {
  // ===== MOBILE MENU TOGGLE =====
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  // Toggle mobile menu
  hamburger.addEventListener('click', function() {
      // Toggle hamburger animation
      this.classList.toggle('active');
      
      // Toggle menu visibility
      navMenu.classList.toggle('active');
      
      // Lock/unlock body scroll
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
  
  // ===== FAQ ACCORDION FUNCTIONALITY =====
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
          // Close all other items
          faqItems.forEach(otherItem => {
              if (otherItem !== item) {
                  otherItem.classList.remove('active');
              }
          });
          
          // Toggle current item
          item.classList.toggle('active');
      });
  });
  
  // ===== FORCE VISIBILITY ON LOAD =====
  // Immediate visibility enforcement
  document.body.style.visibility = 'visible';
  document.body.style.opacity = '1';
  
  // Fallback for slow connections
  window.addEventListener('load', function() {
      document.body.style.visibility = 'visible';
      document.body.style.opacity = '1';
  });
});

// cart.js - Shopping Cart Functionality (if needed)
document.addEventListener('DOMContentLoaded', function() {
  // Your existing cart functionality here
  // (Keep your original cart.js code)
});