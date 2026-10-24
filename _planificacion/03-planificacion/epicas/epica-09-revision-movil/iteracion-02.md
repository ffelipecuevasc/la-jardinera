# Iteración 02: Carrusel del Hero y SM-01 (Hero Móvil del Inicio)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de tocar cualquier archivo, lee `AGENTS.md` (§5, reglas 2, 3,
4, 5, 7 y 10), `DESIGN.md` (§3 tokens de contraste fijo, §5 punto 10, §7 titular del Hero, §11.7 tarjeta de vidrio,
§12 movimiento, §13 imágenes, §14 accesibilidad), `_planificacion/04-bitacora/decisiones-tecnicas.md` (formato de los
ADR), la definición de la épica, `src/pages/index.astro`, `src/css/input.css`, `src/js/main.js`,
`src/js/modules/subscription.js` (patrón de pausa por visibilidad, L53 a L62) y
`_planificacion/04-bitacora/bitacora-epica-01/bitacora-iteracion-08.md` (método de contraste). Verifica con
`git status` y `git log -1` que estás en `feat/revision-movil` con la Iteración 01 integrada y sin cambios pendientes.
Lo marcado «Pendiente de definir» viene resuelto en el prompt de ejecución; si falta, detente y repórtalo.

**Autorización explícita de esta iteración:** puedes editar `src/pages/index.astro` (solo `#titular`),
`src/css/input.css`, `src/js/main.js` (solo para registrar el módulo nuevo), crear
`src/js/modules/hero-carousel.js`, crear `public/images/inicio/` y mover, renombrar o generar ahí las fotografías del
hero, agregar el ADR-004 a `_planificacion/04-bitacora/decisiones-tecnicas.md`, escribir la bitácora y agregar una
línea al final de `estado-actual.md`. No edites archivos protegidos: `DESIGN.md` (§5, §7, §12, §13) se actualiza
mediante propuesta -/+ con líneas completas. No toques el tinte `bg-dark-background/45` sin aprobación. Git es de solo
lectura.

---

## 1. Objetivo de la Iteración

1. Reemplazar la fotografía estática del hero por un **carrusel automático de 4 fotografías** con desplazamiento
   horizontal, accesible y sin perjudicar la carga inicial.
2. Resolver **SM-01** (hero móvil del Inicio).
3. Medir el contraste del hero **una sola vez para las 4 fotografías**, con el `h1` y el párrafo ya en su tamaño final.
4. Registrar el patrón del carrusel en el **ADR-004**.

### 1.1 Fotografías

Orden de rotación (D-06) y archivos de origen, medidos el 24-10-2026:

| N.º | Foto | Origen (en `public/images/` al iniciar) | Dimensiones | Peso | Luminosidad del centro (0 a 255) |
|:---:|:-----|:-----------------------------------------|:------------|:-----|:-------------------------------:|
| 1 | Actual: manos envolviendo el ramo | `hero-botanical-desktop.webp` y `hero-botanical-mobile.webp` | 2752×1536 y 1536×2752 | 159 y 191 KB | 126 |
| 2 | Salón de eventos con lámparas y faroles | `hero-botanical-1 (1).webp` | 2752×1536 | 730 KB | 81 |
| 3 | Mesa de madera blanca con arreglos de colores (foto anterior del hero) | `hero-botanical.webp` | 5504×3072 | 454 KB | 111 |
| 4 | Florista sonriente en su taller | `hero-botanical-1 (2).webp` | 2752×1536 | 410 KB | 110 |

**Especificación de salida** (`DESIGN.md` §13): escritorio 2752×1536 WebP **≤ 300 KB** (objetivo 150 a 250 KB; la foto 2
debe recomprimirse); móvil WebP **≤ 200 KB**.

* **Foto 1:** se mueve sin recomprimir (paridad del LCP).
* **Foto 3** (5504×3072): la versión de escritorio se reduce a 2752×1536; la móvil se recorta desde el centro a
  1728×3072 y se reduce a **1536×2752**.
* **Fotos 2 y 4** (2752×1536, sin más resolución): su versión móvil es el **recorte nativo desde el centro a 864×1536**,
  **sin agrandar** (D-09). Se declaran sus medidas reales en `width`/`height`. Peso esperado 60 a 100 KB.
* La foto 4 tiene a la florista en el centro, bajo la tarjeta de vidrio; por eso va al final. Si la medición de
  contraste lo exige, se reporta.

**Ningún archivo con espacios ni paréntesis queda en `public/`**: todo lo que está en `public/` se despliega.

---

### 1.2 Decisiones del desarrollador

| ID | Decisión | Estado |
|:---|:---------|:-------|
| D-01 | Cantidad: 4 fotografías (la actual, la anterior y 2 nuevas). | Resuelta (24-10-2026) |
| D-02 | Intervalo: 7 s por foto; transición horizontal de unos 1 s (la entrante llega desde la derecha y la saliente sale por la izquierda). | Resuelta (24-10-2026) |
| D-03 | Botón pausa/reproducir obligatorio (WCAG 2.2.2), de al menos 44×44 px, en la **esquina inferior derecha del hero**, fuera de la tarjeta de vidrio y sin taparla en ningún viewport. `aria-label` alterna entre «Pausar presentación de imágenes» y «Reanudar presentación de imágenes». Si el usuario pausa, queda pausado hasta que reanude. | Resuelta (24-10-2026) |
| D-04 | Pausas automáticas: **solo** con la pestaña en segundo plano o con el hero fuera de pantalla. No hay pausa por foco de teclado ni por mouse encima (desviación consciente del patrón de carrusel del W3C; queda en el ADR-004). | Resuelta (24-10-2026) |
| D-05 | Movimiento reducido (`prefers-reduced-motion: reduce`): foto fija (la primera), sin rotación y sin botón de pausa. | Resuelta (24-10-2026) |
| D-06 | Orden de rotación: 1 Actual → 2 Salón → 3 Mesa → 4 Florista (§1.1). La primera lleva `fetchpriority="high"`. | Resuelta (24-10-2026) |
| D-07 | Nombres en `public/images/inicio/`: `hero-01-desktop.webp`, `hero-01-mobile.webp` … `hero-04-desktop.webp`, `hero-04-mobile.webp`. Los 3 originales (`hero-botanical.webp`, `hero-botanical-1 (1).webp`, `hero-botanical-1 (2).webp`) salen del árbol de Git (quedan en el historial; el desarrollador guarda copia en su disco). Claude Code **no borra nada antes de generar y verificar las 8 versiones**. | Resuelta (24-10-2026) |
| D-08 | `alt` aprobados por el desarrollador: foto 1 sin cambios («Manos de florista envolviendo en papel kraft un ramo de rosas fucsia, gerberas, claveles y alstroemerias»); foto 2 «Salón de eventos ambientado con faroles, lámparas de mimbre colgantes y arreglos de paniculata y follaje sobre una mesa de madera»; foto 3 «Mesa de madera blanca con arreglos de gerberas, rosas, alstroemerias y claveles de colores vivos en un salón con luces cálidas»; foto 4 «Florista sonriente armando un ramo en su taller, rodeada de flores frescas». Claude Code comprueba que cada uno describe su foto y reporta cualquier desajuste, sin cambiarlo. | Resuelta (24-10-2026) |
| D-09 | Versiones móviles de las fotos 2 y 4: recorte nativo 864×1536 sin agrandar (§1.1). Propuesta -/+ para `DESIGN.md` §13 en el registro. | Resuelta (24-10-2026) |
| D-10 | Cursivas de Montserrat 600 y 700 (+20 KB en Inicio): se dejan; se vuelve a medir el peso del Inicio en esta iteración, con las fotos. | Resuelta (24-10-2026) |
| SM-01 D-01 | `h1` en móvil `text-headline-xl-mobile` (32/40); párrafo `text-body-md` (16/24). Desde `md`, como hoy. | Resuelta (21-10-2026) |
| SM-01 D-02 | «Descubrir más» centrado en móvil; se mantiene el `border-t` de la fila de datos. | Resuelta (21-10-2026) |
| SM-01 D-03/D-04 | «Móvil» = menos de 768 px (`md`); desde 768 px, el hero queda idéntico al actual. 740×360 pasa a la vista móvil: es esperado. | Resuelta (21-10-2026) |
| SM-01 D-05 | Botones «Explorar Servicios» y «Suscripción Floral» sin cambios. | Resuelta (21-10-2026) |
| SM-01 D-06 | Sin cambios de marcado: «Valdivia» sigue visible en la franja de beneficios y en el footer. | Resuelta (21-10-2026) |

### 1.3 Código de ejemplo entregado por el desarrollador (CodePen de animaciones guiadas por *scroll*)

El ejemplo cambia las secciones **al desplazar la página** (`animation-timeline`, `scroll-snap`); el pedido es un
cambio **automático por tiempo**. Solo se reutiliza la idea del desplazamiento horizontal:

| Bloque del ejemplo | Destino |
|:-------------------|:--------|
| `@keyframes horizontal-scroll` (`translate3d(100%)` → `none` → `translate3d(-100%)`) | **Se adapta:** transiciones de entrada y salida en `src/css/input.css`, activadas por clases que pone el módulo JS. |
| `.content { overflow: hidden; inset: 0 }` | **Se adapta:** capas apiladas `absolute inset-0` dentro de `#titular`, **nunca `fixed`**. |
| `@layer base, rhythm, …` | Se elimina (choca con las capas de Tailwind 3). |
| `html { scroll-snap-type; timeline-scope }`, `.section`, `main { view-timeline }` | Se elimina (secuestra el *scroll* del sitio). |
| `blink`, `backwards-scroll`, `zoom-scroll`, `.indicator`, `indicate`, `fade-scroll`, `.site-header::after`, `body:has(...)` | Se elimina (no pedidos; colores y variables ajenos a `DESIGN.md`). |
| HTML: `<header>`, `<h1 class="sr-only">`, `<nav>`, secciones, `<footer>`, imágenes de CodePen | Se elimina (duplicaría el `h1` y el header). |

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Línea base (solo lectura)

1. `git status`, `git log -1 --oneline`, rama. `pnpm install --frozen-lockfile` y `pnpm run build:cf`: páginas y
   archivos de `_site/`.
2. Inicio en 320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768 y 1280×800, claro y oscuro (Chrome *headless*,
   perfil aislado): tamaño y alto de línea computados del `h1` y del párrafo, líneas del `h1`, alto de `.hero-glass`,
   *scroll* horizontal. Es la medición 🕒 PENDIENTE de `_planificacion/README.md` §14.
3. Capturas de línea base del hero (fuera del repositorio).
4. Contraste con el método de la Épica 01 · It. 08 (percentil 95 del fondo bajo la tarjeta), con la foto actual:
   blanco del `h1`, acento «La Jardinera» (`#ffc2c6`, DT-20), párrafo y «Descubrir más».
5. Medición de carga del Inicio (perfil móvil): LCP y peticiones de imágenes, como referencia.
6. Mide dimensiones y peso de los 4 orígenes de §1.1.

### Tarea 1: Fotografías

1. Según §1.1, D-07 y D-09, genera en `public/images/inicio/` las versiones de escritorio y móvil de las fotos 2, 3 y 4
   (herramienta disponible en el entorno; no agregues dependencias al `package.json`). Mueve la foto 1 sin recomprimir
   y renómbrala. Primero genera y verifica las 8 versiones y solo después retira los 3 originales del árbol.
2. Verifica dimensiones y pesos contra §1.1. Si algo excede el tope, reporta y propone calidad o recorte.
3. Retira de `public/` los 3 originales y todo archivo con espacios o paréntesis (D-07). `find public -name '* *' -o -name '*(*'` debe quedar vacío.

### Tarea 2: Marcado del hero (`index.astro`)

1. Un `<picture>` por foto, apilados `absolute inset-0` dentro de `#titular`, cada uno con su `<source
   media="(orientation: portrait)">`, `width`/`height` reales y `alt` (D-08). Solo el `<img>` de la primera foto lleva
   `fetchpriority="high"`.
2. Las fotos 2 a 4 no deben competir con el LCP: elige y justifica el método (p. ej. `loading="lazy"`, o asignar el
   `src` desde el módulo después de `load`) y demuéstralo con la lista de peticiones.
3. Fotos 2 a 4 ocultas para tecnologías de asistencia mientras no son visibles, o el conjunto marcado como región con
   `aria-roledescription="carrusel"`; justifica la opción en el ADR-004 y no anuncies cada cambio (no hay
   `aria-live` activo en rotación automática).
4. Botón según D-03, con foco visible (`focus-visible:ring-*` como el resto del hero) y SVG con
   `aria-hidden="true"`. Con movimiento reducido no se muestra (D-05).
5. SM-01: clases según sus decisiones (§1.2), solo tokens existentes y clases literales. Oculta bajo `md` el ícono y la
   fila de ubicación (`hidden md:flex`) sin dejar hueco; «Descubrir más» centrado con `border-t`; desde `md`, la fila
   como hoy. Conserva `aria-label`, `href="#servicios"` y `animate-bounce motion-reduce:animate-none`.
6. No cambies la tarjeta `hero-glass`, su tinte ni su contenido, salvo lo de SM-01.

### Tarea 3: Estilos (`input.css`)

1. Clases del carrusel en `@layer components`: estado visible, entrada desde la derecha y salida por la izquierda, con
   `transform` y la duración de D-02, con la curva y la duración más cercanas de `DESIGN.md` §12.3 (si ninguna
   coincide con unos 1 s, entrega propuesta -/+ en lugar de inventar un valor).
2. `@media (prefers-reduced-motion: reduce)`: sin transiciones ni animaciones del carrusel (`DESIGN.md` §12).
3. Sin colores ni medidas fuera de los tokens; sin `@layer` propios.

### Tarea 4: Módulo `src/js/modules/hero-carousel.js`

1. `export function initHeroCarousel()` con cláusula de guarda, selectores cacheados, nada en `window` (regla 3); se
   registra en `src/js/main.js` igual que los demás módulos.
2. Temporizador de 7 s (D-02); avanza en ciclo; nunca dos transiciones a la vez.
3. Pausa automática (D-04): `visibilitychange` e `IntersectionObserver` sobre `#titular`, siguiendo el patrón de
   `subscription.js`. La pausa del usuario (D-03) prevalece: volver a la pestaña no reanuda un carrusel pausado a mano.
4. Movimiento reducido (D-05): si `matchMedia('(prefers-reduced-motion: reduce)')` coincide, no arranca; escucha el
   cambio de la preferencia.
5. Botón: alterna estado, `aria-label` e ícono, y se maneja con delegación o un único listener.

### Tarea 5: Compilación y verificación

1. `pnpm run build:cf` sin errores ni advertencias nuevas. Clases nuevas presentes en el CSS de `_site/`. Las otras 5
   páginas, idénticas salvo el *hash* del CSS o del JS.
2. Render en los 7 viewports y 2 temas: rotación de las 4 fotos con el intervalo y la dirección decididos; sin
   *scroll* horizontal; la tarjeta no se mueve; el botón no tapa la tarjeta ni «Descubrir más»; SM-01 aplicada solo
   bajo 768 px.
3. `h1` y párrafo medidos de nuevo (tamaño, líneas); el `h1` no se corta en 320 px.
4. **Contraste** con el método de la Tarea 0.4, **para cada una de las 4 fotos**, en los 7 viewports y los 2 temas.
   Umbral: 3:1 para texto grande (`h1`), 4,5:1 para el resto; indica el umbral de cada elemento. Si algo no cumple,
   **no cambies el tinte**: reporta números y opciones (subir el tinte para todas, quitar esa foto) y espera la
   decisión. Actualiza el estado de DT-20 con los números nuevos.
5. Pausa: el botón detiene y reanuda; con la pestaña oculta o el hero fuera de pantalla, el temporizador no corre; la
   pausa manual persiste. Movimiento reducido emulado: foto fija y sin botón.
6. Carga: la primera foto sigue siendo el LCP y las otras 3 se piden después; compara contra la Tarea 0.5.
7. Teclado: Tab llega a los botones del hero, a «Descubrir más» y al botón de pausa, con foco visible y objetivos de
   al menos 44×44 px.
8. Header intacto (regla 7).

### Tarea 6: Registro

1. ADR-004 en `decisiones-tecnicas.md` con el formato de los anteriores: contexto, decisión (carrusel por tiempo con
   módulo propio, no animación guiada por *scroll*), alternativas descartadas (el ejemplo de CodePen y por qué),
   accesibilidad (WCAG 2.2.2, D-04 como desviación consciente del patrón W3C, D-05), carga y consecuencias.
2. Bitácora `bitacora-epica-09/bitacora-iteracion-02.md` (plantilla §8.2): decisiones, línea base, cambios, tablas de
   medición y contraste por foto, desviaciones y hallazgos.
3. Propuestas -/+ para `DESIGN.md`: §5 punto 10 (resuelto), §7 o §11.7 si cambia el hero, §12 (carrusel del hero) y §13
   (las 8 imágenes del hero en `public/images/inicio/`), con líneas completas e idénticas al repositorio.
4. Línea al final de `estado-actual.md` (BOM, CRLF, sin salto final; verifica bytes). Archivos nuevos o editados: CRLF,
   sin BOM, salvo los que ya tienen BOM por DT-11 (`src/js/main.js`, `src/css/input.css`): **no cambies su BOM** y
   repórtalo.
5. Mensaje de commit sugerido: `Épica 09 - Iteración 02: Carrusel automático del hero y SM-01 hero móvil del Inicio`.

---

## 3. Auditoría de No-Regresión e Invariantes

* Desde 768 px, el hero se ve igual que hoy salvo la rotación de fotos y el botón de pausa.
* Ningún elemento del carrusel con `position: fixed`; nada dentro de `<header>` cambia (regla 7).
* Cero JS o CSS en línea (regla 2); módulo con guarda y sin globales (regla 3); solo tokens y clases literales (reglas
  4 y 5); accesibilidad AA en claro y oscuro (regla 10).
* Las otras 5 páginas y el resto del Inicio, sin cambios.
* Ninguna dependencia nueva en `package.json`.

---

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Rotación**
    * **Dado** el Inicio con movimiento normal,
    * **Cuando** pasan 7 s,
    * **Entonces** la foto siguiente entra desde la derecha y la actual sale por la izquierda, en ciclo por las 4 fotos.
* **Escenario 2: Pausa**
    * **Dado** el carrusel en marcha,
    * **Cuando** se activa el botón (clic, Enter o Espacio),
    * **Entonces** se detiene, el `aria-label` cambia y no se reanuda hasta que el usuario lo pida.
* **Escenario 3: Pausas automáticas**
    * **Dado** la pestaña oculta o el hero fuera de pantalla,
    * **Entonces** el temporizador no corre, y al volver se reanuda solo si el usuario no lo había pausado.
* **Escenario 4: Movimiento reducido**
    * **Dado** `prefers-reduced-motion: reduce`,
    * **Entonces** se ve solo la primera foto, sin rotación y sin botón.
* **Escenario 5: SM-01**
    * **Dado** un ancho menor que 768 px,
    * **Entonces** el `h1` mide 32/40, el párrafo 16/24, no se ven el ícono ni la fila de ubicación, y «Descubrir más»
      queda centrado bajo el `border-t`.
* **Escenario 6: Contraste**
    * **Dado** las 4 fotos, los 7 viewports y los 2 temas,
    * **Entonces** todo el texto del hero cumple AA, o la desviación queda reportada con números y sin cambios no
      autorizados.
* **Escenario 7: Carga**
    * **Dado** la carga del Inicio,
    * **Entonces** la primera foto es el LCP y las otras 3 se piden después.
* **Escenario 8: Registro**
    * **Entonces** existen el ADR-004, la bitácora y las propuestas -/+ para `DESIGN.md`, sin commits hechos por
      Claude Code.