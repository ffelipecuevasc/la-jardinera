# Iteración 01: Despliegue por Lista Blanca y Coherencia Documental Tras el Renombrado

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Esta es la primera iteración de la Épica 07. El desarrollador ya ejecutó a mano la parte estructural: renombró
`_antigravity/` a `_planificacion/`, creó `AGENTS.md`, `README.md`, `DESIGN.md` y `.claude/settings.json`, y copió
`scripts/stage-site.mjs`. **No repitas nada de eso: lo verificas.** Tu trabajo es (a) auditar que el renombrado no dejó
referencias rotas, (b) integrar el script al flujo de compilación, (c) demostrar que la carpeta `_site/` contiene
exactamente lo publicable y (d) dejar la documentación de visión y arquitectura coherente con la realidad del sitio.

**No tocas Cloudflare.** El cambio del comando de compilación lo hace el desarrollador con la lista del §3; tú la
entregas en tu bitácora.

**Autorizaciones explícitas para esta iteración** (las concede el desarrollador en el chat; sin ese mensaje no aplican):
`package.json` (solo agregar el script indicado), `.gitignore`, `_planificacion/01-vision/**`,
`_planificacion/02-arquitectura/stack-tecnologico.md` y la tabla del §12 de `_planificacion/README.md`.
`AGENTS.md`, `README.md` y `DESIGN.md` siguen siendo solo lectura: para ellos entregas propuestas.

## 1. Objetivo de la Iteración

Que el sitio se despliegue desde `_site/` mediante `pnpm run build:cf`, con una lista blanca que excluya por
construcción la planificación, los documentos internos y la configuración, y que los documentos de visión y arquitectura
describan el proyecto tal como es hoy (seis páginas, Cloudflare Pages, pnpm 11.24.0).

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 1: Línea base y auditoría del renombrado (solo lectura)

1. Antes de cualquier edición, ejecuta `pnpm build` y registra el SHA-256 de `dist/css/output.css` (calculado de
   verdad, no estimado). Será la referencia de la compilación determinista.
2. Confirma la estructura: `_antigravity/` **no existe**; `_planificacion/` contiene `README.md`, `01-vision/`,
   `02-arquitectura/`, `03-planificacion/` y `04-bitacora/`.
3. Busca `_antigravity` y `.antigravity` (sin distinguir mayúsculas) en todo el repositorio, excluyendo `node_modules/`,
   `.git/`, `dist/` y `_site/`. Clasifica cada coincidencia:
    * **Histórica:** bitácoras de las Épicas 01 a 06, y `iteracion-NN.md` y `definicion-epica.md` de esas épicas. No se
      tocan; solo reportas el conteo.
    * **Activa:** cualquier otro archivo. Si no está protegido, corrígelo; si lo está, propón el cambio.
4. Confirma que **no** existen `CLAUDE.md`, `CLAUDE.local.md` ni `.claude/CLAUDE.md`, y que `.claude/settings.json` es
   JSON válido (parséalo con Node).
5. Confirma que `_planificacion/02-arquitectura/DESIGN.md` es el archivo de redirección y no una copia del sistema de
   diseño.
6. Lee `scripts/stage-site.mjs` y comprueba que hace lo que promete: lista blanca (HTML de la raíz, `dist`, `public`,
   `src/js`), opcionales (`_headers`, `_redirects`, `robots.txt`, `sitemap.xml`) y error explícito si falta un
   directorio requerido. Si encuentras un defecto real, corrígelo y repórtalo.

### Tarea 2: Integración al flujo de compilación

1. `package.json`: agrega **exactamente** esta línea justo después de `"build"`, con la misma indentación del archivo:
   ```json
   "build:cf": "pnpm build && node scripts/stage-site.mjs"
   ```
   Ningún otro cambio: no reordenes claves, no reformatees, no toques `devDependencies`, `packageManager` ni
   `devEngines`. Conserva los finales de línea originales del archivo.
2. `.gitignore`: agrega al final, sin borrar ni reordenar nada:
   ```gitignore

   # Carpeta publicable generada por scripts/stage-site.mjs (Cloudflare Pages)
   _site/
   ```
3. Confirma que `tailwind.config.js` no escanea `_site/` (su `content` es `./src/**/*.{html,js}` y `./*.html`). Si lo
   hiciera, repórtalo sin modificar el archivo.

### Tarea 3: Verificación de `_site/`

1. Ejecuta `pnpm run build:cf`. Debe terminar sin errores. El aviso `Browserslist: caniuse-lite is outdated` es
   conocido y no se corrige.
2. **Inventario.** `_site/` debe contener exactamente: los 6 HTML, `dist/css/output.css`, `public/**` y `src/js/**`.
   Entrega el árbol a dos niveles, el conteo total de archivos y el tamaño total.
3. **Exclusiones.** Presenta una tabla con ✅ o ❌ que compruebe que **no** existen en `_site/`: `_planificacion`,
   `AGENTS.md`, `README.md`, `DESIGN.md`, `.claude`, `scripts`, `src/css`, `package.json`, `pnpm-lock.yaml`,
   `tailwind.config.js`, `node_modules`, `.git` y `.gitignore`.
4. **Integridad de referencias.** Con un script temporal (`node -e` o un archivo fuera del repositorio; no lo dejes en
   el proyecto), recorre cada HTML de `_site/`, extrae las rutas locales de `src`, `href`, `data-src` y `poster`, y
   verifica que cada una resuelva a un archivo existente dentro de `_site/`. Haz lo mismo con las rutas literales
   `./public/...` de `src/js/data/*.js` y `src/js/modules/*.js`, resolviéndolas contra la raíz. Ignora `http(s):`,
   `mailto:`, `tel:`, `data:` y `#...`; quita la cadena de consulta de enlaces como `./contacto.html?service=...`.
   **Reporta los faltantes; no los corrijas.** Son hallazgos para el desarrollador.
5. **Límites de Cloudflare Pages.** Reporta todo archivo de `_site/` mayor a **25 MiB** (26 214 400 bytes) y el total de
   archivos frente al máximo de **20 000**. Los `.mp4` de `public/images/galeria/` son los candidatos. Es un hallazgo,
   no una corrección.
6. **CSS.** El `_site/dist/css/output.css` debe ser idéntico (SHA-256) al de `dist/css/output.css` y contener las
   clases del header (`lg:w-9`, `xl:px-4`, `min-h-[3rem]`, `max-h-[calc(100dvh-5rem)]`).
7. Con `git status` (solo lectura), confirma que `_site/` no aparece como carpeta sin seguimiento.

### Tarea 4: Coherencia documental (DT-09)

Usa únicamente hechos que verifiques leyendo el repositorio. No inventes.

1. `_planificacion/01-vision/proposito-y-alcance.md`:
    * §2: de "5 archivos HTML" a **6**, incorporando `404.html` (página de error con `noindex`).
    * Servicios: catálogo de 8 servicios con modal dinámico; el llamado a la acción lleva a
      `contacto.html?service=...`.
    * Galería: acordeón horizontal por capítulos y visor Lightbox multimodal (imágenes y video); **no** hay filtros.
    * Contacto: tarjetas de WhatsApp y correo, y formulario cuyo envío abre WhatsApp con el mensaje armado
      (`contact-form.js`). **No** hay mapa ni Netlify Forms; confírmalo en `contacto.html` y en el módulo.
    * Hosting: GitHub y Cloudflare Pages.
    * **No cambies la prohibición de React ni de frameworks.** Agrega debajo una sola nota: "La Épica 08 (planificada,
      pendiente de aprobación) propone componentes React con renderizado estático; su aprobación exige actualizar este
      documento."
2. `_planificacion/02-arquitectura/stack-tecnologico.md`:
    * Tabla del núcleo: pnpm `11.24.0` (Node `>= 22.13`); despliegue "GitHub + Cloudflare Pages: despliegue continuo
      desde `main`, vistas previas por rama, comando `pnpm run build:cf`, salida `_site/` (lista blanca)".
    * Indica que `DESIGN.md` vive en la raíz del repositorio.
    * En las reglas de CSS agrega: "Las clases de Tailwind se escriben siempre en forma literal; Tailwind no detecta
      clases armadas con plantillas".
3. `_planificacion/01-vision/objetivos-y-metricas.md`: reemplaza las menciones nominales a "Antigravity" por "el agente
   de IA" o "los agentes de IA". No cambies ninguna métrica.
4. `_planificacion/README.md`, **solo la tabla del §12**: marca DT-09 como ✅ resuelta (Épica 07 · Iteración 01).
5. **Propuestas para archivos protegidos** (entrégalas en el formato de `AGENTS.md` §2, sin aplicarlas):
    * `AGENTS.md` §4: agregar `pnpm run build:cf` a la tabla de comandos.
    * `README.md` §8: agregar `pnpm run build:cf` a la tabla de scripts.
    * `README.md` §10: concretar el comando de compilación (`pnpm run build:cf`) y el directorio de salida (`_site`).
    * `README.md` §5: agregar `_site/` al árbol como carpeta generada e ignorada por Git.
    * Cualquier otra referencia errónea o no verificable que detectes en esos tres archivos.

### Tarea 5: Registro

1. Crea `_planificacion/04-bitacora/bitacora-epica-07/bitacora-iteracion-01.md` con la plantilla de
   `_planificacion/README.md` §8.2.
2. Agrega una línea al final de `_planificacion/04-bitacora/estado-actual.md` con el formato del §8.1.
3. Agrega a `_planificacion/04-bitacora/decisiones-tecnicas.md` la decisión "Despliegue por lista blanca (`_site/`)",
   con sus motivos: una lista blanca no puede filtrar por olvido lo que una lista negra sí; el script falla si falta un
   directorio requerido, y un build fallido no reemplaza producción; mantiene estable la configuración de Cloudflare
   entre ramas (Épica 08); límites de 25 MiB por archivo y 20 000 archivos.
4. Copia en la bitácora, tal cual, la sección "Acciones pendientes del desarrollador" del §3 de esta especificación.

## 3. Acciones del Desarrollador (fuera del alcance del agente)

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

## 4. Auditoría de No-Regresión e Invariantes

* **Lista cerrada de archivos que puedes modificar:** `package.json` (una línea), `.gitignore`,
  `_planificacion/01-vision/proposito-y-alcance.md`, `_planificacion/01-vision/objetivos-y-metricas.md`,
  `_planificacion/02-arquitectura/stack-tecnologico.md`, la tabla §12 de `_planificacion/README.md`, y los archivos de
  bitácora de la Tarea 5. Si crees que debes tocar otro, detente y pregunta.
* **Cero cambios** en HTML, `src/css/input.css`, `src/js/**` y `tailwind.config.js`.
* **Compilación determinista:** el SHA-256 de `dist/css/output.css` al cerrar la iteración es idéntico al de la línea
  base de la Tarea 1.
* Cero comandos Git que escriban en el repositorio.

## 5. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Lista Blanca Comprobada**
    * **Dado** el proyecto con `build:cf` integrado
    * **Cuando** se ejecuta `pnpm run build:cf`
    * **Entonces** `_site/` contiene solo los 6 HTML, `dist/`, `public/` y `src/js/`; la tabla de exclusiones muestra ✅ en
      las 13 filas; y ningún archivo supera 25 MiB (o el hallazgo queda reportado con nombre y tamaño).
* **Escenario 2: Integridad de Referencias**
    * **Dado** el contenido de `_site/`
    * **Cuando** se resuelven todas las rutas locales de los HTML y de los datos de `src/js/`
    * **Entonces** el informe indica 0 faltantes, o los lista uno por uno como hallazgos, sin haberlos corregido.
* **Escenario 3: Integración Mínima**
    * **Dado** `package.json` y `.gitignore`
    * **Cuando** se revisa `git diff` (solo lectura)
    * **Entonces** `package.json` cambia en una sola línea (`build:cf`) y `.gitignore` solo agrega `_site/`.
* **Escenario 4: Coherencia Documental**
    * **Dado** los documentos de visión y arquitectura
    * **Cuando** se comparan con el repositorio
    * **Entonces** ninguna afirmación contradice la realidad (6 páginas, Cloudflare Pages, pnpm 11.24.0, formulario por
      WhatsApp, galería sin filtros), y las propuestas para archivos protegidos están entregadas en el formato exigido.
* **Escenario 5: Honestidad del Reporte**
    * **Dado** la bitácora
    * **Cuando** se lee
    * **Entonces** nada sobre Cloudflare figura como ✅ (queda como `🕒 PENDIENTE` hasta que lo confirme el
      desarrollador), y todos los hashes y conteos provienen de comandos ejecutados.