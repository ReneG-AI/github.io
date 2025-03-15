# René Garcia Educa - Sitio Web

Sitio web oficial para "René Garcia Educa", una plataforma dedicada a libros educativos para colorear.

## Estructura del Proyecto

```
/
├── assets/
│   ├── css/
│   │   ├── components/        # Componentes CSS individuales
│   │   │   ├── hero.css       # Estilos para el banner principal
│   │   │   ├── header.css     # Estilos para la cabecera
│   │   │   ├── books.css      # Estilos para la sección de libros
│   │   │   ├── testimonials.css # Estilos para testimonios
│   │   │   ├── contact.css    # Estilos para el formulario de contacto
│   │   │   ├── footer.css     # Estilos para el pie de página
│   │   │   └── modal.css      # Estilos para ventanas modales
│   │   ├── darkmode-only.css  # Estilos específicos para modo oscuro
│   │   └── main.css           # Archivo CSS principal que importa los demás
│   ├── js/
│   │   └── main.js            # JavaScript principal
│   └── images/
│       ├── Banner.png         # Imagen de fondo para el hero
│       ├── Logo.png           # Logo de René Garcia Educa
│       ├── favicon.ico        # Favicon del sitio
│       ├── og-image.jpg       # Imagen para compartir en redes sociales
│       ├── Portada*.png       # Portadas de los libros
│       └── Contraportada*.png # Contraportadas de los libros
├── index.html                 # Página principal
└── README.md                  # Este archivo de documentación
```

## Secciones Principales

### 1. Hero (Banner Principal)
- **Archivos**: `hero.css`, parte de `index.html`
- **Descripción**: Sección de bienvenida con imagen de fondo (Banner.png), título principal y botones de acción.
- **Características**: Diseño simplificado con la imagen de fondo y texto a la izquierda.

### 2. Sección de Libros
- **Archivos**: `books.css`, parte de `index.html`
- **Descripción**: Muestra los libros disponibles con portadas, contraportadas y detalles.
- **Características**: Efecto flip para ver portada/contraportada, badges, información detallada.

### 3. Testimonios
- **Archivos**: `testimonials.css`, parte de `index.html`
- **Descripción**: Opiniones de clientes sobre los libros.
- **Características**: Diseño con tarjetas y efectos visuales.

### 4. Contacto
- **Archivos**: `contact.css`, parte de `index.html`
- **Descripción**: Formulario de contacto y enlaces a redes sociales.
- **Características**: Integración con formspree.io para el envío de mensajes.

## Archivos Clave

### CSS
- **main.css**: Archivo principal que importa todos los componentes CSS y define variables globales.
- **components/hero.css**: Estilo del banner principal con la imagen de fondo.

### JavaScript
- **main.js**: Contiene todas las funcionalidades:
  - Inicialización de precarga
  - Menú móvil
  - Desplazamiento suave a secciones
  - Efecto de scroll en cabecera
  - Efecto flip para libros
  - Modal para "Ver interior"
  - Botón volver arriba
  - Inicialización de AOS (Animate On Scroll)

### HTML
- **index.html**: Página principal que contiene toda la estructura del sitio.

## Imágenes
- **Banner.png**: Imagen de fondo para la sección hero.
- **Logo.png**: Logo de la marca.
- **og-image.jpg**: Imagen utilizada cuando se comparte el enlace en redes sociales.
- **Portadas y Contraportadas**: Imágenes de los libros que se muestran en la sección de libros.

## Dependencias Externas
- **Google Fonts**: Poppins (fuente principal)
- **Font Awesome**: Iconos
- **AOS (Animate On Scroll)**: Animaciones al hacer scroll
- **Three.js**: Efectos visuales avanzados (cargado de forma diferida)

## Notas de Mantenimiento
1. **Agregar nuevos libros**: Duplicar el bloque `book-item` en la sección de libros y actualizar contenido e imágenes.
2. **Actualizar testimonios**: Modificar el contenido dentro de `testimonial` en la sección de testimonios.
3. **Cambiar estilos de color**: Las variables de color están definidas en `:root` dentro de `main.css`.

## Características Específicas

### Rendimiento
- Carga diferida de imágenes con `loading="lazy"`
- Precarga de recursos críticos
- JavaScript optimizado

### Responsive
- Diseño totalmente adaptable a móvil, tablet y escritorio
- Menú hamburguesa en versiones móviles

### Accesibilidad
- Etiquetas semánticas HTML5
- Atributos ARIA donde corresponde
- Alto contraste en textos

## Contacto
Para más información sobre este proyecto, contactar a René García a través del formulario de contacto en el sitio web o a través de las redes sociales vinculadas.
