# Bitácora de Ejecución - Épica 07 - Iteración 02

**Fecha de ejecución:** 14-10-2026
**Agente:** Claude Code
**Objetivo:** Verificar que el `<h1>` del Hero de `index.html` muestra el efecto `fx-starlight`, sin rastro de `fx-marker`, con evidencia en código y en render real.

## 1. Resumen ejecutivo

- **Caso A** (Tarea 0): el marcado y el CSS del efecto ya estaban aplicados y no queda ningún `fx-marker`. No se editó código, HTML ni CSS: la iteración fue solo de verificación.
- `pnpm build` termina sin errores y `dist/css/output.css` queda idéntico byte a byte (mismo SHA-256 antes y después).
- Render real en Chrome 155 (headless, local) en los 7 viewports de `AGENTS.md` §7, en modo claro y oscuro: texto accesible correcto, consola sin errores ni advertencias (14 cargas), bucle de animación sin salto (140 comprobaciones, 0 fallidas), estilos idénticos en ambos temas, y movimiento reducido y alto contraste forzado correctos **por emulación**.
- **La verificación encontró dos defectos que impiden certificar** la iteración, ambos corregibles solo editando `src/css/input.css` o el `<h1>` (se detuvo la ejecución a la espera de aprobación, según la directiva):
    1. **Recorte de glifos (Tarea 5.1):** `background-clip: text` no pinta fuera de la caja del `span`, y la cursiva de "La Jardinera" sobresale de ella. La "J" pierde su pie izquierdo (≈ 7 px a 48 px) cuando abre la segunda línea, y la "a" final pierde ≈ 1,2 px de su terminal en todos los viewports.
    2. **Peso de "Florería" desde 1024 px (Escenario 2):** se calcula con peso **400** y no con 600, porque `lg:text-display-hero` (token con `fontWeight: 400`) pisa a `font-semibold`.
- Queda 🕒 PENDIENTE: la traza de pintado en dispositivo real, el alto contraste forzado real, otros navegadores y la lista manual del §5.4.

## 2. Línea base

| Elemento | Valor | Comando / método |
|:--|:--|:--|
| Commit de partida | `03a3658` | `git rev-parse --short HEAD` |
| Árbol de trabajo | Limpio, salvo `README.md` modificado por el desarrollador (ajeno a esta iteración) | `git status --short` |
| SHA-256 de `dist/css/output.css` antes de compilar | `007451f666f270216fe6ece6bd26055445a512000af237fa09089c9fd48f01a2` | `sha256sum` |

**Tarea 0: diagnóstico** (búsqueda sin distinguir mayúsculas; conteos con la herramienta de búsqueda del agente):

| Cadena | `index.html` | `src/css/input.css` | `dist/css/output.css` |
|:--|:--|:--|:--|
| `fx-marker` | 0 | 0 | 0 |
| `fx-starlight` | 3 ocurrencias, todas en la línea 260 (el `<h1>`) | Bloque completo, líneas 239 a 323 | Presente: 6 reglas de nivel superior, `@keyframes`, `@supports` y `@media (forced-colors:active)` |
| `--ink-2` | 0 | 0 | 0 |
| `--star` | 0 | 1 definición (línea 258) y 3 usos (líneas 274 a 276) | Presente |

Además, `:root` ya no define `--ink`, `--ink-2` ni `--ink-3` (las únicas coincidencias de `--ink` empiezan en la línea 256, dentro del bloque del efecto). **Clasificación: Caso A.**

**Diferencias frente a la especificación:**

- **CSS:** el bloque real es idéntico al de referencia de la Tarea 2 salvo el formato de la declaración `background:` (la referencia pone las cuatro capas en líneas sangradas bajo `background:`; el real abre la primera capa en la misma línea). Mismos tokens y valores. Comparado con `diff -w -B`: 1 hunk, solo de formato.
- **Marcado:** el `<h1>` real no lleva `mb-space-4`; la Tarea 1 de la especificación sí lo incluye, pero `DESIGN.md` §7.1 dice que ya no lo lleva ("el espaciado con el párrafo lo da el `gap-space-3` de la tarjeta"). Prevalece `DESIGN.md` (`_planificacion/README.md` §2.2). El real coincide con `DESIGN.md`.

## 3. Cambios realizados (por archivo)

Ninguno en código, HTML, CSS ni configuración. `git diff` de `index.html`, `src/`, `dist/` y los HTML no muestra cambios. Los únicos archivos escritos por esta iteración son este registro y una línea en `estado-actual.md`.

**Método de verificación en render real:** Chrome 155.0.8059.40 (headless, instalado en el equipo; no se instaló nada), controlado por el protocolo CDP desde scripts temporales en el scratchpad de la sesión (fuera del repositorio), con la raíz del proyecto servida por HTTP en un puerto local. Perfil de Chrome aislado. 7 viewports × 2 temas = 14 cargas, sin caché. El tema se fijó con `localStorage.theme` y `prefers-color-scheme`.

## 4. Verificación de criterios de aceptación

### 4.1 Tarea 3: compilación

| Comprobación | Estado | Evidencia |
|:--|:--:|:--|
| `pnpm build` sin errores | ✅ | Ejecutado dos veces; segunda corrida con código de salida 0 comprobado. |
| `dist/css/output.css` sin cambios | ✅ | SHA-256 antes y después idéntico (`007451f6…01a2`); `git status` sin cambios en `dist/`. |
| Reglas del efecto en el CSS compilado | ✅ confirmado por código | `.fx-starlight{--ink:#f8f7f3;--ink-3:#ffc2c6;--star:#fff;color:var(--ink)}`, `.fx-starlight--accent{--ink:#ffc2c6;--ink-3:#f8f7f3}`, `@supports ((-webkit-background-clip:text) or (background-clip:text)){…}`, `.fx-starlight .fx-starlight{filter:none}`, `@keyframes fx-starlight{0%{…}to{background-position:4.3em 0,-5.35em 0,6.45em 0,200% 0}}`, `@media (prefers-reduced-motion:reduce){…}` y `@media (forced-colors:active){…}`. |
| Variables resueltas | ✅ | `#f8f7f3` (`neutral-50`), `#ffc2c6` (`secondary-container`), `#fff` (`surface-container-lowest`). |
| Sin `fx-marker` ni `theme(` sin resolver | ✅ | 0 y 0 en `output.css`. |
| `.fx-spotlight` intacto | ✅ confirmado por código | 3 reglas en `output.css`, 5 menciones en `input.css`; sin cambios en el árbol. |

### 4.2 Tarea 4: accesibilidad y marcado

| Comprobación | Estado | Evidencia |
|:--|:--:|:--|
| Texto accesible "Florería La Jardinera" con espacio | ✅ | **Render real:** `textContent` normalizado en las 14 cargas; árbol de accesibilidad de Chrome: rol `heading`, nombre `"Florería La Jardinera"`. 0 `aria-hidden` y 0 `style` en el subárbol del `<h1>`. |
| 0 `style="` nuevos en `index.html` | ✅ | `git diff` vacío. El único existente está en la línea 798 (textura de ruido del banner, DT-03; no se toca). |
| Ninguna otra página usa `fx-starlight` ni `fx-marker` | ✅ | Búsqueda en `*.html`, `src/`, `dist/`, `scripts/`: coincidencias solo en `index.html` (1), `input.css` (8) y `output.css` (1 línea compilada). |

### 4.3 Tarea 5: render real (Chrome 155 headless, 7 viewports × claro y oscuro)

| # | Comprobación | Estado | Evidencia |
|:--|:--|:--:|:--|
| 1 | Titular completo, sin letras recortadas | ❌ **Falla** | El texto se lee completo y sin desborde en las 14 cargas. Pero **hay recorte de glifos**: ver §5, H-1. Con texto sólido inyectado solo en la página de prueba, la "J" y la "a" se ven completas; con el efecto, la "J" (360×740) muestra un corte recto en su pie izquierdo y la "a" (1280×800) un corte plano en su terminal. La "í" de "Florería" no se recorta (tinta dentro de la caja: ascendente 37 px de 51 px a 48 px). |
| 2 | Pesos, estilos y colores base | ❌ **Falla desde 1024 px** | **< 1024 px (5 viewports):** "Florería" 600 redonda y "La Jardinera" 400 cursiva; tipografías realmente usadas según Chrome: `Noto-Serif-SemiBold` y `Noto-Serif-Italic` (fuentes reales, no sintetizadas). **≥ 1024 px (2 viewports):** "Florería" **400**. Colores base correctos: `--ink` `#f8f7f3` en el exterior y `#ffc2c6` en la variante `--accent`. Ver §5, H-2. |
| 3 | Sin salto en el bucle | ✅ | `background-position` leído con la animación pausada en t = 0, 1800, 3599,9 y 3600 ms, en 14 combinaciones × 2 spans. Capas 1 a 3: el desplazamiento al final del ciclo es exactamente un mosaico (206,4 / 256,8 / 309,6 px a 48 px, con 0,006 px de diferencia por leerse a 3599,9 ms). Capa 4: `0%` → `199,994%` (≈ `200%`). A 3600 ms vuelve a `0px 0px, 0px 0px, 0px 0px, 0% 0px`. **140 comprobaciones, 0 fallidas.** |
| 4 | Movimiento reducido | ✅ por emulación | `prefers-reduced-motion: reduce` emulado en las 14 combinaciones: `animation-name: none` en ambos spans y `--ink-3` igualado a `--ink`. Observación: el relleno sigue siendo `background-clip: text` (color transparente), con las tres capas de destellos **fijas** y el degradado de un solo tono; es lo que describe `DESIGN.md` §7.4 (regla 4), pero la especificación habla de "titular sólido". |
| 5 | Alto contraste forzado | ✅ por emulación (media query) | `forced-colors: active` emulado: `color` resuelve a `CanvasText` (`rgb(0,0,0)` en claro y `rgb(255,255,255)` en oscuro), sin imagen de fondo, `filter: none` y `animation-name: none`. 🕒 Falta el modo de contraste real de Windows (ver §5.4). |
| 6 | Claro y oscuro idénticos | ✅ | Estilos computados del exterior y del interior idénticos en los 7 viewports; recorte del `<h1>` (animación detenida en t = 0, escala 2) con el mismo hash SHA-256 (16 primeros caracteres) en claro y oscuro en los 7 viewports. |
| 7 | Consola sin errores ni advertencias | ✅ | 0 mensajes `error`/`warning` de consola, 0 excepciones y 0 entradas de registro de nivel `error`/`warning` (incluye fallos de carga de recursos) en las 14 cargas. |
| 8 | Costo de pintado | 🕒 PENDIENTE | **No hay traza de pintado ni dispositivo móvil real.** Medición indicativa de `requestAnimationFrame` durante 5 s con el Hero visible, en Chrome headless en PC: 412×915 sin limitación de CPU, 302 cuadros = 60,2 fps (intervalo máximo 17,1 ms); 412×915 con CPU 4× más lenta, 300 cuadros = 59,9 fps (máximo 33,3 ms); 1280×800, 301 cuadros = 60,2 fps (máximo 17,1 ms). Esta cifra no equivale a una traza de rendimiento. No se propone `IntersectionObserver`. |

### 4.4 Escenarios de la especificación

| Criterio | Estado | Evidencia |
|:--|:--:|:--|
| Escenario 1: Efecto presente y limpio | ✅ | Efecto aplicado y animado (computado y capturas); 0 `fx-marker` y 0 `--ink-2` en fuente y en CSS compilado (§2 y §4.1). |
| Escenario 2: Jerarquía tipográfica intacta | ❌ | Se cumple por debajo de 1024 px; **no** desde 1024 px, donde "Florería" es 400 (H-2). El efecto en sí no cambia familia, tamaño ni espaciado. |
| Escenario 3: Accesibilidad visual | ✅ por emulación | Movimiento reducido y alto contraste forzado correctos; nombre accesible correcto (§4.2 y §4.3). 🕒 Falta el contraste forzado real. |
| Escenario 4: Cero regresión | ✅ | 0 archivos de código modificados; `pnpm build` sin errores; consola limpia. `scrollWidth` igual a `clientWidth` en 12 de 14 cargas; la excepción (772 frente a 768 px a 768×1024, en ambos temas) es el desborde de 4 px a 768 px ya registrado en HEAD y fuera del Hero (línea de `estado-actual.md` de la Iteración 08 de la Épica 01). |
| Escenario 5: Honestidad del reporte | ✅ | Lo no medido en dispositivo real figura como 🕒 PENDIENTE; las únicas cifras de rendimiento son mediciones, no estimaciones, y están rotuladas como indicativas. |

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

**H-1. Recorte de glifos de la cursiva (defecto de render; se propone corregir en `input.css`).**
`background-clip: text` solo pinta dentro de la caja del `span`; la tinta de una cursiva sobresale de su avance. Medido en Chrome:

| Glifo | Situación | Pérdida |
|:--|:--|:--|
| "J" de "Jardinera" | Solo cuando abre una línea nueva (pie izquierdo fuera de la caja). Verificado con captura ampliada ×8 a 360×740. Por geometría ocurre igual cuando `lineasInner` es 2: 320×640 y 412×915 (no capturados con zoom). Con "Jardinera" a mitad de línea la caja del `span` ya cubre el pie: verificado con captura ampliada ×8 a 1280×800 (idéntica con efecto y con texto sólido); a 740, 768, 1024 el `span` ocupa una sola línea por la misma geometría, sin captura propia. | ≈ 7 px a 48 px (lectura de la captura ×8) |
| "a" final | En todos los viewports (el interletrado negativo acorta la caja). Verificado con captura ampliada ×8 a 1280×800. | 1,41 px a 48 px y 1,22 px a 64 px (medida de tinta con el lienzo), corte plano visible en la captura |

*Corrección candidata (no aplicada), probada solo en la página de prueba por inyección de CSS, en 360×740 y 1280×800:*

```css
/* La tinta de la cursiva sobresale de su caja (la "J" al abrir línea y la "a" final) y
   background-clip: text no pinta fuera de ella; el margen negativo compensa el relleno. */
.fx-starlight--accent {
    padding-inline: .16em;
    margin-inline: -.16em;
}
```

Con `.16em` la "J" y la "a" quedan idénticas a la versión de texto sólido; `scrollWidth` = `clientWidth` y el número de líneas no cambia (2 a 360 px, 1 a 1280 px). Con `.12em` la "J" aún perdía ≈ 1 px. **No** se probó en los otros 5 viewports, en modo oscuro ni en otros navegadores: hay que repetir la verificación completa tras aplicarla.

**H-2. "Florería" pasa a peso 400 desde 1024 px (defecto de especificación de diseño; se propone corregir en el `<h1>` y en `DESIGN.md`).**
Causa verificada: en `dist/css/output.css`, `.lg\:text-display-hero{font-size:64px;line-height:72px;letter-spacing:-.02em;font-weight:400}` está dentro de `@media (min-width:1024px)` y gana a `.font-semibold{font-weight:600}`; el token sale de `tailwind.config.js:201` (`"fontWeight": "400"`). Contradicción interna de `DESIGN.md`: §1.2 asigna peso 400 a `display-hero`, mientras que §7.3 y §1.3 piden 600 para "Florería". Efecto colateral: a ≥ 1024 px el interletrado computado es −0,02 em (−1,28 px), no el −0,025 em de `tracking-tight`. Nota: el `<h1>` del marcado coincide literalmente con `DESIGN.md` §7.1, así que no es un error de ejecución. La Tarea 1 prohíbe tocar las clases del `<h1>`, por eso se reporta en vez de corregir.
*Corrección propuesta (no aplicada ni probada):* agregar `lg:font-semibold` al `<h1>`; Tailwind emite `fontWeight` después de `fontSize` dentro del mismo `@media`, por lo que debería ganar. Requiere compilar y medir. La alternativa es documentar el peso 400 de escritorio en `DESIGN.md` §7.3 (decisión del desarrollador).

**H-3. Observación sobre movimiento reducido.** Ver §4.3, ítem 4: los destellos quedan fijos (no se ocultan). Es coherente con `DESIGN.md` §7.4; solo la redacción "titular sólido" de la especificación es más estricta. No se corrige nada.

**H-4. Especificación desactualizada.** La Tarea 1 de `iteracion-02.md` incluye `mb-space-4` en el `<h1>`, que `DESIGN.md` §7.1 ya retiró. Propuesta: quitar `mb-space-4` del bloque de la Tarea 1.

**H-5. Incidentes de proceso (sin efecto en el proyecto).**
- El `grep -F` del shell falló de forma intermitente y dejó `grep.exe.stackdump` en la raíz (archivo sin seguimiento, generado por el agente). Se eliminó y se pasó a la herramienta de búsqueda del agente para los conteos de §2. Los conteos del shell no se usaron como evidencia.
- Al pedir la versión de Chrome con `--version`, Chrome mostró "Se está abriendo en una sesión de navegador existente": pudo haber abierto una ventana en el navegador del desarrollador. Las verificaciones usaron después un perfil aislado.

**H-6. Deuda propuesta (no registrada: no se tocó la tabla del §12).** `DT-18` (propuesta): recorte de glifos de `fx-starlight` (H-1). `DT-19` (propuesta): peso 400 de "Florería" desde 1024 px y contradicción `DESIGN.md` §1.2 frente a §7.3 (H-2).

### 5.1 🕒 Pendientes del desarrollador (lista manual)

- [ ] **Aprobar o descartar** las dos correcciones de H-1 y H-2 (ver §6). Con la aprobación, se aplican en `input.css` y en el `<h1>`, se repite `pnpm build` y se verifica de nuevo en los 7 viewports, en ambos temas.
- [ ] Abrir `index.html` por HTTP y mirar el titular en móvil (360 px) y escritorio (1280 px): fijarse en el pie de la "J" de "Jardinera" y en el terminal de la "a" final.
- [ ] Comprobar que el bucle no da un salto visible (esperar más de 3,6 s).
- [ ] Activar "Reducir movimiento" en el sistema operativo: el titular debe quedar quieto, con los destellos fijos.
- [ ] Activar el contraste alto de Windows (real): el titular debe verse con el color de texto del sistema y sin efectos.
- [ ] Alternar modo claro y oscuro: el titular debe verse igual.
- [ ] Revisar el titular en Firefox y Safari (`background-clip: text`, `-webkit-box-decoration-break` y `color-mix`).
- [ ] Revisar la consola del navegador y registrar una traza de rendimiento (Pintado) en un móvil real para el costo de la animación de `background-position`.

## 6. Archivos modificados y propuestas para archivos protegidos

**Modificados por el agente:** este archivo (`_planificacion/04-bitacora/bitacora-epica-07/bitacora-iteracion-02.md`) y `_planificacion/04-bitacora/estado-actual.md` (una línea). Los ajustes de registro de la Parte A (bitácora de la Iteración 01, `iteracion-03.md` de la Épica 07 y `iteracion-02.md` a `iteracion-08.md` de la Épica 08) se reportan en la bitácora de la Iteración 01 y en el reporte del chat.

**Propuestas de edición para `DESIGN.md`** (dependen de la decisión del desarrollador sobre H-1 y H-2; no se aplican):

### Propuesta de edición — `DESIGN.md`
**Sección:** §1.3 Mapa de uso (fila "H1 del Hero (Inicio)") y §7.1
**Motivo:** a ≥ 1024 px, `lg:text-display-hero` (peso 400) pisa a `font-semibold`; "Florería" queda en 400 en vez de 600 (§7.3). Alternativa: aceptar el 400 de escritorio y corregir §7.3.
```diff
- | H1 del Hero (Inicio)             | `font-display-hero text-headline-xl lg:text-display-hero font-semibold tracking-tight leading-none` + §7 |
+ | H1 del Hero (Inicio)             | `font-display-hero text-headline-xl lg:text-display-hero font-semibold lg:font-semibold tracking-tight leading-none` + §7 |
```
```diff
- <h1 class="font-display-hero text-headline-xl lg:text-display-hero text-neutral-50 font-semibold max-w-4xl tracking-tight leading-none">
+ <h1 class="font-display-hero text-headline-xl lg:text-display-hero text-neutral-50 font-semibold lg:font-semibold max-w-4xl tracking-tight leading-none">
```

### Propuesta de edición — `DESIGN.md`
**Sección:** §7.4 Reglas técnicas
**Motivo:** documentar la holgura lateral que evita el recorte de glifos de la cursiva (H-1).
```diff
  7. **Regla de seguridad para toda animación de entrada del proyecto:** un estado oculto (`opacity: 0`) nunca vive en
     la regla base, solo dentro de los keyframes con `animation-fill-mode: both`.
+ 8. **Holgura lateral de la cursiva:** `background-clip: text` no pinta fuera de la caja del `span`. La variante
+    `.fx-starlight--accent` lleva `padding-inline: .16em` y `margin-inline: -.16em` para que la "J" (al abrir línea) y
+    la "a" final no se recorten.
```

Además, para `_planificacion/` (no protegido): quitar `mb-space-4` del bloque de la Tarea 1 de `iteracion-02.md` (H-4) y registrar `DT-18` y `DT-19` en el §12 de `_planificacion/README.md` cuando el desarrollador lo autorice (H-6).

## 7. Mensaje de commit sugerido

```text
Épica 07 - Iteración 02: Verifica el titular Starlight en render real (Caso A); registra el recorte de glifos y el peso 400 de Florería desde 1024 px, pendientes de aprobación.
```
