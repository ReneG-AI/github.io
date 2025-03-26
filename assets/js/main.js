document.addEventListener('DOMContentLoaded', function() {
    clearBrowserCache();
    detectWebpSupport();
    window.lastWidth = window.innerWidth;
    initPreloader();
    initSmoothScroll();
    initHeaderScroll();
    preloadBookImages();
    initBookFlip();
    initializeInteriorModal();
    setupBackToTop();
    initCharacterCounter();
    initLineaAnimada();
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            easing: 'ease-out',
            once: true,
            disable: window.innerWidth < 768 ? 'phone' : false,
            mirror: false
        });
    }
    setTimeout(function() {
        document.body.classList.add('loaded');
        fixAllVisibility();
    }, 300);
    const textarea = document.getElementById('mensaje');
    if (textarea) {
        function autoResize() {
            textarea.style.height = 'auto';
            textarea.style.height = Math.max(textarea.scrollHeight, 240) + 'px';
        }
        textarea.addEventListener('input', autoResize);
        textarea.addEventListener('focus', autoResize);
        textarea.addEventListener('blur', autoResize);
        setTimeout(autoResize, 100);
    }
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-quad',
            once: false,
            mirror: true,
            anchorPlacement: 'top-bottom',
            disable: window.innerWidth < 768 ? true : false
        });
    } else {
        console.warn("AOS not available. Some animations may not work.");
    }
    initializeCardFlippers();
    initializeMobileNav();
    initializeBookSlider();
    initializeReadMore();
    updateYear();
    initSmoothScroll();
    initializeBackToTop();
    initializeRippleEffect();
    const isMobile = window.innerWidth <= 768;
    const isDarkMode = document.body.classList.contains('dark-mode');
    initNavbar();
    initCharacterCounter();
    const heroBackground = document.querySelector('.hero-background');
    const header = document.querySelector('header');
    if (heroBackground) {
        heroBackground.style.zIndex = '1';
    }
    if (header) {
        header.style.zIndex = '1001';
    }
    
    // Añadir un refuerzo con timeout
    setTimeout(function() {
        const heroBackground = document.querySelector('.hero-background');
        const header = document.querySelector('header');
        if (heroBackground) {
            heroBackground.style.zIndex = '-1';
            heroBackground.style.position = 'fixed';
            heroBackground.style.pointerEvents = 'none';
            console.log('Applying z-index -1 to hero-background');
        }
        if (header) {
            header.style.zIndex = '9999';
            console.log('Applying z-index 9999 to header');
        }
    }, 300);
    initTestimonialsCarousel();
    setupSeparatorAnimations();
    
    setTimeout(function() {
        let preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (preloader) preloader.style.display = 'none';
            }, 500);
        }
    }, 800);
});

function clearBrowserCache() {
    console.log("Clearing browser cache...");
    if (window.location.href.indexOf('cache_cleared') === -1) {
        const cacheBuster = new Date().getTime();
        const hasParams = window.location.href.indexOf('?') !== -1;
        const separator = hasParams ? '&' : '?';
        console.log("Parameter to avoid cache: " + cacheBuster);
    }
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for (let registration of registrations) {
                registration.unregister();
                console.log('Service Worker unregistered');
            }
        });
    }
    if (window.caches) {
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    console.log('Deleting cache: ' + cacheName);
                    return caches.delete(cacheName);
                })
            );
        });
    }
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.src && !img.src.includes('data:')) {
            const originalSrc = img.src;
            const timestamp = new Date().getTime();
            img.setAttribute('data-original-src', originalSrc);
            if (originalSrc.indexOf('?') === -1) {
                img.src = originalSrc + '?t=' + timestamp;
            } else {
                img.src = originalSrc + '&t=' + timestamp;
            }
            console.log('Reloading image: ' + img.src);
        }
    });
    console.log("Cache cleared successfully");
}

function detectWebpSupport() {
    var canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
        if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
            document.documentElement.classList.add('webp-support');
            console.log("WebP support detected");
            return true;
        } else {
            document.documentElement.classList.add('no-webp-support');
            console.log("No WebP support, using PNG");
            return false;
        }
    } else {
        document.documentElement.classList.add('no-webp-support');
        console.log("Old browser, using PNG");
        return false;
    }
}

function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('preloader-hide');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 800);
        });
    }
}

function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                const duration = 400;
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                let startTime = null;
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const ease = t => t * (2 - t);
                    window.scrollTo(0, startPosition + distance * ease(progress));
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                requestAnimationFrame(animation);
            }
        });
    });
}

function initHeaderScroll() {
    const header = document.querySelector('header');
    const scrollThreshold = 50;
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

function setupBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        const duration = 400;
        const startPosition = window.pageYOffset;
        const distance = -startPosition;
        let startTime = null;
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = t => t * (2 - t);
            window.scrollTo(0, startPosition + distance * ease(progress));
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        requestAnimationFrame(animation);
    });
}

function preloadBookImages() {
    console.log("Preloading WebP book images...");
    if (window.imagesPreloaded) return;
    window.imagesPreloaded = true;
    console.log("Precargando imágenes WebP de libros...");
    const visibleCovers = Array.from(document.querySelectorAll('.book-cover, .book-back')).filter(img => {
        const rect = img.getBoundingClientRect();
        return (
            rect.top >= -img.height &&
            rect.left >= -img.width &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) + img.height &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) + img.width
        );
    });
    const imagesToPreload = visibleCovers.slice(0, 3);
    imagesToPreload.forEach(img => {
        if (img.src && !img.complete) {
            const preloadImg = new Image();
            preloadImg.src = img.src;
            console.log("Precargando:", img.src);
        }
    });
}

function initBookFlip() {
    const bookFlippers = document.querySelectorAll('.book-flipper');
    const flipButtons = document.querySelectorAll('.flip-button');
    bookFlippers.forEach((flipper, index) => {
        if (!flipper.id) {
            flipper.id = `flipper${index + 1}`;
        }
        flipper.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG' || e.target === this) {
                this.classList.toggle('flipped');
            }
        });
    });
    flipButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const bookImages = this.closest('.book-images');
            const flipper = bookImages.querySelector('.book-flipper');
            if (flipper) {
                flipper.classList.toggle('flipped');
            }
        });
    });
}

function initializeInteriorModal() {
    const interiorBtns = document.querySelectorAll('.interior-btn');
    const interiorModal = document.getElementById('interiorModal');
    const modalCloseX = document.getElementById('modalCloseX');
    if (!interiorModal) {
        console.warn('Interior modal not found');
        return;
    }
    interiorBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            interiorModal.style.display = 'flex';
            document.body.classList.add('no-scroll');
            setTimeout(() => {
                interiorModal.classList.add('active');
            }, 10);
        });
    });
    if (modalCloseX) {
        modalCloseX.addEventListener('click', function() {
            interiorModal.classList.remove('active');
            setTimeout(() => {
                interiorModal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }, 300);
        });
    }
    interiorModal.addEventListener('click', function(e) {
        if (e.target === interiorModal) {
            interiorModal.classList.remove('active');
            setTimeout(() => {
                interiorModal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }, 300);
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && interiorModal.style.display === 'flex') {
            interiorModal.classList.remove('active');
            setTimeout(() => {
                interiorModal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }, 300);
        }
    });
}

function initCharacterCounter() {
    const textarea = document.getElementById('mensaje');
    const charCount = document.querySelector('.character-count');
    if (textarea && charCount) {
        updateCharCount();
        textarea.addEventListener('input', function() {
            updateCharCount();
            adjustTextareaHeight();
        });
        function updateCharCount() {
            const maxLength = textarea.getAttribute('maxlength');
            const currentLength = textarea.value.length;
            charCount.textContent = `${currentLength}/${maxLength} characters`;
            if (currentLength >= maxLength - 50) {
                charCount.classList.add('limit-near');
            } else {
                charCount.classList.remove('limit-near');
            }
            if (currentLength >= maxLength - 10) {
                charCount.classList.add('limit-reached');
            } else {
                charCount.classList.remove('limit-reached');
            }
        }
        function adjustTextareaHeight() {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }
}

function initLineaAnimada() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const linea = entry.target.querySelector('.linea-animada');
                if (linea) {
                    linea.style.animation = 'none';
                    void linea.offsetWidth;
                    linea.style.animation = 'dibujar-linea 4.5s ease-in-out forwards, brillo-linea 3s infinite alternate 4.5s';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    const lineaContainers = document.querySelectorAll('.linea-animada-container');
    if (lineaContainers.length > 0) {
        lineaContainers.forEach(container => {
            observer.observe(container.parentElement);
        });
    }
}

function initializeCardFlippers() {
}

function initializeMobileNav() {
    console.log('Starting mobile menu configuration');
    
    const body = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Verify that necessary elements exist
    if (!menuToggle || !mainNav) {
        console.error('Error: Mobile menu elements not found');
        return;
    }
    
    // Ensure correct z-index for critical elements
    const heroBackground = document.querySelector('.hero-background');
    const header = document.querySelector('header');
    
    if (heroBackground) {
        heroBackground.style.zIndex = '-1';
        heroBackground.style.position = 'fixed';
        heroBackground.style.pointerEvents = 'none';
    }
    
    if (header) {
        header.style.zIndex = '9999';
    }
    
    // Function to show the menu
    function showMenu() {
        menuToggle.classList.add('active');
        mainNav.classList.add('active');
        body.classList.add('no-scroll');
        
        // Animate items with delay
        const navItems = document.querySelectorAll('.nav-list .nav-item');
        navItems.forEach((item, index) => {
            item.style.setProperty('--item-index', index);
        });
    }
    
    // Function to hide the menu
    function hideMenu() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        body.classList.remove('no-scroll');
    }
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (mainNav.classList.contains('active')) {
            hideMenu();
        } else {
            showMenu();
        }
    });
    
    // Hide menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close if on mobile and menu is active
            if (window.innerWidth <= 992 && mainNav.classList.contains('active')) {
                hideMenu();
            }
        });
    });
    
    // Hide menu on click outside
    document.addEventListener('click', function(e) {
        if (mainNav.classList.contains('active') && 
            !mainNav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            hideMenu();
        }
    });
    
    // Ensure menu closes when resizing window to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
            hideMenu();
        }
    });
    
    console.log('Mobile menu initialized successfully');
}

function initializeBookSlider() {
}

function initializeReadMore() {
}

function updateYear() {
}

function initializeRippleEffect() {
}

function fixAllVisibility() {
    if (imagesFixed) return;
    console.log("Applying visibility corrections...");
    imagesFixed = true;
    const supportsWebp = detectWebpSupport();
    console.log("WebP support:", supportsWebp);
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 576;
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                     (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const bgImg = supportsWebp ? 'assets/images/Hero_Background.webp' : 'assets/images/Hero_Background.png';
        heroBackground.style.backgroundImage = `url('${bgImg}')`;
        heroBackground.style.backgroundSize = "cover";
        heroBackground.style.backgroundRepeat = "no-repeat";
        heroBackground.style.display = "block";
        heroBackground.style.visibility = "visible";
        heroBackground.style.opacity = "1";
        heroBackground.style.position = "fixed";
        heroBackground.style.top = "0";
        heroBackground.style.left = "0";
        heroBackground.style.width = "100%";
        heroBackground.style.height = "100%";
        heroBackground.style.zIndex = "0";
        heroBackground.style.filter = "brightness(0.9) contrast(1.05)";
        heroBackground.style.transform = "translate3d(0, 0, 0)";
        heroBackground.style.willChange = "transform";
        heroBackground.style.backfaceVisibility = "hidden";
        if (isIOSDevice) {
            heroBackground.style.backgroundAttachment = "scroll";
            heroBackground.style.minHeight = "-webkit-fill-available";
            console.log("Applying adjustments for iOS");
        } else if (isMobile) {
            heroBackground.style.backgroundAttachment = "scroll";
            heroBackground.style.backgroundPosition = isSmallMobile ? "65% top" : "center top";
            console.log("Applying adjustments for mobile");
        } else {
            heroBackground.style.backgroundAttachment = "fixed";
            heroBackground.style.backgroundPosition = "center center";
            console.log("Applying adjustments for desktop");
        }
        console.log(`Hero background applied: ${bgImg}`);
    }
    document.body.classList.add('images-loaded');
}

window.addEventListener('resize', function() {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(function() {
        const wasSmallScreen = window.lastWidth <= 768;
        const isSmallScreen = window.innerWidth <= 768;
        if (wasSmallScreen !== isSmallScreen) {
            imagesFixed = false;
            fixAllVisibility();
            if (typeof initTestimonialsCarousel === 'function') {
                location.reload();
            }
        }
        window.lastWidth = window.innerWidth;
    }, 200);
}, { passive: true });

function copyEmail() {
    const emailText = document.getElementById('email-copy');
    const copyBtn = document.querySelector('.copy-btn');
    const textarea = document.createElement('textarea');
    textarea.value = emailText.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    copyBtn.classList.add('copied');
    const originalIcon = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = originalIcon;
    }, 2000);
}

// Scroll smooth for navigation links
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      
      if (!targetId) return;
      
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (mobileNav.classList.contains('active')) {
          toggleMobileMenu();
        }
        
        // Smooth scroll to section
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Animation for separators
function setupSeparatorAnimations() {
  const separators = [
    ...document.querySelectorAll('.separador'),
    ...document.querySelectorAll('.contact-about-separator')
  ];
  
  // ... existing code ...
}