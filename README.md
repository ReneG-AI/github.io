# René García Educa - Official Website

This repository contains the code for the René García Educa multilingual education platform website, designed to showcase educational resources, books, and contact information.

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
├── assets/
│   ├── css/
│   │   ├── main.css        # Main stylesheet
│   │   └── responsive.css  # Responsive design rules
│   ├── js/
│   │   └── main.js         # Main JavaScript functionality
│   └── images/             # Website images and graphics
├── backup/                 # Legal and policy pages
│   ├── privacy.html        # Privacy policy
│   ├── terms.html          # Terms of service
│   └── legal.html          # Legal notices
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

## Making Changes

1. Create a new branch for your changes:
   ```
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test locally

3. Commit and push your changes:
   ```
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

4. Create a pull request to merge your changes into the main branch

## Browser Compatibility

The website is tested and compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions about this project, please contact:
- Email: contact@renegarcia-educa.com

Last updated: May 2024
