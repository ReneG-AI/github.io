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
    initBookFlip();
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
    if (!darkModeToggle) return;
    
    const body = document.body;
    const sunIcon = darkModeToggle.querySelector('.sun');
    const moonIcon = darkModeToggle.querySelector('.moon');
    
    if (!sunIcon || !moonIcon) return;
    
    // Verificar preferencia guardada
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
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
        
        // Guardar preferencia
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            // Mostrar el icono del sol en modo oscuro
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            localStorage.setItem('darkMode', null);
            // Mostrar el icono de la luna en modo claro
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    });
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
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
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

// Manejar el flip de los libros
function initBookFlip() {
    const bookContainers = document.querySelectorAll('.book-images');
    
    bookContainers.forEach(container => {
        // Eliminar cualquier botón anterior para evitar duplicados
        const existingButton = container.querySelector('.flip-button');
        if (existingButton) {
            existingButton.remove();
        }
        
        const flipper = container.querySelector('.book-flipper');
        const bookItem = container.closest('.book-item');
        
        if (!flipper) return;
        
        // Crear el botón de volteo
        const flipButton = document.createElement('button');
        flipButton.className = 'flip-button';
        flipButton.innerHTML = '<i class="fas fa-sync-alt"></i> Girar';
        
        // Añadir el botón después del contenedor de la imagen
        container.appendChild(flipButton);
        
        // Manejar el click en el botón de volteo
        flipButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            flipper.classList.toggle('flipped');
        });
        
        // Botón "Ver interior"
        if (bookItem) {
            const verInteriorBtn = bookItem.querySelector('.book-btn-secondary');
            if (verInteriorBtn) {
                verInteriorBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Las imágenes del interior estarán disponibles próximamente');
                });
            }
        }
    });
} 