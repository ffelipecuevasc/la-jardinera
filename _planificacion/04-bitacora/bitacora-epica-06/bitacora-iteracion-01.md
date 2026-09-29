# Bitácora de Auditoría y Desarrollo - Épica 06 | Iteración 01

## 1. Resumen Ejecutivo
Se inició oficialmente la **Épica 06 (Consolidación Global de Navegación, Paridad Móvil y Página 404)** con la maquetación y refactorización integral del documento `404.html` en la raíz del proyecto.
Se reemplazó la versión desactualizada por una arquitectura estandarizada con paridad visual y estructural completa (Header con logotipo dual responsivo PNG, conmutador de modo oscuro, drawer móvil `#mobile-menu` y Footer de 4 columnas). Se aplicó rigurosamente la **Regla de Neutralidad de Enlaces** (ningún enlace con clase activa ni `aria-current="page"`). La sección central `<main>` presenta un diseño editorial centrado con tipografía botánica de exhibición (`404`), mensaje poético adaptado a la identidad de marca ("Esta flor no florece aquí") y un botón CTA accesible y destacado para regresar al inicio (`./index.html`).

---

## 2. Acciones Realizadas y Cambios de Código

### A. Documento y `<head>` (`404.html`)
- **SEO y Prevención de Indexación:**
  - `<title>Página no encontrada - La Jardinera Florería</title>`
  - `<meta name="description" content="La página que buscas no existe o ha sido movida. Regresa al inicio de La Jardinera Florería en Valdivia."/>`
  - `<meta name="robots" content="noindex, follow"/>` para evitar que los motores de búsqueda indexen URLs con código HTTP 404 como contenido válido.
- **Rutas Relativas Estándar:**
  - Favicon: `./public/logos/la-jardinera-original.png`.
  - Hojas de estilo: `./dist/css/output.css` y tipografías Montserrat + Noto Serif vía Google Fonts.

### B. Header y Regla de Neutralidad de Enlaces
- **Logotipo Dual Responsivo:**
  - Variante original para modo claro: `block dark:hidden`.
  - Variante blanca para modo oscuro: `hidden dark:block`.
  - Separador vertical y tipografía de logotipo con clase `fx-spotlight`.
- **Navegación Desktop (`<nav>`):**
  - Al tratarse de un estado de error, ninguno de los 5 enlaces (`Inicio`, `Servicios`, `Suscripción Floral`, `Galería`, `Contacto`) porta la clase activa `text-primary` ni el atributo `aria-current="page"`.
  - Todos los enlaces implementan el estado neutro con subrayado animado al hover (`scale-x-0 group-hover:scale-x-100`).
- **Drawer Móvil (`#mobile-menu`):**
  - Inyectado antes del cierre de `</header>`, con botón toggle sincronizado (`aria-controls="mobile-menu"`, `aria-expanded="false"`).
  - Los 5 enlaces del menú móvil se mantienen en estado neutro (`text-on-surface-variant hover:text-primary transition-colors`).

### C. Sección Central de Error (`<main>`)
- **Estructura Centrada:**
  ```html
  <main class="w-full pt-20 flex-grow bg-background flex flex-col items-center justify-center min-h-[80vh] py-space-10">
      <div class="max-w-2xl mx-auto px-margin-mobile text-center">
  ```
- **Elementos Editoriales:**
  - Separador ornamental: Rombo `✦` flanqueado por filetes finos `bg-primary/40`.
  - Código numérico: `404` estilizado con `font-display-hero text-headline-xl lg:text-display-hero text-primary font-normal leading-none mb-space-2`.
  - Encabezado H1: `"Esta flor no florece aquí"` en `font-headline-xl text-headline-lg lg:text-headline-xl text-on-surface dark:text-dark-on-background mb-space-3`.
  - Párrafo descriptivo: `"El enlace que seguiste no existe o ha cambiado de lugar. Te invitamos a volver al jardín principal para seguir explorando."` (`font-body-md text-on-surface-variant dark:text-dark-on-surface-variant`).
  - Botón CTA de Rescate: Enlace semántico `<a>` a `./index.html` con clases de botón primario (`inline-flex items-center justify-center px-space-6 py-3.5 rounded-lg bg-primary text-neutral-50 font-label-lg uppercase tracking-wider hover:opacity-90 transition-all shadow-md gap-2`), icono SVG de retorno e indicador accesible de foco (`focus-visible:ring-2 focus-visible:ring-primary`).

### D. Footer y Orquestación JS
- Footer de 4 columnas idéntico al sistema global, con todos los enlaces de la columna de navegación en estado neutro.
- Inyección modular al cierre de `</body>`: `<script type="module" src="./src/js/main.js"></script>` para soporte total de conmutación de tema (Dark Mode) y menú móvil.

### E. Compilación y Validación
- Compilación satisfactoria con `pnpm build` (985ms), incorporando las nuevas clases utilitarias (`font-display-hero`, etc.).
- Verificación automatizada de paridad, ausencia de atributos `aria-current="page"`, y existencia de componentes clave.

---

## 3. Verificación de Criterios de Aceptación (Definition of Done)

| Criterio / Escenario | Estado | Evidencia |
| :--- | :---: | :--- |
| **Paridad Visual y Estructural** | ✅ CUMPLIDO | Header con logotipo dual y Footer idénticos al resto del sitio; soporte nativo para Dark Mode. |
| **Neutralidad de Navegación** | ✅ CUMPLIDO | Cero atributos `aria-current="page"` y cero clases `text-primary` activas en la barra de navegación y en el menú móvil. |
| **Control de Indexación (SEO)** | ✅ CUMPLIDO | `<meta name="robots" content="noindex, follow"/>` configurado en `<head>`. |
| **Recuperación y Usabilidad (UX)** | ✅ CUMPLIDO | Botón CTA visible y accesible redirigiendo hacia `./index.html`. |
| **Drawer Móvil Operativo** | ✅ CUMPLIDO | `#mobile-menu` estructurado con orquestador `./src/js/main.js`. |
| **Restricción de Control de Versiones** | ✅ CUMPLIDO | Cero comandos de Git ejecutados. |
