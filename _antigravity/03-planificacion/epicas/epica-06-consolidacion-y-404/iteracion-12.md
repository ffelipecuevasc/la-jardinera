# Iteración 12: Header Móvil Esencial y Panel Anclado en "404.html" y Cierre de Paridad Global del Header

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Esta es la iteración final de la Fase 2 y marca el cierre técnico de la Épica 06. En la Iteración 07 se construyó en
`index.html` el Header Móvil Esencial (Opción 1-A) y el Panel Anclado (Opción 2-B); esa versión es tu **fuente de la
verdad**. `404.html` presenta una particularidad: su drawer usa un patrón **distinto** al del resto del sitio (panel
`absolute top-full` con `lg:hidden`, fondo translúcido `bg-surface/95` y `backdrop-blur-md`), lo que contradice la
matriz de "clases idénticas" de la Iteración 06. Debes reemplazarlo por el panel estandarizado en **estado neutro**
(regla de neutralidad de la 404: ningún enlace activo). Después, ejecuta una **auditoría transversal de paridad** sobre
los 6 documentos antes de dar por cerrada la épica. `navigation.js` ya es compatible: **no lo modifiques**. La
intervención de código se limita **únicamente a `404.html`**; el resto de archivos solo se auditan, no se editan (si la
auditoría detecta una desviación, se reporta sin corregirla en esta iteración).

## 1. Objetivo de la Iteración

Replicar en `404.html` el header maestro de la Fase 2 en estado neutro, eliminando la divergencia estructural de
su drawer, y culminar la Fase 2 con una verificación de paridad de los 6 documentos HTML que certifique que el header y
el menú móvil se comportan de forma idéntica en todo el sitio, en móvil y escritorio, en modo claro y oscuro.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Compactación del Bloque de Marca en `404.html`:**
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
    * Eliminar por completo el `<div id="mobile-menu">` actual de `404.html`: es la variante divergente (`hidden lg:hidden absolute top-full left-0 w-full bg-surface/95 dark:bg-dark-surface-container-low/95 backdrop-blur-md ...`, con el comentario "Estado Neutro") y sus 5 enlaces.
    * Inyectar, inmediatamente antes de `</header>`, el panel estandarizado en **estado neutro** (ningún enlace con `aria-current="page"` ni `text-primary font-semibold`):
      ```html
      <!-- Menú Móvil Desplegable (panel anclado bajo la barra · Estado Neutro: sin enlace activo) -->
      <div id="mobile-menu" class="hidden lg:hidden absolute top-full left-0 w-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-surface dark:bg-dark-surface-container-low border-t border-outline-variant/30 shadow-[0_8px_24px_rgba(53,54,58,0.12)]">
          <nav class="flex flex-col px-margin-mobile" aria-label="Navegación móvil">
              <a class="flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" data-path="inicio" href="./index.html">Inicio</a>
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
    * Regla crítica: ningún descendiente del `<header>` puede llevar la clase `fixed` (causa raíz del defecto original).
    * `navigation.js` ya es compatible con este marcado: **no lo modifiques**.

4. **Auditoría de No-Regresión e Invariantes:**
    * **Contenido de la página:** el `<meta name="robots" content="noindex, follow"/>`, el bloque central (rombo ✦,
      código `404`, título, párrafo) y el botón CTA de retorno a `./index.html` permanecen intactos (fuera de alcance de
      esta épica: no se modifican sus clases).
    * **Escritorio intacto:** la `<nav class="hidden lg:flex ...">` (con sus 5 enlaces en estado neutro, sin `aria-current` ni `text-primary`) y el `<footer>` permanecen sin cambios; a partir de `lg` el header luce idéntico al anterior.
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

5. **Verificación Transversal de Cierre (Matriz de Paridad del Header — 6 Páginas):**
    * Realizar una comprobación de lectura y de render sobre los 6 archivos HTML del proyecto (solo auditoría: no editar
      `index.html`, `servicios.html`, `suscripcion-floral.html`, `galeria.html` ni `contacto.html`). Resultado esperado:

      | Archivo                   | Enlace activo (barra y panel) | Capa `#mobile-menu-scrim` | `fixed` dentro del `<header>` | Panel `#mobile-menu`      |
            |:--------------------------|:------------------------------|:--------------------------|:------------------------------|:--------------------------|
      | `index.html`              | Inicio                        | Presente                  | 0                             | Estándar (anclado)        |
      | `servicios.html`          | Servicios                     | Presente                  | 0                             | Estándar (anclado)        |
      | `suscripcion-floral.html` | Suscripción Floral            | Presente                  | 0                             | Estándar (anclado)        |
      | `galeria.html`            | Galería                       | Presente                  | 0                             | Estándar (anclado)        |
      | `contacto.html`           | Contacto                      | Presente                  | 0                             | Estándar (anclado)        |
      | `404.html`                | Ninguno (estado neutro)       | Presente                  | 0                             | Estándar (anclado)        |

    * **Paridad por bloques:** comparar entre los 6 archivos los bloques (1) marca, (2) clúster de acciones, (3) botón
      `#mobile-menu-btn`, (4) panel `#mobile-menu` y (5) capa `#mobile-menu-scrim`. Deben ser idénticos salvo el estado
      activo (`aria-current="page"` y las clases `text-primary font-semibold` del enlace correspondiente, y el subrayado
      `scale-x-100` en la barra de escritorio).
    * **Zero Dead Links y Rutas de Retorno:** 0 ocurrencias de `href="#"` en barras y footers de navegación; el
      logotipo del `<header>` enlaza a `./index.html` en las 6 páginas.
    * **Compilación global:** `pnpm build` sin advertencias; `dist/css/output.css` contiene las clases del header nuevo.
    * **Render real transversal:** en 360×740 y 1280×800, modo claro y oscuro, abrir y cerrar el menú en las 6 páginas
      (botón, `Escape`, capa tenue y enlace) y confirmar comportamiento idéntico y consola sin errores. Adjuntar
      evidencia.
    * **Reporte de desviaciones:** si algún bloque difiere del estándar, listarlo en la bitácora indicando archivo y
      diferencia, sin corregirlo dentro de esta iteración.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Cabecera Esencial sin Desbordes**
    * **Dado** el archivo `404.html` en viewports de 320, 360 y 412 px de ancho (y de 768 px)
    * **Cuando** la página termina de cargar
    * **Entonces** la barra muestra únicamente el logotipo PNG, "La Jardinera" en **una sola línea**, el conmutador de
      tema y el botón de menú; Instagram y WhatsApp no aparecen en la barra; no hay solapamientos ni scroll horizontal;
      y los botones de tema y menú miden al menos 44 × 44 px.
* **Escenario 2: Panel Anclado, Legible y en Estado Neutro**
    * **Dado** el archivo `404.html` en un viewport móvil, sobre el bloque central de error, en modo claro y en modo oscuro
    * **Cuando** el usuario pulsa `#mobile-menu-btn`
    * **Entonces** el panel aparece inmediatamente bajo la barra, a ancho completo y con fondo sólido; se ven los 5
      enlaces (ninguno resaltado, por ser una página de error) y los botones WhatsApp e Instagram, todos con texto legible (contraste WCAG AA); el
      resto de la página queda atenuado por la capa tenue; y ningún elemento del panel queda fuera de la pantalla (en
      un viewport bajo, como 740×360, el panel hace scroll interno).
* **Escenario 3: Comportamiento Consistente del Módulo Compartido**
    * **Dado** el menú abierto en `404.html`
    * **Cuando** el usuario pulsa de nuevo el botón, pulsa `Escape`, toca la capa tenue, pulsa cualquier enlace del
      panel o ensancha el viewport a `>= 1024 px`
    * **Entonces** el menú se cierra en todos los casos, `aria-expanded` vuelve a `false`, el ícono vuelve a ☰, el
      `aria-label` vuelve a "Abrir menú" y el scroll del `<body>` se desbloquea; con `Escape` el foco regresa al botón.
      Con el menú abierto, `aria-expanded="true"`, el ícono es ✕ y el `aria-label` es "Cerrar menú". `navigation.js` no
      fue modificado en esta iteración.
* **Escenario 4: Cero Regresión en Escritorio y en la Página de Error**
    * **Dado** `404.html` a `>= 1024 px` y en móvil con el menú cerrado, en modo claro y oscuro
    * **Cuando** el usuario visualiza la página, alterna el tema y pulsa el botón CTA de regreso
    * **Entonces** el header de escritorio luce idéntico al anterior (5 enlaces en estado neutro); el CTA navega a `./index.html`; la *View Transitions API* funciona sin parpadeos; y la consola no registra errores.
* **Escenario 5: Paridad Global de las 6 Páginas**
    * **Dado** los 6 documentos HTML y el proyecto compilado con `pnpm build`
    * **Cuando** se recorren en un viewport móvil y en escritorio, en modo claro y oscuro, abriendo y cerrando el menú
      en cada uno
    * **Entonces** el header y el menú móvil se comportan de forma idéntica en todo el sitio, cada página refleja su
      estado activo (la 404, ninguno), no existen scroll horizontal ni errores en consola, la *View Transitions API*
      funciona uniformemente y la Fase 2 queda certificada sobre el **render real**, no solo sobre el marcado.