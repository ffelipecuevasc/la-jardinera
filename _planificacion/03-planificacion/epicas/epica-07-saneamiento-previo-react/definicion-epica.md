# Épica 07: Gobernanza Multiagente, Titular Starlight y Saneamiento Previo a React

> **Prerrequisito:** certificar en render real la Iteración 13 de la Épica 06 (Hallazgo H8). Mientras no se certifique,
> la Fase 2 de la Épica 06 sigue abierta y su verificación se absorbe en la Iteración 03 de esta épica.

## 1. Objetivo de la Épica

Preparar el proyecto para trabajar con más de un agente de IA y dejarlo en un estado limpio antes de introducir React
(Épica 08):

1. Reorganizar la gobernanza: `_antigravity/` pasa a `_planificacion/`, nacen `AGENTS.md`, `README.md` y `DESIGN.md`
   en la raíz, y Claude Code queda restringido por permisos.
2. Publicar solo lo necesario: despliegue por **lista blanca** hacia `_site/` en lugar de borrar carpetas.
3. Reemplazar el resaltador del titular del Hero por el efecto **Starlight**, adaptado al sistema de diseño.
4. Saldar la deuda técnica que distorsionaría la migración a componentes (enlace roto del footer de Servicios,
   estilos en línea, diferencias entre footers, íconos con defectos de contraste).
5. Completar el SEO técnico básico que Google Search Console espera encontrar.

## 2. Alcance

* **Archivos:** los 6 HTML (solo donde cada iteración lo indique), `src/css/input.css`, `scripts/`, `package.json`
  (solo la línea de `build:cf`), `.gitignore`, `.claude/` (solo lectura para el agente), `_planificacion/**`, y los
  documentos raíz (`AGENTS.md`, `README.md`, `DESIGN.md`), que edita únicamente el desarrollador.
* **Fuera de alcance:** cambios de arquitectura (React, empaquetadores) y cambios de contenido comercial.

## 3. Plan de Iteraciones

| Iteración | Responsable principal        | Entregable                                                                                             |
|:----------|:-----------------------------|:-------------------------------------------------------------------------------------------------------|
| 01        | Desarrollador (hecho) + Agente | Agente: verifica el renombrado, integra `build:cf` y `.gitignore`, comprueba `_site/` y deja al día `stack-tecnologico.md` y `proposito-y-alcance.md` (DT-09). Desarrollador: cambia el comando de Cloudflare al final. |
| 02        | Agente                       | Titular del Hero con `fx-starlight`: verifica si el desarrollador ya lo aplicó, o lo aplica; retiro de `fx-marker`. |
| 03        | Agente                       | Saneamiento: DT-01 (enlace roto del footer de Servicios), DT-03 (estilos en línea a clases), DT-05 (botones sociales del footer de la 404), DT-13 (ícono de Facebook en modo oscuro), DT-07 (solo con confirmación) y certificación en render real de H8 (DT-02). |
| 04        | Agente + Desarrollador       | SEO técnico: `meta description` del Inicio (DT-04), `canonical` y Open Graph, `robots.txt`, `sitemap.xml` y, con autorización, datos estructurados (DT-08). |

### Detalle de la Iteración 01 (despliegue por lista blanca)

1. `scripts/stage-site.mjs` copia a `_site/` solo las páginas HTML, `dist/`, `public/` y `src/js/`.
2. `package.json` agrega `"build:cf": "pnpm build && node scripts/stage-site.mjs"`.
3. Cloudflare Pages: comando de compilación `pnpm run build:cf`, directorio de salida `_site`.
4. `.gitignore` agrega `_site/`.

Beneficio clave para la Épica 08: la configuración de Cloudflare queda **igual en todas las ramas**; cada rama define
qué hace `build:cf` en su propio `package.json`.

Límites de Cloudflare Pages a vigilar: **25 MiB por archivo** y **20 000 archivos por despliegue**. Los `.mp4` de la
galería son los candidatos a superar el primero.

### Detalle de la Iteración 03 (clases para los estilos en línea)

* `.bg-noise`: textura de ruido fractal del banner, declarada en `input.css` dentro de `@layer components`.
* `.bg-hero-botanical`: fondo del Hero del Inicio con `url("../../public/images/hero-botanical.webp")` (ruta relativa a
  `dist/css/output.css`).

### Detalle de la Iteración 04 (URLs canónicas)

Cloudflare Pages **redirige con un 308** cada `/pagina.html` a `/pagina` y `/index.html` a `/`. Por eso las URLs
canónicas y las del sitemap se escriben **sin extensión**: `/`, `/servicios`, `/suscripcion-floral`, `/galeria`,
`/contacto`. Un `canonical` con `.html` apuntaría a una URL que redirige y Google lo trataría como una señal
contradictoria.

## 4. Definition of Done

* [ ] `_antigravity/` no existe; ninguna configuración activa (Cloudflare, Antigravity) apunta a esa ruta.
* [ ] Claude Code carga `AGENTS.md` (sin `CLAUDE.md` en el proyecto) y los permisos bloquean edición de archivos
  protegidos y operaciones de escritura de Git.
* [ ] Cloudflare publica desde `_site/` con `pnpm run build:cf`, y `/README.md`, `/AGENTS.md`, `/DESIGN.md`,
  `/package.json` y `/_planificacion/README.md` responden 404 en producción.
* [ ] Ningún archivo de `_site/` supera 25 MiB.
* [ ] El titular del Hero muestra el efecto Starlight, respeta movimiento reducido y alto contraste, y conserva la
  jerarquía de `DESIGN.md` §7.3.
* [ ] 0 `style=` en el marcado de los 6 HTML; footer de Servicios sin texto basura; ícono de Facebook legible en
  ambos temas; H8 certificado en render real.
* [ ] Search Console reconoce el `sitemap.xml`, y ninguna página indexable carece de descripción ni de `canonical`.
* [ ] `pnpm build` sin errores y consola limpia en las 6 páginas, en modo claro y oscuro.