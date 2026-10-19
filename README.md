# La Jardinera Florería — Sitio web oficial

Sitio web institucional de **La Jardinera Florería**, taller de diseño floral de autor ubicado en Valdivia, Región de
Los Ríos, Chile. El proyecto presenta los servicios del taller, los planes de suscripción floral, un portafolio
fotográfico y los canales de contacto directo, con una estética editorial inspirada en la naturaleza húmeda del sur de
Chile.

🔹 **Producción:** [https://lajardinerafloreria.cl](https://lajardinerafloreria.cl)
🔹 **Repositorio:** `https://github.com/ffelipecuevasc/la-jardinera`
🔹 **Desarrollo:** [Felipe Cuevas](https://felipecuevas.dev)

---

## 1. Descripción del proyecto

El sitio es una aplicación **multipágina (MPA) estática** generada con **Astro**: seis páginas que comparten un layout,
un header y un footer únicos, estilizadas con Tailwind CSS y animadas con módulos de JavaScript nativo (ES6+). Astro
trabaja solo en compilación: el navegador recibe HTML completo, sin frameworks de interfaz, backend ni gestor de
contenidos, lo que permite tiempos de carga bajos, un despliegue simple y un mantenimiento predecible.

Toda llamada a la acción comercial (cotizaciones, suscripciones, consultas) termina en **WhatsApp** o en el correo del
taller; el formulario de contacto arma el mensaje y lo abre en WhatsApp listo para enviar.

---

## 2. Páginas del sitio

| Página                    | Ruta                         | Contenido principal                                               |
|:--------------------------|:-----------------------------|:------------------------------------------------------------------|
| Inicio                    | `/`                          | Hero editorial, servicios destacados, suscripción, galería, reseñas |
| Servicios                 | `/servicios`                 | Catálogo de 8 servicios con modal de detalle y galería dinámica    |
| Suscripción Floral        | `/suscripcion-floral`        | Hero con cross-fade, condiciones, zona de envío y 3 planes         |
| Galería                   | `/galeria`                   | 6 capítulos en acordeón horizontal (34 piezas) y visor Lightbox    |
| Contacto                  | `/contacto`                  | Canales directos y formulario que se envía por WhatsApp            |
| Página no encontrada      | Cualquier ruta inexistente   | Página de error con retorno al Inicio (`noindex`); se publica como `404.html` |

---

## 3. Características

🔹 Diseño *mobile-first* con header esencial en móvil y panel de navegación anclado.
🔹 Modo claro y oscuro con transición animada mediante la **View Transitions API** y preferencia persistente.
🔹 Sistema de diseño basado en tokens reactivos y estáticos, documentado en `DESIGN.md`.
🔹 Accesibilidad WCAG 2.1 AA: trampas de foco en modales, navegación por teclado, atributos ARIA sincronizados y
objetivos táctiles de 44 px.
🔹 Rendimiento: imágenes `.webp` locales con dimensiones explícitas, carga diferida, íconos SVG en línea y cero
dependencias de iconografía externa.
🔹 Contenido y datos separados de la presentación (`src/js/data/`), con inyección segura en el DOM.

---

## 4. Stack tecnológico

| Capa                   | Tecnología                                   | Detalle                                                    |
|:-----------------------|:---------------------------------------------|:-----------------------------------------------------------|
| Estructura             | Astro `7.x` (salida estática)                | Seis páginas en `src/pages/` compiladas a HTML; sin enrutador ni JS de interfaz en el cliente |
| Estilos                | Tailwind CSS `3.4.x`                         | Vía PostCSS, procesado por Astro; CSS con *hash* en `_site/_astro/` |
| Interactividad         | JavaScript Vanilla (ES6+)                    | Módulos cargados desde un orquestador único (`main.js`)    |
| Tipografías            | Noto Serif y Montserrat                      | Google Fonts                                               |
| Gestor de paquetes     | pnpm `11.24.0`                               | Requiere Node.js `>= 22.22`                                |
| Control de versiones   | Git + GitHub                                 | Rama de producción: `main`                                 |
| Hosting y CDN          | Cloudflare Pages                             | Despliegue continuo desde GitHub                           |
| DNS y dominio          | Cloudflare                                   | `lajardinerafloreria.cl` (canónico) con HTTPS; `www.lajardinerafloreria.cl` redirige con 301 |
| Analítica              | Cloudflare Web Analytics                     | Métricas de tráfico sin cookies                            |
| SEO                    | Google Search Console                        | Indexación, cobertura y rendimiento de búsqueda            |
| Desarrollo asistido    | Claude Code y Antigravity                    | Gobernados por `AGENTS.md` y `_planificacion/`             |

---

## 5. Estructura del repositorio

```text
.
├── astro.config.mjs · postcss.config.cjs
├── AGENTS.md                  # Reglas para agentes de IA (Claude Code, Antigravity)
├── DESIGN.md                  # Sistema de diseño: única fuente de la verdad visual
├── README.md                  # Este documento
├── tailwind.config.js         # Tokens de diseño para Tailwind
├── package.json · pnpm-lock.yaml
├── _site/                     # Salida de astro build (pnpm run build:cf), publicada por Cloudflare (ignorada por Git)
├── public/
│   ├── _redirects             # /public/* → /:splat (301, URLs antiguas)
│   ├── robots.txt
│   ├── icons/                 # Logotipos de terceros en SVG
│   ├── logos/                 # Logotipo de La Jardinera (variante clara y blanca)
│   └── images/                # Fotografías .webp y videos .mp4 por sección
├── src/
│   ├── pages/                 # index, servicios, suscripcion-floral, galeria, contacto y 404 (.astro) y sitemap.xml.js (endpoint)
│   ├── layouts/               # BaseLayout.astro: <head>, header, footer y script
│   ├── components/            # SiteHeader, SiteFooter y SeoHead; secciones/ con FranjaBeneficios
│   ├── data/navegacion.js     # Fuente única de rutas, etiquetas y descripciones (navegación, SEO y sitemap)
│   ├── css/input.css          # Capa base, variables de tema y componentes CSS
│   └── js/
│       ├── main.js            # Orquestador de módulos (importaciones estáticas)
│       ├── data/              # services.js, reviews.js
│       └── modules/           # theme, navigation, carousel, modal, subscription, gallery, contact-form
├── scripts/                   # Herramientas de mantenimiento
└── _planificacion/            # Visión, arquitectura, épicas, iteraciones y bitácoras (no se publica)
```

---

## 6. Requisitos previos

1. **Node.js** `22.22` o superior.
2. **pnpm** `11.24.0` (el campo `packageManager` de `package.json` fija la versión).
3. No hace falta un servidor aparte: `pnpm dev` (Astro) sirve el sitio en local y `pnpm preview` sirve `_site/` tal
   como se publicará.

---

## 7. Instalación y desarrollo local

1. Clona el repositorio e instala las dependencias:

   ```bash
   git clone https://github.com/<usuario>/<repositorio>.git
   cd <repositorio>
   pnpm install
   ```

2. Inicia el servidor de desarrollo de Astro (recarga en caliente) y abre la dirección local que indica la terminal:

   ```bash
   pnpm dev
   ```

3. Antes de publicar, genera `_site/` y revísalo tal como lo servirá Cloudflare Pages:

   ```bash
   pnpm run build:cf
   pnpm preview
   ```

---

## 8. Scripts disponibles

| Comando       | Descripción                                                        |
|:--------------|:-------------------------------------------------------------------|
| `pnpm dev`    | Servidor de desarrollo de Astro con recarga en caliente.           |
| `pnpm preview`| Sirve `_site/` tal como se publicará.                              |
| `pnpm run build:cf` | `astro build`: genera `_site/` para Cloudflare Pages.        |

---

## 9. Sistema de diseño

La identidad visual se rige por `DESIGN.md`: tipografías, escala tipográfica, paleta de tokens reactivos (claro y
oscuro) y estáticos, patrones de composición de color, espaciado, componentes, efectos y reglas de accesibilidad.
Ningún color, tamaño o clase se usa si no está declarado allí o en `tailwind.config.js`.

---

## 10. Despliegue continuo

El sitio se publica con **Cloudflare Pages**, conectado al repositorio de GitHub.

1. Cada *push* a `main` dispara una compilación y un despliegue a producción.
2. Cada *push* a otra rama genera un **despliegue de vista previa** con URL propia en `*.pages.dev`, útil para validar
   cambios antes de fusionarlos.
3. Cloudflare sirve `404.html` automáticamente para cualquier ruta inexistente.
4. Desde el panel de Cloudflare Pages es posible volver a cualquier despliegue anterior con un clic.

| Parámetro                    | Valor                                                                         |
|:-----------------------------|:------------------------------------------------------------------------------|
| Rama de producción           | `main`                                                                        |
| Comando de compilación       | `pnpm run build:cf` (`astro build`, genera `_site/`)                          |
| Directorio de salida         | `_site`                                                                       |
| Dominio personalizado        | `lajardinerafloreria.cl` (canónico); `www.lajardinerafloreria.cl` redirige con 301 |
| Certificado                  | HTTPS gestionado por Cloudflare                                               |

---

## 11. Analítica y SEO

🔹 **Cloudflare Web Analytics** mide visitas, páginas vistas, referentes y métricas de experiencia (Core Web Vitals)
sin cookies ni rastreo entre sitios, por lo que no requiere banner de consentimiento.
🔹 **Google Search Console** monitorea la indexación, la cobertura y el rendimiento en la búsqueda de Google.
🔹 Cada página declara `<title>`, `<meta name="description">`, `canonical` y Open Graph propios; la página 404 declara `noindex, follow`. El sitio publica `robots.txt` y `sitemap.xml`.

---

## 12. Estándares de calidad

| Métrica                  | Objetivo                    |
|:-------------------------|:----------------------------|
| Lighthouse Performance   | 95 o más                    |
| Lighthouse Accessibility | 100                         |
| Lighthouse Best Practices| 100                         |
| First Contentful Paint   | 1,2 s o menos               |
| Cumulative Layout Shift  | 0                           |

Reglas de código que sostienen estas métricas:

✅ Cero JavaScript y CSS en línea.
✅ Imágenes con `width`, `height`, `alt` y contenedor con relación de aspecto.
✅ Rutas absolutas desde la raíz (`/servicios`, `/images/...`), válidas en cualquier profundidad de URL.
✅ Verificación en navegador real, en modo claro y oscuro, en siete tamaños de pantalla.

---

## 13. Desarrollo asistido por inteligencia artificial

El proyecto se desarrolla con apoyo de agentes de IA bajo reglas estrictas:

1. **`AGENTS.md`** define las instrucciones obligatorias para Claude Code (que lo lee de forma nativa) y para
   Antigravity: lectura previa de este `README.md` y de `DESIGN.md`, archivos protegidos, flujo de trabajo y criterios
   de verificación.
2. **`_planificacion/`** contiene la visión del producto, la arquitectura, las épicas con sus iteraciones y las
   bitácoras de ejecución. Cada cambio nace de una iteración especificada y termina con una bitácora verificable.
3. Los agentes **no** editan `AGENTS.md`, `README.md` ni `DESIGN.md`, y **no** ejecutan operaciones de Git que
   modifiquen el repositorio: *commits*, *push* y *merge* son responsabilidad exclusiva del desarrollador.

---

## 14. Convenciones

🔹 **Idioma:** todo el contenido, el código comentado y la documentación se escriben en español de Chile.
🔹 **Commits:** formato «Épica NN - Iteración NN: descripción», una sola línea, máximo 200 caracteres.
🔹 **Ramas:** `main` para producción; ramas descriptivas (`feat/...`, `fix/...`) para trabajo en curso.
🔹 **Codificación:** UTF-8 en todos los archivos.

---

## 15. Hoja de ruta

1. **Épica 07 — Gobernanza multiagente y pulido del Hero** (completada con reservas, 14-10-2026): reorganización de
   la planificación, documentación para Claude Code, nuevo efecto del titular principal y saneamiento de deuda técnica.
2. **Épica 08 — Migración estructural a Astro** (en curso): layout, header, footer y SEO como componentes únicos,
   generados como HTML estático en compilación, con el mismo contenido, diseño y despliegue en Cloudflare Pages.

---

## 16. Autoría y derechos

Diseño y desarrollo web por **Felipe Cuevas** ([felipecuevas.dev](https://felipecuevas.dev)).

Los textos, fotografías, videos y logotipos son propiedad de **La Jardinera Florería** y no pueden reutilizarse sin
autorización. © 2026 La Jardinera Florería. Todos los derechos reservados.