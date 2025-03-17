// Configuración de rutas para GitHub Pages
const config = {
    // Detecta si estamos en GitHub Pages y obtiene el nombre del repositorio automáticamente
    baseUrl: function() {
        // Si estamos en GitHub Pages
        if (location.hostname.includes('github.io')) {
            // Solución específica para el repositorio reneg-ai/github.io
            if (location.hostname === 'reneg-ai.github.io') {
                console.log('Detectado dominio reneg-ai.github.io');
                // Corrección: usar string vacío si estamos en la raíz del repositorio
                return '';
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
        
        // Devuelve la ruta correcta con el prefijo baseUrl o la ruta original si no hay baseUrl
        const finalPath = this.baseUrl ? `${this.baseUrl}/${path}` : path;
        console.log('Ruta final:', finalPath);
        return finalPath;
    },
    
    // Inicializa y corrige rutas de imágenes
    init: function() {
        console.log('Inicializando config.js, baseUrl:', this.baseUrl);
        
        // Corregir rutas de imágenes inmediatamente para elementos que ya existen
        this.fixAllImages();
        
        // Corregir rutas de imágenes después de que se cargue el DOM
        document.addEventListener('DOMContentLoaded', () => {
            this.fixAllImages();
            
            // También corregir los fondos de CSS en línea
            this.fixInlineBackgrounds();
        });
        
        // También arreglar imágenes cuando la página esté completamente cargada
        window.addEventListener('load', () => {
            this.fixAllImages();
            this.fixInlineBackgrounds();
            
            // Asegurar visibilidad de imágenes
            this.ensureImagesVisible();
        });
    },
    
    // Asegurar que las imágenes sean visibles
    ensureImagesVisible: function() {
        console.log('Asegurando visibilidad de imágenes...');
        
        document.querySelectorAll('img').forEach(img => {
            // Asegurar que la imagen sea visible
            img.style.display = 'inline-block';
            img.style.visibility = 'visible';
            img.style.opacity = '1';
            
            // Verificar si la imagen se ha cargado correctamente
            if (img.complete) {
                console.log(`Imagen ya cargada: ${img.src}`);
            } else {
                img.onload = function() {
                    console.log(`Imagen cargada con éxito: ${img.src}`);
                };
                img.onerror = function() {
                    console.error(`Error al cargar la imagen: ${img.src}`);
                    // Intentar nuevamente con la URL original en caso de error
                    if (img.dataset.originalSrc && img.src !== img.dataset.originalSrc) {
                        console.log(`Intentando con URL original: ${img.dataset.originalSrc}`);
                        img.src = img.dataset.originalSrc;
                    }
                };
            }
        });
    },
    
    // Corregir fondos de CSS en línea
    fixInlineBackgrounds: function() {
        console.log('Corrigiendo fondos en línea...');
        
        // Buscar todos los elementos con background-image en línea
        document.querySelectorAll('[style*="background-image"]').forEach(el => {
            const style = el.getAttribute('style');
            if (style && !el.dataset.processedBg) {
                el.dataset.processedBg = 'true';
                
                // Extraer URLs de background-image
                const urlMatch = style.match(/url\(['"]?([^'")]+)['"]?\)/);
                if (urlMatch && urlMatch[1] && !urlMatch[1].match(/^(https?:)?\/\//)) {
                    const originalUrl = urlMatch[1];
                    const newUrl = this.getAssetPath(originalUrl);
                    
                    // Reemplazar la URL en el estilo
                    const newStyle = style.replace(originalUrl, newUrl);
                    el.setAttribute('style', newStyle);
                    console.log(`Fondo corregido: ${originalUrl} -> ${newUrl}`);
                }
            }
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
