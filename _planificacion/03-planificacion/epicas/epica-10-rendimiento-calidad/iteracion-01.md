# Iteración 01: Línea Base y Diagnóstico de Rendimiento (Solo Lectura)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de empezar, lee `AGENTS.md` §5, `_planificacion/README.md` §7 y §12
(DT-21 a DT-36), `01-vision/objetivos-y-metricas.md`, la definición de esta épica y la bitácora de la Épica 08 ·
It. 01, §9 (diagnóstico anterior y sus hipótesis). Verifica con `git status` y `git log -1` que estás en la rama de la
épica (D-02), creada desde `main@0a59e02`, sin cambios pendientes. No inventes decisiones ni cifras.

**Autorización explícita de esta iteración:** **ningún cambio de código ni de `public/`.** Solo puedes crear la bitácora
de la iteración y agregar una línea al final de `estado-actual.md`. Lighthouse se ejecuta con `pnpm dlx` y versión fija,
sin agregarlo a `package.json`. Chrome solo en modo *headless* con perfil aislado. Git es de solo lectura.

---

## 1. Objetivo de la Iteración

1. Registrar la línea base de la épica con el método de D-03 en las páginas de D-04, en móvil y escritorio.
2. Identificar por página el elemento LCP, el origen de cada desplazamiento de diseño (CLS) y los recursos que más pesan
   o bloquean, para ajustar las Iteraciones 02 a 06 con datos y no con hipótesis.
3. Confirmar o descartar las hipótesis heredadas: DT-27 (prioridad de carga en Suscripción Floral), DT-35 (CLS de 0,074
   en el Inicio móvil) y el peso de las fotos 2 a 4 del carrusel.

### 1.1 Decisiones del desarrollador

| ID | Decisión | Estado |
|:---|:---------|:-------|
| D-01 a D-05 | Ver la definición de la épica, §6. Esta iteración no empieza sin D-02, D-03 y D-04 resueltas. | Pendiente de definir |

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Estado inicial

1. `git status`, `git log -1 --oneline`, `pnpm run build:cf` (código 0, 6 páginas, 114 archivos esperados).
2. Registra el SHA-256 del script del tema con el método de la Épica 08 (`5b490c26…`).

### Tarea 1: Inventario estático [código] [medido]

Por página de D-04, a partir del HTML de `_site/` y de `public/`:

1. Imágenes: ruta, bytes, dimensiones reales, `width`/`height` declarados (y si coinciden en proporción con la real),
   `loading`, `fetchpriority`, si está sobre el pliegue en 360×740 y en 1280×800.
2. Videos: ruta, bytes, atributos (`autoplay`, `loop`, `preload`, `poster`).
3. Recursos que bloquean el renderizado: CSS propio (bytes), hoja de Google Fonts (familias, pesos y estilos pedidos) y
   cualquier otro.
4. JavaScript: bytes de `main.js` y de sus módulos compilados.
5. Imágenes de `public/` que ninguna página usa (solo listarlas).

### Tarea 2: Lighthouse en Chrome *headless* [medido]

1. Contra `pnpm preview` (build de la rama), versión fija de Lighthouse, perfil limpio, 3 corridas por página y
   dispositivo (móvil y escritorio), mediana.
2. Por página: Performance, Accessibility, Best Practices, SEO, FCP, LCP, TBT, CLS, Speed Index y peso total.
3. Por página: elemento LCP (selector y recurso), desglose del LCP (TTFB, retraso de carga, duración de carga, retraso
   de renderizado), elementos que se desplazan (CLS) con su valor, y las auditorías fallidas de Accesibilidad y Best
   Practices.
4. Aclara en la bitácora que estas cifras son de diagnóstico y no se comparan con las de PageSpeed Insights.

### Tarea 3: Hipótesis heredadas

1. **DT-35:** reproduce el CLS móvil del Inicio. Identifica el elemento que se desplaza y su causa. Para aislarla, mide
   en el navegador (sin editar archivos) con y sin las fuentes de Google bloqueadas, y con y sin las fotos 2 a 4 del
   carrusel.
2. **DT-27:** en Suscripción Floral, prioridad y orden de carga de `hero-1` a `hero-4` y del logotipo frente al LCP.
3. **Fotos 2 a 4 del carrusel del Inicio:** en qué momento se descargan y si compiten con el LCP.

### Tarea 4: Diagnóstico priorizado

Tabla única con cada problema encontrado, su página, el ahorro estimado (bytes o ms) con su fuente, y la iteración de la
épica que lo atiende. Si un problema no cabe en ninguna iteración, se reporta como hallazgo; no se agrega alcance.

### Tarea 5: Datos del desarrollador

Deja en la bitácora una tabla vacía para las cifras de PageSpeed Insights que entregará el desarrollador (producción y
vista previa, 3 corridas por página y dispositivo), con la regla de D-03.

### Tarea 6: Registro

1. `bitacora-epica-10/bitacora-iteracion-01.md` (plantilla §8.2), con etiquetas de evidencia en cada cifra.
2. Línea al final de `estado-actual.md` (UTF-8 con BOM, CRLF, sin salto final; verifica bytes antes y después).
3. Bitácora nueva: CRLF, sin BOM.
4. Mensaje de commit sugerido: `Épica 10 - Iteración 01: línea base y diagnóstico de rendimiento.`

---

## 3. Auditoría de No-Regresión e Invariantes

* `git status` al final: solo la bitácora nueva y `estado-actual.md`.
* No se detienen procesos que no inició Claude Code (por ejemplo, un servidor de vista previa ya activo): usa otro
  puerto si hace falta.

---

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Línea base**
    * **Dado** las páginas de D-04,
    * **Cuando** se ejecuta Lighthouse 3 veces por página y dispositivo,
    * **Entonces** la bitácora tiene las medianas de cada métrica y el detalle de cada corrida.
* **Escenario 2: Causas**
    * **Dado** cada página,
    * **Entonces** el elemento LCP y cada desplazamiento de diseño están identificados, o se explica por qué no se pudo.
* **Escenario 3: Hipótesis**
    * **Entonces** DT-27, DT-35 y la carga de las fotos 2 a 4 tienen un resultado [medido]: confirmada, descartada o no
      concluyente.
* **Escenario 4: Sin cambios**
    * **Entonces** no cambió ningún archivo fuera de la bitácora y `estado-actual.md`.