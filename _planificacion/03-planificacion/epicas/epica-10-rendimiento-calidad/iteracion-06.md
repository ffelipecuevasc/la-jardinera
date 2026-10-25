# Iteración 06: Accesibilidad y Calidad Transversal + Cierre de la Épica

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de editar, lee `AGENTS.md` §5 (reglas 3, 7 y 10), `DESIGN.md` §14,
`src/js/modules/carousel.js`, `index.astro`, `servicios.astro`, `404.astro`, `SiteFooter.astro`, la definición de la
épica y las bitácoras de las Iteraciones 01 a 05. Verifica con `git status` y `git log -1` que estás en la rama de la
épica con las iteraciones anteriores integradas. No inventes decisiones.

**Autorización explícita de esta iteración:** se completa al aprobar la iteración (previsto: `carousel.js`,
`index.astro`, `servicios.astro`, `404.astro`, `SiteFooter.astro`, las bitácoras de la iteración y de cierre, la
definición de la épica —solo estado y casillas del DoD— y `estado-actual.md`). No edites archivos protegidos: sus
cambios van como propuestas -/+ con líneas completas verificadas contra el repositorio. Git es de solo lectura.

---

## 1. Objetivo de la Iteración

1. **DT-24:** quitar el `aria-label` en `<div>` sin `role` de cada reseña (`carousel.js`) y dar nombre accesible a los 4
   enlaces solo de ícono de «Imágenes de nuestros ramos» (Inicio).
2. **DT-25:** orden de encabezados sin saltos en Inicio (`<h1>` → `<h4>`; `<h4>` por reseña), Servicios (`<h1>` →
   `<h3>`) y 404 (`<h1>` → `<h3>` del footer), **sin cambiar el aspecto** (las clases tipográficas se conservan).
3. **Decisiones pendientes:** DT-28 (*beacon* en vistas previas) y DT-31 a DT-33 (D-06 de la épica). DT-33 incluye medir
   el contraste del anillo de foco del botón de cierre de la modal de Servicios.
4. **Cierre formal de la épica:** medición final con el método de D-03 de la épica, DoD, bitácora de cierre y
   propuestas -/+.

### 1.1 Decisiones del desarrollador

| ID | Decisión | Opciones | Estado |
|:---|:---------|:---------|:-------|
| D-01 | Encabezados del footer (`<h3>` en las 6 páginas) | a) Pasar a `<h2>` con las mismas clases. b) Dejarlos y corregir solo los saltos del contenido. | Pendiente de definir |
| D-02 | DT-28 | a) Aceptar como limitación de las vistas previas (en producción da 204). b) Desactivar Web Analytics en vistas previas, si Cloudflare lo permite. | Pendiente de definir |
| D-03 | DT-31, DT-32 y DT-33 | Corregir, aceptar como limitación o trasladar, según la medición de la Tarea 0. | Pendiente de definir |

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Línea base (solo lectura)

1. PageSpeed Insights (D-03 de la épica, §6.1 de la definición) en la vista previa de la rama con la Iteración 05
   integrada, en las 5 páginas: «después» de la It. 05 y auditorías fallidas de Accesibilidad por página, frente a la
   It. 01 [medido].
2. Árbol de encabezados de cada página, incluidas las reseñas inyectadas por `carousel.js`.
3. Contraste del anillo de foco del botón de cierre de la modal (DT-33) en ambos temas.

### Tarea 1: DT-24

Nombres accesibles y ARIA válido, sin cambios visibles.

### Tarea 2: DT-25

Niveles de encabezado según D-01, con las clases tipográficas intactas (render idéntico).

### Tarea 3: DT-31 a DT-33

Según D-03.

### Tarea 4: Verificación de la iteración

1. `pnpm run build:cf` sin errores.
2. Render idéntico en los 7 viewports × 2 temas.
3. Sin puntajes locales (D-03 de la épica): la Accesibilidad de esta iteración se mide en la Tarea 5.2.

### Tarea 5: Cierre formal de la Épica 10

1. Verificación final: `pnpm run build:cf`; 7 viewports × 2 temas; invariantes de `AGENTS.md` §5 y SHA-256 del script
   del tema; todo funcionando junto (carruseles, videos, modales, panel móvil, tema).
2. Medición final con el método de D-03 de la épica (§6.1 de la definición): PageSpeed Insights en la vista previa de la
   rama tras el push de esta iteración, en las 5 páginas, frente a la línea base de la It. 01; y en producción tras la
   fusión, contra las metas de D-01 de la épica (esa corrida la pide el desarrollador al verificar producción).
3. DoD de la épica, casilla por casilla, con evidencia; actualiza su estado.
4. `bitacora-epica-10/bitacora-cierre-epica-10.md` con la estructura de `bitacora-cierre-epica-09.md`, incluidas las
   pruebas manuales del desarrollador como lista de comprobación.
5. Propuestas -/+ con líneas completas verificadas: `_planificacion/README.md` §12 (estado de cada DT), `README.md` §15
   (hoja de ruta), `01-vision/objetivos-y-metricas.md` §2 (D-01 de la épica cambió las metas: umbrales por dispositivo,
   CLS ≤ 0,1, FCP sin umbral y PageSpeed Insights como herramienta), `DESIGN.md` y `AGENTS.md` si alguna iteración lo
   dejó pendiente.
6. Línea final en `estado-actual.md` y mensaje de commit:
   `Épica 10 - Iteración 06: accesibilidad, calidad y cierre de la épica.`

---

## 3. Auditoría de No-Regresión e Invariantes

* Header (regla 7) y script del tema (ADR-003) intactos.
* Ningún cambio visible por los cambios de encabezados o de ARIA.
* Sin JS ni CSS en línea; sin dependencias nuevas.

---

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Accesibilidad**
    * **Entonces** las auditorías de DT-24 y DT-25 pasan en todas las páginas de D-04.
* **Escenario 2: Sin cambios visibles**
    * **Entonces** 7 viewports × 2 temas sin diferencias.
* **Escenario 3: Cierre**
    * **Dado** el DoD de la épica,
    * **Entonces** cada casilla tiene evidencia o una reserva con destino, y existen la bitácora de la iteración, la de
      cierre y las propuestas -/+, sin commits hechos por Claude Code.