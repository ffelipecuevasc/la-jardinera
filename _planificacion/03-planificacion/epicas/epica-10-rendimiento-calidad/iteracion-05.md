# Iteración 05: Suscripción Floral (Hero, LCP y Código Muerto)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de editar, lee `AGENTS.md` §5 (reglas 2, 3, 9 y 10), `DESIGN.md`
§11.7, §12 y §14, `decisiones-tecnicas.md` (ADR-004: patrón del carrusel del Inicio), `src/pages/suscripcion-floral.astro`,
`src/js/modules/subscription.js`, `src/js/modules/hero-carousel.js` y las bitácoras de las Iteraciones 01 a 04 de esta
épica. Verifica con `git status` y `git log -1` que estás en la rama de la épica con las iteraciones anteriores
integradas. No inventes decisiones.

**Autorización explícita de esta iteración:** se completa al aprobar la iteración (previsto: `suscripcion-floral.astro`,
`subscription.js`, `src/css/input.css` si hace falta una clase del carrusel, `public/images/suscripcion/` para variantes
nuevas, la bitácora y `estado-actual.md`). Git es de solo lectura.

---

## 1. Objetivo de la Iteración

1. **DT-36 (decisión del desarrollador, 25-10-2026):** el fundido del hero cambia cada **5 s** (hoy 4 s), con botón de
   pausa/reproducir de 44×44 px según el patrón del Inicio (ADR-004), foto fija con movimiento reducido, solo la foto
   visible expuesta a lectores de pantalla y lo que falte al medir.
2. **DT-27:** recuperar el rendimiento de la página respecto de la referencia anterior a Astro (escritorio 93 → 89, LCP
   móvil 4,43 → 8,45 s con `hero-1.webp`), con la causa confirmada en la Iteración 01.
3. **Imágenes del hero (hallazgo del asesor, 25-10-2026):** las 4 fotos miden 2752×1536 px (horizontales) pero el
   marcado declara `width="720" height="1280"` (vertical) y no hay variante móvil, así que un celular descarga la foto de
   escritorio completa.
4. **DT-29:** retirar de `subscription.js` el manejo de `#show-plans-btn` y `#hide-plans-btn`, que no existen, sin
   cambiar el comportamiento visible del acordeón de planes.

### 1.1 Decisiones del desarrollador

| ID | Decisión | Estado |
|:---|:---------|:-------|
| DT-36 | Intervalo de 5 s, botón de pausa de 44×44 px, movimiento reducido con foto fija, solo la foto visible para lectores de pantalla (25-10-2026). | Resuelta |

| ID | Decisión pendiente | Opciones | Estado |
|:---|:---------|:---------|:-------|
| D-01 | Efecto | a) Mantener el fundido (`opacity`) con el nuevo intervalo. b) Unificarlo con el desplazamiento horizontal del Inicio. | Pendiente de definir |
| D-02 | Ubicación y aspecto del botón de pausa | Propuesta: igual que en el Inicio (esquina inferior derecha del hero, mismo ícono y tinte). | Pendiente de definir |
| D-03 | Pausas automáticas | Propuesta: las de hoy (pestaña oculta y hero fuera de pantalla) y la pausa del usuario prevalece, como en el ADR-004. | Pendiente de definir |
| D-04 | Variantes del hero | a) `<picture>` con versión vertical para móvil (recorte de cada foto, aprobado por el desarrollador) y horizontal para escritorio. b) Solo corregir `width`/`height` y recomprimir. | Pendiente de definir |
| D-05 | Textos alternativos | Hoy dicen «Ramo de suscripción floral 1» a «4». Propuesta: descripciones reales, aprobadas por el desarrollador. | Pendiente de definir |
| D-06 | Módulo | a) Reutilizar `hero-carousel.js` parametrizado. b) Mantener la lógica en `subscription.js`. | Pendiente de definir |

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Línea base (solo lectura)

1. Comportamiento actual del hero en los 7 viewports: intervalo, pausas, lectura con lector de pantalla (árbol de
   accesibilidad), movimiento reducido.
2. Carga del hero (orden, prioridad, bytes) y elemento LCP en 360×740 y 1280×800 [medido].
3. Contraste actual del texto del hero sobre las 4 fotos (método del percentil 95 de la Épica 09 · It. 02).

### Tarea 1: Hero (DT-36 y D-01 a D-06)

Implementa lo decidido. Reglas: objetivos de 44×44 px, `aria-label` alternante, foco visible, ningún `aria-live` que
anuncie cada cambio, solo la foto visible expuesta (`aria-hidden` o `alt=""` en las demás según el patrón del Inicio).

### Tarea 2: Imágenes del hero (DT-27 y D-04)

Dimensiones declaradas reales, prioridad solo en la primera foto, fotos 2 a 4 sin competir con el LCP. Si cambian las
fotos o su recorte, repite la medición de contraste para cada una.

### Tarea 3: Código muerto (DT-29)

Retira solo el manejo de `#show-plans-btn` y `#hide-plans-btn`. El acordeón de planes funciona igual.

### Tarea 4: Verificación

1. `pnpm run build:cf` sin errores.
2. Hero: intervalo de 5 s, pausa del usuario, pausas automáticas, movimiento reducido y lector de pantalla.
3. Contraste del hero en las 4 fotos, 7 viewports y 2 temas.
4. Lighthouse (diagnóstico) de Suscripción Floral: Performance, LCP y CLS antes y después.
5. Render de la página en los 7 viewports × 2 temas.

### Tarea 5: Registro

Bitácora, línea en `estado-actual.md`, propuestas -/+ (`DESIGN.md` §11.7 y §12, y el ADR que corresponda si el patrón
se generaliza) y mensaje de commit: `Épica 10 - Iteración 05: hero de Suscripción Floral, LCP y código muerto.`

---

## 3. Auditoría de No-Regresión e Invariantes

* El carrusel del Inicio sigue igual (ADR-004), incluso si se reutiliza su módulo.
* Acordeón de planes, formulario y demás secciones de Suscripción Floral sin cambios.
* Sin JS ni CSS en línea; módulos con cláusula de guarda.

---

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Pausa**
    * **Dado** el hero de Suscripción Floral,
    * **Cuando** se pulsa el botón de pausa,
    * **Entonces** el cambio de fotos se detiene y no se reanuda solo.
* **Escenario 2: Movimiento reducido**
    * **Entonces** con `prefers-reduced-motion: reduce` se ve una sola foto fija y no hay botón.
* **Escenario 3: Lector de pantalla**
    * **Entonces** solo se expone la foto visible.
* **Escenario 4: Rendimiento**
    * **Entonces** el LCP móvil y la Performance de escritorio mejoran respecto de la It. 01, o la desviación queda
      registrada con su causa.
* **Escenario 5: Código muerto**
    * **Entonces** `subscription.js` no menciona `show-plans-btn` ni `hide-plans-btn` y el acordeón funciona igual.