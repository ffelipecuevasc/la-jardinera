# Iteración 05: Interactividad Compleja y Accesibilidad (Vanilla JS)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Esta iteración introduce lógica de UI compleja (Carrusel y Modal). Debes aplicar **Programación Defensiva**: antes de
añadir Event Listeners, verifica si los elementos del DOM existen. Debes cumplir estrictamente con los estándares W3C de
accesibilidad para modales (Focus Trap, teclas de escape) y carruseles (scroll suave y soporte táctil).

## 1. Objetivo de la Iteración

Dar vida a los componentes interactivos del `index.html` orquestando la lógica desde los módulos ES6 creados previamente
(`carousel.js` y `modal.js`). Todo debe realizarse en Vanilla JavaScript puro, sin librerías externas y asegurando
navegación total por teclado.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Refactorización HTML para JS Hooks (Preparación):**
    * Añade los IDs o `data-attributes` necesarios en el `index.html` para el carrusel de testimonios (ej.
      `id="testimonials-carousel"`, botones `id="prev-btn"`, `id="next-btn"`).
    * Asegúrate de que el contenedor del carrusel tenga clases de Tailwind para scroll nativo ocultando la barra (ej.
      `overflow-x-auto snap-x snap-mandatory flex gap-*`).
2. **Módulo Carrusel (`src/js/modules/carousel.js`):**
    * Implementar la lógica de desplazamiento calculando el ancho del primer elemento hijo (`clientWidth`) o usando un
      valor fijo lógico.
    * Aplicar el desplazamiento al contenedor mediante `element.scrollBy({ left: valor, behavior: 'smooth' })`.
    * Asegurar que los hijos del carrusel tengan clases `snap-center` o `snap-start`.
3. **Módulo Modal (`src/js/modules/modal.js`):**
    * Crear (si no existe en el HTML) un contenedor base oculto para un modal genérico, con un *overlay* (fondo oscuro)
      y un botón de cierre "X".
    * Implementar la lógica de apertura que:
        1) Quite la clase `hidden`.
        2) Añada `overflow: hidden` al `<body>` para bloquear el scroll de fondo.
        3) Añada el atributo `aria-expanded="true"`.
    * Implementar la lógica de cierre (clic en la "X", clic en el *overlay*, o presionando la tecla `Escape`).
4. **Accesibilidad y Focus Trap (CRÍTICO):**
    * Al abrir el modal, el foco del teclado debe moverse automáticamente al primer elemento enfocable dentro del modal.
    * Al cerrar el modal, el foco debe regresar al botón que lo abrió.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Carrusel Fluido y Nativo**
    * **Dado** la sección de reseñas
    * **Cuando** el usuario hace clic en las flechas de navegación
    * **Entonces** el contenedor hace scroll horizontal suavemente, respetando el CSS Scroll Snap, sin importar el
      tamaño de la pantalla.
* **Escenario 2: Flujo Seguro del Modal**
    * **Dado** un usuario que activa el modal
    * **Cuando** intenta hacer scroll en la página
    * **Entonces** el fondo permanece inmóvil. Y puede cerrar el modal usando exclusivamente el teclado (tecla Escape).
* **Escenario 3: Código Defensivo**
    * **Dado** una vista que no contenga el carrusel o el modal
    * **Cuando** `main.js` importe y ejecute los módulos
    * **Entonces** no debe arrojar ningún error (`TypeError: Cannot read properties of null`) en la consola del
      navegador.