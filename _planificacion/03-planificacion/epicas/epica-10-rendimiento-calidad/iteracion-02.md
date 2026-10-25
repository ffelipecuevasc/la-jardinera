# Iteración 02: Imágenes (Logotipos, Dimensiones, Recompresión y Carga del Carrusel)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de editar, lee `AGENTS.md` §5 (reglas 2, 4, 8 y 9), `DESIGN.md` §5
(punto 10), §11.7, §12 y §13, la bitácora de la Iteración 01 de esta épica (inventario y diagnóstico), `SiteHeader.astro`,
`BaseLayout.astro`, `index.astro`, `galeria.astro` y `src/js/modules/hero-carousel.js`. Verifica con `git status` y
`git log -1` que estás en la rama de la épica con la Iteración 01 integrada. No inventes decisiones.

**Autorización explícita de esta iteración:** se completa al aprobar la iteración (lista de archivos según las decisiones
del §1.1). Las herramientas de imagen se ejecutan con `pnpm dlx` y versión fija, sin agregarlas a `package.json`. Los
originales de las imágenes reemplazadas no se borran del disco: se informa su ruta para que el desarrollador decida. Git
es de solo lectura.

---

## 1. Objetivo de la Iteración

1. **DT-22:** logotipos del header y favicon con un tamaño acorde a como se muestran (hoy 3446×3504 px para 44×44 px),
   y que cada página descargue solo la variante que muestra si la Iteración 01 confirma la doble descarga (definición,
   §2.2).
2. **DT-23:** `width` y `height` reales en las 9 imágenes del Inicio y las 24 de la Galería que no los declaran, con
   contenedores que eviten desplazamientos (regla 9).
3. **Recompresión** de las imágenes que la Iteración 01 marque con más ahorro, empezando por `galeria-2.webp`
   (1.342.888 B), `servicio-novias.webp` (1.051.730 B) y `servicio-magu.webp` (1.025.868 B), que miden 928×1152 px.
4. **Carrusel del Inicio (DT-35, peso):** que las fotos 2 a 4 no se descarguen antes de hacer falta, sin cambiar el
   comportamiento aprobado en el ADR-004.

### 1.1 Decisiones del desarrollador

| ID | Decisión | Opciones | Estado |
|:---|:---------|:---------|:-------|
| D-01 | Logotipo del header | a) WebP a 2× y 3× del tamaño mostrado (88 y 132 px) con `srcset`. b) SVG, solo si existe un original vectorial. c) PNG reducido. | Pendiente de definir |
| D-02 | Favicon | a) Juego estándar: `favicon.ico` 32 px, PNG 192 px y `apple-touch-icon` 180 px. b) Un solo PNG pequeño. | Pendiente de definir |
| D-03 | Imágenes adaptables (`srcset`/`sizes`) | a) Variantes pregeneradas en `public/images/` con `srcset` (cumple la regla 9). b) Solo recomprimir, sin variantes. c) Migrar a `astro:assets` (exige mover imágenes a `src/` y cambiar la regla 9). | Pendiente de definir |
| D-04 | Calidad de recompresión | Calidad WebP y criterio de aprobación visual (por ejemplo: sin diferencia visible a 100 % de zoom en 1280×800, aprobada por el desarrollador). | Pendiente de definir |
| D-05 | Carga de las fotos 2 a 4 del carrusel | a) Foto 2 tras el evento `load` y fotos 3 y 4 justo antes de su turno. b) Las 3 tras `load` con prioridad baja. c) Sin cambios. | Pendiente de definir |
| D-06 | Archivos de `public/` sin uso (lista de la It. 01) | a) Proponer su retiro con `git rm` (lo ejecuta el desarrollador). b) Dejarlos. | Pendiente de definir |

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Línea base de la iteración (solo lectura)

1. `git status`, `git log -1 --oneline`, `pnpm run build:cf`.
2. PageSpeed Insights (D-03 de la épica, §6.1 de la definición) en la vista previa de la rama con la Iteración 01
   integrada, en las páginas que tocará esta iteración (según D-01 a D-06): es el «antes» de esta iteración [medido]. La
   URL de la vista previa la entrega el desarrollador.
3. Bytes de imagen descargados en la carga inicial de cada página de D-04, en 360×740 y 1280×800 (Chrome *headless*,
   solo red) [medido].
4. Capturas de referencia de cada imagen afectada en los 7 viewports y ambos temas.

### Tarea 1: Logotipos y favicon (DT-22)

Según D-01 y D-02. El header mantiene sus invariantes (regla 7) y el mismo aspecto a la vista en ambos temas.

### Tarea 2: Dimensiones declaradas (DT-23)

1. `width` y `height` con las dimensiones reales de cada archivo (o de su variante principal si se aplica D-03).
2. Verifica que cada contenedor ya fija la proporción (`aspect-*` u otra altura fija). Si alguno no la fija, entrégalo
   como propuesta: no cambies el diseño.
3. Revisa `loading` y `fetchpriority`: `lazy` solo bajo el pliegue y `high` solo en el LCP de cada página (según la
   It. 01).

### Tarea 3: Recompresión y variantes

Según D-03 y D-04, en las imágenes que la Iteración 01 priorice. Por imagen: bytes antes y después, dimensiones, calidad
usada y captura comparativa. Las fotos del hero del Inicio solo se tocan si D-04 lo aprueba, y en ese caso se repite su
medición de contraste (Épica 09 · It. 02, método del percentil 95).

### Tarea 4: Fotos 2 a 4 del carrusel

Según D-05, en `hero-carousel.js` y el marcado del hero. Se conservan el intervalo de 7 s, el botón de pausa, las pausas
automáticas y el movimiento reducido (ADR-004). Ninguna transición puede mostrar una foto a medio cargar.

### Tarea 5: Verificación

1. `pnpm run build:cf` sin errores ni advertencias nuevas.
2. Bytes de imagen en la carga inicial, antes y después, por página y viewport.
3. Render en los 7 viewports × 2 temas: sin diferencias visibles fuera de lo decidido.
4. Sin puntajes locales (D-03 de la épica): el «después» de PageSpeed se mide en la vista previa al inicio de la
   Iteración 03 (Tarea 0). Aquí se verifican bytes y render.
5. Invariantes de `AGENTS.md` §5 y SHA-256 del script del tema.

### Tarea 6: Registro

Bitácora `bitacora-epica-10/bitacora-iteracion-02.md`, línea en `estado-actual.md`, propuestas -/+ para protegidos
(`DESIGN.md` §13 y, si cambia, `AGENTS.md` regla 9) y mensaje de commit:
`Épica 10 - Iteración 02: logotipos, dimensiones y recompresión de imágenes.`

---

## 3. Auditoría de No-Regresión e Invariantes

* Header (regla 7) y script del tema (ADR-003) intactos.
* Carrusel del Inicio con el mismo comportamiento (ADR-004).
* Ninguna imagen cambia de encuadre ni de proporción visible.
* Sin JS ni CSS en línea; sin dependencias nuevas.

---

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Logotipos**
    * **Dado** el header en cualquier página,
    * **Entonces** el logotipo descargado pesa menos de 30 KiB y se ve igual en ambos temas.
* **Escenario 2: Dimensiones**
    * **Entonces** 0 `<img>` sin `width` y `height` en `_site/**/*.html`.
* **Escenario 3: Peso**
    * **Entonces** los bytes de imagen de la carga inicial bajan en cada página tocada, con la tabla antes/después.
* **Escenario 4: Carrusel**
    * **Dado** el Inicio,
    * **Entonces** las fotos 2 a 4 no se piden antes del LCP y el carrusel no muestra fotos a medio cargar.
* **Escenario 5: Sin cambios visibles**
    * **Entonces** 7 viewports × 2 temas sin diferencias fuera de lo decidido.