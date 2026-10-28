# Iteración 02: Imágenes (Logotipos, Dimensiones, Recompresión y Carga del Carrusel)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de editar, lee `AGENTS.md` §5 (reglas 2, 4, 8 y 9), `DESIGN.md` §5
(punto 10), §11.7, §12 y §13, la bitácora de la Iteración 01 de esta épica
(`bitacora-epica-10/bitacora-iteracion-01.md`, en especial §2.2, §2.4, §2.9, §3.1, §3.2 y §5), `SiteHeader.astro`,
`BaseLayout.astro`, `index.astro`, `galeria.astro`, `servicios.astro`, `suscripcion-floral.astro`,
`src/js/modules/hero-carousel.js`, `src/js/modules/gallery.js`, `src/js/modules/modal.js` y `src/js/data/services.js`.
Verifica con `git status` y `git log -3 --oneline` que estás en `feat/rendimiento-calidad`, con la Iteración 01
integrada (`bddc413`) y sin cambios pendientes. No inventes decisiones ni cifras.

**Autorización explícita de esta iteración:** puedes editar `SiteHeader.astro`, `BaseLayout.astro` (solo los `<link>` del
favicon; el script del tema no se toca), `index.astro`, `galeria.astro`, `servicios.astro`, `suscripcion-floral.astro`
(**solo** los 3 planes y sus atributos; el hero queda para la It. 05), `hero-carousel.js`, `public/logos/`,
`public/images/` (recompresión y variantes nuevas), `public/favicon.ico`, la bitácora de la iteración y
`estado-actual.md`. Las herramientas de imagen se ejecutan con `pnpm dlx` y versión fija, sin agregarlas a
`package.json`. Antes de reemplazar cualquier imagen o logotipo, copia el original a `referencia/it02-originales/`
(carpeta ignorada por Git), conservando la ruta relativa, y no lo borres. Git es de solo lectura. La medición de
rendimiento es solo PageSpeed Insights vía API (D-03 de la épica, §6.1 de la definición); Chrome *headless* con perfil
aislado solo para red y render, sin puntajes.

---

## 1. Objetivo de la Iteración

1. **DT-22:** logotipos del header y favicon con un tamaño acorde a como se muestran (hoy 3446×3504 px para 44×44 px).
   Los dos logotipos juntos pesan 537.306 B por página en las 5 páginas (It. 01, §2.9, H1).
2. **DT-23:** `width` y `height` reales en las 9 imágenes del Inicio y las 24 de la Galería que no los declaran, y
   corrección de la proporción declarada en las 8 tarjetas de Servicios y los 3 planes de Suscripción Floral, con
   contenedores que eviten desplazamientos (regla 9).
3. **Recompresión y variantes:** reducir el peso de las imágenes que la It. 01 priorizó (§3.1, filas 2, 4, 5, 6 y 7 de
   su diagnóstico), empezando por `galeria-2.webp` (1.342.888 B), `servicio-novias.webp` (1.051.730 B) y
   `servicio-magu.webp` (1.025.868 B).
4. **LCP de Servicios (hallazgo de la It. 01):** la imagen LCP (`servicios/suscripcion.webp`) lleva `loading="lazy"` y no
   tiene prioridad: retraso de carga de 1.319 a 1.367 ms en móvil (6 de 6 corridas, `lcp-discovery-insight` fallido).
5. **Carrusel del Inicio (DT-35, peso):** que las fotos 2 a 4 no se descarguen antes de hacer falta, sin cambiar el
   comportamiento aprobado en el ADR-004. Medido: en escritorio salen a los 549 a 569 ms, antes del LCP, 730.688 B.

### 1.1 Decisiones del desarrollador

| ID | Decisión | Resultado | Estado |
|:---|:---------|:----------|:-------|
| Alcance | Sumar a la iteración las 8 tarjetas de Servicios, los 3 planes de Suscripción Floral y la imagen LCP de Servicios (hallazgos de la It. 01). | **Sí, las tres.** | Decidido (27-10-2026) |
| D-01 | Logotipo del header | **a)** WebP a 88 y 132 px de ancho (2× y 3× de los 44 px mostrados) con `srcset`, en las dos variantes (original y blanca). | Decidido (27-10-2026) |
| D-02 | Favicon | **a)** Juego estándar: `favicon.ico` de 32 px, PNG de 192 px y `apple-touch-icon` de 180 px. | Decidido (27-10-2026) |
| D-03 | Imágenes adaptables (`srcset`/`sizes`) | **a)** Variantes pregeneradas en `public/images/` con `srcset` (cumple la regla 9). | Decidido (27-10-2026) |
| D-04 | Calidad de recompresión | **WebP calidad 80**, con aprobación visual del desarrollador (capturas antes/después a 100 % de zoom en 1280×800). Si una foto se ve peor, se sube a 85 solo esa. **Las fotos del hero del Inicio (`hero-01` a `hero-04`, móvil y escritorio) quedan fuera.** | Decidido (27-10-2026) |
| D-05 | Carga de las fotos 2 a 4 del carrusel | **a)** Foto 2 tras el evento `load`; fotos 3 y 4 justo antes de su turno. | Decidido (27-10-2026) |
| D-06 | Archivos de `public/` sin uso (It. 01, §2.2) | **b)** Dejarlos. No se listan para retiro. | Decidido (27-10-2026) |

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Línea base de la iteración (solo lectura)

1. `git status`, `git log -3 --oneline`, `pnpm run build:cf` (6 páginas, 114 archivos esperados) y SHA-256 del script
   del tema (`5b490c26…`, 717 caracteres).
2. PageSpeed Insights (D-03 de la épica, §6.1 de la definición) en la vista previa de la rama
   (`feat/rendimiento-calidad`, URL que entrega el desarrollador), en las **5 páginas** (el logotipo del header cambia
   en todas): 3 corridas por página y dispositivo, 30 en total, JSON en
   `bitacora-epica-10/pagespeed/it02-vista-previa-<pagina>-<movil|escritorio>-cN.json`. Es el «antes» de esta iteración
   y permite comparar la vista previa con la producción de la It. 01 [medido]. En vista previa, SEO y Best Practices no
   son comparables (DT-28).
3. Bytes de imagen de la carga inicial de cada página, en móvil y escritorio, a partir del `network-requests` de esos
   JSON; si hace falta el detalle por viewport (360×740 y 1280×800), con Chrome *headless* solo para red [medido].
4. Para cada imagen que se tocará: ruta, bytes, dimensiones reales, tamaño con que se muestra (ancho CSS medido en
   360, 768 y 1280 px) y dónde más se usa (la modal de Servicios usa `mainImage` de `src/js/data/services.js`; la
   ampliación de la Galería usa `data-src`). Los archivos que se usan en ampliación o modal **conservan sus
   dimensiones**: solo se recomprimen; las variantes pequeñas son archivos nuevos.
5. Capturas de referencia de cada imagen afectada en los 7 viewports (320×640, 360×740, 412×915, 768×1024, 740×360,
   1024×768 y 1280×800) y ambos temas, guardadas fuera del repositorio.

### Tarea 1: Logotipos y favicon (DT-22, D-01 y D-02)

1. **Logotipo:** por cada variante (`la-jardinera-original` y `la-jardinera-blanco`), dos WebP de 88 y 132 px de ancho
   (`public/logos/`), referenciados con `srcset` y `sizes="44px"`; `src` apunta a la de 88 px. Se conservan `width="44"`,
   `height="44"`, `alt` y las clases. Los dos logotipos se siguen mostrando según la clase `dark` (ADR-003): no uses
   `<picture media="(prefers-color-scheme)">`, porque el tema lo decide la clase y no el sistema operativo. Las
   invariantes del header (regla 7) quedan intactas.
2. **Favicon:** `public/favicon.ico` (32 px), `public/logos/icono-192.png` y `public/logos/apple-touch-icon.png`
   (180 px, con fondo opaco tomado de un token de `DESIGN.md`; el desarrollador aprueba el aspecto). Reemplaza el
   `<link rel="icon">` actual de `BaseLayout.astro` (PNG de 306 KB) por los tres enlaces (`sizes` incluido).
3. Verifica que ninguna página vuelva a pedir `la-jardinera-original.png` ni `la-jardinera-blanco.png` (los PNG
   originales se quedan en el disco, sin referencia). Registra los bytes de ambos logotipos por página antes y después.

### Tarea 2: Dimensiones declaradas (DT-23)

1. `width` y `height` reales (de la variante principal, `src`) en las 9 imágenes del Inicio, las 24 de la Galería y las
   imágenes que ya declaran una proporción distinta de la real: las 8 tarjetas de Servicios (2048×2048 y 1024×1024
   declaradas 400×500) y los 3 planes de Suscripción Floral (2400×1792 declarados 720×1280 y 1440×1621).
2. Verifica que cada contenedor fija la proporción (`aspect-*` u otra altura fija): las tarjetas de Servicios usan
   `aspect-[4/5]` con `object-cover` y la Galería usa alturas fijas (`h-[320px] md:h-[420px]`). Si alguno no la fija,
   entrégalo como propuesta: no cambies el diseño.
3. **LCP de Servicios:** quita `loading="lazy"` de las tarjetas visibles sin desplazarse en 360×740 y 1280×800 y agrega
   `fetchpriority="high"` solo a la imagen que la It. 01 identificó como LCP (`servicios/suscripcion.webp`; en
   `servicios-escritorio-c3` fue `novias.webp`: decide con la medición de la Tarea 0.2 y registra la razón).
4. Revisa `loading` y `fetchpriority` en las demás páginas: `lazy` solo bajo el pliegue y `high` solo en el LCP.

### Tarea 3: Recompresión y variantes (D-03 y D-04)

En las imágenes que la It. 01 priorizó (§3.1 y §3.2 de su bitácora): `galeria-2`, `servicio-novias` y `servicio-magu`
(Inicio); `ddm4`, `ddm1`, `ddm3` y `ddm5` y el resto de las 24 de la Galería; las 8 tarjetas de Servicios
(`matrimonios`, `novios-rio` y `condolencias` primero); y `plan-esencial`, `plan-premiere` y `plan-luxe`.

1. **Recompresión:** WebP calidad 80 (sin ampliar nunca el tamaño real). El archivo original conserva sus dimensiones.
   Si queda más pesado que el actual, se deja el actual.
2. **Variantes con `srcset` y `sizes`:** archivos nuevos más pequeños (por ejemplo, con sufijo `-480`, `-800`) en
   `public/images/`, con anchos deducidos del tamaño con que se muestra cada imagen (Tarea 0.4) a 1× y 2× de densidad y
   sin superar el ancho real del original. `sizes` según el ancho medido en cada viewport. La Galería usa variantes
   para la tarjeta y mantiene `data-src` apuntando al archivo completo para la ampliación; la modal de Servicios sigue
   usando el archivo completo.
3. Por imagen: bytes antes y después, dimensiones, calidad usada y variantes generadas, en una tabla de la bitácora.
4. **Aprobación visual:** capturas comparativas antes/después a 100 % de zoom en 1280×800 y en 360×740 de cada imagen
   recomprimida. Deja explícita la lista para que el desarrollador apruebe o pida subir a 85. Las fotos del hero del
   Inicio no se tocan (D-04).
5. Los originales se copian a `referencia/it02-originales/` antes de reemplazarlos.

### Tarea 4: Fotos 2 a 4 del carrusel (D-05)

Según D-05, en `hero-carousel.js` y el marcado del hero. Foto 2 se pide tras el evento `load` de la página; fotos 3 y 4
se piden justo antes de su turno (con margen suficiente para que estén listas al fundirse). Se conservan el intervalo de
7 s, el botón de pausa, las pausas automáticas y el movimiento reducido (ADR-004). Ninguna transición puede mostrar una
foto a medio cargar, ni con la pausa del usuario ni con la pestaña oculta. Con JavaScript desactivado, la primera foto
sigue visible. No cambies el LCP: `hero-01` conserva `fetchpriority="high"`.

### Tarea 5: Verificación

1. `pnpm run build:cf` sin errores ni advertencias nuevas; 6 páginas; script del tema `5b490c26…`.
2. `_site/**/*.html`: 0 `<img>` sin `width` y `height`; 0 referencias a los PNG de logotipo; 0 peticiones a imágenes
   ocultas por `lazy` encima del pliegue.
3. Bytes de imagen en la carga inicial, antes y después, por página y viewport (tabla).
4. Render en los 7 viewports × 2 temas: sin diferencias visibles fuera de lo decidido (logotipo, favicon y
   encuadres), incluidas la modal de Servicios y la ampliación de la Galería con imágenes y videos.
5. Carrusel del Inicio: fotos 2 a 4 no se piden antes del LCP (lista de peticiones en Chrome *headless*, solo red),
   ninguna transición muestra una foto a medio cargar, y el comportamiento del ADR-004 es igual al de la It. 01.
6. Sin puntajes locales (D-03 de la épica): el «después» de PageSpeed se mide en la vista previa al inicio de la
   Iteración 03 (Tarea 0).
7. Invariantes de `AGENTS.md` §5 y SHA-256 del script del tema.

### Tarea 6: Registro

Bitácora `bitacora-epica-10/bitacora-iteracion-02.md` (plantilla §8.2), línea en `estado-actual.md`, propuestas -/+ para
protegidos (`DESIGN.md` §13 y, si cambia, `AGENTS.md` regla 9) y mensaje de commit:
`Épica 10 - Iteración 02: logotipos, dimensiones y recompresión de imágenes.` Indica explícitamente qué archivos entran
en el commit (incluidas las imágenes nuevas y recomprimidas y los JSON de la Tarea 0.2) y que `referencia/` no entra.

---

## 3. Auditoría de No-Regresión e Invariantes

* Header (regla 7) y script del tema (ADR-003) intactos.
* Carrusel del Inicio con el mismo comportamiento (ADR-004).
* Ninguna imagen cambia de encuadre ni de proporción visible; la ampliación de la Galería y la modal de Servicios muestran
  las imágenes completas, no las variantes pequeñas.
* Hero del Inicio y hero de Suscripción Floral sin cambios (este último es de la It. 05).
* Sin JS ni CSS en línea; sin dependencias nuevas.

---

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Logotipos y favicon**
    * **Dado** el header en cualquier página,
    * **Entonces** las dos variantes del logotipo descargadas pesan juntas menos de 30 KiB (hoy 537.306 B) y se ven igual
      en ambos temas, y el favicon son tres archivos pequeños con sus `<link>`.
* **Escenario 2: Dimensiones**
    * **Entonces** 0 `<img>` sin `width` y `height` en `_site/**/*.html`, y la proporción declarada coincide con la del
      archivo en Servicios y en los 3 planes de Suscripción Floral.
* **Escenario 3: Peso**
    * **Entonces** los bytes de imagen de la carga inicial bajan en cada página tocada, con la tabla antes/después.
* **Escenario 4: LCP de Servicios**
    * **Entonces** la imagen LCP de Servicios deja de llevar `loading="lazy"` y lleva `fetchpriority="high"`.
* **Escenario 5: Carrusel**
    * **Dado** el Inicio,
    * **Entonces** las fotos 2 a 4 no se piden antes del LCP y el carrusel no muestra fotos a medio cargar.
* **Escenario 6: Sin cambios visibles**
    * **Entonces** 7 viewports × 2 temas sin diferencias fuera de lo decidido, con las recompresiones aprobadas por el
      desarrollador.