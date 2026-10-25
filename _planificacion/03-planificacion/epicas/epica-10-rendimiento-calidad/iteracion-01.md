# Iteración 01: Línea Base y Diagnóstico de Rendimiento (Solo Lectura)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de empezar, lee `AGENTS.md` §5, `_planificacion/README.md` §7, §8
y §12 (DT-21 a DT-36), `01-vision/objetivos-y-metricas.md`, la definición de esta épica (en especial §2.2, §6 y §6.1) y
la bitácora de la Épica 08 · It. 01, §9 (diagnóstico anterior y sus hipótesis). Verifica con `git status` y
`git log -1` que estás en la rama `feat/rendimiento-calidad`, creada desde `main@def7edb`, sin cambios pendientes. No
inventes decisiones ni cifras.

**Autorización explícita de esta iteración:** **ningún cambio de código ni de `public/`.** Solo puedes crear la
carpeta `_planificacion/04-bitacora/bitacora-epica-10/` con la bitácora de la iteración y la subcarpeta `pagespeed/` con
los JSON de la API, y agregar una línea al final de `estado-actual.md`. Las mediciones de rendimiento son **solo de
PageSpeed Insights** mediante su API oficial (D-03, §6.1 de la definición), con `curl`: sin Lighthouse local y sin
dependencias nuevas. Chrome *headless* con perfil aislado solo si hace falta para inventario de red, sin puntajes (en
esta iteración no debería hacer falta: la lista de peticiones sale del JSON de PageSpeed). Git es de solo lectura.

---

## 1. Objetivo de la Iteración

1. Registrar la línea base de la épica con el método de D-03 en las 5 páginas de D-04, en móvil y escritorio, en
   producción.
2. Identificar por página el elemento LCP y su desglose, el origen de cada desplazamiento de diseño (CLS) y los recursos
   que más pesan o bloquean, para ajustar las Iteraciones 02 a 06 con datos y no con hipótesis.
3. Confirmar o descartar las hipótesis heredadas: DT-27 (prioridad de carga en Suscripción Floral), DT-35 (CLS móvil del
   Inicio), el momento de descarga de las fotos 2 a 4 del carrusel del Inicio y la doble descarga del logotipo
   (definición, §2.2).
4. Medir la distancia a las metas de D-01 por página y dispositivo.

### 1.1 Decisiones del desarrollador

| ID | Decisión | Estado |
|:---|:---------|:-------|
| D-01 | Metas por dispositivo: escritorio ≥ 95, móvil ≥ 85, Accesibilidad 100, Best Practices 100, SEO 100 y CLS ≤ 0,1 en producción; FCP sin umbral. | Decidido (25-10-2026) |
| D-02 | Rama `feat/rendimiento-calidad` desde `main@def7edb`. | Decidido (25-10-2026) |
| D-03 | Solo PageSpeed Insights vía API, ejecutado por Claude Code; JSON crudos en el repositorio; Chrome *headless* solo para red y render. Línea base solo en producción. | Decidido (25-10-2026) |
| D-04 | Las 5 páginas indexables; la 404 queda fuera. | Decidido (25-10-2026) |
| D-05 | DT-30 fuera de la épica (Mantenimiento). | Decidido (25-10-2026) |

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Estado inicial

1. `git status`, `git log -1 --oneline` y `git log -3 --oneline` (el commit de planificación `def7edb` debe estar en la
   historia).
2. `pnpm run build:cf`: código 0, 6 páginas y 114 archivos en `_site/` [medido].
3. SHA-256 del script del tema con el método de la Épica 08 (`5b490c26…`, 717 caracteres) [medido].

### Tarea 1: Inventario estático [código] [medido]

Por página de D-04, a partir del HTML de `_site/` y de `public/`:

1. Imágenes: ruta, bytes, dimensiones reales, `width`/`height` declarados (y si coinciden en proporción con la real),
   `loading`, `fetchpriority` y si está sobre el pliegue en 360×740 y en 1280×800 (por posición en el marcado y las
   clases; el dato de carga real sale de la Tarea 2).
2. Videos: ruta, bytes, atributos (`autoplay`, `loop`, `preload`, `poster`).
3. Recursos que bloquean el renderizado: CSS propio (bytes), hoja de Google Fonts (familias, pesos y estilos pedidos) y
   cualquier otro.
4. JavaScript: bytes del paquete compilado de `main.js` y sus módulos.
5. Imágenes y videos de `public/` que ninguna página usa (solo listarlos).

### Tarea 2: PageSpeed Insights en producción [medido]

1. Protocolo de la definición, §6.1: API v5, 4 categorías, 3 corridas secuenciales por página y dispositivo (30 en
   total), con pausa entre corridas, contra `https://lajardinerafloreria.cl` y sus rutas `/servicios`,
   `/suscripcion-floral`, `/galeria` y `/contacto`.
2. Guarda cada respuesta tal cual en `bitacora-epica-10/pagespeed/it01-produccion-<pagina>-<movil|escritorio>-cN.json`.
   Si usas `PSI_API_KEY`, verifica que la clave no aparezca en ningún archivo guardado ni en la bitácora.
3. Por página y dispositivo, mediana y detalle de cada corrida: Performance, Accessibility, Best Practices, SEO, FCP,
   LCP, TBT, CLS, Speed Index y peso total. Anota también la versión de Lighthouse que informa la API.
4. Por página: elemento LCP (selector y recurso) y su desglose (TTFB, retraso de carga, duración de carga, retraso de
   renderizado); elementos que se desplazan (CLS) con su valor; recursos que bloquean el renderizado con el ahorro que
   estima PageSpeed; auditorías fallidas de Accesibilidad, Best Practices y SEO.
5. Distancia a las metas de D-01 por página y dispositivo (tabla: meta, mediana, brecha).
6. Si la API trae datos de campo (`loadingExperience`), regístralos aparte, sin mezclarlos con los de laboratorio.

### Tarea 3: Hipótesis heredadas [medido]

Con la lista de peticiones (`network-requests`) y las auditorías del JSON:

1. **DT-35:** ¿hay CLS móvil en el Inicio? Elemento que se desplaza, valor y corridas en que aparece. Relaciónalo con
   la llegada de las fuentes o de las imágenes si el JSON lo permite; si no se puede aislar sin editar archivos, márcalo
   «no concluyente» y explica qué faltaría.
2. **DT-27:** en Suscripción Floral, prioridad, orden y momento de descarga de `hero-1` a `hero-4` y del logotipo frente
   al LCP.
3. **Fotos 2 a 4 del carrusel del Inicio:** en qué momento se descargan y si compiten con el LCP, en móvil y escritorio.
4. **Doble descarga del logotipo (definición, §2.2):** ¿se piden ambos PNG (`la-jardinera-original.png` y
   `la-jardinera-blanco.png`) en cada página? Bytes transferidos de cada uno.

Cada hipótesis queda **confirmada**, **descartada** o **no concluyente**, con el JSON de origen.

### Tarea 4: Diagnóstico priorizado

Tabla única con cada problema encontrado, su página, el ahorro estimado (bytes o ms) con su fuente (auditoría y JSON) y
la iteración de la épica que lo atiende (02 a 06). Si un problema no cabe en ninguna iteración, se reporta como
hallazgo; no se agrega alcance. Agrega una sección «Ajustes sugeridos a las Iteraciones 02 a 06» con lo que estos datos
cambien de su plan (por ejemplo, qué imágenes recomprimir primero o si el CLS es por fuentes), como propuesta para el
desarrollador.

### Tarea 5: Registro

1. `bitacora-epica-10/bitacora-iteracion-01.md` (plantilla §8.2), con etiquetas de evidencia en cada cifra y el nombre
   del JSON de origen. Indica el total de JSON guardados y su peso.
2. Línea al final de `estado-actual.md` (§8.1; UTF-8 con BOM, CRLF, sin salto final; verifica los bytes del inicio y
   del final antes y después).
3. Bitácora nueva: CRLF, sin BOM.
4. Mensaje de commit sugerido: `Épica 10 - Iteración 01: línea base y diagnóstico de rendimiento.`
5. Lista explícita de los archivos que **sí** entran en el commit y aviso de que nada más debe entrar.

---

## 3. Auditoría de No-Regresión e Invariantes

* `git status` al final: solo la carpeta nueva `bitacora-epica-10/` (bitácora y `pagespeed/`) y `estado-actual.md`.
* `_site/` es salida de compilación y no se commitea (verifica que siga ignorada por `.gitignore`).
* No se detienen procesos que no inició Claude Code.

---

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Línea base**
    * **Dado** las 5 páginas de D-04 en producción,
    * **Cuando** se ejecuta PageSpeed Insights 3 veces por página y dispositivo,
    * **Entonces** la bitácora tiene las medianas de cada métrica, el detalle de cada corrida y los 30 JSON guardados.
* **Escenario 2: Causas**
    * **Dado** cada página,
    * **Entonces** el elemento LCP y cada desplazamiento de diseño están identificados, o se explica por qué no se pudo.
* **Escenario 3: Hipótesis**
    * **Entonces** DT-27, DT-35, la carga de las fotos 2 a 4 y la doble descarga del logotipo tienen un resultado
      [medido]: confirmada, descartada o no concluyente.
* **Escenario 4: Metas**
    * **Entonces** existe la tabla de distancia a las metas de D-01 por página y dispositivo.
* **Escenario 5: Sin cambios**
    * **Entonces** no cambió ningún archivo fuera de `bitacora-epica-10/` y `estado-actual.md`, y ningún archivo
      guardado contiene una clave de API.