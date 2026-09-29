# Épica 03: Migración y Refactorización Premium de "suscripcion-floral.html"

## 1. Objetivo de la Épica (Visión Senior)

El objetivo de esta épica es construir la página `suscripcion-floral.html` transpolando el contenido de la versión
*legacy*, pero inyectándolo en la arquitectura de alto rendimiento y diseño de lujo validada en las épicas anteriores.
Se debe garantizar una cohesión visual absoluta con el resto del sitio, la eliminación de dependencias externas
(fuentes, iconos), y la implementación de componentes dinámicos (Hero Carousel y Reveal de Planes) utilizando Vanilla JS
con alto enfoque en Accesibilidad y Animaciones fluidas.

## 2. Alcance Estricto

* **Archivos permitidos para modificar/crear:** `suscripcion-floral.html`, `src/js/modules/subscription.js` (u homólogo
  para el toggle), `src/js/modules/hero-carousel.js` (si se requiere) y la carpeta `public/images/suscripcion/`.
* **Límite de la Épica:** Solo se trabajará sobre la página de suscripciones. El Header, Footer y la franja de
  beneficios deben ser clones exactos de los logrados en la Épica 01 y 02.

## 3. Definition of Done (DoD - Lista de Verificación Obligatoria)

Para que el agente dé por superada esta Épica, debe auditar y confirmar positivamente lo siguiente:

* [ ] **Cohesión Estructural:** El `<header>`, el `<footer>` y la franja de "Delivery/Facturación" son idénticos a los
  del resto del sitio. El enlace "Suscripción Floral" tiene el estado activo en la navegación.
* [ ] **Independencia Gráfica:** Cero llamadas a Material Symbols. Los iconos de condiciones (flor, calendario, camión)
  y botones (expand, check) son `<svg>` nativos con `fill="currentColor"`.
* [ ] **Rendimiento Visual (Hero & Anti-CLS):** El carrusel de fondo en el Hero funciona de manera fluida y responsiva
  sin bloquear el renderizado (imágenes LCP optimizadas). Todas las imágenes inferiores (`.webp`) usan `loading="lazy"`
  y protegen el CLS.
* [ ] **Interactividad Segura y A11y (Planes):** El botón "Ver Planes" despliega las tarjetas de precios mediante
  manipulaciones de clases de Tailwind (transiciones de altura/opacidad) orquestadas por un módulo Vanilla JS, manejando
  atributos `aria-expanded`.
* [ ] **Compatibilidad Dark Mode:** Las tarjetas de precio, los overlays del Hero y los textos tienen contraste y
  colores nativos adaptados a la View Transitions API (`dark:bg-dark-surface`, etc.).