# Iteración 01: Encofrado Base y Clonación de UI Global (Header/Footer)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Para esta iteración, tu fuente de la verdad **NO** es el archivo `servicios.html` antiguo, sino el `index.html` que ya
refactorizamos en la Épica 01. Debes extraer el esqueleto perfecto (Head, Header, Footer) del `index.html` actual,
clonarlo en `servicios.html` y realizar ajustes quirúrgicos en los metadatos y en los estados activos ("active states")
de la barra de navegación. El objetivo es que al navegar entre el Inicio y Servicios, el usuario no note absolutamente
ningún salto estructural.

## 1. Objetivo de la Iteración

Establecer los cimientos arquitectónicos del nuevo `servicios.html`. Se debe purgar el código *legacy* (fuentes de
Google, llamadas a Material Symbols, scripts en línea) y reemplazarlo por la estructura unificada del proyecto,
garantizando que herede instantáneamente los estilos locales de Tailwind CSS y la lógica de nuestros módulos Vanilla JS
(Menú Móvil y View Transitions API para Modo Oscuro).

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Purga y Reemplazo del `<head>`:**
    * Reemplazar todo el `<head>` antiguo de `servicios.html` por el `<head>` del nuevo `index.html`.
    * **Modificación SEO:** Cambiar la etiqueta `<title>` a `Servicios - La Jardinera Florería`.
    * **Modificación SEO:** Añadir una etiqueta
      `<meta name="description" content="Explora nuestros servicios florales: suscripciones, ramos de novia, decoración de eventos y más. Diseño floral con un toque editorial en Valdivia." />`.
    * Asegurar que el CSS apunte correctamente a `./dist/css/output.css`.

2. **Clonación y Ajuste del `<header>` (Barra de Navegación):**
    * Copiar la etiqueta `<header>` completa del `index.html` refactorizado.
    * Modificar el "estado activo" (Active State) en la navegación de escritorio (`<nav>`):
        - Quitar las clases de estado activo (`text-primary font-semibold`) del enlace "Inicio" y devolverle las clases
          base (`text-on-surface-variant hover:text-on-surface`).
        - Aplicar las clases de estado activo (`text-primary font-semibold`) al enlace "Servicios".
    * Asegurar que los SVGs inyectados en la Épica 01 (Instagram, WhatsApp, Toggle Theme, Menú Móvil) y el nuevo logo
      oficial PNG estén intactos.

3. **Clonación del `<footer>` y Scripts:**
    * Copiar la etiqueta `<footer>` completa del `index.html` refactorizado (asegurando los SVGs nativos, datos de
      contacto de Valdivia, Chile y métodos de pago).
    * Al final del `<body>`, asegurar la llamada al punto de entrada modular:
      `<script type="module" src="./src/js/main.js"></script>`.

4. **Preparación del Contenedor Principal (`<main>`):**
    * Entre el `<header>` y el `<footer>`, inyectar un encofrado base limpio preparado para la Iteración 02:
      `<main class="w-full pt-20 bg-background min-h-screen flex flex-col items-center"></main>`

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Transición Cero Layout Shift (CLS)**
    * **Dado** el sitio web ejecutándose en el navegador
    * **Cuando** un usuario navega haciendo clic entre "Inicio" y "Servicios"
    * **Entonces** el Header y el Footer no deben sufrir ningún parpadeo, cambio de tamaño o desalineación (Pixel
      Perfect Cloning).
* **Escenario 2: Estado Activo (UX)**
    * **Dado** la vista actual de `servicios.html`
    * **Cuando** el usuario observa el menú de navegación principal
    * **Entonces** la palabra "Servicios" debe resaltar en color primario (`text-primary`), indicando claramente la
      ubicación actual.
* **Escenario 3: Herencia Funcional Inmediata**
    * **Dado** el nuevo archivo `servicios.html` sin haber escrito nuevo código JS
    * **Cuando** el usuario hace clic en el botón de Modo Oscuro o abre el menú en móvil
    * **Entonces** las interacciones responden a la perfección, aplicando la *View Transitions API* de manera idéntica
      al Home.