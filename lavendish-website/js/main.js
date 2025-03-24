/**
 * Lavendish Bar - Main JavaScript
 * Version: 1.0
 * Author: Website Developer
 */

// DOM Elements
const body = document.body;
const header = document.querySelector('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');
const scrollTopBtn = document.querySelector('.scroll-top');
const newsletterForm = document.querySelector('.newsletter-form');
const contactForm = document.querySelector('.contact-form');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initScrollEvents();
    initAnimations();
    initForms();
    
    // Initialize page-specific functionality
    const currentPage = getCurrentPage();
    
    if (currentPage === 'menu') {
        initMenuFilter();
    } else if (currentPage === 'gallery') {
        initGalleryFilter();
        initLightbox();
    } else if (currentPage === 'events') {
        initEventCalendar();
    } else if (currentPage === 'contact') {
        initMap();
    }
});

/**
 * Get current page based on URL
 * @returns {string} The current page name
 */
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('menu')) {
        return 'menu';
    } else if (path.includes('events')) {
        return 'events';
    } else if (path.includes('gallery')) {
        return 'gallery';
    } else if (path.includes('contact')) {
        return 'contact';
    } else {
        return 'home';
    }
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    if (!mobileMenuBtn) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        mobileMenuBtn.classList.toggle('active');
        
        // Update aria-expanded attribute for accessibility
        const isExpanded = navMenu.classList.contains('show');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn') && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', false);
        }
    });
    
    // Add close menu functionality when link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navMenu.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', false);
            }
        });
    });
}

/**
 * Initialize scroll events (sticky header, scroll to top button)
 */
function initScrollEvents() {
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide scroll to top button
        if (scrollTopBtn) {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    });
    
    // Scroll to top functionality
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize animations (uses AOS library if included)
 */
function initAnimations() {
    // Initialize AOS library if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 50
        });
    }
    
    // Add manual fade-in animation to elements with .fade-in class
    const fadeElements = document.querySelectorAll('.fade-in:not([data-aos])');
    fadeElements.forEach(element => {
        element.classList.add('animated');
    });
}

/**
 * Initialize form validations and submissions
 */
function initForms() {
    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (validateEmail(emailInput.value)) {
                // Success state (would normally send to backend)
                showFormMessage(newsletterForm, 'Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                // Error state
                showFormMessage(newsletterForm, 'Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            let isValid = true;
            
            // Simple validation
            if (!nameInput.value.trim()) {
                showInputError(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                clearInputError(nameInput);
            }
            
            if (!validateEmail(emailInput.value)) {
                showInputError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearInputError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                showInputError(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                clearInputError(messageInput);
            }
            
            // Submit if valid
            if (isValid) {
                // Success state (would normally send to backend)
                showFormMessage(contactForm, 'Thank you for your message! We will contact you soon.', 'success');
                contactForm.reset();
            }
        });
    }
}

/**
 * Initialize menu filter functionality
 */
function initMenuFilter() {
    const menuNavItems = document.querySelectorAll('.menu-nav-item');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (!menuNavItems.length || !menuCategories.length) return;
    
    menuNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav item
            menuNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide appropriate categories
            if (filter === 'all') {
                menuCategories.forEach(category => {
                    category.style.display = 'block';
                });
            } else {
                menuCategories.forEach(category => {
                    if (category.getAttribute('data-category') === filter) {
                        category.style.display = 'block';
                    } else {
                        category.style.display = 'none';
                    }
                });
            }
        });
    });
}

/**
 * Initialize gallery filter functionality
 */
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide appropriate gallery items
            galleryItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else if (item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Initialize lightbox for gallery (uses lightbox2 library if included)
 */
function initLightbox() {
    // Lightbox is initialized via HTML attributes if the library is loaded
    // This function is a placeholder for manual lightbox implementations if needed
}

/**
 * Initialize Google Maps (requires Google Maps API to be loaded)
 */
function initMap() {
    // Check if Google Maps API is loaded
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.warn('Google Maps API not loaded');
        return;
    }
    
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Lavendish Bar location (latitude, longitude) - this should be updated with the actual coordinates
    const lavendishLocation = { lat: 41.618, lng: 0.623 }; // Example coordinates for Lleida, Spain
    
    // Create a new map instance
    const map = new google.maps.Map(mapContainer, {
        center: lavendishLocation,
        zoom: 15,
        styles: [
            // Custom map styles could be added here
        ]
    });
    
    // Add a marker for the Lavendish Bar location
    const marker = new google.maps.Marker({
        position: lavendishLocation,
        map: map,
        title: 'Lavendish Bar',
        animation: google.maps.Animation.DROP
    });
    
    // Add info window with additional information
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="map-info-window">
                <h3>Lavendish Bar</h3>
                <p>123 Main Street, Lleida, Spain</p>
                <p>Open Monday-Sunday: 4pm-2am</p>
                <a href="tel:+34123456789">+34 123 456 789</a>
            </div>
        `
    });
    
    // Open info window when marker is clicked
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}

/**
 * Initialize calendar for events page
 */
function initEventCalendar() {
    // This would typically use a calendar library
    // For now, just a placeholder for future implementation
    const calendar = document.querySelector('.event-calendar');
    if (!calendar) return;
    
    // Event calendar initialization code would go here
}

/**
 * Utility: Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} True if email is valid
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Utility: Show form message
 * @param {Element} form - The form element
 * @param {string} message - Message to display
 * @param {string} type - Message type (success, error)
 */
function showFormMessage(form, message, type) {
    // Remove any existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and insert message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    
    // Add after form or append to form
    form.insertAdjacentElement('afterend', messageEl);
    
    // Automatically remove message after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 5000);
}

/**
 * Utility: Show input error message
 * @param {Element} input - The input element
 * @param {string} message - Error message
 */
function showInputError(input, message) {
    // Get parent form group
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    // Add error class
    formGroup.classList.add('has-error');
    
    // Remove any existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and append error message
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    formGroup.appendChild(errorEl);
}

/**
 * Utility: Clear input error
 * @param {Element} input - The input element
 */
function clearInputError(input) {
    // Get parent form group
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    // Remove error class
    formGroup.classList.remove('has-error');
    
    // Remove error message
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
} 