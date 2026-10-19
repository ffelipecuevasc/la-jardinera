# Bitácora de Ejecución - Épica 08 - Iteración 04

**Fecha de ejecución:** 18-10-2026
**Agente:** Claude Code
**Objetivo:** Que el header, el panel móvil y la capa tenue existan una sola vez (`SiteHeader.astro`), se generen en las 6 páginas con el estado activo correcto y lean sus enlaces de `src/data/navegacion.js`, sin ninguna mejora respecto del marcado vigente.

Especificación: [`iteracion-04.md`](../../03-planificacion/epicas/epica-08-migracion-astro/iteracion-04.md) · Épica: [`definicion-epica.md`](../../03-planificacion/epicas/epica-08-migracion-astro/definicion-epica.md) · Iteración anterior: [`bitacora-iteracion-03.md`](bitacora-iteracion-03.md)

Rótulos de evidencia: **[código]** confirmado por código, comandos o programa; **[render]** confirmado en render real (Chrome 155 headless, ver §4.6); **[informado]** dato entregado por el desarrollador; **🕒 PENDIENTE** no verificado.

---

## 1. Resumen ejecutivo

* El header, el panel móvil y la capa tenue viven **una sola vez**, en `src/components/SiteHeader.astro`. `BaseLayout.astro` lo renderiza como primer hijo de `<body>` y las 6 páginas ya no contienen el header, su capa tenue ni el comentario de esta. `<header class` y `mobile-menu-scrim` aparecen en `src/` solo en el componente (y los selectores de `navigation.js`). [código]
* Los 5 enlaces de la barra de escritorio y los 5 del panel móvil salen de `NAVEGACION`. Las clases activa e inactiva (incluido el subrayado de escritorio) son cadenas literales completas elegidas con un ternario; `aria-current="page"` solo en el enlace activo (`undefined` en los demás). La 404 pasa `paginaActiva = null`. [código]
* El componente devuelve **dos nodos hermanos**: `<header>` y, justo después, el comentario de la capa tenue y `<div id="mobile-menu-scrim">`. [código]
* `pnpm run build:cf`: código 0, "6 page(s) built", 0 advertencias, 106 archivos; el CSS conserva su nombre con *hash* (`BaseLayout.744HEtGc.css`) porque no entró ninguna clase nueva. [código]
* Comparación contra la referencia: header y capa tenue **idénticos token a token** (sin espacios ni comentarios) en las 6 páginas; las únicas diferencias son espacios de formato (72) y los 4 comentarios de la 404 unificados sobre los de Inicio (8 tokens). Diferencias no explicadas: **0**. [código]
* Render real (6 páginas × 7 viewports × claro y oscuro, sin fuentes ni videos externos): **0 diferencias de posición o tamaño** en 8.352 elementos medidos y **0 diferencias de estilo no explicadas**. [render]
* Interacción: **54 de 54** pruebas iguales a la referencia y con el comportamiento esperado. H8: 120 mediciones del sitio nuevo con 0 incumplimientos y 0 diferencias con la referencia. Consola limpia. [render]
* Estado: **Completada con reservas** (§8). No está 🔒 Cerrada: eso ocurre solo con la fusión a `main`.

## 2. Línea base (estado previo)

| Dato | Valor | Origen |
|:-----|:------|:-------|
| Rama / `HEAD` | `feat/migracion-astro` / `b378c6d` | `git branch --show-current`, `git log` |
| Árbol de trabajo | Limpio al iniciar | `git status --short` |
| Node / pnpm / Astro | `v24.16.0` / `11.24.0` / `7.4.0` | `node -v`, `pnpm -v`, `package.json` |
| Header | 6 copias en `src/pages/*.astro` (en Inicio, `<header>` en L10 a L230, comentario en L231 y capa tenue en L232; el bloque completo mide 223, 232, 236, 223, 236 y 159 líneas en Inicio, Servicios, Suscripción, Galería, Contacto y 404) | lectura |
| Referencia | `referencia/sitio/` (fuera de Git) y `scripts/comparar-con-referencia.mjs` presentes | `ls` |
| Documentos leídos | `AGENTS.md`, `README.md`, `DESIGN.md` (completo), `_planificacion/README.md`, `estado-actual.md`, `stack-tecnologico.md`, `decisiones-tecnicas.md`, `definicion-epica.md`, `iteracion-04.md` y las bitácoras de la Épica 08 (It. 01, 02 y 03); además `navigation.js`, `theme.js`, `BaseLayout.astro`, `SiteFooter.astro`, `navegacion.js` y `index.astro` | — |

### 2.1 Tarea 0: diferencias entre los 6 headers y el de Inicio (solo lectura) [código]

Comparación de la secuencia de tokens (etiquetas con atributos en orden, texto y comentarios; los espacios se colapsan) del bloque `<header>` + comentario + `#mobile-menu-scrim` de cada `.astro` contra el de Inicio. Las 6 secuencias tienen **247 tokens**.

| Página | A. Enlace activo (barra de escritorio, subrayado y panel móvil) | B. Comentarios | C. Espacios y formato (no visibles en tokens) | Otras |
|:-------|:--:|:--:|:--|:--:|
| Servicios | 12 tokens (6 pares) | 0 | sí | **0** |
| Suscripción Floral | 12 | 0 | sí | **0** |
| Galería | 12 | 0 | sí | **0** |
| Contacto | 12 | 0 | sí | **0** |
| 404 | 6 (sin enlace activo: Inicio pierde el suyo) | 8 (4 comentarios) | no (`class` en una línea) | **0** |

* **A:** en la barra, el enlace `<a>` (`aria-current="page"` y `text-primary`, frente a `text-on-surface-variant hover:text-primary`) y su subrayado (`scale-x-100`, frente a `scale-x-0 group-hover:scale-x-100`); en el panel, el `<a>` (`aria-current="page"` y `text-primary font-semibold`, frente a `text-on-surface-variant hover:text-on-surface`). Comportamiento exactamente el descrito en la solicitud.
* **B (solo 404):** `Separador Vertical Elegante` (Inicio: `… (solo desde sm)`), `Texto del Logotipo con Efecto Spotlight` (Inicio: `… (una sola línea: 18px en móvil, 24px desde sm)`), `Barra de Navegación Desktop (Estado Neutro: 404 no pertenece a ninguna sección activa)` (Inicio: `Barra de Navegación`) y `Menú Móvil Desplegable (panel anclado bajo la barra · Estado Neutro: sin enlace activo)` (Inicio: `… (panel anclado bajo la barra)`). El comentario de la capa tenue es igual en las 6.
* **C (formato):** el bloque mide 223, 232, 236, 223, 236 y 159 líneas; en las 5 páginas con enlace activo los 10 atributos `class` de los enlaces de escritorio y de sus subrayados llevan saltos de línea, y en la 404 van en una sola línea; el bloque trae 10 cierres `/>` en las 6. Ninguna de estas diferencias existe una vez normalizados los espacios.
* **Etiquetas frente a `NAVEGACION`:** idénticas. Las 5 etiquetas, rutas y `data-path` de la barra y del panel (`Inicio`, `Servicios`, `Suscripción Floral`, `Galería`, `Contacto`) coinciden con `NAVEGACION` en las 12 salidas (6 de la referencia y 6 de `_site/`). No hizo falta `etiquetaHeader`.
* **Atributos `data-path` y `data-active-classes`:** ningún módulo de `src/js/**`, ningún CSS (`src/css/input.css`) ni `tailwind.config.js` los usa (0 coincidencias de `data-path` y `data-active-classes`). Se copiaron igual, como se pidió. Los únicos selectores del header que usan los módulos son `#mobile-menu-btn`, `#mobile-menu`, `#mobile-menu-scrim`, `#mobile-menu-icon-open`, `#mobile-menu-icon-close` y `#theme-toggle-btn` (`navigation.js`, `theme.js`), más `document.querySelector('header')` (`gallery.js` L87) y `'header, main, footer'` (`modal.js` L18) para el `inert` de modales.

## 3. Cambios realizados (por archivo)

| Archivo | Cambio |
|:--------|:-------|
| `src/components/SiteHeader.astro` (nuevo, 143 líneas) | Generado desde el header de Inicio (no se copió a mano): marca, logotipos, separador, botones sociales, botón de tema, hamburguesa y panel móvil tal cual, con sus comentarios, IDs, `aria-*`, `data-path`, `data-active-classes` y orden. Los 5 enlaces de la barra (con su subrayado) y los 5 del panel se generan recorriendo `NAVEGACION`; `aria-current`, `class`, `data-path` y `href` en el mismo orden de atributos que el original. Devuelve `<header>`, el comentario de la capa tenue y `#mobile-menu-scrim`. El enlace de marca (`data-path="inicio" href="/"`), Instagram, WhatsApp, tema y hamburguesa son estáticos, como en el footer. Archivo con CRLF, como el resto de `src/`. |
| `src/layouts/BaseLayout.astro` | Importa `SiteHeader` y lo renderiza como primer hijo de `<body>`, antes de `<slot />`: `<SiteHeader paginaActiva={paginaActiva} />`. |
| `src/pages/index.astro`, `servicios.astro`, `suscripcion-floral.astro`, `galeria.astro`, `contacto.astro`, `404.astro` | Se retiran el `<header>`, el comentario de la capa tenue y `#mobile-menu-scrim` (223, 232, 236, 223, 236 y 159 líneas; 1.309 en total). Nada más: el `<main>` (o, en Contacto y 404, el comentario que lo precede) queda inmediatamente después, como hoy. |
| `decisiones-tecnicas.md` | Sección nueva: decisiones del header. |
| `estado-actual.md` | Dos líneas nuevas (cierre de la It. 03 y esta iteración). |

**Sin cambios (`git diff` vacío, verificado):** `src/js/modules/navigation.js`, `src/js/modules/theme.js`, `src/css/input.css`, `tailwind.config.js`, `package.json`, `pnpm-lock.yaml`, `astro.config.mjs`, `src/data/navegacion.js`, `src/components/SiteFooter.astro`, `public/`, `scripts/` y todos los documentos protegidos.

## 4. Verificación de criterios de aceptación

### 4.1 Compilación [código]

`pnpm run build:cf` (con `_site/` borrada antes): código 0; "6 page(s) built"; 0 líneas con "warn" o "error"; 106 archivos. CSS: `BaseLayout.744HEtGc.css` (mismo nombre que en la It. 03: no se agregó ni se quitó ninguna clase). De las 119 cadenas distintas que mi script leyó como clases en `SiteHeader.astro`, 116 tienen regla en el CSS compilado; las otras 3 no son utilidades de Tailwind: `group` (marcador de Tailwind sin regla propia), `fx-spotlight` (clase de `input.css`, presente en el CSS) y `page` (el valor de `aria-current`, no una clase). Presentes, entre otras: `h-20`, `top-full`, `max-h-[calc(100dvh-5rem)]`, `top-20`, `scale-x-0`, `scale-x-100`, `group-hover:scale-x-100`, `text-primary`, `text-on-surface-variant`, `hover:text-primary`, `hover:text-on-surface`, `font-semibold`, `tracking-[0.1em]`, `xl:tracking-[0.16em]` y `bg-neutral-900/40`.

### 4.2 Comparador oficial (`scripts/comparar-con-referencia.mjs`, sin editarlo) [código]

Código de salida 1 y **171 diferencias de `<body>`** (el script las cuenta como no esperadas porque no conoce los cambios de las It. 03 y 04). Se clasificaron con un script aparte que reutiliza su tokenizador y su diferencia de secuencias (copia del código fuera del repositorio):

| Página | A. Enlace activo | B. Comentarios (header) | C. Espacios/formato (header) | Otras en el header | Footer (It. 03) | Fuera del header y del footer |
|:-------|:-:|:-:|:-:|:-:|:-:|:-:|
| Inicio | 0 | 0 | 12 | 0 | 4 | 0 |
| Servicios | 0 | 0 | 12 | 0 | 12 | 0 |
| Suscripción Floral | 0 | 0 | 12 | 0 | 11 | 0 |
| Galería | 0 | 0 | 12 | 0 | 22 | 0 |
| Contacto | 0 | 0 | 12 | 0 | 22 | 0 |
| 404 | 0 | 8 | 12 | 0 | 20 | 0 |
| **Total** | **0** | **8** | **72** | **0** | **91** | **0** |

171 = 72 + 8 + 91. [código]

* **A = 0:** la referencia de cada página ya trae el enlace activo de esa página y el componente lo reproduce, así que entre la referencia y `_site/` no hay diferencia de enlace activo. El conjunto de sustituciones A que habría que aplicar al original es **vacío**.
* **B = 8 (solo 404):** los 4 comentarios del header de la 404 pasan a ser los de Inicio (4 tokens originales y 4 de la salida). Son la diferencia B anunciada. Los comentarios de las otras 5 páginas ya coincidían con los de Inicio.
* **C = 72 (espacios/formato):** 12 por página, todos `#ws`: 6 en la barra de escritorio (antes de la `<a>` inicial, entre las 5 y después de la última) y 6 en el panel móvil. Al generar los enlaces con `NAVEGACION.map(...)`, esos nodos de espacio desaparecen. Ambos `<nav>` son contenedores flex (`flex` y `flex flex-col`), así que los espacios entre sus hijos no se pintan; la geometría lo confirma (§4.6). Es el mismo mecanismo que la categoría D de la It. 03 (el desarrollador la aceptó para el footer; **para el header queda pendiente de aceptación**, §8.3). Dentro de cada enlace de escritorio los espacios se conservan idénticos (la plantilla replica sus saltos de línea). A esto se suman, no visibles en tokens, los atributos `class` de los enlaces de escritorio, que pasan de varias líneas a una (10 por página), y los cierres de etiquetas vacías.
* **Footer:** 91 diferencias, las mismas que en la It. 03 (4, 12, 11, 22, 22 y 20 por página); 0 diferencias nuevas.
* **Comprobación fuerte:** header y capa tenue (de `<header>` hasta el cierre de `#mobile-menu-scrim`) **sin espacios ni comentarios**, con el conjunto vacío de sustituciones A aplicado al original, la secuencia de tokens de la referencia es **idéntica** a la de `_site/` en las 6 páginas (246 tokens de la referencia y 234 de la salida, antes de quitar espacios y comentarios; los 12 de diferencia son los `#ws`). **Diferencias no explicadas: 0.**
* **Hijos directos del `<body>`** (sin comentarios, espacios ni `<script>`), referencia frente a `_site/`: misma secuencia y mismas etiquetas con atributos en las 6 páginas; el único token distinto es la clase del `<footer>` de Inicio, Contacto y 404 (cambio aprobado en la It. 03).

| Página | Hijos directos del `<body>` (igual en la referencia y en `_site/`) |
|:-------|:---------------------------------------------------------------------|
| Servicios | `header › #mobile-menu-scrim › main › footer › #service-modal` |
| Suscripción Floral | `header › #mobile-menu-scrim › main › section › footer` |
| Galería | `header › #mobile-menu-scrim › main › #lightbox › section › footer` |
| Inicio, Contacto y 404 | `header › #mobile-menu-scrim › main › footer` |

* **Comentario de la capa tenue:** en la It. 02 Astro lo omitía del HTML publicado (era hijo directo del contenido del layout). Dentro del componente se conserva: sale en las 6 páginas, igual que en la referencia. El comparador ya no lo cuenta como "comentario de nivel 1 omitido" (una omisión menos por página).

### 4.3 Invariantes en `_site/*.html` [código]

Comandos: `grep -o` sobre las 6 páginas y un script de Node (fuera del repositorio) que extrae el bloque del header.

| Página | `style=` / `onclick` / `<style` / `href="#"` | `<script>` totales / sin `src` | `<header ` | `fixed` en descendientes del header | `fixed` en el propio `<header>` | `#mobile-menu-scrim` tras `</header>` | Dentro del header | IDs (duplicados) | `aria-current="page"` barra / panel | Enlace activo |
|:-------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:--|
| Inicio | 0 | 1 / 0 | 1 | 0 | sí (es su clase) | sí | no | 16 (0) | 1 / 1 | `inicio` |
| Servicios | 0 | 1 / 0 | 1 | 0 | sí | sí | no | 13 (0) | 1 / 1 | `servicios` |
| Suscripción Floral | 0 | 1 / 0 | 1 | 0 | sí | sí | no | 11 (0) | 1 / 1 | `suscripcion-floral` |
| Galería | 0 | 1 / 0 | 1 | 0 | sí | sí | no | 17 (0) | 1 / 1 | `galeria` |
| Contacto | 0 | 1 / 0 | 1 | 0 | sí | sí | no | 17 (0) | 1 / 1 | `contacto` |
| 404 | 0 | 1 / 0 | 1 | 0 | sí | sí | no | 6 (0) | 0 / 0 | (ninguno) |

* "Inmediatamente posterior" significa que entre `</header>` y `<div id="mobile-menu-scrim"` solo hay espacios y el comentario de la capa tenue (un nodo de comentario, no un elemento).
* `grep -o '<header'` cuenta 2 por página: el elemento y el texto `<header>` del comentario de la capa tenue; el elemento es 1 (`<header class`).
* `h-20`, `top-full`, `max-h-[calc(100dvh-5rem)]` y `top-20`: 1 coincidencia de cada una en cada página. El conjunto de IDs coincide con el de la It. 03 (16, 13, 11, 17, 17 y 6).
* Escenario 4: en `/a/b/inexistente` y `/servicios/xyz` (con `pnpm preview`) ningún enlace del header tiene `aria-current` (0). [render]

### 4.4 Fuente única (Escenario 1) [código]

`grep -rn "<header class" src/` y `grep -rln "mobile-menu-scrim" src/`: solo `src/components/SiteHeader.astro` (más `src/js/modules/navigation.js`, que lo usa como selector).

### 4.5 Interacción: foco atrapado (aclaración sobre lo pedido) [código y render]

La solicitud pedía comprobar "foco atrapado dentro del panel con Tab/Shift+Tab". `navigation.js` **no implementa ninguna trampa de foco** (solo Escape que devuelve el foco a la hamburguesa; el código no se tocó, lo exigía la iteración). En el sitio anterior y en el nuevo el foco **sale del panel** con Tab: tras Instagram pasa al primer enlace de la página (§4.7). Es un comportamiento previo, idéntico en ambos; no es una regresión. Se informa como hallazgo (§5.2).

### 4.6 Render real: header, panel y capa tenue [render]

**Cómo se hizo:** Chrome `155.0.8059.84` headless, perfil aislado en la carpeta temporal del agente y control por el protocolo de depuración desde scripts **fuera del repositorio** (cliente propio sobre `WebSocket` de Node; sin dependencias). La referencia (`referencia/sitio/`, el sitio anterior) se sirvió en `127.0.0.1:4400` con un servidor Node de solo lectura y el sitio nuevo con `pnpm preview` (`127.0.0.1:4321`); ambos detenidos al terminar (0 puertos abiertos y 0 procesos del arnés). **Sin red externa:** se bloquearon `fonts.googleapis.com`, `fonts.gstatic.com` y los `.mp4` en ambos lados; la tipografía es la de reserva del sistema y esto **no reproduce la apariencia de producción**. Movimiento reducido emulado. Antes de medir se espera a que no haya transiciones CSS en curso y a que las imágenes visibles estén decodificadas: una primera corrida, sin esa espera, midió colores a mitad de la transición `transition-colors` que corre cuando `theme.js` aplica `.dark` después de la carga (DT-15, ya registrada) y dio falsas diferencias de color en modo oscuro; se descartó y se repitió con la espera.

**Medición:** 6 páginas × 7 viewports (320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768, 1280×800) × claro y oscuro = 84 combinaciones por sitio. En cada una: posición y tamaño de los 58 elementos del header (el `<header>`, sus 56 descendientes y `#mobile-menu-scrim`) y 36 propiedades de estilo calculado por elemento; captura de la franja de 80 px del header; y, en los 5 viewports de menos de 1024 px (60 combinaciones), lo mismo con el panel abierto con un clic real en la hamburguesa y captura de toda la pantalla.

| Página | Combinaciones | Elementos medidos (cerrado + abierto) | Posición o tamaño > 0,5 px de diferencia | Estilo no explicado | Franja del header: idéntica / ≤ 1 nivel de 255 / más | Panel abierto (10 por página): capturas idénticas en bytes / con diferencia ≤ 1 nivel / con más |
|:-------|:-:|:-:|:-:|:-:|:-:|:-:|
| Inicio | 14 | 812 + 580 | 0 | 0 | 6 / 8 / 0 | 6 / 4 / 0 |
| Servicios | 14 | 812 + 580 | 0 | 0 | 6 / 8 / 0 | 6 / 4 / 0 |
| Suscripción Floral | 14 | 812 + 580 | 0 | 0 | 6 / 8 / 0 | 6 / 4 / 0 |
| Galería | 14 | 812 + 580 | 0 | 0 | 6 / 8 / 0 | 6 / 4 / 0 |
| Contacto | 14 | 812 + 580 | 0 | 0 | 6 / 8 / 0 | 5 / 5 / 0 |
| 404 | 14 | 812 + 580 | 0 | 0 | 6 / 8 / 0 | 0 / 10 / 0 |
| **Total** | **84** | **4.872 + 3.480 = 8.352** | **0** | **0** | **36 / 48 / 0** | **29 / 31 / 0** |

(Las 84 combinaciones se midieron en cada sitio. En la 404 ninguna captura del panel abierto es idéntica en bytes porque el footer, que aparece en la pantalla, cambió en la It. 03: por eso se compara solo por encima de él; ahí, 6 capturas tienen 0 niveles de diferencia y 4 tienen ≤ 1.)

* **Posición y tamaño:** diferencia máxima 0 px en las 8.352 mediciones, con el panel cerrado y abierto, y mismo `top` de `<main>`, mismo ancho de documento y mismo estado ARIA (`aria-expanded`, `aria-label`, clases `hidden`).
* **Estilo calculado:** 0 diferencias no explicadas. Las únicas, 2.016 pares elemento-propiedad, son el redondeo de un color con transparencia ya documentado en la It. 02 (§4.3): `border-outline-variant/30` y `bg-outline-variant/60` pasaron de `rgba(193, 201, 192, …)` a `rgba(192, 201, 191, …)` (1/255 por canal; el valor nuevo coincide con el token).
* **Capturas:** ninguna tiene un solo píxel con más de 1 nivel de diferencia (en las no idénticas, la diferencia máxima por canal es 1 de 255). Las capturas del panel abierto se comparan solo por encima del `<footer>` (las páginas cortas muestran el footer en la pantalla y este cambió en la It. 03: la 404 pierde 64 px sobre el footer).
* **Consola:** 0 errores o advertencias en las 168 cargas (sin contar las solicitudes bloqueadas a propósito).

### 4.7 Interacción (360 × 740, claro; referencia y sitio nuevo con los mismos pasos) [render]

Clics y teclas reales por el protocolo de depuración (`Input.dispatch*`), en las 6 páginas y en ambos sitios. Por prueba y página se exige que el resultado sea **igual al de la referencia** y que cumpla lo esperado.

| # | Prueba | Resultado (6 páginas) |
|:--|:-------|:----------------------|
| 1 | Abrir con el botón: `aria-expanded="true"`, `aria-label="Cerrar menú"`, panel y capa tenue visibles, ícono hamburguesa oculto y ícono cerrar visible, `overflow-hidden` en `<body>` | 6 de 6 |
| 2 | Cerrar con el botón: estado inicial y foco en la hamburguesa | 6 de 6 |
| 3 | Cerrar con un clic en la capa tenue (fuera del panel) | 6 de 6 |
| 4 | Cerrar con Escape: foco devuelto a la hamburguesa | 6 de 6 |
| 5 | Tab y Shift+Tab con el panel abierto (9 pulsaciones cada uno): mismo recorrido de foco que la referencia | 6 de 6 |
| 6 | Escape con el foco en un enlace del panel: foco devuelto a la hamburguesa | 6 de 6 |
| 7 | Clic en un enlace del panel cierra el menú (navegación cancelada para no salir de la página) | 6 de 6 |
| 8 | Pasar a 1280 px con el panel abierto lo cierra (`aria-expanded="false"`) | 6 de 6 |
| 9 | Cambio de tema claro → oscuro → claro: clase `.dark` / `.light`, `localStorage.theme`, ícono de sol y de luna | 6 de 6 |
| | **Total** | **54 de 54** (54 iguales a la referencia; 54 con el comportamiento esperado) |

* **Recorrido de Tab (igual en ambos sitios):** desde la hamburguesa, el foco va a `inicio → servicios → suscripcion-floral → galeria → contacto → WhatsApp → Instagram` (los 7 elementos del panel) y luego **sale** al primer enlace de la página (p. ej. "Explorar Servicios" en Inicio). Shift+Tab desde ahí vuelve por el panel hasta la hamburguesa. Es decir, no hay trampa de foco (ver §4.5 y §5.2).
* **404 anidadas** (`/a/b/inexistente` y `/servicios/xyz`, con `pnpm preview`): estado HTTP 404; fondo del `<body>` `rgb(248, 247, 243)` (estilos cargados); header de 80 px; 0 enlaces con `aria-current`; la única línea de consola es `Failed to load resource: the server responded with a status of 404 (Not Found)` del propio documento.

### 4.8 H8 (DT-02): barra de escritorio entre 1024 y 1440 px [render]

Se midió en las 6 páginas, claro y oscuro, a 1024, 1050, 1099, 1100, 1150, 1200, 1279, 1280, 1366 y 1440 px (alto 800), en ambos sitios: 120 mediciones por sitio, 240 en total.

| Ancho | Líneas de «Suscripción Floral» (máx.) | Alto del enlace | Solape máx. | Scroll horizontal | Holgura mín. marca → barra / barra → acciones |
|:------|:-:|:-:|:-:|:-:|:-:|
| 1024 | 1 | 40 px | 0 px | 0 px | 44,13 / 44,11 px |
| 1050 | 1 | 40 px | 0 px | 0 px | 57,13 / 57,11 px |
| 1099 | 1 | 40 px | 0 px | 0 px | 81,63 / 81,61 px |
| 1100 | 1 | 40 px | 0 px | 0 px | 82,13 / 82,11 px |
| 1150 | 1 | 40 px | 0 px | 0 px | 107,13 / 107,11 px |
| 1200 | 1 | 40 px | 0 px | 0 px | 132,13 / 132,11 px |
| 1279 | 1 | 40 px | 0 px | 0 px | 171,63 / 171,61 px |
| 1280 | 1 | 40 px | 0 px | 0 px | 108,83 / 108,83 px |
| 1366 | 1 | 40 px | 0 px | 0 px | 108,83 / 108,83 px |
| 1440 | 1 | 40 px | 0 px | 0 px | 108,83 / 108,83 px |

0 incumplimientos en las 120 mediciones del sitio nuevo, y **0 mediciones distintas de la referencia** (líneas, alto, ancho de cada enlace, solape, scroll, holguras). El solape se calcula entre elementos contiguos de izquierda a derecha: marca, los 5 enlaces y el clúster de acciones.

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

No se corrigió nada de lo siguiente.

1. **Categoría C (espacios) en el header, a aceptar:** 12 nodos de espacio por página desaparecen entre los enlaces de los dos `<nav>` (§4.2). Sin efecto de pintado medido (0 px de diferencia en 8.352 mediciones). El desarrollador la aceptó para el footer en la It. 03; para el header queda pendiente.
2. **No existe trampa de foco en el panel móvil** (`navigation.js`): Tab sale del panel hacia el contenido mientras el panel y la capa tenue siguen abiertos. Igual en la referencia. `DESIGN.md` §14.4 exige trampa de foco solo en modales. Si el desarrollador la quiere, es una mejora de comportamiento (cambia `navigation.js`), no un defecto de esta iteración; se propone la fila **SM-02** del registro §14 (§6).
3. **`data-path` y `data-active-classes` sin uso:** ningún módulo JS ni CSS los lee (§2.1). Se copiaron como estaban. Quitarlos sería una limpieza (cambia el marcado), fuera de alcance.
4. **Comentario de la capa tenue de nuevo en el HTML publicado:** al vivir en el componente, Astro ya no lo omite (§4.2). Coincide con la referencia.
5. **404 pierde sus 4 comentarios de "estado neutro"** (B). El estado neutro sigue expresado por `paginaActiva = null` en `404.astro`.
6. **Acción mía sobre el navegador del desarrollador:** para ubicar la versión de Chrome ejecuté `chrome.exe --version`; en Windows eso no imprime la versión y abrió una ventana en la sesión existente de Chrome. Sin consecuencia en el proyecto. El arnés usa desde entonces un perfil aislado.
7. **Primera corrida de render descartada** por medir colores durante la transición de tema (§4.6); se corrigió el arnés y se repitió. Los resultados de este documento son los de la segunda corrida.
8. **Sin deuda nueva.** No se agregan filas al §12.

## 6. Archivos modificados y propuestas para archivos protegidos

Archivos con cambios en Git (`git status`, solo lectura): modificados `src/layouts/BaseLayout.astro`, las 6 páginas de `src/pages/`, `decisiones-tecnicas.md` y `estado-actual.md`; nuevos `src/components/SiteHeader.astro` y esta bitácora. `_site/` y `.astro/` no aparecen (ignorados). `git diff --stat` de código: 7 archivos, +2 −1.309 (más el componente nuevo de 143 líneas).

**Scripts de verificación:** todos quedaron **fuera del repositorio** (carpeta temporal del agente): generador del componente (lee el header de Inicio y reemplaza los dos `<nav>`), retiro del header de las páginas, tokenizador y clasificador de diferencias (copia del tokenizador del comparador), invariantes, y el arnés de Chrome (servidor de la referencia, cliente del protocolo de depuración, geometría, interacción y H8). No se propone versionarlos.

**Propuestas para archivos protegidos** (las aplica el desarrollador; entregadas en el reporte de la sesión con el texto actual exacto):

| # | Archivo y sección | Qué cambia |
|:--|:------------------|:-----------|
| a | `AGENTS.md` §5, regla 6 (L124 a L128) | Retira la nota de "Transición": ambos componentes existen |
| b | `AGENTS.md` §7 (L163) | Retira la viñeta de paridad entre las 6 páginas |
| c | `_planificacion/README.md` §6, punto 5 (L108 a L110) | Misma nota de transición retirada |
| d | `DESIGN.md` §9, párrafo inicial | Indica que el marcado vive en `SiteHeader.astro` y que los enlaces salen de `navegacion.js` |
| e | `DESIGN.md` §9.4 | Agrega que el componente devuelve el header y la capa tenue como nodos hermanos |
| f | `DESIGN.md` §15 | Entrada de la Épica 08 · Iteraciones 03 y 04 |
| g | `README.md` | Sin cambios necesarios: ninguna línea describe el header como duplicado o en transición |

Nada sobre la línea 4 de `DESIGN.md` (pendiente separado del desarrollador). Fila propuesta para el registro §14, que decide el desarrollador: **SM-02**, "Panel móvil: trampa de foco con Tab y Shift+Tab", destino Épica 09 — Revisión móvil, estado Pendiente de definir.

## 7. Mensaje de commit sugerido

```text
Épica 08 - Iteración 04: Unifica el header y el panel móvil en un componente Astro.
```

Longitud contada con Node: 83 caracteres.

---

## 8. Estado, reservas y pendientes

### 8.1 Estado

**Completada con reservas.** No está 🔒 Cerrada (fusión a `main`, `_planificacion/README.md` §5).

### 8.2 Escenarios de aceptación

| Escenario | Estado | Evidencia |
|:----------|:-------|:----------|
| 1. Fuente única | ✅ confirmado por código | `<header class` y `mobile-menu-scrim` solo en `SiteHeader.astro` (y como selectores en `navigation.js`) (§4.4) |
| 2. DOM equivalente | ✅ confirmado por código | Header y capa tenue idénticos token a token a la referencia, sin espacios ni comentarios, en las 6 páginas; diferencias solo de espacios (C) y de los comentarios de la 404 (B) (§4.2) |
| 3. Menú móvil intacto | ✅ confirmado en render real | 54 de 54 pruebas iguales a la referencia en 360 × 740: botón, capa tenue, Escape y foco devuelto a la hamburguesa (§4.7) |
| 4. Estado neutro en la 404 | ✅ confirmado por código y en render real | 0 `aria-current` en `_site/404.html` y en `/a/b/inexistente` y `/servicios/xyz` (§4.3, §4.7) |

### 8.3 Reservas

1. **Sin revisión visual humana** del header y del panel móvil en las 6 páginas, claro y oscuro. La comparación fue automática, con Google Fonts y videos bloqueados.
2. **Categoría C (espacios) del header** pendiente de aceptación del desarrollador (§5.1).
3. **Sin dispositivo real ni Firefox ni Safari** en esta iteración; sin sensación táctil del menú ni de los objetivos de 44 px.
4. **Sin consola con red real** (fuentes de Google y videos) ni vista previa de Cloudflare de la rama actualizada.
5. Una sola corrida válida por combinación (la primera se descartó, §5.7); no se midió el ruido de esta medición. Las capturas no idénticas difieren como máximo 1 nivel de 255.

### 8.4 Pendientes del desarrollador (🕒 PENDIENTE)

* Mirar el header en las 6 páginas con las tipografías reales, en claro y oscuro, a 320, 360, 412, 768, 1024 y 1280 px: marca (texto con efecto spotlight), logotipos, barra de escritorio (enlace activo y subrayado al pasar el cursor), botones sociales y de tema.
* Probar el panel móvil en celular real: abrir y cerrar con el botón, tocando fuera y con un enlace; que no se desplace la página con el panel abierto; alto del panel con el teclado del sistema.
* Firefox y Safari: panel, capa tenue y cambio de tema.
* Teclado: Tab, Shift+Tab y Escape con el panel abierto (el foco sale del panel; ver §5.2).
* Decidir sobre la categoría C, la fila SM-02 y las propuestas para archivos protegidos (§6).
* Vista previa de Cloudflare de la rama: 6 páginas, `/a/b/inexistente` y `/servicios/xyz` con el header sin enlace activo.

### 8.5 Heredado a la Iteración 05

| Ítem | Detalle |
|:-----|:--------|
| Header y footer ya son componentes | `README.md` §5 (`components/`: `SiteHeader`, `SiteFooter` y `SeoHead`) solo está pendiente de `SeoHead` (It. 05) |
| `BaseLayout.astro` | Ahora renderiza `SiteHeader` y `SiteFooter`; la It. 05 solo agrega el SEO al `<head>` (`SeoHead`) |
| Comparador | Las diferencias del header contra la referencia quedan documentadas en §4.2 (C y B); las del footer, en la bitácora de la It. 03 |
| DT-15 (tema oscuro tras la carga) | Sin cambio; se observó otra vez que `theme.js` aplica `.dark` después del primer pintado y dispara `transition-colors` (§4.6) |
