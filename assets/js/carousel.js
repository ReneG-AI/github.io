// Book Carousel
document.addEventListener('DOMContentLoaded', function() {
    initBookCarousel();
});

function initBookCarousel() {
    const carousel = document.querySelector('.books-carousel');
    if (!carousel) return;
    
    const container = carousel.querySelector('.carousel-container');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    if (!container || !items.length || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    let itemWidth = items[0].offsetWidth;
    let gap = 40; // El mismo valor que en el CSS
    let itemsPerView = getItemsPerView();
    let totalItems = items.length;
    let maxIndex = Math.max(0, totalItems - itemsPerView);
    
    // Ajustar la visualización inicial
    updateCarousel();
    
    // Debounce para optimizar la función de resize
    let resizeTimeout;
    
    // Configurar botones de navegación
    prevBtn.addEventListener('click', function() {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        updateCarousel();
    });
    
    // Configurar puntos indicadores
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            currentIndex = Math.min(maxIndex, index);
            updateCarousel();
        });
    });
    
    // Actualizar en cambio de tamaño de ventana con debounce
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            itemWidth = items[0].offsetWidth;
            itemsPerView = getItemsPerView();
            maxIndex = Math.max(0, totalItems - itemsPerView);
            
            // Asegurar que el índice actual no exceda el nuevo maxIndex
            currentIndex = Math.min(currentIndex, maxIndex);
            
            updateCarousel();
        }, 200); // 200ms debounce
    });
    
    // Función para actualizar la visualización del carrusel
    function updateCarousel() {
        const translateX = -(currentIndex * (itemWidth + gap));
        
        // Usar transform con translateX para mejor rendimiento
        container.style.transform = `translateX(${translateX}px)`;
        
        // Actualizar botones de navegación
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        
        // Actualizar puntos indicadores
        dots.forEach(function(dot, index) {
            dot.classList.toggle('active', index === currentIndex);
            // Agregar atributo ARIA para accesibilidad
            dot.setAttribute('aria-selected', index === currentIndex ? 'true' : 'false');
        });
    }
    
    // Función para determinar cuántos elementos mostrar según el ancho de la ventana
    function getItemsPerView() {
        const windowWidth = window.innerWidth;
        if (windowWidth < 768) return 1;
        if (windowWidth < 992) return 2;
        return 3;
    }
    
    // Funcionalidad de lupa - Optimizada para rendimiento
    const magnifiers = document.querySelectorAll('.magnifier');
    
    // Crear el overlay una sola vez y reutilizarlo
    const overlay = document.createElement('div');
    overlay.className = 'image-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.9)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'none';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    
    const enlargedImage = document.createElement('img');
    enlargedImage.style.maxWidth = '90%';
    enlargedImage.style.maxHeight = '90%';
    enlargedImage.style.objectFit = 'contain';
    enlargedImage.style.border = '5px solid white';
    enlargedImage.style.borderRadius = '10px';
    enlargedImage.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.background = 'white';
    closeButton.style.color = 'black';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '50%';
    closeButton.style.width = '40px';
    closeButton.style.height = '40px';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.setAttribute('aria-label', 'Cerrar imagen');
    
    overlay.appendChild(enlargedImage);
    overlay.appendChild(closeButton);
    document.body.appendChild(overlay);
    
    // Controlador para cerrar el overlay
    function closeOverlay() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        
        // Remover el event listener al cerrar
        document.removeEventListener('keydown', handleEscKey);
    }
    
    // Manejador para tecla ESC
    function handleEscKey(event) {
        if (event.key === 'Escape') {
            closeOverlay();
        }
    }
    
    // Asignar evento de clic a los botones de lupa
    magnifiers.forEach(function(magnifier) {
        magnifier.addEventListener('click', function() {
            const imageContainer = this.closest('.book-image-container');
            const image = imageContainer.querySelector('img');
            
            // Configurar la imagen ampliada
            enlargedImage.src = image.src;
            enlargedImage.alt = image.alt;
            
            // Mostrar overlay
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Agregar event listener para tecla ESC
            document.addEventListener('keydown', handleEscKey);
        });
    });
    
    // Eventos para cerrar el overlay
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay || event.target === closeButton) {
            closeOverlay();
        }
    });
} 