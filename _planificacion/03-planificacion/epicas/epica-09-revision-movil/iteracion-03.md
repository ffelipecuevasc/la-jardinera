# Iteración 03: SM-02 (Trampa de Foco del Panel Móvil) y Desplazamiento de las Modales de Servicios

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de editar, lee `AGENTS.md` §5 (reglas 3, 7 y 10), `DESIGN.md`
§8 (modal de servicio), §9 (header y menú móvil) y §14 (accesibilidad), `src/js/modules/navigation.js` completo,
`src/js/modules/modal.js` completo, `src/components/SiteHeader.astro` y el marcado de `#service-modal` en
`src/pages/servicios.astro`. Verifica con `git status` y `git log -1` que estás en `feat/revision-movil` con las
Iteraciones 01 y 02 integradas y sin cambios pendientes. No inventes decisiones.

**Autorización explícita de esta iteración:** puedes editar `src/js/modules/navigation.js`, `src/js/modules/modal.js`,
la bitácora de la iteración y agregar una línea al final de `estado-actual.md`. `src/pages/servicios.astro` solo para
llevar el botón de cierre de la modal a 44×44 px (§1, punto 3) y para hacer alcanzable el contenido de la modal
(Tarea 2, punto 0). `SiteHeader.astro` **no** se toca (la trampa es solo
JS). No edites archivos protegidos. Git es de solo lectura.

---

## 1. Objetivo de la Iteración

1. **SM-02:** con el panel móvil abierto (menos de 1024 px), Tab y Shift+Tab se mantienen dentro del ciclo decidido;
   Escape cierra y devuelve el foco a la hamburguesa. Hoy `initNavigation()` no tiene trampa ni foco inicial.
2. **Desplazamiento de las modales de Servicios (pedido de la clienta):** al abrir una modal se ve el final del
   contenido. Hipótesis del asesor [código, sin reproducir]: `modal.js` reutiliza un único `#service-modal` y no
   reinicia el `scrollTop` de `.modal-scroll`, así que conserva el desplazamiento de la apertura anterior. Se reproduce
   antes de corregir; si la causa es otra, se reporta. La It. 01 lo reprodujo [medido, Chrome *headless*]: si una modal
   se cierra desplazada, la siguiente abre igual (89 y 389 px).
   **Segundo defecto, más grave (hallazgo H-03 de la It. 01):** en 360×740, el contenido de una modal que pasa de unos
   680 px de alto **no se puede alcanzar** (ni con gesto táctil ni con la rueda). Con los textos nuevos de la clienta,
   las modales son más largas. Hipótesis del asesor [código, sin reproducir]: la columna derecha de `#service-modal`
   (`flex flex-col flex-1 min-w-0`) no lleva `min-h-0`, así que no se encoge dentro del panel de `h-[92vh]`;
   `.modal-scroll` nunca desborda y el panel recorta el contenido. Si se confirma, el arreglo es una sola clase.
3. **Hallazgo del asesor:** el botón de cierre de la modal de servicio es `w-10 h-10` (40 px), bajo los 44×44 px de
   `AGENTS.md` §5 regla 10 y `DESIGN.md` §14. Se lleva a 44 px (`w-11 h-11`) salvo que `DESIGN.md` §8 diga otra cosa: en
   ese caso se reporta con propuesta -/+.

### 1.1 Decisiones del desarrollador (21-10-2026)

| ID | Decisión |
|:---|:---------|
| SM-02 D-01 | Ciclo de Tab: enlaces y botones del panel + la hamburguesa. El botón de tema queda fuera. |
| SM-02 D-02 | Mecanismo: trampa JS con `keydown` (Tab y Shift+Tab sobre el primer y el último elemento del ciclo), solo en `navigation.js`. Sin `inert`. |
| SM-02 D-03 | Al abrir, el foco va al primer enlace del panel. Al cerrar con el *scrim*, vuelve a la hamburguesa. Al cerrar con un enlace, sigue la navegación. |

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Comportamiento actual (solo lectura)

1. `git status`, `git log -1 --oneline`, `pnpm run build:cf`.
2. Panel móvil en 360×740 y 412×915 (Chrome *headless*, perfil aislado, teclado simulado): foco al abrir, a dónde va
   Tab desde el último elemento del panel, qué hace Escape. Lista de elementos enfocables del panel y de la barra.
3. Modales de Servicios en 360×740 y 1280×800: abre cada modal en un orden fijo (primera apertura en página recién
   cargada y aperturas sucesivas) y registra el `scrollTop` de `.modal-scroll` y qué parte del contenido se ve. Esto
   confirma o descarta la hipótesis del §1.
4. **Prueba del `min-h-0` (solo lectura, sin editar archivos):** en el navegador *headless*, inyecta `min-h-0` en la
   columna derecha de `#service-modal` (clase añadida por script en la página renderizada) y mide, en 320×640,
   360×740, 412×915 y 740×360, para las 8 modales: alto de `.modal-scroll`, su `scrollHeight` y `clientHeight`, y si el
   último párrafo y la galería se pueden alcanzar. Repite sin la clase como control. Reporta si `min-h-0` basta, si
   hace falta algo más (p. ej. `min-h-0` también en el panel o en `.modal-scroll`) o si la causa es otra.
   Si el panel de la modal no se encoge por otro motivo (altura del `<figure>` de `h-52`, CTA fijo), mide cada
   componente.

### Tarea 1: `navigation.js` (SM-02)

1. Conserva `initNavigation()` con su guarda (`if (!menuBtn || !menu) return;`), selectores cacheados y delegación;
   nada en `window` (regla 3).
2. Implementa D-01 a D-03. El listener de `keydown` actúa solo con el panel abierto.
3. Conserva sin cambios: `setOpen(open)`, la gestión de `hidden`, `overflow-hidden`, `aria-expanded` y `aria-label`
   («Abrir menú»/«Cerrar menú»), Escape con `menuBtn.focus()`, el cierre por *scrim*, por enlace y por cruzar
   `(min-width: 1024px)`.

### Tarea 2: Contenido inalcanzable en la modal (`servicios.astro`) y `modal.js` (desplazamiento inicial)

0. Con el resultado de la Tarea 0.4, aplica el cambio **mínimo** en `src/pages/servicios.astro` que haga alcanzable todo
   el contenido en todos los anchos (hipótesis: agregar la clase literal `min-h-0` a la columna derecha). Solo clases
   Tailwind literales y existentes; no cambies alturas, el CTA fijo ni la galería. Si hace falta más de una clase o
   una clase fuera de la escala de `DESIGN.md`, entrégalo como propuesta y espera la decisión.

1. Corrige la causa confirmada en la Tarea 0.3 con el cambio mínimo (p. ej. reiniciar el `scrollTop` de
   `.modal-scroll` al abrir, antes de mostrar el contenido).
2. Verifica que el foco inicial en el botón de cierre no provoque un desplazamiento (el botón es `absolute`, fuera del
   contenedor con *scroll*).
3. No cambies la trampa de foco, el `inert` del fondo, Escape ni la animación de entrada.

### Tarea 3: Botón de cierre (`servicios.astro`)

`w-10 h-10` → `w-11 h-11` en `.close-modal-btn`, según el §1 punto 3. Verifica que no tape el título ni la imagen.

### Tarea 4: Verificación

1. `pnpm run build:cf` sin errores ni advertencias nuevas.
2. Panel en 320×640, 360×740, 412×915, 768×1024 y 740×360: Tab y Shift+Tab ciclan en el ámbito decidido; el foco
   inicial es el primer enlace; Escape y *scrim* devuelven el foco a la hamburguesa; un enlace navega; sin
   `overflow-hidden` residual.
3. Cruce de *breakpoint* con el panel abierto: a 1024 px o más, se cierra y la página queda interactiva.
4. 1024×768 y 1280×800: sin cambios de comportamiento ni de aspecto en el header.
5. Modales: todas abren mostrando el inicio del contenido, en primera apertura y en aperturas sucesivas, en 360×740 y
   1280×800; el **último párrafo y la galería se pueden alcanzar** en las 8 modales y en 320×640, 360×740, 412×915 y
   740×360 (con la rueda y con gesto táctil emulado); botón de cierre de 44×44 px con foco visible.
6. `aria-expanded` y `aria-label` sincronizados en cada transición del panel (regla 10).
7. Pide al desarrollador una prueba con teclado real y en un celular real (marcada como [informado]).

### Tarea 5: Registro

1. Bitácora `bitacora-epica-09/bitacora-iteracion-03.md` (plantilla §8.2): decisiones, línea base (incluida la causa
   confirmada del desplazamiento), cambios, verificación con etiquetas de evidencia, desviaciones.
2. Línea al final de `estado-actual.md` (BOM, CRLF, sin salto final; verifica bytes). Archivos editados: CRLF, sin BOM
   (salvo los que ya tienen BOM: `navigation.js` y `modal.js` figuran en DT-11; **no cambies su BOM** y repórtalo).
3. Mensaje de commit sugerido: `Épica 09 - Iteración 03: SM-02 trampa de foco del panel móvil y desplazamiento inicial de las modales de Servicios`.

---

## 3. Auditoría de No-Regresión e Invariantes

* Header (regla 7): ningún descendiente de `<header>` con `fixed`; `#mobile-menu-scrim` inmediatamente después de
  `</header>`; barra `h-20`, panel `top-full max-h-[calc(100dvh-5rem)]`, *scrim* `top-20`. `SiteHeader.astro` sin cambios.
* Modales genéricas (`initGenericModals`) sin cambios de comportamiento.
* Con el panel cerrado o en escritorio, el orden natural de Tab no cambia.
* Sin JS ni CSS en línea; sin dependencias nuevas.

---

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Trampa de foco**
    * **Dado** el panel móvil abierto,
    * **Cuando** se pulsa Tab desde el último elemento del ciclo o Shift+Tab desde el primero,
    * **Entonces** el foco rota entre los enlaces del panel y la hamburguesa, sin llegar al contenido.
* **Escenario 2: Apertura y cierre**
    * **Dado** el panel cerrado,
    * **Cuando** se abre, **entonces** el foco va al primer enlace;
    * **Cuando** se cierra con Escape o con el *scrim*, **entonces** el foco vuelve a la hamburguesa y la página queda
      interactiva.
* **Escenario 3: Modales**
    * **Dado** cualquier modal de Servicios,
    * **Cuando** se abre, sea la primera o una sucesiva,
    * **Entonces** se ve el inicio de su contenido sin desplazar a mano.
* **Escenario 3b: Contenido alcanzable**
    * **Dado** cualquier modal de Servicios, en cualquier ancho probado,
    * **Cuando** se desplaza hasta el final,
    * **Entonces** se alcanzan el último párrafo y la galería, y el CTA fijo sigue visible.
* **Escenario 4: Botón de cierre**
    * **Entonces** mide al menos 44×44 px y tiene foco visible.
* **Escenario 5: Invariantes**
    * **Dado** `AGENTS.md` §5, **entonces** las reglas 3, 7 y 10 se mantienen.