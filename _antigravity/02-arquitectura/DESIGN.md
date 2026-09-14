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
  (Hero, banner de newsletter) — ver §3; o c) se aplica siempre con opacidad reducida (`/10`, `/20`, `/30`), donde la
  transparencia ya resuelve la adaptación visual sin necesidad de un segundo valor.

**Regla de Gobernanza:** ningún color nuevo se agrega como hex estático si se va a usar como texto/ícono directamente
sobre `background`, `surface` o cualquier `surface-container-*`. Debe evaluarse su contraste en modo oscuro (mínimo WCAG
AA, 4.5:1 para texto) antes de decidir su implementación.

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

**Importante — token nuevo `primary-brand` (estático):** el botón "Explorar Servicios" del Hero y el degradado del
banner de newsletter usan `bg-primary` combinado con texto blanco fijo (`text-neutral-50`). Si `primary` se aclara en
modo oscuro, ese texto blanco quedaría ilegible sobre un fondo verde claro. Por eso se introduce `primary-brand`
(`#316944` estático, idéntico al `primary` original) exclusivamente para esos dos elementos de marca, que deben verse
igual en ambos temas. Ver §2.4 y la nota de implementación en `tailwind.config.js`.

### 2.3 Superficies (Estáticas)

No requieren variante oscura porque se usan siempre con opacidad reducida sobre bloques de fondo ya fijo (Hero, banner
de newsletter), o no tienen uso actual en el DOM:

* `surface-container-lowest`: `#ffffff` — usado solo como `/10`, `/15`, `/20` en botones "vidrio esmerilado" sobre el
  Hero y el banner de newsletter, ambos con fondo oscuro fijo en cualquier tema.
* `surface-container-highest`: `#e1e3de` (sin uso actual)
* `surface-dim`, `surface-variant`, `surface-bright`, `surface-tint`, `inverse-surface`, `inverse-on-surface`: sin uso
  actual en el DOM; se conservan para no romper compatibilidad futura.

### 2.4 Colores de Marca y Acentos

**Primary — reactivo (ver §2.2)**

* `primary`: reactivo — texto/ícono de acento.
* `primary-brand`: `#316944` — **estático**, exclusivo del botón CTA del Hero y el degradado del banner de newsletter.
  Congela el verde original para que esos dos elementos de marca no cambien entre temas.
* `on-primary`: `#1F2421` — estático; funciona como texto oscuro tanto sobre el verde original como sobre el verde menta
  del modo oscuro.
* `primary-container`, `primary-fixed`, `primary-fixed-dim`, `on-primary-fixed`, `on-primary-fixed-variant`,
  `inverse-primary`: estáticos, sin conflicto de contraste detectado.

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

---

## 3. Tokens de Contraste Fijo — Hero y Bloques de Marca

**(Antes documentados incorrectamente como "Tokens Modo Oscuro / Dark Mode" — ver nota de renombre abajo)**

Estos tokens **no forman parte del sistema de theming reactivo** y no deben confundirse con él. Estilizan secciones que
son visualmente oscuras **en ambos temas del sitio**, porque tienen una fotografía o degradado de fondo fijo (el Hero,
con la foto botánica; el banner de newsletter, con degradado verde):

* `dark-background`: `#1F2421`
* `dark-on-background`: `#F3F3F0`
* `dark-surface-container-low`: `#2B302D`
* `dark-surface-variant`: `#5A615D`
* `dark-neutral-100`: `#8A918B`
* `dark-neutral-50`, `dark-neutral-300`: valores duplicados de otros tokens — ver §5.

**Nota de renombre:** el prefijo `dark-` en estos nombres es heredado y genera ambigüedad real con el modo oscuro del
sitio (de hecho, esa confusión de nomenclatura es una de las causas de que el dark mode quedara implementado a medias).
Conceptualmente son **tokens de "contraste fijo sobre foto/degradado"**, no "colores del tema oscuro". Se conservan los
nombres de clase existentes por compatibilidad con el HTML ya construido, pero cualquier documentación o comentario
nuevo debe referirse a ellos como "Contraste Fijo", nunca como "Dark Mode".

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

Hallazgos registrados durante la auditoría de implementación del dark mode, para limpieza futura (no bloquean el cierre
de esta iteración):

* `dark-neutral-50` (`#BFC5BE`) duplica exactamente el valor de `dark-on-surface-variant`. Posible token redundante.
* `dark-neutral-300` (`#5A615D`) duplica exactamente el valor de `dark-surface-variant`. Posible token redundante.
* `secondary-light` y `secondary-hover` existen en `tailwind.config.js` pero no estaban documentados en este archivo ni
  tienen uso confirmado en el DOM actual.
* La familia `tertiary` / `tertiary-container` / `tertiary-fixed*` está completamente definida pero sin uso en el DOM.
  Evaluar si se usará en las próximas vistas (`servicios.html`, `galeria.html`) o si debe eliminarse.

---

**Registro de cambios:** actualización de arquitectura de color para soportar theming reactivo completo (Light/Dark). Se
agregaron 4 tokens reactivos (`surface-container`, `surface-container-high`, `primary`, `on-primary-container`) y 1
token estático nuevo (`primary-brand`). Cero regresión visual en modo claro: todos los valores `:root` son idénticos a
los hex previamente estáticos.