# Iteración 01: SM-01 — Hero móvil del Inicio

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de tocar cualquier archivo, lee `AGENTS.md` (§5, reglas 2, 4, 5, 7 y 10), `DESIGN.md` (escala tipográfica y reglas del Hero), el archivo de definición de la épica y `src/pages/index.astro`. Verifica con `git status` y `git log -1` que partes de `main` actualizado y de la rama de la épica, sin cambios pendientes. Esta iteración **no inventa decisiones**: todo lo marcado «Decisión D-xx» debe venir resuelto por el desarrollador en el prompt de ejecución. Si falta alguna, detente y repórtalo; no asumas.

**Autorización explícita de esta iteración:** puedes editar únicamente `src/pages/index.astro`, los archivos de bitácora de la iteración y la línea correspondiente de `_planificacion/04-bitacora/estado-actual.md` (solo agregar al final). No edites `AGENTS.md`, `README.md`, `DESIGN.md`, `_planificacion/README.md`, `_planificacion/01-vision/**` ni `_planificacion/02-arquitectura/**`: si algo ahí debe cambiar, entrégalo como propuesta en formato -/+ con las líneas exactas. Git es de solo lectura: no hagas commit, push ni merge.

---

## 1. Objetivo de la Iteración

Resolver SM-01: en móvil, reducir el tamaño del título y del párrafo del hero del Inicio, ocultar el ícono SVG de ubicación y la fila «Valdivia, Región de Los Ríos, Chile», y dejar solo «Descubrir más» con su flecha, **sin romper el contraste calibrado en la Épica 01 · Iteración 08** y sin regresiones en el resto del sitio.

**Decisiones del desarrollador requeridas (vienen en el prompt de ejecución):**

| ID | Decisión | Estado |
|:---|:---------|:-------|
| D-01 | Tamaños objetivo del `h1` y del párrafo en móvil (tokens de `DESIGN.md`: `display-hero-mobile` 40/48, `headline-xl-mobile` 32/40, `body-md` 16/24, `body-lg` 18/28). | Pendiente de definir |
| D-02 | Alineación de «Descubrir más» (centrado, izquierda u otra). | Pendiente de definir |
| D-03 | Comportamiento desde 768 px (¿se mantiene el hero actual?). | Pendiente de definir |
| D-04 | Qué anchos cuentan como «móvil» (el breakpoint donde reaparecen ícono y fila). | Pendiente de definir |
| D-05 | Qué pasa con los botones «Explorar Servicios» y «Suscripción Floral» en móvil. | Pendiente de definir |
| D-06 | Dónde queda visible «Valdivia» en móvil al ocultar la fila de ubicación. | Pendiente de definir |

Si el desarrollador pide un tamaño que no existe en la escala de `DESIGN.md`, **no lo inventes**: entrégalo como propuesta de edición del `DESIGN.md` (-/+) para que él la aplique, y espera su respuesta.

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Línea base (solo lectura)

1. `git status`, `git log -1 --oneline`, rama actual. Debe ser la rama de la épica, sin cambios.
2. `pnpm install --frozen-lockfile` y `pnpm run build:cf`. Anota número de páginas y de archivos de `_site/` (referencia de cierre de Épica 08: 6 páginas, 109 archivos).
3. Con Chrome *headless* y perfil aislado (nunca `chrome.exe` directo ni la sesión del desarrollador), abre el Inicio en 320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768 y 1280×800, en modo claro y oscuro, y mide para cada combinación: tamaño computado y alto de línea del `h1` y del párrafo, número de líneas del `h1`, alto total de la tarjeta `hero-glass` y si hay scroll horizontal. Esta es la medición del `h1` marcada como 🕒 PENDIENTE en `_planificacion/README.md` §14.
4. Guarda capturas de línea base del hero (fuera del repo, en una carpeta temporal).
5. Repite el método de contraste de la Épica 01 · Iteración 08 (Tarea 5): luminancia del percentil 95 del fondo bajo la tarjeta y contraste del texto, en los 7 viewports y los 2 temas. Registra los valores como línea base.

### Tarea 1: Marcado del Hero en `src/pages/index.astro`

Aplica solo lo decidido en D-01 a D-06:

1. Tamaños del `h1` y del párrafo: usa únicamente tokens de `DESIGN.md` / `tailwind.config.js` (regla 4), con clases Tailwind literales (regla 5). Hoy el `h1` usa `text-headline-xl lg:text-display-hero` y `font-display-hero`.
2. Oculta en el ancho «móvil» definido en D-04 el SVG de ubicación (hoy `aria-hidden`) y la fila de ubicación, sin dejar un contenedor vacío con borde o espacio sobrante (revisa la fila de datos con `border-t`).
3. «Descubrir más»: alineación según D-02. Conserva `aria-label="Desplazarse a servicios"`, `href="#servicios"` y `animate-bounce motion-reduce:animate-none`.
4. Botones según D-05 y «Valdivia» visible según D-06.
5. Cero JS o CSS inline (regla 2). No cambies el `<picture>`, el `fetchpriority="high"` ni los atributos de las imágenes.
6. Mantén objetivos táctiles de al menos 44×44 px y foco visible (regla 10).

### Tarea 2: Compilación y presencia de clases

`pnpm run build:cf`. Verifica en el CSS de `_site/` que existen todas las clases nuevas (Tailwind solo emite clases literales). Verifica que las otras 5 páginas no cambiaron (mismo HTML y mismos nombres de archivo, salvo el hash de CSS si cambió).

### Tarea 3: Verificación en render real

1. Mismos 7 viewports y 2 temas de la Tarea 0. Compara contra la línea base: solo el Inicio y solo en el ancho «móvil» debe diferir.
2. Mide de nuevo `h1` y párrafo (tamaño computado, líneas), y confirma que el `h1` no se corta ni desborda en 320 px.
3. Repite la medición de contraste de la Tarea 0.5. Si algún valor no alcanza AA, **no cambies el tinte por tu cuenta**: repórtalo con los números y propón opciones (la Épica 01 · It. 08 subía el tinte de `/45` a `/55` y `/65`).
4. Sin scroll horizontal; tarjeta dentro del viewport; teclado: Tab llega a los botones y a «Descubrir más» con foco visible.
5. Header intacto (regla 7): ningún descendiente de `<header>` con `fixed`, scrim inmediatamente después de `</header>`.

### Tarea 4: Registro

1. Bitácora `_planificacion/04-bitacora/bitacora-epica-09/bitacora-iteracion-01.md`: decisiones D-01 a D-06 con fecha, líneas base y mediciones finales (con etiqueta de evidencia [medido], [código], [informado]), desviaciones, hallazgos.
2. Agrega al final de `estado-actual.md` una línea de la iteración (archivo *append-only*: UTF-8 con BOM, CRLF, sin salto final; verifica los bytes antes y después).
3. Formato de archivos: CRLF, sin BOM, salvo `estado-actual.md`.
4. Mensaje de commit sugerido: `Épica 09 - Iteración 01: SM-01 hero móvil del Inicio` (más el detalle que corresponda).

---

## 3. Criterios de Aceptación (Definition of Done)

* **Dado** el Inicio en el ancho «móvil» definido, **cuando** se abre en modo claro y oscuro, **entonces** el título y el párrafo tienen los tamaños decididos, el ícono y la fila de ubicación no se ven, «Descubrir más» queda con la alineación decidida y «Valdivia» está visible donde se decidió.
* **Dado** los 7 viewports y los 2 temas, **cuando** se repite la medición de contraste de la Épica 01 · It. 08, **entonces** todos los valores cumplen WCAG AA, o la desviación queda reportada con números y sin cambios no autorizados.
* **Dado** el resto de páginas y los anchos fuera de «móvil», **cuando** se comparan con la línea base, **entonces** no hay diferencias.
* **Dado** el teclado, **cuando** se recorre el hero, **entonces** el foco es visible y los objetivos miden al menos 44×44 px.
* **Dado** `AGENTS.md` §5, **entonces** reglas 2, 4, 5, 7 y 10 se mantienen.
* **Dado** el cierre, **entonces** la bitácora y `estado-actual.md` están actualizados, sin commits hechos por Claude Code.
