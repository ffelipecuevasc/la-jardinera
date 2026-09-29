# Bitácora de Auditoría y Desarrollo - Épica 06 | Iteración 02

## 1. Resumen Ejecutivo
En esta **Iteración 02** de la **Épica 06 (Consolidación Global de Navegación, Paridad Móvil y Página 404)**, se intervino quirúrgicamente de forma **exclusiva** el archivo `index.html`.
Se saldó la deuda técnica histórica de su navegación móvil mediante la inyección y estructuración del drawer `#mobile-menu` con sus 5 enlaces poblados y funcionales, estableciendo el estado activo exclusivo en "Inicio" (`aria-current="page"` y `text-primary font-semibold`), y los enlaces restantes hacia sus destinos relativos reales (`./servicios.html`, `./suscripcion-floral.html`, `./galeria.html`, `./contacto.html`).
Asimismo, se normalizó el enlace de marca del logotipo y el enlace de la cabecera del footer hacia `./index.html`, erradicando `href="#"` residuales en la navegación y sincronizando los atributos de accesibilidad (`aria-expanded="false"` y `aria-controls="mobile-menu"`) en `#mobile-menu-btn`. Se certificó la no-regresión total de las secciones Hero, Beneficios, Servicios Destacados, Suscripción Floral, Galería Kinfolk, Carrusel de Testimonios y Newsletter.

---

## 2. Acciones Realizadas y Cambios de Código

### A. Poblado del Drawer Móvil (`#mobile-menu` en `index.html`)
- Se inyectó antes del cierre de `</header>` el drawer estandarizado con clases semánticas y soporte de Dark Mode:
  ```html
  <div id="mobile-menu" class="hidden fixed inset-0 z-40 bg-surface/95 dark:bg-dark-surface-container-low/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 pt-20">
      <a aria-current="page" class="font-label-md text-label-md uppercase tracking-wider transition-colors py-space-1 text-primary font-semibold" data-path="inicio" href="./index.html">Inicio</a>
      <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="servicios" href="./servicios.html">Servicios</a>
      <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="suscripcion-floral" href="./suscripcion-floral.html">Suscripción Floral</a>
      <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="galeria" href="./galeria.html">Galería</a>
      <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="contacto" href="./contacto.html">Contacto</a>
  </div>
  ```
- Se sincronizó el botón disparador `#mobile-menu-btn` incorporando `aria-expanded="false"` y `aria-controls="mobile-menu"`.

### B. Normalización de Enlaces en Header y Footer
- **Logotipo Principal (Header):**
  - Se normalizó el hipervínculo del logo desde `href="index.html"` a la convención estándar `href="./index.html"`.
- **Navegación Desktop (`<nav>`):**
  - Se verificó que todos los enlaces apunten a las rutas locales reales (`./index.html`, `./servicios.html`, `./suscripcion-floral.html`, `./galeria.html`, `./contacto.html`), conservando "Inicio" con su indicador activo (`aria-current="page"`, `text-primary`, `scale-x-100`).
- **Footer (Columna 1 y 2):**
  - En la Columna 1 ("Marca"), se sustituyó el enlace muerto `href="#"` en el texto "La Jardinera" por `href="./index.html"`.
  - En la Columna 2 ("Navegación"), se certificó que todos los enlaces apunten a rutas relativas reales con "Inicio" como enlace activo.

### C. Auditoría Forense de No-Regresión Total
- Se confirmó la intangibilidad estricta de:
  - Hero Section (`#titular`), imagen botánica WebP y tipografía.
  - Franja de Beneficios Operativos.
  - Sección de Servicios Destacados.
  - Sección de Suscripción Floral.
  - Galería Kinfolk.
  - Carrusel de Testimonios (`#testimonials-track`).
  - Sección de Newsletter y Agendar Reunión.

### D. Compilación y Validación
- Compilación limpia con Tailwind CSS vía `pnpm build` (715ms).
- Cero advertencias ni errores en la compilación.
- Cero comandos de Git ejecutados, respetando la directiva de restricción absoluta.

---

## 3. Verificación de Criterios de Aceptación (Definition of Done)

| Criterio / Escenario | Estado | Evidencia |
| :--- | :---: | :--- |
| **Operatividad Móvil en el Home** | ✅ CUMPLIDO | Drawer `#mobile-menu` inyectado y conectado con `navigation.js`; 5 enlaces desplegados uniformemente; "Inicio" activo con `text-primary font-semibold` y `aria-current="page"`. |
| **Enrutamiento Bidireccional (Zero Dead Links)** | ✅ CUMPLIDO | Enlaces de logo, header desktop, mobile menu y footer apuntan a rutas relativas locales reales sin marcadores `href="#"`. |
| **Cero Regresión en Modo Oscuro** | ✅ CUMPLIDO | Fondo del drawer móvil utiliza `dark:bg-dark-surface-container-low/95`, respondiendo reactivamente a la alternancia del tema. |
| **Integridad de Secciones Home** | ✅ CUMPLIDO | Hero, Beneficios, Servicios, Suscripción, Galería, Testimonios y Newsletter 100% intactos. |
| **Restricción de Control de Versiones** | ✅ CUMPLIDO | Cero comandos de Git ejecutados. |
