# Iteración 02: Titular Starlight del Hero

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
El desarrollador recibió el efecto Starlight (`DESIGN.md` §7) y el `src/css/input.css` actualizado, y pudo haberlos
aplicado ya, total o parcialmente. **Tu primera tarea es averiguar en qué estado está el repositorio**, no asumirlo.
Según el resultado, verificas o implementas. El objetivo final es el mismo: el `<h1>` del Hero de `index.html` con el
efecto `fx-starlight`, sin rastro del resaltador anterior `fx-marker`, certificado con evidencia.

**Alcance estricto:** solo `index.html` (únicamente el `<h1>` del Hero) y `src/css/input.css` (únicamente las variables
del efecto, el bloque `fx-starlight` y el retiro de `fx-marker`). `DESIGN.md` ya documenta el efecto en §7: es solo
lectura. Si la implementación real difiere de lo que dice, entrega una propuesta de edición; no lo modifiques.

**Autorización explícita de esta iteración:** edición de `index.html` y `src/css/input.css` en lo descrito arriba.

## 1. Objetivo de la Iteración

Reemplazar el resaltador del titular por un efecto de constelación: tres campos de destellos titilan sobre el relleno de
las letras mientras un brillo lineal recorre el texto. El efecto debe conservar la tipografía y la jerarquía del
sistema (Noto Serif 600 redonda para "Florería", 400 cursiva para "La Jardinera"), escalar con el tamaño del titular y
degradarse con elegancia (sin soporte de `background-clip: text`, con movimiento reducido y en alto contraste forzado).

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Diagnóstico de estado (solo lectura)

Busca, sin distinguir mayúsculas, en `index.html`, `src/css/input.css` y `dist/css/output.css` las cadenas
`fx-marker`, `fx-starlight`, `--ink-2` y `--star`. Entrega una tabla de estado y clasifica el caso:

| Caso | Situación                                                                 | Qué haces                                          |
|:-----|:--------------------------------------------------------------------------|:---------------------------------------------------|
| A    | Marcado y CSS ya aplicados, sin `fx-marker`                                | Solo verificas (Tareas 3 a 6).                      |
| B    | Aplicado a medias (por ejemplo CSS nuevo pero `fx-marker` todavía en HTML) | Completas lo que falta y reportas qué faltaba.      |
| C    | Nada aplicado                                                              | Implementas (Tareas 1 y 2) y luego verificas.       |

Si el CSS existente **difiere** del bloque de referencia de la Tarea 2, muestra las diferencias antes de sobrescribir y
espera confirmación.

### Tarea 1: Marcado del titular

En `index.html`, el `<h1>` del Hero debe quedar así (solo cambia el `<span>` interno; las clases del `<h1>` no se
tocan):

```html
<h1 class="font-display-hero text-headline-xl lg:text-display-hero text-neutral-50 font-semibold max-w-4xl tracking-tight leading-none mb-space-4">
    <span class="fx-starlight">Florería <span class="fx-starlight fx-starlight--accent italic font-normal">La Jardinera</span></span>
</h1>
```

El texto accesible del `<h1>` debe seguir siendo exactamente "Florería La Jardinera". No agregues `aria-hidden`, ni
texto duplicado, ni atributos `style`.

### Tarea 2: CSS del efecto

En `src/css/input.css`:

1. **Elimina** la clase `.fx-marker`, su `@keyframes fx-marker`, su bloque de `prefers-reduced-motion` y el comentario
   "TITULAR DEL HERO — RESALTADOR".
2. **Elimina** de `:root` las variables `--ink`, `--ink-2` y `--ink-3` (ya no las usa nadie; verifícalo con una
   búsqueda antes de borrarlas). Conserva `--expo-out`.
3. **Agrega** el bloque siguiente, entre el bloque del carrusel y el del modal de servicio, **idéntico** a este:

```css
/* ========================================================= */
/* TITULAR DEL HERO — CONSTELACIÓN (FX-STARLIGHT)            */
/* Ver DESIGN.md §7                                          */
/*                                                           */
/* Tres campos de destellos titilan sobre el relleno de las  */
/* letras mientras un brillo lineal recorre el titular.      */
/* El Hero es un bloque de contraste fijo (DESIGN.md §3):    */
/* los colores son tokens estáticos leídos con theme(), por  */
/* lo que el efecto se ve igual en modo claro y oscuro.      */
/*                                                           */
/* Tamaños en "em": el efecto escala con el titular (48 px   */
/* en móvil, 64 px desde lg). Cada capa se desplaza          */
/* exactamente un mosaico por ciclo: el bucle no tiene salto. */
/* ========================================================= */

.fx-starlight {
    /* Tokens del efecto: se sobrescriben por variante */
    --ink: theme('colors.neutral-50');
    --ink-3: theme('colors.secondary-container');
    --star: theme('colors.surface-container-lowest');

    /* Respaldo legible para navegadores sin background-clip: text */
    color: var(--ink);
}

/* Variante del nombre en cursiva: invierte los tonos para
   conservar la jerarquía de DESIGN.md §7.3 */
.fx-starlight--accent {
    --ink: theme('colors.secondary-container');
    --ink-3: theme('colors.neutral-50');
}

@supports ((-webkit-background-clip: text) or (background-clip: text)) {
    .fx-starlight {
        color: transparent;
        background:
            radial-gradient(circle at 14% 35%, var(--star) 0 .07em, transparent .086em),
            radial-gradient(circle at 42% 68%, var(--star) 0 .057em, transparent .071em),
            radial-gradient(circle at 75% 24%, var(--star) 0 .079em, transparent .093em),
            linear-gradient(100deg, var(--ink), var(--ink-3), var(--ink));
        background-size: 4.3em 2.15em, 5.35em 2.55em, 6.45em 2.45em, 200% 100%;
        /* background-clip se declara después del atajo "background",
           que de lo contrario lo reiniciaría */
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
        filter: drop-shadow(0 0 .3em color-mix(in srgb, var(--ink-3) 40%, transparent));
        animation: fx-starlight 3.6s linear infinite;
    }
}

/* El span anidado hereda el resplandor del exterior (el filtro
   se aplica a todo el subárbol); duplicarlo lo intensificaría. */
.fx-starlight .fx-starlight {
    filter: none;
}

@keyframes fx-starlight {
    0% {
        background-position: 0 0, 0 0, 0 0, 0% 0;
    }
    100% {
        background-position: 4.3em 0, -5.35em 0, 6.45em 0, 200% 0;
    }
}

/* Movimiento reducido: sin animación y con el brillo igualado al
   color base, para que el titular quede sólido y sin tintes
   parciales. Va después de la variante para ganarle en cascada. */
@media (prefers-reduced-motion: reduce) {
    .fx-starlight {
        --ink-3: var(--ink);
        animation: none;
    }
}

/* Alto contraste forzado: sin fondos ni filtros, texto del sistema. */
@media (forced-colors: active) {
    .fx-starlight {
        color: CanvasText;
        background: none;
        filter: none;
        animation: none;
    }
}
```

### Tarea 3: Compilación

1. Ejecuta `pnpm build`. Sin errores.
2. En `dist/css/output.css` (minificado; busca sin distinguir mayúsculas) confirma que existen: `.fx-starlight`,
   `.fx-starlight--accent`, `@keyframes fx-starlight`, el `@supports`, el `@media (forced-colors:active)` y las
   variables resueltas a `#f8f7f3` (`neutral-50`), `#ffc2c6` (`secondary-container`) y `#fff`
   (`surface-container-lowest`). Confirma que **no** quedan `fx-marker`, ni `theme(` sin resolver.
3. Confirma que `.fx-spotlight` (texto de marca del header) sigue intacto.

### Tarea 4: Verificación de accesibilidad y marcado (código)

1. El `<h1>` tiene el texto accesible "Florería La Jardinera", con un espacio entre ambas palabras.
2. 0 ocurrencias nuevas de `style="` en `index.html` (las existentes son deuda de la Iteración 03; no las toques).
3. Ninguna otra página del sitio contiene `fx-starlight` ni `fx-marker`.

### Tarea 5: Verificación en render real

Solo si tu sesión dispone de un navegador controlable. **No instales nada** y no inventes resultados: si no hay
navegador, marca esta tarea como `🕒 PENDIENTE` y entrega la lista manual de la Tarea 6.

Con `index.html` servido por HTTP, mide en 360×740, 412×915, 768×1024 y 1280×800:

1. El titular se lee completo, sin letras recortadas: revisa especialmente la "J" y la "í" de "Florería", y el vuelo de
   la cursiva de "La Jardinera".
2. "Florería" usa un peso 600 redondo y "La Jardinera" un peso 400 cursivo, con los colores base `neutral-50` y
   `secondary-container` respectivamente.
3. **Sin salto en el bucle:** lee `background-position` al inicio y al completar un ciclo (3,6 s); las cuatro capas deben
   volver a su posición equivalente.
4. **Movimiento reducido** (emulando `prefers-reduced-motion: reduce`): `animation-name` es `none` y el titular es
   sólido, sin gradiente tintado.
5. **Alto contraste forzado** (emulando `forced-colors: active`): el texto usa `CanvasText`, sin fondo ni filtro.
6. Modo claro y modo oscuro: el aspecto es idéntico (el Hero es un bloque de contraste fijo).
7. Consola sin errores ni advertencias.
8. **Costo de pintado:** el efecto anima `background-position`, lo que repinta en cada cuadro. Si puedes registrar una
   traza de rendimiento en un viewport móvil, informa los cuadros por segundo. Si el desempeño es deficiente, **propón**
   (sin implementar) pausar la animación con `IntersectionObserver` desde un módulo nuevo.

### Tarea 6: Registro

1. Crea `_planificacion/04-bitacora/bitacora-epica-07/bitacora-iteracion-02.md` con la plantilla de
   `_planificacion/README.md` §8.2, indicando el caso (A, B o C) detectado en la Tarea 0.
2. Agrega la línea correspondiente a `_planificacion/04-bitacora/estado-actual.md`.
3. Si la Tarea 5 quedó pendiente, incluye esta lista para el desarrollador:
    * [ ] Abrir `index.html` por HTTP y mirar el titular en móvil (360 px) y escritorio (1280 px).
    * [ ] Comprobar que ninguna letra queda cortada y que el bucle no da un salto visible.
    * [ ] Activar "Reducir movimiento" en el sistema operativo y confirmar que el titular queda quieto y sólido.
    * [ ] Alternar modo claro y oscuro: el titular debe verse igual.
    * [ ] Revisar la consola del navegador.

## 3. Auditoría de No-Regresión e Invariantes

* Archivos modificados: solo `index.html`, `src/css/input.css`, `dist/css/output.css` (regenerado) y los registros de
  bitácora.
* Fuera del `<h1>`, el `index.html` no cambia ni un carácter (compáralo con `git diff`, en modo lectura).
* Cero comandos Git que escriban en el repositorio.

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Efecto Presente y Limpio**
    * **Dado** el sitio compilado
    * **Cuando** se carga el Inicio
    * **Entonces** el titular muestra destellos y un brillo que lo recorre, y no queda ninguna referencia a `fx-marker`
      ni a las variables `--ink-2` en el código fuente ni en el CSS compilado.
* **Escenario 2: Jerarquía Tipográfica Intacta**
    * **Dado** el titular con el efecto
    * **Cuando** se inspecciona su estilo computado
    * **Entonces** "Florería" es Noto Serif 600 redonda y "La Jardinera" es Noto Serif 400 cursiva; el efecto no cambia
      familia, tamaño ni espaciado.
* **Escenario 3: Accesibilidad Visual**
    * **Dado** un usuario con movimiento reducido o alto contraste forzado
    * **Cuando** carga el Inicio
    * **Entonces** el titular queda sólido, sin animación y legible, y su texto accesible sigue siendo "Florería La
      Jardinera".
* **Escenario 4: Cero Regresión**
    * **Dado** las otras cinco páginas y el resto del Inicio
    * **Cuando** se comparan con la versión anterior
    * **Entonces** no cambian; el texto de marca del header conserva su efecto `fx-spotlight`; `pnpm build` termina sin
      errores y la consola no registra ninguno.
* **Escenario 5: Honestidad del Reporte**
    * **Dado** la bitácora
    * **Cuando** se lee
    * **Entonces** todo lo no medido en un navegador figura como `🕒 PENDIENTE` con su lista manual, y ninguna cifra de
      rendimiento está estimada.