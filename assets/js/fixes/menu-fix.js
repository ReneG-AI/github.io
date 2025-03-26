/**
 * Modern Mobile Menu
 * 
 * A clean, flexible mobile menu implementation with smooth animations
 * and proper event handling.
 */

// Initialize menu when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing modern mobile menu...');
    
    // Get references to menu elements
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navItems = document.querySelectorAll('.nav-list .nav-item');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    // Check if required elements exist
    if (!menuToggle || !mainNav) {
        console.error('Could not find required menu elements!');
        return;
    }
    
    console.log(`Found ${navItems.length} navigation items`);
    
    // Function to show mobile menu with staged animation
    function showMenu() {
        // Add active classes
        menuToggle.classList.add('active');
        mainNav.classList.add('active');
        body.classList.add('no-scroll');
        
        // Animate items with staggered delay
        navItems.forEach((item, index) => {
            // Reset any existing inline styles
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            // Force a reflow to ensure transitions work properly
            void item.offsetWidth;
            
            // Set the item index as a CSS variable for transition delay
            item.style.setProperty('--item-index', index);
            
            // Delayed appearance
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50 + (index * 70)); // Staggered delay
        });
        
        // Ensure the nav list is visible
        const navList = document.querySelector('.nav-list');
        if (navList) {
            navList.style.display = 'flex';
        }
        
        // Lower z-index of potential conflicting elements
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.zIndex = '1';
        }
    }
    
    // Function to hide mobile menu
    function hideMenu() {
        // Animate items out first
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });
        
        // Delay removing active class to allow for animation
        setTimeout(() => {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            body.classList.remove('no-scroll');
            
            // Restore z-index for hero background
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.zIndex = '';
            }
        }, 300);
    }
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Menu toggle clicked');
        
        if (mainNav.classList.contains('active')) {
            hideMenu();
        } else {
            showMenu();
        }
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // For internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                // Hide menu
                hideMenu();
                
                // Scroll to target after menu animation completes
                if (targetElement) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 400);
                }
            } else if (!this.getAttribute('href').startsWith('http')) {
                // For internal page links that don't begin with #
                hideMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mainNav.classList.contains('active') && 
            !mainNav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            hideMenu();
        }
    });
    
    // Close menu when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            hideMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // If menu is open and window is resized to desktop size, close menu
        if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
            hideMenu();
        }
    });
    
    // When scrolling while menu is open, prevent background content from scrolling
    document.addEventListener('scroll', function(e) {
        if (mainNav.classList.contains('active')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, { passive: false });
    
    // Initialize any active state if page loads with menu active
    if (menuToggle.classList.contains('active')) {
        showMenu();
    }
    
    console.log('Modern mobile menu initialized successfully!');
}); 