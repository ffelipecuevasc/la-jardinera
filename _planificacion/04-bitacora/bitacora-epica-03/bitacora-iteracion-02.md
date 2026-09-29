# Bitácora de Auditoría y Desarrollo - Épica 03 | Iteración 02

## 1. Resumen Ejecutivo
Se implementó con éxito la **Iteración 02 de la Épica 03 (Página de Suscripción Floral)**:
- Se construyó el bloque estático y semántico del Hero Carousel y la grilla asimétrica de "Condiciones del Servicio" y "Zonas de Envío" (Mapa) dentro del contenedor `<main>` en `suscripcion-floral.html`.
- Se migraron y optimizaron todos los recursos visuales a formato local `.webp` de alta fidelidad, eliminando por completo cualquier llamada a `./static/img/` o CDNs externos.
- Se erradicaron las etiquetas obsoletas `<span class="material-symbols-outlined">`, reemplazándolas por código `<svg>` nativo con tokens cromáticos adaptables (`fill="currentColor" text-primary`).
- Se blindó el layout contra el Cumulative Layout Shift (CLS) especificando dimensiones explícitas (`width`, `height`, `aspect-video`), `fetchpriority="high"` en la primera imagen del Hero y `loading="lazy"` en las secundarias y el mapa.

---

## 2. Acciones Realizadas y Cambios de Código

### A. Migración de Assets a Local WebP
Se crearon y alojaron los assets en `public/images/suscripcion/`:
1. `hero-1.webp`: Ramo de suscripción 1 (convertido desde `SF1.jpg`, 720x1280).
2. `hero-2.webp`: Ramo de suscripción 2 (convertido desde `SF2.jpg`, 720x1280).
3. `hero-3.webp`: Ramo de suscripción 3 (convertido desde `SF5.jpg`, 720x1280).
4. `hero-4.webp`: Ramo de suscripción 4 (convertido desde `SF7.jpg`, 1440x1621).
5. `mapa.webp`: Mapa de cobertura urbana de Valdivia (1069x1072) renderizado con zona de entrega destacada.
6. `mapa.svg`: Copia vectorial de respaldo del mapa oficial.

### B. Reconstrucción del Hero Banner (`<section>`)
- Altura controlada: `h-[80vh] md:h-[600px] relative overflow-hidden flex items-center justify-center`.
- **Fondo de Imágenes (Preparado para JS en Iteración 03):**
  - Contenedor `#banner-carousel` con clase `absolute inset-0 z-0 bg-dark-background`.
  - 4 etiquetas `<img>` con `absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000`.
  - La primera imagen cuenta con `opacity-100` y atributo `fetchpriority="high"`.
  - Las imágenes 2 a 4 cuentan con `loading="lazy"`.
  - Se añadió un overlay de contraste sutil (`bg-black/30`) con `pointer-events-none`.
- **Caja de Texto Central (Glassmorphism):**
  - Contenedor con `z-10 bg-surface/85 dark:bg-dark-surface-container-low/85 backdrop-blur-md rounded-xl p-space-6 lg:p-space-8 shadow-xl max-w-3xl text-center mx-4 border border-outline-variant/30 dark:border-dark-surface-variant`.
  - Separador decorativo superior con glifo `✦`.
  - Título H1: `font-headline-xl text-headline-lg lg:text-headline-xl text-on-surface dark:text-dark-on-background`.
  - Párrafo descriptivo: `font-body-md text-body-md text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed`.

### C. Sección Asimétrica: Condiciones del Servicio y Zonas de Envío
- Grid: `grid grid-cols-1 lg:grid-cols-2 gap-space-8 items-start max-w-[80rem] mx-auto py-space-8 px-margin-mobile lg:px-margin-desktop`.
- **Condiciones del Servicio (Columna Izquierda):**
  - Subtítulo H2 semántico con subrayado decorativo responsivo al hover del contenedor.
  - **Ítem 1 (Flores de temporada):** SVG nativo de flor (MDI standard) en contenedor redondeado con `text-primary`.
  - **Ítem 2 (Pausa):** SVG nativo de calendario (`calendar_month`) con `text-primary`.
  - **Ítem 3 (Entrega):** SVG nativo de transporte (`local_shipping`) con `text-primary`.
  - **Botón CTA (Hook Iteración 03):** Se preservó el identificador `#show-plans-btn` con estilo premium (`bg-primary text-white dark:text-neutral-950 px-8 py-3.5 rounded-lg shadow-md font-semibold`) e iconografía SVG alineada.
- **Zonas de Envío (Columna Derecha - Mapa):**
  - Enlace interactivo hacia Google Maps (`https://maps.app.goo.gl/QNm6ycWU6qznkFZR7`) con `target="_blank"` y `rel="noopener noreferrer"`.
  - Wrapper protegido contra CLS mediante `aspect-video` y fondo neutro.
  - Imagen `mapa.webp` con dimensiones explícitas (`width="1069"` y `height="1072"`), `loading="lazy"` y `object-cover`.
  - Badge flotante inferior izquierdo con SVG nativo de pin y texto "La Jardinera".

---

## 3. Preparación para la Iteración 03
- El contenedor `#banner-carousel` tiene la estructura exacta requerida para que el orquestador JS aplique el ciclo de temporizador/intervalo cross-fade (`opacity-0` a `opacity-100`).
- El botón `#show-plans-btn` quedó vinculado y listo para el *event listener* que alternará la visibilidad y desplazamiento fluido (*smooth scroll*) hacia el catálogo de planes de suscripción.

---

## 4. Verificación de Criterios de Aceptación (Definition of Done)

| Criterio | Estado | Evidencia |
| :--- | :---: | :--- |
| **Limpieza de Assets (100% Offline)** | ✅ CUMPLIDO | Cero llamadas a `static/img/` o CDNs. Todos los assets son `.webp` locales. |
| **Erradicación de Icon Fonts** | ✅ CUMPLIDO | Cero ocurrencias de `material-symbols-outlined`. Reemplazados por SVGs inline. |
| **Prevención de CLS** | ✅ CUMPLIDO | Dimensiones de imagen explícitas, `fetchpriority="high"`, `aspect-video` en mapa. |
| **Modo Oscuro & Contraste** | ✅ CUMPLIDO | Clases `dark:bg-dark-*`, `dark:text-dark-*` y bordes sutiles integrados. |
| **Compilación Tailwind** | ✅ CUMPLIDO | `pnpm build` ejecutado en 469ms sin errores. |
| **Codificación UTF-8** | ✅ CUMPLIDO | 0 caracteres mojibake. |
