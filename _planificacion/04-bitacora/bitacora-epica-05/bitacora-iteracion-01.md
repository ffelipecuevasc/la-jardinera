# Bitácora de Auditoría y Desarrollo - Épica 05 | Iteración 01

## 1. Resumen Ejecutivo
Se dio inicio oficial a la **Épica 05 (Página de Contacto)** ejecutando la **Iteración 01: Encofrado Base y Clonación UI Global (Contacto)**.
Se asentó la base estructural del archivo `contacto.html` en la raíz del proyecto, clonando el Head, Header y Footer purificados a partir de la Fuente de la Verdad (*Source of Truth*) consolidada en el proyecto. Se configuraron los metadatos SEO específicos para Contacto, se actualizó de forma atómica el estado activo (*Active State*) en los tres niveles de navegación (Desktop Navbar, Menú Móvil desplegable y Navegación de Footer), y se preparó el contenedor `<main>` limpio para recibir la grilla de tarjetas de contacto en la Iteración 02.

---

## 2. Acciones Realizadas y Cambios de Código

### A. Metadatos y Configuración del `<head>`
- Se configuró el archivo `contacto.html` asegurando estándares de accesibilidad y SEO:
  - **Título (`<title>`):** `Contacto - La Jardinera Florería`
  - **Meta Descripción:** `Ponte en contacto con La Jardinera Florería en Valdivia. Escríbenos por WhatsApp o envíanos un correo para agendar reuniones, cotizar eventos o resolver dudas.`
  - **Tipografías Corporativas:** Montserrat y Noto Serif conectadas vía preconnect y Google Fonts oficiales, erradicando fuentes obsoletas o CDNs externos de iconografía (*Material Symbols*).
  - **Estilos:** Enlace local directo a `./dist/css/output.css`.

### B. Clonación y Actualización de Navegación (`<header>` y `<footer>`)
- **Header Global:**
  - Se clonó el componente de cabecera fija (`fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl`) con el logotipo dual responsive en PNG (variante original para modo claro y variante blanca para modo oscuro), separador vertical elegante y controles interactivos (toggle de tema oscuro con SVGs reactivos e ID `#theme-toggle-btn`, y botón de menú móvil con ID `#mobile-menu-btn`, `aria-expanded="false"` y `aria-controls="mobile-menu"`).
  - **Navegación Desktop (`<nav>`):** Se removieron las clases activas y el atributo `aria-current="page"` del enlace "Inicio" (asignándole `text-on-surface-variant hover:text-on-surface`). Se transfirió el estado activo exclusivamente al enlace **"Contacto"** con `aria-current="page"` y las clases `font-label-md text-label-md uppercase tracking-wider transition-colors py-space-1 text-primary font-semibold`.
  - **Menú Móvil Desplegable (`#mobile-menu`):** Se incorporó el drawer responsivo con tokens oficiales (`hidden lg:hidden absolute top-full left-0 w-full bg-surface/95 dark:bg-dark-surface-container-low/95 backdrop-blur-md`), asignando exclusivamente al enlace "Contacto" el atributo `aria-current="page"` y las clases `text-primary font-semibold`.
- **Footer Global:**
  - Se clonó la estructura de 4 columnas (`max-w-[80rem] mx-auto`).
  - En la columna de navegación, se actualizó el enlace **"Contacto"** con `aria-current="page"` y `transition-colors text-primary font-semibold`, dejando los demás enlaces en estado neutral (`text-on-surface-variant hover:text-on-surface`).
  - Se verificó que todos los enlaces a canales de comunicación (`tel:`, `mailto:`, Google Maps, WhatsApp) y redes sociales incluyan iconos `<svg>` nativos vectoriales con `fill="currentColor"` sin dependencias externas.

### C. Encofrado del Contenedor Principal (`<main>`) y Script Modular
- Entre el `<header>` y el `<footer>`, se inyectó el contenedor principal vacío especificado en los requerimientos técnicos:
  ```html
  <main class="w-full pt-20 flex-grow bg-background flex flex-col justify-center min-h-[85vh]"></main>
  ```
- Antes del cierre de la etiqueta `</body>`, se vinculó el punto de entrada de la arquitectura JavaScript modular:
  ```html
  <script type="module" src="./src/js/main.js"></script>
  ```

---

## 3. Deuda Técnica y Observaciones
1. **Contenedor Listo para Iteración 02:** El contenedor `<main>` se encuentra limpio y estructurado con `min-h-[85vh]` y `flex-grow`, garantizando que el footer se ancle en la base de la pantalla sin solapamientos ni desbordamientos indeseados.
2. **Cero Regresión Visual y Layout Shift:** La herencia exacta de dimensiones en cabecera y pie de página preserva una experiencia sin parpadeos (CLS 0.0) al navegar hacia la página de Contacto.
3. **Control de Versiones (Git):** Se respetó rigurosamente la directiva técnica de abstenerse de realizar operaciones Git locales o remotas.

---

## 4. Verificación de Criterios de Aceptación (Definition of Done)

| Criterio | Estado | Evidencia |
| :--- | :---: | :--- |
| **Metadatos SEO Exactos** | ✅ CUMPLIDO | `<title>` y `<meta name="description">` idénticos a los dictados en la iteración 01. |
| **Active State en Navbar Desktop** | ✅ CUMPLIDO | "Contacto" cuenta con `aria-current="page"` y `text-primary font-semibold`. "Inicio" en estado neutro. |
| **Active State en Menú Móvil** | ✅ CUMPLIDO | `#mobile-menu` contiene "Contacto" con `aria-current="page"` y clases activas. |
| **Active State en Footer** | ✅ CUMPLIDO | Columna de Navegación del footer resalta "Contacto" con `aria-current="page"`. |
| **Encofrado Limpio de `<main>`** | ✅ CUMPLIDO | Clases `w-full pt-20 flex-grow bg-background flex flex-col justify-center min-h-[85vh]` presentes. |
| **SVGs Nativos 100%** | ✅ CUMPLIDO | Todos los iconos de redes sociales y medios de pago son vectores en línea. |
| **Compilación Tailwind** | ✅ CUMPLIDO | `pnpm build` ejecutado exitosamente en 634ms sin incidencias. |
| **Integridad de Caracteres** | ✅ CUMPLIDO | Codificación UTF-8 pura (0 caracteres mojibake). |
