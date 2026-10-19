
## Automatización de SVGs (Build Tool)
Se creó un script de Node.js en la carpeta scripts/replace-icons.js para inyectar SVGs puros extrayendo las clases relativas a Tailwind de los spans originales (heredando propiedades interactivas y dimensiones). Esta decisión garantiza el 100% de fidelidad de diseño estático y se ha preservado de manera estándar como una herramienta automatizada (Build Tool) vital para procesar y optimizar velozmente todo futuro archivo HTML generado para las siguientes vistas de este proyecto Multi-Page (MPA).

## Aplazamiento de Google Places API (Fase 2)
Por decisión del negocio y priorizando la velocidad de lanzamiento y estabilidad del DOM, se ha optado por suspender la integración en tiempo real o en *Build-Time* pura con Google Cloud Platform (Google Places API). 
Esta funcionalidad se retomará como un "Mini-proyecto" en la Fase 2 del desarrollo web. 

Para suplantar este vacío, se estructuró una base de datos local y estática en `src/js/data/reviews.js`. Un módulo ES6 renderiza dichas tarjetas del lado del cliente (`carousel.js`) empleando Template Literals; este esquema mantiene la independencia de conectividad, garantizando renderizado inmediato, elegancia mediante tipografías cruzadas (Noto Serif para las comillas, Montserrat para metadatos) y Cero Dependencias de backend o *workflows* complejos en CI/CD por el momento.

## Despliegue por lista blanca (`_site/`) — Épica 07, Iteración 01
Cloudflare Pages publica solo la carpeta `_site/`, que `pnpm run build:cf` genera con `scripts/stage-site.mjs` copiando las 6 páginas HTML, `dist/`, `public/` y `src/js/` (más `_headers`, `_redirects`, `robots.txt` y `sitemap.xml` si existen). `_site/` es desechable y está en `.gitignore`.

Motivos:

1. Una lista blanca no puede filtrar por olvido lo que una lista negra sí: todo archivo nuevo de la raíz (documentación, configuración, planificación) queda fuera por construcción.
2. El script falla si falta un directorio requerido, y un build fallido no reemplaza el despliegue vigente en producción.
3. La configuración de Cloudflare queda estable entre ramas: cada rama define qué hace `build:cf` en su propio `package.json` (clave para la Épica 08).
4. Límites de Cloudflare Pages vigilados: 25 MiB por archivo y 20 000 archivos por despliegue. Medición al cerrar la iteración: 112 archivos; el mayor, `nmg2.mp4`, pesa 22.715.000 bytes (86,7 % del límite).

Guardas de `stage-site.mjs` (todas se evalúan antes de borrar `_site/`; si una falla, se aborta sin borrar nada):

* Hay páginas `.html` en la raíz y existen `dist/`, `public/` y `src/js/`.
* `_site/` no contiene código fuente (`src/css`, `tailwind.config.js`, `package.json`): la carpeta de salida nunca es de trabajo.
* **Nueva (Iteración 01, tras el incidente de `_site/`):** `scripts.build` de `package.json` (leído sin BOM) no contiene `_site` y sí contiene `dist/css/output.css`, y `dist/css/output.css` existe con más de 0 bytes. Evita publicar en silencio un CSS desactualizado cuando la compilación escribe fuera de `dist/`.

## Cierre de la Épica 07 con reservas — 14-10-2026

* **Decisión del desarrollador:** la Épica 07 se cierra "Completada con reservas". Las verificaciones manuales pendientes
  (DT-14 en producción, favicon en una pestaña real, Firefox y Safari, traza de pintado en móvil real, contraste forzado
  real de Windows) **no bloquean** la Épica 08 y quedan en "Seguimiento posterior al cierre" de su `definicion-epica.md`.
* **Criterio:** una casilla del DoD se marca `[x]` solo con evidencia citada en una bitácora; la evidencia parcial deja la
  casilla abierta con una nota.
* **Galería:** las cancelaciones `net::ERR_ABORTED` de `.mp4` son comportamiento normal de Chrome con videos grandes
  (diagnóstico en la bitácora de cierre §3); no se registran como deuda.

## Casilla de permisos de la Épica 07 cerrada por configuración — 14-10-2026

* **Decisión del desarrollador:** la casilla del DoD sobre permisos de Claude Code se cierra con la verificación de
  `.claude/settings.json` (JSON válido; `deny` de `Edit` y `Write` sobre `AGENTS.md`, `README.md` y `DESIGN.md`, `deny` de
  `Edit` sobre `CLAUDE.md`, `CLAUDE.local.md` y `.claude/**`, `deny` de Git que escribe, y `ask` de `Edit` sobre
  `package.json`, `pnpm-lock.yaml`, `tailwind.config.js`, `01-vision/**` y `02-arquitectura/**`).
* **Alternativa descartada:** exigir una prueba de bloqueo real (intentar escribir un archivo protegido). Se descartó
  porque `AGENTS.md` §2 prohíbe a los agentes modificar esos archivos, ni siquiera "para probar"; queda como verificación
  opcional del desarrollador.
* **Límite aceptado:** las escrituras desde `Bash` (Node, `sed -i`) no tienen regla; las cubren `AGENTS.md` y la revisión
  con `git diff` antes de cada commit.

## ADR-001 — Migración estructural a Astro (Épica 08)

* **Estado:** Aprobada (14-10-2026). El desarrollador revisó y aceptó las decisiones D1 a D9.

### Contexto

* El header, el panel móvil y el footer están **duplicados en los 6 HTML**, y todo cambio en ellos exige paridad exacta
  en los 6 archivos (`AGENTS.md` §5, regla 6).
* El costo ya se pagó: la Fase 2 de la Épica 06 (Iteraciones 07 a 13) replicó el nuevo header una página por iteración y
  el Hallazgo H8 obligó a repetir la corrección, idéntica, en los 6 archivos. La Épica 07 · Iteración 03 corrigió además
  defectos nacidos de esa duplicación (DT-01, marcado roto en el footer de Servicios; DT-13, ícono de Facebook del
  footer en las 6 páginas).
* El `<head>` (metadatos, fuentes, favicon) también está repetido, y el SEO técnico pendiente (DT-04, DT-08) obligaría a
  editar 6 `<head>` a mano.
* Objetivo de la épica: cambiar **solo la estructura** (de 6 HTML escritos a mano a un proyecto Astro con un layout y
  componentes compartidos), sin cambiar lo que ve ni lo que recibe el visitante: mismo contenido, imágenes, estilos,
  diseño, módulos Vanilla y configuración de Cloudflare Pages.
* La prueba de concepto de la planificación (Astro `7.3.8` + Tailwind `3.4.19` vía PostCSS, 13-10-2026) compiló el Inicio,
  Servicios y la 404 sin errores y con 0 scripts y 0 estilos en línea. Es evidencia de factibilidad, no de paridad: la
  paridad se certifica en las iteraciones.

### Decisión

| #  | Decisión |
|:---|:---------|
| D1 | **Astro `7.4.0`** exacta (sin `^`; serie `7.x`), salida estática, **sin adaptador**. `@astrojs/cloudflare` solo hace falta para SSR. Requiere **Node `>= 22.22.0`**. *(Corregida el 18-10-2026: la versión original decía `7.3.8`, "sin actualizar"; ver "Corrección de D1" más abajo.)* |
| D2 | **Tailwind CSS `3.4.19` vía PostCSS** (`postcss.config.cjs` con `tailwindcss` y `autoprefixer`). `tailwind.config.js` se conserva y solo cambia `content`. La integración `@astrojs/tailwind` no admite Astro 7. |
| D3 | `build.format: 'file'` y `trailingSlash: 'never'`: genera `servicios.html`, etc., con los nombres de hoy; Cloudflare mantiene su redirección 308 a `/servicios`. |
| D4 | `outDir: './_site'`; `build:cf` pasa a ser `astro build`. Cloudflare Pages no cambia de configuración. |
| D5 | `build.inlineStylesheets: 'never'` y `vite.build.assetsInlineLimit: 0`: la salida mantiene "cero JS y CSS en línea". |
| D6 | `public/` se queda donde está y se sirve desde la raíz (`/images/...`, `/logos/...`, `/icons/...`). Se agrega `public/_redirects` con `/public/*  /:splat  301` para no romper URLs antiguas. Alternativa B, validada en la prueba: `publicDir: './static'` con `static/public/`. |
| D7 | **Rutas absolutas desde la raíz** (`/`, `/servicios`, `/images/...`) en lugar de `./`. Corrige la 404 en rutas anidadas y evita la redirección 308 en cada clic interno. |
| D8 | Los módulos Vanilla de `src/js/` **no se reescriben**: `main.js` pasa a importaciones estáticas (cierra DT-10) y se carga con un `<script>` procesado por Astro en el layout, que sale como archivo externo con *hash*. |
| D9 | Páginas en `src/pages/*.astro`; solo layout, header, footer y `<head>` se componentizan de forma obligatoria. Las secciones de cada página se copian literales. Componentizar secciones repetidas es opcional (Iteración 06). |

Estructura objetivo: `src/pages/` (6 páginas), `src/layouts/BaseLayout.astro`, `src/components/` (`SiteHeader`,
`SiteFooter`, `SeoHead`), `src/data/navegacion.js`, `astro.config.mjs` y `postcss.config.cjs`.

### Corrección de D1 — 18-10-2026 (Épica 08 · Iteración 02, ajuste de cierre)

* **Qué cambia:** D1 pasa de Astro `7.3.8` a **`7.4.0` exacta (sin `^`)**, con el requisito de **Node `>= 22.22.0`**.
* **Causa:** la especificación de la Iteración 02 pedía `astro@^7.3.8`; el caret permite versiones posteriores y `pnpm add`
  resolvió `7.4.0`. El ADR-001 decía `7.3.8` "sin actualizar", pero nada en el repositorio lo fijaba. `7.3.8` fue la versión de
  la prueba de concepto del 13-10-2026 (ver Contexto), que se conserva tal como ocurrió.
* **Node:** `astro@7.4.0` declara `engines.node: ">=22.22.0"` (confirmado por código en `node_modules/astro/package.json`).
  Los documentos decían `>= 22.13` (y la definición de la épica, "Astro 7 exige `>= 22.12`"): el mínimo declarado del
  proyecto sube a **Node `>= 22.22`**.
* **Evidencia del despliegue (reportada por el desarrollador, 18-10-2026):** Cloudflare Pages compiló el último *commit*
  de la rama (`b26a14c`) sin errores con **Node 22.22.2** (`NODE_VERSION=22.22.2`) y **Astro 7.4.0**. Esta sesión no vio el
  registro de Cloudflare; el dato es el que informó el desarrollador.
* **Decisión del desarrollador:** fijar `7.4.0` exacta, subir el mínimo de Node a `22.22` y no reabrir la alternativa de
  volver a `7.3.8`. `package.json` y `pnpm-lock.yaml` ya reflejan `7.4.0` exacta. Los documentos protegidos y
  `stack-tecnologico.md` se actualizan por propuesta (`propuestas-documentos-protegidos.md`, sección E).

### Alternativas descartadas

* **Vite + React con *prerender* propio** (plan anterior de la Épica 08, "Componentes React con Renderizado Estático"):
  exige un plugin de *prerender* propio, traducir los 6 HTML a JSX y mantener esa maquinaria; Astro entrega el mismo
  resultado (HTML estático con componentes) con copia literal del marcado.
* **React en el cliente:** envía JavaScript de interfaz al navegador y pierde el HTML completo sin JavaScript, con costo en
  rendimiento y SEO; contradice el objetivo de no cambiar lo que recibe el visitante.
* **Tailwind 4 en esta épica:** cambia la configuración y los valores por defecto (riesgo de regresión visual) y mezclarlo
  con la migración estructural impediría atribuir diferencias; queda para una épica futura.

### Consecuencias

* **Cambia el stack declarado.** Documentos a actualizar, según `propuestas-documentos-protegidos.md` (fuente vigente;
  los edita el desarrollador; **ninguna propuesta aplicada todavía** al 16-10-2026):
    * **Antes de la Iteración 02:** `AGENTS.md` §4, §5 (con las correcciones A1 y A2), §7 (con A3) y §9;
      `stack-tecnologico.md`; `proposito-y-alcance.md`; `_planificacion/README.md` §6 y §7; `objetivos-y-metricas.md`;
      y `README.md` (sección B completa).
    * **En la Iteración 08:** `DESIGN.md`.
* **Se retiran** `scripts/stage-site.mjs` (Astro publica solo lo que compila más `public/`) y `dist/`
  (`dist/css/output.css` deja de versionarse; cierra DT-16).
* **Las rutas pasan de `./` a `/`:** la 404 deja de depender de `<base href="/">` para funcionar en rutas anidadas
  (DT-14, hoy corregida con `<base>` y pendiente de verificar en producción) y se corrigen las rutas `./public/` también
  en los datos JS (`services.js`, `carousel.js`, `data-src` de la Galería).
* **Se cierran** DT-10, DT-16 y DT-17 (Iteración 02), DT-06 (Iteración 03) y DT-04 y DT-08 (Iteración 05).
* La configuración de Cloudflare Pages no cambia (`pnpm run build:cf`, directorio `_site`); `main` no se toca hasta la
  Iteración 08, y revertir producción es un clic en el panel de Cloudflare.
* Riesgos y mitigaciones: ver `definicion-epica.md` §7. La referencia de paridad es la instantánea de la Iteración 01
  (`referencia/`, fuera de Git).

## ADR-002 — Dominio canónico sin www

* **Estado:** Aprobada (16-10-2026). Decisión del desarrollador.

### Contexto

* **Reportado por el desarrollador** (captura de la pestaña Red de DevTools, con la fecha del reloj del sistema):
  `www.lajardinerafloreria.cl` responde **301** y redirige a `lajardinerafloreria.cl`, que responde **200**. No se
  verificó desde el agente (sin red).
* **Confirmado por código:** los documentos nombran el dominio con `www` (`AGENTS.md` L4, `README.md` L8, L63 y L167,
  `DESIGN.md` L4), y el ejemplo de `astro.config.mjs` de la Épica 08 · Iteración 02 (L73) usaba
  `site: 'https://www.lajardinerafloreria.cl'`. La especificación de la Épica 07 · Iteración 04 suponía lo contrario
  (el dominio sin `www` redirigiría a `www`).
* La línea base de Lighthouse de la Épica 08 · Iteración 01 se midió sobre el dominio sin `www`.
* Hoy no existen `canonical`, Open Graph, `sitemap.xml` ni `robots.txt` (DT-08); se crean en la Iteración 05.

### Decisión

* El dominio canónico es **`https://lajardinerafloreria.cl`** (sin `www`).
* **Sin cambios** en Cloudflare ni en producción: el apex ya sirve el sitio y `www` ya redirige con 301.

### Alternativas descartadas

* **Canónico con `www`:** exigiría cambiar la redirección en Cloudflare y contradice lo medido y observado en producción.

### Consecuencias

* `site` de Astro (Iteración 02) y las URL absolutas de `canonical`, Open Graph, `sitemap.xml` y `robots.txt` de la
  Iteración 05 usan `https://lajardinerafloreria.cl`.
* Documentos protegidos a corregir mediante propuesta (Sección C de `propuestas-documentos-protegidos.md`): `AGENTS.md`
  L4, `README.md` L8, L63 y L167 (antes de la Iteración 02) y `DESIGN.md` L4 (Iteración 08).
* Las especificaciones y bitácoras de la Épica 07 y la Iteración 01 de la Épica 08 son historial y conservan `www`.
* Las acciones del desarrollador de la Iteración 05 (Search Console, vistas previas) deben hacerse sobre el dominio sin
  `www`; la propiedad de Search Console 🕒 PENDIENTE de revisar por el desarrollador.

## Épica 08 · Iteración 02 — Decisiones de configuración de Astro — 17-10-2026

* **`compressHTML: false` en `astro.config.mjs`.** Con la compresión por defecto, Astro elimina los espacios entre un
  texto y la etiqueta en línea que le sigue: en Contacto, `Nombre <span>*</span>` salía como `Nombre<span>*</span>` y
  `Teléfono <span>(opcional)</span>` como `Teléfono<span>(opcional)</span>`. Se detectó en la comparación visual (render real
  en Chrome 155 headless, Contacto a 768 px, 550 píxeles con diferencia de más de 8 niveles) y no en la comparación de marcado,
  que normalizaba los espacios; el comparador (`scripts/comparar-con-referencia.mjs`) ahora conserva los espacios de borde.
  **Alternativa descartada:** dejar la compresión y reponer a mano cada espacio con `{" "}`: contradice la copia literal de
  la iteración. **Costo:** sin compresión de HTML, `_site/index.html` mide 88.488 B (el original, 94.101 B); no se midió la salida
  comprimida, que además se entrega con la compresión de transporte de Cloudflare.
* **Versión de Astro:** `pnpm add -D astro@^7.3.8` resolvió **7.4.0** (el ADR-001 fijaba 7.3.8 "sin actualizar"; el rango `^7.3.8`
  de la especificación lo permitía). **Decidido por el desarrollador el 18-10-2026:** `package.json` queda con
  `"astro": "7.4.0"` **exacta, sin `^`**, y el *lockfile* fija 7.4.0 (`specifier: 7.4.0`; pnpm exige que coincida con
  `package.json`). Tailwind sigue en 3.4.19. El ADR-001 se corrigió (ver "Corrección de D1").
* **Node mínimo `>= 22.22`.** `astro@7.4.0` exige Node `>= 22.22.0`; Cloudflare ya compila con `NODE_VERSION=22.22.2`
  (build correcto del 18-10-2026, informado por el desarrollador). El mínimo declarado del proyecto sube de `>= 22.13` a
  `>= 22.22`. `package.json` no declara `engines` (solo `devEngines.packageManager`) y no existen `.nvmrc` ni
  `.node-version`; agregar `engines` queda como propuesta, no como cambio.
* **`BaseLayout.astro` recibe `bodyClass`, `noindex` y `description` opcional.** Las 6 páginas no comparten las clases de
  `<body>` (Inicio y Servicios: base; Galería: base más `selection:*`; Contacto y 404: base más `flex flex-col min-h-screen`),
  ni el `<head>` (el Inicio no tiene `<meta name="description">`, DT-04; la 404 tiene `robots`). Se pasan como propiedades en
  vez de unificarlas (la especificación ordena detenerse y reportar antes de unificar).
* **Hojas de estilo y scripts externos con *hash*.** Se verificó en `_site/`: 1 CSS (`_astro/BaseLayout.<hash>.css`) y 1 JS
  (`_astro/BaseLayout.astro_astro_type_script_index_0_lang.<hash>.js`), 0 `<style>`, 0 `style=` y 0 `<script>` sin `src`.

## Épica 08 · Iteración 03 — Decisiones del footer — 18-10-2026

Decididas por el desarrollador tras la Tarea 0 (inventario de las dos variantes del footer, DT-06) y aplicadas en `src/components/SiteFooter.astro`.

* **Contenedor único del footer: `border-t border-outline-variant/20`, sin margen externo (sin `mt-space-8`).** Es la variante que
  ya tenían Servicios, Suscripción y Galería. Inicio, Contacto y 404, que usaban `mt-space-8`, pierden 64 px sobre el footer y ganan
  una línea fina de 1 px. Es el único cambio de contenedor aprobado: no se agregan clases de margen ni de padding a las páginas
  para compensar. **Motivo:** un componente que trae su propio margen externo decide por la página; sin margen, cada página controla
  su espacio, y la variante usa un token ya autorizado en `DESIGN.md` §2.5 (`outline-variant` con opacidad `/20`).
  **Alternativa descartada:** `mt-space-8` para las seis (agrega 64 px y quita la línea en Servicios, Suscripción y Galería).
* **Enlace activo del footer con `font-body-sm text-body-sm` (14 px).** Hasta ahora el enlace activo no llevaba esas clases y se
  veía a 16 px frente a los 14 px de los inactivos. Corrección aprobada de `DESIGN.md` §5.3 (la 404 no tiene enlace activo y no
  cambia). Las clases del enlace activo y del inactivo viven como dos cadenas literales completas dentro de `SiteFooter.astro`,
  elegidas con un ternario (`AGENTS.md` §5, regla 5).
* **Sin `etiquetaFooter`.** Las etiquetas de navegación del footer son idénticas a las del header y a `NAVEGACION`. El enlace de marca
  del footer lleva `data-path="inicio"` y no sale de `NAVEGACION`: se conserva tal cual.

## Épica 08 · Iteración 04 — Decisiones del header — 18-10-2026

Decisiones del agente dentro del alcance de la iteración (extracción literal, sin mejoras), aplicadas en `src/components/SiteHeader.astro`. El desarrollador puede revertirlas; ninguna cambia el aspecto ni el comportamiento medidos.

* **El componente devuelve dos nodos hermanos:** `<header>` y, justo después, el comentario de la capa tenue y `<div id="mobile-menu-scrim">`. `BaseLayout.astro` lo renderiza como primer hijo de `<body>`, antes de `<slot />`, con `paginaActiva`. **Motivo:** mantiene el invariante de `AGENTS.md` §5, regla 7 (la capa tenue es hermana del header, nunca descendiente) y el orden del DOM de la referencia en las 6 páginas. Efecto lateral: el comentario de la capa tenue vuelve al HTML publicado (en la It. 02 Astro lo omitía al ser hijo directo del contenido del layout), igual que en la referencia.
* **Comentarios unificados sobre los de Inicio** (fuente de la verdad). La 404 pierde 4 comentarios de "estado neutro" (el estado neutro sigue expresado por `paginaActiva = null`). **Alternativa descartada:** parametrizar los comentarios por página, que agrega una propiedad solo para comentarios.
* **Solo los 5 enlaces de la barra (con su subrayado) y los 5 del panel móvil salen de `NAVEGACION`.** El enlace de marca (`data-path="inicio" href="/"`), Instagram, WhatsApp, el botón de tema y la hamburguesa son estáticos. `data-path` y `data-active-classes` se conservan aunque ningún módulo JS ni CSS los lea (0 coincidencias en `src/js`, `src/css` y `tailwind.config.js`).
* **Clases activa e inactiva como cadenas literales completas** en ternarios (`AGENTS.md` §5, regla 5), también las del subrayado de escritorio. `aria-current` solo en el enlace activo (`undefined` en los demás). Las clases de los enlaces de escritorio pasan de varias líneas a una (los navegadores las tratan igual).
* **Los espacios entre los enlaces de los dos `<nav>` desaparecen** al generarlos con `NAVEGACION.map(...)` (12 nodos `#ws` por página). Ambos `<nav>` son contenedores flex y no los pintan (0 px de diferencia en 8.352 mediciones). Mismo mecanismo que la categoría D de la It. 03; para el header, **pendiente de aceptación del desarrollador**. **Alternativa descartada:** reponerlos con `{"
"}` entre enlaces, que ensucia el componente sin efecto visible.
* **Sin `etiquetaHeader`:** las etiquetas del header (barra y panel) son idénticas a las de `NAVEGACION` en las 6 páginas de la referencia y de `_site/`.
* **No se tocó `navigation.js` ni `theme.js`.** `navigation.js` no implementa trampa de foco en el panel móvil (Escape devuelve el foco a la hamburguesa); es un comportamiento previo, idéntico en la referencia (ver la bitácora de la It. 04, §4.5 y §5.2).
