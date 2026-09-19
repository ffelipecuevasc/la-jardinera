# Bitácora de Ejecución - Épica 06 (Fase 2) - Iteración 08

**Fecha de Ejecución:** 19 de Septiembre de 2026  
**Iteración:** 08 de 12  
**Épica:** 06 — Consolidación Global de Navegación, Paridad Móvil, Página 404 y Optimización del Header Móvil  
**Objetivo:** Replicación del Header Maestro en `servicios.html` (Opción 1-A: cabecera esencial en móvil + Opción 2-B: panel de navegación anclado bajo la cabecera con capa tenue), dejando "Servicios" como único enlace activo.  
**Estándar de Calidad:** Demostrado en render real (Headless Edge / CDP) con 0 errores y cero regresiones.

---

## 1. Resumen Ejecutivo

En esta Iteración 08 se abordó la migración del header en `servicios.html`, replicando con fidelidad absoluta la arquitectura de navegación móvil y de escritorio certificada en `index.html` durante la Iteración 07.

Antes de la intervención, `servicios.html` reproducía el defecto estructural crítico del proyecto original: un drawer desplegable (`#mobile-menu`) con posicionamiento `fixed inset-0` anidado directamente dentro del `<header>` que poseía `backdrop-blur-xl`. Por especificación CSS, el filtro de desenfoque convertía al `<header>` en el bloque contenedor (*containing block*) de sus descendientes fijos, atrapando al menú dentro de los 80 px de altura de la cabecera y provocando que enlaces esenciales (como "Inicio") quedaran desplazados a coordenadas negativas (`top: -48px`), completamente fuera de la pantalla. Adicionalmente, la marca carecía de escalado tipográfico y `whitespace-nowrap`, el separador vertical no se ocultaba en pantallas angostas, las redes sociales saturaban la barra superior y los botones táctiles no alcanzaban los 44 px requeridos por WCAG 2.1.

La intervención resolvió todos estos síntomas mediante:
1. **Opción 1-A (Cabecera Esencial en Móvil):** Marca compacta en una sola línea con escalado fluido (`text-headline-sm` a `sm:text-headline-md`), separador condicional (`hidden sm:block`), redes sociales reubicadas fuera de la barra en dispositivos móviles (`hidden lg:flex`), y botones táctiles (#theme-toggle-btn y #mobile-menu-btn) con dimensiones mínimas de 44 × 44 px.
2. **Opción 2-B (Panel Anclado y Capa Tenue):** Sustitución del drawer confinado por un panel desplegable `#mobile-menu` posicionado de manera absoluta bajo la barra (`absolute top-full left-0 w-full max-h-[calc(100dvh-5rem)]`), complementado por la capa tenue `#mobile-menu-scrim` inyectada como **nodo hermano inmediato** posterior a `</header>`.
3. **Estado Activo Exclusivo en "Servicios":** Configuración de `aria-current="page"` y `text-primary font-semibold` tanto en el enlace de la navegación de escritorio como en el panel móvil, manteniendo los restantes enlaces neutros.
4. **Cero Regresiones en el Catálogo y Modal de Servicios:** Las 8 tarjetas de servicio con `data-service-id`, la franja de beneficios operativos, y el modal interactivo `#service-modal` (con Focus Trap, animaciones y galería dinámica) mantuvieron su funcionamiento impecable.

La verificación en render real mediante Microsoft Edge Headless v140 a través del protocolo CDP certificó el cumplimiento riguroso de todos los criterios en múltiples viewports (320px a 1280px, horizontal y vertical), confirmando 0 desbordes horizontales, 0 errores de consola y total paridad estructural con `index.html`.

---

## 2. Línea Base y Reproducción Forense del Defecto Original

Antes de realizar modificaciones sobre `servicios.html`, se calcularon los hashes criptográficos SHA-256 de los archivos de solo lectura y de las secciones intocadas del documento, y se ejecutó un script forense en Edge Headless (360 × 740 px) para documentar cuantitativamente la falla previa.

### Hashes de Línea Base (SHA-256)
- `index.html`: `5F66340FA54B5592411CCC950D5C308073589380973AA0B033C9D051E9902661`
- `suscripcion-floral.html`: `D53E5D0170DD126A1EA7D864A25386132C987D951B6E1AAECDF9CAE54897ECE1`
- `galeria.html`: `6D1A08CEDC260A609589DF1E306BA8B8D952C08369FFA2674C7793B3E9F23856`
- `contacto.html`: `6DB423FB4BD52AC8A88A9500132AD8B748475707AAC7E451F5283F11DE789298`
- `404.html`: `DA1A396A87D018AE1864E9BCE90027205DBDF1B93EEEFAE08BF1792B1622E35B`
- `src/js/modules/navigation.js`: `5302EABD376D4A4AFF096AFFAD1C2DED8053F386EE81CE581AA8088830AA15A6`
- `src/js/main.js`: `E73CBB00959CB02421B570F88A6D0FAE0ED6CE33ED37D8C10B92D1F27995436B`
- `src/js/modules/theme.js`: `DC72FDE50A03D04AC9A7228DA5D28764C72617FB2C3278F005DE5D306F5B0D80`
- `src/js/modules/modal.js`: `92C2A64AC13483936DBA199FEB1D540414DC6DB302E581E1485B8D1FF1A50055`
- `tailwind.config.js`: `44FBEC39C4A8C6927EC499E017254C0545587C8938E33B6A9B7C7861D796D481`
- `src/css/input.css`: `ACC4E33CB3267C3613E423E31C89EE2930EBDB7C6D858B22E3D3832E37E93F28`
- `package.json`: `7FC8582F3BC40A4CF9C11D8F70C4016D8F7E4FB9421ED2865E0F2BE7DB1E50C2`
- `dist/css/output.css` (Iteración 07): `943079B25B3A356E7EF132DF524DDDD8DDE73D561A766E924B351DB9C073623A`

**Secciones intocadas de `servicios.html` (Línea Base):**
- `<head>`: `D9E26C659BB1440B41C1138107F99E4EF1623A355CF82E0629ECF89C23486E96`
- `<main>`: `95815A970666A28B627148DF911AA20DD1AE07D980A93E3E96E087AD6F2E8DF7`
- `<footer>`: `9D11F39E4ADB1CDAECB3D5534808CE006500E6A17EF9190222030B6627031347`

### Reproducción Forense del Defecto en Render Real
Mediciones extraídas en Edge Headless al invocar `#mobile-menu-btn` en el estado no modificado:
- **`headerRect`:** `{ top: 0, height: 80, width: 360 }`
- **`menuRect`:** `{ top: 0, height: 80, width: 360 }` *(confinado rígidamente al header por `backdrop-filter`)*.
- **Posición de enlaces:**
  - "Inicio": `top: -48px` *(coordenada negativa; completamente invisible e inalcanzable)*.
  - "Servicios": `top: 8px`
  - "Suscripción Floral": `top: 64px`
  - "Galería": `top: 120px` *(desbordado por debajo del contenedor)*.
  - "Contacto": `top: 176px` *(desbordado por debajo del contenedor)*.
- **Capa tenue `#mobile-menu-scrim`:** `hasScrim: false` *(inexistente)*.

---

## 3. Acciones Realizadas y Cambios de Código

### Tarea 1: Compactación del Bloque de Marca en `servicios.html`
Se actualizaron quirúrgicamente las clases del enlace y sus elementos hijos para eliminar el riesgo de saltos de línea en viewports de 320–412 px:
- Enlace `<a>`: clase `flex items-center gap-4 group` actualizada a `flex items-center gap-3 sm:gap-4 group`.
- Logotipos `<img>` (ambas variantes): se añadió `shrink-0` para prevenir colapso de relación de aspecto.
- Separador vertical `<div>`: se antepuso `hidden sm:block` para suprimirlo en móviles.
- Texto del logotipo `<span>`: actualizado a `font-headline-md text-headline-sm sm:text-headline-md italic tracking-tight whitespace-nowrap fx-spotlight` (18 px en móvil, 24 px en `>=sm`).

### Tarea 2: Racionalización del Clúster de Acciones
- Contenedor del clúster ajustado a `flex items-center gap-2 lg:gap-space-3`.
- Redes sociales Instagram y WhatsApp ocultadas en móvil y tablet mediante `hidden lg:flex`, despejando el espacio para los controles esenciales.
- Conmutador de tema `#theme-toggle-btn` adaptado con área táctil accesible: `w-11 h-11 lg:w-9 lg:h-9` (44 px en móvil / 36 px en escritorio).
- Botón hamburguesa `#mobile-menu-btn` estandarizado a `w-11 h-11` (sin `ml-2`), incorporando los dos estados de SVG: `#mobile-menu-icon-open` y `#mobile-menu-icon-close` (`hidden`).

### Tarea 3: Sustitución del Drawer por Panel Anclado y Capa Tenue
- Se eliminó el antiguo `div#mobile-menu` con `fixed inset-0` y se reemplazó por el panel anclado inmediatamente antes de `</header>`:
  ```html
  <div id="mobile-menu" class="hidden lg:hidden absolute top-full left-0 w-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-surface dark:bg-dark-surface-container-low border-t border-outline-variant/30 shadow-[0_8px_24px_rgba(53,54,58,0.12)]">
      <nav class="flex flex-col px-margin-mobile" aria-label="Navegación móvil">
          <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="inicio" href="./index.html">Inicio</a>
          <a aria-current="page" class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-primary font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="servicios" href="./servicios.html">Servicios</a>
          <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="suscripcion-floral" href="./suscripcion-floral.html">Suscripción Floral</a>
          <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="galeria" href="./galeria.html">Galería</a>
          <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="contacto" href="./contacto.html">Contacto</a>
      </nav>
      <div class="flex items-stretch gap-space-2 px-margin-mobile pt-space-2 pb-space-3">
          <a class="flex flex-1 items-center justify-center gap-2 min-h-[3rem] rounded-xl bg-primary/10 text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
             href="https://wa.me/56997702832" target="_blank" rel="noopener noreferrer">
              ...
              <span>WhatsApp</span>
          </a>
          <a class="flex flex-1 items-center justify-center gap-2 min-h-[3rem] rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider hover:text-primary hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
             href="https://www.instagram.com/lajardinera.floreria/" target="_blank" rel="noopener noreferrer">
              ...
              <span>Instagram</span>
          </a>
      </div>
  </div>
  ```
- Se inyectó `#mobile-menu-scrim` como nodo hermano inmediato tras `</header>`:
  ```html
  <!-- Capa tenue del menú móvil: HERMANA del <header>, jamás dentro de él -->
  <div id="mobile-menu-scrim" class="hidden lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-neutral-900/40" aria-hidden="true"></div>
  ```
- Se estableció "Servicios" como único enlace activo tanto en la barra de escritorio (`aria-current="page"`, `text-primary`, subrayado `scale-x-100`) como en el panel móvil (`aria-current="page"`, `text-primary font-semibold`), manteniendo todos los demás enlaces neutros (`text-on-surface-variant`).

---

## 4. Compilación y Validación de CSS

Se ejecutó la compilación de estilos mediante el comando oficial:
```bash
pnpm build
```
- **Resultado:** Tailwind CSS v3.4.19 generó `dist/css/output.css` minificado en 739 ms.
- **Tamaño:** `43,568 bytes`.
- **Hash SHA-256:** `943079B25B3A356E7EF132DF524DDDD8DDE73D561A766E924B351DB9C073623A`.
- **Concordancia con Iteración 07:** **100% IDÉNTICO**. La compilación no requirió añadir clases adicionales ya que todo el set de utilidades Tailwind empleado en `servicios.html` formaba parte del compilado maestro de la Iteración 07.

---

## 5. Verificación de Criterios de Aceptación (Render Real)

Todas las pruebas se ejecutaron mediante Microsoft Edge Headless sobre un servidor HTTP local sirviendo la raíz del proyecto, evaluando el DOM y render computado mediante Chrome DevTools Protocol (CDP).

| Escenario | Criterio de Aceptación | Estado | Evidencia Demostrada en Render Real |
|:---|:---|:---:|:---|
| **Escenario 1** | Cabecera Esencial sin Desbordes (320, 360, 412, 768, 740x360) | ✅ CUMPLIDO | Evaluado en todos los viewports: `hasHScroll: false` (320px: `docWidth: 320`, `winWidth: 320`). Marca en 1 sola línea (`brandWhiteSpace: "nowrap"`, font-size `18px` en móvil, `24px` en tablet/landscape). Separador vertical: `display: "none"` en móvil (<sm), `display: "block"` en tablet/landscape. Redes en barra superior: `igVisible: false`, `waVisible: false`. Tamaño de botones táctiles: `themeBtnSize: [44, 44]`, `menuBtnSize: [44, 44]`. |
| **Escenario 2** | Panel Anclado, Legible y con Estado Activo | ✅ CUMPLIDO | Panel abierto: `menuPosition: "absolute"`, `menuTop: 80`, `headerBottom: 80`, `menuWidth: 360`. "Inicio" en `top: 81px` (completamente visible, sin corte superior). 5 enlaces listados con altura `48px` (`min-h-[3rem]`). "Servicios" con `ariaCurrent: "page"` y clases `text-primary font-semibold`; enlaces restantes con `text-on-surface-variant`. Fila inferior con botones WhatsApp e Instagram de `48px` de altura. En 740×360 (landscape): `maxHeight: "280px"`, `scrollHeight: 328`, `clientHeight: 279`, activando scroll interno `hasInternalScroll: true`. |
| **Escenario 3** | Cierre, Teclado y Accesibilidad | ✅ CUMPLIDO | Al presionar `Escape`: menú cerrado (`menuHiddenAfterEsc: true`, `scrimHiddenAfterEsc: true`), `ariaExpanded: "false"`, `ariaLabel: "Abrir menú"`, y foco devuelto exactamente al botón (`focusedElementId: "mobile-menu-btn"`). Cierre verificado por clic en capa tenue (`closedAfter: true`), por clic en enlace interno (`closedAfterLinkClick: true`) y por redimensionamiento a desktop (`menuHiddenAfterResize: true`). Alternancia de íconos: abierto con `iconOpenHidden: true` y `iconCloseHidden: false`; cerrado con `iconOpenHidden: false` y `iconCloseHidden: true`. |
| **Escenario 4** | Cero Regresión en Escritorio (>= 1024px) | ✅ CUMPLIDO | En 1280×800: `desktopNavDisplay: "flex"`, `igDisplay: "flex"`, `waDisplay: "flex"`, `themeBtnSize: [36, 36]`, `menuBtnDisplay: "none"`, `menuDisplay: "none"`, `scrimDisplay: "none"`. "Servicios" como único enlace activo en escritorio (`ariaCurrent: "page"`, `isTextPrimary: true`, `underlineActive: true`), los demás neutros (`isTextOnSurfaceVariant: true`, `underlineActive: false`). Alternancia de tema funcional con sincronización View Transitions (`themeToggledSuccessfully: true`). Errores de consola: 0 (`Logged console calls: 0`). |
| **Escenario 5** | Interacción con Service Modal (`#service-modal`) | ✅ CUMPLIDO | Apertura al pulsar "Ver más" en tarjeta de servicio: modal visible (`modalHiddenOpen: false`), título poblado dinámicamente ("Suscripción floral"), scroll del body bloqueado (`bodyOverflowModal: true`). Cierre mediante botón de cierre con transición: modal oculto tras 300 ms (`modalHiddenAfterClose: true`), scroll del body desbloqueado (`bodyOverflowAfterClose: false`). Ningún conflicto de foco ni superposición con el menú móvil. |

### Invariantes Verificadas por Código
- **Cero descendientes `fixed` dentro del `<header>`:** Confirmado `false` (ningún elemento hijo posee la clase `fixed`).
- **IDs únicos en el documento:**
  - `mobile-menu-btn`: 1
  - `mobile-menu`: 1
  - `mobile-menu-scrim`: 1
  - `mobile-menu-icon-open`: 1
  - `mobile-menu-icon-close`: 1
  - `theme-toggle-btn`: 1
- **Hermandad de la capa tenue:** `#mobile-menu-scrim` es el nodo hermano inmediato de cierre de `</header>`.
- **Cero estilos en línea en `<header>` y `#mobile-menu-scrim`:** Confirmado `NONE`.
- **Cero `href="#"` en header y panel:** Confirmado `false` (0 ocurrencias de `href="#"` en la navegación).
- **Paridad con `index.html`:** Longitud del bloque `<header>` idéntica (20,913 caracteres), difiriendo simétricamente únicamente en la asignación del enlace activo.

### Integridad de Secciones No Modificadas
Se comprobó mediante SHA-256 que las secciones protegidas de `servicios.html` no sufrieron alteración:
- `<head>`: `D9E26C659BB1440B41C1138107F99E4EF1623A355CF82E0629ECF89C23486E96` (Match: true)
- `<main>`: `95815A970666A28B627148DF911AA20DD1AE07D980A93E3E96E087AD6F2E8DF7` (Match: true)
- `<footer>`: `9D11F39E4ADB1CDAECB3D5534808CE006500E6A17EF9190222030B6627031347` (Match: true)

---

## 6. Desviaciones y Advertencias Externas

- **Advertencia en compilación de Tailwind CSS:** Durante `pnpm build` se emitió la advertencia usual:
  ```
  Browserslist: caniuse-lite is outdated. Please run:
    npx update-browserslist-db@latest
  ```
  En estricto apego a las directivas de alcance cerrado, **NO se modificaron** dependencias ni los archivos de configuración (`package.json`, lockfile).
- No se registraron desviaciones en la arquitectura, tokens ni especificaciones del diseño.

---

## 7. Confirmación de Restricción Git y Alcance de Archivos

- **Comandos Git ejecutados:** **0** (cumplimiento estricto al 100% de la directriz).
- **Lista cerrada de archivos modificados / creados:**
  1. `servicios.html` (intervención exclusiva en `<header>` y `#mobile-menu-scrim`).
  2. `dist/css/output.css` (recompilado vía `pnpm build`, hash certificado).
  3. `_antigravity/04-bitacora/bitacora-epica-06/bitacora-iteracion-08.md` (archivo nuevo de bitácora).
  4. `_antigravity/04-bitacora/estado-actual.md` (adición de línea de cierre al final).
