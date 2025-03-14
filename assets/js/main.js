// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Asegurarse de que el menú está cerrado al inicio
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.remove('active');
        // También forzar estilos inline para asegurarse
        navLinks.style.right = '-100%';
        navLinks.style.visibility = 'hidden';
        navLinks.style.opacity = '0';
    }
    
    // Inicializar funcionalidades
    initPreloader();
    initDarkModeToggle();
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

// Alternador de modo oscuro
function initDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const sunIcon = darkModeToggle.querySelector('.sun');
    const moonIcon = darkModeToggle.querySelector('.moon');
    
    // Verificar preferencia guardada
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        // Mostrar el icono del sol en modo oscuro
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        // Mostrar el icono de la luna en modo claro
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
    
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Cambiar visibilidad de iconos
        if (isDarkMode) {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    });
}

// Menú móvil
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksAnchors = document.querySelectorAll('.nav-links a');
    
    if (!menuToggle || !navLinks) return;
    
    // Asegurarse de que el menú esté cerrado al cargar la página
    navLinks.classList.remove('active');
    
    // Cerrar menú al hacer clic en un enlace
    navLinksAnchors.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1024) { // Incluye tablets (hasta 1024px)
                navLinks.classList.remove('active');
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
        
        // Controlar el scroll del body cuando el menú está abierto
        if (navLinks.classList.contains('active')) {
            // Opcional: evitar scroll del body cuando el menú está abierto
            // document.body.style.overflow = 'hidden';
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
            // Restaurar scroll del body cuando se cierra el menú
            document.body.style.overflow = '';
        }
    });
    
    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
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
            
            // Obtener el destino del enlace
            const target = document.querySelector(this.getAttribute('href'));
            
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
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
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
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
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

// Manejar el flip de los libros
document.addEventListener('DOMContentLoaded', function() {
    const bookImages = document.querySelectorAll('.book-images');
    
    bookImages.forEach(container => {
        const flipper = container.querySelector('.book-flipper');
        
        container.addEventListener('click', () => {
            flipper.classList.toggle('flipped');
            
            // Añadir efecto de sonido sutil (opcional)
            const flipSound = new Audio('assets/sounds/page-flip.mp3');
            flipSound.volume = 0.3;
            flipSound.play().catch(() => {}); // Silenciar error si el navegador bloquea el audio
        });
        
        // Añadir indicador visual
        const indicator = document.createElement('div');
        indicator.className = 'flip-indicator';
        indicator.innerHTML = '<i class="fas fa-sync-alt"></i> Click para girar';
        container.appendChild(indicator);
        
        // Mostrar/ocultar indicador
        container.addEventListener('mouseenter', () => {
            indicator.style.opacity = '1';
        });
        
        container.addEventListener('mouseleave', () => {
            indicator.style.opacity = '0';
        });
    });
});

// Manejar el modo oscuro
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// Verificar preferencia guardada
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
}

// Manejar el menú móvil
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    menuToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        menuToggle.classList.remove('active');
    });
});

// Manejar el scroll del header
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('scrolled');
    } else if (currentScroll < lastScroll) {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Botón volver arriba
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
}); 