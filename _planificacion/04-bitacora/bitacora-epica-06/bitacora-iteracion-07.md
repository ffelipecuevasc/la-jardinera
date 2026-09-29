# Bitácora de Ejecución - Épica 06 (Fase 2) - Iteración 07

**Fecha de Ejecución:** 19 de Septiembre de 2026  
**Iteración:** 07 de 12  
**Épica:** 06 — Consolidación Global de Navegación, Paridad Móvil, Página 404 y Optimización del Header Móvil  
**Objetivo:** Implementación del Header Maestro en `index.html` (Opción 1-A + Opción 2-B) y actualización modular retrocompatible de `src/js/modules/navigation.js`.  
**Estándar de Calidad:** Demostrado en render real (Headless Edge / CDP) con 0 errores y cero regresiones.

---

## 1. Resumen Ejecutivo

En esta Iteración 07 se inauguró la **Fase 2 de la Épica 06**, orientada a solucionar los defectos detectados en dispositivos móviles reales donde el header colapsaba por sobrecarga visual (470 px requeridos vs. 360–410 px disponibles) y el menú desplegable (`fixed inset-0`) quedaba confinado a la altura de la barra (80 px) debido al `backdrop-blur-xl` del `<header>`.

Se aplicó la **Opción 1-A** (cabecera esencial en móvil con marca en una sola línea, conmutador de tema de 44 px, botón hamburguesa de 44 px y redes sociales movidas al panel) y la **Opción 2-B** (panel anclado bajo la barra mediante `absolute top-full` y capa tenue `#mobile-menu-scrim` como nodo hermano del `<header>`). Se refactorizó `src/js/modules/navigation.js` incorporando soporte para teclado (`Escape`), sincronización de breakpoint de escritorio (`min-width: 1024px`), cambio reactivo de íconos (hamburguesa ☰ / cierre ✕), atributos ARIA dinámicos y retrocompatibilidad total para las páginas que aún no han sido migradas.

La compilación mediante `pnpm build` finalizó limpiamente en 633 ms, y todos los escenarios (1 a 5) fueron evaluados y certificados mediante emulación y render real a través de Microsoft Edge Headless vía Chrome DevTools Protocol (CDP).

---

## 2. Acciones Realizadas y Cambios de Código

### Tarea 1: Módulo `src/js/modules/navigation.js`
Se reescribió `src/js/modules/navigation.js` conservando la exportación `initNavigation` (sin tocar `main.js`). Se encapsularon selectores en caché, delegación de eventos en clics de enlaces, detección de capa tenue opcional mediante encadenamiento opcional (`?.`), listener de teclado para `Escape` retornando el foco a `#mobile-menu-btn`, y listener `change` sobre `window.matchMedia('(min-width: 1024px)')` para autocerrar el menú si se rota el dispositivo o se ensancha el viewport.

```js
const LABEL_OPEN = 'Abrir menú';
const LABEL_CLOSE = 'Cerrar menú';
const DESKTOP_QUERY = '(min-width: 1024px)'; // Breakpoint `lg` de Tailwind

export function initNavigation() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (!menuBtn || !menu) return;

    const scrim = document.getElementById('mobile-menu-scrim');
    const iconOpen = document.getElementById('mobile-menu-icon-open');
    const iconClose = document.getElementById('mobile-menu-icon-close');
    const desktopMedia = window.matchMedia(DESKTOP_QUERY);

    const isOpen = () => !menu.classList.contains('hidden');

    const setOpen = (open) => {
        menu.classList.toggle('hidden', !open);
        scrim?.classList.toggle('hidden', !open);
        iconOpen?.classList.toggle('hidden', open);
        iconClose?.classList.toggle('hidden', !open);
        document.body.classList.toggle('overflow-hidden', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? LABEL_CLOSE : LABEL_OPEN);
    };

    menuBtn.addEventListener('click', () => setOpen(!isOpen()));

    menu.addEventListener('click', (event) => {
        if (event.target.closest('a')) setOpen(false);
    });

    scrim?.addEventListener('click', () => setOpen(false));

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isOpen()) {
            setOpen(false);
            menuBtn.focus();
        }
    });

    desktopMedia.addEventListener('change', (event) => {
        if (event.matches && isOpen()) setOpen(false);
    });
}
```

### Tarea 2 y 3: Bloque de Marca y Clúster de Acciones en `index.html`
- **Bloque de marca:** Se compactó a `flex items-center gap-3 sm:gap-4 group`. Se añadió `shrink-0` a los logotipos PNG, se ocultó el separador vertical en móvil (`hidden sm:block`) y se garantizó que el nombre "La Jardinera" mantenga `whitespace-nowrap`, escalando de `text-headline-sm` (18 px) en móvil a `sm:text-headline-md` (24 px) en pantallas superiores.
- **Clúster de acciones:** Se modificó el contenedor a `flex items-center gap-2 lg:gap-space-3`.
  - Redes Instagram y WhatsApp: configuradas con `hidden lg:flex` para despejar completamente la barra móvil.
  - Botón de tema `#theme-toggle-btn`: ampliado a `w-11 h-11 lg:w-9 lg:h-9` (44 px en móvil, 36 px en desktop).
  - Botón hamburguesa `#mobile-menu-btn`: dimensionado a `w-11 h-11` (44 px), con SVG de apertura (`#mobile-menu-icon-open`) y SVG de cierre (`#mobile-menu-icon-close hidden`).

### Tarea 4: Sustitución del Drawer por Panel Anclado y Capa Tenue
- Se purgó íntegramente el drawer `fixed inset-0` interno que colapsaba por el `backdrop-blur-xl`.
- Se inyectó el panel anclado `#mobile-menu` inmediatamente antes de `</header>`:
  - Posicionamiento: `absolute top-full left-0 w-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain`.
  - Superficie: sólida `bg-surface dark:bg-dark-surface-container-low` con borde superior sutil y sombra difusa.
  - Navegación móvil con "Inicio" como enlace activo (`aria-current="page"` y `text-primary font-semibold`), enlaces con altura mínima táctil `min-h-[3rem]`.
  - Botones de contacto en fila inferior: WhatsApp destacado (`bg-primary/10 text-primary`) e Instagram (`bg-surface-container text-on-surface-variant`), con sus vectores SVG completos e idénticos a los del header.
- Se inyectó `#mobile-menu-scrim` como **nodo hermano** inmediatamente después de `</header>`:
  ```html
  <!-- Capa tenue del menú móvil: HERMANA del <header>, jamás dentro de él -->
  <div id="mobile-menu-scrim" class="hidden lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-neutral-900/40" aria-hidden="true"></div>
  ```

---

## 3. Verificación de Criterios de Aceptación (Render Real)

La verificación se realizó sirviendo el proyecto localmente vía HTTP y orquestando pruebas forenses en Microsoft Edge Headless mediante Chrome DevTools Protocol (CDP).

| Escenario | Criterio de Aceptación | Estado | Evidencia Demostrada en Render Real |
|:---|:---|:---:|:---|
| **Escenario 1** | Cabecera Esencial sin Desbordes (320, 360, 412, 768, 740x360) | ✅ CUMPLIDO | Evaluado en viewports reales: `hasHScroll: false` en todos ellos (320px: `docWidth: 320`, `winWidth: 320`). Nombre de marca ocupa 1 sola línea (`brandLineCount: 1`, `brandWhiteSpace: nowrap`, 18px en `<sm`, 24px en `>=sm`). Redes en barra: `igVisible: false`, `waVisible: false`. Tamaño de botones táctiles: `themeSize: [44, 44]`, `menuSize: [44, 44]`. |
| **Escenario 2** | Panel Anclado, Legible y con Estado Activo | ✅ CUMPLIDO | Apertura anclada confirmada: `menuPos: "absolute"`, `menuTop: 80`, `headerBottom: 80`, `menuWidth: 360`. Fondo sólido `rgb(248, 250, 244)` sin transparencias residuales ni problemas de contraste sobre el Hero. 5 enlaces listados con altura 48 px (`min-h-[3rem]`), "Inicio" con `ariaCurrent: "page"` y `text-primary font-semibold`. Botones de WhatsApp e Instagram presentes con 48 px de alto. En viewport bajo (740×360 landscape): `maxHeight: "280px"`, `scrollHeight: 328`, `clientHeight: 279`, activando scroll interno `hasInternalScroll: true` sin desborde de ventana. |
| **Escenario 3** | Cierre, Teclado y Accesibilidad | ✅ CUMPLIDO | Al presionar `Escape`: menú cerrado (`menuHiddenAfterEsc: true`, `scrimHiddenAfterEsc: true`), `ariaExpanded: "false"`, `ariaLabel: "Abrir menú"`, y foco devuelto exactamente al botón (`focusedElementId: "mobile-menu-btn"`). Cierre verificado por clic en capa tenue (`Closed after scrim click: true`), por clic en enlace interno (`Closed after link click: true`) y por redimensionamiento a `>= 1024px` (`Closed after resize to 1280px: true`). Alternancia de íconos: con menú abierto `iconOpenHidden: true`, `iconCloseHidden: false`; con menú cerrado `iconOpenHidden: false`, `iconCloseHidden: true`. |
| **Escenario 4** | Cero Regresión en Escritorio (>= 1024px) y Portada | ✅ CUMPLIDO | En 1280×800: `desktopNavVisible: true`, `igVisible: true`, `waVisible: true`, `themeBtnSize: [36, 36]`, `menuBtnVisible: false`, `menuVisible: false`, `scrimVisible: false`. Alternancia de tema funcional con `document.documentElement.classList.contains('dark')` cambiando a `true`. Hero, carrusel de testimonios y enlaces intactos. Errores de consola: 0 (`Console API calls logged: 0`). |
| **Escenario 5** | Retrocompatibilidad con `servicios.html` (Solo Lectura) | ✅ CUMPLIDO | Inspección en `servicios.html` sin modificar su código: `hasBtn: true`, `hasMenu: true`, `hasScrim: false`. Al invocar `#mobile-menu-btn`: drawer abre (`menuHiddenAfterClick: false`, `bodyOverflowHidden: true`, `ariaExpanded: "true"`). Segundo clic: drawer cierra (`menuHiddenAfterClose: true`, `bodyOverflowHidden: false`, `ariaExpanded: "false"`). Sin errores de ejecución ni dependencias rotas. |

### Invariantes Verificadas por Código
- **Cero descendientes `fixed` dentro del `<header>`:** Confirmado `null` en todos los hijos del header.
- **IDs únicos:** `mobile-menu-btn` (1), `mobile-menu` (1), `mobile-menu-scrim` (1), `mobile-menu-icon-open` (1), `mobile-menu-icon-close` (1).
- **Hermandad de scrim:** `#mobile-menu-scrim` es el nodo hermano inmediato de cierre de `</header>`.
- **Cero estilos en línea en el header o scrim:** `null`.
- **Cero `href="#"` en navegación y footer:** `false` (los únicos `href="#"` del documento pertenecen a las tarjetas de galería en el `<main>`).

---

## 4. Desviaciones y Advertencias Externas

- **Compilación de Tailwind CSS:** Durante `pnpm build` se emitió la advertencia estándar:
  ```
  Browserslist: caniuse-lite is outdated. Please run:
    npx update-browserslist-db@latest
  ```
  En estricto cumplimiento de las directivas, **NO se modificaron** dependencias ni el archivo `package.json`/lockfile, manteniéndose intacto el entorno determinista.
- No se registraron desviaciones en la arquitectura, tokens ni especificaciones del diseño.

---

## 5. Confirmación de Restricción Git y Alcance de Archivos

- **Comandos Git ejecutados:** **0** (cumplimiento estricto al 100% de la directriz).
- **Lista cerrada de archivos modificados / creados:**
  1. `src/js/modules/navigation.js` (código actualizado y retrocompatible).
  2. `index.html` (header maestro, panel anclado y scrim).
  3. `dist/css/output.css` (recompilado con Tailwind CSS CLI).
  4. `_antigravity/04-bitacora/bitacora-epica-06/bitacora-iteracion-07.md` (bitácora creada).
  5. `_antigravity/04-bitacora/estado-actual.md` (registro de cierre de iteración añadido al final).
