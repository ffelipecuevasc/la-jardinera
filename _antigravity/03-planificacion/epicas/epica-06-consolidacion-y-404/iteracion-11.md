# Iteración 11: Header Móvil Esencial y Panel Anclado en "contacto.html"

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
En la Iteración 07 se construyó en `index.html` el Header Móvil Esencial (Opción 1-A) y el Panel Anclado
(Opción 2-B), y se actualizó `navigation.js`. Esa versión de `index.html` es tu **fuente de la verdad**: no inventes
variantes. En `contacto.html` persiste el defecto original: el drawer `fixed inset-0` está anidado en el `<header>` con
`backdrop-blur-xl`, así que se mide contra la barra de 80 px y sus enlaces se desbordan. Tu trabajo es replicar aquí los
cambios de `index.html`, ajustando únicamente el estado activo a "Contacto". `navigation.js` ya es compatible: **no lo
modifiques**. Interviene quirúrgicamente **únicamente `contacto.html`**; `<main>` y `<footer>` permanecen intactos.

## 1. Objetivo de la Iteración

Replicar en `contacto.html` el header maestro de la Fase 2 (cabecera esencial en móvil y panel anclado bajo la
barra con capa tenue), dejando "Contacto" como único enlace activo en la barra de escritorio y en el panel móvil, sin
alterar las tarjetas de WhatsApp y Email.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Compactación del Bloque de Marca en `contacto.html`:**
    * En el `<header>`, localizar el enlace de marca (`<a data-path="inicio" href="./index.html">`) y aplicar
      **únicamente** estos cambios de clases (no tocar `src`, `alt`, `width`, `height`, `href` ni `data-path`):
        - Enlace `<a>`: `flex items-center gap-4 group` ➔ `flex items-center gap-3 sm:gap-4 group`.
        - Ambos `<img>` PNG (variante clara y variante blanca): insertar `shrink-0` justo después de `w-auto`.
        - Separador vertical `<div>`: anteponer `hidden sm:block` a sus clases actuales.
        - Texto del logotipo `<span>`: `font-headline-md text-headline-md italic tracking-tight fx-spotlight` ➔
          `font-headline-md text-headline-sm sm:text-headline-md italic tracking-tight whitespace-nowrap fx-spotlight`.
    * El resultado debe coincidir con el bloque de marca de `index.html` (Iteración 07), que es la fuente de la verdad.

2. **Racionalización del Clúster de Acciones (Redes, Tema y Hamburguesa):**
    * Contenedor del clúster: `flex items-center gap-space-3` ➔ `flex items-center gap-2 lg:gap-space-3`.
    * Enlaces de **Instagram** y **WhatsApp** (cambiar solo el atributo `class`; se conservan `aria-label`, `href`,
      `target`, `rel` y el `<svg>` interno). Nueva clase para ambos:
      ```
      hidden lg:flex w-8 h-8 rounded-full bg-surface-container items-center justify-center text-on-surface-variant hover:text-primary transition-all
      ```
    * Botón de tema `#theme-toggle-btn` (cambiar solo `class`; se conservan `id`, `type`, `aria-label` y sus dos
      `<svg>`). Nueva clase:
      ```
      w-11 h-11 lg:w-9 lg:h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all
      ```
    * Botón hamburguesa `#mobile-menu-btn`: reemplazarlo íntegramente por el bloque siguiente (se elimina `ml-2` y se
      añade el ícono de cierre):
      ```html
      <button id="mobile-menu-btn" type="button"
              class="lg:hidden w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-all"
              aria-label="Abrir menú"
              aria-expanded="false"
              aria-controls="mobile-menu">
          <!-- Ícono hamburguesa (visible con el menú cerrado) -->
          <svg id="mobile-menu-icon-open" class="text-[18px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
          <!-- Ícono cerrar (visible con el menú abierto) -->
          <svg id="mobile-menu-icon-close" class="text-[18px] hidden" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
      </button>
      ```

3. **Sustitución del Drawer por el Panel Anclado y la Capa Tenue:**
    * Eliminar por completo el `<div id="mobile-menu" class="hidden fixed inset-0 z-40 bg-surface/95 dark:bg-dark-surface-container-low/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 pt-20">` actual (causa raíz del defecto) y sus 5 enlaces.
    * Inyectar, inmediatamente antes de `</header>`, el panel estandarizado con "Contacto" como ítem activo:
      ```html
      <!-- Menú Móvil Desplegable (panel anclado bajo la barra) -->
      <div id="mobile-menu" class="hidden lg:hidden absolute top-full left-0 w-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-surface dark:bg-dark-surface-container-low border-t border-outline-variant/30 shadow-[0_8px_24px_rgba(53,54,58,0.12)]">
          <nav class="flex flex-col px-margin-mobile" aria-label="Navegación móvil">
              <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="inicio" href="./index.html">Inicio</a>
              <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="servicios" href="./servicios.html">Servicios</a>
              <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="suscripcion-floral" href="./suscripcion-floral.html">Suscripción Floral</a>
              <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="galeria" href="./galeria.html">Galería</a>
              <a aria-current="page" class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-primary font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="contacto" href="./contacto.html">Contacto</a>
          </nav>
          <div class="flex items-stretch gap-space-2 px-margin-mobile pt-space-2 pb-space-3">
              <a class="flex flex-1 items-center justify-center gap-2 min-h-[3rem] rounded-xl bg-primary/10 text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                 href="https://wa.me/56997702832" target="_blank" rel="noopener noreferrer">
                  <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 258" aria-hidden="true">
                      <!-- <path> idéntico al del enlace de WhatsApp del header -->
                  </svg>
                  <span>WhatsApp</span>
              </a>
              <a class="flex flex-1 items-center justify-center gap-2 min-h-[3rem] rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider hover:text-primary hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                 href="https://www.instagram.com/lajardinera.floreria/" target="_blank" rel="noopener noreferrer">
                  <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
                      <!-- <path> idéntico al del enlace de Instagram del header -->
                  </svg>
                  <span>Instagram</span>
              </a>
          </div>
      </div>
      ```
    * Inyectar, inmediatamente después de `</header>` (antes de `<main>`), la capa tenue como **hermana** del header:
      ```html
      <!-- Capa tenue del menú móvil: HERMANA del <header>, jamás dentro de él -->
      <div id="mobile-menu-scrim" class="hidden lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-neutral-900/40" aria-hidden="true"></div>
      ```
    * Los `<path>` de los dos `<svg>` sociales del panel deben duplicarse literalmente (mismo `d="..."`) desde los
      `<svg>` de los enlaces de Instagram y WhatsApp del header, sustituyendo el comentario marcador. Los `href`
      originales se conservan.
    * Regla crítica: ningún descendiente del `<header>` puede llevar la clase `fixed` (causa raíz del defecto original).
    * `navigation.js` ya es compatible con este marcado: **no lo modifiques**.

4. **Auditoría de No-Regresión e Invariantes:**
    * **Contenido de la página:** las tarjetas de WhatsApp (`https://wa.me/56997702832`) y de Email
      (`mailto:lajardinera.floreria@gmail.com`) conservan sus animaciones de elevación, resplandor y enlaces externos.
    * **Layout del `<body>`:** el `<body>` de esta página es `flex flex-col min-h-screen`. La capa tenue es `fixed` (sale
      del flujo), por lo que no debe provocar saltos de layout ni alterar la altura del `<main>` o del `<footer>`.
    * **Escritorio intacto:** la `<nav class="hidden lg:flex ...">` (con "Contacto" activo y su subrayado `scale-x-100`) y el `<footer>` permanecen sin cambios; a partir de `lg` el header luce idéntico al anterior.
    * **Invariantes (verificables por búsqueda de texto):** (a) ningún descendiente del `<header>` contiene la clase
      `fixed`; (b) los IDs `mobile-menu-btn`, `mobile-menu`, `mobile-menu-scrim`, `mobile-menu-icon-open` y
      `mobile-menu-icon-close` aparecen una sola vez; (c) `#mobile-menu-scrim` es el nodo inmediatamente posterior a
      `</header>`; (d) 0 ocurrencias de `style="`, `onclick` y `<script>` con lógica en línea; (e) 0 `href="#"` en la
      navegación y en el footer.
    * **Compilación:** ejecutar `pnpm build` sin advertencias y confirmar que `dist/css/output.css` contiene las clases
      nuevas (p. ej. `100dvh`, `neutral-900`, `sm:text-headline-md`, `lg:w-9`, `min-h-[3rem]`).
    * **Verificación visual obligatoria (no solo de marcado):** comprobar el render real en 360×740 y 412×915 (móvil),
      768×1024 (tablet) y 1280×800 (escritorio), en modo claro y en modo oscuro; añadir 320×640 y 740×360 (horizontal)
      para confirmar la ausencia de desbordes y el scroll interno del panel. La Iteración 06 demostró que inspeccionar
      el marcado no basta.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Cabecera Esencial sin Desbordes**
    * **Dado** el archivo `contacto.html` en viewports de 320, 360 y 412 px de ancho (y de 768 px)
    * **Cuando** la página termina de cargar
    * **Entonces** la barra muestra únicamente el logotipo PNG, "La Jardinera" en **una sola línea**, el conmutador de
      tema y el botón de menú; Instagram y WhatsApp no aparecen en la barra; no hay solapamientos ni scroll horizontal;
      y los botones de tema y menú miden al menos 44 × 44 px.
* **Escenario 2: Panel Anclado, Legible y con Estado Activo**
    * **Dado** el archivo `contacto.html` en un viewport móvil, sobre el encabezado editorial y las tarjetas de contacto, en modo claro y en modo oscuro
    * **Cuando** el usuario pulsa `#mobile-menu-btn`
    * **Entonces** el panel aparece inmediatamente bajo la barra, a ancho completo y con fondo sólido; se ven los 5
      enlaces (con "Contacto" en `text-primary font-semibold` y `aria-current="page"`) y los botones WhatsApp e Instagram, todos con texto legible (contraste WCAG AA); el
      resto de la página queda atenuado por la capa tenue; y ningún elemento del panel queda fuera de la pantalla (en
      un viewport bajo, como 740×360, el panel hace scroll interno).
* **Escenario 3: Comportamiento Consistente del Módulo Compartido**
    * **Dado** el menú abierto en `contacto.html`
    * **Cuando** el usuario pulsa de nuevo el botón, pulsa `Escape`, toca la capa tenue, pulsa cualquier enlace del
      panel o ensancha el viewport a `>= 1024 px`
    * **Entonces** el menú se cierra en todos los casos, `aria-expanded` vuelve a `false`, el ícono vuelve a ☰, el
      `aria-label` vuelve a "Abrir menú" y el scroll del `<body>` se desbloquea; con `Escape` el foco regresa al botón.
      Con el menú abierto, `aria-expanded="true"`, el ícono es ✕ y el `aria-label` es "Cerrar menú". `navigation.js` no
      fue modificado en esta iteración.
* **Escenario 4: Cero Regresión en Escritorio y en las Tarjetas de Contacto**
    * **Dado** `contacto.html` a `>= 1024 px` y en móvil con el menú cerrado, en modo claro y oscuro
    * **Cuando** el usuario recorre la página y pasa el cursor sobre las tarjetas de WhatsApp y Email
    * **Entonces** el header de escritorio luce idéntico al anterior (con "Contacto" activo); las tarjetas mantienen sus animaciones y enlaces; el layout no sufre saltos; y la consola no registra errores.