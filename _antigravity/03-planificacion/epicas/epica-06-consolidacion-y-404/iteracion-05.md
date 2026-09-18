# Iteración 05: Paridad de Menú Móvil y Normalización de Enlaces en "galeria.html"

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Durante la Épica 04, el archivo `galeria.html` recibió un contenedor de menú móvil, pero es fundamental auditar que sus
clases de diseño coincidan al 100% con el estándar final adoptado en las iteraciones previas
(`bg-surface/95 dark:bg-dark-surface-container-low/95 backdrop-blur-md`). Asimismo, se debe verificar que todos los
enlaces del Navbar (Desktop y Móvil) y del Footer apunten con exactitud a los archivos locales reales (`./*.html`),
erradicando cualquier residuo de anclas vacías (`href="#"`). Tu intervención está estrictamente confinada a **
`galeria.html`**.

## 1. Objetivo de la Iteración

Garantizar que `galeria.html` cuente con el drawer `#mobile-menu` formalmente estandarizado y tokenizado, sincronizar de
manera exclusiva el estado activo en "Galería" en todos los niveles de navegación (Desktop, Móvil y Footer), normalizar
los atributos `href` de redirección y asegurar que la lógica de la galería (Acordeón Flex-Grow y Lightbox multimodal)
permanezca inmune a regresiones.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Estandarización del Drawer `#mobile-menu` en `galeria.html`:**
    * Localizar el contenedor `#mobile-menu` en el `<header>` y certificar que coincida milimétricamente con el bloque
      maestro unificado:
      ```html
      <div id="mobile-menu" class="hidden fixed inset-0 z-40 bg-surface/95 dark:bg-dark-surface-container-low/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 pt-20">
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="inicio" href="./index.html">Inicio</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="servicios" href="./servicios.html">Servicios</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="suscripcion-floral" href="./suscripcion-floral.html">Suscripción Floral</a>
          <a aria-current="page" class="font-label-md text-label-md uppercase tracking-wider transition-colors py-space-1 text-primary font-semibold" data-path="galeria" href="./galeria.html">Galería</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="contacto" href="./contacto.html">Contacto</a>
      </div>
      ```

2. **Auditoría de Enlaces en Header Desktop (`<nav>`):**
    * Inspeccionar la barra de navegación `<nav class="hidden lg:flex ...">`.
    * Verificar que todas las rutas apunten a los archivos HTML correspondientes (`./index.html`, `./servicios.html`,
      `./suscripcion-floral.html`, `./galeria.html`, `./contacto.html`), asegurando que "Galería" conserve de forma
      única `aria-current="page"` y `text-primary font-semibold`.
    * Confirmar la total ausencia de `href="#"`.

3. **Auditoría de Enlaces en Footer:**
    * En la columna "Navegación" del pie de página, comprobar que los enlaces apunten a las rutas relativas locales
      reales y que "Galería" se mantenga con la clase activa `text-primary font-semibold`.

4. **Auditoría de No-Regresión Multimedia:**
    * Comprobar que las 34 tarjetas interactivas de la galería conserven su efecto acordeón (`flex-1 hover:grow-[10]`),
      sus atributos `data-type` y `data-src`, y que el visor `#lightbox` continúe abriendo imágenes y videos sin
      bloqueos ni errores en consola.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Consistencia del Menú Móvil**
    * **Dado** el archivo `galeria.html` en un dispositivo móvil (`< lg`)
    * **Cuando** el usuario interactúa con `#mobile-menu-btn`
    * **Entonces** el drawer se despliega fluidamente con el fondo blur adaptado al tema actual y el enlace "Galería"
      resalta de forma nítida con `text-primary font-semibold`.
* **Escenario 2: Enrutamiento Transversal sin Enlaces Muertos**
    * **Dado** cualquier menú de navegación de `galeria.html`
    * **Cuando** se examinan los enlaces `<a>`
    * **Entonces** el 100% de las rutas conducen a páginas reales (`./*.html`), sin anclas huérfanas (`href="#"`).
* **Escenario 3: Estabilidad del Lightbox y Rendimiento**
    * **Dado** el nuevo menú móvil inyectado en la cabecera
    * **Cuando** se hace clic en cualquier imagen o video de las 6 categorías
    * **Entonces** el Lightbox se instancia en pantalla completa, la navegación interna funciona y el cierre destruye
      los nodos correctamente sin fugas de memoria.