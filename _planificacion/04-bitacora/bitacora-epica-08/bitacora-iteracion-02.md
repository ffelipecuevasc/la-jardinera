# Bitácora de Ejecución - Épica 08 - Iteración 02

**Fecha de ejecución:** 17-10-2026
**Agente:** Claude Code
**Objetivo:** Instalar Astro y migrar de forma literal las 6 páginas a `src/pages/*.astro`, sin rediseñar nada, con `pnpm run build:cf` generando `_site/`.

Especificación: [`iteracion-02.md`](../../03-planificacion/epicas/epica-08-migracion-astro/iteracion-02.md) · Épica: [`definicion-epica.md`](../../03-planificacion/epicas/epica-08-migracion-astro/definicion-epica.md) · Iteración anterior: [`bitacora-iteracion-01.md`](bitacora-iteracion-01.md)

Rótulos de evidencia: **[código]** confirmado por código, comandos o programa; **[render]** confirmado en render real (Chrome 155 headless, ver §4.3); **🕒 PENDIENTE** no verificado.

---

## 1. Resumen ejecutivo

* `pnpm run build:cf` ejecuta `astro build` y genera en `_site/` las 6 páginas (`index`, `servicios`, `suscripcion-floral`, `galeria`, `contacto` y `404`), sin errores ni advertencias. [código]
* El marcado de las 6 páginas se copió **de forma literal** (solo cambian las rutas, de `./public/…` y `./x.html` a `/…`). El comparador `scripts/comparar-con-referencia.mjs` informa **0 diferencias no esperadas** en `<body>` en las 6 páginas. [código]
* La comparación en navegador (84 combinaciones: 6 páginas × 7 viewports × 2 temas, sitio anterior frente a `_site/`) dio **0 diferencias de geometría** en 27.006 elementos comparados, el mismo largo de página, 0 errores de consola y 18 de 18 pruebas de interacción iguales. [render]
* Esa misma comparación detectó **una regresión real** que la comparación de marcado no veía: Astro, por defecto, elimina el espacio entre un texto y la etiqueta en línea siguiente (`NOMBRE *` salía `NOMBRE*`). Se corrigió con `compressHTML: false` y se endureció el comparador. Ver §5.1.
* **Tarea 0 (movimientos de Git) sin ejecutar**: los agentes no pueden correr `git mv` ni `git rm`. Los `.astro` se crearon **copiando**; los 6 HTML, `dist/` y `scripts/stage-site.mjs` siguen en su lugar y el desarrollador debe retirarlos (comandos en `propuestas-documentos-protegidos.md`, D.6).
* **Conflicto de versiones para decidir:** `astro@7.4.0` declara `node >= 22.22.0` y los documentos dicen `>= 22.13` (§5.2). **Resuelto el 18-10-2026: Astro 7.4.0 exacta y Node `>= 22.22` (§9).**
* Estado: **Completada con reservas** (§8). No está 🔒 Cerrada: eso ocurre solo con la fusión a `main`.

## 2. Línea base (estado previo)

| Dato | Valor | Origen |
|:-----|:------|:-------|
| Rama / `HEAD` | `feat/migracion-astro` / `e1390c8` | `git branch --show-current`, `git log` |
| Árbol de trabajo | **No limpio al iniciar:** `.claude/settings.json` modificado (se quitan 3 líneas `Edit(...)` duplicadas del `deny`; cambio previo y ajeno a esta iteración). No se tocó. | `git status --short`, `git diff` |
| Node / pnpm | `v24.16.0` / `11.24.0` | `node -v`, `pnpm -v` (Node cumple `>= 22.13`) |
| Originales | Los 6 HTML de la raíz son idénticos a `referencia/sitio/*.html` | `cmp`, 6 de 6 |
| Documentos leídos | `AGENTS.md`, `README.md`, `_planificacion/README.md`, `definicion-epica.md`, `iteracion-02.md`, bitácora de la It. 01 (§14), `estado-actual.md`, `stack-tecnologico.md` y `proposito-y-alcance.md` | — |
| Antes de empezar | 0 archivos `.astro`, sin `astro.config.mjs`; `build:cf` = `pnpm build && node scripts/stage-site.mjs` | `package.json` |

## 3. Cambios realizados (por archivo)

| Archivo | Cambio |
|:--------|:-------|
| `package.json` | `devDependencies`: `+ astro ^7.4.0`, `+ autoprefixer ^10.6.1`, `+ postcss ^8.5.30` (`tailwindcss ^3.4.19` sin cambio). `scripts`: `dev` = `astro dev`, `build` = `astro build`, `preview` = `astro preview`, `build:cf` = `astro build` (antes: Tailwind por CLI y `stage-site.mjs`). `test`, `devEngines` y `packageManager` intactos. |
| `pnpm-lock.yaml` | Regenerado por `pnpm add -D astro@^7.3.8 postcss autoprefixer` (+190 / −7 paquetes; Tailwind sigue en 3.4.19). `pnpm install --frozen-lockfile --offline` responde "Already up to date". |
| `tailwind.config.js` | Solo `content`: de `["./src/**/*.{html,js}", "./*.html"]` a `["./src/**/*.{astro,html,js}"]`. Ningún token tocado. |
| `astro.config.mjs` (nuevo) | `site: 'https://lajardinerafloreria.cl'`, `outDir: './_site'`, `trailingSlash: 'never'`, `compressHTML: false`, `build.format: 'file'`, `build.inlineStylesheets: 'never'`, `vite.build.assetsInlineLimit: 0`. Sin adaptador ni integraciones. |
| `postcss.config.cjs` (nuevo) | `tailwindcss` y `autoprefixer`. |
| `src/layouts/BaseLayout.astro` (nuevo) | Importa `../css/input.css` en el *frontmatter*; `<html class="light bg-background text-on-surface" lang="es">`; `<head>` con `<meta charset>` primero; `<title>`; `description` y `robots` condicionales; favicon `/logos/la-jardinera-original.png`; `viewport`; fuentes de Google; `<body class={bodyClass}>`, `<slot />` y `<script src="../js/main.js">`. Propiedades: `title`, `description` (opcional), `noindex`, `bodyClass`. |
| `src/pages/*.astro` (6, nuevos) | Cada una abre `BaseLayout` con su `title`, `description`, `noindex` (solo la 404) y `bodyClass` actuales, y contiene todo lo que estaba entre `<body>` y el `<script>` final, copiado por programa (`generar-paginas.mjs`, fuera del repositorio) con la tabla de rutas de la especificación. Header y footer **siguen duplicados** en las 6. |
| `src/js/main.js` | De `import(path)` a 7 importaciones estáticas; mismo `DOMContentLoaded`, mismo aislamiento de errores por módulo (`try/catch` por `initX`) y mismo mensaje `[main.js] Falló "initX"`. Conserva el BOM del original. |
| `src/js/data/services.js` | 33 rutas `./public/images/…` → `/images/…`. |
| `src/js/modules/carousel.js` | 1 ruta: `./public/icons/google.svg` → `/icons/google.svg`. |
| `src/js/modules/modal.js` | 1 ruta: `./contacto.html?service=` → `/contacto?service=`. |
| `src/js/modules/contact-form.js` | Solo el comentario de cabecera (3 menciones de `.html` → rutas). Sin cambio de código. |
| `public/_redirects` (nuevo) | `/public/*  /:splat  301` (D6 del ADR-001, Tarea 6). |
| `.gitignore` | `+ .astro/` (con una línea en blanco y un comentario). |
| `scripts/comparar-con-referencia.mjs` (nuevo) | Comparador token por token del `<body>` y el `<head>` contra `referencia/sitio/` (ver §4.1). Solo lectura. |
| `_planificacion/01-vision/proposito-y-alcance.md` | §2: 7 nombres `.html` → rutas reales (`/`, `/servicios`, `/contacto?service=...`, `/suscripcion-floral`, `/galeria`, `/contacto`); la 404 queda como "cualquier ruta inexistente; se publica como `404.html`". Sin otro cambio de contenido. |
| `_planificacion/03-planificacion/epicas/epica-08-migracion-astro/propuestas-documentos-protegidos.md` | Sección D nueva (D.1 a D.7). |
| `_planificacion/04-bitacora/decisiones-tecnicas.md` | Una sección nueva al final (4 decisiones de la iteración). |
| `_planificacion/04-bitacora/estado-actual.md` | Una línea nueva al final. |

**Sin cambios:** `src/css/input.css`, `src/js/modules/{theme,navigation,subscription,gallery}.js`, `src/js/data/reviews.js`, el contenido de `public/` salvo `_redirects`, los 6 HTML originales, `dist/`, `scripts/stage-site.mjs`, `AGENTS.md`, `README.md`, `DESIGN.md`, `CLAUDE.md` y `.claude/**`.

## 4. Verificación de criterios de aceptación

### 4.1 Tabla de las 6 páginas

| Página | Origen (sin tocar) | `.astro` | Salida | Comparación literal del `<body>` (tokens original / salida) |
|:-------|:-------------------|:---------|:-------|:-----------------------------------------------------------|
| Inicio | `index.html` (94.101 B) | `src/pages/index.astro` (93.106 B) | `_site/index.html` (88.488 B) | 1583 / 1581; **0** diferencias no esperadas |
| Servicios | `servicios.html` (74.696 B) | `src/pages/servicios.astro` (73.754 B) | `_site/servicios.html` (69.624 B) | 1262 / 1256; **0** |
| Suscripción Floral | `suscripcion-floral.html` (71.820 B) | `src/pages/suscripcion-floral.astro` (70.866 B) | `_site/suscripcion-floral.html` (66.110 B) | 1196 / 1190; **0** |
| Galería | `galeria.html` (98.137 B) | `src/pages/galeria.astro` (96.732 B) | `_site/galeria.html` (95.587 B) | 1560 / 1552; **0** |
| Contacto | `contacto.html` (57.132 B) | `src/pages/contacto.astro` (56.262 B) | `_site/contacto.html` (53.350 B) | 864 / 858; **0** |
| 404 | `404.html` (38.208 B) | `src/pages/404.astro` (37.202 B) | `_site/404.html` (36.056 B) | 556 / 550; **0** |

**Cómo compara** `scripts/comparar-con-referencia.mjs` [código]: tokeniza el original (`referencia/sitio/`) y la salida; aplica al original la tabla de rutas; compara etiquetas con sus atributos **en orden**, texto (con el espacio de borde conservado: `Nombre <span>` ≠ `Nombre<span>`) y comentarios; y termina con código 1 si hay diferencias no esperadas. Prueba negativa: con 4 mutaciones inyectadas en el `<body>` de copias del original (una clase, un texto, un `id` y un atributo) detecta las 4 (8 tokens), y también detectó una mutación de `alt` en una prueba previa; con la salida comprimida por defecto de Astro reporta 3.197 diferencias (el defecto de §5.1).

**Diferencias explicadas** (todas esperadas; el comparador las separa):

| Dónde | Diferencia | Motivo | ¿Cambia el DOM? |
|:------|:-----------|:-------|:----------------|
| `<body>`, final | `<script type="module" src="./src/js/main.js">` → `<script type="module" src="/_astro/BaseLayout.astro_astro_type_script_index_0_lang.5-O1sJDE.js">` (2 tokens por página) | Astro empaqueta `main.js` con *hash* (D8) | No: sigue siendo 1 script externo |
| `<body>`, hijos directos | Astro omite 1 a 4 comentarios HTML por página (17 en total): `Capa tenue del menú móvil…`, `FOOTER CONECTADO…`, `Modal de Detalle de Servicio…`, `LIGHTBOX VISOR FULLSCREEN…`, `SECCIÓN CENTRAL DE ERROR 404`, etc. Siguen en el código fuente `.astro`; solo desaparecen del HTML publicado. | Comportamiento del compilador con comentarios que son hijos directos del contenido de un componente (comprobado: los 17 están a la profundidad 1 del `<body>`; los demás comentarios, más profundos, se conservan) | No (los comentarios no son nodos de elemento) |
| `<head>`, todas | `<meta charset>` pasa a ser la primera etiqueta; `<link rel="stylesheet" href="./dist/css/output.css">` → `<link rel="stylesheet" href="/_astro/BaseLayout.Csq16oln.css">`; el orden de `title`, `description`, `icon` y `viewport` sigue al layout | Layout único; A-07 (DT-17) | Sí, solo del `<head>`, según lo previsto |
| `<head>`, 404 | Se retira `<base href="/">` y el comentario `La 404 no debe indexarse…` (la propiedad `noindex` lo reemplaza) | Tarea 5.5: rutas absolutas | Sí, previsto |
| `<head>`, Inicio | Sigue sin `<meta name="description">` | DT-04 (Iteración 05); no se agregó | — |
| `<body>`, atributo `class` | Las clases de `<body>` viajan como propiedad `bodyClass`; el atributo final es idéntico (comparado) | Las 6 páginas no comparten clases (§5.3) | No |

### 4.2 Verificaciones por programa (sin red)

| Criterio | Estado | Evidencia |
|:---------|:-------|:----------|
| Escenario 1: `pnpm run build:cf` sin errores y 6 páginas con sus nombres | ✅ confirmado por código | Compilación limpia final (carpeta `_site/` borrada antes): "6 page(s) built", `/404.html`, `/contacto.html`, `/galeria.html`, `/servicios.html`, `/suscripcion-floral.html`, `/index.html`; 0 líneas con "warn" en el registro |
| Contenido de `_site/` | ✅ confirmado por código | Raíz: `404.html`, `_astro/`, `_redirects`, `contacto.html`, `galeria.html`, `icons/`, `images/`, `index.html`, `logos/`, `servicios.html`, `suscripcion-floral.html`. 106 archivos, 62,1 MiB; 0 archivos `.md`, `.mjs`, `.json` ni `.yaml`; sin `_planificacion/`, `src/`, `node_modules/` ni `.claude/` |
| Límites de Cloudflare | ✅ confirmado por código | Mayor archivo: `images/galeria/nmg2.mp4`, 21,66 MiB (< 25 MiB); 106 archivos (< 20.000) |
| Escenario 3: cero JS y CSS en línea | ✅ confirmado por código | En `_site/*.html`: 0 `style=`, 0 `onclick`, 0 `<style`, 0 `<script>` sin `src` (1 `<script>` por página, externo con *hash*); 0 `href="#"`; 0 `<base`; 0 `./public`; 0 `.html"` |
| IDs | ✅ confirmado por código | 80 IDs (16 + 13 + 11 + 17 + 17 + 6), 0 duplicados; el conjunto de IDs de cada página es igual al de `referencia/inventario.json` (6 de 6) |
| Conteo de `href`, `src`, `data-src` y `srcset` | ✅ confirmado por código | Igual al inventario en las 6 páginas, salvo la 404: 34 `href` frente a 35 (el `<base href>` retirado) |
| Invariantes del header (`AGENTS.md` §5, regla 7) | ✅ confirmado por código | En las 6: 0 descendientes del `<header>` con la clase `fixed`; `#mobile-menu-scrim` es el nodo inmediatamente posterior a `</header>`; la barra tiene `h-20` |
| Orden de `<head>` (A-07) | ✅ confirmado por código | `<meta charset>` es la primera etiqueta del `<head>` en las 6 (byte 88); 0 `<base` en el sitio |
| Rutas | ✅ confirmado por código | `grep "\./public/\|\.html\""` en `src/`: 0 resultados; de las 246 referencias internas de los 6 HTML, 243 empiezan con `/` y resuelven a un archivo de `_site/` (0 rotas) y las otras 3 son anclas de la misma página (`#servicios`, `#suscripcion`); las 7 anclas con destino (3 de esas y 4 de `/galeria#…`) existen en su página; 34 rutas de recursos dentro del JS empaquetado (`/images/…`, `/icons/…`) existen en `_site/` (0 inexistentes); el JS enlaza a `/contacto?service=`; 0 `./public` ni `.html` en el JS |
| Clases de Tailwind en el CSS de `_site/_astro/` | ✅ confirmado por código | 569 clases distintas (marcado + plantillas de los módulos JS); 561 tienen regla en el `dist/css/output.css` de `main`; **0 de esas 561 faltan** en el CSS nuevo. Las 8 sin regla son marcadores o nombres propios (`light`, `open-modal-btn`, `modal-overlay`, `close-modal-btn`, `plan-card`, `gallery-carousel-card`) y 2 clases con comas (`shadow-[0_1px_8px_rgba(53,54,58,0.06)]` y `…0.12)]`) que ambos CSS contienen con otro escape. Clases propias presentes: `fx-starlight`, `bg-noise`; tokens `bg-surface`, `dark:hidden`, `hover:grow-[10]` |
| `src/**/*.astro` cumple `AGENTS.md` §5, reglas 1 y 2 | ✅ confirmado por código | 0 `style=`, `onclick`, `<style`, `is:inline`, `client:`, `ClientRouter` ni `<base` en `src/**/*.astro`; el único `<script>` es el del layout; sin BOM en los `.astro` |
| DT-10 (`import(path)`) | ✅ confirmado por código | 0 `import(` en `src/js`; build sin errores |
| Preview local | ✅ confirmado por código | `pnpm preview` (puerto 4321, solo local): `/`, `/servicios`, `/suscripcion-floral`, `/galeria`, `/contacto` y `/404` responden 200 `text/html`; `/servicios.html` responde 200; `/a/b/xyz` y `/servicios/xyz` responden 404 con el HTML de la 404; imágenes, logos, íconos, CSS y JS responden 200 con su tipo. `pnpm dev` (puerto 4330): las mismas rutas, 200 salvo `/404` y rutas inexistentes (404, comportamiento del servidor de desarrollo; allí Astro inyecta `<style>` y `<script>` de desarrollo que **no** existen en el *build*) |
| `pnpm install --frozen-lockfile` | ✅ confirmado por código | Con `--offline`: "Already up to date" |

### 4.3 Verificación en navegador (render real)

**Cómo se hizo** [render]: Chrome `155.0.8059.84` headless, perfil aislado en la carpeta temporal del agente, controlado por el protocolo de depuración desde un script **fuera del repositorio**. El sitio anterior (`referencia/sitio/`) se sirvió en `127.0.0.1:4400` con un servidor Node de solo lectura y el nuevo con `pnpm preview` (`localhost:4321`). **Sin red externa:** se bloquearon `fonts.googleapis.com`, `fonts.gstatic.com` y los `.mp4` en ambos lados (solicitudes externas observadas: solo `fonts.googleapis.com`, bloqueada). Por eso la tipografía es la de reserva del sistema y los videos de la Galería no se reprodujeron: la comparación es A/B bajo las mismas condiciones, **no** reproduce la apariencia de producción. Movimiento reducido emulado para fijar las animaciones. Tras terminar: 0 procesos del arnés y 0 puertos abiertos.

| Comprobación | Estado | Evidencia |
|:-------------|:-------|:----------|
| 6 páginas × 7 viewports (320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768, 1280×800) × claro y oscuro | ✅ confirmado en render real | 84 de 84 combinaciones cargadas; la clase de `<html>` (`light` / `dark`) coincide en las 84 |
| Geometría y número de elementos | ✅ confirmado en render real | 27.006 elementos comparados (suma de los 84 casos; 594, 299, 297, 400, 208 y 131 por página): **0 diferencias de posición o tamaño mayores de 0,5 px**; mismo número de elementos y de imágenes sin cargar (1 en Servicios y 7 a 9 en el Inicio: las diferidas fuera de vista, como en la línea base) y mismo ancho y alto de documento en las 84 |
| Estilo calculado (45 propiedades por elemento) | ✅ con diferencias explicadas | 9 firmas de diferencia en total, todas de 2 causas (ver abajo); ninguna en tipografía, posición, `display`, `opacity`, `transform` ni `z-index` |
| Capturas (pantalla visible de cada combinación) | ✅ con diferencias explicadas | 84 pares del mismo tamaño; 16 idénticos píxel a píxel; en los otros 68 la diferencia máxima por canal es de 16 niveles (de 255); 17 pares tienen alguna diferencia de más de 1 nivel y el resto es de 1 nivel (el redondeo de color de abajo); solo 8 pares tienen píxeles con más de 8 niveles de diferencia, de 1 a 13 píxeles aislados por captura (hipótesis, no investigada: ruido de decodificación de fotografías) |
| Consola | ✅ confirmado en render real | 0 errores o advertencias en los 84 casos de ambos sitios (se excluyen las solicitudes bloqueadas a propósito) |
| Escenario 5: 404 en `/a/b/xyz` | ✅ confirmado en render real (local) | Estado 404; sin `<base>`; hoja de estilos `/_astro/BaseLayout.<hash>.css`; fondo del `<body>` `rgb(248, 247, 243)`; header de 80 px; logotipo cargado. Igual que el sitio anterior con `<base>`. El único mensaje de consola es `Failed to load resource: 404` del propio documento (confirma la inferencia de DT-14). **No es producción.** |
| Escenario 6: funcionalidad (18 pruebas A/B) | ✅ confirmado en render real | Iguales tras normalizar rutas: cambio de tema (clase y `localStorage`, claro → oscuro → claro); menú móvil a 360 px (abre, cierra, `aria-expanded`, capa tenue); carrusel de reseñas (10 tarjetas, 10 íconos de Google, avanza `01 / 10` → `02 / 10`); modal de Servicios (título, imagen principal cargada, 4 miniaturas, CTA `/contacto?service=Suscripci%C3%B3n%20floral`, cierre con Escape); lightbox de la Galería (34 tarjetas, imagen cargada, siguiente, cierre); Contacto con `?service=Plan%20Esencial` (preselección, aviso y mensaje armado para `wa.me/56997702832` con el servicio y la fecha `24-12-2026`; `window.open` interceptado, no se abrió WhatsApp); Suscripción (4 imágenes del *cross-fade*, misma opacidad tras 5 s); 404 anidada |

**Diferencias de estilo calculado (todas explicadas):**

1. **Redondeo de un color con transparencia** (1.351 elementos-propiedad, 84 casos): `border-outline-variant/20`, `/30` y `bg-outline-variant/30`, `/40`, `/60`. Antes: `hsla(114,8%,77%,.3)` = `rgba(193, 201, 192, 0.3)`. Ahora: `#c0c9bf4d` = `rgba(192, 201, 191, 0.3)`. La diferencia es de 1/255 en 2 canales. El valor nuevo **coincide con el token** `outline-variant: "#c0c9bf"` de `tailwind.config.js`; el anterior era un redondeo a HSL del CLI de Tailwind. Imperceptible; no se corrige.
2. **Serialización de un degradado** (84 casos, 1 elemento por caso: el texto de marca del header, `fx-spotlight`): `var(--spotlight-beam) 0` pasa a `0%` en el CSS procesado por Vite (valor de posición de la parada, equivalente).

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

### 5.1 Regresión corregida: `compressHTML` de Astro (hallazgo de esta iteración)

* **Qué pasaba** [render]: con la configuración de la especificación (sin `compressHTML`), Astro elimina el espacio entre un texto y la etiqueta en línea que le sigue. En Contacto, `Nombre <span>*</span>` salía `Nombre<span>*</span>` y `Teléfono <span>(opcional)</span>` salía `Teléfono<span>(opcional)</span>`: en la captura a 768 px se veía `NOMBRE*` y `TELÉFONO(opcional)` (550 píxeles con diferencia de más de 8 niveles, hasta 199).
* **Por qué no lo vio la comparación de marcado:** el comparador normalizaba los espacios. Tampoco lo vio la prueba de concepto de la planificación (solo comparó el header).
* **Corrección:** `compressHTML: false` en `astro.config.mjs` (decisión registrada en `decisiones-tecnicas.md`) y comparador sensible a los espacios de borde. Con ambos, el `<body>` da 0 diferencias no esperadas y la comparación en navegador dio 0 diferencias de geometría.
* **Alcance del riesgo:** el espacio se pierde donde un texto precede a una etiqueta en línea separada por salto de línea. No se auditó cuántos puntos más había en las 6 páginas; la comparación de geometría de 27.006 elementos no halló otros.
* **Propuesta:** regla en `stack-tecnologico.md` §2 para que nadie retire la opción (`propuestas-documentos-protegidos.md`, D.5).

### 5.2 Conflicto entre documentos: versión de Node (**resuelto el 18-10-2026, ver §9**; el texto de abajo es el hallazgo original)

* `astro@7.4.0` (la que resolvió `^7.3.8`) declara `engines.node: ">=22.22.0"` [código: `node_modules/astro/package.json`].
* `AGENTS.md` §4, `README.md` §6, `stack-tecnologico.md` §1 y la épica dicen `Node >= 22.13`; `definicion-epica.md` §2.1 afirma "Astro 7 exige Node >= 22.12". El registro de Cloudflare del 13-10-2026 mostró Node 22.13.0.
* **No bloquea el trabajo local** (Node 24.16.0), pero la vista previa de Cloudflare puede fallar o avisar con 22.13.
* **Opciones:** (A) fijar `NODE_VERSION` en Cloudflare a una 22.x ≥ 22.22 (o 24) y proponer `>= 22.22` en los documentos protegidos; (B) fijar `astro` a `7.3.8` si su requisito fuera menor (no se verificó: exigiría una consulta de red al registro). Consecuencia de no decidir: la primera vista previa puede no compilar. No se editó ningún documento.

### 5.3 Otras desviaciones respecto de la especificación y del pedido

1. **Tarea 0 sin ejecutar.** `git mv` y `git rm` están prohibidos a los agentes (`AGENTS.md` §3; `deny` en `.claude/settings.json`). En su lugar se **copiaron** los HTML a `src/pages/*.astro` y se dejaron los originales, `dist/` y `stage-site.mjs`. No uses `git mv` ahora (el destino existe): `git rm` de los originales (D.6); Git detecta el renombrado por similitud al hacer el *commit* (no verificado).
2. **Versión de Astro 7.4.0, no 7.3.8** (el ADR-001 dice "7.3.8, sin actualizar"; el rango `^7.3.8` de la especificación lo permite). `package.json` quedó con `^7.4.0`. Queda a decisión del desarrollador si se fija 7.3.8 exacta. **Decidido el 18-10-2026: `7.4.0` exacta (§9).**
3. **`BaseLayout.astro` recibe `bodyClass`, `noindex` y `description` opcional.** Las 6 páginas **no** comparten las clases de `<body>` (Inicio y Servicios: base; Galería: base + `selection:bg-primary/20 selection:text-primary`; Contacto y 404: base + `flex flex-col min-h-screen`) ni el `<head>` (el Inicio no tiene `description`; la 404 tiene `robots`). La especificación ordena detenerse y reportar antes de unificar: no se unificó, se parametrizó.
4. **"Mover recursos a `public/`" y reorganizar `src/js/`:** no hizo falta. `public/` ya sirve `images/`, `icons/` y `logos/` desde la raíz (D6) y `src/js/` ya tenía `main.js`, `modules/` y `data/`. Solo se agregó `public/_redirects`.
5. **Las "6 páginas" del pedido** mencionan "nosotros/la que corresponda": no existe una página Nosotros. Las 6 son `index`, `servicios`, `suscripcion-floral`, `galeria`, `contacto` y `404`.
6. **`BaseLayout.astro` sí se creó**, aunque el pedido dice no extraer layout, header ni footer: la especificación (Tarea 4) lo exige para el `<head>` y la carga de `main.js` y `stack-tecnologico.md` §2 manda importar el CSS en su *frontmatter*. Header y footer **no** se extrajeron.
7. **No hubo plan de impacto previo aparte:** el pedido indicaba proceder y los archivos tocados están en §3.
8. **Carpeta `_site/` anterior:** antes de la primera compilación se movió la salida vieja (ignorada por Git, generada) a la carpeta temporal del agente. No es un comando de Git; la línea base sigue completa en `referencia/sitio/`.
9. **BOM (DT-11):** los `.astro` nuevos no llevan BOM (el `index.html` original sí lo tenía). `main.js`, `input.css`, `tailwind.config.js` y 4 módulos (`carousel`, `modal`, `navigation` y `theme`) lo conservan; DT-11 sigue abierta y no se reclasificó.
10. **`pnpm` avisa "Update available 11.24.0 → 12.14.0":** sin acción (la versión está fijada en `packageManager`).

### 5.4 Hallazgos fuera de alcance (solo reportados)

* `astro preview` **no aplica `_redirects`**: `/public/images/hero-botanical.webp` responde 404 en local y `/_redirects` se sirve como archivo (en Cloudflare Pages no se publica). La redirección 301 del Escenario 4 solo se puede comprobar en la vista previa de Cloudflare (🕒 PENDIENTE).
* `<form id="contact-form" action="#" method="post">` (Contacto): no es un `href`, pero deja un destino `#` si el JavaScript no corre. Ya estaba en el HTML original; el módulo cancela el envío (`preventDefault`). Sin cambio.
* `README.md` §5 describe `src/layouts/`, `src/components/`, `src/data/navegacion.js` y `public/robots.txt`, que existirán al cerrar las Iteraciones 03 a 05. Hoy el layout existe, pero no hay `components/`, `data/` ni `robots.txt`. Es adelanto de lo planificado, no defecto.
* `DESIGN.md` L348, L409 y L542 mencionan `index.html`, `servicios.html` y `output.css`: ya figuran en la propuesta B.1 (Iteración 08).
* `.claude/settings.json` sigue modificado por el desarrollador (ver §2); no se tocó.
* Los hallazgos de la bitácora de la Iteración 01 (§14.5: afirmaciones del `README.md` frente a DT-23 y DT-04) **no se corrigieron**, por indicación del desarrollador (se resuelven al cerrar la Épica 10).

### 5.5 Deuda técnica (`_planificacion/README.md` §12, entregada como propuesta D.7)

* **DT-10:** propuesta de ✅ Resuelta (evidencia en §4.2 y §4.3).
* **DT-17:** propuesta de ✅ Resuelta por las 5 páginas restantes (`<meta charset>` primero en las 6).
* **DT-16:** propuesta de ✅ Resuelta, **para aplicar solo después de que el desarrollador ejecute `git rm -r dist`**. Hoy `dist/css/output.css` sigue versionado, así que no está resuelta.
* **DT-14:** propuesta de nota de actualización (el `<base>` ya no existe; verificación local de `/a/b/xyz`).
* **Deuda nueva:** ninguna. No se cambió la severidad de ninguna deuda registrada.

## 6. Archivos modificados y propuestas para archivos protegidos

Archivos con cambios en Git (`git status`, solo lectura), además de `.claude/settings.json` (del desarrollador):

* Modificados: `.gitignore`, `package.json`, `pnpm-lock.yaml`, `tailwind.config.js`, `src/js/main.js`, `src/js/data/services.js`, `src/js/modules/carousel.js`, `src/js/modules/modal.js`, `src/js/modules/contact-form.js`, `_planificacion/01-vision/proposito-y-alcance.md`, `_planificacion/03-planificacion/epicas/epica-08-migracion-astro/propuestas-documentos-protegidos.md`, `_planificacion/04-bitacora/decisiones-tecnicas.md`, `_planificacion/04-bitacora/estado-actual.md`.
* Nuevos: `astro.config.mjs`, `postcss.config.cjs`, `public/_redirects`, `scripts/comparar-con-referencia.mjs`, `src/layouts/BaseLayout.astro`, `src/pages/` (6 archivos) y esta bitácora.
* `_site/` y `.astro/` no aparecen (ignorados).

**Propuestas para archivos protegidos** (en `propuestas-documentos-protegidos.md`, sección D; 13 de 13 líneas `-` y el contexto de cada bloque verificados por programa contra el texto vigente):

| # | Archivo y sección | Qué cambia |
|:--|:------------------|:-----------|
| D.1 | `AGENTS.md` §4 | Retira la nota de transición (3 líneas y 1 en blanco) |
| D.2 | `README.md` L12 a L15 | Retira la nota de transición |
| D.3 | `_planificacion/README.md` §7 | Retira la nota de transición |
| D.4 | `AGENTS.md` §5, regla 8 | Quita "el `<base>` se retira en la It. 02" (ya retirado) |
| D.5 | `stack-tecnologico.md` §2 | Agrega la regla `compressHTML: false` |
| D.6 | Comandos Git del desarrollador | `git rm` de los 6 HTML, `dist/` y `scripts/stage-site.mjs` |
| D.7 | `_planificacion/README.md` §12 | Filas DT-10, DT-14, DT-16 (condicional) y DT-17; 4 de 4 líneas `-` verificadas |

`proposito-y-alcance.md` §2 **sí se editó** (el permiso `ask` lo autorizó): solo los 7 nombres `.html` por las rutas reales.

## 7. Mensaje de commit sugerido

```text
Épica 08 - Iteración 02: Migra las 6 páginas a Astro en paridad literal con el HTML de referencia.
```

Longitud contada con Node: 98 caracteres.

---

## 8. Estado, reservas y herencia

### 8.1 Estado

**Completada con reservas.** No está 🔒 Cerrada (fusión a `main`, `_planificacion/README.md` §5).

### 8.2 Reservas

1. **Tarea 0 sin ejecutar:** los HTML originales, `dist/` y `stage-site.mjs` siguen en el árbol hasta que el desarrollador ejecute D.6. Hasta entonces DT-16 sigue abierta y el repositorio tiene 6 HTML duplicados.
2. **Sin revisión visual humana ni con tipografías reales:** la comparación en navegador fue automática, con Google Fonts y videos bloqueados (§4.3). Nadie ha mirado las 84 capturas una por una.
3. **Sin vista previa de Cloudflare:** no se verificaron el `*.pages.dev`, la versión de Node del registro, la redirección 301 de `/public/*` ni el `404.html` servido por Cloudflare en rutas anidadas.
4. ~~Versión de Node de Astro 7.4.0 (§5.2) y versión exacta de Astro (§5.3, punto 2) a decidir.~~ **Decididas el 18-10-2026 (§9);** queda por aplicar el mínimo de Node en los documentos protegidos (propuestas E).
5. Los números de §4.3 son de **una corrida** de cada combinación. El ruido de render se midió el 18-10-2026 (§9.4).

### 8.3 Pendientes del desarrollador (🕒 PENDIENTE)

* Ejecutar los comandos de D.6 y aplicar D.1 a D.5 y D.7 (esta última, DT-16, solo después de D.6).
* ~~Decidir la versión de Node de Astro (§5.2) y fijar `NODE_VERSION` en Cloudflare; decidir si se fija Astro 7.3.8.~~ Hecho el 18-10-2026 (§9): Cloudflare usa Node 22.22.2; Astro queda en 7.4.0 exacta.
* Hacer *push* de la rama y revisar el registro de Cloudflare (Node, `astro build`) y la vista previa `*.pages.dev`: las 6 páginas, `/public/images/hero-botanical.webp` (debe redirigir con 301) y `/a/b/inexistente`.
* Revisión visual con red real: `pnpm dev` o `pnpm preview` en navegador, claro y oscuro, en 320, 360, 412, 768, 740 de ancho, 1024 y 1280 px; en particular las etiquetas del formulario de Contacto (`NOMBRE *`, `TELÉFONO (opcional)`), el menú móvil, el modal de Servicios, el visor y los videos de la Galería, el carrusel de reseñas y el cambio de tema. Comprobar también móvil real, Firefox y Safari.
* Consola del navegador con las fuentes y los videos reales.

### 8.4 Heredado a la Iteración 03

| Ítem | Detalle |
|:-----|:--------|
| Header y footer siguen duplicados en las 6 `.astro` | Iteración 03 extrae el footer (cierra DT-06) y la 04 el header. La paridad exacta se comprueba con `scripts/comparar-con-referencia.mjs`, que ya conserva atributos en orden y espacios |
| El comparador depende de `referencia/sitio/` | Está fuera de Git; no se pierde al retirar los HTML de la raíz. Al extraer componentes, las diferencias esperadas del footer (DT-06: 2 variantes de contenedor) aparecerán como no esperadas y deberán documentarse una a una |
| `bodyClass` por página | El layout parametriza las clases de `<body>`; la Iteración 03 no necesita tocarlas |
| Comentarios de nivel 1 | Astro los omite del HTML publicado: si algún componente futuro depende de un comentario como marca (no es el caso), usar otro mecanismo |
| `README.md` §5 (estructura) y `DESIGN.md` (B.1) | Siguen adelantados o desactualizados; se ajustan en las Iteraciones 03 a 05 y 08 |
| DT-15 (tema oscuro en `DOMContentLoaded`) | Sin cambio: `theme.js` no se tocó; opcional en la Iteración 07 |

---

## 9. Ajuste de cierre — 18-10-2026

Ajuste posterior al *push* de la Iteración 02 (último *commit* `b26a14c`). No es una iteración nueva y no toca el sitio visible: ni `src/`, ni `public/`, ni `astro.config.mjs`. Estado de la iteración: **sin cambio, Completada con reservas** (falta la revisión visual humana).

### 9.1 Decisiones del desarrollador (no se reabren)

* `astro` queda en **`7.4.0` exacta** (sin `^`). La especificación pedía `^7.3.8`; el caret permitió que pnpm instalara 7.4.0.
* `astro@7.4.0` exige **Node `>= 22.22.0`** [código: `node_modules/astro/package.json` → `engines.node`]. El mínimo declarado del proyecto sube de `>= 22.13` a **`>= 22.22`**.
* **Evidencia del despliegue (reportada por el desarrollador; esta sesión no vio el registro):** el 18-10-2026 Cloudflare Pages compiló `b26a14c` sin errores con Node 22.22.2 y Astro 7.4.0.
* Los archivos protegidos y `02-arquitectura/**` los aplica el desarrollador; aquí solo hay propuestas (sección E de `propuestas-documentos-protegidos.md`). D.1 a D.5 y D.7 ya estaban aplicadas (informado por el desarrollador; no se repiten).

### 9.2 Cambios

| Archivo | Cambio |
|:--------|:-------|
| `package.json` | `"astro": "^7.4.0"` → `"astro": "7.4.0"`. No se agregó `engines` (no existe; se propone en E.5). |
| `pnpm-lock.yaml` | 1 línea: `importers › . › astro › specifier: ^7.4.0` → `7.4.0`. La versión resuelta (`7.4.0(jiti@1.21.7)(yaml@2.9.1)`) no cambió. **pnpm lo exigía:** con solo `package.json` cambiado, `pnpm install --frozen-lockfile --offline` falló con "specifiers in the lockfile don't match … astro (lockfile: ^7.4.0, manifest: 7.4.0)". |
| `_planificacion/04-bitacora/decisiones-tecnicas.md` | ADR-001: D1 corregida a 7.4.0 exacta con Node `>= 22.22.0`; subsección "Corrección de D1" (causa, Node, evidencia, decisión). En las decisiones de la Iteración 02: viñeta de la versión de Astro alineada y viñeta nueva del mínimo de Node. El Contexto del ADR (la prueba de concepto usó 7.3.8) se conserva como ocurrió. |
| `propuestas-documentos-protegidos.md` | Sección E nueva (E.1 a E.6). |
| Esta bitácora | Esta sección y notas de resolución en §1, §5.2, §5.3, §8.2 y §8.3 (el texto original se conserva). |
| `estado-actual.md` | Una línea nueva al final. |

### 9.3 Ocurrencias de Node `22.13` y mínimos de Node (18-10-2026)

* **Protegidos, con propuesta pendiente:** `AGENTS.md` L90; `README.md` L60 y L105; `stack-tecnologico.md` L11 (E.1 a E.3).
* **Sin ocurrencias:** `_planificacion/README.md`, `package.json` (no declara `engines`), `.nvmrc` y `.node-version` (no existen).
* **No protegidas, con propuesta E.6:** `definicion-epica.md` L45 y L150 (dicen `22.13` / `22.12`).
* **Historial, sin tocar:** bitácoras de las Épicas 07 y 08, `iteracion-02.md` L180 y `estado-actual.md` L38 y L55.
* Las líneas con `engines` de `pnpm-lock.yaml` son de paquetes de terceros, no del proyecto.

### 9.4 Preguntas del ajuste

**a) "246 referencias (243 rutas y 3 anclas)" frente a "7 anclas con destino"** [código, recomputado sobre `_site/` el 18-10-2026]. Son dos particiones distintas de las mismas referencias. 246 = referencias internas (`href`, `src`, `data-src` y `srcset`, sin externas): 243 empiezan con `/` y 3 con `#` (`#servicios` ×2 y `#suscripcion`, todas en el Inicio). Las 7 anclas son las referencias que llevan fragmento `#`: las 3 de la misma página más 4 de la forma `/galeria#…` (`ramos-de-novia`, `decoracion-mesas`, `suscripcion-floral`, `floristeria`), que se cuentan dentro de las 243 porque empiezan con `/`. Las 7 tienen su `id` en la página de destino (7 de 7). 0 `href="#"`. La redacción del §4.2 contrastaba un "3" y un "7" sin aclarar que no son el mismo conjunto.

**b) Diferencias de hasta 16/255 por canal en 68 capturas** [render]. Se midió el ruido: el sitio de referencia (`referencia/sitio/`) contra sí mismo, con el mismo arnés de la §4.3 (Chrome 155 headless, mismo bloqueo de Google Fonts y `.mp4`, movimiento reducido), 84 combinaciones, 2 cargas independientes cada una. Resultado: 84 pares del mismo tamaño, **77 idénticos y 7 con diferencia**, máximo 13 niveles, 4 pares con píxeles de más de 8 niveles (1 a 13 píxeles).

| | Sitio anterior vs `_site/` (§4.3) | Referencia vs sí misma (ruido) |
|:--|:--|:--|
| Pares idénticos | 16 de 84 | 77 de 84 |
| Pares con diferencia | 68 | 7 |
| Máximo por canal | 16 | 13 |
| Pares con algún píxel > 8 niveles | 8 (1 a 13 px) | 4 (1 a 13 px) |

Conclusión: el ruido existe y **explica las diferencias de más de 8 niveles de Galería y Servicios**, porque se reproducen con las mismas cifras: `servicios-1280-claro` (1.917 píxeles de más de 1 nivel y 13 de más de 8, igual en ambas mediciones), `galeria-768` (1.785 y 4), `galeria-1280` (722 y 1) y `galeria-412` (78 y 1). Son píxeles aislados de un solo canal sobre fotografías (por ejemplo `(147,130,13)` frente a `(147,130,0)`), compatible con ruido de decodificación de imágenes (esto último es hipótesis; no se aisló el decodificador). **No explica** (i) las diferencias de 1 nivel de unos 60 pares, que no aparecen en la referencia contra sí misma y que corresponden al redondeo de color documentado en la §4.3 (1.351 elementos-propiedad; atribución por estilo calculado, no demostrada píxel a píxel) y (ii) los píxeles de más de 8 niveles del Inicio (`index-768` claro y oscuro, 3 píxeles, hasta 16 niveles; `index-1024-claro`, 1 píxel), que **no se reprodujeron** en esta medición. Esos casos quedan como no atribuidos; su tamaño (≤ 3 píxeles) no sugiere un defecto de maquetación, y la geometría coincidió en las 84 combinaciones. Una sola repetición por combinación: no es una caracterización estadística del ruido.

**c) Comentario de `contact-form.js` fuera de la lista** (decisión pendiente del desarrollador). Hecho: el *commit* `44a82dc` cambió solo 2 líneas del comentario de cabecera (`servicios.html` → `/servicios`, `suscripcion-floral.html` → `/suscripcion-floral`, `contacto.html?service=` → `/contacto?service=`); sin cambio de código. La lista de la especificación (L17) nombra `main.js`, `services.js`, `carousel.js` y `modal.js`, pero la Tarea 5.4 (L145-146) dice que los comentarios de `contact-form.js` "pueden mencionarlos; actualízalos si corresponde": la especificación es ambigua. Opciones: (A) aceptarlo como excepción documentada, citando la Tarea 5.4 (el comentario ya no miente sobre las rutas); (B) dejarlo como estaba (el comentario conserva nombres `.html` que ya no existen). Recomendación del agente: A, pero no se decide aquí.

**d) 106 archivos de `_site/` frente a 105 en Cloudflare** [código]. La diferencia calza con `_redirects`: `_site/` tiene 106 archivos (62,1 MiB) y 105 sin `_redirects`; la composición es 6 HTML + 2 de `_astro/` + 98 de `public/` (incluido `_redirects`) = 106. El 105 de Cloudflare es el dato informado por el desarrollador; no se vio el registro, así que la explicación (Cloudflare lee `_redirects` como configuración y no lo cuenta como archivo publicado) es consistente con las cifras, pero **no está verificada** contra el registro. El "246" no es un conteo de archivos (son referencias) y no se compara con el 105.

### 9.5 Verificación

| Comprobación | Resultado |
|:-------------|:----------|
| `pnpm install --frozen-lockfile --offline` | Con el cambio y sin red previa: "Already up to date", pero termina con código 1 por `ERR_PNPM_NO_OFFLINE_META` (la verificación de políticas de cadena de suministro necesitaba metadatos de `h3` que la caché no tenía). Con el cambio revertido pasaba (código 0). Se ejecutó `pnpm install --frozen-lockfile` con red: "Lockfile passes supply-chain policies (330 entries)", código 0; después `--offline` pasa de nuevo (código 0, "Already up to date"). |
| `pnpm run build:cf` (con `_site/` borrada antes) | Código 0; "6 page(s) built"; 0 líneas con "warn". |
| `_site/` | 6 páginas; 106 archivos. |
| `package.json` | `devDependencies.astro` = `"7.4.0"` (exacta); instalada: 7.4.0. |
| Invariantes en `_site/*.html` | 0 `style=`, 0 `onclick`, 0 `<style`, 0 `<script>` sin `src`, 0 `href="#"`, IDs únicos (6, 17, 17, 16, 13 y 11). |
| CSS de `_astro/` | `fx-starlight`, `bg-noise`, `bg-surface`, `.dark\:hidden:is(.dark *)` y `.hover\:grow-\[10\]:hover` presentes (inspección del texto del CSS). |

Sin render nuevo del sitio: el ajuste no cambia el sitio visible (la versión instalada de Astro ya era 7.4.0). Las propuestas de la sección E: 6 de 6 líneas `-` verificadas por programa contra el texto vigente.

### 9.6 Pendientes y decisiones del desarrollador

* Aplicar la sección E (mínimo de Node) y decidir si se agrega `engines` (E.5).
* Decidir 9.4 c (A o B).
* Revisión visual humana con red real (§8.3): sigue pendiente y es lo que mantiene "Completada con reservas".
* Vista previa de Cloudflare: la redirección 301 de `/public/*` y el `404.html` en rutas anidadas siguen sin verificar en esta sesión.
* Mensaje de *commit* sugerido (162 caracteres, contados con Node):

```text
Épica 08 - Iteración 02: Fija Astro 7.4.0 exacta, sube el mínimo de Node a 22.22 y registra el ajuste de cierre con las propuestas para los documentos protegidos.
```
