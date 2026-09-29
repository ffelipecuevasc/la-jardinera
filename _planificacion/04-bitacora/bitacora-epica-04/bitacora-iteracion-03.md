# Bitácora de Auditoría y Desarrollo - Épica 04 | Iteración 03

## 1. Resumen Ejecutivo
Se concluyó con total éxito la **Iteración 03 de la Épica 04 (Página de Galería)**, construyendo el motor JavaScript modular Vanilla ES6 en `src/js/modules/gallery.js` e integrándolo en el orquestador principal `src/js/main.js`.
El desarrollo cubrió dos frentes principales:
1. **Optimización de Rendimiento y Batería:** Implementación de un `IntersectionObserver` que supervisa los 10 videos integrados en las cuadrículas horizontales para pausar su reproducción cuando salen del viewport y reanudarla cuando entran, sumado al apagado durante eventos `visibilitychange`.
2. **Lightbox Multimodal de Alta Fidelidad:** Apertura fluida con aceleración por GPU, inyección reactiva y dinámica de nodos (`<img>` para fotografías y `<video>` con controles nativos), navegación secuencial circular (Prev / Next), soporte de teclado y **destrucción rigurosa de nodos en el DOM** al cerrar para erradicar cualquier fuga de memoria o reproducción de audio en segundo plano.

---

## 2. Acciones Realizadas y Cambios de Código

### A. Módulo JavaScript Autónomo (`src/js/modules/gallery.js`)
- Se creó el módulo modular exportando `initGallery()`.
- Se implementó un *guard clause* de seguridad: si no existen `#lightbox` o tarjetas interactivas, la función finaliza de inmediato sin consumir ciclos de CPU.
- **Orquestación en `src/js/main.js`:** Se registró la importación dinámica asíncrona:
  ```javascript
  { path: './modules/gallery.js', fn: 'initGallery' },
  ```

### B. Optimización de Videos en Cuadrícula (`IntersectionObserver`)
- Se seleccionan todos los elementos `<video>` contenidos en las tarjetas de galería.
- Se configuró un `IntersectionObserver` con umbral `threshold: 0.1`:
  - **Fuera de viewport (`!isIntersecting`):** Ejecuta `video.pause()`.
  - **Dentro de viewport (`isIntersecting`):** Ejecuta `video.play().catch(...)`.
- **Detección de pestaña inactiva:** Al dispararse `visibilitychange` con estado `hidden`, se pausan automáticamente todos los videos de la cuadrícula.

### C. Lógica del Lightbox Multimodal
- **Apertura Dinámica:**
  - Al hacer clic sobre cualquier tarjeta (`.gallery-carousel-card`), se calcula el índice en el array general de medios (34 tarjetas).
  - Se bloquea el scroll del documento: `document.body.style.overflow = 'hidden'`.
  - Se remueve la clase `hidden` y se interpola opacidad (`opacity-0` a `opacity-100`) para una transición GPU limpia sin relayouts.
- **Renderizado Dinámico Multimodal:**
  - Se evalúa el atributo `data-type`:
    - **Si es `image`:** Se instancia un nodo `<img>` con `src`, `alt`, `loading="eager"` y clases `max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl`.
    - **Si es `video`:** Se instancia un nodo `<video>` con `src`, `autoplay`, `controls`, `playsinline` y las mismas restricciones dimensionales responsivas.
- **Navegación Circular (Prev / Next):**
  - Botones `#lightbox-prev` y `#lightbox-next` navegan entre los 34 elementos en loop cerrado (`currentIndex = (currentIndex ± 1 + length) % length`).
  - Al cambiar de diapositiva, se limpia el contenedor previo mediante `innerHTML = ''` antes de inyectar el nuevo nodo.
- **Navegación por Teclado:**
  - Soporte para tecla `Escape` (cierre) y teclas `ArrowLeft` / `ArrowRight` (navegación secuencial).

### D. Destrucción de Nodos y Prevención de Fugas de Memoria
- Al hacer clic en el botón cerrar (`#lightbox-close`) o en el overlay oscuro exterior:
  - Se inicia la transición de salida (`opacity-100` a `opacity-0`).
  - Se restaura el scroll de la página (`document.body.style.overflow = ''`).
  - Tras completar la transición (300ms), se reasigna la clase `hidden` y **se ejecuta `lightboxContent.innerHTML = ''`**.
  - Este vaciado destruye completamente el nodo del video o imagen del DOM, deteniendo inmediatamente la reproducción de audio, liberando buffers de streaming de video y limpiando la memoria VRAM y RAM asignada.

---

## 3. Verificación de Criterios de Aceptación (Definition of Done)

| Criterio | Estado | Evidencia |
| :--- | :---: | :--- |
| **Módulo Vanilla ES6** | ✅ CUMPLIDO | `src/js/modules/gallery.js` creado y enlazado en `src/js/main.js`. |
| **IntersectionObserver para Videos en Grilla** | ✅ CUMPLIDO | Detección de visibilidad con `threshold: 0.1` y pausa en `visibilitychange`. |
| **Renderizado Multimodal Reactivo** | ✅ CUMPLIDO | `<img>` para imágenes y `<video controls autoplay>` para videos en `#lightbox-content`. |
| **Destrucción de Nodos al Cerrar** | ✅ CUMPLIDO | `lightboxContent.innerHTML = ''` ejecutado en cierre para cero fugas de memoria o audio. |
| **Navegación Circular y Teclado** | ✅ CUMPLIDO | Prev/Next y teclas Escape/Flechas operativas en loop continuo de 34 elementos. |
| **Cero Comandos Git Ejecutados** | ✅ CUMPLIDO | Ningún commit, push o manipulación de ramas realizada en cumplimiento estricto. |
| **Compilación Tailwind** | ✅ CUMPLIDO | `pnpm build` ejecutado en 623ms con todas las clases de lightbox generadas. |
