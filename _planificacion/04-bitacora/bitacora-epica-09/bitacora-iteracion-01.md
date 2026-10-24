# Bitácora de Ejecución - Épica 09 - Iteración 01

**Fecha de ejecución:** 24-10-2026 (ejecución en `600a88d`; cierre con las decisiones del desarrollador el mismo día)
**Agente:** Claude Code
**Objetivo:** Aplicar los textos de la clienta en Inicio («Flores frescas a tu puerta»), 6 modales de Servicios y
Suscripción Floral, corrigiendo solo erratas ortográficas evidentes y entregando la lista para aprobación.
**Estado:** ✅ Completada con reservas (falta la prueba en celular real: [informado] pendiente).

## 1. Resumen ejecutivo

Textos aplicados según `iteracion-01.md` §1.2 y las decisiones D-01 a D-07 en `src/pages/index.astro` (solo «Flores
frescas a tu puerta»), `src/js/data/services.js` (6 modales) y `src/pages/suscripcion-floral.astro` (cabecera y
«Condiciones del Servicio»). Con las decisiones del desarrollador sobre el reporte (24-10-2026) se aplicaron además 2
correcciones de estilo (O-01 y O-02) y se cargó la itálica 600 y 700 de Montserrat (H-05) en
`src/layouts/BaseLayout.astro`, con autorización puntual. Sin clases, tokens, CSS ni JS nuevos. El texto renderizado
coincide con §1.2 más las correcciones (28 de 28 comprobaciones por script), las otras páginas solo cambian en el
`<link>` de fuentes y el render está hecho en los 7 viewports y los 2 temas. Queda abierta la prueba en un celular real.

### Decisiones del desarrollador aplicadas

| ID | Fecha | Decisión | Aplicación |
|:---|:------|:---------|:-----------|
| D-01 | 24-10-2026 | Solo erratas ortográficas evidentes; puntuación, concordancia y redacción como observación. | 5 erratas corregidas; 11 observaciones sin corregir (§4.3). |
| D-02 | 24-10-2026 | Destacado = `<p><strong><em>…</em></strong></p>`, sin CSS ni tokens nuevos. | 9 destacados: 6 en modales y 3 en Suscripción Floral. |
| D-03 | 24-10-2026 | «Boutonnière» y sus 2 párrafos sin cambios. | Sin cambios (verificado por script). |
| D-04 | 24-10-2026 | Condolencias: 5 ítems y párrafo de cierre. | Aplicado literal. |
| D-05 | 24-10-2026 | Condiciones: Temporada → Entrega → Pausa, Pausa destacada, bloques completos. | Aplicado; comentarios renumerados. |
| D-06 | 24-10-2026 | Párrafo del hero sin tocar. | `#titular` sin cambios. |
| D-07 | 24-10-2026 | `matrimonios` y `novios-rio` sin tocar. | Sin cambios. |
| Opción A | 24-10-2026 | Seguir pese a que las 2 fotos del hero ya están versionadas en `ff48a96`. | Ver §2 y §5, H-01. |
| Reporte, 1 | 24-10-2026 | «felicidad inmediato» se queda como está. | Sin cambio. |
| Reporte, 2 | 24-10-2026 | O-01: «es una única» → «es única». **Decisión de estilo del desarrollador, no errata ortográfica.** | Aplicado en `ramos-de-autor`. |
| Reporte, 3 | 24-10-2026 | O-02: restituir el punto de «Escoge el plan que te hará feliz.». **Decisión de estilo del desarrollador.** | Aplicado en `suscripcion`. |
| Reporte, 4 | 24-10-2026 | H-05: cargar la itálica 600 y 700 de Montserrat; las otras observaciones quedan sin corregir (incluidas O-11 y O-12). | URL de Google Fonts de `BaseLayout.astro` (§3). |
| Reporte, 5 | 24-10-2026 | H-06 aceptado como diseño existente de `.modal-prose strong`; corregir la Tarea 4.4. | §4.2. |
| Reporte, 6 | 24-10-2026 | H-03 y H-04 siguen para la Iteración 03. | No corregidos; medidos en §5. |

## 2. Línea base (estado previo)

| Dato | Valor |
|:-----|:------|
| Rama y commit | `feat/revision-movil`, `ff48a96` al ejecutar; `600a88d` (commit del desarrollador con la ejecución) al cerrar [código]. |
| `git status` | Limpio al ejecutar. Al cerrar, solo `DESIGN.md` modificado sin commit: las 2 ediciones de §1.1 y §8.2 aplicadas a mano por el desarrollador [código]. |
| Fotos del hero | `public/images/hero-botanical-1 (1).webp` (730.586 B) y `hero-botanical-1 (2).webp` (410.010 B): **fotos ya versionadas en `ff48a96`**, no sin seguimiento como esperaba el prompt (§5, H-01) [código]. |
| Entorno | Node local `v24.16.0` (el prompt indica 22.22.x; cumple `engines >=22.22.0`), pnpm `11.24.0`, Astro `7.4.0`, Chrome 155 [medido]. |
| `pnpm run build:cf` | Sin errores ni advertencias; 6 páginas; **111 archivos en `_site/`** [medido]. La referencia era 109; la diferencia son las 2 fotos, que Astro copia a `_site/images/`. **Referencia nueva: 6 páginas y 111 archivos.** |
| Script del tema (ADR-003) | 1 por página, 717 caracteres, SHA-256 del `<script>` completo `5b490c26120413aecf117c5878853be7a0b336afbc0a18cabb2e9c73e6fa0d1c` en las 6 páginas, antes y después del cierre [medido]. |
| Render de referencia | 78 capturas (Chrome 155 headless, perfil aislado temporal) en 360×740 y 1280×800, claro y oscuro. Consola sin errores [render]. |
| Fuentes | Montserrat itálica cargada solo en 400; los destacados se pintaban en 600 itálica (modales) y 700 itálica (páginas) con trazo sintetizado [render]. |

## 3. Cambios realizados (por archivo)

### `src/pages/index.astro` (solo «Flores frescas a tu puerta»)

* El segundo párrafo se divide en dos `<p>` con la misma cadena de clases que sus vecinos (§1.2 A). La sección pasa de 3
  a 4 párrafos; el cuarto («Quien empieza a vivir con flores…», con su `<strong>`) queda igual. Hero sin cambios.

### `src/js/data/services.js`

* `suscripcion` (B): párrafo inicial nuevo, destacado nuevo, `<h4>` «¿Cómo funciona?» y 4 ítems nuevos; al cierre se
  restituye el punto final del primer ítem (O-02).
* `ramos-de-autor` (C): 3 párrafos según el documento; al cierre, «es una única» → «es única» (O-01).
* `novias` (D): 2 destacados nuevos y «El ramo es»; «Boutonnière» intacta (D-03).
* `eventos` (E): subtema inicial nuevo, párrafo de «Cómo trabajamos» dividido en dos y destacado de cierre.
* `condolencias` (F): destacado inicial, 2 párrafos, lista de 5 ítems y párrafo de cierre (D-04).
* `gift-cards` (G): destacado inicial, `<h4>` «¿Qué puedes regalar?», la lista se reemplaza por 3 párrafos.
* Sin cambios en `title`, `mainImage`, `gallery`, el orden de las claves, `matrimonios` ni `novios-rio`. Solo etiquetas
  del contrato; 0 `class=`, 0 `<br>` y 0 «•» en los datos [código].

### `src/pages/suscripcion-floral.astro`

* Cabecera: el párrafo se divide en dos `<p>` con la misma cadena de clases; el primero va destacado.
* «Condiciones del Servicio»: Entrega y Pausa intercambian su lugar completos (ícono, título y texto); comentarios
  renumerados. El texto de Pausa va destacado.

### `src/layouts/BaseLayout.astro` (autorización puntual del cierre: solo la URL de Montserrat)

* `…0,600;0,700;1,400&amp;family=Noto+Serif…` → `…0,600;0,700;1,400;1,600;1,700&amp;family=Noto+Serif…`. La lista
  sigue ordenada por eje (todos los `0,…` antes de los `1,…`); Noto Serif y el resto del archivo, sin cambios.

## 4. Verificación de criterios de aceptación

### 4.1 Criterios

| Criterio | Estado | Evidencia |
|:---------|:-------|:----------|
| Build sin errores ni advertencias nuevas, mismo conteo | ✅ | [medido] 6 páginas y 111 archivos en los 3 builds (línea base, ejecución y cierre); 0 advertencias. |
| HTML compilado | ✅ | [medido] Ejecución: normalizado el *hash* del *bundle* de JS, solo cambian `index.html` (párrafo dividido) y `suscripcion-floral.html` (cabecera y condiciones). Cierre: cada una de las 6 páginas difiere de `600a88d` en **una sola línea**, el `<link>` de Google Fonts, idéntico en las 6; el resto del `<head>` no cambia. Los textos de O-01 y O-02 viven en el *bundle* de JS (`BWHPpsvO` → `BH0qwts2`), donde son las 2 únicas diferencias. CSS `BaseLayout.744HEtGc.css` idéntico en todo el proceso. |
| Script del tema (ADR-003) intacto | ✅ | [medido] SHA-256 `5b490c26…` en las 6 páginas, con el método de la Épica 08 (elemento `<script>` completo). |
| Sin clases ni tokens nuevos; cero JS/CSS en línea | ✅ | [código] 0 clases nuevas y 0 quitadas. [medido] 0 `style="`, 0 `onclick`, 0 `<style`, 1 `<script>` sin `src` por página, 0 `href="#"` en navegación y footer, 0 IDs duplicados. |
| Header intacto (regla 7) | ✅ | [medido] 0 descendientes de `<header>` con `fixed`; `#mobile-menu-scrim` inmediatamente después de `</header>` en las 6 páginas. |
| Escenario 1: textos aplicados | ✅ | [render] Script contra §1.2 + 5 erratas + O-01 y O-02: **28 de 28** comprobaciones (21 de contenido: estructura e `innerText` de las 6 modales, viñetas, 4 párrafos del Inicio, cabecera y condiciones; 7 de presencia en §1.2 de cada texto corregido), en los 7 viewports. **Corrección:** el reporte de la ejecución dijo «30 de 30»; el script hacía 26 comprobaciones (21 + 5). Control negativo: el mismo script contra el render de la ejecución da 4 fallas, y contra la línea base, 15. |
| Escenario 2: destacados | ✅ | [render] 9 destacados `<p><strong><em>` sin clases, en negrita itálica **real** desde el cierre (§4.4). Contraste en §4.2. |
| Escenario 3: orden y contenido conservado | ✅ | [render] Temporada → Entrega → Pausa con Pausa destacada; «Boutonnière» en su lugar; Condolencias con 5 ítems y la frase de cierre. |
| Escenario 4: sin regresiones | ✅ | [render] 7 viewports (320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768, 1280×800) × claro y oscuro: 288 capturas, 0 desbordes en las 6 modales, 0 px de desplazamiento horizontal en Servicios, viñetas del CSS, consola sin errores. H-03 es previo a esta iteración (§5). |
| Escenario 5: registro | ✅ | Esta bitácora y la línea de `estado-actual.md`; Claude Code no hizo commits. |
| Tabla de erratas aprobada | ✅ | Decisiones del desarrollador del 24-10-2026 (§4.3). |
| Prueba en celular real | 🕒 PENDIENTE | [informado] pendiente: desarrollador. Revisar en especial las modales (H-03). |

### 4.2 Contraste de los destacados (Tarea 4.4 corregida)

**Corrección de la Tarea 4.4:** el destacado de las modales **no** tiene el mismo color que su vecino. `.modal-prose
strong` usa `on-surface` y una franja de resaltador (`input.css`), diseño existente aceptado por el desarrollador (H-06).
La verificación pertinente es el contraste medido. En las páginas sí tiene el mismo color que el párrafo vecino.

Medición: color de texto calculado frente al fondo en píxeles con el texto oculto (percentil 5 más oscuro si el texto es
oscuro, percentil 95 más claro si es claro, como `DESIGN.md` §14.7); el fondo de las modales incluye la franja. Vecino =
párrafo normal más cercano. Mínimos de los 7 viewports, con las fuentes finales [medido]:

| Zona | Tema | Destacado (mín.) | Vecino (mín.) |
|:-----|:-----|:-----------------|:--------------|
| Suscripción, cabecera (sobre foto) | Claro | 6,72 (1280×800) | 6,83 (412×915) |
| Suscripción, cabecera (sobre foto) | Oscuro | 5,64 (1024×768) | 5,66 (1280×800) |
| Suscripción, Pausa | Claro / oscuro | 8,69 / 8,96 | 8,69 / 8,96 |
| 6 modales (7 destacados) | Claro | 12,92 | 8,86 |
| 6 modales (7 destacados) | Oscuro | 9,83 | 8,74 |

Todos cumplen AA (4,5:1); el peor caso es 5,64:1.

### 4.3 Erratas, decisiones de estilo y observaciones (aprobadas por el desarrollador, 24-10-2026)

**Erratas ortográficas corregidas (D-01)**

| Bloque | Original (documento) | Corregido (sitio) | Tipo | Decisión |
|:-------|:---------------------|:------------------|:-----|:---------|
| B (modal Suscripción) | «felicidad Inmediato» | «felicidad inmediato» | Mayúscula indebida | Aprobada; «inmediato» se queda (el sitio anterior decía «inmediata»). |
| B (modal Suscripción) | «te llagará» | «te llegará» | Letra cambiada | Aprobada. |
| C (modal Ramos de Autor) | «modelos pre hechos» | «modelos prehechos» | Palabra separada | Aprobada. |
| C (modal Ramos de Autor) | «Las Flores son vivas» | «Las flores son vivas» | Mayúscula indebida | Aprobada. |
| D (modal Novias) | «El Ramo es» | «El ramo es» | Mayúscula indebida | Aprobada. |

**Decisiones de estilo del desarrollador (no son erratas ortográficas)**

| N.º | Bloque | Original (documento) | Aplicado (sitio) | Tipo |
|:----|:-------|:---------------------|:-----------------|:-----|
| O-01 | C (modal Ramos de Autor) | «cada composición es una única» | «cada composición es única» | Redacción (palabra sobrante) |
| O-02 | B (modal Suscripción) | «Escoge el plan que te hará feliz» | «Escoge el plan que te hará feliz.» | Puntuación (punto final restituido) |

**Observaciones sin corregir (decisión del desarrollador: quedan tal cual)**

| N.º | Bloque | Texto | Tipo |
|:----|:-------|:------|:-----|
| O-03 | B (modal Suscripción) | «Tener flores en tu casa o tu lugar de trabajo.» | Redacción: frase sin verbo principal (destacado). |
| O-04 | D (modal Novias) | «Nuestros ramos no son el ramo perfecto, es el ramo que habla de ti.» | Concordancia «son… es» (destacado). |
| O-05 | D (modal Novias) | «…sino emocionar. Que acompaña con naturalidad…» | Redacción; igual que el sitio anterior. |
| O-06 | A (Inicio) | «Después ocurre algo maravilloso, los días pasan y el ramo va cambiando y la composición…» | Puntuación; igual que el sitio anterior. |
| O-07 | C (modal Ramos de Autor) | «…modelos prehechos, cada composición es…» | Puntuación: coma entre oraciones. |
| O-08 | G (modal Gift Cards) | «Los talleres también son una linda alternativa, son encuentros…» | Puntuación: coma entre oraciones. |
| O-09 | G (modal Gift Cards) | «Otros que se disfrutan mucho después de recibirlos.» | Redacción: sin verbo principal (destacado). |
| O-10 | H (Condiciones) | «(Se consideran 4 miércoles por mes)» | Puntuación; igual que el sitio anterior. |
| O-11 | D (modal Novias, «Boutonnière») | «ésta pequeña creación floral» | Ortográfica fuera de alcance (D-03). |
| O-12 | F (modal Condolencias) | «Cubre urnas.» | Ortográfica fuera de alcance (D-04). |
| O-13 | G (modal Gift Cards) | «Gift Cards», «Gift Card» | Estilo: extranjerismo sin cursiva. |

### 4.4 Fuentes (H-05 resuelto)

Chrome 155 headless, perfil aislado, caché deshabilitada, 1280×800 claro; `document.fonts` y lista de peticiones a
`fonts.googleapis.com` / `fonts.gstatic.com` [medido].

| Página | Montserrat cargada antes | Montserrat cargada después | `woff2` antes → después | Destacado |
|:-------|:-------------------------|:---------------------------|:------------------------|:----------|
| Servicios + modal Gift Cards | 300, 400, 500, 600 normal · **400 itálica** | 300, 400, 500, 600 normal · **600 itálica** | 4 archivos, 142.238 → 162.680 B (+20.442 B) | 600 itálica |
| Suscripción Floral | 300, 400, 500, 600, 700 normal · 400 itálica | 300, 400, 500, 600, 700 normal · **700 itálica** | 4 archivos, 142.238 → 162.681 B (+20.443 B) | 700 itálica |
| Inicio (usa itálica 400 fuera de esta iteración) | … · 400 itálica | … · 400 itálica | 5 archivos, 213.028 → 233.487 B (+20.459 B) | — |
| Servicios sin abrir modal, Galería, Contacto, 404 | Sin itálica | Sin itálica | 3 archivos, ≈ 122.900 B en ambos casos (sin descarga de itálica) | — |

* **Causa del peso añadido:** Montserrat es una fuente variable. Con solo `1,400`, Google entregaba un `woff2` itálico
  estático de 19.336 B; con `1,400;1,600;1,700` entrega un `woff2` itálico variable de 39.730 B que cubre los 3 pesos.
  Resultado: **+20.394 B** por página que usa Montserrat itálica (Inicio, Suscripción Floral y Servicios al abrir una
  modal con destacado); 0 B en las páginas que no la usan. La hoja CSS de Google pasa de 1.613 B a ≈ 1.660 B.
* **Sin síntesis:** las caras «600 italic» y «700 italic» aparecen cargadas en `document.fonts`, y la captura del
  destacado cambia de trazo sintetizado (delgado) a negrita itálica real: 6.126 de 25.960 píxeles distintos en la modal
  y 5.663 de 32.595 en la cabecera de Suscripción [render]. En la cabecera, a 1280×800, la línea corta en otro lugar
  («vivir» pasa a la segunda línea) porque la itálica real es más ancha.
* **Variación del servidor de fuentes:** en 2 de 14 cargas Google entregó otro formato (URL `l/font?kit=…`, archivos de
  distinto tamaño): la 404 en una corrida y Suscripción Floral en la otra. No depende del cambio; las cifras de arriba
  son las de las cargas con el formato habitual.

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

| ID | Hallazgo | Evidencia | Estado / destino |
|:---|:---------|:----------|:-----------------|
| H-01 | Las 2 fotos nuevas del hero están **versionadas en `ff48a96`** por un error en la indicación del asesor (se pidió commitear solo los 5 documentos). Como están en `public/`, se copian a `_site/images/` (109 → 111 archivos) y **llegarían a producción con esos nombres** si la rama se fusiona así. No se movieron, renombraron, procesaron ni borraron. | [código] `git log`; [medido] `_site/images/`. | Iteración 02: las renombra y mueve con `mv` (el desarrollador commitea; Git detecta el renombre). No deben llegar a producción con esos nombres. |
| H-02 | Node local `v24.16.0`, no 22.22.x; cumple `engines`. | [medido] | Informativo. |
| H-03 | **Modales de Servicios bajo 768 px: el contenido que pasa del alto del panel es inalcanzable**, incluido el botón «Cotizar este servicio». La columna de texto no se encoge (`min-height: auto` en un hijo flex), el panel recorta con `overflow-hidden` y ni el panel ni `.modal-scroll` desplazan: un gesto táctil sintetizado y la rueda dejan `scrollTop` en 0. Desde 768 px funciona: la rueda lleva `.modal-scroll` hasta su máximo (577 de 577 px en 768×1024, 514 de 515 en 1024×768, 489 de 489 en 1280×800). Ya ocurría en la línea base. Detalle en la tabla siguiente. | [render] Chrome 155 headless, emulación táctil. No verificado en un celular real. | Iteración 03. |
| H-04 | **Desplazamiento retenido entre modales:** si una modal se cierra desplazada, la siguiente abre con ese mismo `scrollTop` (89 px en Eventos y 389 px en Condolencias, 1280×800, claro y oscuro). `openModal()` de `modal.js` no reinicia `.modal-scroll`. | [render]; [código] `src/js/modules/modal.js`. | Iteración 03. |
| H-05 | Cursiva en negrita sintetizada en los destacados. | §4.4. | ✅ Resuelto al cierre: itálica 600 y 700 cargadas. |
| H-06 | La Tarea 4.4 suponía el mismo color que el vecino; en las modales `strong` usa `on-surface` y resaltador. | [render] §4.2. | Aceptado como diseño existente (desarrollador, 24-10-2026). |
| H-07 | Aviso de pnpm sobre una versión nueva (12.15.0) al instalar. No se actualizó. | [medido] | Informativo. |
| H-08 | El reporte de la ejecución dijo «30 de 30» comprobaciones de texto; eran 26 (§4.1). | [medido] | Corregido en esta bitácora. |

**H-03 por viewport (modal en claro; el tema no influye en la geometría).** Panel = alto visible del panel; contenido =
alto total; inalcanzable = diferencia que no se puede desplazar. En las 8 modales quedan además ocultas la galería y el
botón «Cotizar este servicio».

| Viewport | Modal | Panel / contenido (px) | Inalcanzable (px) | Primer bloque de texto cortado | Bloques de texto ocultos enteros |
|:---------|:------|:-----------------------|:------------------|:-------------------------------|:---------------------------------|
| 320×640 | Suscripción | 589 / 1.483 | 896 | Lista «Escoge el plan…» (parcial) | 0 |
| 320×640 | Gift Cards | 589 / 1.833 | 1.246 | «Una Gift Card puede consistir…» | 5 |
| 320×640 | Novias y Novios | 589 / 1.980 | 1.393 | Destacado «No diseñamos un ramo…» (parcial) | 5 (incluida «Boutonnière») |
| 320×640 | Ramos de Autor | 589 / 1.524 | 937 | «Combinamos flores frescas…» (parcial) | 2 |
| 320×640 | Matrimonio | 589 / 1.707 | 1.120 | «Creamos ambientes románticos…» (parcial) | 2 |
| 320×640 | Novios por el Río | 589 / 1.708 | 1.121 | Lista «Con ambos novios a bordo…» (parcial) | 2 |
| 320×640 | Eventos | 589 / 1.852 | 1.265 | Subtítulo «Cómo trabajamos» (parcial) | 5 (incluido el destacado final) |
| 320×640 | Condolencias | 589 / 1.450 | 863 | «En los momentos de despedida…» (parcial) | 4 (incluida la lista de homenajes) |
| 360×740 | Suscripción | 681 / 1.429 | 750 | Lista «Escoge el plan…» (parcial) | 0 |
| 360×740 | Gift Cards | 681 / 1.698 | 1.019 | «Una Gift Card puede consistir…» (parcial) | 4 |
| 360×740 | Novias y Novios | 681 / 1.898 | 1.219 | «El ramo es una creación…» (parcial) | 4 (incluida «Boutonnière») |
| 360×740 | Ramos de Autor | 681 / 1.526 | 847 | Subtítulo «Una pieza viva» | 2 |
| 360×740 | Matrimonio | 681 / 1.625 | 946 | «Creamos ambientes románticos…» (parcial) | 2 |
| 360×740 | Novios por el Río | 681 / 1.624 | 945 | Lista «Con ambos novios a bordo…» (parcial) | 2 |
| 360×740 | Eventos | 681 / 1.715 | 1.036 | «Para una cena íntima…» (parcial) | 4 (incluido el destacado final) |
| 360×740 | Condolencias | 681 / 1.371 | 692 | Subtítulo «Nuestros homenajes» (parcial) | 2 (lista y cierre) |
| 412×915 | 8 modales | 842 / 1.347 a 1.851 | 507 a 1.011 | Galería y botón en las 8; texto cortado en 7 (todas salvo Suscripción) | — |
| 740×360 | 8 modales | 331 / 1.037 a 1.530 | 708 a 1.201 | Texto, galería y botón en las 8 | — |
| 768×1024 y más | 8 modales | — | 0 | Sin contenido inalcanzable: desplaza `.modal-scroll` | — |

## 6. Archivos modificados y propuestas para archivos protegidos

**Modificados (ejecución, en `600a88d`):** `src/pages/index.astro`, `src/js/data/services.js`,
`src/pages/suscripcion-floral.astro`, esta bitácora (nueva) y una línea en `estado-actual.md`.
**Modificados (cierre):** `src/js/data/services.js` (O-01 y O-02), `src/layouts/BaseLayout.astro` (URL de Montserrat),
esta bitácora y la última línea de `estado-actual.md` (reemplazada, única modificación permitida a una línea existente).

Bytes en el *working tree* (Python):

| Archivo | Antes del cierre | Después del cierre |
|:--------|:-----------------|:-------------------|
| `src/js/data/services.js` | 10.262 B, sin BOM, 155 CRLF, 0 LF sueltos, sin salto final | 10.259 B, sin BOM, 155 CRLF, 0 LF sueltos, sin salto final |
| `src/layouts/BaseLayout.astro` | 2.649 B, sin BOM, 57 CRLF, 0 LF sueltos, con salto final | 2.661 B, sin BOM, 57 CRLF, 0 LF sueltos, con salto final |
| `estado-actual.md` | 38.884 B, con BOM, 73 CRLF, sin salto final | 39.156 B, con BOM, 73 CRLF, 0 LF sueltos, sin salto final (solo la última línea reemplazada; el resto, idéntico a `600a88d`) |

**Propuestas para `DESIGN.md`:** las 2 ediciones (§1.1, línea 39: «itálica 400, 600, 700»; §8.2: línea nueva sobre los
párrafos destacados) ya están aplicadas a mano por el desarrollador en el *working tree*, sin commit, y coinciden con las
líneas reales del archivo (verificado con `git diff DESIGN.md`). Claude Code no las aplicó. La línea de §8.2 usa la
redacción del desarrollador, distinta de la propuesta original.

## 7. Mensaje de commit sugerido

```text
Épica 09 - Iteración 01: Cierre con decisiones de erratas, cursivas de Montserrat y render completo.
```
