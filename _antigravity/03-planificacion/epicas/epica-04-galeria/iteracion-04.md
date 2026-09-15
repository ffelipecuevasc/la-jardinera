# Iteración 04: Accesibilidad (a11y), Navegación por Teclado y Dark Mode

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Un Lightbox que no se puede operar con el teclado es una grave infracción de accesibilidad. Tu misión es aplicar un
"Focus Trap" estricto mientras el Lightbox está abierto, habilitar la navegación a través de atajos de teclado (`Esc`,
`ArrowLeft`, `ArrowRight`) y asegurar que el entorno global oculte el contenido principal a los lectores de pantalla
temporalmente.

## 1. Objetivo de la Iteración

Convertir la galería y el Lightbox en componentes 100% accesibles según las normas WCAG 2.1. Proveer atajos de teclado
universales, bloquear la navegación del fondo y asegurar que la interfaz del Lightbox y los marcadores de paginación
resalten correctamente en Modo Oscuro (Dark Mode).

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Atajos de Teclado y Listeners Globales (`gallery.js`):**
    * Añadir un evento de escucha `keydown` a nivel de `document`.
    * Si el Lightbox NO está `hidden`:
        - Tecla `Escape`: Dispara la función de cierre.
        - Tecla `ArrowLeft`: Dispara la función `prev()`.
        - Tecla `ArrowRight`: Dispara la función `next()`.

2. **Gestión de Foco (Focus Trap y Restauración):**
    * **Ocultar el fondo:** Cuando se abra el Lightbox, aplicar `aria-hidden="true"` (o `inert`) al `<main>`, `<header>`
      y `<footer>`. Removerlo al cerrar.
    * **Atrapar el foco:** Crear la lógica para que el botón `Tab` solo cicle entre los elementos enfocables del
      Lightbox (Cerrar, Prev, Next y el propio `<video>` si lo hay).
    * **Restauración:** Almacenar la referencia del `<button class="gallery-carousel-card">` que el usuario clicó. Al
      cerrar el Lightbox, ejecutar `.focus()` sobre esa tarjeta para no perder al usuario en el flujo de la página.

3. **Atributos Semánticos (ARIA):**
    * Asegurarse de que el `#lightbox` tenga `role="dialog"`, `aria-modal="true"` y un `aria-label="Visor de galería"`.
    * Los botones de control interno deben tener `aria-label="Cerrar visor"`, `aria-label="Imagen anterior"`, y
      `aria-label="Imagen siguiente"`.

4. **Auditoría UI - Dark Mode y Controles Móviles (`galeria.html`):**
    * Revisar los "puntos" de paginación móvil (`.carousel-dots`), si se deciden mantener para el scroll horizontal,
      asegurarse de que su estado inactivo tenga contraste suficiente y su estado activo (`.active`) use colores
      primarios (`bg-primary`).
    * Validar que el overlay oscuro del Lightbox (`bg-dark-background/95`) funcione correctamente visualmente sin
      importar si el usuario está en modo claro o modo oscuro.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Control Total por Teclado**
    * **Dado** un usuario que navega sin ratón
    * **Cuando** abre el Lightbox
    * **Entonces** puede avanzar de imagen usando la flecha derecha, retroceder con la flecha izquierda, pausar un video
      con el tabulador + espacio, y salir apretando Escape.
* **Escenario 2: Secuestro Positivo (Focus Management)**
    * **Dado** el visor activado
    * **Cuando** el usuario pulsa repetidamente la tecla `Tab`
    * **Entonces** el foco no se escapa hacia los enlaces ocultos del Footer o el Header, sino que cicla entre los
      controles del visor. Al cerrarse, el foco retorna a la miniatura original en la grilla.
* **Escenario 3: Compatibilidad de Módulo**
    * **Dado** la implementación total de la galería
    * **Cuando** se analizan todos los comportamientos (Accordion, Modo Claro/Oscuro, A11y, WebP)
    * **Entonces** la página mantiene un 100/100 en Lighthouse y el código modular se encuentra exento de fugas de
      memoria o errores en consola.