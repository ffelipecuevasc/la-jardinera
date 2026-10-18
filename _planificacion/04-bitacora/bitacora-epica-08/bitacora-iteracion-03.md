# Bitácora de Ejecución - Épica 08 - Iteración 03

**Fecha de ejecución:** 18-10-2026
**Agente:** Claude Code
**Objetivo:** Que el footer exista una sola vez (`SiteFooter.astro`), se genere en las 6 páginas con el enlace activo correcto y lea sus enlaces de una única lista de navegación (`src/data/navegacion.js`).

Especificación: [`iteracion-03.md`](../../03-planificacion/epicas/epica-08-migracion-astro/iteracion-03.md) · Épica: [`definicion-epica.md`](../../03-planificacion/epicas/epica-08-migracion-astro/definicion-epica.md) · Iteración anterior: [`bitacora-iteracion-02.md`](bitacora-iteracion-02.md)

Rótulos de evidencia: **[código]** confirmado por código, comandos o programa; **[render]** confirmado en render real (Chrome 155 headless, ver §4.5); **[informado]** dato entregado por el desarrollador; **🕒 PENDIENTE** no verificado.

---

## 1. Resumen ejecutivo

* El footer vive **una sola vez**, en `src/components/SiteFooter.astro`; `BaseLayout.astro` lo renderiza en la posición exacta que tenía y las 6 páginas ya no lo contienen. `<footer` aparece solo en ese archivo de `src/`. [código]
* Los 5 enlaces de navegación salen de `NAVEGACION` (`src/data/navegacion.js`). Las clases del enlace activo y del inactivo son dos cadenas literales completas dentro del componente, elegidas con un ternario. [código]
* Decisiones del desarrollador aplicadas: contenedor `border-t border-outline-variant/20` sin margen externo (Inicio, Contacto y 404 pierden 64 px sobre el footer y ganan una línea de 1 px) y `font-body-sm text-body-sm` en el enlace activo (de 16 a 14 px). No se agregó ninguna clase a las páginas para compensar. [código y render]
* `pnpm run build:cf`: código 0, "6 page(s) built", 0 advertencias, 106 archivos. [código]
* El comparador `scripts/comparar-con-referencia.mjs` informa 91 diferencias de `<body>`, **todas dentro del footer**: 4 categorías (3 planificadas y 1 no anticipada, de espacios), con 0 fuera de esas categorías y 0 fuera del footer (§4.2). [código]
* En render real (84 combinaciones: 6 páginas × 7 viewports × claro y oscuro), 0 diferencias de geometría no explicadas entre el footer de la referencia y el nuevo, consola limpia y modal y *lightbox* con el mismo comportamiento (§4.5). [render]
* Estado: **Completada con reservas** (§8). No está 🔒 Cerrada: eso ocurre solo con la fusión a `main`.

## 2. Línea base (estado previo)

| Dato | Valor | Origen |
|:-----|:------|:-------|
| Rama / `HEAD` | `feat/migracion-astro` / `6e893b5` | `git log` |
| Árbol de trabajo | Limpio al iniciar | `git status` |
| Node / pnpm | `v24.16.0` / `11.24.0` | `node -v`, `pnpm -v` |
| Footers | 6 copias en `src/pages/*.astro`: contenedor `mt-space-8` en Inicio, Contacto y 404, y `border-t border-outline-variant/20` en Servicios, Suscripción y Galería; enlace activo sin `font-body-sm text-body-sm` (Tarea 0, reportada en el chat con la tabla de diferencias) | lectura |
| Etiquetas | Las del menú de escritorio, el panel móvil y el footer son idénticas en las 6 páginas (5 enlaces, mismo orden y `href`) | programa |
| Documentos leídos | `AGENTS.md`, `README.md`, `DESIGN.md` (completo), `_planificacion/README.md`, `estado-actual.md`, `iteracion-02.md`, `iteracion-03.md`, `stack-tecnologico.md` y la bitácora de la It. 02 | — |

## 3. Cambios realizados (por archivo)

| Archivo | Cambio |
|:--------|:-------|
| `src/data/navegacion.js` (nuevo, 9 líneas) | `NAVEGACION`: 5 entradas `{ clave, etiqueta, ruta }` con las etiquetas copiadas del marcado (`Inicio`, `Servicios`, `Suscripción Floral`, `Galería`, `Contacto`). Sin `etiquetaFooter`: no hacía falta. |
| `src/components/SiteFooter.astro` (nuevo, 144 líneas) | Parte del footer de `index.astro`. Recibe `paginaActiva` (`null` por defecto; la 404 lo pasa explícito). Contenedor aprobado; el `<nav>` recorre `NAVEGACION`; enlace activo con `aria-current="page"` y las clases aprobadas. El enlace de marca conserva `data-path="inicio"`. Conserva los 8 comentarios del footer de Inicio. |
| `src/layouts/BaseLayout.astro` | Importa `SiteFooter`; recibe `paginaActiva`; tras `<slot />` agrega `<slot name="antes-del-footer" />`, `<SiteFooter paginaActiva={paginaActiva} />` y `<slot name="tras-footer" />`. |
| `src/pages/index.astro` | Pasa `paginaActiva="inicio"`; retira el footer (139 líneas). |
| `src/pages/servicios.astro` | `paginaActiva="servicios"`; retira el footer y el comentario que lo encabezaba; `#service-modal` (y su comentario) pasa a `<Fragment slot="tras-footer">`. |
| `src/pages/suscripcion-floral.astro` | `paginaActiva="suscripcion-floral"`; retira el footer y su comentario; la franja de beneficios pasa a `<Fragment slot="antes-del-footer">`. |
| `src/pages/galeria.astro` | `paginaActiva="galeria"`; retira el footer y su comentario; `#lightbox` y la franja de beneficios pasan a `<Fragment slot="antes-del-footer">`, en su orden original. |
| `src/pages/contacto.astro` | `paginaActiva="contacto"`; retira el footer y su comentario. |
| `src/pages/404.astro` | `paginaActiva={null}`; retira el footer y su comentario. |
| `decisiones-tecnicas.md` | Sección nueva: decisiones del footer (contenedor, enlace activo, sin `etiquetaFooter`), 18-10-2026. |
| `bitacora-iteracion-02.md` | Nota 10.8 (residuo de 3 píxeles aceptado). Sin cambio de estado. |
| `estado-actual.md` | Una línea nueva. |

**Sin cambios:** `tailwind.config.js`, `src/css/input.css`, `scripts/comparar-con-referencia.mjs`, `package.json`, `pnpm-lock.yaml`, `astro.config.mjs`, `public/` y todos los módulos JS. Los comentarios de nivel 1 que encabezaban cada footer en las páginas ("FOOTER CONECTADO SIN MARGEN EXTERNO…", "FOOTER GLOBAL REFACTORIZADO") se fueron con el footer: ya no describen nada.

## 4. Verificación de criterios de aceptación

### 4.1 Compilación [código]

`pnpm run build:cf` (con `_site/` borrada antes): código 0; "6 page(s) built"; 0 líneas con "warn" o "error"; 106 archivos. El CSS cambia de nombre (`BaseLayout.744HEtGc.css`) porque `mt-space-8`, que solo usaban los footers de 3 páginas, ya no está en el marcado y Tailwind deja de emitirla (0 coincidencias en el CSS). Presentes en el CSS: `font-body-sm`, `text-body-sm`, `border-t`, `border-outline-variant/20`, `hover:text-on-surface:hover` y `font-semibold`, con `text-body-sm` antes de `font-semibold` (el peso 600 del enlace activo se conserva; confirmado en render: 600).

### 4.2 Comparador (`scripts/comparar-con-referencia.mjs`, sin editarlo) [código]

Código de salida 1 y 91 diferencias de `<body>` (el script las cuenta como no esperadas porque no conoce los cambios de esta iteración). Se clasificaron con un script aparte que reutiliza su tokenizador y su diferencia de secuencias (copia del código fuera del repositorio):

| Página | A. Contenedor | B. Enlace activo | C. Comentarios | D. Espacios | Fuera del footer | Otras en el footer | Footer idéntico tras A y B (sin espacios ni comentarios) |
|:-------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Inicio | 2 | 2 | 0 | 0 | 0 | 0 | sí |
| Servicios | 0 | 2 | 0 | 10 | 0 | 0 | sí |
| Suscripción Floral | 0 | 2 | 0 | 9 | 0 | 0 | sí |
| Galería | 0 | 2 | 5 | 15 | 0 | 0 | sí |
| Contacto | 2 | 2 | 4 | 14 | 0 | 0 | sí |
| 404 | 2 | 0 | 4 | 14 | 0 | 0 | sí |

* **A (planificada):** `mt-space-8` → `border-t border-outline-variant/20` en Inicio, Contacto y 404.
* **B (planificada):** `font-body-sm text-body-sm` agregado a la clase del enlace activo (5 páginas; la 404 no tiene enlace activo).
* **C (planificada):** comentarios que difieren entre footers. Galería gana 5 (`Teléfono`, `Email`, `Ubicación` y los 2 de íconos de pago); Contacto y 404 pierden `COLUMNA 1` y `COLUMNA 2` y ganan los 2 de íconos de pago.
* **D (NO anticipada en la especificación):** espacios de formato. Los footers de Servicios, Suscripción, Galería, Contacto y 404 tenían espacios en blanco entre los 5 enlaces de `<nav>` y un espacio final en `Navegación `; el de Inicio, que es la base aprobada, no los tiene. Al unificar sobre el de Inicio, esos nodos de texto desaparecen en 5 páginas. No cambian el render: son espacios entre elementos de una columna flex y un espacio al final de un bloque (verificado en §4.5: 0 diferencias de geometría). Se informa como categoría propia, no como "no esperada" ni como parte de las planificadas: el desarrollador la acepta o no.
* **Comprobación fuerte:** dentro del footer, sin espacios ni comentarios y con las dos sustituciones aprobadas aplicadas al original, la secuencia de tokens de la referencia es **idéntica** a la de `_site/` en las 6 páginas. Es decir, no hay otra diferencia de marcado en el footer.
* **Fuera del footer:** 0 diferencias nuevas. El resto (script con *hash*, comentarios de nivel 1 omitidos por Astro, `<head>`) es igual que en la Iteración 02; el *lightbox*, la franja y el modal no cambian de posición ni de contenido.
* **Comentarios en el HTML compilado:** los 8 del footer de Inicio salen en las 6 páginas (`COLUMNA 3: Contacto y RRSS`, `Teléfono`, `Email`, `Ubicación`, `Botones Sociales`, `COLUMNA 4: Medios de Pago`, `Icono de Transferencia Bancaria (sync_alt)` e `Icono de Billetes/Efectivo (payments)`). `COLUMNA 1` y `COLUMNA 2` (que solo tenían Contacto y 404) ya no existen. Los comentarios de nivel 1 de las páginas (incluidos los de las ranuras: `LIGHTBOX VISOR FULLSCREEN`, `2. FRANJA DE BENEFICIOS…`, `Modal de Detalle de Servicio…`) siguen omitidos del HTML, como en la Iteración 02: se conservan solo en el código fuente.

### 4.3 Invariantes en `_site/*.html` [código]

| Página | `<footer` | `aria-current` en el footer | Enlace activo | `style=` / `onclick` / `<style` / `<script>` sin `src` / `href="#"` | IDs (duplicados) | `fixed` en `<header>` | `#mobile-menu-scrim` tras `</header>` |
|:-------|:-:|:-:|:--|:-:|:-:|:-:|:-:|
| Inicio | 1 | 1 | `inicio` | 0 | 16 (0) | 0 | sí |
| Servicios | 1 | 1 | `servicios` | 0 | 13 (0) | 0 | sí |
| Suscripción Floral | 1 | 1 | `suscripcion-floral` | 0 | 11 (0) | 0 | sí |
| Galería | 1 | 1 | `galeria` | 0 | 17 (0) | 0 | sí |
| Contacto | 1 | 1 | `contacto` | 0 | 17 (0) | 0 | sí |
| 404 | 1 | 0 | (ninguno) | 0 | 6 (0) | 0 | sí |

Los footers de las 6 páginas son idénticos a los del Inicio una vez normalizado solo el enlace activo (`aria-current` y su clase). Los IDs por página coinciden con los de la Iteración 02.

### 4.4 Orden del DOM (Escenario 4) [código]

Hijos directos del `<body>` (sin comentarios, espacios ni `<script>`), referencia frente a `_site/`: **idénticos en las 6 páginas**.

| Página | Secuencia (igual en la referencia y en `_site/`) | Posición del footer |
|:-------|:-------------------------------------------------|:--------------------|
| Servicios | `header › #mobile-menu-scrim › main › footer › #service-modal` | 4.º de 5; el modal va **después** del footer |
| Suscripción Floral | `header › #mobile-menu-scrim › main › section › footer` | 5.º de 5; la franja va **entre** `</main>` y el footer |
| Galería | `header › #mobile-menu-scrim › main › #lightbox › section › footer` | 6.º de 6; `#lightbox` y luego la franja, **entre** `</main>` y el footer |
| Inicio, Contacto y 404 | `header › #mobile-menu-scrim › main › footer` | 4.º de 4 |

### 4.5 Render real: zona del footer [render]

**Cómo se hizo:** Chrome `155.0.8059.84` headless, perfil aislado en la carpeta temporal del agente y control por el protocolo de depuración desde scripts **fuera del repositorio**. La referencia (`referencia/sitio/`, el sitio anterior) se sirvió en `127.0.0.1:4400` con un servidor Node de solo lectura y el sitio nuevo con `pnpm preview` (`localhost:4321`, ya detenido). **Sin red externa:** se bloquearon `fonts.googleapis.com`, `fonts.gstatic.com` y los `.mp4` en ambos lados; por eso la tipografía es la de reserva del sistema y esto **no reproduce la apariencia de producción**. Movimiento reducido emulado. 84 combinaciones por lado (6 páginas × 7 viewports de `AGENTS.md` §7 × claro y oscuro); en cada una se midió la geometría del `<footer>` y de sus 58 elementos descendientes y se capturó el recorte del footer. Tras terminar: 0 procesos del arnés y 0 puertos abiertos.

**Geometría: espacio sobre el footer, alto del footer y alto del documento (referencia → nuevo)**

| Página | Espacio sobre el footer | Alto del footer (320 a 740 px / 1024 y 1280 px) | Alto del documento (320 a 740 px / 1024 y 1280 px) |
|:-------|:------------------------|:------------------------------------------------|:---------------------------------------------------|
| Inicio | 64 → 0 px | −3 / +1 px (768 px: −2,75) | −67 / −63 px |
| Servicios | 0 → 0 px | −4 / 0 px (768 px: −3,75) | −4 / 0 px |
| Suscripción Floral | 0 → 0 px | −4 / 0 px (768 px: −3,75) | −4 / 0 px |
| Galería | 0 → 0 px | −4 / 0 px (768 px: −3,75) | −4 / 0 px |
| Contacto | 64 → 0 px | −3 / +1 px (768 px: −2,75) | −67 / −63 px |
| 404 | 64 → 0 px | +1 / +1 px | −63 / −63 px |

Los valores son los mismos en modo claro y en oscuro. "Espacio sobre el footer" es la distancia entre el borde inferior del elemento anterior y el borde superior del footer (en Servicios, Suscripción y Galería el anterior es `<main>`, la franja o el visor, igual que en la referencia).

* **Cambios esperados, confirmados:** −64 px sobre el footer en Inicio, Contacto y 404 (las 42 combinaciones); borde superior de 0 a 1 px en esas tres (color `rgba(192, 201, 191, 0.2)`; en la captura, la primera fila mide `rgb(231, 230, 224)` en claro y `rgb(72, 78, 74)` en oscuro); margen superior de 64 a 0 px; enlace activo de **16 px / 24 px de interlineado a 14 px / 20 px, con peso 600** en las 70 combinaciones de las 5 páginas indexables; enlaces inactivos sin ningún cambio (tamaño, peso, interlineado y color: 0 diferencias).
* **Consecuencia del enlace activo a 14 px, no listada en el pedido:** el interlineado baja 4 px, así que la columna de navegación mide 4 px menos y, donde las columnas se apilan (320 a 740 px) o el footer tiene dos columnas (768 px), todo lo que sigue sube 4 px (3,75 px a 768 px) y el footer mide 4 px menos. Desde 1024 px el footer no cambia de alto porque la columna de contacto es la más alta.
* **Otras diferencias de geometría: 0.** Para cada uno de los 58 elementos descendientes del footer en las 84 combinaciones se comparó posición y tamaño relativos al footer, con tolerancia de 0,5 px; todas las diferencias son las explicadas arriba: el desfase de 1 px por la línea, el desplazamiento de −4 px de lo que sigue al enlace activo y el alto de los contenedores del enlace.
* **Píxeles de la captura del footer:** en 74 de 84 combinaciones las zonas comparables son idénticas con tolerancia de 1 nivel de 255 (el redondeo de color ya documentado en la Iteración 02: `border-outline-variant/20` pasó de `rgba(193, 201, 192, .2)` a `rgba(192, 201, 191, .2)`): la 404 completa; encima del enlace activo y debajo de él donde el diseño lo permite; en 1024 y 1280 px, todo salvo la columna de navegación. En las **10 de 768 px** (con enlace activo) lo de encima del enlace activo y la columna izquierda son idénticos, pero la fila de las columnas 3 y 4 se desplaza **3,75 px (no entero)** y queda rasterizada a otro submuestreo: ahí no se afirma identidad de píxeles, solo de geometría.
* **Consola:** 0 mensajes de error o advertencia en las 84 combinaciones de ambos lados; estado HTTP 200 en todas (la 404 se cargó como `/404` y `/404.html`, **no** como una ruta inexistente: su estado HTTP 404 no se midió aquí). `scrollWidth` igual al viewport salvo `index-768`, que ya lo excedía en la referencia (el desplazamiento horizontal de 4 px a 768 px del Inicio, ya registrado en la Épica 01 · It. 08).
* **Comportamiento con el footer en su nueva posición** (Servicios y Galería, 1280 × 800, claro; referencia y sitio nuevo, con el mismo resultado): al abrir el modal de Servicios y el visor de la Galería, `header`, `main` y `footer` quedan con `inert` y `aria-hidden="true"`; al cerrar con Escape, se retiran; consola limpia. `modal.js` (L18) y `gallery.js` (L89) consultan `footer`, y sigue existiendo.

## 5. Desviaciones, hallazgos y deuda detectada fuera de alcance

1. **Categoría D (espacios) no anticipada:** ver §4.2. Es consecuencia inevitable de unificar sobre el footer de Inicio, que difería en espacios de los otros cinco. Sin efecto visible medido. La acepta o rechaza el desarrollador.
2. **Efecto de 4 px por el enlace activo a 14 px** (§4.5): derivado de la decisión 2, no un defecto; se informa porque cambia el alto del documento en móvil.
3. **Comentarios:** `COLUMNA 1` y `COLUMNA 2` desaparecen (solo existían en Contacto y 404) y Galería, Contacto y 404 reciben los comentarios del footer de Inicio. No afectan el DOM de elementos.
4. **Hallazgo fuera de alcance (no corregido):** el crédito del footer se ve como `Felipe Cuevas .` (con un espacio antes del punto) porque el texto del enlace termina en salto de línea dentro de `<a>`: `Felipe Cuevas\n</a>.`. Ya ocurre en la referencia (visible en las capturas de ambos lados). Severidad baja; no se agregó a la deuda técnica sin pedido del desarrollador.
5. **README.md §5** describe `components/` con `SiteHeader, SiteFooter y SeoHead` y `layouts/` con el header: hoy existe `SiteFooter` y el header sigue en las páginas. Es adelanto de lo planificado (Iteraciones 04 y 05), no un defecto.
6. **Sin deuda nueva.** DT-06 se propone ✅ Resuelta (§6).

## 6. Archivos modificados y propuestas para archivos protegidos

Archivos con cambios en Git (`git status`, solo lectura): modificados `src/layouts/BaseLayout.astro`, las 6 páginas de `src/pages/`, `decisiones-tecnicas.md`, `bitacora-iteracion-02.md` y `estado-actual.md`; nuevos `src/components/SiteFooter.astro`, `src/data/navegacion.js` y esta bitácora. `_site/` y `.astro/` no aparecen (ignorados).

**Propuestas para archivos protegidos** (las aplica el desarrollador; 14 de 14 líneas `-` verificadas por programa contra el texto vigente, cada bloque coincide una sola vez):

| # | Archivo y sección | Qué cambia |
|:--|:------------------|:-----------|
| a | `_planificacion/README.md` §12, fila DT-06 (L223) | ✅ Resuelta, con la evidencia de esta bitácora |
| b1 | `DESIGN.md` §5.3, punto 3 (L307 a L309) | Marca la deuda como resuelta en la It. 03 |
| b2 | `DESIGN.md` §10, párrafo inicial (L456) | Indica `SiteFooter.astro`, `navegacion.js` y que el footer no impone margen externo |
| b3 | `DESIGN.md` §10, punto 2 (L459) | Documenta las clases del enlace activo y del inactivo |
| b4 | `DESIGN.md` §10, cierre (L466) | Retira "Pendiente de unificación (ver §5.3)." |
| c1 | `AGENTS.md` §5, regla 6 (L125 a L127) | La nota de transición dice que solo el header sigue duplicado hasta la It. 04 |
| c2 | `AGENTS.md` §7 (L162 y L163) | La paridad entre páginas aplica solo al header |
| c3 | `_planificacion/README.md` §6, punto 5 (L108 y L109) | Misma nota de transición que `AGENTS.md` |

El detalle `-`/`+` está en el reporte de la sesión. Otras menciones de "duplicado" revisadas (sin propuesta): `definicion-epica.md` L42 y L90 (premisa histórica de la épica), `iteracion-01.md` L37 e `iteracion-02.md` L191 (especificaciones ya ejecutadas) y `README.md` L17 y L89-L90 (describen el estado final de la épica).

## 7. Mensaje de commit sugerido

```text
Épica 08 - Iteración 03: Unifica el pie de página en un componente Astro.
```

Longitud contada con Node: 73 caracteres.

---

## 8. Estado, reservas y pendientes

### 8.1 Estado

**Completada con reservas.** No está 🔒 Cerrada (fusión a `main`, `_planificacion/README.md` §5).

### 8.2 Escenarios de aceptación

| Escenario | Estado | Evidencia |
|:----------|:-------|:----------|
| 1. Fuente única | ✅ confirmado por código | `<footer` solo en `src/components/SiteFooter.astro` |
| 2. Enlace activo | ✅ confirmado por código y en render real | 1 `aria-current="page"` en el footer de las 5 páginas indexables y 0 en la 404; clase activa literal; 14 px y peso 600 en render (§4.5) |
| 3. Variante única | ✅ confirmado por código | footers de `_site/` idénticos entre las 6 páginas salvo el enlace activo; contenedor aprobado en las 6 |
| 4. Orden del DOM | ✅ confirmado por código | §4.4: misma secuencia de hijos del `<body>` que la referencia en las 6 páginas |

### 8.3 Reservas

1. **Sin revisión visual humana** de la zona del footer en las 6 páginas, en especial **Contacto** (pierde 64 px sobre el footer y el formulario queda más cerca de él) y las tres páginas que ganan la línea. La comparación fue automática, con Google Fonts y videos bloqueados.
2. **Categoría D (espacios)** del comparador no anticipada: pendiente de aceptación del desarrollador (§4.2).
3. Una sola corrida por combinación; no se midió el ruido de esta medición (en la Iteración 02 fue de 7 pares con diferencia de 84, sin efecto en la geometría).
4. Sin Lighthouse, sin otros navegadores y sin dispositivo real; sin vista previa de Cloudflare de esta iteración.

### 8.4 Heredado a la Iteración 04

| Ítem | Detalle |
|:-----|:--------|
| `NAVEGACION` ya existe | `SiteHeader.astro` debe leerla; el header usa las mismas 5 etiquetas y rutas (verificado en las 6 páginas, escritorio y panel móvil) |
| `BaseLayout` ya recibe `paginaActiva` | La Iteración 04 solo debe pasarlo también al header |
| Comparador | Los footers ya no coinciden token a token con la referencia (categorías A a D de §4.2); al extraer el header, sus diferencias esperadas deben documentarse una a una |
| Estado de la Iteración 02 | Sin cambio: Completada con reservas; siguen abiertos Firefox o Safari sin precisar, estado HTTP 404 de las rutas anidadas y consola con red real |
