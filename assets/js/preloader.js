// Preloader functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the preloader element
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after 1.5 seconds
    if (preloader) {
        setTimeout(function() {
            preloader.classList.add('preloader-hidden');
            
            // Remove preloader from DOM after animation
            setTimeout(function() {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 500);
        }, 1500);
    }
}); 