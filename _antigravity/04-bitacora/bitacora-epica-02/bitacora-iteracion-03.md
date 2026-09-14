# Bitácora de Auditoría y Desarrollo - Épica 02 | Iteración 03

## 1. Resumen Ejecutivo
Se ejecutó con éxito la **Iteración 03 de la Épica 02 (Página de Servicios)**: **Arquitectura MVC del Modal y Refactorización de Datos (`services.js`)**.
Se desacopló por completo la capa de datos (Model) de la capa de presentación (View/DOM), eliminando todos los atributos sucios del HTML y centralizándolos en un diccionario estático y seguro en JavaScript (`src/js/data/services.js`). Además, se refactorizó el módulo del modal (`src/js/modules/modal.js`) para renderizar dinámicamente el contenido, la galería de imágenes con lazy loading anti-CLS y la microinteracción SVG animada de alta fidelidad.

---

## 2. Acciones Realizadas y Cambios de Código

### A. Capa de Datos (Model): Creación de `src/js/data/services.js`
- Se creó el archivo de diccionario modular `src/js/data/services.js` exportando la constante `servicesData`.
- Se mapearon los 8 servicios mediante claves semánticas únicas:
  1. `suscripcion` (*Suscripción floral*)
  2. `gift-cards` (*Gift Cards*)
  3. `novias` (*Novias y Novios*)
  4. `ramos-de-autor` (*Ramos de Autor*)
  5. `matrimonios` (*Flores para un Matrimonio*)
  6. `novios-rio` (*Novios por el Río*)
  7. `eventos` (*Eventos y Celebraciones*)
  8. `condolencias` (*Condolencias*)
- **Normalización Gráfica y Purga de URLs Legacy:**
  - Se eliminaron por completo las referencias a servidores externos (*prfloral.com*) y rutas legacy (*./static/img/*).
  - Todas las imágenes principales apuntan a `./public/images/servicios/[clave].webp`.
  - Todas las imágenes de galería apuntan a `./public/images/servicios/galeria/[clave]-[n].webp`.
  - Se creó físicamente la carpeta `public/images/servicios/galeria/`.

### B. Limpieza Quirúrgica del HTML (`servicios.html`)
- Se inspeccionaron las 8 tarjetas del catálogo de servicios.
- Se eliminaron el 100% de los atributos sucios: `data-title`, `data-main-image`, `data-description` y `data-gallery` (0 ocurrencias residuales).
- Se sustituyeron por el identificador unificado: `data-service-id="[clave]"`.
- Se inyectó la estructura base del modal (`#service-modal`) al final del `<body>` con clases premium de Tailwind:
  - Fondo y desenfoque: `bg-neutral-900/60 backdrop-blur-sm z-50`.
  - Panel flotante: `bg-surface shadow-2xl rounded-t-2xl md:rounded-xl border border-outline-variant/30`.
  - Anillo SVG animado alrededor del retrato floral.
  - Atributos de accesibilidad: `role="dialog"`, `aria-modal="true"`, `aria-hidden="true"`.

### C. Refactorización del Controlador (`src/js/modules/modal.js`)
- Se integró la importación de `servicesData` desde `../data/services.js`.
- **Inyección Dinámica:** Al hacer click en cualquier botón `.open-modal-btn`, el controlador captura `data-service-id`, recupera el objeto del diccionario y actualiza:
  - Título (`#modal-title`).
  - Imagen principal (`#modal-main-image`).
  - Descripción (`#modal-description`).
  - CTA dinámico (`#modal-cotizar-btn` con parámetro de URL `?service=...`).
- **Galería Dinámica en Vanilla JS:**
  - Se vacía `#modal-gallery-container`.
  - Se crean dinámicamente etiquetas `<img>` con clases: `w-full aspect-square object-cover rounded-lg shadow-sm hover:opacity-90 transition-opacity`.
  - Se inyecta obligatoriamente `loading="lazy"`, `width="200"` y `height="200"` para proteger el CLS y el rendimiento.
- **Microinteracción SVG (Anillo de Borde):**
  - **Apertura:** Tras un `setTimeout` de 50ms, modifica `stroke-dashoffset` a `0` para activar la transición CSS fluida (`duration-1000 ease-in-out`).
  - **Cierre:** Restablece inmediatamente `stroke-dashoffset` a su valor de reposo (`578`).
- **Accesibilidad y Focus Trap:**
  - Cierre mediante tecla `Escape`, click en overlay o botón de cierre.
  - Atrapamiento de foco con ciclo de tabulación (`Tab` / `Shift+Tab`).
  - Restauración del foco al botón que originó la apertura al cerrar el modal.

---

## 3. Verificación de Criterios de Aceptación (Definition of Done)

| Criterio | Estado | Evidencia |
| :--- | :---: | :--- |
| **Separación de Responsabilidades (MVC)** | ✅ CUMPLIDO | Datos aislados en `src/js/data/services.js`. HTML libre de data embebida. |
| **Purga de Dominios Externos** | ✅ CUMPLIDO | Cero llamadas externas (0 `http://` o `https://`) en `services.js` y en los atributos del HTML. |
| **Galería Dinámica Anti-CLS** | ✅ CUMPLIDO | Elementos `<img>` con `aspect-square`, dimensiones fijas y `loading="lazy"`. |
| **Microinteracción SVG Animada** | ✅ CUMPLIDO | Círculo con `stroke-dashoffset` alternando entre `0` (abierto) y `578` (cerrado). |
| **Compilación Tailwind** | ✅ CUMPLIDO | `pnpm build` ejecutado en 495ms sin incidencias. |
| **Integridad UTF-8** | ✅ CUMPLIDO | Cero mojibake en todos los archivos modificados. |
