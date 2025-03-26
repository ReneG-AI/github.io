# René Garcia Educa - Sitio Web Oficial (Versión 1.0)

Este repositorio contiene el código de la página web oficial de René Garcia Educa, una plataforma educativa diseñada para mostrar libros para colorear multilingües, recursos educativos e información de contacto.

![René Garcia Educa Logo](assets/images/RG_Educa_Logo.webp)

## 📋 Características de la Versión 1.0

La Versión 1.0 incluye las siguientes características principales:

- **Diseño completamente responsive**
  - Optimizado para móviles, tablets y escritorio
  - Adaptación fluida a todos los tamaños de pantalla
  - Experiencia de usuario consistente en todos los dispositivos

- **Secciones principales**
  - **Hero**: Presentación inicial atractiva con fondo animado
  - **Libros**: Showcase de libros con tarjetas interactivas y efecto de volteo
  - **Reseñas**: Testimonios de usuarios en un diseño elegante
  - **Contacto**: Información de contacto y formas de colaboración
  - **Footer**: Enlaces de navegación y copyright

- **Características técnicas**
  - Optimización de rendimiento (imágenes WebP, carga diferida)
  - Compatibilidad con navegadores modernos
  - Efectos visuales elegantes (gradientes, animaciones sutiles, sombras)
  - Iconografía con Font Awesome
  - Estructura modular de CSS y JavaScript

- **Elementos interactivos**
  - Tarjetas de libros con efecto flip (volteo)
  - Botón de "volver arriba"
  - Enlaces a productos de Amazon
  - Menú de navegación colapsable en móvil
  - Función de copia de email con un clic

## 🚀 Mejoras Futuras y Proyectos Planificados

Para futuras versiones del sitio web, se consideran las siguientes mejoras:

### Mejoras Técnicas
- **Implementar sistema de blog** para compartir artículos sobre educación y aprendizaje de idiomas
- **Añadir sección de galería** con ejemplos de páginas coloreadas por usuarios
- **Integrar un sistema de suscripción a newsletter** para mantener informados a los usuarios
- **Desarrollar una tienda online directa** para facilitar la venta de libros sin intermediarios
- **Implementar modo oscuro/claro** con selector de preferencia
- **Optimizar para SEO avanzado** con metadatos mejorados y esquemas JSON-LD completos

### Nuevas Funcionalidades
- **Área de miembros** con recursos descargables exclusivos
- **Vídeos tutoriales** sobre técnicas de coloreado y aprendizaje
- **Calendario de eventos** para talleres y presentaciones
- **Sistema de comentarios** para interactuar con los usuarios
- **Formulario de pedidos personalizados** para proyectos educativos a medida
- **Modo de visualización preliminar** para ver el interior de los libros

### Experiencia de Usuario
- **Animaciones más elaboradas** para la transición entre secciones
- **Personalización de colores** para adaptarse a las preferencias del usuario
- **Chatbot asistente** para responder preguntas frecuentes
- **Traducciones multilingües** del sitio web (inglés, francés, alemán)
- **Sistema de progreso** para seguimiento de aprendizaje
- **Mejoras de accesibilidad** para usuarios con discapacidades

## 🔧 Tecnologías Utilizadas

El sitio web está construido con:

- **HTML5** - Estructura y contenido
- **CSS3** - Estilos y animaciones
  - Sistema de variables CSS para consistencia de diseño
  - Media queries para diseño responsive
  - Flexbox y Grid para layouts avanzados
- **JavaScript** - Interactividad y funcionalidades
  - Vanilla JS sin dependencias pesadas
  - Gestión de eventos y manipulación del DOM
  - Animaciones suaves y transiciones
- **Font Awesome** - Iconografía
- **Google Fonts** - Tipografías

## 📁 Estructura del Proyecto

La organización de archivos sigue una estructura modular y fácil de mantener:

```
/
├── index.html              # Página principal
├── error.html              # Página de error personalizada
├── legal.html              # Aviso legal
├── privacy.html            # Política de privacidad
├── terms.html              # Términos y condiciones
├── assets/
│   ├── css/
│   │   ├── main.css        # CSS principal (incluye fixes)
│   │   ├── variables.css   # Variables CSS
│   │   ├── components/     # Estilos específicos por componente
│   │   │   ├── books.css
│   │   │   ├── contact-modern.css
│   │   │   ├── footer.css
│   │   │   ├── hero.css
│   │   │   ├── navigation.css
│   │   │   └── testimonials.css
│   │   └── ...
│   ├── images/            # Imágenes y gráficos
│   │   ├── Portada_*.webp  # Portadas de libros
│   │   ├── Contraportada_*.webp # Contraportadas
│   │   ├── Hero_Background.webp # Fondo del hero
│   │   └── ...
│   └── js/                # JavaScript
│       ├── main.js        # Funcionalidades principales
│       ├── carousel.js    # Gestión de carruseles
│       └── ...
└── README.md              # Documentación del proyecto
```

## 📋 Guía de Uso

### Para Usuarios
1. Navega por la página utilizando el menú superior
2. Explora los libros disponibles en la sección "Libros Increíbles"
3. Lee las reseñas de otros usuarios en la sección "Reseñas"
4. Utiliza los botones de Amazon para comprar los libros
5. Contacta con René Garcia a través de la información en la sección "Contacto"

### Para Desarrolladores
1. Clona el repositorio:
   ```
   git clone https://github.com/tuusuario/github.io.git
   ```
2. Abre `index.html` en tu navegador o utiliza un servidor local
3. Modifica los archivos según sea necesario siguiendo la estructura establecida

## 📄 Licencias y Atribuciones

- **Contenido**: © 2024 René Garcia Educa. Todos los derechos reservados.
- **Código**: Código personalizado desarrollado para René Garcia Educa.
- **Librerías**: Se utilizan librerías con sus respectivas licencias:
  - Font Awesome: [License](https://fontawesome.com/license)
  - Google Fonts: [License](https://developers.google.com/fonts/terms)

---

Desarrollado con ❤️ para René Garcia Educa | Versión 1.0 - Mayo 2024
