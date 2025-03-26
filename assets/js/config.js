// Configuration for GitHub Pages
// Declare config as a global variable
var config;

// Only initialize if not already defined
if (typeof config === 'undefined') {
    config = {
        // Flag to prevent multiple initializations
        initialized: false,
        
        // Log verbosity level (0: errors only, 1: important, 2: all)
        logLevel: 0,
        
        // Maximum image reload attempts
        maxRetryAttempts: 1,
        
        // Debug level: 0 = errors only, 1 = basic info, 2 = verbose
        debugLevel: 0,
        
        // Log function that respects verbosity level
        log: function(message, level = 1) {
            if (this.logLevel >= level) {
                console.log(message);
            }
        },
        
        // Error log function (always displayed)
        error: function(message) {
            console.error(message);
        },
        
        // Detects if we're on GitHub Pages and automatically gets repository name
        baseUrl: function() {
            // If on GitHub Pages
            if (location.hostname.includes('github.io')) {
                this.log('GitHub Pages environment detected on: ' + location.hostname, 1);
                
                // Specific solution for reneg-ai/github.io repository
                if (location.hostname === 'reneg-ai.github.io') {
                    this.log('Main repository detected: reneg-ai.github.io', 1);
                    
                    // For reneg-ai.github.io, always use empty string
                    // to avoid duplicating the '/github.io' prefix
                    return '';
                }
                
                // For other cases, get the full pathname
                const pathSegments = location.pathname.split('/').filter(segment => segment);
                this.log('Path segments found: ' + pathSegments.join('/'), 2);
                
                // If there's at least one segment in the path, that's our repository
                if (pathSegments.length > 0) {
                    this.log('Repository detected: ' + pathSegments[0], 1);
                    return '/' + pathSegments[0];
                }
                
                // If no segments, it could be the main username.github.io repository
                this.log('Main repository with no segments detected', 2);
                return '';
            }
            
            // In local development, we don't need a prefix
            this.log('Local development detected on: ' + location.hostname, 2);
            return '';
        }(),
        
        // Fix image paths based on absolute origin
        correctImagePath: function(src) {
            if (!src) return '';
            if (src.startsWith('http')) return src;
            
            // Check for case sensitivity issues in known files
            const lowerSrc = src.toLowerCase();
            
            // Correction map for files with capitalization issues
            const caseSensitiveFiles = {
                'assets/images/autor.jpg': 'assets/images/Autor.png',
                'assets/images/autor.png': 'assets/images/Autor.png',
                'assets/images/logo.png': 'assets/images/Logo.png',
                'assets/images/hero_background.png': 'assets/images/Hero_Background.png'
            };
            
            // Correct filename if needed
            for (const [incorrectPath, correctPath] of Object.entries(caseSensitiveFiles)) {
                if (lowerSrc.includes(incorrectPath.toLowerCase())) {
                    // Use console.log instead of this.log to avoid errors
                    if (this.logLevel >= 2) {
                        console.log(`Correcting capitalization: ${src} -> ${src.replace(new RegExp(incorrectPath, 'i'), correctPath)}`);
                    }
                    src = src.replace(new RegExp(incorrectPath, 'i'), correctPath);
                    break;
                }
            }
            
            // Use origin (protocol + hostname) as base for absolute paths
            const baseUrl = window.location.origin;
            return `${baseUrl}/${src.replace(/^\/+/, '')}`;
        },
        
        // Function to resolve asset paths
        getAssetPath: function(path) {
            // Verify path is valid
            if (!path) {
                this.error('Received empty or null path');
                return '';
            }
            
            // If the path is already a complete URL, return it as is
            if (path.match(/^(https?:)?\/\//)) {
                return path;
            }
            
            // If the path already starts with baseUrl, return it as is
            if (this.baseUrl && path.startsWith(this.baseUrl)) {
                return path;
            }
            
            // If the path starts with a slash, remove it to avoid double slash
            if (path.startsWith('/')) {
                path = path.substring(1);
            }
            
            // Make sure not to duplicate '/github.io' in paths
            const finalPath = this.baseUrl ? `${this.baseUrl}/${path}` : path;
            this.log('Transformed path: ' + path + ' -> ' + finalPath, 2);
            
            // If we're on reneg-ai.github.io, ensure duplicate prefixes are removed
            if (location.hostname === 'reneg-ai.github.io') {
                return finalPath.replace('/github.io/', '/');
            }
            
            return finalPath;
        },
        
        // Verify and fix hero background
        verifyHeroBackground: function() {
            this.log('Verifying hero background...', 2);
            
            // Find elements that could be the hero background
            const heroBackground = document.querySelector('.hero-background');
            const heroBackgroundImg = document.querySelector('.hero-bg-img');
            
            if (heroBackground) {
                // Set the background directly using CSS if element exists
                heroBackground.style.display = 'block';
                heroBackground.style.visibility = 'visible';
                heroBackground.style.opacity = '1';
                
                if (heroBackgroundImg) {
                    // Try to set the image directly
                    heroBackgroundImg.style.display = 'block';
                    heroBackgroundImg.style.visibility = 'visible';
                    heroBackgroundImg.style.opacity = '1';
                    
                    // If the image has a fallback URL, use it if the original fails
                    const originalSrc = heroBackgroundImg.getAttribute('src');
                    const fallbackSrc = heroBackgroundImg.getAttribute('data-fallback');
                    
                    if (originalSrc) {
                        // Check if the image exists
                        fetch(originalSrc)
                            .then(response => {
                                if (!response.ok) {
                                    this.log(`Hero image not found, using fallback: ${fallbackSrc}`, 1);
                                    if (fallbackSrc) {
                                        heroBackgroundImg.src = fallbackSrc;
                                    }
                                }
                            })
                            .catch(() => {
                                this.log(`Error loading hero image, using fallback: ${fallbackSrc}`, 1);
                                if (fallbackSrc) {
                                    heroBackgroundImg.src = fallbackSrc;
                                }
                            });
                    }
                } else {
                    // If there's no image, try to set the background as a style
                    this.log('Setting hero background as background-image...', 2);
                    heroBackground.style.backgroundImage = 'url(assets/images/Hero_Background.png)';
                }
            }
        },
        
        // Initialize and fix image paths
        init: function() {
            // Prevent multiple initializations
            if (this.initialized) {
                return;
            }
            
            this.log('Initializing config.js, baseUrl: ' + this.baseUrl, 1);
            this.initialized = true;
            
            // Wrap all initialization in DOMContentLoaded to solve
            // the issue of document.body not being available
            const self = this;
            
            document.addEventListener('DOMContentLoaded', function() {
                try {
                    self.log('DOM fully loaded, initializing configuration...', 1);
                    
                    // Now document.body will always be available
                    document.body.classList.add('github-pages-config');
                    document.body.classList.add('loaded');
                    
                    // Run all fixes
                    self.fixAllImages();
                    self.fixInlineBackgrounds();
                    self.verifyHeroBackground();
                    
                    // Ensure images are visible
                    self.ensureImagesVisible();
                    document.body.classList.add('images-loaded');
                    
                    // Only show diagnostics in development mode or with high verbosity
                    if (self.logLevel > 1 && !location.hostname.includes('github.io')) {
                        self.debugImagePaths();
                    }
                    
                    self.log('Initialization completed successfully.', 1);
                } catch (error) {
                    self.error('Error in config.js initialization: ' + error);
                }
            });
        },
        
        // Function to debug image paths
        debugImagePaths: function() {
            this.log('=== IMAGE PATH DIAGNOSTICS ===', 2);
            
            document.querySelectorAll('img').forEach((img, index) => {
                this.log(`Image #${index + 1}:`, 2);
                this.log(`- current src: ${img.src}`, 2);
                this.log(`- original src: ${img.dataset.originalSrc || 'N/A'}`, 2);
                this.log(`- complete: ${img.complete ? 'Yes' : 'No'}`, 2);
                this.log(`- naturalWidth: ${img.naturalWidth}`, 2);
                this.log(`- visible: ${window.getComputedStyle(img).display !== 'none' ? 'Yes' : 'No'}`, 2);
            });
            
            this.log('=== END DIAGNOSTICS ===', 2);
        },
        
        // Ensure images are visible
        ensureImagesVisible: function() {
            this.log('Ensuring image visibility...', 2);
            
            document.querySelectorAll('img').forEach(img => {
                try {
                    // Ensure the image is visible
                    img.style.display = 'inline-block';
                    img.style.visibility = 'visible';
                    img.style.opacity = '1';
                    
                    // Only set error handler for images that haven't loaded yet
                    // and haven't exceeded load attempts
                    if (!img.complete && !img.dataset.retryAttempts) {
                        img.dataset.retryAttempts = "0";
                        
                        // Save the original path if it doesn't exist
                        if (!img.dataset.originalSrc && img.src) {
                            img.dataset.originalSrc = img.src;
                        }
                        
                        // Replace existing error handler to avoid accumulation
                        img.onerror = null;
                        
                        // Set up a new error handler with overflow control
                        img.onerror = function(e) {
                            // Prevent event propagation to avoid loops
                            e.stopPropagation();
                            
                            try {
                                const attempts = parseInt(img.dataset.retryAttempts || "0");
                                
                                // Limit attempts according to configuration (default 1 attempt)
                                if (attempts < config.maxRetryAttempts) {
                                    config.log(`Retrying image load (attempt ${attempts + 1}): ${img.src}`, 2);
                                    img.dataset.retryAttempts = (attempts + 1).toString();
                                    
                                    // Use a timer to avoid immediate recursion
                                    setTimeout(() => {
                                        // Try with corrected path
                                        const origSrc = img.dataset.originalSrc || img.src;
                                        const correctedPath = config.correctImagePath(origSrc);
                                        config.log(`Attempt 1: using corrected path ${correctedPath}`, 2);
                                        img.src = correctedPath;
                                    }, 200); // Delay to avoid overload
                                } else {
                                    // After maximum attempts, stop trying
                                    config.error(`Could not load image after ${config.maxRetryAttempts} attempts: ${img.src}`);
                                    img.onerror = null; // Remove handler to avoid more attempts
                                    
                                    // Try to load a fallback image if it exists
                                    if (img.dataset.fallback && !img.src.includes(img.dataset.fallback)) {
                                        config.log(`Loading final fallback image: ${img.dataset.fallback}`, 1);
                                        img.src = img.dataset.fallback;
                                    }
                                }
                            } catch (error) {
                                config.error('Error in image error handling: ' + error);
                                img.onerror = null; // Prevent future errors
                            }
                            
                            // Avoid propagation to default handler
                            return true;
                        };
                    }
                } catch (error) {
                    this.error('Error processing image: ' + error);
                }
            });
        },
        
        // Fix inline CSS backgrounds
        fixInlineBackgrounds: function() {
            this.log('Fixing inline backgrounds...', 2);
            
            try {
                // Find all elements with inline background-image
                document.querySelectorAll('[style*="background-image"]:not([data-processed-bg="true"])').forEach(el => {
                    try {
                        const style = el.getAttribute('style');
                        if (style) {
                            el.dataset.processedBg = 'true';
                            
                            // Extract URLs from background-image
                            const urlMatch = style.match(/url\(['"]?([^'")]+)['"]?\)/);
                            if (urlMatch && urlMatch[1] && !urlMatch[1].match(/^(https?:)?\/\//)) {
                                const originalUrl = urlMatch[1];
                                // Use correctImagePath for backgrounds
                                const newUrl = this.correctImagePath(originalUrl);
                                
                                // Save original URL for diagnostics
                                el.dataset.originalBg = originalUrl;
                                
                                // Replace URL in style
                                const newStyle = style.replace(originalUrl, newUrl);
                                el.setAttribute('style', newStyle);
                                this.log(`Background fixed: ${originalUrl} -> ${newUrl}`, 2);
                            }
                        }
                    } catch (error) {
                        this.error('Error processing background-image: ' + error);
                    }
                });
            } catch (error) {
                this.error('Error in fixInlineBackgrounds: ' + error);
            }
        },
        
        // Fix all image paths on the page
        fixAllImages: function() {
            this.log('Fixing image paths...', 2);
            
            try {
                // Select all images that haven't been processed
                const images = document.querySelectorAll('img:not([data-processed="true"])');
                this.log(`Found ${images.length} images to process`, 2);
                
                // Process each image
                images.forEach((img, index) => {
                    try {
                        const originalSrc = img.getAttribute('src');
                        
                        // Some diagnostic logs
                        this.log(`Processing image #${index + 1}: ${originalSrc}`, 2);
                        
                        // Only modify relative paths
                        if (originalSrc && !originalSrc.match(/^(https?:)?\/\//)) {
                            // Save original path for reference
                            img.dataset.originalSrc = originalSrc;
                            
                            // Apply correctImagePath function
                            const newSrc = this.correctImagePath(originalSrc);
                            
                            // Update src attribute
                            img.src = newSrc;
                            this.log(`Image path corrected: ${originalSrc} -> ${newSrc}`, 2);
                            
                            // Mark as processed
                            img.dataset.processed = "true";
                            
                            // Set up a fallback image for extreme cases
                            if (originalSrc.toLowerCase().includes('hero_background.png')) {
                                this.log('Setting fallback for hero image', 2);
                                img.dataset.fallback = 'https://raw.githubusercontent.com/ReneG-AI/github.io/main/assets/images/Hero_Background.png';
                            } else if (originalSrc.toLowerCase().includes('logo.png')) {
                                this.log('Setting fallback for logo', 2);
                                img.dataset.fallback = 'https://raw.githubusercontent.com/ReneG-AI/github.io/main/assets/images/Logo.png';
                            } else if (originalSrc.toLowerCase().includes('autor.jpg') || originalSrc.toLowerCase().includes('autor.png')) {
                                this.log('Setting fallback for author image', 2);
                                img.dataset.fallback = 'https://raw.githubusercontent.com/ReneG-AI/github.io/main/assets/images/Autor.png';
                            }
                            
                            // Check if image loads correctly
                            img.addEventListener('error', () => {
                                if (img.dataset.fallback && !img.src.includes('githubusercontent.com')) {
                                    this.log(`Error loading image, using fallback: ${img.dataset.fallback}`, 1);
                                    img.src = img.dataset.fallback;
                                }
                            });
                        }
                    } catch (error) {
                        this.error(`Error processing image #${index + 1}: ${error}`);
                    }
                });
                
                this.log('Image correction completed', 1);
            } catch (error) {
                this.error('Error in fixAllImages: ' + error);
            }
        }
    };
}

// Initialize configuration more safely
try {
    // If running on GitHub Pages, set lower log level
    if (location.hostname.includes('github.io')) {
        config.logLevel = 0; // Errors only in production
    } else {
        config.logLevel = 1; // Important logs in development
    }

    // Immediate initialization, but all real work 
    // will happen when DOM is loaded
    config.init();
    
    // Additional fallback: if for some reason the script loads late
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(function() {
            config.verifyHeroBackground();
        }, 500);
    }
} catch (error) {
    console.error('Fatal error in config.js initialization:', error);
}
