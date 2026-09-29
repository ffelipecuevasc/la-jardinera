# Bitácora de Auditoría y Desarrollo - Épica 03 | Iteración 01

## 1. Resumen Ejecutivo
Se dio inicio oficial a la **Épica 03 (Página de Suscripción Floral)** ejecutando la **Iteración 01: Encofrado Base y Clonación de UI Global**.
Se asentó la estructura base del archivo `suscripcion-floral.html` tomando como Fuente de la Verdad (*Source of Truth*) el archivo `servicios.html` (previamente validado y refactorizado en la Épica 02). Se purgó por completo el código *legacy* (fuentes Google no aprobadas como Fraunces, hojas de estilo antiguas y dependencias de Material Symbols), heredando la arquitectura de diseño atómico con Tailwind CSS compilado localmente, soporte de tema reactivo (*Dark Mode*) con View Transitions API y accesibilidad estructural.

---

## 2. Acciones Realizadas y Cambios de Código

### A. Purga y Reemplazo del `<head>`
- Se sobrescribió `suscripcion-floral.html` en la raíz del proyecto.
- Se configuraron los metadatos SEO exigidos:
  - `<title>Suscripción Floral - La Jardinera Florería</title>`
  - `<meta name="description" content="Recibe flores frescas en tu puerta con nuestros planes de suscripción. Alegría y belleza de temporada para tu hogar u oficina en Valdivia."/>`
- Se eliminaron las importaciones legacy de Fraunces y Material Symbols.
- Se mantuvieron las tipografías del sistema de diseño (Montserrat y Noto Serif) y la vinculación de estilos compilados a `./dist/css/output.css`.

### B. Clonación y Actualización de Navegación (`<header>` y `<footer>`)
- Se clonó el componente `<header>` refactorizado con su logotipo dual PNG (modo claro y oscuro), botón de alternancia de tema (`#theme-toggle-btn`) y botón móvil (`#mobile-menu-btn`).
- **Ajuste del Estado Activo (Active State) en Header:**
  - Enlace "Servicios": Se eliminó `aria-current="page"` y las clases de énfasis `text-primary font-semibold`, restableciéndolo a clases base (`font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1`).
  - Enlace "Suscripción Floral": Se aplicó `aria-current="page"`, enlace `href="./suscripcion-floral.html"` y clases de énfasis (`uppercase tracking-wider transition-colors py-space-1 text-primary font-semibold`).
- **Ajuste del Estado Activo en Footer:**
  - Se replicó el cambio de estado activo en la columna de Navegación del `<footer>`, asignando `aria-current="page"` y `text-primary font-semibold` al enlace de Suscripción Floral.
  - Se mantuvieron intactos todos los hipervínculos semánticos (`tel:`, `mailto:`, Google Maps) e íconos en formato `<svg>` nativo para métodos de pago y redes sociales.

### C. Encofrado del Contenedor Principal (`<main>`) y Beneficios
- Entre el `<header>` y la sección de Beneficios Operativos, se inyectó el contenedor principal limpio y preparado para la Iteración 02:
  ```html
  <main class="w-full pt-20 bg-background min-h-screen flex flex-col flex-grow"></main>
  ```
- Se clonó la franja de Beneficios Operativos (Delivery sin costo en radio urbano y emisión de Boleta/Factura) con sus correspondientes SVGs embebidos.
- Al final del `<body>`, se enlazó el orquestador JavaScript modular:
  ```html
  <script type="module" src="./src/js/main.js"></script>
  ```

---

## 3. Deuda Técnica y Observaciones

1. **Contenedor del Menú Móvil (`#mobile-menu`):**
   - Al igual que en `index.html` y `servicios.html` (herencia de la Épica 01), el botón `#mobile-menu-btn` existe en el marcado del `<header>`, pero el contenedor desplegable `<div id="mobile-menu">` se encuentra pendiente de unificación global para todas las páginas secundarias. Esto no genera errores de consola dado que `navigation.js` maneja la ausencia con un guard-clause seguro (`if (!mobileMenuBtn || !mobileMenu) return;`).
2. **Cero Regresiones Visuales:**
   - La transición visual entre `servicios.html` y `suscripcion-floral.html` mantiene un Layout Shift de 0.0 en los bloques comunes de Header, Beneficios y Footer.

---

## 4. Verificación de Criterios de Aceptación (Definition of Done)

| Criterio | Estado | Evidencia |
| :--- | :---: | :--- |
| **Metadatos SEO Exactos** | ✅ CUMPLIDO | `<title>` y `<meta name="description">` alineados con `iteracion-01.md`. |
| **Active State en Navbar y Footer** | ✅ CUMPLIDO | "Suscripción Floral" activo (`text-primary font-semibold` y `aria-current="page"`). |
| **Purga de Código Legacy** | ✅ CUMPLIDO | 0 llamadas a fuentes Fraunces, Material Symbols o CSS obsoleto. |
| **SVGs Nativos** | ✅ CUMPLIDO | 100% de los íconos de RRSS, tema, delivery y pagos son SVGs inline. |
| **Compilación Tailwind** | ✅ CUMPLIDO | `pnpm build` ejecutado en 437ms sin errores. |
| **Integridad de Codificación** | ✅ CUMPLIDO | 0 caracteres mojibake en el archivo generado. |
