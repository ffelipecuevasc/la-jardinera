# Iteración 04: Contenido, Secciones y Optimización WebP

**Objetivo:** Migrar las grillas de contenido interno del inicio y asegurar que todos los recursos gráficos pesados estén enrutados localmente bajo el formato moderno WebP.

## Tareas
1. Descargar la imagen de fondo del Hero (anteriormente en Unsplash)[cite: 1] y convertirla a `.webp`.
2. Tomar todas las imágenes locales referenciadas en `./static/img/Galeria/` y `./static/img/` (como logos, tarjetas de pago y fotos de arreglos)[cite: 1] y convertirlas a formato `.webp`.
3. Guardar las imágenes optimizadas en `public/images/`.
4. Refactorizar la sección de "¿En qué te ayudamos hoy?" (tarjetas de servicios).
5. Refactorizar la sección "Flores frescas en tu puerta" (Suscripción).
6. Refactorizar la sección "Galería Editorial" tipo bento-box.
7. Actualizar todas las rutas de las etiquetas `<img>` y atributos de estilo para apuntar a los nuevos archivos WebP en `public/images/`.

## Criterios de Aceptación

*   **Escenario 1: Carga de imágenes moderna**
    *   **Dado** el proyecto compilado
    *   **Cuando** se inspecciona la pestaña de Red (Network) en DevTools
    *   **Entonces** ninguna imagen debe cargarse desde dominios externos (ej. Unsplash) y todas deben tener extensión `.webp`.

*   **Escenario 2: Rendimiento visual (CLS)**
    *   **Dado** las secciones de galería y servicios
    *   **Cuando** se cargan las imágenes
    *   **Entonces** cada etiqueta `<img>` debe contar con dimensiones o clases Tailwind que prevengan saltos de diseño (Cumulative Layout Shift) mientras cargan.