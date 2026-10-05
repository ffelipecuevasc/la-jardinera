# Bitácora de Ejecución - Épica 01 - Iteración 08 (extensión no planificada)

**Fecha de ejecución:** 04-10-2026 (inicio) al 05-10-2026 (cierre)
**Agente:** Claude Code (Sonnet 5.5)
**Objetivo:** Que el Hero del Inicio muestre una fotografía a pleno color dentro de una tarjeta de vidrio (*glassmorphism*)
que contenga el mensaje de marca, sin logotipo duplicado, con contraste AA y paridad exacta entre modo claro y oscuro.

**Estado de la iteración:** Completada con reservas. El código, la compilación y el render real en Chrome *headless*
están verificados; quedan pendientes Lighthouse y la revisión en dispositivo real. Las reservas están en la §5.

---

## 1. Resumen ejecutivo

- **Estado detectado: A.** El Hero usaba `style="background-image: url(…hero-botanical.webp)"`. La Iteración 03 de la
  Épica 07 no se había ejecutado, así que no existía `.bg-hero-botanical` y no hubo nada que borrar en `input.css`.
- `<section id="titular">` quedó con `<picture>` (dirección de arte vertical/horizontal), una tarjeta de vidrio
  centrada que contiene titular, párrafo, botones y la fila de ubicación, y **sin** logotipo, degradados, opacidad ni
  `style=`. El marcado interno de `fx-starlight` quedó byte a byte igual.
- **Compilación:** `pnpm build` y `pnpm run build:cf` terminan sin errores y sin advertencias nuevas (solo el aviso conocido
  de Browserslist). `dist/css/output.css` pasó de 47.153 B a 46.529 B.
- **Contraste:** con el tinte mínimo `/45` se cumple en los 7 viewports y en ambos temas, por la métrica de la
  especificación (percentil 95 de toda la tarjeta) y por una medición más estricta línea a línea. **No fue necesario subir
  a `/55` ni `/65`.** El margen del párrafo es estrecho (ver §4.2).
- **Render real** (Chrome 154 *headless* por CDP, 7 viewports × 2 temas): imagen correcta por orientación en los 14
  casos, 0 desbordes de texto, 0 errores o advertencias de consola y movimiento reducido correcto.
- **Reservas:** (1) el ícono de ubicación usa un token reactivo y difiere entre temas; (2) hay 4 px de scroll
  horizontal a 768×1024 y un CLS pequeño distinto de 0, **ambos presentes también en `HEAD` y fuera del Hero**;
  (3) Lighthouse y la revisión en dispositivo real quedan `🕒 PENDIENTE`.
- Se aplicaron las decisiones D1 a D6 que aprobó el desarrollador (§5.3), incluida una desviación de la especificación
  que debe corregirse en `iteracion-08.md` (D2, §5.3).

---

## 2. Línea base (Tareas 0 y 1)

### 2.1 Tarea 0

| Ítem | Resultado |
|:--|:--|
| `pnpm build` | Sin errores. Aviso conocido: `Browserslist: caniuse-lite is outdated`. |
| SHA-256 de `dist/css/output.css` (antes) | `9901ecf5690236b95eccddbc59e992ba69ebba184eeeab227e85aeea680f4143` (47.153 B), idéntico antes y después del `pnpm build` de línea base. |
| SHA-256 de `dist/css/output.css` (después) | `59a51b94b6c94cc451c5d0b576e84dbf6f49fe0678bc776f77e710d89241a572` (46.529 B). Idéntico en `_site/dist/css/output.css`. |
| `style="` en `index.html` (antes) | 2: `:246` (fondo del Hero) y `:801` (textura del banner). **Después: 1** (solo el `:801`). |
| Estado detectado | **A**. |
| `la-jardinera-blanco.png` en `index.html` | 2 (header `:27` y Hero `:256`). **Después: 1** (solo el header). |
| `hero-botanical.webp` en el repo | Código: solo el Hero (`index.html:246`, ya retirado). No existe `og:image` (DT-08). El resto son menciones documentales en `_planificacion/`. |

Contenido del Hero antes del cambio: fondo `div role="img"` con `aria-label` en inglés y `style=`, 2 degradados,
espaciador `h-24 lg:h-32`, logotipo, `h1` (`fx-starlight`), párrafo, 2 CTAs (`#servicios`, `#suscripcion`) y la franja
**«Hero Meta Footer»** (`bg-dark-background/80 backdrop-blur-sm`) con «Valdivia, Región de Los Ríos, Chile» y el enlace
«Descubrir Más». **Esa franja no figura en la especificación** (ver D1 en §5.3).

### 2.2 Tarea 1: imágenes (se repitió sobre los archivos definitivos)

El desarrollador reemplazó las dos imágenes **después** del plan de impacto, manteniendo los nombres. Las primeras
versiones eran WebP *lossless* de 3.911 KB y 4.099 KB; no se usaron en el marcado. Medición sobre los archivos definitivos
(lectura de cabeceras RIFF/WebP):

| Archivo | Formato real | Píxeles (esperado) | Proporción (esperada) | Peso (objetivo) |
|:--|:--|:--|:--|:--|
| `hero-botanical-desktop.webp` | WebP con pérdida (VP8) | **2752×1536** (2400×1350; +14,7 % / +13,8 %) | 1,7917 (1,7778) | **159.090 B = 155,4 KB** (≤300 KB; 0,52×) ✅ |
| `hero-botanical-mobile.webp` | WebP con pérdida (VP8) | **1536×2752** (1080×1920; +42,2 % / +43,3 %) | 0,5581 (0,5625) | **190.564 B = 186,1 KB** (≤180 KB; **+3,4 %**, dentro del 15 % de tolerancia = 207 KB) |

- Ambas superan la tolerancia de ±5 % en píxeles. **El desarrollador las aceptó expresamente (D4)** siempre que el peso
  cumpla; se reporta como hallazgo informativo, no como bloqueo.
- Peso: desktop cumple; mobile excede el objetivo en 6,1 KB (3,4 %), dentro de la tolerancia. Ambas pesan 0,15 y 0,18 MiB,
  muy por debajo del límite de 25 MiB de Cloudflare Pages.
- **Misma escena:** manos de florista envolviendo en papel kraft un ramo de rosa fucsia, gerbera, claveles y
  alstroemerias sobre fondo de madera cálido. La versión vertical es una recomposición de la horizontal.
  Un solo `alt` describe ambas.

**`alt` aplicado** (104 caracteres, sin «imagen de» ni «foto de»):

> Manos de florista envolviendo en papel kraft un ramo de rosas fucsia, gerberas, claveles y alstroemerias

### 2.3 Pre-estimación de contraste (orientativa, rehecha con las imágenes definitivas)

Simulación sobre el WebP (ajuste *cover* + desenfoque de 24 px + tinte; p95 de luminosidad). **No es una medición** y no
se usa como evidencia; las cifras medidas están en la §4.2. Las razones difieren de la primera estimación en ≤0,01.

| Viewport | Tinte | neutral-50 (mín. 4,5 párrafo / 3 h1) | secondary-container (mín. 3) |
|:--|:--|:--|:--|
| 1280×800 | `/45` · `/55` · `/65` | 4,50 · 5,58 · 6,96 | 3,17 · 3,92 · 4,90 |
| 1024×768 | `/45` · `/55` · `/65` | 4,52 · 5,60 · 6,98 | 3,18 · 3,94 · 4,91 |
| 412×915 | `/45` · `/55` · `/65` | 4,92 · 6,02 · 7,40 | 3,46 · 4,23 · 5,21 |
| 360×740 | `/45` · `/55` · `/65` | 4,88 · 5,98 · 7,36 | 3,44 · 4,20 · 5,18 |

---

## 3. Cambios realizados (por archivo)

### 3.1 `index.html` (solo `<section id="titular">`; hunks en las líneas 242-300)

Evidencia por `git diff -U0`: `@@ -242,53 +242,59 @@` y `@@ -296,9 +301,0 @@`; ambos dentro del Hero.

- **Se mantienen:** `id="titular"`, `-mt-20`, `overflow-hidden`, `bg-dark-background`, `text-dark-on-background`,
  `min-h-[92vh]`. La alineación de la sección pasa de `flex flex-col justify-between` a `flex items-center justify-center`.
- **Se eliminan:** `div role="img"` con `aria-label` en inglés y `style=`, `opacity-45`, `scale-105`,
  `transition-transform`, los 2 `div` de degradados, el espaciador, el logotipo y su comentario, y la franja
  `bg-dark-background/80 backdrop-blur-sm` (conservando su contenido, ver D1).
- **Se agrega:**
  - `<picture>` con `<source media="(orientation: portrait)" srcset="./public/images/hero-botanical-mobile.webp"
    type="image/webp" width="1536" height="2752">` y `<img src="./public/images/hero-botanical-desktop.webp" width="2752"
    height="1536" fetchpriority="high" decoding="async" class="absolute inset-0 w-full h-full object-cover">` (D3: dimensiones
    reales de los archivos definitivos).
  - Contenedor `relative z-10 w-full max-w-4xl mx-auto px-margin-mobile lg:px-margin-desktop pt-24 pb-space-8`.
  - Tarjeta `hero-glass flex flex-col items-center text-center gap-space-3 p-space-4 md:p-space-8 rounded-3xl border
    border-white/20 bg-dark-background/45 backdrop-blur-xl backdrop-saturate-150 shadow-2xl`.
- **Dentro de la tarjeta, en este orden:** `h1` (se quita `mb-space-4`; el `<span>` de `fx-starlight` queda idéntico),
  párrafo (`text-neutral-50`, sin `mb-space-6`, texto y `<em>` conservados), CTAs (`justify-center` agregado) y una
  última fila separada con `border-t border-white/20 pt-space-3` que contiene «Valdivia, Región de Los Ríos, Chile» y el
  enlace «Descubrir Más» (mismos textos, orden y destino `#servicios`).
- **Cambios de color aprobados:** texto de la fila inferior de `text-dark-neutral-100` a `text-neutral-50` (D1). El resto
  de las clases se conservó.
- **Corrección menor (D6):** el ícono de «Descubrir Más» recibe `motion-reduce:animate-none` junto a `animate-bounce`
  (DESIGN §12.4).
- **Fin de línea:** el archivo usa CRLF con BOM (se preservaron ambos; `git diff` no muestra ruido de fin de línea).

### 3.2 `src/css/input.css` (solo lo descrito en la Tarea 3)

Se insertó un bloque nuevo (21 líneas) **después de Starlight y antes del bloque del modal**, **fuera de `@layer`**
(desviación D2, ver §5.3):

```css
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .hero-glass {
        background-color: color-mix(in srgb, theme('colors.dark-background') 85%, transparent);
    }
}
```

No se tocó `fx-starlight`, `carousel-fade`, `.bg-noise` ni ningún otro bloque. No había `.bg-hero-botanical` que eliminar.

### 3.3 `dist/css/output.css`

Regenerado con `pnpm build` (SHA-256 `59a51b94…a572`). Autoprefixer expandió la condición de `@supports` agregando una
variante `-webkit-` duplicada; es equivalente.

---

## 4. Verificación de criterios de aceptación

**Método del render real:** Chrome 154 (`Chrome/154.0.8037.97`) *headless* controlado por CDP desde un script temporal
(en el *scratchpad*, fuera del repositorio) sobre un servidor `python -m http.server`. Viewports 320×640, 360×740,
412×915, 768×1024, 740×360, 1024×768 y 1280×800, en modo claro y oscuro (14 casos). Limitaciones declaradas:
(a) no son dispositivos reales; (b) se usó `--hide-scrollbars` (los anchos del viewport son exactos; en escritorio un
navegador real descontaría ~15 px por la barra); (c) el modo oscuro se fijó con `localStorage.theme` (el mismo mecanismo
de `theme.js`) más `prefers-color-scheme`; (d) revisé visualmente 3 capturas (1280×800 oscuro, 320×640 claro, 740×360
claro); las otras 11 se analizaron solo numéricamente.

### 4.1 Tabla de las Tareas 4 y 5

| Verificación | Estado | Evidencia |
|:--|:--|:--|
| `pnpm build` sin errores ni advertencias nuevas | ✅ confirmado por ejecución | Salida limpia salvo el aviso conocido de Browserslist. |
| Clases presentes en `output.css` | ✅ confirmado por búsqueda de texto | `.backdrop-blur-xl`, `.backdrop-saturate-150`, `.bg-dark-background\/45`, `.border-white\/20`, `.rounded-3xl`, `.shadow-2xl`, `.max-w-4xl`, `.pt-24`, `.motion-reduce\:animate-none`, `.hero-glass` (dentro de `@supports not`). |
| `.bg-hero-botanical` y `.opacity-45` ausentes | ✅ confirmado por búsqueda de texto | No existen en `output.css`; ningún otro archivo usa `opacity-45`. `.scale-105` sin prefijo ya no se emite (solo `group-hover:scale-105`). |
| Posición del respaldo `@supports` | ✅ confirmado por búsqueda de texto | Posición 30.158 del `@supports not` y 30.282 de `.hero-glass`, frente a 14.241 de `.bg-dark-background\/45`: el respaldo queda **después** de la utilidad. |
| `pnpm run build:cf` | ✅ confirmado por ejecución | «6 páginas y 3 directorios preparados en ./_site»; `_site/public/images/` contiene los dos WebP (0,152 y 0,182 MiB, límite 25 MiB). SHA de `_site/dist/css/output.css` idéntico al de `dist/`. |
| Invariantes del Hero por búsqueda | ✅ confirmado por código | `style=` 0, `onclick` 0, `<script` 0, `href="#"` 0, `la-jardinera-blanco` 0, `mix-blend` 0, `grayscale` 0, `brightness` 0, `bg-gradient` 0, `scale-` 0, `fixed` 0, `role="img"` 0. Hay 1 `opacity-`: es el `hover:opacity-90` preexistente del botón «Explorar Servicios» (no actúa sobre la foto). |
| Invariantes globales | ✅ confirmado por código | 1 solo `<h1>`; 1 solo `fetchpriority="high"` en toda la página (el `<img>` del Hero); IDs únicos; 0 `fixed` en descendientes del header; `#mobile-menu-scrim` sigue hermano posterior de `</header>`; header con sus 2 logotipos (claro y blanco). |
| `alt` y `aria-label` del Hero en español | ✅ confirmado por código | `alt` en español de Chile; `aria-label="Desplazarse a servicios"`. |
| Texto accesible del `h1` y marcado `fx-starlight` | ✅ confirmado por código | «Florería La Jardinera»; el `<span>` interno es idéntico al original (comparación de cadena exacta). |
| Alcance (`git diff` de lectura) | ✅ confirmado por código | `index.html` solo en `#titular`; `input.css` +21 líneas; `output.css` regenerado. Header, footer, resto del Inicio y las otras 5 páginas sin cambios. |
| Imagen correcta por orientación, `currentSrc` | ✅ confirmado en render real | Ver §4.3 (14 casos). |
| Colores vivos (cómputo de estilos) | ✅ confirmado en render real | En los 14 casos, ningún elemento de `#titular` tiene `opacity` distinto de 1, `mix-blend-mode` ni degradado sobre la foto. Solo se marcan los dos `span.fx-starlight` (`filter: drop-shadow` y degradado, ambos propios del texto con `background-clip`). |
| Colores vivos (píxeles) | ✅ confirmado en render real | Fuera de la tarjeta y del header, la diferencia media contra el WebP de origen es de 1,96 a 7,07 sobre 255, y el brillo medio del render es el 94,6 % al 98,8 % del origen (un oscurecido del 45 % daría decenas de niveles). La diferencia residual es coherente con el remuestreo y con la sombra de la tarjeta (inferencia, no se aisló). |
| Difuminado | ✅ confirmado en render real | `backdrop-filter` computado: `blur(24px) saturate(1.5)` en los 14 casos; fondo `rgba(31, 36, 33, 0.45)`; borde de 1 px. Se aprecia en las 3 capturas revisadas. |
| Sin desborde de texto | ✅ confirmado en render real | `h1`, párrafo, fila de ubicación y CTAs sin texto fuera del área interior de la tarjeta en los 14 casos; `h1.scrollWidth = clientWidth`. |
| Sin scroll horizontal | ⚠️ con reservas | 13 de 14 casos con `scrollWidth = clientWidth`. A 768×1024 es 772/768, **igual que en `HEAD`** y fuera del Hero (§5.2, H4). |
| Movimiento reducido | ✅ confirmado en render real | Con `prefers-reduced-motion: reduce` (1280×800 y 412×915): `getAnimations()` de `#titular` = `[]`, `fx-starlight` con `animation-name: none` y `--ink-3 = --ink` (`#f8f7f3`), y el ícono de «Descubrir Más» sin `bounce`. Con movimiento normal hay 3 animaciones (`fx-starlight` ×2 y `bounce`). |
| Consola | ✅ confirmado en render real | 0 excepciones, 0 `console.error/warning`, 0 entradas de `Log` con nivel error o advertencia y 0 respuestas HTTP ≥400, en las 16 cargas (14 + 2 de movimiento reducido). |
| CLS = 0 en el Hero | ⚠️ no demostrado | Se midieron entradas de `layout-shift` de 0,0035 a 0,0092 por cambio de fuente web (§5.2, H5). La imagen no produce desplazamientos. |
| Lighthouse (Performance, LCP) | 🕒 PENDIENTE | No hay Lighthouse instalado y no se pueden agregar dependencias. Ver lista manual (§4.5). |

### 4.2 Contraste medido con píxeles reales (Tarea 5, punto 4)

**Método:** captura con el contenido de la tarjeta oculto (`visibility: hidden`, inyectado por CDP, sin guardarlo en el
repo), región interior de la tarjeta (descontando 12 px de borde y esquinas redondeadas), luminancia relativa WCAG y
**percentil 95 más claro**. Tinte medido: **`bg-dark-background/45`** (el mínimo; no hubo que subir en la escala).

**Métrica de la especificación: p95 del área completa de la tarjeta.** Resultados idénticos en modo claro y oscuro (el Hero
es un bloque de contraste fijo).

| Viewport | L p95 | Párrafo y h1 línea 1, neutral-50 (mín. 4,5 / 3) | h1 línea 2, secondary-container (mín. 3) |
|:--|:--|:--|:--|
| 320×640 | 0,126 | 5,58:1 ✅ | 3,93:1 ✅ |
| 360×740 | 0,142 | 5,10:1 ✅ | 3,59:1 ✅ |
| 412×915 | 0,154 | 4,79:1 ✅ | 3,37:1 ✅ |
| 768×1024 | 0,164 | **4,57:1** ✅ (peor caso) | **3,22:1** ✅ (peor caso) |
| 740×360 | 0,154 | 4,81:1 ✅ | 3,38:1 ✅ |
| 1024×768 | 0,163 | 4,60:1 ✅ | 3,24:1 ✅ |
| 1280×800 | 0,164 | 4,58:1 ✅ | 3,22:1 ✅ |

**Medición local, más estricta** (p95 del fondo en el rectángulo real de cada línea o elemento; mismo resultado en ambos temas):

| Viewport | Párrafo (≥4,5) | h1 «Florería» (≥3) | h1 «La Jardinera» (≥3) | Fila de ubicación (≥4,5) | «Descubrir Más» (≥4,5) | «Suscripción Floral» (≥4,5) |
|:--|:--|:--|:--|:--|:--|:--|
| 320×640 | 5,65 | 6,52 | 3,84 | 8,04 | 9,36 | 6,74 |
| 360×740 | 5,49 | 4,83 | 3,51 | 6,53 | 9,71 | 6,39 |
| 412×915 | 5,21 | 4,29 | 3,84 | 5,11 | 8,81 | 6,60 |
| 768×1024 | **4,62** | 7,88 | 3,81 | 4,72 | 4,86 | 6,80 |
| 740×360 | 4,77 | 4,12 | 4,74 | 5,43 | 6,12 | 6,68 |
| 1024×768 | 4,65 | 4,31 | 3,87 | 5,01 | 5,35 | 6,57 |
| 1280×800 | 4,63 | 4,40 | 3,81 | 4,96 | 5,27 | 6,58 |

«Explorar Servicios» (relleno `#316944` con `neutral-50`): 6,06:1 en todos los casos.

- **Cumple en todos los viewports y temas con `/45`.** No se usó la escala `/55` ni `/65`.
- **Margen estrecho:** el párrafo queda entre 4,57:1 y 4,62:1 frente al mínimo de 4,5:1 en los viewports anchos. Cualquier
  cambio de fotografía obliga a volver a medir.
- **Nota metodológica:** una primera lectura que usaba el rectángulo completo del `h1` (mezclando sus dos líneas)
  arrojó 2,88:1 para «La Jardinera» a 412×915. Era un artefacto: el rectángulo incluye la línea clara; medida línea a línea,
  esa línea queda en 3,84:1. Se conserva aquí porque explica la diferencia entre mediciones.
- Los botones no necesitaron corrección. El botón «Vidrio» («Suscripción Floral») mide entre 6,39:1 y 6,80:1; no hay
  propuesta de cambio de contraste para él (sí un hallazgo sobre su `backdrop-blur-md`, §5.2, H7).

**Header sobre la nueva fotografía (Tarea 5, punto 6)** — enlace activo «Inicio» con el texto oculto, peor caso entre p5 y
p95 del fondo en su rectángulo. Solo se ve la barra de navegación desde 1024 px (por debajo, los enlaces viven en el
panel móvil, que es sólido y no depende de la foto).

| Viewport | Modo claro (`#316944`) | Modo oscuro (`#8CC79A`) |
|:--|:--|:--|
| 1024×768 | 4,85:1 ✅ (mediana 4,95) | 5,86:1 ✅ (mediana 6,14) |
| 1280×800 | 4,82:1 ✅ (mediana 4,88) | 6,15:1 ✅ (mediana 6,29) |

El header sigue legible en ambos temas. En modo claro el margen sobre 4,5:1 es de solo 0,32, porque la superficie
`bg-surface/80` deja pasar parte de la foto clara.

### 4.3 Imagen por orientación y atributos (Escenario 4)

| Viewport | Orientación | `currentSrc` | Tamaño natural | `<img>` w×h | `<source>` w×h |
|:--|:--|:--|:--|:--|:--|
| 320×640, 360×740, 412×915, 768×1024 | vertical | `hero-botanical-mobile.webp` | 1536×2752 | 2752×1536 | 1536×2752 |
| 740×360, 1024×768, 1280×800 | horizontal | `hero-botanical-desktop.webp` | 2752×1536 | 2752×1536 | 1536×2752 |

Igual en claro y oscuro. `fetchpriority="high"` solo en el `<img>` del Hero (1 en toda la página).

### 4.4 Geometría de la tarjeta («cabe sin recortes»)

| Viewport | Alto del viewport | Alto de la sección | Alto de la tarjeta (y inicial → final) | Holgura bajo la tarjeta |
|:--|:--|:--|:--|:--|
| 320×640 | 640 | 950 | 790 (96 → 886) | 64 |
| 360×740 | 740 | 853 | 693 (96 → 789) | 64 |
| 412×915 | 915 | 842 | 614 (130 → 744) | 98 |
| 768×1024 | 1024 | 942 | 435 (270 → 704) | 238 |
| 740×360 | 360 | 531 | 371 (96 → 467) | 64 |
| 1024×768 | 768 | 707 | 459 (140 → 599) | 108 |
| 1280×800 | 800 | 736 | 459 (155 → 613) | 123 |

La tarjeta queda **completa dentro de la sección y sin recortes** en 740×360 y 320×640: la sección (`min-h-[92vh]`) crece
con el contenido y no hay texto fuera de la tarjeta. Por eso **no se compactaron paddings ni gaps** (D1 lo condicionaba a que
no cupiera). Se interpretó «cabe» como «sin recortes», no como «cabe en el alto del viewport»: a 320×640 la tarjeta mide 790 px
y a 740×360 mide 371 px, por lo que en ambos hay que desplazarse para ver el final. A 320 px el titular se parte en tres
líneas («Florería / La / Jardinera») sin desbordar.

### 4.5 Lista manual (Tarea 6) — pendiente en dispositivo real

Lo anterior se verificó en Chrome *headless*. Siguen `🕒 PENDIENTE` para el desarrollador, en dispositivos o navegadores reales:

* [ ] En los 7 viewports y ambos temas: la foto se ve viva y la tarjeta difumina el fondo (revisión visual de las 14 combinaciones).
* [ ] En móvil vertical se ve el WebP vertical y en escritorio el horizontal (confirmado por `currentSrc` en *headless*; falta verlo en un teléfono real).
* [ ] El texto de la tarjeta se lee sobre la zona más clara de la foto, en un teléfono real y a pleno sol.
* [ ] Safari/iOS: `backdrop-filter` activo (se usa `-webkit-backdrop-filter` por Autoprefixer) y `<picture>` con `media="(orientation: portrait)"` eligiendo la imagen correcta al rotar.
* [ ] Lighthouse (Performance, LCP, CLS) en el sitio desplegado, antes y después.

### 4.6 Escenarios de la especificación

| Escenario | Estado | Evidencia |
|:--|:--|:--|
| 1. Colores vivos | ✅ (render real) | §4.1: 0 elementos con opacidad, mezcla o degradado oscuro sobre la foto en 14 casos; diferencia de píxeles 1,96–7,07/255 contra el WebP de origen. |
| 2. Tarjeta de vidrio | ✅ (render real) | `backdrop-filter: blur(24px) saturate(1.5)`; la tarjeta contiene titular, párrafo, 2 CTAs y la fila de ubicación. Revisión visual de 3 capturas. |
| 3. Logotipo fuera del Hero | ✅ (código y render real) | 0 `la-jardinera-blanco` en el Hero; el header mantiene sus 2 imágenes (original y blanco) en ambos temas, y el logotipo claro y el blanco se ven en las capturas de claro y oscuro respectivamente. |
| 4. Dirección de arte | ✅ (render real) | §4.3: `currentSrc` correcto en 14 casos; `width`/`height` declarados; `fetchpriority="high"` solo en el `<img>` del Hero. |
| 5. Legibilidad | ✅ (render real) | §4.2: párrafo ≥4,57:1 y `h1` ≥3,22:1 (métrica de la especificación) en los 7 viewports y ambos temas, con `/45`. |
| 6. Paridad de temas y sin regresión | ⚠️ con reservas | Paridad por píxeles: **diferencia 0** entre claro y oscuro en las 7 resoluciones (con texto e íconos ocultos, sin el header). **Excepción:** el ícono de ubicación usa `text-primary` y sí cambia de color entre temas (§5.2, H3). Sin scroll horizontal salvo los 4 px preexistentes a 768×1024 (H4). Consola limpia. `pnpm build` y `pnpm run build:cf` sin advertencias nuevas. El resto de la página no cambió. |
| 7. Honestidad de la evidencia | ✅ | Lighthouse y la revisión en dispositivo real constan como `🕒 PENDIENTE` con su lista manual; ninguna cifra se estima como medida (las pre-estimaciones están rotuladas como tales). |

---

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

### 5.1 Decisiones del desarrollador aplicadas

| ID | Decisión | Aplicación |
|:--|:--|:--|
| D1 | Mover la fila de ubicación y «Descubrir Más» dentro de la tarjeta, separada con `border-t border-white/20` y padding superior; eliminar la franja `bg-dark-background/80 backdrop-blur-sm`; texto a `text-neutral-50`. | Aplicada (§3.1). |
| D2 | Respaldo `@supports not` en un bloque propio fuera de `@layer`, después de Starlight. | Aplicada; ver la desviación abajo. |
| D3 | `width`/`height` con las dimensiones reales de los archivos actuales. | Aplicada: 2752×1536 y 1536×2752. |
| D4 | Imágenes reemplazadas: repetir la Tarea 1 y la pre-estimación; aceptar dimensiones reales si el peso cumple. | Aplicada (§2.2 y §2.3). |
| D5 | Dejar `rounded-3xl` y `shadow-2xl`; proponer la excepción frente a DESIGN §4.3 y §4.4. | Aplicada; propuesta en §6.3. |
| D6 | `motion-reduce:animate-none` en el ícono de «Descubrir Más». | Aplicada. **Corrección menor dentro de `#titular`.** |

### 5.2 Hallazgos (no se corrigen en esta iteración)

| ID | Hallazgo | Detalle |
|:--|:--|:--|
| H1 | Dimensiones y proporciones de las imágenes distintas de la tabla de la especificación. | Aceptado por el desarrollador (D4). Informativo. El WebP vertical pesa 186,1 KB (objetivo ≤180 KB; +3,4 %, dentro de la tolerancia). |
| H2 | `public/images/hero-botanical.webp` queda sin uso. | 443,7 KB, 5504×3072 VP8. Ninguna página lo referencia (`og:image` tampoco existe). Solo lo mencionan documentos de `_planificacion/`. Sigue copiándose a `_site/public/images/` y se desplegará. El desarrollador decide si lo retira (`git rm public/images/hero-botanical.webp`; comando propuesto, no ejecutado). |
| H3 | **El ícono de ubicación difiere entre temas y es casi invisible en modo claro.** | El `<svg>` de la fila de ubicación conserva `text-primary` (token reactivo, preexistente). Sobre la tarjeta mide **1,05–1,38:1 en modo claro** (`#316944` sobre vidrio oscuro) y 2,60–4,58:1 en oscuro (`#8CC79A`). Es decorativo, pero rompe la paridad del Escenario 6 y DESIGN §3 (primer plano congelado en bloque fijo). **Propuesta, no aplicada** (la regla era conservar clases): cambiar a `text-neutral-50` (o `text-primary-fixed`) y agregarle `aria-hidden="true"`. |
| H4 | Scroll horizontal de 4 px a 768×1024 (`scrollWidth` 772 sobre 768). | **Preexistente: `HEAD` da el mismo 772/768.** Fuera de `#titular`. La geometría apunta al distintivo decorativo `absolute -bottom-4 -right-4 md:bottom-6` de `#suscripcion` (borde derecho en 772). La atribución es por inspección de coordenadas; no se comprobó eliminándolo. Se corrige en otra iteración. |
| H5 | CLS distinto de 0 (0,0035 a 0,0092). | Se midió con `PerformanceObserver` y atribución de nodos: son los reflujos por **cambio de fuente web** (Noto Serif y Montserrat con `swap`) del `h1`, el nav y los botones. **`HEAD` muestra el mismo patrón** (320: 0,0069; 768: 0,0019; 1024: 0,0070; 1280: 0,0034–0,0041; con Hero nuevo: 0,0092; 0,0046; 0,0080; 0,0035–0,0041). La imagen del Hero no desplaza nada (es `absolute inset-0`). Medido en *headless* local, sin *throttling*: no equivale a Lighthouse. Quedó algo más alto que `HEAD` en 320, 768 y 1024 (hasta +0,003), sin causa aislada. |
| H6 | `hover:text-neutral-50` queda inerte en «Descubrir Más». | El color base pasó a `text-neutral-50` (D1), igual al de hover; el enlace ya no cambia de color al pasar el cursor. Propuesta: `hover:text-secondary-container`. |
| H7 | Desenfoque anidado en el botón «Suscripción Floral». | Conserva `backdrop-blur-md` dentro de una tarjeta con `backdrop-blur-xl`. Por la especificación de `backdrop-filter`, la tarjeta actúa como raíz de fondo y el desenfoque del botón no vería la foto, por lo que sería visualmente inerte (inferencia: no se aisló en render). De todos modos contradice el criterio de D1 («no puede quedar un desenfoque anidado dentro del otro»), que se aplicó a la franja y no a este botón (regla «conservar clases»). Propuesta: quitar `backdrop-blur-md` de ese enlace. |
| H8 | Los botones del Hero no declaran `focus-visible`. | DESIGN §11.3 y §14.3 lo exigen. Se mantiene el anillo nativo del navegador porque no hay `outline-none`. Preexistente. |
| H9 | El ícono de ubicación parece achicarse a 320 px (observado en la captura; no medido). | El `<svg>` está dentro de un `flex` sin `shrink-0`. Preexistente. |

### 5.3 Desviaciones respecto de la especificación (`iteracion-08.md`) — a corregir por el desarrollador

1. **Tarea 3: el respaldo `@supports not` no puede ir dentro de `@layer components`.** La utilidad `bg-dark-background/45` pertenece a
   la capa de utilidades, que Tailwind emite **después** de los componentes; con el mismo peso de especificidad ganaría la utilidad y
   el respaldo nunca se aplicaría. Se colocó en un bloque propio fuera de `@layer`, después de Starlight (como ya hacen
   Starlight y el modal), y se verificó por posición en `output.css` (§4.1). **Corregir el texto de la Tarea 3, punto 1.**
2. **Tarea 0 (punto 4) y Tarea 2 (regla 6) no contemplan la franja «Hero Meta Footer»** (`bg-dark-background/80 backdrop-blur-sm`,
   fuera del bloque de contenido). Con el marcado objetivo (`flex items-center justify-center`) no puede seguir como barra
   inferior, y como oscurecido al 80 % contradice el Escenario 1. Se resolvió con D1. **Agregar a la especificación.**
3. **Tabla de imágenes:** las dimensiones y pesos de la directiva no coinciden con los archivos definitivos (2752×1536 y
   1536×2752). **Actualizar la tabla** y los atributos `width`/`height` del marcado objetivo.
4. **Tarea 5, punto 4:** conviene definir la medición **por línea de texto** (y no solo el p95 de toda la tarjeta), porque el
   promedio de la tarjeta oculta zonas locales más claras (§4.2).
5. **Escenario 6** exige un Hero «visualmente idéntico» entre temas, pero el marcado heredado incluye un ícono con `text-primary`
   (H3). Agregar el ícono a la lista de elementos que deben llevar token estático.

### 5.4 Acciones pendientes del desarrollador

* Decidir H3 (ícono), H6 (hover), H7 (`backdrop-blur-md` anidado) y H2 (retirar `hero-botanical.webp`).
* Ejecutar Lighthouse y la lista manual de la §4.5.
* Aplicar las propuestas de la §6 (`DESIGN.md`, `iteracion-03.md` de la Épica 07, `definicion-epica.md`).
* Cambios previos **ajenos a esta iteración** que ya estaban en el árbol de trabajo y no se tocaron:
  `_planificacion/01-vision/objetivos-y-metricas.md` (modificado) e `iteracion-08.md` (añadido al índice).

---

## 6. Archivos modificados y propuestas para archivos protegidos

### 6.1 Archivos modificados por esta iteración

| Archivo | Cambio |
|:--|:--|
| `index.html` | Solo `<section id="titular">` (hunks 242-300). |
| `src/css/input.css` | +21 líneas: bloque `.hero-glass` con el respaldo `@supports not` (fuera de `@layer`). |
| `dist/css/output.css` | Regenerado (`pnpm build`). |
| `_planificacion/04-bitacora/bitacora-epica-01/bitacora-iteracion-08.md` | Este documento. |
| `_planificacion/04-bitacora/estado-actual.md` | Una línea nueva al final. |

No se modificaron ni crearon imágenes, `AGENTS.md`, `README.md`, `DESIGN.md`, `tailwind.config.js`, `package.json` ni otras páginas.
No se ejecutó ningún comando de Git que modifique el repositorio. `_site/` (ignorado por Git) se regeneró con `build:cf`.

### 6.2 Anexo A: parche a la Épica 07 · Iteración 03 (`iteracion-03.md`) — lo aplica el desarrollador

La Iteración 08 ya se ejecutó, así que el parche aplica. Estado verificado: `index.html` tiene ahora **1** `style=` (`:801`).

1. **Directiva de inicio:** agregar al final: *«Prerrequisito: la Épica 01 · Iteración 08 reemplazó el fondo CSS del Hero por
   `<picture>`. El Hero ya no tiene `style=` ni usa `.bg-hero-botanical`.»*
2. **Tarea 0, punto 2:** el conteo esperado de `style="` baja de cinco a **cuatro** (solo la textura de ruido de los cuatro banners).
3. **Tarea 2, primer párrafo:** «Hay cinco `style=`…» pasa a «Hay **cuatro** `style=`: la textura de ruido del banner en `index.html`,
   `servicios.html`, `suscripcion-floral.html` y `galeria.html`».
4. **Tarea 2, punto 2:** eliminar del bloque CSS la regla `.bg-hero-botanical` y su comentario (queda solo `.bg-noise`).
5. **Tarea 2, punto 4 (Hero de `index.html`):** eliminarlo completo.
6. **Tarea 2, punto 5:** quitar la verificación de `.bg-hero-botanical` en `output.css`.
7. **Tarea 7, hallazgo 1:** reemplazar por *«Resuelto en la Épica 01 · Iteración 08: el Hero usa `<img fetchpriority="high">` dentro de `<picture>`.»*
8. **Tarea 8, tabla de la bitácora:** DT-03 se evidencia con «4 `style=` resueltos; el del Hero se resolvió en la Épica 01 · Iteración 08».

### 6.3 Anexo C: propuestas de edición para `DESIGN.md` (solo lectura para el agente)

### Propuesta de edición — `DESIGN.md`
**Sección:** §3 Tokens de contraste fijo
**Motivo:** el Hero deja de llevar *scrims*; hay que documentar que la legibilidad la da la tarjeta y que todo su primer plano debe ser estático.
```diff
 Estos tokens **no** pertenecen al sistema reactivo: estilizan bloques oscuros en ambos temas porque tienen fotografía o
 fondo fijo (Hero del Inicio, capítulo "Novias MaGu" de la Galería, visor Lightbox, rótulo del modal de servicio). El
 prefijo `dark-` es heredado; conceptualmente significa "contraste fijo", no "modo oscuro".
+
+**Hero sin *scrims*:** desde la Épica 01 · Iteración 08 la fotografía del Hero se muestra a pleno color: sin capa de
+oscurecido, degradados, opacidad ni mezcla. La legibilidad la garantiza la tarjeta de vidrio (§11.7), no un oscurecido
+sobre la imagen. Todo primer plano dentro de la tarjeta usa tokens estáticos (nunca `text-primary`), para que el Hero
+se vea idéntico en ambos temas.
```

### Propuesta de edición — `DESIGN.md`
**Sección:** §4.3 Radios y §4.4 Sombras (excepción documentada, D5)
**Motivo:** `rounded-3xl` y `shadow-2xl` se usan en la tarjeta de vidrio del Hero y no figuran para ese uso (§4.3 asigna `rounded-xl` a tarjetas; §4.4 reserva `shadow-2xl` a modales).
```diff
 | `rounded-2xl`   | 1 rem    | Valor por defecto de Tailwind (no redefinido): formulario de contacto, hoja del modal. |
+| `rounded-3xl`   | 1,5 rem  | Valor por defecto de Tailwind. Excepción: tarjeta de vidrio del Hero (§11.7). |
```
```diff
 | Modales                     | `shadow-2xl`                                    |
+| Tarjeta de vidrio del Hero  | `shadow-2xl` (excepción, §11.7)                 |
```

### Propuesta de edición — `DESIGN.md`
**Sección:** §11 Otros componentes → nueva subsección 11.7
**Motivo:** documentar la tarjeta, la regla del tinte mínimo medido y el respaldo sin `backdrop-filter`.
````diff
+### 11.7 Tarjeta de vidrio del Hero
+
+Contenedor del contenido del Hero del Inicio (titular, párrafo, botones y fila de ubicación) sobre la fotografía a pleno color.
+
+```html
+<div class="hero-glass flex flex-col items-center text-center gap-space-3 p-space-4 md:p-space-8 rounded-3xl border border-white/20 bg-dark-background/45 backdrop-blur-xl backdrop-saturate-150 shadow-2xl">
+```
+
+- **Tinte mínimo medido:** `bg-dark-background/45`. Si una foto nueva no cumple (párrafo 4,5:1 y titular 3:1, p95 del área bajo
+  el texto), se sube a `/55` y luego a `/65`; con `/65` sin cumplir, el problema es la fotografía. Medición actual con `/45`:
+  párrafo ≥ 4,57:1 y titular ≥ 3,22:1 en los 7 viewports.
+- **Primer plano:** todo texto e ícono dentro de la tarjeta usa `text-neutral-50` o tokens estáticos. Prohibido `text-primary`
+  y cualquier token reactivo (rompe la paridad entre temas).
+- **Sin desenfoque anidado:** ningún descendiente de la tarjeta lleva `backdrop-blur-*`.
+- **Fila inferior:** separada con `border-t border-white/20 pt-space-3`.
+- **Respaldo:** `@supports not (backdrop-filter…)` en `input.css`, **fuera de `@layer`** (las utilidades se emiten después
+  de los componentes y anularían un respaldo dentro de la capa); sube el fondo a `dark-background` al 85 %.
+- **Excepciones documentadas:** `rounded-3xl` (§4.3) y `shadow-2xl` (§4.4).
````

### Propuesta de edición — `DESIGN.md`
**Sección:** §13 Iconografía e imágenes
**Motivo:** documentar la dirección de arte del Hero.
```diff
 - **Imágenes:** `.webp` en `public/images/<sección>/`, videos `.mp4` en `public/images/galeria/`. Siempre con `width`,
   `height` y `alt`. `fetchpriority="high"` para la imagen principal sobre el pliegue; `loading="lazy"` para el resto.
   Contenedor con `aspect-*` y `object-cover` para CLS = 0.
+- **Hero con dirección de arte:** `<picture>` con `<source media="(orientation: portrait)">` (vertical, 9:16) e `<img>`
+  horizontal (16:9) con `fetchpriority="high"`. Los atributos `width`/`height` declaran el tamaño real de cada archivo.
+  Referencia vigente: 2752×1536 (~155 KB) y 1536×2752 (~186 KB), WebP con pérdida. Elegir fotos cuya zona central
+  tenga luminosidad media o baja, para que la tarjeta cumpla el contraste con el tinte mínimo.
```

### Propuesta de edición — `DESIGN.md`
**Sección:** §15 Registro de cambios
```diff
+- **Épica 01 · Iteración 08:** Hero a pleno color, tarjeta de vidrio y retiro del logotipo.
```

### 6.4 Anexo B: registro en `definicion-epica.md` — lo aplica el desarrollador

Agregar al final de `_planificacion/03-planificacion/epicas/epica-01-inicio/definicion-epica.md`, sin modificar el DoD original:

```markdown
## 4. Extensiones posteriores al cierre

| Iteración | Tipo                      | Entregable                                                                                  | Estado |
|:----------|:--------------------------|:--------------------------------------------------------------------------------------------|:-------|
| 08        | Extensión no planificada  | Hero vivo: fotografía a pleno color, tarjeta de vidrio y retiro del logotipo (comentarios de la clienta) | 🕒 Completada con reservas (Lighthouse y revisión en dispositivo real pendientes) |

Estas extensiones no reabren el DoD de la Épica 01; el estado de la épica sigue siendo "cerrada".
```

### 6.5 Propuesta para `decisiones-tecnicas.md` (no estaba autorizado a editarlo)

*«Épica 01 · It. 08 — Respaldo `@supports not (backdrop-filter…)` de `.hero-glass` fuera de `@layer`: las utilidades de Tailwind se emiten
después de los componentes, por lo que un respaldo dentro de la capa quedaba anulado por `bg-dark-background/45`. Tinte mínimo
`/45` por medición (p95 de la tarjeta). Excepciones de `rounded-3xl` y `shadow-2xl` para la tarjeta de vidrio.»*

---

## 7. Mensaje de commit sugerido

```text
feat(hero): fotografía a pleno color, tarjeta de vidrio y retiro del logotipo

- Reemplaza el fondo CSS (style=) por <picture> con dirección de arte vertical y horizontal
- Retira degradados, opacidad y el logotipo duplicado; fx-starlight queda idéntico
- Agrupa titular, párrafo, botones y fila de ubicación en una tarjeta con backdrop-blur-xl
  (tinte /45, contraste AA medido en 7 viewports y ambos temas)
- Agrega el respaldo @supports de .hero-glass fuera de @layer para que no lo anule la utilidad
- Aplica motion-reduce:animate-none al ícono de "Descubrir Más"
- Incorpora las imágenes hero-botanical-desktop.webp y hero-botanical-mobile.webp
- Registra la iteración en la bitácora y en estado-actual.md

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
```

Archivos para el commit: `index.html`, `src/css/input.css`, `dist/css/output.css`, las dos imágenes nuevas,
`_planificacion/04-bitacora/bitacora-epica-01/bitacora-iteracion-08.md`, `_planificacion/04-bitacora/estado-actual.md` y
`_planificacion/03-planificacion/epicas/epica-01-inicio/iteracion-08.md`. Conviene dejar `objetivos-y-metricas.md` en un commit aparte.
