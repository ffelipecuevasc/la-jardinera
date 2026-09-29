# Bitácora de Auditoría y Desarrollo - Épica 02 | Iteración 01

## 1. Resumen Ejecutivo
Se dio inicio oficial a la **Épica 02 (Página de Servicios)**, cumpliendo la **Iteración 01: Encofrado Base y Clonación de UI Global (Header/Footer)**.
El archivo legacy `servicios.html` fue purgado y reemplazado en su totalidad por una estructura unificada basada en la arquitectura consolidada en la Épica 01 (`index.html`), garantizando cero regresión visual, consistencia tipográfica, total independencia de librerías externas y herencia inmediata de los módulos Vanilla JS (soporte de tema Claro/Oscuro mediante la View Transitions API).

---

## 2. Acciones Realizadas y Ajustes de Código

### A. Purga y Reemplazo del `<head>`
- Se eliminó todo rastro del `<head>` legacy (enlaces antiguos a CDN de Google Fonts con Fraunces, llamadas remotas a Material Symbols Outlined, rutas relativas obsoletas hacia `./static/` y scripts en línea).
- Se clonó el `<head>` canónico de `index.html` con las fuentes autorizadas (*Montserrat* y *Noto Serif*).
- **SEO & Metadatos:**
  - `<title>Servicios - La Jardinera Florería</title>`
  - `<meta name="description" content="Explora nuestros servicios florales: suscripciones, ramos de novia, decoración de eventos y más. Diseño floral con un toque editorial en Valdivia." />`
  - Favicon oficial: `./public/logos/la-jardinera-original.png`.
  - Hoja de estilos única y optimizada: `./dist/css/output.css`.

### B. Clonación y Ajuste del `<header>` (Barra de Navegación)
- Se inyectó la barra de navegación fija (`fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl`) con el logotipo dual SVG/PNG reactivo al modo oscuro (`la-jardinera-original.png` / `la-jardinera-blanco.png`).
- **Estado Activo (Active State UX):**
  - **"Inicio":** Se despojó de la clase activa y se le asignaron las clases base: `class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1"`, con enlace funcional hacia `./index.html`.
  - **"Servicios":** Se le asignó el estado activo con accesibilidad: `aria-current="page" class="uppercase tracking-wider transition-colors py-space-1 text-primary font-semibold"` y ruta `./servicios.html`.
  - Se mantuvieron intactos los SVGs en línea para Instagram, WhatsApp, el botón de alternar tema (`#theme-toggle-btn`) y el disparador del menú móvil (`#mobile-menu-btn`).

### C. Encofrado del Contenedor Principal (`<main>`)
- Entre el `<header>` y el `<footer>`, se dejó listo el lienzo para la Iteración 02:
  `<main class="w-full pt-20 bg-background min-h-screen flex flex-col items-center"></main>`
  (con `pt-20` para absorber el alto exacto del navbar fijo y evitar colisiones de layout).

### D. Clonación del `<footer>` y Conexión de Scripts
- Se clonó el pie de página de 4 columnas de la Épica 01 con todos sus SVGs inline limpios (`currentColor`), datos de contacto clicables con esquemas `tel:`, `mailto:` y enlace geolocalizado a Google Maps (`Valdivia, Chile`), además de los medios de pago semánticos.
- En la navegación interna del footer, se sincronizó el estado activo marcando "Servicios" con `aria-current="page" class="transition-colors text-primary font-semibold"` y enlazando "Inicio" hacia `./index.html`.
- Se vinculó el orquestador modular al cierre del `<body>`:
  `<script type="module" src="./src/js/main.js"></script>`.

---

## 3. Verificación de Criterios de Aceptación (Definition of Done)

| Escenario / Criterio | Estado | Evidencia / Justificación |
| :--- | :---: | :--- |
| **Escenario 1: Transición Cero Layout Shift (CLS)** | ✅ CUMPLIDO | El `<header>` y el `<footer>` tienen dimensiones idénticas basadas en tokens (`h-20`, `max-w-[80rem]`, `px-margin-mobile lg:px-margin-desktop`). Al navegar entre Inicio y Servicios no existe salto visual ni descuadre. |
| **Escenario 2: Estado Activo (UX)** | ✅ CUMPLIDO | En la barra de navegación de `servicios.html`, el ítem "Servicios" resalta de forma nítida en `text-primary font-semibold` con `aria-current="page"`, mientras "Inicio" vuelve al estado neutro interactivo. |
| **Escenario 3: Herencia Funcional Inmediata** | ✅ CUMPLIDO | Al cargar `src/js/main.js`, `initTheme()` evalúa el LocalStorage y sincroniza el modo claro/oscuro junto con la *View Transitions API* sin requerir reescritura de JavaScript. |
| **Compilación Tailwind CSS** | ✅ CUMPLIDO | Se ejecutó `pnpm build` (`tailwindcss -i ./src/css/input.css -o ./dist/css/output.css --minify`) completándose en ~516ms sin alertas ni clases huérfanas. |

---

## 4. Anomalías Detectadas y Deuda Técnica

1. **Ausencia del contenedor `#mobile-menu` en el DOM:**
   - En `index.html` y en la clonación actual de `servicios.html`, el botón `#mobile-menu-btn` existe en el DOM, pero el contenedor desplegable `<div id="mobile-menu">` no fue incorporado en la Épica 01.
   - El módulo `src/js/modules/navigation.js` posee guardas defensivas (`if (!mobileMenuBtn || !mobileMenu) return;`), por lo que no genera excepciones en la consola, pero el menú móvil permanece inactivo a nivel drawer hasta que se estandarice el contenedor del menú para todas las páginas.
2. **Hipervínculos globales en `index.html`:**
   - En el `index.html`, los enlaces de navegación del navbar y footer usan mayoritariamente `href="#"`. En `servicios.html` hemos enlazado explícitamente "Inicio" a `./index.html` y "Servicios" a `./servicios.html`. En una iteración de refinamiento o unificación de enlaces convendrá sincronizar los `href` reales en `index.html` para permitir la navegación bidireccional perfecta.
