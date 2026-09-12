# Iteración 06: Inyección de Contenido Original y Corrección de Codificación (UTF-8)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Tu objetivo es estrictamente de contenido. Debes leer el archivo
`.antigravity/03-planificacion/epicas/epica-01-inicio/contenido-index.md` y mapear cada bloque de texto hacia el
`index.html`. Además, el `index.html` actual sufre de corrupción de caracteres (Mojibake: `Ã³` en vez de `ó`, `Ã­` en
vez de `í`). Al inyectar el nuevo contenido, asegúrate de purgar toda palabra corrupta y guardar el documento resultante
en codificación UTF-8 estricta. **Prohibido alterar clases de Tailwind, etiquetas `<svg>`, o IDs de JavaScript.**

## 1. Objetivo de la Iteración

Restaurar la identidad de marca legítima (La Jardinera - Valdivia, Chile), inyectar los metadatos SEO originales, las
reseñas reales y los datos de contacto exactos, eliminando cualquier texto *placeholder* o caracteres corruptos producto
de fallos de codificación previos.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Corrección de Metadatos y SEO (`<head>`):**
    * Actualizar `<title>` y `<meta name="description">` utilizando los valores de la Sección 1 del archivo de
      contenido.
2. **Corrección de Textos y Mojibake (Global):**
    * Reemplazar todo el texto corrompido (ej. `SuscripciÃ³n`, `GalerÃ­a`, `botÃ¡nica`).
    * Sustituir los enlaces genéricos y textos del `<header>`, `#titular`, `#servicios` y `#suscripcion` usando la
      información exacta de las Secciones 2 y 3 del archivo de contenido.
3. **Inyección de Carrusel de Reseñas (Sección 3.5):**
    * Actualizar las tarjetas de testimonios (`#testimonials-track`) con los textos y nombres reales de las 10 reseñas
      proporcionadas.
    * Si es necesario, clona la estructura HTML de una tarjeta vacía para acomodar las 10 reseñas, manteniendo las
      clases de *scroll snap* y *flex-none*.
4. **Inyección de Footer y Contacto (Sección 6):**
    * Actualizar correos, números de teléfono (+56 9...) y ubicación (Valdivia, Chile).
    * Actualizar los métodos de pago (Crédito/Débito, Transferencia, Efectivo) reemplazando los placeholders mexicanos
      (SPEI, Amex).
5. **Revisión de Atributos de Accesibilidad:**
    * Asegurar que los atributos `alt` de las imágenes y `aria-label` coincidan con lo dictado en el archivo de
      contenido.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Codificación Limpia (UTF-8)**
    * **Dado** el archivo `index.html` finalizado
    * **Cuando** es inspeccionado o renderizado en el navegador
    * **Entonces** no debe existir ninguna cadena de texto con caracteres extraños (mojibake). Todas las tildes y eñes
      deben leerse perfectamente.
* **Escenario 2: Identidad Geográfica Exacta**
    * **Dado** el pie de página y la sección de contacto
    * **Cuando** un usuario lee la información
    * **Entonces** debe figurar "Valdivia, Chile" y los números correspondientes a Chile (+56 9...), eliminando
      cualquier referencia a otro país y/o ciudad.
* **Escenario 3: Cero Regresión Estructural**
    * **Dado** el proceso de reemplazo de texto
    * **Cuando** se compila y revisa el DOM
    * **Entonces** ninguna etiqueta `<svg>`, clase de Tailwind o `id` para JavaScript debió ser borrada o alterada
      accidentalmente.