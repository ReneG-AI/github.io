// Configuración del fondo dinámico con VANTA.BIRDS
document.addEventListener('DOMContentLoaded', function() {
  // Función para obtener el color de tema actual
  function getCurrentThemeColors() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
      return {
        backgroundColor: 0x090914,
        colorMode: "variance",
        color1: 0x6B63FF,     // Color primario del tema oscuro
        color2: 0x764BA2,     // Color secundario del tema oscuro
        colorVariation: 0.5,
        wingSpan: 30.0,
        separation: 100.0,
        alignment: 20.0,
        cohesion: 20.0
      };
    } else {
      return {
        backgroundColor: 0xf2f2f7,  // Ligeramente más oscuro para mejor contraste
        colorMode: "variance",
        color1: 0x5B5AEA,     // Color primario del tema claro
        color2: 0xFF8F00,     // Color acento (naranja) para más contraste
        colorVariation: 0.7,  // Mayor variación de color en modo claro
        wingSpan: 30.0,
        separation: 80.0,
        alignment: 25.0,
        cohesion: 25.0
      };
    }
  }

  // Inicializar el efecto Vanta
  let vantaEffect = null;
  
  function initVantaEffect() {
    if (vantaEffect) vantaEffect.destroy();
    
    const colors = getCurrentThemeColors();
    
    // Usar VANTA.BIRDS para crear líneas que simulan lápices/pinceles de colores
    vantaEffect = VANTA.BIRDS({
      el: "#dynamic-background",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      backgroundColor: colors.backgroundColor,
      color1: colors.color1,
      color2: colors.color2,
      colorMode: colors.colorMode,
      quantity: isDarkMode() ? 3.00 : 4.00,         // Más elementos en modo claro
      birdSize: 1.50,
      wingSpan: colors.wingSpan,
      speedLimit: 5.00,
      separation: colors.separation,
      alignment: colors.alignment,
      cohesion: colors.cohesion
    });
    
    // Simular "página coloréandose" cambiando colores
    const primaryColors = [
      0xFF8F00, // Naranja (acento)
      0x5B5AEA, // Azul (primario)
      0x6B4CE6, // Púrpura (secundario)
      0xE6376E, // Rosa
      0x23C995, // Verde turquesa
      0xFFD54F  // Amarillo
    ];
    
    // Función para comprobar el modo oscuro
    function isDarkMode() {
      return document.body.classList.contains('dark-mode');
    }
    
    // Cambio de colores simulando un libro siendo coloreado
    let colorIndex = 0;
    setInterval(() => {
      if (vantaEffect && vantaEffect.options) {
        // Solo cambiar el color2 para mantener la coherencia
        colorIndex = (colorIndex + 1) % primaryColors.length;
        vantaEffect.options.color2 = primaryColors[colorIndex];
      }
    }, 3000); // Cambio cada 3 segundos
  }
  
  // Inicializar el efecto
  initVantaEffect();
  
  // Agregar oyente para cambio de tema
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      // Dar tiempo para que cambie la clase del body
      setTimeout(initVantaEffect, 100);
    });
  }
  
  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Si es móvil, reducir la complejidad para mejorar el rendimiento
  if (isMobile && vantaEffect && vantaEffect.options) {
    initVantaEffect = function() {
      if (vantaEffect) vantaEffect.destroy();
      
      const colors = getCurrentThemeColors();
      
      vantaEffect = VANTA.BIRDS({
        el: "#dynamic-background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: colors.backgroundColor,
        color1: colors.color1,
        color2: colors.color2,
        colorMode: colors.colorMode,
        quantity: 2.00,  // Menor cantidad para móviles
        birdSize: 1.20,
        wingSpan: 20.00,
        speedLimit: 4.00,
        separation: 50.00,
        alignment: 20.00,
        cohesion: 20.00
      });
    };
    
    // Reiniciar con configuración para móviles
    initVantaEffect();
  }
  
  // Animación de "aparición" del fondo
  const bg = document.getElementById('dynamic-background');
  if (bg) {
    bg.style.opacity = '0';
    setTimeout(() => {
      // Aumentar la opacidad en modo claro para mejor visibilidad
      bg.style.opacity = document.body.classList.contains('dark-mode') ? '0.7' : '0.8';
    }, 500);
  }
  
  // Detectar cuando la página está lista
  window.addEventListener('load', function() {
    // Reajustar el efecto si hay cambios en el tamaño de la ventana
    window.addEventListener('resize', function() {
      if (vantaEffect) vantaEffect.resize();
    });
    
    // Remover preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });
}); 