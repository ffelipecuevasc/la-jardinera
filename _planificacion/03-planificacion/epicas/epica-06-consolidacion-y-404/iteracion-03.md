# Iteración 03: Paridad Móvil y Normalización de Enlaces en "servicios.html"

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
En la Épica 02 construimos el catálogo y el modal dinámico de `servicios.html`. Sin embargo, tal como advirtió la
auditoría forense de aquella épica, la página arrastra la deuda técnica del menú hamburguesa: el botón
`#mobile-menu-btn` existe en el `<header>`, pero **el contenedor desplegable `#mobile-menu` no está presente en el
marcado**. Tu objetivo en esta iteración es intervenir quirúrgicamente **únicamente `servicios.html`** para inyectar el
drawer estandarizado, asegurar el resalte activo en "Servicios" dentro de dicho menú y verificar que ningún enlace
principal o del pie de página quede apuntando a anclas vacías (`href="#"`).

## 1. Objetivo de la Iteración

Dotar a `servicios.html` de paridad móvil total mediante la inyección del drawer `#mobile-menu` funcional y estilizado
con tokens semánticos (y soporte de Dark Mode). Sincronizar el estado activo ("Servicios") en los tres puntos de
navegación (Header Desktop, Menú Móvil y Footer) y erradicar cualquier enlace muerto (`href="#"`) para asegurar un
enrutamiento bidireccional fluido hacia el resto de las vistas.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Inyección del Contenedor `#mobile-menu` en `servicios.html`:**
    * En el `<header>`, inmediatamente antes de la etiqueta de cierre `</header>`, inyectar el drawer estandarizado:
      ```html
      <div id="mobile-menu" class="hidden fixed inset-0 z-40 bg-surface/95 dark:bg-dark-surface-container-low/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 pt-20">
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="inicio" href="./index.html">Inicio</a>
          <a aria-current="page" class="font-label-md text-label-md uppercase tracking-wider transition-colors py-space-1 text-primary font-semibold" data-path="servicios" href="./servicios.html">Servicios</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="suscripcion-floral" href="./suscripcion-floral.html">Suscripción Floral</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="galeria" href="./galeria.html">Galería</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="contacto" href="./contacto.html">Contacto</a>
      </div>
      ```

2. **Auditoría y Normalización de Enlaces en el Header Desktop (`<nav>`):**
    * Inspeccionar la navegación de escritorio `<nav class="hidden lg:flex ...">`.
    * Confirmar que todos los enlaces apunten a sus rutas relativas locales reales sin `href="#"`:
        - Inicio: `./index.html`
        - Servicios: `./servicios.html` (conserva `aria-current="page"` y `text-primary font-semibold`)
        - Suscripción Floral: `./suscripcion-floral.html`
        - Galería: `./galeria.html`
        - Contacto: `./contacto.html`

3. **Normalización de Enlaces en el `<footer>`:**
    * En la Columna 2 ("Navegación") del footer de `servicios.html`, verificar y reemplazar cualquier `href="#"`
      residual por las rutas explícitas locales, manteniendo activo únicamente el enlace a `Servicios`.

4. **Auditoría de No-Regresión Funcional:**
    * Verificar que la grilla de las 8 tarjetas del catálogo, los atributos `data-service-id`, la franja de beneficios y
      el modal accesible (`#service-modal`) permanezcan 100% intactos e inalterados.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Operatividad Móvil en Servicios**
    * **Dado** el archivo `servicios.html` en un viewport móvil (`< lg`)
    * **Cuando** el usuario presiona el botón `#mobile-menu-btn`
    * **Entonces** el drawer `#mobile-menu` se despliega sin errores de consola, mostrando los 5 enlaces accesibles y
      resaltando "Servicios" con la clase `text-primary font-semibold` y `aria-current="page"`.
* **Escenario 2: Enrutamiento Bidireccional Limpio**
    * **Dado** los menús de navegación (Desktop, Móvil y Footer) de `servicios.html`
    * **When** el usuario hace clic en cualquier opción de la lista
    * **Then** la navegación se ejecuta hacia el archivo HTML correspondiente sin anclas rotas ni recargas defectuosas.
* **Escenario 3: Integridad de Componentes Dinámicos**
    * **Dado** el archivo `servicios.html` tras los cambios de navegación
    * **When** se hace clic en "Ver más" en cualquiera de las tarjetas de servicio
    * **Then** el modal `#service-modal` se abre, renderiza la galería dinámica y ejecuta su Focus Trap sin
      interferencias del nuevo menú móvil.