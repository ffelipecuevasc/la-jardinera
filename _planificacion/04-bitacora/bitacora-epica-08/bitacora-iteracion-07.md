# Bitácora de Ejecución - Épica 08 - Iteración 07

**Fecha de ejecución:** 19-10-2026
**Agente:** Claude Code
**Objetivo:** Que la primera imagen de cada página ya tenga el tema correcto (DT-15 / A-05), sin cambiar cómo se elige ni cómo se alterna el tema. Iteración opcional que requirió una excepción a la regla «cero JS en línea».

Especificación: [`iteracion-07.md`](../../03-planificacion/epicas/epica-08-migracion-astro/iteracion-07.md) · Iteración anterior: [`bitacora-iteracion-06.md`](bitacora-iteracion-06.md)

Rótulos de evidencia: **[código]** confirmado por código, comandos o programa; **[render]** medido en Chrome headless (`155.0.8059.84`, leído con `Browser.getVersion`); **[informado]** dato entregado por el desarrollador; **🕒 PENDIENTE** no verificado. Las cifras de tiempo son de esta máquina y de este arnés; no son métricas de producción.

---

## 1. Resumen ejecutivo

* El destello **se reprodujo** antes de editar: con el sistema en modo oscuro, sin `theme` guardado y red «3G rápida» emulada, **20 de 20 corridas** (Inicio y Galería, 360 × 740 y 1280 × 800, 5 cada una) tuvieron un primer fotograma **claro**, seguido del oscuro (mediana 47 ms, entre 13 y 165 ms). [render]
* Se agregó **un único `<script is:inline>`** en el `<head>` de `BaseLayout.astro`, justo después de `<meta charset>` y antes de todo lo demás. Con él: **0 de 20** corridas con fotograma claro; el primer fotograma real fue oscuro en las 20. [render]
* El script aplica **la misma regla** que `setInitialTheme()` en 10 de 10 combinaciones (guardado `null`, `'dark'`, `'light'`, `''` y `'basura'` × sistema oscuro y claro) y no escribe en `localStorage`. [render]
* Alternar el tema, recargar y navegar con clics reales entre las 6 páginas conserva la elección: 24 de 24 comprobaciones (sistema oscuro y claro), con consola sin mensajes. [render]
* **Desviación autorizada en `theme.js`:** con `localStorage` bloqueado, `setInitialTheme()` lanzaba `SecurityError` y el botón de tema quedaba inerte (12 de 12 casos). Se corrigió con `try/catch` mínimo (`readTheme` y `saveTheme`); con almacenamiento disponible el comportamiento es idéntico (§6.3 y §7).
* `pnpm run build:cf`: código 0, "6 page(s) built", 0 advertencias, 109 archivos. El CSS es idéntico byte a byte a la base de la It. 06; el `<body>` de las 6 páginas es idéntico, y lo único nuevo del `<head>` es el script. [código]
* La excepción quedó registrada como **ADR-003** en `decisiones-tecnicas.md`. Las propuestas para los archivos protegidos y de la épica están en §8 (12 propuestas, ninguna aplicada).
* Estado: **Completada con reservas** (§10): sin revisión en la vista previa de Cloudflare y con render solo en 2 de los 7 viewports y solo en Chrome headless. No está 🔒 Cerrada: eso ocurre solo con la fusión a `main`.

## 2. Línea base (estado previo)

| Dato | Valor | Origen |
|:-----|:------|:-------|
| Rama / `HEAD` | `feat/migracion-astro` / `d4d1407` | `git log` |
| Árbol de trabajo | Limpio al iniciar | `git status` |
| Compilación base | `pnpm run build:cf`: código 0, "6 page(s) built", 0 líneas con "warn" o "error", **109 archivos** | salida de `astro build`, `find` [código] |
| Archivos de `_site/_astro/` | CSS `BaseLayout.744HEtGc.css`; JS `BaseLayout.astro_astro_type_script_index_0_lang.5-O1sJDE.js` | `ls` [código] |
| Copia de la base | `referencia/it06-base/` (109 archivos); ignorada por Git: `.gitignore:30:referencia/` (`git check-ignore -v`) | `cp -r`, `git check-ignore` [código] |
| Lectura previa | `AGENTS.md`, la especificación de la It. 07, `decisiones-tecnicas.md`, `estado-actual.md`, la definición de la épica (A-05 y DoD), la bitácora de la It. 06 y la §4.6 de la It. 04; `README.md`, `DESIGN.md`, `_planificacion/README.md` y `stack-tecnologico.md` solo en las líneas pertinentes (por búsqueda de texto) | — |

## 3. Tarea 0: medición previa del destello [render]

### 3.1 Método

* **Navegador:** Chrome `155.0.8059.84` headless (`--headless=new`), perfil aislado en la carpeta temporal del agente, controlado por el protocolo de depuración desde scripts **fuera del repositorio**, sin dependencias nuevas (como en la It. 04). Nunca se ejecutó `chrome.exe` con `--version` ni sin `--headless`; la versión salió de `Browser.getVersion`.
* **Sitio:** `pnpm preview` en `127.0.0.1:4321` sobre la compilación de la base.
* **Condiciones:** `prefers-color-scheme: dark` emulado (`Emulation.setEmulatedMedia`); un contexto de navegador nuevo por corrida (almacenamiento vacío, sin `theme`); caché desactivada; red «3G rápida» de DevTools (`Network.emulateNetworkConditions`: 562,5 ms de latencia, 188.744 B/s de bajada, 86.400 B/s de subida); `fonts.googleapis.com`, `fonts.gstatic.com` y los `.mp4` bloqueados (sin red externa: la tipografía es la de reserva del sistema y **esto no reproduce la apariencia de producción**).
* **Qué se midió:** (a) **fotogramas reales** con `Page.startScreencast` (PNG reducido a un tercio), clasificados por el color de la esquina del header: claro (≈ `#F8F9F4`), oscuro (`#1F2421`) o lienzo previo a la página; (b) clase de `<html>` y su cambio con `MutationObserver`; (c) `first-paint` y `first-contentful-paint` con `PerformanceObserver`; (d) tiempos de `DOMContentLoaded` y de los recursos. Páginas: Inicio y Galería, a 360 × 740 y 1280 × 800, **5 corridas** cada una (20 en total).
* **Instrumento pasivo:** una primera versión del instrumento leía estilos calculados (`getComputedStyle`); se descartó porque fuerza un cálculo de estilo y puede alterar lo medido. Las cifras son del instrumento sin lecturas de estilo.

### 3.2 Resultado

| Página y viewport | Corridas | Primer fotograma real | Con fotograma claro antes del oscuro | `dark` en el DOM (mediana) | 1.er fotograma claro (mediana) | Duración del claro (mediana) | `first-paint` (mediana) |
|:------------------|:--------:|:---------------------:|:------------------------------------:|:--------------------------:|:------------------------------:|:----------------------------:|:-----------------------:|
| Inicio 360 × 740 | 5 | claro (5 de 5) | **5 de 5** | 1.553 ms | 1.683 ms | 22 ms | 1.684 ms |
| Inicio 1280 × 800 | 5 | claro (5 de 5) | **5 de 5** | 1.526 ms | 1.688 ms | 65 ms | 1.704 ms |
| Galería 360 × 740 | 5 | claro (5 de 5) | **5 de 5** | 1.544 ms | 1.619 ms | 52 ms | 1.624 ms |
| Galería 1280 × 800 | 5 | claro (5 de 5) | **5 de 5** | 1.495 ms | 1.552 ms | 53 ms | 1.556 ms |
| **Total** | **20** | claro (20 de 20) | **20 de 20** | 1.520 ms | 1.619 ms | 47 ms (13 a 165) | 1.624 ms (1.548 a 2.476) |

Tiempos desde el inicio de la navegación. «Duración del claro» = del primer fotograma claro al primer fotograma oscuro. `DOMContentLoaded`: mediana 1.520 ms; CSS (`responseEnd`): mediana 1.382 ms.

**Secuencia típica (Galería, 360 × 740, corrida 0):** lienzo oscuro vacío → página **clara** a 1.619 ms → página **oscura** a 1.671 ms. Se revisaron a ojo el primer fotograma (página clara completa) y el tercero (página oscura) de esa corrida. **Veredicto: el destello se reproduce; la iteración sigue.**

**Observación sin resolver:** el primer fotograma claro se registra entre 57 y 162 ms **después** de que `theme.js` ya había dejado `dark` en el DOM (mediana: 1.520 ms el cambio, 1.619 ms el fotograma). No se determinó el mecanismo exacto (hipótesis por código, sin verificar: el CSS ya se había aplicado en claro antes de `DOMContentLoaded` y hay elementos con `transition-colors`). No cambia la conclusión: el estado claro previo existe y el script de arranque lo elimina (medición posterior, §6.1).

## 4. Tarea 1: script de arranque

### 4.1 Script final [código]

Ubicación: `src/layouts/BaseLayout.astro`, justo después de `<meta charset="utf-8"/>`.

```html
    <script is:inline>
        // Excepción documentada (decisiones-tecnicas.md, ADR-003): fija el tema antes del primer pintado.
        // Misma regla que setInitialTheme() de src/js/modules/theme.js; no escribe en localStorage.
        (function () {
            let guardado = null;
            try { guardado = localStorage.getItem('theme'); } catch (e) { /* almacenamiento bloqueado: manda el sistema */ }
            const oscuro = guardado === 'dark' || (!guardado && window.matchMedia('(prefers-color-scheme: dark)').matches);
            const clases = document.documentElement.classList;
            clases.remove(oscuro ? 'light' : 'dark');
            clases.add(oscuro ? 'dark' : 'light');
        })();
    </script>
```

La regla es la de `setInitialTheme()`: `dark` si el guardado es `'dark'` o (no hay guardado y el sistema prefiere oscuro); si no, `light`. Quita solo la clase contraria, de modo que `<html class="light bg-background text-on-surface">` no pierde ni duplica clases. Es una función autoejecutable, sin variables globales y sin escritura en `localStorage`.

### 4.2 Orden real del `<head>` en `_site/` [código]

Astro **no reubicó** el script (lo emite como `<script>`, sin el atributo `is:inline`) y sí colocó la hoja de estilo del sitio **al final** del `<head>`. Orden en las 6 páginas (la 404 no lleva `canonical` ni `og:*`):

```text
<meta charset> → <script> (tema) → <title> → <meta description> → [canonical, og:*, twitter:card] → <link rel="icon"> → <meta viewport> → <link preconnect> ×2 → <link stylesheet> (Google Fonts) → <link stylesheet> (/_astro/BaseLayout.744HEtGc.css)
```

Posición en el texto (`indexOf`): `<meta charset` en 88, `<script>` en 115 y la primera hoja de estilo entre 1.387 (404) y 2.491 (Contacto), en las 6 páginas. El script mide **717 caracteres** (722 con la sangría y el salto de línea) y su SHA-256 es `5b490c26120413aecf117c5878853be7a0b336afbc0a18cabb2e9c73e6fa0d1c`; es el mismo en las 6.

### 4.3 `setInitialTheme()` en `theme.js`

**Se conserva** (decisión por defecto): repite la misma regla y es idempotente; así el comportamiento normal no cambia, incluida la escritura de `theme` en `localStorage` en la primera visita. Quitarlo no se justificó.

## 5. Tarea 2: excepción documentada

* `decisiones-tecnicas.md`: se agregó **ADR-003 — Excepción a la regla de JS en línea: script de arranque del tema** (formato de ADR-001 y ADR-002, numeración correlativa), con contexto, el contenido exacto permitido (copia del script final, comprobada por programa contra `BaseLayout.astro`), la prohibición de cualquier otro script en línea, el criterio de verificación, las alternativas descartadas y las consecuencias. +64 líneas; CRLF y BOM conservados. [código]
* Las propuestas para los archivos protegidos y de la épica están en §8. **Ninguna está aplicada.**

## 6. Tarea 3: verificación

### 6.1 Medición posterior (mismas condiciones que la Tarea 0) [render]

Sobre la compilación final (con el cambio de `theme.js`), mismo sitio, mismos viewports, mismas 5 corridas por página y mismas condiciones de red.

| Página y viewport | Corridas | Primer fotograma real | Con fotograma claro antes del oscuro | `dark` en el DOM (mediana) | `first-paint` (mediana) |
|:------------------|:--------:|:---------------------:|:------------------------------------:|:--------------------------:|:-----------------------:|
| Inicio 360 × 740 | 5 | oscuro (5 de 5) | **0 de 5** | 600 ms | 1.620 ms |
| Inicio 1280 × 800 | 5 | oscuro (5 de 5) | **0 de 5** | 607 ms | 1.648 ms |
| Galería 360 × 740 | 5 | oscuro (5 de 5) | **0 de 5** | 611 ms | 1.540 ms |
| Galería 1280 × 800 | 5 | oscuro (5 de 5) | **0 de 5** | 605 ms | 1.520 ms |
| **Total** | **20** | oscuro (20 de 20) | **0 de 20** | ≈ 605 ms | 1.556 ms (1.468 a 2.452) |

La clase `dark` queda puesta mientras se analiza el `<head>` (≈ 0,6 s), unos 0,8 s antes de que llegue el CSS (mediana 1.373 ms). `DOMContentLoaded`: mediana 1.503 ms (antes 1.520 ms) y `first-paint`: 1.556 ms (antes 1.624 ms): sin deterioro apreciable de los tiempos. Consola: 0 mensajes en las 20 corridas. Una corrida intermedia, hecha antes del cambio de `theme.js`, dio también 0 de 20.

### 6.2 Alternar, recargar y navegar conserva la elección [render]

Una sesión persistente por modo de sistema; clics reales con `Input.dispatchMouseEvent`; 1280 × 800; red sin limitar. 24 de 24 comprobaciones correctas (12 por modo de sistema):

1. Primera carga sin almacenamiento: sigue al sistema (oscuro o claro) y guarda `theme`.
2. Clic en el botón: alterna y guarda el nuevo valor.
3. Recargar: conserva la elección.
4. Clic en el menú hacia Servicios, Suscripción Floral, Galería, Contacto e Inicio: conserva la elección en cada página.
5. Página 404 (`/ruta-inexistente`): conserva la elección.
6. Alternar de vuelta y navegar a Galería: conserva la nueva elección.
7. Consola sin errores ni advertencias (se excluye el 404 del propio documento de la ruta inexistente).

Salvedad: la clase «al primer pintado» de esta prueba se lee en la devolución de llamada de `PerformanceObserver` (después del pintado), por lo que es evidencia más débil que la de los fotogramas de §6.1; no hay medición de fotogramas con tema guardado y sistema opuesto.

### 6.3 `localStorage` bloqueado [render]

Bloqueo simulado con `Page.addScriptToEvaluateOnNewDocument`: `localStorage` lanza `SecurityError` («Access is denied for this document.») al leerlo. 12 casos: 6 páginas × sistema oscuro y claro.

| Estado | Página con el tema del sistema | Botón de tema | Consola |
|:-------|:------------------------------:|:-------------:|:--------|
| Antes del cambio en `theme.js` (con el script de arranque) | 12 de 12 | **no alterna** (0 de 12) | **error** en 12 de 12: `[main.js] Falló "initTheme": SecurityError: Failed to read the 'localStorage' property...` |
| Después del cambio mínimo en `theme.js` | 12 de 12 | alterna (12 de 12) | 0 mensajes en 12 de 12 |

**Desviación del criterio:** con el script de arranque solo, la página cargaba con el tema del sistema (el script no falla), pero `initTheme()` abortaba en `localStorage.getItem` antes de registrar el evento del botón. Por eso se aplicó el cambio mínimo autorizado en `theme.js` (§7). Con almacenamiento bloqueado, la elección del botón vale solo para esa página (no se puede guardar), igual que cualquier sitio sin almacenamiento.

### 6.4 Misma regla que `setInitialTheme()` [render]

10 de 10 combinaciones: guardado `null`, `'dark'`, `'light'`, `''` y `'basura'` × sistema oscuro y claro. En cada una, el script de arranque y `setInitialTheme()` (ejecutado desde el código fuente real de `theme.js`) dejan el mismo conjunto de clases, y el script de arranque no modifica `localStorage`. Diferencia solo de orden de clases en el caso claro (`theme.js` pone `light` al final); sin efecto.

### 6.5 Invariantes sobre `_site/**/*.html` [código]

| Comprobación | Resultado en las 6 páginas |
|:-------------|:---------------------------|
| `<script>` sin `src` | **exactamente 1 por página**, dentro del `<head>`; **un solo texto distinto** en las 6 (idéntico carácter a carácter; 717 caracteres) |
| `<script>` con `src` | 1 por página (`main.js` procesado por Astro, `type="module"`) |
| `style=`, `onclick`, `<style>`, `href="#"` | 0, 0, 0 y 0 |
| IDs duplicados | 0 |
| Orden en el `<head>` | `<meta charset>` < script < primera hoja de estilo (§4.2) |

### 6.6 Compilación y comparación con la base [código]

* `pnpm run build:cf`: código 0; "6 page(s) built"; 0 líneas con "warn" o "error"; **109 archivos** (igual que la base).
* **CSS:** `cmp` sin diferencias frente a `referencia/it06-base/_astro/BaseLayout.744HEtGc.css` (idéntico byte a byte; no hay clases nuevas).
* **JS:** cambia el nombre con *hash* (`...D-7eLN3d.js`, antes `...5-O1sJDE.js`) porque cambió `theme.js`: 27.059 B frente a 27.074 B. Es la única diferencia entre los dos paquetes que se esperaba.
* **HTML:** `diff -rq _site referencia/it06-base` lista solo las 6 páginas y los dos nombres del JS. Quitando el bloque del script y sustituyendo el nombre del JS, cada documento HTML es **idéntico carácter a carácter** a la base, y el `<body>` también (con el mismo reemplazo del nombre del JS). Cada página crece 722 caracteres (Inicio: 88.897 → 89.619).
* `node scripts/comparar-con-referencia.mjs referencia/it06-base` (código de salida 0): **diferencias de `<body>` no esperadas: 0** en las 6 páginas; tokens del `<body>` iguales en base y salida (1.571, 1.238, 1.173, 1.544, 840 y 532); **2** diferencias «esperadas» por página (el `src` del `<script type="module">`, que cambió de nombre) y **4** de `<head>` por página (las etiquetas del script nuevo: `<script>`, su texto, `</script>` y un espacio).

### 6.7 Git [código]

`git status --short`: solo `src/js/modules/theme.js`, `src/layouts/BaseLayout.astro`, `_planificacion/04-bitacora/decisiones-tecnicas.md` y `_planificacion/04-bitacora/estado-actual.md` modificados, y la bitácora nueva sin seguimiento. Ningún archivo protegido modificado. Ningún comando de Git que escriba.

## 7. Cambios por archivo

| Archivo | Cambio |
|:--------|:-------|
| `src/layouts/BaseLayout.astro` (CRLF) | +12 líneas: el `<script is:inline>` de arranque del tema (§4.1), entre `<meta charset>` y `<title>`. |
| `src/js/modules/theme.js` (BOM, LF, sin salto final; **desviación autorizada**) | +22 −5 líneas. Se agregaron `readTheme()` y `saveTheme(value)` (ambas con `try/catch`) y los 5 accesos a `localStorage` pasaron a usarlas. `setInitialTheme()`, `switchTheme()`, el botón y la View Transitions API no cambian. **Motivo:** con `localStorage` bloqueado `setInitialTheme()` lanzaba `SecurityError` antes de registrar el evento del botón (§6.3). Con almacenamiento disponible el comportamiento es idéntico (§6.4 y §6.2). BOM, LF y falta de salto final conservados. |
| `_planificacion/04-bitacora/decisiones-tecnicas.md` (BOM, CRLF) | +64 líneas: ADR-003 (§5). |
| `_planificacion/04-bitacora/estado-actual.md` (BOM, CRLF, sin salto final) | Una línea agregada al final; la última línea anterior pasa a terminar en `\r\n` (1 línea modificada en el diff, más la nueva). |
| `_planificacion/04-bitacora/bitacora-epica-08/bitacora-iteracion-07.md` (nuevo, CRLF) | Esta bitácora. |

Sin cambios en `package.json`, `pnpm-lock.yaml`, `tailwind.config.js`, `input.css`, `main.js`, los demás módulos ni los archivos protegidos.

## 8. Propuestas de edición para archivos protegidos y de la épica

Ninguna se aplicó (`AGENTS.md` §2). Las líneas `-` se tomaron textualmente de los archivos por programa (12 de 12 bloques con sus líneas actuales). Las propuestas A a I tocan archivos protegidos o sujetos a autorización del desarrollador; J a L son de la definición de la épica 08.

### Propuesta de edición — `AGENTS.md`
**Sección:** §5 Reglas de arquitectura, regla 2
**Líneas:** 115 a 116
**Motivo:** La regla prohíbe `<script is:inline>` sin excepciones; la Iteración 07 incorpora el script de arranque del tema aprobado por el desarrollador.
```diff
- 2. **Cero JS y CSS en línea.** Prohibidos `style="..."`, `onclick`, `<script is:inline>` y `<style>` en archivos
-    `.astro`. El único `<script>` permitido es el del layout que carga `src/js/main.js`.
+ 2. **Cero JS y CSS en línea.** Prohibidos `style="..."`, `onclick`, `<script is:inline>` y `<style>` en archivos
+    `.astro`, con una única excepción: el script de arranque del tema del `<head>` de `BaseLayout.astro` (ADR-003 de
+    `decisiones-tecnicas.md`), idéntico en las 6 páginas. Fuera de él, el único `<script>` permitido es el del layout
+    que carga `src/js/main.js`.
```

### Propuesta de edición — `AGENTS.md`
**Sección:** §7 Verificación mínima, segunda viñeta
**Líneas:** 160 a 161
**Motivo:** El invariante «0 `<script>` sin `src`» ya no se cumple: queda exactamente uno por página.
```diff
- - Búsquedas de invariantes en `_site/**/*.html`: 0 `style="`, 0 `onclick`, 0 `<style>`, 0 `<script>` sin `src`,
-   0 `href="#"` en navegación y footer, IDs únicos.
+ - Búsquedas de invariantes en `_site/**/*.html`: 0 `style="`, 0 `onclick`, 0 `<style>`, exactamente 1 `<script>` sin `src`
+   (el de arranque del tema, idéntico en las 6 páginas), 0 `href="#"` en navegación y footer, IDs únicos.
```

### Propuesta de edición — `_planificacion/README.md`
**Sección:** §6 Reglas de acero, punto 2
**Líneas:** 105
**Motivo:** Resumen de `AGENTS.md` §5; debe reflejar la excepción.
```diff
- 2. Cero JS y CSS en línea (`style=`, `onclick`, `<script is:inline>`, `<style>` en `.astro`).
+ 2. Cero JS y CSS en línea (`style=`, `onclick`, `<script is:inline>`, `<style>` en `.astro`), salvo el script de arranque del tema (ADR-003).
```

### Propuesta de edición — `_planificacion/README.md`
**Sección:** §7 Estándar de verificación, punto 2
**Líneas:** 119 a 120
**Motivo:** Mismo invariante que `AGENTS.md` §7.
```diff
- 2. **Invariantes por búsqueda de texto** en `_site/**/*.html`: `style=`, `onclick`, `<style>`, `<script>` sin `src`,
-    `href="#"`, IDs únicos, ausencia de `fixed` dentro del `<header>`.
+ 2. **Invariantes por búsqueda de texto** en `_site/**/*.html`: `style=`, `onclick`, `<style>`, `<script>` sin `src` (uno solo
+    por página: el de arranque del tema, ADR-003), `href="#"`, IDs únicos, ausencia de `fixed` dentro del `<header>`.
```

### Propuesta de edición — `_planificacion/README.md`
**Sección:** §12 Registro de deuda técnica, fila DT-15
**Líneas:** 232
**Motivo:** La deuda se resuelve en la Iteración 07 (verificada en Chrome headless; la vista previa de Cloudflare queda 🕒 PENDIENTE).
```diff
- | DT-15 | El tema oscuro se aplica en `DOMContentLoaded`: destello claro en la carga para quien prefiere modo oscuro. | Media | Épica 08 · It. 07 (opcional, requiere excepción) |
+ | DT-15 | ✅ **Resuelta** (Épica 08 · Iteración 07, 19-10-2026). El tema oscuro se aplicaba en `DOMContentLoaded` y quien prefiere modo oscuro veía un destello claro en la carga. Un único `<script is:inline>` en el `<head>` de `BaseLayout.astro` (excepción aprobada, ADR-003 de `decisiones-tecnicas.md`) fija `dark` o `light` antes del primer pintado. Medido en Chrome 155 headless (sistema oscuro, sin tema guardado, red 3G rápida emulada, Inicio y Galería a 360 × 740 y 1280 × 800): antes, 20 de 20 corridas con un fotograma claro previo al oscuro; después, 0 de 20. Además `theme.js` ya no falla con `localStorage` bloqueado (`readTheme` y `saveTheme`). 🕒 PENDIENTE: vista previa de Cloudflare, Firefox, Safari y dispositivo real. | Media | Épica 08 · It. 07 |
```

### Propuesta de edición — `DESIGN.md`
**Sección:** §5 Deuda de diseño conocida, nota 7
**Líneas:** 317 a 318
**Motivo:** La nota describe como pendiente el destello que la Iteración 07 resuelve.
```diff
- 7. **FOUC del tema:** `theme.js` aplica `.dark` después del primer pintado. Resolverlo exige un script bloqueante en
-    `<head>`, que choca con la regla "cero JS en línea"; requiere una excepción documentada.
+ 7. **FOUC del tema (resuelto en la Épica 08 · Iteración 07, 19-10-2026):** un único `<script is:inline>` en el `<head>` de
+    `BaseLayout.astro` deja `dark` o `light` en `<html>` antes del primer pintado (excepción documentada en el ADR-003 de
+    `decisiones-tecnicas.md`). `theme.js` conserva el botón de alternancia y la View Transitions API.
```

### Propuesta de edición — `README.md`
**Sección:** Reglas de código (línea «Cero JavaScript y CSS en línea»)
**Líneas:** 196
**Motivo:** La línea afirma cero JavaScript en línea sin excepción.
```diff
- ✅ Cero JavaScript y CSS en línea.
+ ✅ Cero JavaScript y CSS en línea, salvo el script de arranque del tema del `<head>` (ADR-003 de `_planificacion/04-bitacora/decisiones-tecnicas.md`).
```

### Propuesta de edición — `_planificacion/02-arquitectura/stack-tecnologico.md`
**Sección:** Reglas de JavaScript, punto 1 (requiere autorización del desarrollador)
**Líneas:** 47 a 48
**Motivo:** Prohíbe `<script>` con lógica incrustada sin excepción.
```diff
- 1. **Cero JS en línea:** Prohibido el uso de atributos como `onclick`, `onchange` o bloques `<script>` con lógica
-    incrustada en el HTML.
+ 1. **Cero JS en línea:** Prohibido el uso de atributos como `onclick`, `onchange` o bloques `<script>` con lógica
+    incrustada en el HTML, salvo el script de arranque del tema del `<head>` de `BaseLayout.astro` (ADR-003 de
+    `decisiones-tecnicas.md`): uno por página, idéntico en las 6, sin escritura en `localStorage`.
```

### Propuesta de edición — `_planificacion/01-vision/objetivos-y-metricas.md`
**Sección:** Definition of Done, punto 1 (requiere autorización del desarrollador)
**Líneas:** 39
**Motivo:** Afirma que el HTML no contiene scripts en línea.
```diff
- 1. **Cero JS en línea:** El HTML no contiene scripts en línea ni eventos en atributos (`onclick`).
+ 1. **Cero JS en línea:** El HTML no contiene scripts en línea (salvo el script de arranque del tema, ADR-003) ni eventos en atributos (`onclick`).
```

### Propuesta de edición — `_planificacion/03-planificacion/epicas/epica-08-migracion-astro/definicion-epica.md`
**Sección:** §2.2, fila A-05
**Líneas:** 56
**Motivo:** La fila remite a la Iteración 07 «si requiere excepción»; ahora está resuelta.
```diff
- | A-05   | El tema oscuro se aplica en `DOMContentLoaded` (`theme.js`): quien prefiere modo oscuro ve un destello claro al cargar.                                                  | It. 07 (opcional; requiere excepción a la regla de JS en línea) |
+ | A-05   | El tema oscuro se aplica en `DOMContentLoaded` (`theme.js`): quien prefiere modo oscuro ve un destello claro al cargar.                                                  | It. 07 ✅ resuelta (excepción aprobada, ADR-003) |
```

### Propuesta de edición — `_planificacion/03-planificacion/epicas/epica-08-migracion-astro/definicion-epica.md`
**Sección:** §7 Riesgos, fila «Astro incrusta scripts/estilos pequeños»
**Líneas:** 179
**Motivo:** La búsqueda de `<script>` sin `src` debe tolerar el script del tema.
```diff
- | Astro incrusta scripts/estilos pequeños                         | D5 + búsqueda en `_site/` de `<script>` sin `src` y de `<style>`.                                 |
+ | Astro incrusta scripts/estilos pequeños                         | D5 + búsqueda en `_site/` de `<script>` sin `src` (solo el del tema) y de `<style>`.                                 |
```

### Propuesta de edición — `_planificacion/03-planificacion/epicas/epica-08-migracion-astro/definicion-epica.md`
**Sección:** §8 Definition of Done, casilla de invariantes
**Líneas:** 195 a 196
**Motivo:** La casilla exige 0 `<script>` ejecutables sin `src` «salvo la excepción de la It. 07 si se aprueba»; se aprobó. El JSON-LD no se implementó (decisión de la It. 05).
```diff
- * [ ] 0 `style=`, 0 `onclick`, 0 `<script>` ejecutables sin `src` (salvo la excepción de la It. 07 si se aprueba; el
-   JSON-LD opcional de la It. 05 es un bloque de datos) y 0 `<style>` en `_site/**/*.html`.
+ * [ ] 0 `style=`, 0 `onclick` y 0 `<style>` en `_site/**/*.html`, y exactamente 1 `<script>` ejecutable sin `src` por página: el de arranque
+   del tema (excepción aprobada de la It. 07, ADR-003), idéntico en las 6 páginas.
```

---

## 9. Desviaciones, hallazgos y deuda detectada fuera de alcance

No se corrigió nada de lo que está fuera del alcance.

1. **Desviación autorizada en `theme.js`** (§6.3 y §7): `try/catch` mínimo en el acceso a `localStorage`; el criterio de verificación 3 de la especificación («sin errores en consola con `localStorage` bloqueado») no se cumplía con el script de arranque solo.
2. **Mecanismo del destello sin determinar** (§3.2): el primer fotograma claro aparece 57 a 162 ms después de que `theme.js` dejó `dark` en el DOM. Hipótesis sin verificar (CSS ya aplicado en claro y `transition-colors`). El resultado medido no depende de ella.
3. **`setInitialTheme()` guarda la preferencia del sistema como si fuera una elección** [código y render]: en la primera visita escribe `theme` en `localStorage` aunque la persona no haya tocado el botón (`localStorage=dark` tras la primera carga, §6.2). Si luego cambia el modo del sistema, el sitio sigue con el de la primera visita. Es comportamiento previo, no se modificó ni se registró como deuda: decisión del desarrollador.
4. **Peso del script:** +722 caracteres por página (en el HTML sin comprimir). Las dos líneas de comentario suman 208 caracteres; sin ellas y sin el comentario del `catch` el bloque mediría 465. Se dejaron para que quien lea el código fuente publicado encuentre la excepción. Lighthouse no se midió en esta iteración.
5. **Verificación acotada:** render real solo en 360 × 740 y 1280 × 800 (la especificación de render del `AGENTS.md` §7 pide 7 viewports, pero la iteración cambia el tema en el arranque y no el aspecto estático), solo en Chrome headless, y la comparación de fotogramas solo con el sistema en modo oscuro y sin tema guardado.
6. **Documentos de la épica no editados:** `definicion-epica.md` (A-05, §7 y DoD) y `iteracion-07.md` quedan sin cambios; las propuestas J, K y L del §8 los cubren.
7. **Sin deuda técnica nueva** en el §12 de `_planificacion/README.md`.

## 10. Estado, reservas y pendientes

### 10.1 Estado

**Completada con reservas.** No está 🔒 Cerrada (fusión a `main`, `_planificacion/README.md` §5).

### 10.2 Reservas

1. **Sin revisión en la vista previa de Cloudflare** con el sistema en modo oscuro y red limitada (el agente no tiene acceso).
2. **Render real solo en 2 de los 7 viewports** y **solo en Chrome headless**: sin Firefox, Safari ni dispositivo móvil real (§9, punto 5).

### 10.3 Pendientes del desarrollador (🕒 PENDIENTE)

* **Revisión en la vista previa de Cloudflare** de la rama, con el sistema operativo en modo oscuro, sin `theme` en el almacenamiento del sitio (ventana privada o «Borrar datos del sitio») y red limitada desde DevTools (por ejemplo, «Fast 3G»): al cargar Inicio y Galería no debe verse un fondo claro antes del oscuro. Confirmar que la consola no muestra mensajes nuevos.
* **Comprobar el botón de tema** en esa vista previa: alternar, recargar y navegar entre páginas conserva la elección.
* **Aplicar las propuestas de §8** a `AGENTS.md`, `README.md`, `DESIGN.md`, `_planificacion/README.md`, `stack-tecnologico.md`, `objetivos-y-metricas.md` y `definicion-epica.md`.
* **Firefox, Safari y un celular real:** mirar la carga con el sistema en modo oscuro.
* Decidir sobre los comentarios del script (§9, punto 4) y sobre el comportamiento de la primera visita (§9, punto 3), si se desea cambiarlos.

## 11. Decisión del desarrollador [informado]

El desarrollador **aprobó la excepción** a la regla «cero JS en línea» para **un único** script de arranque del tema en el `<head>`, acotada a eso: cualquier otro script en línea sigue prohibido. Autorizó solo: el `<script is:inline>` en `BaseLayout.astro`; cambios mínimos en `theme.js` (para evitar trabajo duplicado o para que no falle con `localStorage` bloqueado, reportados como desviación); el registro en `decisiones-tecnicas.md`, la bitácora y `estado-actual.md`. Los demás archivos protegidos no se tocan.

## 12. Mensaje de commit sugerido

```text
Épica 08 - Iteración 07: Aplica el tema antes del primer pintado con un script de arranque en el head y tolera localStorage bloqueado en theme.js.
```

Longitud contada con Node: 146 caracteres.
