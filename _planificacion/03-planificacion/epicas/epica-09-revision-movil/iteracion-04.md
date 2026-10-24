# Iteración 04: SM-03 (Tema en la Primera Visita) y Cierre de la Épica

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de editar, lee `AGENTS.md` §5 (reglas 2, 3 y 10),
`_planificacion/04-bitacora/decisiones-tecnicas.md` (ADR-003 y ADR-004), `src/js/modules/theme.js` y el
`<script is:inline>` del tema en `src/layouts/BaseLayout.astro`. Verifica con `git status` y `git log -1` que estás en
`feat/revision-movil` con las Iteraciones 01 a 03 integradas. No inventes decisiones.

**Autorización explícita de esta iteración:** puedes editar únicamente `src/js/modules/theme.js`, las bitácoras de la
iteración y de cierre de la épica, la definición de la épica (solo estado y casillas del DoD) y agregar líneas al final
de `estado-actual.md`. **No toques el script en línea de `BaseLayout.astro`** (ADR-003: aplica el tema y no escribe en
`localStorage`). No edites archivos protegidos: sus cambios de cierre se entregan como propuesta -/+ con líneas
completas. Git es de solo lectura.

---

## 1. Objetivo de la Iteración

1. **SM-03:** hoy `setInitialTheme()` guarda en `localStorage` la preferencia del sistema en la primera visita (llama
   a `saveTheme` en ambas ramas), como si fuera una elección del usuario. Desde ahora no se guarda nada hasta que el
   usuario alterne el tema con el botón.
2. Cerrar formalmente la Épica 09.

### 1.1 Decisión del desarrollador

| ID | Decisión |
|:---|:---------|
| SM-03 D-01 | Implementar: no guardar el tema hasta que el usuario lo alterne (21-10-2026). |

**Limitación conocida (informar, no resolver):** quien ya tiene un valor guardado lo conserva. No hay migración
posible porque no se distingue una elección real de un valor guardado automáticamente.

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Comportamiento actual (solo lectura)

1. `git status`, `git log -1 --oneline`, `pnpm run build:cf`.
2. Chrome *headless* con perfil aislado y limpio: primera visita con `prefers-color-scheme` claro y oscuro; registra la
   clase de `<html>` y el contenido de `localStorage` tras la carga (hoy queda un valor guardado).
3. Confirma que el script en línea solo aplica la clase y no escribe en `localStorage` (ADR-003). Registra su SHA-256
   con el mismo método que la Épica 08 (el del `<script>` completo da `5b490c26…`; no compares hashes obtenidos con
   métodos distintos).

### Tarea 1: `theme.js`

1. En `setInitialTheme()`, elimina las llamadas a `saveTheme` de ambas ramas, sin cambiar la regla de decisión
   (`dark` si hay valor guardado `dark`, o si no hay valor guardado y el sistema prefiere oscuro).
2. `switchTheme()` sigue guardando al alternar. Mantén `readTheme` y `saveTheme` con `try/catch`, la guarda y la forma
   modular actual (regla 3).
3. `theme.js` figura en DT-11 (BOM): no cambies su BOM y repórtalo.

### Tarea 2: Verificación de SM-03

1. `pnpm run build:cf` sin errores nuevos.
2. Primera visita en claro y en oscuro (perfil limpio): clase correcta, **sin** valor en `localStorage`, sin parpadeo.
3. Alternar con el botón: la clase cambia y se guarda; recargar mantiene la elección.
4. Valor guardado previo (`light` o `dark`): se respeta tras recargar.
5. Cambiar la preferencia del sistema sin elección guardada: registra el comportamiento observado (sin inventar uno
   nuevo).
6. `localStorage` bloqueado o con error: la página no falla.
7. Script en línea de `BaseLayout.astro` con el mismo SHA-256 de la Tarea 0.3.

### Tarea 3: Registro de la iteración

Bitácora `bitacora-epica-09/bitacora-iteracion-04.md` (plantilla §8.2) con la decisión, línea base, resultados con
etiquetas de evidencia, la limitación conocida y desviaciones.

### Tarea 4: Cierre formal de la Épica 09

1. Verificación final: `pnpm run build:cf`; 7 viewports × 2 temas sin regresiones fuera de lo que cada pedido cambia;
   carrusel, textos, trampa de foco, modales y tema funcionando juntos; invariantes de `AGENTS.md` §5 (en especial la
   regla 7).
2. Definition of Done de la definición de la épica, casilla por casilla, con evidencia; actualiza su estado.
3. Reservas heredadas (Safari y dispositivo Apple; ruido de píxeles de Servicios): estado según lo que informe el
   desarrollador. Si probó en Apple, registra el resultado (y cierra la reserva de Servicios si no hay diferencia
   visible); si no, ambas siguen abiertas.
4. `bitacora-epica-09/bitacora-cierre-epica-09.md` con la estructura de `bitacora-cierre-epica-08.md`: resumen, DoD,
   cifras, deuda técnica (verificada contra `_planificacion/README.md` §12, sin rangos incompletos), decisiones
   (ADR-004), reservas, desviaciones, verificación posterior a la fusión y siguiente paso (Épica 10).
5. Propuestas -/+ para protegidos, con líneas completas verificadas en el repositorio: estado de SM-01 a SM-03 en
   `_planificacion/README.md` §14, DT-20 en §12 según la medición de la It. 02, roadmap de `README.md`, y las de
   `DESIGN.md` que hayan quedado pendientes de la It. 02. Comprueba que cada sección citada existe.
6. Línea final en `estado-actual.md` (BOM, CRLF, sin salto final; verifica bytes).
7. Mensaje de commit sugerido: `Épica 09 - Iteración 04: SM-03 tema en la primera visita y cierre de la épica`.

---

## 3. Auditoría de No-Regresión e Invariantes

* Script en línea del tema intacto (mismo SHA-256; ADR-003).
* Alternancia del tema con View Transitions igual que hoy.
* Contraste sin cambios en ambos temas.
* Todas las páginas sin regresiones; header intacto (regla 7).

---

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Primera visita**
    * **Dado** un perfil limpio,
    * **Cuando** carga cualquier página,
    * **Entonces** el tema coincide con la preferencia del sistema y no se escribe nada en `localStorage`.
* **Escenario 2: Elección del usuario**
    * **Dado** el botón de tema,
    * **Cuando** se alterna,
    * **Entonces** el tema cambia, se guarda y se respeta al recargar.
* **Escenario 3: ADR-003**
    * **Entonces** el script en línea de `BaseLayout.astro` no cambió.
* **Escenario 4: Cierre**
    * **Dado** la Definition of Done de la épica,
    * **Entonces** cada casilla tiene evidencia o una reserva registrada con su destino, y existen la bitácora de la
      iteración, la de cierre y las propuestas -/+ para los protegidos, sin commits hechos por Claude Code.