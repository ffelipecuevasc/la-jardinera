# Iteración 03: Arquitectura JS (Lightbox Multimodal y Media)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
El archivo `gallery.js` antiguo mezclaba manipulación del DOM, eventos de muting de video (mala UX) e inyecciones de
clases obsoletas. Tu objetivo es refactorizar esta lógica desde cero creando un módulo ES6 puro
(`src/js/modules/gallery.js`). El Lightbox debe ser capaz de leer el atributo `data-type` ("image" o "video") de las
tarjetas, instanciar el nodo DOM correspondiente dinámicamente y destruirlo al cerrar para liberar memoria y detener
reproducciones.

## 1. Objetivo de la Iteración

Construir el motor JavaScript que dará vida a la galería. Esto implica enlazar las tarjetas del "Flex-Grow Accordion"
con un visor de pantalla completa (Lightbox) fluido y multimodal, capaz de renderizar fotografías y videos con controles
nativos, gestionando transiciones de entrada/salida de forma elegante.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Creación del Módulo JS (`src/js/modules/gallery.js`):**
    * Crear el archivo, exportar la función `initGallery()` e importarla en `main.js`.
    * Purgar la lógica antigua que desmuteaba (`muted = false`) los videos al hacer hover en la cuadrícula. Los videos
      en la cuadrícula deben permanecer estrictamente como fondos visuales mudos (`autoplay loop muted playsinline`).

2. **Lógica Central del Lightbox (Inyección Dinámica):**
    * Mapear todos los botones `.gallery-carousel-card` en un array (o NodeList) para calcular índices (current, prev,
      next).
    * **Apertura:** Al hacer clic en una tarjeta, capturar su `data-type` y `data-src`. Retirar la clase `hidden` del
      `#lightbox`, aplicar una transición de opacidad (`opacity-0` a `opacity-100`) y desactivar el scroll del `<body>`
      (`overflow: hidden`).
    * **Renderizado Multimodal (Dentro de `#lightbox-content`):**
        - Si es `image`: Crear una etiqueta `<img>` con `src`, `loading="eager"`, y clases
          `max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl`.
        - Si es `video`: Crear una etiqueta `<video>` con `src`, `autoplay`, `controls`, `playsinline` y las mismas
          clases de tamaño y sombra.
    * **Cierre:** Al hacer clic en el botón cerrar o en el overlay (`#lightbox`), revertir la opacidad, añadir `hidden`,
      reactivar el scroll del body y, **críticamente**, usar `.innerHTML = ''` en el contenedor para destruir el nodo de
      video/imagen y detener la reproducción de audio automáticamente.

3. **Navegación Interna (Prev/Next):**
    * Enganchar los botones `#lightbox-prev` y `#lightbox-next`.
    * Al hacer clic, actualizar el índice actual, destruir el nodo del `#lightbox-content` e inyectar el nuevo nodo
      correspondiente al nuevo índice. (Opcional: implementar un loop para que al llegar a la última imagen salte a la
      primera).

4. **Integración SVG y UI del Lightbox (`galeria.html`):**
    * Asegurarse de que los controles del Lightbox en el HTML (Cerrar, Anterior, Siguiente) utilicen iconos `<svg>`
      nativos y legibles (ej. color `text-white` con hover `text-primary`), posicionados de forma absoluta y con alto
      `z-index`.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Renderizado Multimodal Seguro**
    * **Dado** la galería de servicios mixta
    * **Cuando** el usuario hace clic en una imagen y luego en un video
    * **Entonces** el Lightbox levanta la etiqueta `<img>` y luego la cambia correctamente por una etiqueta `<video>`
      con controles de reproducción nativos habilitados.
* **Escenario 2: Destrucción de Nodos y Fugas de Memoria**
    * **Dado** un video reproduciéndose con sonido abierto en el Lightbox
    * **Cuando** el usuario hace clic en el botón de cerrar ("X")
    * **Entonces** el modal se oculta y el video/audio se detiene de forma instantánea al destruirse el elemento del
      DOM.
* **Escenario 3: Transición Fluida**
    * **Dado** el visor inactivo
    * **Cuando** es invocado
    * **Entonces** la transición se realiza usando propiedades de GPU (opacidad) sin depender de las viejas animaciones
      CSS `@keyframes fadeIn`.