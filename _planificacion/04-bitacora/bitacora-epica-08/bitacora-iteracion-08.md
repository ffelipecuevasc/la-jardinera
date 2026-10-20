# Bitácora de Ejecución - Épica 08 - Iteración 08

**Fecha de ejecución:** 19-10-2026
**Agente:** Claude Code
**Objetivo:** Certificar con evidencia que la versión Astro es equivalente, en lo planificado, a la línea base de la Iteración 01, y dejar al desarrollador la guía para Lighthouse, la verificación en producción y Search Console. No se cambió nada del sitio.

Especificación: [`iteracion-08.md`](../../03-planificacion/epicas/epica-08-migracion-astro/iteracion-08.md) · Épica: [`definicion-epica.md`](../../03-planificacion/epicas/epica-08-migracion-astro/definicion-epica.md) · Iteración anterior: [`bitacora-iteracion-07.md`](bitacora-iteracion-07.md)

Rótulos de evidencia: **[código]** confirmado por código, comandos o programa; **[render]** medido en Chrome headless (`Chrome/155.0.8059.84`, leído con `Browser.getVersion`); **[informado]** dato entregado por el desarrollador; **[asesor]** auditoría independiente del asesor; **🕒 PENDIENTE** no verificado. Las cifras de render son de esta máquina y de este arnés, con fuentes de Google y videos bloqueados: no reproducen la apariencia de producción ni son métricas de rendimiento.

---

## 1. Resumen ejecutivo

* **Veredicto:** en todo lo que se pudo medir en local, la versión Astro es equivalente a la línea base de la Iteración 01. Solo aparecen las diferencias planificadas y **0 diferencias no explicadas** en el marcado, la geometría, el estilo calculado, la consola y los flujos. [código] [render]
* **Auditoría estática:** `pnpm run build:cf` con código 0, 6 páginas, 0 advertencias y 109 archivos. El comparador da 171 diferencias de `<body>` y 186 de `<head>`; todas pertenecen a categorías planificadas (§4.1). Invariantes: 0 `style=`, 0 `onclick`, 0 `<style>` y exactamente 1 `<script>` sin `src` por página, idéntico en las 6 (SHA-256 `5b490c26…`, el mismo de la It. 07). Rastreo: 100 URL internas únicas, todas con 200. [código]
* **Render real:** 84 combinaciones por sitio (6 páginas × 7 viewports × claro y oscuro), 168 cargas, sin reintentos. Se compararon 27.006 elementos por sitio: las únicas diferencias de posición o tamaño son las 4.062 del footer (It. 03). Todas las diferencias de estilo están explicadas. Tema correcto en 84 de 84 y consola con 0 mensajes. [render]
* **Capturas de página completa** (696 y 694 franjas): fuera de las zonas planificadas y animadas, 3.576 píxeles (0,0015 %) superan 8 niveles, con un máximo de 29. Los mismos elementos muestran ese ruido al comparar cada sitio consigo mismo (§5.4). [render]
* **Flujos:** 68 casos en cada sitio; 60 idénticos a la referencia y 8 con diferencias explicadas: 3 por tiempos del arnés (miniaturas de modales, descartado con una sonda aparte), 1 por la URL `/contacto.html` → `/contacto` y 4 por la hoja de estilos de la 404, ambas planificadas (§5.5). Ningún comportamiento distinto. [render]
* **Desviación del plan:** producción ya corre Astro, así que la fusión a `main` (Tarea 5.1) ya ocurrió. La referencia de Lighthouse pasa a ser el último despliegue de `main` anterior a Astro (§3).
* **Documentación:** las propuestas A, C.1, C.2, D, E y las de la It. 07 están aplicadas. Quedan menciones vigentes en `DESIGN.md` (B.1, 5 líneas), `proposito-y-alcance.md` y el §12 de `_planificacion/README.md`. Se entregan como propuestas (§9).
* **Estado: Completada con reservas.** Dependen del desarrollador: Lighthouse (Tarea 3), la verificación en producción (Tarea 5), Search Console y las comprobaciones manuales (guía de la §8). No está 🔒 Cerrada.

## 2. Línea base

| Dato | Valor | Origen |
|:-----|:------|:-------|
| Rama / `HEAD` | `feat/migracion-astro` / `b813c3a`; `main` local también en `b813c3a` (`git rev-list --left-right --count main...feat/migracion-astro` = `0 0`) | `git log`, `git rev-list` [código] |
| Árbol de trabajo | Limpio al iniciar | `git status` [código] |
| Node / pnpm | `v24.16.0` / `11.24.0` | `node -v`, `pnpm -v` [código] |
| Compilación | `pnpm run build:cf` (con `_site/` borrada antes): código 0, «6 page(s) built in 2.99s», 0 líneas con «warn» o «error» | salida de `astro build` [código] |
| Archivos de `_site/` | **109** (6 HTML, 79 `.webp`, 10 `.mp4`, 6 `.svg`, 2 `.png`, 1 `.jpg`, 1 CSS, 1 JS, `robots.txt`, `sitemap.xml` y `_redirects`) | `find` [código] |
| `_site/_astro/` | CSS `BaseLayout.744HEtGc.css` (45.970 B); JS `BaseLayout.astro_astro_type_script_index_0_lang.D-7eLN3d.js` (27.059 B) | `ls`, rastreo [código] |
| Referencia | `referencia/sitio/` (114 archivos), `referencia/inventario.json` y `referencia/capturas/` (84 PNG): existen | `find`, `ls` [código] |
| Git ignora | `.gitignore:30:referencia/` para `referencia/sitio/index.html`, `referencia/inventario.json` y `referencia/capturas/index-320-claro.png`; `.gitignore:29:_site/` | `git check-ignore -v` [código] |
| Lectura previa | `AGENTS.md`, `README.md`, `DESIGN.md`, `_planificacion/README.md`, `estado-actual.md`, `iteracion-08.md`, `definicion-epica.md`, `propuestas-documentos-protegidos.md`, `stack-tecnologico.md`, `decisiones-tecnicas.md` (ADR-001 a ADR-003) y las bitácoras de las It. 01 (§1 a §7 y §9), 02 (§4), 04 (§4) y 07 | — |

## 3. Desviación del plan (registrada sin modificar `iteracion-08.md`)

1. **Fusión a `main` ya hecha.** La especificación dice que `main` no se toca hasta la It. 08, pero en la práctica se fue fusionando a `main` iteración por iteración: producción (`https://lajardinerafloreria.cl`) **ya corre Astro** [informado]. En el repositorio local, `main` y `feat/migracion-astro` apuntan al mismo *commit* (`b813c3a`) [código]. Por eso la **Tarea 5.1 (fusionar a `main`) ya ocurrió de hecho**, y la comparación «producción actual frente a vista previa» de la Tarea 3 enfrentaría Astro contra Astro.
2. **Decisión del desarrollador:** la referencia de rendimiento será el último despliegue de main ANTERIOR a Astro, que el desarrollador ubica en el panel de Cloudflare Pages (Deployments) y mide junto con producción actual en la misma sesión.
3. **Consecuencia para el DoD:** el criterio de Lighthouse del §8 de `definicion-epica.md` se aplica con esa referencia. La guía A (§8.1) ya la usa. La redacción del §8 y de `iteracion-08.md` no se tocó; la propuesta para la definición de la épica está en §9.4.

## 4. Tarea 1: auditoría estática de `_site/` [código]

### 4.1 Comparador (`node scripts/comparar-con-referencia.mjs`, sin editarlo)

Código de salida 1 (el script no conoce los cambios posteriores a la It. 02) y **171 diferencias de `<body>`**, la misma cifra que en la It. 04. Cada diferencia se clasificó con un script fuera del repositorio que reutiliza el tokenizador y la diferencia de secuencias del comparador y ubica cada token en el header, la capa tenue, el footer o fuera de ellos.

**`<body>`**

| Categoría | Origen | Inicio | Servicios | Suscripción | Galería | Contacto | 404 | Total |
|:----------|:-------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Espacios entre enlaces del header (`#ws`) | It. 04 (aceptada) | 12 | 12 | 12 | 12 | 12 | 12 | **72** |
| Comentarios del header unificados sobre los de Inicio | It. 04 | 0 | 0 | 0 | 0 | 0 | 8 | **8** |
| Footer: contenedor, enlace activo, comentarios y espacios (categoría D) | It. 03 (aceptada) | 4 | 12 | 11 | 22 | 22 | 20 | **91** |
| **No esperadas según el script** | | **16** | **24** | **23** | **34** | **34** | **40** | **171** |
| Script principal con *hash* (esperada por el script) | It. 02 | 2 | 2 | 2 | 2 | 2 | 2 | 12 |
| Comentarios hijos directos de `<body>` que Astro omite, más su espacio | It. 02 | 0 | 2+2 | 2+2 | 3+3 | 2+2 | 2+2 | 22 |

* Las 91 del footer son tokens del `<footer>`: clase del contenedor (`mt-space-8` → `border-t border-outline-variant/20` en Inicio, Contacto y 404), enlace activo con `font-body-sm text-body-sm` (5 páginas), el texto « Navegación » sin el espacio final (5 páginas), comentarios de columnas y espacios. Coinciden con las de la It. 03 y la It. 04 (4, 12, 11, 22, 22 y 20).
* Los comentarios omitidos son 11, todos de profundidad 1: «FOOTER CONECTADO…», «Modal de Detalle…», «2. FRANJA DE BENEFICIOS…», «LIGHTBOX…», «CONTENEDOR PRINCIPAL…», «FOOTER GLOBAL…» y «SECCIÓN CENTRAL DE ERROR 404». Antes eran 17; en la It. 04 el comentario de la capa tenue volvió al HTML.
* **Diferencias de `<body>` no explicadas: 0.**

**`<head>`** (186 diferencias en total; 37, 35, 35, 35, 35 y 9 por página)

| Categoría | Origen | Tokens |
|:----------|:-------|:-:|
| `canonical`, `og:*` (10) y `twitter:card` | It. 05 | 60 |
| `<meta name="description">` nueva del Inicio | It. 05 (DT-04) | 1 |
| Script de arranque del tema (`<script>`, su texto y `</script>`) | It. 07 (ADR-003) | 18 |
| `<meta charset>` primero y `<link rel="icon">` reubicado (orden del layout) | It. 02 | 20 |
| `<link rel="stylesheet">`: `./dist/css/output.css` → `/_astro/BaseLayout.744HEtGc.css` | It. 02 | 12 |
| 404: `<base href="/">` y su comentario retirados | It. 02 | 2 |
| Espacios entre etiquetas | — | 73 |
| **No explicadas** | | **0** |

### 4.2 Invariantes en `_site/**/*.html`

| Comprobación | Inicio | Servicios | Suscripción | Galería | Contacto | 404 |
|:-------------|:-:|:-:|:-:|:-:|:-:|:-:|
| `style=` / `onclick` / `<style` | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |
| `<script>` totales / sin `src` (en el `<head>`, antes de la primera hoja de estilo) | 2 / 1 | 2 / 1 | 2 / 1 | 2 / 1 | 2 / 1 | 2 / 1 |
| IDs (duplicados) | 16 (0) | 13 (0) | 11 (0) | 17 (0) | 17 (0) | 6 (0) |
| `href="#"` total, en el header y en el footer | 0 | 0 | 0 | 0 | 0 | 0 |
| `<base`, `./public/`, `href="….html"` | 0 | 0 | 0 | 0 | 0 | 0 |
| `fixed` en descendientes del header / capa tenue hermana inmediata | 0 / sí | 0 / sí | 0 / sí | 0 / sí | 0 / sí | 0 / sí |
| `h-20`, `top-full`, `max-h-[calc(100dvh-5rem)]`, `top-20` | 1 c/u | 1 c/u | 1 c/u | 1 c/u | 1 c/u | 1 c/u |
| `<header>` / `<footer>` / `aria-current="page"` | 1 / 1 / 3 | 1 / 1 / 3 | 1 / 1 / 3 | 1 / 1 / 3 | 1 / 1 / 3 | 1 / 1 / 0 |

* **Script del tema:** un solo texto distinto en las 6 páginas. El elemento completo `<script>…</script>` mide 717 caracteres y su SHA-256 es `5b490c26120413aecf117c5878853be7a0b336afbc0a18cabb2e9c73e6fa0d1c`, el mismo que registró la It. 07.
* **`src/`** (24 archivos): 0 referencias a `./public/`, 0 `client:`, 0 `style=`, `<style>` u `onclick` en `.astro`. `is:inline` aparece solo en `src/layouts/BaseLayout.astro` (1 vez: la excepción del ADR-003).
* Ya conocido (It. 02, §5.4): `<form id="contact-form" action="#">` de Contacto. No es un `href` ni navegación; el módulo cancela el envío.

### 4.3 Rastreo de enlaces internos y recursos (`pnpm preview`, `127.0.0.1:4321`)

* Se rastrearon las 6 páginas: `href`, `src`, `srcset`, `data-src`, `poster` y `content` (incluidas las URL absolutas del dominio en `canonical` y `og:image`), más las rutas citadas dentro del JS y del CSS empaquetados.
* **100 URL internas únicas**: 8 de páginas (incluye `/contacto?service=Plan%20Esencial|Premiere|Luxe`), 2 de `_astro`, 87 de `images`, 2 de `logos` y 1 de `icons`. **Todas responden 200; ninguna distinta de 200.**
* Hosts externos contados y **no seguidos**: `felipecuevas.dev`, `fonts.googleapis.com`, `fonts.gstatic.com`, `maps.app.goo.gl`, `wa.me`, `www.facebook.com` y `www.instagram.com`.
* Comprobaciones extra: `/servicios.html` 200; `/a/b/inexistente` y `/servicios/xyz` 404 con el HTML de la 404 y su CSS; `/robots.txt` 200 (`User-agent: *`, `Allow: /`, `Sitemap: https://lajardinerafloreria.cl/sitemap.xml`); `/sitemap.xml` 200 con 5 `<loc>`; `/images/og/og-default.jpg` 200 `image/jpeg` (88.503 B).
* **`/public/...` → 301:** `pnpm preview` no aplica `_redirects` (`/public/images/hero-botanical-desktop.webp` responde 404 en local, como en la It. 02). Queda **por código**: `public/_redirects` contiene `/public/*  /:splat  301` y se copia a `_site/_redirects`. En Cloudflare lo comprueba el desarrollador (§8.3, paso 2).

### 4.4 Tamaños

* **109 archivos** (límite: 20.000); **0 archivos sobre 25 MiB**. Total: 65.225.407 B.
* Los mayores: `images/galeria/nmg2.mp4` con 22.715.000 B (21,66 MiB, 86,7 % del límite), `nmg5.mp4` con 8.098.647 B y `ddm2.mp4` con 4.928.653 B.
* Los 97 archivos de `referencia/sitio/public/` son idénticos byte a byte a los de `_site/` (`cmp`). `_site/` agrega solo `images/og/` (It. 05).

### 4.5 Exclusión

* En `_site/`: 0 archivos `.md`, `package.json`, `pnpm-lock.yaml`, `.mjs`, `.cjs`, `tailwind.config.js`, `.astro`, `.json` o `.yaml`, y 0 carpetas `_planificacion/`, `src/`, `node_modules/`, `.claude/`, `referencia/` o `scripts/`. Tampoco hay mapas de fuente (`sourceMappingURL`: 0; `.map`: 0).
* En `pnpm preview`, `/package.json`, `/astro.config.mjs`, `/README.md`, `/_planificacion/README.md` y `/src/js/main.js` responden 404.

### 4.6 Comentarios y datos sensibles

* Se revisaron los 319 comentarios HTML de las 6 páginas y las líneas `//` del script del tema, buscando `C:\`, `D:\`, `_planificacion`, `TODO`, `FIXME`, `localhost`, `127.0.0.1`, `.md`, `node_modules`, `scratchpad` y `src/`. **0 coincidencias en los comentarios HTML.**
* El script del tema nombra, a propósito, `decisiones-tecnicas.md` y `src/js/modules/theme.js` (rutas relativas del repositorio, sin unidad, usuario ni datos privados). El desarrollador decidió conservar esos comentarios en la It. 07. Se informa sin cambios.
* En el texto visible, las coincidencias de «todo» son palabras del contenido. El correo `lajardinera.floreria@gmail.com` es el contacto público del negocio. En el CSS no hay coincidencias; en el JS, 3, todas de la palabra «todos» del contenido.

## 5. Tarea 2: render real [render]

### 5.1 Método

* **Navegador:** Chrome `155.0.8059.84` headless (`--headless=new`, versión leída con `Browser.getVersion`), con perfil aislado en la carpeta temporal del agente. Lo controlan scripts propios **fuera del repositorio**: cliente del protocolo de depuración sobre el `WebSocket` de Node, decodificador PNG con `zlib` y sin dependencias. Nunca se ejecutó `chrome.exe` con `--version` ni sin `--headless`, y no se tocó la sesión de Chrome del desarrollador.
* **Sitios:** la referencia (`referencia/sitio/`) se sirvió con un servidor Node de solo lectura en `127.0.0.1:4400` y el sitio nuevo con `pnpm preview` en `127.0.0.1:4321`.
* **Bloqueos:** `fonts.googleapis.com`, `fonts.gstatic.com`, `*.mp4`, `wa.me`, Instagram, Facebook, Maps y `felipecuevas.dev`. `window.open` quedó interceptado. Movimiento reducido emulado.
* **Por cada carga:** contexto de navegador nuevo; tema fijado con `localStorage.theme` y `prefers-color-scheme`; viewport sin modo móvil y con escala 1. Antes de medir se recorre la página para activar las imágenes diferidas, se espera a que se estabilicen y se decodifiquen, y se espera a que no haya transiciones CSS en curso.
* **Qué se midió:** posición y tamaño de cada elemento del `<body>` y **36 propiedades de estilo calculado** de cada elemento visible (`display`, `position`, `visibility`, `opacity`, `z-index`, `transform`, `color`, `background-color`, `background-image`, colores y anchos de borde, radio, `box-shadow`, propiedades de fuente, `line-height`, `letter-spacing`, `text-transform`, `text-align`, `text-decoration-line`, `white-space`, márgenes y rellenos, `gap`, propiedades flex y `overflow`). También la clase de `<html>`, la consola y las capturas de página completa por franjas del alto del viewport.
* **Zonas animadas toleradas** (bitácora de la It. 01, §5.5): titular Starlight, `fx-spotlight` del header y *cross-fade* de Suscripción (`#banner-carousel`).

### 5.2 Resultados por página (84 combinaciones por sitio, 0 reintentos)

| Página | Combinaciones | Elementos visibles medidos (nuevo) | Posición o tamaño > 0,5 px | Alto del documento, nuevo − referencia | Consola (ref. / nuevo) |
|:-------|:-:|:-:|:--|:--|:-:|
| Inicio | 14 | 7.646 | solo footer (It. 03) | −67 px (−63 desde 1024) | 0 / 0 |
| Servicios | 14 | 3.288 | solo footer | −4 px hasta 768; 0 desde 1024 | 0 / 0 |
| Suscripción Floral | 14 | 3.580 | solo footer | −4 px hasta 768; 0 desde 1024 | 0 / 0 |
| Galería | 14 | 4.870 | solo footer | −4 px hasta 768; 0 desde 1024 | 0 / 0 |
| Contacto | 14 | 2.042 | solo footer | −67 px (−63 desde 1024) | 0 / 0 |
| 404 | 14 | 1.254 | solo footer | −63 px | 0 / 0 |
| **Total** | **84** | **22.680** (igual en la referencia) | **4.062 pares elemento-combinación, todos dentro del `<footer>`** | | **0 / 0** |

* **Elementos:** 27.006 en cada sitio (suma de las 84 combinaciones), el mismo total de la It. 02. La estructura coincide etiqueta por etiqueta en todas.
* **Alto del documento:** −64 px del margen retirado + 1 px del borde nuevo − 4 px del enlace activo a 14 px (antes 16) en el footer. Las tres causas son de la It. 03. Desde 1024 px el enlace activo no cambia el alto de la fila.
* **Tema:** la clase de `<html>` es la pedida en 84 de 84, en ambos sitios.
* **Imágenes sin cargar:** las mismas en ambos sitios en las 84 combinaciones: las 9 de Google del carrusel, fuera de vista, como en la línea base; y en Servicios el `#modal-main-image` sin `src`, que solo se nombra distinto porque la URL de la página difiere.

### 5.3 Estilo calculado: todas las diferencias explicadas

| Diferencia | Pares elemento-propiedad | Explicación |
|:-----------|:-:|:------------|
| `border-top-color` / `background-color` con `outline-variant` y opacidad: `rgba(193, 201, 192, …)` → `rgba(192, 201, 191, …)` | 609 / 104 | Redondeo de color de la cadena de CSS (It. 02, §4.3). El valor nuevo coincide con el token. |
| `background-image` de `fx-spotlight`: parada `0px` → `0%` | 84 | Serialización del degradado (It. 02, §4.3). Equivalente. |
| `background-image` de `.bg-noise` (Inicio, Servicios, Suscripción y Galería) | 56 | **Hallazgo nuevo, explicado por código:** el CSS de la referencia (Tailwind CLI con minificación) reescribió el SVG del ruido (`baseFrequency=".6"` y los atributos en otro orden). El de Astro conserva el texto de `input.css` (`type="fractalNoise" baseFrequency="0.6" …`). Mismos atributos y valores; ninguna diferencia de píxeles atribuida a la textura. |
| Footer: `border-top-*`, `margin-top`, `font-size` y `line-height` | 84 + 42 + 42 + 70 + 70 | It. 03 (contenedor y enlace activo). |
| **No explicadas** | **0** | |

### 5.4 Capturas de página completa (A/B en las mismas condiciones)

| Zona | Píxeles comparados | > 1 nivel | > 8 niveles | Máximo | Combinaciones con > 8 |
|:-----|--:|--:|--:|:-:|:-:|
| Resto de la página | 231.486.338 | 599.511 | 10.744 | 42 | 31 |
| ↳ borde superior del footer en la 404 (fila 819 o 595 con el footer en 819,19 o 595,19 px; 768 y 1024 px) | — | — | 7.168 | 42 | 4 |
| ↳ ruido en fotografías y tarjetas | — | — | **3.576 (0,0015 %)** | 29 | 27 |
| Zonas animadas | 7.817.006 | 25.044 | 0 | 5 | 0 |
| Footer (It. 03, alineado por su borde superior) | 45.518.552 | 2.859.310 | 2.080.659 | 223 | 84 |
| Header de las franjas finales desplazadas por el footer más corto | 3.601.920 | 807.917 | 161.302 | 36 | 7 |

* **Franjas:** 696 en la referencia y 694 en el sitio nuevo; 78 pares son idénticos byte a byte. Las diferencias de 1 nivel son el redondeo de color de §5.3.
* **Borde del footer de la 404:** el clasificador cortó por píxel entero y la fila con el borde nuevo de 1 px quedó en «resto». Es la It. 03 (768 × 2 y 1.024 × 2 píxeles por combinación).
* **Ruido en fotografías:** los píxeles aislados caen dentro de fotografías y tarjetas: tarjetas y botón de reproducción de la Galería, imágenes de los planes de Suscripción, una tarjeta de Servicios y 3 píxeles del Hero.
    * **Prueba de ruido:** se repitieron 11 de esas combinaciones comparando **la referencia contra sí misma** (1.872 píxeles > 8 en 8 combinaciones, máximo 29) y **el sitio nuevo contra sí mismo** (1.423 en 6, máximo 29). Aparecen los mismos elementos y la misma magnitud; Suscripción a 768 × 1024, oscuro, dio exactamente 737 píxeles en los tres pares.
    * Los archivos de imagen son idénticos (§4.4), y la geometría y el estilo de esos elementos también (§5.2 y §5.3). Se atribuye al reescalado de fotografías durante el pintado, no al código.
    * **Salvedad:** en Servicios (740 × 360 claro: 101 píxeles; 1024 × 768 claro: 7) la diferencia se repitió igual en una segunda corrida A/B y **no** apareció al comparar cada sitio consigo mismo. Queda atribuida por analogía, no demostrada.
* **Contra `referencia/capturas/`** (It. 01, tomadas **con** fuentes de Google): los 84 PNG existen y su ancho coincide con el del viewport en las 84. En el primer viewport difieren entre 2,85 % y 36,75 % de los píxeles (mediana 6,88 %), porque aquí las fuentes están bloqueadas y se usa la tipografía de reserva: esa comparación **no es concluyente** píxel a píxel. Por la misma causa, el alto de página de la It. 01 coincide con el de la referencia servida en local solo en 53 de 77 combinaciones con dato. La paridad se certifica con el A/B de la referencia servida en local en las mismas condiciones, como en las It. 02 y 04.

### 5.5 Flujos (clics y teclas reales; en ambos sitios)

| Flujo | Casos | Iguales a la referencia | Resultado en el sitio nuevo |
|:------|:-:|:-:|:----------------------------|
| Menú móvil (360 × 740, 6 páginas): abrir, cerrar con el botón, Escape, toque fuera y paso a 1280 px | 6 | 6 | `aria-expanded`, `aria-label`, panel, capa tenue y bloqueo de desplazamiento correctos; el foco vuelve a la hamburguesa tras el botón y tras Escape. |
| Modales de Servicios (8 servicios, a 1280 × 800 y 360 × 740) | 16 | 13 | Abren con título, imagen principal cargada y CTA `/contacto?service=<servicio>`. 0 salidas del foco en 14 Tab y Shift+Tab. Cierran con Escape (y con la capa, probado en el primero) y devuelven el foco al botón. **Las 3 diferencias** son miniaturas aún sin cargar en la referencia en el instante de la medición; una sonda aparte, esperando 0,5 y 3 s, mostró todas las miniaturas cargadas en ambos sitios (tiempos del arnés). |
| Selección de plan en Suscripción → Contacto (3 planes) | 3 | 3 | Lleva a `/contacto?service=Plan%20Esencial` (y Premiere, Luxe), con el `<select>` en ese plan y el aviso visible con el nombre. Los planes están siempre visibles: `#show-plans-btn` no existe en ninguno de los dos sitios y `subscription.js` lo omite con su guarda. |
| Lightbox de la Galería (34 piezas: 24 imágenes y 10 videos, 1280 × 800) | 34 | 34 | Abre con el foco en «cerrar» y el fondo `inert`; las 24 imágenes cargan; siguiente, flecha izquierda, botón de cierre y Escape funcionan; 0 salidas del foco con Tab; el foco vuelve a la tarjeta. **Videos (mp4 bloqueados):** el visor abre y cierra igual; el `<video>` queda con `networkState` 3, `readyState` 0 y error 4 (fuente no disponible), igual en la referencia. La reproducción real queda 🕒 PENDIENTE. |
| Carrusel de reseñas (Inicio, 1280 y 360) | 2 | 2 | 10 tarjetas; contador `01 / 10` → `02` → `03` → `02` con los botones; al final, `is-at-end` (contador `08 / 10` a 1280 y `10 / 10` a 360, igual en la referencia). |
| Formulario de Contacto (360 × 740): vacío, correo inválido, válido, servicio desconocido y texto con HTML en `?service=` | 1 (5 pasos) | 0 (solo cambia la URL `/contacto.html` → `/contacto`) | Vacío: inválidos `contact-name`, `contact-email` y `contact-message`, sin abrir nada. Correo inválido: solo `contact-email`. Válido: **1 llamada interceptada** a `wa.me/56997702832`, con el mensaje armado (fecha `24-12-2026`) y el aviso de estado. **No se envió nada a ningún destino.** Servicio desconocido: se agrega como opción. `<img src=x onerror=…>` en `?service=` se muestra como texto (0 `<img>` inyectadas). |
| Tema sin elección guardada (sistema claro y sistema oscuro, 1280): cargar, alternar, recargar, navegar con clics a Servicios, Galería y Contacto, alternar de vuelta y 404 anidada | 2 (8 pasos) | 2 | La elección se conserva en todos los pasos y en la 404. |
| 404 anidada (`/a/b/inexistente` y `/servicios/xyz`, a 360 y 1280) | 4 | 0 (solo cambia la hoja de estilos) | Estado **404**; fondo `rgb(248, 247, 243)`; header de 80 px; logotipos cargados; 0 `aria-current`; hoja `/_astro/BaseLayout.744HEtGc.css` (en la referencia, `/dist/css/output.css` con `<base>`: diferencia planificada). Única línea de consola: el 404 del propio documento, igual en la referencia. |
| **Total** | **68** | **60** | Las 8 diferencias están explicadas: 3 de tiempos del arnés, 1 de URL (`/contacto.html` → `/contacto`) y 4 de la hoja de estilos de la 404 (planificadas). |

**404 en Cloudflare:** `pnpm preview` sirve la 404 con estado 404 y estilos en rutas anidadas; no replica necesariamente a Cloudflare. El desarrollador ya lo midió en la vista previa (It. 02, `curl.exe -I`) [informado]. En producción queda 🕒 PENDIENTE (§8.3, paso 6).

### 5.6 Incidentes del arnés (no del sitio)

1. La primera versión del script de preparación tenía un error de escape en una expresión regular dentro del texto evaluado (`SyntaxError`); se corrigió y se repitió la prueba corta.
2. El clasificador de estilos no reconocía la parada `0px` del degradado ni el SVG de `.bg-noise` en su primera versión; se ajustó antes de la corrida completa de 84 combinaciones.
3. El flujo de Suscripción suponía un botón `#show-plans-btn`, inexistente en ambos sitios; se retiró el paso y se repitió la corrida completa de flujos.
4. Al detener `pnpm preview` quedó vivo el proceso hijo de `astro preview` (PID 28260, lanzado por el agente); se detuvo.
5. Las miniaturas de dos modales se midieron antes de que cargaran en la referencia; se descartó con una sonda (§5.5).

**Cierre de recursos:** `pnpm preview` y el servidor de la referencia detenidos; **0 puertos** a la escucha en 4321, 4400 y 9333 a 9335; **0 procesos** de Chrome con los perfiles del arnés y 0 procesos de Node del arnés.

## 6. Tarea 4: documentación [código]

### 6.1 Estado de `propuestas-documentos-protegidos.md` frente a los archivos

| Propuesta | Archivo | Estado real |
|:----------|:--------|:------------|
| A.1, D.1, E.1 | `AGENTS.md` §4 | ✅ Aplicadas: L88 Astro `7.x`, L91 pnpm `11.24.0` y Node `>= 22.22`, comandos de Astro; nota de transición retirada. |
| A.2, D.4 y regla 2 de la It. 07 | `AGENTS.md` §5 | ✅ Aplicadas: regla 1 (L112 a L114), regla 2 con la excepción del ADR-003 (L115 a L118), regla 6 sin transición y regla 8 sin «se retira en la It. 02» (L135 a L137). |
| A.3 y §7 de la It. 07 | `AGENTS.md` §7 | ✅ Aplicadas (L161 a L163, «exactamente 1 `<script>` sin `src`»). La línea transitoria de paridad de A.3 ya no está. |
| A.4 | `AGENTS.md` §9 | ✅ Aplicada (L184 a L186). |
| C.1 | `AGENTS.md` L4 | ✅ Aplicada (sin `www`). |
| A.5, D.5, E.3 y la de la It. 07 | `stack-tecnologico.md` | ✅ Aplicadas (L11 a L15, L32 a L35, L47 a L52). |
| A.6 | `proposito-y-alcance.md` §3 | ✅ Aplicada. **Divergencia aparte:** §2, L18, sigue diciendo «Consta de 6 archivos HTML físicos independientes» (§9.2). |
| A.7, D.3 y las de la It. 07 | `_planificacion/README.md` §6 y §7 | ✅ Aplicadas: §6 (L104 a L112) y §7 (L118 a L120) ya describen Astro, `pnpm run build:cf`, el CSS de `_site/_astro/` y el script del tema. **No hace falta otra propuesta para el §6 ni el §7.** |
| A.8 | `objetivos-y-metricas.md` | ✅ Aplicada (título, introducción y §3, punto 4). |
| A.9, C.2, D.2, E.2 y la de la It. 07 | `README.md` | ✅ Aplicadas (L8, L16 a L19, §2, §4, §5, §6, §7, §8, §10, §12 y §15). |
| B.1 | `DESIGN.md` | 🕒 Pendiente: 5 líneas vigentes (§9.1). §5.3 y §10 ya se actualizaron en la It. 03. |
| C.3 | `DESIGN.md` L4 | ✅ Ya aplicada (`https://lajardinerafloreria.cl`, sin `www`). |
| D.6 (comandos Git), D.7 | Árbol y `_planificacion/README.md` §12 | ✅ Hechos: no existen los 6 HTML de la raíz, `dist/` ni `stage-site.mjs`; DT-10, DT-14, DT-16 y DT-17 tienen sus filas actualizadas. |

**¿Reflejan lo implementado?**

* Astro: los documentos dicen «`7.x`» (`AGENTS.md` L88, `README.md` L56, `stack-tecnologico.md` L12). La versión exacta `7.4.0` está fijada en `package.json` (`"astro": "7.4.0"`) y en el ADR-001, D1. No es una contradicción: es la serie.
* pnpm `11.24.0` y Node `>= 22.22`: correctos en los tres documentos. La versión exacta de Cloudflare (`22.22.2`) está solo en `definicion-epica.md` §5 y en el ADR-001, como dato informado.
* Salida `_site/`, dominio sin `www` y ADR-003: correctos.
* El ADR-002 se cita indirectamente: la URL sin `www` está en `AGENTS.md` L4 y `README.md` L8, L63 y L170.

### 6.2 Menciones vigentes del sitio anterior (búsqueda en los documentos actuales)

Patrones buscados: «seis/6 (archivos) HTML», «HTML físicos», `dist/css`, `output.css`, `pnpm build`, `stage-site`, «lista blanca», `www.lajardinerafloreria`, `index.html` y las demás páginas `.html`, `./public/`, `Live Server` y `http.server`. Se excluyen las bitácoras y las especificaciones de iteraciones cerradas (historial).

| Archivo y línea | Texto | ¿Vigente? |
|:----------------|:------|:----------|
| `DESIGN.md` L43 | «`<link>` de Google Fonts en los 6 HTML» | Sí → propuesta §9.1 (a) |
| `DESIGN.md` L349 | «del Hero de `index.html`» | Sí → (b) |
| `DESIGN.md` L410 | «en forma literal en `servicios.html`» (hoy, `src/pages/servicios.astro` L377) | Sí → (c) |
| `DESIGN.md` L454 | «`404.html` en estado neutro» | Sí → (d) |
| `DESIGN.md` L551 | «después de las utilidades en `output.css`» | Sí → (e). En `_site/_astro/BaseLayout.744HEtGc.css` el bloque `@supports not (backdrop-filter…)` está en el byte 29.559, después de las utilidades base; en la referencia, en el 30.676 de 47.062: misma posición relativa. |
| `proposito-y-alcance.md` L18 | «Consta de 6 archivos HTML físicos independientes» | Sí → §9.2 |
| `proposito-y-alcance.md` L39 | «Tailwind CSS v3 compilado localmente» | Correcto, pero impreciso → §9.2 (opcional) |
| `_planificacion/README.md` L228 (DT-11, abierta) | BOM en «`index.html`, `input.css`, `main.js`, módulos JS, `tailwind.config.js`» | Sí: `index.html` ya no existe. Hoy tienen BOM `src/css/input.css`, `src/js/main.js`, `src/js/data/reviews.js`, `carousel.js`, `modal.js`, `navigation.js`, `theme.js` y `tailwind.config.js`; los `.astro` no. → §9.3 |
| `_planificacion/README.md` L239 a L242 (DT-22 a DT-25, abiertas) y L287 a L320 (detalle de SM-01) | Líneas de `index.html`, `servicios.html`, `galeria.html`, `suscripcion-floral.html` y `404.html` | Sí: son ubicaciones de los HTML anteriores. Los defectos siguen: por ejemplo, 9 de 11 `<img>` de `src/pages/index.astro` y 24 de 24 de `galeria.astro` sin `width` o `height` (DT-23). → §9.3 (nota) |
| `README.md` L35, L162; `proposito-y-alcance.md` L32; `AGENTS.md` L113 | `404.html` y «seis archivos HTML» como **salida** | Correctas (describen lo que se publica). |
| `README.md` L180 | «Cada página declara … `canonical` y Open Graph» | Impreciso: la 404 no los lleva (por diseño). → §9.5 (opcional) |

En `AGENTS.md`, `README.md`, `stack-tecnologico.md` y `objetivos-y-metricas.md`: **0 menciones vigentes** a seis HTML en la raíz, a `dist/css/output.css` ni a `pnpm build` (Escenario 4 de la especificación, por código).

**Documentos no protegidos con texto desactualizado (solo se reportan; están fuera de la autorización de edición):**

* `definicion-epica.md` L3: «Estado: ⏳ planificada, pendiente de aprobación»; L8 y L9: «`main` no se toca hasta la Iteración 08»; §7 L183: «`main` intacto hasta la It. 08»; y §8 L197 a L198, referencia de Lighthouse (§3).
* `decisiones-tecnicas.md`: el ADR-001 dice «main no se toca hasta la Iteración 08» y «ninguna propuesta aplicada todavía al 16-10-2026». La sección «Despliegue por lista blanca» describe `stage-site.mjs`, que ya no existe; es historial, pero no indica que la reemplazó el ADR-001 (D4).

### 6.3 Comentarios de cabecera de `src/`

Se buscaron «usará», «futur», «próxim», «pendiente», «se agregará», «It. 0N», «Iteración», «Épica», «TODO» y «más adelante» en `src/`. Las cabeceras de `SeoHead.astro`, `SiteFooter.astro`, `SiteHeader.astro`, `secciones/FranjaBeneficios.astro`, `src/data/navegacion.js`, `src/pages/sitemap.xml.js` y `BaseLayout.astro` citan su iteración **en pasado o en presente**. **0 comentarios** describen una iteración como futura. El de `navegacion.js` ya se corrigió en la It. 06. Las demás coincidencias son textos del contenido («todo el radio urbano», «próxima entrega»). Un comentario de `input.css`, L161 y L162, cita la «Iteración 05» de una épica anterior como historial: no es futuro.

## 7. Lo que no se pudo medir (🕒 PENDIENTE)

* Lighthouse (Tarea 3), producción (Tarea 5), Search Console y vistas previas sociales: los hace el desarrollador (guías A a D).
* Firefox, Safari, dispositivo móvil real, fuentes de Google reales (Noto Serif y Montserrat), reproducción de los videos y contraste forzado real de Windows (guía E).
* La redirección 301 de `/public/*` (`pnpm preview` no aplica `_redirects`).

## 8. Guía manual para el desarrollador (Tareas 3 y 5)

> Usa la misma computadora, la misma red y la misma sesión para todas las mediciones. Cierra otras pestañas pesadas y no uses el equipo mientras corre Lighthouse. Los comandos son para PowerShell (`curl.exe`, no `curl`).

### 8.1 A) Lighthouse (Tarea 3)

1. **Ubica la referencia.** Panel de Cloudflare → *Workers & Pages* → el proyecto → *Deployments*. Busca el último despliegue de **Production** (rama `main`) **anterior** a la primera fusión de Astro (la de la It. 02). Copia su URL propia (`https://<id>.<proyecto>.pages.dev`) y anótala junto con su *commit*.
   **Resultado esperado:** en esa URL, `view-source:` muestra `<link rel="stylesheet" href="./dist/css/output.css">` (sitio anterior). Si ves `/_astro/BaseLayout.…css`, es un despliegue de Astro: busca uno más antiguo.
2. **Anota** la fecha, la hora de inicio y la versión de Chrome (`chrome://version`) y de Lighthouse (pie del informe).
3. **Abre una ventana de incógnito** (sin extensiones) → DevTools → pestaña *Lighthouse* → modo «Navegación», las 4 categorías y el dispositivo («Móvil» o «Escritorio»), sin cambiar la limitación predeterminada. Pulsa «Analizar la carga de la página».
4. **Mide, para cada página** (`/`, `/servicios`, `/suscripcion-floral`, `/galeria`, `/contacto` y `/a/b/inexistente`) **y cada modo**, 3 corridas en la referencia (R) y 3 en producción (P, `https://lajardinerafloreria.cl`), alternando R, P, R, P, R, P. Total: 72 corridas. Opcional: 3 más en la vista previa de la rama (V).
   **Resultado esperado:** cada informe muestra la URL correcta; en la 404, el aviso de «código de estado 404» es normal.
5. **Anota** Performance, Accesibilidad, Best Practices, SEO, LCP y CLS de cada corrida. Guarda los informes (JSON o PDF) en `referencia/lighthouse/it08/` (fuera de Git) con el nombre `sitio-pagina-modo-corrida`.
6. **Mediana:** ordena las 3 corridas y toma la del medio.
7. **Criterio de aceptación** (`definicion-epica.md` §8), por página y modo, comparando P con R:
    * Performance: P ≥ R − 10 en móvil y P ≥ R − 3 en escritorio.
    * Accesibilidad, Best Practices y SEO: P ≥ R.
    * CLS: P ≤ 0,1 **y** P ≤ R + 0,01.
    * LCP: se registra sin umbral.
8. **Atención con la URL `*.pages.dev`:** si en la referencia aparece una auditoría de SEO «La página no se puede indexar» por una cabecera `X-Robots-Tag` que no está en producción, anótala y entrega los dos valores. En la vista previa (V) puede pasar algo parecido con el `canonical`, que apunta a `lajardinerafloreria.cl`. No está verificado: es una posibilidad que conviene mirar en el informe.

**Tabla para las medianas** (R = referencia anterior a Astro; P = producción):

| Página | Modo | Perf R | Perf P | Acc R | Acc P | BP R | BP P | SEO R | SEO P | LCP R | LCP P | CLS R | CLS P | ¿Cumple? |
|:-------|:-----|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `/` | Móvil | | | | | | | | | | | | | |
| `/servicios` | Móvil | | | | | | | | | | | | | |
| `/suscripcion-floral` | Móvil | | | | | | | | | | | | | |
| `/galeria` | Móvil | | | | | | | | | | | | | |
| `/contacto` | Móvil | | | | | | | | | | | | | |
| `/a/b/inexistente` | Móvil | | | | | | | | | | | | | |
| `/` | Escritorio | | | | | | | | | | | | | |
| `/servicios` | Escritorio | | | | | | | | | | | | | |
| `/suscripcion-floral` | Escritorio | | | | | | | | | | | | | |
| `/galeria` | Escritorio | | | | | | | | | | | | | |
| `/contacto` | Escritorio | | | | | | | | | | | | | |
| `/a/b/inexistente` | Escritorio | | | | | | | | | | | | | |

### 8.2 B) Observación heredada: 404 de `rum` (`iteracion-08.md`, Tarea 3)

1. Abre `https://lajardinerafloreria.cl` con DevTools → *Console*. Recarga y mira si aparece el mensaje en rojo de `rum` con estado 404. Repite en las 6 páginas y anota «sí» o «no» por página.
   **Resultado esperado:** queda anotado si el mensaje existe en producción.
2. En *Network*, filtra por `rum`, haz clic en la petición y copia la *Request URL* completa, el *Status* y el *Initiator* (se espera `beacon.min.js`). Compara el Best Practices de producción con el de la referencia en las medianas de la tabla A.
3. Decide con la regla de la especificación:
    * Si el mensaje existe **solo** en la vista previa, o si baja el Best Practices frente a la referencia: se registra como deuda técnica con destino Épica 10 y se informa en la bitácora.
    * Si aparece **también** en producción: se anota como comportamiento externo al código (Cloudflare Web Analytics inyecta `beacon.min.js`; el repositorio no lo contiene, como tampoco `email-decode.min.js`) y no cuenta como incumplimiento del DoD.

### 8.3 C) Verificación en producción (Tarea 5, ya desplegada)

1. **Las 6 páginas:** abre `https://lajardinerafloreria.cl/`, `/servicios`, `/suscripcion-floral`, `/galeria`, `/contacto` y `/a/b/inexistente`.
   **Esperado:** con estilos, imágenes, header y footer; el tema alterna.
2. **Redirección de URL antiguas:**
   ```powershell
   curl.exe -sI https://lajardinerafloreria.cl/public/images/hero-botanical-desktop.webp
   curl.exe -sI https://lajardinerafloreria.cl/images/hero-botanical-desktop.webp
   ```
   **Esperado:** el primero, estado `301` con `location: /images/hero-botanical-desktop.webp`; el segundo, `200` con `content-type: image/webp`.
3. **`robots.txt`:**
   ```powershell
   curl.exe -s https://lajardinerafloreria.cl/robots.txt
   ```
   **Esperado:** contiene `User-agent: *`, `Allow: /` y `Sitemap: https://lajardinerafloreria.cl/sitemap.xml`, aunque Cloudflare agregue su bloque de *content signals*. Si ese bloque **reemplaza** las tres líneas, anótalo: sería un hallazgo.
4. **`sitemap.xml`:**
   ```powershell
   ([regex]::Matches((curl.exe -s https://lajardinerafloreria.cl/sitemap.xml), '<loc>')).Count
   ```
   **Esperado:** `5`, y las direcciones sin `www` ni `.html`.
5. **Imagen Open Graph:**
   ```powershell
   curl.exe -sI https://lajardinerafloreria.cl/images/og/og-default.jpg
   ```
   **Esperado:** `200` con `content-type: image/jpeg`. En `view-source:https://lajardinerafloreria.cl/` aparece `og:image` con esa URL.
6. **404 anidada:**
   ```powershell
   curl.exe -sI https://lajardinerafloreria.cl/a/b/inexistente
   ```
   **Esperado:** estado `404`; en el navegador se ve con estilos, logotipo y header.
7. **Archivos internos no publicados:**
   ```powershell
   foreach ($r in '/package.json','/AGENTS.md','/README.md','/DESIGN.md','/_planificacion/README.md','/astro.config.mjs') { curl.exe -s -o NUL -w "$r %{http_code}`n" "https://lajardinerafloreria.cl$r" }
   ```
   **Esperado:** `404` en los 6.
8. **Log de despliegue:** *Deployments* → el despliegue de producción de `b813c3a` → *View details* / registro de compilación.
   **Esperado:** Node `22.22.2` y pnpm `11.24.0` detectados, «6 page(s) built», sin errores, y el despliegue publicado con éxito.
9. **Configuración (Escenario 3):** *Settings* → *Builds & deployments*.
   **Esperado:** comando de compilación `pnpm run build:cf`, directorio de salida `_site`, rama de producción `main`, y variables `NODE_VERSION=22.22.2` y `PNPM_VERSION=11.24.0`.
10. **Reversión (solo si algo falla):**
    1. Panel → *Deployments* → el último despliegue bueno → menú «…» → *Rollback to this deployment*. Es inmediato y no toca Git.
    2. En Git, ubica las fusiones con `git log --oneline --first-parent main` y revierte cada una, de la más nueva a la más antigua, con `git revert -m 1 <sha-del-merge>`; luego haz *push* a `main`.
    **Esperado:** el sitio vuelve al despliegue elegido. Los comandos de Git los ejecuta el desarrollador, no el agente.

### 8.4 D) Search Console y vistas previas sociales

1. Entra a <https://search.google.com/search-console> y elige la **propiedad de dominio** `lajardinerafloreria.cl` (tipo «Dominio», sin `www`).
   **Esperado:** la propiedad existe y está verificada. Si solo hay una propiedad con prefijo de URL y `www`, crea la de dominio (exige un registro TXT en el DNS de Cloudflare, que haces tú).
2. *Indexación* → *Sitemaps* → «Agregar un sitemap nuevo»: `https://lajardinerafloreria.cl/sitemap.xml` → *Enviar*.
   **Esperado:** estado «Correcto» y 5 URL descubiertas. Puede tardar horas o días.
3. *Inspección de URLs* → `https://lajardinerafloreria.cl/servicios` → «Probar URL publicada».
   **Esperado:** la URL canónica declarada es `https://lajardinerafloreria.cl/servicios`.
4. **WhatsApp:** envíate el enlace `https://lajardinerafloreria.cl`.
   **Esperado:** la vista previa muestra la imagen de portada y el título «La Jardinera Florería - Valdivia, Chile».
5. **Facebook:** en <https://developers.facebook.com/tools/debug/> pega la URL → «Depurar» (y «Volver a extraer» si muestra datos antiguos).
   **Esperado:** `og:image` de 1200 × 630 y título y descripción correctos. El aviso por falta de `fb:app_id` es normal.

### 8.5 E) Comprobaciones manuales que el agente no puede hacer

Hazlas en **Firefox**, **Safari** (macOS o iOS) y un **celular real**, en modo claro y oscuro. Marca cada ítem:

1. Las 6 páginas se ven completas y con las fuentes reales (DevTools → *Network* → *Font*: Noto Serif y Montserrat con 200).
2. Primera visita con el sistema en oscuro (datos del sitio borrados): sin destello claro.
3. Menú móvil: abre, cierra, Escape (con teclado) y toque fuera; la página de fondo no se desplaza.
4. Modal de Servicios: abre, se desplaza, cierra con la X, la capa y Escape; «Cotizar» lleva a Contacto con el servicio.
5. Suscripción: «Seleccionar Plan» lleva a Contacto con el plan precargado y el aviso visible.
6. Galería: los videos se reproducen en las tarjetas y en el visor; al cerrar el visor, el audio se detiene.
7. Carrusel de reseñas: avanza y retrocede; el contador cambia.
8. Formulario: con datos válidos abre WhatsApp con el mensaje armado. Puedes cerrarlo sin enviar.
9. Barra de escritorio entre 1024 y 1100 px con fuentes reales: «Suscripción Floral» en una sola línea (H8).
10. **Contraste forzado** (reserva de la Épica 07): en Windows, *Configuración* → *Accesibilidad* → *Temas de contraste* → activa uno y abre el Inicio en Chrome o Edge. **Esperado:** el titular del Hero se ve en un color sólido del tema (`CanvasText`), sin destellos ni fondo.

Anota el navegador, el dispositivo, el resultado y la fecha.

## 9. Propuestas de edición para archivos protegidos

Las líneas `-` se tomaron del archivo por programa y se comprobaron contra el texto actual (19-10-2026, `HEAD` `b813c3a`). Ninguna se aplicó.

### 9.1 Propuesta de edición — `DESIGN.md` (B.1)
**Sección:** §1.1, §7.1, §8.2, §9.4 y §11.7
**Motivo:** cinco líneas describen archivos del sitio anterior (6 HTML, `index.html`, `servicios.html`, `404.html` y `output.css`). No cambian tokens ni reglas.

(a) §1.1, L43
```diff
-`<link>` de Google Fonts en los 6 HTML.
+`<link>` de Google Fonts del `<head>` de `src/layouts/BaseLayout.astro`, único para las 6 páginas.
```
(b) §7.1, L349
```diff
-del Hero de `index.html`.
+del Hero del Inicio (`src/pages/index.astro`).
```
(c) §8.2, L410
```diff
-`servicios.html` para que Tailwind las compile.
+`src/pages/servicios.astro` (contenedor `#modal-gallery-container`) para que Tailwind las compile.
```
(d) §9.4, L454
```diff
-fijos). Alturas acopladas a `h-20`. Estado activo único por página; `404.html` en estado neutro.
+fijos). Alturas acopladas a `h-20`. Estado activo único por página; la 404 en estado neutro (`paginaActiva = null`).
```
(e) §11.7, L551
```diff
-   Starlight, sube el fondo de `.hero-glass` al 85 %. Debe quedar después de las utilidades en `output.css`; dentro de
+   Starlight, sube el fondo de `.hero-glass` al 85 %. Debe quedar después de las utilidades en el CSS compilado (`_site/_astro/`); dentro de
```
(f) Opcional, §15 Registro de cambios, después de L639
```diff
   unifica su contenedor y el enlace activo (§5.3, §10).
+- **Épica 08 · Iteraciones 07 y 08:** tema aplicado antes del primer pintado con el script de arranque del ADR-003 (§5.7) y
+  rutas de archivo del documento actualizadas a la estructura de Astro (§1.1, §7.1, §8.2, §9.4 y §11.7).
```

### 9.2 Propuesta de edición — `_planificacion/01-vision/proposito-y-alcance.md` (requiere autorización)
**Sección:** §2 Arquitectura de navegación (L18) y, opcional, §3 (L39)
**Motivo:** el sitio ya no tiene 6 HTML físicos escritos a mano: son 6 páginas `.astro` que Astro compila a 6 HTML.
```diff
-El proyecto es estrictamente una **Multi-Page Application (MPA)**. Consta de 6 archivos HTML físicos independientes:
+El proyecto es estrictamente una **Multi-Page Application (MPA)**. Consta de 6 páginas (`src/pages/*.astro`) que Astro compila a 6 archivos HTML independientes:
```
Opcional:
```diff
-* **Estilizado Restringido:** Tailwind CSS v3 compilado localmente, mapeado 1:1 con los tokens oficiales.
+* **Estilizado Restringido:** Tailwind CSS v3 compilado vía PostCSS en la compilación de Astro, mapeado 1:1 con los tokens oficiales.
```

### 9.3 Propuesta de edición — `_planificacion/README.md`
**Sección:** §12, criterios de severidad (L214 y L215) y fila DT-11 (L228)
**Motivo:** DT-11 cita `index.html`, que ya no existe. Las filas abiertas DT-22 a DT-25 y el detalle de SM-01 citan líneas de los HTML anteriores a Astro: los defectos siguen, pero sus ubicaciones no. Sin cambio de severidad. El §6 y el §7 ya están al día (§6.1): no necesitan propuesta.
```diff
 * **Baja:** sin efecto visible o solo de mantenimiento.
+
+> Las ubicaciones (`archivo.html`, `Lnnn`) de las filas abiertas DT-22 a DT-25 y del detalle de SM-01 (§14) son las de los HTML
+> anteriores a la Épica 08. Hoy el marcado vive en `src/pages/*.astro` y `src/components/`; se regeneran al planificar las
+> Épicas 09 y 10.
```
````diff
-| DT-11 | Varios archivos guardados con BOM UTF-8 (`index.html`, `input.css`, `main.js`, módulos JS, `tailwind.config.js`). | Baja | Oportunista |
+| DT-11 | Varios archivos guardados con BOM UTF-8. Al 19-10-2026: `src/css/input.css`, `src/js/main.js`, `src/js/data/reviews.js`, los módulos `carousel.js`, `modal.js`, `navigation.js` y `theme.js`, y `tailwind.config.js`. Los `.astro` no llevan BOM (el `index.html` original sí lo tenía). | Baja | Oportunista |
````
**Fila DT-08 (L225), solo cuando la guía C confirme producción:** reemplazar «🕒 PENDIENTE: `/robots.txt`, `/sitemap.xml` y `og:image` en producción (It. 08), y el alta del sitemap en Search Console.» por el resultado medido. El texto exacto se entrega en el cierre con los datos del desarrollador.

### 9.4 Documentos de la épica (no protegidos; fuera de la autorización de esta iteración: para el cierre)

`definicion-epica.md` L3, L8 y L9 y el §8 (casilla de Lighthouse, L197 y L198), y `decisiones-tecnicas.md` (ADR-001 → «Implementada»), se actualizan **en el cierre de la épica**, con las mediciones del desarrollador. Propuesta para la casilla del §8, que recoge la decisión de la §3:
```diff
-* [ ] Lighthouse de las 6 páginas, en móvil y escritorio: el sitio actual (producción) y el nuevo (vista previa de la
-  rama) se miden en la misma sesión, 3 corridas por página y modo, y se comparan las medianas. Aceptación: Performance
+* [ ] Lighthouse de las 6 páginas, en móvil y escritorio: el último despliegue de `main` anterior a Astro (referencia,
+  URL del panel de Cloudflare Pages) y producción se miden en la misma sesión, 3 corridas por página y modo, y se
+  comparan las medianas (decisión del desarrollador, It. 08). Aceptación: Performance
```

### 9.5 Propuesta de edición — `README.md` (para el cierre de la épica)
**Sección:** §11 (L180, opcional) y §15 Hoja de ruta (L230)
**Motivo:** la 404 no lleva `canonical` ni Open Graph, por diseño; y la Épica 08 deja de estar «en curso» al cerrarse. La fecha y el estado se completan en el cierre.
```diff
-🔹 Cada página declara `<title>`, `<meta name="description">`, `canonical` y Open Graph propios; la página 404 declara `noindex, follow`. El sitio publica `robots.txt` y `sitemap.xml`.
+🔹 Cada página indexable declara `<title>`, `<meta name="description">`, `canonical` y Open Graph propios; la página 404 declara `noindex, follow`, sin `canonical` ni Open Graph. El sitio publica `robots.txt` y `sitemap.xml`.
```
```diff
-2. **Épica 08 — Migración estructural a Astro** (en curso): layout, header, footer y SEO como componentes únicos,
+2. **Épica 08 — Migración estructural a Astro** (<estado del cierre>, DD-MM-2026): layout, header, footer y SEO como componentes únicos,
```

`AGENTS.md` y `stack-tecnologico.md`: **sin propuestas** (sin divergencias).

## 10. Archivos modificados

| Archivo | Cambio |
|:--------|:-------|
| `_planificacion/04-bitacora/bitacora-epica-08/bitacora-iteracion-08.md` (nuevo, CRLF, sin BOM) | Esta bitácora. |
| `_planificacion/04-bitacora/estado-actual.md` (BOM, CRLF, sin salto final) | Una línea agregada al final; la anterior pasa a terminar en `\r\n`. |

Sin cambios en `src/`, `public/`, `scripts/`, `astro.config.mjs`, `package.json`, `pnpm-lock.yaml`, `tailwind.config.js`, `iteracion-08.md`, `definicion-epica.md`, `decisiones-tecnicas.md` ni los archivos protegidos. `_site/` se regeneró con `pnpm run build:cf` (ignorada por Git). Los scripts del arnés quedaron en la carpeta temporal del agente, fuera del repositorio. Ningún comando de Git que escriba.

## 11. Estado, reservas y pendientes

### 11.1 Estado

**Completada con reservas.** No está 🔒 Cerrada: la épica se cierra cuando el desarrollador traiga las mediciones de Lighthouse y la verificación en producción. Entonces se escriben la línea de cierre de la épica y el cambio del ADR-001 a «Implementada».

### 11.2 Escenarios de `iteracion-08.md`

| Escenario | Estado | Evidencia |
|:----------|:-------|:----------|
| 1. Paridad certificada (7 viewports, ambos temas) | ✅ en local, con reservas | [código] §4 y [render] §5: solo diferencias planificadas. Comparado con la referencia servida en local (A/B), no con producción. Sin fuentes reales, sin videos y solo en Chrome headless. |
| 2. Rendimiento (Lighthouse) | 🕒 PENDIENTE (desarrollador) | Guía A. Referencia redefinida (§3). |
| 3. Despliegue sin cambios de configuración | 🕒 PENDIENTE (desarrollador) | Guía C, pasos 8 y 9. Por código: `build:cf` = `astro build` y `outDir: './_site'`. |
| 4. Documentación al día | ✅ para `AGENTS.md` y `stack-tecnologico.md` [código] | 0 menciones vigentes a 6 HTML en la raíz y a `dist/css/output.css`. Quedan las propuestas de la §9 para `DESIGN.md`, `proposito-y-alcance.md` y `_planificacion/README.md`. |

### 11.3 Reservas

1. Render real solo en **Chrome headless**, sin fuentes de Google ni videos.
2. Ruido de píxeles en fotografías de Servicios **atribuido por analogía**, no reproducido en la comparación de cada sitio consigo mismo (§5.4).
3. La comparación contra `referencia/capturas/` no es concluyente por las fuentes (§5.4).
4. `/public/*` → 301 comprobado solo por código.

### 11.4 Pendientes (🕒)

* **Desarrollador:** guía A (Lighthouse, con la URL de la referencia), guía B (`rum`), guía C (producción, incluido el log, la configuración y los 404 de los archivos internos), guía D (Search Console y vistas previas sociales) y guía E (Firefox, Safari, celular real, fuentes reales, videos y contraste forzado).
* **Decisiones:** aplicar las propuestas de la §9 (B.1 de `DESIGN.md`, `proposito-y-alcance.md` y `_planificacion/README.md`) y, en el cierre, las de la §9.4 y la §9.5.
* **Cierre de la épica:** con las mediciones del desarrollador, la línea de cierre en `estado-actual.md`, el ADR-001 → «Implementada», DT-08 y la definición de la épica.

### 11.5 Hallazgos sin deuda nueva

* SVG de `.bg-noise` reserializado entre las dos cadenas de CSS (§5.3): equivalente y sin efecto visible.
* `#show-plans-btn` y `#hide-plans-btn` no existen en el marcado (ni en la referencia), pero `subscription.js` los sigue manejando: código muerto protegido por su guarda. No se corrige aquí.
* No se registró deuda técnica nueva.

## 12. Mensaje de commit sugerido

```text
Épica 08 - Iteración 08: Certifica la paridad de la migración a Astro con auditoría estática y render real, y deja la guía para Lighthouse, producción y Search Console.
```

Longitud contada con Node: 168 caracteres.

## 13. Mediciones delegadas (A, B y C)

**Fecha:** 19-10-2026 · **Agente:** Claude Code · **Encargo:** el desarrollador delegó las secciones A (Lighthouse, Tarea 3), B (404 de `rum`) y C (verificación en producción, Tarea 5) de la guía de la §8. D (Search Console, WhatsApp y Facebook) y E (Firefox, Safari, celular real y contraste forzado) siguen siendo suyas y no se ejecutaron. La sección se numera 13 porque la bitácora ya tiene las §10 a §12 (decisión del desarrollador en el chat).

Rótulos: **[medido]** medido por el agente en esta sesión; **[informado]** dato entregado antes por el desarrollador; **🕒 PENDIENTE** queda para el desarrollador.

### 13.1 Sitios, herramientas y carpeta de resultados

| Dato | Valor |
|:-----|:------|
| R (referencia) | `https://f6f82bf4.la-jardinera.pages.dev`: vista previa del *commit* `e1390c8`, el último anterior a Astro (indicado por el desarrollador) |
| P (producción) | `https://lajardinerafloreria.cl` (Astro) |
| Rama / `HEAD` | `feat/migracion-astro` / `318621a` |
| Lighthouse | `13.5.0`, consultado una vez con `pnpm view lighthouse version` y ejecutado siempre con `pnpm dlx lighthouse@13.5.0`, sin agregarlo a `package.json` |
| Chrome | `155.0.8059.84` (nombre de la carpeta de la única instalación, en `C:\Program Files\Google\Chrome\Application\`; Lighthouse informa `HeadlessChrome/155.0.0.0`). Solo lo arrancó Lighthouse (chrome-launcher), en *headless* |
| Opciones de Lighthouse | `--only-categories=performance,accessibility,best-practices,seo`, `--output=json --output=html`, `--ignore-status-code`, `--chrome-flags="--headless=new --user-data-dir=<carpeta nueva por corrida> --no-first-run --no-default-browser-check"`; escritorio con `--preset=desktop`. Limitación simulada (la predeterminada) |
| Node / pnpm | `v24.16.0` / `11.24.0` |
| Carpeta de resultados (fuera del repositorio) | `C:\Users\ffeli\AppData\Local\Temp\lj-it08-mediciones\` (297 archivos, 101 MB; se conserva como línea base para la Épica 10) |

* **`--ignore-status-code`:** una prueba previa, fuera de las 72, sobre la 404 de P sin esa opción terminó con `ERRORED_DOCUMENT_REQUEST (Status code: 404)` y las 4 categorías en `null` (carpeta `prueba/`). La opción hace lo mismo que DevTools: mide la página y deja un aviso. Se aplicó por igual a las 72 corridas; en las páginas con 200 no cambia nada. [medido]
* **Perfiles:** cada corrida recibió una carpeta de perfil nueva bajo `perfiles/`. Al terminar, `perfiles/` está vacía: no se puede saber si Chrome usó esa carpeta y chrome-launcher la borró al cerrar, o si usó la carpeta temporal propia de chrome-launcher. En los dos casos fue un perfil nuevo y desechable; nunca el perfil ni la sesión del desarrollador. [medido]

### 13.2 T0: comprobación previa (`curl -sI` y `curl -sL`, con `Cache-Control: no-cache`) [medido]

| Sitio | URL | Código final | Redirecciones | `Content-Type` | `X-Robots-Tag` | `Cache-Control` | `Server` |
|:-:|:----|:-:|:-:|:--|:--|:--|:--|
| R | `/` | 200 | 0 | `text/html; charset=utf-8` | `noindex` | `public, max-age=0, must-revalidate` | `cloudflare` |
| R | `/servicios` | 200 | 0 | `text/html; charset=utf-8` | `noindex` | `public, max-age=0, must-revalidate` | `cloudflare` |
| R | `/suscripcion-floral` | 200 | 0 | `text/html; charset=utf-8` | `noindex` | `public, max-age=0, must-revalidate` | `cloudflare` |
| R | `/galeria` | 200 | 0 | `text/html; charset=utf-8` | `noindex` | `public, max-age=0, must-revalidate` | `cloudflare` |
| R | `/contacto` | 200 | 0 | `text/html; charset=utf-8` | `noindex` | `public, max-age=0, must-revalidate` | `cloudflare` |
| R | `/a/b/inexistente` | 404 | 0 | `text/html; charset=utf-8` | — | `no-store` | `cloudflare` |
| P | `/` | 200 | 0 | `text/html; charset=utf-8` | — | `public, max-age=0, must-revalidate` | `cloudflare` |
| P | `/servicios` | 200 | 0 | `text/html; charset=utf-8` | — | `public, max-age=0, must-revalidate` | `cloudflare` |
| P | `/suscripcion-floral` | 200 | 0 | `text/html; charset=utf-8` | — | `public, max-age=0, must-revalidate` | `cloudflare` |
| P | `/galeria` | 200 | 0 | `text/html; charset=utf-8` | — | `public, max-age=0, must-revalidate` | `cloudflare` |
| P | `/contacto` | 200 | 0 | `text/html; charset=utf-8` | — | `public, max-age=0, must-revalidate` | `cloudflare` |
| P | `/a/b/inexistente` | 404 | 0 | `text/html; charset=utf-8` | — | `no-store` | `cloudflare` |

* **R es el sitio original:** sus 6 HTML referencian `./dist/css/output.css` (1 vez cada uno) y ninguno contiene `/_astro/`; su 404 lleva `<base href="/">`. Los 6 HTML de P referencian `/_astro/BaseLayout.744HEtGc.css`. Ninguna URL redirige: se midieron tal cual.

### 13.3 T1: Lighthouse (sección A) [medido]

**Ejecución:** 72 corridas (6 URL × móvil y escritorio × 3 × R y P), de una en una, en orden R1, P1, R2, P2, R3, P3 por página y dispositivo, entre las 18:31:54 y las 18:51:58. **72 de 72 sin error de ejecución, 0 reintentos y 0 fallidas.** Archivos: `lighthouse/<sitio>-<página>-<movil|escritorio>-<n>.report.json` y `.report.html` (72 + 72), registro en `lighthouse/corridas.log` y cálculo en `analisis-lighthouse.txt` y `resumen-lighthouse.json`.

**Medianas** (R / P y diferencia P − R). Cada columna es la mediana de sus 3 corridas, calculada por separado (la mediana del LCP puede venir de otra corrida que la de Performance). Tiempos en segundos, salvo el TBT (ms).

| Página | Modo | Perf | Acc | BP | SEO | FCP | LCP | TBT | CLS | SI | ¿Cumple? |
|:-------|:-----|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `/` | Móvil | 68 / 69 (+1) | 91 / 91 (0) | 96 / 100 (+4) | 58 / 100 (nc) | 3,76 / 3,80 | 5,32 / 6,02 | 0 / 16 | 0,029 / 0,029 | 4,86 / 4,19 | Sí |
| `/servicios` | Móvil | 84 / 83 (−1) | 98 / 98 (0) | 96 / 100 (+4) | 66 / 100 (nc) | 3,07 / 3,24 | 3,61 / 3,74 | 0 / 0 | 0,003 / 0,003 | 3,21 / 3,24 | Sí |
| `/suscripcion-floral` | Móvil | 78 / 69 (−9) | 100 / 100 (0) | 96 / 100 (+4) | 66 / 100 (nc) | 3,10 / 3,18 | 4,43 / 8,45 | 0 / 0 | **0,000 / 0,015** | 3,55 / 3,37 | **No (CLS)** |
| `/galeria` | Móvil | 73 / 79 (+6) | 100 / 100 (0) | 96 / 100 (+4) | 66 / 100 (nc) | 3,31 / 3,40 | 5,38 / 3,83 | 0 / 0 | 0,003 / 0,003 | 4,42 / 3,90 | Sí |
| `/contacto` | Móvil | 80 / 74 (−6) | 100 / 100 (0) | 96 / 100 (+4) | 66 / 100 (nc) | 3,25 / 3,28 | 3,82 / 4,54 | 0 / 85 | 0,048 / 0,000 | 3,80 / 5,28 | Sí |
| `/a/b/inexistente` | Móvil | 83 / 83 (0) | 98 / 98 (0) | 96 / 96 (0) | 58 / 58 (0) | 3,19 / 3,12 | 3,69 / 3,70 | 0 / 0 | 0,013 / 0,013 | 3,21 / 3,29 | Sí |
| `/` | Escritorio | 93 / 91 (−2) | 91 / 91 (0) | 96 / 100 (+4) | 58 / 100 (nc) | 1,16 / 1,30 | 1,25 / 1,35 | 0 / 0 | 0,003 / 0,003 | 1,53 / 1,57 | Sí |
| `/servicios` | Escritorio | 96 / 96 (0) | 98 / 98 (0) | 96 / 100 (+4) | 66 / 100 (nc) | 0,99 / 1,08 | 1,10 / 1,12 | 0 / 0 | 0,002 / 0,002 | 1,05 / 1,30 | Sí |
| `/suscripcion-floral` | Escritorio | **93 / 89 (−4)** | 100 / 100 (0) | 96 / 100 (+4) | 66 / 100 (nc) | 0,98 / 1,06 | 1,34 / 1,89 | 0 / 0 | 0,004 / 0,004 | 1,37 / 1,38 | **No (Perf)** |
| `/galeria` | Escritorio | 91 / 92 (+1) | 100 / 100 (0) | 96 / 100 (+4) | 66 / 100 (nc) | 1,24 / 1,24 | 1,27 / 1,36 | 0 / 0 | 0,003 / 0,003 | 1,63 / 1,48 | Sí |
| `/contacto` | Escritorio | 96 / 95 (−1) | 100 / 100 (0) | 96 / 100 (+4) | 66 / 100 (nc) | 0,95 / 1,04 | 1,01 / 1,12 | 0 / 0 | 0,003 / 0,003 | 1,34 / 1,35 | Sí |
| `/a/b/inexistente` | Escritorio | 96 / 97 (+1) | 98 / 98 (0) | 96 / 96 (0) | 58 / 58 (0) | 0,97 / 0,96 | 1,01 / 1,01 | 0 / 0 | 0,007 / 0,007 | 1,31 / 1,23 | Sí |

(nc) = no comparable (ver más abajo). Las 3 corridas de cada celda están en `analisis-lighthouse.txt`.

**Criterio del DoD aplicado textualmente** (`definicion-epica.md` §8, L197 a L202):

> «Aceptación: Performance no más de 10 puntos por debajo (móvil) ni de 3 (escritorio) de la mediana de referencia; Accesibilidad, Best Practices y SEO no menores que la referencia; CLS mediano ≤ 0,1 y no mayor que el de referencia más 0,01. El LCP se registra sin umbral. La 404 se mide en una ruta anidada (/a/b/inexistente).»

La línea nombra como referencia «el sitio actual (producción)» y como sitio nuevo «la vista previa de la rama». Aquí se aplica con la referencia que decidió el desarrollador (§3): R es el último despliegue anterior a Astro y P es producción.

| Casilla | Casos | Cumplen | No cumplen |
|:--------|:-:|:-:|:--|
| Performance (móvil ≥ R − 10; escritorio ≥ R − 3) | 12 | 11 | Suscripción Floral, escritorio: 89 < 93 − 3 = 90 |
| Accesibilidad ≥ R | 12 | 12 | — |
| Best Practices ≥ R | 12 | 12 | — (ver la salvedad sobre R) |
| SEO ≥ R | 12 | 12 (10 no comparables) | — |
| CLS ≤ 0,1 y ≤ R + 0,01 | 12 | 11 | Suscripción Floral, móvil: 0,015 > 0,000 + 0,01 = 0,010 (sí cumple ≤ 0,1) |
| LCP | 12 | sin umbral | Registrado. Mayor en P en 10 de 12 casos; el mayor salto, Suscripción móvil: 4,43 → 8,45 s |

**Resultado: 58 de 60 casillas cumplen y 2 no cumplen. El criterio de Lighthouse del DoD NO se cumple.**

* **SEO no comparable (10 de 12 filas):** R trae `X-Robots-Tag: noindex` en sus 5 páginas (por ser `*.pages.dev`) y P no la trae. En las 30 corridas de esas páginas, R falla `is-crawlable` y P la pasa. Además, R falla `meta-description` en el Inicio (DT-04, resuelta en P). Fuera de esas dos auditorías, ninguna corrida de R ni de P falla otra auditoría de SEO. Las diferencias de +34 y +42 vienen de esas auditorías: no cuentan como mejora ni como regresión. En la 404, ambos sitios fallan `is-crawlable` (`noindex, follow`, por diseño) y `http-status-code` (404), y empatan en 58.
* **Best Practices de R (96):** en las 30 corridas de las 5 páginas, R falla solo `errors-in-console`, y el error es la petición `rum` del *beacon* bloqueada por CORS en `*.pages.dev` (§13.4). En P, 0 auditorías fallidas (100). El +4 viene del entorno de `pages.dev`, no del código. En la 404, ambos fallan `errors-in-console` por el 404 del propio documento (96 = 96).
* **Diagnóstico de las 2 casillas (hipótesis, no demostrada):** el elemento LCP es el mismo en R y P (`hero-1.webp`, con `fetchpriority="high"`, sin `loading="lazy"` y descubrible en el HTML). En la simulación de Lighthouse entran al LCP las imágenes que Chrome marca como prioridad *High* antes del LCP observado:
    * Suscripción, móvil: en las 3 corridas de P aparecen con prioridad *High* `la-jardinera-original.png`, `hero-1`, `hero-2`, `hero-3` y `hero-4` (1.125 KiB), con LCP simulado de 8,41 a 8,54 s. En R, solo `hero-1` o `hero-1` y `hero-3` (148 a 296 KiB), con LCP de 4,42 a 4,44 s.
    * Suscripción, escritorio: las 2 corridas de P con el logotipo y `hero-2` a `hero-4` en *High* (1.264 KiB) dan 89 y LCP de 1,89 a 1,90 s. La corrida sin el logotipo en *High* (587 KiB) da 93, igual que la mediana de R.
    * Por qué Chrome les da prioridad *High* en P y no en R no está determinado: el marcado de esas imágenes es el mismo según la paridad de la §5, y el momento en que termina la hoja de estilos no lo explica (en R, la corrida 2 móvil la terminó a los 268 ms y aun así dejó esas imágenes en *Low*). El patrón es coherente con DT-22 (logotipo PNG de 300 KiB mostrado a 44 px) y DT-23 (`hero-2` a `hero-4` con `lazy` apiladas dentro del área visible), ya destinadas a la Épica 10. No se comprobó repitiendo mediciones.
    * **CLS móvil:** el desplazamiento es el mismo en ambos sitios (0,015, en `main > section.h-[80vh] > div.relative`). Aparece en 3 de 3 corridas de P y en 1 de 3 de R (en R, la mediana es 0). Mismo elemento y mismo valor: depende de los tiempos de carga, no de un cambio de marcado. Hipótesis: el cambio de fuente de Google (`display=swap`), sin verificar.

### 13.4 T2: 404 de `rum` (sección B)

**En los JSON de Lighthouse** (`network-requests` y `errors-in-console`) [medido]:

| Sitio | Páginas | `email-decode.min.js` | `beacon.min.js` | Petición `rum` | Consola |
|:-:|:--|:--|:--|:--|:--|
| P | 5 con contenido (30 corridas) | 200 (`/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js`) | 200 (`static.cloudflareinsights.com/beacon.min.js`) | XHR `https://cloudflareinsights.com/cdn-cgi/rum` → **204**; *preflight* 200 | 0 errores |
| P | 404 (6 corridas) | 200 | 200 (`…/beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092`) | XHR `https://lajardinerafloreria.cl/cdn-cgi/rum?` → **204** | Solo el 404 del propio documento |
| R | 5 con contenido (30 corridas) | no se carga | 200 | XHR `https://cloudflareinsights.com/cdn-cgi/rum` → **falla** (estado −1, `net::ERR_FAILED`); *preflight* 200 | 2 errores por corrida: «Access to XMLHttpRequest at 'https://cloudflareinsights.com/cdn-cgi/rum' from origin 'https://f6f82bf4.la-jardinera.pages.dev' has been blocked by CORS policy» y «Failed to load resource: net::ERR_FAILED» |
| R | 404 (6 corridas) | no | no | ninguna | Solo el 404 del propio documento |

* En P no hay ningún 404 de `rum` ni error de consola asociado. En R (otra vista previa `*.pages.dev`) la petición `rum` falla por CORS, no con 404, al menos en Chrome *headless*.
* `email-decode.min.js` aparece solo en P: es la ofuscación de correos del dominio, que no se aplica en `*.pages.dev`.
* En el HTML que devuelve `curl`, la 404 de P no trae el `<script>` del *beacon*, pero en Lighthouse sí se carga otro *beacon* (con la ruta `/vce…`). Se informa sin explicación verificada.

**Con `curl -sI`** (solo HEAD) [medido]:

| URL | Resultado |
|:----|:----------|
| `https://ec366712.la-jardinera.pages.dev/cdn-cgi/rum` (vista previa actual de la rama) | `HTTP/1.1 404 Not Found`, `text/html`, `cloudflare` |
| `https://f6f82bf4.la-jardinera.pages.dev/cdn-cgi/rum` (R) | `HTTP/1.1 404 Not Found` |
| `https://lajardinerafloreria.cl/cdn-cgi/rum` (P) | `HTTP/1.1 404 Not Found` |

* HEAD responde 404 también en producción, donde las peticiones del navegador reciben 204: esta medición **no distingue** los sitios. Con la regla 6 (solo GET o HEAD), no se envió el POST que hace el navegador.
* La vista previa de la rama (`ec366712`) inyecta el mismo *beacon* que R (`static.cloudflareinsights.com/beacon.min.js`, mismo *token*). Sobre esa URL no se corrió Lighthouse.

**Decisión según la regla:**

1. Best Practices de P frente a R: **no baja** en ninguna fila (100 contra 96 en las páginas; 96 = 96 en la 404).
2. ¿El error existe solo en la vista previa? **Sí:** en producción no hay error de `rum` [medido]; en `*.pages.dev` hay error, por CORS en R [medido] y con 404 en la vista previa de la rama [informado en las It. 04 a 07].
3. Se cumple la segunda condición de la regla: **se propone una deuda técnica con destino Épica 10** (§13.8, DT-28). No afecta a producción ni al DoD.

### 13.5 T3: verificación de producción (sección C) [medido]

| Ítem | Comprobación | Resultado | Estado |
|:-:|:--|:--|:-:|
| a | 5 páginas con 200 | `/`, `/servicios`, `/suscripcion-floral`, `/galeria` y `/contacto`: 200, `text/html`, sin redirecciones | OK |
| a | 404 anidadas | `/a/b/inexistente` y `/servicios/xyz`: 404, `text/html`. Ambas referencian `/_astro/BaseLayout.744HEtGc.css`, que responde 200 `text/css` | OK |
| b | `https://www.lajardinerafloreria.cl/` | 301 → `https://lajardinerafloreria.cl/` (200, 1 salto). `https://www.…/servicios` → 301 → `https://lajardinerafloreria.cl/servicios` (conserva la ruta) | OK (ADR-002) |
| b | `http://lajardinerafloreria.cl/` | 301 → `https://lajardinerafloreria.cl/` (200, 1 salto) | OK |
| b | `http://www.lajardinerafloreria.cl/` (extra) | 301 → `https://www.lajardinerafloreria.cl/` → 301 → `https://lajardinerafloreria.cl/` (2 saltos) | Observación: llega al canónico, con un salto más |
| c | `/public/images/hero-botanical-desktop.webp` | 301, `Location: /images/hero-botanical-desktop.webp` (coincide con `public/_redirects`: `/public/*  /:splat  301`); destino 200 `image/webp` | OK: **cierra la Reserva 3** |
| d | `/robots.txt` | 200 `text/plain`. Contenido completo: `User-agent: *` / `Allow: /` / (línea vacía) / `Sitemap: https://lajardinerafloreria.cl/sitemap.xml`. Es idéntico al `public/robots.txt` del repositorio (LF en Git). **Cloudflare no le agrega nada hoy:** el bloque de *content signals* visto en la It. 05 ya no aparece | OK |
| e | `/sitemap.xml` | 200 `application/xml`; exactamente 5 `<loc>`, 0 con `www` (la única «www» del archivo es el `xmlns` de `sitemaps.org`); las 5 URL responden 200 | OK |
| f | `canonical`, `og:url` y `og:image` | En las 5 páginas, `canonical` = `og:url` = URL sin `www` ni extensión (`https://lajardinerafloreria.cl/`, `/servicios`, `/suscripcion-floral`, `/galeria` y `/contacto`); `og:image` = `https://lajardinerafloreria.cl/images/og/og-default.jpg`. La 404 no lleva `canonical` ni `og:*` y declara `noindex, follow` | OK |
| f | `og-default.jpg` | 200, `image/jpeg`, 88.503 B, JPEG válido de **1200 × 630 px** (leído del marcador SOF). Copia en `t3/descargas/og-default.jpg` | OK |
| g | Archivos internos | `/AGENTS.md`, `/README.md`, `/DESIGN.md`, `/package.json`, `/astro.config.mjs`, `/_planificacion/README.md` y `/src/layouts/BaseLayout.astro`: 404 los 7 | OK |
| h | Paridad de despliegue | Ver abajo | OK |

**h) Paridad de despliegue:**

* **Compilación local:** `pnpm install --frozen-lockfile` (código 0) y `pnpm run build:cf` (código 0, «6 page(s) built in 2.33s», 0 líneas con «warn» o «error», 109 archivos en `_site/`). El árbol de Git siguió limpio. Registro en `t3/build.log`.
* **Normalización** (`scripts/normalizar-html.mjs`): se quitaron el `<script>` de `beacon.min.js` (5 páginas; la 404 no lo trae) y el de `email-decode.min.js` (6). Se decodificaron los `data-cfemail` y los `href="/cdn-cgi/l/email-protection#…"` a su texto y su `mailto:` (1 por página y 2 en Contacto). Se colapsaron los espacios, con una etiqueta o un texto por línea. Después de normalizar no quedó ningún resto de `cdn-cgi`, `cloudflareinsights` ni `__cf_email__`.
* **Diferencias restantes, P frente a `_site/`:** Inicio, Servicios, Suscripción Floral, Galería y Contacto, **2 líneas cada una**: los dos comentarios `<!-- Cloudflare Pages Analytics -->` que Cloudflare pone alrededor del *beacon* (también inyectados). 404 (`/a/b/inexistente` frente a `404.html`): **0**. Los correos decodificados coinciden con los de `_site/`. **Diferencias no explicadas: 0.**

**i) 🕒 PENDIENTE (desarrollador):** el registro de compilación del despliegue de producción (Node `22.22.2`, pnpm `11.24.0`, «6 page(s) built», publicación correcta; guía C, paso 8), la configuración del panel (`pnpm run build:cf`, `_site`, `main`, `NODE_VERSION` y `PNPM_VERSION`; paso 9, Escenario 3) y el procedimiento de reversión (paso 10; solo si algo falla).

### 13.6 Reservas

* **Se cierra:** la Reserva 3 (`/public/*` → 301 solo por código; punto 4 de la §11.3): medida en producción, ítem c.
* **Siguen abiertas:** la Reserva 1 (render real solo en Chrome *headless*; Lighthouse cargó las fuentes reales, pero sigue siendo *headless*) y la Reserva 2 (ruido de píxeles de Servicios atribuido por analogía).
* **Nueva:** el criterio de Lighthouse del DoD no se cumple en 2 de 60 casillas (Suscripción Floral, §13.3), con una hipótesis de causa sin comprobar.

### 13.7 Pendientes del desarrollador (🕒)

* **D:** Search Console (propiedad de dominio, alta de `sitemap.xml` e inspección de `/servicios`) y las vistas previas en WhatsApp y Facebook.
* **E:** Firefox, Safari, celular real, fuentes reales, reproducción de videos y contraste forzado.
* **Panel de Cloudflare:** log de compilación, configuración y reversión (§13.5, i).
* **Decisión sobre el criterio de Lighthouse:** aceptar las 2 casillas como reserva con destino Épica 10, o abrir una iteración de corrección como prevé `iteracion-08.md` («si bloquea, se abre una iteración de corrección numerada a continuación»).

### 13.8 Propuestas (sin aplicar)

Se entregan en el chat en formato `-`/`+` para `_planificacion/README.md` §12: **DT-27** (Lighthouse de Suscripción Floral frente a la referencia anterior a Astro) y **DT-28** (`rum` con error en las vistas previas `*.pages.dev`). La fila DT-08 queda lista para el prompt de cierre: `/robots.txt`, `/sitemap.xml` y `og:image` están verificados en producción (§13.5, d a f).

### 13.9 Cierre de recursos y archivos

* 0 procesos de Chrome, Node o Lighthouse lanzados por el agente siguen vivos, y 0 puertos a la escucha en 4321, 4400, 9222 y 9333. [medido]
* **Carpeta de resultados:** `C:\Users\ffeli\AppData\Local\Temp\lj-it08-mediciones\`, con 297 archivos:
    * `lighthouse/`: 72 JSON, 72 HTML, 72 salidas de consola y `corridas.log`.
    * `t0/`: 12 cabeceras, 12 HTML y 12 resúmenes.
    * `t2/`: HTML de la vista previa de la rama.
    * `t3/`: `verificacion-produccion.txt`, `build.log`, `descargas/` (6 HTML, 404 de `/servicios/xyz`, `robots.txt`, `sitemap.xml`, `og-default.jpg` y cabeceras) y `paridad/` (12 normalizados y 6 diferencias).
    * `prueba/` (la corrida de arranque fuera de las 72), `scripts/` (5), `analisis-lighthouse.txt`, `resumen-lighthouse.json` y `seccion-13.md` (borrador de esta sección).
* **Repositorio:** solo cambia esta bitácora (se agrega la §13). `_site/` se regeneró (ignorada por Git). Ningún comando de Git que escriba.

## 14. Cierre con las confirmaciones del desarrollador

Ejecución del 19-10-2026 sobre `feat/migracion-astro` (`HEAD` `318621a`), con las ediciones a mano del desarrollador ya aplicadas en los archivos protegidos. No se hicieron mediciones nuevas: esta sección cierra la It. 08 y la Épica 08 con los datos de la §13 y las confirmaciones del desarrollador. Rótulos: [informado] (el desarrollador), [asesor] (comprobado por el asesor con Git), [código] y [medido] (Claude Code), 🕒 PENDIENTE.

### 14.1 Confirmaciones del desarrollador [informado]

| Tema | Lo que informó |
|:-----|:---------------|
| Search Console | Propiedad de dominio `lajardinerafloreria.cl`: sitemap `https://lajardinerafloreria.cl/sitemap.xml` enviado el 19-10-2026, estado «Correcto», 5 páginas descubiertas, 0 videos. Antes de este cierre quitó el sitemap antiguo `https://www.lajardinerafloreria.cl/sitemap.xml` (sitio anterior, 2022). |
| Depurador de Facebook | `https://lajardinerafloreria.cl`, 19-10-2026, 19:11: código 200; URL canónica `https://lajardinerafloreria.cl/`; imagen `og-default.jpg`, título, descripción y texto alternativo correctos. Única advertencia: falta `fb:app_id`; no afecta la vista previa y decidió ignorarla (observación, sin deuda técnica). |
| WhatsApp | 19-10-2026, 19:11: la tarjeta muestra imagen de portada, título «La Jardinera Florería - Valdivia, Chile», descripción y dominio. |
| Pruebas manuales (guía E, §8.5) | Firefox, celular real y contraste forzado: sin diferencias. **Safari no se probó.** No informó el detalle por ítem de la guía; se registra solo lo informado. |
| Cloudflare Pages (panel) | Log de compilación del commit `b813c3a` exitoso: Node 22.22.2, pnpm 11.24.0, Astro 7.4.0, 6 páginas, 1 regla de redirección válida y 108 de 108 recursos subidos (los 109 archivos de `_site/` incluyen `_redirects`, que Cloudflare procesa como regla). Configuración: comando `pnpm run build:cf`, salida `_site`, sin directorio raíz, rama de producción `main` con despliegue automático, sin *deploy hooks*, variables `NODE_VERSION=22.22.2` y `PNPM_VERSION=11.24.0`. Reversión: la opción «Rollback to this deployment» aparece en la lista de despliegues; no se ejecutó. |
| Destino de reversión | `e1390c8`, último *commit* de `main` anterior a `44a82dc` (la primera migración a Astro). Identificado por el asesor con Git. [asesor] |

### 14.2 Verificación de los archivos protegidos (T1) [código]

Lectura y búsqueda de texto sobre el árbol de trabajo; no se corrigió nada.

| Archivo | Comprobación | Línea | Estado |
|:--------|:-------------|:------|:------:|
| `DESIGN.md` | (a) §1.1: `<link>` de Google Fonts del `<head>` de `src/layouts/BaseLayout.astro` | L43 | OK |
| `DESIGN.md` | (b) §7.1: Hero del Inicio (`src/pages/index.astro`) | L349 | OK |
| `DESIGN.md` | (c) §8.2: `src/pages/servicios.astro` (contenedor `#modal-gallery-container`) | L410 | OK |
| `DESIGN.md` | (d) §9.4: la 404 en estado neutro (`paginaActiva = null`) | L454 | OK |
| `DESIGN.md` | (e) §11.7: CSS compilado (`_site/_astro/`) | L551 | OK |
| `DESIGN.md` | §15 «Épica 08 · Iteraciones 07 y 08», con «ADR-003 (§5)» (0 ocurrencias de «§5.7») | L640 | OK |
| `_planificacion/01-vision/proposito-y-alcance.md` | §2: 6 páginas `src/pages/*.astro` compiladas a 6 HTML | L18 | OK |
| `_planificacion/01-vision/proposito-y-alcance.md` | §3: Tailwind compilado vía PostCSS en la compilación de Astro | L39 | OK |
| `_planificacion/README.md` | Nota después de «Baja» (ubicaciones de DT-22 a DT-25 y SM-01) | L216 | OK |
| `_planificacion/README.md` | DT-08 «Resuelta», con la verificación en producción | L229 | OK |
| `_planificacion/README.md` | DT-11 con la lista corregida (`scripts/replace-icons.js`, «Los 11 `.astro` no llevan BOM») | L232 | OK |
| `_planificacion/README.md` | Filas DT-27, DT-28, DT-29 y DT-30 después de DT-26 | L248 a L251 | OK |
| `_planificacion/README.md` | SM-03 con destino «Épica 09 — Revisión móvil (por planificar)» | L283 | OK |
| `_planificacion/README.md` | Fila nueva del §13 con fecha 19-10-2026 | L263 | OK |
| `_planificacion/README.md` | **Fila DT-26 truncada:** hoy dice «Carga inicial de la Galería con 10 `<video>` ...» y perdió el resto del texto (el `HEAD` lo trae completo: 48,7 MB, `nmg2.mp4`, `ddm2.mp4`, candidata a carga diferida, origen en la Épica 07 y traslado desde la It. 06). Queda con «Media» y «Épica 10 (rendimiento)». No se corrigió (archivo protegido) | L247 | **FALLA** |
| `README.md` | §11: «Cada página indexable…», la 404 sin `canonical` ni Open Graph | L180 | OK |
| `README.md` | Hoja de ruta: Épica 08 «completada con reservas, 19-10-2026» y líneas de las Épicas 09 y 10 | L230, L232, L233 | OK |
| BOM de DT-11 | `src/css/input.css`, `src/js/main.js`, `src/js/data/reviews.js`, `carousel.js`, `modal.js`, `navigation.js`, `theme.js`, `tailwind.config.js` y `scripts/replace-icons.js`: los 9 existen y tienen BOM | — | OK |
| BOM de DT-11 | 11 archivos `.astro` en `src/`, 0 con BOM. Ningún otro archivo de `src/`, `scripts/` o la raíz tiene BOM fuera de esa lista | — | OK |

Resultado: 18 de 19 comprobaciones en OK; 1 FALLA (fila DT-26). Por esa falla, la casilla del DoD sobre documentos actualizados queda abierta (§14.5).

### 14.3 Decisiones del desarrollador (cerradas) [informado]

1. **Lighthouse:** el criterio del DoD §8 no se cumple (58 de 60 casillas; fallan 2 en Suscripción Floral, §13.3). La Épica 08 se cierra con reserva y la corrección va a la Épica 10 (DT-27). No se abre una iteración de corrección ni se remide.
2. **Reserva 2** (ruido de píxeles de Servicios): sigue como reserva, redactada «atribuido por analogía, no demostrado». La línea que `estado-actual.md` traía para la It. 08 lo presentaba como comprobado («ruido de píxeles en fotografías también presente al comparar cada sitio consigo mismo»); se corrige agregando la corrección en una línea nueva, porque ese archivo solo se agrega.
3. **Deuda técnica nueva**, registrada por el desarrollador en `_planificacion/README.md`: DT-27 (Suscripción Floral en Lighthouse), DT-28 (`rum` en vistas previas), DT-29 (código muerto `#show-plans-btn` y `#hide-plans-btn` en `subscription.js`) y DT-30 (fin de soporte de Node 22, hacia abril de 2027). SM-03 pasa a la Épica 09.
4. **`fb:app_id`:** observación, sin deuda técnica ni código.
5. **Safari:** reserva abierta; se retoma en la Épica 09 si el desarrollador consigue un dispositivo Apple.

### 14.4 Estado final de las reservas

| Reserva | Estado | Detalle |
|:--------|:------:|:--------|
| 1. Render automático solo en Chrome *headless* | Abierta | Firefox y celular real probados a mano por el desarrollador [informado]; **Safari sin probar**. |
| 2. Ruido de píxeles de Servicios | Abierta | **Atribuido por analogía, no demostrado:** no se reprodujo al comparar cada sitio consigo mismo (§5.4, §11.3). [render] |
| 3. `/public/*` → 301 solo por código | **CERRADA** | Medida en producción: 301 a `/images/hero-botanical-desktop.webp`, que responde 200 `image/webp` (§13.5, ítem c). [medido] |
| Nueva: Lighthouse | Abierta | 2 de 60 casillas no cumplen el criterio del DoD (Performance de escritorio y CLS móvil de Suscripción Floral); DT-27, Épica 10 (§13.3). [medido] |

Nota: el punto 3 de la §11.3 (la comparación contra `referencia/capturas/` no es concluyente por las fuentes) no figura entre las reservas de las líneas de `estado-actual.md` ni entre las decisiones de esta ejecución. Se deja tal como está en la §11.3.

### 14.5 Estado del DoD de la Épica 08 (`definicion-epica.md` §8)

6 casillas verificadas (una de ellas con reserva) y 2 abiertas.

| # | Casilla | Estado | Fuente |
|:-:|:--------|:------:|:-------|
| 1 | Header, panel móvil, footer y `<head>` una sola vez | [x] | §4.2: 1 `<header>` y 1 `<footer>` por página; `<head>` único en `BaseLayout.astro`. [código] |
| 2 | `_site/` con las 6 páginas, mismos nombres y header y footer completos sin JavaScript | [x] | §4.1, §4.2 y §4.4: 6 HTML con los nombres de la referencia, 1 `<header>` y 1 `<footer>` en el HTML compilado. [código] |
| 3 | Paridad visual y funcional en 7 viewports, claro y oscuro | [x] con reserva | §5: 84 combinaciones por sitio sin diferencias no explicadas. Reserva: Safari sin probar; render automático solo en Chrome *headless* (§14.4). Firefox y celular real sin diferencias [informado]. |
| 4 | 0 `style=`, 0 `onclick`, 0 `<style>` y 1 `<script>` sin `src` por página | [x] | §4.2: idéntico en las 6 (SHA-256 `5b490c26…`). [código] |
| 5 | 0 `./public/` en el código fuente; `/public/...` con 301 | [x] | §4.2 (0 `./public/`) [código] y §13.5, ítem c (301 en producción) [medido]. |
| 6 | Lighthouse (criterio de medianas) | [ ] | No cumplida: 58 de 60 casillas (§13.3); fallan Performance de escritorio y CLS móvil de Suscripción Floral. Aceptada como reserva, DT-27, Épica 10. |
| 7 | Cloudflare Pages publica desde `_site/` sin cambios de configuración y sin exponer archivos internos | [x] | Log y configuración del panel [informado] (§14.1); 7 archivos internos con 404 en producción (§13.5, ítem g) [medido]. |
| 8 | `AGENTS.md`, `README.md`, `stack-tecnologico.md` y `proposito-y-alcance.md` actualizados por el desarrollador | [ ] | La T1 (§14.2) dio 1 FALLA: la fila DT-26 de `_planificacion/README.md` quedó truncada. La casilla no nombra ese archivo, pero la regla de este cierre exige que la T1 dé OK en todo. Se marca cuando el desarrollador restituya la fila. |

### 14.6 Observaciones

* **`fb:app_id`:** el depurador de Facebook advierte que falta. No afecta la vista previa; el desarrollador decidió ignorarla. Sin deuda técnica ni código. [informado]
* **Node 22 (DT-30):** el log de Cloudflare confirma Node 22.22.2 [informado]. Según el calendario de Node.js, la versión dejaría de recibir soporte hacia abril de 2027; la deuda quedó registrada como DT-30 (mantenimiento, antes de esa fecha).

### 14.7 Pendientes que no bloquean el cierre

* **Safari y dispositivo Apple:** se retoman en la Épica 09 si el desarrollador consigue un dispositivo Apple. 🕒 PENDIENTE
* **Fila DT-26 de `_planificacion/README.md`:** restituir el texto completo (§14.2). 🕒 PENDIENTE (desarrollador)

### 14.8 Verificación final de esta ejecución [código]

* `pnpm install --frozen-lockfile` (código 0, «Already up to date») y `pnpm run build:cf` (código 0, «6 page(s) built in 2.10s», 0 líneas con «warn» o «error», 109 archivos en `_site/` y 6 HTML). Sin cambios de código.
* Archivos modificados por esta ejecución: esta bitácora (se agrega la §14), `estado-actual.md` (2 líneas), `definicion-epica.md` de la Épica 08, `decisiones-tecnicas.md` y el archivo nuevo `epica-09-revision-movil/definicion-epica.md`. Los archivos protegidos figuran modificados por el desarrollador; no se tocaron. Ningún comando de Git que escriba.

### 14.9 Mensaje de commit sugerido

```text
Épica 08 - Iteración 08: Cierra la Épica 08 con reservas: Lighthouse 58 de 60 casillas (DT-27), producción y Search Console verificados, DT-27 a DT-30 y la Épica 09 definida.
```

Longitud contada con Node: 174 caracteres.
