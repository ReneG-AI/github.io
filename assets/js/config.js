// Configuración de rutas para GitHub Pages
const config = {
    // Flag para evitar inicializaciones múltiples
    initialized: false,
    
    // Nivel de verbosidad para los logs (0: solo errores, 1: importante, 2: todo)
    logLevel: 0,
    
    // Límite máximo de intentos de recarga de imágenes
    maxRetryAttempts: 1,
    
    // Nivel de depuración: 0 = solo errores, 1 = info básica, 2 = verbose
    debugLevel: 0,
    
    // Función de log que respeta el nivel de verbosidad
    log: function(message, level = 1) {
        if (this.logLevel >= level) {
            console.log(message);
        }
    },
    
    // Función de log para errores (siempre se muestra)
    error: function(message) {
        console.error(message);
    },
    
    // Función log que usamos para depuración
    log: function(message, level) {
        if (level === undefined) level = 0;
        if (this.debugLevel >= level) {
            console.log(message);
        }
    },
    
    // Detecta si estamos en GitHub Pages y obtiene el nombre del repositorio automáticamente
    baseUrl: function() {
        // Si estamos en GitHub Pages
        if (location.hostname.includes('github.io')) {
            this.log('Detectado ambiente GitHub Pages en: ' + location.hostname, 1);
            
            // Solución específica para el repositorio reneg-ai/github.io
            if (location.hostname === 'reneg-ai.github.io') {
                this.log('Repositorio principal detectado: reneg-ai.github.io', 1);
                
                // Para reneg-ai.github.io, siempre usar string vacío
                // para evitar la duplicación del prefijo '/github.io'
                return '';
            }
            
            // Para otros casos, obtiene el pathname completo
            const pathSegments = location.pathname.split('/').filter(segment => segment);
            this.log('Segmentos de ruta encontrados: ' + pathSegments.join('/'), 2);
            
            // Si hay al menos un segmento en la ruta, ese es nuestro repositorio
            if (pathSegments.length > 0) {
                this.log('Repositorio detectado: ' + pathSegments[0], 1);
                return '/' + pathSegments[0];
            }
            
            // Si no hay segmentos, podría ser el repositorio principal username.github.io
            this.log('Repositorio principal sin segmentos detectado', 2);
            return '';
        }
        
        // En desarrollo local, no necesitamos prefijo
        this.log('Desarrollo local detectado en: ' + location.hostname, 2);
        return '';
    }(),
    
    // Corregir rutas para imágenes basada en origen absoluto
    corregirRutaImagen: function(src) {
        if (!src) return '';
        if (src.startsWith('http')) return src;
        
        // Verificar si hay problemas de mayúsculas/minúsculas en archivos conocidos
        const lowerSrc = src.toLowerCase();
        
        // Mapa de correcciones para archivos con problemas de capitalización
        const caseSensitiveFiles = {
            'assets/images/autor.jpg': 'assets/images/Autor.png',
            'assets/images/autor.png': 'assets/images/Autor.png',
            'assets/images/logo.png': 'assets/images/Logo.png',
            'assets/images/hero_background.png': 'assets/images/Hero_Background.png'
        };
        
        // Corregir nombre de archivo si es necesario
        for (const [incorrectPath, correctPath] of Object.entries(caseSensitiveFiles)) {
            if (lowerSrc.includes(incorrectPath.toLowerCase())) {
                this.log(`Corrigiendo capitalización: ${src} -> ${src.replace(new RegExp(incorrectPath, 'i'), correctPath)}`, 2);
                src = src.replace(new RegExp(incorrectPath, 'i'), correctPath);
                break;
            }
        }
        
        // Usar origin (protocolo + hostname) como base para rutas absolutas
        const baseUrl = window.location.origin;
        return `${baseUrl}/${src.replace(/^\/+/, '')}`;
    },
    
    // Función para resolver rutas de recursos
    getAssetPath: function(path) {
        // Verificar que el path sea válido
        if (!path) {
            this.error('Se recibió un path vacío o nulo');
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
        
        // Asegurarnos de no duplicar '/github.io' en las rutas
        const finalPath = this.baseUrl ? `${this.baseUrl}/${path}` : path;
        this.log('Ruta transformada: ' + path + ' -> ' + finalPath, 2);
        
        // Si estamos en reneg-ai.github.io, asegurarnos de eliminar prefijos duplicados
        if (location.hostname === 'reneg-ai.github.io') {
            return finalPath.replace('/github.io/', '/');
        }
        
        return finalPath;
    },
    
    // Verificar y corregir el fondo del héroe
    verificarFondoHeroe: function() {
        this.log('Verificando fondo del héroe...', 2);
        
        // Buscar elementos que podrían ser el fondo del héroe
        const heroBackground = document.querySelector('.hero-background');
        const heroBackgroundImg = document.querySelector('.hero-bg-img');
        
        if (heroBackground) {
            // Establecer el fondo directamente usando CSS si existe el elemento
            heroBackground.style.display = 'block';
            heroBackground.style.visibility = 'visible';
            heroBackground.style.opacity = '1';
            
            if (heroBackgroundImg) {
                // Intentar establecer la imagen directamente
                heroBackgroundImg.style.display = 'block';
                heroBackgroundImg.style.visibility = 'visible';
                heroBackgroundImg.style.opacity = '1';
                
                // Si la imagen tiene un URL de respaldo, usarlo si la original falla
                const originalSrc = heroBackgroundImg.getAttribute('src');
                const fallbackSrc = heroBackgroundImg.getAttribute('data-fallback');
                
                if (originalSrc) {
                    // Verificar si la imagen existe
                    fetch(originalSrc)
                        .then(response => {
                            if (!response.ok) {
                                this.log(`Imagen del héroe no encontrada, usando respaldo: ${fallbackSrc}`, 1);
                                if (fallbackSrc) {
                                    heroBackgroundImg.src = fallbackSrc;
                                }
                            }
                        })
                        .catch(() => {
                            this.log(`Error cargando imagen del héroe, usando respaldo: ${fallbackSrc}`, 1);
                            if (fallbackSrc) {
                                heroBackgroundImg.src = fallbackSrc;
                            }
                        });
                }
            } else {
                // Si no hay imagen, intentar establecer el fondo como estilo
                this.log('Configurando fondo del héroe como background-image...', 2);
                heroBackground.style.backgroundImage = 'url(assets/images/Hero_Background.png)';
            }
        }
    },
    
    // Inicializa y corrige rutas de imágenes
    init: function() {
        // Evitar inicializaciones múltiples
        if (this.initialized) {
            return;
        }
        
        this.log('Inicializando config.js, baseUrl: ' + this.baseUrl, 1);
        this.initialized = true;
        
        // Envolver toda la inicialización en DOMContentLoaded para resolver
        // el problema de document.body no disponible
        const self = this;
        
        document.addEventListener('DOMContentLoaded', function() {
            try {
                self.log('DOM completamente cargado, inicializando configuración...', 1);
                
                // Ahora document.body siempre estará disponible
                document.body.classList.add('github-pages-config');
                document.body.classList.add('cargado');
                
                // Ejecutar todas las correcciones
                self.fixAllImages();
                self.fixInlineBackgrounds();
                self.verificarFondoHeroe();
                
                // Asegurar que las imágenes sean visibles
                self.ensureImagesVisible();
                document.body.classList.add('images-loaded');
                
                // Solo mostrar diagnóstico en modo desarrollo o con alto nivel de verbosidad
                if (self.logLevel > 1 && !location.hostname.includes('github.io')) {
                    self.debugImagePaths();
                }
                
                self.log('Inicialización completada con éxito.', 1);
            } catch (error) {
                self.error('Error en la inicialización de config.js: ' + error);
            }
        });
    },
    
    // Función para depurar rutas de imágenes
    debugImagePaths: function() {
        this.log('=== DIAGNÓSTICO DE RUTAS DE IMÁGENES ===', 2);
        
        document.querySelectorAll('img').forEach((img, index) => {
            this.log(`Imagen #${index + 1}:`, 2);
            this.log(`- src actual: ${img.src}`, 2);
            this.log(`- src original: ${img.dataset.originalSrc || 'N/A'}`, 2);
            this.log(`- completa: ${img.complete ? 'Sí' : 'No'}`, 2);
            this.log(`- naturalWidth: ${img.naturalWidth}`, 2);
            this.log(`- visible: ${window.getComputedStyle(img).display !== 'none' ? 'Sí' : 'No'}`, 2);
        });
        
        this.log('=== FIN DIAGNÓSTICO ===', 2);
    },
    
    // Asegurar que las imágenes sean visibles
    ensureImagesVisible: function() {
        this.log('Asegurando visibilidad de imágenes...', 2);
        
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
                    
                    // Reemplazar el manejador de errores existente para evitar acumulación
                    img.onerror = null;
                    
                    // Configurar un nuevo manejador de errores con control de desbordamiento
                    img.onerror = function(e) {
                        // Prevenir la propagación del evento para evitar bucles
                        e.stopPropagation();
                        
                        try {
                            const attempts = parseInt(img.dataset.retryAttempts || "0");
                            
                            // Limitar intentos según la configuración (por defecto 1 intento)
                            if (attempts < config.maxRetryAttempts) {
                                config.log(`Reintentando cargar imagen (intento ${attempts + 1}): ${img.src}`, 2);
                                img.dataset.retryAttempts = (attempts + 1).toString();
                                
                                // Usar un temporizador para evitar recursión inmediata
                                setTimeout(() => {
                                    // Intentamos con la ruta corregida
                                    const origSrc = img.dataset.originalSrc || img.src;
                                    const correctedPath = config.corregirRutaImagen(origSrc);
                                    config.log(`Intento 1: usando ruta corregida ${correctedPath}`, 2);
                                    img.src = correctedPath;
                                }, 200); // Retraso para evitar sobrecarga
                            } else {
                                // Después de los intentos máximos, dejamos de intentar
                                config.error(`No se pudo cargar la imagen después de ${config.maxRetryAttempts} intentos: ${img.src}`);
                                img.onerror = null; // Eliminar el manejador para evitar más intentos
                                
                                // Intentar cargar una imagen de respaldo si existe
                                if (img.dataset.fallback && !img.src.includes(img.dataset.fallback)) {
                                    config.log(`Cargando imagen de respaldo final: ${img.dataset.fallback}`, 1);
                                    img.src = img.dataset.fallback;
                                }
                            }
                        } catch (error) {
                            config.error('Error en el manejo de error de imagen: ' + error);
                            img.onerror = null; // Prevenir futuros errores
                        }
                        
                        // Evitar propagación al manejador predeterminado
                        return true;
                    };
                }
            } catch (error) {
                this.error('Error al procesar imagen: ' + error);
            }
        });
    },
    
    // Corregir fondos de CSS en línea
    fixInlineBackgrounds: function() {
        this.log('Corrigiendo fondos en línea...', 2);
        
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
                            // Usar corregirRutaImagen para fondos
                            const newUrl = this.corregirRutaImagen(originalUrl);
                            
                            // Guardar URL original para diagnóstico
                            el.dataset.originalBg = originalUrl;
                            
                            // Reemplazar la URL en el estilo
                            const newStyle = style.replace(originalUrl, newUrl);
                            el.setAttribute('style', newStyle);
                            this.log(`Fondo corregido: ${originalUrl} -> ${newUrl}`, 2);
                        }
                    }
                } catch (error) {
                    this.error('Error al procesar background-image: ' + error);
                }
            });
        } catch (error) {
            this.error('Error en fixInlineBackgrounds: ' + error);
        }
    },
    
    // Corrige todas las rutas de imágenes en la página
    fixAllImages: function() {
        this.log('Corrigiendo rutas de imágenes...', 2);
        
        try {
            // Seleccionar todas las imágenes que no han sido procesadas
            const images = document.querySelectorAll('img:not([data-processed="true"])');
            this.log(`Encontradas ${images.length} imágenes para procesar`, 2);
            
            // Procesar cada imagen
            images.forEach((img, index) => {
                try {
                    const originalSrc = img.getAttribute('src');
                    
                    // Algunos logs de diagnóstico
                    this.log(`Procesando imagen #${index + 1}: ${originalSrc}`, 2);
                    
                    // Solo modificar rutas relativas
                    if (originalSrc && !originalSrc.match(/^(https?:)?\/\//)) {
                        // Guardar la ruta original para referencia
                        img.dataset.originalSrc = originalSrc;
                        
                        // Aplicar la función corregirRutaImagen
                        const newSrc = this.corregirRutaImagen(originalSrc);
                        
                        // Actualizar el atributo src
                        img.src = newSrc;
                        this.log(`Ruta de imagen corregida: ${originalSrc} -> ${newSrc}`, 2);
                        
                        // Marcar como procesada
                        img.dataset.processed = "true";
                        
                        // Configurar una imagen de respaldo para casos extremos
                        if (originalSrc.toLowerCase().includes('hero_background.png')) {
                            this.log('Configurando respaldo para imagen de héroe', 2);
                            img.dataset.fallback = 'https://raw.githubusercontent.com/ReneG-AI/github.io/main/assets/images/Hero_Background.png';
                        } else if (originalSrc.toLowerCase().includes('logo.png')) {
                            this.log('Configurando respaldo para logo', 2);
                            img.dataset.fallback = 'https://raw.githubusercontent.com/ReneG-AI/github.io/main/assets/images/Logo.png';
                        } else if (originalSrc.toLowerCase().includes('autor.jpg') || originalSrc.toLowerCase().includes('autor.png')) {
                            this.log('Configurando respaldo para imagen del autor', 2);
                            img.dataset.fallback = 'https://raw.githubusercontent.com/ReneG-AI/github.io/main/assets/images/Autor.png';
                        }
                        
                        // Verificar si la imagen carga correctamente
                        img.addEventListener('error', () => {
                            if (img.dataset.fallback && !img.src.includes('githubusercontent.com')) {
                                this.log(`Error cargando imagen, usando respaldo: ${img.dataset.fallback}`, 1);
                                img.src = img.dataset.fallback;
                            }
                        });
                    }
                } catch (error) {
                    this.error(`Error al procesar imagen #${index + 1}: ${error}`);
                }
            });
            
            this.log('Corrección de imágenes completada', 1);
        } catch (error) {
            this.error('Error en fixAllImages: ' + error);
        }
    }
};

// Inicializar la configuración de forma más segura
try {
    // Si se está ejecutando en GitHub Pages, establecer el nivel de log más bajo
    if (location.hostname.includes('github.io')) {
        config.logLevel = 0; // Solo errores en producción
    } else {
        config.logLevel = 1; // Logs importantes en desarrollo
    }

    // Inicialización inmediata, pero todo el trabajo real 
    // se realizará cuando se cargue el DOM
    config.init();
    
    // Respaldo adicional: si por alguna razón el script se carga tarde
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(function() {
            config.verificarFondoHeroe();
        }, 500);
    }
} catch (error) {
    console.error('Error fatal en la inicialización de config.js:', error);
}
