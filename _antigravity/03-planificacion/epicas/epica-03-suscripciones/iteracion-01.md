# Iteración 01: Encofrado Base y Clonación de UI Global (Suscripción Floral)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Para esta iteración, tu fuente de la verdad para la estructura **NO** es el archivo `suscripcion-floral.html` antiguo.
Debes extraer el esqueleto perfecto (Head, Header, Franja de Beneficios y Footer) del archivo `servicios.html` (o
`index.html`) ya refactorizado. Tu objetivo es clonarlo en un nuevo archivo `suscripcion-floral.html` y realizar ajustes
quirúrgicos en el SEO y en los estados activos ("active states") del navbar.

## 1. Objetivo de la Iteración

Establecer los cimientos arquitectónicos del nuevo `suscripcion-floral.html`. Se debe garantizar la herencia inmediata
del sistema de diseño (Tailwind local), la funcionalidad de la *View Transitions API* (Dark Mode) y la navegación móvil,
purgando toda dependencia *legacy* (Google Fonts, CDN externos).

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Purga y Reemplazo del `<head>`:**
    * Crear/Sobrescribir `suscripcion-floral.html` y pegar el `<head>` del archivo refactorizado.
    * **Modificación SEO:** Cambiar la etiqueta `<title>` a `Suscripción Floral - La Jardinera Florería`.
    * **Modificación SEO:** Cambiar la `<meta name="description">` por:
      `Recibe flores frescas en tu puerta con nuestros planes de suscripción. Alegría y belleza de temporada para tu hogar u oficina en Valdivia.`
    * Asegurar que el CSS apunte a `./dist/css/output.css`.

2. **Clonación y Ajuste del `<header>` (Navbar):**
    * Copiar la etiqueta `<header>` completa del archivo refactorizado.
    * Modificar el estado activo en la navegación de escritorio (`<nav>`):
        - Quitar las clases de estado activo (`aria-current="page"`, `text-primary font-semibold`) del enlace
          "Servicios" y devolverle las clases base (`text-on-surface-variant hover:text-on-surface`).
        - Aplicar las clases de estado activo al enlace "Suscripción Floral".
    * Asegurar que el menú móvil oculto (`#mobile-menu`) también refleje este estado activo si aplica.

3. **Clonación de Elementos Comunes (Beneficios y Footer):**
    * Copiar la sección de Beneficios Operativos (`Delivery sin costo...`) asegurando que tenga los `<svg>` nativos.
    * Copiar la etiqueta `<footer>` completa.
    * Asegurar la inclusión del script modular antes de cerrar el body:
      `<script type="module" src="./src/js/main.js"></script>`.

4. **Preparación del Contenedor Principal (`<main>`):**
    * Entre el `<header>` y la sección de Beneficios, inyectar el contenedor vacío:
      `<main class="w-full pt-20 bg-background min-h-screen flex flex-col flex-grow"></main>`

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Pixel Perfect Cloning (Cero Regresión)**
    * **Dado** el sitio web en el navegador
    * **Cuando** el usuario navega entre "Servicios" y "Suscripción Floral"
    * **Entonces** el Header y Footer no sufren saltos visuales ni repintados (Layout Shift 0.0).
* **Escenario 2: Feedback de Navegación (UX)**
    * **Dado** la barra de navegación superior
    * **Cuando** se visualiza la página
    * **Entonces** el enlace "Suscripción Floral" resalta con el color primario, confirmando la ruta actual.
* **Escenario 3: Interacciones Base Activas**
    * **Dado** el nuevo archivo HTML
    * **Cuando** se interactúa con el botón de Modo Oscuro
    * **Entonces** el tema cambia aplicando correctamente la View Transitions API mediante `main.js`.