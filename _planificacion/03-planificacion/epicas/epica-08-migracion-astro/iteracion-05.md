# Iteración 05: SEO Técnico en el Layout (Trasladada desde la Épica 07 · Iteración 04)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Esta iteración ejecuta **el mismo objetivo** que la Épica 07 · Iteración 04, pero una sola vez, en el layout, en lugar
de editar seis `<head>` a mano. Los textos, las URLs canónicas sin extensión, la imagen Open Graph y las acciones del
desarrollador en Search Console se toman **de esa especificación** (`epica-07-.../iteracion-04.md`, Tareas 1 a 4 y §3),
que sigue siendo la referencia de contenido. Lo que cambia es dónde y cómo se genera.

**Autorización explícita de esta iteración:** creación de `src/components/SeoHead.astro`, `src/pages/sitemap.xml.js` y
`public/robots.txt`; edición de `BaseLayout.astro`, `src/data/navegacion.js` (solo para agregar descripciones) y del
*frontmatter* de las 6 páginas.

## 1. Objetivo de la Iteración

Que cada página indexable tenga descripción única, `canonical`, Open Graph y Twitter Card coherentes entre sí, y que
el sitio publique `robots.txt` y un `sitemap.xml` generado desde la misma fuente de navegación.

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Precondiciones

1. Lee la Épica 07 · Iteración 04 completa.
2. Verifica en la vista previa de Cloudflare qué URL devuelve 200 para cada página (se espera `/servicios`, sin
   extensión). Si difiere, usa la real y avísalo.
3. Pregunta al desarrollador si existe `public/images/og/og-default.jpg` (1200 × 630). Sin ella, `twitter:card` es
   `summary` y no hay `og:image`.

### Tarea 1: Datos

Agrega a cada entrada de `NAVEGACION` su `descripcion` (la de Inicio, de `contenido-index.md` §1; las demás, las que
cada página tiene hoy). La 404 no figura en `NAVEGACION`.

### Tarea 2: `SeoHead.astro`

1. Propiedades: `title`, `description`, `rutaCanonica` (por ejemplo `/servicios`) e `indexable` (falso en la 404).
2. La URL canónica se construye con `new URL(rutaCanonica, Astro.site)`. **No** uses `Astro.url.pathname`: con
   `build.format: 'file'` puede incluir `.html`.
3. Si `indexable`: `meta description`, `canonical`, `og:type`, `og:site_name`, `og:locale` (`es_CL`), `og:title`,
   `og:description`, `og:url`, imagen si existe y `twitter:card`. `og:title`, `og:description` y `og:url` coinciden
   carácter por carácter con `<title>`, la descripción y el `canonical`.
4. Si no: `<meta name="robots" content="noindex, follow"/>` (lo que hoy tiene la 404) y nada más.
5. `BaseLayout` lo incluye en el `<head>` y las páginas pasan sus propiedades.

### Tarea 3: `robots.txt` y `sitemap.xml`

1. `public/robots.txt` con el contenido de la Épica 07 · It. 04 (sin bloquear la 404).
2. `src/pages/sitemap.xml.js`: *endpoint* estático que genera el XML desde `NAVEGACION` (5 `<loc>` absolutos y sin
   extensión, sin `lastmod`, `changefreq` ni `priority`). Se prefiere a `@astrojs/sitemap` porque esa integración
   derivaría las URLs de los archivos (`.html`) y agrega una dependencia.
3. Confirma que `_site/robots.txt` y `_site/sitemap.xml` existen tras la compilación.

### Tarea 3b (opcional, requiere autorización expresa): datos estructurados

Si el desarrollador lo autoriza, se implementa la Tarea 5 de la Épica 07 · It. 04 (negocio local) en `SeoHead.astro`
solo para el Inicio, con `<script type="application/ld+json" set:html={JSON.stringify(datos)} />`. Es un bloque de
**datos**, no ejecutable: se registra en `decisiones-tecnicas.md` como caso permitido y no cuenta como "JS en línea".

### Tarea 4: Verificación

1. Por página indexable: descripción única de 70 a 160 caracteres (reporta las medidas); `canonical` igual al `<loc>`
   del sitemap.
2. XML bien formado con exactamente 5 `<loc>`.
3. La 404 tiene `noindex, follow` y no tiene `canonical` ni `og:*`.

### Tarea 5: Registro

1. Bitácora; `estado-actual.md`; DT-04 y DT-08 ✅ con evidencia.
2. En la Épica 07 · It. 04 no se edita nada más allá de su nota de traslado.
3. Acciones del desarrollador: las del §3 de la Épica 07 · It. 04 (Search Console, redirección sin `www`, vistas
   previas en WhatsApp y Facebook), a ejecutar **después** del paso a producción (It. 08).
4. Commit sugerido: `feat(seo): agrega canonical, Open Graph, robots y sitemap desde el layout`.

## 3. Auditoría de No-Regresión e Invariantes

* El `<body>` de las 6 páginas no cambia (comparación contra la salida de la It. 04: 0 diferencias fuera del `<head>`).
* `<title>` de cada página idéntico al de la referencia.

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Metadatos coherentes**
    * **Dado** cualquier página indexable
    * **Cuando** se inspecciona el `<head>`
    * **Entonces** `og:title`, `og:description` y `og:url` coinciden con `<title>`, descripción y `canonical`.
* **Escenario 2: Sitemap desde la fuente única**
    * **Dado** que se agrega o cambia una ruta en `navegacion.js`
    * **Cuando** se compila
    * **Entonces** header, footer y sitemap reflejan el cambio sin editar otro archivo.
* **Escenario 3: 404 no indexable**
    * **Dado** `404.html`
    * **Cuando** se inspecciona
    * **Entonces** tiene `noindex, follow` y ningún `canonical`.
