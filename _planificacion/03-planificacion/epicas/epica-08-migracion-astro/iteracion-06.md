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

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Salida idéntica**
    * **Dado** la salida previa a la iteración
    * **Cuando** se compara con la nueva
    * **Entonces** no hay diferencias en el DOM de ninguna página.
* **Escenario 2: Sin abstracción forzada**
    * **Dado** los componentes creados
    * **Cuando** se revisan sus propiedades
    * **Entonces** ninguno tiene propiedades que cambien su estructura o sus clases.
