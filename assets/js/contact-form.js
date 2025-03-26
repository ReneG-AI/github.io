// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return false;
            }
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Send data to server (simulate with timeout)
            setTimeout(() => {
                // Show success message
                showMessage('success', '¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = 'Enviar Mensaje';
            }, 1500);
        });
    }
    
    // Form validation
    function validateForm() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        let isValid = true;
        
        // Check if name is empty
        if (!nameInput.value.trim()) {
            showValidationError(nameInput, 'Por favor, introduce tu nombre');
            isValid = false;
        } else {
            removeValidationError(nameInput);
        }
        
        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            showValidationError(emailInput, 'Por favor, introduce un correo electrónico válido');
            isValid = false;
        } else {
            removeValidationError(emailInput);
        }
        
        // Check if message is empty
        if (!messageInput.value.trim()) {
            showValidationError(messageInput, 'Por favor, introduce tu mensaje');
            isValid = false;
        } else {
            removeValidationError(messageInput);
        }
        
        return isValid;
    }
    
    // Show validation error
    function showValidationError(inputElement, message) {
        const container = inputElement.parentElement;
        const errorElement = container.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        
        if (!container.querySelector('.error-message')) {
            container.appendChild(errorElement);
        }
        
        inputElement.classList.add('error');
    }
    
    // Remove validation error
    function removeValidationError(inputElement) {
        const container = inputElement.parentElement;
        const errorElement = container.querySelector('.error-message');
        
        if (errorElement) {
            container.removeChild(errorElement);
        }
        
        inputElement.classList.remove('error');
    }
    
    // Show form message (success or error)
    function showMessage(type, text) {
        const messagesContainer = document.getElementById('form-messages');
        
        if (messagesContainer) {
            const messageElement = document.createElement('div');
            messageElement.className = `alert alert-${type}`;
            messageElement.innerText = text;
            
            // Clear previous messages
            messagesContainer.innerHTML = '';
            messagesContainer.appendChild(messageElement);
            
            // Auto-hide message after 5 seconds
            setTimeout(() => {
                messageElement.style.opacity = '0';
                setTimeout(() => {
                    messagesContainer.removeChild(messageElement);
                }, 500);
            }, 5000);
        }
    }
}); 