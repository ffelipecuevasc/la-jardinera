# Iteración 04: Galería (Videos con Carga Diferida y Control del Movimiento)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de editar, lee `AGENTS.md` §5 (reglas 2, 3, 9 y 10), `DESIGN.md` §12
(movimiento), `decisiones-tecnicas.md` (ADR-004, como patrón de pausa), `src/pages/galeria.astro`,
`src/js/modules/gallery.js` y las bitácoras de las Iteraciones 01 a 03 de esta épica. Verifica con `git status` y
`git log -1` que estás en la rama de la épica con las iteraciones anteriores integradas. No inventes decisiones.

**Autorización explícita de esta iteración:** se completa al aprobar la iteración. La lógica nueva vive en un módulo de
`src/js/modules/` con `initX()` y cláusula de guarda, importado en `main.js` (regla 3). Los videos originales no se
borran del disco. Git es de solo lectura.

---

## 1. Objetivo de la Iteración

1. **DT-26:** la Galería carga 10 `<video>` con `autoplay loop muted playsinline`, sin `preload` ni `poster`: 48,8 MB en
   total (`nmg2.mp4` pesa 22.715.000 B; `nmg5.mp4`, 8.098.647 B; `ddm2.mp4`, 4.928.653 B). Que la carga inicial no los
   descargue completos y que cada uno se reproduzca solo cuando está en pantalla.
2. **Movimiento (WCAG 2.2.2 y `DESIGN.md` §12.4):** hoy los videos se mueven solos y en bucle, sin control de pausa ni
   alternativa con movimiento reducido. Es el mismo criterio del carrusel del Inicio (ADR-004) y de DT-36.
3. **DT-23 en la Galería:** confirmar que las 24 imágenes quedaron con dimensiones en la Iteración 02.

### 1.1 Decisiones del desarrollador

| ID | Decisión | Opciones | Estado |
|:---|:---------|:---------|:-------|
| D-01 | Póster de cada video | a) WebP generado del primer fotograma (o de uno elegido), con `width` y `height`. b) Sin póster, con fondo de color del sistema. | Pendiente de definir |
| D-02 | Carga | a) `preload="none"` y reproducción al entrar en pantalla, pausa al salir (`IntersectionObserver`). b) `preload="metadata"` con reproducción automática como hoy. | Pendiente de definir |
| D-03 | Control del movimiento | a) Un botón de pausa/reproducir de 44×44 px por video. b) Un solo botón para todos los videos de la página. c) Reproducir solo al tocar o pasar el puntero (sin reproducción automática). | Pendiente de definir |
| D-04 | Movimiento reducido | Propuesta: con `prefers-reduced-motion: reduce`, solo el póster y reproducción a petición. | Pendiente de definir |
| D-05 | Recodificar los videos más pesados | a) Sí, con resolución y tasa de bits propuestas por la Tarea 0 y aprobación visual del desarrollador. b) No. | Pendiente de definir |

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Línea base (solo lectura)

1. PageSpeed Insights (D-03 de la épica, §6.1 de la definición) en la vista previa de la rama con la Iteración 03
   integrada, en las 5 páginas (la It. 03 tocó el layout común): «después» de la It. 03 y «antes» de esta iteración en
   la Galería [medido].
2. Por video: bytes, resolución, duración, códec y tasa de bits; tamaño en que se muestra en 360×740 y 1280×800.
3. Bytes descargados por la Galería en los primeros 10 s de carga, en 360×740 y 1280×800 (Chrome *headless*, solo red)
   [medido].
4. Comportamiento actual de la ampliación (`gallery.js`) con videos e imágenes.

### Tarea 1: Pósteres y carga

Según D-01 y D-02. El aspecto de cada tarjeta antes de reproducirse no cambia (mismo encuadre).

### Tarea 2: Control del movimiento

Según D-03 y D-04: objetivos de 44×44 px, `aria-label` y `aria-pressed` sincronizados, foco visible, contraste AA del
ícono sobre el video en ambos temas. La pausa del usuario prevalece sobre la reanudación automática.

### Tarea 3: Recodificación

Solo si D-05 es a). Por video: bytes antes y después y captura de un fotograma.

### Tarea 4: Verificación

1. `pnpm run build:cf` sin errores.
2. Bytes de los primeros 10 s antes y después.
3. Reproducción al entrar y pausa al salir; botón de pausa; movimiento reducido; ampliación de cada video e imagen.
4. Render de la Galería en los 7 viewports × 2 temas.
5. Sin puntajes locales (D-03 de la épica): la Galería se mide en la vista previa al inicio de la Iteración 05
   (Tarea 0).

### Tarea 5: Registro

Bitácora, línea en `estado-actual.md`, propuestas -/+ (`DESIGN.md` §12) y mensaje de commit:
`Épica 10 - Iteración 04: videos de la Galería con carga diferida y control del movimiento.`

---

## 3. Auditoría de No-Regresión e Invariantes

* Ampliación de la Galería con el mismo comportamiento.
* Sin JS ni CSS en línea; módulo con cláusula de guarda; nada en `window`.
* Las demás páginas sin cambios.

---

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Carga inicial**
    * **Dado** la Galería recién abierta,
    * **Entonces** los bytes de video de los primeros 10 s bajan respecto de la Tarea 0, con cifras.
* **Escenario 2: Reproducción**
    * **Cuando** un video entra en pantalla, **entonces** se reproduce según D-02; **cuando** sale, se pausa.
* **Escenario 3: Movimiento**
    * **Entonces** todo video en movimiento automático tiene control de pausa y respeta `prefers-reduced-motion`.
* **Escenario 4: Ampliación**
    * **Entonces** la ampliación funciona igual que antes con cada video e imagen.