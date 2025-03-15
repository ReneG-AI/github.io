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
    initInteriorModal();
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
    // Encontrar todos los contenedores de imágenes de libros
    const bookContainers = document.querySelectorAll('.book-images');
    
    // Para cada contenedor, agregar la funcionalidad de flip
    bookContainers.forEach(container => {
        const bookFlipper = container.querySelector('.book-flipper');
        
        // Eliminar cualquier botón de flip existente para evitar duplicados
        const existingButton = container.querySelector('.flip-button');
        if (existingButton) {
            existingButton.remove();
        }
        
        // Crear el botón de flip
        const flipButton = document.createElement('button');
        flipButton.className = 'flip-button';
        flipButton.innerHTML = 'Girar <i class="fas fa-sync-alt"></i>';
        
        // Agregar el botón al contenedor
        container.appendChild(flipButton);
        
        // Función para manejar el flip del libro - simplificada sin audio
        function flipBook(e) {
            // Evitar que el evento se propague (importante para dispositivos móviles)
            e.preventDefault();
            e.stopPropagation();
            
            if (bookFlipper) {
                bookFlipper.classList.toggle('flipped');
            }
        }
        
        // Agregar evento de clic al botón de flip
        flipButton.addEventListener('click', flipBook);
        
        // Agregar evento de clic a la imagen del libro también
        // Mejorado para móviles con touchstart
        if (bookFlipper) {
            bookFlipper.addEventListener('click', flipBook);
            bookFlipper.addEventListener('touchstart', function(e) {
                // Solo para navegación, no para volteo (el botón se encarga de eso)
                e.stopPropagation();
            }, {passive: true});
        }
    });
}

// Modal para "Ver interior"
function initInteriorModal() {
    const modal = document.getElementById('interiorModal');
    if (!modal) {
        console.error('Modal no encontrado');
        return;
    }
    
    const closeModalBtn = modal.querySelector('.close-modal');
    const confirmBtn = modal.querySelector('.modal-btn');
    const verInteriorBtns = document.querySelectorAll('.ver-interior-btn');
    
    console.log('Botones Ver Interior encontrados:', verInteriorBtns.length);
    
    // Función para abrir el modal
    function openModal(e) {
        e.preventDefault();
        console.log('Abriendo modal...');
        
        // Establecer display flex primero
        modal.style.display = 'flex';
        
        // Forzar un reflow para permitir que la transición funcione
        void modal.offsetWidth;
        
        // Luego añadir la clase y cambiar las propiedades
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        } else {
            console.error('No se encontró .modal-content');
        }
    }
    
    // Función para cerrar el modal
    function closeModal() {
        console.log('Cerrando modal...');
        const modalContent = modal.querySelector('.modal-content');
        
        if (modalContent) {
            modalContent.style.opacity = '0';
            modalContent.style.transform = 'translateY(-50px)';
        }
        
        modal.classList.remove('show');
        
        // Esperar a que termine la transición antes de ocultar
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Asignar eventos a los botones "Ver interior"
    verInteriorBtns.forEach(btn => {
        console.log('Configurando botón:', btn);
        btn.addEventListener('click', function(e) {
            console.log('Botón Ver Interior clickeado');
            openModal(e);
        });
    });
    
    // Cerrar modal con botón de cierre
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    } else {
        console.error('No se encontró el botón de cierre del modal');
    }
    
    // Cerrar modal con botón de confirmación
    if (confirmBtn) {
        confirmBtn.addEventListener('click', closeModal);
    } else {
        console.error('No se encontró el botón de confirmación del modal');
    }
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

/* Header scroll shrink effect */
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}); 