// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Detectar soporte WebP y aplicar clase al HTML
    detectWebpSupport();
    
    // Inicializar funcionalidades
    initPreloader();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    // Precargar más tarde, cuando el resto de la página esté lista
    setTimeout(function() {
        preloadBookImages();
    }, 2000);
    initBookFlip();
    initInteriorModal();
    setupBackToTop();
    initCharacterCounter();
    
    // Inicializar AOS con un retraso para mejor rendimiento
    setTimeout(function() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        }
    }, 1000);
    
    // Mostrar la página después de cargar
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 300);
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
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });

        // Cerrar menú al hacer clic en los enlaces de navegación
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('no-scroll');
            });
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
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    const closeBtn = document.getElementById('modalClose');
    
    if (modal && interiorBtns.length) {
        interiorBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.add('active');
            });
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
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