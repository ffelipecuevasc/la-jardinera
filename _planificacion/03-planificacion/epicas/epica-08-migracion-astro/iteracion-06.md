# Iteración 06 (Opcional): Componentes de Sección Repetidos

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Iteración **opcional**: el objetivo de la épica ("migrar solo la estructura") se cumple sin ella. Se ejecuta solo si el
desarrollador la aprueba. Extrae a componentes únicamente los bloques que hoy están **repetidos** en dos o más páginas,
sin cambiar su aspecto. Un bloque que aparece en una sola página se queda en su página.

**Autorización explícita de esta iteración:** creación de componentes en `src/components/secciones/` y edición de las
páginas que los usen. `src/css/input.css` solo si hace falta mover una clase existente (sin cambiar sus valores).

## 1. Objetivo de la Iteración

Eliminar duplicación de marcado en secciones, con salida idéntica a la de la It. 05.

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Inventario de candidatos (solo lectura)

Detecta bloques repetidos comparando secciones con espacios normalizados. Candidatos conocidos al planificar:

| Bloque                                                   | Páginas                                     |
|:---------------------------------------------------------|:--------------------------------------------|
| Banner con textura de ruido fractal (`.bg-noise`, DT-03) | Inicio, Servicios, Suscripción, Galería     |
| Franja de beneficios operativos                          | Galería, Suscripción (y la del Inicio, por confirmar si es igual) |

Entrega la tabla con el grado de similitud y las diferencias reales (textos, íconos, clases). **Espera la aprobación**
de qué bloques extraer.

### Tarea 1: Componentes aprobados

1. Cada componente recibe como propiedades **solo** lo que de verdad varía entre páginas (por ejemplo, título y texto).
   Si las diferencias son de estructura, no se extrae: se reporta.
2. Clases literales; nada de clases armadas.

### Tarea 2: Verificación y registro

`scripts/comparar-con-referencia.mjs` contra la salida de la It. 05: 0 diferencias. Bitácora, `estado-actual.md` y commit
sugerido `Épica 08 - Iteración 06: Extrae los bloques repetidos a componentes Astro.`

### Tarea 3 (OPCIONAL): Carga diferida de los videos de la Galería

> **Opcional dentro de una iteración opcional.** No bloquea la certificación de la iteración ni de la épica. Se ejecuta
> solo si el desarrollador la aprueba, después de las Tareas 0 a 2.

**Antecedente:** `galeria.html` tiene 10 `<video>` con `autoplay loop muted playsinline`, sin `preload` ni `loading`; al
cargar la página se descargan unos **48,7 MB**. Los tres más grandes son `nmg2.mp4` (22,7 MB), `nmg5.mp4` (8,1 MB) y
`ddm2.mp4` (4,9 MB). Origen: diagnóstico de la Épica 07
([bitacora-cierre-epica-07.md](../../../04-bitacora/bitacora-epica-07/bitacora-cierre-epica-07.md) §3). Los
`net::ERR_ABORTED` que Chrome muestra en esas solicitudes son comportamiento normal del navegador, no un defecto, y no
son el motivo de esta tarea.

**Objetivo:** reducir la descarga inicial de la Galería sin cambiar su apariencia ni su comportamiento visible (los videos
siguen reproduciéndose solos al entrar en pantalla).

**Restricciones:**

1. Cero JS y CSS en línea. El `IntersectionObserver` existente (`initGridVideoObserver`, en
   `src/js/modules/gallery.js`) se mantiene en un módulo ES con `initX()` y cláusula de guarda.
2. Clases de Tailwind siempre literales.
3. `preload="none"` más `poster`, **solo si** el póster ya existe en `public/images/` o se genera como `.webp` con
   `width`, `height` y `alt` descriptivo. Si no hay póster, no se agrega `preload="none"` (el cuadro quedaría vacío).
4. No se recomprimen ni se reemplazan los videos en esta tarea.

**Criterios de aceptación:**

* Bytes de video transferidos en la carga inicial, **antes y después**, medidos en render real (sin inventar cifras).
* Los videos se reproducen al entrar en pantalla.
* CLS = 0.
* Consola sin errores.
* Sin cambios visibles en la Galería.

**Aviso:** si el Hero o el comportamiento de reproducción cambian de forma visible, la tarea se **descarta** y se deja
registrado en la bitácora.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Salida idéntica**
    * **Dado** la salida previa a la iteración
    * **Cuando** se compara con la nueva
    * **Entonces** no hay diferencias en el DOM de ninguna página.
* **Escenario 2: Sin abstracción forzada**
    * **Dado** los componentes creados
    * **Cuando** se revisan sus propiedades
    * **Entonces** ninguno tiene propiedades que cambien su estructura o sus clases.
