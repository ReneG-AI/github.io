// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Asegurarse de que el menú está cerrado al inicio
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.remove('active');
        // También forzar estilos inline para asegurarse
        navLinks.style.display = 'flex';
    }
    
    // Inicializar funcionalidades
    initPreloader();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initScrollEffects();
    initAnimations();
    
    // Inicializar AOS con un retraso para mejor rendimiento
    if (typeof AOS !== 'undefined') {
        // Retrasar la inicialización de AOS para mejorar el rendimiento en carga inicial
        setTimeout(function() {
            initAOS();
        }, 100);
    }
    
    initBackToTop();
    initBookFlip();
    initInteriorModal();
    
    // Create particles container
    createParticles();

    // Asegurar modo oscuro permanente
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    localStorage.setItem('darkMode', 'enabled');
    
    // Manejar el boton de explorar libros desde la vista inicial
    const scrollTriggerBtn = document.querySelector('.scroll-trigger');
    if (scrollTriggerBtn) {
        scrollTriggerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Activar transición a vista scroll
            window.scrollTo({
                top: window.innerHeight * 0.5, // Scrollear lo suficiente para activar la transición
                behavior: 'smooth'
            });
            
            // Mostrar contenido de libros de forma inmediata
            setTimeout(function() {
                const scrollableSections = document.querySelectorAll('.scrollable-section');
                scrollableSections.forEach(section => {
                    section.classList.add('visible');
                });
            }, 500);
        });
    }

    // Mostrar la página después de cargar
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('preloader-hide');
        });
    }
}

// Menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });

        // Cerrar menú al hacer clic en el overlay
        overlay.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            this.classList.remove('active');
            body.classList.remove('no-scroll');
        });

        // Cerrar menú al hacer clic en enlaces
        const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
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
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
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

// Inicializar AOS para animaciones
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true
        });
    }
}

// Botón volver arriba
function initBackToTop() {
    // Verificar si ya existe el botón
    let backToTop = document.getElementById('back-to-top');
    
    // Si no existe, crearlo
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.id = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTop.className = 'back-to-top-btn';
        document.body.appendChild(backToTop);
    }
    
    // Mostrar/ocultar botón según el scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Acción al hacer clic en el botón
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Función para manejar los efectos de scroll
function initScrollEffects() {
    const heroInitial = document.querySelector('.hero-initial');
    const leftFixed = document.querySelector('.left-fixed');
    const rightScrollable = document.querySelector('.right-scrollable');
    const scrollButton = document.querySelector('.scroll-trigger');
    const scrollableSections = document.querySelectorAll('.scrollable-section');
    const booksSection = document.getElementById('libros');
    const testimoniosSection = document.getElementById('testimonios');
    const contactoSection = document.getElementById('contacto');
    
    if (heroInitial && leftFixed && rightScrollable) {
        // Estado inicial: título centrado
        heroInitial.classList.add('active');
        
        // Botón para bajar al contenido scrollable
        if (scrollButton) {
            scrollButton.addEventListener('click', function() {
                const targetPosition = window.innerHeight * 0.85;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        }
        
        // Control de efectos de scroll
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Transición de título centrado a layout dividido
            if (scrollPosition > windowHeight * 0.15) {
                heroInitial.classList.add('scrolled');
                leftFixed.classList.add('scrolled');
                rightScrollable.classList.add('scrolled');
            } else {
                heroInitial.classList.remove('scrolled');
                leftFixed.classList.remove('scrolled');
                rightScrollable.classList.remove('scrolled');
            }
            
            // Detectar cuando termina la sección de libros y comienzan testimonios
            if (testimoniosSection) {
                const testimoniosPosition = testimoniosSection.getBoundingClientRect().top;
                
                // Cuando los testimonios están a punto de ser visibles
                if (testimoniosPosition < windowHeight * 0.8) {
                    leftFixed.classList.add('testimonials-visible');
                    rightScrollable.classList.add('full-width');
                    
                    // Marcar las secciones como de ancho completo
                    if (testimoniosSection) {
                        testimoniosSection.classList.add('full-width-section');
                    }
                    
                    if (contactoSection) {
                        contactoSection.classList.add('full-width-section');
                    }
                } else {
                    leftFixed.classList.remove('testimonials-visible');
                    rightScrollable.classList.remove('full-width');
                    
                    // Quitar la clase de ancho completo
                    if (testimoniosSection) {
                        testimoniosSection.classList.remove('full-width-section');
                    }
                    
                    if (contactoSection) {
                        contactoSection.classList.remove('full-width-section');
                    }
                }
            }
            
            // Animar las secciones scrollables cuando son visibles
            scrollableSections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionBottom = section.getBoundingClientRect().bottom;
                
                if (sectionTop < windowHeight * 0.85 && sectionBottom > 0) {
                    section.classList.add('visible');
                } else {
                    section.classList.remove('visible');
                }
            });
        });
        
        // Trigger scroll event on load to set initial state
        window.dispatchEvent(new Event('scroll'));
    }
}

// Inicializar funciones para el efecto de flip de libros
function initBookFlip() {
    // Seleccionar todos los flippers de libros
    const bookFlippers = document.querySelectorAll('.book-flipper');
    
    // Para cada flipper
    bookFlippers.forEach((flipper, index) => {
        // Añadir ID si no lo tiene
        if (!flipper.id) {
            flipper.id = `flipper${index + 1}`;
        }
        
        // Manejar clic en la portada/contraportada para girar
        flipper.addEventListener('click', function(e) {
            // Solo girar cuando se hace clic en la imagen, no en el botón
            if (e.target.tagName === 'IMG') {
                this.classList.toggle('flipped');
            }
        });
        
        // Prevenir movimiento extraño al pasar el ratón sobre el libro girado
        flipper.addEventListener('mouseenter', function() {
            if (this.classList.contains('flipped')) {
                this.style.transform = 'rotateY(180deg)';
            }
        });
        
        flipper.addEventListener('mouseleave', function() {
            if (this.classList.contains('flipped')) {
                this.style.transform = 'rotateY(180deg)';
            } else {
                this.style.transform = '';
            }
        });
    });
    
    // Botones de girar también activan el efecto
    const flipButtons = document.querySelectorAll('.flip-button');
    flipButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Evitar que el clic se propague al flipper
            const flipperId = this.closest('.book-images').querySelector('.book-flipper').id;
            document.getElementById(flipperId).classList.toggle('flipped');
        });
    });
}

// Modal para "Ver interior" - Versión optimizada
function initInteriorModal() {
    const modal = document.getElementById('interiorModal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.close-modal');
    const modalBtn = modal.querySelector('.modal-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modalBtn) {
        modalBtn.addEventListener('click', closeModal);
    }
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // También cerrar haciendo clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function openModal(e) {
        e.preventDefault();
        
        // Obtener URL de Amazon según el libro
        const bookItem = this.closest('.book-item');
        if (bookItem) {
            const amazonBtn = bookItem.querySelector('a.book-btn-primary');
            if (amazonBtn) {
                const amazonUrl = amazonBtn.getAttribute('href');
                const modalAmazonBtn = document.getElementById('modal-amazon-btn');
                if (modalAmazonBtn && amazonUrl) {
                    modalAmazonBtn.setAttribute('data-url', amazonUrl);
                }
            }
        }
        
        // Mostrar modal
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
    }
}

function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Limpiar partículas existentes
    particlesContainer.innerHTML = '';
    
    // Número de partículas basado en el ancho de la pantalla
    const numParticles = window.innerWidth < 768 ? 15 : 30;
    
    // Crear partículas
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posición aleatoria
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);
        
        // Establecer posición y tamaño
        particle.style.left = `${randomX}px`;
        particle.style.top = `${randomY}px`;
        
        // Tamaño aleatorio
        const size = Math.random() * 2.5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        // Duración aleatoria para la animación
        const duration = Math.random() * 15 + 10;
        particle.style.animation = `float ${duration}s infinite`;
        
        // Retraso aleatorio para la animación
        const delay = Math.random() * 10;
        particle.style.animationDelay = `${delay}s`;
        
        // Añadir al contenedor
        particlesContainer.appendChild(particle);
    }
}

// Si hay cambio de tamaño de ventana, actualizar partículas
window.addEventListener('resize', function() {
    setTimeout(createParticles, 500);
});

// Animaciones
function initAnimations() {
    // Elementos para animar
    const animatedElements = document.querySelectorAll('.animate');
    
    // Opciones para el Intersection Observer
    const options = {
        root: null, // viewport
        threshold: 0.1, // 10% del elemento visible
        rootMargin: '-50px'
    };
    
    // Callback para el observer
    const animateCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;
                
                // Aplicar la animación después del delay
                setTimeout(() => {
                    el.classList.add('animated');
                }, delay);
                
                // Dejar de observar si la animación no es repetible
                if (!el.dataset.repeat) {
                    observer.unobserve(el);
                }
            } else if (el.dataset.repeat) {
                // Si es repetible, quitar clase cuando sale de la vista
                el.classList.remove('animated');
            }
        });
    };
    
    // Crear el observer
    const observer = new IntersectionObserver(animateCallback, options);
    
    // Observar todos los elementos animados
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Parallax effect para el fondo
document.addEventListener('mousemove', function(e) {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 5;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        el.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}); 