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
                
                // ✅ CORRECCIÓN: Para reneg-ai.github.io, siempre usar string vacío
                // para evitar la duplicación del prefijo '/github.io'
                return '';
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
    
    // ✅ NUEVA FUNCIÓN: Corregir rutas para imágenes basada en origen absoluto
    corregirRutaImagen: function(src) {
        if (!src) return '';
        if (src.startsWith('http')) return src;
        
        // Verificar si hay problemas de mayúsculas/minúsculas en archivos conocidos
        const lowerSrc = src.toLowerCase();
        
        // Mapa de correcciones para archivos con problemas de capitalización
        const caseSensitiveFiles = {
            'assets/images/autor.jpg': 'assets/images/Autor.jpg',
            'assets/images/logo.png': 'assets/images/Logo.png',
            'assets/images/hero_background.png': 'assets/images/Hero_Background.png'
        };
        
        // Corregir nombre de archivo si es necesario
        for (const [incorrectPath, correctPath] of Object.entries(caseSensitiveFiles)) {
            if (lowerSrc.includes(incorrectPath.toLowerCase())) {
                console.log(`Corrigiendo capitalización: ${src} -> ${src.replace(new RegExp(incorrectPath, 'i'), correctPath)}`);
                src = src.replace(new RegExp(incorrectPath, 'i'), correctPath);
                break;
            }
        }
        
        // ✅ CORRECCIÓN: Usar origin (protocolo + hostname) como base para rutas absolutas
        const baseUrl = window.location.origin;
        return `${baseUrl}/${src.replace(/^\/+/, '')}`;
    },
    
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
        
        // ✅ CORRECCIÓN: Asegurarnos de no duplicar '/github.io' en las rutas
        const finalPath = this.baseUrl ? `${this.baseUrl}/${path}` : path;
        console.log('Ruta transformada: ' + path + ' -> ' + finalPath);
        
        // ✅ CORRECCIÓN: Si estamos en reneg-ai.github.io, asegurarnos de eliminar prefijos duplicados
        if (location.hostname === 'reneg-ai.github.io') {
            return finalPath.replace('/github.io/', '/');
        }
        
        return finalPath;
    },
    
    // ✅ NUEVA FUNCIÓN: Verificar y corregir el fondo del héroe
    verificarFondoHeroe: function() {
        console.log('Verificando fondo del héroe...');
        
        // Buscar elementos que podrían ser el fondo del héroe
        const heroBackground = document.querySelector('.hero-background');
        const heroBackgroundImg = document.querySelector('.hero-bg-img');
        
        if (heroBackground) {
            // ✅ CORRECCIÓN: Establecer el fondo directamente usando CSS si existe el elemento
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
                                console.log(`Imagen del héroe no encontrada, usando respaldo: ${fallbackSrc}`);
                                if (fallbackSrc) {
                                    heroBackgroundImg.src = fallbackSrc;
                                }
                            }
                        })
                        .catch(() => {
                            console.log(`Error cargando imagen del héroe, usando respaldo: ${fallbackSrc}`);
                            if (fallbackSrc) {
                                heroBackgroundImg.src = fallbackSrc;
                            }
                        });
                }
            } else {
                // Si no hay imagen, intentar establecer el fondo como estilo
                console.log('Configurando fondo del héroe como background-image...');
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
        
        console.log('Inicializando config.js, baseUrl:', this.baseUrl);
        this.initialized = true;
        
        // ✅ CORRECCIÓN: Envolver toda la inicialización en DOMContentLoaded para resolver
        // el problema de document.body no disponible
        const self = this;
        
        document.addEventListener('DOMContentLoaded', function() {
            try {
                console.log('DOM completamente cargado, inicializando configuración...');
                
                // Ahora document.body siempre estará disponible
                document.body.classList.add('github-pages-config');
                document.body.classList.add('cargado');
                
                // Ejecutar todas las correcciones
                self.fixAllImages();
                self.fixInlineBackgrounds();
                self.debugImagePaths();
                self.verificarFondoHeroe();
                
                // Asegurar que las imágenes sean visibles
                self.ensureImagesVisible();
                document.body.classList.add('images-loaded');
                
                console.log('Inicialización completada con éxito.');
            } catch (error) {
                console.error('Error en la inicialización de config.js:', error);
            }
        });
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
                    
                    // Reemplazar el manejador de errores existente para evitar acumulación
                    img.onerror = null;
                    
                    // Configurar un nuevo manejador de errores con control de desbordamiento
                    img.onerror = function(e) {
                        // Prevenir la propagación del evento para evitar bucles
                        e.stopPropagation();
                        
                        try {
                            const attempts = parseInt(img.dataset.retryAttempts || "0");
                            
                            // Limitar a máximo 2 intentos para evitar bucles infinitos
                            if (attempts < 2) {
                                console.log(`Reintentando cargar imagen (intento ${attempts + 1}): ${img.src}`);
                                img.dataset.retryAttempts = (attempts + 1).toString();
                                
                                // Usar un temporizador para evitar recursión inmediata
                                setTimeout(() => {
                                    // Estrategias alternativas de carga
                                    if (attempts === 0) {
                                        // Primer intento: usar la función corregirRutaImagen
                                        const origSrc = img.dataset.originalSrc || img.src;
                                        const correctedPath = config.corregirRutaImagen(origSrc);
                                        console.log(`Intento 1: usando ruta corregida ${correctedPath}`);
                                        img.src = correctedPath;
                                    } else if (attempts === 1) {
                                        // Último intento: usar URL de respaldo si existe
                                        if (img.dataset.fallback) {
                                            console.log(`Intento final: usando respaldo ${img.dataset.fallback}`);
                                            img.src = img.dataset.fallback;
                                        }
                                    }
                                }, 100 * attempts); // Incrementar el retraso con cada intento
                            } else {
                                // Después de los intentos máximos, dejamos de intentar
                                console.error(`No se pudo cargar la imagen después de múltiples intentos: ${img.src}`);
                                img.onerror = null; // Eliminar el manejador para evitar más intentos
                                
                                // Intentar cargar una imagen de respaldo si existe
                                if (img.dataset.fallback && !img.src.includes(img.dataset.fallback)) {
                                    console.log(`Cargando imagen de respaldo final: ${img.dataset.fallback}`);
                                    img.src = img.dataset.fallback;
                                }
                            }
                        } catch (error) {
                            console.error('Error en el manejo de error de imagen:', error);
                            img.onerror = null; // Prevenir futuros errores
                        }
                        
                        // Evitar propagación al manejador predeterminado
                        return true;
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
                            // ✅ CORRECCIÓN: Usar corregirRutaImagen para fondos
                            const newUrl = this.corregirRutaImagen(originalUrl);
                            
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
                        
                        // ✅ CORRECCIÓN: Aplicar la nueva función corregirRutaImagen
                        const newSrc = this.corregirRutaImagen(originalSrc);
                        
                        // Actualizar el atributo src
                        img.src = newSrc;
                        console.log(`Ruta de imagen corregida: ${originalSrc} -> ${newSrc}`);
                        
                        // Marcar como procesada
                        img.dataset.processed = "true";
                        
                        // Configurar una imagen de respaldo para casos extremos
                        if (originalSrc.toLowerCase().includes('hero_background.png')) {
                            console.log('Configurando respaldo para imagen de héroe');
                            img.dataset.fallback = 'https://raw.githubusercontent.com/ReneG-AI/github.io/main/assets/images/Hero_Background.png';
                        } else if (originalSrc.toLowerCase().includes('logo.png')) {
                            console.log('Configurando respaldo para logo');
                            img.dataset.fallback = 'https://raw.githubusercontent.com/ReneG-AI/github.io/main/assets/images/Logo.png';
                        } else if (originalSrc.toLowerCase().includes('autor.jpg')) {
                            console.log('Configurando respaldo para imagen del autor');
                            img.dataset.fallback = 'https://raw.githubusercontent.com/ReneG-AI/github.io/main/assets/images/Autor.jpg';
                        }
                        
                        // Verificar si la imagen carga correctamente
                        img.addEventListener('error', () => {
                            if (img.dataset.fallback && !img.src.includes('githubusercontent.com')) {
                                console.log(`Error cargando imagen, usando respaldo: ${img.dataset.fallback}`);
                                img.src = img.dataset.fallback;
                            }
                        });
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

// ✅ CORRECCIÓN: Inicializar la configuración de forma más segura
try {
    // Inicialización inmediata, pero todo el trabajo real 
    // se realizará cuando se cargue el DOM
    config.init();
    
    // Respaldo adicional: si por alguna razón el script se carga tarde
    if (document.readyState === "complete" || document.readyState === "interactive") {
        console.log("Documento ya cargado, iniciando verificación de fondo del héroe...");
        setTimeout(function() {
            config.verificarFondoHeroe();
        }, 500);
    }
} catch (error) {
    console.error('Error fatal en la inicialización de config.js:', error);
}
