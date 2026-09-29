# Iteración 01: Creación y Maquetación Integral de "404.html"

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Para esta iteración debes crear un archivo nuevo en la raíz del proyecto llamado `404.html`. Tu fuente de la verdad para
la estructura global (Head, Header, Footer) es el archivo `contacto.html` o `index.html` ya refactorizado. Esta página
debe manejar con gracia los errores de navegación (HTTP 404) manteniendo la identidad de marca botánica, orgánica y de
lujo. Al tratarse de una página de error, **ningún enlace de la barra de navegación debe llevar la clase de estado
activo ni el atributo `aria-current="page"`** (todos los enlaces quedan en estado neutro).

## 1. Objetivo de la Iteración

Construir la página de error `404.html` desde cero, asegurando paridad visual absoluta con el resto del sitio web (mismo
Header con soporte para modo claro/oscuro, mismo Footer y drawer `#mobile-menu` completo). La sección central (`<main>`)
debe presentar un diseño editorial equilibrado y proporcionar un botón de llamado a la acción (CTA) claro para regresar
al Inicio (`./index.html`).

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Creación del Documento y `<head>`:**
    * Crear el archivo `404.html` en la raíz del proyecto.
    * Clonar el `<head>` del sitio refactorizado.
    * **SEO:** Configurar `<title>Página no encontrada - La Jardinera Florería</title>`.
    * **SEO:** Inyectar
      `<meta name="description" content="La página que buscas no existe o ha sido movida. Regresa al inicio de La Jardinera Florería en Valdivia." />`.
    * **Robots:** Añadir `<meta name="robots" content="noindex, follow" />` para evitar indexación no deseada en motores
      de búsqueda.
    * Enlazar el favicon local y `./dist/css/output.css`.

2. **Clonación del `<header>` y Normalización Neutra:**
    * Replicar el `<header>` con el logotipo responsivo dual PNG, separador vertical y conmutador de tema
      (`#theme-toggle-btn`).
    * **Navegación Desktop (`<nav>`):** Todos los enlaces (`Inicio`, `Servicios`, `Suscripción Floral`, `Galería`,
      `Contacto`) deben tener sus clases neutras
      (`font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1`).
      Quitar cualquier clase `text-primary font-semibold` o `aria-current="page"`.
    * **Menú Móvil (`#mobile-menu`):** Incluir el contenedor `#mobile-menu` con la misma regla: todos sus enlaces en
      estado neutro y apuntando a sus rutas relativas locales (`./index.html`, etc.).

3. **Maquetación Editorial de Error (`<main>`):**
    * Configurar el contenedor:
      `<main class="w-full pt-20 flex-grow bg-background flex flex-col items-center justify-center min-h-[80vh] py-space-10"></main>`.
    * Inyectar un bloque central (`max-w-2xl mx-auto px-margin-mobile text-center`):
        - Separador superior de rombo/estrella (✦).
        - Código de error: `404` con tipografía de exhibición destacada
          (`font-display-hero text-headline-xl lg:text-display-hero text-primary font-normal leading-none mb-space-2`).
        - Título H1: "Esta flor no florece aquí" o "Página no encontrada"
          (`font-headline-xl text-headline-lg lg:text-headline-xl text-on-surface dark:text-dark-on-background mb-space-3`).
        - Párrafo descriptivo: "El enlace que seguiste no existe o ha cambiado de lugar. Te invitamos a volver al jardín
          principal para seguir explorando."
          (`font-body-md text-on-surface-variant dark:text-dark-on-surface-variant max-w-md mx-auto mb-space-6`).
        - Botón CTA de retorno: Enlace `<a>` apuntando a `./index.html` con clases de botón primario
          (`inline-flex items-center justify-center px-space-6 py-3.5 rounded-lg bg-primary text-neutral-50 font-label-lg uppercase tracking-wider hover:opacity-90 transition-all shadow-md gap-2`).
          Incluir un SVG nativo de flecha o casa.

4. **Clonación del `<footer>` e Integración JS:**
    * Inyectar el `<footer>` completo (con todos los enlaces en estado neutro en la columna de navegación).
    * Al final del documento, vincular el orquestador: `<script type="module" src="./src/js/main.js"></script>` para
      habilitar el Dark Mode y el menú móvil.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Cohesión Visual y Cero Regresión**
    * **Dado** el archivo `404.html` renderizado en el navegador
    * **Cuando** se visualiza en modo claro y en modo oscuro
    * **Entonces** el Header, el Footer y el bloque central adaptan sus colores y contrastes armónicamente sin fondos
      desalineados ni errores de tipografía.
* **Escenario 2: Estado Neutro de Navegación**
    * **Dado** la barra de navegación en `404.html` (tanto en desktop como en móvil)
    * **Cuando** el usuario inspecciona los enlaces
    * **Entonces** ningún enlace porta la clase `text-primary font-semibold` ni el atributo `aria-current="page"`,
      reflejando con precisión que la página actual no pertenece al árbol de navegación estándar.
* **Escenario 3: Usabilidad y Recuperación de Navegación**
    * **Dado** un usuario que aterriza en una URL rota
    * **Cuando** hace clic en el botón principal de la página 404
    * **Entonces** es redirigido de inmediato al Inicio (`./index.html`) sin fricción.