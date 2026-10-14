# Iteración 01: ADR-001, Documentos Protegidos y Línea Base de Referencia

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Esta iteración **no instala nada ni cambia código del sitio**. Deja tres cosas listas para migrar con seguridad: la
decisión de arquitectura escrita y aprobada, los documentos protegidos alineados con esa decisión (los edita el
desarrollador) y una **instantánea de referencia** del sitio actual contra la cual se medirá la paridad en todas las
iteraciones siguientes.

Fuente de la verdad: `definicion-epica.md` de esta épica (§2 auditoría, §4 decisiones D1 a D9) y
`propuestas-documentos-protegidos.md`.

**Alcance:** `_planificacion/04-bitacora/decisiones-tecnicas.md`, `_planificacion/README.md` (§12 y §13),
`scripts/instantanea-referencia.mjs` (nuevo) y `referencia/` (nueva, fuera de Git). Sin tocar los 6 HTML, `src/`,
`package.json`, `tailwind.config.js` ni los documentos raíz.

**Autorización explícita de esta iteración:** creación de `scripts/instantanea-referencia.mjs` y edición de los
registros indicados. `.gitignore` solo para agregar `referencia/`.

## 1. Objetivo de la Iteración

Que la migración tenga una decisión aprobada, reglas escritas coherentes con ella y una línea base medible: el DOM, las
capturas y el Lighthouse de las 6 páginas tal como están hoy en `main`.

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Precondiciones (solo lectura)

1. Confirma en `estado-actual.md` que la Épica 07 · Iteraciones 02 y 03 están cerradas. Si no, **detente**: migrar con
   deuda de marcado abierta la copiaría a los componentes.
2. `git status` limpio y rama actual. Si no estás en `feat/migracion-astro`, repórtalo; la rama la crea el desarrollador.
3. Registra versiones: `node -v`, `pnpm -v`.

### Tarea 1: ADR-001

Agrega al final de `decisiones-tecnicas.md` una sección `## ADR-001 — Migración estructural a Astro (Épica 08)` con:

* **Contexto:** header y footer duplicados en 6 HTML; costo demostrado en la Fase 2 de la Épica 06.
* **Decisión:** D1 a D9 de `definicion-epica.md` §4, con la versión exacta de Astro que se instalará en la It. 02.
* **Alternativas descartadas:** Vite + React con *prerender* propio (plan anterior de la Épica 08), React en el cliente
  y Tailwind 4 en esta épica. Una línea de motivo para cada una.
* **Consecuencias:** cambia el stack declarado; `stage-site.mjs` y `dist/` se retiran; las rutas pasan de `./` a `/`.
* **Estado:** "Propuesta" hasta que el desarrollador la apruebe en el chat; entonces "Aprobada (DD-MM-AAAA)".

### Tarea 2: Documentos protegidos

Entrega en tu reporte las propuestas de `propuestas-documentos-protegidos.md` en el formato de `AGENTS.md` §2. **No las
apliques.** La Iteración 02 no empieza hasta que el desarrollador confirme que aplicó, como mínimo, las de `AGENTS.md`
§4 y §5 (sin ellas, la It. 02 violaría las reglas vigentes).

### Tarea 3: Instantánea de referencia

1. Ejecuta `pnpm run build:cf` para obtener `_site/` del estado actual y cópialo a `referencia/sitio/` (fuera de Git:
   agrega `referencia/` a `.gitignore`).
2. Crea `scripts/instantanea-referencia.mjs` (Node, sin dependencias nuevas) que recorra `referencia/sitio/*.html` y
   genere `referencia/inventario.json` con, por página: `<title>`, metas, cantidad de elementos por etiqueta, lista de
   IDs, lista de `href` y `src`, y el texto visible normalizado (espacios colapsados). Este inventario es el que la It. 02
   compara contra la salida de Astro.
3. Si dispones de navegador automatizable: capturas de las 6 páginas en los 7 viewports de `AGENTS.md` §7, modo claro y
   oscuro, en `referencia/capturas/`. Si no, deja el ítem `🕒 PENDIENTE` con la lista manual.
4. **Desarrollador:** Lighthouse (móvil y escritorio) de las 6 páginas en producción; registrar Performance,
   Accessibility, Best Practices, SEO, LCP y CLS en la bitácora.
5. **Desarrollador:** confirmar A-02 abriendo `https://www.lajardinerafloreria.cl/a/b/inexistente`. Si la 404 se ve sin
   estilos, el hallazgo queda confirmado.

### Tarea 4: Registro

1. Bitácora `bitacora-epica-08/bitacora-iteracion-01.md` con la plantilla del §8.2 de `_planificacion/README.md`.
2. En `_planificacion/README.md` §12: DT-14 a DT-17 (hallazgos A-02, A-05, A-06 y A-07) ya se registraron al
   planificar la épica. Si la Tarea 3.5 confirma o descarta DT-14 en producción, anótalo en su fila.
3. Línea en `estado-actual.md`.

## 3. Auditoría de No-Regresión e Invariantes

* `git diff --stat` solo muestra `decisiones-tecnicas.md`, `_planificacion/README.md`, `estado-actual.md`, la bitácora,
  `.gitignore` y `scripts/instantanea-referencia.mjs`.
* Los 6 HTML, `src/` y la configuración, sin cambios.

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Decisión trazable**
    * **Dado** `decisiones-tecnicas.md`
    * **Cuando** se lee el ADR-001
    * **Entonces** contiene contexto, decisión D1–D9 con versión exacta, alternativas descartadas y estado.
* **Escenario 2: Reglas coherentes**
    * **Dado** `AGENTS.md`
    * **Cuando** el desarrollador aplica las propuestas
    * **Entonces** §4 declara Astro en el stack y §5 permite archivos `.astro` y rutas absolutas, sin contradicciones
      con `stack-tecnologico.md`.
* **Escenario 3: Línea base medible**
    * **Dado** `referencia/inventario.json`
    * **Cuando** se abre
    * **Entonces** tiene una entrada por cada una de las 6 páginas con IDs, enlaces, recursos y texto visible.
* **Escenario 4: Honestidad**
    * **Dado** la bitácora
    * **Cuando** se revisan capturas y Lighthouse
    * **Entonces** lo no ejecutado figura como `🕒 PENDIENTE`, sin cifras inventadas.
