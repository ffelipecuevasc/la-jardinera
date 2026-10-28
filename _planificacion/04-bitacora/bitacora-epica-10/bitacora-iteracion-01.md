# Bitácora de Ejecución - Épica 10 - Iteración 01

**Fecha de ejecución:** 27-10-2026 (corridas de PageSpeed entre las 22:25 y las 22:42, hora de Chile; `analysisUTCTimestamp`
de 01:24 a 01:42 UTC del 28-10-2026)
**Agente:** Claude Code
**Objetivo:** Registrar la línea base de rendimiento con el método de D-03 en las 5 páginas de D-04 y diagnosticar sus
causas, sin cambiar código.
**Estado:** ✅ Completada con éxito (solo lectura; sin cambios de código ni de `public/`).

Rótulos: **[medido]** = cifra tomada de un JSON de la API de PageSpeed Insights o de una medición local (build, `public/`);
**[código]** = leído del HTML compilado en `_site/` o de las fuentes. Los JSON están en `pagespeed/` y se citan por su
nombre sin el prefijo `it01-produccion-` cuando el contexto es claro (por ejemplo, `inicio-movil-c3`).

## 1. Resumen ejecutivo

* 30 de 30 corridas válidas (Lighthouse 13.5.0), guardadas tal cual en `pagespeed/`; 17.875.950 B en total [medido].
* Performance, mediana de 3 corridas [medido]: móvil, Inicio 68, Servicios 86, Suscripción Floral 72, Galería 80 y
  Contacto 86. Escritorio: 92, 97, 93, 98 y 99. Cumplen D-01 en móvil Servicios y Contacto; en escritorio, Servicios,
  Galería y Contacto.
* El CLS cumple D-01 (≤ 0,1) en las 10 combinaciones. La brecha está en Performance (Inicio, Suscripción Floral y
  Galería en móvil; Inicio y Suscripción Floral en escritorio), en Accesibilidad del Inicio (91) y de Servicios (98) y en
  Best Practices de la Galería (96, por un error de consola de `nmg2.mp4`).
* Hipótesis: la doble descarga del logotipo queda **confirmada** (30 de 30 corridas). DT-27 queda **confirmada** con
  matices. Las fotos 2 a 4 del carrusel del Inicio se **confirman** en escritorio y quedan **no concluyentes** en móvil.
  DT-35 queda **no concluyente**: el desplazamiento aparece en 1 de 3 corridas y la API no informa su causa.
* Mayores ahorros: videos de la Galería (26 a 29 MB transferidos), compresión de imágenes (hasta 4.264 KiB en el Inicio
  de escritorio), hoja de Google Fonts y CSS bloqueantes (1.450 a 2.350 ms de FCP estimado en móvil) y logotipos
  (537 KB en cada página).

## 2. Línea base (estado previo y defecto reproducido, si aplica)

### 2.1 Tarea 0: estado inicial [medido]

| Comprobación | Resultado |
|:-------------|:----------|
| `git status` | Rama `feat/rendimiento-calidad`, «nothing to commit, working tree clean». |
| `git log -3 --oneline` | `d744106` (decisiones D-01 a D-05), `def7edb` (definición de la épica), `0a59e02`. `def7edb` está en la historia (`git merge-base --is-ancestor`). |
| `pnpm run build:cf` | Código 0, «6 page(s) built», 114 archivos en `_site/`. `_site/` sigue ignorada (`.gitignore:29`). |
| Script del tema (ADR-003) | 1 `<script>` sin `src` por página; elemento completo de 717 caracteres y SHA-256 `5b490c26…` en las 6 páginas (método de la Épica 08). |
| Invariantes en `_site/*.html` | 0 `style="`, 0 `onclick`, 0 `<style`, 0 `href="#"` y sin IDs duplicados en las 6 páginas. |

### 2.2 Tarea 1: inventario estático [código] [medido]

**Recursos comunes de las 6 páginas** [código]:

* CSS propio bloqueante: `/_astro/BaseLayout.CkTHFWtT.css`, 46.947 B en disco [medido] (10.718 B transferidos con
  compresión, `inicio-movil-c1`, `render-blocking-insight`).
* Hoja de Google Fonts bloqueante: `fonts.googleapis.com/css2`, Montserrat 8 estilos (300, 400, 500, 600 y 700 normales;
  400, 600 y 700 cursivas) y Noto Serif 4 (400 y 600, normal y cursiva), `display=swap`, con `preconnect` a ambos
  orígenes y sin `preload`. Las corridas solo descargan los `.woff2` que se usan: 5 en el Inicio, 4 en Suscripción
  Floral y 3 en Servicios, Galería y Contacto [medido, `network-requests` de las corridas c1].
* JavaScript: un solo paquete, `/_astro/BaseLayout.astro_astro_type_script_index_0_lang.BfOJ5z3t.js`, de 30.526 B
  [medido], con `type="module"` (no bloquea). Transferido: 11.269 B (`inicio-movil-c1`).
* Logotipos: `la-jardinera-original.png` (306.435 B) y `la-jardinera-blanco.png` (229.345 B), ambos de 3446×3504 px,
  declarados `width="44" height="44"` (misma proporción), sin `loading` ni `fetchpriority`, en el header. El original
  también es el favicon.
* Terceros que inyecta Cloudflare: `beacon.min.js` (Web Analytics) y `email-decode.min.js` (protección de correos). No
  están en el código fuente [medido, `network-requests`].

**Imágenes y videos por página** [código; bytes y dimensiones medidos en `public/`]. «Sobre el pliegue» se deduce de
la posición en el marcado y de las clases; la carga real sale de la §2.3.

| Página | Recurso | Bytes | Real | Declarado | Proporción | Carga | ¿Pliegue 360×740 / 1280×800? |
|:-------|:--------|------:|:-----|:----------|:-----------|:------|:-----------------------------|
| Inicio | `hero-01-mobile.webp` (`<source>` vertical) | 190.564 | 1536×2752 | 1536×2752 | OK | hereda `fetchpriority="high"` | Sí / — |
| Inicio | `hero-01-desktop.webp` | 159.090 | 2752×1536 | 2752×1536 | OK | `fetchpriority="high"` | — / Sí |
| Inicio | `hero-02` a `hero-04` móvil | 84.726 / 189.450 / 78.314 | 864×1536, 1536×2752, 864×1536 | igual | OK | `<img>` con `loading="lazy"` | Apiladas bajo `hero-01` |
| Inicio | `hero-02` a `hero-04` escritorio | 244.562 / 248.724 / 237.402 | 2752×1536 | igual | OK | `loading="lazy"` | Apiladas bajo `hero-01` |
| Inicio | `servicio-novias`, `servicio-magu` | 1.051.730 / 1.025.868 | 928×1152 | sin `width`/`height` | — | `lazy` | No |
| Inicio | `galeria-2.webp` | 1.342.888 | 928×1152 | sin `width`/`height` | — | `lazy` | No |
| Inicio | `servicio-eventos`, `servicio-suscripcion`, `suscripcion-taller`, `galeria-1`, `galeria-3`, `galeria-4` | 113.824 a 171.568 | 928×1152 o 1248×848 | sin `width`/`height` | — | `lazy` | No |
| Inicio | `icons/google.svg` | 2.428 | — | — | — | `lazy` | No |
| Servicios | `servicios/suscripcion.webp` (1.ª tarjeta, L165 de `_site/servicios.html`) | 129.202 | 2048×2048 | 400×500 | **No coincide** | `lazy` | Sí / Sí (es el LCP, §2.4) |
| Servicios | 7 tarjetas más (`gift-cards` a `condolencias`) | 44.950 a 399.368 | 2048×2048 (`gift-cards` 1024×1024) | 400×500 | **No coincide** | `lazy` | No |
| Suscripción Floral | `suscripcion/hero-1.webp` | 151.330 | 2752×1536 | 720×1280 | **No coincide** | `fetchpriority="high"` | Sí / Sí |
| Suscripción Floral | `hero-2`, `hero-3`, `hero-4` | 306.074 / 150.522 / 234.114 | 2752×1536 | 720×1280 y 1440×1621 | **No coincide** | `lazy`, `opacity-0` apiladas | Misma posición que `hero-1` |
| Suscripción Floral | `mapa.webp` | 142.400 | 1069×1072 | 1069×1072 | OK | `lazy` | No |
| Suscripción Floral | `plan-esencial`, `plan-premiere`, `plan-luxe` | 269.246 / 210.096 / 196.802 | 2400×1792 | 720×1280 y 1440×1621 | **No coincide** | `lazy` | No |
| Galería | 24 imágenes (`sf1` a `nmg7`) | 54.528 a 521.198 | 720×1278 a 1440×1920 | sin `width`/`height` | — | `lazy` | `sf1`, `sf2`: probable en móvil |
| Contacto | Solo los logotipos | — | — | — | — | — | — |

**Videos de la Galería** [código]: 10 `<video>` con `autoplay` y `loop`, **sin `preload` ni `poster`**: `sf3` 642.026 B,
`sf6` 224.066, `sfv` 2.547.199, `gcf2` 2.812.644, `ddm2` 4.928.653, `rdn7` 3.743.597, `nmg2` 22.715.000, `nmg3` 257.752,
`nmg4` 2.797.239 y `nmg5` 8.098.647 (total 48.766.823 B) [medido].

**Archivos de `public/` sin referencia** en `_site/*.html`, `_site/_astro/` ni `src/` [código, búsqueda de texto]:
`icons/facebook.svg` (773 B), `icons/instagram.svg` (2.247), `icons/whatsapp.svg` (1.760),
`images/servicio-arreglo.webp` (454.612), `images/servicio-plantas.webp` (152.300) e `images/suscripcion/mapa.svg`
(248.908). Las 28 fotos de `images/servicios/galeria/` las usa la modal (`src/js/data/services.js`); `og/og-default.jpg`
la usa `SeoHead.astro` y `icons/gmail.svg` la usa `contacto.astro`. Solo se listan; no se tocó nada.

### 2.3 Tarea 2: PageSpeed Insights en producción [medido]

**Método:** API v5, `strategy` `mobile` y `desktop`, las 4 categorías, 3 corridas por combinación (30 en total),
secuenciales, con 20 s de pausa entre corridas, en el orden c1 de las 10 combinaciones, luego c2 y luego c3. La primera
petición sin clave respondió **HTTP 429** (27-10-2026, 22:02:16); se detuvo y el desarrollador definió `PSI_API_KEY` en
su entorno. Con clave, las 30 respondieron HTTP 200 al primer intento. Cada JSON se validó: JSON válido, sin
`lighthouseResult.runtimeError` y con `finalDisplayedUrl` igual a la URL pedida, sin redirección a `www` (30 de 30). El
Inicio informa `https://lajardinerafloreria.cl/`, con la barra final que agrega el servidor. Versión:
`lighthouseVersion` **13.5.0** en las 30.

**Datos de campo (CrUX):** ninguna respuesta trae métricas de campo. `loadingExperience` solo contiene `initial_url`, y no
hay `originLoadingExperience` con datos (30 de 30) [medido]. Sin datos reales que registrar.

**Medianas** (FCP, LCP y Speed Index en s; TBT en ms; peso en KiB, de `total-byte-weight`):

| Página | Disp. | Perf | Acces | BP | SEO | FCP | LCP | TBT | CLS | SI | Peso |
|:-------|:------|-----:|------:|---:|----:|----:|----:|----:|----:|---:|-----:|
| Inicio | móvil | 68 | 91 | 100 | 100 | 3,61 | 6,04 | 0 | 0 | 4,91 | 3.626 |
| Inicio | escritorio | 92 | 91 | 100 | 100 | 0,85 | 1,73 | 0 | 0,003 | 1,05 | 5.825 |
| Servicios | móvil | 86 | 98 | 100 | 100 | 2,86 | 3,16 | 0 | 0 | 4,61 | 1.484 |
| Servicios | escritorio | 97 | 98 | 100 | 100 | 0,73 | 1,20 | 0 | 0,003 | 0,76 | 2.086 |
| Suscripción Floral | móvil | 72 | 100 | 100 | 100 | 3,05 | 5,20 | 0 | 0 | 4,93 | 2.358 |
| Suscripción Floral | escritorio | 93 | 100 | 100 | 100 | 0,78 | 1,68 | 0 | 0,005 | 0,80 | 2.358 |
| Galería | móvil | 80 | 100 | 96 | 100 | 2,86 | 4,08 | 0 | 0 | 4,42 | 31.982 |
| Galería | escritorio | 98 | 100 | 96 | 100 | 0,76 | 0,99 | 0 | 0,002 | 0,76 | 29.287 |
| Contacto | móvil | 86 | 100 | 100 | 100 | 2,89 | 3,19 | 0 | 0,048 | 3,04 | 691 |
| Contacto | escritorio | 99 | 100 | 100 | 100 | 0,76 | 0,85 | 0 | 0,003 | 0,76 | 691 |

**Detalle por corrida** (`it01-produccion-<página>-<disp>-cN.json`; mismas unidades):

| JSON | Perf | Acces | BP | SEO | FCP | LCP | TBT | CLS | SI | Peso |
|:-----|-----:|------:|---:|----:|----:|----:|----:|----:|---:|-----:|
| `inicio-movil-c1` | 67 | 91 | 100 | 100 | 3,61 | 6,04 | 0 | 0 | 5,56 | 3.626 |
| `inicio-movil-c2` | 73 | 91 | 100 | 100 | 3,61 | 4,66 | 0 | 0 | 4,91 | 3.626 |
| `inicio-movil-c3` | 68 | 91 | 100 | 100 | 3,19 | 7,80 | 0 | 0,074 | 3,19 | 3.626 |
| `inicio-escritorio-c1` | 92 | 91 | 100 | 100 | 0,85 | 1,73 | 0 | 0,003 | 1,05 | 5.825 |
| `inicio-escritorio-c2` | 92 | 91 | 100 | 100 | 0,85 | 1,73 | 0 | 0,003 | 1,23 | 5.825 |
| `inicio-escritorio-c3` | 97 | 91 | 100 | 100 | 0,85 | 1,12 | 0 | 0,003 | 0,87 | 5.825 |
| `servicios-movil-c1` | 78 | 98 | 100 | 100 | 2,86 | 4,19 | 0 | 0 | 4,79 | 1.484 |
| `servicios-movil-c2` | 86 | 98 | 100 | 100 | 2,86 | 3,16 | 0 | 0 | 4,61 | 1.484 |
| `servicios-movil-c3` | 86 | 98 | 100 | 100 | 2,86 | 3,16 | 0 | 0 | 4,52 | 1.484 |
| `servicios-escritorio-c1` | 97 | 98 | 100 | 100 | 0,76 | 1,20 | 0 | 0,003 | 0,76 | 2.086 |
| `servicios-escritorio-c2` | 99 | 98 | 100 | 100 | 0,73 | 0,88 | 0 | 0,003 | 0,86 | 2.086 |
| `servicios-escritorio-c3` | 97 | 98 | 100 | 100 | 0,72 | 1,23 | 0 | 0,003 | 0,72 | 2.055 |
| `suscripcion-floral-movil-c1` | 72 | 100 | 100 | 100 | 3,02 | 5,18 | 0 | 0 | 4,93 | 2.358 |
| `suscripcion-floral-movil-c2` | 69 | 100 | 100 | 100 | 3,05 | 8,64 | 0 | 0,006 | 3,05 | 2.358 |
| `suscripcion-floral-movil-c3` | 72 | 100 | 100 | 100 | 3,05 | 5,20 | 0 | 0 | 4,99 | 2.358 |
| `suscripcion-floral-escritorio-c1` | 92 | 100 | 100 | 100 | 0,80 | 1,73 | 0 | 0,005 | 0,80 | 2.358 |
| `suscripcion-floral-escritorio-c2` | 95 | 100 | 100 | 100 | 0,77 | 1,39 | 0 | 0,005 | 0,89 | 2.358 |
| `suscripcion-floral-escritorio-c3` | 93 | 100 | 100 | 100 | 0,78 | 1,68 | 0 | 0,005 | 0,78 | 2.358 |
| `galeria-movil-c1` | 86 | 100 | 96 | 100 | 2,86 | 3,16 | 0 | 0 | 4,55 | 32.232 |
| `galeria-movil-c2` | 80 | 100 | 96 | 100 | 2,86 | 4,08 | 0 | 0 | 4,42 | 31.982 |
| `galeria-movil-c3` | 76 | 100 | 96 | 100 | 2,86 | 5,15 | 0 | 0,020 | 3,04 | 29.287 |
| `galeria-escritorio-c1` | 98 | 100 | 96 | 100 | 0,73 | 0,99 | 0 | 0,002 | 0,80 | 29.442 |
| `galeria-escritorio-c2` | 98 | 100 | 96 | 100 | 0,76 | 0,97 | 0 | 0,002 | 0,76 | 29.287 |
| `galeria-escritorio-c3` | 97 | 100 | 96 | 100 | 0,76 | 1,23 | 0 | 0,002 | 0,76 | 29.287 |
| `contacto-movil-c1` | 88 | 100 | 100 | 100 | 2,86 | 3,16 | 0 | 0,048 | 3,04 | 691 |
| `contacto-movil-c2` | 82 | 100 | 100 | 100 | 2,89 | 4,00 | 0 | 0,048 | 2,89 | 691 |
| `contacto-movil-c3` | 86 | 100 | 100 | 100 | 2,89 | 3,19 | 0 | 0 | 4,45 | 691 |
| `contacto-escritorio-c1` | 99 | 100 | 100 | 100 | 0,76 | 0,85 | 0 | 0,003 | 0,76 | 691 |
| `contacto-escritorio-c2` | 99 | 100 | 100 | 100 | 0,76 | 0,89 | 0 | 0,003 | 0,76 | 691 |
| `contacto-escritorio-c3` | 98 | 100 | 100 | 100 | 0,73 | 0,77 | 83 | 0,003 | 1,01 | 691 |

### 2.4 Elemento LCP y su desglose [medido, `lcp-breakdown-insight`]

Desglose en ms: TTFB / retraso de carga / duración de carga / retraso de renderizado. Las páginas cuyo LCP es texto no
tienen fases de carga.

| Página | Disp. | Elemento LCP | c1 | c2 | c3 |
|:-------|:------|:-------------|:---|:---|:---|
| Inicio | móvil | `section#titular > picture.hero-slide > img` (`hero-01-mobile.webp`) | 2 / 269 / 115 / 2.062 | 2 / 257 / 114 / 2.047 | 1 / 127 / 97 / 442 |
| Inicio | escritorio | mismo `img` (`hero-01-desktop.webp`) | 2 / 221 / 271 / 426 | 3 / 158 / 235 / 892 | 3 / 100 / 196 / 420 |
| Servicios | móvil | `article.group img` (`servicios/suscripcion.webp`, `loading="lazy"`) | 2 / 1.367 / 133 / 964 | 2 / 1.362 / 278 / 870 | 3 / 1.319 / 82 / 1.032 |
| Servicios | escritorio | `servicios/suscripcion.webp` (c1, c2); `servicios/novias.webp` (c3) | 2 / 340 / 75 / 547 | 1 / 520 / 72 / 333 | 2 / 235 / 102 / 419 |
| Suscripción Floral | móvil | `#banner-carousel > img` (`hero-1.webp`) | 3 / 254 / 244 / 1.914 | 3 / 131 / 224 / 279 | 2 / 292 / 320 / 1.850 |
| Suscripción Floral | escritorio | mismo `img` (`hero-1.webp`) | 2 / 168 / 94 / 256 | 2 / 119 / 335 / 470 | 2 / 287 / 86 / 289 |
| Galería | móvil | texto: `section > div.max-w-[80rem] > p.font-body-md` | 2 / — / — / 2.391 | 3 / — / — / 2.312 | 4 / — / — / 1.326 |
| Galería | escritorio | mismo párrafo | 2 / — / — / 727 | 3 / — / — / 555 | 2 / — / — / 600 |
| Contacto | móvil | texto: `div.flex > p.font-body-md` | 1 / — / — / 1.337 | 2 / — / — / 267 | 2 / — / — / 2.330 |
| Contacto | escritorio | mismo párrafo | 2 / — / — / 552 | 1 / — / — / 462 | 2 / — / — / 1.093 |

Lectura: en móvil domina el **retraso de renderizado** (Inicio y Suscripción Floral, unos 1,9 a 2,1 s en 2 de 3
corridas), que coincide con el bloqueo de CSS y fuentes de la §2.6. En Servicios móvil domina el **retraso de carga**
(1,32 a 1,37 s): `lcp-discovery-insight` falla en las 6 corridas de Servicios porque la imagen LCP lleva
`loading="lazy"`, no tiene `fetchpriority="high"` y la petición no se descubre en el documento inicial
(`servicios-movil-c1`, checklist con `eagerlyLoaded`, `priorityHinted` y `requestDiscoverable` en `false`).
Nota: el desglose y los tiempos de red son de la carga observada; los puntajes y métricas de Lighthouse son simulados
(4G lenta en móvil), así que las cifras en ms de ambas fuentes no se suman.

### 2.5 Desplazamientos de diseño (CLS) [medido, `layout-shifts` y `cls-culprits-insight`]

| Página | Disp. | Elemento | Valor | Corridas |
|:-------|:------|:---------|------:|:---------|
| Inicio | móvil | `section#titular > div.relative` (bloque de texto del hero, «Florería La Jardinera…») | 0,0738 | c3 (0 en c1 y c2) |
| Inicio | escritorio | `h1.font-display-hero > span.fx-starlight > span.fx-starlight` | 0,0029 | c1, c2 y c3 |
| Servicios | escritorio | `section > div.flex > h1.font-headline-xl` | 0,0027 | c1, c2 y c3 |
| Suscripción Floral | móvil | `section.h-[80vh] > div.relative > p.font-body-md` | 0,0057 | c2 |
| Suscripción Floral | escritorio | mismo `p.font-body-md` | 0,0050 | c1, c2 y c3 |
| Galería | móvil | `main > section#suscripcion-floral` | 0,0198 | c3 |
| Galería | escritorio | `h1.font-headline-xl > span.italic` | 0,0017 | c1, c2 y c3 |
| Contacto | móvil | `main > div.max-w-[80rem] > div.grid` (tarjetas de WhatsApp y correo) | 0,0483 | c1 y c2 |
| Contacto | escritorio | `h2#form-title` | 0,0033 | c1, c2 y c3 |
| Servicios | móvil | — | 0 | ninguna |

En ningún caso la API informa la causa: `subItems` viene vacío en todas las corridas, sin «fuente web» ni «medio sin
dimensiones». Los desplazamientos pequeños de escritorio afectan a títulos y párrafos, lo que es compatible con un cambio
de fuente (`display=swap`), pero eso es una **hipótesis**: no está medido.

### 2.6 Recursos que bloquean el renderizado [medido, `render-blocking-insight`, corridas c1]

| Página | Disp. | Google Fonts (ms / B) | CSS propio (ms / B) | Ahorro estimado (FCP) |
|:-------|:------|:----------------------|:--------------------|:----------------------|
| Inicio | móvil | 751 / 2.316 | 179 / 10.718 | 2.050 ms (c1 y c2), 2.300 ms (c3) |
| Inicio | escritorio | 201 / 2.316 | 68 / 10.718 | 500 a 550 ms |
| Servicios | móvil | 751 / 2.316 | 153 / 10.718 | 1.450 ms |
| Servicios | escritorio | 201 / 2.316 | sin dato / 10.718 | 450 a 500 ms |
| Suscripción Floral | móvil | 752 / 2.316 | 176 / 10.705 | 1.650 ms (c1, c3), 2.350 ms (c2) |
| Suscripción Floral | escritorio | 201 / 2.316 | sin dato / 10.718 | 500 ms |
| Galería | móvil | 751 / 2.316 | 153 / 10.705 | 1.400 a 1.450 ms (también LCP) |
| Galería | escritorio | 201 / 2.316 | 52 / 10.718 | 450 a 500 ms (también LCP) |
| Contacto | móvil | 752 / 2.316 | 301 / 10.718 | 1.450 a 1.950 ms (también LCP) |
| Contacto | escritorio | 201 / 2.316 | 61 / 10.712 | 450 a 500 ms (también LCP) |

Los valores de ahorro de FCP salen de `metricSavings` de las 30 corridas. Las columnas en ms son de las corridas c1.

### 2.7 Auditorías fallidas de Accesibilidad, Best Practices y SEO [medido, 30 corridas]

| Página | Accesibilidad | Best Practices | SEO |
|:-------|:--------------|:---------------|:----|
| Inicio | `aria-prohibited-attr`, `heading-order`, `link-name` (6 de 6) | — | — |
| Servicios | `heading-order` (6 de 6) | — | — |
| Suscripción Floral | — | — | — |
| Galería | — | `errors-in-console` (6 de 6): «Failed to load resource: net::ERR_CONNECTION_FAILED» en `/images/galeria/nmg2.mp4` (`galeria-movil-c1`) | — |
| Contacto | — | — | — |

SEO da 100 en las 30 corridas; la línea base de la Épica 08 tenía 92 en el Inicio.

### 2.8 Distancia a las metas de D-01 (medianas) [medido]

Brecha = mediana − meta; «✔» = cumple. CLS: meta ≤ 0,1.

| Página | Disp. | Perf (meta) | Brecha | Acces | Brecha | BP | Brecha | SEO | CLS |
|:-------|:------|:------------|-------:|------:|-------:|---:|-------:|----:|:----|
| Inicio | móvil | 68 (≥ 85) | −17 | 91 | −9 | 100 | ✔ | 100 ✔ | 0 ✔ |
| Inicio | escritorio | 92 (≥ 95) | −3 | 91 | −9 | 100 | ✔ | 100 ✔ | 0,003 ✔ |
| Servicios | móvil | 86 (≥ 85) | ✔ (+1) | 98 | −2 | 100 | ✔ | 100 ✔ | 0 ✔ |
| Servicios | escritorio | 97 (≥ 95) | ✔ (+2) | 98 | −2 | 100 | ✔ | 100 ✔ | 0,003 ✔ |
| Suscripción Floral | móvil | 72 (≥ 85) | −13 | 100 | ✔ | 100 | ✔ | 100 ✔ | 0 ✔ |
| Suscripción Floral | escritorio | 93 (≥ 95) | −2 | 100 | ✔ | 100 | ✔ | 100 ✔ | 0,005 ✔ |
| Galería | móvil | 80 (≥ 85) | −5 | 100 | ✔ | 96 | −4 | 100 ✔ | 0 ✔ |
| Galería | escritorio | 98 (≥ 95) | ✔ (+3) | 100 | ✔ | 96 | −4 | 100 ✔ | 0,002 ✔ |
| Contacto | móvil | 86 (≥ 85) | ✔ (+1) | 100 | ✔ | 100 | ✔ | 100 ✔ | 0,048 ✔ |
| Contacto | escritorio | 99 (≥ 95) | ✔ (+4) | 100 | ✔ | 100 | ✔ | 100 ✔ | 0,003 ✔ |

Servicios y Contacto en móvil cumplen por 1 punto, con corridas de 78 y 82 (`servicios-movil-c1`,
`contacto-movil-c2`): el margen es menor que la variación entre corridas.

### 2.9 Tarea 3: hipótesis heredadas [medido, `network-requests`]

Tiempos en ms desde el inicio de la carga observada (petición–fin), prioridad de Chrome y bytes transferidos.

**H1 · Doble descarga del logotipo (definición §2.2): CONFIRMADA.** En las 30 corridas se piden ambos PNG:
`la-jardinera-original.png` transfiere 307.199 a 307.208 B y `la-jardinera-blanco.png` 230.107 a 230.120 B
(537.306 a 537.328 B por página, por ejemplo `contacto-movil-c1`). El original sale con prioridad High en 15 de 30
corridas y Low en las otras 15; el blanco, que está oculto en tema claro, sale con Low en las 30. Además,
`image-delivery-insight` estima 306.287 a 306.387 B de ahorro solo en el original, en todas las páginas.

**H2 · DT-27 (Suscripción Floral): CONFIRMADA, con matices.**
* `hero-1.webp` (LCP) sale primero y con High en las 6 corridas (por ejemplo, 258–501 ms en `suscripcion-floral-movil-c1`).
* El logotipo original sale con High en 5 de 6 corridas y **a la vez que `hero-1`** (261–578 ms en `movil-c1`;
  300–616 ms en `movil-c3`): compite por el ancho de banda con el LCP.
* `hero-2` a `hero-4` (690.710 B en disco): en escritorio salen con **High en las 3 corridas**, antes de que termine el
  LCP (355–509 ms en `escritorio-c1`, con un LCP de 1,73 s). En móvil salen con **Low después de la carga** en c1 y c3
  (1.389 a 1.754 ms) y con **High a los 248 ms** en c2. Esa corrida (`suscripcion-floral-movil-c2`) tiene el peor LCP:
  8,64 s frente a 5,18 y 5,20 s.
* El componente mayor del LCP móvil es el retraso de renderizado (1.914 y 1.850 ms en c1 y c3, §2.4), no la descarga.
  DT-27 explica parte de la brecha; el bloqueo de CSS y fuentes explica otra parte.

**H3 · Fotos 2 a 4 del carrusel del Inicio.**
* **Escritorio: CONFIRMADA (se descargan antes del LCP).** `hero-02` a `hero-04-desktop` (730.688 B en disco) salen a los
  549 a 569 ms, con High en 7 de 9 descargas, antes del LCP (1,12 a 1,73 s). Arrancan cuando `hero-01-desktop` ya
  terminó (495, 396 y 298 ms), así que no compiten con su descarga, pero sí con el renderizado y con el resto de la
  página (`inicio-escritorio-c1` a `c3`).
* **Móvil: NO CONCLUYENTE.** En c1 y c2 salen con Low a los 1.388 a 1.393 ms, después de la carga, y no compiten. En c3
  salen con High a los 296 ms, junto al LCP (`inicio-movil-c3`). El patrón cambia de una corrida a otra; con 3 corridas
  no se puede aislar.

**H4 · DT-35 (CLS móvil del Inicio): NO CONCLUYENTE.**
* Aparece en **1 de 3 corridas** (`inicio-movil-c3`): 0,0738 en `section#titular > div.relative`, el bloque de texto
  del hero. Es el mismo valor que informó la Épica 09 (0,074).
* La API no da causa (`subItems` vacío). En esa misma corrida las 5 fuentes terminaron entre los 193 y 287 ms y las fotos
  2 a 4 se pidieron con High a los 296 ms. En c1 y c2, sin desplazamiento, las fuentes terminaron entre los 470 y 542 ms
  y las fotos se pidieron después de la carga. La coincidencia con las fotos tempranas existe, pero 1 sola corrida no
  basta para atribuirla.
* **Qué faltaría:** una traza de rendimiento con las *layout shift sources* (Chrome *headless* con perfil aislado, solo
  inventario, según D-03), o comparar en la vista previa una variante con las fuentes de la Iteración 03 o con la carga
  de las fotos 2 a 4 de la Iteración 02. Las dos cosas exigen otra iteración.
* La mediana del CLS móvil del Inicio es 0 y el máximo, 0,074: cumple D-01 (≤ 0,1) en las 3 corridas.

## 3. Cambios realizados (por archivo)

Ningún cambio de código ni de `public/`. Archivos creados:

* `_planificacion/04-bitacora/bitacora-epica-10/bitacora-iteracion-01.md` (esta bitácora; CRLF, sin BOM).
* `_planificacion/04-bitacora/bitacora-epica-10/pagespeed/` con 30 JSON `it01-produccion-*.json`, tal como los entregó la
  API: **30 archivos, 17.875.950 B** en total [medido, `du -cb`].
* Una línea al final de `_planificacion/04-bitacora/estado-actual.md`.

**Clave de API:** la búsqueda del valor de `PSI_API_KEY` en los 30 JSON da 0 coincidencias, y la búsqueda de
`AIza…` o `key=` da 0 [medido]. La clave no aparece en esta bitácora.

### 3.1 Tarea 4: diagnóstico priorizado

| # | Problema | Página | Ahorro estimado (fuente) | Iteración |
|--:|:---------|:-------|:-------------------------|:---------:|
| 1 | 10 videos con `autoplay` sin `preload` ni `poster` | Galería | 26.058.895 a 29.074.819 B de `Media` transferidos en la carga (`network-requests`, `galeria-*-c1` a `c3`); peso total de 29.287 a 32.232 KiB | 04 |
| 2 | Compresión y tamaño de imágenes | Inicio | 4.264 KiB en escritorio y 2.425 KiB en móvil (c1, c2); LCP estimado de 50 a 2.250 ms (`image-delivery-insight`). Mayores: `galeria-2` 1.294.288 B, `servicio-novias` 1.035.750 B y `servicio-magu` 1.009.888 B (`inicio-escritorio-c1`) | 02 |
| 3 | Hoja de Google Fonts y CSS bloqueantes; retraso de renderizado del LCP | Las 5 | FCP de 1.400 a 2.350 ms en móvil y de 450 a 550 ms en escritorio (`render-blocking-insight`); retraso de renderizado de 1,9 a 2,1 s en Inicio y Suscripción Floral móvil (`lcp-breakdown-insight`) | 03 |
| 4 | Compresión y tamaño de imágenes | Galería | 3.096 a 3.205 KiB (`image-delivery-insight`): `ddm4` 508.391 B, `ddm1` 375.643 B, `ddm3` 324.772 B y `ddm5` 308.526 B (`galeria-movil-c1`) | 02 |
| 5 | Imágenes de 2048×2048 mostradas en tarjetas de 400×500, con proporción declarada distinta | Servicios | 1.632 KiB en escritorio y 1.027 KiB en móvil (`image-delivery-insight`); `matrimonios` 373.936 a 385.386 B | 02 |
| 6 | Hero y planes de 2752×1536 y 2400×1792 sin variante móvil; `hero-2` a `hero-4` antes del LCP | Suscripción Floral | 1.481 a 1.612 KiB (`image-delivery-insight`); LCP estimado de 600 a 3.450 ms (`suscripcion-floral-*`) | 05 (hero) y 02 (planes) |
| 7 | Doble logotipo PNG de 3446×3504 px | Las 5 | 537.306 a 537.328 B por página (`network-requests`); 306.387 B en `image-delivery-insight` | 02 |
| 8 | Imagen LCP de Servicios con `loading="lazy"` y sin `fetchpriority` | Servicios | Retraso de carga del LCP de 1.319 a 1.367 ms en móvil (`lcp-breakdown-insight`, `lcp-discovery-insight` fallido en 6 de 6) | 02 (propuesta; ver §5) |
| 9 | Fotos 2 a 4 del carrusel descargadas antes del LCP en escritorio | Inicio | 730.688 B en disco, antes del LCP (`inicio-escritorio-c1` a `c3`) | 02 |
| 10 | `nmg2.mp4`: `ERR_CONNECTION_FAILED` en consola | Galería | Best Practices 96 → 100 (`errors-in-console`, 6 de 6) | 04 |
| 11 | `aria-prohibited-attr`, `link-name` y `heading-order` | Inicio y Servicios | Accesibilidad 91 y 98 → 100 | 06 |
| 12 | Desplazamiento de las tarjetas de contacto (0,048 en 2 de 3 corridas móviles) | Contacto | CLS 0,048 (bajo la meta; `contacto-movil-c1` y `c2`) | Hallazgo (sin iteración) |
| 13 | Caché corta de `beacon.min.js` y `email-decode.min.js` de Cloudflare | Las 5 | 5 KiB (`cache-insight`) | Hallazgo (terceros; fuera del código) |

### 3.2 Ajustes sugeridos a las Iteraciones 02 a 06 (propuesta para el desarrollador; no se editó ningún documento)

* **Iteración 02 (imágenes):**
  1. Recomprimir primero, por ahorro medido, `galeria-2`, `servicio-novias` y `servicio-magu` (Inicio); `ddm4`, `ddm1`,
     `ddm3` y `ddm5` (Galería); `matrimonios`, `novios-rio` y `condolencias` (Servicios); y `plan-esencial`,
     `plan-premiere` y `plan-luxe` (Suscripción Floral).
  2. Agregar al alcance las 8 tarjetas de Servicios (2048×2048 declaradas 400×500) y los 3 planes de Suscripción Floral
     (2400×1792 declarados 720×1280 o 1440×1621). La proporción declarada no coincide con la real; DT-23 no las incluye.
  3. Agregar la imagen LCP de Servicios (`servicios/suscripcion.webp`): sin `loading="lazy"` y con
     `fetchpriority="high"`. Es el mayor retraso de carga del LCP medido.
  4. Logotipo (DT-22): con H1 confirmada, conviene una sola petición por tema y un archivo del tamaño de uso.
  5. Fotos 2 a 4 del carrusel: el problema medido es de escritorio (730.688 B antes del LCP); en móvil, no concluyente.
  6. `unsized-images` aprueba en las 30 corridas: DT-23 sigue siendo deuda por `AGENTS.md` §5, regla 9, pero no resta
     puntaje.
* **Iteración 03 (fuentes y CSS):** el retraso de renderizado domina el LCP móvil del Inicio y de Suscripción Floral. La
  hoja de Google Fonts sola cuesta unos 750 ms en móvil en todas las páginas. **No está confirmado que el CLS sea por
  fuentes** (DT-35, no concluyente): sugiero medir el CLS del Inicio móvil después de la It. 03 sin darlo por resuelto de
  antemano. Las páginas descargan solo 3 a 5 de los 12 estilos pedidos; reducir la hoja tiene poco efecto en bytes, el
  efecto está en el bloqueo.
* **Iteración 04 (Galería):** agregar `nmg2.mp4` (22.715.000 B) como prioridad. Su error de conexión baja Best Practices
  a 96 en las 6 corridas. Con carga diferida, se espera que Best Practices vuelva a 100 (por verificar).
* **Iteración 05 (Suscripción Floral):** hero con variante móvil y proporción correcta; impedir que `hero-2` a `hero-4`
  salgan con High antes del LCP (3 de 3 en escritorio). Recordar que el retraso de renderizado (It. 03) pesa más que la
  descarga en móvil: la meta móvil ≥ 85 puede no alcanzarse solo con la It. 05.
* **Iteración 06 (accesibilidad):** confirma con datos DT-24 (`aria-prohibited-attr` y `link-name` en el Inicio) y
  DT-25 (`heading-order` en Inicio y Servicios); ninguna otra página falla Accesibilidad.
* **Margen de medición:** Servicios y Contacto en móvil cumplen por 1 punto, con corridas de 78 y 82. Sugiero que el
  cierre de la épica mantenga la regla de mediana de 3 y registre el rango.

## 4. Verificación de criterios de aceptación

| Criterio | Estado | Evidencia (código / render real) |
|:---------|:-------|:---------------------------------|
| E1. Línea base: medianas, detalle por corrida y 30 JSON | ✅ | [medido] §2.3; 30 JSON en `pagespeed/` (17.875.950 B), validados. |
| E2. Elemento LCP y desplazamientos identificados por página | ✅ | [medido] §2.4 y §2.5. La causa de cada desplazamiento no la informa la API (explicado en §2.5). |
| E3. Hipótesis DT-27, DT-35, fotos 2 a 4 y logotipo con resultado | ✅ | [medido] §2.9: H1 confirmada, H2 confirmada con matices, H3 confirmada en escritorio y no concluyente en móvil, H4 no concluyente. |
| E4. Tabla de distancia a las metas de D-01 | ✅ | [medido] §2.8. |
| E5. Sin cambios fuera de `bitacora-epica-10/` y `estado-actual.md`; sin clave en archivos | ✅ | [medido] `git status` final (§6) y búsqueda de la clave con 0 coincidencias (§3). |
| Build y script del tema | ✅ | [medido] §2.1: código 0, 6 páginas, 114 archivos, `5b490c26…`, 717 caracteres. |
| Render real en los 7 viewports | N/A | Iteración de solo lectura, sin cambios visuales. |

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

* **Desviación de método:** la pausa entre corridas fue de 20 s (el mínimo es 15 s). La primera petición, sin clave,
  respondió HTTP 429 y no generó JSON; las 30 válidas se hicieron con `PSI_API_KEY`.
* **Hallazgo:** proporción declarada distinta de la real en las 8 imágenes de Servicios y en los 3 planes de Suscripción
  Floral (§2.2). DT-23 y la definición §2.2 solo registran el hero de Suscripción Floral.
* **Hallazgo:** la imagen LCP de Servicios tiene `loading="lazy"` (DT-23 lo sospechaba como hipótesis: ahora está
  medido) y en `servicios-escritorio-c3` el LCP cambia a `servicios/novias.webp`.
* **Hallazgo:** CLS de 0,048 en Contacto móvil (2 de 3) en `div.grid` de las tarjetas de contacto, ya visto en la Épica 08
  (0,048). Cumple la meta; no hay iteración asignada.
* **Hallazgo:** `nmg2.mp4` falla con `ERR_CONNECTION_FAILED` en las 6 corridas de la Galería: Best Practices 96.
* **Hallazgo:** 6 archivos de `public/` sin referencia (§2.2), 860.600 B en total. Solo listados.
* **Hallazgo:** la API no trae datos de campo (CrUX) del sitio ni del origen.

## 6. Archivos modificados y propuestas para archivos protegidos

`git status` final: solo `_planificacion/04-bitacora/estado-actual.md` (modificado) y la carpeta nueva
`_planificacion/04-bitacora/bitacora-epica-10/` (sin seguimiento).

Entran en el commit:

1. `_planificacion/04-bitacora/estado-actual.md`
2. `_planificacion/04-bitacora/bitacora-epica-10/bitacora-iteracion-01.md`
3. `_planificacion/04-bitacora/bitacora-epica-10/pagespeed/it01-produccion-*.json` (30 archivos)

Nada más debe entrar. Sin propuestas para archivos protegidos en esta iteración: los ajustes de la §3.2 afectan
especificaciones de iteración, no archivos protegidos.

## 7. Mensaje de commit sugerido

`Épica 10 - Iteración 01: línea base y diagnóstico de rendimiento.`
