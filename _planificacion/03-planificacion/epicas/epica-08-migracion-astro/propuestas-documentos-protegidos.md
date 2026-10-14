# Propuestas de Edición para Documentos Protegidos — Épica 08 (Migración a Astro)

> Estos cambios **no los aplica ningún agente**: los revisa y aplica el desarrollador (`AGENTS.md` §2).
> Se dividen en dos momentos: **antes de la It. 02** (sin ellos, migrar violaría las reglas vigentes) y **en la It. 08**
> (cuando lo implementado ya es real). Las rutas y comandos asumen las decisiones D1–D9 de `definicion-epica.md`.

---

## A. Antes de la Iteración 02

### Propuesta de edición — `AGENTS.md`
**Sección:** §4 Stack y comandos
**Motivo:** el stack pasa a Astro con salida estática; React deja de estar planificado.
```diff
-| Estructura      | HTML5 semántico, sitio multipágina (MPA) de 6 archivos             |
-| Estilos         | Tailwind CSS `3.4.x` compilado por CLI a `dist/css/output.css`     |
+| Estructura      | Astro `7.x` con salida estática: 6 páginas `.astro` en `src/pages/` (MPA) |
+| Estilos         | Tailwind CSS `3.4.x` vía PostCSS, procesado por Astro               |
 | Interactividad  | JavaScript Vanilla ES6+ en módulos (`src/js/`)                     |
```
```diff
-| `pnpm dev`    | Tailwind en modo observación.                                        |
-| `pnpm run build:cf` | Compila el CSS y genera `_site/` por lista blanca para Cloudflare Pages. |
+| `pnpm dev`    | Servidor de desarrollo de Astro (recarga en caliente).               |
+| `pnpm preview`| Sirve `_site/` tal como se publicará.                                |
+| `pnpm run build:cf` | `astro build`: genera `_site/` para Cloudflare Pages.          |
```
```diff
-- Los módulos ES no funcionan con `file://`. Para probar en navegador, sirve la raíz por HTTP (por ejemplo, la
-  extensión Live Server o `python -m http.server 5500`).
-- **React no forma parte del stack actual.** Su incorporación está planificada en la Épica 08 y no debe adelantarse.
+- Para probar en navegador usa `pnpm dev` o, tras compilar, `pnpm preview`.
+- **No se usan frameworks de interfaz** (React, Vue, Preact, etc.) ni islas hidratadas: Astro solo genera HTML en
+  compilación. Tailwind 4 queda fuera hasta una épica dedicada.
```

### Propuesta de edición — `AGENTS.md`
**Sección:** §5 Reglas de arquitectura
**Motivo:** las páginas pasan a `.astro`, header y footer dejan de estar duplicados y las rutas pasan a ser absolutas.
```diff
-1. **MPA estricta.** Seis archivos HTML físicos: `index.html`, `servicios.html`, `suscripcion-floral.html`,
-   `galeria.html`, `contacto.html` y `404.html`. Prohibido emular una SPA.
+1. **MPA estricta.** Seis páginas en `src/pages/` (`index`, `servicios`, `suscripcion-floral`, `galeria`, `contacto`
+   y `404`) que Astro compila a seis archivos HTML. Prohibido emular una SPA (sin `ClientRouter` ni transiciones de
+   página de Astro) y prohibidas las directivas `client:*`.
-2. **Cero JS y CSS en línea.** Prohibidos `style="..."`, `onclick` y `<script>` con lógica. Los únicos `style=`
-   existentes son deuda técnica registrada (ver `_planificacion/README.md` §12); no agregues nuevos.
+2. **Cero JS y CSS en línea.** Prohibidos `style="..."`, `onclick`, `<script is:inline>` y `<style>` en archivos
+   `.astro`. El único `<script>` permitido es el del layout que carga `src/js/main.js`.
-3. **Módulos ES6.** Toda la lógica vive en `src/js/modules/*.js`, se registra en `src/js/main.js` y exporta una
+3. **Módulos ES6.** Toda la lógica vive en `src/js/modules/*.js`, se importa de forma estática en `src/js/main.js` y exporta una
```
```diff
-6. **Header y footer están duplicados en los 6 HTML.** Todo cambio en ellos se replica en los 6 archivos con paridad
-   exacta, usando `index.html` como fuente de la verdad. Solo difiere el enlace activo; `404.html` no tiene ninguno.
+6. **Header y footer son componentes únicos** (`src/components/SiteHeader.astro` y `SiteFooter.astro`) y sus enlaces
+   salen de `src/data/navegacion.js`. Las clases activa e inactiva se escriben como cadenas literales completas. La
+   404 usa `paginaActiva = null`.
```
```diff
-8. **Rutas relativas** con `./` para todo recurso y enlace interno.
+8. **Rutas absolutas desde la raíz:** páginas sin extensión (`/servicios`) y recursos de `public/` sin el prefijo
+   (`/images/...`). Prohibido `./public/`.
-9. **Imágenes** en `.webp` bajo `public/images/`, con `width`, `height`, `alt` descriptivo y `loading="lazy"` bajo el
+9. **Imágenes** en `.webp` bajo `public/images/` (servidas como `/images/...`), con `width`, `height`, `alt` descriptivo y `loading="lazy"` bajo el
```

> Nota: mientras transcurren las It. 02 a 04, la regla 6 describe el estado final. Durante la It. 02 header y footer
> siguen duplicados dentro de las páginas `.astro`, con la misma exigencia de paridad que antes.

### Propuesta de edición — `AGENTS.md`
**Sección:** §7 Verificación mínima
```diff
-- `pnpm build` termina sin errores y `dist/css/output.css` contiene las clases nuevas (búscalas por texto).
-- Búsquedas de invariantes: 0 `style="` nuevos, 0 `onclick`, 0 `href="#"` en navegación y footer, IDs únicos.
-- Paridad entre los 6 HTML cuando se toca header o footer.
+- `pnpm run build:cf` termina sin errores y el CSS de `_site/_astro/` contiene las clases nuevas.
+- Búsquedas de invariantes en `_site/**/*.html`: 0 `style="`, 0 `onclick`, 0 `<style>`, 0 `<script>` sin `src`,
+  0 `href="#"` en navegación y footer, IDs únicos.
```

### Propuesta de edición — `_planificacion/02-arquitectura/stack-tecnologico.md`
**Sección:** §1 Núcleo tecnológico y §2 Reglas de CSS
```diff
-| **Estructura HTML**    | HTML5 Semántico (MPA)            | Seis páginas físicas (cinco de navegación y `404.html`). Cero emulaciones SPA. |
-| **Estilos**            | Tailwind CSS `v3.4.x`            | Compilación local por CLI (`dist/css/output.css`)                          |
-| **Interactividad**     | JavaScript Vanilla (ES6+)        | Módulos estrictos. Cero jQuery, cero frameworks React/Vue.                 |
-| **Despliegue**         | GitHub + Cloudflare Pages        | Despliegue continuo desde `main`, vistas previas por rama, comando `pnpm run build:cf`, salida `_site/` (lista blanca). |
+| **Estructura**         | Astro `7.x`, salida estática (MPA) | Seis páginas en `src/pages/`; layout y componentes compilados a HTML. Cero SPA, cero islas. |
+| **Estilos**            | Tailwind CSS `v3.4.x` vía PostCSS | Procesado por Astro; CSS con *hash* en `_site/_astro/`                    |
+| **Interactividad**     | JavaScript Vanilla (ES6+)        | Módulos estrictos. Cero jQuery, cero frameworks de interfaz (React/Vue/Preact). |
+| **Despliegue**         | GitHub + Cloudflare Pages        | Despliegue continuo desde `main`, vistas previas por rama, comando `pnpm run build:cf` (`astro build`), salida `_site/`. |
```
```diff
-* ✅ **Obligatorio:** Importar siempre el CSS compilado: `<link rel="stylesheet" href="./dist/css/output.css" />`.
+* ✅ **Obligatorio:** Importar `src/css/input.css` una sola vez, en el *frontmatter* de `BaseLayout.astro`.
+* ✅ **Obligatorio:** `build.inlineStylesheets: 'never'` y `vite.build.assetsInlineLimit: 0` en `astro.config.mjs`.
```
**Sección:** §3 Arquitectura JavaScript, punto 2
```diff
-2. **Módulos ES6:** Toda la lógica debe residir en `src/js/modules/*.js` y ser importada exclusivamente desde un
-   `src/js/main.js` inyectado al final del `<body>` con `type="module"`.
+2. **Módulos ES6:** Toda la lógica debe residir en `src/js/modules/*.js` e importarse de forma **estática** desde
+   `src/js/main.js`, que `BaseLayout.astro` carga al final del `<body>` con un `<script>` procesado por Astro.
```

### Propuesta de edición — `_planificacion/01-vision/proposito-y-alcance.md`
**Sección:** Fuera del alcance
```diff
-* **Frameworks JS:** Cero dependencias pesadas de UI (React, Vue, Alpine.js, jQuery).
-
-> **Nota:** La Épica 08 (planificada, pendiente de aprobación) propone componentes React con renderizado estático; su
-> aprobación exige actualizar este documento.
+* **Frameworks JS de interfaz:** Cero dependencias de UI en el navegador (React, Vue, Preact, Alpine.js, jQuery).
+  Astro se usa solo como generador estático en compilación y no envía JavaScript propio.
```

---

## B. En la Iteración 08 (cierre)

### Propuesta de edición — `README.md`
**Secciones:** §1, §2, §5, §7, §8 y §15
**Motivo:** reflejar la estructura Astro implementada.
```diff
-El sitio es una aplicación **multipágina (MPA) estática**: seis documentos HTML independientes, estilizados con
-Tailwind CSS compilado localmente y animados con módulos de JavaScript nativo (ES6+). No depende de frameworks de
-interfaz, de un backend ni de un gestor de contenidos, lo que permite tiempos de carga bajos, un despliegue simple y un
-mantenimiento predecible.
+El sitio es una aplicación **multipágina (MPA) estática** generada con **Astro**: seis páginas que comparten un layout,
+un header y un footer únicos, estilizadas con Tailwind CSS y animadas con módulos de JavaScript nativo (ES6+). Astro
+trabaja solo en compilación: el navegador recibe HTML completo, sin frameworks de interfaz, backend ni gestor de
+contenidos.
```
§2: la columna "Ruta" pasa de `/index.html`, `/servicios.html`… a `/`, `/servicios`…

§5, estructura del repositorio:
```diff
-├── index.html · servicios.html · suscripcion-floral.html
-├── galeria.html · contacto.html · 404.html
+├── astro.config.mjs · postcss.config.cjs
 ├── AGENTS.md                  # Reglas para agentes de IA (Claude Code, Antigravity)
 ...
-├── dist/
-│   └── css/output.css         # CSS compilado (generado por pnpm build)
-├── _site/                     # Carpeta publicable generada por pnpm run build:cf (ignorada por Git)
+├── _site/                     # Salida de astro build, publicada por Cloudflare (ignorada por Git)
 ├── public/
+│   ├── _redirects             # /public/* → /:splat (URLs antiguas)
+│   ├── robots.txt
 ...
 ├── src/
+│   ├── pages/                 # index, servicios, suscripcion-floral, galeria, contacto y 404 (.astro)
+│   ├── layouts/BaseLayout.astro
+│   ├── components/            # SiteHeader, SiteFooter, SeoHead
+│   ├── data/navegacion.js     # Fuente única de rutas y etiquetas
 │   ├── css/input.css          # Capa base, variables de tema y componentes CSS
```
§7 y §8: reemplazar el flujo "Tailwind en observación + servidor HTTP aparte" por `pnpm dev` (Astro) y `pnpm preview`;
la tabla de scripts según lo propuesto para `AGENTS.md` §4.

§15, hoja de ruta:
```diff
-2. **Épica 08 — Componentes React con renderizado estático:** header, navegación y footer como componentes
-   reutilizables, generados como HTML en tiempo de compilación para conservar el rendimiento y el SEO actuales.
+2. **Épica 08 — Migración estructural a Astro:** layout, header, footer y SEO como componentes únicos, generados como
+   HTML estático en compilación, con el mismo contenido, diseño y despliegue en Cloudflare Pages.
```

### Propuesta de edición — `DESIGN.md`
Solo si algún apartado menciona `dist/css/output.css`, rutas `./public/` o "los 6 HTML" como lugar donde se edita el
header o el footer: se reemplaza por la ruta del componente correspondiente. La Iteración 08 entrega la lista exacta de
líneas.
