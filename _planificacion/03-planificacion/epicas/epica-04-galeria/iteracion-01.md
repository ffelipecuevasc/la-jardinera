# Iteración 01: Encofrado Base y Clonación UI Global (Galería)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Para esta iteración, tu fuente de la verdad para la estructura global es el archivo refactorizado `servicios.html` (o
`suscripcion-floral.html`). Debes extraer el esqueleto perfecto (Head, Header, Franja de Beneficios y Footer) y clonarlo
en un nuevo archivo `galeria.html`. Tu único trabajo aquí es asentar el layout maestro, ajustar el SEO y actualizar el
estado activo del menú de navegación.

## 1. Objetivo de la Iteración

Establecer los cimientos del nuevo `galeria.html`. Se debe garantizar la herencia inmediata de las configuraciones del
proyecto (Tailwind local, Módulo de Dark Mode, Menú móvil) purgando el código antiguo de dependencias externas.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Purga y Reemplazo del `<head>`:**
    * Crear/Sobrescribir `galeria.html` y pegar el `<head>` del archivo refactorizado base.
    * **Modificación SEO:** Cambiar la etiqueta `<title>` a `Galería - La Jardinera Florería`.
    * **Modificación SEO:** Cambiar la `<meta name="description">` por:
      `Explora nuestro portfolio de diseño floral. Una muestra de nuestro trabajo en ramos de novia, decoración, suscripciones y más.`
    * Asegurar que el CSS apunte localmente a `./dist/css/output.css`.

2. **Clonación y Ajuste del `<header>` (Navbar):**
    * Copiar la etiqueta `<header>` completa del archivo refactorizado.
    * Modificar el estado activo ("Active State") en la navegación de escritorio (`<nav>`):
        - Quitar las clases de estado activo (`aria-current="page"`, `text-primary font-semibold`) de cualquier enlace
          previo y devolverle sus clases base (`text-on-surface-variant hover:text-on-surface`).
        - Aplicar las clases de estado activo exclusivamente al enlace **"Galería"**.
    * Replicar este estado activo en el menú móvil oculto (`#mobile-menu`).

3. **Clonación de Elementos Comunes (Beneficios y Footer):**
    * Copiar la sección de Beneficios Operativos (`Delivery sin costo...`) con sus `<svg>` nativos.
    * Copiar la etiqueta `<footer>` completa.
    * Confirmar la inclusión del script modular antes de cerrar el body:
      `<script type="module" src="./src/js/main.js"></script>`.

4. **Preparación del Contenedor Principal (`<main>`):**
    * Entre el `<header>` y la sección de Beneficios, inyectar el contenedor vacío preparado para la Iteración 02:
      `<main class="w-full pt-20 pb-section-gap bg-background min-h-screen flex flex-col flex-grow"></main>`

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Pixel Perfect Cloning (Cero Regresión)**
    * **Dado** el sitio web ejecutándose en el navegador
    * **Cuando** el usuario navega entre las páginas principales y "Galería"
    * **Entonces** el Header y Footer no sufren saltos, parpadeos ni repintados (Layout Shift 0.0).
* **Escenario 2: Wayfinding (UX)**
    * **Dado** la barra de navegación superior y el menú móvil
    * **Cuando** el usuario se encuentra en `galeria.html`
    * **Entonces** la palabra "Galería" resalta visualmente en color primario, ubicando al usuario en el mapa del sitio.