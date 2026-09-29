# Bitácora de Auditoría y Desarrollo - Épica 04 | Iteración 01

## 1. Resumen Ejecutivo
Se dio inicio oficial a la **Épica 04 (Página de Galería)** ejecutando la **Iteración 01: Encofrado Base y Clonación UI Global**.
Se asentaron los cimientos estructurales del nuevo archivo `galeria.html` utilizando como Fuente de la Verdad (*Source of Truth*) los componentes globales consolidados en `servicios.html` y `suscripcion-floral.html`. Se purgó íntegramente la deuda técnica del archivo *legacy* (fuentes obsoletas, hojas de estilo sin tokenizar y librerías externas), heredando el sistema de diseño basado en tokens Tailwind, soporte de Dark Mode y tipografías corporativas autorizadas (Montserrat y Noto Serif).

---

## 2. Acciones Realizadas y Cambios de Código

### A. Purga y Reemplazo del `<head>`
- Se sobrescribió `galeria.html` en la raíz del proyecto.
- Se configuraron los metadatos SEO específicos para Galería:
  - `<title>Galería - La Jardinera Florería</title>`
  - `<meta name="description" content="Explora nuestro portfolio de diseño floral. Una muestra de nuestro trabajo en ramos de novia, decoración, suscripciones y más."/>`
- Se enlazaron las fuentes oficiales (Montserrat y Noto Serif) eliminando cualquier referencia a *Fraunces* o librerías externas de iconos (*Material Symbols*).
- Se vinculó la hoja de estilos compilada a `./dist/css/output.css`.

### B. Clonación y Actualización de Navegación (`<header>` y `<footer>`)
- **Header:**
  - Se clonó el componente de cabecera con el logotipo responsive dual PNG (variante original clara y variante blanca en modo oscuro), separador vertical atenuado, botón de alternancia de tema (`#theme-toggle-btn`) y botón del menú móvil (`#mobile-menu-btn`).
  - **Navegación Desktop (`<nav>`):** Se removieron las clases de estado activo y el atributo `aria-current="page"` de los enlaces previos. Se aplicaron exclusivamente a **"Galería"** (`aria-current="page"` y `uppercase tracking-wider transition-colors py-space-1 text-primary font-semibold`).
  - **Menú Móvil (`#mobile-menu`):** Se incluyó el contenedor desplegable con estilo y tokens oficiales (`bg-surface/95 dark:bg-dark-surface-container-low/95 backdrop-blur-md`), asignando de forma consistente `aria-current="page"` y `text-primary font-semibold` exclusivamente al enlace "Galería".
- **Footer:**
  - Se clonó la estructura de 4 columnas (identidad y derechos, navegación, contacto/redes sociales y medios de pago).
  - En la lista de navegación del footer, se actualizó el enlace "Galería" con `aria-current="page"` y `transition-colors text-primary font-semibold`.
  - Todos los hipervínculos (`tel:`, `mailto:`, enlaces externos) y los iconos de redes sociales y medios de pago son SVGs nativos inline con soporte de color reactivo.

### C. Encofrado del Contenedor Principal (`<main>`) y Franja de Beneficios
- Entre el `<header>` y la franja de beneficios se inyectó el contenedor preparado para la Iteración 02:
  ```html
  <main class="w-full pt-20 pb-section-gap bg-background min-h-screen flex flex-col flex-grow"></main>
  ```
- Se clonó la franja de Beneficios Operativos con iconos SVG nativos para Delivery gratuito y Boleta/Factura.
- Se vinculó el script principal modular antes de cerrar el `<body>`:
  ```html
  <script type="module" src="./src/js/main.js"></script>
  ```

---

## 3. Deuda Técnica y Observaciones
1. **Contenedor Principal Vacío:** El bloque `<main>` se encuentra intacto y listo para recibir el encofrado del Hero de Galería y el Acordeón Horizontal (`flex-grow`) en la Iteración 02.
2. **Cero Regresión Visual:** La clonación estructural asegura consistencia absoluta y un Layout Shift de 0.0 en la transición entre páginas del sitio.
3. **Encoding UTF-8:** Verificación automática de caracteres especiales (`ñ`, tildes, comillas) confirmando 0 mojibake.

---

## 4. Verificación de Criterios de Aceptación (Definition of Done)

| Criterio | Estado | Evidencia |
| :--- | :---: | :--- |
| **Metadatos SEO Exactos** | ✅ CUMPLIDO | `<title>` y `<meta name="description">` idénticos a los dictados en la iteración 01. |
| **Active State en Navbar (Desktop y Móvil)** | ✅ CUMPLIDO | "Galería" es el único enlace con `aria-current="page"` y `text-primary font-semibold`. |
| **Active State en Footer** | ✅ CUMPLIDO | Enlace "Galería" actualizado en la columna de navegación del footer. |
| **Encofrado Limpio de `<main>`** | ✅ CUMPLIDO | Clases `w-full pt-20 pb-section-gap bg-background min-h-screen flex flex-col flex-grow` aplicadas. |
| **SVGs Nativos 100%** | ✅ CUMPLIDO | Ningún uso de Material Symbols ni fuentes externas no autorizadas. |
| **Compilación Tailwind** | ✅ CUMPLIDO | `pnpm build` ejecutado en 556ms sin alertas ni errores. |
| **Integridad de Caracteres** | ✅ CUMPLIDO | 0 caracteres mojibake en el archivo generado. |
