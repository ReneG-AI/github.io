# Lavendish Bar Website

A modern, responsive website for Lavendish Bar in Lleida, Spain.

## Project Overview

This website was designed to enhance the online presence of Lavendish Bar, featuring a beautiful design that highlights the bar's unique atmosphere, menu offerings, and events calendar. The site focuses on providing a seamless experience for visitors with clean navigation and engaging visuals.

## Features

- **Responsive Design**: Fully mobile-friendly layout that adapts to all screen sizes
- **Modern Aesthetics**: Clean design with a focus on the bar's lavender theme
- **Optimized Performance**: Fast-loading pages with optimized images and resources
- **SEO-Friendly**: Structured with proper meta tags and semantic HTML
- **Interactive Elements**: Dynamic filtering for the gallery and menu sections
- **Google Maps Integration**: Interactive map showing the bar's location
- **Contact Form**: Easy-to-use form for customer inquiries and reservations
- **Events Calendar**: Regularly updated calendar of upcoming events and promotions

## Project Structure

```
lavendish-website/
├── css/
│   ├── style.css         # Main stylesheet with variables and common styles
│   ├── pages.css         # Page-specific styles
│   └── responsive.css    # Media queries for responsive design
├── js/
│   └── main.js           # Main JavaScript functionality
├── images/
│   ├── gallery/          # Gallery images sorted by categories
│   │   ├── ambiance/     # Bar atmosphere photos
│   │   ├── drinks/       # Signature cocktails and drinks
│   │   ├── food/         # Food and tapas
│   │   ├── events/       # Past events
│   │   └── user/         # User-submitted photos
│   ├── menu/             # Menu item images
│   └── events/           # Event promotional images
├── index.html            # Home page
├── menu.html             # Menu page
├── events.html           # Events calendar page
├── gallery.html          # Photo gallery page
├── contact.html          # Contact information and form
└── README.md             # Project documentation
```

## Technologies Used

- **HTML5**: Semantic markup for content structure
- **CSS3**: Modern styling including CSS variables, flexbox, and grid
- **JavaScript**: Interactive elements and form validation
- **Google Maps API**: For the location map on the contact page
- **Lightbox2**: For the image gallery lightbox effect
- **Font Awesome**: For icons throughout the site
- **Google Fonts**: For typography (Poppins & Playfair Display)

## Development Guidelines

### CSS Architecture

The CSS is organized into three main files:

1. **style.css** - Contains CSS variables for consistent theming, global styles, and common components
2. **pages.css** - Page-specific styles for each main section of the website
3. **responsive.css** - Media queries for different screen sizes

The site uses a component-based approach with consistent naming conventions and relies heavily on CSS variables for easy theme customization.

### JavaScript Organization

The JavaScript is structured around clearly separated functions, each responsible for a specific piece of functionality. The code uses event delegation where appropriate and is built with performance in mind.

### Browser Support

The website is optimized for:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Local Development

To work on this project locally:

1. Clone the repository
2. Open the project in your preferred code editor
3. Use a local development server to view the site
   - You can use the Live Server extension in VS Code
   - Or run `python -m http.server` in the project directory
4. Make your changes and test across different screen sizes

## Deployment

The website is designed to be deployed to any standard web hosting service or can be easily deployed using GitHub Pages.

## License

© 2023 Lavendish Bar. All rights reserved.

This project is for demonstration purposes only and is not available for redistribution or commercial use without explicit permission. 