# Iteración 08: Certificación Transversal y Paso a Producción

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Cierre de la épica. No se agrega ni se cambia nada del sitio: se demuestra con evidencia que la versión Astro es
equivalente (o mejor, en lo planificado) a la línea base de la Iteración 01, se dejan los documentos al día y el
desarrollador fusiona a `main`. Cualquier defecto encontrado aquí se reporta; si bloquea, se abre una iteración de
corrección numerada a continuación.

**Autorización explícita de esta iteración:** registros de `_planificacion/` y propuestas de edición para los
documentos protegidos. Sin cambios en `src/`, `public/` ni configuración.

## 1. Objetivo de la Iteración

Certificar paridad visual, funcional, de rendimiento y de despliegue, y pasar a producción con un plan de reversión.

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 1: Auditoría estática de `_site/`

1. `scripts/comparar-con-referencia.mjs` contra `referencia/`: solo las diferencias planificadas (rutas, `<head>` de la
   It. 05, variante de footer de la It. 03, script de tema de la It. 07 si se aprobó).
2. Invariantes: 0 `style="`, 0 `onclick`, 0 `<style>`, scripts en línea solo los aprobados (tema de la It. 07 y JSON-LD de la It. 05, si se ejecutaron), IDs únicos por página, 0
   `href="#"` en navegación y footer, 0 referencias a `./public/` en `src/`.
3. Rastreo de enlaces internos y recursos de las 6 páginas: todos responden 200 en `pnpm preview`.
4. Tamaños: ningún archivo sobre 25 MiB; menos de 20 000 archivos.
5. Exclusión: `_site/` no contiene `_planificacion/`, `src/`, `.md` ni archivos de configuración.

### Tarea 2: Render real

Las 6 páginas en 320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768 y 1280×800, en modo claro y oscuro, comparadas
con `referencia/capturas/`. Flujos: menú móvil, modales de Servicios, selección de plan en Suscripción (lleva a Contacto
con el servicio precargado), *lightbox* con imágenes y videos, carrusel de reseñas, formulario de contacto, cambio de
tema y 404 anidada. Sin navegador automatizable, `🕒 PENDIENTE` con lista manual.

### Tarea 3: Rendimiento (desarrollador)

Lighthouse móvil y escritorio de las 6 páginas: el sitio actual (producción) y el nuevo (vista previa de Cloudflare de
la rama) en la misma sesión, 3 corridas por página y modo. Criterio: el de Lighthouse de `definicion-epica.md` §8
(medianas; Performance no más de 10 puntos por debajo en móvil ni de 3 en escritorio; Accesibilidad, Best Practices y
SEO no menores que la referencia; CLS mediano ≤ 0,1 y no mayor que el de referencia más 0,01; LCP sin umbral; 404 en
`/a/b/inexistente`). La línea base del 16-10-2026 (bitácora de la It. 01, §9) es histórica y no es la referencia.

**Observación heredada de la It. 04 (404 de `rum`).** En la consola de la vista previa de Cloudflare de la rama aparece
un mensaje en rojo repetido en las 6 páginas: 4 peticiones `rum` con estado 404 (2 XHR y 2 ping) iniciadas por
`beacon.min.js`, el script de Real User Measurement y Web Analytics que inyecta Cloudflare (el repositorio no lo
contiene). Antes de la fusión a `main`, el desarrollador:

1. Revisa si el mismo mensaje aparece en la consola de producción (`lajardinerafloreria.cl`) y anota el resultado.
2. Registra la URL completa de la petición `rum` (pestaña Red) y compara el Best Practices de producción y de la vista
   previa en las corridas de esta tarea.
3. Si el mensaje existe solo en la vista previa o baja el Best Practices frente a la referencia, se registra como
   deuda técnica con destino en la Épica 10 y se informa en la bitácora; si aparece también en producción, se anota
   como comportamiento externo al código y no cuenta como incumplimiento del DoD.

### Tarea 4: Documentación

1. Verifica que el desarrollador aplicó las propuestas de `propuestas-documentos-protegidos.md` (`AGENTS.md`,
   `README.md`, `stack-tecnologico.md`, `proposito-y-alcance.md`) y que reflejan lo que de verdad se implementó.
2. Entrega propuestas de edición para `DESIGN.md` si algún apartado menciona rutas de archivos HTML o de `dist/css/`.
3. Actualiza `_planificacion/README.md` §6 (reglas de acero) y §7 (verificación: `pnpm run build:cf` en vez de
   `pnpm build` + `output.css`).

### Tarea 5: Paso a producción (desarrollador)

1. Fusión de `feat/migracion-astro` a `main`.
2. Revisar el log de Cloudflare (versión de Node, compilación sin errores).
3. En producción: las 6 páginas, `/public/images/...` → 301, `/robots.txt`, `/sitemap.xml`, 404 anidada.
4. **Reversión:** si algo falla, *Rollback* al despliegue anterior en el panel de Cloudflare Pages y `git revert` del
   *merge*.
5. Acciones de Search Console de la It. 05.

### Tarea 6: Registro

Bitácora, línea de cierre de épica en `estado-actual.md`, `decisiones-tecnicas.md` (ADR-001 → "Implementada") y commit
sugerido `Épica 08 - Iteración 08: Certifica y cierra la Épica 08 (migración a Astro).`

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Paridad certificada**
    * **Dado** la referencia de la It. 01
    * **Cuando** se compara con la producción nueva
    * **Entonces** solo aparecen las diferencias planificadas, en los 7 viewports y ambos temas.
* **Escenario 2: Rendimiento**
    * **Dado** Lighthouse de las 6 páginas, en móvil y escritorio, del sitio actual y del nuevo medidos en la misma
      sesión (3 corridas por página y modo)
    * **Cuando** se comparan las medianas
    * **Entonces** se cumple el criterio de Lighthouse de `definicion-epica.md` §8.
* **Escenario 3: Despliegue sin cambios de configuración**
    * **Dado** el panel de Cloudflare Pages
    * **Cuando** se revisa
    * **Entonces** el comando sigue siendo `pnpm run build:cf` y la salida `_site`.
* **Escenario 4: Documentación al día**
    * **Dado** `AGENTS.md` y `stack-tecnologico.md`
    * **Cuando** un agente nuevo los lee
    * **Entonces** describen el stack Astro real, sin menciones vigentes a seis HTML en la raíz ni a `dist/css/output.css`.
