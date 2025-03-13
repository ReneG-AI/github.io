// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initPreloader();
    initDarkModeToggle();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initAOS();
    initBackToTop();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });
}

// Alternador de modo oscuro
function initDarkModeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (!darkModeToggle) return;
    
    // Añadimos transición al body para una animación suave al cambiar de modo
    document.body.style.transition = "background-color 0.5s ease, color 0.5s ease";
    
    // Verificar preferencia guardada en localStorage
    // Si no hay preferencia guardada, usamos modo oscuro por defecto
    const hasStoredPreference = localStorage.getItem('darkMode') !== null;
    const isDarkMode = hasStoredPreference ? localStorage.getItem('darkMode') === 'true' : true;
    
    // Aplicar modo según preferencia o predeterminado (oscuro)
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        darkModeToggle.classList.add('active');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        darkModeToggle.classList.remove('active');
    }
    
    // Si no hay preferencia guardada, guardamos el modo oscuro como predeterminado
    if (!hasStoredPreference) {
        localStorage.setItem('darkMode', 'true');
    }
    
    // Alternar modo oscuro al hacer clic en el botón
    darkModeToggle.addEventListener('click', function() {
        // Añadir clase de animación
        document.body.classList.add('theme-transition');
        
        if (document.body.classList.contains('dark-mode')) {
            // Cambiar a modo claro
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            darkModeToggle.classList.remove('active');
            localStorage.setItem('darkMode', 'false');
        } else {
            // Cambiar a modo oscuro
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            darkModeToggle.classList.add('active');
            localStorage.setItem('darkMode', 'true');
        }
        
        // Eliminar clase de animación después de la transición
        setTimeout(function() {
            document.body.classList.remove('theme-transition');
        }, 500);
    });
}

// Menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksAnchors = document.querySelectorAll('.nav-links a');
    
    if (!menuToggle || !navLinks) return;
    
    // Mostrar/ocultar menú al hacer clic en el botón
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinksAnchors.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera del menú
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navLinks.contains(event.target);
        const isClickMenuToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickMenuToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
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
                window.scrollTo({
                    top: target.offsetTop - 70, // Ajustar por la altura del encabezado
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efecto de scroll en el encabezado
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Agregar clase scrolled si el desplazamiento es mayor a 50px
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // En móviles, mantener el encabezado visible
        if (window.innerWidth <= 768) {
            header.style.transform = 'translateY(0)';
            return;
        }
        
        // Ocultar/mostrar encabezado al desplazarse hacia arriba/abajo
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Desplazamiento hacia abajo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Desplazamiento hacia arriba
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Inicializar AOS para animaciones
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
}

// Botón volver arriba
function initBackToTop() {
    const backToTopBtn = document.querySelector('#back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
} 