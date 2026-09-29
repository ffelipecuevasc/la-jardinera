# DESIGN.md — Sistema de Diseño de La Jardinera Florería

> **Única fuente de la verdad** para tipografía, color, espaciado, componentes, efectos y accesibilidad visual del
> sitio https://www.lajardinerafloreria.cl.
>
> **Gobernanza:** solo el desarrollador edita este archivo. Los agentes de IA lo leen de forma obligatoria antes de
> cualquier cambio visual y proponen modificaciones mediante el protocolo de `AGENTS.md` §2.
>
> **Regla general:** está prohibido inventar colores, tamaños, sombras o clases que no estén declarados aquí o en
> `tailwind.config.js`. Si un diseño necesita algo nuevo, primero se propone el token, después se usa.
>
> La numeración de secciones es estable: el código fuente las cita (por ejemplo, `input.css` remite a §6 y §8, y
> `services.js` a §8.2). No renumerar sin actualizar esas referencias.

---

## 0. Identidad y principios

La Jardinera es una florería de autor en Valdivia. El sitio debe transmitir la **frescura húmeda del sur de Chile**:
orgánico, cálido y editorial, con fotografía botánica protagonista y una interfaz sobria que no compite con ella.

1. **Editorial antes que comercial.** Titulares en serif, cuerpo en sans-serif, mucho aire y jerarquía clara.
2. **La fotografía manda.** La UI usa superficies neutras cálidas; el color de marca se reserva para acentos.
3. **Un solo momento memorable por página.** En el Inicio, ese momento es el titular del Hero (§7). El resto de la
   interfaz se mantiene tranquila.
4. **Movimiento con propósito.** Las animaciones responden a una acción o capturan la atención una vez. Todo respeta
   `prefers-reduced-motion`.
5. **Accesible por construcción.** Contraste AA en ambos temas, foco visible y objetivos táctiles de 44 px.

---

## 1. Tipografía

### 1.1 Familias

| Rol                     | Familia        | Pesos cargados (Google Fonts)                         |
|:------------------------|:---------------|:------------------------------------------------------|
| Display y titulares     | **Noto Serif** | 400, 600 · itálica 400, 600                           |
| Cuerpo e interfaz       | **Montserrat** | 300, 400, 500, 600, 700 · itálica 400                 |

**Restricción de pesos:** usar un peso no cargado (por ejemplo, `font-bold` en Noto Serif o `font-light italic` en
Montserrat) obliga al navegador a sintetizar el trazo, con resultado degradado. Antes de usar otro peso, se amplía el
`<link>` de Google Fonts en los 6 HTML.

### 1.2 Escala (tokens `fontSize`)

| Token                 | Tamaño / interlineado | Tracking   | Peso | Familia asociada      |
|:----------------------|:----------------------|:-----------|:-----|:----------------------|
| `display-hero`        | 64 / 72 px            | -0.02em    | 400  | `font-display-hero`   |
| `display-hero-mobile` | 40 / 48 px            | -0.01em    | 400  | `font-display-hero-mobile` |
| `headline-xl`         | 48 / 56 px            | -0.015em   | 400  | `font-headline-xl`    |
| `headline-xl-mobile`  | 32 / 40 px            | -0.01em    | 400  | `font-headline-xl-mobile` |
| `headline-lg`         | 32 / 40 px            | —          | 400  | `font-headline-lg`    |
| `headline-md`         | 24 / 32 px            | —          | 400  | `font-headline-md`    |
| `headline-sm`         | 18 / 26 px            | —          | 400  | `font-headline-sm`    |
| `body-lg`             | 18 / 28 px            | —          | 400  | `font-body-lg`        |
| `body-md`             | 16 / 24 px            | —          | 400  | `font-body-md`        |
| `body-sm`             | 14 / 20 px            | —          | 400  | `font-body-sm`        |
| `body-xs`             | 12 / 16 px            | —          | 400  | `font-body-xs`        |
| `label-lg`            | 14 / 20 px            | 0.06em     | 600  | `font-label-lg`       |
| `label-md`            | 12 / 16 px            | 0.08em     | 600  | `font-label-md`       |
| `label-sm`            | 11 / 14 px            | 0.05em     | 500  | `font-label-sm`       |

**Importante:** las clases `font-*` solo fijan la **familia** y las clases `text-*` fijan **tamaño, interlineado y
peso**. Siempre se usan en pareja: `font-headline-md text-headline-md`.

### 1.3 Mapa de uso

| Elemento                         | Clases                                                                                   |
|:---------------------------------|:-----------------------------------------------------------------------------------------|
| H1 del Hero (Inicio)             | `font-display-hero text-headline-xl lg:text-display-hero font-semibold tracking-tight leading-none` + §7 |
| H1 de página interior            | `font-headline-xl text-headline-lg lg:text-headline-xl`                                  |
| H2 de sección                    | `font-headline-xl text-headline-lg lg:text-headline-xl` o `font-headline-lg text-headline-md lg:text-headline-lg` |
| H3 de tarjeta                    | `font-headline-md text-headline-md` (o `text-headline-sm lg:text-headline-md`)           |
| Sobretítulo (kicker)             | `font-label-md text-label-md uppercase tracking-widest text-primary`                     |
| Enlace de navegación (escritorio)| `font-label-md text-label-md uppercase tracking-[0.1em] xl:tracking-[0.16em]`            |
| Enlace de navegación (móvil)     | `font-label-md text-label-md uppercase tracking-wider`                                   |
| Texto de marca en el header      | `font-headline-md text-headline-sm sm:text-headline-md italic tracking-tight whitespace-nowrap fx-spotlight` |
| Párrafo principal                | `font-body-md text-body-md text-on-surface-variant leading-relaxed`                      |
| Texto secundario / metadatos     | `font-body-sm text-body-sm text-on-surface-variant`                                      |

---

## 2. Sistema de color

### 2.1 Arquitectura: tokens reactivos y estáticos

- **Reactivo:** variable CSS `--color-*` en `src/css/input.css` con un valor en `:root` (claro) y otro en `.dark`
  (oscuro), conectada en `tailwind.config.js` con `withOpacity()`. Formato obligatorio: tres componentes RGB separados
  por espacios (`--color-primary: 49 105 68;`) para permitir opacidad (`bg-primary/40`).
- **Estático:** hexadecimal fijo. Solo es válido cuando el color (a) va con su propio `on-*` sobre un relleno propio,
  (b) vive en un bloque de contraste fijo sobre fotografía (§3) o (c) se usa siempre con opacidad reducida.

**Regla de pareja fondo/primer plano:** todo relleno reactivo obliga a que su texto e íconos también sean reactivos.
Mezclar un fondo reactivo con un primer plano congelado (por ejemplo, `bg-primary` + `text-neutral-50` sin variante
`dark:`) está prohibido fuera del Patrón C (§2.7).

### 2.2 Tokens reactivos

| Token                    | Uso principal                               | Claro     | Oscuro    |
|:-------------------------|:--------------------------------------------|:----------|:----------|
| `background`             | Fondo general de página                     | `#F8F7F3` | `#1F2421` |
| `surface`                | Tarjetas, paneles, header, panel móvil      | `#F8FAF4` | `#212623` |
| `surface-container-low`  | Secciones alternadas, footer                | `#F1EEE8` | `#2B302D` |
| `surface-container`      | Botones circulares e íconos del header      | `#EDEFE9` | `#333A36` |
| `surface-container-high` | Hover de botones circulares                 | `#E7E9E3` | `#3D4540` |
| `on-surface`             | Texto principal                             | `#191C19` | `#F3F3F0` |
| `on-surface-variant`     | Texto secundario, enlaces neutros           | `#414941` | `#BFC5BE` |
| `on-background`          | Texto sobre `background`                    | `#191C19` | `#F3F3F0` |
| `primary`                | Acento de texto/ícono, enlace activo        | `#316944` | `#8CC79A` |
| `on-primary-container`   | Texto sobre `primary-container/20`          | `#1A5431` | `#B4F1C1` |

### 2.3 Superficies estáticas

| Token                      | Valor     | Uso autorizado                                                                 |
|:---------------------------|:----------|:-------------------------------------------------------------------------------|
| `surface-container-lowest` | `#FFFFFF` | Con opacidad (`/10`, `/15`, `/20`, `/30`) en botones "vidrio" sobre foto y en el Patrón C (siempre con pareja `dark:`); opaco en `dark:bg-surface-container-lowest` del botón primario del banner; destellos del efecto Starlight (§7). |
| `surface-container-highest`, `surface-dim`, `surface-variant`, `surface-bright`, `surface-tint`, `inverse-surface`, `inverse-on-surface` | — | Sin uso en el DOM; se conservan por compatibilidad. |

### 2.4 Marca

| Token                      | Valor     | Naturaleza | Uso                                                                            |
|:---------------------------|:----------|:-----------|:-------------------------------------------------------------------------------|
| `primary`                  | reactivo  | Reactivo   | Acentos, enlace activo, rellenos de botones primarios con su pareja `dark:`.   |
| `primary-brand`            | `#316944` | Estático   | **Solo** botón "Explorar Servicios" del Hero e insignia "Más popular" sobre foto. |
| `on-primary`               | `#1F2421` | Estático   | Texto oscuro sobre verde claro (modo oscuro).                                  |
| `primary-container`        | `#8CC79A` | Estático   | Extremo claro del degradado del banner (modo claro).                           |
| `primary-fixed`            | `#B4F1C1` | Estático   | Extremo del degradado en oscuro, precios en oscuro, anillos de foco sobre foto. |
| `on-primary-fixed`         | `#00210D` | Estático   | Titulares y botones del banner en oscuro (8,9:1 sobre `#8CC79A`).              |
| `on-primary-fixed-variant` | `#17512E` | Estático   | Párrafos del banner en oscuro (4,8:1 sobre `#8CC79A`).                         |
| `secondary`                | `#805256` | Estático   | Botón "Explorar las suscripciones", rombo ✦ decorativo.                        |
| `on-secondary`             | `#FFFFFF` | Estático   | Texto sobre `secondary`.                                                       |
| `secondary-container`      | `#FFC2C6` | Estático   | Acentos sobre bloques oscuros fijos (Hero, capítulo Novias MaGu).              |
| `tertiary` y derivados     | —         | Estático   | Sin uso en el DOM.                                                             |

### 2.5 Texto, contornos y neutrales

| Token              | Valor     | Uso                                                                  |
|:-------------------|:----------|:---------------------------------------------------------------------|
| `outline`          | `#717971` | Borde de campos de formulario (modo claro).                          |
| `outline-variant`  | `#C0C9BF` | Siempre con opacidad (`/20`, `/30`, `/40`, `/60`) para bordes y separadores. |
| `neutral-50`       | `#F8F7F3` | Texto crema sobre bloques oscuros o verdes fijos.                    |
| `neutral-100`      | `#F1EEE8` | Párrafos sobre el banner verde (modo claro).                         |
| `neutral-300`      | `#D9DDD8` | Reservado.                                                           |
| `neutral-500`      | `#676A70` | Reservado.                                                           |
| `neutral-900`      | `#35363A` | Capa tenue del menú móvil (`bg-neutral-900/40`) y color base de las sombras. |

Los tonos `neutral-200/400/600/700/800/950` que Tailwind trae por defecto **no** son tokens del proyecto (ver §5).

### 2.6 Estados

`error #D96A6A` · `success #6FBF73` · `warning #E7B857` (estrellas de reseñas) · `info #73A8D8`. Iguales en ambos temas.

### 2.7 Patrones de composición autorizados

- **Patrón A — superficie reactiva + primer plano reactivo.** El caso mayoritario: `bg-surface` con `text-on-surface`,
  `text-on-surface-variant` o `text-primary`.
- **Patrón B — relleno estático autosuficiente + su `on-*`.** Botones y chips que no dependen del tema:
  `bg-secondary text-on-secondary`, `bg-primary-brand text-neutral-50`, y todo bloque de contraste fijo (§3).
- **Patrón C — bloque de marca reactivo.** Fondo `from-primary to-primary-container dark:to-primary-fixed` con primer
  plano invertido por variante `dark:`. Se usa en el banner "¿Planeando un evento especial?" (Inicio) y en la franja de
  beneficios de Servicios, Suscripción y Galería.

| Elemento del Patrón C | Modo claro                                           | Modo oscuro                                                                   |
|:----------------------|:-----------------------------------------------------|:------------------------------------------------------------------------------|
| Degradado             | `bg-gradient-to-br from-primary to-primary-container` | `dark:to-primary-fixed` (obligatorio: sin él el degradado se aplana)          |
| Píldora               | `bg-surface-container-lowest/15 text-neutral-50`     | `dark:bg-on-primary-fixed/10 dark:text-on-primary-fixed`                     |
| Titular               | `text-neutral-50`                                    | `dark:text-on-primary-fixed`                                                  |
| Párrafo               | `text-neutral-100`                                   | `dark:text-on-primary-fixed-variant`                                          |
| Botón primario        | `bg-surface text-on-surface`                         | `dark:bg-surface-container-lowest dark:text-on-primary-fixed dark:hover:bg-primary-fixed` |
| Botón secundario      | `bg-surface-container-lowest/20 text-neutral-50`     | `dark:bg-on-primary-fixed/10 dark:text-on-primary-fixed`                     |
| Medallón de ícono     | `bg-surface-container-lowest/20 border-white/20`     | `dark:bg-on-primary-fixed/15 dark:border-on-primary-fixed/20`                |

Copiar el degradado sin las variantes de primer plano reproduce el fallo de contraste original (1,81:1).

### 2.8 Activos gráficos dependientes del tema

| Activo                                    | Tema claro | Tema oscuro |
|:------------------------------------------|:-----------|:------------|
| `public/logos/la-jardinera-original.png`  | Visible (`block dark:hidden`) | Oculto |
| `public/logos/la-jardinera-blanco.png`    | Oculto     | Visible (`hidden dark:block`) |

Ambas etiquetas `<img>` llevan el mismo `alt` y los mismos `width`/`height`. Prohibido resolverlo con `<picture>` y
`prefers-color-scheme`: el tema del sitio depende de la clase `.dark`, no del sistema operativo.

### 2.9 Contrastes medidos en render real (panel móvil, Iteración 10)

| Tema   | Elemento                 | Ratio   | Nivel |
|:-------|:-------------------------|:--------|:------|
| Claro  | Enlace activo            | 6,17:1  | AA    |
| Claro  | Enlaces neutros          | 8,86:1  | AAA   |
| Claro  | Botón WhatsApp (tonal)   | 5,38:1  | AA    |
| Oscuro | Enlace activo            | 6,88:1  | AA    |
| Oscuro | Enlaces neutros          | 7,64:1  | AAA   |
| Oscuro | Botón Instagram          | 6,64:1  | AA    |

---

## 3. Tokens de contraste fijo (Hero y bloques fotográficos)

Estos tokens **no** pertenecen al sistema reactivo: estilizan bloques oscuros en ambos temas porque tienen fotografía o
fondo fijo (Hero del Inicio, capítulo "Novias MaGu" de la Galería, visor Lightbox, rótulo del modal de servicio). El
prefijo `dark-` es heredado; conceptualmente significa "contraste fijo", no "modo oscuro".

| Token                        | Valor     |
|:-----------------------------|:----------|
| `dark-background`            | `#1F2421` |
| `dark-on-background`         | `#F3F3F0` |
| `dark-surface-container-low` | `#2B302D` |
| `dark-surface-variant`       | `#5A615D` |
| `dark-on-surface-variant`    | `#BFC5BE` |
| `dark-neutral-100`           | `#8A918B` |
| `dark-neutral-50`, `dark-neutral-300` | Duplicados de otros tokens (ver §5) |

**Excepción documentada:** `dark:bg-dark-surface-container-low` se usa además como fondo del panel móvil y de
tarjetas en modo oscuro. Es un uso heredado y aceptado; no se extiende a componentes nuevos.

---

## 4. Espaciado, layout, radios, sombras y capas

### 4.1 Espaciado (tokens `spacing`)

| Token            | Valor   | Token           | Valor   |
|:-----------------|:--------|:----------------|:--------|
| `space-unit`, `space-1` | 0,5 rem | `space-6` | 3 rem   |
| `space-2`        | 1 rem   | `space-8`       | 4 rem   |
| `space-3`        | 1,5 rem | `space-10`      | 5 rem   |
| `space-4`        | 2 rem   | `section-gap`   | 7,5 rem |
| `space-5`        | 2,5 rem | `gutter`        | 1,5 rem |
| `margin-mobile`  | 1,25 rem| `margin-desktop`| 2,5 rem |
| `container-max`  | 80 rem  |                 |         |

La escala numérica por defecto de Tailwind sigue disponible (`gap-2`, `px-3`, `py-3.5`) y se usa para ajustes finos
de componentes. Para ritmo entre secciones y bloques, usar siempre los tokens `space-*`.

### 4.2 Layout

- **Contenedor estándar:** `max-w-[80rem] mx-auto px-margin-mobile lg:px-margin-desktop`.
- **Ritmo vertical de secciones:** `py-space-8 lg:py-space-10`.
- **Header fijo de 80 px:** `<main>` compensa con `pt-20`; el Hero del Inicio sube bajo la barra con `-mt-20`.
- **Breakpoints** (Tailwind por defecto): `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280. Enfoque *mobile-first*: la
  clase base describe el móvil y los prefijos amplían.

### 4.3 Radios (tokens `borderRadius`)

| Clase           | Valor    | Nota                                                                 |
|:----------------|:---------|:---------------------------------------------------------------------|
| `rounded`       | 0,125 rem|                                                                      |
| `rounded-lg`    | 0,25 rem | Botones rectangulares, campos de formulario.                         |
| `rounded-xl`    | 0,5 rem  | Tarjetas, imágenes, paneles.                                         |
| `rounded-2xl`   | 1 rem    | Valor por defecto de Tailwind (no redefinido): formulario de contacto, hoja del modal. |
| `rounded-full`  | **0,75 rem** | **No es un círculo.** Está redefinido: produce esquinas de 12 px.  |
| `rounded-[999px]` | píldora/círculo real | Única forma de lograr un círculo verdadero.               |

### 4.4 Sombras

| Uso                         | Clase                                           |
|:----------------------------|:------------------------------------------------|
| Header                      | `shadow-[0_1px_8px_rgba(53,54,58,0.06)]`        |
| Panel móvil                 | `shadow-[0_8px_24px_rgba(53,54,58,0.12)]`       |
| Tarjeta en reposo / hover   | `shadow-sm` → `hover:shadow-md` (o `hover:shadow-lg`) |
| Banners y bloques destacados| `shadow-xl`                                     |
| Modales                     | `shadow-2xl`                                    |

El color de las sombras personalizadas deriva de `neutral-900` (`#35363A`).

### 4.5 Capas (z-index)

| Capa                         | Valor     |
|:-----------------------------|:----------|
| Contenido local              | `z-0` a `z-20` |
| Capa tenue del menú móvil    | `z-40`    |
| Header fijo                  | `z-50`    |
| Modal de servicio            | `z-50` (posterior en el DOM, se pinta encima del header) |
| Lightbox de Galería          | `z-[100]` |

---

## 5. Notas de auditoría y deuda de diseño

Hallazgos abiertos. No bloquean el trabajo, pero ningún componente nuevo debe repetirlos.

1. **`rounded-full` redefinido a 0,75 rem.** Los botones "circulares" del header y footer son cuadrados redondeados.
   Decisión pendiente: mantenerlo como rasgo de la marca o migrar a `rounded-[999px]`.
2. **Primer plano del botón primario inconsistente.** Conviven `text-white dark:text-neutral-950` (tonos por defecto
   de Tailwind) y `text-neutral-50 dark:text-on-primary`. Estándar propuesto: `text-neutral-50 dark:text-on-primary`.
3. **Footer con dos variantes:** `mt-space-8` (Inicio, Contacto, 404) y `border-t border-outline-variant/20` sin margen
   (Servicios, Suscripción, Galería). Además, el enlace activo del footer pierde `font-body-sm text-body-sm` y se ve a
   16 px en vez de 14 px.
4. **Clases `text-[Npx]` en SVG** heredadas de la migración de íconos: no tienen efecto porque el SVG declara
   `width`/`height`. El tamaño se controla con `w-*`/`h-*`.
5. **Rombo ✦ en `text-secondary`** sobre fondo oscuro: bajo contraste (decorativo). Algunas instancias no llevan
   `aria-hidden="true"`.
6. **Tokens duplicados o sin uso:** `dark-neutral-50` = `dark-on-surface-variant`; `dark-neutral-300` =
   `dark-surface-variant`; `primary-fixed-dim` = `inverse-primary`; familia `tertiary`, `secondary-light` y
   `secondary-hover` sin uso.
7. **FOUC del tema:** `theme.js` aplica `.dark` después del primer pintado. Resolverlo exige un script bloqueante en
   `<head>`, que choca con la regla "cero JS en línea"; requiere una excepción documentada.
8. **Favicon** de trazo negro poco legible en pestañas oscuras: se puede añadir un segundo `<link rel="icon"
   media="(prefers-color-scheme: dark)">` (aquí la media query sí es correcta).
9. **Estilos en línea heredados:** textura de ruido del banner (4 páginas) y fondo del Hero del Inicio usan `style=`.
   Deben migrar a clases en `input.css`.

---

## 6. Componente: carrusel de testimonios

- Pista `#testimonials-track`: `flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-space-4 hide-scrollbar
  carousel-fade`. Tarjetas generadas por `carousel.js` desde `src/js/data/reviews.js`.
- Tarjeta: `bg-surface p-space-4 rounded-xl shadow-sm border border-outline-variant/20 flex-none min-w-[300px]
  w-[85vw] md:w-[380px] snap-center`, texto de reseña en `font-headline-sm text-body-md italic line-clamp-6`.
- `.carousel-fade` enmascara los bordes con `mask-image`; los estados `is-at-start`, `is-at-end` e `is-static` los
  controla el módulo. Funciona igual en ambos temas porque recorta opacidad, no pinta color.
- Indicador de progreso decorativo (`aria-hidden`) y contador `aria-live="polite"` que solo se reescribe si cambia.

---

## 7. Componente: titular del Hero (`fx-starlight`)

### 7.1 Descripción

Efecto de **constelación**: tres campos de destellos puntuales titilan sobre el relleno de las letras mientras un
brillo lineal recorre el titular. Reemplaza al antiguo resaltador `fx-marker`. Se aplica **exclusivamente** al `<h1>`
del Hero de `index.html`.

```html
<h1 class="font-display-hero text-headline-xl lg:text-display-hero text-neutral-50 font-semibold max-w-4xl tracking-tight leading-none mb-space-4">
    <span class="fx-starlight">Florería <span class="fx-starlight fx-starlight--accent italic font-normal">La Jardinera</span></span>
</h1>
```

### 7.2 Tokens del efecto

Definidos dentro de la clase (no en `:root`) mediante `theme()` para quedar atados a `tailwind.config.js`:

| Variable  | Frase principal        | Variante `--accent`     |
|:----------|:-----------------------|:------------------------|
| `--ink`   | `neutral-50`           | `secondary-container`   |
| `--ink-3` | `secondary-container`  | `neutral-50`            |
| `--star`  | `surface-container-lowest` | `surface-container-lowest` |

El Hero es un bloque de contraste fijo (§3), por eso el efecto usa tokens estáticos y se ve igual en ambos temas.

### 7.3 Jerarquía tipográfica

| Elemento          | Peso | Estilo  | Color base            |
|:------------------|:-----|:--------|:----------------------|
| "Florería"        | 600  | Redonda | `neutral-50`          |
| "La Jardinera"    | 400  | Cursiva | `secondary-container` |

El efecto conserva la tipografía del sistema: **no** cambia familia, tracking ni tamaño.

### 7.4 Reglas técnicas

1. Tamaños de destellos y desplazamientos en `em`: el efecto escala con el titular (48 px en móvil, 64 px desde `lg`).
2. El ciclo desplaza cada capa exactamente un mosaico: el bucle no tiene salto visible.
3. **Respaldo:** sin soporte de `background-clip: text`, el texto se pinta sólido con `--ink`.
4. **Movimiento reducido:** se detiene la animación y el brillo se iguala al color base (`--ink-3: var(--ink)`).
5. **Alto contraste forzado** (`forced-colors: active`): se eliminan fondo y filtro; el texto usa `CanvasText`.
6. El resplandor (`drop-shadow`) se declara solo en el `span` exterior; el anidado lo hereda por composición.
7. **Regla de seguridad para toda animación de entrada del proyecto:** un estado oculto (`opacity: 0`) nunca vive en
   la regla base, solo dentro de los keyframes con `animation-fill-mode: both`.

---

## 8. Componente: modal de servicio

### 8.1 Estructura

`#service-modal` (`role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`) con capa
`bg-dark-background/70 backdrop-blur-sm`, panel `bg-surface rounded-t-2xl md:rounded-xl` que sube desde abajo en
móvil (`translate-y-full` → 0, 300 ms) y columna de imagen con rótulo sobre degradado de contraste fijo. Cierre por
botón, capa y `Escape`; trampa de foco; fondo con `inert` y `aria-hidden` hasta terminar la animación de salida.

### 8.2 Contrato de datos

El campo `description` de `src/js/data/services.js` contiene **HTML semántico sin clases**: `<p>`, `<h4>`, `<ul>`,
`<li>`, `<strong>`, `<em>`. Su tipografía la gobierna `.modal-prose` en `input.css` (subtítulos con rombo, viñetas en
guion corto, `<strong>` con trazo de resaltador estático). Las enumeraciones siempre en `<ul>`, nunca con `<br>` ni "•".

La galería del modal ajusta columnas con `sm:grid-cols-2|3|4`; esas tres clases están escritas en forma literal en
`servicios.html` para que Tailwind las compile.

---

## 9. Componente: header y menú móvil

### 9.1 Barra (todas las páginas)

`<header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(53,54,58,0.06)]">`
con contenedor `h-20` y tres bloques:

1. **Marca:** enlace `flex items-center gap-3 sm:gap-4 group` con los dos PNG (`h-11 w-auto shrink-0`), separador
   `hidden sm:block w-px h-8 bg-outline-variant/60` y texto con `fx-spotlight` (§12.1).
2. **Navegación de escritorio:** `hidden lg:flex items-center gap-1`. Enlace neutro: `text-on-surface-variant
   hover:text-primary`, subrayado `scale-x-0 group-hover:scale-x-100`. Enlace activo: `aria-current="page"`,
   `text-primary`, subrayado `scale-x-100`. Espaciado compacto entre 1024 y 1279 px (`px-2.5 xl:px-4`,
   `tracking-[0.1em] xl:tracking-[0.16em]`, subrayado `left-2.5 right-2.5 xl:left-4 xl:right-4`).
3. **Clúster de acciones:** `flex items-center gap-2 lg:gap-2 xl:gap-space-3`. Instagram y WhatsApp `hidden lg:flex
   w-8 h-8`; tema `w-11 h-11 lg:w-9 lg:h-9`; hamburguesa `lg:hidden w-11 h-11` con íconos
   `#mobile-menu-icon-open` / `#mobile-menu-icon-close`.

### 9.2 Panel móvil anclado

`#mobile-menu`: `hidden lg:hidden absolute top-full left-0 w-full max-h-[calc(100dvh-5rem)] overflow-y-auto
overscroll-contain bg-surface dark:bg-dark-surface-container-low border-t border-outline-variant/30
shadow-[0_8px_24px_rgba(53,54,58,0.12)]`. Fondo sólido, sin desenfoque ni transparencia, sin animación de entrada.

- Enlaces: `flex items-center min-h-[3rem] border-b border-outline-variant/30 font-label-md text-label-md uppercase
  tracking-wider` + `text-on-surface-variant hover:text-on-surface` (neutro) o `text-primary font-semibold` con
  `aria-current="page"` (activo). Foco: `focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary`.
- Fila social: WhatsApp primero (tonal `bg-primary/10 text-primary`), luego Instagram (`bg-surface-container
  text-on-surface-variant`), ambos `min-h-[3rem] rounded-xl`.

### 9.3 Capa tenue

`<div id="mobile-menu-scrim" class="hidden lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-neutral-900/40"
aria-hidden="true">`, **hermana** del header, nunca dentro de él.

### 9.4 Invariantes

Ningún descendiente del header con `fixed` (un `backdrop-filter` convierte al header en bloque contenedor de sus hijos
fijos). Alturas acopladas a `h-20`. Estado activo único por página; `404.html` en estado neutro.

---

## 10. Componente: footer

Rejilla `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-6` sobre `bg-surface-container-low`:

1. Marca (`font-headline-md italic`), frase de filosofía y crédito de desarrollo.
2. Navegación (`<nav data-active-classes="text-primary font-semibold">`) con los 5 enlaces.
3. Contacto (`tel:`, `mailto:`, Google Maps) con íconos `text-primary` y botones sociales `w-8 h-8 bg-surface-container`.
4. Medios de pago: Crédito/Débito, Transferencia, Efectivo.

Pendiente de unificación (ver §5.3).

---

## 11. Otros componentes

### 11.1 Encabezado de sección con rombo

```html
<div class="flex items-center justify-center gap-2 mb-2" aria-hidden="true">
    <span class="w-8 h-[1px] bg-primary/40"></span>
    <span class="font-headline-sm text-headline-sm italic text-secondary">✦</span>
    <span class="w-8 h-[1px] bg-primary/40"></span>
</div>
```

### 11.2 Tarjeta estándar

`group flex flex-col bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300
hover:-translate-y-1 border border-outline-variant/30`. Imagen en contenedor `relative w-full aspect-[4/5]
overflow-hidden bg-surface-container` con `w-full h-full object-cover group-hover:scale-105 transition-transform
duration-700 ease-out`. Variantes de fondo en Servicios: `bg-primary/10` y `bg-secondary/10`.

### 11.3 Botones

| Variante             | Clases base                                                                                   |
|:---------------------|:----------------------------------------------------------------------------------------------|
| Primario             | `bg-primary hover:bg-primary/90 text-neutral-50 dark:text-on-primary rounded-lg px-space-4 py-3.5 font-label-lg text-label-lg uppercase tracking-wider shadow-md` |
| Marca (solo Hero)    | `bg-primary-brand text-neutral-50 hover:opacity-90`                                           |
| Secundario           | `bg-secondary text-on-secondary hover:opacity-90`                                             |
| Contorno             | `text-primary border border-primary/40 hover:bg-primary/10`                                   |
| Tonal                | `bg-primary/10 hover:bg-primary/20 text-primary`                                              |
| Vidrio (sobre foto)  | `bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 backdrop-blur-md text-neutral-50` |
| Ícono (header)       | `w-11 h-11 lg:w-9 lg:h-9 rounded-full bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high` |

Todo botón o enlace-botón incluye foco visible: `focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-primary` (con `focus-visible:ring-offset-2` en rellenos sólidos).

### 11.4 Formularios (Contacto)

Etiqueta `font-label-md text-label-md uppercase tracking-wider`; campo `w-full rounded-lg bg-background
dark:bg-dark-background border border-outline dark:border-dark-neutral-100 px-space-2 py-3 font-body-md text-body-md
focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30`. Campos obligatorios marcados con `*` en
`text-primary` y `aria-hidden`. Estado del envío en `role="status" aria-live="polite"`.

### 11.5 Galería (acordeón y Lightbox)

Tarjeta-botón `gallery-carousel-card` con `flex-1 hover:grow-[10] focus-visible:grow-[10] transition-all
duration-700`, a todo color (prohibido `grayscale`). Lightbox `bg-dark-background/95 backdrop-blur-xl z-[100]`, con
controles blancos y anillo `focus-visible:ring-white`.

### 11.6 Tarjetas de planes (Suscripción)

Plan destacado con `ring-2 ring-primary`, elevación `md:-mt-space-3` e insignia `bg-primary-brand text-neutral-50`
sobre la foto. Precios `text-primary dark:text-primary-fixed font-semibold`.

---

## 12. Movimiento y efectos globales

### 12.1 `fx-spotlight` (texto de marca del header)

Haz radial que barre el texto (`background-clip: text`) durante 3,6 s en vaivén, con tokens reactivos
(`primary`, `on-surface`). Se acelera al pasar el cursor sobre la marca.

### 12.2 Otros efectos

| Efecto                    | Implementación                                                         |
|:--------------------------|:-----------------------------------------------------------------------|
| Cambio de tema            | View Transitions API con recorte diagonal (`reveal-light` / `reveal-dark`, 0,7 s, `--expo-out`) |
| Acordeón                  | `.accordion-grid` (`grid-template-rows: 0fr → 1fr`, 700 ms)             |
| Cross-fade del Hero de Suscripción | `opacity` con `duration-1000`, ciclo de 4 s pausado fuera de pantalla |
| Elevación de tarjetas     | `hover:-translate-y-1` + sombra, 300 ms                                |
| Zoom de imagen            | `group-hover:scale-105`, 700 ms `ease-out`                             |

### 12.3 Duraciones y curvas

150 ms (por defecto), 300 ms (UI y modales), 700 ms (imágenes y acordeones), 1000 ms (cross-fade). Curva de firma:
`--expo-out: cubic-bezier(0.16, 1, 0.3, 1)`.

### 12.4 Movimiento reducido

Todo efecto continuo o de desplazamiento declara su alternativa en `@media (prefers-reduced-motion: reduce)`.

---

## 13. Iconografía e imágenes

- **Íconos:** SVG en línea con `fill="currentColor"` (o `stroke="currentColor"`), dimensionados con `w-*`/`h-*`.
  Decorativos con `aria-hidden="true"`; los botones solo-ícono llevan `aria-label`. Fuentes: Material Design Icons,
  MDI (Pictogrammers), Lucide Lab y SVG Logos, con su comentario de licencia cuando corresponde.
- **Imágenes:** `.webp` en `public/images/<sección>/`, videos `.mp4` en `public/images/galeria/`. Siempre con `width`,
  `height` y `alt`. `fetchpriority="high"` para la imagen principal sobre el pliegue; `loading="lazy"` para el resto.
  Contenedor con `aspect-*` y `object-cover` para CLS = 0.

---

## 14. Accesibilidad

1. Contraste mínimo WCAG 2.1 AA (4,5:1 texto normal, 3:1 texto grande) verificado en ambos temas.
2. Objetivos táctiles de 44 × 44 px en móvil (`w-11 h-11`, `min-h-[3rem]`).
3. Foco visible en todo elemento interactivo; nunca `outline-none` sin un anillo sustituto.
4. Modales con `role="dialog"`, `aria-modal`, trampa de foco, `Escape`, fondo `inert` y retorno del foco.
5. Estados sincronizados: `aria-expanded`, `aria-current="page"`, `aria-hidden`, `aria-label` dinámico del menú.
6. Contenido generado accesible: contadores con `aria-live="polite"` que no se reescriben sin cambios.

---

## 15. Registro de cambios

- **Iteración Dark Mode:** arquitectura de tokens reactivos y estáticos; token `primary-brand`.
- **Corrección Dark Mode:** Patrón C para el banner y logotipo dual por tema.
- **Épica 06 (Fase 2):** header esencial en móvil, panel anclado y capa tenue; compactación de la barra entre `lg` y
  `xl` (Hallazgo H8).
- **Épica 07:** documento trasladado a la raíz del repositorio como fuente única. El titular del Hero reemplaza el
  resaltador `fx-marker` por el efecto `fx-starlight` (§7). Se documentan header, footer, botones, capas, radios y la
  deuda de diseño abierta (§5).