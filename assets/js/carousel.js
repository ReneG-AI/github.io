// Carrusel de Libros
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
    const itemsPerView = getItemsPerView();
    const totalItems = items.length;
    const maxIndex = Math.max(0, totalItems - itemsPerView);
    
    // Ajustar la visualización inicial
    updateCarousel();
    
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
    
    // Actualizar en cambio de tamaño de ventana
    window.addEventListener('resize', function() {
        itemWidth = items[0].offsetWidth;
        updateCarousel();
    });
    
    // Función para actualizar la visualización del carrusel
    function updateCarousel() {
        const translateX = -(currentIndex * (itemWidth + gap));
        container.style.transform = `translateX(${translateX}px)`;
        
        // Actualizar botones de navegación
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        
        // Actualizar puntos indicadores
        dots.forEach(function(dot, index) {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Función para determinar cuántos elementos mostrar según el ancho de la ventana
    function getItemsPerView() {
        const windowWidth = window.innerWidth;
        if (windowWidth < 768) return 1;
        if (windowWidth < 992) return 2;
        return 3;
    }
    
    // Funcionalidad de lupa
    const magnifiers = document.querySelectorAll('.magnifier');
    magnifiers.forEach(function(magnifier) {
        magnifier.addEventListener('click', function() {
            const imageContainer = this.closest('.book-image-container');
            const image = imageContainer.querySelector('img');
            
            // Crear una visualización ampliada
            const overlay = document.createElement('div');
            overlay.className = 'image-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.background = 'rgba(0, 0, 0, 0.9)';
            overlay.style.zIndex = '9999';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            
            const enlargedImage = document.createElement('img');
            enlargedImage.src = image.src;
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
            
            overlay.appendChild(enlargedImage);
            overlay.appendChild(closeButton);
            document.body.appendChild(overlay);
            
            // Bloquear el scroll
            document.body.style.overflow = 'hidden';
            
            // Cerrar al hacer clic
            overlay.addEventListener('click', function(event) {
                if (event.target === overlay || event.target === closeButton) {
                    document.body.removeChild(overlay);
                    document.body.style.overflow = '';
                }
            });
            
            // Cerrar con la tecla ESC
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && document.contains(overlay)) {
                    document.body.removeChild(overlay);
                    document.body.style.overflow = '';
                }
            });
        });
    });
} 