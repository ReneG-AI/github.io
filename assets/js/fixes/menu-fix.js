/**
 * Mobile Menu Fix
 * This script ensures the mobile menu displays correctly with a purple gradient background
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing mobile menu fix...");
    
    // References to the original elements
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Verify required elements exist
    if (!menuToggle || !mainNav) {
        console.error("Required mobile menu elements not found");
        return;
    }
    
    console.log("Menu elements found, proceeding with setup");
    
    // Remove any previously created overlay
    const existingOverlay = document.getElementById('mobile-menu-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
        console.log("Removed existing overlay");
    }
    
    // Apply enhanced styles to the main nav for mobile view
    function enhanceMainNav() {
        // Apply higher z-index to original menu to ensure it appears above hero
        mainNav.style.cssText = `
            z-index: 999999 !important;
            transition: all 0.3s ease;
        `;
        
        // Handle menu toggle button
        menuToggle.style.cssText = `
            position: relative;
            z-index: 1000000;
            display: block;
            cursor: pointer;
            background: transparent;
            border: none;
        `;
        
        // Add active state styles directly to main-nav element
        const activeStyles = document.createElement('style');
        activeStyles.innerHTML = `
            .main-nav.active {
                display: flex !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100vh !important;
                background: linear-gradient(135deg, rgba(75, 0, 130, 0.95), rgba(120, 40, 180, 0.95)) !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 80px 2rem 2rem !important;
                opacity: 1 !important;
                visibility: visible !important;
                transform: translateY(0) scale(1) !important;
                pointer-events: all !important;
                overflow: auto !important;
                z-index: 999999 !important;
            }
            
            .main-nav.active .nav-list {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                width: 100% !important;
                max-width: 400px !important;
                margin: 0 auto !important;
            }
            
            .main-nav.active .nav-item {
                opacity: 1 !important;
                transform: translateY(0) !important;
                margin: 0.8rem 0 !important;
                text-align: center !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                padding: 0.8rem 0 !important;
                display: block !important;
                width: 100% !important;
            }
            
            .main-nav.active .nav-link {
                display: inline-flex !important;
                justify-content: center !important;
                align-items: center !important;
                padding: 1rem 2rem !important;
                font-size: 1.8rem !important;
                width: auto !important;
                min-width: 200px !important;
                color: white !important;
                text-decoration: none !important;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
            }
            
            body.no-scroll {
                overflow: hidden !important;
            }
        `;
        document.head.appendChild(activeStyles);
        console.log("Enhanced styles applied to main navigation");
    }
    
    // Apply enhanced styles immediately
    enhanceMainNav();
    
    // Function to show the mobile menu
    function showMobileMenu() {
        console.log("Showing mobile menu");
        
        // Ensure hero background doesn't interfere
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.dataset.originalZindex = heroBackground.style.zIndex || '0';
            heroBackground.style.zIndex = '-1';
        }
        
        // Add active class to toggle and menu
        menuToggle.classList.add('active');
        mainNav.classList.add('active');
        
        // Apply animation to nav items
        const navItems = mainNav.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.style.transitionDelay = (0.05 * index) + 's';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
        
        // Prevent scrolling
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.classList.add('no-scroll');
    }
    
    // Function to hide the mobile menu
    function hideMobileMenu() {
        console.log("Hiding mobile menu");
        
        // Remove active classes
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        
        // Animate nav items out
        const navItems = mainNav.querySelectorAll('.nav-item');
        navItems.forEach((item) => {
            item.style.opacity = '';
            item.style.transform = '';
            item.style.transitionDelay = '';
        });
        
        // Restore hero background z-index
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground && heroBackground.dataset.originalZindex) {
            heroBackground.style.zIndex = heroBackground.dataset.originalZindex;
        }
        
        // Restore scrolling
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.classList.remove('no-scroll');
    }
    
    // Add click event to menu toggle button
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log("Menu toggle clicked");
        
        if (mainNav.classList.contains('active')) {
            hideMobileMenu();
        } else {
            showMobileMenu();
        }
    });
    
    // Add click events to nav links
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // For internal links, handle smooth scrolling
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                // Close menu
                hideMobileMenu();
                
                // Scroll to target
                if (targetElement) {
                    setTimeout(() => {
                        const offsetTop = targetElement.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            } else {
                // For external links, just close the menu
                hideMobileMenu();
            }
        });
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            hideMobileMenu();
        }
    });
    
    // Add click outside to close
    document.addEventListener('click', function(e) {
        if (mainNav.classList.contains('active') && 
            !mainNav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            hideMobileMenu();
        }
    });
    
    // Check if menu should be open initially
    if (menuToggle.classList.contains('active')) {
        showMobileMenu();
    }
    
    console.log("Mobile menu successfully configured");
}); 