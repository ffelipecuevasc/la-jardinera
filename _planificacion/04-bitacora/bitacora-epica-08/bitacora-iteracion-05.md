# Bitácora de Ejecución - Épica 08 - Iteración 05

**Fecha de ejecución:** 18-10-2026
**Agente:** Claude Code
**Objetivo:** Que cada página indexable declare descripción única, `canonical`, Open Graph y Twitter Card coherentes entre sí, y que el sitio publique `robots.txt` y un `sitemap.xml` generado desde `NAVEGACION`, todo desde el layout.

Especificación: [`iteracion-05.md`](../../03-planificacion/epicas/epica-08-migracion-astro/iteracion-05.md) · Referencia de contenido: [`epica-07-saneamiento-previo/iteracion-04.md`](../../03-planificacion/epicas/epica-07-saneamiento-previo/iteracion-04.md) (con las correcciones de §5.1 de esta bitácora).

Rótulos de evidencia: **[código]** confirmado por código, comandos o programa; **[servidor local]** confirmado con `pnpm preview` y `curl.exe`, sin navegador; **[informado]** dato entregado por el desarrollador; **🕒 PENDIENTE** sin evidencia. No hubo render real en navegador en esta iteración (§4.7).

---

## 1. Resumen ejecutivo

* Nuevo `src/components/SeoHead.astro`: recibe `title`, `description`, `rutaCanonica` e `indexable`. Si es indexable emite `meta description`, `canonical`, 10 etiquetas `og:*` (incluidas `og:image`, sus dimensiones y `og:image:alt`) y `twitter:card = summary_large_image`; si no, emite la `meta description` y `<meta name="robots" content="noindex, follow">`. [código]
* `BaseLayout.astro` obtiene la entrada de `NAVEGACION` con `paginaActiva`, usa su `descripcion` y su `ruta`, y calcula `indexable = !noindex`. Las páginas dejaron de pasar `description` (salvo la 404). [código]
* `NAVEGACION` es ahora la fuente única de rutas, etiquetas y descripciones: alimenta header, footer, `canonical`, `og:url`, `<meta name="description">` y `sitemap.xml`. [código]
* `public/robots.txt` y `src/pages/sitemap.xml.js` creados. `_site/` contiene `robots.txt` y `sitemap.xml` con esos nombres exactos y las 6 páginas HTML. [código]
* `pnpm run build:cf`: código 0, "6 page(s) built", 0 advertencias, 109 archivos (107 antes); el CSS conserva el nombre `BaseLayout.744HEtGc.css` y es idéntico byte a byte al de la base. [código]
* El `<body>` de las 6 páginas es idéntico carácter a carácter al de la base (`referencia/it04-base/`) y el comparador `scripts/comparar-con-referencia.mjs` informa 0 diferencias no esperadas de `<body>`. [código]
* Descripciones: 116, 146, 138, 145 y 159 caracteres, todas distintas. `og:title`, `og:description` y `og:url` coinciden con `<title>`, descripción y `canonical`, y `canonical` = `<loc>` del sitemap en las 5 páginas. [código]
* La 404 conserva su descripción, tiene `noindex, follow` y 0 `canonical`, `og:*` y `twitter:*`. [código]
* **Sin render real en navegador** (§4.7): la verificación visual y de consola queda 🕒 PENDIENTE. El cambio solo agrega etiquetas `<meta>` y `<link rel="canonical">` al `<head>`.
* Estado: **Completada con reservas** (§8). No está 🔒 Cerrada: eso ocurre solo con la fusión a `main`.

## 2. Línea base (estado previo)

| Dato | Valor | Origen |
|:-----|:------|:-------|
| Rama / `HEAD` | `feat/migracion-astro` / `2d78e30` | `git branch --show-current`, `git log` |
| Árbol de trabajo | Limpio al iniciar (la imagen OG ya estaba versionada, commit `2d78e30`) | `git status --short`, `git ls-files public/images/og` |
| Node / pnpm / Astro | `v24.16.0` / `11.24.0` / `7.4.0` | `node -v`, `pnpm -v`, `package.json` |
| Compilación base | `pnpm run build:cf` antes de editar: código 0, 6 páginas, 107 archivos, CSS `BaseLayout.744HEtGc.css` | salida de `astro build` |
| Copia de la base | `referencia/it04-base/` (copia completa de `_site/`; ignorada por Git: `.gitignore` L30, `git check-ignore -v`) | `cp -r`, `git check-ignore` |
| `<head>` antes | Inicio sin `meta description` (DT-04); las otras 4 páginas indexables con su descripción; solo la 404 con `robots`; 0 `canonical`, 0 `og:*`, 0 `twitter:*` en las 6 | script de lectura sobre `_site/` |

### 2.1 Tabla «antes»

| Página | `<title>` | `meta description` | `canonical` | `og:*` / `twitter:*` | `robots` |
|:-------|:----------|:-------------------|:------------|:---------------------|:---------|
| Inicio | La Jardinera Florería - Valdivia, Chile | ausente | ausente | ausente | ausente |
| Servicios | Servicios - La Jardinera Florería | presente | ausente | ausente | ausente |
| Suscripción Floral | Suscripción Floral - La Jardinera Florería | presente | ausente | ausente | ausente |
| Galería | Galería Editorial - La Jardinera Florería | presente | ausente | ausente | ausente |
| Contacto | Contacto - La Jardinera Florería | presente | ausente | ausente | ausente |
| 404 | Página no encontrada - La Jardinera Florería | presente | ausente | ausente | `noindex, follow` |

### 2.2 Tarea 0: precondiciones

* **URL que responde 200 [servidor remoto, solo lectura, 18-10-2026 23:50 hora local, `curl.exe -sI`]:** `https://lajardinerafloreria.cl/` → 200; `/servicios` → 200; `/servicios.html` → 308; `/index.html` → 308; `www.lajardinerafloreria.cl/servicios` → 301. Coincide con lo esperado: las URLs canónicas van sin extensión y sin `www`.
* **Imagen OG:** `public/images/og/og-default.jpg` existe y está versionada. Medida con un script de solo lectura (cabecera JPEG): **1200 × 630 px, 88.503 B (86,4 KiB)**, bajo los 300 KB. Cumple. No se modificó.
* **Contenido de la imagen (visto con `Read`):** captura de la portada: barra de navegación con el logotipo, los 5 enlaces y los botones sociales y de tema, y la tarjeta de vidrio con el titular «Florería La Jardinera», el párrafo, los dos botones y la fila «Valdivia, Región de Los Ríos, Chile», sobre un primer plano de rosas y otras flores. De ahí el texto de `og:image:alt`.
* **`og:image` en producción [servidor remoto]:** `https://lajardinerafloreria.cl/images/og/og-default.jpg` → 200, `image/jpeg`, 88.503 B, sin redirección; `/public/images/og/og-default.jpg` → 301 (la redirección de `_redirects`).
* **Hallazgo sobre `robots.txt` en producción [servidor remoto]:** `https://lajardinerafloreria.cl/robots.txt` ya responde 200 (1.248 B, `Cache-Control: no-store`) con un bloque de comentarios de *content signals* (`search`, `ai-input`, `ai-train`) que el repositorio no contiene. Es coherente con el robots.txt administrado por Cloudflare. Ver §5.1.
* **`/sitemap.xml` en producción:** 404, como se esperaba antes del despliegue.

## 3. Cambios realizados (por archivo)

| Archivo | Cambio |
|:--------|:-------|
| `src/components/SeoHead.astro` (nuevo) | Props `title`, `description`, `rutaCanonica`, `indexable` (por defecto `true`). URL canónica y URL de la imagen con `new URL(ruta, Astro.site).href`. Indexable: `meta description`, `canonical`, `og:type` (website), `og:site_name`, `og:locale` (`es_CL`), `og:title`, `og:description`, `og:url`, `og:image`, `og:image:width` (1200), `og:image:height` (630), `og:image:alt`, `twitter:card`. No indexable: `meta description` y `robots` `noindex, follow`. Sin `twitter:title`, `twitter:description` ni `twitter:image`. |
| `src/layouts/BaseLayout.astro` | Importa `SeoHead` y `NAVEGACION`. Busca la entrada con `paginaActiva`; `indexable = !noindex`; lanza un error de compilación si una página indexable no figura en `NAVEGACION`. Retira de su `<head>` las etiquetas `description` y `robots` (ahora las emite `SeoHead`, en el mismo lugar). `<meta charset>` sigue primero y `<title>` se escribe una sola vez. |
| `src/data/navegacion.js` | Agrega `descripcion` a las 5 entradas. El comentario de cabecera no se tocó (§5.1). |
| `src/pages/servicios.astro`, `suscripcion-floral.astro`, `galeria.astro`, `contacto.astro` | Retiran la prop `description` de `<BaseLayout>` (1 línea cada una). |
| `src/pages/index.astro`, `src/pages/404.astro` | Sin cambios: el Inicio nunca pasó `description` y la 404 conserva la suya. |
| `src/pages/sitemap.xml.js` (nuevo) | Endpoint estático `GET` con `Content-Type: application/xml; charset=utf-8`; 5 `<url><loc>` desde `NAVEGACION` y `site`; sin `lastmod`, `changefreq` ni `priority`. |
| `public/robots.txt` (nuevo) | `User-agent: *`, `Allow: /`, línea en blanco y `Sitemap: https://lajardinerafloreria.cl/sitemap.xml`. UTF-8 sin BOM, `\n`, 76 B. No bloquea la 404. |

## 4. Verificación de criterios de aceptación

Los comandos y salidas de esta sección se corrieron en esta sesión. Los scripts de verificación quedaron fuera del repositorio (carpeta temporal del agente).

### 4.1 Compilación [código]

`pnpm run build:cf` → código 0, 0 advertencias, "6 page(s) built". La lista de rutas incluye `/sitemap.xml (+3ms)`: Astro genera el endpoint como ruta, pero no lo cuenta como página. `_site/` pasa de 107 a 109 archivos (`robots.txt` y `sitemap.xml`). Mismo hash de CSS (`BaseLayout.744HEtGc.css`) y `cmp` sin diferencias en el CSS y el JS frente a la base.

### 4.2 Tabla «después» [código]

| Página | `<title>` (igual que antes) | Descripción (caracteres) | `canonical` = `og:url` = `<loc>` |
|:-------|:----------------------------|:-------------------------|:---------------------------------|
| Inicio | La Jardinera Florería - Valdivia, Chile | 116 | `https://lajardinerafloreria.cl/` |
| Servicios | Servicios - La Jardinera Florería | 146 | `https://lajardinerafloreria.cl/servicios` |
| Suscripción Floral | Suscripción Floral - La Jardinera Florería | 138 | `https://lajardinerafloreria.cl/suscripcion-floral` |
| Galería | Galería Editorial - La Jardinera Florería | 145 | `https://lajardinerafloreria.cl/galeria` |
| Contacto | Contacto - La Jardinera Florería | **159** (límite: 160) | `https://lajardinerafloreria.cl/contacto` |
| 404 | Página no encontrada - La Jardinera Florería | idéntica a la base | sin `canonical` |

Por cada página indexable, medido con un script: 1 `<title>`, 1 `meta description`, 1 `canonical`; descripción entre 70 y 160 caracteres; las 5 descripciones distintas; `og:title` = `<title>`, `og:description` = descripción, `og:url` = `canonical` = `<loc>` (carácter por carácter, mismo orden); `og:image` = `https://lajardinerafloreria.cl/images/og/og-default.jpg`; ninguna URL con `www`, `.html` ni `/public/`. 0 fallos en las 5 páginas. Todas las `og:image:alt` son iguales (una sola imagen).

### 4.3 La 404 [código]

`robots` = `noindex, follow`; descripción idéntica a la de la base; 0 `canonical`, 0 `og:*`, 0 `twitter:*`. Sus etiquetas del `<head>` son las mismas que en la base y en el mismo orden; el único cambio textual es la sangría de la línea de `robots` (4 espacios menos, formato del fragmento de `SeoHead`).

### 4.4 `sitemap.xml` y `robots.txt` [código]

* XML bien formado (`xml.etree.ElementTree`): raíz `urlset` del espacio de nombres de sitemaps, **5 `<loc>`** iguales a los `canonical`, 0 hijos distintos de `<loc>`.
* `robots.txt`: contenido exacto; 0 bytes `0x0D`, 0 BOM, termina en `\n` (conteo con `tr` y `od`). `_site/robots.txt` es idéntico al de `public/` (`cmp`).
* `ls _site`: `robots.txt` y `sitemap.xml` con esos nombres (no `sitemap.xml.html` ni `sitemap.xml/index.html`). `_site/*.html`: las 6 páginas.

### 4.5 No regresión [código]

* `<body>` de las 6 páginas: **idéntico carácter a carácter** a `referencia/it04-base/` (86.936, 67.723, 64.192, 93.950, 51.497 y 34.781 caracteres). También lo es todo lo que queda fuera de `<head>` y `<body>`. `<title>` idénticos.
* `scripts/comparar-con-referencia.mjs referencia/it04-base`: "Diferencias de `<body>` no esperadas (total): 0". Las diferencias de `<head>` que lista son las etiquetas agregadas de la tabla siguiente y los espacios de formato entre ellas.
* `<head>`, por página (etiquetas retiradas: ninguna en las 6; el resto conserva su orden relativo):

| Página | Etiquetas agregadas |
|:-------|:--------------------|
| Inicio | `meta description`, `canonical`, `og:type`, `og:site_name`, `og:locale`, `og:title`, `og:description`, `og:url`, `og:image`, `og:image:width`, `og:image:height`, `og:image:alt`, `twitter:card` (13) |
| Servicios, Suscripción, Galería, Contacto | las mismas, sin `meta description` (ya existía) (12 cada una) |
| 404 | ninguna |

### 4.6 Invariantes sobre `_site/**/*.html` [código]

0 `style="`, 0 `onclick`, 0 `<style`, 0 `<script>` sin `src`, 0 `href="#"`, 0 `ld+json` y 0 IDs duplicados en las 6 páginas (16, 13, 11, 17, 17 y 6 IDs). `<meta charset>` es la primera etiqueta del `<head>` en las 6.

### 4.7 Render real y consola

**🕒 PENDIENTE. No se ejecutó ningún navegador.** El prompt de la iteración prohíbe ejecutar `chrome.exe` (en la It. 04 abrió una ventana en la sesión del desarrollador) y a la vez pide cargar las 6 páginas en Chrome headless. Como el repositorio no tiene ninguna herramienta que maneje un navegador (`instantanea-referencia.mjs` y `comparar-con-referencia.mjs` solo leen archivos) y no se pueden agregar dependencias, se priorizó la prohibición expresa y no se lanzó ningún navegador. Lo que sí se verificó sin navegador:

* **[servidor local]** `pnpm preview --port 4399` (detenido al terminar) y `curl.exe`: `/` 200 `text/html`, `/servicios` 200 `text/html`, `/sitemap.xml` 200 `text/xml`, `/robots.txt` 200 `text/plain`, `/images/og/og-default.jpg` 200 `image/jpeg` (sin redirecciones) y `/xyz` 404 `text/html` con `noindex, follow`. El `Content-Type` `text/xml` lo asigna el servidor de vista previa por extensión; el encabezado `application/xml; charset=utf-8` del endpoint no se observó.
* **[código]** `<body>`, CSS y JS idénticos a la base, así que el aspecto y el comportamiento no pueden haber cambiado; el `<head>` solo suma `<meta>` y un `<link rel="canonical">`.

Lista de comprobaciones manuales en §8.4.

### 4.8 Escenarios de aceptación

| Escenario | Estado | Evidencia |
|:----------|:-------|:----------|
| 1. Metadatos coherentes | ✅ confirmado por código | `og:title`, `og:description` y `og:url` iguales a `<title>`, descripción y `canonical` en las 5 páginas indexables (§4.2) |
| 2. Sitemap desde la fuente única | ✅ confirmado por código | `sitemap.xml.js`, `SeoHead` (vía `BaseLayout`), `SiteHeader.astro` y `SiteFooter.astro` leen `NAVEGACION`; no se agregó una sexta ruta para probar el cambio (no se editó `navegacion.js` más allá de lo autorizado) |
| 3. 404 no indexable | ✅ confirmado por código y en servidor local | `noindex, follow`, 0 `canonical`, 0 `og:*`, 0 `twitter:*` (§4.3); `/xyz` en `pnpm preview` entrega esa 404 con estado 404 |

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

No se corrigió nada de lo siguiente.

1. **Robots.txt administrado por Cloudflare en producción.** `https://lajardinerafloreria.cl/robots.txt` ya responde 200 con un bloque de *content signals* que el repositorio no contiene. Si la función de robots.txt administrado está activa, Cloudflare antepone ese bloque al archivo del sitio; si no, podría reemplazarlo. Con el despliegue de esta iteración conviene abrir `/robots.txt` y confirmar que quedan las líneas `Allow: /` y `Sitemap:` (§8.4). No se modificó nada en Cloudflare.
2. **Comentario de cabecera de `navegacion.js` desactualizado:** dice que la usará `SiteHeader.astro` "(Iteración 04)", y el header ya la usa (también ahora `BaseLayout`, `SeoHead` indirectamente y `sitemap.xml.js`). No se editó, por instrucción.
3. **Imagen OG: captura de la portada, no pieza diseñada.** Muestra la barra de navegación y el contenido del Hero (con la marca legible en el titular). Es válida, pero es posible que el texto y el logotipo de la barra se lean pequeños en una vista previa de WhatsApp (hipótesis, 🕒 por revisar en §8.4). No se tocó.
4. **Corrección a la referencia de contenido (decisión del desarrollador):** la Épica 07 · It. 04 quedó desactualizada en cuatro puntos: dominio con `www` (ADR-002 manda sin `www`), ruta de la imagen con `/public/` (`AGENTS.md` §5.8), `og:title` de Inicio «El Arte de lo Efímero» (se usa el `<title>` real) y el dominio sin `www` que "redirigiría a `www`" (es al revés). No se edita esa especificación.
5. **Decisión sobre la 404 que prevalece sobre la especificación:** la Tarea 2.4 decía «y nada más»; por decisión del desarrollador conserva su `meta description`.
6. **Datos estructurados (Tarea 3b):** no ejecutada, por decisión del desarrollador. 0 `ld+json`.
7. **Espacios del `<head>`:** el HTML de `SeoHead` deja espacios y saltos de línea entre etiquetas (el fragmento se sangra de forma distinta al resto del `<head>`). Sin efecto de pintado ni de SEO; `compressHTML: false` lo conserva.
8. **Endpoint y regla de "6 páginas":** `src/pages/` tiene ahora 7 archivos (6 `.astro` y `sitemap.xml.js`). Astro cuenta 6 páginas; el endpoint no es una página. Redacción de `README.md` y `AGENTS.md` por revisar (§6).
9. **Sin deuda nueva** en el §12 de `_planificacion/README.md`.

## 6. Archivos modificados y propuestas para archivos protegidos

Archivos con cambios en Git (`git status`, solo lectura): modificados `src/data/navegacion.js`, `src/layouts/BaseLayout.astro`, `src/pages/servicios.astro`, `suscripcion-floral.astro`, `galeria.astro`, `contacto.astro`, `decisiones-tecnicas.md` y `estado-actual.md`; nuevos `src/components/SeoHead.astro`, `src/pages/sitemap.xml.js`, `public/robots.txt` y esta bitácora. `git diff` vacío en `AGENTS.md`, `README.md`, `DESIGN.md`, `_planificacion/README.md`, `.claude/**`, `package.json`, `pnpm-lock.yaml`, `tailwind.config.js`, `astro.config.mjs`, `src/js/**`, `src/css/**`, `SiteHeader.astro`, `SiteFooter.astro`, `public/_redirects`, `public/images/**`, `_planificacion/01-vision/**` y `02-arquitectura/**`.

**Propuestas para archivos protegidos** (las aplica el desarrollador; el texto actual exacto va en el reporte de la sesión):

| # | Archivo y sección | Qué cambia |
|:--|:------------------|:-----------|
| a | `_planificacion/README.md` §12, DT-04 (L221) | Pasa a ✅ Resuelta con evidencia |
| b | `_planificacion/README.md` §12, DT-08 (L225) | Pasa a ✅ Resuelta en código, con producción 🕒 pendiente de la It. 08 |
| c | `README.md` L88 y L91 (árbol) | Nombrar el endpoint `sitemap.xml.js` y que `navegacion.js` incluye descripciones |
| d | `README.md` L180 (§11) | Agregar `canonical`, Open Graph, `robots.txt` y `sitemap.xml` |
| e | `AGENTS.md` | Sin propuesta |
| f | `DESIGN.md` | Sin propuesta |

## 7. Mensaje de commit sugerido

```text
Épica 08 - Iteración 05: Agrega canonical, Open Graph, robots y sitemap desde el layout.
```

Longitud contada con Node: 88 caracteres.

---

## 8. Estado, reservas y pendientes

### 8.1 Estado

**Completada con reservas.** No está 🔒 Cerrada (fusión a `main`, `_planificacion/README.md` §5).

### 8.2 Reservas

1. **Sin render real ni consola** en navegador (§4.7): decisión por la prohibición expresa de ejecutar `chrome.exe`.
2. **Sin verificación en producción:** `/robots.txt`, `/sitemap.xml` y los `canonical` solo se comprueban tras el paso a producción (It. 08).
3. **`Content-Type` del sitemap** observado solo en `pnpm preview` (`text/xml`); no se verificó el encabezado de Cloudflare Pages.
4. **El guardia de `BaseLayout`** (error si una página indexable no figura en `NAVEGACION`) está confirmado por lectura de código; no se forzó el error.

### 8.3 Heredado a las iteraciones siguientes

| Ítem | Detalle |
|:-----|:--------|
| It. 08 (paso a producción) | Comprobar `/robots.txt`, `/sitemap.xml` y la URL de `og:image` en producción; ver §5.1 sobre el robots.txt administrado por Cloudflare |
| `DESIGN.md` L4 | Sigue nombrando el dominio con `www` (Sección C de las propuestas, a cargo del desarrollador) |

### 8.4 Pendientes del desarrollador (🕒 PENDIENTE)

* **Render real y consola:** cargar las 6 páginas en `pnpm dev` o en la vista previa de la rama, en claro y oscuro, a 360 y 1280 px como mínimo, y confirmar que se ven igual que antes y que la consola no muestra errores propios del cambio (puede seguir el 404 de `rum` de `beacon.min.js`, ver `estado-actual.md`).
* Ver el código fuente de cada página y confirmar su `canonical` y su `og:url`.
* **Después del paso a producción (It. 08):** `/robots.txt`, `/sitemap.xml` y `https://lajardinerafloreria.cl/images/og/og-default.jpg` deben responder 200 sin redirección; en `/robots.txt` deben quedar las líneas `Allow: /` y `Sitemap:` (§5.1).
* **Search Console sobre el dominio sin `www`** (ADR-002): *Sitemaps* → agregar `sitemap.xml` y esperar "Correcto"; *Inspección de URL* de `https://lajardinerafloreria.cl/` y solicitar indexación.
* **Vistas previas:** pegar la URL en WhatsApp y en el Depurador de Uso Compartido de Facebook para validar título, descripción e imagen (si cambian los metadatos, la caché de esas redes tarda en actualizarse). Revisar si la imagen se lee bien a tamaño de vista previa (§5.3).
