# Bitácora de Ejecución - Épica 07 - Iteración 01

**Fecha de ejecución:** 29-09-2026
**Agente:** Claude Code
**Objetivo:** Desplegar desde `_site/` mediante `pnpm run build:cf` con una lista blanca verificada, y dejar los
documentos de visión y arquitectura coherentes con el sitio real (DT-09).

## 1. Resumen ejecutivo

- `build:cf` quedó integrado en `package.json` y `_site/` en `.gitignore`. `pnpm run build:cf` termina sin errores y
  genera `_site/` con exactamente los 6 HTML, `dist/`, `public/` y `src/js/` (112 archivos, 64.839.429 bytes).
- Las 13 exclusiones exigidas están ausentes de `_site/`, las 277 referencias locales resuelven (0 faltantes) y ningún
  archivo supera 25 MiB.
- `scripts/stage-site.mjs` recibió una guarda nueva contra la publicación de un CSS desactualizado (autorizada por el
  desarrollador, Tarea 1.6), probada en tres árboles simulados.
- DT-09 resuelta: `proposito-y-alcance.md`, `objetivos-y-metricas.md` y `stack-tecnologico.md` describen el sitio real.
- La iteración se detuvo dos veces por un incidente previo (código fuente movido a `_site/` y reescrituras de rutas
  del IDE en 52 archivos). Se reparó y verificó antes de ejecutar la iteración (§5.1).
- El SHA-256 de `dist/css/output.css` es idéntico al inicio y al cierre, e idéntico al de HEAD.
- Las acciones de Cloudflare quedan **🕒 PENDIENTES** del desarrollador (§5.4).

## 2. Línea base

| Elemento | Valor | Comando |
|:--|:--|:--|
| Commit de partida | `fceb1eb` | `git log --oneline -3` |
| SHA-256 `dist/css/output.css` antes de compilar | `9901ecf5690236b95eccddbc59e992ba69ebba184eeeab227e85aeea680f4143` | `sha256sum` |
| SHA-256 del blob en HEAD | `9901ecf5690236b95eccddbc59e992ba69ebba184eeeab227e85aeea680f4143` | `git show HEAD:dist/css/output.css \| sha256sum` |
| SHA-256 tras `pnpm build` (línea base) | `9901ecf5690236b95eccddbc59e992ba69ebba184eeeab227e85aeea680f4143` | `pnpm build` (exit 0) + `sha256sum` |
| Tamaño de `dist/css/output.css` | 47.153 bytes | `stat -c %s` |

**Auditoría del renombrado (Tarea 1):**

| Comprobación | Estado | Evidencia |
|:--|:--:|:--|
| `_antigravity/` no existe | ✅ | `test -e _antigravity` → no existe |
| `_planificacion/` contiene `README.md`, `01-vision/`, `02-arquitectura/`, `03-planificacion/`, `04-bitacora/` | ✅ | `ls -1 _planificacion/` |
| Sin `CLAUDE.md`, `CLAUDE.local.md` ni `.claude/CLAUDE.md` | ✅ | `ls` → "No such file or directory" en los tres |
| `.claude/settings.json` es JSON válido | ✅ | `JSON.parse` con Node sin error |
| `_planificacion/02-arquitectura/DESIGN.md` es redirección | ✅ | 5 líneas; remite a `/DESIGN.md` y prohíbe agregar contenido |
| `tailwind.config.js` no escanea `_site/` | ✅ | `content`: `./src/**/*.{html,js}` y `./*.html` (líneas 14 a 17) |

**Búsqueda de `_antigravity` / `.antigravity`** (sin distinguir mayúsculas; excluye `node_modules/`, `.git/`, `dist/`,
`_site/`; conteo de líneas con coincidencia por archivo):

| Clase | Archivos | Líneas | Acción |
|:--|:--|:--|:--|
| Histórica | `epica-01-inicio/iteracion-06.md` (1), `iteracion-07.md` (1); `bitacora-epica-01/bitacora-iteracion-06.md` (1); `bitacora-epica-06/bitacora-iteracion-07, 08, 09, 11, 12, 13` (2 cada una) | 15 en 9 archivos | Ninguna (registro histórico) |
| Activa, correcta | `_planificacion/README.md` (3: líneas 4, 229 y 232), `epica-07/definicion-epica.md` (2), `epica-07/iteracion-01.md` (3) | 8 | Ninguna: describen el renombrado, no usan la ruta |
| Configuración local del IDE | `.idea/workspace.xml` (3: rutas recientes de `_antigravity`) | 3 | Ninguna: `.idea/` está en `.gitignore` y no es configuración del proyecto |

Resultado: **0 referencias activas rotas**.

## 3. Cambios realizados (por archivo)

| Archivo | Cambio |
|:--|:--|
| `package.json` | Se agrega `"build:cf": "pnpm build && node scripts/stage-site.mjs"` después de `"build"`. La línea de `"build"` solo gana la coma final que exige JSON. CRLF conservado (25/25). |
| `.gitignore` | Se agrega al final el bloque del comentario y `_site/`. Como la última línea (`*.sw?`) no terminaba en salto, Git la muestra como modificada (`\ No newline at end of file`). LF conservado. |
| `scripts/stage-site.mjs` | Guarda nueva antes de `rmSync` (Ajuste 2): lee `package.json` quitando un BOM inicial, aborta si `scripts.build` contiene `_site` o no contiene `dist/css/output.css`, y exige que `dist/css/output.css` exista y pese más de 0 bytes. Se amplía el `import` con `readFileSync` y `statSync`. Diff: 18 inserciones y 1 línea modificada. CRLF 84/84, sin BOM, `node --check` OK. |
| `_planificacion/01-vision/proposito-y-alcance.md` | §1: publicación en GitHub y Cloudflare Pages. §2: 6 archivos HTML; Servicios con 8 servicios, modal dinámico y `contacto.html?service=...`; Suscripción con 3 planes (Esencial, Premiere y Luxe) para hogar u oficina (reemplaza "b2b y b2c", que el sitio no usa); Galería con acordeón por capítulos y Lightbox multimodal, sin filtros; Contacto con tarjetas de WhatsApp y correo y formulario que abre WhatsApp, sin mapa incrustado ni Netlify Forms; `404.html` con `noindex, follow`. Nota sobre la Épica 08 bajo la prohibición de frameworks, que no cambia. |
| `_planificacion/01-vision/objetivos-y-metricas.md` | "el agente Antigravity" → "los agentes de IA"; "Antigravity debe asegurar" → "el agente de IA debe asegurar". Ninguna métrica cambia. |
| `_planificacion/02-arquitectura/stack-tecnologico.md` | Tabla del núcleo: pnpm `11.24.0` (Node `>= 22.13`), seis páginas físicas, despliegue "GitHub + Cloudflare Pages" con `pnpm run build:cf` y salida `_site/`. Nota de que `DESIGN.md` vive en la raíz. Regla nueva de clases literales de Tailwind. |
| `_planificacion/README.md` | Solo la fila DT-09 de la tabla del §12: marcada ✅ Resuelta (Épica 07 · Iteración 01). |
| Bitácoras | Este archivo, una línea en `estado-actual.md` y una entrada en `decisiones-tecnicas.md`. |

**Sin cambios** respecto de HEAD: los 6 HTML, `src/**`, `tailwind.config.js`, `AGENTS.md`, `README.md` y `DESIGN.md`.

**Fuentes de los hechos de la Tarea 4:** `services.js` (8 `title:`), `modal.js:225` (`contacto.html?service=`),
`galeria.html` (6 `<h2>` de capítulo y 34 `gallery-carousel-card`), `gallery.js` ("filter" solo aparece como
`Array.filter`, y el comentario de la línea 5 declara el Lightbox multimodal), `contacto.html` (0 "netlify", 0
`<iframe>`, un enlace a Google Maps en el footer), `contact-form.js:77` (`https://wa.me/...`), `404.html:8`
(`noindex, follow`) y 0 `aria-current` en `404.html`, `suscripcion-floral.html` (planes Esencial, Premiere y Luxe, y
"hogar u oficina" en la descripción). La exigencia de Node `>= 22.13` proviene de `AGENTS.md` y `README.md`;
`package.json` no declara `engines`. Node local: `v24.16.0`.

## 4. Verificación de criterios de aceptación

### 4.1 Tarea 3: `_site/` tras `pnpm run build:cf`

Registro real (exit 0):

```text
$ pnpm build && node scripts/stage-site.mjs
$ tailwindcss -i ./src/css/input.css -o ./dist/css/output.css --minify
Browserslist: caniuse-lite is outdated. Please run: (aviso conocido, no se corrige)
Done in 811ms.
[stage-site] 6 páginas y 3 directorios preparados en ./_site
```

**Árbol a dos niveles:**

```text
_site
├── 404.html · contacto.html · galeria.html · index.html · servicios.html · suscripcion-floral.html
├── dist/css/
├── public/icons/ · public/images/ · public/logos/
└── src/js/
```

| Medida | Valor | Comando |
|:--|:--|:--|
| Archivos totales | 112 (6 HTML + 1 CSS + 95 de `public/` + 10 de `src/js/`) | `find _site -type f \| wc -l` |
| Tamaño total | 64.839.429 bytes (61,84 MiB; `du -sh`: 65M) | `find -printf '%s'` + `awk` |
| Frente al máximo de 20 000 archivos | 0,56 % | `awk` |
| Archivos > 25 MiB (26 214 400 bytes) | **0** | `find _site -size +26214400c` |
| Archivo más grande | `public/images/galeria/nmg2.mp4`: 22.715.000 bytes (21,66 MiB; 86,7 % del límite) | `find … \| sort -rn` |
| Archivos en `public/` origen / en `_site/` | 95 / 95 | `find … \| wc -l` |
| Archivos en `src/js/` origen / en `_site/` | 10 / 10 | `find … \| wc -l` |
| Archivos sueltos en la raíz de `_site/` que no son HTML | 0 | `find -maxdepth 1 ! -name '*.html'` |

**Exclusiones (`test -e _site/<ruta>`):**

| Ruta | Ausente |
|:--|:--:|
| `_planificacion` | ✅ |
| `AGENTS.md` | ✅ |
| `README.md` | ✅ |
| `DESIGN.md` | ✅ |
| `.claude` | ✅ |
| `scripts` | ✅ |
| `src/css` | ✅ |
| `package.json` | ✅ |
| `pnpm-lock.yaml` | ✅ |
| `tailwind.config.js` | ✅ |
| `node_modules` | ✅ |
| `.git` | ✅ |
| `.gitignore` | ✅ |

**Integridad de referencias** (script temporal en el scratchpad de la sesión, fuera del repositorio):

| Origen | Referencias locales comprobadas |
|:--|:--|
| `404.html` / `contacto.html` / `galeria.html` / `index.html` / `servicios.html` / `suscripcion-floral.html` | 23 / 22 / 90 / 44 / 31 / 33 |
| `src/js/data/services.js` / `src/js/modules/carousel.js` (resto de módulos: 0 rutas `./public/`) | 33 / 1 |
| `url()` locales en `output.css` | 0 |
| **Total** | **277, con 0 faltantes** |

Se revisaron `src`, `href`, `data-src`, `poster`, más `srcset` y `url()` en línea como control extra. Se ignoraron
`http(s):`, `mailto:`, `tel:`, `data:` y `#`, y se quitaron las cadenas de consulta. Control adicional: los 7 módulos
que `main.js` importa dinámicamente (`./modules/*.js`) existen en `_site/src/js/modules/`.

**CSS:** `dist/css/output.css` y `_site/dist/css/output.css` tienen el mismo SHA-256
(`9901ecf5…680f4143`). Las clases del header están presentes (búsqueda literal con `grep -oF`): `.lg\:w-9`,
`.xl\:px-4`, `.min-h-\[3rem\]` y `.max-h-\[calc\(100dvh-5rem\)\]`, 1 ocurrencia cada una.

**Git:** `git status --short` no lista `_site/`; `git status --short --ignored` la muestra como `!! _site/`.

### 4.2 Pruebas de la guarda nueva de `stage-site.mjs` (Ajuste 2)

Árboles simulados en el scratchpad. El `package.json` simulado lleva BOM a propósito. Cada árbol tiene
`_site/testigo.txt` para comprobar si se borra. La copia probada es idéntica byte a byte al script del repositorio
(`cmp`). Salida real:

```text
----- Caso i -----
[stage-site] 1 páginas y 3 directorios preparados en ./_site
exit=0
testigo _site/testigo.txt: eliminado
contenido de _site: ./dist/css/output.css ./index.html ./public/images/a.webp ./src/js/main.js
----- Caso ii -----
Error: [stage-site] El script "build" de package.json no compila hacia "dist/css/output.css" ("tailwindcss -i ./src/css/input.css -o _site/dist/css/output.css --minify"). Se aborta SIN borrar nada: se publicaría un CSS desactualizado.
exit=1
testigo _site/testigo.txt: CONSERVADO
contenido de _site: ./testigo.txt
----- Caso iii -----
Error: [stage-site] Falta "dist/css/output.css" o está vacío. Se aborta SIN borrar nada. ¿Se ejecutó "pnpm build"?
exit=1
testigo _site/testigo.txt: CONSERVADO
contenido de _site: ./testigo.txt
```

La guarda también se ejecutó en el repositorio real, dentro de las dos corridas de `pnpm run build:cf` (exit 0).

### 4.3 Escenarios de la especificación

| Criterio | Estado | Evidencia |
|:--|:--:|:--|
| Escenario 1: Lista blanca comprobada | ✅ | Confirmado por ejecución: 6 HTML, `dist/`, `public/` y `src/js/`; 13/13 exclusiones; 0 archivos > 25 MiB (§4.1). |
| Escenario 2: Integridad de referencias | ✅ | Confirmado por ejecución: 277 referencias, 0 faltantes (§4.1). |
| Escenario 3: Integración mínima | ✅ con precisión | `git diff`: en `package.json` se agrega 1 línea (`build:cf`) y `"build"` solo gana la coma obligatoria; `.gitignore` solo agrega el bloque de `_site/` (`*.sw?` aparece modificada únicamente por el salto de línea final que faltaba). |
| Escenario 4: Coherencia documental | ✅ | Confirmado por código: 6 páginas, Cloudflare Pages, pnpm 11.24.0, formulario por WhatsApp y galería sin filtros (fuentes en §3). Propuestas para archivos protegidos en §6. |
| Escenario 5: Honestidad del reporte | ✅ | Nada de Cloudflare figura como ✅ (§5.4). Todos los hashes y conteos salen de comandos ejecutados en esta sesión. |
| Compilación determinista | ✅ | SHA-256 idéntico en la línea base, tras `build:cf` y en el cierre: `9901ecf5690236b95eccddbc59e992ba69ebba184eeeab227e85aeea680f4143`. |
| Cero cambios en HTML, `src/**` y `tailwind.config.js` | ✅ | `git diff HEAD --stat` sobre esas rutas sale vacío. |
| Cero Git que escriba (agente) | ✅ | El agente solo usó `status`, `diff`, `log`, `show`, `ls-files`, `grep`, `hash-object`, `rev-parse`, `config --get` y `check-ignore`. Los `git restore` y `git add` los ejecutó el desarrollador. |
| Sin scripts temporales en el repositorio | ✅ | `git ls-files --others --exclude-standard` sale vacío; los scripts viven en el scratchpad. |
| Render real en navegador | No aplica | La iteración no tiene impacto visual (0 cambios en HTML, CSS y JS). |
| Despliegue en Cloudflare con `_site` | 🕒 PENDIENTE | Acción del desarrollador (§5.4). |

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

### 5.1 Incidente: código fuente movido a `_site/` y reescrituras de rutas del IDE

**Detección (primer intento de la iteración).** Al leer la especificación, el agente encontró que el código fuente
estaba dentro de `_site/`: 113 archivos renombrados y preparados en el índice (6 HTML, `src/css`, `src/js/**`,
`dist/css/output.css` y 95 de `public/`). En la raíz no quedaban `.html`, `src/`, `dist/` ni `public/`. La versión de
`stage-site.mjs` presente en ese momento ejecutaba `rmSync('_site')` **antes** de validar nada: `pnpm run build:cf`
habría borrado el código fuente, incluidas 191 líneas sin preparar de los 6 HTML, imposibles de recuperar con Git. El
agente se detuvo sin ejecutar nada y reportó el conflicto. El desarrollador confirmó que el movimiento fue un error
propio, lo deshizo desde el IDE y reemplazó `stage-site.mjs` por la versión segura (encabezado `SEGURIDAD`,
`SOURCE_SIGNATURES` y validación antes de `rmSync`).

**Residuos tras deshacer el movimiento (segundo intento).** Un clasificador comparó cada línea cambiada frente a HEAD,
normalizando las rutas. Resultado: **52 archivos y 328 líneas** reescritas por la refactorización «Mover» del IDE, sin
ninguna otra edición mezclada:

| Grupo | Archivos | Líneas | Tipo de reescritura |
|:--|:--|:--|:--|
| HTML | 6 (`galeria` 53, `index` 39, `suscripcion-floral` 30, `servicios` 27, `404` 23, `contacto` 19) | 191 | Se quitó `./` de rutas locales (`./public/...` → `public/...`, `./index.html` → `index.html`) |
| `package.json` | 1 | 2 | `dev` y `build` compilaban hacia `_site/dist/css/output.css` |
| Protegidos (`AGENTS.md` 6, `DESIGN.md` 6, `README.md` 4) | 3 | 16 | Rutas con prefijo `_site/` |
| `_planificacion/` | 42 | 119 | Prefijos `_site/`, `../_site/` y `../../../_site/`. Incluye **18 bitácoras cerradas (64 líneas)**, por ejemplo 14 en `bitacora-epica-06/bitacora-iteracion-10.md`, junto a hashes SHA-256 registrados |

Hallazgos críticos del incidente:

1. **Hueco de `package.json`:** con `build` hacia `_site/dist/`, `pnpm build` no actualizaba `dist/` y
   `stage-site.mjs` habría publicado el `dist/` viejo **sin ningún error**, porque `dist` no figura en
   `SOURCE_SIGNATURES`. Se cerró con la guarda nueva (§4.2).
2. **Línea 246 de `index.html` (fondo del Hero):** doble reescritura. En HEAD era `url('./public/images/hero-botanical.webp')`,
   en el índice `url('public/images/...')` y en disco `url('images/hero-botanical.webp')`, una ruta inexistente que
   dejaba el Hero sin fondo.
3. **0 bytes en el índice:** `scripts/stage-site.mjs` e `iteracion-01.md` a `iteracion-04.md` estaban preparados
   vacíos (0 bytes en el índice frente a 2.996–13.846 bytes en disco). Un commit en ese estado los habría publicado
   vacíos.
4. En la definición de la Épica 07 (edición del desarrollador) y en los 4 archivos nuevos, las 38 coincidencias de
   `_site` son legítimas: describen la carpeta generada.

**Reparación.**

1. Desarrollador: `git restore --source=HEAD -- AGENTS.md README.md DESIGN.md`, `git restore --staged` de los 6 HTML y
   `git add` de `scripts/stage-site.mjs` y de la carpeta de la Épica 07.
2. Agente: preparó en el scratchpad un script de Node (`fase-r.cjs`) que respaldaba y reescribía byte a byte los 49
   archivos restantes desde HEAD. **El clasificador de permisos de Claude Code denegó su ejecución.** El agente
   comprobó que no alcanzó a escribir nada (no existía la carpeta de respaldo, seguían 50 archivos distintos de HEAD y
   la línea 246 seguía rota) y no intentó rodear el bloqueo. El desarrollador descartó el script, porque además habría
   dejado finales de línea LF en un árbol con `core.autocrlf=true`.
3. Desarrollador: `git restore --source=HEAD --staged --worktree -- <49 archivos>`, con la lista de
   `git diff HEAD --name-only --diff-filter=M` sin la definición de la Épica 07.

**Verificación posterior (solo lectura, todo ✅):**

| Control | Evidencia |
|:--|:--|
| a) Solo la definición de la Épica 07 difiere de HEAD | `git diff HEAD --name-only --diff-filter=M` → 1 archivo |
| b) Índice | `git diff --cached --name-status`: los 5 archivos nuevos como `A`, más `M` de la definición de la Épica 07, que es edición del desarrollador (índice igual a disco) |
| c) Clasificador | 0 líneas del IDE |
| d) `_site` y rutas sin `./` | Solo usos legítimos (`stage-site.mjs` y especificaciones de las Épicas 07 y 08); 0 rutas sin `./` en los 6 HTML |
| e) `index.html:246` | `url('./public/images/hero-botanical.webp')` |
| f) `package.json` | `dev` y `build` iguales a HEAD (`./dist/css/output.css`) |
| g) Hash | `git hash-object` = `git rev-parse HEAD:<ruta>` en **49/49** archivos |

Los finales de línea en disco son CRLF, como corresponde a `core.autocrlf=true`.

**Lección:** al mover carpetas con el IDE, desactivar la búsqueda de referencias en comentarios y cadenas; esa opción
reescribió documentación e historial.

### 5.2 Hallazgos (no se corrigen en esta iteración)

1. **Videos:** ningún archivo supera 25 MiB. El más grande, `public/images/galeria/nmg2.mp4`, pesa 22.715.000 bytes
   (86,7 % del límite). Cualquier reemplazo por una versión más pesada podría romper el despliegue: conviene fijar
   una regla de peso máximo al exportar videos.
2. **Referencias faltantes:** 0.
3. **DT-13 no registrada:** la definición de la Épica 07 y `iteracion-03.md` citan DT-13 (ícono de Facebook en modo
   oscuro), pero la tabla del §12 de `_planificacion/README.md` llega hasta DT-12. La autorización de esta iteración
   solo cubría marcar DT-09.
4. **`_planificacion/README.md`, línea 7** (fuera de la tabla autorizada): "El comando de compilación de Cloudflare
   Pages la excluye." Con la lista blanca, la carpeta queda fuera por construcción. Texto propuesto: "Esta carpeta no
   se publica en producción: Cloudflare Pages solo publica `_site/`, que `pnpm run build:cf` genera por lista blanca."
5. **`stage-site.mjs` copia cualquier `.html` de la raíz:** un HTML temporal olvidado en la raíz se publicaría.
   Severidad baja.
6. **`.idea/workspace.xml`** conserva 3 rutas recientes a `_antigravity`. Es local e ignorado por Git.
7. **`README.md`, línea 9:** la URL del repositorio sigue como marcador (`<usuario>/<repositorio>`, "completar").

### 5.3 Desviaciones respecto de la especificación

- La especificación se ejecutó en tres intentos por el incidente de §5.1. No se ejecutó ninguna tarea antes de
  reparar y verificar el árbol.
- `proposito-y-alcance.md`: además de los cambios pedidos, se reemplazó "Planes de membresía (b2b y b2c)" por lo que
  el sitio declara (3 planes para hogar u oficina), para no dejar una afirmación que el sitio no respalda.
- `stack-tecnologico.md`: la fila "Estructura HTML" pasó de "(`index.html`, `servicios.html`)" a "Seis páginas físicas",
  por coherencia con DT-09.

### 5.4 Acciones pendientes del desarrollador (copiadas tal cual de la especificación, §3)

Van en este orden. El agente **no** las ejecuta; las copia en su bitácora.

1. **Antes de tocar nada**, comprueba si hoy hay archivos internos públicos: abre
   `https://www.lajardinerafloreria.cl/README.md`, `/AGENTS.md` y `/package.json`. Si muestran texto, hoy se están
   publicando.
2. Revisa el diff, haz *commit* y *push* incluyendo `scripts/stage-site.mjs`, `package.json` y `.gitignore`. El comando
   antiguo de Cloudflare sigue funcionando mientras tanto, así que el sitio no se ve afectado.
3. **Solo cuando `build:cf` ya exista en la rama de producción**, en Cloudflare: *Workers & Pages* → el proyecto →
   *Settings* → *Builds* → *Build configuration*:
    * *Build command*: `pnpm run build:cf`
    * *Build output directory*: `_site`
    * Este cambio aplica también a las vistas previas de todas las ramas.
4. *Deployments* → *Retry deployment* (o un nuevo *push*). El registro de compilación debe incluir
   `[stage-site] 6 páginas y 3 directorios preparados en ./_site`.
5. Verifica en producción:
    * Responden 200: `/`, `/servicios`, `/suscripcion-floral`, `/galeria`, `/contacto`.
    * Responden 404 (con la página 404 del sitio): `/README.md`, `/AGENTS.md`, `/DESIGN.md`, `/package.json`,
      `/tailwind.config.js`, `/scripts/stage-site.mjs` y `/_planificacion/README.md`.
    * Cargan los estilos y el JavaScript: modo oscuro, menú móvil y modal de Servicios funcionan.
6. Si algo falla: un *build* fallido **no** reemplaza el despliegue vigente. Restaura el comando anterior en *Settings*
   o usa *Deployments* → *Rollback* sobre el despliegue previo.

Estado: 🕒 PENDIENTE (los 6 pasos).

**Nota adicional para el paso 2:** `scripts/stage-site.mjs` aparece como `AM` porque la guarda nueva se agregó después
del `git add`. Hay que volver a prepararlo para que el commit incluya la versión con la guarda.

## 6. Archivos modificados y propuestas para archivos protegidos

**Modificados por el agente:** `package.json`, `.gitignore`, `scripts/stage-site.mjs`,
`_planificacion/01-vision/proposito-y-alcance.md`, `_planificacion/01-vision/objetivos-y-metricas.md`,
`_planificacion/02-arquitectura/stack-tecnologico.md`, `_planificacion/README.md` (solo la fila DT-09),
`_planificacion/04-bitacora/estado-actual.md`, `_planificacion/04-bitacora/decisiones-tecnicas.md` y este archivo.

**Generado e ignorado por Git:** `_site/` (112 archivos). Se puede borrar sin riesgo: `pnpm run build:cf` lo vuelve a
generar.

Las propuestas para `AGENTS.md` y `README.md` (`build:cf` y `_site/` en `AGENTS.md` §4 y §9, y en `README.md` §5, §8 y
§10) se entregan en el reporte final del chat, en el formato de `AGENTS.md` §2. `DESIGN.md` no requiere cambios.

## 7. Mensaje de commit sugerido

Se sugieren dos commits. **Precisión:** la reversión de las 328 líneas del IDE no genera diff, porque esas
reescrituras nunca llegaron a HEAD y los 49 archivos quedaron idénticos a HEAD (hash verificado). Por eso el commit de
la reparación contiene solo lo que blinda el script contra el incidente.

**1. Reparación del incidente** (`git add scripts/stage-site.mjs`):

```text
fix(despliegue): agrega stage-site.mjs con guardas contra borrado de fuentes y CSS desactualizado

- Valida todo antes de borrar _site/ y se niega a borrarla si contiene código fuente.
- Aborta sin borrar nada si scripts.build no compila hacia dist/css/output.css
  o si ese archivo falta o está vacío.
- Nace del traslado accidental del código a _site/ (revertido sin dejar rastro en el
  historial; detalle en la bitácora de la Épica 07, Iteración 01).
```

**2. Integración de `build:cf`** (`package.json`, `.gitignore`, `_planificacion/**`):

```text
feat(despliegue): publica desde _site/ con build:cf y actualiza la documentación

- Agrega el script build:cf (pnpm build + stage-site.mjs) y excluye _site/ en .gitignore.
- Actualiza propósito, métricas y stack al sitio real (DT-09 resuelta).
- Incorpora las especificaciones de la Épica 07 y la bitácora de la Iteración 01.
```
