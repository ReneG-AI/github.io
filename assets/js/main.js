// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Detectar soporte WebP y aplicar clase al HTML
    detectWebpSupport();
    
    // Inicializar funcionalidades
    initPreloader();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    
    // Precargar imágenes sin retraso
    preloadBookImages();
    
    initBookFlip();
    initInteriorModal();
    setupBackToTop();
    initCharacterCounter();
    initLineaAnimada(); // Iniciamos la animación de la línea
    initContactSeparator(); // Iniciar animación del separador de contacto
    
    // Inicializar AOS con mínimo retraso
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600, // Reducido para mayor rapidez
            easing: 'ease-out',
            once: true,
            mirror: false
        });
    }
    
    // Mostrar la página inmediatamente
    document.body.classList.add('loaded');

    // JavaScript para funcionalidad "Leer más..." en testimonios
    const readMoreToggles = document.querySelectorAll('.read-more-toggle');
    
    readMoreToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const testimonialText = this.parentElement;
            
            if (testimonialText.classList.contains('expanded')) {
                testimonialText.classList.remove('expanded');
                this.textContent = 'Leer más...';
            } else {
                testimonialText.classList.add('expanded');
                this.textContent = 'Leer menos';
            }
        });
    });

    // Auto-resize textarea functionality
    const textarea = document.getElementById('mensaje');
    
    if (textarea) {
        // Función para ajustar altura automáticamente
        function autoResize() {
            // Reset height to auto to get the correct scrollHeight
            textarea.style.height = 'auto';
            // Set the height to match the content (but not less than min-height defined in CSS)
            textarea.style.height = Math.max(textarea.scrollHeight, 240) + 'px';
        }
        
        // Aplicar al cargar y cuando se escriba
        textarea.addEventListener('input', autoResize);
        
        // También actualizar en focus y blur
        textarea.addEventListener('focus', autoResize);
        textarea.addEventListener('blur', autoResize);
        
        // Inicializar
        setTimeout(autoResize, 100); // Pequeño retraso para asegurar que el DOM está completamente cargado
    }

    // Inicializar animación del separador
    initContactSeparator();

    // Ejecutar después de un breve retraso para asegurar que todo esté cargado
    setTimeout(fixContactSectionDisplay, 500);
    
    // También ejecutar cuando se redimensiona la ventana
    window.addEventListener('resize', fixContactSectionDisplay);

    // Inicializar AOS con configuración personalizada
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });
    
    // Iniciar la funcionalidad para los testimonios en móviles
    initializeTestimonialsMobile();
    
    // Inicializar volteo de tarjetas
    initializeCardFlippers();
    
    // Mostrar y ocultar menu de navegación en móviles
    initializeMobileNav();
    
    // Inicializar el slider de la sección de libros
    initializeBookSlider();
    
    // Leer más en testimonios
    initializeReadMore();
    
    // Formulario de contacto
    initializeContactForm();
    
    // Inicializar el modal para "Ver Interior"
    initializeInteriorModal();
    
    // Actualizar año automáticamente en el footer
    updateYear();
    
    // Scroll suave para anclas internas
    initializeSmoothScroll();
    
    // Animación para el botón de volver arriba
    initializeBackToTop();
    
    // Inicializar ripple effect en botones
    initializeRippleEffect();
});

// Función para detectar soporte de WebP y aplicar clase al documento
function detectWebpSupport() {
    var canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
        // Si soporta WebP
        if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
            document.documentElement.classList.add('webp-support');
            console.log("Soporte WebP detectado");
        } else {
            document.documentElement.classList.add('no-webp-support');
            console.log("Sin soporte WebP, usando PNG");
        }
    } else {
        // Navegador antiguo sin canvas
        document.documentElement.classList.add('no-webp-support');
        console.log("Navegador antiguo, usando PNG");
    }
}

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('preloader-hide');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 800);
        });
    }
}

// Menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (menuToggle && mainNav) {
        // Agregar evento click al botón de menú
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevenir propagación para mejor rendimiento
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Sólo prevenir scroll en dispositivos pequeños donde el menú ocupa más espacio
            if (window.innerWidth <= 576) {
                body.classList.toggle('no-scroll');
            }
        });

        // Optimizar cierre del menú al hacer clic en los enlaces
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Si es un enlace interno, prevenir comportamiento predeterminado
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    // Cerrar el menú inmediatamente
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.classList.remove('no-scroll');
                    
                    // Hacer scroll hacia el destino
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80;
                        
                        // Scroll más rápido usando scrollTo con comportamiento nativo
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth' 
                        });
                    }
                } else {
                    // Para enlaces externos, solo cerrar el menú
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            // Verificar que el menú esté abierto primero
            if (mainNav.classList.contains('active')) {
                const isClickInsideMenu = mainNav.contains(event.target);
                const isClickOnToggle = menuToggle.contains(event.target);
                
                if (!isClickInsideMenu && !isClickOnToggle) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            }
        });
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    }
}

// Desplazamiento suave
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                // Reducir la duración para una respuesta más rápida
                const duration = 400; // Reducido drásticamente para mayor velocidad
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                let startTime = null;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Usar una curva de aceleración más agresiva para inicio rápido
                    const ease = t => t * (2 - t); // Función de aceleración más rápida
                    
                    window.scrollTo(0, startPosition + distance * ease(progress));
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                // Ejecutar inmediatamente
                requestAnimationFrame(animation);
            }
        });
    });
}

// Efecto de scroll en el encabezado
function initHeaderScroll() {
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Back to top button
function setupBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Reducir la duración para una respuesta más rápida
        const duration = 400; // Reducido drásticamente para mayor velocidad
        const startPosition = window.pageYOffset;
        const distance = -startPosition; // Distancia hasta el top (0)
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Usar una curva de aceleración más agresiva para inicio rápido
            const ease = t => t * (2 - t); // Función de aceleración más rápida
            
            window.scrollTo(0, startPosition + distance * ease(progress));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        // Ejecutar inmediatamente
        requestAnimationFrame(animation);
    });
}

// Función para precargar todas las imágenes de portadas y contraportadas
function preloadBookImages() {
    // Control para evitar múltiples precargas
    if (window.imagesPreloaded) return;
    window.imagesPreloaded = true;
    
    console.log("Precargando imágenes WebP de libros...");
    
    // Obtener todas las imágenes de portada y contraportada que estén en la vista
    const visibleCovers = Array.from(document.querySelectorAll('.book-cover, .book-back')).filter(img => {
        const rect = img.getBoundingClientRect();
        return (
            rect.top >= -img.height &&
            rect.left >= -img.width &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) + img.height &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) + img.width
        );
    });
    
    // Limitar a máximo 3 imágenes para evitar sobrecarga
    const imagesToPreload = visibleCovers.slice(0, 3);
    
    // Precargar solo las imágenes visibles
    imagesToPreload.forEach(img => {
        if (img.src && !img.complete) {
            const preloadImg = new Image();
            preloadImg.src = img.src;
            console.log("Precargando:", img.src);
        }
    });
}

// Inicializar funciones para el efecto de flip de libros
function initBookFlip() {
    // Seleccionar todos los flippers de libros
    const bookFlippers = document.querySelectorAll('.book-flipper');
    const flipButtons = document.querySelectorAll('.flip-button');
    
    // Para cada flipper
    bookFlippers.forEach((flipper, index) => {
        // Asegurarse de que tenga un ID
        if (!flipper.id) {
            flipper.id = `flipper${index + 1}`;
        }
        
        // Manejar clic en la portada/contraportada para girar
        flipper.addEventListener('click', function(e) {
            // Solo girar cuando se hace clic en la imagen, no en el botón
            if (e.target.tagName === 'IMG' || e.target === this) {
                this.classList.toggle('flipped');
            }
        });
    });
    
    // Botones de girar también activan el efecto
    flipButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Evitar que el clic se propague al flipper
            
            // Encontrar el flipper asociado al botón
            const bookImages = this.closest('.book-images');
            const flipper = bookImages.querySelector('.book-flipper');
            
            if (flipper) {
                flipper.classList.toggle('flipped');
            }
        });
    });
}

// Modal para "Ver interior"
function initInteriorModal() {
    const modal = document.getElementById('interiorModal');
    const interiorBtns = document.querySelectorAll('.interior-btn');
    const closeBtnX = document.getElementById('modalCloseX');
    
    if (modal && interiorBtns.length) {
        interiorBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.add('active');
            });
        });
        
        // Cerrar con el botón X
        if (closeBtnX) {
            closeBtnX.addEventListener('click', function() {
                modal.classList.remove('active');
            });
        }
        
        // Cerrar modal haciendo clic fuera
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

// Contador de caracteres para el formulario
function initCharacterCounter() {
    const messageTextarea = document.getElementById('mensaje');
    const characterCount = document.querySelector('.character-count');
    
    if (messageTextarea && characterCount) {
        // Actualizar contador al cargar
        updateCharacterCount();
        
        // Actualizar contador cuando se escriba en el área de texto
        messageTextarea.addEventListener('input', updateCharacterCount);
        
        function updateCharacterCount() {
            const currentLength = messageTextarea.value.length;
            const maxLength = messageTextarea.getAttribute('maxlength');
            characterCount.textContent = `${currentLength}/${maxLength} caracteres`;
            
            // Cambiar color cuando se acerca al límite
            if (currentLength >= maxLength * 0.9) {
                characterCount.style.color = 'var(--warning-color)';
            } else if (currentLength >= maxLength * 0.8) {
                characterCount.style.color = 'var(--accent-color)';
            } else {
                characterCount.style.color = 'var(--gray)';
            }
        }
    }
}

// Función para animar la línea cuando sea visible
function initLineaAnimada() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento es visible
            if (entry.isIntersecting) {
                // Reiniciar la animación
                const linea = entry.target.querySelector('.linea-animada');
                if (linea) {
                    linea.style.animation = 'none';
                    // Forzar un reflow
                    void linea.offsetWidth;
                    // Restaurar la animación
                    linea.style.animation = 'dibujar-linea 4.5s ease-in-out forwards, brillo-linea 3s infinite alternate 4.5s';
                }
                // Dejar de observar después de activar la animación
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // 20% del elemento debe ser visible

    // Observar todos los contenedores de líneas animadas
    const lineaContainers = document.querySelectorAll('.linea-animada-container');
    if (lineaContainers.length > 0) {
        lineaContainers.forEach(container => {
            observer.observe(container.parentElement);
        });
    }
}

// Función para animar la línea separadora entre Contáctame y Acerca del Autor
function initContactSeparator() {
    // Solo aplicar en dispositivos móviles y tablets (max-width: 992px)
    if (window.innerWidth <= 992) {
        const contactSeparator = document.querySelector('.contact-about-separator');
        
        if (contactSeparator) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Añadir clase para iniciar animación
                        entry.target.classList.add('animate');
                        
                        // Eliminar brillo existente si hay alguno
                        const existingShine = entry.target.querySelector('.separator-shine');
                        if (existingShine) {
                            existingShine.remove();
                        }
                        
                        // Añadir efecto de brillo
                        const shine = document.createElement('div');
                        shine.classList.add('separator-shine');
                        entry.target.appendChild(shine);
                        
                        // Animar el brillo después de un retraso
                        setTimeout(() => {
                            shine.style.animation = 'separator-shimmer 2s infinite';
                        }, 800);
                        
                        // Dejar de observar el elemento
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            // Comenzar a observar el separador
            observer.observe(contactSeparator);
        }
    }
}

// Reinicializar en cambios de tamaño de ventana
window.addEventListener('resize', function() {
    // Reinicializar separador en cambios de tamaño
    initContactSeparator();
});

/**
 * Función para asegurar la correcta visualización de la sección de contacto
 * Especialmente útil para igualar las alturas de los contenedores
 */
function fixContactSectionDisplay() {
    // Solo aplicar en dispositivos de escritorio
    if (window.innerWidth >= 992) {
        const formContainer = document.querySelector('.contacto-form-container');
        const autorContainer = document.querySelector('.autor-container');
        
        if (formContainer && autorContainer) {
            // Obtener la altura del contenedor del formulario
            const formHeight = formContainer.offsetHeight;
            
            // Aplicar la misma altura al contenedor del autor
            autorContainer.style.minHeight = formHeight + 'px';
            
            // Asegurar que el contenedor del autor no esté recortado
            autorContainer.style.paddingTop = '3rem';
            
            // Verificar que el título y el avatar sean visibles
            const autorTitle = autorContainer.querySelector('.autor-title');
            const autorAvatar = autorContainer.querySelector('.autor-avatar');
            
            if (autorTitle) {
                autorTitle.style.marginTop = '0';
                autorTitle.style.visibility = 'visible';
            }
            
            if (autorAvatar) {
                autorAvatar.style.marginTop = '0';
                autorAvatar.style.visibility = 'visible';
            }
        }
    }
}

// Función para manejar los testimonios en vista móvil
function initializeTestimonialsMobile() {
    // Solo ejecutar en móviles (ancho < 768px)
    if (window.innerWidth <= 768) {
        const testimonials = document.querySelectorAll('.testimonial');
        const testimoniosGrid = document.querySelector('.testimonios-grid');
        
        // Si hay testimonios para mostrar
        if (testimonials.length > 0) {
            // Ocultar todos los testimonios excepto el primero
            testimonials.forEach((testimonial, index) => {
                if (index > 0) {
                    testimonial.style.display = 'none';
                } else {
                    testimonial.style.display = 'flex';
                }
            });
            
            // Crear paginación de puntos
            const paginationContainer = document.createElement('div');
            paginationContainer.className = 'testimonial-pagination';
            paginationContainer.style.display = 'flex';
            paginationContainer.style.justifyContent = 'center';
            paginationContainer.style.gap = '0.8rem';
            paginationContainer.style.marginTop = '2rem';
            
            let activeIndex = 0;
            
            // Crear puntos de navegación y añadirlos al contenedor
            testimonials.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'testimonial-dot';
                dot.style.width = '1.2rem';
                dot.style.height = '1.2rem';
                dot.style.borderRadius = '50%';
                dot.style.background = index === 0 ? 'linear-gradient(90deg, #8C52FF, #FF5EDB)' : 'rgba(255, 255, 255, 0.3)';
                dot.style.cursor = 'pointer';
                dot.style.transition = 'all 0.3s ease';
                
                // Evento al hacer clic en un punto
                dot.addEventListener('click', () => {
                    showTestimonial(index);
                    updateActiveDot(index);
                });
                
                paginationContainer.appendChild(dot);
            });
            
            // Añadir paginación después del grid de testimonios
            if (testimoniosGrid.parentNode) {
                testimoniosGrid.parentNode.insertBefore(paginationContainer, testimoniosGrid.nextSibling);
            }
            
            // Función para mostrar un testimonio específico
            function showTestimonial(index) {
                testimonials.forEach((testimonial, i) => {
                    if (i === index) {
                        testimonial.style.display = 'flex';
                        // Añadir animación de fade in
                        testimonial.style.opacity = '0';
                        testimonial.style.animation = 'fadeIn 0.5s forwards';
                    } else {
                        testimonial.style.display = 'none';
                    }
                });
                activeIndex = index;
            }
            
            // Función para actualizar el punto activo
            function updateActiveDot(index) {
                const dots = document.querySelectorAll('.testimonial-dot');
                dots.forEach((dot, i) => {
                    dot.style.background = i === index 
                        ? 'linear-gradient(90deg, #8C52FF, #FF5EDB)' 
                        : 'rgba(255, 255, 255, 0.3)';
                });
            }
            
            // Añadir navegación con botones
            const prevButton = document.createElement('button');
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.className = 'testimonial-nav-button prev-button';
            prevButton.style.position = 'absolute';
            prevButton.style.left = '0';
            prevButton.style.top = '50%';
            prevButton.style.transform = 'translateY(-50%)';
            prevButton.style.background = 'rgba(0, 0, 0, 0.5)';
            prevButton.style.border = 'none';
            prevButton.style.borderRadius = '50%';
            prevButton.style.width = '4rem';
            prevButton.style.height = '4rem';
            prevButton.style.display = 'flex';
            prevButton.style.alignItems = 'center';
            prevButton.style.justifyContent = 'center';
            prevButton.style.color = 'white';
            prevButton.style.fontSize = '1.6rem';
            prevButton.style.cursor = 'pointer';
            prevButton.style.zIndex = '10';
            
            const nextButton = document.createElement('button');
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.className = 'testimonial-nav-button next-button';
            nextButton.style.position = 'absolute';
            nextButton.style.right = '0';
            nextButton.style.top = '50%';
            nextButton.style.transform = 'translateY(-50%)';
            nextButton.style.background = 'rgba(0, 0, 0, 0.5)';
            nextButton.style.border = 'none';
            nextButton.style.borderRadius = '50%';
            nextButton.style.width = '4rem';
            nextButton.style.height = '4rem';
            nextButton.style.display = 'flex';
            nextButton.style.alignItems = 'center';
            nextButton.style.justifyContent = 'center';
            nextButton.style.color = 'white';
            nextButton.style.fontSize = '1.6rem';
            nextButton.style.cursor = 'pointer';
            nextButton.style.zIndex = '10';
            
            // Evento para botón anterior
            prevButton.addEventListener('click', () => {
                const newIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
                showTestimonial(newIndex);
                updateActiveDot(newIndex);
            });
            
            // Evento para botón siguiente
            nextButton.addEventListener('click', () => {
                const newIndex = (activeIndex + 1) % testimonials.length;
                showTestimonial(newIndex);
                updateActiveDot(newIndex);
            });
            
            // Añadir botones de navegación al contenedor principal
            testimoniosGrid.style.position = 'relative';
            testimoniosGrid.appendChild(prevButton);
            testimoniosGrid.appendChild(nextButton);
            
            // Definir animación CSS
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
            
            // Implementar deslizamiento táctil (swipe)
            let touchStartX = 0;
            let touchEndX = 0;
            
            testimoniosGrid.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            testimoniosGrid.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
            
            function handleSwipe() {
                if (touchEndX < touchStartX) {
                    // Deslizado hacia la izquierda (siguiente)
                    const newIndex = (activeIndex + 1) % testimonials.length;
                    showTestimonial(newIndex);
                    updateActiveDot(newIndex);
                }
                if (touchEndX > touchStartX) {
                    // Deslizado hacia la derecha (anterior)
                    const newIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
                    showTestimonial(newIndex);
                    updateActiveDot(newIndex);
                }
            }
        }
    }
}

// Redimensionar ventana
window.addEventListener('resize', function() {
    const isSmallScreen = window.innerWidth <= 768;
    const hasPagination = document.querySelector('.testimonial-pagination');
    
    // Si cambia de móvil a escritorio o viceversa
    if (isSmallScreen && !hasPagination) {
        // Reiniciar la página para aplicar cambios (mejor experiencia)
        location.reload();
    } else if (!isSmallScreen && hasPagination) {
        // Reiniciar la página para aplicar cambios (mejor experiencia)
        location.reload();
    }
});

// Inicializar volteo de tarjetas
function initializeCardFlippers() {
    // Implementa la lógica para inicializar el volteo de tarjetas
}

// Mostrar y ocultar menu de navegación en móviles
function initializeMobileNav() {
    // Implementa la lógica para inicializar el menú móvil
}

// Inicializar el slider de la sección de libros
function initializeBookSlider() {
    // Implementa la lógica para inicializar el slider de libros
}

// Leer más en testimonios
function initializeReadMore() {
    // Implementa la lógica para inicializar la funcionalidad "Leer más..." en testimonios
}

// Formulario de contacto
function initializeContactForm() {
    // Implementa la lógica para inicializar el formulario de contacto
}

// Actualizar año automáticamente en el footer
function updateYear() {
    // Implementa la lógica para actualizar el año automáticamente en el footer
}

// Inicializar ripple effect en botones
function initializeRippleEffect() {
    // Implementa la lógica para inicializar el efecto ripple en botones
} 