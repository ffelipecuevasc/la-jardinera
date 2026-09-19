# Iteración 07: Header Móvil Esencial, Panel Anclado y Módulo de Navegación en "index.html"

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Esta es la primera iteración de la **Fase 2** de la Épica 06 (reapertura formal: las Iteraciones 01 a 06 están
congeladas). Una prueba en teléfono real demostró dos defectos en `index.html`: (a) el header móvil no cabe (logo +
nombre + 2 redes + tema + hamburguesa requieren ≈ 470 px en pantallas de 360–410 px) y (b) el drawer `#mobile-menu`,
declarado `fixed inset-0`, está anidado dentro de un `<header>` con `backdrop-blur-xl`; ese efecto convierte al header
(80 px) en el bloque contenedor de sus descendientes `fixed`, por lo que el menú se mide contra la barra y no contra la
pantalla. Antes de editar, confirma ambos síntomas en el estado actual del archivo y explica tu plan de impacto
(archivos, DOM y compilación de Tailwind).

`index.html` es la **fuente de la verdad de toda la Fase 2**: las Iteraciones 08 a 12 replicarán exactamente lo que aquí
construyas, así que no improvises variantes. Además, esta iteración actualiza `src/js/modules/navigation.js` (el único
cambio JavaScript de la épica), que debe ser **retrocompatible** con las 5 páginas que conservarán el drawer anterior
hasta sus respectivas iteraciones. Interviene quirúrgicamente **únicamente `index.html` y `navigation.js`**.

## 1. Objetivo de la Iteración

Implementar en `index.html` la **Opción 1-A** (cabecera esencial en móvil: marca en una sola línea, conmutador de tema y
botón de menú, con las redes sociales trasladadas al menú) y la **Opción 2-B** (panel de navegación anclado bajo la
cabecera, con fondo sólido y capa tenue). Dotar a `navigation.js` de cierre por teclado (`Escape`), cierre automático al
pasar a escritorio, cambio de ícono (☰ ↔ ✕) y `aria-label` dinámico. A partir de `lg` el header no debe cambiar.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Actualización del Módulo `src/js/modules/navigation.js`:**
    * Reemplazar el contenido del módulo por la versión siguiente. Se mantiene el export `initNavigation`, por lo que
      `main.js` **no se modifica**:
      ```js
      /**
       * src/js/modules/navigation.js
       * Arquitectura: ES6 Modular | Frontend nativo
       * Descripción: Menú móvil (panel anclado bajo el header) con cierre por teclado,
       *              capa tenue, cambio de ícono y semántica ARIA dinámica.
       */

      const LABEL_OPEN = 'Abrir menú';
      const LABEL_CLOSE = 'Cerrar menú';
      const DESKTOP_QUERY = '(min-width: 1024px)'; // Breakpoint `lg` de Tailwind

      export function initNavigation() {
          const menuBtn = document.getElementById('mobile-menu-btn');
          const menu = document.getElementById('mobile-menu');

          if (!menuBtn || !menu) return;

          // Elementos opcionales: garantizan retrocompatibilidad con páginas aún no migradas
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

          // 1. Botón de menú: alterna el estado
          menuBtn.addEventListener('click', () => setOpen(!isOpen()));

          // 2. Delegación de eventos: cualquier enlace dentro del panel cierra el menú
          menu.addEventListener('click', (event) => {
              if (event.target.closest('a')) setOpen(false);
          });

          // 3. Capa tenue: tocar fuera del panel cierra el menú
          scrim?.addEventListener('click', () => setOpen(false));

          // 4. Teclado: Escape cierra el menú y devuelve el foco al botón
          document.addEventListener('keydown', (event) => {
              if (event.key === 'Escape' && isOpen()) {
                  setOpen(false);
                  menuBtn.focus();
              }
          });

          // 5. Al alcanzar el breakpoint de escritorio, el menú móvil se cierra solo
          desktopMedia.addEventListener('change', (event) => {
              if (event.matches && isOpen()) setOpen(false);
          });
      }
      ```
    * Requisitos que el código debe conservar (no simplificar): selectores en caché, delegación de eventos para los
      enlaces del panel, elementos opcionales con `?.` (garantiza retrocompatibilidad), ninguna dependencia de
      `theme.js` y ningún objeto en `window`.

2. **Compactación del Bloque de Marca en `index.html`:**
    * En el `<header>`, reemplazar el bloque de marca (`<a data-path="inicio" href="./index.html">` con sus dos `<img>`,
      separador y texto) por la versión siguiente. Cambian únicamente clases; `src`, `alt`, `width`, `height`, `href` y
      `data-path` se conservan:
      ```html
      <a class="flex items-center gap-3 sm:gap-4 group" data-path="inicio" href="./index.html">
          <!-- Logotipo PNG — variante original (modo claro) -->
          <img src="./public/logos/la-jardinera-original.png"
               alt="Logotipo La Jardinera"
               class="h-11 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 block dark:hidden"
               width="44"
               height="44"/>
          <!-- Logotipo PNG — variante blanca (modo oscuro) -->
          <img src="./public/logos/la-jardinera-blanco.png"
               alt="Logotipo La Jardinera"
               class="h-11 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 hidden dark:block"
               width="44"
               height="44"/>
          <!-- Separador Vertical Elegante (solo desde sm) -->
          <div class="hidden sm:block w-px h-8 bg-outline-variant/60 group-hover:bg-primary/40 transition-colors duration-300" aria-hidden="true"></div>
          <!-- Texto del Logotipo (una sola línea: 18px en móvil, 24px desde sm) -->
          <span class="font-headline-md text-headline-sm sm:text-headline-md italic tracking-tight whitespace-nowrap fx-spotlight">
              La Jardinera
          </span>
      </a>
      ```

3. **Racionalización del Clúster de Acciones (Redes, Tema y Hamburguesa):**
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

4. **Sustitución del Drawer por el Panel Anclado y la Capa Tenue:**
    * Eliminar por completo el drawer actual (causa raíz del defecto):
      `<div id="mobile-menu" class="hidden fixed inset-0 z-40 bg-surface/95 dark:bg-dark-surface-container-low/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 pt-20">`
      y sus 5 enlaces.
    * Inyectar, inmediatamente antes de `</header>`, el panel anclado con "Inicio" como ítem activo:
      ```html
      <!-- Menú Móvil Desplegable (panel anclado bajo la barra) -->
      <div id="mobile-menu" class="hidden lg:hidden absolute top-full left-0 w-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-surface dark:bg-dark-surface-container-low border-t border-outline-variant/30 shadow-[0_8px_24px_rgba(53,54,58,0.12)]">
          <nav class="flex flex-col px-margin-mobile" aria-label="Navegación móvil">
              <a aria-current="page" class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-primary font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="inicio" href="./index.html">Inicio</a>
              <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="servicios" href="./servicios.html">Servicios</a>
              <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="suscripcion-floral" href="./suscripcion-floral.html">Suscripción Floral</a>
              <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="galeria" href="./galeria.html">Galería</a>
              <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="contacto" href="./contacto.html">Contacto</a>
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
    * Reglas de diseño no negociables:
        - **Fondo sólido** (sin `backdrop-blur` ni transparencia): un `backdrop-filter` anidado dentro del header no
          desenfoca la página y la opacidad garantiza el contraste sobre el Hero oscuro.
        - **Solo tokens reactivos** en el panel. Prohibido `primary-brand` (uso único: CTA del Hero, DESIGN.md §2.4) y
          prohibido combinar un fondo reactivo con un primer plano congelado (DESIGN.md §2.1).
        - **`lg:hidden`** en el panel y en la capa tenue: jamás deben verse en escritorio.
        - **Ningún descendiente del `<header>` con la clase `fixed`.** La capa tenue vive fuera del header.
        - **Sin animaciones ni transiciones de entrada** en esta fase.

5. **Auditoría de No-Regresión e Invariantes:**
    * **Escritorio intacto:** la `<nav class="hidden lg:flex ...">` (con "Inicio" activo y su subrayado `scale-x-100`) y
      el `<footer>` permanecen sin cambios; a partir de `lg` el header luce idéntico al anterior.
    * **Contenido de la portada:** el Hero `#titular` (`-mt-20` bajo la barra y animación `hero-reveal`), sus CTAs con
      `href="#servicios"` y `href="#suscripcion"` (anclas internas legítimas: no modificar), Beneficios Operativos,
      Servicios Destacados, Suscripción Floral, Galería Kinfolk, Carrusel de Testimonios (`carousel.js`) y Newsletter
      permanecen 100% intactos.
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
    * **Dado** el archivo `index.html` en viewports de 320, 360 y 412 px de ancho (y de 768 px)
    * **Cuando** la página termina de cargar
    * **Entonces** la barra muestra únicamente el logotipo PNG, "La Jardinera" en **una sola línea**, el conmutador de
      tema y el botón de menú; Instagram y WhatsApp no aparecen en la barra; no hay solapamientos ni scroll horizontal;
      y los botones de tema y menú miden al menos 44 × 44 px.
* **Escenario 2: Panel Anclado, Legible y con Estado Activo**
    * **Dado** el archivo `index.html` en un viewport móvil, con el Hero oscuro detrás de la barra, en modo claro y en
      modo oscuro
    * **Cuando** el usuario pulsa `#mobile-menu-btn`
    * **Entonces** el panel aparece inmediatamente bajo la barra, a ancho completo y con fondo sólido; se ven los 5
      enlaces (con "Inicio" en `text-primary font-semibold` y `aria-current="page"`) y los botones WhatsApp e
      Instagram, todos con texto legible (contraste WCAG AA); el resto de la página queda atenuado por la capa tenue; y
      ningún elemento del panel queda fuera de la pantalla (en un viewport bajo, como 740×360, el panel hace scroll
      interno).
* **Escenario 3: Cierre, Teclado y Accesibilidad**
    * **Dado** el menú abierto en `index.html`
    * **Cuando** el usuario pulsa de nuevo el botón, pulsa `Escape`, toca la capa tenue, pulsa cualquier enlace del
      panel o ensancha el viewport a `>= 1024 px`
    * **Entonces** el menú se cierra en todos los casos, `aria-expanded` vuelve a `false`, el ícono vuelve a ☰, el
      `aria-label` vuelve a "Abrir menú" y el scroll del `<body>` se desbloquea; con `Escape` el foco regresa al botón.
      Con el menú abierto, `aria-expanded="true"`, el ícono es ✕ y el `aria-label` es "Cerrar menú".
* **Escenario 4: Cero Regresión en Escritorio y en la Portada**
    * **Dado** `index.html` a `>= 1024 px`, en modo claro y oscuro
    * **Cuando** se recorre la página y se alterna el tema con `#theme-toggle-btn`
    * **Entonces** el header muestra la navegación extendida, Instagram, WhatsApp y tema (36 px) con la hamburguesa
      oculta; el panel y la capa tenue nunca son visibles; la *View Transitions API*, el Hero, el carrusel de
      testimonios y el resto de secciones funcionan igual que antes; y la consola no registra errores.
* **Escenario 5: Retrocompatibilidad del Módulo Compartido**
    * **Dado** `servicios.html` (aún con el drawer anterior, sin modificar) y el nuevo `navigation.js`
    * **Cuando** se pulsa `#mobile-menu-btn` en un viewport móvil
    * **Entonces** el drawer anterior se abre y se cierra sin errores de consola (los elementos opcionales
      `#mobile-menu-scrim` e íconos se ignoran) y esta iteración no modificó ningún archivo distinto de `index.html` y
      `navigation.js`.