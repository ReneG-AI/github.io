# René García Educa - Official Website

This repository contains the code for the René García Educa educational platform website, designed to showcase educational resources, books, and contact information.

## Project Overview

The website is built with HTML, CSS, and JavaScript, focusing on performance, accessibility, and responsive design. It's structured to be easily deployable on GitHub Pages.

## Features

- Responsive design that works across all devices (mobile, tablet, desktop)
- Optimized for performance with minimal dependencies
- Interactive elements including:
  - Book flipping cards
  - Animated section transitions
  - Form validation
  - Testimonial slider
  - Contact form
- Accessibility-focused implementation

## Directory Structure

```
/
├── index.html              # Main HTML file
├── error.html              # Error page (handles 404 errors)
├── legal.html              # Legal notices
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── .gitattributes          # Git attributes configuration
├── .htaccess               # Apache server configuration
├── _config.yml             # Jekyll configuration for GitHub Pages
├── assets/
│   ├── css/
│   │   ├── main.css        # Main stylesheet (includes all fixes)
│   │   ├── base.css        # Base styles
│   │   ├── components.css  # General component styles
│   │   ├── style.css       # Additional styles
│   │   ├── variables.css   # CSS variables
│   │   │
│   │   ├── components/     # Component-specific styles
│   │   │   ├── author.css
│   │   │   ├── books.css
│   │   │   ├── buttons.css
│   │   │   ├── contact.css
│   │   │   ├── footer.css
│   │   │   ├── forms.css
│   │   │   ├── hero.css
│   │   │   ├── modals.css
│   │   │   ├── navigation.css
│   │   │   └── testimonials.css
│   │   │
│   │   ├── layout/         # Layout styles
│   │   │   ├── footer.css
│   │   │   ├── grid.css
│   │   │   └── sections.css
│   │   │
│   │   ├── pages/          # Page-specific styles
│   │   │   └── home.css
│   │   │
│   │   └── sections/       # Section-specific styles
│   │       ├── contacto.css
│   │       └── footer.css
│   │
│   ├── images/             # Website images and graphics
│   │   ├── .gitkeep
│   │   ├── apple-touch-icon.png
│   │   ├── apple-touch-icon.webp
│   │   ├── Autor.png
│   │   ├── Autor.webp
│   │   ├── Contraportada_*.png/webp  # Book back covers
│   │   ├── Error_Drake_3D.png        # Error page illustration
│   │   ├── favicon.ico
│   │   ├── Hero_Background.png/webp
│   │   ├── Logo.png/webp
│   │   ├── og-image.png/webp         # Open Graph images
│   │   └── Portada_*.png/webp        # Book covers
│   │
│   └── js/                 # JavaScript files
│       ├── app.js          # Particles background configuration
│       ├── carousel.js     # Carousel/slider functionality
│       ├── config.js       # Site configuration
│       ├── main.js         # Main JavaScript functionality (includes browser compatibility fixes)
│       ├── particles.min.js # Particles.js library
│       │
│       └── utils/          # Utility functions
│           └── copy-email.js
└── README.md               # Project documentation
```

## Local Development

To work on this site locally:

1. Clone the repository:
   ```
   git clone https://github.com/ReneG-AI/github.io.git
   ```

2. Navigate to the project directory:
   ```
   cd github.io
   ```

3. Open the project in your preferred code editor.

4. For local testing, you can use any of these methods:
   - Open `index.html` directly in your browser
   - Use a local server (Python's `http.server`, VS Code's Live Server extension, etc.)

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

To deploy manually:

1. Go to the repository Settings
2. Navigate to Pages
3. Ensure the source is set to "Deploy from a branch"
4. Select "main" branch and "/ (root)" folder
5. Click Save

The site will be available at `https://renegarciaeduca.com` or your custom domain if configured.

## Development Guidelines

### CSS Structure

The CSS is organized into a modular structure:
- `main.css` - Imports all other CSS files
- `variables.css` - Contains CSS custom properties
- `base.css` - Base styles and resets
- Component-specific styles are in the `components/` directory
- Layout structures are in the `layout/` directory
- Page-specific styles are in the `pages/` directory
- Section-specific styles are in the `sections/` directory

### JavaScript Structure

- `main.js` - Contains the primary JavaScript functionality (includes all browser compatibility fixes)
- `config.js` - Site configuration and settings
- Utility functions are in the `utils/` directory

### Adding New Pages

When adding a new page:
1. Create an HTML file in the root directory
2. Link to the main CSS and JavaScript files
3. If page-specific styles are needed, create a CSS file in `assets/css/pages/`
4. Update the navigation in all HTML files to include the new page

### Images

- Place all images in the `assets/images/` directory
- Use WebP format with PNG fallbacks for better performance
- Optimize images before adding them to the repository

## Browser Compatibility

The website is tested and compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Contact

For questions about this project, please contact René García through the contact form on the website.

---

Last updated: March 2024
