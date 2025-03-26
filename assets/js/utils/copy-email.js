/**
 * Función para copiar un email al portapapeles
 * y proporcionar retroalimentación visual
 */
document.addEventListener('DOMContentLoaded', function() {
  const copyButton = document.getElementById('copy-button');
  
  if (copyButton) {
    copyButton.addEventListener('click', function() {
      const email = document.getElementById('author-email').textContent;
      copyEmail(email);
      
      // Añadir clase para feedback visual
      copyButton.classList.add('copied');
      
      // Remover la clase después de 3 segundos
      setTimeout(() => {
        copyButton.classList.remove('copied');
      }, 3000);
    });
  }
});

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
    console.log("Email copiado al portapapeles: " + email);
  } catch (err) {
    console.error("Error al copiar el email:", err);
  } finally {
    // Limpieza
    document.body.removeChild(tempInput);
  }
} 