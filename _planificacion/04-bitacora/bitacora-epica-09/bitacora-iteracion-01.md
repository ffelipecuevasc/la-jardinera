# Bitácora de Ejecución - Épica 09 - Iteración 01

**Fecha de ejecución:** 24-10-2026
**Agente:** Claude Code
**Objetivo:** Aplicar los textos de la clienta en Inicio («Flores frescas a tu puerta»), 6 modales de Servicios y
Suscripción Floral, corrigiendo solo erratas ortográficas evidentes y entregando la lista para aprobación.

## 1. Resumen ejecutivo

Textos aplicados según `iteracion-01.md` §1.2 y las decisiones D-01 a D-07 en `src/pages/index.astro` (solo «Flores
frescas a tu puerta»), `src/js/data/services.js` (6 modales) y `src/pages/suscripcion-floral.astro` (cabecera y
«Condiciones del Servicio»). Sin clases, tokens, CSS ni JS nuevos. El texto renderizado coincide con §1.2 más 5 erratas
corregidas (30 de 30 comprobaciones por script) y las otras 4 páginas compilan idénticas. Estado: **🕒 Ejecutada,
pendiente de certificación**: falta que el desarrollador apruebe la tabla de erratas (§4.3) y revise en un celular real.

### Decisiones del desarrollador aplicadas

| ID | Fecha | Decisión | Aplicación |
|:---|:------|:---------|:-----------|
| D-01 | 24-10-2026 | Solo erratas ortográficas evidentes; puntuación, concordancia y redacción como observación. | 5 correcciones y 13 observaciones (§4.3). |
| D-02 | 24-10-2026 | Destacado = `<p><strong><em>…</em></strong></p>`, sin CSS ni tokens nuevos. | 9 destacados: 6 en modales y 3 en Suscripción Floral. |
| D-03 | 24-10-2026 | «Boutonnière» y sus 2 párrafos sin cambios. | Sin cambios (verificado por script). |
| D-04 | 24-10-2026 | Condolencias: 5 ítems y párrafo de cierre. | Aplicado literal. |
| D-05 | 24-10-2026 | Condiciones: Temporada → Entrega → Pausa, Pausa destacada, bloques completos. | Aplicado; comentarios renumerados. |
| D-06 | 24-10-2026 | Párrafo del hero sin tocar. | `#titular` sin cambios (diff vacío). |
| D-07 | 24-10-2026 | `matrimonios` y `novios-rio` sin tocar. | Sin cambios (diff vacío). |
| Opción A | 24-10-2026 | Seguir pese a que las 2 fotos del hero ya están versionadas en `ff48a96`. | Ver §2 y §5, H-01. |

## 2. Línea base (estado previo)

| Dato | Valor |
|:-----|:------|
| Rama y commit | `feat/revision-movil`, `ff48a96 Épica 09 - Planificación: Amplía la épica con los pedidos de la clienta y reestructura en 4 iteraciones.` [código] |
| `git status` | Limpio, sin archivos sin seguimiento [código]. |
| Fotos del hero | `public/images/hero-botanical-1 (1).webp` (730.586 B) y `hero-botanical-1 (2).webp` (410.010 B): **fotos ya versionadas en `ff48a96`**, no sin seguimiento como esperaba el prompt (§5, H-01) [código]. |
| Entorno | Node local `v24.16.0` (el prompt indica 22.22.x; cumple `engines >=22.22.0`), pnpm `11.24.0`, Astro `7.4.0`, Chrome 155 [medido]. |
| `pnpm install --frozen-lockfile` | Sin cambios en el lockfile [medido]. |
| `pnpm run build:cf` | Sin errores ni advertencias; 6 páginas; **111 archivos en `_site/`** [medido]. La referencia era 109: la diferencia son las 2 fotos, que Astro copia de `public/` a `_site/images/`. **Referencia nueva: 6 páginas y 111 archivos.** |
| HTML compilado | Copia de las 6 páginas guardada fuera del repositorio para la comparación de la Tarea 4. |
| Render de referencia | 78 capturas fuera del repositorio (Chrome 155 headless, perfil aislado temporal): sección «Flores frescas», cabecera y condiciones de Suscripción Floral y 6 modales (al abrir, inicio y fin de la descripción), en 360×740 y 1280×800, claro y oscuro. Consola sin errores [render]. |
| Modales al abrir | `scrollTop` = 0 en las 6 modales y los 4 contextos, con la modal anterior cerrada en su posición inicial [render]. |

## 3. Cambios realizados (por archivo)

### `src/pages/index.astro` (solo «Flores frescas a tu puerta»)

* El segundo párrafo se divide en dos `<p>` con la misma cadena de clases que sus vecinos (§1.2 A). Textos sin cambios.
  La sección pasa de 3 a 4 párrafos; el cuarto («Quien empieza a vivir con flores…», con su `<strong>`) queda igual.
* Hero (`#titular`) sin cambios: el diff solo toca las líneas de este párrafo.

### `src/js/data/services.js`

* `suscripcion` (B): párrafo inicial nuevo, destacado nuevo, `<h4>` «¿Cómo funciona?» y 4 ítems nuevos.
* `ramos-de-autor` (C): 3 párrafos según el documento.
* `novias` (D): 2 destacados nuevos y «El ramo es»; «Boutonnière» intacta (D-03).
* `eventos` (E): subtema inicial nuevo, párrafo de «Cómo trabajamos» dividido en dos y destacado de cierre.
* `condolencias` (F): destacado inicial, 2 párrafos, lista de 5 ítems y párrafo de cierre (D-04).
* `gift-cards` (G): destacado inicial, `<h4>` «¿Qué puedes regalar?», la lista se reemplaza por 3 párrafos.
* Sin cambios en `title`, `mainImage`, `gallery`, el orden de las claves, `matrimonios` ni `novios-rio`. Solo etiquetas
  del contrato (`em`, `h4`, `li`, `p`, `strong`, `ul`); 0 `class=`, 0 `<br>` y 0 «•» en los datos [código].

### `src/pages/suscripcion-floral.astro`

* Cabecera: el párrafo se divide en dos `<p>` con la misma cadena de clases; el primero va destacado.
* «Condiciones del Servicio»: los bloques Entrega y Pausa intercambian su lugar completos (ícono, título y texto);
  comentarios renumerados a «Condición 2: Entrega» y «Condición 3: Pausa». El texto de Pausa va destacado.

## 4. Verificación de criterios de aceptación

### 4.1 Criterios

| Criterio | Estado | Evidencia |
|:---------|:-------|:----------|
| Build sin errores ni advertencias nuevas, mismo conteo | ✅ | [medido] 6 páginas y 111 archivos, igual que la línea base. Sin advertencias en ninguno de los 2 builds; la salida solo difiere en tiempos. Mismo listado de archivos salvo el nombre del *bundle* de JS. |
| Solo cambian Inicio («Flores frescas») y Suscripción Floral | ✅ | [medido] Normalizado el *hash* del *bundle* de JS (`D-7eLN3d` → `BWHPpsvO`, que las 6 páginas referencian una vez), `404`, `contacto`, `galeria` y `servicios` son idénticas byte a byte. `index.html` cambia solo en el párrafo dividido (L413 a L419) y `suscripcion-floral.html` solo en la cabecera y en las condiciones. CSS `BaseLayout.744HEtGc.css` idéntico (mismo nombre y bytes). El *bundle* de JS cambia solo en los textos de `servicesData`. |
| Sin clases ni tokens nuevos; cero JS/CSS en línea | ✅ | [código] Conjunto de clases antes y después idéntico en los 3 archivos (0 nuevas, 0 quitadas); atributos `class` 206 → 207 en `index.astro` y 125 → 126 en `suscripcion-floral.astro` (los `<p>` nuevos copian la cadena de su vecino). [medido] En `_site/*.html`: 0 `style="`, 0 `onclick`, 0 `<style`, 1 `<script>` sin `src` por página (el de arranque del tema, idéntico en las 6), 0 `href="#"` en navegación y footer, 0 IDs duplicados. |
| Header intacto (regla 7) | ✅ | [medido] 0 descendientes de `<header>` con `fixed` y `#mobile-menu-scrim` como nodo inmediatamente posterior a `</header>` en las 6 páginas. |
| Escenario 1: textos aplicados | ✅ | [render] Script de comparación contra §1.2 + erratas corregidas: 30 de 30 comprobaciones OK (estructura del HTML inyectado y `innerText` bloque a bloque de las 6 modales, los 4 párrafos del Inicio, la cabecera y las condiciones). Control negativo: el mismo script contra la línea base da 15 fallas. |
| Escenario 2: destacados | ✅ | [render] Los 9 destacados son `<p><strong><em>` sin clases; se ven en negrita cursiva en claro y oscuro. Contraste en §4.2. Ver H-05 (cursiva sintetizada). |
| Escenario 3: orden y contenido conservado | ✅ | [render] Condiciones en orden Temporada → Entrega → Pausa con Pausa destacada; «Boutonnière» en su lugar con sus 2 párrafos; Condolencias con 5 ítems y la frase de cierre. |
| Escenario 4: sin regresiones | ✅ con reserva | [medido] 4 páginas idénticas, hero y header sin cambios. [render] 6 modales sin desbordes, 0 px de desplazamiento horizontal en Servicios, viñetas dibujadas por el CSS (`::before` de 10 px en los `<li>`), consola sin errores en las 3 páginas × 4 contextos. Reserva: render solo en 360×740 y 1280×800 (lo que pide `iteracion-01.md` §2); los otros 5 viewports de `AGENTS.md` §7 quedan 🕒 PENDIENTE. |
| Escenario 5: registro | ✅ | Esta bitácora y una línea en `estado-actual.md`; Claude Code no hizo commits. |
| Aprobación de la tabla de erratas | 🕒 PENDIENTE | Decisión del desarrollador (§4.3). |
| Revisión en celular real | 🕒 PENDIENTE | Desarrollador. Revisar en especial la modal en móvil (H-03). |

### 4.2 Contraste de los destacados

Medido en render real: color de texto calculado frente al fondo en píxeles con el texto oculto (percentil 5 más oscuro
si el texto es oscuro, percentil 95 más claro si es claro, como `DESIGN.md` §14.7). Vecino = párrafo normal más cercano.

| Zona | Tema | 360×740: destacado / vecino | 1280×800: destacado / vecino |
|:-----|:-----|:----------------------------|:-----------------------------|
| Suscripción, cabecera (sobre foto) | Claro | 6,90 / 6,92 | 6,72 / 7,00 |
| Suscripción, cabecera (sobre foto) | Oscuro | 6,18 / 5,90 | 5,72 / 5,66 |
| Suscripción, Pausa | Claro | 8,69 / 8,69 | 8,69 / 8,69 |
| Suscripción, Pausa | Oscuro | 8,96 / 8,96 | 8,96 / 8,96 |
| 6 modales (7 destacados) | Claro | 13,02 / 8,86 | 12,92 a 13,02 / 8,86 |
| 6 modales (7 destacados) | Oscuro | 9,83 / 8,74 | 9,83 / 8,74 |

* Todos cumplen AA (4,5:1); el peor caso es 5,72:1 [medido].
* En las páginas el destacado tiene el mismo color que su vecino, como suponía la Tarea 4.4. **En las modales no:**
  `.modal-prose strong` usa `on-surface` y una franja de resaltador (`input.css`), por eso el contraste sube (el fondo
  medido incluye la franja). No es una regresión, pero la premisa «mismo color» de la Tarea 4.4 solo vale para las
  páginas.

### 4.3 Erratas y observaciones para aprobación del desarrollador

**Erratas corregidas (D-01)**

| Bloque | Original (documento) | Corregido (sitio) | Tipo | Nota |
|:-------|:---------------------|:------------------|:-----|:-----|
| B (modal Suscripción) | «felicidad Inmediato» | «felicidad inmediato» | Mayúscula indebida | **Diferencia con el sitio anterior:** decía «felicidad inmediata». Se aplicó el documento («inmediato», concuerda con «efecto»); «inmediata» (concuerda con «felicidad») también es correcto. Sin elegir: decide el desarrollador. |
| B (modal Suscripción) | «te llagará» | «te llegará» | Letra cambiada | |
| C (modal Ramos de Autor) | «modelos pre hechos» | «modelos prehechos» | Palabra separada | Prefijo unido (RAE). |
| C (modal Ramos de Autor) | «Las Flores son vivas» | «Las flores son vivas» | Mayúscula indebida | |
| D (modal Novias) | «El Ramo es» | «El ramo es» | Mayúscula indebida | El sitio anterior ya decía «El Ramo». |

**Observaciones no corregidas (texto aplicado tal cual)**

| N.º | Bloque | Texto | Tipo | Comentario |
|:----|:-------|:------|:-----|:-----------|
| O-01 | C (modal Ramos de Autor) | «cada composición es una única, diseñada» | Palabra sobrante (redacción) | **Desviación de la tabla §1.3**, que proponía corregirla a «es única». D-01 solo autoriza correcciones ortográficas (tildes, letras, mayúsculas, palabras separadas) y una palabra sobrante es redacción. Se dejó tal cual; si se aprueba, se cambia a «es única». |
| O-02 | B (modal Suscripción) | «Escoge el plan que te hará feliz» | Puntuación | Sin punto final; los otros 3 ítems lo llevan y el sitio anterior también. |
| O-03 | B (modal Suscripción) | «Tener flores en tu casa o tu lugar de trabajo.» | Redacción | Frase sin verbo principal (destacado). |
| O-04 | D (modal Novias) | «Nuestros ramos no son el ramo perfecto, es el ramo que habla de ti.» | Concordancia | «son… es» (destacado). |
| O-05 | D (modal Novias) | «…sino emocionar. Que acompaña con naturalidad…» | Redacción | Oración que empieza con «Que»; igual que el sitio anterior. |
| O-06 | A (Inicio) | «Después ocurre algo maravilloso, los días pasan y el ramo va cambiando y la composición…» | Puntuación | Coma entre oraciones independientes y doble «y»; igual que el sitio anterior. |
| O-07 | C (modal Ramos de Autor) | «…modelos prehechos, cada composición es…» | Puntuación | Coma entre oraciones (el sitio anterior usaba dos puntos). |
| O-08 | G (modal Gift Cards) | «Los talleres también son una linda alternativa, son encuentros…» | Puntuación | Coma entre oraciones. |
| O-09 | G (modal Gift Cards) | «Otros que se disfrutan mucho después de recibirlos.» | Redacción | Oración sin verbo principal (destacado); estilo deliberado probable. |
| O-10 | H (Condiciones) | «(Se consideran 4 miércoles por mes)» | Puntuación | Sin punto final; igual que el sitio anterior. |
| O-11 | D (modal Novias, «Boutonnière») | «ésta pequeña creación floral» | Ortográfica, fuera de alcance | La RAE (2010) desaconseja la tilde en demostrativos: «esta». No se tocó por D-03 (bloque sin cambios). |
| O-12 | F (modal Condolencias) | «Cubre urnas.» | Ortográfica, fuera de alcance | Los compuestos de verbo y sustantivo se escriben en una palabra («cubrecama»): «Cubreurnas». No se tocó porque D-04 fija el texto del ítem. |
| O-13 | G (modal Gift Cards) | «Gift Cards», «Gift Card» | Estilo | Extranjerismo sin cursiva; sin cambio, como en el sitio anterior. |

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

| ID | Hallazgo | Evidencia | Destino propuesto |
|:---|:---------|:----------|:------------------|
| H-01 | Las 2 fotos nuevas del hero (`hero-botanical-1 (1).webp` y `hero-botanical-1 (2).webp`) están **versionadas en `ff48a96`** por un error en la indicación del asesor, que pidió commitear solo los 5 documentos. Como están en `public/`, se copian a `_site/images/` (109 → 111 archivos) y **llegarían a producción con esos nombres** si la rama se fusiona así, aunque ninguna página las use. No se movieron, renombraron, procesaron ni borraron. | [código] `git log` de los 2 archivos; [medido] `_site/images/`. | Iteración 02: las renombra y mueve con `mv` (el desarrollador commitea y Git detecta el renombre). No deben llegar a producción con esos nombres. |
| H-02 | Node local `v24.16.0`, no 22.22.x. Cumple `engines` y ya figuraba en las bitácoras de la Épica 08. | [medido] `node -v`. | Informativo. |
| H-03 | **Modal de servicio en 360×740: el contenido que pasa del alto del panel no se puede alcanzar.** El panel mide 679 px y su contenido unos 1.690 px; la columna de texto no se encoge (`min-height: auto` en un hijo flex) y el panel recorta con `overflow-hidden`, así que `.modal-scroll` no desplaza. Un gesto táctil sintetizado y la rueda dejan `scrollTop` en 0. Ya ocurría en la línea base: no lo causa esta iteración. | [render] Chrome 155 headless, modal Novias, `mobile=true` y `false`. No verificado en un celular real. | Iteración 03 (desplazamiento de las modales), previa confirmación en celular real. Las capturas de la descripción completa en 360 px se tomaron desplazando el panel por programa. |
| H-04 | **Desplazamiento inicial de las modales (pedido de la clienta), reproducido:** si una modal se cierra desplazada, la siguiente abre con ese mismo `scrollTop` (89 px en Eventos y 389 px en Condolencias, 1280×800, claro y oscuro). `openModal()` de `modal.js` no reinicia el desplazamiento de `.modal-scroll`. Con la modal anterior cerrada en su inicio, todas abren en 0. | [render] corrida intermedia de la Tarea 4; [código] `src/js/modules/modal.js`. | Iteración 03. No se corrigió aquí. |
| H-05 | **Cursiva en negrita sintetizada.** El `<link>` de Google Fonts carga Montserrat itálica solo en 400 (`DESIGN.md` §1.1), pero los destacados se renderizan en 600 itálica (modales, por `.modal-prose strong`) y 700 itálica (páginas, `strong` por defecto). El navegador sintetiza el trazo, lo que `DESIGN.md` §1.1 desaconseja. Además, el peso del destacado difiere entre modales (600) y páginas (700). | [render] `getComputedStyle` y `document.fonts`: solo «Montserrat 400 italic» cargada. | Decisión del desarrollador: aceptar o ampliar el `<link>` de `BaseLayout.astro` (fuera del alcance de esta iteración) y `DESIGN.md` §1.1 (propuesta en §6). |
| H-06 | La Tarea 4.4 supone que el destacado tiene el mismo color que su vecino. Solo es así en las páginas; en las modales `strong` usa `on-surface` y resaltador (§4.2). | [render] | Informativo; sin cambio. |
| H-07 | El aviso de pnpm sobre una versión nueva (12.15.0) aparece al instalar. No se actualizó. | [medido] | Informativo. |

## 6. Archivos modificados y propuestas para archivos protegidos

**Modificados:** `src/pages/index.astro`, `src/js/data/services.js`, `src/pages/suscripcion-floral.astro`.
**Nuevos:** `_planificacion/04-bitacora/bitacora-epica-09/bitacora-iteracion-01.md`.
**Línea agregada:** `_planificacion/04-bitacora/estado-actual.md`.

Bytes en el *working tree* (verificados con Python):

| Archivo | Antes | Después |
|:--------|:------|:--------|
| `src/pages/index.astro` | 57.516 B, sin BOM, 611 CRLF, 0 LF sueltos, con salto final | 57.671 B, sin BOM, 613 CRLF, 0 LF sueltos, con salto final |
| `src/js/data/services.js` | 9.206 B, sin BOM, 146 CRLF, 0 LF sueltos, **sin salto final** | 10.262 B, sin BOM, 155 CRLF, 0 LF sueltos, sin salto final (se conservó) |
| `src/pages/suscripcion-floral.astro` | 29.558 B, sin BOM, 359 CRLF, 0 LF sueltos, con salto final | 29.788 B, sin BOM, 362 CRLF, 0 LF sueltos, con salto final |
| `estado-actual.md` | 37.964 B, con BOM, 72 CRLF, 0 LF sueltos, sin salto final | 38.884 B, con BOM, 73 CRLF, 0 LF sueltos, sin salto final (una línea agregada; el contenido previo, idéntico byte a byte) |

**Propuesta 1 — `DESIGN.md` §8.2 (documentar el destacado de D-02).**

```diff
 `<li>`, `<strong>`, `<em>`. Su tipografía la gobierna `.modal-prose` en `input.css` (subtítulos con rombo, viñetas en
 guion corto, `<strong>` con trazo de resaltador estático). Las enumeraciones siempre en `<ul>`, nunca con `<br>` ni "•".
+Párrafo destacado (Épica 09 · Iteración 01, D-02): `<p><strong><em>…</em></strong></p>`, sin clases ni CSS propios.
```

**Propuesta 2 — `DESIGN.md` §1.1 (solo si el desarrollador decide cargar la itálica en negrita, H-05).** Requiere
además ampliar el `<link>` de `src/layouts/BaseLayout.astro` (`1,400` → `1,400;1,600;1,700`) en una iteración que lo
autorice.

```diff
-| Cuerpo e interfaz       | **Montserrat** | 300, 400, 500, 600, 700 · itálica 400                 |
+| Cuerpo e interfaz       | **Montserrat** | 300, 400, 500, 600, 700 · itálica 400, 600, 700       |
```

## 7. Mensaje de commit sugerido

```text
Épica 09 - Iteración 01: Textos de la clienta en Inicio, Servicios y Suscripción Floral.
```
