# Iteración 03: Aislamiento Gráfico (SVGs Nativos) y Semántica Estructural

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Antes de modificar el código, debes planificar mentalmente cómo inyectar SVGs puros en lugar de fuentes tipográficas,
asegurando que hereden correctamente el color (`currentColor`) y el tamaño de las clases utilitarias existentes, para
garantizar **CERO regresión visual (Zero Layout Shift)**.

## 1. Objetivo de la Iteración

Optimizar drásticamente el rendimiento de carga (FCP) eliminando la dependencia de llamadas de red a
`fonts.googleapis.com`. Reemplazar todos los íconos por código SVG en línea nativo y afinar la semántica del `<header>`,
el Hero (`#titular`) y el `<footer>`, asegurando que los "hooks" de JavaScript (IDs) estén correctamente posicionados.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Desvinculación de Red (Limpieza del `<head>`):**
    * Elimina estrictamente las etiquetas `<link>` que importan la fuente `Material+Symbols+Outlined` desde Google
      Fonts.
2. **Inyección de SVGs Nativos (Reemplazo Quirúrgico):**
    * Busca exhaustivamente todas las etiquetas `<span class="material-symbols-outlined">...</span>` en todo el
      `index.html`.
    * Sustituye cada `<span>` por su etiqueta `<svg>` equivalente (usando atributos estándar:
      `xmlns="http://www.w3.org/2000/svg"`, `viewBox="0 0 24 24"`, `fill="currentColor"`).
    * **Regla de Oro:** Traspasa *exactamente* las mismas clases de Tailwind de tamaño y color (ej. `text-[18px]`,
      `text-primary`, `transition-all`) que tenía el `<span>` hacia la nueva etiqueta `<svg>` para no romper el diseño.
3. **Refactorización del `<header>` (JS Hooks y a11y):**
    * Asegúrate de que el botón del menú móvil tenga el atributo `id="mobile-menu-btn"` y el contenedor del menú móvil
      tenga `id="mobile-menu"` (necesarios para `navigation.js`).
    * Asegura que los botones sin texto tengan el atributo `aria-label` descriptivo.
4. **Afinamiento del Hero (Id `#titular`):**
    * Localiza la sección del Hero (la primera `<section>` después del header).
    * Asegúrate de que tenga el atributo `id="titular"`.
    * No modifiques las clases de posicionamiento absoluto ni la lógica de la imagen de fondo (`bg-cover`, *scrims*
      oscuros). Solo mejora la estructura semántica si es estrictamente necesario, manteniendo las clases visuales
      intactas.
5. **Refactorización Semántica del `<footer>`:**
    * Asegura el uso correcto de etiquetas semánticas dentro del grid de 4 columnas (uso de `<nav>` para enlaces,
      `<address>` si corresponde).
    * Convierte todos sus íconos a SVG siguiendo la regla de la Tarea 2.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Independencia Estática (Offline)**
    * **Dado** el proyecto compilado localmente
    * **Cuando** se visualiza la web sin conexión a internet (offline)
    * **Entonces** todos los íconos (menú, red social, sol/luna, flechas, estrellas) se renderizan perfectamente, y no
      hay peticiones a redes externas bloqueando el render.
* **Escenario 2: Fidelidad Estructural Absoluta**
    * **Dado** los componentes `<header>`, Hero y `<footer>`
    * **Cuando** un usuario interactúa con la interfaz
    * **Entonces** el tamaño de los íconos, alineaciones y colores son 100% idénticos al diseño original renderizado en
      la iteración previa.
* **Escenario 3: Accesibilidad (a11y)**
    * **Dado** el código fuente HTML
    * **Cuando** se audita con Lighthouse
    * **Entonces** no deben existir advertencias por botones sin nombres accesibles (`aria-label` en SVGs).