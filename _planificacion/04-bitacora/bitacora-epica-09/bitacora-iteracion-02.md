# Bitácora de Ejecución - Épica 09 - Iteración 02

**Fecha de ejecución:** 24-10-2026
**Agente:** Claude Code
**Objetivo:** Carrusel automático de 4 fotografías en el hero del Inicio, SM-01 (hero móvil) y ADR-004.

## 1. Resumen ejecutivo

* Carrusel implementado (4 `<picture>`, módulo `hero-carousel.js`, botón de pausa, pausas automáticas, movimiento
  reducido) y verificado en Chrome *headless* [render]. SM-01 aplicada solo bajo 768 px; desde 768 px el hero mide igual
  que la línea base [medido].
* 8 imágenes en `public/images/inicio/`, todas bajo el tope; 5 archivos antiguos retirados; 0 archivos con espacios o
  paréntesis en `public/` [medido].
* **Contraste: NO cumple con `/45` en 11 de 140 mediciones de texto** (9 de la foto 4, 1 de la foto 2 y 1 de la foto 3).
  No se cambió el tinte: la decisión queda para el desarrollador (§5.1). Con `/55` queda 1 incumplimiento y con `/65`, 0
  (simulación).
* Estado propuesto en la ejecución: **En revisión**, a la espera de la decisión de contraste. **Estado tras el cierre
  (§8): Completada con reservas**, con tinte `/60` (0 fallas de contraste), «Descubrir más» de 44 px y la foto 3 móvil
  sin deformación.

## 2. Línea base (estado previo)

* Rama `feat/revision-movil`, `git status` limpio, último commit `b1b087a`. `pnpm install --frozen-lockfile` sin
  cambios; `pnpm run build:cf`: 6 páginas y 111 archivos [medido]. Script del tema (ADR-003): SHA-256 `5b490c26…` en las
  6 páginas, con el método de la Épica 08 (elemento `<script>` completo, 717 caracteres) [medido].
* **Orígenes (§1.1) [medido]:** dimensiones y pesos coinciden con la tabla (2752×1536 y 159.090 B; 1536×2752 y 190.564 B;
  2752×1536 y 730.586 B; 5504×3072 y 454.322 B; 2752×1536 y 410.010 B; los «KB» de la tabla son miles de bytes). La columna
  de luminosidad del centro no se pudo reproducir: con el promedio en gris del 25 % central da 87, 101, 73, 102 y 88
  (método de la tabla no documentado).
* Medición tipográfica, de tarjeta y de contraste de la línea base: §4.1 y §4.2. Carga: §4.3.
* Herramientas: Chrome *headless* con perfil aislado vía CDP (Python), `pnpm preview` en el puerto 4321, Pillow 10.4 para
  las imágenes. Scripts, capturas y copias de HTML fuera del repositorio.

## 3. Cambios realizados (por archivo)

* **`public/images/inicio/`** (nuevo): 8 WebP (tabla en §3.1). Retirados `hero-botanical.webp`,
  `hero-botanical-1 (1).webp`, `hero-botanical-1 (2).webp`, `hero-botanical-desktop.webp` y
  `hero-botanical-mobile.webp` (los dos últimos, copiados sin recomprimir a `hero-01-*`: SHA-256 idéntico).
* **`src/pages/index.astro`** (solo `#titular`): 4 `<picture class="hero-slide …">`; fotos 2 a 4 con `hidden` y
  `loading="lazy"`; botón `#hero-carousel-toggle`; SM-01 en el `h1`, el párrafo y la fila meta.
* **`src/css/input.css`**: bloque «CARRUSEL DEL HERO DEL INICIO» en `@layer components` (`.hero-slide`, `.is-active`,
  `.is-leaving`, `.is-instant`) y su `@media (prefers-reduced-motion: reduce)`.
* **`src/js/modules/hero-carousel.js`** (nuevo): `initHeroCarousel()`.
* **`src/js/main.js`**: importación y registro de `initHeroCarousel`.
* **`_planificacion/04-bitacora/decisiones-tecnicas.md`**: ADR-004.

### 3.1 Imágenes generadas [medido]

| Archivo | Dimensiones | Peso | Calidad WebP | Origen |
|:--|:--|--:|:--|:--|
| `hero-01-desktop.webp` | 2752×1536 | 159.090 B | sin recomprimir | `hero-botanical-desktop.webp` |
| `hero-01-mobile.webp` | 1536×2752 | 190.564 B | sin recomprimir | `hero-botanical-mobile.webp` |
| `hero-02-desktop.webp` | 2752×1536 | 244.562 B | 37 | `hero-botanical-1 (1).webp` recomprimido |
| `hero-02-mobile.webp` | 864×1536 | 84.726 B | 37 | recorte central nativo |
| `hero-03-desktop.webp` | 2752×1536 | 248.724 B | 73 | `hero-botanical.webp` reducido (Lanczos) |
| `hero-03-mobile.webp` | 1536×2752 | 189.106 B | 73 | recorte central 1728×3072 reducido |
| `hero-04-desktop.webp` | 2752×1536 | 237.402 B | 73 | `hero-botanical-1 (2).webp` recomprimido |
| `hero-04-mobile.webp` | 864×1536 | 78.314 B | 73 | recorte central nativo |

* Escritorio ≤ 300 KB y dentro del objetivo de 150 a 250 KB; móvil ≤ 200 KB; móviles 2 y 4 dentro de lo esperado (60 a
  100 KB).
* **Foto 2:** el peso venía del grano del fondo oscuro (q 50 = 344.546 B). Se usó q 37 tras comparar recortes al 100 %
  (original, q 37 y q 44): sin artefactos visibles; el grano se suaviza.
* **Foto 4:** el origen (410 KB) también superaba el tope de 300 KB, aunque §1.1 solo pedía recomprimir la foto 2; se
  recomprimió (q 73).
* Calidad elegida por búsqueda binaria: la mayor que cumple el objetivo; las móviles 2 y 4 usan la misma calidad que su
  versión de escritorio.
* **`alt` de D-08:** revisados contra las 8 imágenes; los 4 describen su foto, sin desajustes.

## 4. Verificación de criterios de aceptación

### 4.1 Tipografía y geometría (14 escenarios) [render]

| Viewport | Tema | `h1` antes (tamaño/alto, líneas) | `h1` después | Párrafo antes (tamaño/alto, líneas) | Párrafo después | Tarjeta antes → después (px) | Ubicación después | *Scroll* horizontal |
|:--|:--|:--|:--|:--|:--|:--|:--|:--|
| 320×640 | claro | 48px/48px, 3 | 32px/40px, 2 | 18px/29.25px, 9 | 16px/24px, 8 | 790 → 611 | oculta | 0 → 0 px |
| 360×740 | claro | 48px/48px, 2 | 32px/40px, 2 | 18px/29.25px, 8 | 16px/24px, 6 | 693 → 543 | oculta | 0 → 0 px |
| 412×915 | claro | 48px/48px, 2 | 32px/40px, 2 | 18px/29.25px, 6 | 16px/24px, 5 | 614 → 503 | oculta | 0 → 0 px |
| 768×1024 | claro | 48px/48px, 1 | 48px/48px, 1 | 18px/29.25px, 3 | 18px/29.25px, 3 | 435 → 435 | visible | 4 → 4 px |
| 740×360 | claro | 48px/48px, 1 | 32px/40px, 1 | 18px/29.25px, 3 | 16px/24px, 3 | 371 → 347 | oculta | 0 → 0 px |
| 1024×768 | claro | 64px/72px, 1 | 64px/72px, 1 | 18px/29.25px, 3 | 18px/29.25px, 3 | 459 → 459 | visible | 0 → 0 px |
| 1280×800 | claro | 64px/72px, 1 | 64px/72px, 1 | 18px/29.25px, 3 | 18px/29.25px, 3 | 459 → 459 | visible | 0 → 0 px |
| 320×640 | oscuro | 48px/48px, 3 | 32px/40px, 2 | 18px/29.25px, 9 | 16px/24px, 8 | 790 → 611 | oculta | 0 → 0 px |
| 360×740 | oscuro | 48px/48px, 2 | 32px/40px, 2 | 18px/29.25px, 8 | 16px/24px, 6 | 693 → 543 | oculta | 0 → 0 px |
| 412×915 | oscuro | 48px/48px, 2 | 32px/40px, 2 | 18px/29.25px, 6 | 16px/24px, 5 | 614 → 503 | oculta | 0 → 0 px |
| 768×1024 | oscuro | 48px/48px, 1 | 48px/48px, 1 | 18px/29.25px, 3 | 18px/29.25px, 3 | 435 → 435 | visible | 4 → 4 px |
| 740×360 | oscuro | 48px/48px, 1 | 32px/40px, 1 | 18px/29.25px, 3 | 16px/24px, 3 | 371 → 347 | oculta | 0 → 0 px |
| 1024×768 | oscuro | 64px/72px, 1 | 64px/72px, 1 | 18px/29.25px, 3 | 18px/29.25px, 3 | 459 → 459 | visible | 0 → 0 px |
| 1280×800 | oscuro | 64px/72px, 1 | 64px/72px, 1 | 18px/29.25px, 3 | 18px/29.25px, 3 | 459 → 459 | visible | 0 → 0 px |

* SM-01 aplicada en 320, 360, 412 y 740 px de ancho; 768, 1024 y 1280 idénticos a la línea base (tamaño, alto, peso,
  líneas, alto de la tarjeta y posición de «Descubrir más»). El `h1` no se corta en 320 px (2 líneas, sin desbordamiento).
  Pesos computados: `h1` 600 y párrafo 300 en los 14 casos.
* **`leading-none` sí anulaba el alto de línea del token** [código y render]: en Tailwind 3 las utilidades `leading-*` se
  emiten después de las `text-*`, así que `leading-none` habría dejado el `h1` móvil en 32/32 y `leading-relaxed` el
  párrafo en 16/26. Se cambiaron por `md:leading-none` y `md:leading-relaxed`: bajo `md` rige el token (32/40 y 16/24) y
  desde `md` el resultado es el de antes (48/48 y 18/29,25; desde `lg`, 64/72).
* **Mismo efecto con el peso** [render]: `md:text-headline-xl` y `md:text-body-lg` traen `fontWeight: 400` y, por ir en la
  variante `md`, anulaban `font-semibold` y `font-light` entre 768 y 1023 px (primera medición: `h1` a 400). Se agregaron
  `md:font-semibold` y `md:font-light`; segunda medición: 600 y 300.
* **«Descubrir más»:** centrado bajo `md` (desvío 0 px respecto del centro de la tarjeta) bajo el `border-t`; ícono y fila
  de ubicación con `display: none`, sin hueco. Objetivo táctil: **142 × 24 px**, igual que antes (cumple el mínimo de 24 px
  de WCAG 2.5.8, pero no los 44 px de `AGENTS.md` §5 regla 10). No se cambió: hallazgo H-03.
* **Botón de pausa:** 44 × 44 px, a 16 px del borde inferior del hero; separación con el borde inferior de la tarjeta: 4 px
  en 320×640, 360×740 y 740×360; 93 px en 412×915; 177 px en 768×1024; 47 px en 1024×768 y 62 px en 1280×800. No tapa la
  tarjeta ni «Descubrir más» en ningún viewport.

### 4.2 Contraste por foto [render]

Método de la Épica 01 · It. 08: texto e íconos del hero transparentes (CSS inyectado por CDP, sin guardar en el repo),
tarjeta y fondos de botones visibles, captura de `#titular` y percentil 95 de la luminancia en el rectángulo de cada línea
de texto (el `h1`, por línea **y por color**). Cada foto se fija pausando el carrusel y activando su capa. La línea base
reproduce las cifras de la It. 08 (p. ej., párrafo 4,54 a 4,57:1 y «La Jardinera» 3,85:1 a 768×1024).

Contraste (en la ejecución se informó «claro y oscuro idénticos», pero el tema oscuro no llegó a aplicarse; ver §8.4). Umbral: `h1` 3:1 (texto grande: 32 px semibold o 48/64 px); párrafo, «Descubrir más» y «Suscripción Floral» 4,5:1; ícono del botón 3:1 (WCAG 1.4.11, no textual). **Negrita = incumple.**

| Viewport | Foto | `h1` «Florería» (≥ 3) | `h1` «La Jardinera» (≥ 3) | Párrafo (≥ 4,5) | «Descubrir más» (≥ 4,5) | «Suscripción Floral» (≥ 4,5) | Ícono pausa (≥ 3) |
|:--|:--|:--|:--|:--|:--|:--|:--|
| 320×640 | 1 | 5,65 | 4,21 | 5,42 | 9,81 | 9,76 | 12,69 |
| 320×640 | 2 | 7,85 | 5,31 | 9,76 | 12,46 | 8,70 | 11,85 |
| 320×640 | 3 | 7,25 | 4,43 | 5,92 | 8,38 | 9,65 | 10,93 |
| 320×640 | 4 | 4,05 | **2,62** | **4,10** | 10,70 | 9,97 | 15,12 |
| 360×740 | 1 | 5,08 | 4,36 | 5,25 | 9,62 | 7,63 | 7,08 |
| 360×740 | 2 | 6,65 | 5,31 | 7,13 | 12,46 | 8,87 | 9,95 |
| 360×740 | 3 | 6,79 | 4,42 | 5,92 | 7,31 | 9,21 | 11,57 |
| 360×740 | 4 | 4,08 | **2,65** | **4,24** | 10,47 | 8,47 | 9,07 |
| 412×915 | 1 | 6,20 | 6,15 | 4,96 | 6,23 | 8,76 | 8,47 |
| 412×915 | 2 | 7,09 | 8,43 | 8,43 | 7,33 | 8,49 | 9,73 |
| 412×915 | 3 | 6,08 | 4,08 | 5,84 | 7,93 | 7,30 | 11,30 |
| 412×915 | 4 | 4,29 | **2,79** | **4,44** | 7,78 | 12,09 | 8,63 |
| 768×1024 | 1 | 7,89 | 3,81 | 4,54 | 4,89 | 7,87 | 11,10 |
| 768×1024 | 2 | 7,80 | 6,11 | 5,74 | **3,48** | 5,20 | 16,40 |
| 768×1024 | 3 | 6,25 | 3,88 | 5,12 | 6,94 | 10,45 | 3,85 |
| 768×1024 | 4 | 7,03 | 3,03 | 4,61 | 9,78 | 9,51 | 11,24 |
| 740×360 | 1 | 4,22 | 4,97 | 4,71 | 6,28 | 7,72 | 14,79 |
| 740×360 | 2 | 6,00 | 7,85 | 6,14 | 10,03 | 6,22 | 9,19 |
| 740×360 | 3 | 6,19 | 4,65 | **3,69** | 7,36 | 9,31 | 3,39 |
| 740×360 | 4 | 7,45 | **2,95** | 4,92 | 7,36 | 8,66 | 4,72 |
| 1024×768 | 1 | 4,31 | 3,87 | 4,60 | 5,33 | 7,72 | 14,75 |
| 1024×768 | 2 | 5,97 | 6,62 | 4,64 | 5,17 | 5,77 | 8,05 |
| 1024×768 | 3 | 5,93 | 4,33 | 4,81 | 8,58 | 8,43 | 3,28 |
| 1024×768 | 4 | 5,38 | **2,96** | 4,95 | 7,93 | 9,59 | 5,05 |
| 1280×800 | 1 | 4,39 | 3,80 | 4,58 | 5,27 | 7,81 | 14,61 |
| 1280×800 | 2 | 6,30 | 6,22 | 4,79 | 5,09 | 5,72 | 15,33 |
| 1280×800 | 3 | 5,91 | 4,34 | 5,34 | 8,92 | 8,40 | 3,46 |
| 1280×800 | 4 | 5,45 | **2,96** | 4,95 | 7,60 | 9,57 | 6,41 |

Línea base (foto actual, antes de SM-01), mismo método:

| Viewport | «Florería» | «La Jardinera» (DT-20) | Párrafo | «Descubrir más» | «Suscripción Floral» |
|:--|:--|:--|:--|:--|:--|
| 320×640 | 6,52 | 3,84 | 5,05 | 9,36 | 10,29 |
| 360×740 | 4,78 | 3,49 | 5,08 | 9,72 | 8,13 |
| 412×915 | 4,29 | 3,82 | 4,92 | 8,84 | 8,84 |
| 768×1024 | 7,88 | 3,85 | 4,54 | 4,89 | 7,87 |
| 740×360 | 4,12 | 4,73 | 4,69 | 6,12 | 7,63 |
| 1024×768 | 4,31 | 3,87 | 4,60 | 5,33 | 7,72 |
| 1280×800 | 4,39 | 3,80 | 4,58 | 5,27 | 7,81 |

Simulación del tinte (CSS inyectado solo en la medición; el repositorio sigue en `/45`): mínimos por foto.

| Tinte | Foto | «Florería» | «La Jardinera» | Párrafo | «Descubrir más» | Incumplimientos (de 140 mediciones de texto por tema) |
|:--|:--|:--|:--|:--|:--|:--|
| /45 | 1 | 4,22 | 3,80 | 4,54 | 4,89 | 0 |
| /45 | 2 | 5,97 | 5,31 | 4,64 | **3,48** | 1 |
| /45 | 3 | 5,91 | 3,88 | **3,69** | 6,94 | 1 |
| /45 | 4 | 4,05 | **2,62** | **4,10** | 7,36 | 9 |
| /55 | 1 | 5,20 | 4,55 | 5,58 | 5,93 | 0 |
| /55 | 2 | 7,05 | 5,98 | 5,66 | **4,46** | 1 |
| /55 | 3 | 7,02 | 4,62 | 4,65 | 8,03 | 0 |
| /55 | 4 | 5,06 | 3,29 | 5,10 | 8,37 | 0 |
| /65 | 1 | 6,67 | 5,58 | 7,02 | 7,39 | 0 |
| /65 | 2 | 8,50 | 6,95 | 7,12 | 5,83 | 0 |
| /65 | 3 | 8,48 | 5,63 | 6,09 | 9,42 | 0 |
| /65 | 4 | 6,52 | 4,33 | 6,57 | 9,68 | 0 |

**Lectura:**

* **Foto 4 (florista, muros claros):** la de mayor riesgo, como se previó. «La Jardinera» queda bajo 3:1 en 6 de 7
  viewports (2,62 a 2,96) y el párrafo bajo 4,5:1 en los 3 móviles verticales (4,10 a 4,44).
* **Foto 3 (mesa blanca):** solo el párrafo en 740×360 (3,69:1), donde la mesa clara cae bajo el texto.
* **Foto 2 (salón):** solo «Descubrir más» en 768×1024 (3,48:1), por un farol iluminado bajo esa esquina.
* **Foto 1:** cumple en todo; tras SM-01 el peor caso del párrafo sigue en 768×1024 (4,54:1).
* **DT-20 (acento `#ffc2c6`, línea por línea y por color):** con la foto 1, ≥ 3,49:1 en la línea base y ≥ 3,80:1 tras
  SM-01, en los 7 viewports (las cifras de 2,88 y 2,91 de DT-20 usaban el rectángulo completo del `h1`). Con las 4 fotos,
  el acento queda bajo 3:1 solo con la foto 4. Propuesta de estado para DT-20 en el reporte final.

### 4.3 Carga del Inicio [medido]

Chrome *headless*, caché desactivada, 3 corridas por perfil (mediana del LCP). Móvil: 360×740, red emulada de 1,6 Mb/s y
150 ms, CPU 4×. Escritorio: 1280×800 sin límites.

| Perfil | Momento | LCP (elemento) | Peticiones | Imágenes | Fuentes | Total |
|:--|:--|:--|--:|:--|:--|--:|
| Móvil | Antes | 2.628 ms (párrafo) | 15 | 5 (1.929.054 B) | 5 (234.076 B) | 2.509.755 B |
| Móvil | Después | 6.084 ms (`hero-01-mobile.webp`) | 18 | 8 (2.282.006 B) | 5 (234.076 B) | 2.863.943 B |
| Móvil, movimiento reducido | Después | 6.024 ms (`hero-01-mobile.webp`) | 15 | 5 (1.929.054 B) | 5 (234.076 B) | 2.510.991 B |
| Escritorio | Antes | 1.852 ms (`hero-botanical-desktop.webp`) | 18 | 8 (3.184.172 B) | 5 (234.081 B) | 3.765.293 B |
| Escritorio | Después | 1.660 ms (`hero-01-desktop.webp`) | 21 | 11 (3.915.670 B) | 5 (234.076 B) | 4.497.607 B |

* **Fotos 2 a 4 después de `load`** [medido]: en escritorio, `load` a 947 ms y las 3 pedidas a 1.802 ms; en móvil, `load`
  a 11.641 ms y las 3 pedidas entre 11.665 y 11.668 ms. Prioridad `Low`; solo `hero-01` lleva `High`. Con movimiento
  reducido no se piden.
* **Método de diferido elegido:** `hidden` en el `<picture>` + `loading="lazy"`, y el módulo quita `hidden` tras `load`. Con
  solo `lazy`, las capas apiladas (a 100 % a la derecha) caen dentro del margen de carga diferida y se pedirían junto con la
  foto 1; asignar el `src` por JS dejaría `<img>` sin `src` (HTML inválido) y sin respaldo.
* **Foto 1:** su descarga no cambió en móvil (318 a 5.999 ms después; 321 a 6.011 ms antes).
* **Cambio de elemento LCP en móvil:** antes el navegador nunca registró la foto como candidata (solo el párrafo, a
  2.628 ms); ahora la registra a los ≈ 6,1 s, cuando termina de descargarse. Comprobado sirviendo la copia de `_site` de la
  línea base: su lista de entradas LCP solo contiene el párrafo. **Causa no determinada**; la foto se pinta en el mismo
  momento que antes. Lighthouse en el sitio desplegado queda 🕒 PENDIENTE.
* **Fuentes (D-10):** 5 archivos y 234.076 B, sin cambio en esta iteración (incluye las cursivas 600 y 700).

### 4.4 Comportamiento [render]

| Prueba | Resultado |
|:--|:--|
| Rotación | Cambios 1→2→3→4→1 a 8,1; 15,2; 22,0 y 29,1 s desde el inicio de la navegación (≈ 7 s entre cambios; muestreo cada 250 ms). |
| Dirección | En plena transición: la saliente en −1.139 px y la entrante en +140 px (1280 de ancho). |
| Tarjeta | Posición horizontal constante en las 120 muestras. |
| Botón (clic) | Pausa; `aria-label` «Reanudar presentación de imágenes»; sin avance en 9 s. |
| Botón (Enter / Espacio) | Enter reanuda y avanza; Espacio pausa y se detiene. |
| Pausa manual + volver a la pestaña | Sigue pausado. |
| Pestaña oculta | Sin avance en 9 s; al volver, reanuda. |
| Hero fuera de pantalla | Sin avance en 9 s; al volver, reanuda. |
| Movimiento reducido | Foto 1 fija, fotos 2 a 4 con `hidden`, botón oculto, sin avance en 9 s; al cambiar la preferencia en caliente aparece el botón y rota; al volver a `reduce`, regresa a la foto 1 sin botón. |
| Teclado (360×740) | Tab: «Explorar Servicios» 254×64, «Suscripción Floral» 240×44, «Descubrir más» 142×24, pausa 44×44; los 4 con anillo de foco. |
| Consola | 0 errores y 0 advertencias. |

**Nota:** la pestaña oculta se simuló redefiniendo `visibilityState` y disparando `visibilitychange`; en un navegador real
la prueba es manual (§5.4).

### 4.5 Invariantes y compilación [medido]

* `pnpm run build:cf` sin errores ni advertencias nuevas: 6 páginas y 114 archivos (111 − 5 + 8).
* Clases nuevas presentes en el CSS de `_site/_astro/`: `.hero-slide`, `.is-active`, `.is-leaving`, `.is-instant`,
  `text-headline-xl-mobile`, `md:text-headline-xl`, `md:leading-none`, `md:font-semibold`, `md:font-light`, `md:font-body-lg`, `md:text-body-lg`,
  `md:leading-relaxed`, `md:flex-row`, `md:flex`, `bottom-space-2`, `right-space-2`, `hover:bg-dark-background/65` y el
  `@media (prefers-reduced-motion: reduce)` del carrusel.
* En las 6 páginas: 0 `style="`, 0 `onclick`, 0 `<style>`, 1 `<script>` sin `src` con SHA-256 `5b490c26…`, IDs únicos,
  0 `href="#"`, ningún `fixed` dentro de `<header>`; el header no cambió.
* Las otras 5 páginas, idénticas a la línea base salvo las rutas con *hash* de `_astro/`.
* Claro y oscuro: el tema oscuro no llegó a aplicarse en la ejecución (§8.4); en el cierre se midió con el tema oscuro
  real y el contraste es idéntico (diferencia 0,000).

### 4.6 Escenarios

| Criterio | Estado | Evidencia |
|:--|:--|:--|
| 1. Rotación | ✅ | [render] §4.4. |
| 2. Pausa | ✅ | [render] §4.4 (clic, Enter y Espacio). |
| 3. Pausas automáticas | ✅ | [render] §4.4, con la simulación de visibilidad indicada. |
| 4. Movimiento reducido | ✅ | [render] §4.4 y [medido] §4.3 (sin descarga de las fotos 2 a 4). |
| 5. SM-01 | ✅ | [render] §4.1. |
| 6. Contraste | ✅ (cierre) | [render] §4.2: 11 incumplimientos con `/45`; en el cierre (§8.5 y §8.6), 0 fallas en 416 mediciones con `/60`, en ambos temas. |
| 7. Carga | ✅ con observación | [medido] §4.3: la foto 1 es el LCP en ambos perfiles y las fotos 2 a 4 se piden tras `load`; en móvil el LCP pasó de párrafo a foto (H-02). |
| 8. Registro | ✅ | ADR-004, esta bitácora y propuestas; sin commits. |

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

### 5.1 Decisión de contraste (resuelta el 24-10-2026: tinte `/60`, ver §8.5 y §8.6)

Opciones presentadas en la ejecución:

1. **Subir el tinte a `/55`** para todas las fotos (escala de `DESIGN.md` §11.7): queda 1 incumplimiento (foto 2,
   «Descubrir más» a 768×1024, 4,46:1).
2. **Subir a `/65`**: 0 incumplimientos; la tarjeta se oscurece y la foto se ve menos a través de ella.
3. **Quitar la foto 4** y mantener `/45`: quedan 2 incumplimientos (foto 2, «Descubrir más» 3,48:1 a 768×1024; foto 3,
   párrafo 3,69:1 a 740×360).
4. Cambiar el recorte de la foto 4 o reemplazarla por otra con el centro más oscuro.

### 5.2 Desviaciones

* **D-1 (intervalo):** «7 s por foto» se implementó como 7 s entre el inicio de dos transiciones (≈ 6 s de foto quieta +
  1 s de transición). La primera versión contaba los 7 s desde el fin de la transición (ciclo medido de ≈ 8 s) y se
  corrigió. Si se prefieren 7 s de foto quieta, basta mover una línea del módulo.
* **D-2 (botón sin `aria-pressed`):** con el `aria-label` alternante de D-03, `aria-pressed` duplicaría el anuncio.
* **D-3 (clase `hidden` en el botón, no el atributo):** el atributo `hidden` perdería contra `inline-flex` (misma
  especificidad, y las utilidades van después de la base); la clase `hidden` se emite después de `inline-flex`.
* **D-4 (`sm:flex-row` → `md:flex-row` en la fila meta):** necesario para centrar «Descubrir más» entre 640 y 767 px; desde
  768 px la fila es la de antes.
* **D-5 (foto 3 móvil):** el recorte 1728×3072 (proporción 0,5625) reducido a 1536×2752 (0,5581) comprime en horizontal un
  0,78 %, tal como indica §1.1. Imperceptible; la alternativa sin deformación es recortar 1715×3072.
* **D-6 (`md:font-semibold`, `md:font-light`, `md:leading-*`):** clases adicionales a las que nombra SM-01, necesarias
  para que desde 768 px el hero quede idéntico (§4.1).

### 5.3 Hallazgos

* **H-01 (foto 4 detrás de la tarjeta):** en 360×740 y 1280×800 la tarjeta tapa el rostro de la florista; en móvil se ve
  solo el delantal fucsia difuminado y en escritorio asoma la parte de arriba de la cabeza. La foto pierde a su
  protagonista.
* **H-02 (LCP móvil):** §4.3.
* **H-03 («Descubrir más» de 142×24 px):** bajo los 44 px de la regla 10, igual que antes de esta iteración. Opción:
  `min-h-11` en el enlace.
* **H-04 (fuera de alcance):** `servicio-novias.webp` (1.052.002 B) y `servicio-magu.webp` (1.026.140 B) dominan el peso del
  Inicio; en móvil, `servicio-novias.webp` retrasa el evento `load` hasta ≈ 11,6 s.
* **H-05:** el *scroll* horizontal de 4 px a 768×1024 (H4 de la Épica 01 · It. 08) sigue igual.
* **H-06 (bytes):** `src/css/input.css` ya era LF en `HEAD` (595 LF, 0 CRLF) y se mantuvo LF y con BOM. Un `sed -i` de Git
  Bash convirtió `index.astro` a LF durante el trabajo; se devolvió a CRLF (diff final de 55 + / 9 −, sin cambio masivo).
* **H-07 (ícono de pausa sobre la foto 3):** 3,28:1 a 1024×768; cumple 3:1 con poco margen.

### 5.4 Pendientes manuales (🕒 PENDIENTE)

* [ ] Celular real: rotación fluida, botón alcanzable con el pulgar y SM-01 legible a pleno sol.
* [ ] Cambiar de pestaña y bloquear la pantalla en un navegador real: el carrusel no avanza y retoma al volver.
* [ ] Safari/iOS y Firefox: `<picture>` por orientación, transición y `backdrop-filter`.
* [ ] Lighthouse en la vista previa de Cloudflare (LCP móvil, H-02).
* [ ] Lector de pantalla (NVDA o VoiceOver): solo se lee la foto visible y el botón anuncia su nombre.

## 6. Archivos modificados y propuestas para archivos protegidos

* Modificados: `src/pages/index.astro`, `src/css/input.css`, `src/js/main.js`, `src/js/modules/hero-carousel.js` (nuevo),
  `public/images/inicio/*` (8 nuevos), 5 imágenes retiradas de `public/images/`,
  `_planificacion/04-bitacora/decisiones-tecnicas.md` (ADR-004), esta bitácora y `estado-actual.md`.
* Para registrar en Git el retiro y el renombre de la foto 1 (lo ejecuta el desarrollador): `git add -A public/images`;
  con contenido idéntico, Git detecta `hero-botanical-*` → `inicio/hero-01-*` como renombre.
* Propuestas -/+ para `DESIGN.md` (§1.3, §5 nota 10, §7.1, §7.4, §12.2 y §13) y para DT-20 de `_planificacion/README.md`:
  en el reporte final de la ejecución, con líneas completas verificadas contra el repositorio.

## 7. Mensaje de commit sugerido

`Épica 09 - Iteración 02: Carrusel automático del hero y SM-01 hero móvil del Inicio.`

## 8. Cierre (24-10-2026)

### 8.1 Decisiones del desarrollador sobre el reporte de ejecución

| N.º | Decisión |
|:--|:--|
| 1 | Tinte de `hero-glass`: el mínimo entre `/55`, `/60` y `/65` con 0 fallas en 4 fotos × 7 viewports × 2 temas. Se descarta quitar la foto 4 y aceptar fallas marginales. |
| 2 | Foto 4: se deja tal cual (se acepta que la tarjeta le tape el rostro). |
| 3 | «Descubrir más»: 44 px de alto con `min-h-11`. |
| 4 | Intervalo: se aceptan 7 s entre el inicio de dos transiciones (D-1 de §5.2). |
| 5 | Foto 3 móvil: recorte 1715×3072 en lugar de 1728×3072, para eliminar la deformación de 0,78 % (D-5 de §5.2). |

### 8.2 Línea base del cierre [medido]

`git status` limpio sobre `bcef136`; `pnpm run build:cf`: 6 páginas y 114 archivos.

### 8.3 Cambios

* **`src/pages/index.astro`:** `bg-dark-background/45` → `bg-dark-background/60` solo en la tarjeta `hero-glass`; `min-h-11`
  en el enlace «Descubrir más» (sin otros cambios de clases).
* **`src/css/input.css`:** el comentario del respaldo sin `backdrop-filter` nombra `bg-dark-background/60`.
* **`public/images/inicio/hero-03-mobile.webp`:** regenerado desde el original del historial
  (`git show 706f2b4:public/images/hero-botanical.webp`, 454.322 B, copia temporal fuera del repo): recorte centrado de
  1715×3072, reducción Lanczos a 1536×2752, WebP q 73. Resultado: **1536×2752, 189.450 B** (antes 189.106 B). Escala
  0,8956 en x y 0,8958 en y (antes 0,8889 y 0,8958): sin deformación. Nitidez equivalente: varianza de bordes 167,9
  frente a 173,4 y gradiente medio horizontal 2,426 frente a 2,444; sin diferencia visible al comparar recortes al 100 %.
* **ADR-004:** estado, decisión de contraste, objetivo táctil y documentos por actualizar.

### 8.4 Corrección del método: tema oscuro

En la ejecución, las corridas «oscuras» quedaron en tema claro: `theme.js` guarda el tema en `localStorage` en la
primera visita y las cargas siguientes del mismo perfil lo heredaban, aunque se emulara `prefers-color-scheme: dark`. Por
eso la «diferencia máxima 0,00» entre temas de §4.2 y §4.5 **no estaba medida**. En el cierre, el medidor limpia
`localStorage` antes de cada carga y comprueba que `<html>` tenga la clase del tema esperado (14 de 14 casos correctos).
Con el tema oscuro real, la diferencia entre temas es **0,000** en las 416 mediciones de cada tinte.

### 8.5 Elección del tinte [render]

Medido después de aplicar `min-h-11` y la nueva foto 3 móvil (la tarjeta crece 20 px). Todo el texto de la tarjeta (las
líneas del `h1` por color, párrafo, «Explorar Servicios», «Suscripción Floral», fila de ubicación desde 768 px y
«Descubrir más») y el ícono de pausa; 416 mediciones por tinte (208 por tema). `/55` y `/65` se simularon inyectando el
color de fondo en la medición; `/60` es el del repositorio.

| Tinte | Fallas (2 temas) | Peor caso | Elemento y escenario |
|:--|--:|:--|:--|
| `/55` | 2 | 4,46:1 (mín. 4,5) | «Descubrir más», foto 2, 768×1024, claro y oscuro |
| **`/60`** | **0** | 3,71:1 (mín. 3) | «La Jardinera», foto 4, 320×640 |
| `/65` | 0 | 4,32:1 (mín. 3) | «La Jardinera», foto 4, 320×640 |

**Elegido: `/60`.** Mínimos por foto con `/60`:

| Foto | «Florería» (≥ 3) | «La Jardinera» (≥ 3) | Párrafo (≥ 4,5) | «Explorar» (≥ 4,5) | «Suscripción» (≥ 4,5) | Ubicación (≥ 4,5) | «Descubrir más» (≥ 4,5) | Ícono pausa (≥ 3) |
|:--|--:|--:|--:|--:|--:|--:|--:|--:|
| 1 | 5,77 | 5,29 | 6,16 | 6,06 | 9,19 | 6,26 | 6,55 | 8,38 |
| 2 | 7,32 | 6,31 | 7,05 | 6,06 | 7,05 | 6,72 | 5,05 | 8,05 |
| 3 | 7,60 | 5,03 | 5,46 | 6,06 | 9,01 | 5,99 | 8,38 | 3,28 |
| 4 | 5,67 | 3,71 | 5,71 | 6,06 | 10,05 | 7,07 | 8,80 | 5,05 |

### 8.6 Tabla final de contraste con `/60` (foto × viewport; claro y oscuro idénticos) [render]

Umbral: `h1` (32, 48 o 64 px) e ícono de pausa (WCAG 1.4.11) 3:1; resto 4,5:1. La fila de ubicación está oculta bajo
768 px (SM-01).

| Viewport | Foto | «Florería» (≥ 3) | «La Jardinera» (≥ 3) | Párrafo (≥ 4,5) | «Explorar Servicios» (≥ 4,5) | «Suscripción Floral» (≥ 4,5) | Ubicación (≥ 4,5) | «Descubrir más» (≥ 4,5) | Ícono pausa (≥ 3) | Claro = oscuro |
|:--|:--|--:|--:|--:|--:|--:|--:|--:|--:|:--|
| 320×640 | 1 | 7,55 | 5,44 | 7,08 | 6,06 | 11,24 | oculta | 10,78 | 13,44 | sí |
| 320×640 | 2 | 9,70 | 6,42 | 10,82 | 6,06 | 10,31 | oculta | 13,18 | 11,87 | sí |
| 320×640 | 3 | 9,03 | 5,65 | 7,61 | 6,06 | 10,40 | oculta | 9,16 | 10,89 | sí |
| 320×640 | 4 | 5,67 | 3,71 | 5,71 | 6,06 | 11,77 | oculta | 11,69 | 15,41 | sí |
| 360×740 | 1 | 6,94 | 5,46 | 6,84 | 6,06 | 9,40 | oculta | 10,54 | 8,38 | sí |
| 360×740 | 2 | 8,52 | 6,31 | 9,72 | 6,06 | 10,20 | oculta | 12,79 | 10,02 | sí |
| 360×740 | 3 | 8,53 | 5,60 | 7,65 | 6,06 | 9,98 | oculta | 8,38 | 11,52 | sí |
| 360×740 | 4 | 5,69 | 3,76 | 5,86 | 6,06 | 10,32 | oculta | 11,39 | 9,10 | sí |
| 412×915 | 1 | 7,45 | 7,11 | 6,66 | 6,06 | 10,19 | oculta | 8,05 | 8,47 | sí |
| 412×915 | 2 | 8,32 | 8,33 | 10,49 | 6,06 | 10,10 | oculta | 8,96 | 9,73 | sí |
| 412×915 | 3 | 7,81 | 5,27 | 7,77 | 6,06 | 9,01 | oculta | 9,43 | 11,30 | sí |
| 412×915 | 4 | 5,90 | 3,91 | 6,01 | 6,06 | 13,22 | oculta | 9,28 | 8,63 | sí |
| 768×1024 | 1 | 9,63 | 5,32 | 6,16 | 6,06 | 9,45 | 6,26 | 6,55 | 11,10 | sí |
| 768×1024 | 2 | 9,30 | 7,14 | 8,61 | 6,06 | 7,05 | 6,72 | 5,05 | 16,40 | sí |
| 768×1024 | 3 | 7,90 | 5,03 | 6,96 | 6,06 | 11,98 | 5,99 | 8,64 | 3,90 | sí |
| 768×1024 | 4 | 8,36 | 4,18 | 6,22 | 6,06 | 10,60 | 8,56 | 11,19 | 11,24 | sí |
| 740×360 | 1 | 5,77 | 6,20 | 6,43 | 6,06 | 9,28 | oculta | 8,02 | 14,79 | sí |
| 740×360 | 2 | 7,68 | 8,30 | 9,06 | 6,06 | 7,87 | oculta | 10,74 | 9,44 | sí |
| 740×360 | 3 | 7,90 | 5,76 | 5,46 | 6,06 | 10,18 | oculta | 8,99 | 3,36 | sí |
| 740×360 | 4 | 8,93 | 4,07 | 6,47 | 6,06 | 10,05 | oculta | 8,80 | 6,29 | sí |
| 1024×768 | 1 | 5,81 | 5,39 | 6,25 | 6,06 | 9,28 | 6,74 | 7,05 | 14,75 | sí |
| 1024×768 | 2 | 7,32 | 7,88 | 7,05 | 6,06 | 7,60 | 8,83 | 6,92 | 8,05 | sí |
| 1024×768 | 3 | 7,61 | 5,54 | 6,66 | 6,06 | 10,47 | 8,97 | 9,99 | 3,28 | sí |
| 1024×768 | 4 | 7,03 | 4,09 | 6,55 | 6,06 | 11,30 | 7,19 | 9,38 | 5,05 | sí |
| 1280×800 | 1 | 5,88 | 5,29 | 6,23 | 6,06 | 9,19 | 6,70 | 6,95 | 14,61 | sí |
| 1280×800 | 2 | 7,43 | 7,72 | 7,21 | 6,06 | 7,53 | 8,49 | 6,82 | 15,33 | sí |
| 1280×800 | 3 | 7,60 | 5,52 | 7,09 | 6,06 | 10,44 | 9,73 | 10,24 | 3,46 | sí |
| 1280×800 | 4 | 7,11 | 4,11 | 6,52 | 6,06 | 11,32 | 7,07 | 9,14 | 6,41 | sí |

**Resultado:** 0 fallas en 416 mediciones. §5.1 queda **resuelta** con `/60`. DT-20: con `/60`, el acento `#ffc2c6` mide
≥ 3,71:1 en las 4 fotos y los 7 viewports (peor caso: foto 4, 320×640).

### 8.7 Regresión [medido] [render]

| Comprobación | Resultado | Evidencia |
|:--|:--|:--|
| `pnpm run build:cf` | OK: 6 páginas y 114 archivos, sin errores ni advertencias | [medido] |
| Clases `bg-dark-background/60` y `min-h-11` en el CSS de `_site/_astro/` | OK (`#1f242199` y `min-height: 2.75rem`) | [medido] |
| Otras 5 páginas | OK: idénticas a la línea base salvo el *hash* de `_astro/` | [medido] |
| Header (regla 7) | OK: igual al de la línea base en las 6 páginas, 0 `fixed` en descendientes y `#mobile-menu-scrim` como hermano siguiente | [medido] |
| Invariantes | OK: 0 `style="`, 0 `onclick`, 0 `<style>`, 1 script sin `src` con SHA-256 `5b490c26…` en las 6, IDs únicos, 0 `href="#"` | [medido] |
| Hero desde 768 px | OK: `h1` 48/48 y 64/72, párrafo 18/29,25, pesos 600 y 300; cambian solo el tinte y la tarjeta (+20 px: 435 → 455 y 459 → 479) por el alto de «Descubrir más» | [render] |
| «Descubrir más» | OK: 142 × 44 px en los 14 casos, centrado bajo 768 px | [render] |
| Botón de pausa | OK: 44 × 44 px; separación con la tarjeta 4 px (320, 360, 740 de ancho), 83, 167, 37 y 52 px | [render] |
| Rotación | OK: 1→2→3→4→1 a 8,0; 14,8; 21,9 y 28,8 s | [render] |
| Pausa (clic, Enter, Espacio), pausa manual persistente, pestaña oculta, hero fuera de pantalla | OK | [render] |
| Movimiento reducido (fijo, sin botón, cambio en caliente) | OK | [render] |
| Teclado | OK: «Explorar Servicios» 254×64, «Suscripción Floral» 240×44, «Descubrir más» 142×44, pausa 44×44, con anillo de foco | [render] |
| *Scroll* horizontal | OK: 0 px, salvo los 4 px que ya había a 768×1024 (H-05) | [render] |
| Capturas 7 viewports × 2 temas | OK: revisadas; el tema oscuro se aplica (header oscuro) | [render] |
| Consola | OK: 0 errores y 0 advertencias | [render] |

### 8.8 Estado de la iteración

**Completada con reservas.** Reservas: pruebas manuales de §5.4 (celular real con pestaña oculta y bloqueo de pantalla,
Safari y Firefox, lector de pantalla y Lighthouse en la vista previa, incluido H-02).

### 8.9 Mensaje de commit sugerido

`Épica 09 - Iteración 02: Cierre con tinte del hero, 44 px en «Descubrir más» y recorte de la foto 3 móvil.`
