// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initPreloader();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initBookFlip();
    initInteriorModal();
    initBackToTop();
    initCharacterCounter();
    initParticles();
    
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
    }, 100);
    
    // Mostrar la página después de cargar
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 300);
});

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

// Botón volver arriba
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
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
            const flipper = this.closest('.book-images').querySelector('.book-flipper');
            if (flipper) {
                flipper.classList.toggle('flipped');
            }
        });
    });
}

// Modal para "Ver interior"
function initInteriorModal() {
    const modal = document.getElementById('interiorModal');
    const interiorBtns = document.querySelectorAll('.interior-btn');
    const closeModal = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');
    
    if (modal && interiorBtns.length) {
        interiorBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
            });
        });
        
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            });
        }
        
        if (modalBtn) {
            modalBtn.addEventListener('click', function() {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            });
        }
        
        // Cerrar modal haciendo clic fuera
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
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

// Inicializar sistema de partículas
function initParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

// Crear una partícula individual
function createParticle(container) {
    const particle = document.createElement('div');
    
    // Estilos base
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = 'rgba(255, 255, 255, ' + (Math.random() * 0.3 + 0.2) + ')';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    
    // Posición inicial
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    
    // Añadir al contenedor
    container.appendChild(particle);
    
    // Animación
    animateParticle(particle);
}

// Animar una partícula
function animateParticle(particle) {
    // Valores iniciales
    const duration = Math.random() * 15 + 10; // 10-25 segundos
    const startPositionX = parseFloat(particle.style.left);
    const startPositionY = parseFloat(particle.style.top);
    const endPositionX = startPositionX + (Math.random() * 20 - 10);
    const endPositionY = startPositionY - Math.random() * 30;
    
    // Preparar animación
    particle.animate([
        { 
            left: startPositionX + 'vw', 
            top: startPositionY + 'vh',
            opacity: 0,
            transform: 'scale(0)'
        },
        { 
            opacity: Math.random() * 0.5 + 0.3,
            transform: 'scale(1)',
            offset: 0.2
        },
        { 
            left: endPositionX + 'vw', 
            top: endPositionY + 'vh',
            opacity: 0,
            transform: 'scale(0)'
        }
    ], {
        duration: duration * 1000,
        easing: 'ease-in-out',
        iterations: Infinity
    });
}

// Mejorar la interactividad de la flecha
function setupScrollArrow() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (!scrollArrow) return;
    
    scrollArrow.addEventListener('click', function() {
        const librosSection = document.getElementById('libros');
        if (librosSection) {
            librosSection.scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    });
}

// Ejecutar después del DOM
window.addEventListener('load', function() {
    setupScrollArrow();
    
    // Lógica de Preloader (debe ya existir)
    setTimeout(function() {
        document.querySelector('.preloader')?.classList.add('fade-out');
    }, 500);
    
    // Inicializar AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
    
    // ... existing code ...
}); 