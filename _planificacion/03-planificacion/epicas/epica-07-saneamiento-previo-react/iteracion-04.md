# Iteración 04: SEO Técnico (Descripción, Canonical, Open Graph, `robots.txt` y `sitemap.xml`)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
El sitio está en Cloudflare Pages, con Web Analytics y Google Search Console ya conectados, pero le faltan las señales
que Search Console espera: `index.html` no tiene `<meta name="description">`, ninguna página declara `canonical`, no
hay `robots.txt` ni `sitemap.xml`, y no existen etiquetas Open Graph para las vistas previas de WhatsApp e Instagram.

**Dato clave de la plataforma:** Cloudflare Pages redirige con un **308** cada `/pagina.html` a `/pagina`, y
`/index.html` a `/`. Por eso las URLs canónicas y las del sitemap se escriben **sin extensión**. Un `canonical` que
apunte a `.html` señalaría una URL que redirige, y Google lo trata como una contradicción.

**Alcance:** los 6 HTML (solo el `<head>`), `robots.txt` y `sitemap.xml` nuevos en la raíz, y los registros de
bitácora. En esta iteración **sí** se permite editar el `<head>` de las páginas. El `<body>` no se toca. `AGENTS.md`,
`README.md` y `DESIGN.md` siguen siendo solo lectura.

**Autorización explícita de esta iteración:** edición del `<head>` de los 6 HTML; creación de `robots.txt` y
`sitemap.xml`. La Tarea 5 (datos estructurados) **solo** se ejecuta si el desarrollador la autoriza expresamente en el
chat, porque introduce un `<script type="application/ld+json">` (datos, no lógica) que exige una excepción documentada
a la regla de "cero `<script>` en línea".

## 1. Objetivo de la Iteración

Que cada página indexable declare una descripción única y su URL canónica, que las vistas previas al compartir el sitio
tengan título, descripción e imagen, y que los buscadores dispongan de `robots.txt` y `sitemap.xml`, todo coherente con
la forma en que Cloudflare Pages realmente sirve las URLs.

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Línea base y precondiciones (solo lectura)

1. Por cada HTML, entrega una tabla con: `<title>`, `<meta name="description">` (o "ausente"), `canonical`, etiquetas
   `og:*` y `twitter:*`, y `robots`. Esperado hoy: solo `404.html` tiene `robots`; `index.html` no tiene descripción.
2. Confirma la forma canónica con una consulta de solo lectura, por ejemplo
   `curl -sI https://www.lajardinerafloreria.cl/servicios.html` (debe responder 308 hacia `/servicios`) y
   `curl -sI https://www.lajardinerafloreria.cl/servicios` (200). Si no puedes hacer la consulta, pídele el resultado al
   desarrollador; no lo supongas.
3. Busca imagen para las vistas previas: `public/images/og/og-default.jpg` (o `.png`). **No generes ni conviertas
   ninguna imagen.** Si no existe, la Tarea 3 omite `og:image` y `twitter:card` pasa a `summary`; repórtalo como acción
   pendiente del desarrollador (ver §3).

### Tarea 1: `meta description` del Inicio (DT-04)

En el `<head>` de `index.html`, junto al `<title>` (que se conserva), agrega la descripción aprobada del sitio, tomada
de `_planificacion/03-planificacion/epicas/epica-01-inicio/contenido-index.md` §1:

```html
<meta name="description" content="Diseño floral artesanal y curaduría de eventos para celebrar la belleza efímera de la naturaleza en Valdivia, Chile."/>
```

No inventes copy comercial. Si el desarrollador prefiere otra redacción, la indicará en el chat. Confirma que la
descripción de cada página es **única** y mide entre 70 y 160 caracteres (reporta las medidas reales).

### Tarea 2: `canonical` en las 5 páginas indexables

Inmediatamente después de la descripción, en el `<head>` de cada página (no en `404.html`):

| Archivo                     | `canonical`                                          |
|:----------------------------|:-----------------------------------------------------|
| `index.html`                | `https://www.lajardinerafloreria.cl/`                |
| `servicios.html`            | `https://www.lajardinerafloreria.cl/servicios`       |
| `suscripcion-floral.html`   | `https://www.lajardinerafloreria.cl/suscripcion-floral` |
| `galeria.html`              | `https://www.lajardinerafloreria.cl/galeria`         |
| `contacto.html`             | `https://www.lajardinerafloreria.cl/contacto`        |

```html
<link rel="canonical" href="https://www.lajardinerafloreria.cl/servicios"/>
```

Si la Tarea 0 demostró que Cloudflare sirve las URLs de otra forma, usa la que **realmente** devuelve un 200 y avísalo.
`404.html` mantiene `noindex, follow` y **no** lleva `canonical` ni `og:*`.

### Tarea 3: Open Graph y Twitter Card

En las 5 páginas indexables, después del `canonical`:

```html
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="La Jardinera Florería"/>
<meta property="og:locale" content="es_CL"/>
<meta property="og:title" content="<mismo texto que el <title> de la página>"/>
<meta property="og:description" content="<misma descripción que el meta description>"/>
<meta property="og:url" content="<misma URL que el canonical>"/>
```

* **Imagen:** solo si existe el archivo de la Tarea 0, agrega
  `<meta property="og:image" content="https://www.lajardinerafloreria.cl/public/images/og/og-default.jpg"/>`,
  `og:image:width` (1200), `og:image:height` (630) y `og:image:alt`, y `twitter:card` con `summary_large_image`.
  Sin imagen, `twitter:card` es `summary` y se omiten las etiquetas `og:image*`. La ruta de `og:image` debe ser
  **absoluta** y responder 200 en producción tal como se escribe.
* `og:title`, `og:description` y `og:url` deben coincidir carácter por carácter con `<title>`, `meta description` y
  `canonical` de la misma página.

### Tarea 4: `robots.txt` y `sitemap.xml`

1. `robots.txt` en la raíz del repositorio:
   ```text
   User-agent: *
   Allow: /

   Sitemap: https://www.lajardinerafloreria.cl/sitemap.xml
   ```
   **No** bloquees `/404.html`: si se bloquea el rastreo, Google nunca ve su `noindex`.
2. `sitemap.xml` en la raíz, con las 5 URLs canónicas y **sin** `<lastmod>`, `<changefreq>` ni `<priority>` (Google
   ignora las dos últimas, y un `lastmod` inexacto resta credibilidad; una fecha correcta llegará cuando el sitemap se
   genere durante la compilación):
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url><loc>https://www.lajardinerafloreria.cl/</loc></url>
       <url><loc>https://www.lajardinerafloreria.cl/servicios</loc></url>
       <url><loc>https://www.lajardinerafloreria.cl/suscripcion-floral</loc></url>
       <url><loc>https://www.lajardinerafloreria.cl/galeria</loc></url>
       <url><loc>https://www.lajardinerafloreria.cl/contacto</loc></url>
   </urlset>
   ```
3. Ambos archivos con codificación UTF-8 **sin BOM** y finales de línea `\n`.
4. Confirma que `pnpm run build:cf` los copia a la raíz de `_site/` (el script ya contempla `robots.txt` y
   `sitemap.xml` como opcionales).
5. Verifica con un script temporal que el XML esté bien formado, que tenga exactamente 5 `<loc>` y que cada uno
   coincida con el `canonical` de la página correspondiente.

### Tarea 5 (opcional, requiere autorización expresa): datos estructurados de negocio local

Solo en `index.html`, antes de `</head>`, un bloque `application/ld+json` de tipo `Florist` **únicamente con hechos que
ya existen en el repositorio**. No inventes horarios, dirección de calle, coordenadas ni rangos de precios:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Florist",
  "name": "La Jardinera Florería",
  "url": "https://www.lajardinerafloreria.cl/",
  "telephone": "+56997702832",
  "email": "lajardinera.floreria@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Valdivia",
    "addressRegion": "Región de Los Ríos",
    "addressCountry": "CL"
  },
  "areaServed": "Valdivia",
  "hasMap": "https://maps.app.goo.gl/6MEogkfQudDzY4G47",
  "paymentAccepted": "Crédito, Débito, Transferencia, Efectivo",
  "sameAs": [
    "https://www.instagram.com/lajardinera.floreria/",
    "https://www.facebook.com/floresadomiciliovaldivia/"
  ]
}
</script>
```

* Verifica que el JSON sea válido (`JSON.parse`) y que cada dato provenga de un archivo real (teléfono, correo,
  enlaces y medios de pago están en el footer).
* Si hay imagen de la Tarea 0, agrega `"image"` con su URL absoluta.
* Registra la excepción en `_planificacion/04-bitacora/decisiones-tecnicas.md`: "Datos estructurados JSON-LD en
  `index.html`: es un bloque de datos no ejecutable; no contradice la regla de cero JavaScript en línea, pero se
  documenta como excepción explícita".
* Propón (sin aplicar) agregar un párrafo a `AGENTS.md` §5 que declare esta excepción.

### Tarea 6: Verificación

1. `pnpm run build:cf` sin errores. Los 6 HTML, `robots.txt` y `sitemap.xml` presentes en `_site/`.
2. Tabla final de metadatos por página (misma forma que la Tarea 0) mostrando el "después".
3. Comprobaciones por texto: exactamente **un** `<title>`, **un** `meta description` y **un** `canonical` por página
   indexable; 0 de estos dos últimos en `404.html`; `og:url` igual a `canonical` en las 5 páginas.
4. Cero cambios en el `<body>` de las 6 páginas (comprueba con `git diff`, en modo lectura, que el cambio quede
   limitado al `<head>`).
5. Cero `style="` nuevos; `pnpm build` genera el mismo CSS que antes de la iteración (no se agregaron clases).

### Tarea 7: Registro

1. `_planificacion/04-bitacora/bitacora-epica-07/bitacora-iteracion-04.md` con la plantilla del §8.2 y la lista de
   acciones del desarrollador del §3.
2. Línea en `estado-actual.md`.
3. En la tabla del §12 de `_planificacion/README.md`, marca DT-04 y DT-08 como ✅ resueltas solo si sus tareas se
   ejecutaron y verificaron.
4. Decisión en `decisiones-tecnicas.md`: "URLs canónicas sin extensión por el comportamiento de Cloudflare Pages",
   incluyendo la observación de que cada enlace interno con `.html` produce un salto 308 (impacto marginal; se evalúa
   en la Épica 08, cuando la navegación sea una fuente única).

## 3. Acciones del Desarrollador (fuera del alcance del agente)

1. **Antes de la iteración (opcional pero recomendado):** crear `public/images/og/og-default.jpg`, de **1200 × 630 px**,
   formato JPG, menos de 300 KB, con la marca legible (logotipo o titular sobre una fotografía botánica). Se usa
   JPG porque WhatsApp y otras redes no siempre interpretan bien WebP en las vistas previas.
2. Tras el despliegue, comprobar en producción: `/robots.txt` y `/sitemap.xml` responden 200; el código fuente de cada
   página muestra su `canonical`.
3. **Search Console:** *Sitemaps* → agregar `sitemap.xml` y esperar el estado "Correcto". Con *Inspección de URL*,
   inspeccionar `https://www.lajardinerafloreria.cl/` y pedir indexación.
4. **Dominio:** confirmar que `lajardinerafloreria.cl` (sin `www`) redirige con 301 a `www.lajardinerafloreria.cl` (en
   Cloudflare, *Rules* → *Redirect Rules*), para que exista una sola versión indexable.
5. **Vistas previas:** pegar la URL en WhatsApp y en el Depurador de Uso Compartido de Facebook para validar título,
   descripción e imagen. Si cambian los metadatos, la caché de esas redes tarda en actualizarse.
6. Si se ejecutó la Tarea 5, validar con la Prueba de Resultados Enriquecidos de Google.

## 4. Auditoría de No-Regresión e Invariantes

* Archivos modificables: `<head>` de los 6 HTML, `robots.txt`, `sitemap.xml`, `dist/css/output.css` (solo si `pnpm
  build` lo regenera) y los registros de bitácora. El `<body>` queda intacto.
* Invariantes: `404.html` conserva `<meta name="robots" content="noindex, follow"/>` y no tiene `canonical` ni `og:*`.
* Cero comandos Git que escriban en el repositorio. Cero llamadas de red que no sean las consultas de solo lectura de la
  Tarea 0.
* No se agregan scripts de analítica ni etiquetas de verificación de Search Console: siguen gestionándose fuera del
  código.

## 5. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Metadatos Completos y Únicos**
    * **Dado** las 5 páginas indexables
    * **Cuando** se inspecciona su `<head>`
    * **Entonces** cada una tiene un título, una descripción de entre 70 y 160 caracteres y un `canonical`, todos
      distintos entre páginas, y `og:title`, `og:description` y `og:url` coinciden con ellos.
* **Escenario 2: Canónicas que No Redirigen**
    * **Dado** el `canonical` de cada página
    * **Cuando** se consulta esa URL en producción
    * **Entonces** responde 200 sin redirección.
* **Escenario 3: Rastreo Correcto**
    * **Dado** `robots.txt` y `sitemap.xml`
    * **Cuando** se descargan de `_site/` y de producción
    * **Entonces** el XML está bien formado, contiene las 5 URLs canónicas, `robots.txt` lo declara, y `404.html` no está
      bloqueada.
* **Escenario 4: Página de Error Excluida**
    * **Dado** `404.html`
    * **Cuando** se inspecciona su `<head>`
    * **Entonces** conserva `noindex, follow` y no declara `canonical` ni Open Graph.
* **Escenario 5: Vistas Previas**
    * **Dado** un enlace del sitio compartido en WhatsApp
    * **Cuando** se genera la vista previa
    * **Entonces** muestra título y descripción del sitio, y la imagen si el desarrollador la aportó; si no, la
      bitácora lo registra como acción pendiente.
* **Escenario 6: Cero Regresión**
    * **Dado** el sitio completo
    * **Cuando** se compara con la versión anterior
    * **Entonces** el `<body>` de las 6 páginas no cambió, `pnpm run build:cf` termina sin errores y la consola no
      registra ninguno.