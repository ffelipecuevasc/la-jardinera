# Bitácora de Ejecución - Épica 08 - Iteración 06

**Fecha de ejecución:** 19-10-2026
**Agente:** Claude Code
**Objetivo:** Eliminar la duplicación de marcado de los bloques que se repiten en dos o más páginas, con salida idéntica a la de la Iteración 05. Un bloque que aparece en una sola página se queda en su página.

Especificación: [`iteracion-06.md`](../../03-planificacion/epicas/epica-08-migracion-astro/iteracion-06.md) · Iteración anterior: [`bitacora-iteracion-05.md`](bitacora-iteracion-05.md)

Rótulos de evidencia: **[código]** confirmado por código, comandos o programa; **[informado]** dato entregado por el desarrollador; **🕒 PENDIENTE** no verificado. El agente no ejecutó ningún navegador (§4.6); la revisión visual de la vista previa de Cloudflare es **[informado]** por el desarrollador (§9).

---

## 1. Resumen ejecutivo

* Se extrajo **un solo bloque**: la franja de beneficios operativos, a `src/components/secciones/FranjaBeneficios.astro`, **sin propiedades**. Servicios, Suscripción Floral y Galería lo usan con `<FranjaBeneficios />`; cada página conserva su `<main>`, su `Fragment slot="antes-del-footer"` (Suscripción y Galería) y el comentario `<!-- 2. FRANJA DE BENEFICIOS OPERATIVOS ... -->`. [código]
* Se evaluaron y **descartaron** el rombo ✦ y el banner con textura (`.bg-noise`) (§5). No se creó deuda técnica nueva.
* `pnpm run build:cf`: código 0, "6 page(s) built", 0 advertencias, 109 archivos; el CSS (`BaseLayout.744HEtGc.css`) y el JS son idénticos byte a byte a los de la base (`cmp`). [código]
* `scripts/comparar-con-referencia.mjs referencia/it05-base`: "Diferencias de `<body>` no esperadas (total): **0**" y 0 diferencias de `<head>` en las 6 páginas. [código]
* `<body>` carácter a carácter: **5 de 6 páginas idénticas** (Inicio, Suscripción, Galería, Contacto y 404). Servicios difiere **solo en espacios** (55 de 5.119 separadores; −248 caracteres), por la sangría y un salto de línea del formato original (§4.3). [código]
* Corrección de la Tarea 0: la franja **no está en el Inicio** (el Inicio tiene el banner «¿Planeando un evento especial?», que es otro bloque) y **sí está en Servicios**, que la especificación no listaba (§3).
* Tarea 1b: comentario de cabecera de `src/data/navegacion.js` actualizado; los datos no se tocaron. [código]
* Tarea 3 (carga diferida de los videos de la Galería): **pendiente de decisión del desarrollador**; no se implementó.
* Cierre (19-10-2026, §9): commit `57e3152` en GitHub; el desarrollador revisó la franja en la vista previa de Cloudflare de la rama (3 páginas, claro y oscuro) y una auditoría independiente confirmó la salida; ambos datos son **[informado]**. Quedan Safari y dispositivo real sin probar.
* Estado: **Completada con reservas** (§8). No está 🔒 Cerrada: eso ocurre solo con la fusión a `main`.

## 2. Línea base (estado previo)

| Dato | Valor | Origen |
|:-----|:------|:-------|
| Rama / `HEAD` | `feat/migracion-astro` / `a120832` | `git log` |
| Árbol de trabajo | Limpio al iniciar | `git status --short` |
| Compilación base | `pnpm run build:cf`: código 0, "6 page(s) built", 0 advertencias, **109 archivos**, CSS `BaseLayout.744HEtGc.css` | salida de `astro build`, `find` |
| Copia de la base | `referencia/it05-base/` (copia completa de `_site/`, 109 archivos; ignorada por Git: `.gitignore` L30, `git check-ignore -v`) | `cp -r`, `git check-ignore` |
| Lectura previa | `AGENTS.md`, `README.md`, especificación de la It. 06, bitácoras de las It. 04 y 05, `estado-actual.md`, `BaseLayout.astro`, `navegacion.js` y las secciones de `DESIGN.md` sobre el banner con textura y el rombo (§5 notas 5 y 9, §11.1 y L161-162); `DESIGN.md` no se leyó completo | — |

## 3. Tarea 0: inventario de candidatos (solo lectura) [código]

Método: comparación por tokens (etiquetas con sus atributos en orden, texto y comentarios, con los espacios normalizados) de los 6 `.astro` de `src/pages/`, y búsqueda de subárboles de elementos repetidos entre páginas, en dos modos: idénticos, y de igual estructura y clases con texto y atributos distintos. Mínimo 3 tokens. Los scripts quedaron fuera del repositorio.

| # | Bloque | Dónde aparece | Similitud | Diferencias reales | Decisión |
|:--|:-------|:--------------|:----------|:-------------------|:---------|
| 1 | Franja de beneficios operativos (`<section>` con banner, `.bg-noise` y 2 beneficios) | Servicios L339-404, Suscripción L355-419, Galería L484-546 | **Idéntica**: 60 tokens iguales, comentarios incluidos | Solo espacios: Servicios con 4 espacios más de sangría; `<svg>` con atributos en 2 líneas en Servicios y Suscripción y en 1 en Galería; el `<p>` de «formal.» cortado en 2 líneas en Servicios | **Extraída** |
| 2 | Rombo ✦ (`div` y 3 `span`) | 7 instancias: Inicio L121, Servicios L15, Suscripción L34 y L144, Galería L16, Contacto L16, 404 L17 | Difiere en clases y atributos: 4 variantes | A: `gap-2`, sin margen ni `aria-hidden` (Suscripción L34). B: `gap-2 mb-2`, sin `aria-hidden` (Inicio, Servicios, Suscripción L144). C: `gap-2 mb-2` con `aria-hidden` (Contacto; la de `DESIGN.md` §11.1). D: `gap-2 mb-space-2` con `aria-hidden` (Galería, 404) | **Descartado** |
| 3 | Banner con textura (marco y `div.bg-noise`) | Inicio L566-570 frente al marco de la franja (Servicios, Suscripción, Galería) | Difiere en estructura | Inicio agrega `flex flex-col md:flex-row items-center justify-between gap-space-6` al contenedor (L566), su `bg-noise` no lleva `aria-hidden` (L569), el comentario es otro (L568) y el contenido es distinto (texto y 2 botones, no una rejilla de 2 beneficios) | **Descartado** |

**Precisión sobre la especificación (decisión del desarrollador):** la franja de beneficios **no está en el Inicio**: lo que el Inicio tiene es el banner «¿Planeando un evento especial?», que es otro bloque (fila 3). La franja **sí está en Servicios**, página que la especificación no listaba para ese bloque. La búsqueda no encontró ningún otro bloque repetido.

## 4. Verificación

### 4.1 Cambios por archivo

| Archivo | Cambio |
|:--------|:-------|
| `src/components/secciones/FranjaBeneficios.astro` (nuevo, 70 líneas, CRLF) | Comentario de cabecera en el frontmatter (no se emite) y la `<section>` completa de la franja, copiada de la de Suscripción Floral (L356-419), con sus 9 comentarios internos. **Sin propiedades** (`Astro.props` no se usa): las tres copias eran idénticas. |
| `src/pages/servicios.astro` | Importa el componente (L3) y reemplaza la `<section>` (65 líneas) por `<FranjaBeneficios />` dentro de `<main>`, con la sangría de la sección. Conserva el comentario `<!-- 2. FRANJA ... -->`. |
| `src/pages/suscripcion-floral.astro` | Ídem: importa el componente y reemplaza la `<section>` (64 líneas) dentro de `Fragment slot="antes-del-footer"`. Conserva el comentario. |
| `src/pages/galeria.astro` | Ídem: importa el componente y reemplaza la `<section>` (62 líneas) dentro de `Fragment slot="antes-del-footer"`. Conserva el comentario. |
| `src/data/navegacion.js` | Solo el comentario de cabecera (L1 y L2, que ahora ocupa L1 a L3): "Fuente única de rutas, etiquetas y descripciones del sitio (Épica 08 · Iteración 03). La usan `SiteHeader.astro`, `SiteFooter.astro`, `BaseLayout.astro`/`SeoHead.astro` (descripciones) y `sitemap.xml.js`." Se mantiene la frase sobre las etiquetas copiadas del marcado. Los datos (`NAVEGACION`) no se tocaron. CRLF conservado (15 de 15 líneas). |
| `_planificacion/04-bitacora/estado-actual.md` | Una línea agregada al final (§6). |

**Dónde vive cada comentario `<!-- 2. FRANJA ... -->`:** en las páginas, no en el componente. Astro conserva un comentario dentro de `<main>` (Servicios) y omite el que es hijo directo de una ranura con nombre (Suscripción y Galería). En la base salió 1 vez (Servicios) y 0 en las otras dos; si estuviera en el componente saldría en las tres y la salida dejaría de ser idéntica. Los otros 9 comentarios internos van al componente y salen en las tres páginas, como en la base.

`git diff --stat` de código: `navegacion.js` 5, `galeria.astro` 64, `servicios.astro` 67, `suscripcion-floral.astro` 66 (9 inserciones y 193 eliminaciones en total, más el componente nuevo de 70 líneas).

### 4.2 Compilación [código]

`pnpm run build:cf` (con `_site/` borrada antes): código 0; "6 page(s) built"; 0 líneas con "warn" o "error"; **109 archivos** (igual que la base). CSS `BaseLayout.744HEtGc.css` y JS `BaseLayout.astro_astro_type_script_index_0_lang.5-O1sJDE.js`: `cmp` sin diferencias frente a `referencia/it05-base/_astro/`. El glob de Tailwind (`./src/**/*.{astro,html,js}`) ya cubre `src/components/secciones/`.

### 4.3 Comparación contra la base [código]

* `scripts/comparar-con-referencia.mjs referencia/it05-base` (código de salida 0): "Diferencias de `<body>` no esperadas (total): **0**"; diferencias de `<head>`: **0** en las 6 páginas; tokens del `<body>` iguales en base y salida (1.571, 1.238, 1.173, 1.544, 840 y 532).
* `<body>` carácter a carácter (de `<body` a `</body>`) y lo que queda fuera de él:

| Página | Base (caracteres) | Nueva (caracteres) | Carácter a carácter | Fuera del `<body>` |
|:-------|------------------:|-------------------:|:--------------------|:-------------------|
| Inicio | 86.936 | 86.936 | idéntico | igual |
| Servicios | 67.723 | 67.475 (−248) | **difiere solo en espacios** | igual |
| Suscripción Floral | 64.192 | 64.192 | idéntico | igual |
| Galería | 93.950 | 93.950 | idéntico | igual |
| Contacto | 51.497 | 51.497 | idéntico | igual |
| 404 | 34.781 | 34.781 | idéntico | igual |

* **Diferencias de solo espacios (Servicios):** sin espacios, el `<body>` de la base y el nuevo son idénticos. De los 5.119 separadores de espacios, **55 son distintos**: **54** son de sangría (el componente usa la sangría de Suscripción y Servicios tenía 4 espacios más) y **1** es de número de saltos de línea (el `<p>` de «Respaldo Tributario», que Servicios cortaba en dos líneas antes de «formal.» y ahora va en una; el navegador lo colapsa a un espacio). Los trozos entre espacios son 5.120 en ambos y coinciden uno a uno. Suscripción y Galería quedaron idénticas en bytes (Astro normaliza los saltos de línea entre atributos de las etiquetas).
* **Sin efecto visual por código:** los espacios que cambian están entre hijos de contenedores de bloque o flex y dentro de un texto de párrafo, donde el navegador los colapsa. Esto es una inferencia por código; no se midió en render real (§4.6).

### 4.4 Componente: propiedades y clases [código]

`grep` sobre `FranjaBeneficios.astro`: 0 `Astro.props`, 0 `class={`, 0 `${`, 0 `style=`, 0 `onclick`, 0 `<style`, 0 `<script`, 0 `client:` y 0 `set:`. El componente no recibe propiedades, por lo que ninguna puede cambiar su estructura ni sus clases. Todas las clases son literales (el CSS es idéntico byte a byte al de la base).

### 4.5 Invariantes sobre `_site/*.html` [código]

En las 6 páginas: 0 `style="`, 0 `onclick`, 0 `<style`, 0 `<script>` sin `src`, 0 `href="#"` y 0 IDs duplicados. `FRANJA DE BENEFICIOS` aparece 1 vez en `servicios.html` y 0 en las demás (igual que la base); `bg-noise` aparece 1 vez en Inicio, Servicios, Suscripción y Galería, y 0 en Contacto y 404 (igual que la base).

### 4.6 Render real y consola

**Por el agente: no se ejecutó ningún navegador** (regla de esta iteración). Lo verificado por código: tokens y CSS idénticos y `<body>` idéntico, salvo los espacios de Servicios.

**[informado] Revisión del desarrollador (19-10-2026), sin capturas:** en la vista previa de Cloudflare de la rama, la franja de beneficios de Servicios, Suscripción Floral y Galería, en claro y oscuro, se ve bien. La consola solo muestra el 404 de `rum` (`beacon.min.js`, inyectado por Cloudflare, ya anotado en `iteracion-08.md`, Tarea 3). La revisión no precisó navegador, dispositivo ni anchos. Detalle en §9.

### 4.7 Escenarios de aceptación

| Escenario | Estado | Evidencia |
|:----------|:-------|:----------|
| 1. Salida idéntica | ✅ confirmado por código | Comparador: 0 diferencias de `<body>` y de `<head>`; 5 de 6 `<body>` idénticos carácter a carácter y el de Servicios con diferencias solo de espacios (§4.3) |
| 2. Sin abstracción forzada | ✅ confirmado por código | El único componente no tiene propiedades (§4.4); los dos bloques que habrían exigido propiedades de clases se descartaron (§5) |

## 5. Bloques evaluados y descartados (registro)

No se creó deuda técnica nueva por ninguno.

1. **Rombo ✦.** Son 7 instancias en 4 variantes que difieren en clases (`mb-2`, `mb-space-2`, sin margen) y en `aria-hidden`. Un componente tendría que fijar una variante y cambiaría la salida de al menos 4 de las 7 instancias; darle propiedades para esas diferencias sería cambiar clases y atributos, que esta iteración prohíbe. La variante B se repite idéntica en 3 páginas, pero son 5 líneas y dejaría los otros 4 rombos escritos a mano. Unificar las variantes es un cambio de marcado fuera de alcance. Relacionado: `DESIGN.md` §5, nota 5, ya registra que algunas instancias no llevan `aria-hidden="true"`.
2. **Banner con textura (`.bg-noise`).** Las diferencias del banner del Inicio frente al marco de la franja son de estructura (clases `flex` propias del contenedor y contenido distinto) y de atributo (`aria-hidden`). El `div.bg-noise` por sí solo son 2 o 3 líneas dentro de cada banner. El marco compartido de la franja ya queda dentro del componente extraído.

## 6. Registro y mensaje de commit

Línea agregada al final de `_planificacion/04-bitacora/estado-actual.md` (el archivo ya tenía BOM y no terminaba en salto de línea; se agregó `\r\n` al final de la última línea, que aparece como 1 línea modificada en el diff, más la línea nueva). Texto exacto en el reporte de la sesión.

Mensaje de commit sugerido:

```text
Épica 08 - Iteración 06: Extrae la franja de beneficios operativos repetida a un componente Astro.
```

Longitud contada con Node: 98 caracteres.

## 7. Desviaciones, hallazgos y deuda detectada fuera de alcance

No se corrigió nada de lo siguiente.

1. **Alcance reducido frente a la especificación:** se extrajo 1 de los 2 candidatos conocidos y el banner con textura no es un bloque repetido (§3, §5). Decisión del desarrollador.
2. **Precisión sobre la especificación:** la franja no está en el Inicio y sí en Servicios (§3). La definición de la iteración (`iteracion-06.md`, Tarea 0) y `DESIGN.md` (L161-162, que sí la ubica en Servicios, Suscripción y Galería) no se editan; el primero queda desactualizado en ese punto.
3. **Variantes del rombo ✦ y `aria-hidden` ausente en 4 de las 7 instancias:** ya registrado en `DESIGN.md` §5, nota 5; sin deuda nueva.
4. **`DESIGN.md` y `README.md`:** `README.md` §5 (L90) lista los componentes como "SiteHeader, SiteFooter y SeoHead" y no menciona `src/components/secciones/` ni `FranjaBeneficios`. Propuesta en el reporte de la sesión (§8.5).
5. **Sin deuda nueva** en el §12 de `_planificacion/README.md`.

---

## 8. Estado, reservas y pendientes

### 8.1 Estado

**Completada con reservas.** No está 🔒 Cerrada (fusión a `main`, `_planificacion/README.md` §5).

### 8.2 Reservas

1. **Safari y dispositivo móvil real sin probar.** La revisión del desarrollador en la vista previa de Cloudflare (§9) no precisó navegador ni dispositivo, y el agente no ejecutó ninguno.

**Resueltas con el cierre (§9):** la reserva «sin render real ni consola» y la reserva «sin vista previa de Cloudflare» quedaron resueltas con la revisión del desarrollador **[informado]**, sin capturas.

Servicios difiere en espacios del HTML de la base (§4.3): es una diferencia de formato sin efecto visual por código, que el desarrollador ya aceptó (§8.3); no es una reserva.

### 8.3 Decisiones del desarrollador [informado]

* Extraer solo el Bloque 1 (franja de beneficios), sin propiedades; el comentario `<!-- 2. FRANJA ... -->` se queda en cada página y los otros 9 comentarios van al componente.
* Aceptar las diferencias de solo espacios o saltos de línea en la comparación carácter a carácter, contadas y reportadas aparte (§4.3).
* No extraer el rombo ✦ ni el banner con textura; registrarlos como evaluados y descartados, sin deuda técnica nueva (§5).
* **Tarea 3 (carga diferida de los videos de la Galería): fuera de esta iteración; queda "pendiente de decisión del desarrollador".** No se implementó ni se midió nada (antecedente: `iteracion-06.md`, Tarea 3 y `bitacora-cierre-epica-07.md` §3).

### 8.4 Pendientes del desarrollador (🕒 PENDIENTE)

* **Decisión sobre la Tarea 3** (carga diferida de los videos de la Galería): pendiente de decisión del desarrollador; no se implementó (§8.3).
* **Safari y dispositivo móvil real:** mirar la franja en Servicios, Suscripción Floral y Galería, en claro y oscuro (§8.2).
* **Paso a producción (It. 08):** ver la franja en `lajardinerafloreria.cl` tras la fusión a `main`. El 404 de `rum` de `beacon.min.js` queda en la Iteración 08, Tarea 3.

---

## 9. Cierre con las confirmaciones del desarrollador (19-10-2026)

Rótulo: **[informado]** = dato entregado por el desarrollador, sin capturas. El agente no abrió ningún navegador.

| Dato | Valor | Origen |
|:-----|:------|:-------|
| Commit en GitHub | `57e3152` «Épica 08 - Iteración 06: Extrae la franja de beneficios operativos repetida a un componente Astro.» (`HEAD` de `feat/migracion-astro`, árbol limpio al iniciar el cierre) | `git log`, `git status --short` |
| Revisión visual | Vista previa de Cloudflare de la rama: la franja de beneficios en Servicios, Suscripción Floral y Galería, en claro y oscuro, se ve bien | **[informado]** |
| Consola | Solo el 404 de `rum` (`beacon.min.js`, inyectado por Cloudflare; anotado en `iteracion-08.md`, Tarea 3) | **[informado]** |
| Auditoría independiente | Compilaciones limpias de `main` y de la rama; 109 archivos y 0 advertencias en ambas; CSS y JS idénticos byte a byte; HTML idéntico en 5 de 6 páginas y con diferencias solo de espacios en Servicios | **[informado]** (coincide con §4.2 y §4.3, medidos por el agente) |
| Especificación | `iteracion-06.md`, Tarea 0: tabla corregida (la franja está en Servicios, Suscripción Floral y Galería; el Inicio tiene otro bloque, «¿Planeando un evento especial?») y nota con el resultado real de la Tarea 0. No se cambió nada más | [código] `git diff` |
| Propuesta para `README.md` §5 (L90) | Ya aplicada por el desarrollador: la línea nombra `secciones/ con FranjaBeneficios` | [código] `sed -n 90p README.md` |

**Reservas del primer cierre:** «sin render real ni consola» y «sin vista previa de Cloudflare» quedan **resueltas** con la revisión del desarrollador. **Reserva vigente:** Safari y dispositivo móvil real sin probar (§8.2). Por eso el estado sigue siendo **Completada con reservas**, igual que en la It. 04 y la It. 05. La Tarea 3 sigue **pendiente de decisión del desarrollador**.

Mensaje de commit sugerido para este cierre (118 caracteres, contados con Node):

```text
Épica 08 - Iteración 06: Cierra la iteración con la revisión de la vista previa de Cloudflare y las reservas abiertas.
```
