# Bitácora de Ejecución - Épica 08 - Iteración 01

**Fecha de ejecución:** 14-10-2026
**Agente:** Claude Code
**Objetivo:** Dejar escrita y aprobada la decisión de migrar a Astro (ADR-001), entregar las propuestas para los documentos protegidos y congelar una línea base de referencia del sitio actual.

Especificación: [`iteracion-01.md`](../../03-planificacion/epicas/epica-08-migracion-astro/iteracion-01.md) · Épica: [`definicion-epica.md`](../../03-planificacion/epicas/epica-08-migracion-astro/definicion-epica.md)

---

## 1. Resumen ejecutivo

* **ADR-001** agregado al final de [`decisiones-tecnicas.md`](../decisiones-tecnicas.md): contexto, decisiones D1 a D9 (Astro `7.3.8`, sin actualizar), alternativas descartadas, consecuencias y estado "Aprobada (14-10-2026)".
* **Documentos protegidos:** no se aplicó ninguno. Las propuestas de la sección A de `propuestas-documentos-protegidos.md` se entregaron en el reporte final, en el formato de `AGENTS.md` §2. La sección B (`README.md`, `DESIGN.md`) queda para la Iteración 08.
* **Línea base:** `_site/` del estado actual copiado a `referencia/sitio/` (114 archivos, fuera de Git); `referencia/inventario.json` con las 6 páginas; **84 capturas** (6 páginas × 7 viewports × 2 temas) en `referencia/capturas/`, tomadas en Chrome 155 headless.
* **Pendientes del desarrollador:** Lighthouse de las 6 páginas en producción y verificación de la 404 en producción (DT-14). Ver §4 y §5.
* No se instaló ninguna dependencia ni se tocaron los 6 HTML, `src/`, `package.json`, `pnpm-lock.yaml` ni `tailwind.config.js`.

## 2. Línea base (estado previo)

| Dato | Valor | Origen |
|:-----|:------|:-------|
| Rama | `feat/migracion-astro` | `git branch --show-current` |
| Árbol de trabajo | limpio al iniciar | `git status --short` (vacío) |
| Node / pnpm | `v24.16.0` / `11.24.0` | `node -v`, `pnpm -v` (Node cumple `>= 22.13`) |
| Chrome usado | `155.0.8059.40` | carpeta de instalación |
| Épica 07 | Iteraciones 02 y 03 "Completada con reservas" y épica cerrada con reservas (14-10-2026) | `estado-actual.md`, líneas 40 a 47 |

Inventario de la línea base (`referencia/inventario.json`, generado por [`scripts/instantanea-referencia.mjs`](../../../scripts/instantanea-referencia.mjs)):

| Página | Elementos | IDs (duplicados) | `href` | `src` | `data-src` | `srcset` | Metas | Texto visible (caracteres) |
|:-------|----------:|-----------------:|-------:|------:|-----------:|---------:|------:|---------------------------:|
| `index.html` | 395 | 16 (0) | 48 | 14 | 0 | 1 | 2 | 3.432 |
| `servicios.html` | 311 | 13 (0) | 34 | 11 | 0 | 0 | 3 | 2.060 |
| `suscripcion-floral.html` | 309 | 11 (0) | 37 | 11 | 0 | 0 | 3 | 2.256 |
| `galeria.html` | 412 | 17 (0) | 33 | 37 | 34 | 0 | 3 | 2.045 |
| `contacto.html` | 220 | 17 (0) | 35 | 3 | 0 | 0 | 3 | 1.401 |
| `404.html` | 145 | 6 (0) | 35 | 3 | 0 | 0 | 4 | 744 |
| **Total** | **1.792** | **80 (0)** | **222** (28 únicos) | **79** (64 únicos) | **34** | **1** | | |

Otros datos de la línea base (confirmados por código):

* 1 `<script>` por página (el módulo `main.js`) y 0 `<style>`.
* 0 `href="#"`.
* Referencias `./public/`: 6 en `href`, 73 en `src` y 34 en `data-src` de los HTML, más 34 líneas en `src/js` (`services.js` 33 y `carousel.js` 1). La Iteración 02 debe dejarlas en 0 (hallazgo A-01).
* Hosts externos: `fonts.googleapis.com`, `fonts.gstatic.com`, `www.instagram.com`, `wa.me`, `www.facebook.com`, `maps.app.goo.gl` y `felipecuevas.dev`.
* `index.html` no declara `<meta name="description">` (DT-04 ya registrada): sus metas son solo `charset` y `viewport`.

## 3. Cambios realizados (por archivo)

| Archivo | Cambio |
|:--------|:-------|
| `_planificacion/04-bitacora/decisiones-tecnicas.md` | Se agrega al final la sección `## ADR-001 — Migración estructural a Astro (Épica 08)`. No se reordenó ni se editó nada anterior. |
| `.gitignore` | Se agrega una línea: `referencia/`. Comprobado con `git check-ignore -v referencia/sitio/index.html` (regla en la línea 30). |
| `scripts/instantanea-referencia.mjs` | Archivo nuevo. Node, módulos ES, sin dependencias. Lee `referencia/sitio/*.html` con un tokenizador propio y escribe solo `referencia/inventario.json` (guarda explícita que impide escribir fuera de `referencia/`). |
| `_planificacion/04-bitacora/estado-actual.md` | Una línea nueva al final. |
| `_planificacion/04-bitacora/bitacora-epica-08/bitacora-iteracion-01.md` | Este documento. |
| `referencia/` (fuera de Git) | `sitio/` (114 archivos), `inventario.json`, `resumen-capturas.json` y `capturas/` (84 PNG). |

Sin cambios en `_planificacion/README.md` (no se recibió el resultado de DT-14 en producción) ni en `definicion-epica.md` (no tiene tabla de estado de iteraciones: su §6 solo lista entregables y el Estado del encabezado es de la épica completa).

### Cómo se tomaron las capturas

* Chrome 155 headless con perfil aislado (`--user-data-dir` en un directorio temporal nuevo, borrado al terminar), controlado por el protocolo de depuración. No se usó el Chrome ni ninguna sesión del usuario.
* `referencia/sitio/` servida por HTTP local en `127.0.0.1` con un servidor de solo lectura escrito en Node (no se usó Python).
* Viewport emulado sin modo móvil y con factor de escala 1; barras de desplazamiento ocultas. Tema fijado antes de cargar cada página con `localStorage.theme` y `prefers-color-scheme`; cada captura se comprobó contra la clase `dark`/`light` de `<html>`.
* Antes de capturar se recorre la página (para activar imágenes diferidas), se espera a las fuentes y se vuelve arriba. Captura de página completa, nombrada `pagina-ancho-tema.png` (por ejemplo `servicios-360-oscuro.png`).
* Las fuentes (Noto Serif, Montserrat) se cargaron desde Google Fonts: la línea base depende de la red.

## 4. Verificación de criterios de aceptación

| Criterio | Estado | Evidencia (código / render real) |
|:---------|:-------|:---------------------------------|
| Precondiciones: Épica 07 cerrada, rama correcta, árbol limpio, versiones | ✅ | Confirmado por código y comandos (§2). La Épica 07 consta como "Completada con reservas" y sus pendientes manuales no bloquean la Épica 08 (`decisiones-tecnicas.md`, cierre del 14-10-2026). |
| Escenario 1: ADR-001 con contexto, D1 a D9 con versión exacta, alternativas descartadas y estado | ✅ | Confirmado por código: sección escrita en `decisiones-tecnicas.md`; Astro `7.3.8` tomada de `definicion-epica.md` §4 sin cambios. |
| Escenario 2: reglas coherentes tras aplicar las propuestas | 🕒 PENDIENTE | Depende de que el desarrollador aplique la sección A. Las propuestas se entregaron en el reporte; no se aplicaron. |
| Escenario 3: `inventario.json` con una entrada por página (IDs, enlaces, recursos, texto) | ✅ | Confirmado por ejecución: 6 entradas, 0 IDs duplicados por página. Los totales de IDs (80), `href` (222) y `src` (79) coinciden con una búsqueda de texto independiente sobre los HTML originales. Las copias de `referencia/sitio/*.html` son idénticas a los originales (`cmp`). |
| `referencia/` ignorada por Git | ✅ | `git check-ignore -v` la reporta; no aparece en `git status`. |
| Capturas 6 páginas × 7 viewports × 2 temas | ✅ (84 de 84) | Confirmado en render real (Chrome 155 headless). Tema correcto en las 77 capturas con registro; anchos de los PNG coherentes con el viewport en las 84; 0 fallos. |
| Consola del navegador sin errores | ✅ en 77 de 84 | Confirmado en render real: 0 errores ni excepciones en las 77 capturas de la tanda final. Las otras 7 (`index` a 320, 360 y 412 px en ambos temas, y `index-768-claro`) se tomaron en un intento previo cuyo registro de consola no se conservó: **no verificadas**. |
| Sin procesos ni perfil temporal sobrantes | ✅ | Tras terminar: 0 procesos de Chrome con el perfil temporal, 0 de Python y solo el Node previo; el directorio del perfil y las franjas se borraron. |
| Lighthouse móvil y escritorio de las 6 páginas en producción | 🕒 PENDIENTE (desarrollador) | Sin cifras: no se ejecutó. Ver §5. |
| DT-14 en producción (`/servicios/xyz` y `/a/b/inexistente`) | 🕒 PENDIENTE (desarrollador) | Sin cifras: no se verificó. Ver §5. |
| Auditoría de no-regresión | ✅ | Confirmado por `git status` y `git diff --stat`: ver §6. |

Comprobaciones manuales pendientes en capturas: nadie ha revisado las 84 imágenes una por una. Se revisaron a ojo `index-320-oscuro`, `index-768-claro`, `galeria-1024-claro` y `404-1280-oscuro`, que se ven completas y sin repeticiones del header.

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

No se corrigió nada de lo siguiente.

1. **Pendientes del desarrollador (🕒):**
    * Lighthouse (móvil y escritorio) de las 6 páginas en producción: Performance, Accessibility, Best Practices, SEO, LCP y CLS. Sin cifras hasta que las entregue.
    * DT-14: abrir `https://www.lajardinerafloreria.cl/servicios/xyz` y `https://www.lajardinerafloreria.cl/a/b/inexistente` tras el despliegue de la corrección con `<base href="/">` y confirmar que la 404 se ve con estilos. Si lo informa, se anota en `_planificacion/README.md` §12.
2. **Captura de página completa a 768 px:** en Chrome headless, una captura única de `index.html` (768 × 7371 px) se bloqueaba (timeout) con y sin `fromSurface`, y también ampliando el viewport al alto total; en franjas de 1500 px funciona sin problema. A 320, 360 y 412 px la captura única de `index.html` funcionó; desde 740 px no se probó la captura única (todas se tomaron en franjas). La causa no se determinó ni se investigó; puede ser una limitación de la herramienta o algo del sitio a ese ancho. Las capturas se tomaron en franjas unidas con Pillow (herramienta temporal fuera del proyecto, no se agregó ninguna dependencia al repositorio).
3. **Scroll horizontal a 768 px en `index.html`:** `scrollWidth` 772 px en ambos temas (4 px de desborde). Ya figura en `estado-actual.md` (Épica 01 · Iteración 08) como existente en `HEAD`; se confirma que sigue presente.
4. **Imágenes diferidas fuera de vista:** en `index.html` a 740, 768, 1024 y 1280 px, entre 7 y 9 `<img loading="lazy">` del ícono de Google dentro del carrusel de reseñas no se habían cargado al capturar (están fuera del área visible del carrusel). Las visibles sí. No es un defecto; se anota para no confundirlo con una regresión cuando se compare la salida de Astro.
5. **Elementos animados:** el titular del Hero (Starlight), el texto de marca del header (`fx-spotlight`) y el cross-fade de Suscripción cambian de un cuadro a otro. La comparación de capturas de la Iteración 02 debe tolerar esas zonas o fijar `prefers-reduced-motion`.
6. **Fechas:** el reloj del sistema marca 14-10-2026, pero el ADR-001 se registró como "Aprobada (15-10-2026)" por indicación expresa del desarrollador. Esta bitácora usa la fecha del sistema.
7. **Huecos en las propuestas de la sección A** (documentos que quedarán desactualizados y que ninguna propuesta cubre):
    * `AGENTS.md` §9 describe `_site/` como generado por lista blanca (6 HTML, `dist/`, `public/` y `src/js/`); tras la migración deja de ser cierto.
    * `_planificacion/README.md` §6 (reglas de acero 1, 2 y 5) y §7 (`pnpm build`, `dist/css/output.css`) repiten las reglas que cambian en `AGENTS.md` §5 y §7. No es un archivo protegido por `AGENTS.md` §2, pero está fuera del alcance de esta iteración.
    * `stack-tecnologico.md` es la fuente de arquitectura de `AGENTS.md` §1 (lectura obligatoria): si solo se aplican `AGENTS.md` §4 y §5, la Iteración 02 se encontraría con dos documentos contradictorios y `AGENTS.md` §1 ordena detenerse. Por eso se recomienda aplicar también la propuesta de `stack-tecnologico.md` antes de empezar.

## 6. Archivos modificados y propuestas para archivos protegidos

Archivos con cambios en Git (`git status` y `git diff --stat`, solo lectura):

* `.gitignore` (+1 línea)
* `_planificacion/04-bitacora/decisiones-tecnicas.md` (+64 líneas)
* `_planificacion/04-bitacora/estado-actual.md` (+1 línea)
* `_planificacion/04-bitacora/bitacora-epica-08/bitacora-iteracion-01.md` (nuevo)
* `scripts/instantanea-referencia.mjs` (nuevo)

Sin cambios: los 6 HTML, `src/`, `dist/` (`pnpm run build:cf` regeneró `dist/css/output.css` con contenido idéntico), `package.json`, `pnpm-lock.yaml`, `tailwind.config.js`, `AGENTS.md`, `README.md` y `DESIGN.md`. `referencia/` y `_site/` no aparecen en `git status`.

**Propuestas para archivos protegidos:** entregadas en el reporte final y tomadas de `propuestas-documentos-protegidos.md`, sección A: `AGENTS.md` §4, §5 y §7, `stack-tecnologico.md` §1 a §3 y `proposito-y-alcance.md`. Mínimas para empezar la Iteración 02: `AGENTS.md` §4 y §5 (más `stack-tecnologico.md`, ver §5.7). La sección B (`README.md`, `DESIGN.md`) corresponde a la Iteración 08.

## 7. Mensaje de commit sugerido

```text
Épica 08 - Iteración 01: Registra el ADR-001 (migración a Astro), agrega el script y la línea base de referencia (fuera de Git) y su bitácora; deja propuestas para los documentos protegidos.
```

Longitud contada con Node: 190 caracteres.

---

## 8. Ajustes posteriores

**Fecha del ajuste:** 15-10-2026 (según el reloj del sistema, que pasó la medianoche durante la sesión) · **Agente:** Claude Code · **Alcance autorizado:** `decisiones-tecnicas.md` (solo la fecha del estado del ADR-001), esta bitácora y una línea en `estado-actual.md`. La Iteración 01 sigue abierta: faltan los pendientes del desarrollador (§8.4).

### 8.1 Corrección de la fecha del ADR-001

* El desarrollador indicó 15-10-2026 por error. La fecha real de la aprobación es **14-10-2026** (el reloj del sistema también marcaba 14-10-2026 al ejecutar la iteración); el estado correcto del ADR-001 es "Aprobada (14-10-2026)". Este ajuste se ejecutó después, ya con el reloj en 15-10-2026.
* Búsqueda de `15-10-2026` en los archivos versionados: 3 ocurrencias, todas relacionadas con la aprobación del ADR-001.

| Archivo | Línea | Contexto | Acción |
|:--------|------:|:---------|:-------|
| `_planificacion/04-bitacora/decisiones-tecnicas.md` | 51 | `* **Estado:** Aprobada (15-10-2026).` | Corregida a 14-10-2026. |
| `_planificacion/04-bitacora/bitacora-epica-08/bitacora-iteracion-01.md` | 13 | Resumen ejecutivo: estado "Aprobada (15-10-2026)" | Corregida a 14-10-2026. |
| `_planificacion/04-bitacora/bitacora-epica-08/bitacora-iteracion-01.md` | 99 | §5, punto 6: describe la discrepancia entre el reloj del sistema y la fecha indicada | **Sin cambio, a propósito:** es el registro de lo observado al ejecutar la iteración. Queda reemplazado por esta sección (§8.1). |

* `estado-actual.md` no contenía `15-10-2026`: la línea de la Iteración 01 ya decía 14-10-2026 y no se modificó.
* Confirmado por búsqueda de texto (`git grep`), no por render.

### 8.2 Propuestas documentales faltantes (🕒 sin aplicar)

Las propuestas se entregaron en el reporte de la sesión, en el formato de `AGENTS.md` §2, con el texto actual exacto de cada archivo (cada línea `-` se comprobó por programa contra el archivo real). Ningún archivo protegido se modificó.

| # | Archivo y sección | Origen | Estado |
|:--|:------------------|:-------|:-------|
| 1 | `AGENTS.md` §9 (despliegue: `_site/` pasa a ser la salida de `astro build`) | Nueva | 🕒 PENDIENTE (la aplica el desarrollador) |
| 2 | `_planificacion/README.md` §6 y §7 (reglas de acero y estándar de verificación), con nota de transición | Nueva | 🕒 PENDIENTE (la aplica el desarrollador) |
| 3 | `_planificacion/01-vision/objetivos-y-metricas.md` §3, punto 4 (rutas "relativas seguras") y errata `6#` del título | Nueva, hallada en la revisión de coherencia | 🕒 PENDIENTE (requiere decisión del desarrollador) |
| 4 | `README.md`: nota de transición al inicio (no bloquear la lectura obligatoria hasta la Iteración 08) | Nueva, hallada en la revisión de coherencia | 🕒 PENDIENTE (requiere decisión del desarrollador) |
| A1 | `AGENTS.md` §5, regla 8: la propuesta original quedó desactualizada (no contempla la excepción del `<base href="/">` agregada en la Épica 07 · Iteración 03) | Corrección a la sección A | 🕒 PENDIENTE |
| A2 | `AGENTS.md` §5, regla 6: la nota de transición estaba fuera del bloque `diff`; se integra al texto de la regla | Corrección a la sección A | 🕒 PENDIENTE |
| A3 | `AGENTS.md` §7: la propuesta original elimina la línea de paridad; se mantiene mientras header y footer estén duplicados | Corrección a la sección A | 🕒 PENDIENTE |

Observación sin corrección: la propuesta para `AGENTS.md` §5 regla 2 ("el único `<script>` permitido…") y la de §7 ("0 `<script>` sin `src`") chocarán con el JSON-LD opcional de la Iteración 05 y con el script de tema opcional de la Iteración 07 cuando se aprueben; se resuelve al aprobar esas excepciones. No bloquea la Iteración 02.

El desarrollador aplicará a mano antes de la Iteración 02: `AGENTS.md` §4, §5, §7 y §9; `stack-tecnologico.md`; `proposito-y-alcance.md`; y `_planificacion/README.md` §6 y §7. Esa lista **reemplaza** a la de §5.7 y §6 de esta bitácora (que solo nombraba `AGENTS.md` §4 y §5 y `stack-tecnologico.md`).

### 8.3 Revisión de coherencia (solo lectura, confirmada por código)

Se simuló la aplicación de todas las propuestas y se buscaron en `AGENTS.md`, `README.md`, `DESIGN.md`, `_planificacion/README.md`, `01-vision/` y `02-arquitectura/` las menciones de `dist/css/output.css`, React, `stage-site`, lista blanca, `./public`, `./`, "paridad exacta" y "seis archivos HTML". Resultado:

| Archivo | Menciones que seguirían contradiciendo | ¿Bloquean la Iteración 02 (`AGENTS.md` §1)? | Se corrigen en |
|:--------|:---------------------------------------|:--------------------------------------------|:---------------|
| `AGENTS.md` | Ninguna | No | — |
| `_planificacion/02-arquitectura/stack-tecnologico.md` | Ninguna | No | — |
| `_planificacion/README.md` | Ninguna fuera del registro histórico (§12 y §13) | No | — |
| `_planificacion/01-vision/proposito-y-alcance.md` | Ninguna (la salida sigue siendo 6 HTML) | No | — |
| `_planificacion/01-vision/objetivos-y-metricas.md` | 1: §3, punto 4, rutas "relativas seguras (`./`)" | **Sí, literalmente** (Definition of Done global) | Antes de la Iteración 02 (propuesta #3) |
| `README.md` | Menciones en 10 secciones (§1, §2, §4, §5, §6, §7, §8, §10, §12 y §15); la propuesta B cubre solo §1, §2, §5, §7, §8 y §15, y deja sin cubrir §4, §6, §10 y §12 | **Sí, literalmente** | Nota de transición ahora (propuesta #4); contenido en la Iteración 08, ampliando la sección B con §4, §6, §10 y §12 |
| `DESIGN.md` | 6 menciones: ubicación de archivos (líneas 43, 348, 409 y 542) y estado del footer (§5.3, línea 307, y §10, línea 466), que cambia con DT-06 en la Iteración 03 | No (no cambian tokens ni reglas de diseño) | Iteración 08 (y §5.3 y §10 al cerrar la Iteración 03) |

### 8.4 Pendientes del desarrollador (🕒 PENDIENTE, sin cifras)

* Lighthouse móvil y escritorio de las 6 páginas en producción (Performance, Accessibility, Best Practices, SEO, LCP y CLS): 🕒 PENDIENTE. No se ejecutó ni se registra ninguna cifra.
* DT-14 en producción (`/servicios/xyz` y `/a/b/inexistente`): 🕒 PENDIENTE. No se registra ningún resultado ni se toca `_planificacion/README.md` §12.
* Aplicar las propuestas de §8.2 (las que el desarrollador indicó que aplicará a mano) y decidir sobre las propuestas #3 y #4.

### 8.5 Hallazgos fuera de alcance (solo reportados)

* `objetivos-y-metricas.md`, línea 1: el título empieza con `6#` en vez de `#` (errata); incluida en la propuesta #3.
* El ADR-001, en "Consecuencias", enumera los documentos a actualizar antes de la Iteración 02 (`AGENTS.md` §4, §5 y §7, `stack-tecnologico.md` y `proposito-y-alcance.md`); la lista real ahora incluye `AGENTS.md` §9 y `_planificacion/README.md` §6 y §7. No se editó el ADR (la autorización cubría solo la fecha).
* `propuestas-documentos-protegidos.md` (sección A) conserva las tres propuestas desactualizadas (A1 a A3) y no incluye las nuevas; no se editó por estar fuera del alcance autorizado.

### 8.6 Archivos modificados

* `_planificacion/04-bitacora/decisiones-tecnicas.md`: 1 línea (fecha del estado del ADR-001).
* `_planificacion/04-bitacora/bitacora-epica-08/bitacora-iteracion-01.md`: 1 corrección de fecha (§1) y esta sección.
* `_planificacion/04-bitacora/estado-actual.md`: 1 línea nueva al final.

---

## 9. Línea base de Lighthouse (producción, 16-10-2026)

**Fecha del registro:** 16-10-2026 · **Agente:** Claude Code · **Fuente:** 16 PDF exportados por el desarrollador desde
Lighthouse, en `referencia/lighthouse/` (fuera de Git; `git check-ignore` la reporta por la regla `referencia/` de
`.gitignore`, línea 30). Rótulos usados: **[PDF]** = reportado por el desarrollador (PDF, producción); **[código]** =
confirmado por código; **[hipótesis]** = hipótesis no verificada en Lighthouse.

Esta línea base es **histórica**: no es la referencia de comparación del DoD de la Épica 08 (ver
`definicion-epica.md` §8, redefinido en el ajuste 2, §10).

### 9.1 Configuración de la medición [PDF]

* Lighthouse 13.4.1 con Chromium 155.0.0.0; "Sesión de una sola página"; "Carga inicial de la página".
* **Móvil:** Moto G Power emulado, "Limitación de 4G lenta".
* **Escritorio:** Escritorio emulado, "Limitación personalizada".
* Origen medido: `https://lajardinerafloreria.cl/` (sin `www`). Hora: "Captured at" del pie del PDF, GMT-3, 16-10-2026.
* Los PDF traen las auditorías plegadas: **no incluyen el elemento LCP ni su desglose**.

### 9.2 Resultados [PDF]

| Página | Modo | Hora | Perf | Acces | BP | SEO | FCP | LCP | TBT | CLS | Speed Index |
|:-------|:-----|:-----|-----:|------:|---:|----:|----:|----:|----:|----:|------------:|
| index (`/`) | móvil | 16:16 | 70 | 91 | 100 | 92 | 3,3 s | 6,4 s | 0 ms | 0 | 3,3 s |
| servicios | móvil | 20:23 | 76 | 98 | 100 | 100 | 3,1 s | 4,9 s | 0 ms | 0 | 3,1 s |
| suscripcion-floral | móvil | 20:24 | 68 | 100 | 100 | 100 | 1,8 s | 5,6 s | 410 ms | 0 | 2,0 s |
| galeria | móvil | 20:24 | 83 | 100 | 100 | 100 | 1,7 s | 2,9 s | 450 ms | 0 | 1,7 s |
| contacto | móvil | 20:25 | 74 | 100 | 100 | 100 | 3,0 s | 5,3 s | 0 ms | 0,048 | 3,0 s |
| 404 `/xyz` | móvil | 20:26 | 75 | 98 | 96 | 58 | 3,0 s | 5,3 s | 0 ms | 0,013 | 3,0 s |
| 404 `/a/b/inexistente` | móvil | 20:29 | 85 | 98 | 96 | 58 | 1,8 s | 4,3 s | 0 ms | 0,013 | 1,8 s |
| 404 `/servicios/xyz` | móvil | 21:02 | 77 | 98 | 96 | 58 | 1,8 s | 4,3 s | 340 ms | 0 | 1,8 s |
| index (`/`) | escritorio | 20:37 | 95 | 91 | 100 | 92 | 0,9 s | 1,4 s | 0 ms | 0 | 0,9 s |
| servicios | escritorio | 20:37 | 95 | 98 | 100 | 100 | 0,9 s | 1,3 s | 0 ms | 0,003 | 0,9 s |
| suscripcion-floral | escritorio | 20:38 | 92 | 100 | 100 | 100 | 0,9 s | 1,8 s | 0 ms | 0,002 | 0,9 s |
| galeria | escritorio | 20:39 | 96 | 100 | 100 | 100 | 1,0 s | 1,2 s | 0 ms | 0 | 1,0 s |
| contacto | escritorio | 20:39 | 97 | 100 | 100 | 100 | 0,9 s | 1,1 s | 0 ms | 0,01 | 0,9 s |
| 404 `/xyz` | escritorio | 20:40 | 97 | 98 | 96 | 58 | 0,9 s | 1,1 s | 0 ms | 0,015 | 0,9 s |
| 404 `/a/b/inexistente` | escritorio | 20:49 | 98 | 98 | 96 | 58 | 0,7 s | 1,0 s | 0 ms | 0 | 0,7 s |
| 404 `/servicios/xyz` | escritorio | 21:02 | 99 | 98 | 96 | 58 | 0,6 s | 0,8 s | 0 ms | 0,015 | 0,6 s |

**Cotejo con los PDF:**

* Texto de los 16 PDF extraído con `pdftotext` (poppler, ya presente en el equipo; no se instaló nada) y comparado por
  programa con la transcripción del desarrollador (Anexo A del pedido): **16 de 16 filas coinciden** en URL, modo, hora
  y los 10 valores. Sin discrepancias.
* Revisión visual con `Read` de 3 PDF completos (`404-servicios-xyz-movil`, `404-anidada-movil` y
  `404-xyz-escritorio`): coinciden con la extracción. Los otros 13 se cotejaron solo por texto extraído, no como
  imagen. (`Read` con el parámetro `pages` falló por falta de `pdftoppm`; sin ese parámetro funciona).
* Anexo B (ahorros, cargas útiles, auditorías marcadas de accesibilidad, SEO y 404): **todos los ítems coinciden**.

### 9.3 Salvedades

* Index móvil se midió a las **16:16**; el resto, entre las **20:23 y las 21:02**. Las condiciones de red y del servidor
  pueden diferir entre ambas tandas.
* El resumen original del desarrollador traía en la fila `/servicios/xyz` los valores de `/xyz`; la tabla usa los de
  los PDF.
* Los PDF no traen el elemento LCP: ninguna conclusión de esta sección afirma cuál es.
* Cada valor es **una sola corrida** por página y modo.
* Las 6 mediciones de la 404 traen la advertencia "Lighthouse no ha podido cargar correctamente la página que has
  solicitado… (Código de estado: 404)" [PDF]. Es esperable en una 404, pero significa que Lighthouse marcó esas
  corridas como afectadas.

### 9.4 Ruido observado en la misma página (404, mismo HTML, tres URL) [PDF, rangos calculados por programa]

| Métrica | Móvil (`/xyz`, `/a/b/inexistente`, `/servicios/xyz`) | Rango móvil | Escritorio (mismo orden) | Rango escritorio |
|:--------|:------------------------------------------------------|:------------|:-------------------------|:-----------------|
| Performance | 75 / 85 / 77 | 75 a 85 (10 puntos) | 97 / 98 / 99 | 97 a 99 |
| FCP | 3,0 / 1,8 / 1,8 s | 1,8 a 3,0 s | 0,9 / 0,7 / 0,6 s | 0,6 a 0,9 s |
| LCP | 5,3 / 4,3 / 4,3 s | 4,3 a 5,3 s | 1,1 / 1,0 / 0,8 s | 0,8 a 1,1 s |
| TBT | 0 / 0 / 340 ms | 0 a 340 ms | 0 / 0 / 0 ms | 0 ms |
| CLS | 0,013 / 0,013 / 0 | 0 a 0,013 | 0,015 / 0 / 0,015 | 0 a 0,015 |
| Ahorro por bloqueo del renderizado | 1420 / 150 / 80 ms | 80 a 1420 ms | 380 / 130 / 30 ms | 30 a 380 ms |

En conjunto, el CLS de la 404 va de 0 a 0,015. Con una sola corrida, diferencias de este orden entre páginas no se
pueden atribuir al código.

### 9.5 Umbrales de `objetivos-y-metricas.md` §2 frente a la línea base (hechos, sin juicio) [PDF]

| Métrica | Umbral | Móvil (8 mediciones) | Escritorio (8 mediciones) |
|:--------|:-------|:---------------------|:--------------------------|
| Performance | ≥ 95 | 68 a 85; 0 de 8 con ≥ 95 | 92 a 99; 7 de 8 con ≥ 95 |
| Accesibilidad | 100 | 91 a 100; 3 de 8 con 100 | 91 a 100; 3 de 8 con 100 |
| Best Practices | 100 | 96 a 100; 5 de 8 con 100 | 96 a 100; 5 de 8 con 100 |
| CLS | 0 | 0 a 0,048; 5 de 8 con 0 | 0 a 0,015; 3 de 8 con 0 |
| FCP | ≤ 1,2 s (medido con la pestaña Network) | FCP de Lighthouse: 1,7 a 3,3 s | FCP de Lighthouse: 0,6 a 1,0 s |

El umbral de FCP de ese documento se mide con la pestaña Network, no con Lighthouse: la fila solo cita el FCP de
Lighthouse y no concluye cumplimiento.

### 9.6 Diagnóstico del rendimiento móvil (solo lectura; no se corrigió nada)

**a) Ahorro idéntico de 299 KiB en "Mejorar la entrega de imágenes" (Servicios móvil, Contacto y las tres 404).**

* [código] Header de las 6 páginas: `public/logos/la-jardinera-original.png`, **306.435 bytes (299,3 KiB)**, tamaño
  intrínseco **3446 × 3504 px**, declarado `width="44" height="44"`, sin `loading`, `fetchpriority` ni `decoding`, clases
  `block dark:hidden` (visible en tema claro). Líneas: `index.html` 21, `servicios.html` 23, `suscripcion-floral.html` 23,
  `galeria.html` 22, `contacto.html` 23 y `404.html` 26.
* [código] `public/logos/la-jardinera-blanco.png`, **229.345 bytes (224,0 KiB)**, 3446 × 3504 px, declarado 44 × 44, sin
  atributos de carga, clases `hidden dark:block`. Líneas: 27, 29, 29, 28, 29 y 32 en el mismo orden.
* [código] El mismo `la-jardinera-original.png` es el favicon (`<link rel="icon">`) de las 6 páginas (`index.html` 5,
  `404.html` 11, línea 6 o 7 en las demás).
* [código] El footer no tiene imágenes. `contacto.html` y `404.html` no referencian otra imagen que los dos logotipos.
* [hipótesis] Los 299 KiB coinciden con el peso del logotipo de tema claro (299,3 KiB), que se sirve a 3446 × 3504 px
  para mostrarse a 44 × 44. Lighthouse corre en tema claro; el logotipo blanco estaría oculto. No se verificó en el
  detalle de la auditoría (plegada en los PDF).

**b) Imágenes de más de 100 KiB por página** [código: tamaño y atributos; hipótesis: posición respecto del pliegue].

| Página | Archivo (línea) | Tamaño | Atributos de carga | ¿Sobre el pliegue? |
|:-------|:----------------|-------:|:-------------------|:-------------------|
| Las 6 | `logos/la-jardinera-original.png` (ver a) | 299,3 KiB | ninguno (carga inmediata) | Sí, en el header |
| Las 6 | `logos/la-jardinera-blanco.png` (ver a) | 224,0 KiB | ninguno | Oculto en tema claro |
| index | `hero-botanical-mobile.webp` (`<source>` vertical, L245) | 186,1 KiB | hereda `fetchpriority="high"` del `<img>` | Sí en móvil vertical [hipótesis: candidata a LCP] |
| index | `hero-botanical-desktop.webp` (L248) | 155,4 KiB | `fetchpriority="high"`, `decoding="async"` | Sí en horizontal [hipótesis: candidata a LCP] |
| index | `servicio-novias.webp` (L369) / `servicio-magu.webp` (L471) | 1027,1 / 1001,8 KiB | `loading="lazy"`, sin `width`/`height` | No |
| index | `galeria-2.webp` (L625) | 1311,4 KiB | `loading="lazy"`, sin `width`/`height` | No |
| index | `servicio-eventos` (L403), `servicio-suscripcion` (L437), `suscripcion-taller` (L512), `galeria-1` (L603), `galeria-3` (L647), `galeria-4` (L671) | 111,2 a 167,5 KiB | `loading="lazy"`, sin `width`/`height` | No |
| servicios | `servicios/suscripcion.webp` (L272, primera tarjeta) | 126,2 KiB | `loading="lazy"`, sin `fetchpriority` | Probable en móvil [hipótesis] |
| servicios | `ramos-de-autor` (L388), `matrimonios` (L431), `novios-rio` (L472), `eventos` (L508), `condolencias` (L544) | 131,4 a 390,0 KiB | `loading="lazy"` | No |
| suscripcion-floral | `suscripcion/hero-1.webp` (L258) | 147,8 KiB | `fetchpriority="high"` | Sí [hipótesis: candidata a LCP] |
| suscripcion-floral | `hero-2` (L261), `hero-3` (L264), `hero-4` (L267) | 298,9 / 147,0 / 228,6 KiB | `loading="lazy"`, apiladas con `opacity-0` sobre `hero-1` | Sí (misma posición) [hipótesis: se descargan al cargar porque están en el área visible] |
| suscripcion-floral | `mapa` (L367), `plan-esencial` (L407), `plan-premiere` (L461), `plan-luxe` (L535) | 139,1 a 262,9 KiB | `loading="lazy"` | No |
| galeria | `galeria/sf1.webp` (L285) y `sf2.webp` (L293), primer capítulo | 140,9 / 112,1 KiB | `loading="lazy"`, sin `width`/`height` | Probable [hipótesis] |
| galeria | 13 imágenes más de 100,1 a 509,0 KiB (`sf5`, `sf7`, `gcf1`, `ddm1`, `ddm3`, `ddm4`, `ddm5`, `rdn2`, `flra3`, `flra4`, `nmg1`, `nmg6`, `nmg7`) | 100,1 a 509,0 KiB | `loading="lazy"`, sin `width`/`height` | No |
| contacto, 404 | Solo los logotipos | — | — | — |

**c) Servicios: "Descubrimiento de solicitudes de LCP".** [código] La primera imagen de contenido
(`servicios/suscripcion.webp`, `servicios.html` L272) está en el HTML estático (no la inserta JavaScript; `services.js`
solo alimenta el modal), lleva `loading="lazy"` y no tiene `fetchpriority`. Le preceden solo el encabezado de la sección
(rombo, `<h1>` y un párrafo, L251 a L264). [hipótesis] Si esa imagen es el LCP en móvil, `loading="lazy"` explicaría la
auditoría marcada; no se puede confirmar sin el elemento LCP.

**d) `<head>` y recursos que bloquean el renderizado.** [código]

* Las 6 páginas cargan dos hojas de estilo bloqueantes: Google Fonts (`fonts.googleapis.com/css2`, Montserrat 6 estilos y
  Noto Serif 4, `display=swap`) y `./dist/css/output.css` (**47.062 bytes** sin comprimir). Ambas con
  `rel="stylesheet"`, sin `media` ni `preload` (por ejemplo, `index.html` L10 a L12; `404.html` L15 a L17).
* Hay `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com`; **no hay `<link rel="preload">`** de fuentes ni de
  imágenes en ninguna página (`objetivos-y-metricas.md` §2 lo pide como estrategia para Performance).
* `src/js/main.js` se carga con `type="module"` al final del `<body>` (diferido; no bloquea el renderizado).
* [hipótesis] El ahorro por bloqueo varía de 80 a 1420 ms en la misma 404 (§9.4): con una sola corrida, su magnitud
  depende de la red del momento más que del código.

**e) Galería: videos e imágenes.** [código]

* 10 `<video>` con `autoplay loop muted playsinline`, **sin `preload`, sin `poster` y sin `loading`** (L301 a L661).
  Peso total: **48.766.823 bytes** (46,51 MiB; 48,77 MB). Los mayores: `nmg2.mp4` 22.715.000 B, `nmg5.mp4` 8.098.647 B y
  `ddm2.mp4` 4.928.653 B.
* 24 imágenes de la galería: 3.960.896 bytes (3,78 MiB), todas con `loading="lazy"` y sin `width`/`height`.
* [PDF] Lighthouse informa una carga útil total de **31.091 KiB** en móvil (≈ 30,4 MiB) y **31.554 KiB** en escritorio
  (≈ 30,8 MiB).
* Contraste: lo transferido según Lighthouse (≈ 30,4 a 30,8 MiB, todo incluido) es **menor** que la suma de los videos
  (46,51 MiB). [hipótesis] Chrome no descarga completo cada video con `autoplay` durante la medición (descargas parciales
  o canceladas, coherente con los `net::ERR_ABORTED` diagnosticados en la Épica 07); no se verificó en la pestaña Red.
  La cifra de 48,7 MB de `iteracion-06.md` es la suma de los archivos, no lo transferido.

**f) 404 y "Se ha bloqueado la indexación".** [código] `404.html` L10: `<meta name="robots" content="noindex, follow"/>`,
intencional (`README.md` §11 y `proposito-y-alcance.md` §2). Explica esa auditoría; el SEO 58 suma además el estado HTTP
404, que también es el comportamiento esperado de una página de error.

**g) Accesibilidad y SEO del Inicio** (solo ubicación; no se corrigió nada).

* **Atributos ARIA prohibidos** [código; hipótesis de que es el elemento marcado]: `src/js/modules/carousel.js` L28 genera,
  en cada tarjeta de reseña, `<div class="flex items-center text-warning gap-0.5" aria-label="Calificación de … estrellas">`
  sin `role`: un `aria-label` en un `div` genérico es un uso prohibido. Es contenido inyectado en tiempo de ejecución en
  `#testimonials-track` (`index.html` L754).
* **Enlaces sin nombre reconocible** [código]: 4 enlaces solo-ícono del bloque "Imágenes de nuestros ramos", sin texto
  ni `aria-label` (el SVG no tiene título): `index.html` L614, L636, L660 y L683 (`href="./galeria.html#…"`).
* **Orden de encabezados** [código]: en `index.html`, `<h1>` (L259) seguido de `<h4>` "Despacho en el Día" (L318) y
  "Pagos Seguros & Facturación" (L334); además, `carousel.js` L42 inyecta un `<h4>` por reseña bajo el `<h2>`
  "Experiencias" (L714). En `servicios.html`, `<h1>` (L259) seguido de `<h3>` (L288, tarjetas). En `404.html`, `<h1>`
  (L196) seguido de los `<h3>` del footer (L239). Suscripción, Galería y Contacto no presentan saltos en el HTML estático.
* **"Los enlaces idénticos tienen la misma finalidad"**: es una revisión manual de Lighthouse; no se ubicó.
* **Sin metadescripción** [código]: `index.html` no tiene `<meta name="description">` (DT-04, ya registrada; se resuelve
  en la It. 05). Las otras 5 páginas sí la tienen.

### 9.7 Hallazgos fuera de alcance (solo reportados; sin deuda nueva salvo DT-21, por decisión del desarrollador)

1. Logotipos PNG de 3446 × 3504 px (299,3 y 224,0 KiB) mostrados a 44 × 44 en las 6 páginas y como favicon (§9.6 a).
2. Accesibilidad del Inicio (91): ARIA en `carousel.js` L28, 4 enlaces sin nombre y orden de encabezados (§9.6 g).
3. Orden de encabezados también en Servicios y en la 404 (§9.6 g).
4. Imágenes sin `width`/`height` en `index.html` (9, L369 a L671) y en `galeria.html` (24): contradice `AGENTS.md` §5
   regla 9. Varias pesan más de 1 MiB (`galeria-2.webp` 1311,4 KiB).
5. Galería: 10 videos con `autoplay` sin `preload` ni `poster`; ya planificado como tarea opcional en la It. 06.
6. Suscripción: `hero-2` a `hero-4` con `loading="lazy"` pero dentro del área visible; "Redistribución forzada" marcada en
   Suscripción (móvil) y Galería (ambos modos): su origen no se localizó por lectura de código.
7. "Los enlaces idénticos tienen la misma finalidad" aparece también en Suscripción (ambos modos), no solo en el Inicio;
   y la Galería de escritorio lista "Los elementos `<video>` contienen un elemento `<track>`…" en Accesibilidad (puntaje
   100). Ninguno figuraba en el Anexo B.
8. 404: Best Practices 96 por error de consola (detalle no inspeccionado) y caché de páginas completas impedida (1 motivo,
   no inspeccionado).
9. `README.md` §3 afirma "imágenes con dimensiones explícitas" y §11 "cada página declara `<meta name="description">`":
   hoy no se cumple en el Inicio (punto 4 y DT-04).
10. `objetivos-y-metricas.md` §2 declara Performance ≥ 95 como requisito de cada iteración; el nuevo criterio del DoD de
    la Épica 08 (§10.3) acepta un Performance menor que la referencia. No bloquea: lo fijó el desarrollador en el chat
    (precedencia 1 de `_planificacion/README.md` §2.2), pero conviene que lo decida explícitamente para ese documento.

---

## 10. Ajuste 2: línea base de Lighthouse, cierre de DT-14, criterio del DoD y propuestas finales

**Fecha:** 16-10-2026 · **Agente:** Claude Code · **Alcance autorizado:** `_planificacion/README.md` §12,
`decisiones-tecnicas.md` (lista "Consecuencias" del ADR-001), `definicion-epica.md` §8 (ítem de Lighthouse),
`iteracion-08.md` (líneas que fijan el criterio de Lighthouse), `propuestas-documentos-protegidos.md`, esta bitácora y
una línea en `estado-actual.md`.

### 10.1 Precondiciones (solo lectura)

* Rama `feat/migracion-astro`; árbol limpio al iniciar; Node `v24.16.0`; pnpm `11.24.0`.
* `referencia/lighthouse/`: 16 PDF; `referencia/` no aparece en `git status` (ignorada por `.gitignore`, línea 30).
* No se instaló nada, no se hicieron peticiones de red y no se ejecutó Lighthouse.

### 10.2 Cambios realizados

| Archivo | Cambio |
|:--------|:-------|
| `_planificacion/README.md` §12 | DT-14 marcada ✅ **Resuelta** con la verificación en producción del 16-10-2026 y su salvedad. Nueva fila **DT-21** "Rendimiento móvil por debajo del umbral" (Media; destino pendiente de decisión). |
| `definicion-epica.md` §8 | Ítem de Lighthouse reemplazado por el criterio de la §10.3. |
| `iteracion-08.md` | Tarea 3 y Escenario 2 alineados con la §10.3. |
| `decisiones-tecnicas.md` (ADR-001) | "Consecuencias": lista de documentos a actualizar antes de la It. 02 y en la It. 08; "ninguna aplicada todavía". |
| `propuestas-documentos-protegidos.md` | Reescrito como fuente única: A.1 a A.9 (con A1 a A3 integradas y la sección B de `README.md` completa) y B.1 (`DESIGN.md`, It. 08). La nota mínima del README queda **descartada**. 76 líneas `-` verificadas por programa contra el texto actual (0 excepciones). |
| Esta bitácora | §9 y §10. |
| `estado-actual.md` | Una línea al final. |

Las propuestas de la §8.2 (#1 a #4 y A1 a A3) no estaban transcritas en esta bitácora, solo descritas; se redactaron de
nuevo contra el texto vigente de cada archivo y quedan en `propuestas-documentos-protegidos.md`.

### 10.3 Criterio de Lighthouse del DoD de la Épica 08 (antes y después)

* **Antes** (`definicion-epica.md` §8): "Lighthouse de las 6 páginas igual o mejor que la línea base; CLS = 0."
* **Después:** "Lighthouse de las 6 páginas, en móvil y escritorio: el sitio actual (producción) y el nuevo (vista previa
  de la rama) se miden en la misma sesión, 3 corridas por página y modo, y se comparan las medianas. Aceptación:
  Performance no más de 10 puntos por debajo (móvil) ni de 3 (escritorio) de la mediana de referencia; Accesibilidad,
  Best Practices y SEO no menores que la referencia; CLS mediano ≤ 0,1 y no mayor que el de referencia más 0,01. El LCP
  se registra sin umbral. La 404 se mide en una ruta anidada (/a/b/inexistente). La línea base del 16-10-2026 (bitácora
  de la It. 01, §9) es histórica y no es la referencia de comparación."
* `iteracion-08.md`: Tarea 3 ("cada métrica igual o mejor que la línea base de la It. 01; CLS = 0") y Escenario 2
  ("se compara con la línea base… ninguna métrica empeora y CLS = 0") remiten ahora a ese criterio.
* Apariciones que **no** se editaron (fuera del alcance autorizado; solo se reportan):
    * `definicion-epica.md` L168 (§6, plan de iteraciones, fila 08): "Lighthouse ≥ línea base". Contradice el nuevo
      criterio.
    * `definicion-epica.md` L161 (§6, fila 01): "instantánea de referencia de las 6 páginas (HTML, capturas,
      Lighthouse)". No contradice.
    * `iteracion-08.md` L5: "equivalente (o mejor, en lo planificado) a la línea base de la Iteración 01". Habla de la
      paridad general; no fija el criterio de Lighthouse.
    * `iteracion-06.md` L68: "CLS = 0" como criterio de la tarea opcional de videos (no es de Lighthouse).
    * ADR-001: sin apariciones.

### 10.4 Discrepancia con el pedido

* El texto pedido para DT-21 decía "Performance móvil de 68 a 85 en las 5 páginas con contenido". Según los PDF, el rango
  de esas 5 páginas es **68 a 83** (mediana 74); el 85 corresponde a la 404 en `/a/b/inexistente`. DT-21 usa 68 a 83 y
  anota aparte 75 a 85 para la 404 (prevalece el PDF).

### 10.5 Estado de la iteración

**Completada con reservas** (no se marca cerrada). Reservas: propuestas documentales sin aplicar (bloquean el inicio de
la It. 02 por `AGENTS.md` §1); 13 de los 16 PDF cotejados solo por texto extraído; DT-14 cerrada sin inspeccionar la
pestaña Red ni el error de consola; el diagnóstico de DT-21 es solo de lectura.

### 10.6 Pendientes del desarrollador

1. Aplicar las propuestas A.1 a A.9 de `propuestas-documentos-protegidos.md` antes de la It. 02.
2. Decidir la iteración o épica destino de DT-21.
3. Decidir si los hallazgos de §9.7 pasan a deuda técnica (no se registraron).
4. Opcional: alinear `definicion-epica.md` §6 (fila 08, "Lighthouse ≥ línea base") con el nuevo criterio.
5. Revisar y hacer el commit.

### 10.7 Mensaje de commit sugerido

```text
Épica 08 - Iteración 01: Registra la línea base de Lighthouse, cierra DT-14, agrega DT-21, redefine el criterio de Lighthouse del DoD y consolida las propuestas de documentos protegidos.
```

Longitud contada con Node: 186 caracteres.

---

## 11. Ajuste 3 (cierre documental)

> **Corrección por decisión posterior del desarrollador (Ajuste 4):** el destino de las deudas de rendimiento pasó de
> "Épica 09 — Rendimiento" a "Épica 10 — Rendimiento". Los textos de esta sección ya reflejan el cambio; ver §12.

**Fecha:** 16-10-2026 · **Agente:** Claude Code · **Alcance autorizado:** `_planificacion/README.md` §12,
`definicion-epica.md` (solo la línea "Lighthouse ≥ línea base"), `propuestas-documentos-protegidos.md`, esta bitácora y
una línea en `estado-actual.md`. Precondiciones: rama `feat/migracion-astro`, árbol limpio (el ajuste 2 ya estaba
confirmado en el commit `b80d4bf`), Node `v24.16.0`, pnpm `11.24.0`. Sin red, sin instalaciones y sin ejecutar Lighthouse.

### 11.1 Decisiones del desarrollador registradas

* DT-21 (rendimiento móvil) tiene como destino la **Épica 10 — Rendimiento (por planificar)**, que se planificará después
  de cerrar la Épica 08. No se creó ninguna carpeta, archivo ni planificación de la Épica 10: solo se la nombra como destino.
* Los hallazgos fuera de alcance del ajuste 2 (§9.7) pasan a deuda técnica, agrupados en 4 deudas nuevas, todas con
  destino Épica 10. Esto reemplaza lo dicho en el encabezado de §9.7 ("sin deuda nueva salvo DT-21").
* Los umbrales de `objetivos-y-metricas.md` §2 son la **meta del sitio**, no un requisito de cada iteración. Las épicas
  estructurales (como la 08) aplican el criterio de no regresión de su propio DoD y la brecha queda como deuda. Se
  resuelve ajustando la propuesta A.8, sin editar el documento protegido. Esto cierra el hallazgo n.º 10 de §9.7.
* `AGENTS.md` lleva una nota de transición análoga a la de `README.md`.
* Pendiente del desarrollador: verificar si `lajardinerafloreria.cl` (sin `www`) redirige a `www.lajardinerafloreria.cl`
  (los PDF midieron el dominio sin `www`). Sin peticiones de red en este ajuste.

### 11.2 Deudas técnicas (`_planificacion/README.md` §12)

El §12 no enuncia criterios de severidad por escrito; se aplicó el que muestran sus filas: **Alta** = defecto visible que
rompe la página (DT-01); **Media** = afecta SEO, contraste, accesibilidad o rendimiento medidos (DT-04, DT-08, DT-13,
DT-21); **Baja** = sin efecto visible o solo de mantenimiento (DT-06, DT-11, DT-20).

| ID | Título | Severidad | Destino | Hechos (confirmados por código el 16-10-2026) |
|:---|:-------|:----------|:--------|:----------------------------------------------|
| DT-21 | Rendimiento móvil por debajo del umbral (existente) | Media | Épica 10 — Rendimiento (por planificar) | Solo cambió el destino (antes: "pendiente de decisión"). |
| DT-22 | Logotipos PNG sobredimensionados | Media | Épica 10 | 306.435 B y 229.345 B, 3446 × 3504 px, mostrados a 44 × 44 en las 6 páginas; el claro también es el favicon. Hipótesis: explican los 299 KiB de Lighthouse. |
| DT-23 | Imágenes sin `width`/`height` y `lazy` sobre el pliegue | Media | Épica 10 | 9 en `index.html` y 24 en `galeria.html` (conteo por programa: 9 de 9 y 24 de 24 son además `lazy`); Servicios L272 y Suscripción L261, L264 y L267. |
| DT-24 | Accesibilidad del Inicio (91) | Media | Épica 10 | `carousel.js` L28 (ARIA en `div` sin `role`) y 4 enlaces solo de ícono (`index.html` L614, L636, L660 y L683). |
| DT-25 | Orden de encabezados | Baja | Épica 10 | `index.html` L318 y L334 (`h4`) y `carousel.js` L42; `servicios.html` L288; `404.html` L239. |

**Duplicados:** ninguno. DT-04 (metadescripción del Inicio) ya cubre esa auditoría de SEO y no se repite; DT-06 y DT-17
no se relacionan con estos hechos. Se descartaron como deuda por ya estar planificados o no ser accionables: los videos de la
Galería (tarea opcional de la Épica 08 · It. 06), "Redistribución forzada" (origen no localizado) y "enlaces idénticos"
(revisión manual de Lighthouse).

### 11.3 Cambio en `definicion-epica.md` §6 (fila 08)

* **Antes:** `Render real 7 viewports × 2 temas, Lighthouse ≥ línea base, documentación actualizada, fusión a `main`.`
* **Después:** `Render real 7 viewports × 2 temas, Lighthouse según el criterio del §8 (medianas de 3 corridas en la misma sesión), documentación actualizada, fusión a `main`.`
* No había menciones de destino de deudas en ese documento que corregir. Ninguna otra línea se tocó.

### 11.4 Propuestas ajustadas (`propuestas-documentos-protegidos.md`)

* **Cabecera:** sección "Cómo aplicarlas" (única fuente vigente; `-` se borra, `+` se agrega; orden sugerido: `AGENTS.md`,
  `02-arquitectura`, `01-vision`, `_planificacion/README.md`, `README.md`).
* **A.1 (`AGENTS.md` §4):** bloque nuevo con la nota de transición bajo el título de la sección. Sin renumerar las demás.
* **A.8 (`objetivos-y-metricas.md`):** bloque nuevo que precisa el carácter de los umbrales en la introducción (texto
  exacto de las dos líneas actuales como `-`).
* Tabla de estado y observaciones de la §0 actualizadas. Siguen todas 🕒 pendientes de aplicar.
* **Verificación por programa:** 78 de 78 líneas `-` coinciden con el texto actual de su documento: `AGENTS.md` 22,
  `stack-tecnologico.md` 7, `proposito-y-alcance.md` 4, `_planificacion/README.md` 7, `objetivos-y-metricas.md` 5 y
  `README.md` 33. Sin excepciones. Las 31 líneas de contexto y los 29 bloques también coinciden como secuencia.

### 11.5 Estado

**Completada con reservas — pendiente que el desarrollador aplique las propuestas protegidas (Escenario 2) y verifique la
redirección del dominio sin www.** No se marca cerrada.

### 11.6 Pendientes del desarrollador

1. Aplicar A.1 a A.9 de `propuestas-documentos-protegidos.md` (Escenario 2 de la Iteración 01), antes de la Iteración 02.
2. Verificar si `lajardinerafloreria.cl` redirige a `www.lajardinerafloreria.cl` (🕒 PENDIENTE; no se hicieron peticiones).
3. Planificar las Épicas 09 (Revisión móvil) y 10 (Rendimiento) después de cerrar la Épica 08 (corregido por el Ajuste 4; antes decía "Épica 09").
4. Revisar y hacer el commit.

### 11.7 Mensaje de commit sugerido

```text
Épica 08 - Iteración 01: Registra DT-22 a DT-25 con destino Épica 10, ajusta la fila 08 del plan y agrega a las propuestas la nota de transición de AGENTS.md y el carácter de los umbrales.
```

---

## 12. Ajuste 4: cambio de destino de las deudas de rendimiento y registro de la solicitud de revisión móvil

**Fecha:** 16-10-2026 · **Agente:** Claude Code · **Alcance autorizado:** `_planificacion/README.md` (§12, o la sección que
la constitución indique para solicitudes), esta bitácora, `estado-actual.md` y `propuestas-documentos-protegidos.md` (solo
las menciones de "Épica 09 — Rendimiento"). Precondiciones: rama `feat/migracion-astro`; árbol con los cambios sin
confirmar del Ajuste 3 (5 archivos, los mismos que toca este ajuste); Node `v24.16.0`; pnpm `11.24.0`. Sin red, sin
instalaciones y sin ejecutar Lighthouse.

**Lectura:** se leyó completo `_planificacion/README.md` (1 a 246). `AGENTS.md` ya estaba cargado en la sesión y no cambió.
De la bitácora se releyeron las secciones 11.1 a 11.7 y, de `estado-actual.md`, sus últimas líneas. `definicion-epica.md`
no se releyó (ya leído en la sesión; solo cambió la fila 08, en el Ajuste 3). Ningún documento contradice a otro.

### 12.1 Decisiones del desarrollador registradas

1. Orden de las épicas siguientes a la 08, ambas **por planificar**: primero **Épica 09 — Revisión móvil del sitio** y
   después **Épica 10 — Rendimiento**. Esto reemplaza lo indicado en el Ajuste 3 ("Épica 09 — Rendimiento").
2. DT-21 y DT-22 a DT-25 pasan a destino **Épica 10 — Rendimiento (por planificar)**.
3. La solicitud sobre el hero móvil se registra como **solicitud de mejora**, no como deuda técnica, con destino
   **Épica 09 — Revisión móvil (por planificar)**. El registro debe poder ampliarse con nuevas solicitudes.
4. No se crean carpetas, archivos de épica ni planificación de las Épicas 09 y 10: solo se nombran como destino. Si la
   constitución no define dónde registrar solicitudes, no se inventa una estructura: se registra aquí y se proponen opciones.
5. El desarrollador aún no aplicó ninguna propuesta documental protegida; las aplicará a mano desde
   `propuestas-documentos-protegidos.md`.

### 12.2 Destinos corregidos

*Corrección por decisión posterior del desarrollador (Ajuste 4).* Se reemplazó "Épica 09 — Rendimiento" por
"Épica 10 — Rendimiento" en: `_planificacion/README.md` §12 (filas DT-21 a DT-25; el resto de cada fila quedó intacto),
`estado-actual.md` (línea del Ajuste 3), `propuestas-documentos-protegidos.md` (observaciones de la §0) y la §11 de esta
bitácora (11.1, 11.2, 11.6 y 11.7).

| ID | Título | Destino anterior | Destino vigente |
|:---|:-------|:-----------------|:----------------|
| DT-21 | Rendimiento móvil por debajo del umbral | Épica 09 — Rendimiento | Épica 10 — Rendimiento (por planificar) |
| DT-22 | Logotipos PNG sobredimensionados | Épica 09 — Rendimiento | Épica 10 — Rendimiento (por planificar) |
| DT-23 | Imágenes sin `width`/`height` y `lazy` sobre el pliegue | Épica 09 — Rendimiento | Épica 10 — Rendimiento (por planificar) |
| DT-24 | Accesibilidad del Inicio (91) | Épica 09 — Rendimiento | Épica 10 — Rendimiento (por planificar) |
| DT-25 | Orden de encabezados | Épica 09 — Rendimiento | Épica 10 — Rendimiento (por planificar) |

**Menciones de "Épica 09" encontradas** (búsqueda en todo el repositorio, sin `node_modules`, `dist`, `_site` ni
`referencia`): todas estaban en archivos autorizados y quedaron corregidas (`_planificacion/README.md` L230 a L234,
`estado-actual.md` L51, esta bitácora y `propuestas-documentos-protegidos.md` L55). No hay menciones en archivos no
autorizados. Tras el cambio, "Épica 09" solo aparece como Revisión móvil (decisión 3) y en las notas de corrección de esta sección y de la 11; ninguna mención la nombra como Rendimiento salvo la columna "Destino anterior" de la tabla de arriba.

### 12.3 Solicitud de mejora del hero móvil

**Dónde se registra.** La constitución (`_planificacion/README.md`) **no define** un lugar para solicitudes de mejora, ideas
o épicas futuras (confirmado por código: ninguna de sus 13 secciones lo contempla; el §12 es solo de deuda técnica). Por la
decisión 4 no se inventó una estructura: la solicitud queda **en esta bitácora** y se proponen las opciones siguientes.

| Opción | Descripción | Ventajas | Inconvenientes |
|:-------|:------------|:---------|:---------------|
| 1 (recomendada) | Sección nueva "§14 Registro de solicitudes de mejora" en `_planificacion/README.md`, con tabla análoga al §12 (ID, página, viewport, solicitud, destino, estado). | Un solo lugar, que todo agente lee en el protocolo de inicio (§4). Reutiliza el patrón del §12. Se amplía con una fila por solicitud. | Requiere autorización para editar otra sección de la constitución. |
| 2 | Archivo `_planificacion/03-planificacion/solicitudes-de-mejora.md`. | Admite el detalle completo de cada solicitud. | Cambia la estructura del §3 y agrega un archivo que hay que descubrir. |
| 3 | Esperar a planificar la Épica 09 y registrarlas en su `definicion-epica.md`. | Sin estructura nueva. | Mientras tanto quedan solo en bitácoras cerradas y se pueden perder. |

**Contenido registrado** (solicitud n.º 1; se numera solo para referencia dentro de esta bitácora):

| Campo | Valor |
|:------|:------|
| Página | Inicio (`index.html`, sección `#titular`) |
| Viewport | Móvil |
| Estado actual (según el desarrollador) | El título (`h1`) y el párrafo descriptivo del hero se ven demasiado grandes y la tarjeta de vidrio ocupa casi toda la pantalla. |
| Cambio solicitado | Reducir el tamaño del título y del párrafo; ocultar en móvil el ícono SVG y la fila "Valdivia, Región de Los Ríos, Chile"; dejar únicamente "Descubrir más" con la flecha hacia abajo. |
| Destino | Épica 09 — Revisión móvil (por planificar) |
| Estado | Pendiente de definir |

**Pendiente de definir con el desarrollador:** tamaños de texto objetivo; alineación de "Descubrir más"; comportamiento
desde 768 px; qué anchos exactos cuentan como "móvil". Además, la solicitud no menciona los dos botones del hero
("Explorar Servicios" y "Suscripción Floral", `index.html` L269 a L282): falta definir si se mantienen en móvil.

**Consideraciones (recomendación del asesor, no decisión):**

* **(a)** No hacerlo durante la Épica 08: exige paridad visual y su línea base se tomó con el hero actual.
* **(b)** El contraste del hero se calibró en la Épica 01 · Iteración 08 (tinte mínimo /45, métrica de percentil 95 de la
  tarjeta, 7 viewports, 2 temas). Cualquier cambio de tamaño o de composición exige repetir esa medición.
* **(c)** Los tamaños deben salir de la escala de `DESIGN.md`; si falta alguno, se entrega como propuesta de edición que
  aplica el desarrollador.
* **(d)** Ocultar la ubicación quita texto visible con señal local. Conviene que "Valdivia" quede visible en otro lugar
  (confirmado por código: hoy aparece además en el `<title>` L4, en el cuerpo L321, L489, L527 y L809, y en el footer L906;
  la metadescripción del Inicio aún no existe, DT-04, Iteración 05).

**Estado actual del hero en código — confirmado por código** (`index.html`, sección `#titular` desde L241):

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

Observaciones: la ubicación y "Descubrir Más" comparten el mismo contenedor (L284), por lo que ocultar solo la ubicación
exige una clase propia en su contenedor (L285). `DESIGN.md` (L50 y L52) define `display-hero-mobile` (40/48 px) y
`headline-xl-mobile` (32/40 px), y `headline-xl` mide 48/56 px (L51); el `h1` actual usa `text-headline-xl` hasta `lg`.
No se midió el tamaño renderizado: es 🕒 PENDIENTE para la Épica 09.

**Capturas existentes — confirmado por código** (`referencia/capturas/`, fuera de Git; los nombres codifican solo el
ancho): `index-320-claro.png`, `index-320-oscuro.png`, `index-360-claro.png`, `index-360-oscuro.png`,
`index-412-claro.png` e `index-412-oscuro.png`. Existen además `index-740`, `index-768`, `index-1024` e `index-1280`, en claro
y oscuro. No se abrió ni modificó ninguna.

### 12.4 Observaciones de la sesión de pruebas del desarrollador

No se creó ninguna deuda técnica a partir de estas observaciones.

**a) Dominio efectivo.**
* *Reportado por el desarrollador* (captura de la pestaña Red de DevTools, con la fecha del reloj del sistema):
  `www.lajardinerafloreria.cl` responde **301** y redirige a `lajardinerafloreria.cl`, que responde **200**. El dominio
  efectivo es el apex, sin `www`. No lo verifiqué (sin red). Es coherente con que los PDF de Lighthouse midieran el
  dominio sin `www`, y contradice la suposición de la especificación de la Épica 07 · It. 04 (L197: el apex redirige a `www`).
* *Confirmado por código* — apariciones de `www.lajardinerafloreria.cl` en archivos versionados (36 en total, antes de
  este ajuste):
  * **HTML, `src/`, `public/`, `scripts/` y configuración** (`package.json`, `tailwind.config.js`): **0**. Hoy no hay
    `canonical`, `sitemap.xml` ni Open Graph (DT-08).
  * Documentos protegidos: `AGENTS.md` L4; `DESIGN.md` L4; `README.md` L8, L63 y L167 (L63 y L167 nombran ambos dominios).
  * Especificaciones: Épica 07 `definicion-epica.md` L112 y L119; `iteracion-01.md` L131; `iteracion-03.md` L143;
    `iteracion-04.md` L39, L40, L64 a L68, L71, L91, L105, L114 a L118, L138, L196 y L197. Épica 08 `iteracion-01.md` L62 e
    `iteracion-02.md` L73 (`site: 'https://www.lajardinerafloreria.cl'` en el ejemplo de `astro.config.mjs`).
  * Bitácoras: Épica 07 `bitacora-cierre-epica-07.md` L94; `bitacora-iteracion-01.md` L289 y L419;
    `bitacora-iteracion-03.md` L263. Épica 08 `bitacora-iteracion-01.md` L94, L493 y L541.
* Para la Iteración 05 (SEO): el dominio canónico, el `site` de Astro, el `sitemap.xml` y `robots.txt` deben alinearse con
  el dominio efectivo; `AGENTS.md`, `README.md` y `DESIGN.md` (protegidos) tendrían que corregirse mediante propuesta.

**b) Scripts de Cloudflare (hipótesis, sin verificar).**
* *Reportado por el desarrollador:* en esa captura aparecen `email-decode.min.js` (1,0 kB) y `beacon.min.js` (10,5 kB),
  iniciados desde las líneas 977 y 978 del HTML. *Hipótesis:* los nombres corresponden típicamente a scripts que
  Cloudflare inyecta (ofuscación de correos y analítica web).
* *Confirmado por código:* "email-decode", "beacon", "cdn-cgi" y "cloudflareinsights" tienen **0 coincidencias** en el
  repositorio (6 HTML, `src/`, `public/`, `scripts/`, configuración, `dist/` y `_site/` locales). El `index.html` local
  tiene 979 líneas y su único `<script>` es el módulo de L978 (`type="module" src="./src/js/main.js"`); el HTML local
  contiene una dirección de correo (L888 y L895). `AGENTS.md` §9 indica que Cloudflare Web Analytics se gestiona fuera del
  código. No se comparó con el HTML publicado.
* *Registro:* si la hipótesis se confirma, el invariante "0 `<script>` sin `src`" se verifica sobre la salida del build
  (`_site/`) y no sobre la página publicada.

**c) `servicio-novias.webp` en la carga inicial (hipótesis, sin verificar).**
* *Reportado por el desarrollador:* en un emulador de 360 × 800, `servicio-novias.webp` (1.053 kB) figura entre las
  solicitudes de la carga inicial del Inicio.
* *Confirmado por código:* `index.html` L371 la declara con `loading="lazy"` (ver §9.6 de esta bitácora). No se concluye
  causa ni efecto sobre el LCP; queda 🕒 PENDIENTE de medición para la Épica 10.

### 12.5 Estado

**Completada con reservas — pendiente que el desarrollador aplique las propuestas protegidas** (Escenario 2) y que
decida dónde registrar las solicitudes de mejora (§12.3). No se marca cerrada. Verificación: solo los 5 archivos
autorizados modificados; archivos prohibidos sin cambios; sin red, instalaciones ni Lighthouse.

### 12.6 Pendientes del desarrollador

1. Aplicar A.1 a A.9 de `propuestas-documentos-protegidos.md`, antes de la Iteración 02. 🕒
2. Decidir la ubicación del registro de solicitudes de mejora (§12.3, opciones 1 a 3).
3. Definir con el asesor los puntos pendientes de la solicitud n.º 1 (§12.3) y sumar las siguientes solicitudes.
4. Decidir el dominio canónico para la Iteración 05, a la luz de la redirección 301 reportada.
5. Planificar las Épicas 09 (Revisión móvil) y 10 (Rendimiento) después de cerrar la Épica 08.
6. Revisar y hacer el commit.

### 12.7 Mensaje de commit sugerido

Reemplaza al de §11.7, porque los cambios de los Ajustes 3 y 4 siguen sin confirmar:

```text
Épica 08 - Iteración 01: Registra DT-22 a DT-25, reasigna las deudas de rendimiento a la Épica 10 y deja registrada la solicitud de revisión móvil del hero y las observaciones de las pruebas.
```
