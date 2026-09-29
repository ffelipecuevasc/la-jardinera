# Bitácora de Ejecución - Épica 06 (Fase 2) - Iteración 10

**Fecha de Ejecución:** 19 de Septiembre de 2026  
**Iteración:** 10 de 12  
**Épica:** 06 — Consolidación Global de Navegación, Paridad Móvil, Página 404 y Optimización del Header Móvil  
**Objetivo:** Replicación del Header Maestro en `galeria.html` (Opción 1-A: cabecera esencial en móvil + Opción 2-B: panel de navegación anclado bajo la cabecera con capa tenue), dejando "Galería" como único enlace activo y certificando la no-regresión integral en el acordeón de 34 tarjetas (24 imágenes, 10 videos) y en el Lightbox multimodal accesible.  
**Estándar de Calidad:** Demostrado en render real (Headless Edge v140 / CDP) con 0 errores y cero regresiones.

---

## 1. Resumen Ejecutivo

En esta Iteración 10 se realizó la intervención exclusiva en `galeria.html` para replicar el header maestro unificado y certificado en las iteraciones previas (`index.html`, `servicios.html`, `suscripcion-floral.html`).

Antes de la intervención, `galeria.html` padecía el defecto estructural crítico de confinamiento del drawer móvil: al poseer el elemento desplegable `#mobile-menu` con posicionamiento `fixed inset-0` anidado directamente dentro del `<header>` que utilizaba la clase utilitaria `backdrop-blur-xl`, el navegador creaba un nuevo bloque contenedor (*containing block*). Esto restringía la altura del menú a los 80 px del header, expulsando el primer enlace ("Inicio") a una coordenada vertical negativa (`top: -48px`, fuera de la pantalla visible), impidiendo la interacción del usuario. Asimismo, la cabecera no disponía de capa tenue `#mobile-menu-scrim`, los botones táctiles medían 36 × 36 px (por debajo del umbral táctil WCAG de 44 px), el logotipo en pantallas intermedias sufría un salto de línea indebido a 1024 px (`brandLines: 2`), y las redes sociales saturaban la barra superior en lugar de ubicarse en el panel desplegable.

La intervención técnica se ejecutó mediante encofrado quirúrgico, logrando:
1. **Opción 1-A (Cabecera Esencial en Móvil):** Estandarización del logotipo con `whitespace-nowrap`, escalado de texto de `text-headline-sm` a `sm:text-headline-md` y `shrink-0` en las imágenes de isotipo; ocultamiento del separador vertical en pantallas `<sm` (`hidden sm:block`); ocultamiento de redes sociales en resoluciones móviles y tablets (`hidden lg:flex`); y botones táctiles `#theme-toggle-btn` y `#mobile-menu-btn` escalados a 44 × 44 px (`w-11 h-11`).
2. **Opción 2-B (Panel Anclado y Capa Tenue):** Sustitución del drawer defectuoso por un panel `#mobile-menu` posicionado absolutamente bajo la cabecera (`absolute top-full left-0 w-full max-h-[calc(100dvh-5rem)]`), complementado con la inyección de `#mobile-menu-scrim` como **nodo hermano inmediato posterior** a `</header>`.
3. **Estado Activo Exclusivo en "Galería":** Enlace "Galería" configurado con `aria-current="page"` y `text-primary font-semibold` en el menú móvil, y con `aria-current="page"`, `text-primary` y subrayado activo `scale-x-100` en la barra de escritorio. Los cuatro enlaces restantes ("Inicio", "Servicios", "Suscripción Floral", "Contacto") permanecen en estado neutro (`text-on-surface-variant`, `scale-x-0`).
4. **Cero Regresión en Acordeón y Lightbox Multimodal:** Se verificó empíricamente en render real que las 34 tarjetas interactivas (24 imágenes y 10 videos) organizadas en 6 secciones de acordeón continúan operando con `flex-1 hover:grow-[10]` sin desbordes. El Lightbox multimodal (`#lightbox` con `z-[100]`) abre imágenes y reproduce videos con sonido sin interferencia, aísla el fondo con `inert` y `body.style.overflow = "hidden"`, atrapa el foco en `#lightbox-close`, destruye los medios al cerrar sin fugas de memoria ni acústicas, y convive armónicamente con el atajo `Escape` (si el Lightbox está abierto, Escape cierra el Lightbox; si el menú móvil está abierto, Escape cierra el menú móvil).

La compilación mediante `pnpm build` produjo un `dist/css/output.css` idéntico (43,568 bytes, hash SHA-256 inalterado), y la auditoría CDP demostró 0 errores de consola, 0 scroll horizontal en 7 viewports y paridad dimensional al 100%.

---

## 2. Línea Base y Reproducción Forense del Defecto Original

Antes de realizar la edición de código, se documentó el estado previo de `galeria.html` y se capturó la evidencia cuantitativa del defecto en render real (Edge Headless, viewport 360 × 740 px).

### Hashes SHA-256 de Línea Base
- `index.html`: `5F66340FA54B5592411CCC950D5C308073589380973AA0B033C9D051E9902661`
- `servicios.html`: `003B8B28B1690972373D428149F098DA63BE8FC6BF17B7B91E4FD464C9C945CF`
- `suscripcion-floral.html`: `EC5CB286FC3BAA636419257C48FBC9B287BBD9D6C89DF13C0E0C95D8326AD10E`
- `galeria.html` (original completo): `6D1A08CEDC260A609589DF1E306BA8B8D952C08369FFA2674C7793B3E9F23856`
- `contacto.html`: `6DB423FB4BD52AC8A88A9500132AD8B748475707AAC7E451F5283F11DE789298`
- `404.html`: `DA1A396A87D018AE1864E9BCE90027205DBDF1B93EEEFAE08BF1792B1622E35B`
- `src/js/modules/navigation.js`: `5302EABD376D4A4AFF096AFFAD1C2DED8053F386EE81CE581AA8088830AA15A6`
- `src/js/modules/gallery.js`: `F588FCD9C0F8D2C6290666072FA1021E085258ACB6B0DD886DFE152DF612F0A8`
- `src/js/main.js`: `E73CBB00959CB02421B570F88A6D0FAE0ED6CE33ED37D8C10B92D1F27995436B`
- `src/js/modules/theme.js`: `DC72FDE50A03D04AC9A7228DA5D28764C72617FB2C3278F005DE5D306F5B0D80`
- `tailwind.config.js`: `44FBEC39C4A8C6927EC499E017254C0545587C8938E33B6A9B7C7861D796D481`
- `src/css/input.css`: `ACC4E33CB3267C3613E423E31C89EE2930EBDB7C6D858B22E3D3832E37E93F28`
- `package.json`: `7FC8582F3BC40A4CF9C11D8F70C4016D8F7E4FB9421ED2865E0F2BE7DB1E50C2`
- `dist/css/output.css`: `943079B25B3A356E7EF132DF524DDDD8DDE73D561A766E924B351DB9C073623A` (43,568 bytes)

**Regiones protegidas de `galeria.html` (Línea Base Inicial):**
- `<head>`: `E4C56639BD1DF53BB27AD2D36C5FFCF18102D844F020D2C38649B00C68A8AA0C`
- `<main>`: `36544BDFDE68696FE8577969CADB47C2057C2BD788DDDFA68C7945ED31DCD01E`
- `<footer>`: `B6BB2AC98B9EEBDC277AEF4ACF698A82E26F158317ED7DDA1C9F102F480D79FD`
- Exterior normalizado (sin `<header>` ni scrim): `BEB86172322E2DE724D748E1F77E68F7EDC2FCE0F19A0DEB925363A3199E30F9`

### Reproducción del Defecto Previo en Render Real (360 × 740 px)
Al activar `#mobile-menu-btn` en la versión inicial:
- **`headerHeight`:** 80 px.
- **`menuHeight`:** 80 px (atrapado dentro del header por el `backdrop-blur-xl`).
- **`menuTop`:** 0 px.
- **Posición del primer enlace ("Inicio"):** `top: -48px` (coordenada negativa, fuera de pantalla e inaccesible).
- **Capa tenue `#mobile-menu-scrim`:** Inexistente (`hasScrim: false`).
- **Ícono de cierre en botón móvil:** Ausente (solo ícono de 3 barras).
- **Frontera de Breakpoint a 1024 px:** `brandLines: 2` (el logotipo hacía salto de línea).

---

## 3. Acciones Realizadas y Cambios de Código

### Tarea 1: Adaptación Responsiva del Bloque de Marca
- Se conservaron todos los atributos, imágenes y textos originales, actualizando las clases utilitarias de Tailwind:
  - Enlace de marca `<a>`: de `gap-4` a `gap-3 sm:gap-4`.
  - Isotipos PNG (`img.h-11` para light y dark): se añadió `shrink-0` para prevenir distorsiones de aspect ratio.
  - Divisor vertical `<div>`: se añadió `hidden sm:block` para suprimirlo en pantallas móviles `<sm`.
  - Span del texto de marca: actualizado a `font-headline-md text-headline-sm sm:text-headline-md italic tracking-tight whitespace-nowrap fx-spotlight`.

### Tarea 2: Clúster de Acciones y Accesibilidad Táctil
- Contenedor de acciones ajustado a `flex items-center gap-2 lg:gap-space-3`.
- Enlaces sociales de Instagram y WhatsApp en la cabecera ocultos para móvil y tablet (`hidden lg:flex`).
- Conmutador de tema `#theme-toggle-btn` adaptado a `w-11 h-11 lg:w-9 lg:h-9` (44 × 44 px en móvil).
- Botón hamburguesa `#mobile-menu-btn` adaptado a `w-11 h-11` (removiendo `ml-2`), incorporando los dos SVGs correspondientes: `#mobile-menu-icon-open` e `#mobile-menu-icon-close` (`hidden`).

### Tarea 3: Sustitución del Drawer por Panel Anclado y Scrim Hermano
- Se removió el drawer anterior anidado en el header (`fixed inset-0`) y se insertó el panel `#mobile-menu` anclado como último elemento antes de `</header>`:
  ```html
  <div id="mobile-menu" class="hidden lg:hidden absolute top-full left-0 w-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-surface dark:bg-dark-surface-container-low border-t border-outline-variant/30 shadow-[0_8px_24px_rgba(53,54,58,0.12)]">
      <nav class="flex flex-col px-margin-mobile" aria-label="Navegación móvil">
          <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="inicio" href="./index.html">Inicio</a>
          <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="servicios" href="./servicios.html">Servicios</a>
          <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="suscripcion-floral" href="./suscripcion-floral.html">Suscripción Floral</a>
          <a aria-current="page" class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-primary font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="galeria" href="./galeria.html">Galería</a>
          <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="contacto" href="./contacto.html">Contacto</a>
      </nav>
      <div class="flex items-stretch gap-space-2 px-margin-mobile pt-space-2 pb-space-3">
          <a class="flex flex-1 items-center justify-center gap-2 min-h-[3rem] rounded-xl bg-primary/10 text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
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
- Inmediatamente posterior a `</header>`, se agregó la capa `#mobile-menu-scrim`:
  ```html
  <!-- Capa tenue del menú móvil: HERMANA del <header>, jamás dentro de él -->
  <div id="mobile-menu-scrim" class="hidden lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-neutral-900/40" aria-hidden="true"></div>
  ```

### Tarea 4: Configuración del Estado Activo
- En la barra de navegación de escritorio (`<nav aria-label="Navegación principal">`):
  - Enlace `Galería`: `aria-current="page"`, clase de texto `text-primary`, barra indicadora inferior con `origin-center scale-x-100`.
  - Enlaces `Inicio`, `Servicios`, `Suscripción Floral`, `Contacto`: sin atributo `aria-current`, clase de texto `text-on-surface-variant`, barra indicadora inferior con `scale-x-0`.
- En el panel móvil (`#mobile-menu nav`):
  - Enlace `Galería`: `aria-current="page"`, `text-primary font-semibold`.
  - Enlaces `Inicio`, `Servicios`, `Suscripción Floral`, `Contacto`: sin atributo `aria-current`, `text-on-surface-variant`.

---

## 4. Resultados Cuantitativos por Escenario (Render Real)

Las pruebas se ejecutaron mediante protocolo CDP contra Microsoft Edge Headless v140 en los 7 viewports reglamentarios.

### Escenario 1: Estado Inicial Cerrado y Dimensiones
| Viewport | Ancho × Alto (px) | Header H (px) | Menú Hidden | Scrim Hidden | Botón Menú (px) | Botón Tema (px) | aria-expanded | Desborde H | Estado |
|---|---|---|---|---|---|---|---|---|---|
| Móvil Pequeño | 320 × 640 | 80 | true | true | 44 × 44 | 44 × 44 | "false" | false (320/320) | PASA |
| Móvil Estándar | 360 × 740 | 80 | true | true | 44 × 44 | 44 × 44 | "false" | false (360/360) | PASA |
| Móvil Alto | 412 × 915 | 80 | true | true | 44 × 44 | 44 × 44 | "false" | false (412/412) | PASA |
| Tablet Vertical | 768 × 1024 | 80 | true | true | 44 × 44 | 44 × 44 | "false" | false (768/768) | PASA |
| Móvil Apaisado | 740 × 360 | 80 | true | true | 44 × 44 | 44 × 44 | "false" | false (740/740) | PASA |
| Tablet Horizontal | 1024 × 768 | 80 | true | true | 0 × 0 (hidden) | 36 × 36 | "false" | false (1009/1009) | PASA |
| Desktop Estándar | 1280 × 800 | 80 | true | true | 0 × 0 (hidden) | 36 × 36 | "false" | false (1265/1265) | PASA |

### Escenario 2: Apertura del Menú Móvil (<1024 px)
| Viewport | Ancho × Alto (px) | aria-expanded | Menú Top (px) | Menú H (px) | Primer Link Top (px) | Scrim Top (px) | Scrim Z | Hit-Test Menú | Hit-Test Scrim | Estado |
|---|---|---|---|---|---|---|---|---|---|---|
| 320 × 640 | 320 × 640 | "true" | 80 | 329 | 81 | 80 | 40 | `<A>` (Inicio) | `#mobile-menu-scrim` | PASA |
| 360 × 740 | 360 × 740 | "true" | 80 | 329 | 81 | 80 | 40 | `<A>` (Inicio) | `#mobile-menu-scrim` | PASA |
| 412 × 915 | 412 × 915 | "true" | 80 | 329 | 81 | 80 | 40 | `<A>` (Inicio) | `#mobile-menu-scrim` | PASA |
| 768 × 1024 | 768 × 1024 | "true" | 80 | 329 | 81 | 80 | 40 | `<A>` (Inicio) | `#mobile-menu-scrim` | PASA |
| 740 × 360 | 740 × 360 | "true" | 80 | 280 (max-h) | 81 | 80 | 40 | `<A>` (Inicio) | `#mobile-menu-scrim` | PASA |

*Nota en viewport 740 × 360 px:* La altura del panel móvil queda contenida dentro de `calc(100dvh - 5rem) = 280px` con `overflow-y: auto`, permitiendo desplazamiento vertical táctil sin generar desborde de ventana.

### Escenario 3: Cierre Multivía del Menú Móvil
| Mecanismo de Cierre | Acción Ejecutada | aria-expanded Final | Menú Hidden | Scrim Hidden | Foco / Estado Resultante | Estado |
|---|---|---|---|---|---|---|
| **Tecla Escape** | `dispatchKeyEvent("Escape")` | "false" | true | true | Foco retornado a `#mobile-menu-btn` | PASA |
| **Clic en Scrim** | `element.click()` en Scrim | "false" | true | true | Menú y Scrim cerrados | PASA |
| **Botón Toggle** | `element.click()` en Toggle | "false" | true | true | Menú y Scrim cerrados | PASA |
| **Iconografía** | Toggle abierto / cerrado | N/A | Sincronizado | Sincronizado | Abierto: Open `hidden`, Close `visible`. Cerrado: Open `visible`, Close `hidden` | PASA |

### Escenario 4: Estado Activo Exclusivo en "Galería"
| Nivel | Enlace | Texto Renderizado | `aria-current` | Clase de Color | Subrayado Transform | Estado |
|---|---|---|---|---|---|---|
| **Desktop** | Inicio | "INICIO" | null | `text-on-surface-variant` | `matrix(0, 0, 0, 1, 0, 0)` (scaleX 0) | PASA |
| **Desktop** | Servicios | "SERVICIOS" | null | `text-on-surface-variant` | `matrix(0, 0, 0, 1, 0, 0)` (scaleX 0) | PASA |
| **Desktop** | Suscripción Floral | "SUSCRIPCIÓN FLORAL" | null | `text-on-surface-variant` | `matrix(0, 0, 0, 1, 0, 0)` (scaleX 0) | PASA |
| **Desktop** | **Galería** | **"GALERÍA"** | **"page"** | **`text-primary`** | **`matrix(1, 0, 0, 1, 0, 0)` (scaleX 1)** | **PASA (Único)** |
| **Desktop** | Contacto | "CONTACTO" | null | `text-on-surface-variant` | `matrix(0, 0, 0, 1, 0, 0)` (scaleX 0) | PASA |
| **Móvil** | Inicio | "Inicio" | null | `text-on-surface-variant` | N/A | PASA |
| **Móvil** | Servicios | "Servicios" | null | `text-on-surface-variant` | N/A | PASA |
| **Móvil** | Suscripción Floral | "Suscripción Floral" | null | `text-on-surface-variant` | N/A | PASA |
| **Móvil** | **Galería** | **"Galería"** | **"page"** | **`text-primary font-semibold`** | N/A | **PASA (Único)** |
| **Móvil** | Contacto | "Contacto" | null | `text-on-surface-variant` | N/A | PASA |

---

## 5. Tabla de Paridad Móvil (360 × 740 px)

Comparativa dimensional en render real entre `galeria.html`, `index.html` y `suscripcion-floral.html`:

| Propiedad Medida | `index.html` (Fuente) | `suscripcion-floral.html` (Ref.) | `galeria.html` (Iteración 10) | Diferencia | Veredicto |
|---|---|---|---|---|---|
| **Header Height** | 80.00 px | 80.00 px | 80.00 px | 0.00 px | EXACTO |
| **Brand Width** | 155.14 px | 155.14 px | 155.14 px | 0.00 px | EXACTO |
| **Logo Width** | 43.27 px | 43.27 px | 43.27 px | 0.00 px | EXACTO |
| **Logo Height** | 44.00 px | 44.00 px | 44.00 px | 0.00 px | EXACTO |
| **Brand Font Size** | 18.00 px | 18.00 px | 18.00 px | 0.00 px | EXACTO |
| **Theme Toggle Size** | 44.00 × 44.00 px | 44.00 × 44.00 px | 44.00 × 44.00 px | 0.00 px | EXACTO |
| **Menu Toggle Size** | 44.00 × 44.00 px | 44.00 × 44.00 px | 44.00 × 44.00 px | 0.00 px | EXACTO |
| **Panel Móvil Top** | 80.00 px | 80.00 px | 80.00 px | 0.00 px | EXACTO |
| **Panel Móvil H (360px)**| 329.00 px | 329.00 px | 329.00 px | 0.00 px | EXACTO |
| **Scrim Top** | 80.00 px | 80.00 px | 80.00 px | 0.00 px | EXACTO |
| **Scrim Z-Index** | 40 | 40 | 40 | 0 | EXACTO |

---

## 6. Tabla de Frontera de Breakpoint Antes vs Después

| Ancho (px) | Estado Previo (Línea Base) | Estado Posterior (Iteración 10) | Nav Desktop | Botón Menú | Overlap Brand/Nav | Desborde Header |
|---|---|---|---|---|---|---|
| **1023** | 1 línea de texto (`brandLines: 1`) | 1 línea de texto (`brandLines: 1`) | Oculto (`none`) | Visible (`flex`) | No (0 px) | No (0 px) |
| **1024** | **2 líneas de texto (`brandLines: 2`)** | **1 línea de texto (`brandLines: 1`)** | Visible (`flex`) | Oculto (`none`) | No (0 px) | No (0 px) |
| **1100** | 1 línea de texto (`brandLines: 1`) | 1 línea de texto (`brandLines: 1`) | Visible (`flex`) | Oculto (`none`) | No (0 px) | No (0 px) |
| **1280** | 1 línea de texto (`brandLines: 1`) | 1 línea de texto (`brandLines: 1`) | Visible (`flex`) | Oculto (`none`) | No (0 px) | No (0 px) |

*Hallazgo resuelto:* En la línea base a 1024 px, el bloque de marca saltaba a dos líneas debido al tamaño `text-headline-md` previo sin `whitespace-nowrap`. Al incorporar el marcado maestro con `text-headline-sm sm:text-headline-md` y `whitespace-nowrap`, el logotipo permanece siempre en una sola línea horizontal elegante a 1024 px.

---

## 7. Tabla de Contraste Accesible (WCAG 2.1 AA)

Mediciones de color obtenidas en render real tras estabilización de transiciones (>600 ms tras alternar tema):

| Modo de Color | Elemento Evaluado | Color Texto (RGB) | Color Fondo (RGB) | Ratio Medido | Requisito WCAG | Dictamen |
|---|---|---|---|---|---|---|
| **Claro** | Enlace Activo ("Galería") | `rgb(49, 105, 68)` | `rgb(248, 250, 244)` | **6.17:1** | AA ≥ 4.5:1 | PASA |
| **Claro** | Enlaces Neutros | `rgb(65, 73, 65)` | `rgb(248, 250, 244)` | **8.86:1** | AAA ≥ 7.0:1 | PASA |
| **Claro** | Botón WhatsApp | `rgb(49, 105, 68)` | `rgb(228, 236, 226)` (comp.) | **5.38:1** | AA ≥ 4.5:1 | PASA |
| **Claro** | Botón Instagram | `rgb(65, 73, 65)` | `rgb(237, 239, 233)` | **8.04:1** | AAA ≥ 7.0:1 | PASA |
| **Oscuro** | Enlace Activo ("Galería") | `rgb(140, 199, 154)` | `rgb(43, 48, 45)` | **6.88:1** | AA ≥ 4.5:1 | PASA |
| **Oscuro** | Enlaces Neutros | `rgb(191, 197, 190)` | `rgb(43, 48, 45)` | **7.64:1** | AAA ≥ 7.0:1 | PASA |
| **Oscuro** | Botón WhatsApp | `rgb(140, 199, 154)` | `rgb(53, 63, 56)` (comp.) | **5.60:1** | AA ≥ 4.5:1 | PASA |
| **Oscuro** | Botón Instagram | `rgb(191, 197, 190)` | `rgb(51, 58, 54)` | **6.64:1** | AA ≥ 4.5:1 | PASA |

---

## 8. Demostración Empírica de Cero Regresión en Galería

Se ejecutaron pruebas específicas sobre las funcionalidades dinámicas de `galeria.html`:

### A. Acordeón Editorial (34 Tarjetas en 6 Secciones)
| Sección / Capítulo | ID de Sección | Tarjetas Totales | Tipo de Medios | Comportamiento Acordeón | Estado |
|---|---|---|---|---|---|
| Capítulo 01: Suscripción Floral | `#suscripcion-floral` | 7 | 2 videos, 5 imágenes | `flex-1 hover:grow-[10]` | PASA |
| Capítulo 02: Gift Cards | `#gift-cards` | 2 | 2 imágenes | `flex-1 hover:grow-[10]` | PASA |
| Capítulo 03: Decoración Mesas | `#decoracion-mesas` | 5 | 2 videos, 3 imágenes | `flex-1 hover:grow-[10]` | PASA |
| Capítulo 04: Ramos de Novia | `#ramos-de-novia` | 7 | 2 videos, 5 imágenes | `flex-1 hover:grow-[10]` | PASA |
| Capítulo 05: Floristería | `#floristeria` | 6 | 2 videos, 4 imágenes | `flex-1 hover:grow-[10]` | PASA |
| Capítulo 06: Novias Magú | `#novias-magu` | 7 | 2 videos, 5 imágenes | `flex-1 hover:grow-[10]` | PASA |
| **Totales** | **6 Secciones** | **34 Tarjetas** | **24 Imágenes, 10 Videos** | **100% Funcional** | **PASA** |

### B. Lightbox Multimodal Accesible (`#lightbox`, `z-[100]`)
| Escenario de Prueba | Acción Realizada | Medición en Render Real | Veredicto |
|---|---|---|---|
| **Apertura de Imagen** | Clic en tarjeta con `data-type="image"` | `#lightbox` con `opacity-100`, visible, `aria-hidden="false"`, `aria-modal="true"`, foco automático en `#lightbox-close`, `body.style.overflow = "hidden"`, `<header>` recibe atributo `inert`. | PASA |
| **Hit-Test con Lightbox** | `elementFromPoint` sobre coordenadas de botón de menú | Retorna `#lightbox-close` / `#lightbox` (el modal cubre completamente la pantalla, impidiendo interacción con el header). | PASA |
| **Cierre por Escape** | Presionar tecla `Escape` con Lightbox abierto | `#lightbox` pasa a `hidden`, `aria-hidden="true"`, `body.style.overflow = ""`, `<header>` recupera accesibilidad (remueve `inert`), 0 hijos residuales en `#lightbox-content`. | PASA |
| **Apertura de Video** | Clic en tarjeta con `data-type="video"` | Se inyecta nodo `<video>` con controles y reproducción, audio activo sin silenciar involuntariamente. | PASA |
| **Cierre por Botón** | Clic en `#lightbox-close` | Nodo `<video>` es desvinculado inmediatamente del DOM: 0 fugas de memoria y silencio acústico garantizado. | PASA |
| **Coexistencia de Escape** | Escape con Menú Móvil abierto vs Lightbox abierto | Si el menú móvil está abierto, Escape lo cierra de inmediato. Si el Lightbox está abierto, Escape cierra el Lightbox sin abrir ni cerrar el menú móvil. | PASA |

---

## 9. Tabla de Integridad Criptográfica (SHA-256)

| Archivo / Región Protegida | Hash SHA-256 Inicial | Hash SHA-256 Final | Estado |
|---|---|---|---|
| `galeria.html` (`<head>`) | `E4C56639BD1DF53BB27AD2D36C5FFCF18102D844F020D2C38649B00C68A8AA0C` | `E4C56639BD1DF53BB27AD2D36C5FFCF18102D844F020D2C38649B00C68A8AA0C` | **INALTERADO (MATCH)** |
| `galeria.html` (`<main>`) | `36544BDFDE68696FE8577969CADB47C2057C2BD788DDDFA68C7945ED31DCD01E` | `36544BDFDE68696FE8577969CADB47C2057C2BD788DDDFA68C7945ED31DCD01E` | **INALTERADO (MATCH)** |
| `galeria.html` (`<footer>`) | `B6BB2AC98B9EEBDC277AEF4ACF698A82E26F158317ED7DDA1C9F102F480D79FD` | `B6BB2AC98B9EEBDC277AEF4ACF698A82E26F158317ED7DDA1C9F102F480D79FD` | **INALTERADO (MATCH)** |
| `galeria.html` (Exterior normalizado) | `BEB86172322E2DE724D748E1F77E68F7EDC2FCE0F19A0DEB925363A3199E30F9` | `BEB86172322E2DE724D748E1F77E68F7EDC2FCE0F19A0DEB925363A3199E30F9` | **INALTERADO (MATCH)** |
| `index.html` | `5F66340FA54B5592411CCC950D5C308073589380973AA0B033C9D051E9902661` | `5F66340FA54B5592411CCC950D5C308073589380973AA0B033C9D051E9902661` | **INTOCADO** |
| `servicios.html` | `003B8B28B1690972373D428149F098DA63BE8FC6BF17B7B91E4FD464C9C945CF` | `003B8B28B1690972373D428149F098DA63BE8FC6BF17B7B91E4FD464C9C945CF` | **INTOCADO** |
| `suscripcion-floral.html` | `EC5CB286FC3BAA636419257C48FBC9B287BBD9D6C89DF13C0E0C95D8326AD10E` | `EC5CB286FC3BAA636419257C48FBC9B287BBD9D6C89DF13C0E0C95D8326AD10E` | **INTOCADO** |
| `contacto.html` | `6DB423FB4BD52AC8A88A9500132AD8B748475707AAC7E451F5283F11DE789298` | `6DB423FB4BD52AC8A88A9500132AD8B748475707AAC7E451F5283F11DE789298` | **INTOCADO** |
| `404.html` | `DA1A396A87D018AE1864E9BCE90027205DBDF1B93EEEFAE08BF1792B1622E35B` | `DA1A396A87D018AE1864E9BCE90027205DBDF1B93EEEFAE08BF1792B1622E35B` | **INTOCADO** |
| `src/js/modules/navigation.js` | `5302EABD376D4A4AFF096AFFAD1C2DED8053F386EE81CE581AA8088830AA15A6` | `5302EABD376D4A4AFF096AFFAD1C2DED8053F386EE81CE581AA8088830AA15A6` | **INTOCADO** |
| `src/js/modules/gallery.js` | `F588FCD9C0F8D2C6290666072FA1021E085258ACB6B0DD886DFE152DF612F0A8` | `F588FCD9C0F8D2C6290666072FA1021E085258ACB6B0DD886DFE152DF612F0A8` | **INTOCADO** |
| `src/js/main.js` | `E73CBB00959CB02421B570F88A6D0FAE0ED6CE33ED37D8C10B92D1F27995436B` | `E73CBB00959CB02421B570F88A6D0FAE0ED6CE33ED37D8C10B92D1F27995436B` | **INTOCADO** |
| `src/js/modules/theme.js` | `DC72FDE50A03D04AC9A7228DA5D28764C72617FB2C3278F005DE5D306F5B0D80` | `DC72FDE50A03D04AC9A7228DA5D28764C72617FB2C3278F005DE5D306F5B0D80` | **INTOCADO** |
| `tailwind.config.js` | `44FBEC39C4A8C6927EC499E017254C0545587C8938E33B6A9B7C7861D796D481` | `44FBEC39C4A8C6927EC499E017254C0545587C8938E33B6A9B7C7861D796D481` | **INTOCADO** |
| `src/css/input.css` | `ACC4E33CB3267C3613E423E31C89EE2930EBDB7C6D858B22E3D3832E37E93F28` | `ACC4E33CB3267C3613E423E31C89EE2930EBDB7C6D858B22E3D3832E37E93F28` | **INTOCADO** |
| `package.json` | `7FC8582F3BC40A4CF9C11D8F70C4016D8F7E4FB9421ED2865E0F2BE7DB1E50C2` | `7FC8582F3BC40A4CF9C11D8F70C4016D8F7E4FB9421ED2865E0F2BE7DB1E50C2` | **INTOCADO** |
| `dist/css/output.css` | `943079B25B3A356E7EF132DF524DDDD8DDE73D561A766E924B351DB9C073623A` | `943079B25B3A356E7EF132DF524DDDD8DDE73D561A766E924B351DB9C073623A` | **INALTERADO (MATCH)** |
| `galeria.html` (Completo) | `6D1A08CEDC260A609589DF1E306BA8B8D952C08369FFA2674C7793B3E9F23856` | `C3D5B339C255E452CCD5984F9F61C307122BACEE36DD1305CAE4E2186D102688` | **MODIFICADO (VÁLIDO)** |

---

## 10. Desviaciones, Hallazgos y Correcciones

1. **Compilación de Tailwind CSS:** La compilación con `pnpm build` tardó 794 ms. Se emitió el aviso rutinario de Browserslist (`caniuse-lite is outdated`), el cual no se modificó de acuerdo con la prohibición estricta sobre el gestor de paquetes y dependencias. El hash y tamaño de `dist/css/output.css` se mantuvieron exactamente en 43,568 bytes y SHA-256 `943079B25B3A356E7EF132DF524DDDD8DDE73D561A766E924B351DB9C073623A`.
2. **Invariantes del Marcado:** Se verificó la ausencia total de clases `fixed` en los elementos descendientes del `<header>` (0 coincidencias), unicidad de identificadores (`mobile-menu-btn`, `mobile-menu`, `mobile-menu-scrim`, `mobile-menu-icon-open`, `mobile-menu-icon-close`, `theme-toggle-btn` aparecen exactamente 1 vez cada uno), 0 atributos `style=`, 0 llamadas `onclick` y 0 enlaces vacíos `href="#"`.
3. **Corrección de Breakpoint en 1024 px:** En la versión original de `galeria.html`, el texto de marca ocupaba dos líneas a 1024 px (`brandLines: 2`). Con la unificación a `text-headline-sm sm:text-headline-md` y `whitespace-nowrap`, el texto permanece en una sola línea elegante sin colisiones con la barra de navegación.

---

## 11. Confirmación de Restricción Git

Se certifica enfática y categóricamente que durante toda la ejecución de la Iteración 10 **NO SE EJECUTÓ NINGÚN COMANDO DE CONTROL DE VERSIONES GIT** (no git status, no git diff, no git add, no git commit, no git push, no git branch, no git checkout, no git stash). Toda la trazabilidad descrita se apoya exclusivamente en hashes criptográficos SHA-256 independientes y mediciones directas sobre el sistema de archivos y el render real del navegador.
