// Configuración del fondo dinámico con VANTA.NET
document.addEventListener('DOMContentLoaded', function() {
  // Función para obtener el color de tema actual
  function getCurrentThemeColors() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
      return {
        backgroundColor: 0x090914,
        color1: 0x6B63FF,     // Color primario del tema oscuro
        color2: 0x764BA2      // Color secundario del tema oscuro
      };
    } else {
      return {
        backgroundColor: 0xf5f5f7,
        color1: 0x5B5AEA,     // Color primario del tema claro
        color2: 0x6B4CE6      // Color secundario del tema claro
      };
    }
  }

  // Inicializar el efecto Vanta
  let vantaEffect = null;
  
  function initVantaEffect() {
    if (vantaEffect) vantaEffect.destroy();
    
    const colors = getCurrentThemeColors();
    
    vantaEffect = VANTA.NET({
      el: "#dynamic-background",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      backgroundColor: colors.backgroundColor,
      color: colors.color1,
      points: 8,
      maxDistance: 20.00,
      spacing: 15.00,
      showDots: true
    });
    
    // Agregar un efecto de cambio gradual de colores
    let colorCycle = 0;
    setInterval(() => {
      colorCycle = (colorCycle + 0.01) % 1;
      const hue = 240 + 60 * Math.sin(colorCycle * Math.PI * 2);  // Ciclo entre colores azul-púrpura
      if (vantaEffect && vantaEffect.options) {
        vantaEffect.options.color = colors.color1;
      }
    }, 100);
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
  
  // Agregar efectos de paralaje sutil
  document.addEventListener('mousemove', function(e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const bg = document.getElementById('dynamic-background');
    if (bg) {
      bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });
  
  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Si es móvil, reducir la complejidad para mejorar el rendimiento
  if (isMobile) {
    if (vantaEffect && vantaEffect.options) {
      vantaEffect.options.points = 5;
      vantaEffect.options.maxDistance = 15.00;
      vantaEffect.options.spacing = 20.00;
    }
  }
  
  // Animación de "aparición" del fondo
  const bg = document.getElementById('dynamic-background');
  if (bg) {
    bg.style.opacity = '0';
    setTimeout(() => {
      bg.style.opacity = document.body.classList.contains('dark-mode') ? '0.5' : '0.3';
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