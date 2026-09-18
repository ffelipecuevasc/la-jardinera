# Iteración 04: Paridad Móvil y Normalización de Enlaces en "suscripcion-floral.html"

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Al igual que ocurrió en las vistas previas, en `suscripcion-floral.html` el botón hamburguesa `#mobile-menu-btn` existe
en la cabecera, pero el contenedor `#mobile-menu` no fue incorporado en el DOM durante la Épica 03. Además, es
imperativo garantizar que los enlaces del navbar y footer apunten a las páginas reales del proyecto y no a marcadores de
posición temporales (`href="#"`). Tu objetivo en esta iteración es intervenir quirúrgicamente **únicamente
`suscripcion-floral.html`**.

## 1. Objetivo de la Iteración

Eliminar la deuda técnica móvil en `suscripcion-floral.html` incorporando el drawer `#mobile-menu` completo con soporte
para Dark Mode. Configurar el resalte visual y semántico de "Suscripción Floral" como enlace activo en la navegación
móvil, desktop y pie de página, eliminando todo `href="#"` residual y protegiendo la funcionalidad de `subscription.js`
(Hero Cross-fade y Acordeón de Planes).

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Inyección del Contenedor `#mobile-menu` en `suscripcion-floral.html`:**
    * En el `<header>`, inmediatamente antes del cierre `</header>`, inyectar el drawer estandarizado con "Suscripción
      Floral" como ítem activo:
      ```html
      <div id="mobile-menu" class="hidden fixed inset-0 z-40 bg-surface/95 dark:bg-dark-surface-container-low/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 pt-20">
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="inicio" href="./index.html">Inicio</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="servicios" href="./servicios.html">Servicios</a>
          <a aria-current="page" class="font-label-md text-label-md uppercase tracking-wider transition-colors py-space-1 text-primary font-semibold" data-path="suscripcion-floral" href="./suscripcion-floral.html">Suscripción Floral</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="galeria" href="./galeria.html">Galería</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="contacto" href="./contacto.html">Contacto</a>
      </div>
      ```

2. **Normalización de Enlaces en Header Desktop (`<nav>`):**
    * Verificar que la lista de enlaces de escritorio contenga las rutas relativas exactas:
        - Inicio: `./index.html`
        - Servicios: `./servicios.html`
        - Suscripción Floral: `./suscripcion-floral.html` (conserva `aria-current="page"` y
          `text-primary font-semibold`)
        - Galería: `./galeria.html`
        - Contacto: `./contacto.html`
    * Confirmar que no exista ningún `href="#"`.

3. **Normalización de Enlaces en Footer:**
    * En la columna de Navegación del `<footer>`, verificar que los enlaces apunten a los archivos locales reales,
      manteniendo la clase activa en "Suscripción Floral".

4. **Auditoría de No-Regresión en Módulos Interactivos:**
    * Asegurar que el carrusel con cross-fade del Hero (`#banner-carousel`), la sección de Condiciones y Zonas de Envío,
      el botón `#show-plans-btn` y la sección colapsable de planes (`#planes`) sigan funcionando a la perfección bajo el
      control de `subscription.js`.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Navegación Móvil Funcional en Suscripciones**
    * **Dado** el archivo `suscripcion-floral.html` en un dispositivo móvil (`< lg`)
    * **Cuando** el usuario pulsa el botón `#mobile-menu-btn`
    * **Entonces** el contenedor `#mobile-menu` se despliega mostrando las 5 opciones de ruta y resaltando "Suscripción
      Floral" como la página en curso.
* **Escenario 2: Cero Enlaces Rotos o Muertos**
    * **Dado** cualquier menú de navegación de `suscripcion-floral.html`
    * **Cuando** se inspeccionan los atributos `href`
    * **Entonces** el 100% de los enlaces apuntan a archivos locales (`./*.html`), eliminando los marcadores de posición
      temporales (`#`).
* **Escenario 3: Estabilidad de la Lógica de Planes y Hero**
    * **Dado** el despliegue del nuevo menú móvil
    * **Cuando** se interactúa con el botón "Ver Planes de Suscripción" o se visualiza el fundido de imágenes en el Hero
    * **Entonces** la ejecución de JavaScript en `subscription.js` no sufre colisiones ni interrupciones por la
      presencia del drawer móvil.