# Bitácora de Cierre - Épica 08

**Fecha de cierre:** 21-10-2026
**Agente:** Claude Code
**Estado:** Completada con reservas; 🔒 Cerrada con la fusión a `main` (21-10-2026).

> Rótulos: [código] (Claude Code, lectura del repositorio), [medido] y [render] (Claude Code, en las bitácoras citadas),
> [informado] (el desarrollador), [asesor], 🕒 PENDIENTE. Esta bitácora no hace mediciones nuevas: resume las bitácoras
> de las Iteraciones 01 a 08 y las confirmaciones del desarrollador.

## 1. Resumen de la épica

**Objetivo:** migrar el sitio a Astro (salida estática, MPA de 6 páginas) con paridad visual y de contenido, dejando el
header, el footer, el `<head>` y el SEO como componentes únicos.

| Iteración | Resultado | Último commit | Bitácora |
|:--|:--|:--:|:--|
| 01 · ADR-001, documentos protegidos y línea base | Completada con reservas: ADR-001 aprobado, línea base en `referencia/` y Lighthouse de producción (16-10-2026), ADR-002 (dominio sin `www`). | `e1390c8` | [bitacora-iteracion-01.md](bitacora-iteracion-01.md) |
| 02 · Andamiaje Astro y migración literal | Completada con éxito: 6 páginas en `_site/`, Astro 7.4.0 exacta y Node `>= 22.22`. | `6e893b5` | [bitacora-iteracion-02.md](bitacora-iteracion-02.md) |
| 03 · Footer como componente | Completada con éxito: `SiteFooter.astro` y `src/data/navegacion.js`; DT-06 resuelta. | `b378c6d` | [bitacora-iteracion-03.md](bitacora-iteracion-03.md) |
| 04 · Header y panel móvil como componente | Completada con reservas: `SiteHeader.astro` con la capa tenue como nodo hermano. | `2d78e30` | [bitacora-iteracion-04.md](bitacora-iteracion-04.md) |
| 05 · SEO técnico en el layout | Completada con reservas: `SeoHead.astro`, `canonical`, Open Graph, `robots.txt` y `sitemap.xml`; DT-04 y DT-08 (código) resueltas. | `a120832` | [bitacora-iteracion-05.md](bitacora-iteracion-05.md) |
| 06 · Componentes de sección repetidos (opcional) | Completada con reservas: `FranjaBeneficios.astro` en Servicios, Suscripción Floral y Galería. | `d4d1407` | [bitacora-iteracion-06.md](bitacora-iteracion-06.md) |
| 07 · Tema oscuro sin destello inicial (opcional) | Completada con reservas: script de arranque del tema en el `<head>` (ADR-003); DT-15 resuelta. | `b813c3a` | [bitacora-iteracion-07.md](bitacora-iteracion-07.md) |
| 08 · Certificación transversal y paso a producción | Completada con reservas: paridad certificada, Lighthouse 58 de 60 casillas (DT-27), producción y Search Console verificados. | `4055b39` | [bitacora-iteracion-08.md](bitacora-iteracion-08.md) |

Hashes tomados de `git log` en solo lectura [código]: el último commit con el prefijo de cada iteración. Notas: el
registro del cierre de la It. 02 con los pendientes confirmados va en `10f415a` (commit de la It. 03); la It. 04 tiene un
commit posterior a su cierre documental (`2d78e30`, imagen para Open Graph).

## 2. Resultado final del DoD (`definicion-epica.md` §8)

**7 casillas verificadas (una con reserva) y 1 abierta (Lighthouse, DT-27).**

| # | Casilla | Estado | Fuente |
|:-:|:--|:-:|:--|
| 1 | Header, panel móvil, footer y `<head>` una sola vez | [x] | It. 08, §4.2 [código] |
| 2 | `_site/` con las 6 páginas y header y footer completos sin JavaScript | [x] | It. 08, §4.1, §4.2 y §4.4 [código] |
| 3 | Paridad visual y funcional en 7 viewports, claro y oscuro | [x] con reserva | It. 08, §5 [render]; Firefox y celular real sin diferencias [informado] (§14.1). Reserva: Safari sin probar; render automático solo en Chrome *headless* |
| 4 | 0 `style=`, 0 `onclick`, 0 `<style>` y 1 `<script>` sin `src` por página | [x] | It. 08, §4.2 [código] |
| 5 | 0 `./public/`; `/public/...` con 301 | [x] | It. 08, §4.2 [código] y §13.5, ítem c [medido] |
| 6 | Lighthouse (criterio de medianas) | [ ] | It. 08, §13.3 [medido]: 58 de 60 casillas; aceptada como reserva (§14.3), DT-27, Épica 10 |
| 7 | Cloudflare Pages publica desde `_site/` sin exponer archivos internos | [x] | It. 08, §14.1 [informado] y §13.5, ítem g [medido] |
| 8 | `AGENTS.md`, `README.md`, `stack-tecnologico.md` y `proposito-y-alcance.md` actualizados | [x] | It. 08, §14.2 y §15.2 [código] |

## 3. Cifras finales

### 3.1 Compilación [código]

`pnpm run build:cf` con código 0, 6 páginas, 0 advertencias y **109 archivos** en `_site/` (6 HTML, 79 `.webp`, 10 `.mp4`,
6 `.svg`, 2 `.png`, 1 `.jpg`, 1 CSS, 1 JS, `robots.txt`, `sitemap.xml` y `_redirects`). CSS `BaseLayout.744HEtGc.css`
(45.970 B). 0 archivos sobre 25 MiB; el mayor, `nmg2.mp4`, con 22.715.000 B (It. 08, §2 y §4.4).

### 3.2 Auditoría estática [código]

* Comparador: 171 diferencias de `<body>` y 186 de `<head>`, todas de categorías planificadas; **0 no explicadas** (§4.1).
* Invariantes en las 6 páginas: 0 `style=`, 0 `onclick`, 0 `<style>`, 1 `<script>` sin `src` idéntico en las 6 (SHA-256
  `5b490c26…`), IDs sin duplicados, 0 `href="#"`, 0 `<base` y 0 `./public/`, invariantes del header intactos (§4.2).
* Rastreo: 100 URL internas únicas, todas con 200 (§4.3).

### 3.3 Render real [render]

84 combinaciones por sitio (6 páginas × 7 viewports × claro y oscuro), 168 cargas, 0 reintentos. 27.006 elementos por
sitio: las únicas diferencias de posición o tamaño son las 4.062 del footer (It. 03). Estilo calculado: 0 diferencias no
explicadas. Tema correcto en 84 de 84 y consola con 0 mensajes. Flujos: 68 casos por sitio, 60 idénticos y 8 con
diferencias explicadas (§5.2 a §5.5).

### 3.4 Lighthouse [medido]

72 corridas (6 URL × móvil y escritorio × 3 corridas × referencia `e1390c8` y producción), 0 fallidas. **58 de 60
casillas cumplen** (§13.3). Las 2 que no cumplen son de Suscripción Floral:

| Casilla | Referencia | Producción | Umbral | Resultado |
|:--|:-:|:-:|:--|:-:|
| Performance, escritorio | 93 | 89 | ≥ 93 − 3 = 90 | No cumple |
| CLS, móvil | 0,000 | 0,015 | ≤ 0,000 + 0,01 = 0,010 (sí cumple ≤ 0,1) | No cumple |

Causa probable (hipótesis, no demostrada): en producción Chrome marca con prioridad *High* el logotipo PNG (DT-22) y
`hero-2` a `hero-4` (DT-23) antes del LCP y la simulación las suma; el CLS de 0,015 es el mismo elemento y valor que en 1
de las 3 corridas de la referencia. El LCP móvil de esa página sube de 4,43 a 8,45 s. Registrada como DT-27.

### 3.5 Producción verificada [medido]

It. 08, §13.5: 5 páginas con 200; `/a/b/inexistente` y `/servicios/xyz` con 404 y su CSS; `www` y `http` con 301 al
canónico (ADR-002); `/public/images/hero-botanical-desktop.webp` con 301 a `/images/…` (200); `robots.txt` idéntico al
del repositorio; `sitemap.xml` con 5 `<loc>` sin `www`; `canonical`, `og:url` y `og:image` correctos en las 5 páginas
(`og-default.jpg` de 1200 × 630 px); 7 archivos internos con 404; paridad de despliegue con 0 diferencias no explicadas.

### 3.6 Search Console y vistas previas sociales [informado]

* Search Console: sitemap `https://lajardinerafloreria.cl/sitemap.xml` enviado el 19-10-2026, «Correcto», 5 páginas. El
  sitemap antiguo con `www` (2022) fue retirado; queda un solo sitemap, el actual (It. 08, §14.1 y §15.4, y confirmación
  del 21-10-2026).
* Depurador de Facebook (19-10-2026): código 200, URL canónica e imagen correctas; solo advierte la falta de `fb:app_id`.
* WhatsApp (19-10-2026): tarjeta con imagen, título, descripción y dominio.

## 4. Deuda técnica

### 4.1 Resuelta en la épica (`_planificacion/README.md` §12)

| Deuda | Resuelta en |
|:--|:--|
| DT-04 · `<meta name="description">` del Inicio | It. 05 |
| DT-06 · Footer con dos variantes | It. 03 |
| DT-08 · SEO técnico (robots, sitemap, Open Graph) | It. 05 (código); verificada en producción en la It. 08 |
| DT-10 · Rutas de importación de `main.js` | It. 02 |
| DT-14 · 404 en rutas anidadas | Corregida en la Épica 07 · It. 03; verificada en producción en la It. 01 (16-10-2026) |
| DT-15 · Destello del tema oscuro | It. 07 |
| DT-16 · `dist/css/output.css` versionado | It. 02 |
| DT-17 · `<meta charset>` no era la primera etiqueta | It. 02 |

### 4.2 Abiertas y nuevas

| Deuda | Tema | Destino |
|:--|:--|:--|
| DT-21 | Rendimiento móvil por debajo del umbral | Épica 10 |
| DT-22 | Logotipos PNG sobredimensionados | Épica 10 |
| DT-23 | Imágenes sin `width`/`height` y `lazy` sobre el pliegue | Épica 10 |
| DT-24 | Accesibilidad del Inicio | Épica 10 |
| DT-25 | Orden de encabezados | Épica 10 |
| DT-26 | Carga inicial de los 10 videos de la Galería | Épica 10 |
| DT-27 (nueva) | Suscripción Floral en Lighthouse | Épica 10 |
| DT-28 (nueva) | `rum` con error en las vistas previas `*.pages.dev` | Épica 10 |
| DT-29 (nueva) | Código muerto en `subscription.js` | Épica 10 |
| DT-30 (nueva) | Fin de soporte de Node 22 (hacia abril de 2027) | Mantenimiento |
| SM-01 | Hero del Inicio en móvil | Épica 09 |
| SM-02 | Trampa de foco del panel móvil | Épica 09 |
| SM-03 | Tema de la primera visita guardado como elección del usuario | Épica 09 |

## 5. Decisiones

* **ADR-001** (migración a Astro): Implementada (19-10-2026; aprobada el 14-10-2026).
* **ADR-002** (dominio canónico sin `www`): Aprobada (16-10-2026); verificada en producción (§3.5).
* **ADR-003** (excepción a la regla de JS en línea: script de arranque del tema): Aprobada (19-10-2026).
* **Decisiones del desarrollador al cerrar** [informado]: la referencia de Lighthouse es el último despliegue de `main`
  anterior a Astro (It. 08, §3); el criterio de Lighthouse no cumplido se acepta como reserva, sin iteración de
  corrección (DT-27); `fb:app_id` es una observación, sin deuda ni código; SM-03 pasa a la Épica 09; Safari queda como
  reserva y se retoma en la Épica 09 si hay un dispositivo Apple.

## 6. Reservas finales y su destino

| Reserva | Estado | Destino |
|:--|:-:|:--|
| Render automático solo en Chrome *headless*; Safari sin probar | Abierta | Épica 09 |
| Ruido de píxeles de Servicios, «atribuido por analogía, no demostrado» | Abierta | Sin destino asignado |
| Lighthouse: 2 de 60 casillas | Abierta | Épica 10 (DT-27) |
| Reserva 3: `/public/*` → 301 | **Cerrada** | Medida en producción (It. 08, §13.5, ítem c) |

## 7. Desviaciones del plan y observaciones de proceso

* **Fusión a `main` anticipada** (It. 08, §3): se fusionó a `main` iteración por iteración, así que en la It. 08
  producción ya corría Astro. Por decisión del desarrollador, la referencia de Lighthouse pasó a ser el último despliegue
  de `main` anterior a Astro.
* **Observaciones** (It. 08, §14.6): `fb:app_id` advertido por el depurador de Facebook, sin efecto en la vista previa;
  Node 22.22.2 en el log de Cloudflare, con su fin de soporte registrado como DT-30.
* **Fila DT-26 truncada** (It. 08, §15.1): la propuesta del asesor mostraba la fila abreviada con «...» como línea de
  contexto y se pegó literal [asesor]; el desarrollador la restituyó y la lectura la dio idéntica a la de `b813c3a`
  [código].

## 8. Verificación posterior a la fusión [informado]

* `feat/migracion-astro` fusionada a `main` en avance rápido; `main`, `origin/main` y `HEAD` en `4055b39` [código].
* Cloudflare Pages: despliegue Production de `main` en `4055b39` exitoso. Log del 21-10-2026 (03:19 UTC): Node 22.22.2,
  pnpm 11.24.0, Astro 7.4.0, 6 páginas, 1 regla de redirección válida, «Uploaded 0 files (108 already uploaded)» (el
  sitio publicado es idéntico: solo cambió documentación). La advertencia de Node 22 en mantenimiento ya está en DT-30.
* `https://lajardinerafloreria.cl` funciona; `/sitemap.xml` muestra 5 `<loc>` sin `www`: `/`, `/servicios`,
  `/suscripcion-floral`, `/galeria` y `/contacto`.
* «Rollback to this deployment» disponible en la lista de despliegues; no se ejecutó.
* Search Console: queda un solo sitemap, el actual.

## 9. Siguiente paso

* **Épica 09 — Revisión móvil:** definida en `epica-09-revision-movil/definicion-epica.md`, pendiente de aprobación del
  desarrollador. Hereda SM-01 a SM-03 y la reserva de Safari.
* **Épica 10 — Rendimiento y calidad Lighthouse:** por planificar. Hereda DT-21 a DT-29, con DT-27 como reserva de esta
  épica.
