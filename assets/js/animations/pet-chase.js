let dogX, catX;
let dogDirection = 1, catDirection = 1;
let state = "dogChasing"; // Estado inicial: el perrito persigue al gatito.
let threshold = 50;       // Distancia umbral para invertir roles.
let isSwitching = false;  // Evita cambios continuos.
let canvasContainer;

function setup() {
  // Crear el canvas dentro del contenedor de animación
  canvasContainer = document.getElementById('animation-container');
  let canvas = createCanvas(canvasContainer.offsetWidth, 120);
  canvas.parent('animation-container');
  
  // Posiciones iniciales: perrito a la izquierda y gatito a la derecha.
  dogX = width * 0.3;
  catX = width * 0.6;
  
  // Ocultar el mensaje de placeholder si existe
  let placeholder = document.getElementById('animation-placeholder');
  if (placeholder) {
    placeholder.style.display = 'none';
  }
}

function draw() {
  clear(); // Usar clear en lugar de background para mantener transparencia
  let yPos = height - 70;  // Posición vertical fija para ambos personajes.
  
  // Dibuja el gatito y el perrito usando funciones personalizadas.
  drawCat(catX, yPos, 70);
  drawPuppy(dogX, yPos, 70);
  
  // Actualiza posiciones según el estado.
  if (state === "dogChasing") {
    // El perrito (persiguido) se mueve más rápido.
    dogX += 2 * dogDirection;
    catX += 1.2 * catDirection;
  } else if (state === "catChasing") {
    // El gatito persigue ahora.
    dogX += 1.2 * dogDirection;
    catX += 2 * catDirection;
  }
  
  // Cuando se acerca la "captura", se invierten los roles.
  if (!isSwitching && abs(catX - dogX) < threshold) {
    isSwitching = true;
    noLoop(); // Pausa momentáneamente la animación.
    setTimeout(switchState, 500);
  }
  
  // Si alguno sale de la pantalla, se reinician las posiciones.
  if (dogX > width + 70 || dogX < -70 || catX > width + 70 || catX < -70) {
    resetPositions();
  }
}

function switchState() {
  // Invierte el estado: de "dogChasing" a "catChasing" y viceversa.
  state = state === "dogChasing" ? "catChasing" : "dogChasing";
  // Revierte las direcciones para cambiar el sentido de la animación.
  dogDirection *= -1;
  catDirection *= -1;
  isSwitching = false;
  loop(); // Reanuda la animación.
}

function resetPositions() {
  // Reinicia posiciones y direcciones según el estado actual.
  if (state === "dogChasing") {
    dogX = width * 0.3;
    catX = width * 0.6;
    dogDirection = 1;
    catDirection = 1;
  } else {
    dogX = width * 0.7;
    catX = width * 0.4;
    dogDirection = -1;
    catDirection = -1;
  }
}

function windowResized() {
  if (canvasContainer) {
    resizeCanvas(canvasContainer.offsetWidth, 120);
    resetPositions();
  }
}

/* Función para dibujar un perrito adorable */
function drawPuppy(x, y, size) {
  push();
  translate(x, y);
  scale(size / 100);
  noStroke();
  // Cabeza: un círculo de tono marrón claro.
  fill(222, 184, 135);
  ellipse(50, 50, 80, 80);
  // Orejas: dos triángulos.
  fill(222, 184, 135);
  triangle(20, 30, 35, 0, 50, 30); // oreja izquierda
  triangle(80, 30, 65, 0, 50, 30); // oreja derecha
  // Ojos: dos pequeños círculos negros.
  fill(0);
  ellipse(35, 45, 8, 8);
  ellipse(65, 45, 8, 8);
  // Nariz: un círculo negro.
  ellipse(50, 60, 6, 6);
  // Boca: un pequeño arco.
  noFill();
  stroke(0);
  strokeWeight(1);
  arc(50, 65, 20, 10, 0, PI);
  pop();
}

/* Función para dibujar un gatito adorable */
function drawCat(x, y, size) {
  push();
  translate(x, y);
  scale(size / 100);
  noStroke();
  // Cara: un círculo de tono gris claro.
  fill(200, 200, 200);
  ellipse(50, 50, 80, 80);
  // Orejas exteriores: triángulos.
  fill(200, 200, 200);
  triangle(20, 30, 35, 0, 50, 30); // oreja izquierda
  triangle(80, 30, 65, 0, 50, 30); // oreja derecha
  // Parte interna de las orejas: en rosa claro.
  fill(255, 182, 193);
  triangle(25, 30, 35, 10, 45, 30);
  triangle(55, 30, 65, 10, 75, 30);
  // Ojos: dos pequeños círculos negros.
  fill(0);
  ellipse(35, 45, 8, 8);
  ellipse(65, 45, 8, 8);
  // Nariz: un pequeño triángulo en rosa.
  fill(255, 182, 193);
  triangle(50, 55, 45, 65, 55, 65);
  // Bigotes: líneas a ambos lados.
  stroke(0);
  strokeWeight(1);
  line(20, 55, 40, 55); // bigote izquierdo superior
  line(20, 60, 40, 60); // bigote izquierdo inferior
  line(60, 55, 80, 55); // bigote derecho superior
  line(60, 60, 80, 60); // bigote derecho inferior
  pop();
} 