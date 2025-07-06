// DOM Elements
const disclaimerModal = document.getElementById('disclaimerModal');
const acceptBtn = document.getElementById('acceptBtn');
const mainContent = document.getElementById('mainContent');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Check if user has already accepted disclaimer
const hasAcceptedDisclaimer = localStorage.getItem('dharmikyaLegalDisclaimer');

// Show/hide content based on disclaimer acceptance
if (hasAcceptedDisclaimer === 'accepted') {
    disclaimerModal.style.display = 'none';
    mainContent.classList.remove('hidden');
} else {
    disclaimerModal.style.display = 'flex';
    mainContent.classList.add('hidden');
}

// Handle disclaimer acceptance
acceptBtn.addEventListener('click', function() {
    // Store acceptance in localStorage
    localStorage.setItem('dharmikyaLegalDisclaimer', 'accepted');
    
    // Hide modal with animation
    disclaimerModal.style.opacity = '0';
    disclaimerModal.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        disclaimerModal.style.display = 'none';
        mainContent.classList.remove('hidden');
        
        // Trigger entrance animations
        document.body.style.overflow = 'auto';
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
});

// Mobile Navigation Toggle
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Reset hamburger animation
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove shadow based on scroll position
    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .team-member, .contact-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Prevent right-click context menu on important elements (optional security measure)
document.addEventListener('contextmenu', function(e) {
    if (e.target.closest('.modal-content')) {
        e.preventDefault();
    }
});

// Prevent modal from being closed with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && disclaimerModal.style.display !== 'none') {
        e.preventDefault();
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// SEO and Analytics ready functions
function trackDisclaimerAcceptance() {
    // This function can be used to track disclaimer acceptance
    // for analytics purposes (Google Analytics, etc.)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'disclaimer_accepted', {
            'event_category': 'legal',
            'event_label': 'disclaimer_modal'
        });
    }
}

// Call tracking function when disclaimer is accepted
acceptBtn.addEventListener('click', trackDisclaimerAcceptance);

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Allow Enter key to accept disclaimer
    if (e.key === 'Enter' && document.activeElement === acceptBtn) {
        acceptBtn.click();
    }
    
    // Tab navigation for modal
    if (e.key === 'Tab' && disclaimerModal.style.display !== 'none') {
        const focusableElements = disclaimerModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// Focus management for modal
if (disclaimerModal.style.display !== 'none') {
    acceptBtn.focus();
}

// Performance optimization - lazy load images if any are added later
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));
