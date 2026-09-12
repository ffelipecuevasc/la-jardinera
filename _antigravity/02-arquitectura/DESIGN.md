# DESIGN.md — La Jardinera Florería (Sistema de Diseño Oficial)

**⚠️ DIRECTRIZ ESTRICTA PARA AGENTES IA:**
Este documento es la **única fuente de la verdad** para color, tipografía y tokens visuales. Queda estrictamente
prohibido inventar o inferir valores, clases o colores (ej. "jardinera-rosa") que no estén explícitamente listados en la
configuración de tokens a continuación.

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

## 2. Paleta de Colores (Tokens Material Design)

El diseño se basa en un esquema semántico avanzado. Estos tokens deben ser mapeados uno a uno en el archivo
`tailwind.config.js`.

### Superficies y Fondos

* `background`: `#F8F7F3` (Fondo base general)
* `surface`: `#f8faf4`
* `surface-dim`: `#d8dbd5`
* `surface-container-lowest`: `#ffffff`
* `surface-container-low`: `#F1EEE8`
* `surface-container`: `#edefe9`
* `surface-container-high`: `#e7e9e3`

### Colores de Marca y Acentos

* `primary`: `#316944` (Verde botánico principal)
* `on-primary`: `#1F2421` (Texto/Icono sobre primary)
* `primary-container`: `#8cc79a`
* `secondary`: `#805256` (Acento floral cálido)
* `on-secondary`: `#ffffff`
* `secondary-container`: `#ffc2c6`
* `tertiary`: `#8d4a57`

### Textos y Contornos

* `on-surface`: `#191c19` (Texto principal UI)
* `on-surface-variant`: `#414941` (Texto secundario/metadata)
* `on-background`: `#191c19`
* `outline`: `#717971` (Bordes fuertes)
* `outline-variant`: `#c0c9bf` (Bordes sutiles)

### Estados y Semántica

* `error`: `#D96A6A`
* `success`: `#6FBF73`
* `warning`: `#E7B857`
* `info`: `#73A8D8`

### Tokens Modo Oscuro (Dark Mode)

* `dark-background`: `#1F2421`
* `dark-on-background`: `#F3F3F0`
* `dark-surface-container-low`: `#2B302D`
* `dark-surface-variant`: `#5A615D`
* `dark-neutral-100`: `#8A918B`

## 3. Radios y Espaciado (Tokens de Layout)

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