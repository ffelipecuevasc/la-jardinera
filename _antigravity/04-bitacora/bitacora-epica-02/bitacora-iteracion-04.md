# Bitácora de Auditoría y Desarrollo - Épica 02 | Iteración 04

## 1. Resumen Ejecutivo
Se completó de forma exitosa la **Iteración 04 de la Épica 02 (Página de Servicios)**: **Accesibilidad (a11y), Focus Trap y Pulido Final (Dark Mode)**.
El componente Modal de Servicios ha sido elevado a los más altos estándares de accesibilidad **WCAG 2.1 nivel AA**, implementando aislamiento total del árbol de accesibilidad mediante manipulación de los atributos `inert` y `aria-hidden` en las regiones de fondo (`<header>`, `<main>`, `<footer>`), ciclo de tabulación blindado (Focus Trap) y retorno de foco al disparador. Adicionalmente, se completó la auditoría y aplicación exhaustiva de clases para **Modo Oscuro**, garantizando relaciones de contraste óptimas y continuidad estética en ambos temas.

---

## 2. Acciones Realizadas y Cambios de Código

### A. Semántica y Atributos ARIA (HTML en `servicios.html`)
- **Contenedor Principal (`#service-modal`):**
  - `role="dialog"`: Declara semánticamente el contenedor como una ventana de diálogo superpuesta.
  - `aria-modal="true"`: Informa a los agentes de usuario asistivos que el contenido exterior es inerte.
  - `aria-hidden="true"`: Oculto en reposo; se actualiza a `false` reactivamente en JS al abrirse.
  - `aria-labelledby="modal-title"`: Asocia dinámicamente el nombre accesible del diálogo con el encabezado `<h3>` del servicio activo.
- **Botón de Cierre (`.close-modal-btn`):**
  - Se asignó `aria-label="Cerrar ventana de detalles del servicio"`, proporcionando una descripción auditiva unívoca para tecnologías asistivas.

### B. Aislamiento del Fondo y Focus Trap (`src/js/modules/modal.js`)
- **Bloqueo Perimetral (Screen Readers & Pointer/Tab):**
  - Se implementó la función `setBackgroundAriaHidden(isHidden)`.
  - Al abrirse cualquier modal (de servicio o genérico), se inyectan simultáneamente los atributos `inert` y `aria-hidden="true"` a las etiquetas `<header>`, `<main>` y `<footer>`. Esto previene que un lector de pantalla navegue accidentalmente por el contenido de fondo mientras el modal está activo.
  - Al cerrarse el modal, se eliminan completamente dichos atributos, restaurando la interactividad nativa del documento.
- **Captura y Ciclo de Teclado (Focus Trap):**
  - Al abrirse, el foco se posiciona de inmediato en el botón de cierre (`.close-modal-btn`).
  - La navegación con `Tab` y `Shift+Tab` queda confinada estrictamente a los elementos interactivos del modal (botón de cierre, imágenes de galería y botón de cotización).
  - La tecla `Escape` cierra suavemente el modal.
  - Al completarse el cierre, el foco del teclado es devuelto con precisión quirúrgica al elemento disparador (`previouslyFocusedBtn.focus()`).

### C. Pulido Estético en Modo Oscuro (Dark Mode en `servicios.html` y `services.js`)
Se reforzó el contraste y la fidelidad cromática utilizando los tokens del sistema de diseño:
1. **Panel Principal (`.modal-panel`):**
   - `bg-surface dark:bg-dark-background`
   - `border border-outline-variant/30 dark:border-dark-surface-variant`
2. **Columna de Textura y Retrato (`.modal-texture-bg`):**
   - `bg-surface-container-low dark:bg-dark-surface-container-low`
   - `border-outline-variant/20 dark:border-dark-surface-variant`
3. **Anillo SVG Ornamental:**
   - Círculo base: `fill-surface-container dark:fill-dark-surface-variant/30 stroke-outline-variant/30 dark:stroke-dark-surface-variant`.
   - Círculo animado: `stroke-primary` (resuelve reactivamente a `#8CC79A` en tema oscuro, garantizando contraste AA sobre el fondo).
4. **Cuerpo Derecho y Contenido Dinámico:**
   - Título: `text-on-surface dark:text-dark-on-background`.
   - Subtítulo Galería: `text-on-surface dark:text-dark-on-background` con borde `border-outline-variant/30 dark:border-dark-surface-variant`.
   - Descripción (`#modal-description`): `text-on-surface-variant dark:text-dark-on-surface-variant`.
   - Listas y subtítulos en `src/js/data/services.js`: Clases `dark:text-dark-on-background` y `dark:text-dark-on-surface-variant` inyectadas en las descripciones HTML.
5. **Botones e Interactividad:**
   - Botón Cerrar: `dark:bg-dark-surface-variant/40 dark:hover:bg-dark-surface-variant dark:text-dark-on-surface-variant dark:hover:text-primary`.
   - Botón Cotizar: `text-white dark:text-neutral-950 bg-primary hover:bg-primary/90`.

---

## 3. Verificación de Criterios de Aceptación (Definition of Done)

| Criterio | Estado | Evidencia |
| :--- | :---: | :--- |
| **Semántica ARIA Completa** | ✅ CUMPLIDO | `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`, `aria-label` en cierre. |
| **Aislamiento de Fondo (`inert` / `aria-hidden`)** | ✅ CUMPLIDO | `<header>`, `<main>` y `<footer>` quedan inertes mientras el modal está activo. |
| **Focus Trap Bidireccional & Escape** | ✅ CUMPLIDO | Foco confinado en ciclo `Tab`/`Shift+Tab`, tecla `Escape` operativa y foco devuelto al disparador. |
| **Contraste Dark Mode (WCAG AA)** | ✅ CUMPLIDO | Clases `dark:` aplicadas a panel, textura, SVG, títulos, textos y botones. |
| **Compilación CSS** | ✅ CUMPLIDO | `pnpm build` ejecutado en 501ms sin errores. |
| **Cero Regresión UTF-8** | ✅ CUMPLIDO | 0 caracteres corruptos o mojibake en todos los módulos. |
