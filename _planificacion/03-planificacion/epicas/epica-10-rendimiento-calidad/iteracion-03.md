# Iteración 03: Fuentes y CSS que Bloquean el Renderizado

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de editar, lee `AGENTS.md` §5 (reglas 2 y 4), `DESIGN.md` §1 (tipografía),
`decisiones-tecnicas.md` (ADR-003), `astro.config.mjs`, `src/layouts/BaseLayout.astro`, `src/css/input.css`,
`tailwind.config.js` y las bitácoras de las Iteraciones 01 y 02 de esta épica. Verifica con `git status` y `git log -1`
que estás en la rama de la épica con las iteraciones anteriores integradas. No inventes decisiones.

**Autorización explícita de esta iteración:** se completa al aprobar la iteración. El script del tema de
`BaseLayout.astro` **no se toca** (ADR-003, SHA-256 `5b490c26…`). Si una mejora exige CSS en línea, se entrega como
propuesta (regla 2 de `AGENTS.md`). Git es de solo lectura.

---

## 1. Objetivo de la Iteración

1. Reducir el tiempo de bloqueo del renderizado que causa la hoja de Google Fonts (8 estilos de Montserrat y 4 de Noto
   Serif, `display=swap`) y el CSS propio (46.947 B, `inlineStylesheets: 'never'`).
2. Si la Iteración 01 atribuye el CLS del Inicio móvil (DT-35) al cambio de fuente, corregirlo.
3. Mantener la tipografía idéntica a la vista: mismas familias, pesos y estilos de `DESIGN.md` §1.

### 1.1 Decisiones del desarrollador

| ID | Decisión | Opciones | Estado |
|:---|:---------|:---------|:-------|
| D-01 | Origen de las fuentes | a) Alojarlas en el sitio (`.woff2` en `public/fonts/`, `@font-face` en `input.css`, subconjunto latino) y quitar la conexión a Google. b) Seguir en Google con `preload` de la hoja. c) Sin cambios. | Pendiente de definir |
| D-02 | Pesos y estilos | a) Los 12 actuales. b) Solo los que use el CSS compilado (la Tarea 0 los lista). | Pendiente de definir |
| D-03 | Precarga | Qué archivos llevan `<link rel="preload">` (propuesta: solo los del texto sobre el pliegue). | Pendiente de definir |
| D-04 | Desplazamiento por cambio de fuente | a) Fuentes de respaldo ajustadas (`size-adjust` y métricas en `@font-face`). b) `font-display: optional`. c) Sin cambios. Solo si la It. 01 lo confirma. | Pendiente de definir |

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Línea base (solo lectura)

1. PageSpeed Insights (D-03 de la épica, §6.1 de la definición) en la vista previa de la rama con la Iteración 02
   integrada, en las páginas que tocó la It. 02: es el «después» de la It. 02 [medido]. Y en las 5 páginas como «antes»
   de esta iteración, que toca el layout común.
2. Familias, pesos y estilos realmente usados en el CSS compilado y en el HTML de `_site/`.
3. Archivos de fuente que descarga cada página y su orden respecto del FCP y el LCP (lista de peticiones de PageSpeed)
   [medido].
4. Capturas de texto de referencia (títulos, cuerpo, cursivas destacadas de la Épica 09) en 360×740 y 1280×800, ambos
   temas.

### Tarea 1: Fuentes

Según D-01 a D-04. Si se alojan en el sitio: verifica la licencia (Google Fonts publica Montserrat y Noto Serif con la
licencia SIL OFL) y regístrala en la bitácora.

### Tarea 2: CSS propio

Mide si el CSS de 46.947 B es un cuello de botella frente a las fuentes. Solo con datos, propone alternativas que respeten
la regla 2 (por ejemplo, revisar el `content` de Tailwind o dividir hojas). No las implementes sin decisión.

### Tarea 3: Verificación

1. `pnpm run build:cf` sin errores ni advertencias nuevas.
2. Render del texto idéntico a la Tarea 0.4 en los 7 viewports × 2 temas (diferencias de antialiasing documentadas).
3. Sin puntajes locales (D-03 de la épica): bloqueo del renderizado, FCP, LCP y CLS se miden en la vista previa al
   inicio de la Iteración 04 (Tarea 0).
4. Consola limpia y 0 peticiones a `fonts.googleapis.com` / `fonts.gstatic.com` si D-01 es a).
5. SHA-256 del script del tema sin cambios.

### Tarea 4: Registro

Bitácora, línea en `estado-actual.md`, propuestas -/+ (`DESIGN.md` §1 y `stack-tecnologico.md`, si cambia el origen de
las fuentes) y mensaje de commit: `Épica 10 - Iteración 03: fuentes y CSS que bloquean el renderizado.`

---

## 3. Auditoría de No-Regresión e Invariantes

* Script del tema intacto (ADR-003); cero JS y CSS en línea fuera de él.
* La transición del tema (View Transitions) y el efecto `fx-starlight` del titular se ven igual.
* Sin dependencias nuevas en `package.json` salvo decisión del desarrollador.

---

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Bloqueo**
    * **Entonces** el tiempo de bloqueo del renderizado en móvil baja respecto de la It. 01, con cifras.
* **Escenario 2: Tipografía**
    * **Dado** cualquier página,
    * **Entonces** familias, pesos y estilos se ven igual que antes en los 7 viewports y ambos temas.
* **Escenario 3: CLS**
    * **Entonces** si la It. 01 atribuyó el CLS a las fuentes, el CLS móvil del Inicio baja con cifras; si no, se
      registra que no aplica.