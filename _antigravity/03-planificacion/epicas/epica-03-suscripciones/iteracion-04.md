# Iteración 04: Accesibilidad (a11y), Dark Mode y Pulido de Animaciones

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Un componente dinámico que se oculta y revela es una "caja negra" para los usuarios con lectores de pantalla si no
gestionamos los atributos ARIA correctamente. Tu labor aquí es estandarizar la accesibilidad del botón "Ver Planes" y el
contenedor `#planes`. Además, auditarás la paleta del Modo Oscuro (`dark:`) en las nuevas tarjetas de precios para
garantizar el cumplimiento de contraste WCAG 2.1.

## 1. Objetivo de la Iteración

Elevar el estándar del componente de Suscripciones al nivel de clase mundial mediante la inyección de accesibilidad
semántica (Focus Management y ARIA) y el perfeccionamiento de los tokens de color para la *View Transitions API* en el
Modo Oscuro.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Gestión ARIA para el Reveal (`suscripcion-floral.html` y `subscription.js`):**
    * En el HTML, añadir al botón de apertura: `aria-controls="planes"` y `aria-expanded="false"`.
    * En el HTML, añadir al contenedor de planes: `aria-hidden="true"`.
    * En `subscription.js`, al expandir los planes, actualizar dinámicamente el botón a `aria-expanded="true"` y el
      contenedor a `aria-hidden="false"`. Al colapsarlo, revertir ambos valores.

2. **Focus Management (Gestión de Foco de Teclado):**
    * En `subscription.js`, inmediatamente después de que se complete la animación de expansión, mover el foco del
      teclado (`focus()`) al título principal de la sección de planes (añadiendo un `tabindex="-1"` temporal al título
      si es necesario) para guiar a los lectores de pantalla.
    * Al hacer clic en "Cerrar Planes", colapsar la vista y devolver el foco (`focus()`) al botón original de "Ver
      Planes de Suscripción".

3. **Auditoría y Pulido de Dark Mode (`dark:` classes):**
    * **Tarjetas de Planes:** Asegurar que los fondos sean oscuros (`dark:bg-dark-surface-container-low`), que los
      bordes se atenúen (`dark:border-dark-surface-variant`) y que los precios destaquen correctamente
      (`dark:text-primary-fixed`).
    * **Botones de Llamado a la Acción:** Verificar que el texto de los botones "Seleccionar Plan" sobre fondo verde
      (`bg-primary`) mantenga un contraste seguro en dark mode (ej. usar `text-on-primary` o
      `text-white dark:text-neutral-950`).
    * **Hero Banner Overlay:** Asegurar que el recuadro de *glassmorphism* sobre el carrusel oscuro cambie su
      opacidad/color en dark mode (`dark:bg-dark-surface/90`) para garantizar la legibilidad del texto blanco/gris
      claro.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Accesibilidad Dinámica 100/100**
    * **Dado** el flujo de revelar planes
    * **Cuando** un lector de pantalla interactúa con el botón "Ver Planes"
    * **Entonces** el sistema enuncia correctamente el cambio de estado de colapsado a expandido (`aria-expanded`) y
      guía el foco hacia el nuevo contenido de forma lógica.
* **Escenario 2: Legibilidad Premium en Modo Oscuro**
    * **Dado** el sistema en Modo Oscuro (`html.dark`)
    * **Cuando** se visualizan las tarjetas de precios
    * **Entonces** el contraste de las tipografías supera el umbral de 4.5:1 (WCAG AA), los bordes se ven sutiles y no
      existen fondos blancos accidentales (flashbangs).
* **Escenario 3: Navegación por Teclado Intachable**
    * **Dado** un usuario que no utiliza ratón
    * **Cuando** usa la tecla `Tab` para recorrer la página
    * **Entonces** puede abrir los planes, recorrer los 3 botones de "Seleccionar Plan", presionar "Cerrar Planes" y
      continuar su navegación sin quedar atrapado en elementos invisibles.