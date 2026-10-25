# Bitácora de Ejecución - Épica 09 - Iteración 04

**Fecha de ejecución:** 24-10-2026 y 25-10-2026
**Agente:** Claude Code
**Objetivo:** SM-03 (no guardar el tema hasta que el usuario lo alterne), P-4 (modal de Servicios en horizontal bajo
768 px) y cierre formal de la épica (cierre en `bitacora-cierre-epica-09.md`).
**Estado:** ✅ Completada con reservas (pruebas manuales con dispositivo o persona real: 🕒 PENDIENTE en el cierre).

## 1. Resumen ejecutivo

* **SM-03 hecha** en `theme.js`: `setInitialTheme()` ya no llama a `saveTheme`; la regla de decisión no cambia. Primera
  visita con perfil limpio: clase correcta y `localStorage` vacío en 12 de 12 casos (6 páginas × 2 esquemas) [render].
  Alternar guarda y se respeta al recargar y al navegar [render].
* **P-4 aplicada** en `servicios.astro`: solo `landscape:flex-row`, `landscape:h-auto` y `landscape:w-2/5`. En 740×360 la
  modal pasa a dos columnas: `.modal-scroll` de 232 px (**168 px de lectura**, igual a la simulación de la It. 03) y botón
  «Cotizar este servicio» entero (48 px) en 8 de 8 modales [render]. Desde 768 px y en vertical, geometría idéntica al
  build base en 56 de 56 combinaciones [render].
* Script en línea del tema intacto: SHA-256 `5b490c26…` en las 6 páginas, antes y después [medido].
* Decisiones aplicadas: SM-03 D-01 (21-10-2026), P-4 (24-10-2026) y H-15 aceptada como limitación conocida (24-10-2026).

## 2. Línea base (estado previo)

* Rama `feat/revision-movil`, `git status` limpio, último commit `3dbc5cf` [medido]. `pnpm run build:cf`: código 0,
  6 páginas, 114 archivos [medido]. Node local `v24.16.0` (H-02 de la It. 01), pnpm 11.24.0.
* Herramientas: Chrome 155.0.8059.85 *headless* con perfil temporal aislado vía CDP (Python 3.12, websocket-client 1.8.0),
  servidores estáticos propios en los puertos 4399, 4402, 4411, 4412, 4421 y 4431. El servidor del puerto 4321 (PID 20504)
  no lo inició el agente y no se tocó. Scripts, capturas y la copia del build base, fuera del repositorio.
* **Comportamiento previo [render]:** la primera visita guarda la preferencia del sistema (`{"theme":"light"}` o
  `{"theme":"dark"}`) en las 6 páginas y en ambos esquemas. Con eso, cambiar la preferencia del sistema y recargar no
  cambia el tema (queda el de la primera visita).
* **Script en línea (Tarea 0.3) [código] [medido]:** solo lee `localStorage` dentro de `try/catch` y aplica la clase; no
  escribe. Método de la Épica 08: SHA-256 del `<script>…</script>` completo sin `src` de `_site/*.html`: 717 caracteres,
  `5b490c26120413aecf117c5878853be7a0b336afbc0a18cabb2e9c73e6fa0d1c`, idéntico en las 6 páginas.
* **Modal en 740×360 (It. 03, §2.3):** panel de 331 px, botón con 33 de 48 px visibles.

## 3. Cambios realizados (por archivo)

* **`src/js/modules/theme.js`:** quitadas las 2 llamadas a `saveTheme` de `setInitialTheme()` y agregado un comentario
  («Solo aplica la clase: nada se guarda hasta que el usuario alterne el tema (SM-03)»). `switchTheme()`, `readTheme`,
  `saveTheme` (con `try/catch`), la guarda y la View Transitions API no cambian. BOM conservado (DT-11).
* **`src/pages/servicios.astro`:** `landscape:flex-row` en `.modal-panel`; `landscape:h-auto landscape:w-2/5` en la
  `<figure>`. Ninguna otra clase.
* **Documentos:** esta bitácora, `bitacora-cierre-epica-09.md`, estado y DoD de `definicion-epica.md` y una línea al final
  de `estado-actual.md`.

## 4. Verificación de criterios de aceptación

### 4.1 Compilación e invariantes [medido]

| Criterio | Estado | Evidencia |
|:--|:--|:--|
| `pnpm run build:cf` | OK | Código 0, 6 páginas, 114 archivos, 0 advertencias. |
| CSS | OK | Solo 3 reglas nuevas en `@media (orientation:landscape)` (`.landscape\:h-auto`, `.landscape\:w-2\/5`, `.landscape\:flex-row`), emitidas después de las de `md:`; 46.815 → 46.947 B. |
| JS compilado | OK | Comparado por instrucciones: solo cambia `setInitialTheme` (sin las llamadas de guardado). |
| HTML | OK | Con los *hash* normalizados, 5 páginas idénticas al base; Servicios difiere solo en las 2 líneas de clases. |
| Invariantes | OK | 0 `style="`, 0 `onclick`, 0 `<style>`, 1 `<script>` sin `src` por página en el `<head>` antes de la primera hoja de estilo (SHA-256 `5b490c26…`, idéntico en las 6), 0 IDs duplicados, 0 `href="#"` en header y footer, 0 `./public/`. |
| Header (regla 7) | OK | 0 descendientes de `<header>` con `fixed`; `#mobile-menu-scrim` como hermano inmediato en las 6 páginas. |

### 4.2 SM-03 [render]

| Caso | Antes | Después |
|:--|:--|:--|
| Primera visita, perfil limpio (6 páginas × claro y oscuro) | Clase correcta; guarda el tema | Clase correcta; `localStorage` vacío (`{}`) en 12 de 12; 0 errores |
| Alternar con el botón (claro → oscuro → claro, y al revés) | Cambia y guarda | Cambia y guarda; recargar y navegar a `/galeria` mantienen la elección |
| Valor previo `light` con sistema oscuro / `dark` con sistema claro | Se respeta | Se respeta (Inicio y Contacto) |
| Sistema cambia sin elección guardada, sin recargar | No cambia | No cambia (no hay escucha de `matchMedia`; no se agregó) |
| Sistema cambia sin elección guardada, al recargar | No cambia (queda lo guardado en la primera visita) | **Sigue al sistema** (claro → oscuro → claro) |
| `localStorage` bloqueado (`getItem` y `setItem` lanzan `SecurityError`) | Carga y alterna; 0 errores | Igual |

* **Sin parpadeo:** el registro de clases de `<html>` es `light>dark` en oscuro, igual que antes: `light` es la clase del
  marcado y el script en línea la cambia antes de la primera hoja de estilo [código]. El script no cambió, así que la
  medición del ADR-003 (0 de 20 corridas con destello) sigue valiendo; no se repitió.
* **Limitación conocida:** quien ya tiene un valor guardado lo conserva; no se distingue una elección real de un valor
  guardado automáticamente.

### 4.3 P-4: modal en horizontal [render]

Perfil limpio, emulación táctil; rueda con pasos de 20 px y arrastre táctil de 24 px. «Lectura» = alto de
`.modal-scroll` menos su relleno vertical (64 px). Los valores son iguales en claro y oscuro.

| Viewport | Disposición | Panel | `.modal-scroll` | Lectura | Botón visible | Rueda: máximo · párrafo · galería | Táctil: máximo · párrafo · galería |
|:--|:--|--:|--:|--:|:--|:--|:--|
| 740×360 | dos columnas | 331 | 232 | 168 | 48 px, 8/8 | 8/8 · 8/8 · 8/8 | 8/8 · 6/8 · 8/8 |
| 667×375 | dos columnas | 345 | 246 | 182 | 48 px, 8/8 | 8/8 · 8/8 · 8/8 | 8/8 · 8/8 (claro), 7/8 (oscuro) · 8/8 |
| 640×360 | dos columnas | 331 | 232 | 168 | 48 px, 8/8 | 8/8 · 8/8 · 8/8 | 8/8 · 7/8 · 8/8 |
| 568×320 | dos columnas | 294 | 175 | 111 | 68 px (2 líneas), 8/8 | 8/8 · 8/8 · 8/8 | 8/8 · 4/8 · 8/8 |
| 320×640 | columna (sin cambio) | 589 | 262 | 198 | 68 px, 8/8 | 8/8 · 8/8 · 8/8 | 8/8 · 6/8 · 8/8 |
| 360×740 | columna (sin cambio) | 681 | 374 | 310 | 48 px, 8/8 | 8/8 · 8/8 · 8/8 | 8/8 · 8/8 · 8/8 |
| 412×915 | columna (sin cambio) | 842 | 535 | 471 | 48 px, 8/8 | 8/8 · 8/8 · 8/8 | 8/8 · 8/8 · 8/8 |

* En todos: título y rótulo «Servicio» enteros dentro de la figura; botón de cierre de 44×44 px con 0 px² sobre el
  título, el rótulo y el botón «Cotizar» [render]. Capturas de «Novias y Novios» en 740×360, 667×375, 640×360 y 568×320,
  en ambos temas, revisadas.
* **Párrafo con táctil:** el arrastre de 24 px a veces «salta» la ventana en que el borde inferior del último párrafo está
  visible. Con la rueda de 20 px se alcanza en 8 de 8 en todos los viewports, y con táctil siempre se llega al máximo del
  desplazamiento. Es el mismo efecto del tamaño de paso de la It. 03 (§2.3); no indica falta de alcance. La prueba con el
  dedo queda para el cierre.
* **Desde 768 px y en vertical:** geometría (panel, figura, columna, `.modal-scroll`, `scrollHeight`, relleno, botón,
  título, rótulo y cierre) idéntica al build base en 24 de 24 combinaciones desde 768 px (768×1024, 1024×768 y 1280×800)
  y en 32 de 32 en vertical (320×640, 360×740 y 412×915 en claro y 360×740 en oscuro) [render].
* **H-12:** P-4 no cambia el panel de navegación, así que en 740×360 sigue sin quedar capa tenue donde tocar. En la modal,
  sobre el panel quedan 29 px de capa (`h-[92vh]`), como antes.

### 4.4 Funcionamiento conjunto y regresión [render]

| Criterio | Estado | Evidencia |
|:--|:--|:--|
| Regresión: 6 páginas × 7 viewports × 2 temas, base contra nuevo | OK | 84 de 84 combinaciones con geometría de todos los elementos, color y fondo calculados idénticos (movimiento reducido para fijar el carrusel); tema esperado en 84 de 84; 0 px de *scroll* horizontal; consola sin errores. `localStorage` tras la carga: base `{"theme":…}`, nuevo `{}`. |
| Conjunto en 360×740, claro y oscuro | OK | Carrusel de la foto 1 a la 2 a los 8,5 s; panel: Enter abre con el foco en «Inicio», Tab ×8 cicla hasta la hamburguesa y vuelve a «Inicio», Escape cierra (`aria-expanded="false"`); modal: segunda apertura con `scrollTop` 0, foco en el cierre, Tab ×3 dentro de la modal, Escape cierra; tema alterna y guarda; 0 errores. |
| H-14: anillo de foco del cierre | Reserva | Con teclado, `:focus-visible` y `outline: auto` (anillo doble blanco y negro de Chrome), visible en ambos temas en la captura. La medición por píxel no es concluyente: contraste del anillo frente al fondo sin foco, mediana 6,02:1 en claro y 2,49:1 en oscuro (percentil 10: 1,72 y 1,42), porque mezcla los dos tonos del anillo y el borde de la foto. |

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

| ID | Hallazgo | Evidencia | Estado / destino |
|:---|:---------|:----------|:-----------------|
| H-18 | `decisiones-tecnicas.md`, ADR-003, «Consecuencias», dice que `setInitialTheme()` escribe el tema en la primera visita; ya no es así. El archivo no está en la autorización de esta iteración. | [código] | Propuesta P-5 (§6). |
| H-19 | El DoD de la épica no tiene casilla de rendimiento (Lighthouse está fuera de alcance, §4). Las cifras [informado] van solo a la bitácora de cierre. | [código] | Informativo. |
| H-20 | El método táctil de 24 px no siempre registra el borde del último párrafo (§4.3). | [render] | Informativo (método). |
| H-21 | Con `python -I`, `PYTHONIOENCODING` se ignora y la salida sale en cp1252; no afecta los datos. | [medido] | Informativo (método). |
| — | DT-11: `theme.js` sigue con BOM (no se cambió). | [medido] §6 | Abierta, oportunista. |

## 6. Archivos modificados y propuestas para archivos protegidos

**Modificados:** `src/js/modules/theme.js`, `src/pages/servicios.astro`, esta bitácora (nueva), `bitacora-cierre-epica-09.md`
(nueva), `definicion-epica.md` (estado y casillas del DoD) y una línea al final de `estado-actual.md`.

| Archivo | Antes | Después |
|:--|:--|:--|
| `src/js/modules/theme.js` | 2.491 B, con BOM, 77 CRLF, 0 LF sueltos, sin salto final | 2.520 B, con BOM, 76 CRLF, 0 LF sueltos, sin salto final |
| `src/pages/servicios.astro` | 32.461 B, sin BOM, 405 CRLF, 0 LF sueltos, con salto final | 32.513 B, sin BOM, 405 CRLF, 0 LF sueltos, con salto final |

Los bytes de los documentos y las propuestas -/+ (P-5 a P-11) están en `bitacora-cierre-epica-09.md` §10.

## 7. Mensaje de commit sugerido

```text
Épica 09 - Iteración 04: SM-03 tema en la primera visita, modal en horizontal y cierre de la épica.
```
