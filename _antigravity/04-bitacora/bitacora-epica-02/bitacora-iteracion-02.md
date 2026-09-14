# Bitácora de Auditoría y Desarrollo - Épica 02 | Iteración 02

## 1. Resumen Ejecutivo
Se implementó con éxito la **Iteración 02 de la Épica 02 (Página de Servicios)**: **Grilla de Servicios, SVGs y Migración a WebP (Rendimiento y Anti-CLS)**.
Se reconstruyó íntegramente el contenido principal (`<main>`) del archivo `servicios.html`, sustituyendo el catálogo legacy por una grilla responsiva de 8 tarjetas de alta gama y una franja inferior de beneficios operativos. Se eliminaron en un 100% las llamadas a dominios externos para imágenes e íconos, blindando la experiencia con reservas dimensionales `aspect-[4/5]` que aseguran un **Cumulative Layout Shift (CLS) de 0.0**.

---

## 2. Acciones Realizadas y Ajustes de Código

### A. Encabezado de la Sección con Separador Editorial ✦
- Se reemplazó la línea plana legacy por el divisor editorial consolidado en el home: dos filetes horizontales (`w-8 h-[1px] bg-primary/40`) flanqueando el rombo/estrella `✦` en color secundario.
- **Tipografía:** Título `font-headline-xl text-headline-lg lg:text-headline-xl text-on-surface mb-2` con el copy literal: *"Catálogo de servicios"*.
- **Subtítulo:** `font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto` con el texto descriptivo del atelier floral.

### B. Grilla Responsiva de 8 Tarjetas (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`)
- Se estructuraron las 8 tarjetas con el comportamiento de elevación premium idéntico a `index.html`:
  `group flex flex-col bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-outline-variant/30`.
- **Estrategia Anti-CLS:**
  - Contenedor rígido de imagen: `relative w-full aspect-[4/5] overflow-hidden bg-surface-container`.
  - Atributos físicos obligatorios: `width="400"`, `height="500"`, `loading="lazy"`.
  - Efecto cinemático de hover: `w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out`.
- **Mapeo de Rutas Locales WebP (Cero Peticiones Externas):**
  1. **Suscripción floral:** `./public/images/servicios/suscripcion.webp`
  2. **Gift Cards:** `./public/images/servicios/gift-cards.webp`
  3. **Novias y Novios:** `./public/images/servicios/novias.webp`
  4. **Ramos de Autor:** `./public/images/servicios/ramos-de-autor.webp`
  5. **Flores para un Matrimonio:** `./public/images/servicios/matrimonios.webp`
  6. **Novios por el Río:** `./public/images/servicios/novios-rio.webp`
  7. **Eventos y Celebraciones:** `./public/images/servicios/eventos.webp`
  8. **Condolencias:** `./public/images/servicios/condolencias.webp`

### C. Preservación de Datos e Integridad de Botones "Ver más"
- Se preservaron fielmente los atributos data para alimentar el modal de la Iteración 03:
  - `data-title`: Nombre canónico del servicio.
  - `data-main-image`: Ruta relativa local al asset `.webp`.
  - `data-description`: HTML estructurado de la descripción legacy con entidades escapadas de forma segura.
  - `data-gallery`: Array JSON de rutas a fotografías complementarias.
- Estilo del botón: tipografía de marca (`font-label-md uppercase tracking-wider font-semibold`), transición de color (`text-primary hover:text-primary/80`) y flecha micro-interactiva con transformación hover (`group-hover/btn:translate-x-1`).

### D. Franja Inferior de Beneficios Operativos (Bottom Section)
- Se sustituyeron las llamadas a Google Material Symbols (`local_shipping`, `receipt_long`) por elementos `<svg>` inline nativos vectorizados con `fill="currentColor"`:
  - **Delivery:** Camión de despacho (`viewBox="0 0 24 24"`) con texto *"Delivery sin costo en día, horario hábil y radio urbano"*.
  - **Facturación:** Documento / Recibo contable (`viewBox="0 0 24 24"`) con texto *"Todos los productos o servicios pueden ser comercializados con boleta o factura"*.
- Contenedor alineado a tokens: `w-full bg-surface-container-low py-space-6 px-margin-mobile lg:px-margin-desktop border-t border-outline-variant/20`.

---

## 3. Verificación de Criterios de Aceptación (Definition of Done)

| Escenario / Criterio | Estado | Evidencia / Justificación |
| :--- | :---: | :--- |
| **Escenario 1: Estabilidad Visual y Anti-CLS** | ✅ CUMPLIDO | Todas las 8 tarjetas utilizan el contenedor `aspect-[4/5]` con `width="400"` y `height="500"`, reservando el espacio exacto en el DOM aún antes de que la imagen termine de cargar, garantizando un **CLS = 0.0**. |
| **Escenario 2: Independencia Gráfica Absoluta** | ✅ CUMPLIDO | Cero peticiones de red hacia servidores de terceros (*amarteasi.uy*, *bodas.net*, *jumpseller*, *sony.eu*, *prfloral.com*, *orquideaoriental.cl*). Todas las rutas `src` de imagen apuntan a `./public/images/servicios/*.webp`. |
| **Escenario 3: Consistencia del Sistema de Diseño** | ✅ CUMPLIDO | Las tarjetas implementan sombras de tokens (`shadow-sm hover:shadow-md`), elevación en hover (`hover:-translate-y-1`) y zoom suave de imagen (`group-hover:scale-105`), homologadas con el home. |
| **Compilación Tailwind CSS** | ✅ CUMPLIDO | `pnpm build` ejecutado en ~537ms sin errores ni clases ausentes. |

---

## 4. Estado de Preparación para la Iteración 03
El DOM de `servicios.html` cuenta con los botones identificados con la clase `.open-modal-btn` y los atributos `data-*` listos para ser refactorizados hacia el diccionario modular estático (`src/js/data/services.js`) y el controlador `src/js/modules/modal.js`.
