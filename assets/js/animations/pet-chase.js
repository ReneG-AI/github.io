// Variables para las imágenes y posiciones
let puppyImg, catImg;
let puppyX, catX;
let puppySpeed = 4; // Velocidad del perrito
let catSpeed = 3;   // Velocidad del gatito
let canvas; // Variable para almacenar el canvas de p5.js
let imagesLoaded = true; // Indica si las imágenes se cargaron correctamente

function preload() {
  // Carga las imágenes del perrito y del gatito
  try {
    puppyImg = loadImage('assets/images/animations/puppy.png', 
      () => {}, // Éxito
      () => { imagesLoaded = false; } // Error
    );
    catImg = loadImage('assets/images/animations/cat.png',
      () => {}, // Éxito
      () => { imagesLoaded = false; } // Error
    );
  } catch (e) {
    console.error("Error al cargar las imágenes de animación:", e);
    imagesLoaded = false;
  }
}

function setup() {
  // Mostrar el mensaje de placeholder si las imágenes no se cargaron
  if (!imagesLoaded) {
    const placeholderElement = document.getElementById('animation-placeholder');
    if (placeholderElement) {
      placeholderElement.style.display = 'block';
    }
    return; // No seguir con la configuración
  }
  
  // Crear un canvas que se ajuste al contenedor
  let containerElement = document.querySelector('.libro-separador');
  if (containerElement) {
    // Obtiene el ancho del contenedor
    let containerWidth = containerElement.offsetWidth; 
    // Altura fija de 100px para la animación
    let containerHeight = 100;
    
    // Crea el canvas con las dimensiones del contenedor
    canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(containerElement);
    
    // Inicializa las posiciones
    catX = random(width * 0.6, width - 100);
    puppyX = catX - 150;
  }
}

function draw() {
  // Si las imágenes no se cargaron, no dibujar nada
  if (!imagesLoaded || !canvas) return;
  
  // Fondo transparente
  clear();
  
  // Posición vertical en el centro
  let yPos = height/2 - 40;
  
  // Dibuja primero al gatito y luego al perrito
  image(catImg, catX, yPos, 70, 70);
  image(puppyImg, puppyX, yPos, 80, 80);
  
  // Actualiza las posiciones
  catX += catSpeed;
  puppyX += puppySpeed;
  
  // Si el gatito sale de la pantalla por la derecha, reiniciamos la animación
  if (catX > width + 100) {
    catX = -100;
    puppyX = catX - 150;
  }
  
  // Cuando el perrito se acerca demasiado al gatito
  if (puppyX > catX - 10) {
    // Se pausa la animación por un breve momento y luego se reinicia la persecución
    setTimeout(resetPositions, 500);
    noLoop(); // Pausa momentáneamente la animación
  }
}

// Función para reiniciar posiciones y reanudar la animación
function resetPositions() {
  catX = random(width * 0.6, width - 100);
  puppyX = catX - 150;
  loop();
}

// Ajusta el tamaño del canvas si se redimensiona la ventana
function windowResized() {
  if (!imagesLoaded || !canvas) return;
  
  let containerElement = document.querySelector('.libro-separador');
  if (containerElement) {
    resizeCanvas(containerElement.offsetWidth, 100);
  }
} 