// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Detectar soporte WebP y aplicar clase al HTML
    detectWebpSupport();
    
    // Inicializar funcionalidades
    initPreloader();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    
    // Precargar imágenes sin retraso
    preloadBookImages();
    
    initBookFlip();
    initInteriorModal();
    setupBackToTop();
    initCharacterCounter();
    initLineaAnimada(); // Iniciamos la animación de la línea
    
    // Inicializar AOS con mínimo retraso
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600, // Reducido para mayor rapidez
            easing: 'ease-out',
            once: true,
            mirror: false
        });
    }
    
    // Mostrar la página inmediatamente
    document.body.classList.add('loaded');

    // JavaScript para funcionalidad "Leer más..." en testimonios
    const readMoreToggles = document.querySelectorAll('.read-more-toggle');
    
    readMoreToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const testimonialText = this.parentElement;
            
            if (testimonialText.classList.contains('expanded')) {
                testimonialText.classList.remove('expanded');
                this.textContent = 'Leer más...';
            } else {
                testimonialText.classList.add('expanded');
                this.textContent = 'Leer menos';
            }
        });
    });

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
});

// Función para detectar soporte de WebP y aplicar clase al documento
function detectWebpSupport() {
    var canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
        // Si soporta WebP
        if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
            document.documentElement.classList.add('webp-support');
            console.log("Soporte WebP detectado");
        } else {
            document.documentElement.classList.add('no-webp-support');
            console.log("Sin soporte WebP, usando PNG");
        }
    } else {
        // Navegador antiguo sin canvas
        document.documentElement.classList.add('no-webp-support');
        console.log("Navegador antiguo, usando PNG");
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

// Menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (menuToggle && mainNav) {
        // Agregar evento click al botón de menú
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevenir propagación para mejor rendimiento
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Sólo prevenir scroll en dispositivos pequeños donde el menú ocupa más espacio
            if (window.innerWidth <= 576) {
                body.classList.toggle('no-scroll');
            }
        });

        // Optimizar cierre del menú al hacer clic en los enlaces
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Si es un enlace interno, prevenir comportamiento predeterminado
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    // Cerrar el menú inmediatamente
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.classList.remove('no-scroll');
                    
                    // Hacer scroll hacia el destino
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80;
                        
                        // Scroll más rápido usando scrollTo con comportamiento nativo
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth' 
                        });
                    }
                } else {
                    // Para enlaces externos, solo cerrar el menú
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            // Verificar que el menú esté abierto primero
            if (mainNav.classList.contains('active')) {
                const isClickInsideMenu = mainNav.contains(event.target);
                const isClickOnToggle = menuToggle.contains(event.target);
                
                if (!isClickInsideMenu && !isClickOnToggle) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            }
        });
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('no-scroll');
            }
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
    flipButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Evitar que el clic se propague al flipper
            
            // Buscar si es un libro sprite o normal
            const bookImages = this.closest('.book-images');
            const flipper = bookImages.querySelector('.book-flipper');
            const spriteContainer = bookImages.querySelector('.book-sprite-container');
            
            // Si es un libro estándar
            if (flipper) {
                flipper.classList.toggle('flipped');
            }
            // Si es un libro con sprite
            else if (spriteContainer) {
                spriteContainer.classList.toggle('flipped');
            }
        });
    });
    
    // Inicializar los libros basados en sprite
    const spriteContainers = document.querySelectorAll('.book-sprite-container');
    spriteContainers.forEach(container => {
        container.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
}

// Modal para "Ver interior"
function initInteriorModal() {
    const modal = document.getElementById('interiorModal');
    const interiorBtns = document.querySelectorAll('.interior-btn');
    const closeBtnX = document.getElementById('modalCloseX');
    
    if (modal && interiorBtns.length) {
        interiorBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.add('active');
            });
        });
        
        // Cerrar con el botón X
        if (closeBtnX) {
            closeBtnX.addEventListener('click', function() {
                modal.classList.remove('active');
            });
        }
        
        // Cerrar modal haciendo clic fuera
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

// Contador de caracteres para el formulario
function initCharacterCounter() {
    const messageTextarea = document.getElementById('mensaje');
    const characterCount = document.querySelector('.character-count');
    
    if (messageTextarea && characterCount) {
        // Actualizar contador al cargar
        updateCharacterCount();
        
        // Actualizar contador cuando se escriba en el área de texto
        messageTextarea.addEventListener('input', updateCharacterCount);
        
        function updateCharacterCount() {
            const currentLength = messageTextarea.value.length;
            const maxLength = messageTextarea.getAttribute('maxlength');
            characterCount.textContent = `${currentLength}/${maxLength} caracteres`;
            
            // Cambiar color cuando se acerca al límite
            if (currentLength >= maxLength * 0.9) {
                characterCount.style.color = 'var(--warning-color)';
            } else if (currentLength >= maxLength * 0.8) {
                characterCount.style.color = 'var(--accent-color)';
            } else {
                characterCount.style.color = 'var(--gray)';
            }
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