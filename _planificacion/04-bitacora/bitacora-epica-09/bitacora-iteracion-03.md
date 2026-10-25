# Bitácora de Ejecución - Épica 09 - Iteración 03

**Fecha de ejecución:** 24-10-2026
**Agente:** Claude Code
**Objetivo:** SM-02 (trampa de foco del panel móvil) y alcance y desplazamiento inicial de las modales de Servicios.

## 1. Resumen ejecutivo

* **SM-02 implementada** en `navigation.js` según D-01 a D-03: al abrir, el foco va a «Inicio»; Tab y Shift+Tab ciclan
  entre la hamburguesa y los 7 enlaces del panel; Escape y la capa tenue devuelven el foco a la hamburguesa; un enlace
  navega. Verificada en 5 viewports y en ambos temas, con el cruce a 1024 y 1280 px [render].
* **H-03 (contenido inalcanzable), causa confirmada:** la columna derecha de `#service-modal` no se encogía
  (`min-height: auto` de un hijo flex). Con la clase `min-h-0`, las 8 modales se recorren completas con rueda y con gesto
  táctil emulado en 320×640, 360×740 y 412×915 [render]. **En 740×360 no basta:** el contenido se alcanza, pero el botón
  «Cotizar este servicio» queda cortado (33 de 48 px) y la ventana de lectura útil es de 0 px. Arreglarlo exige más de
  una clase: va como propuesta P-4 (§6), sin aplicar, a la espera de la decisión del desarrollador.
* **H-04 (desplazamiento retenido), causa confirmada y corregida:** `modal.js` reinicia `.modal-scroll` al abrir. 0
  fallas en 168 aperturas (3 órdenes × 8 modales × 7 viewports) [render].
* Botón de cierre de 40 a 44 px (`w-11 h-11`), sin tapar el título ni el rótulo, con foco visible [render].
* Estado: **Completada con reservas** (740×360 pendiente de decisión; prueba con teclado real y en celular real
  pendiente para el cierre de la épica, por decisión del desarrollador del 24-10-2026).

## 2. Línea base (estado previo y defectos reproducidos)

* Rama `feat/revision-movil`, `git status` limpio, último commit `d0e9ad9` (incluye `562050e`, cierre de la It. 02)
  [medido]. `pnpm run build:cf`: código 0, 6 páginas, 114 archivos, 0 advertencias [medido]. Node local `v24.16.0`
  (H-02 de la It. 01), pnpm 11.24.0.
* Herramientas: Chrome 155.0.8059.85 *headless* con perfil aislado temporal vía CDP (Python 3.12 y websocket-client
  1.8.0); scripts, capturas y la copia del build base fuera del repositorio. El servidor de `pnpm preview` del puerto
  4321 ya estaba en ejecución (PID 20504, no lo inició el agente); se usó tras comprobar que servía el `_site/` actual
  (SHA-256 de `servicios.html` idéntico al del disco). El build base se sirvió aparte, en el puerto 4399.

### 2.1 Panel móvil antes del cambio [render] (360×740 y 412×915, mismo resultado)

| Comprobación | Resultado |
|:--|:--|
| Enfocables visibles con el panel abierto (orden DOM) | Logotipo «La Jardinera», botón de tema, hamburguesa, Inicio, Servicios, Suscripción Floral, Galería, Contacto, WhatsApp, Instagram |
| Foco al abrir con Enter | Se queda en la hamburguesa («Cerrar menú») |
| Tab desde Instagram (último del panel) | Sale al contenido: primer botón «Ver más» de las tarjetas, con el panel abierto |
| Shift+Tab desde la hamburguesa | Botón de tema |
| Escape | Cierra, foco en la hamburguesa, `aria-expanded="false"`, «Abrir menú», sin `overflow-hidden` |

### 2.2 H-04: desplazamiento inicial de las modales [render]

* Primera apertura en página recién cargada: `scrollTop` 0 en las 8 modales, en 360×740 y 1280×800.
* Aperturas sucesivas en 1280×800 (orden de la página, desplazando 400 px con la rueda antes de cerrar): Suscripción 0;
  Gift Cards 244; Novias 489; Ramos de Autor 257; Matrimonio 257; Novios por el Río 328; Eventos 353; Condolencias 516 px.
  Desde la segunda, ninguna abre mostrando el inicio. En 360×740 no se reproduce porque las modales no desplazan (H-03).
* **Causa confirmada:** la modal es una sola (`#service-modal`) y `openModal()` no reiniciaba `.modal-scroll`. Además,
  con `hidden` (display: none) el navegador lee `scrollTop` como 0 e ignora la asignación: se asignó 0 con la modal
  oculta y, al quitar `hidden`, reaparecieron los 300 px. Por eso el reinicio va después de quitar `hidden`.

### 2.3 H-03: prueba del `min-h-0` (Tarea 0.4) [render]

La clase no existía en el CSS compilado, así que se inyectó por script la clase `min-h-0` en la columna derecha y la
regla `.min-h-0{min-height:0}` (la misma que genera Tailwind, comparable con el `.min-w-0{min-width:0}` ya compilado),
sin editar archivos. Control: la misma página sin inyección. Emulación táctil activa; rueda con pasos de 120 px y
gesto táctil con eventos `touchStart`/`touchMove`/`touchEnd` (en este Chrome, `Input.synthesizeScrollGesture` con
origen `touch` no desplaza nada: H-11). «Párrafo» y «galería» = el borde inferior del último párrafo y de la última foto
entraron en la zona visible en algún momento del recorrido; «CTA» = el botón entero dentro del panel y del viewport.

**Componentes medidos (iguales en las 8 modales):** figura `h-52` = 208 px en los 4 viewports; barra del CTA 117 px en
320×640 (el botón pasa a 2 líneas, 68 px) y 97 px en los demás; panel `h-[92vh]` de 589, 681, 842 y 331 px.
**Control:** la columna mide lo mismo que su contenido (1.139 a 1.772 px), `.modal-scroll` tiene `scrollHeight` =
`clientHeight` (no desborda) y el `overflow-hidden` del panel recorta: recorrido 0, y ni el último párrafo (salvo
Suscripción en 412×915), ni la galería, ni el CTA se alcanzan en ninguna de las 32 combinaciones.

| Viewport | Modal | Control: `.modal-scroll` alto = scrollHeight = clientHeight | Con `min-h-0`: alto · scrollHeight · clientHeight | Recorrido (rueda / táctil) | Último párrafo · galería · CTA completo (rueda / táctil) |
|:--|:--|--:|:--|:--|:--|
| 320×640 | suscripcion | 1.158 | 262 · 1.158 · 262 | 896 / 896 de 896 | sí · sí · sí / sí · sí · sí |
| 320×640 | gift-cards | 1.508 | 262 · 1.508 · 262 | 1.246 / 1.246 de 1.246 | sí · sí · sí / sí · sí · sí |
| 320×640 | novias | 1.655 | 262 · 1.655 · 262 | 1.393 / 1.393 de 1.393 | sí · sí · sí / sí · sí · sí |
| 320×640 | ramos-de-autor | 1.199 | 262 · 1.199 · 262 | 937 / 937 de 937 | sí · sí · sí / sí · sí · sí |
| 320×640 | matrimonios | 1.382 | 262 · 1.382 · 262 | 1.120 / 1.120 de 1.120 | sí · sí · sí / sí · sí · sí |
| 320×640 | novios-rio | 1.383 | 262 · 1.383 · 262 | 1.121 / 1.121 de 1.121 | sí · sí · sí / sí · sí · sí |
| 320×640 | eventos | 1.527 | 262 · 1.527 · 262 | 1.265 / 1.265 de 1.265 | sí · sí · sí / sí · sí · sí |
| 320×640 | condolencias | 1.125 | 262 · 1.125 · 262 | 863 / 863 de 863 | sí · sí · sí / sí · sí · sí |
| 360×740 | suscripcion | 1.124 | 374 · 1.124 · 374 | 750 / 750 de 750 | sí · sí · sí / sí · sí · sí |
| 360×740 | gift-cards | 1.393 | 374 · 1.393 · 374 | 1.019 / 1.019 de 1.019 | sí · sí · sí / sí · sí · sí |
| 360×740 | novias | 1.593 | 374 · 1.593 · 374 | 1.219 / 1.219 de 1.219 | sí · sí · sí / sí · sí · sí |
| 360×740 | ramos-de-autor | 1.221 | 374 · 1.221 · 374 | 847 / 847 de 847 | sí · sí · sí / sí · sí · sí |
| 360×740 | matrimonios | 1.320 | 374 · 1.320 · 374 | 946 / 946 de 946 | sí · sí · sí / sí · sí · sí |
| 360×740 | novios-rio | 1.319 | 374 · 1.319 · 374 | 945 / 945 de 945 | sí · sí · sí / sí · sí · sí |
| 360×740 | eventos | 1.410 | 374 · 1.410 · 374 | 1.036 / 1.036 de 1.036 | sí · sí · sí / sí · sí · sí |
| 360×740 | condolencias | 1.066 | 374 · 1.066 · 374 | 692 / 692 de 692 | sí · sí · sí / sí · sí · sí |
| 412×915 | suscripcion | 1.133 | 535 · 1.133 · 535 | 598 / 598 de 598 | sí · sí · sí / sí · sí · sí |
| 412×915 | gift-cards | 1.341 | 535 · 1.341 · 535 | 806 / 806 de 806 | sí · sí · sí / sí · sí · sí |
| 412×915 | novias | 1.546 | 535 · 1.546 · 535 | 1.011 / 1.011 de 1.011 | sí · sí · sí / sí · sí · sí |
| 412×915 | ramos-de-autor | 1.230 | 535 · 1.230 · 535 | 695 / 695 de 695 | sí · sí · sí / sí · sí · sí |
| 412×915 | matrimonios | 1.301 | 535 · 1.301 · 535 | 766 / 766 de 766 | sí · sí · sí / sí · sí · sí |
| 412×915 | novios-rio | 1.298 | 535 · 1.298 · 535 | 763 / 763 de 763 | sí · sí · sí / sí · sí · sí |
| 412×915 | eventos | 1.330 | 535 · 1.330 · 535 | 795 / 795 de 795 | sí · sí · sí / sí · sí · sí |
| 412×915 | condolencias | 1.042 | 535 · 1.042 · 535 | 507 / 507 de 507 | sí · sí · sí / sí · sí · sí |
| 740×360 | suscripcion | 732 | 64 · 732 · 64 | 667 / 667 de 668 | sí · sí · no (33 de 48 px) |
| 740×360 | gift-cards | 1.210 | 64 · 1.210 · 64 | 1.146 / 1.146 de 1.146 | sí · sí · no (33 de 48 px) |
| 740×360 | novias | 949 | 64 · 949 · 64 | 884 / 884 de 885 | sí · sí · no (33 de 48 px) |
| 740×360 | ramos-de-autor | 801 | 64 · 801 · 64 | 736 / 736 de 737 | sí · sí · no (33 de 48 px) |
| 740×360 | matrimonios | 816 | 64 · 816 · 64 | 751 / 751 de 752 | sí · sí · no (33 de 48 px) |
| 740×360 | novios-rio | 913 | 64 · 913 · 64 | 848 / 848 de 849 | sí · sí · no (33 de 48 px) |
| 740×360 | eventos | 1.225 | 64 · 1.225 · 64 | 1.161 / 1.161 de 1.161 | sí · sí · no (33 de 48 px) |
| 740×360 | condolencias | 1.135 | 64 · 1.135 · 64 | 1.071 / 1.071 de 1.071 | sí · sí · no (33 de 48 px) |

* En 740×360, «párrafo» se midió con pasos finos (rueda de 20 px y arrastre táctil de 24 px), con el mismo resultado en
  rueda y táctil: con los pasos gruesos la ventana de 64 px se «saltaba» el párrafo (4 de 8 con rueda, 1 de 8 con táctil),
  lo que es un efecto del tamaño del paso, no del alcance.
* **Conclusión de la Tarea 0.4:**
  * La causa es la que propuso el asesor. En vertical (320, 360 y 412 px), `min-h-0` en la columna derecha **basta**. No
    hace falta en el panel (ya mide `h-[92vh]`) ni en `.modal-scroll` (es `flex-1` dentro de una columna que ahora sí
    se encoge).
  * En 740×360 es **necesaria, pero no suficiente.** Los 331 px del panel no alcanzan para la figura (208), la barra del
    CTA (97) y el relleno vertical de `.modal-scroll` (`py-space-4`, 64 px, que fija su alto mínimo). La columna se sale
    del panel 40 px: el CTA queda cortado 15 px y la zona de lectura tiene 64 px, todos de relleno (0 px de contenido).
  * Opciones simuladas por inyección: figura de 96 px (corta 12 px del rótulo «Servicio»); figura de 128 px (40 px de
    lectura); disposición lado a lado en horizontal (232 px de `.modal-scroll`, 168 px de lectura, CTA entero, título
    intacto, también en 640×360 y 568×320). Detalle en la propuesta P-4.

## 3. Cambios realizados (por archivo)

* **`src/js/modules/navigation.js`** (SM-02):
  * Selectores en caché: `panelFocusables` (`a[href], button:not([disabled])` del panel), `firstPanelItem` y `lastInCycle`.
  * Clic en la hamburguesa: llama a `setOpen(open)` y, al abrir, enfoca el primer enlace.
  * Capa tenue: `setOpen(false)` y luego `menuBtn.focus()`.
  * Listener nuevo de `keydown` que solo actúa con Tab y el panel abierto.
  * Sin cambios: `setOpen(open)`, `hidden`, `overflow-hidden`, `aria-expanded`, `aria-label`, el bloque de Escape, el
    cierre por enlace (delegación) y el cierre al cruzar `(min-width: 1024px)`.
  * Nada en `window`.
* **Ciclo en el orden DOM real (D-01):** el primer elemento es la hamburguesa (`#mobile-menu-btn`, que en el DOM va antes
  de `#mobile-menu`) y el último es el enlace «Instagram» de la fila social. Entre ambos: Inicio, Servicios, Suscripción
  Floral, Galería, Contacto y WhatsApp. Tab desde Instagram va a la hamburguesa y Shift+Tab desde la hamburguesa va a
  Instagram; Tab desde la hamburguesa y Shift+Tab desde Inicio siguen el orden natural.
* **`src/js/modules/modal.js`** (H-04): selector en caché `modalScroll` y `modalScroll.scrollTop = 0` justo después de
  quitar `hidden` y antes del `requestAnimationFrame` que quita `opacity-0`. La trampa de foco, el `inert`, Escape y la
  animación no cambian.
* **`src/pages/servicios.astro`:** `min-h-0` en la columna derecha (H-03) y `w-10 h-10` → `w-11 h-11` en
  `.close-modal-btn`. Ninguna otra clase.
* **Bitácora** (este archivo, nuevo) y una línea al final de `estado-actual.md`.

## 4. Verificación de criterios de aceptación

### 4.1 Compilación e invariantes

| Criterio | Estado | Evidencia |
|:--|:--|:--|
| `pnpm run build:cf` | OK | [medido] Código 0, 6 páginas, 114 archivos, 0 advertencias. |
| Clase nueva en el CSS | OK | [medido] `.min-h-0{min-height:0}` en `_site/_astro/BaseLayout.DMAb5gx8.css`; es la única diferencia con el CSS base (46.793 → 46.815 B). `w-11` y `h-11` ya existían. |
| JS compilado | OK | [medido] Comparado por instrucciones: solo cambian los bloques de `navigation.js` y `modal.js` (más los nombres de variables que reasigna el minificador). |
| Invariantes en `_site/*.html` | OK | [medido] 0 `style="`, 0 `onclick`, 0 `<style>`, 1 `<script>` sin `src` por página (717 caracteres, SHA-256 `5b490c26120413aecf117c5878853be7a0b336afbc0a18cabb2e9c73e6fa0d1c`, idéntico en las 6), 0 `href="#"` en header y footer, 0 IDs duplicados. |
| Header (regla 7) | OK | [código] `SiteHeader.astro` sin cambios; [medido] 0 `fixed` dentro de `<header>` y `#mobile-menu-scrim` como hermano inmediato en las 6 páginas. |
| Otras páginas | OK | [medido] Con los nombres con *hash* normalizados, el HTML de Inicio, Suscripción Floral, Galería, Contacto y 404 es idéntico al base; Servicios difiere solo en las 2 líneas de la §3. |

### 4.2 Panel móvil (SM-02) [render]

Cada fila se probó en 320×640, 360×740, 412×915, 768×1024 y 740×360 (claro) y en 360×740 (oscuro), con teclado y
ratón simulados por CDP.

| Criterio | Estado | Evidencia |
|:--|:--|:--|
| Foco inicial al abrir (Enter y clic) | OK | En «Inicio» [panel] en los 6 casos. |
| Tab ×9 desde Inicio | OK | Servicios → Suscripción Floral → Galería → Contacto → WhatsApp → Instagram → hamburguesa → Inicio → Servicios. |
| Shift+Tab ×3 desde Inicio | OK | Hamburguesa → Instagram → WhatsApp. |
| Escape | OK | Cierra; foco en la hamburguesa; `aria-expanded="false"`, «Abrir menú», sin `overflow-hidden`. |
| Capa tenue | OK (5 de 6) | Cierra y devuelve el foco a la hamburguesa, sin `overflow-hidden`. En 740×360 el panel cubre todo el viewport y no hay capa tenue donde tocar (H-12): se cerró con Escape. |
| Hamburguesa con el panel abierto | OK | Cierra; el foco queda en la hamburguesa. |
| Enlace (Enter en Galería y clic en Contacto) | OK | Navega a `/galeria` y a `/contacto`; la página nueva queda con el panel cerrado, sin `overflow-hidden` y con ARIA en reposo. |
| Panel cerrado: orden natural | OK | Tab desde la hamburguesa → primer «Ver más»; Shift+Tab → botón de tema (igual que en la línea base). |
| `aria-expanded` y `aria-label` | OK | Sincronizados en cada transición registrada (abrir, Escape, capa tenue, hamburguesa, enlace, cruce). |
| Cruce de *breakpoint* con el panel abierto | OK | 412×915 → 1024×768 y → 1280×800: panel y capa ocultos, sin `overflow-hidden`, ARIA en reposo; la rueda desplaza la página (0 → 400 px). El foco queda en `body` (H-13). |
| 1024×768 y 1280×800 sin cambios | OK | Rectángulos y estilos calculados de los 58 nodos del header y de la capa tenue idénticos al build base en 36 combinaciones (1024×768, 1280×800 y 360×740 × claro y oscuro × 6 páginas). |
| Consola | OK | Sin errores ni advertencias en todas las corridas. |

### 4.3 Modales de Servicios [render]

| Criterio | Estado | Evidencia |
|:--|:--|:--|
| Escenario 3: abren mostrando el inicio | OK | En 7 viewports y en 3 órdenes (directo, inverso y uno aleatorio con semilla fija), desplazando hasta 600 px antes de cada cierre: 168 de 168 aperturas con `scrollTop` 0 en el mismo clic (antes del primer cuadro) y con el primer bloque de texto visible. Reapertura a los 100 ms de un cierre (temporizador cancelado): `scrollTop` 0 y modal visible. |
| El foco inicial no desplaza | OK | `scrollTop` 0 con el foco en el botón de cierre, en los 7 viewports y en ambos temas. |
| Escenario 3b: vertical bajo 768 px | OK | 320×640, 360×740 y 412×915: 8 de 8 modales llegan al máximo con rueda y con táctil, con el último párrafo, la galería y el CTA entero (tabla siguiente). |
| Escenario 3b: 740×360 | FALLA parcial (reserva) | Se recorren completas y se alcanzan el párrafo y la galería (8 de 8, rueda y táctil finos), pero el CTA queda cortado en 8 de 8 (33 de 48 px visibles) y la ventana de lectura útil es de 0 px. Propuesta P-4, pendiente de decisión. |
| Desde 768 px sin cambios | OK | 768×1024, 1024×768 y 1280×800: geometría (panel, figura, columna, barra, `.modal-scroll`, `scrollHeight`, recorrido) idéntica al build base en 24 de 24 combinaciones. |
| Escenario 4: botón de cierre | OK | 44×44 px en los 7 viewports y en ambos temas (antes, 40×40). 0 px² sobre el título y sobre el rótulo «Servicio». Bajo 768 px queda entero sobre la foto, como antes (1.936 px² frente a 1.600); desde 768 px, fuera de la foto. Con teclado: `:focus-visible` y anillo `outline: auto` del navegador (H-14). |
| Trampa, `inert`, Escape y animación | OK | [código] Sin cambios en `modal.js`; Tab y Shift+Tab desde el botón de cierre siguen dentro de la modal. |

| Viewport | Alto de `.modal-scroll` | Recorrido máximo (8 modales) | Rueda: llega al máximo · párrafo · galería · CTA | Táctil: llega al máximo · párrafo · galería · CTA |
|:--|--:|:--|:--|:--|
| 320×640 | 262 | 863 a 1.393 px | 8/8 · 8/8 · 8/8 · 8/8 | 8/8 · 8/8 · 8/8 · 8/8 |
| 360×740 | 374 | 692 a 1.219 px | 8/8 · 8/8 · 8/8 · 8/8 | 8/8 · 8/8 · 8/8 · 8/8 |
| 412×915 | 535 | 507 a 1.011 px | 8/8 · 8/8 · 8/8 · 8/8 | 8/8 · 8/8 · 8/8 · 8/8 |
| 740×360 | 64 | 668 a 1.161 px | 8/8 · 8/8 · 8/8 · 0/8 | 8/8 · 8/8 · 8/8 · 0/8 |
| 768×1024 | 573 | 195 a 736 px | 8/8 · 8/8 · 8/8 · 8/8 | 8/8 · 8/8 · 8/8 · 8/8 |
| 1024×768 | 515 | 270 a 701 px | 8/8 · 8/8 · 8/8 · 8/8 | 8/8 · 8/8 · 8/8 · 8/8 |
| 1280×800 | 541 | 244 a 675 px | 8/8 · 8/8 · 8/8 · 8/8 | 8/8 · 8/8 · 8/8 · 8/8 |

(En 740×360, párrafo con pasos finos; ver §2.3.)

### 4.4 No regresión y pendientes

| Criterio | Estado | Evidencia |
|:--|:--|:--|
| Hero y carrusel del Inicio | OK | [medido] HTML del Inicio idéntico al base (sin contar el *hash*); [render] en 360×740 y 1280×800, 4 diapositivas, avance de la 1 a la 2 tras 8,5 s y botón de pausa de 44×44, igual que en el build base. |
| Prueba con teclado real | 🕒 PENDIENTE | [informado] pendiente: desarrollador, en el cierre de la épica. Ciclo de Tab, Escape y capa tenue en un navegador de escritorio angosto (< 1024 px). |
| Celular real | 🕒 PENDIENTE | [informado] pendiente: desarrollador, en el cierre de la épica. Desplazar con el dedo las 8 modales hasta la galería y el CTA, en vertical y en horizontal, y abrir dos modales seguidas para comprobar que la segunda parte en el inicio. |

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

| ID | Hallazgo | Evidencia | Estado / destino |
|:---|:---------|:----------|:-----------------|
| H-09 | **H-03 sigue en parte en 740×360:** con `min-h-0`, el CTA queda cortado 15 px y la zona de lectura mide 64 px, todos de relleno. Hace falta más de una clase. | [render] §2.3 y §4.3. | Propuesta P-4, pendiente de decisión. |
| H-10 | Desviación: la Tarea 2.0 suponía una sola clase para «todos los anchos». Se aplicó `min-h-0` (autorizada, resuelve el vertical) y el resto quedó como propuesta, según la misma tarea. | — | Decisión del desarrollador. |
| H-11 | En Chrome 155 *headless*, `Input.synthesizeScrollGesture` con `gestureSourceType: 'touch'` no desplaza (0 px) y con el origen por defecto sí (150 px). El gesto táctil de esta bitácora usa `Input.dispatchTouchEvent`. No se sabe qué método usó la It. 01. | [medido] | Informativo (método). |
| H-12 | En 740×360 el panel móvil (`max-h-[calc(100dvh-5rem)]` = 280 px) cubre todo el viewport bajo la barra: no queda capa tenue donde tocar. Se cierra con la hamburguesa, con Escape o con un enlace. | [render] | Informativo; sin cambio. |
| H-13 | Al cruzar a ≥ 1024 px con el foco en un enlace del panel, el enlace se oculta y el foco queda en `body`. Ya ocurría antes; D-03 no lo cubre. | [render] | Informativo; fuera de alcance. |
| H-14 | El botón de cierre no tiene anillo propio: muestra el `outline: auto` del navegador. Se ve en ambos temas (captura en 360×740 oscuro), pero su contraste no se midió. `DESIGN.md` §14.3 se cumple (no hay `outline-none`). | [render] | Informativo. |
| H-15 | Borde del ciclo: si, con el panel abierto, se hace clic con el ratón en el botón de tema (fuera del ciclo según D-01), Shift+Tab desde ese botón va al logotipo. El foco no llega al contenido y Tab vuelve a la hamburguesa. D-02 no cubre este caso. | [render] | Para decidir si se acepta. |
| H-16 | `navigation.js` está en LF en el *working tree* (índice LF, `core.autocrlf=true`); Git avisa «LF will be replaced by CRLF the next time Git touches it». Se conservaron el LF y el BOM (DT-11); `modal.js` sigue en CRLF y con BOM. | [medido] §6. | Informativo. |
| H-17 | El mensaje de commit de `iteracion-03.md` (Tarea 5.3) es distinto del que indicó el desarrollador en el chat. Se usa el del chat, que tiene mayor precedencia. | — | Informativo. |

## 6. Archivos modificados y propuestas para archivos protegidos

**Modificados:** `src/js/modules/navigation.js`, `src/js/modules/modal.js`, `src/pages/servicios.astro`, esta bitácora
(nueva) y una línea al final de `estado-actual.md`.

Bytes en el *working tree* (Python):

| Archivo | Antes | Después |
|:--|:--|:--|
| `src/js/modules/navigation.js` | 2.340 B, con BOM, LF (59), 0 CRLF, con salto final | 3.683 B, con BOM, LF (87), 0 CRLF, con salto final |
| `src/js/modules/modal.js` | 12.505 B, con BOM, 322 CRLF, 0 LF sueltos, con salto final | 12.892 B, con BOM, 329 CRLF, 0 LF sueltos, con salto final |
| `src/pages/servicios.astro` | 32.453 B, sin BOM, 405 CRLF, 0 LF sueltos, con salto final | 32.461 B, sin BOM, 405 CRLF, 0 LF sueltos, con salto final |
| `estado-actual.md` | 40.790 B, con BOM, 74 CRLF, 0 LF sueltos, sin salto final | 42.352 B, con BOM, 75 CRLF, 0 LF sueltos, sin salto final; los primeros 40.790 B, idénticos (solo se añadió `CRLF` + la línea) |

### Propuesta P-1 — `DESIGN.md` §8.1 Estructura

**Motivo:** documentar el tamaño del botón de cierre, la columna con `min-h-0` y el reinicio del desplazamiento.

```diff
 botón, capa y `Escape`; trampa de foco; fondo con `inert` y `aria-hidden` hasta terminar la animación de salida.
+Botón de cierre `w-11 h-11` (44 × 44 px). Columna derecha `flex flex-col flex-1 min-w-0 min-h-0`: sin `min-h-0` no se
+encoge dentro del panel bajo 768 px y el contenido queda inalcanzable. `.modal-scroll` vuelve al inicio en cada
+apertura, porque la modal es una sola para los 8 servicios.
```

### Propuesta P-2 — `DESIGN.md` §9.2 Panel móvil anclado

**Motivo:** documentar el comportamiento de foco de SM-02 (D-01 a D-03).

```diff
 - Fila social: WhatsApp primero (tonal `bg-primary/10 text-primary`), luego Instagram (`bg-surface-container
   text-on-surface-variant`), ambos `min-h-[3rem] rounded-xl`.
+- Foco (SM-02, `navigation.js`): al abrir, el foco pasa al primer enlace. Con el panel abierto, Tab y Shift+Tab ciclan
+  entre la hamburguesa y los enlaces del panel (el botón de tema queda fuera). Escape y la capa tenue cierran y devuelven
+  el foco a la hamburguesa; un enlace cierra y navega.
```

### Propuesta P-3 — `DESIGN.md` §15 Registro de cambios

```diff
 - **Épica 08 · Iteraciones 07 y 08:** tema aplicado antes del primer pintado con el script de arranque del ADR-003 (§5) y
   rutas de archivo del documento actualizadas a la estructura de Astro (§1.1, §7.1, §8.2, §9.4 y §11.7).
+- **Épica 09 · Iteración 03:** trampa de foco del panel móvil (§9.2, SM-02) y modal de servicio con columna `min-h-0`,
+  botón de cierre de 44 px y desplazamiento reiniciado al abrir (§8.1).
```

### Propuesta P-4 — `src/pages/servicios.astro` (no aplicada: requiere decisión)

**Motivo:** H-09. En horizontal bajo 768 px (740×360, 640×360, 568×320) la modal pasaría a la disposición de dos
columnas que ya se usa desde `md`. Son 3 clases con la variante `landscape:` de Tailwind 3.4; desde 768 px repiten los
valores de `md:` y no cambian nada. Simulada por inyección (§2.3): `.modal-scroll` de 232 px (168 px de lectura) en
740×360 y 640×360, y de 175 px en 568×320; CTA entero y título intacto. Alternativas descartadas por la medición: figura
de `h-24` (corta el rótulo) o de `h-32` (40 px de lectura). Si se aprueba, conviene agregar una línea en `DESIGN.md` §8.1
y verificar en render que la variante compila y que no cambia nada desde 768 px.

```diff
-    <div class="modal-panel relative w-full max-w-5xl h-[92vh] md:h-[80vh] md:max-h-[42rem] bg-surface shadow-2xl flex flex-col md:flex-row transform translate-y-full transition-transform duration-300 ease-in-out rounded-t-2xl md:rounded-xl overflow-hidden border border-outline-variant/30"
+    <div class="modal-panel relative w-full max-w-5xl h-[92vh] md:h-[80vh] md:max-h-[42rem] bg-surface shadow-2xl flex flex-col md:flex-row landscape:flex-row transform translate-y-full transition-transform duration-300 ease-in-out rounded-t-2xl md:rounded-xl overflow-hidden border border-outline-variant/30"
```

```diff
-        <figure class="relative w-full h-52 md:h-auto md:w-2/5 flex-none overflow-hidden bg-surface-container m-0">
+        <figure class="relative w-full h-52 md:h-auto md:w-2/5 landscape:h-auto landscape:w-2/5 flex-none overflow-hidden bg-surface-container m-0">
```

## 7. Mensaje de commit sugerido

```text
Épica 09 - Iteración 03: SM-02 trampa de foco del panel móvil y corrección del alcance y desplazamiento de las modales de Servicios.
```
