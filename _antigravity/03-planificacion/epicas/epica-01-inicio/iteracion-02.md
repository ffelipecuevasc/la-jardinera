# Iteración 02: Modularización JavaScript (ES6+) y Preparación de Tema

**Objetivo:** Extraer todo el comportamiento interactivo del HTML y separarlo en módulos lógicos que se importen desde un único punto de entrada, dejando el terreno listo para la animación de cambio de tema.

## Tareas
1. Crear el punto de entrada principal `src/js/main.js` y agregarlo al final del `index.html` con `type="module"`[cite: 1].
2. Crear `src/js/modules/theme.js` para migrar la lógica actual del `<head>`[cite: 1] (detección de `localStorage` y `prefers-color-scheme`), preparando una función exportable `toggleTheme()` que luego recibirá el efecto especial.
3. Crear `src/js/modules/navigation.js` para el manejo del menú móvil (`#mobile-menu-btn` y `#mobile-menu`)[cite: 1].
4. Crear `src/js/modules/carousel.js` para la lógica futura del slider de testimonios.
5. Crear `src/js/modules/modal.js` para el manejo del modal de servicios.
6. Importar e inicializar todos estos módulos en `main.js`.

## Criterios de Aceptación

*   **Escenario 1: Modularidad estricta**
    *   **Dado** el archivo `index.html`
    *   **Cuando** se inspecciona su código fuente
    *   **Entonces** no debe existir ninguna etiqueta `<script>` que contenga código lógico en línea, solo el import a `main.js`.

*   **Escenario 2: Preparación del modo oscuro**
    *   **Dado** el módulo `theme.js`
    *   **Cuando** se invoca la función de cambio de tema
    *   **Entonces** la clase `dark` debe alternarse correctamente en el elemento `<html>`[cite: 1], a la espera de integrar la librería de transición visual.