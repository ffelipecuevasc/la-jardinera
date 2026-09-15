# Bitácora de Auditoría y Desarrollo - Épica 05 | Iteración 02

## 1. Resumen Ejecutivo
Se completó de forma exitosa la **Iteración 02 (y final)** de la **Épica 05 (Página de Contacto)**.
Se transformó el contenedor principal `<main>` inyectando el encabezado editorial centrado con lenguaje tipográfico de lujo y la cuadrícula responsive de 2 columnas con tarjetas de comunicación directa (WhatsApp y Correo Electrónico). Ambas tarjetas implementan microinteracciones visuales fluidas (`hover:-translate-y-2`, `hover:shadow-xl`, `group-hover:scale-110`, resplandor glow `bg-primary/5` y revelado cinemático de los botones de acción "Iniciar Chat" y "Redactar Email") sin recurrir a librerías externas ni código JavaScript superfluo. Con esta iteración, se da por concluida íntegramente la **Épica 05**.

---

## 2. Acciones Realizadas y Cambios de Código

### A. Encabezado Editorial (`<main>`)
- Se configuró el contenedor maestro centrado:
  ```html
  <div class="max-w-[80rem] mx-auto px-margin-mobile lg:px-margin-desktop w-full py-space-10">
  ```
- Se inyectó el bloque editorial con jerarquía visual de revista de lujo:
  - **Separador superior:** Rombo ornamental `✦` flanqueado por finas líneas decorativas en `bg-primary/40`.
  - **Sobretítulo (Kicker):** `"Conversemos"` (`font-label-md uppercase tracking-widest text-primary`).
  - **Título H1:** `"Estamos aquí para ti"` (`font-headline-xl text-headline-lg lg:text-headline-xl text-on-surface dark:text-dark-on-background`).
  - **Párrafo descriptivo:** Texto cálido y equilibrado en `font-body-md text-body-md text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed`.

### B. Grilla de Tarjetas de Comunicación Directa
- Se construyó el grid responsive simétrico:
  ```html
  <div class="grid grid-cols-1 md:grid-cols-2 gap-space-6 max-w-4xl mx-auto">
  ```
- **Tarjeta 1 (WhatsApp):**
  - Enlace semántico directo: `<a href="https://wa.me/56997702832" target="_blank" rel="noopener noreferrer">`.
  - Atributos visuales de lujo: Elevación `transform hover:-translate-y-2`, sombra `hover:shadow-xl`, borde sutil `border-outline-variant/30 dark:border-dark-surface-variant`, y fondo reactivo a modo oscuro `bg-surface dark:bg-dark-surface-container-low`.
  - Efecto Glow interno: Capa absoluta con `bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`.
  - Icono vectorial puro: Contenedor circular `w-20 h-20 bg-primary/10 text-primary group-hover:scale-110` con `<svg>` nativo de WhatsApp con `fill="currentColor"`.
  - Título `"Escríbenos por WhatsApp"` y teléfono `"+56 9 9770 2832"`.
  - Botón de llamado a la acción oculto: Revelado cinemático con desplazamiento vertical (`opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0`) con texto `"Iniciar Chat"` y flecha SVG.
- **Tarjeta 2 (Email / Correo):**
  - Enlace semántico nativo: `<a href="mailto:lajardinera.floreria@gmail.com">`.
  - Estructura y clases de lujo idénticas a la tarjeta de WhatsApp para estricta consistencia visual.
  - Icono vectorial puro: `<svg>` nativo de Sobre postal con `fill="currentColor"`.
  - Título `"Envíanos un Correo"` y correo `"lajardinera.floreria@gmail.com"`.
  - Botón de llamado a la acción oculto con texto `"Redactar Email"` y flecha SVG.

### C. Accesibilidad Web (WCAG 2.1)
- Ambas tarjetas incorporan `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`, permitiendo una experiencia de navegación fluida mediante teclado (Tab) con indicadores de enfoque de alto contraste.
- Los elementos puramente decorativos (líneas, rombo ornamental, capa glow interna) fueron marcados explícitamente con `aria-hidden="true"`.
- Los enlaces externos cuentan con `rel="noopener noreferrer"` para seguridad de navegación.

### D. Rendimiento y Cero Regresiones
- **Pureza de Recursos:** Cero llamadas a fuentes externas de iconos, cero imágenes pesadas y cero scripts JS innecesarios. Toda la interacción se maneja nativamente vía CSS utilitario compilado de Tailwind.
- **Compilación de Estilos:** Se ejecutó `pnpm build`, compilando `dist/css/output.css` en 490ms sin alertas ni advertencias.

---

## 3. Verificación de Criterios de Aceptación (Definition of Done)

| Criterio / Escenario | Estado | Evidencia |
| :--- | :---: | :--- |
| **Navegación Funcional (WhatsApp/Email)** | ✅ CUMPLIDO | Enlaces semánticos hacia `https://wa.me/56997702832` y `mailto:lajardinera.floreria@gmail.com`. |
| **Interacción y Microanimaciones (UI/UX)** | ✅ CUMPLIDO | Elevación `hover:-translate-y-2`, resplandor `bg-primary/5`, escalado `scale-110` del icono y revelación suave de "Iniciar Chat" / "Redactar Email". |
| **Pureza de Recursos (100/100)** | ✅ CUMPLIDO | Todos los gráficos son vectores `<svg>` con `fill="currentColor"`, sin dependencias CDN ni fuentes de símbolos. |
| **Soporte Dark Mode** | ✅ CUMPLIDO | Clases `dark:bg-dark-surface-container-low`, `dark:border-dark-surface-variant`, `dark:text-dark-on-background` y `dark:text-dark-on-surface-variant` implementadas. |
| **Accesibilidad por Teclado** | ✅ CUMPLIDO | Enlaces interactivos `<a>` con anillos de foco `focus-visible:ring-2 focus-visible:ring-primary`. |
| **Restricción Git** | ✅ CUMPLIDO | Ningún comando de control de versiones ejecutado. |
