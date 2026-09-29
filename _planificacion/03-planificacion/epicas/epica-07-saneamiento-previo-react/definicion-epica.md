# Épica 07: Gobernanza Multiagente, Titular Starlight y Saneamiento Previo a React

> **Prerrequisito:** certificar en render real la Iteración 13 de la Épica 06 (Hallazgo H8). Mientras no se certifique,
> la Fase 2 de la Épica 06 sigue abierta y su verificación se absorbe en la Iteración 03 de esta épica.

## 1. Objetivo de la Épica

Preparar el proyecto para trabajar con más de un agente de IA y dejarlo en un estado limpio antes de introducir React
(Épica 08):

1. Reorganizar la gobernanza: `_antigravity/` pasa a `_planificacion/`, nacen `AGENTS.md`, `README.md` y `DESIGN.md`
   en la raíz, y Claude Code queda restringido por permisos.
2. Reemplazar el resaltador del titular del Hero por el efecto **Starlight**, adaptado al sistema de diseño.
3. Saldar la deuda técnica que distorsionaría la migración a componentes (enlace roto del footer de Servicios,
   estilos en línea, diferencias entre footers).
4. Completar el SEO técnico básico que Google Search Console espera encontrar.

## 2. Alcance

* **Archivos:** los 6 HTML (solo donde cada iteración lo indique), `src/css/input.css`, `scripts/`, `.claude/`,
  `_planificacion/**`, y los documentos raíz (editados por el desarrollador).
* **Fuera de alcance:** cambios de arquitectura (React, empaquetadores) y cambios de contenido comercial.

## 3. Plan de Iteraciones

| Iteración | Responsable principal | Entregable                                                                                     |
|:----------|:----------------------|:-----------------------------------------------------------------------------------------------|
| 01        | Desarrollador         | Renombrado a `_planificacion/`, `AGENTS.md`, `README.md`, `DESIGN.md` en la raíz, `.claude/settings.json`, comando de compilación de Cloudflare actualizado, `stack-tecnologico.md` y `proposito-y-alcance.md` al día (DT-09). |
| 02        | Agente                | Titular del Hero con `fx-starlight` en `index.html` y `src/css/input.css`; retiro de `fx-marker`. |
| 03        | Agente                | Saneamiento: DT-01 (enlace roto del footer de Servicios), DT-03 (estilos en línea a clases), DT-05 (botones sociales del footer de la 404), DT-07 ("Redbanc") y certificación en render real de H8 (DT-02). |
| 04        | Agente                | SEO técnico: `meta description` del Inicio (DT-04), `robots.txt`, `sitemap.xml`, `link rel="canonical"` y Open Graph en las 5 páginas indexables (DT-08). |

### Detalle de la Iteración 01 (despliegue)

Se adopta una **lista blanca** para el despliegue en lugar de borrar carpetas:

1. `scripts/stage-site.mjs` copia a `_site/` solo las páginas HTML, `dist/`, `public/` y `src/js/`.
2. `package.json` agrega `"build:cf": "pnpm build && node scripts/stage-site.mjs"`.
3. Cloudflare Pages: comando de compilación `pnpm run build:cf`, directorio de salida `_site`.
4. `.gitignore` agrega `_site/`.

Beneficio clave para la Épica 08: la configuración de Cloudflare queda **igual en todas las ramas**; cada rama define
qué hace `build:cf` en su propio `package.json`.

### Detalle de la Iteración 03 (clases para los estilos en línea)

* `.bg-noise`: textura de ruido fractal del banner, declarada en `input.css` dentro de `@layer components`.
* `.bg-hero-botanical`: fondo del Hero del Inicio con `url('../../public/images/hero-botanical.webp')` (ruta relativa a
  `dist/css/output.css`).

## 4. Definition of Done

* [ ] `_antigravity/` no existe; ninguna configuración activa (Cloudflare, Antigravity) apunta a esa ruta.
* [ ] Claude Code carga `AGENTS.md` (sin `CLAUDE.md` en el proyecto) y los permisos bloquean edición de archivos
  protegidos y operaciones de escritura de Git.
* [ ] `https://www.lajardinerafloreria.cl/_planificacion/README.md` y `/AGENTS.md` responden 404.
* [ ] El titular del Hero muestra el efecto Starlight, respeta movimiento reducido y alto contraste, y conserva la
  jerarquía de `DESIGN.md` §7.3.
* [ ] 0 `style=` en los 6 HTML; footer de Servicios sin texto basura; H8 certificado en render real.
* [ ] Search Console reconoce el `sitemap.xml` y no reporta páginas sin descripción.
* [ ] `pnpm build` sin errores y consola limpia en las 6 páginas, en modo claro y oscuro.