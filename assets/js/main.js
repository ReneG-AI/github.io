// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Limpiar caché de recursos
    clearBrowserCache();

    // Detectar soporte WebP y aplicar clase al HTML
    detectWebpSupport();
    
    // Guardar el ancho de la ventana para comparaciones de resize
    window.lastWidth = window.innerWidth;
    
    // Inicializar funcionalidades
    initPreloader();
    initSmoothScroll();
    initHeaderScroll();
    
    // Precargar imágenes sin retraso
    preloadBookImages();
    
    initBookFlip();
    initializeInteriorModal();
    setupBackToTop();
    initCharacterCounter();
    initLineaAnimada(); // Iniciamos la animación de la línea
    initContactSeparator(); // Iniciar animación del separador de contacto
    
    // Inicializar AOS con configuración optimizada para rendimiento
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600, // Reducido para mayor rapidez
            easing: 'ease-out',
            once: true, // Cambiar a true para que las animaciones se ejecuten solo una vez
            disable: window.innerWidth < 768 ? 'phone' : false, // Deshabilitar en móviles para mejor rendimiento
            mirror: false
        });
    }
    
    // Mostrar la página inmediatamente
    document.body.classList.add('loaded');

    // Auto-resize textarea functionality
    const textarea = document.getElementById('mensaje');
    
    if (textarea) {
        // Función para ajustar altura automáticamente
        function autoResize() {
            // Reset height to auto to get the correct scrollHeight
            textarea.style.height = 'auto';
            // Set the height to match the content (but not less than min-height defined in CSS)
            textarea.style.height = Math.max(textarea.scrollHeight, 240) + 'px';
        }
        
        // Aplicar al cargar y cuando se escriba
        textarea.addEventListener('input', autoResize);
        
        // También actualizar en focus y blur
        textarea.addEventListener('focus', autoResize);
        textarea.addEventListener('blur', autoResize);
        
        // Inicializar
        setTimeout(autoResize, 100); // Pequeño retraso para asegurar que el DOM está completamente cargado
    }

    // Inicializar animación del separador
    initContactSeparator();

    // Ejecutar después de un breve retraso para asegurar que todo esté cargado
    setTimeout(fixContactSectionDisplay, 500);
    
    // También ejecutar cuando se redimensiona la ventana
    window.addEventListener('resize', fixContactSectionDisplay);

    // Inicializar AOS con configuración personalizada (si existe)
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
    
    // Inicializar volteo de tarjetas
    initializeCardFlippers();
    
    // Mostrar y ocultar menu de navegación en móviles
    initializeMobileNav();
    
    // Inicializar el slider de la sección de libros
    initializeBookSlider();
    
    // Leer más en testimonios
    initializeReadMore();
    
    // Formulario de contacto
    initializeContactForm();
    
    // Actualizar año automáticamente en el footer
    updateYear();
    
    // Scroll suave para anclas internas
    initSmoothScroll();
    
    // Animación para el botón de volver arriba
    initializeBackToTop();
    
    // Inicializar ripple effect en botones
    initializeRippleEffect();

    // Detectamos si es un dispositivo móvil
    const isMobile = window.innerWidth <= 768;

    // Detectamos el tema
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Inicializar navbar
    initNavbar();

    // Inicializar contador de caracteres para el formulario
    initCharacterCounter();
});

// Función para limpiar la caché del navegador de manera programática
function clearBrowserCache() {
    console.log("Limpiando caché del navegador...");
    
    // Método 1: Intentar recargar la página sin caché
    if (window.location.href.indexOf('cache_cleared') === -1) {
        // Solo lo hacemos una vez para evitar bucles
        const cacheBuster = new Date().getTime();
        const hasParams = window.location.href.indexOf('?') !== -1;
        const separator = hasParams ? '&' : '?';
        
        // No ejecutamos la recarga para evitar ciclos, solo dejamos preparado el código
        // window.location.href = window.location.href + separator + 'cache_cleared=' + cacheBuster;
        console.log("Parámetro para evitar caché: " + cacheBuster);
    }
    
    // Método 2: Eliminar service workers si existen
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for (let registration of registrations) {
                registration.unregister();
                console.log('Service Worker desregistrado');
            }
        });
    }
    
    // Método 3: Limpiar caché de recursos para evitar problemas con imágenes antiguas
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
    
    // Método 4: Forzar recarga de imágenes con timestamp
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.src && !img.src.includes('data:')) {
            const originalSrc = img.src;
            const timestamp = new Date().getTime();
            img.setAttribute('data-original-src', originalSrc);
            
            // Agregar un timestamp como parámetro para forzar recarga desde el servidor
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

// Función para detectar soporte de WebP y aplicar clase al documento
function detectWebpSupport() {
    var canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
        // Si soporta WebP
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
        // Navegador antiguo sin canvas
        document.documentElement.classList.add('no-webp-support');
        console.log("Navegador antiguo, usando PNG");
        return false;
    }
}

// Preloader
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

// Desplazamiento suave
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                // Reducir la duración para una respuesta más rápida
                const duration = 400; // Reducido drásticamente para mayor velocidad
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                let startTime = null;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Usar una curva de aceleración más agresiva para inicio rápido
                    const ease = t => t * (2 - t); // Función de aceleración más rápida
                    
                    window.scrollTo(0, startPosition + distance * ease(progress));
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                // Ejecutar inmediatamente
                requestAnimationFrame(animation);
            }
        });
    });
}

// Efecto de scroll en el encabezado
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

// Back to top button
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
        
        // Reducir la duración para una respuesta más rápida
        const duration = 400; // Reducido drásticamente para mayor velocidad
        const startPosition = window.pageYOffset;
        const distance = -startPosition; // Distancia hasta el top (0)
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Usar una curva de aceleración más agresiva para inicio rápido
            const ease = t => t * (2 - t); // Función de aceleración más rápida
            
            window.scrollTo(0, startPosition + distance * ease(progress));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        // Ejecutar inmediatamente
        requestAnimationFrame(animation);
    });
}

// Función para precargar todas las imágenes de portadas y contraportadas
function preloadBookImages() {
    // Control para evitar múltiples precargas
    if (window.imagesPreloaded) return;
    window.imagesPreloaded = true;
    
    console.log("Precargando imágenes WebP de libros...");
    
    // Obtener todas las imágenes de portada y contraportada que estén en la vista
    const visibleCovers = Array.from(document.querySelectorAll('.book-cover, .book-back')).filter(img => {
        const rect = img.getBoundingClientRect();
        return (
            rect.top >= -img.height &&
            rect.left >= -img.width &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) + img.height &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) + img.width
        );
    });
    
    // Limitar a máximo 3 imágenes para evitar sobrecarga
    const imagesToPreload = visibleCovers.slice(0, 3);
    
    // Precargar solo las imágenes visibles
    imagesToPreload.forEach(img => {
        if (img.src && !img.complete) {
            const preloadImg = new Image();
            preloadImg.src = img.src;
            console.log("Precargando:", img.src);
        }
    });
}

// Inicializar funciones para el efecto de flip de libros
function initBookFlip() {
    // Seleccionar todos los flippers de libros
    const bookFlippers = document.querySelectorAll('.book-flipper');
    const flipButtons = document.querySelectorAll('.flip-button');
    
    // Para cada flipper
    bookFlippers.forEach((flipper, index) => {
        // Asegurarse de que tenga un ID
        if (!flipper.id) {
            flipper.id = `flipper${index + 1}`;
        }
        
        // Manejar clic en la portada/contraportada para girar
        flipper.addEventListener('click', function(e) {
            // Solo girar cuando se hace clic en la imagen, no en el botón
            if (e.target.tagName === 'IMG' || e.target === this) {
                this.classList.toggle('flipped');
            }
        });
    });
    
    // Botones de girar también activan el efecto
    flipButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Evitar que el clic se propague al flipper
            
            // Encontrar el flipper asociado al botón
            const bookImages = this.closest('.book-images');
            const flipper = bookImages.querySelector('.book-flipper');
            
            if (flipper) {
                flipper.classList.toggle('flipped');
            }
        });
    });
}

// Función para inicializar el modal de "Ver Interior"
function initializeInteriorModal() {
    const interiorBtns = document.querySelectorAll('.interior-btn');
    const interiorModal = document.getElementById('interiorModal');
    const modalCloseX = document.getElementById('modalCloseX');
    
    if (!interiorModal) {
        console.warn('Modal de interior no encontrado');
        return;
    }
    
    // Abrir modal al hacer clic en los botones "Ver Interior"
    interiorBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            interiorModal.style.display = 'flex';
            document.body.classList.add('no-scroll');
            
            // Animación de entrada
            setTimeout(() => {
                interiorModal.classList.add('active');
            }, 10);
        });
    });
    
    // Cerrar modal al hacer clic en la X
    if (modalCloseX) {
        modalCloseX.addEventListener('click', function() {
            interiorModal.classList.remove('active');
            
            // Esperar a que termine la animación antes de ocultar
            setTimeout(() => {
                interiorModal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }, 300);
        });
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    interiorModal.addEventListener('click', function(e) {
        if (e.target === interiorModal) {
            interiorModal.classList.remove('active');
            
            // Esperar a que termine la animación antes de ocultar
            setTimeout(() => {
                interiorModal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }, 300);
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && interiorModal.style.display === 'flex') {
            interiorModal.classList.remove('active');
            
            // Esperar a que termine la animación antes de ocultar
            setTimeout(() => {
                interiorModal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }, 300);
        }
    });
}

// Inicializar contador de caracteres y auto-altura del textarea
function initCharacterCounter() {
    const textarea = document.getElementById('mensaje');
    const charCount = document.querySelector('.character-count');
    
    if (textarea && charCount) {
        // Actualizar contador al cargar la página
        updateCharCount();
        
        // Agregar evento para actualizar el contador y la altura
        textarea.addEventListener('input', function() {
            updateCharCount();
            adjustTextareaHeight();
        });
        
        // Función para actualizar el contador de caracteres
        function updateCharCount() {
            const maxLength = textarea.getAttribute('maxlength');
            const currentLength = textarea.value.length;
            charCount.textContent = `${currentLength}/${maxLength} caracteres`;
            
            // Cambiar color según el progreso
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
        
        // Función para ajustar la altura del textarea
        function adjustTextareaHeight() {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }
}

// Función para animar la línea cuando sea visible
function initLineaAnimada() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento es visible
            if (entry.isIntersecting) {
                // Reiniciar la animación
                const linea = entry.target.querySelector('.linea-animada');
                if (linea) {
                    linea.style.animation = 'none';
                    // Forzar un reflow
                    void linea.offsetWidth;
                    // Restaurar la animación
                    linea.style.animation = 'dibujar-linea 4.5s ease-in-out forwards, brillo-linea 3s infinite alternate 4.5s';
                }
                // Dejar de observar después de activar la animación
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // 20% del elemento debe ser visible

    // Observar todos los contenedores de líneas animadas
    const lineaContainers = document.querySelectorAll('.linea-animada-container');
    if (lineaContainers.length > 0) {
        lineaContainers.forEach(container => {
            observer.observe(container.parentElement);
        });
    }
}

// Función para animar la línea separadora entre Contáctame y Acerca del Autor
function initContactSeparator() {
    // Solo aplicar en dispositivos móviles y tablets (max-width: 992px)
    if (window.innerWidth <= 992) {
        const contactSeparator = document.querySelector('.contact-about-separator');
        
        if (contactSeparator) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Añadir clase para iniciar animación
                        entry.target.classList.add('animate');
                        
                        // Eliminar brillo existente si hay alguno
                        const existingShine = entry.target.querySelector('.separator-shine');
                        if (existingShine) {
                            existingShine.remove();
                        }
                        
                        // Añadir efecto de brillo
                        const shine = document.createElement('div');
                        shine.classList.add('separator-shine');
                        entry.target.appendChild(shine);
                        
                        // Animar el brillo después de un retraso
                        setTimeout(() => {
                            shine.style.animation = 'separator-shimmer 2s infinite';
                        }, 800);
                        
                        // Dejar de observar el elemento
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            // Comenzar a observar el separador
            observer.observe(contactSeparator);
        }
    }
}

// Reinicializar en cambios de tamaño de ventana
window.addEventListener('resize', function() {
    // Reinicializar separador en cambios de tamaño
    initContactSeparator();
});

/**
 * Función para asegurar la correcta visualización de la sección de contacto
 * Especialmente útil para igualar las alturas de los contenedores
 */
function fixContactSectionDisplay() {
    // Solo aplicar en dispositivos de escritorio
    if (window.innerWidth >= 992) {
        const formContainer = document.querySelector('.contacto-form-container');
        const autorContainer = document.querySelector('.autor-container');
        
        if (formContainer && autorContainer) {
            // Obtener la altura del contenedor del formulario
            const formHeight = formContainer.offsetHeight;
            
            // Aplicar la misma altura al contenedor del autor
            autorContainer.style.minHeight = formHeight + 'px';
            
            // Asegurar que el contenedor del autor no esté recortado
            autorContainer.style.paddingTop = '3rem';
            
            // Verificar que el título y el avatar sean visibles
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

// Inicializar volteo de tarjetas
function initializeCardFlippers() {
    // Implementa la lógica para inicializar el volteo de tarjetas
}

// Mostrar y ocultar menu de navegación en móviles
function initializeMobileNav() {
    console.log('Initializing modern mobile menu...');
    
    // Get references to menu elements
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navItems = document.querySelectorAll('.nav-list .nav-item');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    const isMobile = () => window.innerWidth <= 992;
    
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
        // Only animate items out if on mobile
        if (isMobile()) {
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
        } else {
            // On desktop, just remove the classes immediately without changing opacity
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            body.classList.remove('no-scroll');
            
            // Ensure navigation items remain visible on desktop
            navItems.forEach(item => {
                item.style.opacity = '';
                item.style.transform = '';
            });
            
            // Restore z-index for hero background
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.zIndex = '';
            }
        }
    }
    
    // Ensure desktop nav is visible on wide screens
    function ensureCorrectNavDisplay() {
        if (!isMobile()) {
            // On desktop, make sure nav items are visible
            navItems.forEach(item => {
                item.style.opacity = '';
                item.style.transform = '';
            });
            
            // Ensure the main nav is not hidden
            if (!mainNav.classList.contains('active')) {
                mainNav.style.visibility = 'visible';
                mainNav.style.opacity = '1';
                mainNav.style.pointerEvents = 'auto';
            }
        }
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
            // Only hide menu on mobile devices
            if (isMobile()) {
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
            } else if (this.getAttribute('href').startsWith('#')) {
                // For desktop, still handle smooth scrolling to anchors
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
        
        // Ensure desktop nav is visible when resizing
        ensureCorrectNavDisplay();
    });
    
    // When scrolling while menu is open, prevent background content from scrolling
    document.addEventListener('scroll', function(e) {
        if (isMobile() && mainNav.classList.contains('active')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, { passive: false });
    
    // Initialize any active state if page loads with menu active
    if (menuToggle.classList.contains('active')) {
        showMenu();
    } else {
        ensureCorrectNavDisplay();
    }
    
    // Run on initial load to ensure correct display
    ensureCorrectNavDisplay();
    
    console.log('Modern mobile menu initialized successfully!');
}

// Inicializar el slider de la sección de libros
function initializeBookSlider() {
    // Implementa la lógica para inicializar el slider de libros
}

// Leer más en testimonios
function initializeReadMore() {
    // Implementa la lógica para inicializar la funcionalidad "Leer más..." en testimonios
}

// Formulario de contacto
function initializeContactForm() {
    // Implementa la lógica para inicializar el formulario de contacto
}

// Actualizar año automáticamente en el footer
function updateYear() {
    // Implementa la lógica para actualizar el año automáticamente en el footer
}

// Inicializar ripple effect en botones
function initializeRippleEffect() {
    // Implementa la lógica para inicializar el efecto ripple en botones
}

// Función principal para arreglar todos los problemas de visualización - optimizada
function fixAllVisibility() {
    if (imagesFixed) return; // Evitar ejecuciones múltiples
    
    console.log("Aplicando correcciones de visibilidad...");
    imagesFixed = true;
    
    // Detectar soporte WebP
    const supportsWebp = detectWebpSupport();
    console.log("Soporte WebP:", supportsWebp);
    
    // Detectar dispositivo para aplicar estilos óptimos
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 576;
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                     (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    // Aplicar fondo del hero optimizado según dispositivo
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const bgImg = supportsWebp ? 'assets/images/Hero_Background.webp' : 'assets/images/Hero_Background.png';
        
        // Estilos base para todos los dispositivos
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
        
        // Fix de rendimiento para todos los dispositivos
        heroBackground.style.transform = "translate3d(0, 0, 0)";
        heroBackground.style.willChange = "transform";
        heroBackground.style.backfaceVisibility = "hidden";
        
        // Ajustes específicos según dispositivo
        if (isIOSDevice) {
            // Ajustes específicos para iOS
            heroBackground.style.backgroundAttachment = "scroll";
            heroBackground.style.minHeight = "-webkit-fill-available";
            console.log("Aplicando ajustes para iOS");
        } else if (isMobile) {
            // Ajustes para móviles en general - usar scroll en lugar de fixed para mejorar rendimiento
            heroBackground.style.backgroundAttachment = "scroll";
            heroBackground.style.backgroundPosition = isSmallMobile ? "65% top" : "center top";
            console.log("Aplicando ajustes para móviles");
        } else {
            // Ajustes para escritorio
            heroBackground.style.backgroundAttachment = "fixed";
            heroBackground.style.backgroundPosition = "center center";
            console.log("Aplicando ajustes para escritorio");
        }
        
        console.log(`Fondo del hero aplicado: ${bgImg}`);
    }
    
    // Marcar el cuerpo como cargado
    document.body.classList.add('images-loaded');
}

// Volver a aplicar al cambiar el tamaño de la ventana (resize) - optimizado con debounce
window.addEventListener('resize', function() {
    // Debounce para evitar múltiples ejecuciones
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(function() {
        // Solo reajustar cuando sea realmente necesario (cambio significativo de tamaño)
        const wasSmallScreen = window.lastWidth <= 768;
        const isSmallScreen = window.innerWidth <= 768;
        
        if (wasSmallScreen !== isSmallScreen) {
            imagesFixed = false;
            fixAllVisibility();
            
            // Refrescar testimonios si existe la función
            if (typeof initTestimonialsCarousel === 'function') {
                location.reload(); // Mejor opción si cambia significativamente el layout
            }
        }
        window.lastWidth = window.innerWidth;
    }, 200);
}, { passive: true });

// Función para copiar el correo electrónico
function copyEmail() {
  const emailText = document.getElementById('email-copy');
  const copyBtn = document.querySelector('.copy-btn');
  
  // Crear un elemento temporal para copiar el texto
  const textarea = document.createElement('textarea');
  textarea.value = emailText.textContent;
  document.body.appendChild(textarea);
  
  // Seleccionar y copiar el texto
  textarea.select();
  document.execCommand('copy');
  
  // Eliminar el elemento temporal
  document.body.removeChild(textarea);
  
  // Mostrar efecto visual de copiado
  copyBtn.classList.add('copied');
  const originalIcon = copyBtn.innerHTML;
  copyBtn.innerHTML = '<i class="fas fa-check"></i>';
  
  // Restaurar el botón después de 2 segundos
  setTimeout(() => {
    copyBtn.classList.remove('copied');
    copyBtn.innerHTML = originalIcon;
  }, 2000);
} 