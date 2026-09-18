# Épica 06: Consolidación Global de Navegación, Paridad Móvil y Página 404

## 1. Objetivo de la Épica (Visión Senior)

Cerrar el ciclo de desarrollo del sitio web de La Jardinera resolviendo de forma transversal la deuda técnica de
navegación móvil (drawer `#mobile-menu`) e interconexión de rutas relativas (`routing`). Adicionalmente, se construirá
desde cero la página de error `404.html` respetando los tokens de diseño, tipografías y soporte de *Dark Mode*, logrando
una experiencia de usuario (UX) 100% cohesionada en los 6 documentos HTML del proyecto.

## 2. Alcance Estricto

* **Archivos afectados:** `index.html`, `servicios.html`, `suscripcion-floral.html`, `galeria.html`, `contacto.html` y
  la creación de `404.html`.
* **Límite de la Épica:** No se alterará la lógica interna de los módulos JS (`modal.js`, `gallery.js`,
  `subscription.js`, `carousel.js`), limitando los cambios a la estructura del `<header>` (menú móvil) y la correcta
  parametrización de los atributos `href` y `aria-current="page"`.

## 3. Definition of Done (DoD - Lista de Verificación Obligatoria)

Para que el agente dé por superada esta Épica, debe auditar y confirmar positivamente lo siguiente:

* [ ] **Paridad Móvil Absoluta:** El contenedor `#mobile-menu` está presente, estilizado y operativo en los 6 archivos
  HTML, respondiendo de forma idéntica al botón `#mobile-menu-btn` en pantallas pequeñas (`< lg`).
* [ ] **Wayfinding y Estados Activos:** Cada uno de los 6 documentos HTML resalta de forma exclusiva su propia sección
  en el Navbar (Desktop y Móvil) mediante la clase `text-primary font-semibold` y el atributo de accesibilidad
  `aria-current="page"`.
* [ ] **Rutas Bidireccionales Limpias (Zero Dead Links):** Se erradicaron todos los enlaces ficticios `href="#"` de la
  navegación principal. Todos los enlaces del Header y Footer apuntan con precisión a sus rutas relativas locales
  (`./index.html`, `./servicios.html`, `./suscripcion-floral.html`, `./galeria.html`, `./contacto.html`).
* [ ] **Página 404 Premium:** El archivo `404.html` está creado con su `<head>` optimizado, mismo Header y Footer, y una
  sección central elegante que informa el error y provee un botón CTA de regreso al Inicio (`./index.html`).
* [ ] **Compatibilidad Dark Mode en 404:** La nueva página `404.html` reacciona fluidamente a la *View Transitions API*
  (`theme.js`) sin parpadeos ni fondos transparentes.