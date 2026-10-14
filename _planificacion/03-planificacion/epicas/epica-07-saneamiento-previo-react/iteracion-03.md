# Iteración 03: Saneamiento de Deuda Técnica y Certificación del Hallazgo H8

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Esta iteración limpia lo que distorsionaría la migración a Astro de la Épica 08 (los defectos se copiarían a los
componentes) y cierra la Fase 2 de la Épica 06,
que sigue abierta porque el Hallazgo H8 (Iteración 13) quedó ejecutado pero sin certificar en render real. Son seis
correcciones pequeñas y una certificación. **Cada corrección es independiente:** aplícalas y verifícalas una por una, y
si una falla no bloquees las demás.

En estas correcciones se permite tocar, además de los HTML indicados, `src/css/input.css` (solo lo que se pide) y la
tabla del §12 de `_planificacion/README.md`. Todo lo demás del `<head>`, del `<main>` y del `<footer>` permanece
intacto, salvo el reordenamiento del `<head>` de `404.html` que pide la Tarea 3b. `AGENTS.md`, `README.md` y
`DESIGN.md` son solo lectura.

**Autorización explícita de esta iteración:** edición de los HTML y de `src/css/input.css` en lo descrito abajo, y de la
tabla §12 de `_planificacion/README.md`.

**Prerrequisito:** la Épica 01 · Iteración 08 reemplazó el fondo CSS del Hero por `<picture>`. El Hero ya no tiene
`style=` ni usa `.bg-hero-botanical`. Si al ejecutar la Tarea 0 el Hero todavía tiene `style="background-image: ..."`,
la Iteración 08 no se ha ejecutado: detente y repórtalo.

## 1. Objetivo de la Iteración

Que el marcado de las seis páginas esté libre de defectos conocidos (texto suelto en el footer de Servicios, estilos en
línea, botones invisibles en la 404, 404 sin estilos en rutas con subcarpeta, ícono ilegible en modo oscuro) y que el
ancho de la barra de escritorio entre 1024 y 1279 px quede demostrado en un navegador real, no estimado.

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Línea base (solo lectura)

1. `pnpm build` y SHA-256 de `dist/css/output.css`.
2. Conteo de `style="` por archivo en los 6 HTML. Esperado: **4** en total (la textura de ruido de los cuatro banners);
   el Hero de `index.html` ya no debe tener ninguno.
3. **Balance de etiquetas.** Con un script temporal (no lo dejes en el repositorio), cuenta apertura y cierre de `a`,
   `div`, `section`, `article`, `button`, `nav`, `ul`, `li`, `main`, `header`, `footer`, `span`, `p`, `h1`, `h2`, `h3` y
   `h4` en cada HTML, ignorando comentarios. Reporta cualquier desbalance. Corrige **solo** el de la Tarea 1; el
   resto son hallazgos.

### Tarea 1: DT-01 — Enlace de marca roto en el footer de `servicios.html`

En la columna 1 del footer de `servicios.html` falta la apertura `<a` del enlace: el navegador muestra en pantalla el
texto `class="font-headline-md ... href="./index.html">La Jardinera`. Debe quedar idéntico al de las demás páginas:

```html
<a class="font-headline-md text-headline-md italic tracking-tight text-on-surface" data-path="inicio" href="./index.html">La Jardinera</a>
```

Compara esa columna con la de `contacto.html` (solo lectura) y confirma que, tras el arreglo, la única diferencia
restante sea el estado activo de la navegación. Verifica que el balance de `<a>` y `</a>` del footer quede parejo.

### Tarea 2: DT-03 — Estilos en línea a clases

Hay cuatro `style=` en el marcado: la textura de ruido del banner en `index.html`, `servicios.html`,
`suscripcion-floral.html` y `galeria.html`. (El del Hero se resolvió en la Épica 01 · Iteración 08.)

1. **Antes de borrar nada**, copia literalmente la cadena base64 del `url('data:image/svg+xml;base64,...')` de cada uno
   de los cuatro banners y compáralas: deben ser idénticas entre sí. Si alguna difiere, detente y repórtalo.
2. En `src/css/input.css`, dentro de un bloque `@layer components` **nuevo** (junto al del carrusel o al del efecto
   Starlight), agrega:
   ```css
   /* Textura de ruido fractal de los banners de marca (DESIGN.md §2.7) */
   .bg-noise {
       background-image: url("data:image/svg+xml;base64,<CADENA BASE64 COPIADA LITERALMENTE>");
   }
   ```
3. En cada uno de los cuatro banners, quita el `style="..."` y agrega la clase `bg-noise` al final de la lista de
   clases del mismo `<div>` (`absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-noise`).
4. Ejecuta `pnpm build` y confirma en `dist/css/output.css` que `.bg-noise` contiene la misma cadena base64 (compara
   los primeros 60 caracteres y la longitud).
5. Resultado esperado: **0** `style="` en el marcado de los 6 HTML.
6. Los `style` que JavaScript asigna en tiempo de ejecución (`document.body.style.overflow`, `style.setProperty` del
   carrusel) **no** son marcado y quedan fuera de esta tarea; solo menciónalos en la bitácora.

### Tarea 3: DT-05 — Botones sociales del footer de `404.html`

En el footer de `404.html`, Instagram, Facebook y WhatsApp tienen `hidden lg:flex` y quedan invisibles en móvil. En las
demás páginas se ven siempre. Deja la clase de los tres enlaces idéntica a la de `contacto.html`:

```
w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-all
```

Corrige también la sangría desalineada de ese bloque (solo espacios en blanco). No toques los `<svg>`.

### Tarea 3b: DT-14 — 404 sin estilos en rutas con subcarpeta

**Origen:** el desarrollador confirmó el 13-10-2026 en producción que `/servicios/xyz` muestra la 404 **sin estilos ni
logotipo**. Causa (por código): `404.html` tiene 23 referencias `./` (favicon, `./dist/css/output.css`, logotipos,
`./src/js/main.js` y los enlaces del header y del footer). Cloudflare Pages sirve esa misma página para cualquier ruta
inexistente y el navegador resuelve `./` contra la subcarpeta de la URL pedida (`/servicios/dist/css/output.css`, que no
existe). Decisión del desarrollador: corregirlo en esta iteración y no esperar a la Épica 08.

**Alcance (solo el `<head>` de `404.html`):** `<meta charset>` y `<base href="/"/>` deben quedar como las **dos primeras
etiquetas del `<head>`**, en ese orden, antes del `<link rel="icon">` y de cualquier otro elemento con URL. Es solo un
cambio de orden (se mueve la línea de `<meta charset>`) más la línea nueva de `<base>`: **no cambia ningún otro
contenido ni clase.** No toques los otros cinco HTML.

```html
<head>
    <meta charset="utf-8"/>
    <base href="/"/>
    <title>Página no encontrada - La Jardinera Florería</title>
    <!-- … resto del <head> en su orden actual (description, robots, favicon, viewport, fuentes, CSS) … -->
```

**Justificación:** resuelve todas las rutas `./` desde la raíz del sitio, mantiene la regla de rutas relativas
(`AGENTS.md` §5.8) y conserva la paridad exacta de header y footer con las demás páginas (no hay que cambiar ni una
ruta del marcado). Al ir antes de todo elemento con URL, el `<base>` alcanza también al favicon: hoy, en `404.html`, el
`<link rel="icon">` está en la línea 9, **antes** de `<meta charset>` (línea 10), y la especificación de HTML pide que
`<base>` preceda a todo elemento con atributos de URL.

**Alcance respecto de DT-17 (decisión del desarrollador, 13-10-2026):** el reordenamiento cubre DT-17 **solo en
`404.html`**. Las otras 5 páginas conservan su `<head>` actual y se corrigen en la Épica 08 · Iteración 02. DT-17 no se
marca como resuelta en esta iteración.

**Comprobaciones:**

1. **Marcado.** `404.html` no contiene `href="#` (hoy hay 0; las anclas se resolverían contra la raíz). Hay exactamente
   un `<meta charset` y un `<base`, y son los **dos primeros hijos** de `<head>`, en ese orden; ningún `<link>` ni
   `<script>` los precede. En el `git diff` de `404.html`, el hunk del `<head>` muestra solo la línea de `<meta charset>`
   movida y la línea nueva de `<base>` (1 eliminada y 2 agregadas), sin otros cambios en el `<head>`. Los otros cinco
   HTML, sin cambios por esta tarea.
2. **Simulación local de Cloudflare.** Con `pnpm run build:cf`, sirve `_site/` con un servidor temporal de Node o Python
   (script fuera del repositorio, en el scratchpad; no lo dejes en el proyecto) que responda `404.html` **con estado
   404** para cualquier ruta inexistente. Desde `/a/b/xyz`, comprueba que el CSS, **el favicon**, los logotipos,
   `main.js` y los módulos que este importa, y los enlaces del header y del footer resuelven a URLs **de la raíz** (por
   ejemplo `/dist/css/output.css`, `/public/logos/la-jardinera-original.png`, `/src/js/main.js`) y que cada recurso
   responde **200**. Repite desde un primer nivel (`/xyz`) y desde una ruta de tres niveles. Entrega la tabla recurso ×
   URL resuelta × estado, con el favicon en fila propia. Nota: el servidor simulado no reproduce el redireccionamiento
   308 de `/pagina.html` a `/pagina` de Cloudflare; los enlaces `./index.html` del header resolverán a `/index.html`, y
   en producción Cloudflare los redirige.
3. **Render real** de `/a/b/xyz` en 360×740 y 1280×800, en modo claro y oscuro, solo si dispones de un navegador
   controlable (no instales nada): estilos aplicados, logotipo visible, header y footer completos, consola sin errores, y
   **la solicitud del favicon dirigida a la raíz** (`/public/logos/la-jardinera-original.png`, en el registro de red o
   en la pestaña). Si no, deja el ítem como `🕒 PENDIENTE` con esta lista manual:
    * [ ] Abrir `http://localhost:<puerto>/a/b/xyz` (servidor de la simulación) en 360×740 y 1280×800.
    * [ ] Confirmar estilos, logotipo, header, footer y botones sociales visibles.
    * [ ] Confirmar que la pestaña muestra el favicon y que su solicitud apunta a la raíz.
    * [ ] Repetir en modo oscuro y revisar la consola.
4. **Orden final del `<head>`.** Copia en la bitácora de esta iteración la lista de etiquetas del `<head>` de
   `404.html`, en su orden final (tipo y atributo identificador de cada una), para dejar constancia del cambio.
5. **Producción (acción del desarrollador, tras el despliegue).** Abrir `https://www.lajardinerafloreria.cl/servicios/xyz`
   y confirmar que se ve con estilos, logotipo, header y footer, que la pestaña muestra el favicon y que sus enlaces
   llevan a la raíz del sitio. El agente la registra como `🕒 PENDIENTE` hasta recibir la confirmación.

### Tarea 4: DT-13 — Ícono de Facebook ilegible en modo oscuro (6 páginas)

El segundo `<path>` del ícono de Facebook del footer tiene `fill="#edefe9"` fijo. Ese valor coincide con el fondo del
botón solo en modo claro. En modo oscuro el botón es `#333A36` y el círculo es `#BFC5BE`, así que la "f" queda casi
blanca sobre gris claro (contraste **1,52:1**; con la corrección, 6,64:1).

1. En los 6 footers, en ese segundo `<path>` (el que empieza con `d="m177.825 165l5.675-37H148..."`), reemplaza
   `fill="#edefe9"` por `class="fill-surface-container"`. No toques el primer `<path>` ni ningún otro atributo.
2. Confirma tras `pnpm build` que `dist/css/output.css` contiene `.fill-surface-container` con
   `fill: rgb(var(--color-surface-container))`.
3. Agrega a la tabla del §12 de `_planificacion/README.md` la fila DT-13 ya como ✅ resuelta:
   `| DT-13 | Ícono de Facebook del footer: segundo path con fill="#edefe9" fijo; en modo oscuro la "f" tenía 1,52:1 de contraste. | Media | Épica 07 · It. 03 |`

### Tarea 5: DT-07 — "Redbank" en la franja de beneficios del Inicio (condicional)

En `index.html`, el texto dice "Redbank, efectivo y transferencias bancarias". En Chile la red se escribe **Redbanc**.
Es texto comercial de la florería: **no lo cambies por tu cuenta.** Repórtalo con su ubicación exacta y espera a que el
desarrollador confirme en el chat. Si lo confirma, cambia únicamente esa palabra.

> **Confirmado por el desarrollador el 13-10-2026: corregir a 'Redbanc'.** No vuelvas a preguntar; aplica el cambio de
> esa única palabra y repórtalo con su ubicación exacta.

### Tarea 6: DT-02 — Certificación de H8 (barra de escritorio entre 1024 y 1279 px)

**Verificación estática (siempre):**

1. En los 6 HTML, cada uno de los 5 enlaces de `<nav aria-label="Navegación principal">` contiene
   `px-2.5 xl:px-4`, `tracking-[0.1em] xl:tracking-[0.16em]` y un subrayado con `left-2.5 right-2.5 xl:left-4
   xl:right-4`; y el contenedor del clúster de acciones contiene `gap-2 lg:gap-2 xl:gap-space-3`. Entrega la matriz
   archivo × patrón con conteos reales.
2. Confirma que las utilidades correspondientes existen en `dist/css/output.css` (`.px-2\.5`, `.xl\:px-4`,
   `.tracking-\[0\.1em\]`, `.xl\:tracking-\[0\.16em\]`, `.left-2\.5`, `.xl\:left-4`, `.lg\:gap-2`, `.xl\:gap-space-3`).

**Verificación en render real (solo si dispones de un navegador controlable; no instales nada):**

Para cada una de las 6 páginas, en modo claro y oscuro, en los anchos 1024, 1040, 1060, 1080, 1099, 1100, 1180, 1279,
1280 y 1440 px:

| Medición                                                        | Resultado esperado                                              |
|:----------------------------------------------------------------|:----------------------------------------------------------------|
| Altura del enlace "Suscripción Floral"                          | 40 px (una línea). 56 px significa que se partió en dos líneas. |
| Líneas del texto de marca "La Jardinera"                        | 1                                                               |
| Solapamiento entre marca, navegación y clúster de acciones      | 0 px                                                            |
| `documentElement.scrollWidth` frente a `clientWidth`            | Iguales (sin scroll horizontal)                                 |

Valores computados esperados para comprobar que desde 1280 px el diseño original está restaurado:

| Propiedad                                  | 1024–1279 px | ≥ 1280 px |
|:-------------------------------------------|:-------------|:----------|
| `padding-left` de cada enlace del nav       | 10 px        | 16 px     |
| `letter-spacing` de cada enlace del nav     | 1,2 px       | 1,92 px   |
| `gap` del clúster de acciones               | 8 px         | 24 px     |

Si **algún** ancho entre 1024 y 1279 px parte el texto o solapa elementos, no lo corrijas: repórtalo con el ancho, la
página y el tema, y propón (sin aplicar) la compactación adicional.

Si no dispones de navegador, deja esta parte como `🕒 PENDIENTE` y entrega esta lista manual:

* [ ] En cada una de las 6 páginas, achicar la ventana entre 1024 y 1279 px (arrastrando lentamente) y confirmar que
  "Suscripción Floral" nunca se parte en dos líneas.
* [ ] Confirmar que a 1280 px el header luce igual que antes.
* [ ] Repetir en modo oscuro.
* [ ] Confirmar que no aparece scroll horizontal.

### Tarea 7: Hallazgos a reportar sin corregir

1. Resuelto en la Épica 01 · Iteración 08: el Hero usa `<img fetchpriority="high">` dentro de `<picture>`. Aquí solo
   se registra como cerrado; no hay nada que hacer.
2. DT-06: los footers tienen dos variantes de contenedor y el enlace activo pierde `font-body-sm text-body-sm`. Se
   resuelve en la Épica 08 · Iteración 03 (migración a Astro), cuando el footer sea un solo componente.

### Tarea 8: Registro

1. Crea `_planificacion/04-bitacora/bitacora-epica-07/bitacora-iteracion-03.md` con la plantilla del §8.2, con una tabla
   de estado por deuda (DT-01, DT-03, DT-05, DT-13, DT-07, DT-14, DT-02) y su evidencia. La evidencia de DT-03 es "4
   `style=` resueltos en esta iteración; el del Hero se resolvió en la Épica 01 · Iteración 08". La de DT-14 distingue
   la simulación local (Tarea 3b, comprobaciones 1 a 3) de la verificación en producción, que sigue 🕒 PENDIENTE hasta
   que el desarrollador la confirme. La bitácora incluye además el orden final del `<head>` de `404.html` (Tarea 3b,
   comprobación 4) y una fila de DT-17 limitada a `404.html`.
2. En la tabla del §12 de `_planificacion/README.md`, marca como ✅ resueltas solo las que tengan evidencia. DT-02 solo
   pasa a ✅ si la verificación en render real se ejecutó de verdad. DT-14 solo pasa a ✅ cuando la simulación local se
   ejecutó de verdad y el desarrollador confirmó `/servicios/xyz` en producción; hasta entonces se deja con su estado
   actual y la nota "corregida en código; pendiente de verificación en producción".
3. Agrega la línea a `_planificacion/04-bitacora/estado-actual.md`. Si H8 se certificó, agrégala como "Épica 06 -
   Iteración 13: certificada en render real (ver Épica 07 · Iteración 03)"; si no, no la des por cerrada.
4. Entrega el mensaje de commit sugerido, separado por tarea si corresponde.

## 3. Auditoría de No-Regresión e Invariantes

* Archivos modificables: los 6 HTML (solo lo descrito), `src/css/input.css` (solo el bloque de la Tarea 2),
  `dist/css/output.css` (regenerado), la tabla §12 y los registros de bitácora.
* **Paridad de header y footer:** tras la Tarea 4, los 6 footers difieren entre sí solo en el enlace activo (y en las
  variantes ya conocidas de DT-06).
* Invariantes por búsqueda de texto: 0 `style="` en el marcado, 0 `onclick`, 0 `href="#"` en la navegación y el footer,
  IDs únicos, ningún descendiente de `<header>` con la clase `fixed`.
* Cero comandos Git que escriban en el repositorio.

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Footer de Servicios sin Texto Suelto**
    * **Dado** `servicios.html`
    * **Cuando** se carga en el navegador y se mira el pie de página
    * **Entonces** la marca "La Jardinera" es un enlace a `./index.html` con la misma apariencia que en las demás
      páginas, y no aparece código como texto.
* **Escenario 2: Cero Estilos en Línea**
    * **Dado** los 6 HTML
    * **Cuando** se busca `style="` en el marcado
    * **Entonces** hay 0 ocurrencias; la textura de los banners se ve idéntica a antes (misma cadena base64) y el Hero
      se mantiene como lo dejó la Épica 01 · Iteración 08.
* **Escenario 3: Redes Sociales en la 404**
    * **Dado** `404.html` en un viewport móvil
    * **Cuando** se llega al footer
    * **Entonces** se ven los tres botones sociales, igual que en las otras páginas.
* **Escenario 4: Ícono de Facebook Legible**
    * **Dado** cualquier página en modo oscuro
    * **Cuando** se observa el footer
    * **Entonces** la "f" es oscura sobre el círculo claro (contraste 6,64:1) y en modo claro se ve exactamente igual
      que antes.
* **Escenario 5: H8 con Evidencia**
    * **Dado** las 6 páginas entre 1024 y 1279 px
    * **Cuando** se mide en un navegador real
    * **Entonces** "Suscripción Floral" ocupa una sola línea en todos los anchos y temas, o el hallazgo queda
      reportado con su ancho exacto; sin navegador, el ítem figura como `🕒 PENDIENTE` con su lista manual.
* **Escenario 6: Honestidad del Reporte**
    * **Dado** la bitácora
    * **Cuando** se lee
    * **Entonces** DT-07 aparece como "a la espera de confirmación" si no se aplicó, y ninguna medición de render se
      presenta como ✅ sin haberse ejecutado.
* **Escenario 7: 404 en ruta con subcarpeta**
    * **Dado** `/servicios/xyz` en producción
    * **Cuando** se abre
    * **Entonces** se ve con estilos, logotipo, header y footer, y sus enlaces llevan a la raíz del sitio. El favicon
      también se carga desde la raíz.