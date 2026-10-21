# Constitución Operativa — `_planificacion/`

> Carpeta de planificación y gobernanza del sitio de **La Jardinera Florería** (Valdivia, Chile).
> Antes se llamaba `_antigravity/`. Se renombró en la Épica 07 porque el proyecto ahora trabaja con más de un agente
> de IA (Antigravity y Claude Code) bajo las mismas reglas.
>
> **Esta carpeta no se publica en producción.** El comando de compilación de Cloudflare Pages la excluye.

---

## 1. Propósito

`_planificacion/` es la memoria del proyecto: qué se quiere construir (visión), con qué reglas (arquitectura), en qué
orden (épicas e iteraciones) y qué se hizo realmente (bitácoras). Permite que cualquier agente o persona retome el
trabajo sin depender del historial de una conversación.

Principio rector: **ningún cambio de código sin una iteración que lo especifique, y ninguna iteración cerrada sin una
bitácora que lo demuestre.**

---

## 2. Roles y jerarquía de documentos

### 2.1 Roles

| Rol             | Responsabilidades                                                                                  |
|:----------------|:---------------------------------------------------------------------------------------------------|
| Desarrollador   | Aprueba épicas e iteraciones, edita `AGENTS.md`, `README.md` y `DESIGN.md`, hace *commits*, *push*, *merge* y gestiona Cloudflare. |
| Agente de IA    | Redacta especificaciones cuando se le piden, ejecuta iteraciones aprobadas, verifica, escribe bitácoras y propone cambios a los archivos protegidos. |

Agentes habilitados: **Claude Code** (lee `AGENTS.md` de forma nativa) y **Antigravity** (debe configurarse para leer
`AGENTS.md` y este archivo como reglas del espacio de trabajo).

### 2.2 Orden de precedencia

Cuando dos fuentes se contradicen, prevalece la de mayor rango. Si el conflicto afecta el resultado, el agente se
detiene y lo reporta en vez de resolverlo por su cuenta.

1. Instrucción explícita del desarrollador en el chat.
2. `AGENTS.md` (raíz).
3. `DESIGN.md` (raíz) para todo lo visual.
4. `02-arquitectura/stack-tecnologico.md` para todo lo técnico.
5. Especificación de la iteración en curso.
6. Este documento.

---

## 3. Estructura de la carpeta

```text
_planificacion/
├── README.md                          # Esta constitución operativa
├── 01-vision/
│   ├── proposito-y-alcance.md         # Identidad, páginas y límites del producto
│   └── objetivos-y-metricas.md        # Métricas de calidad (Lighthouse, CLS, FCP)
├── 02-arquitectura/
│   ├── stack-tecnologico.md           # Reglas de arquitectura y del stack
│   └── DESIGN.md                      # Redirección: la fuente única vive en /DESIGN.md
├── 03-planificacion/
│   └── epicas/
│       └── epica-NN-slug/
│           ├── definicion-epica.md    # Objetivo, alcance, plan de iteraciones y DoD de la épica
│           └── iteracion-NN.md        # Especificación ejecutable de cada iteración
└── 04-bitacora/
    ├── estado-actual.md               # Una línea por iteración, en orden cronológico
    ├── decisiones-tecnicas.md         # Decisiones de arquitectura y excepciones aprobadas
    └── bitacora-epica-NN/
        └── bitacora-iteracion-NN.md   # Evidencia de ejecución de cada iteración
```

`01-vision/` y `02-arquitectura/` solo se editan con autorización explícita del desarrollador.

---

## 4. Protocolo de inicio (obligatorio para todo agente)

1. **Leer** `README.md`, `DESIGN.md`, este documento y `04-bitacora/estado-actual.md`.
2. **Ubicarse:** identificar la épica y la iteración vigentes y su estado.
3. **Leer la especificación** de la iteración asignada y los archivos que menciona.
4. **Plan de impacto** explícito: archivos a tocar, efecto en el DOM y en la compilación de Tailwind, invariantes en
   riesgo y verificación prevista.
5. **Esperar aprobación** del plan, salvo que el desarrollador haya indicado proceder directamente.

---

## 5. Ciclo de vida de una iteración

| Estado                                  | Quién lo declara | Condición                                                        |
|:----------------------------------------|:-----------------|:-----------------------------------------------------------------|
| ⏳ Planificada                          | Desarrollador    | Existe `iteracion-NN.md` aprobado.                               |
| 🔧 En ejecución                         | Agente           | Plan de impacto aprobado.                                        |
| 🕒 Ejecutada, pendiente de certificación | Agente           | Código listo, pero falta evidencia de render real o de compilación. |
| ✅ Certificada                           | Agente           | Todos los criterios con evidencia verificable.                   |
| 🔒 Cerrada                              | Desarrollador    | Cambios revisados y fusionados en `main`.                        |

Una épica se cierra solo cuando todas sus iteraciones están cerradas y su DoD está verificado.

---

## 6. Reglas de acero (resumen)

El detalle vive en `AGENTS.md` §5; aquí se listan para consulta rápida:

1. MPA estricta: 6 páginas en `src/pages/` que Astro compila a 6 HTML. Sin emulación de SPA ni directivas `client:*`.
2. Cero JS y CSS en línea (`style=`, `onclick`, `<script is:inline>`, `<style>` en `.astro`), salvo el script de arranque del tema (ADR-003).
3. JavaScript en módulos ES6 importados de forma estática en `src/js/main.js`, con cláusulas de guarda.
4. Solo tokens de `DESIGN.md` y `tailwind.config.js`; clases de Tailwind siempre literales.
5. Header y footer como componentes únicos (`SiteHeader.astro`, `SiteFooter.astro`); sus enlaces salen de
   `src/data/navegacion.js` y la capa tenue del menú móvil es hermana del header.
6. Una iteración, un alcance: no se tocan archivos fuera de lo especificado.
7. Git en modo lectura para los agentes; *commits*, *push* y *merge* los hace el desarrollador.
8. Rutas absolutas desde la raíz (`/servicios`, `/images/...`); prohibido `./public/`.

---

## 7. Estándar de verificación

1. **Compilación:** `pnpm run build:cf` sin errores y clases nuevas presentes en el CSS de `_site/_astro/`.
2. **Invariantes por búsqueda de texto** en `_site/**/*.html`: `style=`, `onclick`, `<style>`, `<script>` sin `src` (uno solo
   por página: el de arranque del tema, ADR-003), `href="#"`, IDs únicos, ausencia de `fixed` dentro del `<header>`.
3. **Render real** en 320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768 y 1280×800, en modo claro y oscuro,
   cuando la iteración tiene impacto visual. La Iteración 06 de la Épica 06 demostró que inspeccionar el marcado no
   basta.
4. **Consola** del navegador sin errores.
5. **Sin evidencia no hay ✅.** Lo no verificado se registra como `🕒 PENDIENTE`, con la lista de comprobaciones
   manuales para el desarrollador. Nunca se inventan métricas ni hashes.

---

## 8. Bitácoras

### 8.1 Línea de `estado-actual.md`

Se añade **una** línea al final, sin reescribir las anteriores:

```text
Épica NN - Iteración NN: <Título de la iteración> - <Completada con éxito | Completada con reservas (motivo) | Ejecutada; PENDIENTE de certificación (qué falta)>.
```

### 8.2 Plantilla de bitácora

```markdown
# Bitácora de Ejecución - Épica NN - Iteración NN

**Fecha de ejecución:** DD-MM-AAAA
**Agente:** Claude Code | Antigravity
**Objetivo:** (una frase)

## 1. Resumen ejecutivo
## 2. Línea base (estado previo y defecto reproducido, si aplica)
## 3. Cambios realizados (por archivo)
## 4. Verificación de criterios de aceptación
| Criterio | Estado | Evidencia (código / render real) |
## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance
## 6. Archivos modificados y propuestas para archivos protegidos
## 7. Mensaje de commit sugerido
```

---

## 9. Plantilla de especificación de iteración

```markdown
# Iteración NN: <Título>

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
(Contexto, fuente de la verdad, archivos permitidos y prohibidos.)

## 1. Objetivo de la Iteración
## 2. Tareas Técnicas (Ejecución Estricta)
## 3. Auditoría de No-Regresión e Invariantes
## 4. Criterios de Aceptación (Definition of Done)
* **Escenario N: <Nombre>**
    * **Dado** ...
    * **Cuando** ...
    * **Entonces** ...
```

---

## 10. Política de control de versiones

| Acción                                                        | Agente | Desarrollador |
|:--------------------------------------------------------------|:------:|:-------------:|
| `git status`, `diff`, `log`, `show`, `blame`, `ls-files`      | ✅     | ✅            |
| `git add`, `commit`, `push`, `pull`, `merge`, `rebase`, `reset` | ❌     | ✅            |
| `git mv`, `git rm`, cambios de rama, `stash`, `tag`           | ❌ (solo propone) | ✅ |
| Despliegues y configuración de Cloudflare                     | ❌     | ✅            |

Además de esta regla escrita, `.claude/settings.json` bloquea estos comandos a nivel de permisos en Claude Code.

---

## 11. Convenciones de nombres

| Elemento              | Formato                                   | Ejemplo                                   |
|:----------------------|:------------------------------------------|:------------------------------------------|
| Carpeta de épica      | `epica-NN-slug-en-minusculas`             | `epica-08-migracion-astro`                |
| Especificación        | `iteracion-NN.md`                         | `iteracion-03.md`                         |
| Carpeta de bitácoras  | `bitacora-epica-NN`                       | `bitacora-epica-08`                       |
| Bitácora              | `bitacora-iteracion-NN.md`                | `bitacora-iteracion-03.md`                |
| Iteración no planificada | Siguiente número libre, marcada como "extensión no planificada" | Épica 06 · Iteración 13 |

Los números siempre con dos dígitos.

---

## 12. Registro de deuda técnica abierta

Criterios de severidad:

* **Alta:** defecto visible que rompe la página (por ejemplo, DT-01).
* **Media:** afecta SEO, contraste, accesibilidad o rendimiento medidos, o es un defecto visible que no rompe la página.
* **Baja:** sin efecto visible o solo de mantenimiento.

> Las ubicaciones (`archivo.html`, `Lnnn`) de las filas abiertas DT-22 a DT-25 y del detalle de SM-01 (§14) son las de los HTML
> anteriores a la Épica 08. Hoy el marcado vive en `src/pages/*.astro` y `src/components/`; se regeneran al planificar las
> Épicas 09 y 10.

| ID    | Descripción                                                                                                  | Severidad | Se resuelve en      |
|:------|:-------------------------------------------------------------------------------------------------------------|:----------|:--------------------|
| DT-01 | ✅ **Resuelta** (Épica 07 · Iteración 03, 14-10-2026). `servicios.html`, footer columna 1: faltaba la apertura `<a` del enlace de marca y el navegador mostraba el texto `class="..." ... >La Jardinera` en pantalla. Verificada en render real (Chrome 155 headless, 360 y 1280 px, claro y oscuro): el enlace existe, apunta a `./index.html` y no aparece código como texto. | Alta | Épica 07 · It. 03 |
| DT-02 | ✅ **Resuelta** (Épica 07 · Iteración 03, 14-10-2026). Hallazgo H8 (barra de escritorio entre 1024 y 1099 px) corregido en la Iteración 13 de la Épica 06 y certificado en render real (Chrome 155 headless): 120 mediciones (6 páginas × claro y oscuro × 10 anchos de 1024 a 1440 px), "Suscripción Floral" siempre en 1 línea (40 px), 0 px de solapamiento y sin scroll horizontal; a 1280 px el header es idéntico al previo a la compactación. | Media | Épica 07 · It. 03 |
| DT-03 | ✅ **Resuelta** (Épica 07 · Iteración 03, 14-10-2026; el del Hero se resolvió en la Épica 01 · Iteración 08). `style=` heredados de la textura de ruido del banner (Inicio, Servicios, Suscripción, Galería): migrados a la clase `.bg-noise`; 0 `style="` en los 6 HTML y la textura se ve idéntica (0 píxeles de diferencia frente a `HEAD` en las 16 comparaciones). | Media | Épica 07 · It. 03 |
| DT-04 | ✅ **Resuelta** (Épica 08 · Iteración 05, 18-10-2026). El Inicio no declaraba `<meta name="description">`. `NAVEGACION` guarda ahora la descripción de cada página y `SeoHead.astro` la emite desde `BaseLayout.astro`. Verificada en `_site/index.html` y en la vista previa de Cloudflare: 1 `meta description` en el Inicio de 116 caracteres, distinta de las otras 4 (146, 138, 145 y 159). | Media     | Épica 08 · It. 05 |
| DT-05 | ✅ **Resuelta** (Épica 07 · Iteración 03, 14-10-2026). `404.html`: los botones sociales del footer tenían `hidden lg:flex` y eran invisibles en móvil. Verificada en render real: a 360 px los tres miden 32 × 32 px con `display: flex`, igual que en `contacto.html`. | Baja | Épica 07 · It. 03 |
| DT-06 | ✅ **Resuelta** (Épica 08 · Iteración 03, 18-10-2026). Footer con dos variantes de contenedor y enlace activo sin `font-body-sm text-body-sm`. Unificado en `src/components/SiteFooter.astro`: contenedor `border-t border-outline-variant/20` sin margen externo y enlace activo con `font-body-sm text-body-sm`, con los enlaces leídos de `src/data/navegacion.js`. Verificada: `<footer` solo en el componente; 1 footer por página y `aria-current="page"` en las 5 páginas indexables (0 en la 404); en render real (Chrome 155 headless, 7 viewports × claro y oscuro, sin fuentes ni videos externos) 0 diferencias de geometría no explicadas, 64 px menos sobre el footer en Inicio, Contacto y 404 y enlace activo a 14 px. Revisión visual humana del footer en las 6 páginas: aprobada por el desarrollador (18-10-2026). | Baja | Épica 08 · It. 03 (componente Astro) |
| DT-07 | ✅ **Resuelta** (Épica 07 · Iteración 03, 14-10-2026). Texto "Redbank" en la franja de beneficios del Inicio corregido a **Redbanc** (`index.html`, línea 337; solo esa palabra). Verificado en render real: el texto visible es "Redbanc, efectivo y transferencias bancarias." | Baja      | Épica 07 · It. 03   |
| DT-08 | ✅ **Resuelta** (código en la Épica 08 · Iteración 05, 18-10-2026; verificada en producción en la Iteración 08, 19-10-2026). Se crearon `public/robots.txt`, `src/pages/sitemap.xml.js` (5 `<loc>` desde `NAVEGACION`) y `SeoHead.astro` (`canonical` y Open Graph, sin `www` ni extensión). Verificada en `_site/` con script (`og:url` = `canonical` = `<loc>` en las 5 páginas indexables; 404 con `noindex, follow` y sin `canonical` ni `og:*`) y en la vista previa de Cloudflare (código fuente de Inicio y Servicios, `/robots.txt`, `/sitemap.xml` e imagen `og-default.jpg`). Verificada en producción el 19-10-2026: `/robots.txt` idéntico al del repositorio, con `Allow: /` y `Sitemap: https://lajardinerafloreria.cl/sitemap.xml`; `/sitemap.xml` con 5 `<loc>` sin `www` y las 5 con 200; `og:image` con 200, `image/jpeg` y 1200 × 630 px (medido por Claude Code). Sitemap enviado en Search Console (propiedad de dominio sin `www`) con estado «Correcto» y 5 páginas descubiertas, y vistas previas de Facebook (depurador) y WhatsApp correctas (informado por el desarrollador). El depurador de Facebook advierte que falta `fb:app_id`: no afecta la vista previa y se acepta como observación. | Media     | Épica 08 · It. 05 (producción: It. 08) |
| DT-09 | ✅ **Resuelta** (Épica 07 · Iteración 01). `01-vision/proposito-y-alcance.md` y `02-arquitectura/stack-tecnologico.md` desactualizados (5 páginas, Netlify Forms, GitHub Actions como despliegue). | Baja | Épica 07 · It. 01 |
| DT-10 | ✅ **Resuelta** (Épica 08 · Iteración 02, 18-10-2026). `src/js/main.js` importaba módulos con ruta variable (`import(path)`), lo que impedía el análisis de un empaquetador. Ahora usa importaciones estáticas y conserva el aislamiento de errores por módulo. Verificada: 0 ocurrencias de `import(` y funcionamiento en render real (Chrome 155 headless: 18 de 18 pruebas de interacción iguales a la referencia). | Baja (bloqueante para Épica 08) | Épica 08 · It. 02 |
| DT-11 | Varios archivos guardados con BOM UTF-8. Al 19-10-2026: `src/css/input.css`, `src/js/main.js`, `src/js/data/reviews.js`, los módulos `carousel.js`, `modal.js`, `navigation.js` y `theme.js`, `tailwind.config.js` y `scripts/replace-icons.js`. Los 11 `.astro` no llevan BOM (el `index.html` original sí lo tenía). | Baja | Oportunista |
| DT-12 | Deuda de diseño listada en `DESIGN.md` §5.                                                                    | Baja      | Según iteración     |
| DT-13 | ✅ **Resuelta** (Épica 07 · Iteración 03, 14-10-2026). Ícono de Facebook del footer: segundo path con `fill="#edefe9"` fijo; en modo oscuro la "f" tenía 1,52:1 de contraste. Corregido con `class="fill-surface-container"` en las 6 páginas; verificado en render real: en oscuro 6,64:1 y en claro idéntico a antes (0 píxeles de diferencia). | Media | Épica 07 · It. 03 |
| DT-14 | ✅ **Resuelta** (corregida en Épica 07 · Iteración 03, 14-10-2026; verificada en producción el 16-10-2026, Épica 08 · Iteración 01). `404.html` usa rutas relativas (`./dist/...`, `./public/...`); servida en una ruta anidada (`/a/b/x`) se veía sin estilos. **Confirmada en producción (13-10-2026, `/servicios/xyz`).** Corregida en código con `<base href="/">`; verificada en la simulación local de Cloudflare y en render real (`/xyz`, `/a/b/xyz`, `/a/b/c/xyz` y `/servicios/xyz`: todo resuelve a la raíz con 200). **Verificada en producción el 16-10-2026** mediante Lighthouse en `/xyz`, `/servicios/xyz` y `/a/b/inexistente`: renderizado con estilos, logotipo y header, y estado HTTP 404 (bitácora de la Épica 08 · It. 01, §9). Salvedad: no se inspeccionaron la pestaña Red ni el detalle del error de consola; el reporte marca un error de consola en las 404, que se infiere asociado a la propia respuesta 404, sin verificar. **Actualización (Épica 08 · Iteración 02, 18-10-2026):** el `<base href="/">` se retiró; la 404 usa rutas absolutas y se resuelve igual en rutas anidadas. Verificada en `pnpm preview` y `pnpm dev` (con estilos en `/a/b/xyz` y `/servicios/xyz`). La única línea de consola en la 404 anidada es el 404 del propio documento, lo que confirma en local la inferencia de la salvedad anterior; en producción sigue sin verificarse. | Media | Épica 07 · It. 03 |
| DT-15 | ✅ **Resuelta** (Épica 08 · Iteración 07, 19-10-2026). El tema oscuro se aplicaba en `DOMContentLoaded` y quien prefiere modo oscuro veía un destello claro en la carga. Un único `<script is:inline>` en el `<head>` de `BaseLayout.astro` (excepción aprobada, ADR-003 de `decisiones-tecnicas.md`) fija `dark` o `light` antes del primer pintado. Medido en Chrome 155 headless (sistema oscuro, sin tema guardado, red 3G rápida emulada, Inicio y Galería a 360 × 740 y 1280 × 800): antes, 20 de 20 corridas con un fotograma claro previo al oscuro; después, 0 de 20. Confirmado por el desarrollador en la vista previa de Cloudflare (sistema oscuro emulado, sin datos del sitio, Fast 3G sin caché): sin destello y elección conservada al alternar, recargar y navegar. Además `theme.js` ya no falla con `localStorage` bloqueado (`readTheme` y `saveTheme`). 🕒 PENDIENTE: Firefox, Safari y dispositivo real. | Media | Épica 08 · It. 07 |
| DT-16 | ✅ **Resuelta** (Épica 08 · Iteración 02, 18-10-2026). `dist/css/output.css` estaba versionado en Git (archivo generado). Se retiró con `git rm -r dist`; el CSS ahora se genera con *hash* en `_site/_astro/`, carpeta ignorada por Git. | Baja | Épica 08 · It. 02 |
| DT-17 | ✅ **Resuelta** (Épica 08 · Iteración 02, 18-10-2026). `<meta charset>` no era la primera etiqueta del `<head>` en varias páginas. `404.html` se corrigió en Épica 07 · Iteración 03 (14-10-2026); las otras 5 quedan resueltas porque `BaseLayout.astro` lo declara primero. Confirmado en el HTML compilado de `_site/`: es la primera etiqueta en las 6 páginas. | Baja | Épica 08 · It. 02 |
| DT-18 | ✅ **Resuelta** (Épica 07 · Iteración 02, 14-10-2026). Recorte de glifos de `fx-starlight`: `background-clip: text` no pinta fuera de la caja del `span` y la cursiva sobresale (la "J" de "La Jardinera" al abrir línea, ≈ 7,25 px a 48 px; la "a" final, ≈ 0,75 px). Corregida con `padding-inline: .16em; margin-inline: -.16em` en `.fx-starlight--accent`; verificada en render real (Chrome 155 headless, 7 viewports × claro y oscuro: 0 px recortados). Sin verificar en Firefox, Safari ni dispositivo real. | Media | Épica 07 · It. 02 |
| DT-19 | ✅ **Resuelta** (Épica 07 · Iteración 02, 14-10-2026). "Florería" salía en peso 400 desde 1024 px porque `lg:text-display-hero` (token con `fontWeight: 400`) pisaba a `font-semibold`; contradicción entre `DESIGN.md` §1.2 (400) y §7.3 (600). Corregida con `lg:font-semibold` en el `<h1>` del Hero; verificada en render real (peso 600 en los 7 viewports). Queda pendiente reflejarla en `DESIGN.md` (propuesta en la bitácora de la Iteración 02). | Baja | Épica 07 · It. 02 |
| DT-20 | Contraste del acento del titular del Hero (`#ffc2c6`) sobre la fotografía: observación sin cambio de color (14-10-2026). Con el percentil 95 del fondo da ≥ 3:1 en 5 de 7 viewports; queda bajo 3:1 en 412 × 915 (2,88:1) y 740 × 360 (2,91:1). Revisar si cambia la fotografía o el criterio de medición. | Media | Oportunista (si cambia la fotografía o el criterio) |
| DT-21 | Rendimiento móvil por debajo del umbral. Línea base de Lighthouse en producción (16-10-2026, bitácora de la Épica 08 · It. 01, §9): Performance móvil de 68 a 83 en las 5 páginas con contenido (mediana 74; 75 a 85 en las tres URL de la 404) y LCP móvil de 2,9 a 6,4 s; Performance de escritorio de 92 a 97 en esas 5 páginas. Umbral de `01-vision/objetivos-y-metricas.md` §2: Performance ≥ 95. Origen no confirmado: el diagnóstico solo en lectura y sus hipótesis están en la §9 de esa bitácora. | Media | Épica 10 — Rendimiento y calidad Lighthouse (por planificar; fuera de la Épica 08, que exige paridad) |
| DT-22 | Logotipos PNG sobredimensionados. Confirmado por código (16-10-2026): `public/logos/la-jardinera-original.png` pesa 306.435 B (299,3 KiB) y `la-jardinera-blanco.png` 229.345 B (224,0 KiB); ambos miden 3446 × 3504 px y se muestran a 44 × 44 (`width="44" height="44"`) en el header de las 6 páginas, sin `loading` ni `fetchpriority` (`index.html` L21 y L27, `servicios.html` L23 y L29, `suscripcion-floral.html` L23 y L29, `galeria.html` L22 y L28, `contacto.html` L23 y L29, `404.html` L26 y L32). El logotipo claro también es el favicon de las 6 páginas. Hipótesis (no verificada en Lighthouse): explicaría el ahorro de 299 KiB de "Mejorar la entrega de imágenes" en Servicios móvil, Contacto y las 404 (bitácora de la Épica 08 · It. 01, §9.6 a). | Media | Épica 10 — Rendimiento y calidad Lighthouse (por planificar) |
| DT-23 | Imágenes sin `width`/`height` y `lazy` sobre el pliegue. Confirmado por código (16-10-2026): 9 imágenes de `index.html` (L369 a L671) y 24 de `galeria.html` (L285 a L677) no declaran `width` ni `height`, lo que contradice `AGENTS.md` §5, regla 9 (varias pesan más de 1 MiB, como `galeria-2.webp` con 1311,4 KiB). Además, la primera tarjeta de `servicios.html` (L272) y `hero-2` a `hero-4` de `suscripcion-floral.html` (L261, L264 y L267, apiladas bajo `hero-1`) llevan `loading="lazy"` dentro del área visible; si alguna es el LCP, el atributo lo retrasa (hipótesis: el reporte no trae el elemento LCP). | Media | Épica 10 — Rendimiento y calidad Lighthouse (por planificar) |
| DT-24 | Accesibilidad del Inicio (Lighthouse 91). Confirmado por código (16-10-2026): `src/js/modules/carousel.js` L28 genera `aria-label` en un `<div>` sin `role` en cada tarjeta de reseña (atributo ARIA prohibido; es la causa probable de esa auditoría, hipótesis); 4 enlaces solo de ícono sin texto ni `aria-label` en "Imágenes de nuestros ramos" (`index.html` L614, L636, L660 y L683). "Los enlaces idénticos tienen la misma finalidad" es una revisión manual de Lighthouse, no ubicada. | Media | Épica 10 — Rendimiento y calidad Lighthouse (por planificar) |
| DT-25 | Orden de encabezados. Confirmado por código (16-10-2026): `index.html` salta de `<h1>` (L259) a `<h4>` (L318 y L334) y `carousel.js` L42 inyecta un `<h4>` por reseña bajo el `<h2>` "Experiencias" (L714); `servicios.html` salta de `<h1>` (L259) a `<h3>` (L288) y `404.html` de `<h1>` (L196) a `<h3>` (L239, footer). Lighthouse marca la auditoría en esas tres páginas (Accesibilidad 91, 98 y 98). | Media | Épica 10 — Rendimiento y calidad Lighthouse (por planificar) |
| DT-26 | Carga inicial de la Galería con 10 `<video>` (`autoplay loop muted playsinline`) sin `preload` ni `poster`: unos 48,7 MB de descarga (`nmg2.mp4` 22,7 MB, `nmg5.mp4` 8,1 MB, `ddm2.mp4` 4,9 MB). Origen: diagnóstico de la Épica 07 (`bitacora-cierre-epica-07.md` §3). Candidata a carga diferida (`preload="none"` con `poster`, solo si el póster existe o se genera como `.webp` con `width`, `height` y `alt`), sin cambiar la apariencia ni la reproducción al entrar en pantalla. Medir los bytes antes y después en render real. Trasladada desde la Tarea 3 (opcional) de la Épica 08 · It. 06. | Media | Épica 10 (rendimiento) |
| DT-27 | Suscripción Floral frente a la referencia anterior a Astro en Lighthouse (Épica 08 · Iteración 08, 19-10-2026, bitácora §13.3; medianas de 3 corridas, Chrome 155 headless): Performance de escritorio 93 → 89 (tolerancia −3 del DoD) y CLS móvil 0,000 → 0,015 (tolerancia +0,01) no cumplen; Performance móvil 78 → 69 cumple por 1 punto (tolerancia −10) y el LCP móvil sube de 4,43 a 8,45 s con el mismo elemento (`hero-1.webp`). Hipótesis sin verificar: en producción Chrome marca con prioridad High el logotipo PNG (DT-22) y `hero-2` a `hero-4` (DT-23) antes del LCP y la simulación las suma; el desplazamiento de 0,015 es el mismo elemento y valor de 1 de las 3 corridas de la referencia. Aceptada como reserva al cerrar la Épica 08 (decisión del desarrollador, 19-10-2026). | Media | Épica 10 — Rendimiento y calidad Lighthouse (por planificar) |
| DT-28 | Web Analytics en las vistas previas `*.pages.dev`: la petición `rum` del *beacon* de Cloudflare falla (error de CORS en Chrome headless en la referencia `f6f82bf4`, 2 errores de consola por corrida) y deja Best Practices de la referencia en 96; el desarrollador la había observado antes como 404 en vistas previas. En producción responde 204 y la consola queda limpia (medido el 19-10-2026). `curl -sI` (HEAD) da 404 en todos los sitios, así que no distingue. Sin efecto en producción; evaluar si se acepta o se desactiva el *beacon* en las vistas previas. | Baja | Épica 10 — Rendimiento y calidad Lighthouse (por planificar) |
| DT-29 | Código muerto en `src/js/modules/subscription.js` (L85 y L86): maneja `#show-plans-btn` y `#hide-plans-btn`, que no existen en ninguna versión del sitio; su guarda evita errores. Hallazgo de la Épica 08 · Iteración 08 (19-10-2026). Retirarlo sin cambiar el comportamiento visible. | Baja | Épica 10 — Rendimiento y calidad Lighthouse (por planificar) |
| DT-30 | Node.js 22 pasa a mantenimiento y, según el calendario de Node.js, dejaría de recibir soporte hacia abril de 2027 (verificar al planificar). El proyecto lo fija en Cloudflare Pages (`NODE_VERSION` 22.22.2), en `package.json` (`engines`, `>=22.22.0`) y en la documentación. Evaluar la siguiente versión LTS antes de esa fecha, verificando compatibilidad con Astro y pnpm. Hallazgo del log de compilación de Cloudflare (19-10-2026). | Baja | Mantenimiento (antes de abril de 2027) |

---

## 13. Historial de esta carpeta

| Fecha       | Cambio                                                                                                  |
|:------------|:--------------------------------------------------------------------------------------------------------|
| 2026        | Creación como `_antigravity/` para gobernar al agente Antigravity (Épicas 01 a 06).                     |
| Épica 07    | Renombrada a `_planificacion/`; constitución reescrita para operar con varios agentes; `DESIGN.md` trasladado a la raíz del repositorio. |
| 13-10-2026  | La Épica 08 "Componentes React" (solo planificada) se reemplaza por `epica-08-migracion-astro/`; la Épica 07 · It. 04 (SEO) se traslada a la Épica 08 · It. 05. |
| 17-10-2026  | Registro de la creación de la §14 (solicitudes de mejora, con SM-01) y de los criterios de severidad del §12, ambos agregados el 16-10-2026 (Épica 08 · It. 01). Se amplía el criterio Media a "defecto visible que no rompe la página" y DT-20 y DT-25 pasan a Media; las deudas resueltas no se reclasifican. |
| 19-10-2026  | Épica 08 · It. 08: se registran DT-27 a DT-30, se verifica DT-08 en producción, se anota que las ubicaciones de DT-22 a DT-25 y SM-01 son las de los HTML anteriores a Astro y SM-03 pasa a la Épica 09. |

Las bitácoras de las Épicas 01 a 06 conservan las rutas `_antigravity/...` que usaban al momento de escribirse: son
registro histórico y no se editan.


---

## 14. Registro de solicitudes de mejora

Una **solicitud de mejora** es un cambio de diseño o de contenido que pide el desarrollador y que no corrige un defecto.
No es deuda técnica (§12). Cada solicitud tiene destino en una épica. Los agentes agregan filas solo cuando el
desarrollador lo pide, y no ejecutan una solicitud mientras su épica no esté planificada.

Estados: **Pendiente de definir**, **Definida**, **Planificada (Épica NN)** y **Hecha**.

| ID    | Página          | Viewport | Solicitud | Destino | Estado |
|:------|:----------------|:---------|:----------|:--------|:-------|
| SM-01 | Inicio (`#titular`) | Móvil | Reducir el tamaño del título y del párrafo del hero; ocultar en móvil el ícono SVG y la fila "Valdivia, Región de Los Ríos, Chile"; dejar solo "Descubrir más" con su flecha. | Épica 09 — Revisión móvil (por planificar) | Pendiente de definir |
| SM-02 | Todas (header) | Móvil (menos de 1024 px) | Panel móvil: trampa de foco con Tab y Shift+Tab. Hoy el foco sale del panel hacia el contenido y solo Escape lo devuelve a la hamburguesa (`navigation.js`); el comportamiento es idéntico al de la referencia, no es una regresión de la Épica 08. | Épica 09 — Revisión móvil (por planificar) | Pendiente de definir |
| SM-03 | Todas (tema) | Todos | Primera visita: `setInitialTheme()` guarda en `localStorage` la preferencia del sistema como si fuera una elección del usuario. Si luego cambia el modo del sistema operativo, el sitio sigue con el de la primera visita. Evaluar no guardar hasta que se alterne con el botón. Comportamiento previo a la Épica 08, no es una regresión (hallazgo de la Épica 08 · It. 07). | Épica 09 — Revisión móvil (por planificar) | Pendiente de definir |

### Detalle de SM-01

**Estado actual, según el desarrollador:** el título (`h1`) y el párrafo descriptivo del hero se ven demasiado grandes y la
tarjeta de vidrio ocupa casi toda la pantalla.

**Pendiente de definir con el desarrollador:**

* Tamaños de texto objetivo.
* Alineación de "Descubrir más".
* Comportamiento desde 768 px.
* Qué anchos exactos cuentan como "móvil".
* Qué pasa con los botones "Explorar Servicios" y "Suscripción Floral" (`index.html` L269 a L282), que la solicitud no
  menciona.

**Recomendación del asesor (no es decisión):**

* No hacerlo durante la Épica 08: exige paridad visual y su línea base se tomó con el hero actual.
* El contraste del hero se calibró en la Épica 01 · Iteración 08 (tinte mínimo /45, métrica de percentil 95 de la
  tarjeta, 7 viewports, 2 temas). Cualquier cambio de tamaño o de composición exige repetir esa medición.
* Los tamaños deben salir de la escala de `DESIGN.md`; si falta alguno, se entrega como propuesta de edición que aplica
  el desarrollador.
* Ocultar la ubicación quita texto visible con señal local. Conviene que "Valdivia" quede visible en otro lugar (hoy
  aparece en `index.html` L4, L321, L489, L527, L809 y L906; la metadescripción del Inicio aún no existe, DT-04).

**Confirmado por código** (`index.html`, sección `#titular` desde L241; verificado por programa el 16-10-2026):

| Elemento | Línea | Clases de Tailwind |
|:---------|:------|:-------------------|
| Tarjeta de vidrio | L257 | `hero-glass flex flex-col items-center text-center gap-space-3 p-space-4 md:p-space-8 rounded-3xl border border-white/20 bg-dark-background/45 backdrop-blur-xl backdrop-saturate-150 shadow-2xl` |
| `h1` | L259 | `font-display-hero text-headline-xl lg:text-display-hero text-neutral-50 font-semibold lg:font-semibold max-w-4xl tracking-tight leading-none` |
| Párrafo | L263 | `font-body-lg text-body-lg text-neutral-50 max-w-2xl font-light leading-relaxed` |
| Fila de datos (contenedor) | L284 | `w-full pt-space-3 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-space-2` |
| Ubicación (contenedor) | L285 | `flex items-center gap-space-2 text-neutral-50 font-label-sm text-label-sm tracking-widest uppercase` |
| Ubicación: ícono SVG | L286 | `text-neutral-50 text-[18px]` (con `aria-hidden="true"`) |
| Ubicación: texto | L290 | sin clases propias: `<span><strong>Valdivia</strong>, Región de Los Ríos, Chile</span>` |
| Enlace "Descubrir Más" | L292 a L295 | `flex items-center gap-2 text-neutral-50 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed font-label-sm text-label-sm uppercase tracking-widest transition-colors` |
| Flecha del enlace | L296 | `text-[16px] animate-bounce motion-reduce:animate-none` |

* La ubicación y "Descubrir Más" comparten el contenedor de L284: ocultar solo la ubicación exige una clase propia en su
  contenedor (L285).
* `DESIGN.md` L50 define `display-hero-mobile` (40/48 px) y L52 `headline-xl-mobile` (32/40 px); L51 define `headline-xl`
  (48/56 px), que es el que usa hoy el `h1` hasta `lg`. El tamaño renderizado no se midió (🕒 PENDIENTE para la Épica 09).
* Capturas de referencia (`referencia/capturas/`, fuera de Git; los nombres codifican solo el ancho):
  `index-320-claro.png`, `index-320-oscuro.png`, `index-360-claro.png`, `index-360-oscuro.png`, `index-412-claro.png`
  e `index-412-oscuro.png`.