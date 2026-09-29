# Iteración 02: Layout Central y Tarjetas de Contacto Premium

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
El objetivo de esta iteración es inyectar la cuadrícula central con las tarjetas de comunicación (WhatsApp y Email). No
necesitas crear módulos JS nuevos, toda la interacción debe resolverse a través de los tokens y clases de estado
(`hover`, `group-hover`) nativos de Tailwind CSS. Toda iconografía debe ser puramente vectorial (SVGs) y el
comportamiento debe adaptarse fluidamente a Modo Oscuro.

## 1. Objetivo de la Iteración

Construir una interfaz de contacto directa y de lujo. Se implementarán dos grandes tarjetas interactivas que funcionen
como botones directos (`href="https://wa.me/..."` y `href="mailto:..."`). El diseño debe usar sutiles efectos de
elevación y transformaciones (`translate-y`) para incentivar el clic.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Encabezado Editorial (`<main>`):**
    * Dentro del contenedor `<main>`, crear un `div` contenedor maestro
      (`max-w-[80rem] mx-auto px-margin-mobile lg:px-margin-desktop w-full py-space-10`).
    * Inyectar el bloque editorial de título centrado:
        - Separador superior con rombo: `✦`.
        - Sobretítulo (Kicker): "Conversemos" (`font-label-md text-primary uppercase`).
        - Título H1: "Estamos aquí para ti" (`font-headline-xl text-on-surface dark:text-dark-on-background`).
        - Párrafo descriptivo breve.

2. **Grilla de Tarjetas de Contacto:**
    * Crear una cuadrícula para las dos tarjetas: `grid grid-cols-1 md:grid-cols-2 gap-space-6 max-w-4xl mx-auto`.
    * **Base de la Tarjeta (Link):**
        - Ambas tarjetas deben ser etiquetas `<a>` para asegurar accesibilidad por teclado.
        - Clases base:
          `group relative flex flex-col items-center p-space-8 bg-surface dark:bg-dark-surface-container-low rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-outline-variant/30 dark:border-dark-surface-variant text-center overflow-hidden`.
    * **Efecto Glass/Glow interno:**
        - Incluir un `div` absoluto que funcione como resplandor al hacer hover:
          `absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`.

3. **Construcción de Tarjeta 1 (WhatsApp):**
    * **Enlace:** `href="https://wa.me/56997702832"` con `target="_blank" rel="noopener noreferrer"`.
    * **Icono:** Contenedor circular (`w-20 h-20 rounded-full bg-primary/10 text-primary group-hover:scale-110`).
      Dentro, inyectar un SVG vectorial nativo de WhatsApp con `fill="currentColor"`.
    * **Textos:** Título "Escríbenos por WhatsApp", seguido del número "+56 9 9770 2832".
    * **Llamado a la Acción (Oculto):** Un bloque inferior
      (`opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0`) que diga "Iniciar Chat" con una
      flecha SVG.

4. **Construcción de Tarjeta 2 (Email):**
    * **Enlace:** `href="mailto:lajardinera.floreria@gmail.com"`.
    * **Icono:** Mismo contenedor circular que la tarjeta anterior. Inyectar un SVG vectorial nativo de un Sobre
      (Email/Gmail) con `fill="currentColor"`.
    * **Textos:** Título "Envíanos un Correo", seguido del email "lajardinera.floreria@gmail.com".
    * **Llamado a la Acción (Oculto):** Mismo bloque inferior revelable que diga "Redactar Email" con una flecha SVG.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Navegación Funcional y Semántica**
    * **Dado** las tarjetas de contacto
    * **Cuando** el usuario hace clic en WhatsApp o en el Email
    * **Entonces** el navegador abre correctamente la API de WhatsApp Web/App y el cliente de correo por defecto,
      respectivamente.
* **Escenario 2: Interacción Táctil y Visual (UI/UX)**
    * **Dado** el layout de escritorio
    * **Cuando** el ratón se posiciona sobre una tarjeta (`hover`)
    * **Entonces** la tarjeta se eleva fluidamente (`translate-y-2`), el ícono circular crece (`scale-110`), y aparece
      mágicamente el texto inferior de "Iniciar Chat" o "Redactar Email".
* **Escenario 3: Pureza de Recursos (Rendimiento 100/100)**
    * **Dado** el código de la página
    * **Cuando** es analizado en el inspector
    * **Entonces** no existen llamadas a librerías de fuentes icónicas externas ni imágenes rasterizadas para los logos
      de WhatsApp/Email. Todo está renderizado a partir de trazos matemáticos `<svg>` que responden perfectamente al
      `currentColor` en Modo Claro y Oscuro.