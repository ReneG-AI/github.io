# René Garcia Educa - Sitio Web Oficial

Sitio web oficial para "René Garcia Educa", una plataforma dedicada a libros educativos multilingües para colorear, que combinan el aprendizaje de idiomas con actividades creativas y relajantes.

## Estructura Actual del Proyecto

```
/
├── assets/
│   ├── css/
│   │   ├── components/        # Estilos de componentes individuales
│   │   ├── layout/            # Estilos de estructura y layout
│   │   ├── sections/          # Estilos específicos por sección
│   │   ├── pages/             # Estilos para páginas adicionales
│   │   ├── base.css           # Estilos base y reset
│   │   ├── components.css     # Compilación de componentes
│   │   ├── darkmode-only.css  # Estilos específicos para modo oscuro
│   │   ├── fix-hero.css       # Correcciones específicas para el hero
│   │   ├── main.css           # Archivo CSS principal
│   │   ├── responsive.css     # Estilos responsivos
│   │   ├── sprite-book.css    # Estilos para sprites de libros
│   │   └── variables.css      # Variables CSS globales
│   ├── js/
│   │   ├── config.js          # Configuración y variables JavaScript
│   │   ├── main.js            # JavaScript principal
│   │   └── carousel.js        # Funcionalidad de carruseles
│   └── images/
│       ├── *.webp             # Imágenes optimizadas en formato WebP
│       └── favicon.ico        # Favicon del sitio
├── .htaccess                  # Configuración del servidor
├── _config.yml                # Configuración para GitHub Pages
├── index.html                 # Página principal del sitio
└── README.md                  # Este archivo de documentación
```

## Características Principales

### Optimización de Imágenes WebP
- Todas las imágenes están disponibles en formatos WebP y PNG para máxima compatibilidad
- Sistema inteligente de detección que usa WebP en navegadores modernos y PNG como fallback
- Precargas estratégicas para mejorar la experiencia de usuario
- Transición automática entre formatos sin intervención del usuario

### Rendimiento Optimizado
- Carga diferida inteligente de recursos
- Script de precarga con límite de solicitudes simultáneas
- Sistema de caché configurado para máxima eficiencia
- Técnicas de sprites CSS para reducir solicitudes HTTP

### Diseño Responsivo
- Adaptación completa a todos los dispositivos
- Optimizaciones específicas para móviles, tablets y pantallas grandes
- Menú hamburguesa en versions móviles
- Media queries estratégicamente implementadas

### Efecto Flip de Libros
- Animación suave y optimizada para mostrar portadas y contraportadas
- Implementación mejorada con transiciones de alta calidad
- Alternativas entre display convencional y sprites CSS

### Secciones Principales
1. **Hero** - Presentación visual impactante con mensaje principal
2. **Libros** - Catálogo de libros con efecto flip y detalles
3. **Testimonios** - Opiniones de clientes con diseño atractivo
4. **Contacto** - Formulario de contacto con integración a formspree.io

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica moderna
- **CSS3** - Estilos avanzados con variables y efectos
- **JavaScript** - Funcionalidades interactivas
- **WebP** - Formato de imagen de alta compresión
- **GitHub Pages** - Hospedaje del sitio
- **Font Awesome** - Iconografía vectorial
- **Google Fonts** - Tipografías personalizadas
- **AOS Library** - Animaciones al hacer scroll
- **Three.js** - Efectos visuales avanzados (cargado diferido)

## Optimización de Imágenes

### Técnicas Implementadas

Para mejorar drásticamente el rendimiento de carga, especialmente en las portadas y contraportadas de los libros, se han implementado las siguientes optimizaciones:

1. **Formato Dual WebP/PNG**
   - Todas las imágenes están disponibles en WebP para navegadores modernos (30-80% más pequeñas)
   - Versiones PNG como respaldo para navegadores antiguos
   - Detección automática de soporte y cambio transparente entre formatos
   - Scripts inteligentes que intentan formato alternativo si el principal falla

2. **Precarga Estratégica**
   - Precarga selectiva solo de imágenes críticas visibles en pantalla
   - Limitación inteligente a 3 imágenes simultáneas para evitar sobrecarga
   - Sistema de prioridad que carga primero WebP, luego PNG si es necesario

3. **Sprites CSS para Libros**
   - Técnica avanzada que combina portada y contraportada en una sola imagen
   - Cambio de imagen mediante CSS position en lugar de cargar una nueva imagen
   - Implementación selectiva para libros clave

4. **Caché Agresiva**
   - Configuración .htaccess para caché de 1 año en imágenes
   - Cache-Control configurado óptimamente en GitHub Pages
   - ETag desactivado para mejorar rendimiento

5. **Optimización de CSS**
   - Uso de `will-change` para mejor rendimiento en animaciones
   - Transiciones con cubic-bezier para mayor fluidez
   - Gestión de memoria optimizada con opacity vs display:none

### Ejemplo de Implementación de Sprites

```html
<div class="book-images">
  <div class="book-sprite-container">
    <div class="book-sprite"></div>
  </div>
  <button class="flip-button">
    <i class="fas fa-sync-alt"></i> Girar
  </button>
</div>
```

## Mejoras y Optimizaciones Recientes

### Cambio a formato WebP
- **Conversión Completa**: Todas las imágenes ahora usan formato WebP
- **Reducción de Tamaño**: Reducción promedio del 65% en el tamaño de imágenes
- **Detección Automática**: Script que detecta soporte de WebP y ofrece fallback
- **Precarga Optimizada**: Sistema inteligente que limita solicitudes simultáneas

### Mejoras en la Sección de Contacto
- **Glassmorphism Mejorado**: Fondos más legibles y elegantes
- **Etiquetas Renovadas**: Diseño con degradado para mayor impacto visual
- **Estructura Optimizada**: Mejor alineación y espaciado con otras secciones
- **Experiencia de Usuario**: Formulario más intuitivo y atractivo

### Control de Tasa de Solicitudes
- **Gestión de Error 429**: Implementación para evitar "Too Many Requests"
- **Configuración de Servidor**: Ajustes en .htaccess para limitar tasa de transferencia
- **Optimización de GitHub Pages**: Configuración específica en _config.yml

### Rendimiento General
- **Carga Progresiva**: Mejora en el orden de carga de recursos
- **CSS Optimizado**: Reducción de duplicidades y conflictos
- **JavaScript Eficiente**: Código refactorizado para mejor rendimiento

## Posibles Mejoras Futuras

### Estructura de CSS
- Consolidar archivos duplicados (components.css vs archivos individuales)
- Integrar los estilos responsive directamente en cada componente
- Simplificar la estructura de directorios para mayor coherencia

### Optimización de Imágenes
- Convertir todos los libros a implementación con sprites
- Considerar implementar srcset para imágenes responsivas
- Explorar el uso de lazy-loading nativo en más elementos

### Rendimiento
- Minimizar archivos CSS y JS para producción
- Implementar service workers para funcionamiento offline
- Considerar estrategias de Server-Side Rendering

## Mantenimiento

### Agregar Nuevos Libros
Para agregar un nuevo libro al sitio:

1. Preparar imágenes en formato WebP (portada y contraportada)
2. Duplicar el bloque HTML de book-item en index.html
3. Actualizar las rutas de imágenes, textos y enlaces
4. Considerar implementar versión sprite para mejor rendimiento

### Herramientas Recomendadas
- **Squoosh** (https://squoosh.app/) - Para convertir y optimizar imágenes a WebP
- **GIMP/Photoshop** - Para crear sprites combinando portada y contraportada
- **PageSpeed Insights** - Para verificar el rendimiento del sitio

## Notas Adicionales

### Compatibilidad con Navegadores
El sitio está optimizado para todos los navegadores modernos con soporte de fallback para:
- Navegadores sin soporte WebP (usando PNG como alternativa)
- IE11+ y navegadores modernos (Chrome, Firefox, Safari, Edge)

### Resolución de Problemas
- Si ocurre el error 429 (Too Many Requests), esperar unos minutos y recargar
- Si las imágenes no cargan correctamente, el script de corrección intentará solucionar el problema automáticamente
- Para reportar problemas, utilizar el formulario de contacto en la web

## Contacto
Para más información sobre este proyecto, contactar a René García a través del formulario de contacto en el sitio web o a través de las redes sociales vinculadas.
