# Iteración 08 (extensión no planificada): Hero Vivo — Fotografía a Pleno Color, Tarjeta de Vidrio y Retiro del Logotipo

> **Ubicación en el repositorio:** `_planificacion/03-planificacion/epicas/epica-01-inicio/iteracion-08.md`
> **Antes de guardar, el desarrollador confirma el número:** en la Épica 01 existen dos "Iteración 07" y una "Iteración
> Extras". Usa el siguiente número libre de la carpeta (aquí se asume 08) y ajusta el título, este encabezado, la
> bitácora y el nombre del archivo si es otro.
> **Origen:** comentarios de la dueña de La Jardinera sobre el Hero del Inicio.
> **Precedente de reapertura:** Épica 06, Fase 2 (`README.md` §11, "Iteración no planificada").

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
La Épica 01 está cerrada, pero la clienta pidió tres cambios sobre el Hero (`#titular`) de `index.html`. Esta iteración
los ejecuta como **extensión no planificada**, sin reabrir el resto de la épica. Antes de editar, lee el Hero actual
completo (incluido lo que haya bajo el párrafo: botones u otros elementos), lista cada elemento que contiene y explica
tu plan de impacto (archivos, DOM, compilación de Tailwind e invariantes en riesgo).

**Alcance de los cambios:**

1. La fotografía del Hero se ve **a pleno color**: sin capa de oscurecido, sin degradados oscuros y sin opacidad.
2. El titular y el párrafo (y todo lo que hoy esté en el bloque de contenido) pasan a una **tarjeta translúcida con
   difuminado** (*glassmorphism*) centrada, a través de la cual la imagen se ve borrosa.
3. El **logotipo oficial** sale del Hero, porque ya está en la barra de navegación.

**Fuente de la verdad visual:** la tarjeta del `index.html` antiguo (`bg-black/10 dark:bg-black/30 backdrop-blur-md
border border-white/20 rounded-3xl shadow-2xl`) es solo **referencia de efecto**. No se copian de ahí ni la imagen
(`opacity-80 mix-blend-multiply`, que apaga los colores) ni `bg-black` (no es un token). Todo se traduce a tokens de
`DESIGN.md` (§3 y §2.7, Patrón B: relleno estático con su propio primer plano).

**Imágenes (las pone el desarrollador, no las creas ni las modificas):**

| Archivo                                         | Proporción | Píxeles   | Peso objetivo |
|:------------------------------------------------|:-----------|:----------|:--------------|
| `public/images/hero-botanical-desktop.webp`     | 16:9       | 2400×1350 | ≤ 300 KB      |
| `public/images/hero-botanical-mobile.webp`      | 9:16       | 1080×1920 | ≤ 180 KB      |

**Coordinación con la Épica 07, Iteración 03 (DT-03):** esa iteración convierte el `style="background-image…"` del Hero
en la clase `.bg-hero-botanical`. Con `<picture>` esa clase deja de existir. Esta iteración **debe ejecutarse antes** de
la Iteración 03 de la Épica 07, y esa especificación se ajusta con el **Anexo A**.

**Autorización explícita de esta iteración** (la concede el desarrollador en el chat; sin ese mensaje no aplica):
`index.html` (solo el `<section id="titular">`), `src/css/input.css` (solo lo indicado en la Tarea 3), `dist/css/output.css`
(regenerado) y los registros de `_planificacion/04-bitacora/`. `AGENTS.md`, `README.md` y `DESIGN.md` son solo lectura:
para ellos entregas propuestas (Anexo C). Git en modo lectura.

## 1. Objetivo de la Iteración

Que el Hero del Inicio muestre una fotografía viva, con todos sus colores, y que el mensaje de marca se lea sobre ella
dentro de una tarjeta de vidrio profesional, sin logotipo duplicado, manteniendo contraste AA, CLS = 0 y paridad
exacta en modo claro y oscuro (el Hero es un bloque de contraste fijo, `DESIGN.md` §3).

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Línea base y detección de estado (solo lectura)

1. `pnpm build` y SHA-256 de `dist/css/output.css`.
2. Cuenta `style="` en `index.html` y registra la ubicación de cada uno.
3. Detecta en qué estado está el Hero:

| Estado | Condición                                                                        | Qué haces                                                      |
|:-------|:---------------------------------------------------------------------------------|:---------------------------------------------------------------|
| A      | El Hero tiene `style="background-image: url(...hero-botanical.webp)"`            | Lo reemplazas completo (Tarea 2). No hay nada que borrar en CSS. |
| B      | El Hero usa `.bg-hero-botanical` (la Iteración 03 de la Épica 07 ya se ejecutó)  | Reemplazas el marcado y **eliminas** `.bg-hero-botanical` de `input.css` (Tarea 3). |
| C      | Ninguno de los dos, u otro estado                                                | Detente, reporta lo que encontraste y espera instrucciones.    |

4. Lista todo lo que hoy hay dentro del bloque de contenido del Hero (logotipo, `h1`, párrafo, botones, etc.) y
   cuántas veces aparece `la-jardinera-blanco.png` en `index.html` (el header también lo usa para el modo oscuro,
   `DESIGN.md` §2.8).
5. Busca `hero-botanical.webp` y `hero-botanical` en todo el repositorio (sin `node_modules/`, `.git/`, `dist/`,
   `_site/`) y clasifica cada coincidencia (Hero, metaetiquetas `og:image`, documentación, otra).

### Tarea 1: Verificación de las imágenes (solo lectura)

1. Confirma que existen los dos archivos de la tabla de la directiva. **Si falta alguno, detente y repórtalo:** no
   crees imágenes de relleno ni apuntes a archivos inexistentes.
2. Con un script temporal (no lo dejes en el repositorio) o con `view`, reporta de cada archivo: formato real
   (WebP), ancho y alto en píxeles, proporción y peso en KB. Compara con la tabla.
3. Si difieren de lo esperado, **no corrijas nada**: reporta la diferencia. Tolerancia: ±5 % en píxeles y hasta un 15 %
   sobre el peso objetivo; más allá, repórtalo como hallazgo (no bloquea el marcado, sí la certificación).
4. Mira ambas imágenes con `view`. Confirma que son la misma fotografía recompuesta (misma escena y paleta). Si
   muestran escenas distintas, repórtalo, porque el `alt` debe describir ambas.

### Tarea 2: Marcado del Hero en `index.html`

Reemplaza únicamente el contenido de `<section id="titular">`. Mantén el `id`, el `-mt-20`, el `overflow-hidden`, el
`bg-dark-background` (color de respaldo mientras carga la imagen) y el `min-h-[92vh]`. El marcado objetivo es:

```html
<section id="titular"
         class="relative w-full -mt-20 overflow-hidden bg-dark-background text-dark-on-background min-h-[92vh] flex items-center justify-center">
    <!-- Fotografía a pleno color: sin scrims, sin opacidad, sin escala -->
    <picture>
        <source media="(orientation: portrait)"
                srcset="./public/images/hero-botanical-mobile.webp"
                type="image/webp" width="1080" height="1920">
        <img src="./public/images/hero-botanical-desktop.webp"
             alt="<ALT EN ESPAÑOL DE CHILE>"
             width="2400" height="1350"
             fetchpriority="high" decoding="async"
             class="absolute inset-0 w-full h-full object-cover">
    </picture>

    <!-- Contenedor de la tarjeta (libera el header fijo con pt-24) -->
    <div class="relative z-10 w-full max-w-4xl mx-auto px-margin-mobile lg:px-margin-desktop pt-24 pb-space-8">
        <!-- Tarjeta de vidrio -->
        <div class="hero-glass flex flex-col items-center text-center gap-space-3 p-space-4 md:p-space-8 rounded-3xl border border-white/20 bg-dark-background/45 backdrop-blur-xl backdrop-saturate-150 shadow-2xl">
            <!-- h1 con efecto Starlight: marcado interno IDÉNTICO al actual -->
            <h1 class="font-display-hero text-headline-xl lg:text-display-hero text-neutral-50 font-semibold max-w-4xl tracking-tight leading-none">
                <span class="fx-starlight">Florería <span class="fx-starlight fx-starlight--accent italic font-normal">La Jardinera</span></span>
            </h1>
            <!-- Párrafo editorial: mismo texto y <em> actuales -->
            <p class="font-body-lg text-body-lg text-neutral-50 max-w-2xl font-light leading-relaxed">
                <em>…texto actual…</em>
            </p>
            <!-- Resto de elementos que hoy existan en el bloque, conservados -->
        </div>
    </div>
</section>
```

Reglas:

1. **Imagen:** elimina `div role="img"` con el `aria-label` en inglés, `opacity-45`, `scale-105`,
   `transition-transform`, los **dos** `div` de degradados (`bg-gradient-to-t` y `bg-gradient-to-r`) y el espaciador
   `h-24 lg:h-32`. Ningún elemento del Hero puede quedar con opacidad, mezcla (`mix-blend-*`), filtro (`grayscale`,
   `brightness`) ni degradado oscuro sobre la fotografía.
2. **`alt` en español de Chile:** mira las imágenes con `view` y redacta un `alt` descriptivo de la escena (máximo
   125 caracteres, sin "imagen de" ni "foto de"). Muéstralo en tu plan de impacto. El `<source>` no lleva `alt`.
3. **Logotipo:** elimina el `<img src="./public/logos/la-jardinera-blanco.png" …>` del Hero y su comentario. **No toques
   el header ni borres archivos de `public/logos/`.**
4. **Titular:** el `<span>` interno de `fx-starlight` queda **byte a byte igual**. El texto accesible sigue siendo
   exactamente "Florería La Jardinera". Solo se quita el `mb-space-4` del `h1`: el espaciado lo da el `gap-space-3`.
5. **Párrafo:** conserva el texto y el `<em>` actuales. El color pasa de `text-dark-on-surface-variant` a
   `text-neutral-50`, porque `#BFC5BE` solo cumple AA sobre fondos casi negros y la tarjeta ya no lo garantiza.
   Se quita el `mb-space-6` (lo reemplaza el `gap`).
6. **Resto del contenido del Hero** (botones u otros): se mueve **dentro de la tarjeta**, conservando textos, enlaces,
   orden y clases, y se ajusta solo la alineación (de `items-start` a centrado). No los rediseñes. Si un botón "Vidrio"
   (`bg-surface-container-lowest/10`) queda con un contraste pobre sobre la tarjeta, **repórtalo con la medición y
   propón la corrección sin aplicarla**.
7. **Tokens:** `rounded-3xl` y `shadow-2xl` son los valores del `index.html` antiguo. Revisa `DESIGN.md` §4 y
   `tailwind.config.js`: si existen tokens de radio y sombra autorizados para tarjetas sobre foto, úsalos en su lugar y
   explícalo; si no, deja estos y propón el cambio de documentación (Anexo C). `border-white/20` ya está autorizado
   (Patrón C, medallón).
8. **Clases literales:** todas las clases de Tailwind se escriben completas, sin concatenar.
9. **Cero** `style=`, `onclick` o `<script>` en el Hero. No agregues JavaScript.

### Tarea 3: CSS en `src/css/input.css`

1. **Respaldo sin `backdrop-filter`.** En un bloque `@layer components` (reutiliza el existente si lo hay, sin
   mezclar con el bloque de Starlight), agrega:

   ```css
   /* Tarjeta de vidrio del Hero (Inicio). Ver DESIGN.md §3 y §11.   */
   /* Si el navegador no soporta backdrop-filter, la tarjeta sube a  */
   /* un fondo casi opaco para no perder el contraste del texto.     */
   @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
       .hero-glass {
           background-color: color-mix(in srgb, theme('colors.dark-background') 85%, transparent);
       }
   }
   ```

   `color-mix` con `theme()` es el mismo patrón que ya usa `fx-starlight`. No uses hexadecimales sueltos.
2. **Solo en estado B:** elimina la regla `.bg-hero-botanical` (y su comentario). Verifica con una búsqueda que ninguna
   otra página la usa antes de borrarla. No toques `.bg-noise`.
3. No modifiques `fx-starlight`, `carousel-fade` ni ningún otro bloque.

### Tarea 4: Compilación y presencia de clases

1. `pnpm build` sin errores ni advertencias.
2. Confirma por búsqueda de texto en `dist/css/output.css` que existen: `.backdrop-blur-xl`, `.backdrop-saturate-150`,
   `.bg-dark-background\/45`, `.border-white\/20`, `.rounded-3xl` (o el token que hayas usado), `.shadow-2xl` (o su
   token), `.hero-glass` dentro del `@supports not`, y que **no** quedan `.bg-hero-botanical` ni `.opacity-45` usados
   por el Hero.
3. Ejecuta `pnpm run build:cf` y confirma que `_site/public/images/` contiene los dos WebP nuevos y que el peso de cada
   uno está bajo el límite de 25 MiB de Cloudflare Pages.

### Tarea 5: Verificación en render real

Sigue el estándar de `README.md` §7. Viewports: 320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768 y 1280×800,
en **modo claro y oscuro**. Evidencia por cada viewport y tema; si no tienes navegador, deja el punto como
`🕒 PENDIENTE` y entrega la lista manual de la Tarea 6.

1. **Colores vivos:** la fotografía fuera de la tarjeta se ve sin oscurecido. Comprueba por cómputo que no hay ningún
   elemento con opacidad, mezcla o degradado oscuro sobre la imagen.
2. **Difuminado:** la imagen detrás de la tarjeta se ve borrosa y el borde de la tarjeta es nítido.
3. **Imagen correcta por orientación:** en vertical (320×640, 360×740, 412×915, 768×1024) se carga
   `hero-botanical-mobile.webp`; en horizontal (740×360, 1024×768, 1280×800), la de escritorio. Reporta `currentSrc`.
4. **Contraste (criterio AA):** mide con valores reales de píxeles. Para cada viewport, toma una captura con el texto
   oculto temporalmente (inyectando CSS desde la consola, sin guardarlo en el repo), calcula la luminancia del **percentil
   95 más claro** del área de la tarjeta (el peor caso, no el promedio) y obtén la razón contra:
   `neutral-50` (párrafo y primera línea del `h1`, mínimo **4,5:1** para el párrafo y **3:1** para el `h1` por ser
   texto grande) y `secondary-container` (segunda línea del `h1`, mínimo **3:1**).
    - Si algún valor no alcanza, **sube el tinte de la tarjeta** de `bg-dark-background/45` a `/55`, luego `/65`,
      reportando cada medición. No cambies colores de texto ni agregues scrims fuera de la tarjeta.
    - Si con `/65` sigue sin cumplir, **detente** y reporta: el problema es la fotografía elegida (demasiado clara bajo
      la tarjeta), no el código. El desarrollador decide si cambia la imagen.
5. **Sin desborde:** `documentElement.scrollWidth` igual a `clientWidth` en todos los viewports. A 320×640 el titular
   (48 px) debe caber sin recortes; si no cabe, reduce el padding móvil de la tarjeta (`p-space-4` a `p-space-3`),
   **no** el tamaño de la tipografía.
6. **Header sin regresión:** la barra superior sigue legible sobre la nueva fotografía en ambos temas (tiene su propia
   superficie translúcida). Reporta el contraste del enlace activo.
7. **Movimiento reducido:** con `prefers-reduced-motion: reduce`, el titular queda sólido y no hay animaciones nuevas.
8. **Rendimiento:** CLS = 0 en el Hero. La imagen del Hero es la única con `fetchpriority="high"` sobre el pliegue. Si
   tienes Lighthouse, reporta Performance y LCP antes/después con la línea base de la Tarea 0; si no, `🕒 PENDIENTE`.
9. **Consola** del navegador sin errores.

### Tarea 6: Lista manual (solo si no hay navegador)

* [ ] En los 7 viewports y en ambos temas: la foto se ve viva y la tarjeta difumina el fondo.
* [ ] En móvil vertical se ve el WebP vertical; en escritorio, el horizontal.
* [ ] El texto de la tarjeta se lee en todos los viewports, incluso sobre la zona más clara de la foto.
* [ ] No hay logotipo dentro del Hero y el de la barra de navegación sigue visible en ambos temas.
* [ ] El efecto Starlight del titular sigue funcionando.
* [ ] No hay scroll horizontal.

### Tarea 7: Hallazgos y registro

1. **Hallazgos a reportar sin corregir:** la fotografía anterior `public/images/hero-botanical.webp` queda sin uso
   (indica si otro archivo la referencia, por ejemplo `og:image`); el desarrollador decide si la retira con Git. Tampoco
   corrijas nada fuera del Hero.
2. Crea `_planificacion/04-bitacora/bitacora-epica-01/bitacora-iteracion-08.md` con la plantilla del `README.md` §8.2.
   Incluye el estado detectado (A, B o C), la tabla de contrastes medidos y el `alt` propuesto.
3. Agrega **una** línea al final de `_planificacion/04-bitacora/estado-actual.md`, con el formato del §8.1:
   `Épica 01 - Iteración 08 (extensión no planificada): Hero Vivo — fotografía a pleno color, tarjeta de vidrio y retiro del logotipo - <estado>.`
4. Entrega el **Anexo C** (propuestas para `DESIGN.md`) en la sección 6 de la bitácora.
5. Entrega el mensaje de commit sugerido. No ejecutes ningún comando de Git que no sea de lectura.

## 3. Auditoría de No-Regresión e Invariantes

* **Archivos modificables:** `index.html` (solo `#titular`), `src/css/input.css` (solo la Tarea 3), `dist/css/output.css`
  (regenerado) y los registros de bitácora. Cualquier otro archivo modificado invalida la iteración.
* El header, `<main>` bajo el Hero, el footer y los demás cinco HTML quedan **intactos** (verifícalo con `git diff`
  de lectura).
* `id="titular"` y `-mt-20` se conservan. Hay un único `<h1>` en la página.
* Texto accesible del `h1`: "Florería La Jardinera". Marcado `fx-starlight` idéntico.
* 0 `style=`, 0 `onclick`, 0 `<script>` con lógica, 0 `href="#"` nuevos.
* 0 referencias a `la-jardinera-blanco.png` en el Hero; el conteo en el header se mantiene.
* 0 cadenas en inglés en `alt` o `aria-label` del Hero.
* Ningún elemento del Hero con `opacity-*`, `mix-blend-*` ni degradado oscuro sobre la imagen.
* Sin dependencias externas nuevas y sin JavaScript nuevo.

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Colores vivos**
    * **Dado** el Inicio en cualquier tema y viewport
    * **Cuando** se observa la fotografía fuera de la tarjeta
    * **Entonces** se ve sin capa de oscurecido, sin degradados y sin opacidad, y el Hero ya no contiene scrims.
* **Escenario 2: Tarjeta de vidrio**
    * **Dado** el Hero cargado
    * **Cuando** se observa el centro
    * **Entonces** hay una tarjeta translúcida con difuminado (`backdrop-blur-xl`) que contiene el titular, el párrafo y
      los elementos que ya existían, y la imagen se ve borrosa detrás de ella.
* **Escenario 3: Logotipo fuera del Hero**
    * **Dado** el Hero y el header
    * **Cuando** se inspecciona el DOM
    * **Entonces** el Hero no contiene `la-jardinera-blanco.png` ni otro logotipo, y el logotipo del header se mantiene
      en ambos temas.
* **Escenario 4: Dirección de arte**
    * **Dado** un dispositivo vertical y uno horizontal
    * **Cuando** carga la página
    * **Entonces** el vertical usa `hero-botanical-mobile.webp` y el horizontal `hero-botanical-desktop.webp`, con
      `width` y `height` declarados y `fetchpriority="high"` solo en el `<img>` del Hero.
* **Escenario 5: Legibilidad**
    * **Dado** el peor caso (zona más clara bajo la tarjeta)
    * **Cuando** se mide con píxeles reales
    * **Entonces** el párrafo alcanza al menos 4,5:1 y el `h1` al menos 3:1 en los 7 viewports y ambos temas, o el
      incumplimiento queda reportado con la medición y la causa.
* **Escenario 6: Paridad de temas y sin regresión**
    * **Dado** el cambio entre modo claro y oscuro
    * **Cuando** se compara el Hero
    * **Entonces** es visualmente idéntico (bloque de contraste fijo), no hay scroll horizontal, la consola no tiene
      errores, `pnpm build` y `pnpm run build:cf` terminan sin advertencias y el resto de la página no cambió.
* **Escenario 7: Honestidad de la evidencia**
    * **Dado** que no se pudo ejecutar una verificación (navegador, Lighthouse)
    * **Cuando** se cierra la bitácora
    * **Entonces** el punto figura como `🕒 PENDIENTE` con su lista manual; ningún valor está estimado como medido.

---

## Anexo A: Parche a la Épica 07 · Iteración 03 (`iteracion-03.md`)

Aplícalo el desarrollador **antes** de ejecutar esa iteración, y solo si la Iteración 08 de la Épica 01 ya se ejecutó.

1. **Directiva de inicio:** agrega al final: *"Prerrequisito: la Épica 01 · Iteración 08 reemplazó el fondo CSS del Hero
   por `<picture>`. El Hero ya no tiene `style=` ni usa `.bg-hero-botanical`."*
2. **Tarea 0, punto 2:** el conteo esperado de `style="` baja de cinco a **cuatro** (solo la textura de ruido de los
   cuatro banners).
3. **Tarea 2, primer párrafo:** "Hay cinco `style=`…" pasa a "Hay **cuatro** `style=`: la textura de ruido del banner en
   `index.html`, `servicios.html`, `suscripcion-floral.html` y `galeria.html`".
4. **Tarea 2, punto 2:** elimina del bloque CSS la regla `.bg-hero-botanical` y su comentario (queda solo `.bg-noise`).
5. **Tarea 2, punto 4 (Hero de `index.html`):** elimínalo completo.
6. **Tarea 2, punto 5:** quita la verificación de `.bg-hero-botanical` en `output.css`.
7. **Tarea 7, hallazgo 1:** reemplázalo por *"Resuelto en la Épica 01 · Iteración 08: el Hero usa `<img
   fetchpriority="high">` dentro de `<picture>`."*
8. **Tarea 8, tabla de la bitácora:** DT-03 se evidencia con "4 `style=` resueltos; el del Hero se resolvió en la Épica
   01 · Iteración 08".

## Anexo B: Registro en la definición de la Épica 01

Agrega al final de `epica-01-inicio/definicion-epica.md`, sin modificar el DoD original:

```markdown
## 4. Extensiones posteriores al cierre

| Iteración | Tipo                      | Entregable                                                                                  | Estado |
|:----------|:--------------------------|:--------------------------------------------------------------------------------------------|:-------|
| 08        | Extensión no planificada  | Hero vivo: fotografía a pleno color, tarjeta de vidrio y retiro del logotipo (comentarios de la clienta) | ⏳ Pendiente |

Estas extensiones no reabren el DoD de la Épica 01; el estado de la épica sigue siendo "cerrada".
```

## Anexo C: Propuestas para `DESIGN.md` (las redacta el agente en la bitácora; las aplica el desarrollador)

1. **§3 (Contraste fijo):** el Hero deja de llevar *scrims*; la legibilidad la da la tarjeta de vidrio, no un oscurecido
   sobre la fotografía.
2. **§11 (Componentes):** nueva subsección "Tarjeta de vidrio del Hero", con las clases finales, la regla del tinte
   mínimo medido (`/45` a `/65`) y el respaldo `@supports not` de `input.css`.
3. **§13 (Imágenes):** documentar el uso de `<picture>` con `media="(orientation: portrait)"`, las dos proporciones
   (16:9 y 9:16), los píxeles y pesos objetivo, y el criterio de elegir fotos con la zona central de luminosidad media
   o baja.
4. **§15 (Registro de cambios):** "Épica 01 · Iteración 08: Hero a pleno color, tarjeta de vidrio y retiro del logotipo".