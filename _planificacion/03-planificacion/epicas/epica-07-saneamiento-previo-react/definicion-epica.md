# Épica 07: Gobernanza Multiagente, Titular Starlight y Saneamiento Previo a la Migración

> **Estado: Completada con reservas (14-10-2026).** Pendientes manuales: ver la sección "Seguimiento posterior al
> cierre". Registro del cierre: [bitacora-cierre-epica-07.md](../../../04-bitacora/bitacora-epica-07/bitacora-cierre-epica-07.md).

> **Replanificada el 13-10-2026:** la Épica 08 deja de ser "Componentes React" y pasa a ser la **migración
> estructural a Astro** (`epica-08-migracion-astro/`). Las Iteraciones 01 a 03 de esta épica no cambian de objetivo;
> la **Iteración 04 (SEO técnico) se traslada** a la Épica 08 · Iteración 05, donde se resuelve una sola vez en el layout
> en vez de editar seis `<head>` a mano.

> **Prerrequisito:** certificar en render real la Iteración 13 de la Épica 06 (Hallazgo H8). Mientras no se certifique,
> la Fase 2 de la Épica 06 sigue abierta y su verificación se absorbe en la Iteración 03 de esta épica.

## 1. Objetivo de la Épica

Preparar el proyecto para trabajar con más de un agente de IA y dejarlo en un estado limpio antes de migrar la
estructura a Astro (Épica 08):

1. Reorganizar la gobernanza: `_antigravity/` pasa a `_planificacion/`, nacen `AGENTS.md`, `README.md` y `DESIGN.md`
   en la raíz, y Claude Code queda restringido por permisos.
2. Publicar solo lo necesario: despliegue por **lista blanca** hacia `_site/` en lugar de borrar carpetas.
3. Reemplazar el resaltador del titular del Hero por el efecto **Starlight**, adaptado al sistema de diseño.
4. Saldar la deuda técnica que distorsionaría la migración a componentes (enlace roto del footer de Servicios,
   estilos en línea, diferencias entre footers, íconos con defectos de contraste).
5. ~~Completar el SEO técnico básico que Google Search Console espera encontrar.~~ Trasladado a la Épica 08 ·
   Iteración 05.

## 2. Alcance

* **Archivos:** los 6 HTML (solo donde cada iteración lo indique), `src/css/input.css`, `scripts/`, `package.json`
  (solo la línea de `build:cf`), `.gitignore`, `.claude/` (solo lectura para el agente), `_planificacion/**`, y los
  documentos raíz (`AGENTS.md`, `README.md`, `DESIGN.md`), que edita únicamente el desarrollador.
* **Fuera de alcance:** cambios de arquitectura (Astro, empaquetadores) y cambios de contenido comercial.

## 3. Plan de Iteraciones

| Iteración | Responsable principal        | Entregable                                                                                             |
|:----------|:-----------------------------|:-------------------------------------------------------------------------------------------------------|
| 01        | Desarrollador (hecho) + Agente | Agente: verifica el renombrado, integra `build:cf` y `.gitignore`, comprueba `_site/` y deja al día `stack-tecnologico.md` y `proposito-y-alcance.md` (DT-09). Desarrollador: cambia el comando de Cloudflare al final. |
| 02        | Agente                       | Titular del Hero con `fx-starlight`: verifica si el desarrollador ya lo aplicó, o lo aplica; retiro de `fx-marker`. |
| 03        | Agente                       | Saneamiento: DT-01 (enlace roto del footer de Servicios), DT-03 (estilos en línea a clases), DT-05 (botones sociales del footer de la 404), DT-13 (ícono de Facebook en modo oscuro), DT-07 ("Redbank" → "Redbanc", con confirmación), DT-14 (404 en rutas anidadas, Tarea 3b) y certificación en render real de H8 (DT-02). |
| 04        | —                            | ⛔ **Trasladada a la Épica 08 · Iteración 05.** Contenido original: SEO técnico: `meta description` del Inicio (DT-04), `canonical` y Open Graph, `robots.txt`, `sitemap.xml` y, con autorización, datos estructurados (DT-08). |

### Detalle de la Iteración 01 (despliegue por lista blanca)

1. `scripts/stage-site.mjs` copia a `_site/` solo las páginas HTML, `dist/`, `public/` y `src/js/`.
2. `package.json` agrega `"build:cf": "pnpm build && node scripts/stage-site.mjs"`.
3. Cloudflare Pages: comando de compilación `pnpm run build:cf`, directorio de salida `_site`.
4. `.gitignore` agrega `_site/`.

Beneficio clave para la Épica 08: la configuración de Cloudflare queda **igual en todas las ramas**; cada rama define
qué hace `build:cf` en su propio `package.json`. En la migración a Astro, `build:cf` pasa a ser `astro build` con
`outDir: './_site'`, sin tocar el panel de Cloudflare.

Límites de Cloudflare Pages a vigilar: **25 MiB por archivo** y **20 000 archivos por despliegue**. Los `.mp4` de la
galería son los candidatos a superar el primero.

### Detalle de la Iteración 03 (lo que se hizo)

* **DT-03:** `.bg-noise` (textura de ruido fractal del banner) en `input.css`, dentro de un `@layer components`
  nuevo, reemplaza los 4 `style=` de los banners (Inicio, Servicios, Suscripción y Galería). El `style=` del Hero ya
  se había resuelto en la Épica 01 · Iteración 08 con un `<picture>`, así que la clase `.bg-hero-botanical` que se
  planificaba aquí no se creó.
* **DT-14 (Tarea 3b):** en `404.html`, `<meta charset>` y `<base href="/"/>` pasan a ser las dos primeras etiquetas
  del `<head>`, para que las rutas `./` resuelvan desde la raíz cuando Cloudflare sirve la 404 en rutas anidadas.
  Cubre DT-17 solo en `404.html`.
* **DT-07:** "Redbank" → "Redbanc" en la franja de beneficios del Inicio (`index.html`, línea 337).
* Además: DT-01, DT-05, DT-13 y la certificación de H8 (DT-02). Detalle en
  [bitacora-iteracion-03.md](../../../04-bitacora/bitacora-epica-07/bitacora-iteracion-03.md).

### Detalle de la Iteración 04 (URLs canónicas) — vigente como referencia para la Épica 08 · Iteración 05

Cloudflare Pages **redirige con un 308** cada `/pagina.html` a `/pagina` y `/index.html` a `/`. Por eso las URLs
canónicas y las del sitemap se escriben **sin extensión**: `/`, `/servicios`, `/suscripcion-floral`, `/galeria`,
`/contacto`. Un `canonical` con `.html` apuntaría a una URL que redirige y Google lo trataría como una señal
contradictoria.

## 4. Definition of Done

* [x] `_antigravity/` no existe; ninguna configuración activa (Cloudflare, Antigravity) apunta a esa ruta.
  Evidencia: [bitácora 01](../../../04-bitacora/bitacora-epica-07/bitacora-iteracion-01.md) §2 ("Auditoría del renombrado" y búsqueda de
  `_antigravity`: solo quedan rutas recientes en `.idea/`, ignorado por Git).
* [ ] Claude Code carga `AGENTS.md` (sin `CLAUDE.md` en el proyecto) y los permisos bloquean edición de archivos
  protegidos y operaciones de escritura de Git. **Evidencia parcial:** [bitácora 01](../../../04-bitacora/bitacora-epica-07/bitacora-iteracion-01.md) §2
  confirma que no existe `CLAUDE.md`, `CLAUDE.local.md` ni `.claude/CLAUDE.md` y que `.claude/settings.json` es JSON
  válido, y la §5.1 registra un comando Git de escritura denegado por el clasificador de permisos. Ninguna bitácora
  demuestra que los permisos bloqueen la edición de archivos protegidos.
* [x] Cloudflare publica desde `_site/` con `pnpm run build:cf`, y `/README.md`, `/AGENTS.md`, `/DESIGN.md`,
  `/package.json` y `/_planificacion/README.md` responden 404 en producción. Evidencia:
  [bitácora 01](../../../04-bitacora/bitacora-epica-07/bitacora-iteracion-01.md) §8.5 (configuración y despliegue confirmados por el desarrollador; las
  rutas muestran la página 404 del sitio en el navegador; código HTTP no leído).
* [x] Ningún archivo de `_site/` supera 25 MiB. Evidencia: [bitácora 01](../../../04-bitacora/bitacora-epica-07/bitacora-iteracion-01.md) §4.1 (0
  archivos > 26.214.400 bytes; el mayor, `nmg2.mp4`, pesa 22.715.000 bytes, §5.2).
* [x] El titular del Hero muestra el efecto Starlight, respeta movimiento reducido y alto contraste, y conserva la
  jerarquía de `DESIGN.md` §7.3. Evidencia: [bitácora 02](../../../04-bitacora/bitacora-epica-07/bitacora-iteracion-02.md) §8.5 a §8.7 y §8.9 (Chrome
  headless; movimiento reducido y contraste forzado por emulación).
* [x] 0 `style=` en el marcado de los 6 HTML; footer de Servicios sin texto basura; ícono de Facebook legible en
  ambos temas; H8 certificado en render real. Evidencia: [bitácora 03](../../../04-bitacora/bitacora-epica-07/bitacora-iteracion-03.md) §4.1, §4.2, §4.4,
  §4.7 y §4.8.
* [ ] ~~Search Console reconoce el `sitemap.xml`, y ninguna página indexable carece de descripción ni de `canonical`.~~
  Movida a Épica 08 · Iteración 05.
* [x] `pnpm build` sin errores y consola limpia en las 6 páginas, en modo claro y oscuro. Evidencia:
  [bitácora 03](../../../04-bitacora/bitacora-epica-07/bitacora-iteracion-03.md) §4.9 (24 cargas; la [bitácora 02](../../../04-bitacora/bitacora-epica-07/bitacora-iteracion-02.md) §8.7
  cubría solo el Inicio).
* [ ] La 404 muestra estilos en rutas anidadas en producción (https://www.lajardinerafloreria.cl/servicios/xyz) —
  pendiente de verificación manual (DT-14).

## 5. Seguimiento posterior al cierre

Pendientes manuales del desarrollador. No bloquean la Épica 08.

* [ ] **DT-14 en producción:** abrir `https://www.lajardinerafloreria.cl/servicios/xyz` y confirmar estilos, logotipo,
  header, footer y enlaces a la raíz.
* [ ] **Favicon:** confirmar en una pestaña real que la solicitud del favicon de la 404 apunta a la raíz
  (`/public/logos/la-jardinera-original.png`).
* [ ] **Firefox y Safari:** H8 (barra entre 1024 y 1279 px) y la 404 en rutas anidadas; también el titular Starlight.
* [ ] **Traza de pintado en un móvil real** (animación del titular Starlight).
* [ ] **Contraste forzado real de Windows** (titular Starlight; solo se emuló).
* [ ] **Casilla de permisos de Claude Code** (§4, segunda casilla): demostrar que se bloquea la edición de archivos
  protegidos.
* [ ] **Propuestas a archivos protegidos aún sin aplicar** (las aplica solo el desarrollador):
    * `DESIGN.md` §5, ítem 9 (DT-03 resuelta con `.bg-noise`): [bitácora 03](../../../04-bitacora/bitacora-epica-07/bitacora-iteracion-03.md) §6.
    * `DESIGN.md` §10, ítem 3 (botones sociales visibles y "f" de Facebook sin color fijo): bitácora 03 §6.
    * `AGENTS.md` §5, regla 8 (excepción del `<base href="/">` en `404.html`): bitácora 03 §6.
    * `DESIGN.md` §1.2, §1.3, §7.1, §7.3 y §7.4 regla 8 (`lg:font-semibold` y holgura lateral de la cursiva):
      [bitácora 02](../../../04-bitacora/bitacora-epica-07/bitacora-iteracion-02.md) §8.11.
