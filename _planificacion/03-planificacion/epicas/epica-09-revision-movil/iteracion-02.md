# Iteración 02: SM-02 — Trampa de foco del panel móvil

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de editar, lee `AGENTS.md` §5 (reglas 3, 7 y 10), `src/js/modules/navigation.js` completo y `src/components/SiteHeader.astro`. Verifica con `git status` y `git log -1` que partes de la rama de la épica con la Iteración 01 ya integrada y sin cambios pendientes. Esta iteración **no inventa decisiones**: las marcadas «D-xx» vienen resueltas en el prompt de ejecución; si falta alguna, detente y repórtalo.

**Autorización explícita de esta iteración:** puedes editar únicamente `src/js/modules/navigation.js`, los archivos de bitácora de la iteración y agregar una línea al final de `_planificacion/04-bitacora/estado-actual.md`. `SiteHeader.astro` solo si el desarrollador lo autoriza expresamente por D-02 (p. ej. atributos para la solución elegida); en ese caso respeta la regla 7 (ningún descendiente de `<header>` con `fixed`; `#mobile-menu-scrim` inmediatamente después de `</header>`; barra `h-20`, panel `top-full max-h-[calc(100dvh-5rem)]`, scrim `top-20`). No edites archivos protegidos. Git es de solo lectura.

---

## 1. Objetivo de la Iteración

Resolver SM-02: con el panel móvil abierto (menos de 1024 px), Tab y Shift+Tab deben mantenerse dentro del panel; Escape lo cierra y devuelve el foco a la hamburguesa. Hoy `initNavigation()` no tiene trampa de foco ni foco inicial: el foco sale al contenido de la página y solo Escape lo devuelve (idéntico a la referencia; no es una regresión de la Épica 08).

**Decisiones del desarrollador requeridas:**

| ID | Decisión | Estado |
|:---|:---------|:-------|
| D-01 | Alcance del ciclo: ¿la hamburguesa (y el botón de tema) forman parte del ciclo o solo los enlaces del panel? | Pendiente de definir |
| D-02 | Mecanismo: trampa con JS (Tab/Shift+Tab sobre el primer y último elemento enfocable) o `inert` sobre el resto de la página, o combinación. | Pendiente de definir |
| D-03 | Foco inicial al abrir (primer enlace, el panel u otro) y comportamiento al cerrar con clic en el scrim o en un enlace. | Pendiente de definir |

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Comportamiento actual (solo lectura)

1. `git status`, `git log -1 --oneline`. `pnpm run build:cf`.
2. Con Chrome *headless* (perfil aislado), en 360×740 y 412×915, abre el panel y registra con teclado simulado: dónde queda el foco al abrir, a dónde va con Tab desde el último enlace del panel, y qué hace Escape. Esa es la línea base.
3. Lista los elementos enfocables del panel y de la barra (enlaces de navegación, botones de WhatsApp y Instagram del panel, botón de tema, hamburguesa).

### Tarea 1: Implementación en `navigation.js`

1. Mantén `initNavigation()` con su cláusula de guarda (`if (!menuBtn || !menu) return;`), selectores cacheados y delegación de eventos (regla 3); nada en `window`.
2. Implementa lo decidido en D-01 a D-03. Si usas `keydown`, hazlo sobre un único listener ya existente o uno nuevo con delegación, y retíralo o ignóralo cuando el panel esté cerrado.
3. Conserva sin cambios: `setOpen(open)`, la gestión de `hidden`, `overflow-hidden`, `aria-expanded` y `aria-label` («Abrir menú»/«Cerrar menú»), Escape con `menuBtn.focus()`, el cierre por el clic en el scrim, por clic en un enlace del panel y por cruzar `(min-width: 1024px)`.
4. Si usas `inert`, asegúrate de quitarlo en todos los caminos de cierre (incluido el cambio a escritorio) para no dejar la página bloqueada.
5. Sin JS ni CSS inline; sin nuevas dependencias.

### Tarea 2: Verificación

1. `pnpm run build:cf` sin errores ni advertencias nuevas.
2. Render real con teclado simulado en 320×640, 360×740, 412×915, 768×1024 y 740×360, panel abierto: Tab y Shift+Tab ciclan dentro del ámbito decidido; Escape cierra y devuelve el foco a la hamburguesa; el foco inicial es el decidido; clic en el scrim y en un enlace cierran sin dejar `inert` ni `overflow-hidden` residual.
3. Cruce de breakpoint: con el panel abierto, ensanchar a 1024 px o más cierra el panel y deja la página interactiva.
4. 1024×768 y 1280×800: sin cambios de comportamiento ni de aspecto.
5. `aria-expanded` y `aria-label` sincronizados en cada transición (regla 10); foco visible; objetivos de al menos 44×44 px.
6. Header intacto (regla 7). Las otras páginas funcionan igual.
7. Pide al desarrollador una prueba manual con teclado real y, si dispone de uno, con un lector de pantalla (marcada como [informado]).

### Tarea 3: Registro

1. Bitácora `_planificacion/04-bitacora/bitacora-epica-09/bitacora-iteracion-02.md`: decisiones D-01 a D-03, línea base, resultados con etiquetas de evidencia, desviaciones.
2. Línea al final de `estado-actual.md` (BOM, CRLF, sin salto final; verifica bytes).
3. Mensaje de commit sugerido: `Épica 09 - Iteración 02: SM-02 trampa de foco del panel móvil`.

---

## 3. Criterios de Aceptación (Definition of Done)

* **Dado** el panel móvil abierto, **cuando** se pulsa Tab desde el último elemento del ámbito o Shift+Tab desde el primero, **entonces** el foco rota dentro del panel y no llega al contenido de la página.
* **Dado** el panel abierto, **cuando** se pulsa Escape, **entonces** se cierra y el foco vuelve a la hamburguesa.
* **Dado** el panel que se cierra por cualquier camino (Escape, scrim, enlace, cambio a escritorio), **entonces** la página queda interactiva y sin residuos (`inert`, `overflow-hidden`).
* **Dado** el panel cerrado o en escritorio, **cuando** se navega con Tab, **entonces** el orden natural no cambia.
* **Dado** `AGENTS.md` §5, **entonces** reglas 3, 7 y 10 se mantienen.
