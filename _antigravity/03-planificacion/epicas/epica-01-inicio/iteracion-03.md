# Iteración 03: Maquetación Estructural y Estandarización de SVGs

**Objetivo:** Refactorizar las secciones transversales (`<header>`, `#titular`, `<footer>`) y reemplazar cualquier icono de fuente externa por SVGs integrados en el HTML.

## Tareas
1. Descargar los iconos necesarios (menú, luna/sol, teléfono, email, ubicación, estrellas de valoración, flechas de navegación, iconos de redes sociales) desde Material Symbols Light (Google).
2. Eliminar del `<head>` la importación de `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined..." />`[cite: 1].
3. Reemplazar todas las etiquetas `<span class="material-symbols-outlined">...</span>`[cite: 1] por etiquetas `<svg>` con el código SVG nativo.
4. Refactorizar el `<header>` (asegurando el funcionamiento del menú móvil con `navigation.js`).
5. Refactorizar el Hero (`#titular`), asegurando que las clases de fondo y la estructura se mantengan semánticas[cite: 1].
6. Refactorizar el `<footer>` con sus 4 columnas de contenido[cite: 1].

## Criterios de Aceptación

*   **Escenario 1: Iconografía independiente**
    *   **Dado** el archivo `index.html` desconectado de internet (offline)
    *   **Cuando** se carga la página en el navegador
    *   **Entonces** todos los iconos (redes sociales, métodos de pago, controles) deben renderizarse perfectamente a través de SVGs.

*   **Escenario 2: Componentes estructurales**
    *   **Dado** el archivo `index.html`
    *   **Cuando** el usuario navega por la cabecera y el pie de página
    *   **Entonces** el diseño debe coincidir visualmente con la plantilla original utilizando las nuevas clases locales compiladas.