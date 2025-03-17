// Configuración de rutas para GitHub Pages
const config = {
    // Flag para evitar inicializaciones múltiples
    initialized: false,
    
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
        // Si la ruta ya es una URL completa, devuélvela como está
        if (path.match(/^(https?:)?\/\//)) {
            return path;
        }
        
        // Si la ruta ya comienza con el baseUrl, devuélvela como está
        if (this.baseUrl && path.startsWith(this.baseUrl)) {
            return path;
        }
        
        // Si la ruta comienza con una barra, quítala para evitar doble barra
        if (path.startsWith('/')) {
            path = path.substring(1);
        }
        
        // Devuelve la ruta correcta con el prefijo baseUrl o la ruta original si no hay baseUrl
        const finalPath = this.baseUrl ? `${this.baseUrl}/${path}` : path;
        console.log('Ruta final:', finalPath);
        return finalPath;
    },
    
    // Inicializa y corrige rutas de imágenes
    init: function() {
        // Evitar inicializaciones múltiples
        if (this.initialized) {
            return;
        }
        
        console.log('Inicializando config.js, baseUrl:', this.baseUrl);
        this.initialized = true;
        
        // Agregar una clase al body para usar en CSS
        document.body.classList.add('github-pages-config');
        
        // Corregir rutas de imágenes después de que se cargue el DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.fixAllImages();
                this.fixInlineBackgrounds();
            });
        } else {
            // Si el DOM ya está cargado
            this.fixAllImages();
            this.fixInlineBackgrounds();
        }
        
        // Asegurar visibilidad cuando todo esté cargado
        window.addEventListener('load', () => {
            this.ensureImagesVisible();
            document.body.classList.add('images-loaded');
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
            
            // Solo configurar error handler para imágenes que aún no se han cargado
            // y que no hayan excedido los intentos de carga
            if (!img.complete && !img.dataset.retryAttempts) {
                img.dataset.retryAttempts = "0";
                
                img.onerror = function() {
                    const attempts = parseInt(img.dataset.retryAttempts || "0");
                    
                    // Limitar a máximo 2 intentos
                    if (attempts < 2) {
                        console.log(`Reintentando cargar imagen (intento ${attempts + 1}): ${img.src}`);
                        img.dataset.retryAttempts = (attempts + 1).toString();
                        
                        // Intentar cargar con ruta relativa
                        if (img.dataset.originalSrc) {
                            console.log(`Reintentando con ruta relativa: ${img.dataset.originalSrc}`);
                            
                            // Generamos un timestamp para evitar caché
                            const timestamp = new Date().getTime();
                            img.src = img.dataset.originalSrc + '?t=' + timestamp;
                        }
                    } else {
                        // Después de los intentos máximos, dejamos de intentar
                        console.error(`No se pudo cargar la imagen después de múltiples intentos: ${img.src}`);
                        img.onerror = null; // Eliminar el manejador para evitar más intentos
                    }
                };
            }
        });
    },
    
    // Corregir fondos de CSS en línea
    fixInlineBackgrounds: function() {
        console.log('Corrigiendo fondos en línea...');
        
        // Buscar todos los elementos con background-image en línea
        document.querySelectorAll('[style*="background-image"]:not([data-processed-bg="true"])').forEach(el => {
            const style = el.getAttribute('style');
            if (style) {
                el.dataset.processedBg = 'true';
                
                // Extraer URLs de background-image
                const urlMatch = style.match(/url\(['"]?([^'")]+)['"]?\)/);
                if (urlMatch && urlMatch[1] && !urlMatch[1].match(/^(https?:)?\/\//)) {
                    const originalUrl = urlMatch[1];
                    const newUrl = this.getAssetPath(originalUrl);
                    
                    // Reemplazar la URL en el estilo
                    const newStyle = style.replace(originalUrl, newUrl);
                    el.setAttribute('style', newStyle);
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
            
            // Solo modificar rutas relativas
            if (originalSrc && !originalSrc.match(/^(https?:)?\/\//)) {
                // Guardar la ruta original para referencia
                img.dataset.originalSrc = originalSrc;
                
                // Aplicar la corrección de ruta
                const newSrc = this.getAssetPath(originalSrc);
                
                // Actualizar el atributo src
                img.src = newSrc;
                
                // Marcar como procesada
                img.dataset.processed = "true";
            }
        });
        
        console.log('Corrección de imágenes completada');
    }
};

// Inicializar la configuración inmediatamente
config.init();
