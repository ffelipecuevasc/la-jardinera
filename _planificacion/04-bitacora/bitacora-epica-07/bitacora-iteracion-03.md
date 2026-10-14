# Bitácora de Ejecución - Épica 07 - Iteración 03

**Fecha de ejecución:** 14-10-2026
**Agente:** Claude Code
**Objetivo:** Sanear la deuda técnica que distorsionaría la migración a Astro (DT-01, DT-03, DT-05, DT-07, DT-13 y la 404 en rutas anidadas, DT-14) y certificar en render real el Hallazgo H8 (DT-02), con evidencia por corrección.

## 1. Resumen ejecutivo

- **Cada corrección se aplicó y se verificó por separado**, y las seis resultaron correctas. Ninguna falló ni bloqueó a otra.
- **Compilación:** `pnpm build` sin errores (código de salida 0) y `pnpm run build:cf` genera `_site/` sin errores. 0 `style="`, 0 `onclick` y 0 `href="#"` en navegación y footer en los 6 HTML; balance de etiquetas sin desbalances (el único era el de DT-01).
- **Render real (Chrome 155 headless por CDP, perfil aislado, claro y oscuro):**
    - **DT-01:** la columna 1 del footer de Servicios ya no muestra código como texto; el enlace existe y apunta a `./index.html`.
    - **DT-03:** la textura de ruido se ve idéntica: **0 píxeles de diferencia** frente a `HEAD` en las 16 comparaciones (4 páginas × 2 anchos × 2 temas).
    - **DT-05:** a 360 px los tres botones sociales de la 404 miden 32 × 32 px con `display: flex` (antes `display: none`).
    - **DT-13:** contraste de la "f" del ícono de Facebook en modo oscuro de **1,52:1 a 6,64:1**; en modo claro idéntico a antes (0 píxeles de diferencia).
    - **DT-07:** el texto visible dice "Redbanc, efectivo y transferencias bancarias."
    - **DT-14:** con la simulación local de Cloudflare (404 con estado 404), en `/xyz`, `/a/b/xyz`, `/a/b/c/xyz` y `/servicios/xyz` los 9 recursos únicos y los 10 módulos JS resuelven a la raíz con 200. En `HEAD` los 9 daban 404.
    - **DT-02 (H8):** 120 mediciones (6 páginas × claro y oscuro × 10 anchos de 1024 a 1440 px), **0 incumplimientos**: "Suscripción Floral" siempre en una línea de 40 px, 0 px de solapamiento y sin scroll horizontal. A 1280 px el header es idéntico al previo a la compactación (0 px de diferencia de geometría y 0 píxeles distintos).
- **Cierra la casilla parcial de la Iteración 02:** consola sin mensajes y `pnpm build` sin errores en las 6 páginas, claro y oscuro (24 cargas, §4.9).
- **Estado:** *Completada con reservas.* DT-14 queda **corregida en código y verificada en simulación local, pero 🕒 PENDIENTE de verificación en producción**; la solicitud real del favicon en una pestaña tampoco se pudo observar en headless (§5, N2).

## 2. Línea base (estado previo y defectos reproducidos)

Tarea 0, solo lectura (herramienta de búsqueda del agente y scripts temporales en el scratchpad, fuera del repositorio):

| Elemento | Valor | Método |
|:--|:--|:--|
| Commit de partida | `0756505` (Épica 07 · Iteración 02) | `git rev-parse --short HEAD` |
| `pnpm build` | Sin errores (código de salida 0) | Ejecución real |
| SHA-256 de `dist/css/output.css` antes | `6333fb61480f62e9f892c790d0d1e1fbfdb67230278ebc0ec1cbb41adf58d991` | `sha256sum` |
| Prerrequisito: el Hero ya no tiene `style=` | ✅ Cumplido: `index.html` tiene 1 `style="` y es la textura del banner (línea 798); el Hero usa `<picture>` con `fetchpriority="high"` (líneas 244 a 251) | Búsqueda de texto |
| `style="` por archivo | **4** en total: `index.html:798`, `galeria.html:722`, `suscripcion-floral.html:607`, `servicios.html:587`; `contacto.html` y `404.html`: 0. Coincide con lo esperado | Búsqueda de texto |
| Cadenas base64 del ruido | Las 4 idénticas (312 caracteres, mismo SHA-256 parcial `caa858672b68933d`) | Script temporal |
| Balance de etiquetas (17 etiquetas × 6 archivos, sin comentarios, `<script>` ni `<style>`) | **Un solo desbalance:** `servicios.html`, `<a>` abre 28 y cierra 29 (DT-01). El resto, parejo | Script temporal |
| Orden del `<head>` de `404.html` | `title`, `meta description`, `meta robots`, `link rel=icon` (línea 9), **`meta charset` (línea 10)**, `meta viewport`, preconnect ×2 y 2 hojas de estilo | Lectura |
| "Redbank" | `index.html`, línea 337 (único lugar) | Búsqueda de texto |
| `fill="#edefe9"` | 1 por página, en las 6 | Búsqueda de texto |

Defecto de DT-14 **reproducido con `HEAD`** (mismo servidor simulado): en `/a/b/xyz` y `/servicios/xyz` los 9 recursos únicos resuelven a la subcarpeta (por ejemplo `/a/b/dist/css/output.css`) y responden 404; el `<body>` queda con la tipografía por defecto (`Times New Roman`), sin fondo y con los logotipos en 0 × 0 px. Ver §4.6.

No hubo diferencias frente a lo descrito en la especificación; no fue necesario detenerse.

## 3. Cambios realizados (por archivo)

| Archivo | Cambio |
|:--|:--|
| `servicios.html` | **DT-01:** se restituye la apertura `<a ` del enlace de marca de la columna 1 del footer, con el mismo formato de dos líneas de `contacto.html`. **DT-03:** el `style=` del banner pasa a la clase `bg-noise`. **DT-13:** `fill="#edefe9"` → `class="fill-surface-container"` en el segundo `<path>` del ícono de Facebook. |
| `index.html` | **DT-03** (clase `bg-noise`), **DT-13** y **DT-07** (línea 337, solo la palabra "Redbank" → "Redbanc"). |
| `suscripcion-floral.html`, `galeria.html` | **DT-03** y **DT-13**. |
| `contacto.html` | **DT-13**. |
| `404.html` | **DT-05:** las 3 clases `hidden lg:flex ... items-center` → clase idéntica a la de `contacto.html` (`w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-all`) y sangría del bloque (solo espacios en blanco; los `<svg>` no se tocan). **DT-14/DT-17:** `<meta charset>` movido a la primera posición y línea nueva `<base href="/"/>` en la segunda. **DT-13.** |
| `src/css/input.css` | Bloque nuevo `@layer components` con `.bg-noise` entre el del carrusel y el de Starlight (13 líneas agregadas, ninguna eliminada). La cadena base64 es **idéntica** a la de `HEAD` (comprobado por programa). |
| `dist/css/output.css` | Regenerado con `pnpm build`. SHA-256 después: `6e13d4d4c21ae6e76bfa372972549b3ba7c7fa6f13b755ab475006f4754a56cb`. Cambia solo en lo esperado (`.bg-noise` y `.fill-surface-container`). |
| `_planificacion/README.md` §12 | Filas DT-01, 02, 03, 05, 07 y 13 (nueva) como ✅ con su evidencia; DT-14 y DT-17 con su estado real (ver §4.10). |
| Bitácoras y `estado-actual.md` | Esta bitácora y una línea nueva. |

Diffs del `<head>` de `404.html` (`git diff`): 1 línea eliminada (`<meta charset>` de la antigua línea 10) y 2 agregadas (`<meta charset>` y `<base href="/"/>`), sin otros cambios en el `<head>`. Los otros cinco HTML no cambian por la Tarea 3b. Todos los HTML conservan sus saltos de línea CRLF.

**Método de verificación en render real:** Chrome 155.0.8059.40 (headless, el ya instalado; no se instaló nada), controlado por CDP desde scripts temporales en el scratchpad, con **perfil aislado** (`--user-data-dir` en el scratchpad) y puertos de depuración propios; no se abrió ni tocó el navegador del desarrollador y no se ejecutó `chrome --version`. Servidor temporal de Node que simula Cloudflare Pages sobre `_site/` (archivo exacto, luego `ruta.html`, y si no `404.html` **con estado 404**); para los "antes" se sirvió además `HEAD` por encima. Clasificación: **confirmado por código** = lectura del fuente o del CSS compilado; **confirmado en render real (headless)** = medición en Chrome; **emulado** = media query emulada por CDP.

## 4. Verificación de criterios de aceptación

### 4.1 Tarea 1, DT-01: enlace de marca del footer de Servicios

| Comprobación | Estado | Evidencia |
|:--|:--:|:--|
| Balance de `<a>` y `</a>` | ✅ por código | `servicios.html`: 29/29 (antes 28/29). Las 17 etiquetas de los 6 archivos quedan sin desbalances. |
| Columna 1 idéntica a `contacto.html` | ✅ por código | Comparados footers normalizados: la columna 1 no tiene ninguna diferencia. Quedan solo el enlace activo y la variante de contenedor (`mt-space-8` frente a `border-t`), ya conocidas (DT-06). |
| Ya no aparece código como texto | ✅ render real (headless) | 360 y 1280 px, claro y oscuro: el texto de la columna empieza con "La Jardinera Es increíble el efecto…" y `contieneCodigo = false`. En `HEAD` era `class="font-headline-md ... href=...` (`contieneCodigo = true`, sin enlace). |
| Apariencia del enlace | ✅ render real (headless) | `./index.html`, "La Jardinera", Noto Serif cursiva 24 px; color `rgb(25, 28, 25)` en claro y `rgb(243, 243, 240)` en oscuro. |

### 4.2 Tarea 2, DT-03: estilos en línea a clases

| Comprobación | Estado | Evidencia |
|:--|:--:|:--|
| Las 4 cadenas base64 eran idénticas antes de borrar | ✅ | 312 caracteres, mismo SHA-256 parcial. |
| `.bg-noise` en `input.css` con la cadena original | ✅ por código | La cadena de `input.css` es idéntica a la de `HEAD` (comprobada por programa). |
| `.bg-noise` en `output.css` | ✅ por código, con matiz | Primeros 60 caracteres iguales (`PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdC`) y longitud igual (**312**), pero el centro difiere: el minificador de Tailwind reescribe el SVG decodificado (reordena atributos y cambia `0.6` por `.6`). Es el mismo SVG (`type="fractalNoise"`, `baseFrequency` 0,6, `numOctaves="3"`, `stitchTiles="stitch"`). Ver §5, N1. |
| 0 `style="` en los 6 HTML | ✅ por código | Búsqueda de texto: 0 coincidencias. Los `style` que asigna JavaScript en tiempo de ejecución (`document.body.style.overflow`, `style.setProperty` del carrusel) no son marcado y quedan fuera, como pide la especificación. |
| La textura se ve idéntica | ✅ render real (headless) | Comparación de la caja del banner contra `HEAD` (con `style=`), animaciones detenidas en t = 0: **0 píxeles distintos, diferencia máxima 0**, en 16 combinaciones: `index` (1200 × 340 y 320 × 594), `servicios`, `suscripcion-floral` y `galeria` (1200 × 243 y 320 × 617), en claro y oscuro. Estilos computados iguales (`data-uri-svg`, `opacity 0.2`, `mix-blend-mode: overlay`, `repeat`). |

### 4.3 Tarea 3, DT-05: botones sociales de la 404

| Comprobación | Estado | Evidencia |
|:--|:--:|:--|
| Clase idéntica a `contacto.html` | ✅ por código | Las tres clases coinciden carácter por carácter con las de `contacto.html` (líneas 541, 550 y 560). `<svg>` sin tocar. |
| Visibles en móvil | ✅ render real (headless) | 360 px, claro y oscuro: Instagram, Facebook y WhatsApp con `display: flex` y **32 × 32 px**, igual que `contacto.html`. En `HEAD`: `display: none`, 0 × 0 px. A 1280 px sin cambios (32 × 32 antes y después). |

### 4.4 Tarea 4, DT-13: ícono de Facebook

| Comprobación | Estado | Evidencia |
|:--|:--:|:--|
| `.fill-surface-container` en `output.css` | ✅ por código | `.fill-surface-container{fill:rgb(var(--color-surface-container))}`. |
| Modo oscuro (6 páginas) | ✅ render real (headless) | Relleno computado de la "f" `rgb(51, 58, 54)` frente al círculo `rgb(191, 197, 190)`: **6,64:1** (antes `rgb(237, 239, 233)`: **1,52:1**). Idéntico en las 6 páginas. |
| Modo claro idéntico a antes (6 páginas) | ✅ render real (headless) | `rgb(237, 239, 233)` antes y después (8,04:1 frente al círculo `rgb(65, 73, 65)`); capturas ×6 del botón: **0 píxeles distintos** en las 6 páginas. |
| Solo el segundo `<path>` cambia | ✅ por código | `git diff`: 6 líneas `fill="#edefe9"` → `class="fill-surface-container"`; el primer `<path>` y los demás atributos no se tocan. |

### 4.5 Tarea 5, DT-07: "Redbanc"

| Comprobación | Estado | Evidencia |
|:--|:--:|:--|
| Corrección aplicada (confirmada por el desarrollador, 13-10-2026 y 14-10-2026) | ✅ | `index.html`, **línea 337**, dentro de un `<p class="font-body-sm text-body-sm ...">` de la franja de beneficios: "Redbanc, efectivo y transferencias bancarias." Solo esa palabra. |
| Render real | ✅ render real (headless) | El texto visible contiene "Redbanc" y no contiene "Redbank". |

### 4.6 Tarea 3b, DT-14 (y DT-17 solo en `404.html`): 404 en rutas con subcarpeta

**1. Marcado (confirmado por código y por el DOM de Chrome).** `404.html` tiene exactamente un `<meta charset` y un `<base` (líneas 4 y 5), son los dos primeros hijos del `<head>`, en ese orden, y ningún `<link>` ni `<script>` los precede; 0 `href="#`. Hunk del `<head>`: 1 línea eliminada y 2 agregadas (§3).

**2. Simulación local de Cloudflare** (`_site/` generado con `pnpm run build:cf`; el servidor temporal responde `404.html` con estado 404 a cualquier ruta inexistente; confirmado: `performance.getEntriesByType('navigation')[0].responseStatus = 404` y `document.baseURI = http://localhost:5541/` en las 4 rutas). Tabla de recursos resueltos desde **`/a/b/xyz`** (las rutas `/xyz`, `/a/b/c/xyz` y `/servicios/xyz` dieron exactamente los mismos 9 recursos únicos y los mismos estados):

| Recurso | Atributo en el marcado | URL resuelta | Estado |
|:--|:--|:--|:--:|
| **Favicon** (fila propia) | `<link rel="icon" href="./public/logos/la-jardinera-original.png">` | `/public/logos/la-jardinera-original.png` | 200 |
| CSS | `./dist/css/output.css` | `/dist/css/output.css` | 200 |
| Logotipo (modo claro) | `./public/logos/la-jardinera-original.png` | `/public/logos/la-jardinera-original.png` | 200 |
| Logotipo (modo oscuro) | `./public/logos/la-jardinera-blanco.png` | `/public/logos/la-jardinera-blanco.png` | 200 |
| `main.js` | `./src/js/main.js` | `/src/js/main.js` | 200 |
| Módulos y datos que importa | (carga dinámica) | `/src/js/modules/{navigation,carousel,modal,gallery,theme,subscription,contact-form}.js` y `/src/js/data/{reviews,services}.js` (los 9 módulos y datos, más `main.js`: 10 archivos) | 200 (10 de 10) |
| Enlaces del header (×5) | `./index.html`, `./servicios.html`, `./suscripcion-floral.html`, `./galeria.html`, `./contacto.html` | `/index.html`, `/servicios.html`, `/suscripcion-floral.html`, `/galeria.html`, `/contacto.html` | 200 (5 de 5) |
| Enlaces del footer (×5) | los mismos 5 | los mismos 5 | 200 (5 de 5) |

Nota: el servidor simulado no reproduce el redireccionamiento 308 de `/pagina.html` a `/pagina` de Cloudflare; los enlaces `./index.html` resuelven a `/index.html` y, en producción, Cloudflare los redirige.

**Antes** (`HEAD`, mismo servidor): los 9 recursos únicos resuelven bajo la subcarpeta (`/a/b/public/logos/...`, `/a/b/dist/css/output.css`, `/servicios/src/js/main.js`, `/servicios/index.html`, etc.) y responden **404**: 9 de 9 en `/a/b/xyz` y 9 de 9 en `/servicios/xyz`. Reproduce el defecto confirmado en producción.

**3. Render real de `/a/b/xyz`** (360 × 740 y 1280 × 800, claro y oscuro; solo después y, a modo de contraste, antes):

| Comprobación | Después | Antes (`HEAD`) |
|:--|:--|:--|
| Hoja de estilos aplicada | `/dist/css/output.css` con 559 reglas; fondo `rgb(248, 247, 243)` claro y `rgb(31, 36, 33)` oscuro; cuerpo en Montserrat y `<h1>` "Esta flor no florece aquí" en Noto Serif | `/a/b/dist/css/output.css` con 0 reglas; `Times New Roman`; fondo transparente |
| Logotipo | Visible (la variante que corresponde al tema; la otra oculta), `naturalWidth` 3446 | 0 × 0 px (no carga) |
| Header y footer completos | Sí (10 enlaces de navegación en el header y 13 enlaces en el footer, en ambos viewports) | Presentes pero sin estilos |
| Botones sociales (360 px) | Los 3 visibles, 32 × 32 px | Sin estilos |
| Scroll horizontal | `scrollWidth` = `clientWidth` (360/360 y 1280/1280) | n. a. |
| Consola | 0 mensajes, salvo el propio aviso de Chrome por el estado 404 del documento (`Failed to load resource: ... 404 (Not Found)` de `/a/b/xyz`; es esperado para una página servida con 404 y no es un error de la página) | Además 404 de CSS, `main.js` y logotipos |
| Estados de red | Único 404: el documento | 404 del documento, CSS, `main.js` y logotipos |
| `<base>` | `document.baseURI` = raíz del sitio | `.../a/b/xyz` |

Capturas guardadas en el scratchpad (fuera del repositorio).

**4. Orden final del `<head>` de `404.html`** (tomado del DOM de Chrome, en el orden real):

| # | Etiqueta | Atributo identificador |
|:--|:--|:--|
| 1 | `<meta>` | `charset="utf-8"` |
| 2 | `<base>` | `href="/"` |
| 3 | `<title>` | "Página no encontrada - La Jardinera Florería" |
| 4 | `<meta>` | `name="description"` |
| 5 | `<meta>` | `name="robots"` (`noindex, follow`) |
| 6 | `<link>` | `rel="icon"` (`./public/logos/la-jardinera-original.png`) |
| 7 | `<meta>` | `name="viewport"` |
| 8 | `<link>` | `rel="preconnect"` (`https://fonts.googleapis.com`) |
| 9 | `<link>` | `rel="preconnect"` (`https://fonts.gstatic.com`, `crossorigin`) |
| 10 | `<link>` | `rel="stylesheet"` (Google Fonts) |
| 11 | `<link>` | `rel="stylesheet"` (`./dist/css/output.css`) |

**5. Producción:** 🕒 **PENDIENTE** (acción del desarrollador, ver §5.1).

### 4.7 Tarea 6, DT-02: certificación de H8

**Verificación estática (confirmado por código).** Matriz archivo × patrón, con conteos reales (enlaces de `<nav aria-label="Navegación principal">` y clúster de acciones):

| Archivo | Enlaces del nav | `px-2.5 xl:px-4` | `tracking-[0.1em] xl:tracking-[0.16em]` | Subrayado `left-2.5 right-2.5 xl:left-4 xl:right-4` | Clúster `gap-2 lg:gap-2 xl:gap-space-3` |
|:--|:--:|:--:|:--:|:--:|:--:|
| `index.html` | 5 | 5/5 | 5/5 | 5/5 | 1 |
| `servicios.html` | 5 | 5/5 | 5/5 | 5/5 | 1 |
| `suscripcion-floral.html` | 5 | 5/5 | 5/5 | 5/5 | 1 |
| `galeria.html` | 5 | 5/5 | 5/5 | 5/5 | 1 |
| `contacto.html` | 5 | 5/5 | 5/5 | 5/5 | 1 |
| `404.html` | 5 | 5/5 | 5/5 | 5/5 | 1 |

Utilidades en `dist/css/output.css` (búsqueda de texto con la herramienta del agente, 10 de 10 presentes): `.px-2\.5`, `.xl\:px-4`, `.tracking-\[0\.1em\]`, `.xl\:tracking-\[0\.16em\]`, `.left-2\.5`, `.right-2\.5`, `.xl\:left-4`, `.xl\:right-4`, `.lg\:gap-2` y `.xl\:gap-space-3`.

**Render real (headless).** 6 páginas × claro y oscuro × 10 anchos = **120 mediciones, 0 incumplimientos** de: los 5 enlaces del nav a 40 px (una línea; 56 px sería partido), texto de marca "La Jardinera" en 1 línea, 0 px de solapamiento entre marca, navegación y acciones, y `scrollWidth` = `clientWidth`. Resumen por ancho (el peor caso entre las 12 combinaciones página × tema):

| Ancho | "Suscripción Floral" | Líneas de la marca | Solapamiento máx. | Holgura mín. marca–nav | Holgura mín. nav–acciones | Sin scroll | `padding-left` / `letter-spacing` / `gap` |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--|
| 1024 | 40 px | 1 | 0 px | 37 px | 36,98 px | ✅ | 10 px / 1,2 px / 8 px |
| 1040 | 40 px | 1 | 0 px | 45 px | 44,98 px | ✅ | 10 px / 1,2 px / 8 px |
| 1060 | 40 px | 1 | 0 px | 55 px | 54,98 px | ✅ | 10 px / 1,2 px / 8 px |
| 1080 | 40 px | 1 | 0 px | 65 px | 64,98 px | ✅ | 10 px / 1,2 px / 8 px |
| 1099 | 40 px | 1 | 0 px | 74,5 px | 74,48 px | ✅ | 10 px / 1,2 px / 8 px |
| 1100 | 40 px | 1 | 0 px | 75 px | 74,98 px | ✅ | 10 px / 1,2 px / 8 px |
| 1180 | 40 px | 1 | 0 px | 115 px | 114,98 px | ✅ | 10 px / 1,2 px / 8 px |
| 1279 | 40 px | 1 | 0 px | 164,5 px | 164,48 px | ✅ | 10 px / 1,2 px / 8 px |
| 1280 | 40 px | 1 | 0 px | 101,7 px | 101,69 px | ✅ | 16 px / 1,92 px / 24 px |
| 1440 | 40 px | 1 | 0 px | 101,7 px | 101,69 px | ✅ | 16 px / 1,92 px / 24 px |

La menor holgura de todas las mediciones es de 37 px (`404.html`, modo oscuro, 1024 px). Los valores computados coinciden en las 120 mediciones con los esperados por la especificación (10 px, 1,2 px y 8 px entre 1024 y 1279 px; 16 px, 1,92 px y 24 px desde 1280 px).

**A 1280 px el header luce igual que antes.** Se comparó el header actual con el de la versión previa a la compactación (commit `5bb30ae^`, del 19-09-2026, con su propio `output.css`) en `404`, `contacto`, `servicios`, `suscripcion-floral` y `galeria`, en claro y oscuro (10 comparaciones), con las animaciones detenidas en t = 0 y el fondo del header neutralizado en ambas versiones para aislar el contenido que pasa por debajo: **56 de 56 elementos con 0 px de diferencia de geometría y 0 píxeles distintos (diferencia máxima 0)** en la banda de 80 px a escala ×2. `index.html` no se comparó píxel a píxel (su header va sobre la fotografía del Hero, que cambió después); sí se midió su geometría computada (16 px, 1,92 px y 24 px). Una primera comparación sin detener las animaciones ni neutralizar el fondo del header mostró 398 a 1.209 píxeles distintos (diferencia máxima de hasta 151 niveles de color), con la misma geometría computada; con las animaciones detenidas y el fondo neutralizado desaparecen por completo, lo que las atribuye al efecto animado de la marca (`fx-spotlight`) y al contenido que pasa bajo el header translúcido, no al ancho ni al espaciado de la barra.

No se encontró ningún ancho que parta el texto o solape elementos, así que no hay propuesta de compactación adicional.

### 4.8 Invariantes (confirmado por código)

| Invariante | Estado | Evidencia |
|:--|:--:|:--|
| 0 `style="` en el marcado | ✅ | Búsqueda de texto en los 6 HTML: 0 coincidencias. |
| 0 `onclick` | ✅ | 0 coincidencias. |
| 0 `href="#"` en navegación y footer | ✅ | 0 coincidencias de `href="#"` y 0 `href="#...` en `header` y `footer`. `index.html` conserva 3 anclas internas del Hero (`#servicios` ×2 y `#suscripcion`), fuera de la navegación y del footer. |
| IDs únicos | ✅ | 0 duplicados en los 6 archivos (16, 13, 11, 17, 17 y 6 IDs). |
| Ningún descendiente de `<header>` con `fixed` | ✅ | 0 en los 6. |
| `#mobile-menu-scrim` hermano posterior a `</header>` | ✅ | Cumplido en los 6. |
| Paridad de header | ✅ | Diferencias del header de cada página frente a `index.html`: idénticas a las de `HEAD` (solo el estado activo; `404.html`, estado neutro). |
| Paridad de footer | ✅ | Diferencias frente a `index.html` idénticas a `HEAD` salvo: `servicios.html` +1 línea (el `<a` restituido) y `404.html` pasa de 6/12 a 3/9 líneas distintas, ahora igual que `contacto.html` y `suscripcion-floral.html`. Quedan solo el enlace activo y las variantes de DT-06. |
| Balance de etiquetas | ✅ | 17 etiquetas × 6 archivos sin desbalances. |

### 4.9 B5: consola y compilación en las 6 páginas (cierra la casilla parcial de la Iteración 02)

`pnpm build` y `pnpm run build:cf`: sin errores. Consola de Chrome 155 headless, cada página en **claro y oscuro**, a **1280 × 800 y 360 × 740** (24 cargas, sin caché; modo oscuro confirmado por la clase `dark` del `<html>`):

| Página | Claro 1280 | Claro 360 | Oscuro 1280 | Oscuro 360 | Mensajes `error`/`warning`, excepciones, entradas de registro y respuestas ≥ 400 |
|:--|:--:|:--:|:--:|:--:|:--|
| `index.html` | ✅ | ✅ | ✅ | ✅ | 0 en las 4 cargas |
| `servicios.html` | ✅ | ✅ | ✅ | ✅ | 0 en las 4 cargas |
| `suscripcion-floral.html` | ✅ | ✅ | ✅ | ✅ | 0 en las 4 cargas |
| `galeria.html` | ✅ | ✅ | ✅ | ✅ | 0 en las 4 cargas (ver nota sobre `.mp4` abajo) |
| `contacto.html` | ✅ | ✅ | ✅ | ✅ | 0 en las 4 cargas |
| `404.html` (servida como `/404.html`) | ✅ | ✅ | ✅ | ✅ | 0 en las 4 cargas |

Nota: en `galeria.html` Chrome canceló entre 4 y 9 solicitudes de videos `.mp4` por carga (`net::ERR_ABORTED`) sin generar mensajes de consola ni respuestas ≥ 400. La causa no se investigó (ver §5, N4). El caso de la 404 servida en una ruta inexistente con estado 404 se midió aparte en §4.6.

### 4.10 Estado por deuda técnica

| Deuda | Estado | Evidencia |
|:--|:--:|:--|
| DT-01 | ✅ Resuelta | §4.1: render real en 360 y 1280 px, claro y oscuro. |
| DT-03 | ✅ Resuelta | §4.2: **4 `style=` resueltos en esta iteración; el del Hero se resolvió en la Épica 01 · Iteración 08.** 0 `style="` en los 6 HTML; 0 píxeles de diferencia en 16 comparaciones. |
| DT-05 | ✅ Resuelta | §4.3: render real a 360 px. |
| DT-13 | ✅ Resuelta | §4.4: 1,52:1 → 6,64:1 en oscuro; claro idéntico. |
| DT-07 | ✅ Resuelta | §4.5: línea 337 de `index.html`. |
| DT-14 | 🕒 Corregida en código; **pendiente de verificación en producción** | §4.6: simulación local y render real superados (la **simulación local** se distingue de la verificación en **producción**, que depende del desarrollador). En el §12 queda con la nota "corregida en código; pendiente de verificación en producción", como pide la especificación. |
| DT-02 | ✅ Resuelta | §4.7: 120 mediciones en render real, 0 incumplimientos; 1280 px idéntico al previo. |
| DT-17 (solo `404.html`) | ✅ en `404.html`; DT-17 **sigue abierta** | `<meta charset>` y `<base>` son las dos primeras etiquetas del `<head>` de `404.html` (DOM de Chrome). Las otras 5 páginas conservan su `<head>` y se corrigen en la Épica 08 · Iteración 02, por decisión del desarrollador del 13-10-2026. |

### 4.11 Criterios de aceptación de la especificación

| Escenario | Estado | Evidencia |
|:--|:--:|:--|
| 1: Footer de Servicios sin texto suelto | ✅ render real (headless) | §4.1 |
| 2: Cero estilos en línea | ✅ render real (headless) | §4.2: 0 `style="`, textura idéntica, Hero intacto. |
| 3: Redes sociales en la 404 | ✅ render real (headless) | §4.3 |
| 4: Ícono de Facebook legible | ✅ render real (headless) | §4.4: 6,64:1 en oscuro; claro idéntico. |
| 5: H8 con evidencia | ✅ render real (headless) | §4.7: "Suscripción Floral" en una sola línea en todos los anchos y temas medidos. |
| 6: Honestidad del reporte | ✅ | DT-07 aplicada con confirmación del desarrollador; DT-14 y la solicitud del favicon real figuran como 🕒 PENDIENTE; nada se marca ✅ sin medición. |
| 7: 404 en ruta con subcarpeta | 🕒 Parcial | Simulación local y render real ✅ (§4.6); `/servicios/xyz` en **producción**, 🕒 PENDIENTE. |

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

- **N1. El minificador reescribe la cadena base64 del ruido.** La especificación pide comparar "los primeros 60 caracteres y la longitud" de la cadena en `output.css`: ambos coinciden (60 caracteres iguales, longitud 312). Pero la cadena completa de `output.css` no es literalmente la de `input.css`: Tailwind (`--minify`) decodifica y reescribe el SVG (atributos reordenados y `baseFrequency="0.6"` → `".6"`). Es el mismo SVG y se ve idéntico (0 píxeles de diferencia). No requiere acción; queda como nota para la Épica 08.
- **N2. El favicon real no se pudo observar.** Chrome headless no hace una solicitud de favicon aparte (las solicitudes de la imagen `la-jardinera-original.png` son las `<img>` del header). El favicon se verificó por su URL resuelta (`link[rel=icon].href`, que apunta a la raíz) y por un `fetch` con 200, pero **la solicitud en la pestaña de un navegador real** queda 🕒 PENDIENTE (§5.1).
- **N3. Aviso de consola de la 404.** Servida en una ruta inexistente, Chrome registra `Failed to load resource: ... 404 (Not Found)` del propio documento. Es el estado 404 de la página, no un defecto.
- **N4. Cancelaciones de videos en la Galería.** `galeria.html` provoca entre 4 y 9 `net::ERR_ABORTED` de `.mp4` por carga (por ejemplo `/public/images/galeria/rdn7.mp4`) sin mensajes de consola ni estados ≥ 400. Causa no confirmada; podría deberse a que el servidor simulado no implementa solicitudes con `Range` o al `preload` de los videos. Fuera de alcance; se reporta.
- **N5. Paridad menor en el banner de ruido.** El `<div>` de la textura de `index.html` no lleva `aria-hidden="true"` y los de `servicios`, `suscripcion-floral` y `galeria` sí. Es decorativo; no se corrige.
- **N6. Scroll horizontal de 4 px entre 768 y 1023 px (H-8 de la Iteración 02).** Sigue presente, fuera del Hero y de esta iteración; no afecta la certificación de H8 (que mide de 1024 px en adelante).
- **N7. Incidente de proceso (sin efecto en el proyecto).** Al agregar `.bg-noise` transcribí a mano la cadena base64 y la comparación posterior dio "distinta"; en vez de confiar en la transcripción, la reemplacé por programa con la cadena literal de `HEAD` y verifiqué la igualdad (el desajuste restante era N1). Sin archivos sueltos en el repositorio.

### 5.1 🕒 Pendientes del desarrollador (lista manual)

**DT-14 y favicon (producción y pestaña real):**

- [ ] Tras el despliegue, abrir `https://www.lajardinerafloreria.cl/servicios/xyz` y confirmar que se ve con estilos, logotipo, header y footer.
- [ ] Confirmar que la pestaña muestra el favicon y que su solicitud apunta a la raíz (`/public/logos/la-jardinera-original.png`; pestaña Red de las herramientas de desarrollo).
- [ ] Confirmar que los enlaces del header y del footer llevan a la raíz del sitio (no a `/servicios/...`).
- [ ] Repetir en modo oscuro y revisar la consola (solo debe aparecer el aviso del estado 404 del documento).
- [ ] Opcional, en local: abrir `/a/b/xyz` con un servidor que responda `404.html` con estado 404 en 360 × 740 y 1280 × 800.

**H8 en navegadores y dispositivos que no se midieron (Chrome headless es el único medido):**

- [ ] En cada una de las 6 páginas, achicar la ventana entre 1024 y 1279 px (arrastrando lentamente) y confirmar que "Suscripción Floral" nunca se parte; revisar también en Firefox y Safari.
- [ ] Confirmar a 1280 px que el header luce igual que antes y que no hay scroll horizontal.
- [ ] Repetir en modo oscuro.

**Otras comprobaciones visuales:**

- [ ] Mirar el footer de Servicios y los banners con textura (Inicio, Servicios, Suscripción, Galería) en un navegador real.
- [ ] Mirar el ícono de Facebook del footer en modo claro y oscuro, y los botones sociales de la 404 en un móvil.

**Heredados de la Iteración 02** (siguen pendientes): traza de pintado en móvil real, contraste forzado real de Windows, Firefox y Safari, y la lista manual de la §5.1 de su bitácora.

## 6. Archivos modificados y propuestas para archivos protegidos

**Modificados por el agente (esta Parte B):** `404.html`, `contacto.html`, `galeria.html`, `index.html`, `servicios.html`, `suscripcion-floral.html`, `src/css/input.css`, `dist/css/output.css` (generado), `_planificacion/README.md` (§12), esta bitácora y `_planificacion/04-bitacora/estado-actual.md` (una línea). No se tocó ningún archivo protegido, ni `package.json`, `pnpm-lock.yaml` ni `tailwind.config.js`; sin Git de escritura. `_site/` se regeneró con `pnpm run build:cf` (está en `.gitignore`).

### Propuesta de edición — `DESIGN.md`
**Sección:** §5 Notas de auditoría y deuda de diseño, ítem 9
**Motivo:** la deuda quedó resuelta en la Épica 07 · Iteración 03: la textura vive en `.bg-noise`.
```diff
- 9. **Estilos en línea heredados:** la textura de ruido del banner (4 páginas) usa `style=`. Debe migrar a una clase en
-    `input.css`. (El del Hero del Inicio se resolvió en la Épica 01 · Iteración 08: ahora es un `<picture>`.)
+ 9. **Estilos en línea heredados (resuelto):** la textura de ruido del banner (4 páginas) vive en la clase `.bg-noise`
+    de `input.css` (`@layer components`); el HTML solo agrega `bg-noise` al `<div>` del banner. El del Hero del Inicio
+    se resolvió en la Épica 01 · Iteración 08: ahora es un `<picture>`.
```

### Propuesta de edición — `DESIGN.md`
**Sección:** §10 Componente: footer, ítem 3
**Motivo:** dejar escrito que los botones sociales se ven siempre y que la "f" de Facebook no lleva color fijo (DT-05 y DT-13).
```diff
- 3. Contacto (`tel:`, `mailto:`, Google Maps) con íconos `text-primary` y botones sociales `w-8 h-8 bg-surface-container`.
+ 3. Contacto (`tel:`, `mailto:`, Google Maps) con íconos `text-primary` y botones sociales `w-8 h-8 bg-surface-container`,
+    siempre visibles (sin `hidden lg:flex`). El segundo `<path>` del ícono de Facebook lleva
+    `class="fill-surface-container"` y nunca un color fijo: el relleno debe coincidir con el fondo del botón en ambos
+    temas (en oscuro, 6,64:1 frente al círculo).
```

### Propuesta de edición — `AGENTS.md`
**Sección:** §5 Reglas de arquitectura, regla 8 (Rutas relativas)
**Motivo:** `404.html` usa `<base href="/">` porque Cloudflare Pages la sirve en cualquier ruta inexistente, incluidas las anidadas (DT-14); conviene dejar la excepción escrita para que ningún agente la "corrija".
```diff
- 8. **Rutas relativas** con `./` para todo recurso y enlace interno.
+ 8. **Rutas relativas** con `./` para todo recurso y enlace interno. Excepción: `404.html` declara `<base href="/">` como
+    segunda etiqueta de su `<head>` (después de `<meta charset>`), porque Cloudflare Pages la sirve en rutas anidadas
+    (`/servicios/xyz`) y las rutas `./` deben resolverse desde la raíz del sitio.
```

### Propuesta (no aplicada) — Definition of Done de la Épica 07 (`definicion-epica.md` §4)
Casillas que cubre ahora la Iteración 03 (sumadas a la del titular, cubierta por la Iteración 02):

```diff
- * [ ] 0 `style=` en el marcado de los 6 HTML; footer de Servicios sin texto basura; ícono de Facebook legible en
-   ambos temas; H8 certificado en render real.
+ * [x] 0 `style=` en el marcado de los 6 HTML; footer de Servicios sin texto basura; ícono de Facebook legible en
+   ambos temas; H8 certificado en render real. (Iteración 03, 14-10-2026: Chrome 155 headless; pendientes de
+   otros navegadores y dispositivos reales: lista manual de su bitácora.)
...
- * [ ] `pnpm build` sin errores y consola limpia en las 6 páginas, en modo claro y oscuro.
+ * [x] `pnpm build` sin errores y consola limpia en las 6 páginas, en modo claro y oscuro. (Iteración 03: 24 cargas
+   en Chrome 155 headless, 1280 × 800 y 360 × 740; la Iteración 02 había cubierto solo el Inicio.)
```
Casillas que **no** cubre: el despliegue por lista blanca (Iteración 01) ni `_antigravity/` y `AGENTS.md`. Sugerencia opcional: agregar una casilla propia, "La 404 en `/servicios/xyz` se ve con estilos en producción", que seguirá abierta hasta que el desarrollador confirme DT-14. La casilla del titular (Iteración 02) puede marcarse con las reservas de su bitácora (§8.11).

## 7. Mensaje de commit sugerido

```text
Épica 07 - Iteración 03: Corrige DT-01, DT-03, DT-05, DT-07 y DT-13, la 404 con base en la raíz y certifica H8 en render real; DT-14 queda pendiente de verificar en producción.
```
