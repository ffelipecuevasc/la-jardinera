# Épica 08: Migración Estructural a Astro (Paridad Visual y de Contenido)

> **Estado:** ⏳ planificada, pendiente de aprobación del desarrollador.
> **Reemplaza a:** la Épica 08 anterior, "Componentes React con Renderizado Estático" (carpeta
> `epica-08-componentes-react/`), que nunca pasó de planificación conceptual y no tiene bitácoras. Ver §3.
> **Prerrequisitos:** Épica 07 · Iteraciones 02 y 03 cerradas (titular Starlight certificado y deuda de marcado
> saldada). La Iteración 04 de la Épica 07 (SEO técnico) se **traslada** a esta épica como Iteración 05.
> **Rama de trabajo sugerida:** `feat/migracion-astro` (la crea el desarrollador). `main` no se toca hasta la
> Iteración 08.

---

## 1. Objetivo de la Épica

Cambiar **solo la estructura** del proyecto —de seis archivos HTML escritos a mano a un proyecto Astro con un layout y
componentes compartidos— **sin cambiar lo que ve ni lo que recibe el visitante**: mismo contenido, mismas imágenes,
mismos estilos, mismo diseño, mismos módulos de JavaScript y la misma configuración de Cloudflare Pages.

Al cerrar la épica:

1. El header, el panel móvil y el footer existen **una sola vez** en el código fuente.
2. El `<head>` (metadatos, fuentes, favicon, SEO) vive en un único layout que recibe los datos de cada página.
3. Cloudflare Pages publica el resultado de `astro build` en `_site/`, con el mismo comando y el mismo directorio de
   salida que hoy.
4. El HTML publicado sigue siendo HTML estático completo, legible sin JavaScript, y no envía JavaScript adicional al
   navegador (Astro no agrega *runtime* propio en un sitio estático).

**Fuera de alcance:** cambios de contenido comercial, rediseño, migración a Tailwind 4, React u otro framework de
interfaz, renderizado en servidor (SSR) y reescritura de los módulos Vanilla.

---

## 2. Auditoría de partida (13-10-2026, `main` @ `76d5040`)

### 2.1 Lo que facilita la migración

| Hallazgo                                                                                         | Consecuencia para Astro                                                                                  |
|:-------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------|
| Los 6 HTML no contienen llaves `{` ni `}` en el marcado.                                          | El marcado se puede pegar tal cual en archivos `.astro`; no hay que escapar expresiones.                 |
| Astro usa sintaxis HTML (`class`, `for`, atributos SVG con guion).                                | A diferencia de JSX (plan React), **no hay traducción** de atributos: la copia es literal.               |
| Los 6 headers son idénticos salvo el enlace activo (`aria-current="page"` + clase `text-primary`) y un comentario distinto en la 404. | `SiteHeader` con una sola propiedad (`paginaActiva`) reproduce los 6 casos.                            |
| Los footers tienen exactamente 2 variantes de contenedor (DT-06) y el enlace activo.              | `SiteFooter` unifica la variante y cierra DT-06.                                                         |
| `data-path` en los enlaces no lo lee ningún módulo JS.                                            | El estado activo se resuelve en compilación; no hay dependencia en el navegador.                        |
| El despliegue ya publica una carpeta generada (`_site/`) con `pnpm run build:cf` (Épica 07 · It. 01). | Astro escribe en `_site/` y Cloudflare **no cambia de configuración**.                                |
| Node `>= 22.22` y pnpm `11.24.0` fijados (corregido el 18-10-2026).                               | Astro 7.4.0 exige Node `>= 22.22.0`: el mínimo sube (corregido el 18-10-2026).                           |

### 2.2 Lo que hay que resolver

| ID     | Hallazgo                                                                                                                                                              | Dónde se resuelve |
|:-------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------------|
| DT-10  | `src/js/main.js` importa con ruta variable (`import(path)`); Vite no puede empaquetarlo.                                                                                | It. 02            |
| A-01   | Rutas `./public/images/...` en HTML **y** en datos JS (`services.js`, `carousel.js`, `data-src` de la galería). Astro sirve `public/` desde la raíz (`/images/...`). | It. 02            |
| A-02   | `404.html` usa rutas relativas (`./dist/css/output.css`). Cloudflare la sirve en cualquier profundidad (`/a/b/x`), donde esas rutas se rompen y la 404 se vería sin estilos. Hallazgo por análisis de código: confirmarlo en producción en la It. 01. | It. 02 (rutas absolutas y recursos con hash) |
| A-03   | Astro **incrusta en línea** los scripts y hojas de estilo pequeños por defecto, lo que violaría la regla "cero JS y CSS en línea".                                       | It. 02 (`inlineStylesheets: 'never'` y `assetsInlineLimit: 0`, verificado en prueba) |
| A-04   | `@astrojs/tailwind` (integración oficial para Tailwind 3) declara compatibilidad solo hasta Astro 5; no sirve con Astro 7.                                             | It. 02 (Tailwind 3 vía PostCSS, verificado en prueba) |
| A-05   | El tema oscuro se aplica en `DOMContentLoaded` (`theme.js`): quien prefiere modo oscuro ve un destello claro al cargar.                                                  | It. 07 ✅ resuelta (excepción aprobada, ADR-003) |
| A-06   | `dist/css/output.css` está versionado en Git; con Astro el CSS se genera en `_site/_astro/` y `dist/` sobra.                                                            | It. 02            |
| A-07   | `<meta charset>` no es la primera etiqueta del `<head>` en varias páginas (debe ir dentro de los primeros 1024 bytes).                                                   | It. 02 (el layout lo pone primero) |
| DT-04, DT-08 | Falta `meta description` en el Inicio; sin `canonical`, Open Graph, `robots.txt` ni `sitemap.xml`.                                                               | It. 05            |
| DT-06  | Dos variantes de footer.                                                                                                                                                | It. 03            |

Registro de deuda (`_planificacion/README.md` §12): A-02 = DT-14, A-05 = DT-15, A-06 = DT-16, A-07 = DT-17. A-01, A-03
y A-04 son decisiones de diseño de la migración, no deuda del sitio actual.

### 2.3 Prueba de concepto ejecutada durante la planificación

Se compiló el Inicio con **Astro 7.3.8 + Tailwind 3.4.19 vía PostCSS**, usando `tailwind.config.js` e `input.css` del
repositorio sin cambios de tokens, header y footer extraídos a componentes y `main.js` con importaciones estáticas:

* Compilación sin errores; salida `index.html`, `servicios.html` y `404.html` (con `build.format: 'file'`).
* El header generado es equivalente al original: solo difieren espacios en blanco y el cierre de etiquetas vacías
  (`<img ... />` → `<img ...>`), sin efecto en el DOM.
* Clases propias (`fx-starlight`, tokens `bg-surface`, etc.) presentes en el CSS generado.
* Con `inlineStylesheets: 'never'` y `vite.build.assetsInlineLimit: 0`, **0 scripts y 0 estilos en línea** en la salida.
* `astro dev` y `astro preview` responden igual a `/servicios` y `/servicios.html`; una ruta inexistente anidada
  devuelve la 404.

Es evidencia de factibilidad, no de paridad: la paridad completa se certifica en las iteraciones.

---

## 3. Qué se aprovecha de las Épicas 07 y 08 anteriores

| Origen                                   | Se aprovecha                                                                                         | Se descarta |
|:-----------------------------------------|:-----------------------------------------------------------------------------------------------------|:------------|
| Épica 07 · It. 01 (lista blanca `_site/`) | **Todo.** La configuración de Cloudflare (`pnpm run build:cf` → `_site`) queda idéntica; solo cambia lo que hace `build:cf`. | `scripts/stage-site.mjs` se retira en la It. 02: Astro ya publica solo lo que se compila y `public/`. |
| Épica 07 · It. 02 (Starlight)             | El efecto vive en `input.css`, que pasa sin cambios.                                                 | —           |
| Épica 07 · It. 03 (saneamiento)           | Se ejecuta **antes** de migrar: copiar defectos a componentes los multiplicaría o los ocultaría.      | —           |
| Épica 07 · It. 04 (SEO)                   | Textos de descripciones, decisión de URLs canónicas sin `.html` y lista de comprobaciones de Search Console. | Editar 6 `<head>` a mano: se hace una vez en el layout (It. 05 de esta épica). |
| Épica 08 React · diagnóstico              | Problema de header y footer duplicados, principio "plantillas en compilación, no SPA", DoD.          | —           |
| Épica 08 React · notas de Vite            | Riesgos de `public/`, importaciones dinámicas (DT-10), `base` relativa, archivos especiales de Cloudflare, variables `NODE_VERSION`/`PNPM_VERSION`, rama con vistas previas, scripts sin sintaxis de shell (Windows). | Plugin de *prerender* propio, `renderToStaticMarkup`, traducción a JSX, isla `hydrateRoot`. |
| Épica 08 React · tabla de alternativas    | Ya listaba Astro (opción B) con "HTML completo sin JS" y "0 KB de JS por defecto".                   | El argumento en contra ("alto cambio sobre los 6 HTML") pierde peso porque la copia a `.astro` es literal. |

**Recomendación sobre las carpetas:** conservar la Épica 07 con su título ajustado y **eliminar** la carpeta
`epica-08-componentes-react/` (no tiene ejecución ni bitácoras; su razonamiento queda resumido en esta tabla y en el
ADR-001 de la It. 01). Comandos que debe ejecutar el desarrollador:

```bash
git rm -r _planificacion/03-planificacion/epicas/epica-08-componentes-react
git mv _planificacion/03-planificacion/epicas/epica-07-saneamiento-previo-react _planificacion/03-planificacion/epicas/epica-07-saneamiento-previo
```

---

## 4. Decisiones de arquitectura propuestas (se formalizan como ADR-001 en la It. 01)

| #  | Decisión                                                                                                         | Motivo                                                                                                     |
|:---|:-----------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------|
| D1 | **Astro 7.x** (`7.3.8` al planificar), salida estática, **sin adaptador** (`@astrojs/cloudflare` solo hace falta para SSR). | Sitio 100 % estático; menos dependencias.                                                                |
| D2 | **Tailwind CSS 3.4.19 vía PostCSS** (`postcss.config.cjs` con `tailwindcss` y `autoprefixer`). `tailwind.config.js` se conserva; solo cambia `content`. | Paridad visual exacta. La integración `@astrojs/tailwind` no admite Astro 7, y Tailwind 4 cambia la configuración y valores por defecto (riesgo visual): queda para una épica futura. |
| D3 | `build.format: 'file'` y `trailingSlash: 'never'`.                                                                | Genera `servicios.html`, etc., con los mismos nombres de hoy; Cloudflare mantiene su redirección 308 a `/servicios`. |
| D4 | `outDir: './_site'`; `build:cf` pasa a ser `astro build`.                                                         | Cero cambios en Cloudflare Pages.                                                                          |
| D5 | `build.inlineStylesheets: 'never'` y `vite.build.assetsInlineLimit: 0`.                                           | Mantiene la regla "cero JS y CSS en línea" en la salida (A-03).                                            |
| D6 | **Recursos estáticos con la convención de Astro:** `public/` se queda donde está y se sirve desde la raíz (`/images/...`, `/logos/...`, `/icons/...`). Se agrega `public/_redirects` con `/public/*  /:splat  301` para no romper URLs antiguas. | No se mueven 62 MB en Git y las URLs ya indexadas siguen funcionando. Alternativa B (validada en la prueba): `publicDir: './static'` con `static/public/` para conservar el prefijo `/public/`. |
| D7 | **Rutas absolutas desde la raíz** (`/`, `/servicios`, `/images/...`) en lugar de `./`.                            | Corrige la 404 anidada (A-02) y evita la redirección 308 en cada clic interno.                             |
| D8 | Los módulos Vanilla de `src/js/` **no se reescriben**: `main.js` pasa a importaciones estáticas y se carga con un `<script>` procesado por Astro en el layout (sale como archivo externo con *hash*). | Paridad funcional; empaquetado y caché inmutable gratis.                                                   |
| D9 | Páginas en `src/pages/*.astro`; solo layout, header, footer y `<head>` se componentizan de forma obligatoria. Las secciones de cada página se copian literales. | "Migrar solo la estructura". Componentizar secciones repetidas es opcional (It. 06).                        |

### Estructura objetivo

```text
public/                       # Sin cambios de contenido (images/, logos/, icons/) + _redirects, robots.txt
src/
├── pages/                    # index.astro, servicios.astro, suscripcion-floral.astro,
│                             # galeria.astro, contacto.astro, 404.astro
├── layouts/
│   └── BaseLayout.astro      # <html>, <head> completo, header, scrim, slot, footer, script
├── components/
│   ├── SiteHeader.astro      # Marca + navegación + acciones + panel móvil
│   ├── SiteFooter.astro
│   └── SeoHead.astro         # description, canonical, Open Graph (It. 05)
├── data/
│   └── navegacion.js         # Fuente única: rutas, etiquetas y claves de página
├── css/input.css             # Sin cambios de contenido
└── js/                       # main.js (importaciones estáticas) + modules/ + data/ actuales
astro.config.mjs
postcss.config.cjs
tailwind.config.js            # Solo cambia "content"
```

---

## 5. Configuración de Cloudflare Pages

| Parámetro              | Valor                                     | ¿Cambia? |
|:-----------------------|:------------------------------------------|:---------|
| Preset de framework    | Ninguno                                   | No       |
| Comando de compilación | `pnpm run build:cf`                        | No (cambia su contenido en `package.json`) |
| Directorio de salida   | `_site`                                   | No       |
| Variables de entorno   | `NODE_VERSION=22.22.2` (corregido el 18-10-2026), `PNPM_VERSION=11.24.0` | Verificar en el log que Node sea `>= 22.22` (corregido el 18-10-2026) |

La rama `feat/migracion-astro` genera vistas previas en `*.pages.dev`. Revertir producción es un clic en el panel de
Cloudflare (despliegue anterior).

---

## 6. Plan de Iteraciones

| It. | Entregable                                                    | Resultado verificable                                                                                                   | Obligatoria |
|:----|:--------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------|:-----------:|
| 01  | ADR-001, documentos protegidos y línea base                   | ADR en `decisiones-tecnicas.md`; propuestas de edición aprobadas; instantánea de referencia de las 6 páginas (HTML, capturas, Lighthouse). | Sí |
| 02  | Andamiaje Astro y migración literal de las 6 páginas          | `astro build` genera las 6 páginas en `_site/` con DOM equivalente a la referencia (salvo rutas); 0 JS/CSS en línea; vista previa en Cloudflare. | Sí |
| 03  | Footer como componente y fuente única de navegación           | `SiteFooter` en las 6 páginas; DT-06 cerrada; `src/data/navegacion.js`.                                                   | Sí |
| 04  | Header y panel móvil como componente                          | `SiteHeader` en las 6 páginas; invariantes del header intactos; `navigation.js` sin cambios.                              | Sí |
| 05  | SEO técnico en el layout (trasladada de Épica 07 · It. 04)    | `description`, `canonical`, Open Graph, `robots.txt` y `sitemap.xml`; DT-04 y DT-08 cerradas.                             | Sí |
| 06  | Componentes de sección repetidos                              | Bloques idénticos en 2 o más páginas (p. ej. banner con textura) extraídos sin cambio visual.                             | Opcional |
| 07  | Tema oscuro sin destello inicial                              | Excepción aprobada para un único script en línea en `<head>`; sin destello en modo oscuro.                                 | Opcional |
| 08  | Certificación transversal y paso a producción                 | Render real 7 viewports × 2 temas, Lighthouse según el criterio del §8 (medianas de 3 corridas en la misma sesión), documentación actualizada, fusión a `main`. | Sí |

---

## 7. Riesgos y mitigaciones

| Riesgo                                                          | Mitigación                                                                                       |
|:----------------------------------------------------------------|:-------------------------------------------------------------------------------------------------|
| Diferencias invisibles en el marcado al copiar a `.astro`       | Comparación automatizada del DOM contra la instantánea de la It. 01 (texto, clases, atributos).   |
| Rutas de imágenes rotas (HTML y datos JS)                       | Inventario por búsqueda de `./public/` antes y después: debe quedar en 0. Rastreo de enlaces en `_site/`. |
| Clases de Tailwind no detectadas en `.astro`                    | `content` incluye `./src/**/*.{astro,html,js}`; comparar selectores del CSS nuevo contra `dist/css/output.css`. |
| Astro incrusta scripts/estilos pequeños                         | D5 + búsqueda en `_site/` de `<script>` sin `src` (solo el del tema) y de `<style>`.                                 |
| Orden de carga del CSS distinto (cascada)                       | Un solo CSS global importado en el layout; comparar capturas.                                    |
| Videos de la galería cerca del límite de 25 MiB                 | Sin cambios de archivos; la verificación de tamaños de la Épica 07 se repite sobre `_site/`.      |
| Versiones de Node/pnpm distintas en Cloudflare                  | Variables de entorno y revisión del log de la primera vista previa.                              |
| Producción afectada a mitad de la migración                     | Todo en `feat/migracion-astro`; `main` intacto hasta la It. 08.                                   |
| Desarrollo en Windows                                           | Scripts en Node; nada de `cp`, `rm` ni sintaxis de shell en `package.json`.                      |

---

## 8. Definition of Done de la Épica

* [ ] Header, panel móvil, footer y `<head>` existen **una sola vez** en el código fuente.
* [ ] `_site/` contiene las 6 páginas con los mismos nombres de archivo que hoy, y header y footer completos sin
  JavaScript.
* [ ] Paridad visual y funcional con la línea base en 320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768 y
  1280×800, en modo claro y oscuro.
* [ ] 0 `style=`, 0 `onclick` y 0 `<style>` en `_site/**/*.html`, y exactamente 1 `<script>` ejecutable sin `src` por página: el de arranque del tema (excepción aprobada de la It. 07, ADR-003), idéntico en las 6 páginas.
* [ ] 0 referencias a `./public/` en el código fuente; las URLs antiguas `/public/...` redirigen con 301.
* [ ] Lighthouse de las 6 páginas, en móvil y escritorio: el sitio actual (producción) y el nuevo (vista previa de la
  rama) se miden en la misma sesión, 3 corridas por página y modo, y se comparan las medianas. Aceptación: Performance
  no más de 10 puntos por debajo (móvil) ni de 3 (escritorio) de la mediana de referencia; Accesibilidad, Best
  Practices y SEO no menores que la referencia; CLS mediano ≤ 0,1 y no mayor que el de referencia más 0,01. El LCP se
  registra sin umbral. La 404 se mide en una ruta anidada (/a/b/inexistente). La línea base del 16-10-2026 (bitácora de
  la It. 01, §9) es histórica y no es la referencia de comparación.
* [ ] Cloudflare Pages publica desde `_site/` sin cambios de configuración y sin exponer `_planificacion/`,
  `AGENTS.md`, `README.md`, `DESIGN.md` ni `package.json`.
* [ ] `AGENTS.md`, `README.md`, `stack-tecnologico.md` y `proposito-y-alcance.md` actualizados por el desarrollador.
