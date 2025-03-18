// Animación del gato negro usando el sprite sheet
let catSprite;
let catX = -50; // Posición inicial fuera de la pantalla
let catY;
let catDirection = 1; // 1 = derecha, -1 = izquierda
let catSpeed = 2; // Velocidad del gato
let spriteSheet; // Sprite sheet del gato
let catAnimation; // Objeto de animación
let catFooter; // Elemento del footer para determinar la posición Y
let canvasElement; // Elemento canvas para la animación
let lastTimestamp = 0; // Para el temporizador de cambio de dirección
let directionChangeInterval = 7000; // Cambiar dirección cada 7 segundos
let isInitialized = false;

// Función para inicializar la animación del gato
function initCatAnimation() {
  // Evitar inicialización múltiple
  if (isInitialized) return;
  isInitialized = true;
  
  // Crear un contenedor para el canvas
  const catContainer = document.createElement('div');
  catContainer.id = 'cat-animation-container';
  catContainer.style.position = 'absolute';
  catContainer.style.zIndex = '100';
  catContainer.style.pointerEvents = 'none'; // Para que no interfiera con los clics
  catContainer.style.width = '100%';
  catContainer.style.height = '100px';
  catContainer.style.overflow = 'hidden';
  
  // Agregar el contenedor antes del footer
  const footer = document.querySelector('footer');
  if (footer) {
    footer.parentNode.insertBefore(catContainer, footer);
    catFooter = footer;
  } else {
    // Si no hay footer, agregar al final del body
    document.body.appendChild(catContainer);
  }
  
  // Crear un nuevo sketch de p5.js
  const sketch = function(p) {
    p.preload = function() {
      // Cargar el sprite sheet del gato
      spriteSheet = p.loadImage('assets/images/cat_black-32x48.png');
    };
    
    p.setup = function() {
      // Crear canvas del ancho de la ventana y altura para el gato
      const canvas = p.createCanvas(p.windowWidth, 100);
      canvas.parent('cat-animation-container');
      canvasElement = canvas.elt;
      
      // Posición Y del gato (ajustar según el diseño)
      catY = 50;
      
      // Configurar la animación del gato
      catAnimation = {
        frameWidth: 32,
        frameHeight: 48,
        frames: 4, // 4 frames de animación
        currentFrame: 0,
        frameDelay: 8, // Velocidad de la animación
        frameCounter: 0
      };
    };
    
    p.draw = function() {
      // Limpiar el canvas con transparencia
      p.clear();
      
      // Actualizar posición del gato
      catX += catSpeed * catDirection;
      
      // Cambiar dirección cuando llegue a los bordes
      if (catX > p.width + 50) {
        catDirection = -1; // Ir hacia la izquierda
      } else if (catX < -50) {
        catDirection = 1; // Ir hacia la derecha
      }
      
      // Cambiar dirección aleatoriamente
      const currentTime = p.millis();
      if (currentTime - lastTimestamp > directionChangeInterval) {
        lastTimestamp = currentTime;
        
        // 50% de probabilidad de cambiar de dirección
        if (Math.random() > 0.5) {
          catDirection *= -1;
        }
      }
      
      // Dibujar el gato
      drawCat(p);
      
      // Actualizar la animación
      updateAnimation();
    };
    
    p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, 100);
      adjustCatContainer();
    };
  };
  
  // Iniciar el sketch
  new p5(sketch);
  
  // Ajustar la posición del contenedor cuando se desplaza la página
  window.addEventListener('scroll', adjustCatContainer);
  window.addEventListener('resize', adjustCatContainer);
  
  // Ajustar posición inicial
  setTimeout(adjustCatContainer, 500);
}

// Función para dibujar el gato
function drawCat(p) {
  const frameX = catAnimation.currentFrame * catAnimation.frameWidth;
  const frameY = 0;
  
  p.push();
  
  // Voltear horizontalmente si va hacia la izquierda
  if (catDirection === -1) {
    p.translate(catX + catAnimation.frameWidth, catY);
    p.scale(-1, 1);
    p.image(
      spriteSheet,
      0, 0,
      catAnimation.frameWidth, catAnimation.frameHeight,
      frameX, frameY,
      catAnimation.frameWidth, catAnimation.frameHeight
    );
  } else {
    p.image(
      spriteSheet,
      catX, catY,
      catAnimation.frameWidth, catAnimation.frameHeight,
      frameX, frameY,
      catAnimation.frameWidth, catAnimation.frameHeight
    );
  }
  
  p.pop();
}

// Función para actualizar la animación
function updateAnimation() {
  catAnimation.frameCounter++;
  
  if (catAnimation.frameCounter >= catAnimation.frameDelay) {
    catAnimation.frameCounter = 0;
    catAnimation.currentFrame = (catAnimation.currentFrame + 1) % catAnimation.frames;
  }
}

// Función para ajustar la posición del contenedor
function adjustCatContainer() {
  const container = document.getElementById('cat-animation-container');
  if (!container || !catFooter) return;
  
  // Obtener la posición del footer
  const footerRect = catFooter.getBoundingClientRect();
  
  // Posicionar el contenedor justo arriba del footer
  const topPosition = window.scrollY + footerRect.top - 100;
  container.style.top = `${topPosition}px`;
}

// Iniciar la animación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Esperar unos segundos para que la página cargue completamente
  setTimeout(initCatAnimation, 1000);
}); 