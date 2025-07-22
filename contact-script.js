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

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        newsletter: formData.get('newsletter') === 'on'
    };
    
    // Simple validation
    if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="uil uil-spinner-alt"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert(`Thank you, ${data.firstName}! Your message has been sent successfully. We'll get back to you within 24 hours.`);
        
        // Reset form
        this.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reset floating labels
        const labels = this.querySelectorAll('label');
        labels.forEach(label => {
            const input = label.previousElementSibling;
            if (input && input.value === '') {
                label.style.top = '15px';
                label.style.fontSize = '1rem';
                label.style.color = 'rgba(255, 255, 255, 0.7)';
                label.style.background = 'transparent';
            }
        });
    }, 2000);
});

// Floating label animation
const formFields = document.querySelectorAll('.form-field input, .form-field select, .form-field textarea');

formFields.forEach(field => {
    field.addEventListener('focus', function() {
        const label = this.nextElementSibling;
        if (label) {
            label.style.top = '-10px';
            label.style.left = '15px';
            label.style.fontSize = '0.8rem';
            label.style.color = '#ffeba7';
            label.style.background = '#1f2029';
            label.style.padding = '0 5px';
        }
    });
    
    field.addEventListener('blur', function() {
        if (this.value === '') {
            const label = this.nextElementSibling;
            if (label) {
                label.style.top = '15px';
                label.style.left = '20px';
                label.style.fontSize = '1rem';
                label.style.color = 'rgba(255, 255, 255, 0.7)';
                label.style.background = 'transparent';
                label.style.padding = '0';
            }
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

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

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.contact-item, .contact-form-container, .faq-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add staggered animation for contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation for FAQ items
    const faqItemsForAnimation = document.querySelectorAll('.faq-item');
    faqItemsForAnimation.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});
