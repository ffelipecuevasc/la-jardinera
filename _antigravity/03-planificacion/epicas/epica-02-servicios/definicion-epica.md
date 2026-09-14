# Épica 02: Migración y Refactorización Premium de "servicios.html"

## 1. Objetivo de la Épica (Visión Senior)

El objetivo de esta épica es construir la página `servicios.html` utilizando como base el contenido de la versión
*legacy* (antigua), pero inyectándolo en la nueva arquitectura de alto rendimiento definida en la Épica 01. Se debe
garantizar una cohesión visual absoluta (mismo Header, Footer y tokens de diseño), la eliminación de todas las
dependencias externas (fuentes, iconos y fotografías), y la implementación de un Modal de Servicios dinámico, seguro
(Anti-XSS) y accesible (100/100 Lighthouse).

## 2. Alcance Estricto

* **Archivos permitidos para modificar/crear:** `servicios.html`, `src/js/modules/modal.js`, y la carpeta
  `public/images/servicios/`.
* **Límite de la Épica:** Solo se trabajará sobre `servicios.html`. El Header y Footer deben ser clones exactos de los
  logrados en la Épica 01. No se alterarán los estilos globales base a menos que sea estrictamente necesario para el
  nuevo Modal.

## 3. Definition of Done (DoD - Lista de Verificación Obligatoria)

Para que el agente dé por superada esta Épica, debe auditar y confirmar positivamente lo siguiente:

* [ ] **Cohesión Estructural:** El `<header>` y el `<footer>` son idénticos en código y comportamiento (Dark Mode, Menú
  Móvil) a los del `index.html`.
* [ ] **Independencia Gráfica (Offline):** Cero llamadas a Google Fonts o Material Symbols. Todos los íconos son `<svg>`
  nativos.
* [ ] **Rendimiento de Imágenes:** Las 8 imágenes de las tarjetas y las imágenes de las galerías del modal han sido
  migradas a rutas locales (`./public/images/servicios/*.webp`), incluyen `loading="lazy"` (excepto LCP) y previenen el
  CLS con `aspect-ratio`.
* [ ] **Modal Dinámico y Seguro:** El modal de servicios se abre correctamente al hacer clic en "Ver más", inyecta el
  título, la descripción y la galería dinámica, y maneja el foco (Focus Trap) y el cierre con la tecla `Escape` (a11y).
* [ ] **Compatibilidad de Tema:** La grilla de servicios y el modal reaccionan perfectamente a la *View Transitions API*
  (Modo Claro/Oscuro) sin parpadeos ni fondos transparentes.