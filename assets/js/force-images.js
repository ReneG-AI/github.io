// Script para forzar la carga y visibilidad de imágenes
document.addEventListener('DOMContentLoaded', function() {
    // Función para forzar la visibilidad de una imagen
    function forceImageVisibility(img) {
        // Asegurar que la imagen sea visible
        img.style.display = 'inline-block';
        img.style.visibility = 'visible';
        img.style.opacity = '1';
        img.style.transform = 'translateZ(0)';
        img.style.backfaceVisibility = 'hidden';
        img.style.webkitBackfaceVisibility = 'hidden';
        
        // Solo recargar si la imagen tiene un src válido
        if (img.src && !img.src.includes('index.html')) {
            const originalSrc = img.src;
            img.src = '';
            setTimeout(function() {
                img.src = originalSrc;
            }, 50);
            
            // Manejar errores de carga
            img.onerror = function() {
                console.error('Error al cargar la imagen:', img.src);
                // Intentar recargar la imagen una vez más solo si tiene un src válido
                if (img.src && !img.src.includes('index.html')) {
                    setTimeout(function() {
                        // Usar src directamente en lugar de una variable externa
                        const currentSrc = img.src;
                        img.src = '';
                        setTimeout(function() {
                            img.src = currentSrc;
                        }, 200);
                    }, 1000);
                }
            };
        }
    }

    // Forzar visibilidad de todas las imágenes
    const allImages = document.querySelectorAll('img');
    allImages.forEach(forceImageVisibility);
    
    // Forzar visibilidad del fondo hero
    const heroBackground = document.querySelector('.hero-background-img');
    if (heroBackground) {
        forceImageVisibility(heroBackground);
    }

    // Observador para nuevas imágenes que se agreguen dinámicamente
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeName === 'IMG') {
                    forceImageVisibility(node);
                }
            });
        });
    });

    // Configurar el observador
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}); 