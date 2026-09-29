# La Jardinera Florería — Sitio web oficial

Sitio web institucional de **La Jardinera Florería**, taller de diseño floral de autor ubicado en Valdivia, Región de
Los Ríos, Chile. El proyecto presenta los servicios del taller, los planes de suscripción floral, un portafolio
fotográfico y los canales de contacto directo, con una estética editorial inspirada en la naturaleza húmeda del sur de
Chile.

🔹 **Producción:** [https://www.lajardinerafloreria.cl](https://www.lajardinerafloreria.cl)
🔹 **Repositorio:** `https://github.com/<usuario>/<repositorio>` *(completar)*
🔹 **Desarrollo:** [Felipe Cuevas](https://felipecuevas.dev)

---

## 1. Descripción del proyecto

El sitio es una aplicación **multipágina (MPA) estática**: seis documentos HTML independientes, estilizados con
Tailwind CSS compilado localmente y animados con módulos de JavaScript nativo (ES6+). No depende de frameworks de
interfaz, de un backend ni de un gestor de contenidos, lo que permite tiempos de carga bajos, un despliegue simple y un
mantenimiento predecible.

Toda llamada a la acción comercial (cotizaciones, suscripciones, consultas) termina en **WhatsApp** o en el correo del
taller; el formulario de contacto arma el mensaje y lo abre en WhatsApp listo para enviar.

---

## 2. Páginas del sitio

| Página                    | Ruta                         | Contenido principal                                               |
|:--------------------------|:-----------------------------|:------------------------------------------------------------------|
| Inicio                    | `/index.html`                | Hero editorial, servicios destacados, suscripción, galería, reseñas |
| Servicios                 | `/servicios.html`            | Catálogo de 8 servicios con modal de detalle y galería dinámica    |
| Suscripción Floral        | `/suscripcion-floral.html`   | Hero con cross-fade, condiciones, zona de envío y 3 planes         |
| Galería                   | `/galeria.html`              | 6 capítulos en acordeón horizontal (34 piezas) y visor Lightbox    |
| Contacto                  | `/contacto.html`             | Canales directos y formulario que se envía por WhatsApp            |
| Página no encontrada      | `/404.html`                  | Página de error con retorno al Inicio (`noindex`)                  |

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
| Estructura             | HTML5 semántico                              | Seis páginas físicas, sin enrutador del lado del cliente   |
| Estilos                | Tailwind CSS `3.4.x`                         | Compilación por CLI a `dist/css/output.css`                 |
| Interactividad         | JavaScript Vanilla (ES6+)                    | Módulos cargados desde un orquestador único (`main.js`)    |
| Tipografías            | Noto Serif y Montserrat                      | Google Fonts                                               |
| Gestor de paquetes     | pnpm `11.24.0`                               | Requiere Node.js `>= 22.13`                                |
| Control de versiones   | Git + GitHub                                 | Rama de producción: `main`                                 |
| Hosting y CDN          | Cloudflare Pages                             | Despliegue continuo desde GitHub                           |
| DNS y dominio          | Cloudflare                                   | `lajardinerafloreria.cl` y `www.lajardinerafloreria.cl` con HTTPS |
| Analítica              | Cloudflare Web Analytics                     | Métricas de tráfico sin cookies                            |
| SEO                    | Google Search Console                        | Indexación, cobertura y rendimiento de búsqueda            |
| Desarrollo asistido    | Claude Code y Antigravity                    | Gobernados por `AGENTS.md` y `_planificacion/`             |

---

## 5. Estructura del repositorio

```text
.
├── index.html · servicios.html · suscripcion-floral.html
├── galeria.html · contacto.html · 404.html
├── AGENTS.md                  # Reglas para agentes de IA (Claude Code, Antigravity)
├── DESIGN.md                  # Sistema de diseño: única fuente de la verdad visual
├── README.md                  # Este documento
├── tailwind.config.js         # Tokens de diseño para Tailwind
├── package.json · pnpm-lock.yaml
├── dist/
│   └── css/output.css         # CSS compilado (generado por pnpm build)
├── public/
│   ├── icons/                 # Logotipos de terceros en SVG
│   ├── logos/                 # Logotipo de La Jardinera (variante clara y blanca)
│   └── images/                # Fotografías .webp y videos .mp4 por sección
├── src/
│   ├── css/input.css          # Capa base, variables de tema y componentes CSS
│   └── js/
│       ├── main.js            # Orquestador de módulos
│       ├── data/              # services.js, reviews.js
│       └── modules/           # theme, navigation, carousel, modal, subscription, gallery, contact-form
├── scripts/                   # Herramientas de mantenimiento
└── _planificacion/            # Visión, arquitectura, épicas, iteraciones y bitácoras (no se publica)
```

---

## 6. Requisitos previos

1. **Node.js** `22.13` o superior.
2. **pnpm** `11.24.0` (el campo `packageManager` de `package.json` fija la versión).
3. Un servidor HTTP local para previsualizar: los módulos ES no funcionan abriendo los archivos con `file://`.

---

## 7. Instalación y desarrollo local

1. Clona el repositorio e instala las dependencias:

   ```bash
   git clone https://github.com/<usuario>/<repositorio>.git
   cd <repositorio>
   pnpm install
   ```

2. Inicia Tailwind en modo observación:

   ```bash
   pnpm dev
   ```

3. En otra terminal, sirve la raíz del proyecto por HTTP (por ejemplo, con la extensión Live Server del editor o con
   `python -m http.server 5500`) y abre `http://localhost:5500`.

4. Antes de publicar, genera el CSS de producción:

   ```bash
   pnpm build
   ```

---

## 8. Scripts disponibles

| Comando       | Descripción                                                        |
|:--------------|:-------------------------------------------------------------------|
| `pnpm dev`    | Compila `src/css/input.css` en modo observación.                   |
| `pnpm build`  | Compila y minifica `dist/css/output.css` para producción.          |

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
| Comando de compilación       | Compila Tailwind y excluye del despliegue la carpeta `_planificacion/` y la documentación interna |
| Dominio personalizado        | `lajardinerafloreria.cl` y `www.lajardinerafloreria.cl`                       |
| Certificado                  | HTTPS gestionado por Cloudflare                                               |

---

## 11. Analítica y SEO

🔹 **Cloudflare Web Analytics** mide visitas, páginas vistas, referentes y métricas de experiencia (Core Web Vitals)
sin cookies ni rastreo entre sitios, por lo que no requiere banner de consentimiento.
🔹 **Google Search Console** monitorea la indexación, la cobertura y el rendimiento en la búsqueda de Google.
🔹 Cada página declara `<title>` y `<meta name="description">` propios; la página 404 declara `noindex, follow`.

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
✅ Rutas relativas (`./`) para funcionar en cualquier alojamiento estático.
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
🔹 **Commits:** formato *Conventional Commits* en español, por ejemplo `fix(footer): corrige enlace de marca en servicios`.
🔹 **Ramas:** `main` para producción; ramas descriptivas (`feat/...`, `fix/...`) para trabajo en curso.
🔹 **Codificación:** UTF-8 en todos los archivos.

---

## 15. Hoja de ruta

1. **Épica 07 — Gobernanza multiagente y pulido del Hero:** reorganización de la planificación, documentación para
   Claude Code, nuevo efecto del titular principal y saneamiento de deuda técnica.
2. **Épica 08 — Componentes React con renderizado estático:** header, navegación y footer como componentes
   reutilizables, generados como HTML en tiempo de compilación para conservar el rendimiento y el SEO actuales.

---

## 16. Autoría y derechos

Diseño y desarrollo web por **Felipe Cuevas** ([felipecuevas.dev](https://felipecuevas.dev)).

Los textos, fotografías, videos y logotipos son propiedad de **La Jardinera Florería** y no pueden reutilizarse sin
autorización. © 2026 La Jardinera Florería. Todos los derechos reservados.