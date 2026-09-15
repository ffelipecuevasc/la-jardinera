# Épica 04: Migración y Refactorización Premium de "galeria.html"

## 1. Objetivo de la Épica (Visión Senior)

El objetivo de esta épica es reconstruir la página `galeria.html` elevando su calidad técnica. Se debe portar el efecto
visual interactivo de "acordeón horizontal" (`flex-grow`) y el visor multimedia (Lightbox), purgando dependencias
obsoletas (icon fonts) y refactorizando el JavaScript. En cumplimiento estricto con los requerimientos del cliente, se
eliminarán los filtros de escala de grises para que las obras florales luzcan a todo color permanentemente.

## 2. Alcance Estricto

* **Archivos permitidos para modificar/crear:** `galeria.html`, `src/js/modules/gallery.js` (o similar),
  `src/js/main.js` y las rutas gráficas en `public/`.
* **Límite de la Épica:** El Header, Footer y Franja de Beneficios son inmutables (clonados). No se usarán librerías
  externas de Lightbox (ej. Fancybox, Swiper); toda la lógica debe ser Vanilla JS (ES6+).

## 3. Definition of Done (DoD - Lista de Verificación Obligatoria)

Para que el agente dé por superada esta Épica, debe auditar y confirmar positivamente lo siguiente:

* [ ] **Cohesión Estructural:** El `<header>` y `<footer>` son consistentes. El enlace "Galería" es el único con el
  "Active State".
* [ ] **Eliminación del Grayscale:** Ninguna etiqueta `<img>` o `<video>` contiene clases de Tailwind o CSS
  personalizado que aplique filtros de blanco y negro (`grayscale`).
* [ ] **Accordion Fluido y Anti-CLS:** El efecto de ensanchamiento de las tarjetas al pasar el ratón se realiza de forma
  suave (vía `flex-grow`), y los medios utilizan `object-cover` para no deformarse ni causar Layout Shift.
* [ ] **Lightbox Dinámico y Accesible:** El visor de pantalla completa soporta tanto imágenes (`.webp`) como videos
  (`.mp4`), permite navegación por botones SVG (sin *Material Symbols*), por clic y por teclado (`Esc`, flechas
  direccionales).
* [ ] **Rendimiento de Recursos:** Todos los archivos multimedia apuntan a rutas locales y están optimizados. Las
  imágenes/videos fuera del *viewport* usan `loading="lazy"`.