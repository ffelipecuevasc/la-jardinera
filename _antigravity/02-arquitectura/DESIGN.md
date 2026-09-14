# DESIGN.md — La Jardinera Florería (Sistema de Diseño Oficial)

**⚠️ DIRECTRIZ ESTRICTA PARA AGENTES IA:**
Este documento es la **única fuente de la verdad** para color, tipografía y tokens visuales. Queda estrictamente
prohibido inventar o inferir valores, clases o colores (ej. "jardinera-rosa") que no estén explícitamente listados en la
configuración de tokens a continuación.

**Actualización (Iteración Dark Mode):** el sistema de color ahora distingue dos naturalezas de token: **reactivos**
(cambian con el tema) y **estáticos** (no cambian). Ver §2.1 antes de agregar o modificar cualquier color.

## 1. Tipografía y Escalas (Google Fonts)

El proyecto utiliza un sistema de dos tipografías cargadas vía Google Fonts:

* **Noto Serif:** Reservada para titulares (`display` y `headline`).
* **Montserrat:** Reservada para cuerpo de texto (`body`) y elementos de interfaz (`label`).

**Tokens de Escala Tipográfica (Tailwind `fontSize`):**

* `display-hero`: `64px` / Line-height `72px` / Traking `-0.02em` (Noto Serif)
* `display-hero-mobile`: `40px` / Line-height `48px` / Tracking `-0.01em` (Noto Serif)
* `headline-xl`: `48px` / Line-height `56px` / Tracking `-0.015em` (Noto Serif)
* `headline-lg`: `32px` / Line-height `40px` (Noto Serif)
* `headline-md`: `24px` / Line-height `32px` (Noto Serif)
* `headline-sm`: `18px` / Line-height `26px` (Noto Serif)
* `body-lg`: `18px` / Line-height `28px` (Montserrat)
* `body-md`: `16px` / Line-height `24px` (Montserrat)
* `body-sm`: `14px` / Line-height `20px` (Montserrat)
* `body-xs`: `12px` / Line-height `16px` (Montserrat)
* `label-lg`: `14px` / Line-height `20px` / Traking `0.06em` / Font-weight `600` (Montserrat)
* `label-md`: `12px` / Line-height `16px` / Traking `0.08em` / Font-weight `600` (Montserrat)
* `label-sm`: `11px` / Line-height `14px` / Traking `0.05em` / Font-weight `500` (Montserrat)

---

## 2. Sistema de Color

### 2.1 Arquitectura: Tokens Reactivos vs. Tokens Estáticos

Todo color del proyecto pertenece a una de estas dos categorías. Antes de agregar un color nuevo o reutilizar uno
existente en una nueva vista, el agente debe clasificarlo aquí:

* **Token Reactivo:** se implementa como una variable CSS (`--color-*`) definida en `src/css/input.css`, con un valor
  para `:root` (tema claro) y uno para `.dark` (tema oscuro). En `tailwind.config.js` se conecta mediante el helper
  `withOpacity('--color-nombre')`. **Se usa un token reactivo cuando el color aparece como texto, ícono o borde sobre
  una superficie que también es reactiva** (`background`, `surface`, `surface-container-*`) — es decir, cuando existe
  riesgo real de que el contraste falle al cambiar de tema.
* **Token Estático:** un valor hexadecimal fijo. Se usa cuando el color:
  a) siempre se combina con su propio texto "on-*" sobre un relleno propio (ej. un botón), por lo que el contraste nunca
  depende del tema de la página; o b) vive dentro de un bloque de marca/foto intencionalmente oscuro en ambos temas
  (Hero) — ver §3; o c) se aplica siempre con opacidad reducida (`/10`, `/20`, `/30`), donde la transparencia ya
  resuelve la adaptación visual sin necesidad de un segundo valor.

**Regla de Gobernanza:** ningún color nuevo se agrega como hex estático si se va a usar como texto/ícono directamente
sobre `background`, `surface` o cualquier `surface-container-*`. Debe evaluarse su contraste en modo oscuro (mínimo WCAG
AA, 4.5:1 para texto) antes de decidir su implementación.

**Regla de Gobernanza (nueva — pareja fondo/primer plano):** clasificar un token aisladamente no es suficiente. **Todo
relleno que apunte a un token reactivo obliga a que su texto e íconos también sean reactivos.** Mezclar un fondo
reactivo con un primer plano congelado (ej. `bg-primary` + `text-neutral-50`) es el error que produjo el fallo del
banner de newsletter: el fondo se aclaró en modo oscuro y el texto crema quedó en 1,81:1. Ver §2.7 para los tres
patrones de composición autorizados.

**Formato técnico:** las variables en `input.css` se declaran como tres componentes RGB separados por espacio (sin
comas), ej. `--color-primary: 49 105 68;`. Este formato es obligatorio: permite que Tailwind aplique opacidad con la
sintaxis `bg-primary/40` vía `rgb(var(--color-primary) / 0.4)`.

### 2.2 Tokens Reactivos (Light / Dark)

| Token                    | Uso principal                               | Light     | Dark      |
|:-------------------------|:--------------------------------------------|:----------|:----------|
| `background`             | Fondo general de página                     | `#F8F7F3` | `#1F2421` |
| `surface`                | Fondo de tarjetas/paneles                   | `#f8faf4` | `#212623` |
| `surface-container-low`  | Fondos de sección alternados                | `#F1EEE8` | `#2B302D` |
| `surface-container`      | Chips e íconos circulares (header)          | `#edefe9` | `#333A36` |
| `surface-container-high` | Estados hover de botones circulares         | `#e7e9e3` | `#3D4540` |
| `on-surface`             | Texto principal                             | `#191c19` | `#F3F3F0` |
| `on-surface-variant`     | Texto secundario / metadata                 | `#414941` | `#BFC5BE` |
| `on-background`          | Texto sobre `background`                    | `#191c19` | `#F3F3F0` |
| `primary`                | Texto/ícono de acento sobre superficies     | `#316944` | `#8CC79A` |
| `on-primary-container`   | Texto sobre `primary-container/20` (badges) | `#1a5431` | `#B4F1C1` |

**Por qué `primary` y `on-primary-container` se volvieron reactivos:** `text-primary` se usa de forma extensa como color
de acento directamente sobre superficies reactivas — el link activo "Inicio" del header (sobre `surface/80`), el rótulo
"¿En qué te ayudamos hoy?" (sobre `background`), los íconos de contacto del footer (sobre
`surface-container-low`) y los títulos de tarjetas de servicio. El verde original (`#316944`) es demasiado oscuro para
leerse con contraste aceptable sobre las superficies oscuras del nuevo tema; por eso en dark mode se aclara a un verde
menta (`#8CC79A`, que coincide con el token `primary-container` ya existente en la paleta). El mismo problema ocurría
con el texto del badge "La Jardinera" en la sección de Suscripción.

**Importante — token `primary-brand` (estático):** el botón "Explorar Servicios" del Hero usa un relleno de marca
combinado con texto crema fijo (`text-neutral-50`). Si ese relleno apuntara al `primary` reactivo, el texto quedaría
ilegible sobre un fondo verde claro en modo oscuro. Por eso existe `primary-brand` (`#316944` estático, idéntico al
`primary` original) **exclusivamente para ese botón**, que debe verse igual en ambos temas por vivir sobre la fotografía
del Hero. Ver §2.4 y la nota de implementación en `tailwind.config.js`.

> **Cambio respecto a la versión anterior de este documento:** hasta esta revisión, `primary-brand` se declaraba también
> como el token del degradado del banner de newsletter. Esa decisión se revirtió: el banner adoptó el patrón reactivo
> descrito en §2.7. `primary-brand` tiene ahora **un único uso autorizado en el DOM**.

### 2.3 Superficies (Estáticas)

No requieren variante oscura porque se usan siempre con opacidad reducida sobre un fondo que ya controla su propio
contraste, o no tienen uso actual en el DOM:

* `surface-container-lowest`: `#ffffff` — dos usos distintos, no confundirlos:
    * como `/10`, `/20` en los botones "vidrio esmerilado" **del Hero**, sobre fotografía oscura fija en cualquier tema;
    * como `/15`, `/20`, `/30` en el badge y el botón secundario **del banner de newsletter**, donde el fondo sí es
      reactivo y por lo tanto esos usos llevan además una contraparte `dark:bg-on-primary-fixed/10` — ver §2.7. En este
      segundo caso el token **no** es autosuficiente: nunca debe usarse sin su pareja `dark:`.
    * como relleno opaco (`dark:bg-surface-container-lowest`) para el botón primario del banner en modo oscuro.
* `surface-container-highest`: `#e1e3de` (sin uso actual)
* `surface-dim`, `surface-variant`, `surface-bright`, `surface-tint`, `inverse-surface`, `inverse-on-surface`: sin uso
  actual en el DOM; se conservan para no romper compatibilidad futura.

### 2.4 Colores de Marca y Acentos

**Primary — reactivo (ver §2.2)**

* `primary`: reactivo — texto/ícono de acento, y relleno del degradado del banner de newsletter (§2.7).
* `primary-brand`: `#316944` — **estático**, exclusivo del botón CTA "Explorar Servicios" del Hero. Congela el verde
  original para que ese elemento de marca no cambie entre temas, porque vive sobre la fotografía botánica de fondo fijo.
* `on-primary`: `#1F2421` — estático; funciona como texto oscuro tanto sobre el verde original como sobre el verde menta
  del modo oscuro.
* `primary-container`: `#8cc79a` — estático. Extremo claro del degradado del banner en modo claro.
* `primary-fixed`: `#b4f1c1` — estático. Extremo claro del degradado del banner en modo oscuro (`dark:to-primary-fixed`)
  y estado `hover` del botón primario del banner en ese mismo tema.
* `on-primary-fixed`: `#00210d` — estático. **Texto de titulares y botones del banner en modo oscuro.** Contraste
  calculado: 8,9:1 sobre `#8CC79A` y 13,3:1 sobre `#b4f1c1`.
* `on-primary-fixed-variant`: `#17512e` — estático. **Texto de párrafo del banner en modo oscuro.** Contraste calculado:
  4,8:1 sobre `#8CC79A` y 7,2:1 sobre `#b4f1c1`. Se eligió por sobre `primary-brand` (`#316944`) porque este último solo
  alcanza 3,35:1 sobre el menta: suficiente para texto grande, insuficiente para cuerpo de 16px.
* `primary-fixed-dim`, `inverse-primary`: estáticos, sin uso actual en el DOM.

**Secondary — estático**

* `secondary`: `#805256` (Acento floral cálido)
* `on-secondary`: `#ffffff`
* `secondary-container`: `#ffc2c6` (usado solo dentro del Hero, sección de contraste fijo)

Estos se mantienen estáticos porque siempre se combinan con su propio "on-*" sobre un relleno propio (botón
"Explorar las suscripciones"), por lo que el contraste no depende del tema de la página.

**Tertiary**

* `tertiary`: `#8d4a57` — definido en la paleta pero **sin uso actual** en el DOM. Ver §5 (Notas de Auditoría).

### 2.5 Textos y Contornos

* `on-surface`, `on-surface-variant`, `on-background`: **reactivos** (ver §2.2).
* `outline`: `#717971` — estático.
* `outline-variant`: `#c0c9bf` — estático. Se usa siempre con opacidad (`/20`, `/30`) para bordes de tarjetas; la
  transparencia ya produce un borde sutil y visible tanto sobre superficies claras como oscuras, sin necesidad de un
  segundo valor.

### 2.6 Estados y Semántica

Colores universales, iguales en ambos temas por convención estándar de UI:

* `error`: `#D96A6A`
* `success`: `#6FBF73`
* `warning`: `#E7B857` (estrellas de calificación)
* `info`: `#73A8D8`

### 2.7 Patrones de Composición Autorizados (fondo + primer plano)

Existen **tres** patrones válidos para componer un bloque de color en este proyecto. Cualquier combinación fuera de esta
lista se considera una regresión y debe corregirse antes de cerrar la iteración.

**Patrón A — Superficie reactiva + primer plano reactivo.**
El caso mayoritario del sitio: `bg-surface` / `bg-surface-container-low` con `text-on-surface`,
`text-on-surface-variant`
o `text-primary`. Tanto fondo como texto cambian con el tema y el contraste se preserva por construcción.

**Patrón B — Relleno estático autosuficiente + su propio `on-*`.**
Botones y chips cuyo relleno no depende del tema de la página: `bg-secondary` + `text-on-secondary`,
`bg-primary-brand` + `text-neutral-50`. También cubre los bloques de contraste fijo del Hero (§3), donde el fondo es una
fotografía oscura en ambos temas.

**Patrón C — Bloque de marca reactivo (fondo reactivo + primer plano reactivo por variante `dark:`).**
Aplica a un único componente hoy: el banner **"¿Planeando un evento especial?"** en `index.html`. Es un bloque de marca
que quiso ser verde en ambos temas, pero cuyo relleno apunta al `primary` reactivo. La solución no es congelar el fondo,
sino **invertir el primer plano** cuando el fondo se aclara.

Implementación autorizada del banner:

| Elemento         | Modo claro                                          | Modo oscuro (variante `dark:`)                                                                   |
|:-----------------|:----------------------------------------------------|:-------------------------------------------------------------------------------------------------|
| Degradado        | `from-primary to-primary-container`                 | `dark:to-primary-fixed` (evita que el degradado se aplane)                                       |
| Badge "Reserva…" | `bg-surface-container-lowest/15`, `text-neutral-50` | `dark:bg-on-primary-fixed/10`, `dark:text-on-primary-fixed`                                      |
| `<h2>`           | `text-neutral-50`                                   | `dark:text-on-primary-fixed`                                                                     |
| `<p>`            | `text-neutral-100`                                  | `dark:text-on-primary-fixed-variant`                                                             |
| Botón primario   | `bg-surface`, `text-on-surface`                     | `dark:bg-surface-container-lowest`, `dark:text-on-primary-fixed`, `dark:hover:bg-primary-fixed`  |
| Botón secundario | `bg-surface-container-lowest/20`, `text-neutral-50` | `dark:bg-on-primary-fixed/10`, `dark:text-on-primary-fixed`, `dark:hover:bg-on-primary-fixed/20` |

**Por qué `dark:to-primary-fixed` es obligatorio:** en `.dark`, `--color-primary` vale `140 199 154` (`#8CC79A`), que es
exactamente el mismo valor que el token estático `primary-container` (`#8cc79a`). Sin la variante, ambos extremos del
degradado coinciden y el "degradado" se renderiza como un bloque plano.

**Regla de extensión:** si una vista futura (`servicios.html`, `suscripcion-floral.html`, etc.) necesita un bloque de
marca equivalente, debe replicar el Patrón C completo — no basta con copiar el degradado. Copiar el fondo sin las
variantes de primer plano reproduce el fallo original.

### 2.8 Activos Gráficos Dependientes del Tema

El sistema de diseño no solo gobierna color: algunos **assets binarios** también tienen variante por tema.

| Asset                                    | Uso                        | Tema claro | Tema oscuro                         |
|:-----------------------------------------|:---------------------------|:-----------|:------------------------------------|
| `public/logos/la-jardinera-original.png` | Logotipo en trazos negros  | ✅         | ❌ invisible sobre `surface` oscuro |
| `public/logos/la-jardinera-blanco.png`   | Logotipo en trazos blancos | ❌         | ✅                                  |

**Mecanismo autorizado:** dos etiquetas `<img>` hermanas con `block dark:hidden` y `hidden dark:block`. Es el mismo
patrón ya usado por los íconos de sol/luna del `#theme-toggle-btn`.

**Prohibido:** resolver esto con `<picture>` + `media="(prefers-color-scheme: dark)"`. El tema del sitio se controla por
la clase `.dark` en `<html>` (`darkMode: "class"`), no por la preferencia del sistema operativo; una media query
ignoraría el toggle manual del usuario y mostraría el logo equivocado.

**Requisitos de accesibilidad y rendimiento:**

* El atributo `alt` debe ser **idéntico** en ambas etiquetas. `display: none` retira el elemento del árbol de
  accesibilidad, por lo que el lector de pantalla anuncia un solo logotipo; dejar un `alt=""` en la variante oscura
  dejaría al usuario sin nombre accesible en ese tema.
* Ambos archivos deben exportarse con las **mismas dimensiones intrínsecas**, y los atributos `width` / `height` de las
  dos etiquetas deben coincidir con ellas para mantener CLS = 0 (ver `objetivos-y-metricas.md` §2).
* El navegador descarga los dos PNG. Es un costo aceptado a cambio de robustez total frente al toggle; la alternativa
  (intercambiar `src` desde `theme.js`) reintroduce parpadeo y acopla un asset de marca a la lógica JS.

---

## 3. Tokens de Contraste Fijo — Hero y Bloques Fotográficos

**(Antes documentados incorrectamente como "Tokens Modo Oscuro / Dark Mode" — ver nota de renombre abajo)**

Estos tokens **no forman parte del sistema de theming reactivo** y no deben confundirse con él. Estilizan secciones que
son visualmente oscuras **en ambos temas del sitio**, porque tienen una fotografía de fondo fijo. Hoy aplica a un único
bloque: el **Hero** (`#titular`), con la foto botánica y sus *scrims* de degradado.

* `dark-background`: `#1F2421`
* `dark-on-background`: `#F3F3F0`
* `dark-surface-container-low`: `#2B302D`
* `dark-surface-variant`: `#5A615D`
* `dark-neutral-100`: `#8A918B`
* `dark-neutral-50`, `dark-neutral-300`: valores duplicados de otros tokens — ver §5.

**Nota de renombre:** el prefijo `dark-` en estos nombres es heredado y genera ambigüedad real con el modo oscuro del
sitio (de hecho, esa confusión de nomenclatura es una de las causas de que el dark mode quedara implementado a medias).
Conceptualmente son **tokens de "contraste fijo sobre foto"**, no "colores del tema oscuro". Se conservan los nombres de
clase existentes por compatibilidad con el HTML ya construido, pero cualquier documentación o comentario nuevo debe
referirse a ellos como "Contraste Fijo", nunca como "Dark Mode".

**Corrección de alcance (esta revisión):** el banner de newsletter figuraba aquí como bloque de contraste fijo. Era una
clasificación errónea — su fondo nunca fue fijo, sino que apuntaba al token reactivo `primary`. Se retira de esta
sección y pasa al Patrón C de §2.7.

---

## 4. Radios y Espaciado (Tokens de Layout)

**Radios de Borde (`borderRadius`):**

* `sm`: `0.125rem` (2px)
* `DEFAULT` / `lg`: `0.25rem` (4px)
* `xl`: `0.5rem` (8px)
* `full`: `0.75rem` (12px)

**Espaciado (`spacing`):**

* `space-unit`: `0.5rem` (8px)
* `space-1`: `0.5rem`
* `space-2`: `1rem`
* `space-3`: `1.5rem`
* `space-4`: `2rem`
* `space-5`: `2.5rem`
* `space-6`: `3rem`
* `space-8`: `4rem`
* `space-10`: `5rem`
* `gutter`: `1.5rem`
* `margin-mobile`: `1.25rem`
* `margin-desktop`: `2.5rem`
* `section-gap`: `7.5rem`
* `container-max`: `80rem`

---

## 5. Notas de Auditoría / Deuda Técnica

Hallazgos registrados durante las auditorías de implementación del dark mode, para limpieza futura (no bloquean el
cierre de esta iteración):

**Tokens redundantes o sin uso**

* `dark-neutral-50` (`#BFC5BE`) duplica exactamente el valor de `dark-on-surface-variant`. Posible token redundante.
* `dark-neutral-300` (`#5A615D`) duplica exactamente el valor de `dark-surface-variant`. Posible token redundante.
* `secondary-light` y `secondary-hover` existen en `tailwind.config.js` pero no estaban documentados en este archivo ni
  tienen uso confirmado en el DOM actual.
* La familia `tertiary` / `tertiary-container` / `tertiary-fixed*` está completamente definida pero sin uso en el DOM.
  Evaluar si se usará en las próximas vistas (`servicios.html`, `galeria.html`) o si debe eliminarse.
* `primary-fixed-dim` e `inverse-primary` (`#99d4a6`) comparten valor y ninguno tiene uso en el DOM.

**Sincronización pendiente con `tailwind.config.js`**

* El comentario del bloque §6 ("MARCA — PRIMARY (ESTÁTICOS)") todavía describe `primary-brand` como token del "botón CTA
  del Hero y degradado del banner de newsletter". Debe reducirse solo al botón del Hero.
* El comentario del bloque §10 ("NEUTRALES") menciona "Hero, CTA de newsletter" como bloques fijos. El banner ya no lo
  es; `neutral-50` / `neutral-100` siguen usándose ahí, pero únicamente en modo claro.

**Contraste — pendiente de verificación en navegador**

* Botón secundario del banner ("Contactar WhatsApp"), **modo claro**: usa `text-neutral-50` y cae sobre el extremo
  `to-primary-container` (`#8cc79a`) del degradado diagonal `bg-gradient-to-br`. Contraste calculado 1,81:1. Cambiar el
  degradado a `bg-gradient-to-b` haría que ambas columnas reciban el mismo valor de verde a la misma altura y eliminaría
  la zona clara bajo ese botón. Decisión estética pendiente.

**Otros**

* **FOUC del tema:** `<html>` se sirve con `class="light"` y `theme.js` se carga como módulo al final del `<body>`, por
  lo que la clase `.dark` se aplica después del primer paint. Se percibe como un destello del logotipo claro al cargar
  en modo oscuro. La solución estándar exige un script bloqueante en `<head>`, lo que **choca con la regla "Cero JS en
  línea"** de `stack-tecnologico.md` §2. Debe resolverse como excepción documentada en
  `04-bitacora/decisiones-tecnicas.md`, nunca de forma silenciosa.
* **Favicon:** `<link rel="icon">` apunta al PNG de trazos negros, poco legible en pestañas de navegador con tema
  oscuro. Se puede agregar un segundo `<link rel="icon" media="(prefers-color-scheme: dark)">` con el PNG blanco. Aquí
  la media query **sí** es correcta, porque el chrome del navegador no conoce la clase `.dark` del documento.
* **CLS del logotipo:** los atributos `width="44" height="44"` del logotipo del header no coinciden con la proporción 4:
  5 que sugiere su uso en el Hero (`w-[80px] h-[100px]`). Verificar las dimensiones intrínsecas reales de ambos PNG y
  ajustar los atributos en las dos etiquetas `<img>`.

---

**Registro de cambios**

* **Iteración Dark Mode:** actualización de arquitectura de color para soportar theming reactivo completo (Light/Dark).
  Se agregaron 4 tokens reactivos (`surface-container`, `surface-container-high`, `primary`, `on-primary-container`) y 1
  token estático nuevo (`primary-brand`). Cero regresión visual en modo claro: todos los valores `:root` son idénticos a
  los hex previamente estáticos.
* **Corrección Dark Mode — banner y logotipo:** se detectó que la iteración anterior actualizó `tailwind.config.js` e
  `input.css` pero **nunca aplicó los cambios correspondientes en `index.html`**, dejando `primary-brand` con cero
  apariciones en el DOM. Correcciones aplicadas: (1) el botón "Explorar Servicios" del Hero pasa a `bg-primary-brand`;
  (2) el banner "¿Planeando un evento especial?" adopta el nuevo Patrón C (§2.7) en lugar de congelar su fondo; (3) se
  documenta el intercambio de logotipo por tema (§2.8). **Cero tokens nuevos**: todas las correcciones usan tokens ya
  declarados en `tailwind.config.js`. Cero regresión visual en modo claro: solo se agregaron variantes
  `dark:`.