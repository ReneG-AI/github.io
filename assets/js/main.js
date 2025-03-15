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
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

// Menú móvil
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!menuToggle || !navLinks) return;
    
    const navLinksAnchors = document.querySelectorAll('.nav-links a');
    
    // Asegurarse de que el menú esté visible pero colapsado al inicio
    navLinks.style.display = 'flex';
    navLinks.classList.remove('active');
    
    // Cerrar menú al hacer clic en un enlace
    navLinksAnchors.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1024) { // Incluye tablets (hasta 1024px)
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                // Restaurar scroll del body cuando se cierra el menú
                document.body.style.overflow = '';
            }
        });
    });
    
    // Toggle menú
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que el clic se propague al document
        e.preventDefault(); // Prevenir comportamiento por defecto
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Controlar el scroll del body cuando el menú está abierto
        if (navLinks.classList.contains('active')) {
            console.log('Menú abierto'); // Depuración
        } else {
            document.body.style.overflow = '';
            console.log('Menú cerrado'); // Depuración
        }
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            // Restaurar scroll del body cuando se cierra el menú
            document.body.style.overflow = '';
        }
    });
    
    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            // Restaurar scroll del body cuando se cierra el menú
            document.body.style.overflow = '';
        }
    });
    
    // Función para manejar el redimensionamiento de la ventana
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 1024) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                // Restaurar scroll del body cuando se oculta el menú
                document.body.style.overflow = '';
            }
        }, 250);
    });
}

// Desplazamiento suave
function initSmoothScroll() {
    // Obtener todos los enlaces con hash
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    // Agregar evento de clic a cada enlace
    allLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Prevenir el comportamiento predeterminado
            e.preventDefault();
            
            const href = this.getAttribute('href');
            
            // Verificar si el href es válido
            if (href === "#") return;
            
            // Obtener el destino del enlace
            const target = document.querySelector(href);
            
            // Si el destino existe, desplazar suavemente
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efecto de scroll en el encabezado
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Inicializar AOS para animaciones
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
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

// Función para inicializar el flip de los libros
function initBookFlip() {
    const bookFlippers = document.querySelectorAll('.book-flipper');
    if (!bookFlippers.length) return;
    
    // Agregamos click a cada libro para voltear
    bookFlippers.forEach(flipper => {
        flipper.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
    
    // Botones "Ver interior"
    const interiorBtns = document.querySelectorAll('.ver-interior-btn');
    interiorBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
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