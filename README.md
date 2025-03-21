# René García Educa - Website

This repository contains the source code for René García Educa's website, a platform dedicated to multilingual educational coloring books.

## Project Overview

The website showcases educational coloring books in multiple languages (Spanish, Catalan, English, French, and German). It's designed as a static website using modern HTML, CSS, and JavaScript with responsive design principles to work on all devices.

## Project Structure

```
/
├── index.html           # Main homepage
├── terms.html           # Terms of service page
├── privacy.html         # Privacy policy page
├── legal.html           # Legal notice page
├── error.html           # Custom error page
├── .htaccess            # Server configuration
├── assets/
│   ├── css/             # Stylesheets
│   │   ├── main.css     # Main CSS file that imports others
│   │   ├── base.css     # Base styles
│   │   ├── variables.css # CSS variables and themes
│   │   ├── fix-hero.css # Fixes for hero section
│   │   ├── fix-sections.css # Fixes for other sections
│   │   ├── components/  # Component-specific styles
│   │   │   ├── hero.css
│   │   │   ├── navigation.css
│   │   │   ├── books.css
│   │   │   ├── author.css
│   │   │   ├── testimonials.css
│   │   │   ├── contact.css
│   │   │   ├── footer.css
│   │   │   ├── forms.css
│   │   │   ├── modals.css
│   │   │   └── buttons.css
│   │   ├── layout/      # Layout styles
│   │   ├── sections/    # Section-specific styles
│   │   └── pages/       # Page-specific styles
│   ├── js/              # JavaScript files
│   │   ├── main.js      # Main JavaScript file
│   │   ├── config.js    # Configuration for paths and GitHub Pages
│   │   ├── carousel.js  # Book carousel functionality
│   │   ├── app.js       # Compatibility placeholder
│   │   ├── particles.min.js # Placeholder for particles effect
│   │   ├── fixes/       # JS fixes for specific issues
│   │   │   └── menu-fix.js # Mobile menu fixes
│   │   ├── animations/  # Animation-related scripts
│   │   └── utils/       # Utility functions
│   │       └── copy-email.js # Email copy functionality
│   └── images/          # Website images
│       ├── Logo.webp    # Site logo
│       ├── Hero_Background.webp # Hero section background
│       ├── Autor.png    # Author image
│       └── ...          # Book covers and other images
└── backup/              # Backup directory
```

## Key Features

- **Responsive Design**: Adapts to all screen sizes (mobile, tablet, desktop)
- **Modern Aesthetics**: Clean, elegant dark mode design with animations
- **Performance Optimized**: WebP images, optimized asset loading
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Cross-Browser Compatible**: Works on all modern browsers

## Technical Details

### CSS Architecture

The CSS is organized in a modular structure:
- `variables.css`: Contains theme variables and custom properties
- `base.css`: Reset and base styles
- Component-specific CSS files for maintainability
- Mobile-first responsive approach

### JavaScript Features

The site uses vanilla JavaScript with these key features:
- Smooth scrolling navigation
- Lazy loading of images
- Book flip effect
- Form validation and character counting
- Animations with AOS (Animate On Scroll)
- Path correction system for GitHub Pages deployment

### Fixes and Compatibility

Several mechanisms ensure the site works correctly in all environments:
- Path correction for GitHub Pages in `config.js`
- Image loading fallbacks
- Mobile menu fixes
- Compatibility placeholders for optional features

## Browser Support

The website is optimized for:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Development

To work on this project:

1. Clone the repository
2. Make changes to HTML, CSS, or JavaScript files
3. Test locally using a web server (e.g., Live Server VS Code extension)
4. Commit and push changes to deploy to GitHub Pages

### Best Practices

- Keep CSS modular by updating the appropriate component files
- Maintain consistent naming conventions
- Test on multiple devices and browsers before deployment
- Use WebP images with fallbacks for older browsers

## License

© 2020-2025 René Garcia Educa. All rights reserved.
