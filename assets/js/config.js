// Configuración de rutas para GitHub Pages
const config = {
    // Detecta si estamos en GitHub Pages y obtiene el nombre del repositorio automáticamente
    baseUrl: function() {
        // Si estamos en GitHub Pages
        if (location.hostname.includes('github.io')) {
            // Solución específica para el repositorio reneg-ai/github.io
            if (location.hostname === 'reneg-ai.github.io') {
                console.log('Detectado dominio reneg-ai.github.io');
                return '/github.io';
            }
            
            // Para otros casos, obtiene el pathname completo
            const pathSegments = location.pathname.split('/').filter(segment => segment);
            
            // Si hay al menos un segmento en la ruta, ese es nuestro repositorio
            if (pathSegments.length > 0) {
                console.log('Detectado repositorio: ' + pathSegments[0]);
                return '/' + pathSegments[0];
            }
            
            // Si no hay segmentos, podría ser el repositorio principal username.github.io
            console.log('Repositorio principal detectado');
            return '';
        }
        
        // En desarrollo local, no necesitamos prefijo
        console.log('Desarrollo local detectado');
        return '';
    }(),
    
    // Función para resolver rutas de recursos
    getAssetPath: function(path) {
        // Log para depuración
        console.log('Procesando ruta:', path);
        
        // Si la ruta ya es una URL completa, devuélvela como está
        if (path.match(/^(https?:)?\/\//)) {
            console.log('URL completa detectada, se mantiene igual:', path);
            return path;
        }
        
        // Si la ruta ya comienza con el baseUrl, devuélvela como está
        if (this.baseUrl && path.startsWith(this.baseUrl)) {
            console.log('Ruta ya tiene el prefijo correcto:', path);
            return path;
        }
        
        // Si la ruta comienza con una barra, quítala para evitar doble barra
        if (path.startsWith('/')) {
            path = path.substring(1);
            console.log('Barra inicial removida:', path);
        }
        
        // Devuelve la ruta correcta con el prefijo baseUrl
        const finalPath = this.baseUrl ? `${this.baseUrl}/${path}` : path;
        console.log('Ruta final:', finalPath);
        return finalPath;
    },
    
    // Inicializa y corrige rutas de imágenes
    init: function() {
        console.log('Inicializando config.js, baseUrl:', this.baseUrl);
        
        // Corregir rutas de imágenes después de que se cargue el DOM
        document.addEventListener('DOMContentLoaded', () => {
            this.fixAllImages();
        });
        
        // También arreglar imágenes cuando la página esté completamente cargada
        window.addEventListener('load', () => {
            this.fixAllImages();
        });
    },
    
    // Corrige todas las rutas de imágenes en la página
    fixAllImages: function() {
        console.log('Corrigiendo rutas de imágenes...');
        
        // Seleccionar todas las imágenes que no han sido procesadas
        const images = document.querySelectorAll('img:not([data-processed="true"])');
        console.log(`Encontradas ${images.length} imágenes para procesar`);
        
        // Procesar cada imagen
        images.forEach(img => {
            const originalSrc = img.getAttribute('src');
            console.log('Imagen encontrada:', originalSrc);
            
            // Solo modificar rutas relativas
            if (originalSrc && !originalSrc.match(/^(https?:)?\/\//)) {
                // Guardar la ruta original para referencia
                img.dataset.originalSrc = originalSrc;
                
                // Aplicar la corrección de ruta
                const newSrc = this.getAssetPath(originalSrc);
                
                // Actualizar el atributo src
                img.src = newSrc;
                console.log(`Imagen corregida: ${originalSrc} -> ${newSrc}`);
                
                // Marcar como procesada
                img.dataset.processed = "true";
            }
        });
        
        console.log('Corrección de imágenes completada');
    }
};

// Inicializar la configuración inmediatamente
config.init();
