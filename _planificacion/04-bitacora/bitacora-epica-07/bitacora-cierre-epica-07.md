# Bitácora de Cierre - Épica 07

**Fecha de cierre:** 14-10-2026
**Agente:** Claude Code
**Estado:** Completada con reservas. Las verificaciones manuales pendientes no bloquean la Épica 08 (decisión del
desarrollador, 14-10-2026).

> Convención de nombres: en `04-bitacora/` no existía un archivo de cierre de épica; se usa el nombre pedido por el
> desarrollador, `bitacora-cierre-epica-07.md`, junto a las bitácoras de iteración (`bitacora-iteracion-NN.md`).

## 1. Resumen de la épica

| Iteración | Resultado | Bitácora |
|:--|:--|:--|
| 01 · Despliegue por lista blanca | Completada con reservas: `_site/` por lista blanca, 0 archivos > 25 MiB, documentos internos sin exponer en producción. | [bitacora-iteracion-01.md](bitacora-iteracion-01.md) |
| 02 · Titular Starlight | Completada con reservas: efecto verificado en Chrome headless; corregidos el recorte de glifos (DT-18) y el peso de "Florería" (DT-19). | [bitacora-iteracion-02.md](bitacora-iteracion-02.md) |
| 03 · Saneamiento y H8 | Completada con reservas: DT-01, 02, 03, 05, 07 y 13 resueltas; DT-14 corregida en código. | [bitacora-iteracion-03.md](bitacora-iteracion-03.md) |
| 04 · SEO técnico | Trasladada a la Épica 08 · Iteración 05. | — |

DoD actualizado en [definicion-epica.md](../../03-planificacion/epicas/epica-07-saneamiento-previo/definicion-epica.md) §4:
6 casillas con `[x]` y evidencia citada, 2 abiertas (permisos de Claude Code, con evidencia parcial; la 404 en producción,
DT-14) y 1 tachada (Search Console, movida a la Épica 08 · Iteración 05).

## 2. Deudas de la épica

| Deuda | Iteración | Estado | Evidencia |
|:--|:--|:--|:--|
| DT-01 · Enlace roto del footer de Servicios | 03 | ✅ Resuelta | Bitácora 03 §4.1 (render real, 360 y 1280 px, claro y oscuro). |
| DT-02 · H8 (barra 1024–1279 px) | 03 | ✅ Resuelta | Bitácora 03 §4.7: 120 mediciones, 0 incumplimientos; 1280 px idéntico al previo. |
| DT-03 · `style=` heredados | 03 (Hero: Épica 01 · It. 08) | ✅ Resuelta | Bitácora 03 §4.2: 0 `style="`; textura idéntica (0 px en 16 comparaciones). |
| DT-05 · Botones sociales de la 404 | 03 | ✅ Resuelta | Bitácora 03 §4.3: 32 × 32 px a 360 px. |
| DT-07 · "Redbank" → "Redbanc" | 03 | ✅ Resuelta | Bitácora 03 §4.5: `index.html`, línea 337. |
| DT-13 · Ícono de Facebook en oscuro | 03 | ✅ Resuelta | Bitácora 03 §4.4: 1,52:1 → 6,64:1; claro idéntico. |
| DT-14 · 404 en rutas anidadas | 03 | 🕒 Corregida en código; pendiente en producción | Bitácora 03 §4.6: simulación local de Cloudflare y render real superados. |
| DT-18 · Recorte de glifos de Starlight | 02 | ✅ Resuelta | Bitácora 02 §8.5. |
| DT-19 · Peso de "Florería" desde 1024 px | 02 | ✅ Resuelta | Bitácora 02 §8.6. |
| DT-20 · Contraste del acento del titular | 02 | Registrada (observación, Baja) | Bitácora 02 §9: percentil 95 ≥ 3:1 en 5 de 7 viewports; 2,88:1 en 412 × 915 y 2,91:1 en 740 × 360. |

### 2.1 Conflicto de la Iteración 03 sobre DT-14 y DT-17

En la Iteración 03, el mensaje del desarrollador listaba DT-14 y DT-17 entre las deudas a marcar ✅, mientras que la
especificación (que "manda") pide la confirmación en producción para DT-14 y dice que DT-17 no se marca resuelta en esa
iteración. Se siguió la especificación: en `_planificacion/README.md` §12, **DT-14** sigue "corregida en código;
pendiente de verificación en producción" y **DT-17** sigue abierta (corregida solo en `404.html`; las otras 5 páginas
van en la Épica 08 · Iteración 02). Ambas siguen abiertas al cierre.

## 3. Diagnóstico de la Galería (`.mp4` con `net::ERR_ABORTED`)

Solo lectura; no se cambió código. Chrome 155 headless con un perfil temporal nuevo (borrado al terminar), 1280 × 800,
sirviendo la raíz del repositorio por HTTP local con **dos servidores**: uno **sin** soporte de `Range` (responde 200
completo, como la simulación de la Iteración 03) y otro **con** `Range` (responde 206).

**Confirmado por código** (`galeria.html` y `src/js/modules/gallery.js`):

* 10 `<video>` en la cuadrícula, todos con `src` directo a `./public/images/galeria/*.mp4` y `autoplay loop muted
  playsinline`; ninguno declara `preload` (Chrome lo resuelve como `metadata`) ni `loading`. Sin `<source>`.
* `initGridVideoObserver` usa un `IntersectionObserver` (umbral 0,1) que solo llama a `.play()` al entrar y a `.pause()`
  al salir del viewport, y pausa todo en `visibilitychange`. No llama a `.load()` ni cambia `src` en la cuadrícula.
  El Lightbox sí crea un `<video>` nuevo y, al cerrarse, pausa y vacía `src` (solo al usarlo).
* Los 10 archivos tienen el átomo `moov` **antes** de `mdat` (inicio rápido): se descarta que Chrome deba saltar al
  final del archivo para leer los metadatos.

**Confirmado en render real (headless)**, por carga (instantánea tomada antes de salir de la página):

| Carga | Sin `Range` (200): solicitudes / `ERR_ABORTED` | Con `Range` (206): solicitudes / `ERR_ABORTED` | Consola |
|:--|:--:|:--:|:--:|
| Claro 1 | 10 / 5 | 10 / 3 | 0 |
| Claro 2 | 13 / 8 | 10 / 3 | 0 |
| Claro 3 | 12 / 7 | 10 / 3 | 0 |
| Oscuro 1 | 12 / 8 | 10 / 3 | 0 |
| Oscuro 2 | 12 / 7 | 10 / 3 | 0 |
| Oscuro 3 | 12 / 7 | 10 / 3 | 0 |
| Claro con scroll hasta el final | 20 / 7 (3 abiertas al salir) | 19 / 6 | 0 |

* Todas las solicitudes iniciales piden `Range: bytes=0-`. Con `Range`, las 3 cancelaciones de cada carga son siempre
  los **3 archivos más grandes**: `nmg2.mp4` (22.715.000 bytes), `nmg5.mp4` (8.098.647) y `ddm2.mp4` (4.928.653).
* Con scroll, Chrome abre después solicitudes de **rango parcial** (por ejemplo `nmg2.mp4` con `bytes=851968-`,
  `ddm2.mp4` con `bytes=786432-`, `nmg5.mp4` con `bytes=655360-`), todas 206.
* Sin `Range`, el servidor ignora el rango y devuelve el archivo completo; Chrome cancela más (5 a 8 por carga) y vuelve
  a pedir. Esa es la cifra de 4 a 9 que vio la Iteración 03: en parte, un **artefacto del servidor simulado**.

**Conclusión: comportamiento normal del navegador, sin deuda.** Se **confirma en render real** la hipótesis en su forma
observable: Chrome cancela la solicitud inicial `bytes=0-` de los videos grandes cuando ya bufferizó lo necesario y
luego, si hace falta, pide rangos parciales. La regla interna exacta con la que Chrome decide cortar no se inspeccionó.
No hay errores de consola ni respuestas ≥ 400. **No se crea DT-21.** No se verificó en producción si Cloudflare responde
206 (es lo esperado, pero queda sin confirmar).

Observación aparte (no es un defecto del `ERR_ABORTED`): con `autoplay` en los 10 videos, la carga de la Galería pide
los 10 archivos (≈ 48,7 MB en total) aunque no todos estén a la vista. Puede valer la pena revisarlo en la Épica 08
(por ejemplo `preload="none"` y carga diferida); queda como sugerencia, sin registrar deuda.

## 4. Seguimiento posterior al cierre

* [ ] DT-14 en producción (`https://www.lajardinerafloreria.cl/servicios/xyz`).
* [ ] Solicitud real del favicon de la 404 en una pestaña.
* [ ] Firefox y Safari: H8, la 404 en rutas anidadas y el titular Starlight.
* [ ] Traza de pintado en un móvil real.
* [ ] Contraste forzado real de Windows.
* [ ] Demostrar que los permisos de Claude Code bloquean la edición de archivos protegidos (casilla abierta del DoD).
* [ ] Propuestas a archivos protegidos aún sin aplicar: `DESIGN.md` §5 ítem 9, `DESIGN.md` §10 ítem 3 y `AGENTS.md` §5
  regla 8 ([bitácora 03](bitacora-iteracion-03.md) §6); `DESIGN.md` §1.2, §1.3, §7.1, §7.3 y §7.4 regla 8
  ([bitácora 02](bitacora-iteracion-02.md) §8.11).

## 5. Observaciones sobre bitácoras cerradas (no se reescriben)

* La bitácora 03 §4.9 y §5 (N4) atribuían la causa de las cancelaciones de `.mp4` como "no confirmada" y mencionaban la
  falta de `Range` como posible causa. Este diagnóstico la precisa (§3): parte del conteo era artefacto del servidor
  simulado y el resto es comportamiento normal de Chrome.
* La bitácora 02 §9 no repite el texto largo de DT-20 (solo remite a la fila y conserva la tabla de percentiles), así
  que no se ajusta.

## 6. Ajustes finales (14-10-2026)

**Renombre de carpeta.** La carpeta de la épica se renombró de `…-react` a `…-previo` el 14-10-2026 (`git mv` del
desarrollador); las menciones antiguas en `bitacora-iteracion-02.md` (líneas 306 y 366) se conservan como registro
histórico. Se actualizaron la ruta del enlace de esta bitácora y el comando de renombre de
`epica-08-migracion-astro/definicion-epica.md` (línea 100), que apuntaba a otro destino (`…-previo-migracion`).

**Verificación de permisos** (solo lectura de `.claude/settings.json`; no existe `settings.local.json`; no hay reglas `ask`).

| Protegido por `AGENTS.md` §2 y §3 | Regla | Clasificación |
|:--|:--|:--|
| `AGENTS.md`, `README.md`, `DESIGN.md` | `deny`: `Edit(/AGENTS.md)`, `Edit(/README.md)`, `Edit(/DESIGN.md)` | Confirmado por configuración (solo la herramienta `Edit`) |
| `CLAUDE.md`, `CLAUDE.local.md`, `.claude/**` | `deny`: `Edit` de cada uno | Confirmado por configuración (solo `Edit`) |
| `_planificacion/01-vision/**`, `_planificacion/02-arquitectura/**` | Ninguna | Sin regla (solo instrucción de `AGENTS.md`) |
| `package.json`, `pnpm-lock.yaml`, `tailwind.config.js` | Ninguna | Sin regla (solo instrucción de `AGENTS.md`) |
| Git que modifica el repositorio (`add`, `commit`, `push`, `pull`, `merge`, `rebase`, `reset`, `revert`, `checkout`, `switch`, `branch -d/-D`, `stash`, `tag`, `cherry-pick`, `clean`, `mv`, `rm`) y `gh pr` | `deny` de cada uno | Confirmado por configuración |
| Extras: `git restore`, `apply`, `update-index`, `gh release`, `wrangler` (también por `npx` y `pnpm dlx`), `npm`, `yarn` | `deny` | Confirmado por configuración |
| Lectura permitida | `allow`: `pnpm build`, `git status`, `diff`, `log`, `show`, `blame`, `ls-files` | Confirmado por configuración |

"Confirmado por configuración" significa que hay una regla explícita en el archivo; **no se probó en uso real** (no se
intentó editar ningún archivo protegido, para no incumplir `AGENTS.md` §2). La casilla de permisos del DoD sigue abierta:
dos filas de la tabla no tienen regla y los `deny` cubren la herramienta `Edit`, no `Write` ni escrituras desde `Bash`
(en esta misma sesión se escribieron archivos de planificación con Node sin bloqueo, lo que indica que `Bash` no tiene una
regla de escritura de archivos). Prueba real manual por el desarrollador: pendiente.

### Propuesta de edición — `.claude/settings.json`
**Sección:** `permissions`
**Motivo:** los archivos que `AGENTS.md` §2 protege "solo con autorización explícita en el chat" no tienen regla; con `ask`
se pide confirmación sin bloquear las ediciones autorizadas. Los tres documentos raíz se refuerzan contra `Write`.
```diff
  "permissions": {
    "deny": [
      "Edit(/DESIGN.md)",
+     "Write(/AGENTS.md)",
+     "Write(/README.md)",
+     "Write(/DESIGN.md)",
      ...
    ],
+   "ask": [
+     "Edit(/package.json)",
+     "Edit(/pnpm-lock.yaml)",
+     "Edit(/tailwind.config.js)",
+     "Edit(/_planificacion/01-vision/**)",
+     "Edit(/_planificacion/02-arquitectura/**)"
+   ],
    "allow": [
```
Esto no impide las escrituras desde `Bash` (por ejemplo `sed -i` o un script de Node); cerrar esa vía exige reglas `deny`
adicionales sobre `Bash` que conviene evaluar aparte.

**Tarea opcional de videos.** Se agregó la Tarea 3 (opcional, dentro de la Iteración 06, que ya es opcional) a
[iteracion-06.md](../../03-planificacion/epicas/epica-08-migracion-astro/iteracion-06.md): carga diferida de los videos
de la Galería (≈ 48,7 MB, 10 videos). No es deuda técnica ni bloquea la certificación de la épica. La tabla de
iteraciones de `epica-08-migracion-astro/definicion-epica.md` tiene una sola fila de entregable por iteración y no
enumera tareas, así que no se modificó.

### 6.1 Cierre de la casilla de permisos (14-10-2026)

El desarrollador aplicó a mano la propuesta de §6 en `.claude/settings.json`. Se verificó **solo lectura** (sin
modificarlo; el JSON se parseó con Node sin escribir): es **JSON válido** y contiene, con el texto exacto de las líneas:

* `deny`, líneas 5 a 13: `"Write(/AGENTS.md)"`, `"Write(/README.md)"`, `"Write(/DESIGN.md)"`, `"Edit(/AGENTS.md)"`,
  `"Edit(/README.md)"`, `"Edit(/DESIGN.md)"`, `"Edit(/CLAUDE.md)"`, `"Edit(/CLAUDE.local.md)"` y `"Edit(/.claude/**)"`.
* `ask`, líneas 58 a 63: `"Edit(/package.json)"`, `"Edit(/pnpm-lock.yaml)"`, `"Edit(/tailwind.config.js)"`,
  `"Edit(/_planificacion/01-vision/**)"` y `"Edit(/_planificacion/02-arquitectura/**)"`.
* Los 17 comandos Git que escriben de `AGENTS.md` §3 siguen en `deny` (41 reglas `deny`, 5 `ask`, 9 `allow`).

**Decisión del desarrollador:** la casilla se cierra con la confirmación por configuración, sin prueba de bloqueo en uso
real; la prueba de **lectura** de `DESIGN.md` que hizo en una sesión nueva no demuestra bloqueo de escritura y no se usa
como evidencia. No se intentó editar ningún archivo protegido (`AGENTS.md` §2).

**Límites:** no hay prueba de bloqueo en uso real. Las escrituras desde `Bash` (por ejemplo con Node o `sed -i`) no están
cubiertas por reglas y dependen de `AGENTS.md` y de la revisión del desarrollador con `git diff` antes de cada commit. La
prueba real manual queda como verificación opcional en "Seguimiento posterior al cierre".
