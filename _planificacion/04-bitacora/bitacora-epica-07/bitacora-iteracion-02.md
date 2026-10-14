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

---

## 8. Cierre de la Iteración 02: aplicación de las dos correcciones aprobadas (14-10-2026)

> Esta sección se agrega después de la aprobación del desarrollador. Las secciones 1 a 7 quedan como registro de la primera pasada: sus "pendientes de aprobación" (§5.1, primera casilla) y el commit sugerido del §7 quedan **superados** por esta sección.

### 8.1 Decisiones y alcance autorizado

| # | Decisión del desarrollador (14-10-2026) | Aplicación |
|:--|:--|:--|
| 1 | Recorte de glifos (H-1): aplicar la corrección candidata y probarla en los 7 viewports. | `padding-inline: .16em; margin-inline: -.16em` en `.fx-starlight--accent`. |
| 2 | Peso de "Florería" (H-2): 600 en todos los tamaños. | `lg:font-semibold` en el `<h1>` del Hero. |

Archivos tocados: `src/css/input.css`, `index.html`, `dist/css/output.css` (regenerado con `pnpm build`), esta bitácora, `estado-actual.md` (una línea), el bloque de marcado de la Tarea 1 de `iteracion-02.md` y las filas DT-18 y DT-19 del §12 de `_planificacion/README.md`. Búsqueda previa con la herramienta de búsqueda: `.fx-starlight--accent` solo se usa en `index.html` (línea 260), en `input.css` y en la documentación de `DESIGN.md` §7.1; no hay otro uso que la corrección pueda afectar.

### 8.2 Cambios en el código (`git diff`)

```diff
--- a/index.html
-<h1 class="font-display-hero text-headline-xl lg:text-display-hero text-neutral-50 font-semibold max-w-4xl tracking-tight leading-none">
+<h1 class="font-display-hero text-headline-xl lg:text-display-hero text-neutral-50 font-semibold lg:font-semibold max-w-4xl tracking-tight leading-none">

--- a/src/css/input.css   (dentro de .fx-starlight--accent)
     --ink-3: theme('colors.neutral-50');
+
+    /* La tinta de la cursiva sobresale de la caja del span (la "J" al abrir
+       línea y la "a" final) y background-clip: text no pinta fuera de ella:
+       el relleno lateral la cubre y el margen negativo lo compensa. */
+    padding-inline: .16em;
+    margin-inline: -.16em;
```

Sin `style=`, sin `onclick`, sin clases armadas con plantillas (la clase `lg:font-semibold` está escrita en forma literal).

### 8.3 Compilación (confirmado por código)

| Comprobación | Resultado | Evidencia |
|:--|:--:|:--|
| `pnpm build` sin errores | ✅ | Dos corridas, código de salida 0 comprobado en la segunda. El aviso de `caniuse-lite` es el conocido; no se ejecutó `update-browserslist-db`. |
| `output.css` contiene `.lg\:font-semibold` | ✅ | `.lg\:font-semibold{font-weight:600}`, búsqueda de texto en `dist/css/output.css`. |
| Orden de cascada | ✅ | Dentro del mismo `@media (min-width:1024px)`, `.lg\:font-semibold` (posición 46391) va **después** de `.lg\:text-display-hero` (posición 46065), por lo que gana. Sin otro `@media` entre ambas. |
| `output.css` solo cambia en lo esperado | ✅ | Comparado regla por regla con `HEAD`: 1 regla modificada (`.fx-starlight--accent`, +2 declaraciones) y 1 regla nueva (`.lg\:font-semibold`); 46.545 → 46.622 caracteres. SHA-256 nuevo: `6333fb61480f62e9f892c790d0d1e1fbfdb67230278ebc0ec1cbb41adf58d991` (el anterior era `007451f6…01a2`). |

### 8.4 Método y niveles de confianza

Chrome 155.0.8059.40 (headless, el ya instalado; no se instaló nada), controlado por CDP desde scripts temporales en el scratchpad de la sesión (fuera del repositorio). Perfil aislado (`--user-data-dir` en el scratchpad) y puertos de depuración propios (9343, 9344 y 9345); no se ejecutó `chrome --version`. Al terminar: 0 procesos de Chrome o Node de la sesión activos y `git status` sin archivos sueltos (ningún `*.stackdump`).

- **Antes y después medidos en esta misma sesión**, con el mismo script y los 7 viewports × claro y oscuro (14 cargas, sin caché): "antes" con el código sin tocar; "después" con las correcciones.
- **Recorte:** capturas ×8 de la "J" y de la "a" final (y ×4 del `<h1>` completo), con el efecto detenido en t = 0 frente a **texto sólido** inyectado solo en la página de prueba, ambas sobre un fondo plano negro (también solo en la página de prueba). Se cuentan los píxeles con tinta en el texto sólido (canal máximo ≥ 200) que el efecto no pinta (< 100). El ancho es la extensión horizontal de esos píxeles, en px CSS.
- **Estados simulados:** el "antes" del barrido de anchos se reconstruye con CSS inyectado (`padding-inline:0; margin-inline:0` y `h1{font-weight:400}` desde 1024 px); la simulación coincide con el "antes" real medido en los 7 viewports (líneas, ancho y alto del `<h1>` y peso).
- Clasificación: **confirmado por código** = lectura del CSS compilado o del fuente; **confirmado en render real (headless)** = medición en Chrome; **emulado** = media query emulada por CDP (`prefers-reduced-motion`, `forced-colors`).

### 8.5 H-1: recorte de glifos (tabla antes → después)

Medido en claro y en oscuro: los resultados son idénticos entre temas.

| Viewport | Líneas del `span` interno | "J" perdida: antes → después | "a" final perdida: antes → después |
|:--|:--:|:--|:--|
| 320 × 640 | 2 | 7,25 px (1.035 px de captura) → **0** | 0,75 px (45 px) → **0** |
| 360 × 740 | 2 | 7,25 px (1.035 px) → **0** | 0,75 px (45 px) → **0** |
| 412 × 915 | 2 | 7,25 px (1.035 px) → **0** | 0,75 px (45 px) → **0** |
| 768 × 1024 | 1 | 0 → 0 (la "J" va a mitad de línea) | 0,75 px (44 px) → **0** |
| 740 × 360 | 1 | 0 → 0 | 0,75 px (44 px) → **0** |
| 1024 × 768 | 1 | 0 → 0 | 0,63 px (38 px) → **0** |
| 1280 × 800 | 1 | 0 → 0 | 0,63 px (38 px) → **0** |

- **Píxeles que se recuperan:** la "J" recupera **7,25 px** de su pie izquierdo en los tres viewports donde abre línea (320, 360 y 412 px); la "a" final recupera **0,75 px** (< 1024 px) y **0,63 px** (≥ 1024 px). La medición de tinta con el lienzo de la primera pasada daba 1,41 y 1,22 px para la "a" con otro criterio (cualquier tinta fuera de la caja); aquí se cuentan solo los píxeles claramente ausentes, por eso la cifra es menor.
- **Conteo estricto** (texto sólido ≥ 250 y efecto < 30) sobre el `<h1>` completo: **0 píxeles** en las 14 cargas. El conteo laxo del `<h1>` completo (706 a 2.519 px) es borde antialias (píxeles parcialmente cubiertos por el recorte del texto), no tinta perdida; por eso no se usa como criterio.
- Inspección visual de las capturas ampliadas (360 × 740: "J"; 1280 × 800: "a"): el pie de la "J" pasa de un corte plano recto a la curva completa; el terminal de la "a" queda íntegro.

### 8.6 H-2: peso de "Florería" (tabla antes → después)

| Viewport | "Florería" antes → después | "La Jardinera" antes → después | Archivo de fuente de "Florería" (Chrome) |
|:--|:--:|:--:|:--|
| 320 × 640 | 600 → 600 | 400 cursiva → 400 cursiva | `Noto-Serif-SemiBold` |
| 360 × 740 | 600 → 600 | 400 cursiva → 400 cursiva | `Noto-Serif-SemiBold` |
| 412 × 915 | 600 → 600 | 400 cursiva → 400 cursiva | `Noto-Serif-SemiBold` |
| 740 × 360 | 600 → 600 | 400 cursiva → 400 cursiva | `Noto-Serif-SemiBold` |
| 768 × 1024 | 600 → 600 | 400 cursiva → 400 cursiva | `Noto-Serif-SemiBold` |
| 1024 × 768 | **400 → 600** | 400 cursiva → 400 cursiva | (a 1280 px: antes `Noto-Serif` regular, ahora `Noto-Serif-SemiBold`) |
| 1280 × 800 | **400 → 600** | 400 cursiva → 400 cursiva | `Noto-Serif-SemiBold`, fuente real (no sintetizada) |

- Interletrado computado sin cambios: −1,2 px a 48 px y −1,28 px a 64 px (la corrección no toca el tracking).
- Con 600 desde 1024 px el texto es algo más ancho, como se esperaba: el `<h1>` pasa de **609,63 a 622,30 px** (+12,67 px, +2,1 %). Sigue en **1 línea**, con la misma altura (72 px). La tarjeta de vidrio queda idéntica (**816 × 458,75 px** antes y después) y el titular no la desborda: el contenido del titular queda a 31,84 px de cada borde interior de la tarjeta (antes 38,19 px).
- Barrido de **281 anchos** (280 a 1400 px, paso de 4 px, más los 7 viewports): 0 anchos con distinto número de líneas y 0 con distinta altura de tarjeta. Desde 1024 px el `<h1>` mide 622,30 px en todo el tramo (máximo medido en el barrido).
- Nombre accesible del `<h1>` (árbol de accesibilidad de Chrome): rol `heading`, nombre **"Florería La Jardinera"**, antes y después.

### 8.7 Sin regresión

| Comprobación | Estado | Evidencia |
|:--|:--:|:--|
| Número de líneas del título por viewport | ✅ render real | Idéntico en los 7 viewports (span interno / exterior: 2/3, 2/2, 2/2, 1/1, 1/1, 1/1, 1/1 en 320, 360, 412, 768, 740, 1024 y 1280 px) y en los 281 anchos del barrido (0 diferencias). La posición de la "J" y de la "a" en pantalla es idéntica hasta 768 px; desde 1024 px se corren 6,33 px por el ensanchamiento del peso 600 (el titular sigue centrado). |
| Sin scroll horizontal nuevo | ✅ render real | `scrollWidth` del documento idéntico antes y después en los 281 anchos. Excepción conocida: 772/768 px a 768 × 1024 (ver H-8: abarca 768 a 1023 px, igual antes y después, fuera del Hero). |
| Ancestros del `<h1>` | ✅ render real | Solo `section` recorta (`overflow-x: hidden`, a todo el ancho del viewport); ningún ancestro del `<h1>` cambia su `scrollWidth`. El relleno asoma dentro del padding de la tarjeta (ver H-7). |
| Campos de destellos y brillo | ✅ cuantificado; 🕒 juicio visual | El campo de destellos del `span` interno se corre **−.16em** respecto de las letras (−7,68 px a 48 px; −10,24 px a 64 px) porque su fondo nace en el borde exterior del relleno. Equivale a un desfase de fase de 0,134 s, 0,108 s y 0,089 s (capas 1 a 3) en un ciclo de 3,6 s; el mosaico y el bucle no cambian. El brillo (capa 4, 200 % del ancho de la caja) se estira con la caja: +12,0 % (320 a 412 px, dos fragmentos), +5,8 % (768 y 740 px) y +5,7 % (≥ 1024 px). En las capturas a t = 0 un destello cae en otro lugar (se ve junto a la "a" de "Jardinera" a 360 px). Es un desfase constante de un campo que se anima; que sea o no perceptible lo juzga el desarrollador. |
| Bucle sin salto | ✅ render real | 140 comprobaciones (5 por span × 2 spans × 14 cargas), **0 fallidas**; a 3600 ms vuelve exactamente a t = 0. |
| Movimiento reducido | ✅ emulado | 14 de 14: `animation-name: none` y `--ink-3` igualado a `--ink` en ambos spans. |
| Alto contraste forzado | ✅ emulado | 14 de 14: color `CanvasText`, sin imagen de fondo, `filter: none` y sin animación. 🕒 Falta el contraste forzado real de Windows. |
| Claro y oscuro idénticos | ✅ render real | Mismo hash del recorte del `<h1>` en claro y oscuro en los 7 viewports (antes y después). |
| Consola limpia | ✅ render real | 0 mensajes `error`/`warning`, 0 excepciones y 0 entradas de registro de nivel `error`/`warning` en las 14 cargas, antes y después (solo la página de Inicio). |
| Contraste del titular | ✅ sin cambios | Los tonos (`#f8f7f3`, `#ffc2c6`, `#fff`) y el fondo bajo el titular no cambian: el contraste del peor caso es idéntico a dos decimales en las 14 cargas y el medio también, salvo 4,83 → 4,84 a 1280 px (claro y oscuro) por una variación de ±0,0002 en la luminancia del fondo (ruido de la foto). **No existía una medición numérica previa en esta bitácora**, así que el "antes" se midió en esta sesión con el código sin tocar. Con el tono más bajo (`#ffc2c6`) frente al píxel **más luminoso** del fondo bajo el `<h1>`: 2,73 a 3,04:1; frente a la luminancia media: 4,65 a 5,73:1. Ver H-9. |
| Reglas del efecto intactas | ✅ por código | `.fx-starlight` y demás reglas, `@keyframes`, `prefers-reduced-motion` y `forced-colors` sin cambios; solo cambia `.fx-starlight--accent`. |

### 8.8 Hallazgos nuevos (fuera de alcance: se reportan, no se corrigen)

- **H-7. Desborde transparente del `<h1>` por el relleno.** El `<h1>` tiene ahora `scrollWidth > clientWidth` por hasta **11 px** (0 a 7 px bajo 1024 px; 11 px desde 1024 px), porque la caja con relleno del `span` interno sobresale `.16em` a cada extremo (con `box-decoration-break: clone`, también en cada fragmento si el `span` se parte en dos líneas). Es relleno transparente: no hay scroll de página (el `scrollWidth` del documento no cambia), ningún ancestro lo recorta (la tarjeta tiene `overflow: visible` y relleno de 32 px en móvil y 64 px desde `md`) y el recorte de píxeles es 0. Queda documentado en la propuesta de la regla 8 de `DESIGN.md` §7.4. No se espera impacto, pero conviene confirmarlo en Firefox y Safari.
- **H-8. El desborde horizontal de 4 px abarca de 768 a 1023 px, no solo 768 px.** El barrido de anchos mostró `scrollWidth = clientWidth + 4` en los 64 anchos medidos entre 768 y 1020 px, **idéntico antes y después** de esta iteración. Nace en `div.flex.flex-col.w-full` (contenedor de las secciones de `main`), fuera del Hero. La línea de `estado-actual.md` de la Iteración 08 de la Épica 01 lo registraba solo a 768 px. No se corrige.
- **H-9. Contraste frente al píxel más luminoso del fondo.** Con el criterio del píxel más luminoso de la región (no un criterio por área), el tono `#ffc2c6` queda en 2,73 a 3,04:1, por debajo de 3:1 en 6 de los 7 viewports (todos salvo 768 × 1024; el texto de 48 y 64 px es "texto grande", que exige 3:1). La certificación de AA de la Épica 01, Iteración 08, se hizo con el tinte mínimo `/45`; aquí no se reevaluó con otro criterio ni se corrige nada. Se deja como observación para el desarrollador.
- **H-10. Frase desactualizada en la especificación.** La frase que antecede al bloque de la Tarea 1 de `iteracion-02.md` dice "las clases del `<h1>` no se tocan"; tras esta iteración el bloque sí agrega `lg:font-semibold` y quita `mb-space-4`. Solo se autorizó editar el bloque de marcado; la frase queda por actualizar.

### 8.9 Criterios de aceptación: estado final

| Criterio | Estado | Evidencia |
|:--|:--:|:--|
| Tarea 5.1, titular completo sin letras recortadas (antes ❌) | ✅ render real (headless) | §8.5: 0 px perdidos en las 14 cargas. |
| Escenario 2, jerarquía tipográfica intacta (antes ❌ desde 1024 px) | ✅ render real (headless) | §8.6: "Florería" 600 y "La Jardinera" 400 cursiva en los 7 viewports. |
| Escenarios 1, 3, 4 y 5 | ✅ | Sin regresión (§8.7); lo no medido en dispositivo real sigue como 🕒 PENDIENTE. |
| Deuda DT-18 y DT-19 | ✅ | Registradas y marcadas como resueltas en `_planificacion/README.md` §12, con la reserva de que solo se midió Chrome. |

### 8.10 🕒 PENDIENTES (lo que no se pudo medir)

- [ ] **Traza de pintado en un móvil real** (costo de animar `background-position`; con el relleno la superficie pintada del `span` interno crece hasta 12 %, sin efecto esperado pero sin medir).
- [ ] **Contraste forzado real de Windows** (solo se emuló la media query).
- [ ] **Firefox y Safari:** `background-clip: text` con relleno y `box-decoration-break: clone`, y el desborde transparente de H-7. Esta iteración solo se midió en Chrome 155.
- [ ] **Lista manual de §5.1 (primera pasada)**, salvo su primera casilla (ya resuelta): mirar el titular en 360 y 1280 px (pie de la "J" y terminal de la "a"), esperar más de 3,6 s para ver el bucle, activar "Reducir movimiento", activar el contraste alto real, alternar claro y oscuro, revisar consola y traza de pintado.
- [ ] **Juicio visual del desfase de los destellos** (§8.7, fila de campos y brillo).
- [ ] Consola y `pnpm build` de las otras 5 páginas (solo se midió Inicio).

### 8.11 Archivos modificados y propuestas para archivos protegidos

**Modificados por el agente:** `src/css/input.css`, `index.html`, `dist/css/output.css` (generado), `_planificacion/03-planificacion/epicas/epica-07-saneamiento-previo-react/iteracion-02.md` (solo el bloque de marcado de la Tarea 1), `_planificacion/README.md` (§12: filas DT-18 y DT-19), esta bitácora y `_planificacion/04-bitacora/estado-actual.md` (una línea).

Las propuestas siguientes **reemplazan** a las del §6 (consolidadas y finales; reflejan exactamente las clases y valores del código). No se aplican.

### Propuesta de edición — `DESIGN.md`
**Sección:** §1.2 Escala (párrafo "Importante")
**Motivo:** el token `display-hero` declara peso 400 y `lg:text-display-hero` lo impone desde 1024 px por encima de `font-semibold`; hay que dejar escrita la excepción del `<h1>` del Hero para resolver la contradicción con §7.3 (600).
```diff
  **Importante:** las clases `font-*` solo fijan la **familia** y las clases `text-*` fijan **tamaño, interlineado y
  peso**. Siempre se usan en pareja: `font-headline-md text-headline-md`.
+
+ **Excepción (H1 del Hero):** `display-hero` declara peso 400 y `lg:text-display-hero` lo aplica desde 1024 px por
+ encima de `font-semibold`. Para que "Florería" conserve el peso 600 de §7.3 en todos los tamaños, el `<h1>` repite
+ `lg:font-semibold` (Tailwind lo emite después de `lg:text-display-hero`, dentro del mismo `@media`).
```

### Propuesta de edición — `DESIGN.md`
**Sección:** §1.3 Mapa de uso (fila "H1 del Hero (Inicio)")
**Motivo:** reflejar la clase `lg:font-semibold` del `<h1>`.
```diff
- | H1 del Hero (Inicio)             | `font-display-hero text-headline-xl lg:text-display-hero font-semibold tracking-tight leading-none` + §7 |
+ | H1 del Hero (Inicio)             | `font-display-hero text-headline-xl lg:text-display-hero font-semibold lg:font-semibold tracking-tight leading-none` + §7 |
```

### Propuesta de edición — `DESIGN.md`
**Sección:** §7.1 Descripción (bloque de marcado)
**Motivo:** el marcado debe coincidir letra por letra con `index.html`.
```diff
- <h1 class="font-display-hero text-headline-xl lg:text-display-hero text-neutral-50 font-semibold max-w-4xl tracking-tight leading-none">
+ <h1 class="font-display-hero text-headline-xl lg:text-display-hero text-neutral-50 font-semibold lg:font-semibold max-w-4xl tracking-tight leading-none">
```

### Propuesta de edición — `DESIGN.md`
**Sección:** §7.3 Jerarquía tipográfica (después de la tabla)
**Motivo:** declarar que el peso 600 rige en todos los tamaños y por qué el `<h1>` repite la clase.
```diff
  | "La Jardinera"    | 400  | Cursiva | `secondary-container` |

+ El peso 600 de "Florería" rige en **todos** los tamaños: el `<h1>` lleva `font-semibold lg:font-semibold` porque
+ `lg:text-display-hero` (peso 400, §1.2) lo sobrescribiría desde 1024 px. Ambos pesos usan las fuentes reales
+ (`Noto Serif` 600 y `Noto Serif` 400 cursiva), sin síntesis de trazo (§1.1).
+
  El efecto conserva la tipografía del sistema: **no** cambia familia, tracking ni tamaño.
```

### Propuesta de edición — `DESIGN.md`
**Sección:** §7.4 Reglas técnicas (regla 8 nueva)
**Motivo:** documentar la holgura lateral que evita el recorte de glifos de la cursiva y sus efectos conocidos.
```diff
  7. **Regla de seguridad para toda animación de entrada del proyecto:** un estado oculto (`opacity: 0`) nunca vive en
     la regla base, solo dentro de los keyframes con `animation-fill-mode: both`.
+ 8. **Holgura lateral de la cursiva:** `background-clip: text` solo pinta dentro de la caja del `span` y la tinta de
+    la cursiva sobresale de ella (la "J" al abrir línea, ≈ 7 px a 48 px, y la "a" final, ≈ 1 px).
+    `.fx-starlight--accent` declara `padding-inline: .16em` y `margin-inline: -.16em`: el relleno cubre la tinta y el
+    margen negativo conserva el ancho de línea y los saltos de línea. Efectos conocidos: la caja del `span` interno es
+    hasta 12 % más ancha (el brillo se estira en proporción), su campo de destellos se corre `.16em` respecto de las
+    letras y el `<h1>` queda con hasta 11 px de desborde transparente (`scrollWidth > clientWidth`) que cabe en el
+    relleno de la tarjeta.
```

### Propuesta de edición — `_planificacion/03-planificacion/epicas/epica-07-saneamiento-previo-react/definicion-epica.md` (Definition of Done de la Épica 07)
**Sección:** §4 Definition of Done
**Motivo:** qué casillas cubre ahora la Iteración 02 y cuáles quedan parciales.
```diff
- * [ ] El titular del Hero muestra el efecto Starlight, respeta movimiento reducido y alto contraste, y conserva la
-   jerarquía de `DESIGN.md` §7.3.
+ * [x] El titular del Hero muestra el efecto Starlight, respeta movimiento reducido y alto contraste, y conserva la
+   jerarquía de `DESIGN.md` §7.3. (Iteración 02, 14-10-2026: Chrome 155 headless, 7 viewports × claro y oscuro;
+   movimiento reducido y contraste forzado por emulación; pendientes: dispositivo real, contraste forzado real de
+   Windows, Firefox y Safari.)
...
- * [ ] `pnpm build` sin errores y consola limpia en las 6 páginas, en modo claro y oscuro.
+ * [ ] `pnpm build` sin errores y consola limpia en las 6 páginas, en modo claro y oscuro. (Parcial tras la
+   Iteración 02: `pnpm build` sin errores y consola limpia solo medida en el Inicio; faltan las otras 5 páginas.)
```
La casilla "0 `style=` en el marcado de los 6 HTML…" **no** queda cubierta: la Iteración 02 no agregó ningún `style=` (0 nuevos), pero los heredados (DT-03) se tratan en la Iteración 03. Las casillas de despliegue, `_antigravity/`, `AGENTS.md` y 25 MiB no dependen de esta iteración. Además, queda por actualizar la frase que antecede al bloque de la Tarea 1 de `iteracion-02.md` (H-10).

### 8.12 Mensaje de commit sugerido (reemplaza al del §7)

```text
Épica 07 - Iteración 02: Corrige el recorte de glifos de la cursiva del titular Starlight y fija Florería en peso 600 desde 1024 px; verificado en render real, con DT-18 y DT-19 registradas.
```

**Siguiente paso:** Épica 07 · Iteración 03 (saneamiento, 404 con `<base>` y "Redbanc"). Debe ejecutarse **después** de esta, no en paralelo, porque ambas tocan `input.css` e `index.html`.

---

## 9. Registro de las decisiones del desarrollador sobre los hallazgos (14-10-2026)

> Sección agregada después de la entrega del §8. No cambia ningún código: solo deja constancia de las decisiones del desarrollador sobre los hallazgos y actualiza el estado de los pendientes.

| Hallazgo | Decisión del desarrollador | Registro |
|:--|:--|:--|
| Desfase de los destellos de `−.16em` (§8.7, fila de campos y brillo) | **Aceptado**, sin corrección. | Decisión aceptada. Desfase de fase de 0,089 a 0,134 s en el ciclo de 3,6 s; el mosaico y el bucle no cambian. Deja de figurar como pendiente de juicio visual. |
| H-9: contraste de `#ffc2c6` frente al píxel más luminoso (2,73 a 3,04:1) | **Observación**; no se cambian colores. | Se registra como **DT-20** (severidad Baja) en `_planificacion/README.md` §12. Ver la verificación del percentil 95 abajo. |
| H-7: desborde transparente de hasta 11 px del `<h1>` | Hallazgo **registrado**, sin corrección en la Iteración 03. | Documentado en §8.8 y en la regla 8 propuesta para `DESIGN.md` §7.4. |
| H-8: 4 px de scroll horizontal de 768 a 1023 px (fuera del Hero) | Hallazgo **registrado**, sin corrección en la Iteración 03. | Documentado en §8.8. |
| H-10: frase desactualizada antes del bloque de la Tarea 1 | Actualizar la frase. | Hecho: la frase de `iteracion-02.md` ahora dice que se agrega `lg:font-semibold` y que no se incluye `mb-space-4`; coincide con el código final. |

**Verificación del criterio "con el percentil 95 cumple" (DT-20).** El texto de la decisión afirmaba que con el percentil 95 el contraste cumple; esa medición no existía en la bitácora, así que se hizo el 14-10-2026 (Chrome 155 headless, perfil aislado, las mismas 14 cargas del §8: 7 viewports × claro y oscuro, `h1` oculto, región del `<h1>`, tono `#ffc2c6` frente a la luminancia del fondo; **medido en render real (headless)**). Los resultados son idénticos en claro y oscuro:

| Viewport | Mediana | Percentil 90 | Percentil 95 | Percentil 99 | Máximo |
|:--|:--:|:--:|:--:|:--:|:--:|
| 320 × 640 | 5,85 | 4,28 | **3,86** | 3,55 | 3,50 |
| 360 × 740 | 6,22 | 3,43 | **3,10** | 2,91 | 2,88 |
| 412 × 915 | 5,73 | 2,96 | **2,88** | 2,83 | 2,83 |
| 768 × 1024 | 5,90 | 4,86 | **4,75** | 4,40 | 4,22 |
| 740 × 360 | 4,90 | 2,97 | **2,91** | 2,88 | 2,85 |
| 1024 × 768 | 4,82 | 3,77 | **3,48** | 3,10 | 3,01 |
| 1280 × 800 | 4,88 | 3,88 | **3,63** | 3,18 | 3,07 |

**Conclusión honesta:** con el percentil 95 el contraste es ≥ 3:1 (mínimo para texto grande) en **5 de los 7 viewports**; en **412 × 915 (2,88:1)** y **740 × 360 (2,91:1)** queda algo por debajo. No es un cambio de esta iteración (los tonos y el fondo no variaron) y el desarrollador lo trata como observación; por eso DT-20 se registra con esas cifras y no con "cumple" a secas. La mediana es ≥ 4,82:1 en todos los viewports.

**Estado de la Iteración 02 (A4): sigue "Completada con reservas".** 🕒 PENDIENTES del desarrollador: traza de pintado en un móvil real, contraste forzado real de Windows, Firefox y Safari, y la lista manual de la §5.1 (y la del §8.10). La consola y el build de las otras 5 páginas se miden en la Iteración 03 (Parte B) y se registran en su bitácora.

### 9.1 Mensaje de commit sugerido para este ajuste de registro

```text
Épica 07 - Iteración 02: Registra las decisiones sobre los hallazgos (destellos aceptados, contraste como DT-20 con el percentil 95 medido, H-7 y H-8 sin corregir) y actualiza la especificación.
```
