// Configuración de rutas para GitHub Pages
const config = {
    // Flag para evitar inicializaciones múltiples
    initialized: false,
    
    // Detecta si estamos en GitHub Pages y obtiene el nombre del repositorio automáticamente
    baseUrl: function() {
        // Si estamos en GitHub Pages
        if (location.hostname.includes('github.io')) {
            console.log('Detectado ambiente GitHub Pages en: ' + location.hostname);
            
            // Solución específica para el repositorio reneg-ai/github.io
            if (location.hostname === 'reneg-ai.github.io') {
                console.log('Repositorio principal detectado: reneg-ai.github.io');
                
                // Debug: mostrar la ruta completa para diagnóstico
                console.log('Ruta completa: ' + location.pathname);
                
                // Si estamos en la URL principal del sitio, no necesitamos un prefijo
                if (location.pathname === '/' || location.pathname === '') {
                    return '';
                }
                
                // Para subdirectorios específicos, usar la ruta completa
                return location.pathname.replace(/\/+$/, ''); // elimina slash final si existe
            }
            
            // Para otros casos, obtiene el pathname completo
            const pathSegments = location.pathname.split('/').filter(segment => segment);
            console.log('Segmentos de ruta encontrados:', pathSegments);
            
            // Si hay al menos un segmento en la ruta, ese es nuestro repositorio
            if (pathSegments.length > 0) {
                console.log('Repositorio detectado: ' + pathSegments[0]);
                return '/' + pathSegments[0];
            }
            
            // Si no hay segmentos, podría ser el repositorio principal username.github.io
            console.log('Repositorio principal sin segmentos detectado');
            return '';
        }
        
        // En desarrollo local, no necesitamos prefijo
        console.log('Desarrollo local detectado en: ' + location.hostname);
        return '';
    }(),
    
    // Función para resolver rutas de recursos
    getAssetPath: function(path) {
        // Verificar que el path sea válido
        if (!path) {
            console.warn('Se recibió un path vacío o nulo');
            return '';
        }
        
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
        console.log('Ruta transformada: ' + path + ' -> ' + finalPath);
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
        
        try {
            // Agregar una clase al body para usar en CSS
            if (document.body) {
                document.body.classList.add('github-pages-config');
            } else {
                console.warn('document.body no disponible para añadir clase');
            }
            
            // Corregir rutas de imágenes después de que se cargue el DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.fixAllImages();
                    this.fixInlineBackgrounds();
                    this.debugImagePaths();
                });
            } else {
                // Si el DOM ya está cargado
                this.fixAllImages();
                this.fixInlineBackgrounds();
                this.debugImagePaths();
            }
            
            // Asegurar visibilidad cuando todo esté cargado
            window.addEventListener('load', () => {
                this.ensureImagesVisible();
                if (document.body) {
                    document.body.classList.add('images-loaded');
                }
            });
        } catch (error) {
            console.error('Error en la inicialización de config.js:', error);
        }
    },
    
    // Función para depurar rutas de imágenes
    debugImagePaths: function() {
        console.log('=== DIAGNÓSTICO DE RUTAS DE IMÁGENES ===');
        
        document.querySelectorAll('img').forEach((img, index) => {
            console.log(`Imagen #${index + 1}:`);
            console.log(`- src actual: ${img.src}`);
            console.log(`- src original: ${img.dataset.originalSrc || 'N/A'}`);
            console.log(`- completa: ${img.complete ? 'Sí' : 'No'}`);
            console.log(`- naturalWidth: ${img.naturalWidth}`);
            console.log(`- visible: ${window.getComputedStyle(img).display !== 'none' ? 'Sí' : 'No'}`);
        });
        
        console.log('=== FIN DIAGNÓSTICO ===');
    },
    
    // Asegurar que las imágenes sean visibles
    ensureImagesVisible: function() {
        console.log('Asegurando visibilidad de imágenes...');
        
        document.querySelectorAll('img').forEach(img => {
            try {
                // Asegurar que la imagen sea visible
                img.style.display = 'inline-block';
                img.style.visibility = 'visible';
                img.style.opacity = '1';
                
                // Solo configurar error handler para imágenes que aún no se han cargado
                // y que no hayan excedido los intentos de carga
                if (!img.complete && !img.dataset.retryAttempts) {
                    img.dataset.retryAttempts = "0";
                    
                    // Guardar la ruta original si no existe
                    if (!img.dataset.originalSrc && img.src) {
                        img.dataset.originalSrc = img.src;
                    }
                    
                    img.onerror = function() {
                        try {
                            const attempts = parseInt(img.dataset.retryAttempts || "0");
                            
                            // Limitar a máximo 3 intentos
                            if (attempts < 3) {
                                console.log(`Reintentando cargar imagen (intento ${attempts + 1}): ${img.src}`);
                                img.dataset.retryAttempts = (attempts + 1).toString();
                                
                                // Estrategias alternativas de carga
                                if (attempts === 0) {
                                    // Primer intento: usar ruta absoluta desde la raíz
                                    const origSrc = img.dataset.originalSrc || img.src;
                                    const absPath = origSrc.startsWith('/') ? origSrc : '/' + origSrc;
                                    console.log(`Intento 1: usando ruta absoluta ${absPath}`);
                                    img.src = absPath;
                                } else if (attempts === 1) {
                                    // Segundo intento: usar ruta relativa sin baseUrl
                                    const origSrc = img.dataset.originalSrc;
                                    if (origSrc) {
                                        // Quitar cualquier '/'/ruta absoluta del inicio
                                        const relPath = origSrc.replace(/^\/+/, '');
                                        console.log(`Intento 2: usando ruta relativa ${relPath}`);
                                        img.src = relPath;
                                    }
                                } else if (attempts === 2) {
                                    // Tercer intento: usar ruta completa con timestamp
                                    const timestamp = new Date().getTime();
                                    const origSrc = img.dataset.originalSrc;
                                    if (origSrc) {
                                        console.log(`Intento 3: usando ruta con timestamp ${origSrc}?t=${timestamp}`);
                                        img.src = origSrc + '?t=' + timestamp;
                                    }
                                }
                            } else {
                                // Después de los intentos máximos, dejamos de intentar
                                console.error(`No se pudo cargar la imagen después de múltiples intentos: ${img.src}`);
                                img.onerror = null; // Eliminar el manejador para evitar más intentos
                                
                                // Intentar cargar una imagen de respaldo si existe
                                if (img.dataset.fallback) {
                                    console.log(`Cargando imagen de respaldo: ${img.dataset.fallback}`);
                                    img.src = img.dataset.fallback;
                                }
                            }
                        } catch (error) {
                            console.error('Error en el manejo de error de imagen:', error);
                        }
                    };
                }
            } catch (error) {
                console.error('Error al procesar imagen:', error);
            }
        });
    },
    
    // Corregir fondos de CSS en línea
    fixInlineBackgrounds: function() {
        console.log('Corrigiendo fondos en línea...');
        
        try {
            // Buscar todos los elementos con background-image en línea
            document.querySelectorAll('[style*="background-image"]:not([data-processed-bg="true"])').forEach(el => {
                try {
                    const style = el.getAttribute('style');
                    if (style) {
                        el.dataset.processedBg = 'true';
                        
                        // Extraer URLs de background-image
                        const urlMatch = style.match(/url\(['"]?([^'")]+)['"]?\)/);
                        if (urlMatch && urlMatch[1] && !urlMatch[1].match(/^(https?:)?\/\//)) {
                            const originalUrl = urlMatch[1];
                            const newUrl = this.getAssetPath(originalUrl);
                            
                            // Guardar URL original para diagnóstico
                            el.dataset.originalBg = originalUrl;
                            
                            // Reemplazar la URL en el estilo
                            const newStyle = style.replace(originalUrl, newUrl);
                            el.setAttribute('style', newStyle);
                            console.log(`Fondo corregido: ${originalUrl} -> ${newUrl}`);
                        }
                    }
                } catch (error) {
                    console.error('Error al procesar background-image:', error);
                }
            });
        } catch (error) {
            console.error('Error en fixInlineBackgrounds:', error);
        }
    },
    
    // Corrige todas las rutas de imágenes en la página
    fixAllImages: function() {
        console.log('Corrigiendo rutas de imágenes...');
        
        try {
            // Seleccionar todas las imágenes que no han sido procesadas
            const images = document.querySelectorAll('img:not([data-processed="true"])');
            console.log(`Encontradas ${images.length} imágenes para procesar`);
            
            // Procesar cada imagen
            images.forEach((img, index) => {
                try {
                    const originalSrc = img.getAttribute('src');
                    
                    // Algunos logs de diagnóstico
                    console.log(`Procesando imagen #${index + 1}: ${originalSrc}`);
                    
                    // Solo modificar rutas relativas
                    if (originalSrc && !originalSrc.match(/^(https?:)?\/\//)) {
                        // Guardar la ruta original para referencia
                        img.dataset.originalSrc = originalSrc;
                        
                        // Aplicar la corrección de ruta
                        const newSrc = this.getAssetPath(originalSrc);
                        
                        // Actualizar el atributo src
                        img.src = newSrc;
                        console.log(`Ruta de imagen corregida: ${originalSrc} -> ${newSrc}`);
                        
                        // Marcar como procesada
                        img.dataset.processed = "true";
                        
                        // Configurar una imagen de respaldo para casos extremos
                        if (originalSrc.includes('Hero_Background.png')) {
                            console.log('Configurando respaldo para imagen de héroe');
                            img.dataset.fallback = 'https://raw.githubusercontent.com/ReneG-AI/github.io/main/assets/images/Hero_Background.png';
                        }
                    }
                } catch (error) {
                    console.error(`Error al procesar imagen #${index + 1}:`, error);
                }
            });
            
            console.log('Corrección de imágenes completada');
        } catch (error) {
            console.error('Error en fixAllImages:', error);
        }
    }
};

// Inicializar la configuración inmediatamente
try {
    config.init();
} catch (error) {
    console.error('Error fatal en la inicialización de config.js:', error);
}
