# Iteración 02: Layout Gráfico "Accordion", SVGs y Assets Locales

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
El archivo `galeria.html` *legacy* contiene una retícula de galerías por categoría (Suscripción, Gift Cards, Decoración,
Novias, etc.) que utiliza un efecto visual de ensanchamiento al hacer hover (`flex-grow`). **REGLA DE ORO (Petición del
cliente):** El código antiguo incluye clases `grayscale` y `dark:grayscale-0`. Debes **ELIMINAR** por completo cualquier
rastro de filtros blanco y negro. Las imágenes y videos deben renderizarse SIEMPRE a todo color.

## 1. Objetivo de la Iteración

Construir las 6 secciones de la galería implementando el efecto "Flex-Grow Accordion" de forma nativa y fluida usando
clases arbitrarias de Tailwind (o utilidades existentes). Migrar todos los medios a rutas locales seguras (`.webp` y
`.mp4`), inyectar la estructura base del *Lightbox* (oculto) y sustituir los íconos de Material Symbols por vectores
nativos.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Reconstrucción del Encabezado de Sección (`<main>`):**
    * Extraer el título "Galería de Servicios" y la descripción del archivo antiguo.
    * Aplicar la tipografía premium (`font-headline-xl text-on-surface`) y el separador central con el rombo (✦) que
      usamos en las otras vistas.

2. **Implementación de las Retículas "Accordion":**
    * Para cada categoría (`#suscripcion-floral`, `#gift-cards`, etc.), crear el contenedor de desplazamiento:
      `flex w-full space-x-2 md:space-x-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar scroll-smooth`.
    * **Tarjetas Interactuables (`<button>`):**
        - Cada elemento multimedia será un botón con atributos de datos para la iteración 03: `data-type="image"` o
          `data-type="video"` y `data-src="./public/images/galeria/..."`.
        - **El Efecto Accordion (Tailwind Nativo):** Aplicar a cada `<button>` las clases:
          `group relative h-[300px] md:h-[400px] flex-1 hover:grow-[10] transition-all duration-700 ease-in-out cursor-pointer flex-shrink-0 w-[80vw] md:w-auto snap-center`.
          (La clase `hover:grow-[10]` de Tailwind v3 reemplaza el CSS antiguo).
    * **Tratamiento Multimedia (Anti-CLS y Cero Grayscale):**
        - Inyectar las imágenes/videos asegurando las clases:
          `w-full h-full object-cover rounded-xl transition-transform duration-700 ease-in-out`.
        - **PURGA STRICTA:** NO incluir las clases `grayscale`, `dark:grayscale-0`, o `group-hover:grayscale-0`. Todo
          debe ser full-color.
        - Añadir `loading="lazy"` a las imágenes. Los `<video>` deben llevar `autoplay loop muted playsinline`.
    * **Overlay de Interacción:**
        - Recrear la capa de oscurecimiento al hacer hover:
          `absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`.
        - Reemplazar el span `open_in_full` de Material Symbols por un `<svg>` nativo de expansión/zoom color blanco
          (`text-white w-12 h-12`).

3. **Mapeo de Rutas a Local:**
    * Cambiar todas las rutas `./static/img/Galeria/SF1.jpg` a `./public/images/galeria/sf1.webp` (para imágenes) y
      `.mp4` (para videos). Homologar los nombres a minúsculas y asegurando semántica en los atributos `alt`.

4. **Preparación del Contenedor Lightbox (Cimientos para Iteración 03):**
    * Al final del documento (antes de la franja de beneficios), crear el cascarón oculto del visor:
      `<div id="lightbox" class="hidden fixed inset-0 bg-dark-background/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4" aria-modal="true" role="dialog">...</div>`.
    * Incluir dentro: un contenedor vacío `<div id="lightbox-content" class="relative max-w-full max-h-full"></div>` y 3
      botones (Cerrar, Anterior, Siguiente) usando `<svg>` nativos con `fill="currentColor"`.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Cumplimiento Requisito Cliente (A todo color)**
    * **Dado** la carga de `galeria.html`
    * **Cuando** el usuario visualiza las galerías sin interactuar
    * **Entonces** las imágenes y videos se muestran a todo color, confirmando la erradicación de los filtros
      `grayscale`.
* **Escenario 2: Acordeón Horizontal Fluido**
    * **Dado** las tiras de imágenes en pantallas de escritorio
    * **Cuando** el ratón hace hover sobre una tarjeta
    * **Entonces** la tarjeta en cuestión se expande suavemente (`flex-grow: 10` equivalente) durante 700ms mientras las
      demás se contraen para ceder espacio, revelando el overlay oscuro y el SVG de expansión.
* **Escenario 3: Independencia de Recursos (Performance)**
    * **Dado** la auditoría del DOM
    * **Cuando** se revisan las etiquetas `<img>` y `<video>`
    * **Entonces** todas apuntan al entorno local `./public/images/galeria/` y no existen fuentes iconográficas cargadas
      desde servidores CDN.