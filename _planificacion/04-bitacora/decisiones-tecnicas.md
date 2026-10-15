
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
| D1 | **Astro `7.3.8`** (serie `7.x`), salida estática, **sin adaptador**. `@astrojs/cloudflare` solo hace falta para SSR. |
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

### Alternativas descartadas

* **Vite + React con *prerender* propio** (plan anterior de la Épica 08, "Componentes React con Renderizado Estático"):
  exige un plugin de *prerender* propio, traducir los 6 HTML a JSX y mantener esa maquinaria; Astro entrega el mismo
  resultado (HTML estático con componentes) con copia literal del marcado.
* **React en el cliente:** envía JavaScript de interfaz al navegador y pierde el HTML completo sin JavaScript, con costo en
  rendimiento y SEO; contradice el objetivo de no cambiar lo que recibe el visitante.
* **Tailwind 4 en esta épica:** cambia la configuración y los valores por defecto (riesgo de regresión visual) y mezclarlo
  con la migración estructural impediría atribuir diferencias; queda para una épica futura.

### Consecuencias

* **Cambia el stack declarado:** `AGENTS.md` §4, §5 y §7, `stack-tecnologico.md` y `proposito-y-alcance.md` deben
  actualizarse **antes** de la Iteración 02 (propuestas en `propuestas-documentos-protegidos.md`, sección A); `README.md` y
  `DESIGN.md`, en la Iteración 08 (sección B). Los edita el desarrollador.
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
