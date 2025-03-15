# René Garcia Educa - Sitio Web

Sitio web oficial para "René Garcia Educa", una plataforma dedicada a libros educativos para colorear.

## Estructura Actual del Proyecto

```
/
├── assets/
│   ├── css/
│   │   ├── components/        # Componentes CSS individuales
│   │   │   ├── books.css      # Estilos mejorados para la sección de libros
│   │   │   ├── book-cards.css # Estilos adicionales para tarjetas de libros (¡POSIBLE DUPLICADO!)
│   │   │   ├── buttons.css    # Estilos de botones
│   │   │   ├── contact.css    # Estilos para el formulario de contacto
│   │   │   ├── footer.css     # Estilos para el pie de página
│   │   │   ├── forms.css      # Estilos para formularios
│   │   │   ├── hero.css       # Estilos para el banner principal
│   │   │   ├── modals.css     # Estilos para ventanas modales
│   │   │   ├── navigation.css # Estilos para navegación
│   │   │   └── testimonials.css # Estilos para testimonios
│   │   ├── sections/          # Estilos específicos por sección (¡POSIBLE DUPLICADO!)
│   │   ├── base.css           # Estilos base
│   │   ├── components.css     # Archivo general de componentes (¡POSIBLE DUPLICADO!)
│   │   ├── darkmode-only.css  # Estilos específicos para modo oscuro
│   │   ├── fix-hero.css       # Correcciones específicas para el hero
│   │   ├── hero.css           # Estilos hero adicionales (¡POSIBLE DUPLICADO!)
│   │   ├── main.css           # Archivo CSS principal que importa los demás
│   │   ├── responsive.css     # Estilos responsivos (¡POSIBLE DUPLICADO!)
│   │   ├── styles.css         # Estilos generales (¡POSIBLE DUPLICADO CON main.css!)
│   │   └── variables.css      # Variables CSS globales
│   ├── js/
│   │   ├── main.js            # JavaScript principal con todas las funcionalidades
│   │   └── carousel.js        # JavaScript para carruseles (no utilizado directamente)
│   └── images/
│       ├── Banner.png         # Imagen de fondo para el hero
│       ├── Logo.png           # Logo de René Garcia Educa
│       ├── favicon.ico        # Favicon del sitio
│       ├── og-image.jpg       # Imagen para compartir en redes sociales
│       ├── apple-touch-icon.png # Icono para dispositivos Apple
│       ├── Portada*.png       # Portadas de los libros
│       └── Contraportada*.png # Contraportadas de los libros
├── index.html                 # Página principal
└── README.md                  # Este archivo de documentación
```

## Problemas Detectados y Soluciones

### 1. Duplicación de Archivos CSS
Se han identificado varios archivos CSS con funcionalidades duplicadas:

- **Problema**: `styles.css` (2512 líneas) vs `main.css` (939 líneas) 
  - **Solución**: Mantener solo `main.css` que importa componentes individuales

- **Problema**: `components.css` vs archivos individuales en `components/`
  - **Solución**: Eliminar `components.css` y usar exclusivamente los archivos individuales

- **Problema**: `hero.css` duplicado (en la raíz de CSS y en components)
  - **Solución**: Mantener solo la versión en `components/`

- **Problema**: `book-cards.css` vs `books.css` 
  - **Solución**: Consolidar en `books.css` que ya contiene todas las mejoras

- **Problema**: `responsive.css` separado cuando los estilos responsive deberían estar en sus componentes
  - **Solución**: Integrar los estilos responsive en cada componente y eliminar este archivo

### 2. Archivos Minificados No Utilizados
- `styles.min.css` y `variables.min.css` no están siendo utilizados
  - **Solución**: Eliminar estos archivos o actualizar el HTML para utilizarlos en producción

### 3. Estructura CSS Confusa
Múltiples carpetas (`sections/`, `layout/`, `vendor/`, `pages/`, `themes/`, `utils/`, `base/`) que no están siendo utilizadas efectivamente.
  - **Solución**: Simplificar a solo `components/` y archivos principales

### 4. Archivos en la Raíz del Proyecto
Archivos como `footer.css`, `how d23147a1 -- index.html`, `how --name-only HEAD~5`, `minifier.html` y `tatus` no deberían estar en la raíz.
  - **Solución**: Eliminar o mover estos archivos a ubicaciones apropiadas

## Recomendación de Estructura Optimizada

```
/
├── assets/
│   ├── css/
│   │   ├── components/        # Todos los componentes CSS
│   │   ├── base.css           # Estilos base
│   │   ├── darkmode-only.css  # Estilos modo oscuro
│   │   ├── main.css           # Archivo principal que importa todo
│   │   └── variables.css      # Variables globales
│   ├── js/
│   │   └── main.js            # JavaScript principal
│   └── images/                # Imágenes optimizadas
├── index.html                 # Página principal
└── README.md                  # Documentación
```

## Funcionalidades Principales

### 1. Sección de Libros
- Efecto flip para ver portada/contraportada
- Badges decorativos
- Botón de "Ver todos los libros en Amazon"
- Animaciones AOS (Animate On Scroll)

### 2. Diseño Responsivo
- Adaptación a todos los dispositivos
- Optimizaciones para móviles

### 3. Rendimiento
- Carga diferida de imágenes
- Precarga de recursos críticos
- JavaScript optimizado

### 4. Contacto
- Formulario integrado con formspree.io
- Enlaces a redes sociales con efectos hover

## Notas para Mantenimiento Futuro
1. Mantener la estructura de CSS organizada, evitando duplicar estilos
2. Al agregar nuevas secciones, crear componentes CSS independientes
3. Utilizar las variables CSS definidas en `variables.css` para mantener consistencia
4. Verificar regularmente que no haya conflictos de estilos que puedan afectar la visualización

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
