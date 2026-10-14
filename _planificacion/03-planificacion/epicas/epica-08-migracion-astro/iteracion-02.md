# Iteración 02: Andamiaje Astro y Migración Literal de las 6 Páginas

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Esta es la iteración de mayor riesgo y por eso **no componentiza nada todavía**. Cada página pasa a `src/pages/*.astro`
con su header, su capa tenue, su `<main>`, sus modales y su footer **copiados tal cual**. Solo el `<head>` común y la
carga de `main.js` se mueven a un layout, y solo cambian las rutas (de `./` a `/`). Si el resultado no es equivalente a
la instantánea de la Iteración 01, no se avanza.

Fuente de la verdad: `definicion-epica.md` §4 (D1 a D9), ADR-001 aprobado y `referencia/inventario.json`.

**Prerrequisitos:** ADR-001 aprobado; `AGENTS.md` §4 y §5 actualizados por el desarrollador; rama
`feat/migracion-astro`.

**Autorización explícita de esta iteración:** `package.json` y `pnpm-lock.yaml` (dependencias y scripts descritos abajo),
`tailwind.config.js` (solo `content`), creación de `astro.config.mjs`, `postcss.config.cjs`,
`src/layouts/BaseLayout.astro`, `src/pages/*.astro`, `public/_redirects` y `scripts/comparar-con-referencia.mjs`;
edición de `src/js/main.js`, `src/js/data/services.js`, `src/js/modules/carousel.js` y `src/js/modules/modal.js` (solo
rutas e importaciones); `.gitignore`.

## 1. Objetivo de la Iteración

Que `pnpm run build:cf` ejecute `astro build` y deje en `_site/` las mismas 6 páginas, con el mismo contenido, las mismas
clases y el mismo comportamiento que hoy, con recursos referenciados desde la raíz y sin JavaScript ni CSS en línea.

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Movimientos que ejecuta el desarrollador (conservan el historial de Git)

Antes de que el agente empiece, el desarrollador ejecuta:

```bash
mkdir -p src/pages src/layouts
git mv index.html              src/pages/index.astro
git mv servicios.html          src/pages/servicios.astro
git mv suscripcion-floral.html src/pages/suscripcion-floral.astro
git mv galeria.html            src/pages/galeria.astro
git mv contacto.html           src/pages/contacto.astro
git mv 404.html                src/pages/404.astro
git rm -r dist
git rm scripts/stage-site.mjs
```

El agente confirma con `git status` que los seis archivos aparecen como renombrados.

### Tarea 1: Dependencias y scripts

```bash
pnpm add -D astro@^7.3.8 postcss autoprefixer
```

`tailwindcss` se mantiene en `^3.4.19`. **No** instales `@astrojs/tailwind` (solo admite hasta Astro 5) ni
`@tailwindcss/vite` (Tailwind 4).

Scripts finales de `package.json`:

```json
"dev": "astro dev",
"build": "astro build",
"preview": "astro preview",
"build:cf": "astro build"
```

`.gitignore`: agrega `.astro/` (tipos que genera Astro). `_site/` sigue ignorada.

### Tarea 2: Configuración

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://www.lajardinerafloreria.cl',
    outDir: './_site',
    trailingSlash: 'never',
    build: {
        format: 'file',            // servicios.html, como hoy
        inlineStylesheets: 'never' // cero CSS en línea
    },
    vite: {
        build: { assetsInlineLimit: 0 } // cero JS en línea
    }
});
```

`postcss.config.cjs`:

```js
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

`tailwind.config.js`, solo `content`:

```js
content: ['./src/**/*.{astro,html,js}'],
```

### Tarea 3: `main.js` con importaciones estáticas (DT-10)

Reemplaza el arreglo de rutas variables por importaciones estáticas, conservando el aislamiento de errores por módulo:

```js
import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
// ... los 7 módulos actuales

const inits = [initTheme, initNavigation, /* ... */];

document.addEventListener('DOMContentLoaded', () => {
    inits.forEach((init) => {
        try { init(); } catch (err) { console.error(`[main.js] Falló "${init.name}":`, err); }
    });
});
```

Cada `initX()` ya tiene su cláusula de guarda, así que cargarlos todos en todas las páginas no cambia el comportamiento.

### Tarea 4: `BaseLayout.astro`

1. Recibe `title` y `description` (opcional) como propiedades.
2. Contiene `<!DOCTYPE html>`, `<html class="light bg-background text-on-surface" lang="es">`, el `<head>` común
   (con `<meta charset="utf-8"/>` como **primera** etiqueta, A-07), la precarga de Google Fonts tal como está hoy y el
   favicon con ruta `/logos/la-jardinera-original.png`.
3. Importa el CSS en el *frontmatter*: `import '../css/input.css';` (reemplaza el `<link>` a `dist/css/output.css`).
4. `<body>` con las mismas clases de hoy, `<slot />` y, al final, `<script src="../js/main.js"></script>`.
5. Si alguna página tiene en `<html>`, `<head>` o `<body>` algo distinto del resto, **detente y repórtalo** antes de
   unificarlo.

### Tarea 5: Páginas

En cada `src/pages/*.astro`:

1. *Frontmatter* que importa `BaseLayout` y lo abre con el `title` y la `description` que la página tiene hoy.
2. Dentro del layout, todo lo que hoy está entre `<body>` y el `<script>` final, **sin cambios** salvo rutas.
3. Reescritura de rutas (en HTML y en los archivos JS autorizados):

| Hoy                                  | Pasa a                         |
|:-------------------------------------|:-------------------------------|
| `./public/images/…`, `./public/logos/…`, `./public/icons/…` | `/images/…`, `/logos/…`, `/icons/…` |
| `./index.html`                       | `/`                            |
| `./servicios.html` (y demás páginas) | `/servicios` (sin extensión)   |
| `./galeria.html#ancla`               | `/galeria#ancla`               |
| `./contacto.html?service=…` (`modal.js`) | `/contacto?service=…`      |

4. Comprobación: `grep -rn "\./public/\|\.html\"" src/` debe devolver 0 resultados en marcado y datos (los comentarios
   explicativos de `contact-form.js` pueden mencionarlos; actualízalos si corresponde).
5. Al migrar la 404 a rutas absolutas, retira el `<base href="/"/>` agregado en la Épica 07 · Iteración 03 (Tarea 3b) y
   verifica `/a/b/xyz` otra vez.

### Tarea 6: URLs antiguas

`public/_redirects`:

```text
/public/*  /:splat  301
```

### Tarea 7: Comparación contra la referencia

`scripts/comparar-con-referencia.mjs` (Node, reutiliza la lógica de `instantanea-referencia.mjs`): genera el inventario
de `_site/*.html`, aplica la tabla de equivalencias de rutas de la Tarea 5 al inventario de referencia y reporta, por
página, diferencias en IDs, conteo de etiquetas, clases, `href`/`src` y texto visible. Resultado esperado: **0
diferencias** salvo las rutas ya normalizadas, el `<link>` del CSS y el `<script>` (ahora con *hash*).

### Tarea 8: Verificación

1. `pnpm run build:cf` sin errores ni advertencias nuevas.
2. `_site/` contiene `index.html`, `servicios.html`, `suscripcion-floral.html`, `galeria.html`, `contacto.html`,
   `404.html`, `_astro/`, `images/`, `logos/`, `icons/` y `_redirects`; **no** contiene `_planificacion/`, `src/`, ni
   archivos `.md` o de configuración.
3. En `_site/**/*.html`: 0 `style="` nuevos (los heredados de DT-03 deben estar en 0 desde la Épica 07), 0 `onclick`,
   0 `<script>` sin `src`, 0 `<style>`.
4. Ningún archivo de `_site/` supera 25 MiB; total de archivos < 20 000.
5. Selectores: todas las clases presentes en `dist/css/output.css` de `main` que se usan en el marcado aparecen en el CSS
   de `_site/_astro/`.
6. `pnpm preview` y navegador: las 6 páginas, menú móvil, modales de Servicios, *lightbox* de la galería (imágenes y
   videos), carrusel de reseñas, cambio de tema y formulario de contacto (abre WhatsApp con el texto) funcionan; consola
   limpia. La 404 en `/a/b/inexistente` se ve con estilos (DT-14).
7. **Desarrollador:** *push* de la rama; confirmar en el log de Cloudflare la versión de Node y que la vista previa
   `*.pages.dev` funciona. El log del 13-10-2026 mostró Node 22.13.0 en modo mantenimiento y un aviso `EBADENGINE` de
   corepack 0.36 (pide `^22.22.2`); fijar `NODE_VERSION` con una versión 22.x reciente evita ambos.

### Tarea 9: Registro

Bitácora, línea en `estado-actual.md`, DT-10, DT-14, DT-16 y DT-17 marcadas en §12 solo con evidencia, y mensaje de
commit sugerido (una línea, formato de `AGENTS.md` §3.5, máximo 200 caracteres):
`Épica 08 - Iteración 02: Migra las 6 páginas a Astro en paridad literal con el HTML de referencia.`

## 3. Auditoría de No-Regresión e Invariantes

* Header y footer siguen duplicados (se unifican en las It. 03 y 04): la paridad entre páginas se mantiene exacta.
* Invariantes del header de `AGENTS.md` §5.7 intactos en las 6 páginas.
* Ningún cambio en `src/css/input.css`, en los módulos JS fuera de las rutas, ni en `public/` salvo `_redirects`.
* Cero comandos Git de escritura por parte del agente.

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Compilación con Astro**
    * **Dado** la rama `feat/migracion-astro`
    * **Cuando** se ejecuta `pnpm run build:cf`
    * **Entonces** termina sin errores y `_site/` tiene las 6 páginas con sus nombres actuales.
* **Escenario 2: Paridad de contenido**
    * **Dado** `referencia/inventario.json`
    * **Cuando** se ejecuta `scripts/comparar-con-referencia.mjs`
    * **Entonces** no hay diferencias de texto, IDs, clases ni estructura; solo las rutas normalizadas.
* **Escenario 3: Cero JS y CSS en línea**
    * **Dado** `_site/**/*.html`
    * **Cuando** se buscan `<script>` sin `src`, `<style>` y `style="`
    * **Entonces** hay 0 ocurrencias.
* **Escenario 4: Recursos y URLs antiguas**
    * **Dado** la vista previa
    * **Cuando** se carga cualquier imagen, video o ícono, y se visita `/public/images/hero-botanical.webp`
    * **Entonces** los recursos cargan desde la raíz y la URL antigua redirige con 301.
* **Escenario 5: 404 en rutas anidadas**
    * **Dado** `/a/b/inexistente`
    * **Cuando** se abre
    * **Entonces** la 404 se ve con estilos, header y footer.
* **Escenario 6: Funcionalidad**
    * **Dado** las 6 páginas en modo claro y oscuro
    * **Cuando** se usan menú, modales, galería, carrusel, tema y formulario
    * **Entonces** se comportan igual que en la referencia y la consola no muestra errores.
