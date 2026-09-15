# Iteración 01: Encofrado Base y Clonación UI Global (Contacto)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Para esta iteración, tu fuente de la verdad para la estructura global es el archivo refactorizado `index.html`. Debes
extraer el esqueleto perfecto (Head, Header, y Footer) y clonarlo en el nuevo archivo `contacto.html`. Tu trabajo aquí
es asentar el layout maestro, ajustar el SEO y actualizar el estado activo del menú de navegación.

## 1. Objetivo de la Iteración

Establecer los cimientos del nuevo `contacto.html`. Se debe garantizar la herencia inmediata de las configuraciones del
proyecto (Tailwind local, Módulo de Dark Mode, Menú móvil) asegurando que no existan dependencias externas o código
*legacy*.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Purga y Reemplazo del `<head>`:**
    * Crear el archivo `contacto.html` en la raíz y pegar el `<head>` del `index.html` base.
    * **Modificación SEO:** Cambiar la etiqueta `<title>` a `Contacto - La Jardinera Florería`.
    * **Modificación SEO:** Cambiar la `<meta name="description">` por:
      `Ponte en contacto con La Jardinera Florería en Valdivia. Escríbenos por WhatsApp o envíanos un correo para agendar reuniones, cotizar eventos o resolver dudas.`
    * Asegurar que el CSS apunte localmente a `./dist/css/output.css`.

2. **Clonación y Ajuste del `<header>` (Navbar):**
    * Copiar la etiqueta `<header>` completa del archivo refactorizado.
    * Modificar el estado activo ("Active State") en la navegación de escritorio (`<nav>`):
        - Quitar las clases de estado activo (`aria-current="page"`, `text-primary font-semibold`) del enlace "Inicio" y
          devolverle sus clases base (`text-on-surface-variant hover:text-on-surface`).
        - Aplicar las clases de estado activo exclusivamente al enlace **"Contacto"**.
    * Replicar este estado activo en el menú móvil oculto (`#mobile-menu`).

3. **Clonación del `<footer>`:**
    * Copiar la etiqueta `<footer>` completa, garantizando que todos los iconos de contacto y medios de pago sean
      `<svg>` nativos en línea.
    * Modificar el estado activo de los enlaces dentro de la columna "Navegación" del footer, resaltando "Contacto".
    * Confirmar la inclusión del script modular antes de cerrar el body:
      `<script type="module" src="./src/js/main.js"></script>`.

4. **Preparación del Contenedor Principal (`<main>`):**
    * Entre el `<header>` y el `<footer>`, inyectar el contenedor vacío preparado para la Iteración 02:
      `<main class="w-full pt-20 flex-grow bg-background flex flex-col justify-center min-h-[85vh]"></main>`

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Pixel Perfect Cloning (Cero Regresión)**
    * **Dado** el sitio web ejecutándose en el navegador
    * **Cuando** el usuario navega hacia la página de "Contacto"
    * **Entonces** el Header y Footer no sufren saltos, parpadeos ni repintados (Layout Shift 0.0).
* **Escenario 2: Wayfinding (UX)**
    * **Dado** la barra de navegación superior y el menú móvil
    * **Cuando** el usuario se encuentra en `contacto.html`
    * **Entonces** la palabra "Contacto" resalta visualmente en color primario, ubicando al usuario en el mapa del
      sitio.