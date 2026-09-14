# Iteración 03: Arquitectura JS del Modal y Refactorización de Datos (Seguridad y Rendimiento)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
El archivo `servicios.html` antiguo comete un pecado capital de arquitectura: almacena cadenas completas de HTML
(párrafos, listas, títulos) dentro del atributo `data-description` de los botones. Esto infla el tamaño del DOM, viola
el principio de Separación de Responsabilidades y abre vectores para vulnerabilidades XSS. Tu misión es extraer toda esa
información y construir un diccionario de datos (JSON/Objeto) en un módulo JS dedicado. El HTML solo debe tener un
identificador único (ej. `data-service-id="suscripcion"`).

## 1. Objetivo de la Iteración

Refactorizar completamente la lógica y la estructura de datos del Modal de Servicios. Aislar el contenido textual y las
rutas de las galerías en un módulo JS estático (`src/js/data/services.js`). Reescribir el módulo
`src/js/modules/modal.js` para que consulte este diccionario, inyecte el contenido de manera segura (sanitizada) en el
DOM, orqueste la animación SVG del modal y genere la cuadrícula de la galería fotográfica de forma dinámica.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Creación del Diccionario de Datos (`src/js/data/services.js`):**
    * Crear este nuevo archivo y exportar una constante `servicesData`.
    * Mapear cada uno de los 8 servicios utilizando una clave única (ej. `suscripcion`, `gift-cards`, `novias`, etc.).
    * Cada objeto debe contener: `title`, `mainImage` (ruta `.webp`), `description` (el HTML limpio y revisado), y
      `gallery` (Array de rutas fotográficas `.webp`).

2. **Limpieza Quirúrgica del HTML (`servicios.html`):**
    * Ir a los botones "Ver más" (clase `open-modal-btn`) de las 8 tarjetas.
    * Eliminar los atributos `data-title`, `data-main-image`, `data-description` y `data-gallery`.
    * Reemplazarlos exclusivamente por un único atributo: `data-service-id="[clave-del-servicio]"`.
    * Asegurar que el HTML base del modal (el cascarón invisible al final del `<body>`) esté adaptado con las clases
      Tailwind premium de la Épica 01 (fondos desenfocados `backdrop-blur-sm`, bordes `border-surface-variant`).

3. **Reescritura del Módulo JS (`src/js/modules/modal.js`):**
    * Importar `servicesData` en este módulo.
    * Modificar el Event Listener de los botones para capturar el `service-id`.
    * **Inyección Dinámica:**
        - Rellenar `#modal-title` con el título.
        - Cambiar el `src` de `#modal-main-image`.
        - Inyectar el HTML de descripción en `#modal-description` usando `innerHTML` (o idealmente métodos DOM seguros
          si se requiere strict mode).
    * **Galería Dinámica:**
        - Vaciar `#modal-gallery-container`.
        - Iterar sobre el array `gallery` y crear elementos `<img>` con clases de Tailwind
          (`w-full aspect-square object-cover rounded-lg shadow-sm`).
        - Añadir `loading="lazy"` a las imágenes de la galería para no bloquear el hilo principal al abrir el modal.

4. **Animación SVG del Borde (El toque Premium):**
    * El modal incluye un anillo SVG que se dibuja alrededor de la imagen principal.
    * Asegurarse de que en `modal.js`, al abrir el modal (clase `hidden` removida), se dispare un pequeño `setTimeout`
      (aprox 50ms) que cambie el valor de `stroke-dashoffset` a `0` para que el círculo se dibuje de manera suave
      (`transition-[stroke-dashoffset] duration-1000 ease-in-out`).
    * Al cerrar el modal, resetear el `stroke-dashoffset` a su valor original (`578`) para que esté listo la próxima
      vez.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Separación de Responsabilidades (MVC Frontend)**
    * **Dado** el código fuente de `servicios.html`
    * **Cuando** se inspecciona un botón de "Ver más"
    * **Entonces** el botón no contiene ningún dato de texto o ruta de imagen, solo posee el identificador
      `data-service-id`. Toda la data está aislada en `services.js`.
* **Escenario 2: Renderizado Dinámico y Seguro**
    * **Dado** un usuario interactuando con la vista
    * **Cuando** hace clic en la tarjeta "Novias y Novios"
    * **Entonces** el modal se abre fluidamente, el texto se renderiza perfectamente parseando el HTML, y la galería
      inferior muestra las imágenes en una grilla responsiva (ej. `grid grid-cols-2 gap-4`).
* **Escenario 3: Animación Holística**
    * **Dado** el modal abriéndose
    * **Cuando** el panel se despliega en pantalla
    * **Entonces** la línea circular SVG alrededor de la fotografía principal se dibuja gradualmente (durante 1 segundo)
      añadiendo una micro-interacción de alta fidelidad.