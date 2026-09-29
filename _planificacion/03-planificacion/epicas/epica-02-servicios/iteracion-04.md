# Iteración 04: Accesibilidad (a11y), Focus Trap y Pulido Final (Dark Mode)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Un desarrollo frontend premium no está completo hasta que es 100% usable sin un ratón y comprensible para lectores de
pantalla (Screen Readers). Tu enfoque en esta iteración es estrictamente conductual y semántico. Debes implementar un
"Focus Trap" (trampa de foco) robusto en Vanilla JS para el modal, asegurar el cumplimiento de ARIA y garantizar que el
contraste de colores dentro del modal en "Dark Mode" mantenga la legibilidad y la elegancia que definimos en los tokens.

## 1. Objetivo de la Iteración

Cumplir con las directrices de accesibilidad WCAG 2.1 para componentes dinámicos (Modales). Al aislar la interacción del
usuario dentro del panel del modal, bloqueamos el acceso al fondo (scroll y foco). Adicionalmente, se realizará la
auditoría final de las clases de Tailwind de Modo Oscuro (`dark:`) en el contenido inyectado para asegurar contraste
óptimo.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Atributos ARIA y Semántica (HTML):**
    * Al contenedor principal oculto del modal (`#service-modal`), añadir los atributos: `role="dialog"`,
      `aria-modal="true"` y `aria-hidden="true"`.
    * Enlazar el título dinámico al modal agregando `aria-labelledby="modal-title"`.
    * Al botón de cierre (la "X"), asegurar que posea `aria-label="Cerrar ventana de detalles del servicio"`.

2. **Implementación de Focus Trap (`src/js/modules/modal.js`):**
    * **Bloqueo de navegación trasera:** Cuando el modal se abra, inyectar el atributo `inert` o `aria-hidden="true"` al
      contenedor `<main>` (y `<header>`/`<footer>` si es posible) para esconder el sitio base de los lectores de
      pantalla temporalmente.
    * **Captura de Teclado:** Crear un array con todos los elementos enfocables dentro del