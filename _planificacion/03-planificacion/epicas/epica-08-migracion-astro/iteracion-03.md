# Iteración 03: Footer como Componente y Fuente Única de Navegación

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Se empieza por el footer porque es más simple que el header y no tiene JavaScript. Aquí nace también la **fuente única
de navegación** (`src/data/navegacion.js`), que el header reutilizará en la Iteración 04. La única diferencia visual
admitida es la unificación de las dos variantes de footer (DT-06), y debe aprobarla el desarrollador antes de aplicarla.

Fuente de la verdad: `DESIGN.md` (footer y enlaces), el footer de `src/pages/index.astro` y la salida de la It. 02.

**Autorización explícita de esta iteración:** creación de `src/data/navegacion.js` y `src/components/SiteFooter.astro`;
edición de `src/layouts/BaseLayout.astro` y de las 6 páginas (solo para retirar su footer).

## 1. Objetivo de la Iteración

Que el footer exista una sola vez, se genere en las 6 páginas con el enlace activo correcto y lea sus enlaces de una
única lista de navegación.

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Inventario de variantes (solo lectura)

Compara los 6 footers con espacios normalizados y entrega una tabla con cada diferencia (hoy se esperan: contenedor
`mt-space-8` en Inicio, Contacto y 404, frente a `border-t border-outline-variant/20` en Servicios, Suscripción y
Galería; enlace activo; y la clase `font-body-sm text-body-sm` ausente en el enlace activo). **Detente y pide al
desarrollador que elija la variante** a conservar, citando lo que diga `DESIGN.md`.

### Tarea 1: `src/data/navegacion.js`

```js
export const NAVEGACION = [
    { clave: 'inicio',             etiqueta: 'Inicio',             ruta: '/' },
    { clave: 'servicios',          etiqueta: 'Servicios',          ruta: '/servicios' },
    { clave: 'suscripcion-floral', etiqueta: 'Suscripción Floral', ruta: '/suscripcion-floral' },
    { clave: 'galeria',            etiqueta: 'Galería',            ruta: '/galeria' },
    { clave: 'contacto',           etiqueta: 'Contacto',           ruta: '/contacto' },
];
```

Las etiquetas se copian **textualmente** del marcado actual (mayúsculas, tildes); si difieren entre header y footer,
repórtalo y conserva cada una donde corresponde (por ejemplo, con un campo `etiquetaFooter`).

### Tarea 2: `SiteFooter.astro`

1. Recibe `paginaActiva` (`'inicio' | ... | null`; la 404 usa `null`).
2. Marcado copiado del footer de referencia elegido en la Tarea 0; los enlaces se generan recorriendo `NAVEGACION`.
3. Las clases del enlace activo e inactivo se escriben como **dos cadenas literales completas** dentro del componente y
   se elige una con un ternario. Prohibido armar clases por concatenación o plantillas.
4. Enlace activo: `aria-current="page"` igual que hoy.

### Tarea 3: Layout y páginas

1. `BaseLayout` recibe `paginaActiva` y renderiza `<SiteFooter paginaActiva={paginaActiva} />` en la posición que hoy
   ocupa el footer.
2. Contenido que hoy va **después** del footer (modal de Servicios) o **entre** `</main>` y el footer (*lightbox* de la
   Galería y la franja de beneficios de Galería y Suscripción): usa ranuras con nombre en el layout (`<slot name="antes-del-footer" />` y
   `<slot name="tras-footer" />`) para conservar el orden exacto del DOM.
3. Retira el footer de las 6 páginas.

### Tarea 4: Verificación

1. `pnpm run build:cf` y `scripts/comparar-con-referencia.mjs`: el único cambio aceptado en los footers es el de la
   variante aprobada.
2. Búsqueda en `_site/`: exactamente un `<footer` por página y un `aria-current="page"` en el footer de cada página
   indexable; ninguno en la 404.
3. Render real en los 7 viewports, claro y oscuro, de la zona del footer en las 6 páginas.

### Tarea 5: Registro

Bitácora, `estado-actual.md`, DT-06 marcada ✅ con evidencia y commit sugerido
`Épica 08 - Iteración 03: Unifica el pie de página en un componente Astro.`

## 3. Auditoría de No-Regresión e Invariantes

* El header sigue duplicado en cada página (se aborda en la It. 04).
* Clases literales; `tailwind.config.js` sin cambios.
* 0 JS nuevo en el navegador.

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Fuente única**
    * **Dado** el código fuente
    * **Cuando** se busca `<footer`
    * **Entonces** aparece solo en `SiteFooter.astro`.
* **Escenario 2: Enlace activo**
    * **Dado** cada página indexable
    * **Cuando** se inspecciona el footer
    * **Entonces** su propio enlace tiene `aria-current="page"` y la clase activa; en la 404 ninguno.
* **Escenario 3: Variante única**
    * **Dado** las 6 páginas
    * **Cuando** se compara el footer
    * **Entonces** es idéntico salvo el enlace activo, con la variante aprobada por el desarrollador.
* **Escenario 4: Orden del DOM**
    * **Dado** Servicios, Galería y Suscripción
    * **Cuando** se compara con la referencia
    * **Entonces** modales y bloques fuera del `<main>` están en la misma posición relativa al footer.
