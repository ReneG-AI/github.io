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
    initContactSeparator();
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            easing: 'ease-out',
            once: true,
            disable: window.innerWidth < 768 ? 'phone' : false,
            mirror: false
        });
    }
    document.body.classList.add('loaded');
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
    initContactSeparator();
    setTimeout(fixContactSectionDisplay, 500);
    window.addEventListener('resize', fixContactSectionDisplay);
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
        console.warn("AOS no está disponible. Algunas animaciones no funcionarán.");
    }
    initializeCardFlippers();
    initializeMobileNav();
    initializeBookSlider();
    initializeReadMore();
    initializeContactForm();
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
            console.log('Aplicando z-index -1 a hero-background');
        }
        if (header) {
            header.style.zIndex = '9999';
            console.log('Aplicando z-index 9999 a header');
        }
    }, 300);
});

function clearBrowserCache() {
    console.log("Limpiando caché del navegador...");
    if (window.location.href.indexOf('cache_cleared') === -1) {
        const cacheBuster = new Date().getTime();
        const hasParams = window.location.href.indexOf('?') !== -1;
        const separator = hasParams ? '&' : '?';
        console.log("Parámetro para evitar caché: " + cacheBuster);
    }
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for (let registration of registrations) {
                registration.unregister();
                console.log('Service Worker desregistrado');
            }
        });
    }
    if (window.caches) {
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    console.log('Eliminando caché: ' + cacheName);
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
            console.log('Recargando imagen: ' + img.src);
        }
    });
    console.log("Caché limpiada correctamente");
}

function detectWebpSupport() {
    var canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
        if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
            document.documentElement.classList.add('webp-support');
            console.log("Soporte WebP detectado");
            return true;
        } else {
            document.documentElement.classList.add('no-webp-support');
            console.log("Sin soporte WebP, usando PNG");
            return false;
        }
    } else {
        document.documentElement.classList.add('no-webp-support');
        console.log("Navegador antiguo, usando PNG");
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
        console.warn('Modal de interior no encontrado');
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
            charCount.textContent = `${currentLength}/${maxLength} caracteres`;
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

function initContactSeparator() {
    if (window.innerWidth <= 992) {
        const contactSeparator = document.querySelector('.contact-about-separator');
        if (contactSeparator) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        const existingShine = entry.target.querySelector('.separator-shine');
                        if (existingShine) {
                            existingShine.remove();
                        }
                        const shine = document.createElement('div');
                        shine.classList.add('separator-shine');
                        entry.target.appendChild(shine);
                        setTimeout(() => {
                            shine.style.animation = 'separator-shimmer 2s infinite';
                        }, 800);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(contactSeparator);
        }
    }
}

window.addEventListener('resize', function() {
    initContactSeparator();
});

function fixContactSectionDisplay() {
    if (window.innerWidth >= 992) {
        const formContainer = document.querySelector('.contacto-form-container');
        const autorContainer = document.querySelector('.autor-container');
        if (formContainer && autorContainer) {
            const formHeight = formContainer.offsetHeight;
            autorContainer.style.minHeight = formHeight + 'px';
            autorContainer.style.paddingTop = '3rem';
            const autorTitle = autorContainer.querySelector('.autor-title');
            const autorAvatar = autorContainer.querySelector('.autor-avatar');
            if (autorTitle) {
                autorTitle.style.marginTop = '0';
                autorTitle.style.visibility = 'visible';
            }
            if (autorAvatar) {
                autorAvatar.style.marginTop = '0';
                autorAvatar.style.visibility = 'visible';
            }
        }
    }
}

function initializeCardFlippers() {
}

function initializeMobileNav() {
    console.log('Initializing modern mobile menu...');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navItems = document.querySelectorAll('.nav-list .nav-item');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    const isMobile = () => window.innerWidth <= 992;
    if (!menuToggle || !mainNav) {
        console.error('Could not find required menu elements!');
        return;
    }
    console.log(`Found ${navItems.length} navigation items`);
    
    // Aseguramos los z-index correctos
    const header = document.querySelector('header');
    if (header) header.style.zIndex = '10000';
    menuToggle.style.zIndex = '20000';
    mainNav.style.zIndex = '19999';
    
    // Comprobamos si el menú ya está inicializado
    if (menuToggle.hasAttribute('data-menu-initialized')) {
        console.log('Menu already initialized. Skipping to avoid duplicate listeners.');
        return;
    }
    
    // Marcamos el menú como inicializado
    menuToggle.setAttribute('data-menu-initialized', 'true');
    
    function showMenu() {
        // Add active classes
        menuToggle.classList.add('active');
        mainNav.classList.add('active');
        body.classList.add('no-scroll');
        
        // Asegurar que el heroBackground no tape el menú
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.zIndex = '-1';
            heroBackground.style.position = 'fixed';
            heroBackground.style.pointerEvents = 'none';
        }
        
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
            }, 50 + (index * 70));
        });
        
        // Ensure the nav list is visible
        const navList = document.querySelector('.nav-list');
        if (navList) {
            navList.style.display = 'flex';
        }
    }
    
    function hideMenu() {
        if (isMobile()) {
            navItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            });
            setTimeout(() => {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('no-scroll');
            }, 300);
        } else {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            body.classList.remove('no-scroll');
            navItems.forEach(item => {
                item.style.opacity = '';
                item.style.transform = '';
            });
        }
        
        // Mantenemos el heroBackground con z-index negativo
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.zIndex = '-1';
        }
    }
    
    function ensureCorrectNavDisplay() {
        if (!isMobile()) {
            navItems.forEach(item => {
                item.style.opacity = '';
                item.style.transform = '';
            });
            if (!mainNav.classList.contains('active')) {
                mainNav.style.visibility = 'visible';
                mainNav.style.opacity = '1';
                mainNav.style.pointerEvents = 'auto';
            }
        }
    }
    
    // Limpiamos eventos anteriores por si acaso
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
    
    // Volvemos a asignar menuToggle a la nueva referencia
    const updatedMenuToggle = document.querySelector('.menu-toggle');
    
    updatedMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Menu toggle clicked');
        if (mainNav.classList.contains('active')) {
            hideMenu();
        } else {
            showMenu();
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (isMobile() && mainNav.classList.contains('active')) {
                if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    hideMenu();
                    if (targetElement) {
                        setTimeout(() => {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }, 400);
                    }
                } else if (this.getAttribute('href') && !this.getAttribute('href').startsWith('http')) {
                    hideMenu();
                }
            } else if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    document.addEventListener('click', function(e) {
        if (mainNav.classList.contains('active') && 
            !mainNav.contains(e.target) && 
            !updatedMenuToggle.contains(e.target)) {
            hideMenu();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            hideMenu();
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
            hideMenu();
        }
        ensureCorrectNavDisplay();
    });
    
    // Fix para evitar scroll cuando el menú está activo
    document.addEventListener('scroll', function(e) {
        if (isMobile() && mainNav.classList.contains('active')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, { passive: false });
    
    if (menuToggle.classList.contains('active')) {
        showMenu();
    } else {
        ensureCorrectNavDisplay();
    }
    
    // Último aseguramiento de Z-index
    setTimeout(function() {
        const heroBackground = document.querySelector('.hero-background');
        const header = document.querySelector('header');
        
        if (header) header.style.zIndex = '10000';
        if (updatedMenuToggle) updatedMenuToggle.style.zIndex = '20000';
        if (mainNav) mainNav.style.zIndex = '19999';
        
        if (heroBackground) {
            heroBackground.style.zIndex = '-1';
            heroBackground.style.position = 'fixed';
            heroBackground.style.pointerEvents = 'none';
        }
    }, 500);
    
    ensureCorrectNavDisplay();
    console.log('Modern mobile menu initialized successfully!');
}

function initializeBookSlider() {
}

function initializeReadMore() {
}

function initializeContactForm() {
}

function updateYear() {
}

function initializeRippleEffect() {
}

function fixAllVisibility() {
    if (imagesFixed) return;
    console.log("Aplicando correcciones de visibilidad...");
    imagesFixed = true;
    const supportsWebp = detectWebpSupport();
    console.log("Soporte WebP:", supportsWebp);
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
            console.log("Aplicando ajustes para iOS");
        } else if (isMobile) {
            heroBackground.style.backgroundAttachment = "scroll";
            heroBackground.style.backgroundPosition = isSmallMobile ? "65% top" : "center top";
            console.log("Aplicando ajustes para móviles");
        } else {
            heroBackground.style.backgroundAttachment = "fixed";
            heroBackground.style.backgroundPosition = "center center";
            console.log("Aplicando ajustes para escritorio");
        }
        console.log(`Fondo del hero aplicado: ${bgImg}`);
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