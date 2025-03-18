// Esta función crea e inicializa la animación SVG del lápiz
function initPencilDrawingAnimation() {
  const container = document.getElementById('animation-container');
  if (!container) return;
  
  // Limpiar el contenedor
  container.innerHTML = '';
  
  // Crear el SVG
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 600 120");
  svg.style.overflow = "visible";
  
  // Definir los gradientes para las líneas
  const defs = document.createElementNS(svgNS, "defs");
  
  // Gradiente principal - usando los mismos colores que los títulos
  const linearGradient = document.createElementNS(svgNS, "linearGradient");
  linearGradient.setAttribute("id", "lineGradient");
  linearGradient.setAttribute("x1", "0%");
  linearGradient.setAttribute("y1", "0%");
  linearGradient.setAttribute("x2", "100%");
  linearGradient.setAttribute("y2", "0%");
  
  const stop1 = document.createElementNS(svgNS, "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#FF5EDB"); // Rosa
  
  const stop2 = document.createElementNS(svgNS, "stop");
  stop2.setAttribute("offset", "50%");
  stop2.setAttribute("stop-color", "#8C52FF"); // Púrpura
  
  const stop3 = document.createElementNS(svgNS, "stop");
  stop3.setAttribute("offset", "100%");
  stop3.setAttribute("stop-color", "#00D4FF"); // Azul claro
  
  linearGradient.appendChild(stop1);
  linearGradient.appendChild(stop2);
  linearGradient.appendChild(stop3);
  
  // Gradiente secundario para el lápiz
  const pencilGradient = document.createElementNS(svgNS, "linearGradient");
  pencilGradient.setAttribute("id", "pencilGradient");
  pencilGradient.setAttribute("x1", "0%");
  pencilGradient.setAttribute("y1", "0%");
  pencilGradient.setAttribute("x2", "100%");
  pencilGradient.setAttribute("y2", "0%");
  
  const pStop1 = document.createElementNS(svgNS, "stop");
  pStop1.setAttribute("offset", "0%");
  pStop1.setAttribute("stop-color", "#8C52FF"); // Púrpura
  
  const pStop2 = document.createElementNS(svgNS, "stop");
  pStop2.setAttribute("offset", "100%");
  pStop2.setAttribute("stop-color", "#FF5EDB"); // Rosa
  
  pencilGradient.appendChild(pStop1);
  pencilGradient.appendChild(pStop2);
  
  defs.appendChild(linearGradient);
  defs.appendChild(pencilGradient);
  svg.appendChild(defs);
  
  // Crear las líneas onduladas
  const line1 = createWavyLine(svgNS, 50, 30, 500, 30, 20, "line1");
  const line2 = createWavyLine(svgNS, 50, 60, 500, 60, 15, "line2");
  const line3 = createWavyLine(svgNS, 50, 90, 500, 90, 10, "line3");
  
  // Añadir las líneas al SVG
  svg.appendChild(line1);
  svg.appendChild(line2);
  svg.appendChild(line3);
  
  // Crear el grupo para el lápiz
  const pencilGroup = document.createElementNS(svgNS, "g");
  pencilGroup.setAttribute("id", "pencil");
  pencilGroup.setAttribute("transform", "translate(40, 30) rotate(0) scale(0.5)");
  
  // Dibujar un lápiz realista
  const pencilBody = document.createElementNS(svgNS, "path");
  pencilBody.setAttribute("d", "M0,0 L80,0 L90,10 L80,20 L0,20 Z");
  pencilBody.setAttribute("fill", "#FFD700"); // Color dorado para el cuerpo del lápiz
  pencilBody.setAttribute("stroke", "#8B4513");
  pencilBody.setAttribute("stroke-width", "1");
  
  const pencilTip = document.createElementNS(svgNS, "path");
  pencilTip.setAttribute("d", "M-10,10 L0,0 L0,20 Z");
  pencilTip.setAttribute("fill", "#4B2F2F"); // Color del grafito
  pencilTip.setAttribute("stroke", "#000");
  pencilTip.setAttribute("stroke-width", "0.5");
  
  const pencilStripe = document.createElementNS(svgNS, "rect");
  pencilStripe.setAttribute("x", "20");
  pencilStripe.setAttribute("y", "0");
  pencilStripe.setAttribute("width", "10");
  pencilStripe.setAttribute("height", "20");
  pencilStripe.setAttribute("fill", "url(#pencilGradient)");
  
  const pencilEraser = document.createElementNS(svgNS, "path");
  pencilEraser.setAttribute("d", "M80,0 L90,0 L90,20 L80,20 Z");
  pencilEraser.setAttribute("fill", "#FF5252"); // Color de la goma
  pencilEraser.setAttribute("stroke", "#8B4513");
  pencilEraser.setAttribute("stroke-width", "1");
  
  // Añadir las partes del lápiz al grupo
  pencilGroup.appendChild(pencilTip);
  pencilGroup.appendChild(pencilBody);
  pencilGroup.appendChild(pencilStripe);
  pencilGroup.appendChild(pencilEraser);
  
  // Añadir el lápiz al SVG
  svg.appendChild(pencilGroup);
  
  // Añadir el SVG al contenedor
  container.appendChild(svg);
  
  // Iniciar la animación
  animatePencilDrawing();
}

// Función para crear una línea ondulada
function createWavyLine(svgNS, x1, y1, x2, y2, waveHeight, id) {
  const path = document.createElementNS(svgNS, "path");
  
  // Crear una línea ondulada
  let d = `M${x1},${y1} `;
  const segments = 5;
  const segmentLength = (x2 - x1) / segments;
  
  for (let i = 1; i <= segments; i++) {
    const cpx1 = x1 + (i - 1) * segmentLength + segmentLength / 4;
    const cpy1 = y1 + (i % 2 === 0 ? waveHeight : -waveHeight);
    const cpx2 = x1 + (i - 1) * segmentLength + segmentLength * 3 / 4;
    const cpy2 = y1 + (i % 2 === 0 ? -waveHeight : waveHeight);
    const x = x1 + i * segmentLength;
    const y = y1;
    
    d += `C ${cpx1},${cpy1} ${cpx2},${cpy2} ${x},${y} `;
  }
  
  path.setAttribute("d", d);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "url(#lineGradient)");
  path.setAttribute("stroke-width", "4");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("id", id);
  
  // Configurar la animación de dibujo
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  
  return path;
}

// Función para animar el lápiz dibujando las líneas
function animatePencilDrawing() {
  const pencil = document.getElementById('pencil');
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  const line3 = document.getElementById('line3');
  
  if (!pencil || !line1 || !line2 || !line3) return;
  
  // Resetear la animación
  const resetAnimation = () => {
    // Resetear líneas
    [line1, line2, line3].forEach(line => {
      const length = line.getTotalLength();
      line.style.strokeDashoffset = length;
      line.style.opacity = 0;
    });
    
    // Posicionar el lápiz en el inicio
    pencil.setAttribute("transform", "translate(40, 30) rotate(0) scale(0.5)");
  };
  
  // Mover el lápiz a lo largo de la línea mientras dibuja
  const animateLine = (line, y, duration, delay, callback) => {
    const length = line.getTotalLength();
    
    // Hacer visible la línea
    setTimeout(() => {
      line.style.opacity = 1;
      
      // Animación de la línea
      line.animate([
        { strokeDashoffset: length },
        { strokeDashoffset: 0 }
      ], {
        duration: duration,
        delay: delay,
        fill: 'forwards',
        easing: 'ease-in-out'
      });
      
      // Animación del lápiz
      pencil.animate([
        { transform: `translate(40, ${y}) rotate(0) scale(0.5)` },
        { transform: `translate(500, ${y}) rotate(0) scale(0.5)` }
      ], {
        duration: duration,
        delay: delay,
        fill: 'forwards',
        easing: 'ease-in-out',
        composite: 'replace'
      }).onfinish = callback;
    }, delay);
  };
  
  // Iniciar la animación secuencial
  resetAnimation();
  
  animateLine(line1, 30, 2000, 0, () => {
    animateLine(line2, 60, 2000, 100, () => {
      animateLine(line3, 90, 2000, 100, () => {
        // Reiniciar la animación después de un tiempo
        setTimeout(resetAnimation, 3000);
        setTimeout(animatePencilDrawing, 3500);
      });
    });
  });
}

// Inicializar la animación cuando la página esté cargada
document.addEventListener('DOMContentLoaded', initPencilDrawingAnimation);

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', initPencilDrawingAnimation); 