// Variables para la animación de líneas
let particles = [];
let canvasContainer;
let colorPalette = [
  [255, 94, 219], // Rosa
  [140, 82, 255], // Púrpura
  [0, 212, 255]   // Azul claro
];
let trails = [];
let trailPoints = [];

function setup() {
  // Crear el canvas dentro del contenedor de animación
  canvasContainer = document.getElementById('animation-container');
  let canvas = createCanvas(canvasContainer.offsetWidth, 120);
  canvas.parent('animation-container');
  
  // Configuración inicial
  background(0, 0, 0, 0); // Fondo transparente
  colorMode(RGB);
  
  // Crear puntos iniciales para las líneas
  createTrailPoints();
  
  // Ocultar el mensaje de placeholder si existe
  let placeholder = document.getElementById('animation-placeholder');
  if (placeholder) {
    placeholder.style.display = 'none';
  }
}

function createTrailPoints() {
  // Crear varios puntos a lo largo del canvas para que las líneas se dibujen entre ellos
  trailPoints = [];
  const numPoints = 5;
  const spacing = width / (numPoints - 1);
  
  for (let i = 0; i < numPoints; i++) {
    trailPoints.push({
      x: i * spacing,
      y: map(noise(i * 0.5), 0, 1, 20, height - 20),
      targetY: map(noise(i * 0.5, frameCount * 0.01), 0, 1, 20, height - 20)
    });
  }
  
  // Crear las líneas que conectarán los puntos
  trails = [];
  for (let i = 0; i < colorPalette.length; i++) {
    trails.push({
      color: colorPalette[i],
      progress: 0,
      maxProgress: 1,
      thickness: 2 + i * 1.5,
      offset: i * 5, // Desplazamiento vertical para cada línea
      speed: 0.005 + (i * 0.002)
    });
  }
}

function draw() {
  clear(); // Mantener transparencia
  
  // Actualizar la posición de los puntos con un efecto de suavizado
  for (let i = 0; i < trailPoints.length; i++) {
    // Cambiar gradualmente el objetivo en Y basado en ruido Perlin
    const noiseVal = noise(i * 0.5, frameCount * 0.005);
    trailPoints[i].targetY = map(noiseVal, 0, 1, 20, height - 20);
    
    // Mover suavemente hacia el objetivo
    trailPoints[i].y = lerp(trailPoints[i].y, trailPoints[i].targetY, 0.05);
  }
  
  // Dibujar líneas entre los puntos
  for (let t = 0; t < trails.length; t++) {
    const trail = trails[t];
    
    // Aumentar progresivamente el dibujo de la línea
    trail.progress += trail.speed;
    if (trail.progress >= trail.maxProgress) {
      trail.progress = trail.maxProgress;
    }
    
    // Dibujar línea con degradado y efecto de brillo
    drawGradientTrail(trail, trailPoints, t);
    
    // Reiniciar la animación después de un tiempo
    if (trail.progress >= trail.maxProgress && frameCount % 500 === 0) {
      trail.progress = 0;
    }
  }
  
  // Partículas de brillo que siguen a las líneas
  updateParticles();
  
  // Ocasionalmente añadir nuevas partículas de brillo
  if (frameCount % 10 === 0) {
    addParticles();
  }
}

function drawGradientTrail(trail, points, index) {
  const segments = 20;
  const progress = trail.progress;
  const c = trail.color;
  const maxPoints = points.length;
  const drawUpTo = Math.floor(progress * maxPoints);
  
  if (drawUpTo < 2) return;
  
  // Dibujar la línea principal
  noFill();
  for (let i = 0; i < drawUpTo - 1; i++) {
    const startPoint = points[i];
    const endPoint = points[i + 1];
    const segmentProgress = (progress * maxPoints) - i;
    const currentSegmentLength = segmentProgress > 1 ? 1 : segmentProgress;
    
    if (currentSegmentLength <= 0) continue;
    
    // Dibujar segmento con efecto brillante
    for (let j = 0; j < 3; j++) {
      const thickness = trail.thickness - j * 0.7;
      if (thickness <= 0) continue;
      
      const alpha = j === 0 ? 255 : 150 - j * 50;
      stroke(c[0], c[1], c[2], alpha);
      strokeWeight(thickness);
      
      beginShape();
      const offsetY = trail.offset + sin(frameCount * 0.05 + i * 0.5) * 3;
      
      // Crear el efecto de dibujo progresivo
      for (let t = 0; t <= currentSegmentLength; t += 1/segments) {
        const subT = constrain(t, 0, 1);
        const x = lerp(startPoint.x, endPoint.x, subT);
        const y = lerp(startPoint.y, endPoint.y, subT) + offsetY;
        
        // Punto de la curva
        curveVertex(x, y);
        
        // Al inicio y final, añadir puntos de control
        if (t === 0 || t >= currentSegmentLength - 0.1) {
          curveVertex(x, y);
        }
      }
      endShape();
    }
  }
}

function addParticles() {
  // Añadir partículas brillantes a lo largo de la línea
  for (let i = 0; i < trails.length; i++) {
    if (trails[i].progress < 0.2) continue;
    
    const pointIndex = Math.floor(random(0, trailPoints.length - 1));
    const nextIndex = pointIndex + 1;
    
    if (nextIndex < trailPoints.length) {
      const t = random(0, 1);
      const x = lerp(trailPoints[pointIndex].x, trailPoints[nextIndex].x, t);
      const y = lerp(trailPoints[pointIndex].y, trailPoints[nextIndex].y, t) + trails[i].offset;
      
      particles.push({
        x: x,
        y: y,
        size: random(2, 5),
        color: [...colorPalette[i], 200],
        speedX: random(-0.5, 0.5),
        speedY: random(-0.5, 0.5),
        life: 255
      });
    }
  }
}

function updateParticles() {
  // Actualizar y dibujar partículas
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    
    // Actualizar propiedades
    p.x += p.speedX;
    p.y += p.speedY;
    p.life -= 5;
    
    // Dibujar partícula
    noStroke();
    fill(p.color[0], p.color[1], p.color[2], p.life);
    ellipse(p.x, p.y, p.size);
    
    // Eliminar partículas muertas
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function windowResized() {
  if (canvasContainer) {
    resizeCanvas(canvasContainer.offsetWidth, 120);
    createTrailPoints();
  }
} 