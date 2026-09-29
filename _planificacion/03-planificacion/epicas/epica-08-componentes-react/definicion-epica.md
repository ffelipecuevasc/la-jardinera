# Épica 08: Componentes React con Renderizado Estático (Header, Navegación y Footer)

> **Estado:** planificación conceptual, pendiente de aprobación.
> **Prerrequisitos:** Épica 07 cerrada (en especial el despliegue por lista blanca y el saneamiento de footers).
> **Documentos a actualizar por el desarrollador al aprobar la épica:** `02-arquitectura/stack-tecnologico.md` y
> `01-vision/proposito-y-alcance.md` (hoy prohíben React), `AGENTS.md` §4 y `README.md` §4.

---

## 1. Problema que resuelve

El header (≈ 21.000 caracteres) y el footer están **copiados a mano en 6 archivos HTML**. La Fase 2 de la Épica 06
necesitó seis iteraciones para replicar un solo cambio del header, y aun así aparecieron divergencias (patrón distinto
en la 404, enlace roto en el footer de Servicios, dos variantes de footer). Un componente reutilizable con una única
fuente de datos de navegación elimina esa clase de error.

## 2. Principio rector

**React como motor de plantillas en tiempo de compilación, no como SPA.** El HTML publicado debe seguir conteniendo
el header y el footer completos, igual que hoy. Solo las partes interactivas pueden hidratarse en el navegador, y
únicamente si la medición lo justifica.

Se descarta montar el header con React del lado del cliente (`createRoot` sobre un `<div>` vacío) porque:

1. El header aparecería después de cargar JavaScript: rompe CLS = 0 y retrasa el primer pintado útil.
2. Sin JavaScript no habría navegación, y los rastreadores verían páginas sin enlaces internos.
3. Cargaría React completo (del orden de decenas de KB comprimidos) en las 6 páginas para dibujar enlaces estáticos,
   en contra del objetivo Lighthouse Performance de 95 o más.

## 3. Alternativas evaluadas

| Criterio                            | A. Vite + React con prerender propio (recomendada) | B. Astro + integración React     | C. React en el cliente |
|:------------------------------------|:---------------------------------------------------|:---------------------------------|:-----------------------|
| HTML completo sin JavaScript        | Sí                                                 | Sí                               | No                     |
| Cambio sobre los 6 HTML actuales    | Bajo: se reemplazan bloques por marcadores         | Alto: se reescriben como `.astro` | Bajo                   |
| JavaScript enviado por defecto      | Ninguno                                            | Ninguno                          | React completo         |
| Islas interactivas                  | Manuales (`hydrateRoot`)                           | Nativas (`client:*`)             | Todo es cliente        |
| Adopción gradual                    | Alta                                               | Media                            | Alta                   |
| Riesgo de regresión de SEO y CLS    | Bajo                                               | Bajo                             | Alto                   |

**Recomendación:** opción A. Conserva la arquitectura MPA y los módulos Vanilla existentes, y permite introducir
componentes de a uno. La opción B queda como ruta de evolución si más adelante se quiere componentizar el contenido de
las páginas completas.

## 4. Arquitectura objetivo (opción A)

```text
index.html, servicios.html, ...        # Conservan su <main>; header y footer pasan a marcadores:
                                        #   <!--app:header-->  y  <!--app:footer-->
src/
├── components/
│   ├── layout/
│   │   ├── SiteHeader.jsx             # Marca + navegación + clúster de acciones + panel móvil
│   │   ├── DesktopNav.jsx
│   │   ├── MobileMenu.jsx
│   │   ├── SiteFooter.jsx
│   │   └── BrandLink.jsx
│   └── icons/                         # Íconos SVG como componentes (atributos en camelCase)
├── data/
│   └── navigation.js                  # Fuente única: 5 enlaces, rutas, etiquetas y claves de página
├── islands/                           # Puntos de hidratación, solo si se aprueban (Iteración 06)
├── js/                                # Módulos Vanilla actuales (theme, carousel, modal, ...)
└── css/input.css
vite.config.js                          # Entradas multipágina + plugin de prerender
```

**Flujo de compilación:**

1. Vite procesa las 6 páginas como entradas.
2. Un plugin propio, en `transformIndexHtml`, identifica la página (por nombre de archivo), renderiza
   `<SiteHeader active="servicios" />` y `<SiteFooter active="servicios" />` con `renderToStaticMarkup` y reemplaza los
   marcadores. En la 404 se pasa `active={null}` (estado neutro).
3. Tailwind se integra vía PostCSS y su `content` incluye `./src/**/*.{js,jsx}`.
4. El resultado se escribe en `_site/`, el mismo directorio que ya usa Cloudflare desde la Épica 07.

## 5. Configuración de Cloudflare Pages

Gracias a la lista blanca de la Épica 07, **la configuración del proyecto en Cloudflare no cambia**:

| Parámetro               | Valor                    | Nota                                                                 |
|:------------------------|:-------------------------|:---------------------------------------------------------------------|
| Preset de framework     | Ninguno                  | Se controla todo desde `package.json`.                               |
| Comando de compilación  | `pnpm run build:cf`      | En `main` compila Tailwind y copia; en la rama de React ejecuta `vite build`. |
| Directorio de salida    | `_site`                  | Vite se configura con `build.outDir: '_site'`.                       |
| Variables de entorno    | `NODE_VERSION=22`, `PNPM_VERSION=11.24.0` | pnpm 11 exige Node 22.13 o superior. Verificar en el log de compilación que se usan esas versiones. |

La rama de trabajo (`feat/react-layout`) genera **despliegues de vista previa** en `*.pages.dev`; producción no se
toca hasta la fusión en `main`, y el panel de Cloudflare permite revertir al despliegue anterior en un clic.

## 6. Plan de Iteraciones

| Iteración | Entregable                                           | Resultado verificable                                                                      |
|:----------|:-----------------------------------------------------|:-------------------------------------------------------------------------------------------|
| 01        | **Decisión de arquitectura (ADR-001) y línea base**  | ADR en `decisiones-tecnicas.md` (opción A/B, React o Preact). Informe Lighthouse de las 6 páginas actuales como referencia. |
| 02        | **Vite en paridad 1:1, sin React**                   | Las 6 páginas compiladas con Vite se ven y comportan igual. `main.js` usa importaciones estáticas (DT-10). `public/` conserva sus rutas. Vista previa en Cloudflare funcionando. |
| 03        | **Infraestructura React y fuente única de navegación** | `react`, `react-dom` y `@vitejs/plugin-react` instalados; `src/data/navigation.js`; plugin de prerender probado con un componente mínimo. |
| 04        | **Footer como componente**                           | `<SiteFooter>` reemplaza los 6 footers. Se unifica la variante (DT-06). Cero JavaScript nuevo en el cliente. |
| 05        | **Header como componente estático**                  | `<SiteHeader>` reemplaza los 6 headers con los mismos IDs y clases; `navigation.js` sigue funcionando sin cambios. Diferencia de marcado contra la versión actual = solo espacios en blanco. |
| 06        | **Isla interactiva del menú móvil (opcional)**       | Medición del costo: si hidratar `MobileMenu` con React (o Preact) no baja Performance de 95, se adopta y se retira `navigation.js`; si lo baja, se mantiene el módulo Vanilla y se documenta la decisión. |
| 07        | **Certificación y paso a producción**                | Auditoría transversal en render real (7 viewports, claro y oscuro), Lighthouse igual o mejor que la línea base, documentación actualizada, fusión a `main` por el desarrollador. |

### Notas técnicas por iteración

**Iteración 02 — riesgos específicos de Vite:**

1. **Carpeta `public/`:** Vite sirve su contenido desde la raíz (`/images/...`), pero el sitio usa `./public/images/...`
   en HTML y en datos JS (`services.js`, `data-src` de la galería), que Vite no reescribe. Solución: `publicDir: false`
   y copia de `public/` a `_site/public/` en el cierre de la compilación, conservando todas las rutas.
2. **Importaciones dinámicas:** `main.js` resuelve módulos con `import(path)` donde `path` es una variable; Vite no
   puede empaquetarlos. Se reescribe con un registro de funciones (`() => import('./modules/theme.js')`), manteniendo
   la carga diferida por módulo.
3. **Rutas relativas:** `base: './'` en `vite.config.js` para no depender de la raíz del dominio.
4. **Archivos especiales de Cloudflare** (`_headers`, `_redirects`, `robots.txt`, `sitemap.xml`): deben terminar en la
   raíz de `_site/`.

**Iteraciones 04 y 05 — traducción a JSX:** `class` → `className`, `for` → `htmlFor`, atributos SVG en camelCase
(`fill-rule` → `fillRule`, `stroke-linecap` → `strokeLinecap`, `clip-rule` → `clipRule`). Las clases de Tailwind se
escriben completas y literales dentro de los componentes; la clase activa se elige entre dos cadenas literales, nunca
se arma por concatenación.

**Iteración 06 — Preact como alternativa:** `preact/compat` expone la misma API con una fracción del peso. Si se
aprueba, se configura como alias de `react` en Vite y los componentes no cambian.

## 7. Riesgos y mitigaciones

| Riesgo                                                        | Mitigación                                                                    |
|:--------------------------------------------------------------|:------------------------------------------------------------------------------|
| Regresión de rendimiento (CLS, peso de JavaScript)            | Prerender estático; islas solo con medición (Iteración 06); línea base en la 01. |
| Rutas de imágenes rotas al introducir Vite                    | `publicDir: false` y copia literal de `public/` (Iteración 02).               |
| Clases de Tailwind no detectadas en `.jsx`                    | Ampliar `content`; verificar `output` por búsqueda de texto.                  |
| Desajuste de hidratación en la isla                           | Renderizar la isla con `renderToString` y el mismo componente que se hidrata. |
| Versiones de Node/pnpm distintas en Cloudflare                | Variables `NODE_VERSION` y `PNPM_VERSION`; revisar el log de cada despliegue. |
| Ruptura de producción durante la migración                    | Todo el trabajo en `feat/react-layout` con vistas previas; `main` intacto hasta la Iteración 07. |
| Desarrollo en Windows                                         | Scripts en Node (sin `cp`, `rm` ni sintaxis de shell en `package.json`).      |

## 8. Definition of Done

* [ ] Header y footer existen **una sola vez** en el código fuente (componentes) y se generan en los 6 HTML.
* [ ] El HTML publicado contiene header y footer completos con JavaScript desactivado.
* [ ] Paridad visual y funcional con la versión anterior en 7 viewports, modo claro y oscuro.
* [ ] Lighthouse de las 6 páginas igual o mejor que la línea base; CLS = 0.
* [ ] Cloudflare Pages publica desde `_site/` sin cambios de configuración y sin exponer `_planificacion/`.
* [ ] `stack-tecnologico.md`, `DESIGN.md` (§9 y §10), `AGENTS.md` y `README.md` actualizados por el desarrollador.