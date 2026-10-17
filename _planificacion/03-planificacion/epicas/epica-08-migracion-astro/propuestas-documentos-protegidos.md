# Propuestas de Edición para Documentos Protegidos — Épica 08 (Migración a Astro)

> Estos cambios **no los aplica ningún agente**: los revisa y aplica el desarrollador (`AGENTS.md` §2).
> **Fuente única y vigente** (reescrita el 16-10-2026, Épica 08 · Iteración 01, ajuste 2; ajustada en el ajuste 3).
> Reemplaza a la versión anterior de este archivo y a las listas de la bitácora de la Iteración 01 (§5.7, §6 y §8.2).
> Las rutas y comandos asumen las decisiones D1 a D9 del ADR-001 (`decisiones-tecnicas.md`).
> Cada línea `-` de los bloques `diff` se comprobó por programa contra el texto actual del archivo.
> Algunos bloques usan cuatro acentos graves como delimitador porque contienen bloques de código anidados.

## Cómo aplicarlas (instrucción para el desarrollador)

1. **Este archivo es la única fuente vigente.** No uses las listas ni los textos de las bitácoras anteriores.
2. En cada bloque `diff`: la línea que empieza con `-` se **borra** del documento, la que empieza con `+` se **agrega**,
   y la que empieza con un espacio es contexto (se deja como está). Los prefijos `-`, `+` y el espacio no forman parte
   del texto.
3. **Orden sugerido** (de menor a mayor dependencia de lectura entre documentos):
    1. `AGENTS.md`: A.1, A.2, A.3 y A.4.
    2. `_planificacion/02-arquitectura/stack-tecnologico.md`: A.5.
    3. `_planificacion/01-vision/`: A.6 (`proposito-y-alcance.md`) y A.8 (`objetivos-y-metricas.md`).
    4. `_planificacion/README.md`: A.7.
    5. `README.md`: A.9.
4. Si un `-` no coincide con el texto actual (por ejemplo, porque editaste el documento después del 16-10-2026),
   detente y avisa: la propuesta debe regenerarse contra el texto vigente.
5. Cuando termines, avisa para registrar el cierre del Escenario 2 de la Iteración 01.

---

## 0. Estado de las propuestas

**Ninguna aplicada todavía.** Decisión del desarrollador: aplicará a mano, juntas, todas las de la sección A después
del reporte del ajuste 3 de la Iteración 01 y **antes de la Iteración 02**. `DESIGN.md` queda para la Iteración 08.

| #   | Archivo y sección | Momento | Estado |
|:----|:------------------|:--------|:-------|
| A.1 | `AGENTS.md` §4 Stack y comandos (incluye la nota de transición) | Antes de la It. 02 | 🕒 Pendiente de aplicar |
| A.2 | `AGENTS.md` §5 Reglas de arquitectura (incluye las correcciones A1, regla 8, y A2, regla 6) | Antes de la It. 02 | 🕒 Pendiente de aplicar |
| A.3 | `AGENTS.md` §7 Verificación mínima (incluye la corrección A3, línea de paridad) | Antes de la It. 02 | 🕒 Pendiente de aplicar |
| A.4 | `AGENTS.md` §9 Contexto de despliegue | Antes de la It. 02 | 🕒 Pendiente de aplicar |
| A.5 | `_planificacion/02-arquitectura/stack-tecnologico.md` §1, §2 y §3 | Antes de la It. 02 | 🕒 Pendiente de aplicar |
| A.6 | `_planificacion/01-vision/proposito-y-alcance.md` §3 (fuera del alcance) | Antes de la It. 02 | 🕒 Pendiente de aplicar |
| A.7 | `_planificacion/README.md` §6 y §7 | Antes de la It. 02 | 🕒 Pendiente de aplicar |
| A.8 | `_planificacion/01-vision/objetivos-y-metricas.md` (título, carácter de los umbrales de la introducción y §3, punto 4) | Antes de la It. 02 | 🕒 Pendiente de aplicar |
| A.9 | `README.md`, sección B completa (nota de transición y §1, §2, §4, §5, §6, §7, §8, §10, §12 y §15) | Antes de la It. 02 | 🕒 Pendiente de aplicar |
| —   | `README.md`: nota mínima de transición (propuesta #4 de la bitácora de la It. 01, §8.2) | — | ❌ **Descartada**: la reemplaza A.9, que ya incluye la nota |
| B.1 | `DESIGN.md` | Iteración 08 | 🕒 Pendiente (la It. 08 entrega las líneas exactas) |

Observaciones que no cambian ninguna propuesta:

* A.2 (regla 2: "el único `<script>` permitido…") y A.3 ("0 `<script>` sin `src`") chocarán con el JSON-LD opcional de
  la It. 05 y con el script de tema opcional de la It. 07 cuando se aprueben; se resuelve al aprobar esas excepciones.
* `AGENTS.md` §4 y §7 describirán los comandos de Astro desde que se apliquen, aunque la rama los adopte recién en la
  It. 02. Por eso `AGENTS.md` (A.1) y `README.md` (A.9) llevan una nota de transición al comienzo de la sección.
* **Umbrales de `objetivos-y-metricas.md`** (decisión del desarrollador, ajuste 3): los de la §2 son la **meta del
  sitio**, no un requisito de cada iteración; A.8 lo precisa en la introducción sin cambiar los valores. La brecha de
  rendimiento móvil está registrada como DT-21 a DT-25 (destino: Épica 10 — Rendimiento, por planificar).

---

## A. Antes de la Iteración 02

### A.1 Propuesta de edición — `AGENTS.md`
**Sección:** §4 Stack y comandos
**Motivo:** el stack pasa a Astro con salida estática; React deja de estar planificado. La nota de transición avisa
que los comandos de Astro rigen solo desde la It. 02 (el primer bloque la agrega justo bajo el título de la sección).
```diff
 ## 4. Stack y comandos
+
+> **Transición (Épica 08):** hasta cerrar la Iteración 02, la rama todavía no tiene Astro y los comandos vigentes son
+> los previos (Tailwind por CLI con `pnpm dev` y `pnpm build`, y un servidor estático aparte para previsualizar). Desde
+> la Iteración 02 rigen los comandos de Astro descritos aquí.
```
```diff
-| Estructura      | HTML5 semántico, sitio multipágina (MPA) de 6 archivos             |
-| Estilos         | Tailwind CSS `3.4.x` compilado por CLI a `dist/css/output.css`     |
+| Estructura      | Astro `7.x` con salida estática: 6 páginas `.astro` en `src/pages/` (MPA) |
+| Estilos         | Tailwind CSS `3.4.x` vía PostCSS, procesado por Astro               |
 | Interactividad  | JavaScript Vanilla ES6+ en módulos (`src/js/`)                     |
```
La fila de `build:cf` del archivo actual termina con un espacio después del último `|`; la línea `-` lo conserva.
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

### A.2 Propuesta de edición — `AGENTS.md`
**Sección:** §5 Reglas de arquitectura
**Motivo:** las páginas pasan a `.astro`, header y footer dejan de estar duplicados y las rutas pasan a ser absolutas.
Incluye la corrección **A1** (la regla 8 actual tiene la excepción del `<base href="/">` de la 404, agregada en la
Épica 07 · Iteración 03, que la propuesta original no contemplaba) y la **A2** (la nota de transición de la regla 6 va
dentro del texto de la regla, no fuera del bloque).
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
+   404 usa `paginaActiva = null`. **Transición:** hasta que la It. 03 (footer) y la It. 04 (header) de la Épica 08 los
+   extraigan, header y footer siguen duplicados en las 6 páginas `.astro`, con paridad exacta y `index.astro` como
+   fuente de la verdad; solo difiere el enlace activo y la 404 no tiene ninguno.
```
```diff
-8. **Rutas relativas** con `./` para todo recurso y enlace interno. Excepción: `404.html` declara `<base href="/">` como
-   segunda etiqueta de su `<head>` (después de `<meta charset>`), porque Cloudflare Pages la sirve en rutas anidadas
-   (`/servicios/xyz`) y las rutas `./` deben resolverse desde la raíz del sitio.
+8. **Rutas absolutas desde la raíz:** páginas sin extensión (`/servicios`) y recursos de `public/` sin el prefijo
+   (`/images/...`). Prohibido `./public/`. La 404 ya no necesita `<base href="/">`: con rutas absolutas se resuelve
+   igual en rutas anidadas (`/servicios/xyz`); el `<base>` se retira en la It. 02.
-9. **Imágenes** en `.webp` bajo `public/images/`, con `width`, `height`, `alt` descriptivo y `loading="lazy"` bajo el
+9. **Imágenes** en `.webp` bajo `public/images/` (servidas como `/images/...`), con `width`, `height`, `alt` descriptivo y `loading="lazy"` bajo el
```

### A.3 Propuesta de edición — `AGENTS.md`
**Sección:** §7 Verificación mínima
**Motivo:** la compilación pasa a `astro build` y las invariantes se buscan en la salida. Incluye la corrección **A3**:
la línea de paridad se mantiene mientras header y footer sigan duplicados.
```diff
-- `pnpm build` termina sin errores y `dist/css/output.css` contiene las clases nuevas (búscalas por texto).
-- Búsquedas de invariantes: 0 `style="` nuevos, 0 `onclick`, 0 `href="#"` en navegación y footer, IDs únicos.
-- Paridad entre los 6 HTML cuando se toca header o footer.
+- `pnpm run build:cf` termina sin errores y el CSS de `_site/_astro/` contiene las clases nuevas (búscalas por texto).
+- Búsquedas de invariantes en `_site/**/*.html`: 0 `style="`, 0 `onclick`, 0 `<style>`, 0 `<script>` sin `src`,
+  0 `href="#"` en navegación y footer, IDs únicos.
+- Paridad entre las 6 páginas cuando se toca header o footer, mientras sigan duplicados (hasta las It. 03 y 04 de la
+  Épica 08).
```

### A.4 Propuesta de edición — `AGENTS.md`
**Sección:** §9 Contexto de despliegue
**Motivo:** `_site/` deja de generarse por lista blanca; pasa a ser la salida de `astro build`.
```diff
 - La carpeta `_planificacion/` y la documentación interna **no deben publicarse**: Cloudflare Pages publica solo
-  `_site/`, que `pnpm run build:cf` genera por lista blanca (6 HTML, `dist/`, `public/` y `src/js/`).
+  `_site/`, que `pnpm run build:cf` (`astro build`) genera con las 6 páginas compiladas, los recursos con *hash* de
+  `_site/_astro/` y el contenido de `public/`.
```

### A.5 Propuesta de edición — `_planificacion/02-arquitectura/stack-tecnologico.md`
**Sección:** §1 Núcleo tecnológico y §2 Reglas de CSS
**Motivo:** fuente de arquitectura de `AGENTS.md` §1; sin este cambio la It. 02 encontraría dos documentos
contradictorios.
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

### A.6 Propuesta de edición — `_planificacion/01-vision/proposito-y-alcance.md`
**Sección:** §3, Fuera del alcance
**Motivo:** la nota sobre React queda obsoleta con el ADR-001.
```diff
-* **Frameworks JS:** Cero dependencias pesadas de UI (React, Vue, Alpine.js, jQuery).
-
-> **Nota:** La Épica 08 (planificada, pendiente de aprobación) propone componentes React con renderizado estático; su
-> aprobación exige actualizar este documento.
+* **Frameworks JS de interfaz:** Cero dependencias de UI en el navegador (React, Vue, Preact, Alpine.js, jQuery).
+  Astro se usa solo como generador estático en compilación y no envía JavaScript propio.
```

### A.7 Propuesta de edición — `_planificacion/README.md`
**Sección:** §6 Reglas de acero y §7 Estándar de verificación
**Motivo:** repiten las reglas de `AGENTS.md` §5 y §7 que cambian. Este archivo no está protegido por `AGENTS.md` §2,
pero el desarrollador decidió aplicarlo a mano junto con el resto.
```diff
-1. MPA estricta de 6 archivos HTML. Sin emulación de SPA.
-2. Cero JS y CSS en línea (`style=`, `onclick`, `<script>` con lógica).
-3. JavaScript en módulos ES6 registrados en `src/js/main.js`, con cláusulas de guarda.
+1. MPA estricta: 6 páginas en `src/pages/` que Astro compila a 6 HTML. Sin emulación de SPA ni directivas `client:*`.
+2. Cero JS y CSS en línea (`style=`, `onclick`, `<script is:inline>`, `<style>` en `.astro`).
+3. JavaScript en módulos ES6 importados de forma estática en `src/js/main.js`, con cláusulas de guarda.
 4. Solo tokens de `DESIGN.md` y `tailwind.config.js`; clases de Tailwind siempre literales.
-5. Header y footer duplicados en los 6 HTML: paridad exacta, `index.html` como fuente de la verdad.
+5. Header y footer como componentes únicos (`SiteHeader.astro`, `SiteFooter.astro`); hasta las It. 03 y 04 de la
+   Épica 08 siguen duplicados en las 6 páginas `.astro`, con paridad exacta e `index.astro` como fuente de la verdad.
 6. Una iteración, un alcance: no se tocan archivos fuera de lo especificado.
 7. Git en modo lectura para los agentes; *commits*, *push* y *merge* los hace el desarrollador.
+8. Rutas absolutas desde la raíz (`/servicios`, `/images/...`); prohibido `./public/`.
```
```diff
-1. **Compilación:** `pnpm build` sin errores y clases nuevas presentes en `dist/css/output.css`.
-2. **Invariantes por búsqueda de texto:** `style=`, `onclick`, `href="#"`, IDs únicos, ausencia de `fixed` dentro del
-   `<header>`.
+> **Transición:** hasta cerrar la Iteración 02 de la Épica 08 rigen los comandos previos (`pnpm build` y
+> `dist/css/output.css`); desde la Iteración 02, los de esta lista.
+
+1. **Compilación:** `pnpm run build:cf` sin errores y clases nuevas presentes en el CSS de `_site/_astro/`.
+2. **Invariantes por búsqueda de texto** en `_site/**/*.html`: `style=`, `onclick`, `<style>`, `<script>` sin `src`,
+   `href="#"`, IDs únicos, ausencia de `fixed` dentro del `<header>`.
```

### A.8 Propuesta de edición — `_planificacion/01-vision/objetivos-y-metricas.md`
**Sección:** título, introducción y §3, punto 4
**Motivo:** (1) el título tiene una errata (`6#`); (2) la introducción declara las métricas de la §2 como requisito
obligatorio de **cada** iteración, lo que una épica estructural como la 08 no puede cumplir con la línea base actual
(Performance móvil de 68 a 83, umbral ≥ 95); se precisa que son la meta del sitio y que la brecha se registra como
deuda, sin cambiar ningún valor; (3) el punto 4 exige rutas relativas (`./`) como *Definition of Done* global y
bloquearía literalmente la It. 02.
```diff
-6# Objetivos y Métricas de Éxito (QA & Performance)
+# Objetivos y Métricas de Éxito (QA & Performance)
```
```diff
-Este documento fija los estándares cualitativos y cuantitativos que los agentes de IA deben monitorear. Las métricas
-no son sugerencias, son requisitos obligatorios (Definition of Done) para cada iteración.
+Este documento fija los estándares cualitativos y cuantitativos que los agentes de IA deben monitorear. Las métricas
+de la §2 son la meta de calidad del sitio. Cada iteración debe acercarse a ellas o, como mínimo, no empeorarlas; las
+épicas estructurales (como la Épica 08) aplican el criterio de no regresión de su propio Definition of Done, y la
+brecha respecto de la meta se registra como deuda técnica (§12 de `_planificacion/README.md`). Los criterios de la §3
+sí son obligatorios en cada iteración.
```
```diff
-4. **Rutas Inquebrantables:** Las referencias a assets (imágenes, CSS, JS) funcionan universalmente usando rutas
-   relativas seguras (`./` o `./src/...`).
+4. **Rutas Inquebrantables:** Las referencias a assets (imágenes, CSS, JS) y los enlaces internos funcionan en
+   cualquier profundidad de URL usando rutas absolutas desde la raíz (`/`, `/servicios`, `/images/...`); prohibido
+   `./public/`.
```

### A.9 Propuesta de edición — `README.md` (sección B completa)
**Motivo:** el desarrollador decidió aplicar la sección B completa antes de la It. 02 (en vez de la nota mínima de
transición, descartada). Cubre todas las menciones de la revisión de coherencia (bitácora de la It. 01, §8.3: líneas
16-17, 30-35, 56-57, 74-83, 104, 118-140, 165, 195 y 227) más las líneas 18-19, 91 y 225-226. Describe el estado final
con Astro; la nota de transición del comienzo aclara qué rige mientras tanto.

**Sección:** encabezado (nota de transición)
```diff
 🔹 **Desarrollo:** [Felipe Cuevas](https://felipecuevas.dev)
+
+> **Transición (Épica 08):** este documento describe el proyecto migrado a Astro. Hasta cerrar la Iteración 02, los
+> comandos de la rama siguen siendo los previos (Tailwind compilado por CLI y un servidor estático aparte para
+> previsualizar); desde la Iteración 02 rigen los de Astro descritos aquí.
 
 ---
```

**Sección:** §1 Descripción del proyecto
```diff
-El sitio es una aplicación **multipágina (MPA) estática**: seis documentos HTML independientes, estilizados con
-Tailwind CSS compilado localmente y animados con módulos de JavaScript nativo (ES6+). No depende de frameworks de
-interfaz, de un backend ni de un gestor de contenidos, lo que permite tiempos de carga bajos, un despliegue simple y un
-mantenimiento predecible.
+El sitio es una aplicación **multipágina (MPA) estática** generada con **Astro**: seis páginas que comparten un layout,
+un header y un footer únicos, estilizadas con Tailwind CSS y animadas con módulos de JavaScript nativo (ES6+). Astro
+trabaja solo en compilación: el navegador recibe HTML completo, sin frameworks de interfaz, backend ni gestor de
+contenidos, lo que permite tiempos de carga bajos, un despliegue simple y un mantenimiento predecible.
```

**Sección:** §2 Páginas del sitio
```diff
-| Inicio                    | `/index.html`                | Hero editorial, servicios destacados, suscripción, galería, reseñas |
-| Servicios                 | `/servicios.html`            | Catálogo de 8 servicios con modal de detalle y galería dinámica    |
-| Suscripción Floral        | `/suscripcion-floral.html`   | Hero con cross-fade, condiciones, zona de envío y 3 planes         |
-| Galería                   | `/galeria.html`              | 6 capítulos en acordeón horizontal (34 piezas) y visor Lightbox    |
-| Contacto                  | `/contacto.html`             | Canales directos y formulario que se envía por WhatsApp            |
-| Página no encontrada      | `/404.html`                  | Página de error con retorno al Inicio (`noindex`)                  |
+| Inicio                    | `/`                          | Hero editorial, servicios destacados, suscripción, galería, reseñas |
+| Servicios                 | `/servicios`                 | Catálogo de 8 servicios con modal de detalle y galería dinámica    |
+| Suscripción Floral        | `/suscripcion-floral`        | Hero con cross-fade, condiciones, zona de envío y 3 planes         |
+| Galería                   | `/galeria`                   | 6 capítulos en acordeón horizontal (34 piezas) y visor Lightbox    |
+| Contacto                  | `/contacto`                  | Canales directos y formulario que se envía por WhatsApp            |
+| Página no encontrada      | Cualquier ruta inexistente   | Página de error con retorno al Inicio (`noindex`); se publica como `404.html` |
```

**Sección:** §4 Stack tecnológico
```diff
-| Estructura             | HTML5 semántico                              | Seis páginas físicas, sin enrutador del lado del cliente   |
-| Estilos                | Tailwind CSS `3.4.x`                         | Compilación por CLI a `dist/css/output.css`                 |
+| Estructura             | Astro `7.x` (salida estática)                | Seis páginas en `src/pages/` compiladas a HTML; sin enrutador ni JS de interfaz en el cliente |
+| Estilos                | Tailwind CSS `3.4.x`                         | Vía PostCSS, procesado por Astro; CSS con *hash* en `_site/_astro/` |
```

**Sección:** §5 Estructura del repositorio
```diff
 .
-├── index.html · servicios.html · suscripcion-floral.html
-├── galeria.html · contacto.html · 404.html
+├── astro.config.mjs · postcss.config.cjs
 ├── AGENTS.md                  # Reglas para agentes de IA (Claude Code, Antigravity)
 ├── DESIGN.md                  # Sistema de diseño: única fuente de la verdad visual
 ├── README.md                  # Este documento
 ├── tailwind.config.js         # Tokens de diseño para Tailwind
 ├── package.json · pnpm-lock.yaml
-├── dist/
-│   └── css/output.css         # CSS compilado (generado por pnpm build)
-├── _site/                     # Carpeta publicable generada por pnpm run build:cf (ignorada por Git)
+├── _site/                     # Salida de astro build (pnpm run build:cf), publicada por Cloudflare (ignorada por Git)
 ├── public/
+│   ├── _redirects             # /public/* → /:splat (301, URLs antiguas)
+│   ├── robots.txt
 │   ├── icons/                 # Logotipos de terceros en SVG
 │   ├── logos/                 # Logotipo de La Jardinera (variante clara y blanca)
 │   └── images/                # Fotografías .webp y videos .mp4 por sección
 ├── src/
+│   ├── pages/                 # index, servicios, suscripcion-floral, galeria, contacto y 404 (.astro)
+│   ├── layouts/               # BaseLayout.astro: <head>, header, footer y script
+│   ├── components/            # SiteHeader, SiteFooter y SeoHead
+│   ├── data/navegacion.js     # Fuente única de rutas y etiquetas de navegación
 │   ├── css/input.css          # Capa base, variables de tema y componentes CSS
 │   └── js/
-│       ├── main.js            # Orquestador de módulos
+│       ├── main.js            # Orquestador de módulos (importaciones estáticas)
 │       ├── data/              # services.js, reviews.js
```

**Sección:** §6 Requisitos previos
```diff
-3. Un servidor HTTP local para previsualizar: los módulos ES no funcionan abriendo los archivos con `file://`.
+3. No hace falta un servidor aparte: `pnpm dev` (Astro) sirve el sitio en local y `pnpm preview` sirve `_site/` tal
+   como se publicará.
```

**Sección:** §7 Instalación y desarrollo local
````diff
-2. Inicia Tailwind en modo observación:
+2. Inicia el servidor de desarrollo de Astro (recarga en caliente) y abre la dirección local que indica la terminal:
 
    ```bash
    pnpm dev
    ```
 
-3. En otra terminal, sirve la raíz del proyecto por HTTP (por ejemplo, con la extensión Live Server del editor o con
-   `python -m http.server 5500`) y abre `http://localhost:5500`.
-
-4. Antes de publicar, genera el CSS de producción:
+3. Antes de publicar, genera `_site/` y revísalo tal como lo servirá Cloudflare Pages:
 
    ```bash
-   pnpm build
+   pnpm run build:cf
+   pnpm preview
    ```
````

**Sección:** §8 Scripts disponibles
```diff
-| `pnpm dev`    | Compila `src/css/input.css` en modo observación.                   |
-| `pnpm run build:cf` | Compila el CSS y genera `_site/` por lista blanca para Cloudflare Pages. |
+| `pnpm dev`    | Servidor de desarrollo de Astro con recarga en caliente.           |
+| `pnpm preview`| Sirve `_site/` tal como se publicará.                              |
+| `pnpm run build:cf` | `astro build`: genera `_site/` para Cloudflare Pages.        |
```

**Sección:** §10 Despliegue continuo
```diff
-| Comando de compilación       | `pnpm run build:cf` (compila Tailwind y genera `_site/` por lista blanca)     |
+| Comando de compilación       | `pnpm run build:cf` (`astro build`, genera `_site/`)                          |
```

**Sección:** §12 Estándares de calidad
```diff
-✅ Rutas relativas (`./`) para funcionar en cualquier alojamiento estático.
+✅ Rutas absolutas desde la raíz (`/servicios`, `/images/...`), válidas en cualquier profundidad de URL.
```

**Sección:** §15 Hoja de ruta
```diff
-1. **Épica 07 — Gobernanza multiagente y pulido del Hero:** reorganización de la planificación, documentación para
-   Claude Code, nuevo efecto del titular principal y saneamiento de deuda técnica.
-2. **Épica 08 — Componentes React con renderizado estático:** header, navegación y footer como componentes
-   reutilizables, generados como HTML en tiempo de compilación para conservar el rendimiento y el SEO actuales.
+1. **Épica 07 — Gobernanza multiagente y pulido del Hero** (completada con reservas, 14-10-2026): reorganización de
+   la planificación, documentación para Claude Code, nuevo efecto del titular principal y saneamiento de deuda técnica.
+2. **Épica 08 — Migración estructural a Astro** (en curso): layout, header, footer y SEO como componentes únicos,
+   generados como HTML estático en compilación, con el mismo contenido, diseño y despliegue en Cloudflare Pages.
```

---

## B. En la Iteración 08 (cierre)

### B.1 Propuesta de edición — `DESIGN.md`
Pendiente de la Iteración 08. Menciones detectadas en la revisión de coherencia (bitácora de la It. 01, §8.3), sin
cambio de tokens ni de reglas de diseño: ubicación de archivos (líneas 43, 348, 409 y 542) y estado del footer (§5.3,
línea 307, y §10, línea 466), que cambia con DT-06 en la Iteración 03. La Iteración 08 entrega el `diff` exacto
contra el texto vigente en ese momento.
