# Instrucciones para la Animación de Mascotas

Para que la animación del perrito persiguiendo al gatito funcione correctamente, necesitas proporcionar dos imágenes:

1. **Imagen del perrito**: Debe guardarse en `assets/images/animations/puppy.png`
2. **Imagen del gatito**: Debe guardarse en `assets/images/animations/cat.png`

## Requisitos para las imágenes:
- Formato: PNG con fondo transparente
- Tamaño recomendado: aproximadamente 200x200 píxeles 
- Aspecto adorable, preferiblemente con estilo cartoon o kawaii

## Verificación
Una vez añadidas las imágenes, recarga tu página web para ver la animación en acción. 
La animación aparecerá en la sección de contacto, donde el perrito correrá detrás del gatito.

## Personalización
Si deseas ajustar la velocidad o el tamaño de los personajes, puedes modificar el archivo:
`assets/js/animations/pet-chase.js`

- Para cambiar la velocidad: modifica las variables `puppySpeed` y `catSpeed`
- Para cambiar el tamaño: modifica los valores de anchura y altura en las funciones `image()` 