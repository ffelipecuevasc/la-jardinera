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
