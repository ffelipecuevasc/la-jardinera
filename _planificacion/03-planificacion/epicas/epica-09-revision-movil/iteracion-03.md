# Iteración 03: SM-03 — Tema en la primera visita y cierre de la épica

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de editar, lee `AGENTS.md` §5 (reglas 2, 3 y 10), `decisiones-tecnicas.md` (ADR-003), `src/js/modules/theme.js` y el `<script is:inline>` del tema en `src/layouts/BaseLayout.astro`. Verifica con `git status` y `git log -1` que partes de la rama de la épica con las Iteraciones 01 y 02 integradas. **No inventes decisiones**: D-01 viene resuelta en el prompt de ejecución.

**Autorización explícita de esta iteración:** puedes editar únicamente `src/js/modules/theme.js`, los archivos de bitácora de la iteración y de cierre de la épica y agregar líneas al final de `_planificacion/04-bitacora/estado-actual.md`. **No toques el script inline de `BaseLayout.astro`** (ADR-003: aplica el tema y no escribe en `localStorage`). No edites archivos protegidos (`AGENTS.md`, `README.md`, `DESIGN.md`, `_planificacion/README.md`, `_planificacion/01-vision/**`, `_planificacion/02-arquitectura/**`): sus cambios de cierre se entregan como propuesta -/+ con líneas exactas para que los aplique el desarrollador. Git es de solo lectura.

---

## 1. Objetivo de la Iteración

1. Resolver SM-03: hoy `setInitialTheme()` guarda en `localStorage` la preferencia del sistema en una primera visita (en ambas ramas llama a `saveTheme`), como si fuera una elección del usuario. Evaluar y, según la decisión, no guardar nada hasta que el usuario alterne el tema con el botón.
2. Cerrar formalmente la Épica 09.

**Decisión del desarrollador requerida:**

| ID | Decisión | Estado |
|:---|:---------|:-------|
| D-01 | ¿Se implementa (no guardar hasta que se alterne el tema) o se descarta SM-03? Si se descarta, la iteración solo registra la decisión y pasa al cierre. | Pendiente de definir |

**Limitación conocida (informar, no resolver):** quien ya tiene un valor guardado lo conserva; no hay migración posible porque no se distingue una elección real de una guardada automáticamente.

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Comportamiento actual (solo lectura)

1. `git status`, `git log -1 --oneline`, `pnpm run build:cf`.
2. En Chrome *headless* con perfil aislado y limpio, simula primera visita con `prefers-color-scheme` claro y oscuro: registra la clase de `<html>` y el contenido de `localStorage` tras la carga. Línea base: hoy queda un valor guardado.
3. Confirma que el script inline solo aplica la clase y no escribe en `localStorage` (ADR-003).

### Tarea 1: `src/js/modules/theme.js` (solo si D-01 = implementar)

1. En `setInitialTheme()`, elimina las llamadas a `saveTheme` de ambas ramas, sin cambiar la regla de decisión (`dark` si hay valor guardado `dark`, o si no hay valor guardado y el sistema prefiere oscuro).
2. `switchTheme()` sigue guardando al alternar con el botón. Mantén `readTheme` y `saveTheme` con `try/catch`, la cláusula de guarda y la forma modular actual (regla 3).
3. Sin JS ni CSS inline; el script inline de `BaseLayout.astro` queda intacto.

### Tarea 2: Verificación

1. `pnpm run build:cf` sin errores nuevos.
2. Primera visita en claro y en oscuro (perfil limpio): clase correcta, **sin** valor en `localStorage`; sin parpadeo del tema.
3. Alternar con el botón: la clase cambia y ahora sí se guarda; recargar mantiene la elección.
4. Valor guardado previo (`light` o `dark`): se respeta tras la recarga.
5. Cambiar la preferencia del sistema sin elección guardada: define y registra el comportamiento observado (sin inventar uno nuevo).
6. `localStorage` bloqueado o con error: la página no falla.
7. Todas las páginas y los 2 temas sin regresiones visuales; contraste sin cambios.

### Tarea 3: Registro de la iteración

Bitácora `_planificacion/04-bitacora/bitacora-epica-09/bitacora-iteracion-03.md` con la decisión D-01, línea base, resultados (con etiquetas de evidencia), la limitación conocida y desviaciones.

### Tarea 4: Cierre formal de la Épica 09

1. Verificación final: `pnpm run build:cf`, 7 viewports × 2 temas sin regresiones de paridad fuera de lo que cada solicitud cambia, invariantes de `AGENTS.md` §5 (en especial la regla 7).
2. Revisión de la Definition of Done de la definición de la épica, casilla por casilla, con evidencia.
3. Reservas heredadas: Safari y dispositivo Apple, y ruido de píxeles de Servicios. Estado según lo que informe el desarrollador: si probó en un dispositivo Apple, registrar resultado (y cerrar la reserva de Servicios si no hay diferencia visible en las fotos); si no, mantener ambas abiertas y registrarlo.
4. `_planificacion/04-bitacora/bitacora-epica-09/bitacora-cierre-epica-09.md` con la misma estructura de la bitácora de cierre de la Épica 08: resumen, DoD, cifras, deuda técnica, decisiones, reservas, desviaciones, verificación post-fusión y siguiente paso (Épica 10).
5. Propuestas -/+ para los archivos protegidos (estado de SM-01 a SM-03 en `_planificacion/README.md` §14, roadmap de `README.md` §15) y para `decisiones-tecnicas.md` si corresponde, con líneas exactas verificadas en el repositorio.
6. Línea final en `estado-actual.md` (BOM, CRLF, sin salto final; verifica bytes).
7. Mensaje de commit sugerido: `Épica 09 - Iteración 03: SM-03 tema en la primera visita y cierre de la épica`.

---

## 3. Criterios de Aceptación (Definition of Done)

* **Dado** una primera visita con perfil limpio, **cuando** carga cualquier página, **entonces** el tema coincide con la preferencia del sistema y no se escribe nada en `localStorage` (si D-01 = implementar).
* **Dado** el botón de tema, **cuando** se alterna, **entonces** el tema cambia, se guarda y se respeta al recargar.
* **Dado** ADR-003, **entonces** el script inline de `BaseLayout.astro` no cambió.
* **Dado** la Definition of Done de la épica, **entonces** cada casilla tiene evidencia o una reserva registrada con su destino.
* **Dado** el cierre, **entonces** existen la bitácora de la iteración, la de cierre y las propuestas -/+ para los protegidos, sin commits hechos por Claude Code.
