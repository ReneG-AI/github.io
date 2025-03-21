/**
 * Función para copiar un email al portapapeles
 * Soluciona el error 404 en console
 */
function copyEmail(email) {
  if (!email) {
    email = "renegarciaeduca@gmail.com"; // Email por defecto
  }
  
  // Crear un elemento temporal para copiar al portapapeles
  const tempInput = document.createElement("input");
  tempInput.value = email;
  document.body.appendChild(tempInput);
  tempInput.select();
  
  try {
    // Copiar al portapapeles
    document.execCommand("copy");
    
    // Mostrar feedback si existe un elemento para ello
    const feedbackElement = document.getElementById("copy-feedback");
    if (feedbackElement) {
      feedbackElement.textContent = "Email copiado correctamente";
      feedbackElement.classList.add("visible");
      
      // Ocultar después de 3 segundos
      setTimeout(() => {
        feedbackElement.classList.remove("visible");
      }, 3000);
    }
    
    console.log("Email copiado al portapapeles: " + email);
  } catch (err) {
    console.error("Error al copiar el email:", err);
  } finally {
    // Limpieza
    document.body.removeChild(tempInput);
  }
} 