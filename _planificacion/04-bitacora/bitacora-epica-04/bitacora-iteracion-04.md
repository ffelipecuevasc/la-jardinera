# Bitácora de Auditoría y Desarrollo - Épica 04 | Iteración 04 (Final)

## 1. Resumen Ejecutivo
Se ejecutó y certificó con éxito la **Iteración 04 (y final) de la Épica 04 (Página de Galería)**, logrando el cumplimiento riguroso de las pautas de accesibilidad **WCAG 2.1 (Nivel AA/AAA)** en el catálogo interactivo y el visor modal **Lightbox**.
En esta fase se resolvió el bug de fuga acústica advertido por QA en la iteración previa, se implementó un **Focus Trap estricto** que impide el escape de navegación por teclado, se configuró el aislamiento dinámico del fondo mediante los atributos estándar `inert` y `aria-hidden`, se añadió la restauración guiada del foco hacia la tarjeta disparadora y se habilitó la expansión visual accesible del acordeón mediante `focus-visible:grow-[10]`.

---

## 2. Acciones Realizadas y Cambios de Código

### A. Corrección Acústica Inmediata (Resolución QA Warning)
- **Problema previo:** Al cerrar un video con audio activo, este continuaba sonando durante los 300ms de transición de salida (`opacity-0`) antes de que el nodo fuera destruido en el DOM.
- **Solución implementada:** En la función `closeLightbox()` de `src/js/modules/gallery.js`, se detecta inmediatamente si existe un elemento `<video>` y se ejecutan de forma síncrona:
  ```javascript
  const currentVideo = lightboxContent.querySelector('video');
  if (currentVideo) {
      currentVideo.pause();
      currentVideo.muted = true;
  }
  ```
  Esto garantiza el silenciamiento instantáneo en el milisegundo en que el usuario hace clic o presiona `Escape`.

### B. Semántica ARIA Dinámica y Background Hiding (`inert`)
- **Estado Inicial en HTML:** El modal `#lightbox` porta `aria-hidden="true"` desde su marcado inicial en `galeria.html`.
- **Apertura del Visor:**
  - Se conmuta el diálogo a `aria-hidden="false"`.
  - Se obtienen todos los elementos estructurales de fondo (`<header>`, `<main>`, `<footer>` y secciones hermanas) y se les inyecta `inert=""` y `aria-hidden="true"`.
  - Con esto, los lectores de pantalla (NVDA, JAWS, VoiceOver) y la navegación por teclado quedan 100% aislados del contenido exterior.
- **Cierre del Visor:**
  - Se revierte `aria-hidden="true"` en el Lightbox.
  - Se remueven los atributos `inert` y `aria-hidden` de los elementos de fondo, restaurando la interactividad normal del documento.

### C. Focus Trap y Focus Management Guiado
- **Captura del Disparador:** Al abrirse el Lightbox mediante clic o teclado, se almacena la referencia del elemento activo en `lastActiveElement`.
- **Foco Inicial:** Tras desplegarse el modal, el foco se posiciona automáticamente en el botón de cierre (`#lightbox-close`), permitiendo al usuario una salida rápida e intuitiva.
- **Ciclo Estricto de Teclado (`handleFocusTrap`):**
  - Se intercepta el evento `Tab` y `Shift + Tab` dentro del modal.
  - El foco cicla exclusivamente entre los botones `Cerrar`, `Anterior`, `Siguiente` y los controles interactivos del nodo multimedia si es video. El foco jamás escapa al fondo.
- **Restauración de Foco:** Al completarse el cierre, se ejecuta `lastActiveElement.focus()`, devolviendo al usuario exactamente a la tarjeta que había seleccionado en la cuadrícula.

### D. Accesibilidad Visual: Expansión por Teclado (`focus-visible:grow-[10]`)
- En `galeria.html`, se actualizaron las 34 tarjetas interactivas (`.gallery-carousel-card`) incorporando:
  ```html
  focus-visible:grow-[10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
  ```
- Esto permite que los usuarios que navegan exclusivamente mediante la tecla `Tab` experimenten el mismo efecto visual de expansión fluida del acordeón que los usuarios con ratón (`hover:grow-[10]`), acompañados de un anillo de foco de alto contraste con el color primario de la marca.

---

## 3. Verificación de Criterios de Aceptación (Definition of Done)

| Criterio | Estado | Evidencia |
| :--- | :---: | :--- |
| **Silenciado Inmediato de Audio** | ✅ CUMPLIDO | `currentVideo.pause()` y `muted = true` ejecutados síncronamente al cerrar. |
| **Semántica ARIA y Background Hiding** | ✅ CUMPLIDO | `aria-hidden` dinámico en `#lightbox` y `inert` + `aria-hidden` en elementos de fondo. |
| **Focus Trap Estricto** | ✅ CUMPLIDO | Ciclado de tabulador activo sin fugas al DOM exterior. |
| **Restauración de Foco** | ✅ CUMPLIDO | `lastActiveElement.focus()` retorna el foco a la tarjeta de origen. |
| **Acordeón Accesible por Teclado** | ✅ CUMPLIDO | `focus-visible:grow-[10]` activo y compilado en las 34 tarjetas. |
| **Cero Comandos Git Ejecutados** | ✅ CUMPLIDO | Ningún comando o acción Git invocada en cumplimiento estricto. |
| **Compilación Limpia de Estilos** | ✅ CUMPLIDO | Tailwind CSS compilado exitosamente con `pnpm build` en 605ms. |
