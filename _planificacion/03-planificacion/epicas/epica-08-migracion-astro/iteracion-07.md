# Iteración 07 (Opcional): Tema Oscuro sin Destello Inicial

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Iteración **opcional** que requiere una **excepción explícita** a la regla "cero JS en línea" (`AGENTS.md` §5.2). Hoy
`theme.js` aplica el tema en `DOMContentLoaded`, cuando la página ya se pintó: quien usa modo oscuro ve un destello
claro en cada carga (DT-15). La única forma de evitarlo es decidir el tema **antes** del primer pintado, con un script
mínimo y bloqueante en el `<head>`. Astro lo permite con `<script is:inline>`. Si el desarrollador no aprueba la
excepción, esta iteración se cierra sin cambios y DT-15 queda aceptada.

**Autorización explícita de esta iteración:** edición de `src/layouts/BaseLayout.astro` (un único script en el
`<head>`), y de `src/js/modules/theme.js` solo si hace falta evitar trabajo duplicado. Registro de la excepción en
`decisiones-tecnicas.md` y propuesta de edición para `AGENTS.md` §5.2.

## 1. Objetivo de la Iteración

Que la primera imagen de cada página ya tenga el tema correcto, sin cambiar cómo se elige ni cómo se alterna.

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Medición previa

Con preferencia del sistema en modo oscuro y sin `localStorage`, graba o captura la carga de Inicio y Galería (red
limitada) y deja constancia del destello. Sin evidencia del problema, la iteración no sigue.

### Tarea 1: Script de arranque

En el `<head>` de `BaseLayout`, antes del CSS, un solo `<script is:inline>` de pocas líneas que:

1. Lea `localStorage.getItem('theme')` dentro de `try/catch` (puede fallar en modo privado).
2. Aplique `dark` o `light` a `<html>` con la **misma regla** que `setInitialTheme()` de `theme.js` (tema guardado o,
   si no hay, `prefers-color-scheme`).
3. No escriba en `localStorage` ni cree variables globales (envolverlo en una función autoejecutable).

`theme.js` conserva el botón de alternancia y la View Transitions API. Si su `setInitialTheme()` queda redundante,
puede seguir ejecutándose (es idempotente); quitarlo es opcional y se documenta.

### Tarea 2: Excepción documentada

1. `decisiones-tecnicas.md`: "Excepción a la regla de JS en línea: script de arranque del tema" con motivo, contenido
   exacto permitido y prohibición de agregar cualquier otro.
2. Propuesta de edición para `AGENTS.md` §5.2 y para el DoD de la épica (§8), que hoy exige 0 `<script>` sin `src`.

### Tarea 3: Verificación

1. Repite la medición de la Tarea 0: sin destello.
2. Alternar el tema, recargar y navegar entre páginas conserva la elección.
3. Con `localStorage` bloqueado, la página carga con el tema del sistema y sin errores en consola.
4. Búsqueda en `_site/`: exactamente un `<script>` sin `src` por página, idéntico en las 6.

### Tarea 4: Registro

Bitácora, `estado-actual.md`, DT-15 ✅ y commit sugerido `Épica 08 - Iteración 07: Aplica el tema antes del primer pintado.`

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Sin destello**
    * **Dado** un sistema en modo oscuro
    * **Cuando** se carga cualquier página con red limitada
    * **Entonces** no se ve un fondo claro antes del oscuro.
* **Escenario 2: Comportamiento intacto**
    * **Dado** el botón de tema
    * **Cuando** se alterna y se recarga
    * **Entonces** se conserva la elección, igual que antes.
* **Escenario 3: Excepción acotada**
    * **Dado** `_site/**/*.html`
    * **Cuando** se buscan scripts en línea
    * **Entonces** solo existe el de arranque del tema, documentado en `decisiones-tecnicas.md`.
