// Animación del gato negro usando el sprite sheet
let catSprite;
let catX = 30; // Posición inicial a la izquierda
let catY;
let catDirection = 1; // 1 = derecha, siempre en esta dirección
let catSpeed = 0.5; // Velocidad reducida del gato
let spriteSheet; // Sprite sheet del gato
let catAnimation; // Objeto de animación
let canvasElement; // Elemento canvas para la animación
let lastScrollY = 0; // Último valor de desplazamiento
let scrollDirection = 0; // Dirección del scroll
let isWalking = false; // Si el gato está caminando
let walkingTimeout; // Timeout para detener el caminar
let isInitialized = false;

// Función para inicializar la animación del gato
function initCatAnimation() {
  // Evitar inicialización múltiple
  if (isInitialized) return;
  isInitialized = true;
  
  // Crear un contenedor para el canvas
  const catContainer = document.createElement('div');
  catContainer.id = 'cat-animation-container';
  catContainer.style.position = 'fixed'; // Posición fija
  catContainer.style.bottom = '20px'; // En la parte inferior
  catContainer.style.left = '20px'; // A la izquierda
  catContainer.style.zIndex = '100';
  catContainer.style.pointerEvents = 'none'; // Para que no interfiera con los clics
  catContainer.style.width = '100px'; // Ancho limitado
  catContainer.style.height = '80px'; // Alto ajustado
  catContainer.style.overflow = 'hidden';
  
  // Agregar el contenedor al final del body
  document.body.appendChild(catContainer);
  
  // Crear un nuevo sketch de p5.js
  const sketch = function(p) {
    p.preload = function() {
      // Cargar el sprite sheet del gato
      spriteSheet = p.loadImage('assets/images/cat_black-32x48.png');
    };
    
    p.setup = function() {
      // Crear canvas para el gato
      const canvas = p.createCanvas(100, 80);
      canvas.parent('cat-animation-container');
      canvasElement = canvas.elt;
      
      // Posición Y del gato
      catY = 30;
      
      // Configurar la animación del gato
      catAnimation = {
        frameWidth: 32,
        frameHeight: 48,
        frames: 4, // 4 frames de animación
        currentFrame: 0,
        frameDelay: 12, // Velocidad más lenta de la animación
        frameCounter: 0
      };
    };
    
    p.draw = function() {
      // Limpiar el canvas con transparencia
      p.clear();
      
      // Actualizar posición solo si está caminando
      if (isWalking) {
        catX += catSpeed * catDirection;
        
        // Reiniciar posición si sale del canvas
        if (catX > 100) {
          catX = -20;
        }
      }
      
      // Dibujar el gato
      drawCat(p);
      
      // Actualizar la animación solo si está caminando
      if (isWalking) {
        updateAnimation();
      }
    };
    
    p.windowResized = function() {
      // Mantener el tamaño pequeño
      p.resizeCanvas(100, 80);
    };
  };
  
  // Iniciar el sketch
  new p5(sketch);
  
  // Añadir listener para el scroll
  window.addEventListener('scroll', handleScroll);
  
  // Evento táctil para dispositivos móviles
  window.addEventListener('touchmove', function() {
    startWalking();
  });
}

// Función para manejar el scroll
function handleScroll() {
  const currentScrollY = window.scrollY;
  
  // Determinar dirección del scroll
  scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
  lastScrollY = currentScrollY;
  
  // Iniciar animación de caminar
  startWalking();
}

// Iniciar animación de caminar
function startWalking() {
  isWalking = true;
  
  // Limpiar timeout existente
  if (walkingTimeout) {
    clearTimeout(walkingTimeout);
  }
  
  // Detener la animación después de un breve tiempo
  walkingTimeout = setTimeout(function() {
    isWalking = false;
    // Mantener el primer frame cuando está parado
    catAnimation.currentFrame = 0;
  }, 1500);
}

// Función para dibujar el gato
function drawCat(p) {
  const frameX = catAnimation.currentFrame * catAnimation.frameWidth;
  const frameY = 0;
  
  p.push();
  p.image(
    spriteSheet,
    catX, catY,
    catAnimation.frameWidth, catAnimation.frameHeight,
    frameX, frameY,
    catAnimation.frameWidth, catAnimation.frameHeight
  );
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

// Detectar si es dispositivo móvil para ajustar posición
function adjustForMobile() {
  const container = document.getElementById('cat-animation-container');
  if (!container) return;
  
  // Ajustar para móviles
  if (window.innerWidth <= 768) {
    container.style.bottom = '10px';
    container.style.left = '10px';
    container.style.transform = 'scale(0.8)'; // Reducir tamaño en móviles
  } else {
    container.style.bottom = '20px';
    container.style.left = '20px';
    container.style.transform = 'scale(1)';
  }
}

// Iniciar la animación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Esperar unos segundos para que la página cargue completamente
  setTimeout(initCatAnimation, 1000);
  
  // Ajustar para dispositivos móviles
  adjustForMobile();
  window.addEventListener('resize', adjustForMobile);
}); 