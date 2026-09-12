# Iteración 05: Interactividad Compleja (Vanilla JS)

**Objetivo:** Dar funcionalidad real a los componentes interactivos del `index.html` utilizando los módulos ES6 definidos en la Iteración 02.

## Tareas
1. En `carousel.js`, implementar la lógica de desplazamiento para el `#testimonials-carousel`[cite: 1], conectando los botones `#prev-testimonial` y `#next-testimonial`[cite: 1] para mover el contenedor basándose en el ancho de las tarjetas (`scrollLeft`).
2. En `modal.js`, implementar la lógica para abrir el `#service-modal`[cite: 1] cuando el usuario haga clic en enlaces específicos o tarjetas, bloqueando el scroll del `<body>`.
3. Implementar el cierre del modal al hacer clic en el botón `.close-modal-btn`[cite: 1], pulsar la tecla `Escape` o hacer clic en el área oscura `.modal-overlay`[cite: 1].
4. Asegurar que estas interacciones mantengan la accesibilidad (gestión del foco del teclado y atributos `aria-hidden`).

## Criterios de Aceptación

*   **Escenario 1: Navegación del carrusel**
    *   **Dado** la sección de testimonios
    *   **Cuando** el usuario hace clic en las flechas de navegación
    *   **Entonces** el contenedor debe desplazarse horizontalmente de forma suave (smooth scroll) revelando las siguientes tarjetas.

*   **Escenario 2: Flujo del modal**
    *   **Dado** un usuario interactuando con la interfaz
    *   **Cuando** se activa un trigger del modal
    *   **Entonces** el modal se muestra con una transición suave, el scroll de fondo se deshabilita, y puede cerrarse mediante clic fuera, botón "X" o tecla Escape.