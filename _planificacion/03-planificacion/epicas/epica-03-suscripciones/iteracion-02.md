# Iteración 02: Hero Dinámico y Sección de Información (UI Estática y Assets WebP)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
En esta iteración debes construir el bloque principal (`<main>`) usando los textos del `suscripcion-floral.html`
antiguo, pero **aplicando los tokens de lujo de nuestro sistema Tailwind**. Todo asset debe ser convertido a ruta local
`.webp` y todos los íconos (Material Symbols) deben ser purgados y reemplazados por `<svg>` en línea. Todavía NO
implementaremos JS para las tarjetas de precios, nos enfocaremos en el *layout* impecable.

## 1. Objetivo de la Iteración

Construir la capa visual del "Hero Banner" (con imágenes preparadas para cross-fade) y la sección asimétrica de
"Condiciones del Servicio" y "Zonas de Envío". El enfoque crítico es prevenir el CLS, garantizar el contraste en Dark
Mode y eliminar llamadas a servidores externos.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Reconstrucción del Hero Banner (`<section>` principal):**
    * Crear una sección de altura controlada (ej. `h-[80vh] md:h-[600px]`) con `relative overflow-hidden`.
    * **Fondo de Imágenes (Preparación para JS):**
        - Crear un div contenedor `absolute inset-0 z-0 bg-dark-background`.
        - Inyectar las 4 imágenes mapeadas a local (`./public/images/suscripcion/hero-1.webp` hasta `hero-4.webp`).
        - Aplicarles clases: `absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000`. A
          la primera imagen, añadirle `opacity-100` temporalmente.
    * **Caja de Texto Central (Glassmorphism):**
        - Crear un contenedor relativo flotante
          (`z-10 bg-surface/80 dark:bg-dark-surface/80 backdrop-blur-md rounded-xl p-space-6 shadow-lg max-w-3xl text-center mx-4`).
        - Inyectar el título "Suscripciones Florales" (`font-headline-xl text-on-surface dark:text-dark-on-background`).
        - Inyectar el párrafo "Hay personas que reciben flores...".

2. **Reconstrucción de "Condiciones del Servicio":**
    * Usar un grid asimétrico para la información y el mapa:
      `grid grid-cols-1 lg:grid-cols-2 gap-space-8 max-w-[80rem] mx-auto py-space-8 px-margin-mobile`.
    * **Listado de Condiciones:**
        - Para los 3 items (Flores, Pausa, Entrega), reemplazar el `<span class="material-symbols-outlined">` obsoleto
          por código `<svg>` nativo (`local_florist`, `calendar_month`, `local_shipping`). Asegurar
          `fill="currentColor"` y el color `text-primary`.
        - Ajustar tipografías a `font-headline-md` para títulos y `font-body-md text-on-surface-variant` para párrafos.
    * **Botón "Ver Planes" (Hook):**
        - Preservar el botón con el ID `id="show-plans-btn"`. Estilizarlo como un CTA primario o secundario robusto.

3. **Reconstrucción de "Zonas de Envío" (Mapa):**
    * En la segunda columna, insertar la tarjeta del mapa.
    * Actualizar la ruta del mapa a `./public/images/suscripcion/mapa.webp` o `./public/images/suscripcion/mapa.svg`
      (local).
    * **Anti-CLS:** Asegurar que el contenedor del mapa tenga una clase `aspect-video` o similar, y que la imagen sea
      `w-full h-full object-cover`. Agregar `loading="lazy"`.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Limpieza Absoluta de Assets (Offline)**
    * **Dado** el nuevo bloque `<main>`
    * **Cuando** se inspecciona el código
    * **Entonces** NO hay ocurrencias de `<span class="material-symbols-outlined">`, ni rutas de imagen hacia
      `./static/img/` o URLs de terceros.
* **Escenario 2: Estabilidad y Core Web Vitals**
    * **Dado** la carga de la página
    * **Cuando** las imágenes del Hero y el Mapa se están procesando
    * **Entonces** el Layout no sufre saltos, y el Hero garantiza la legibilidad del texto gracias al fondo con
      `backdrop-blur`.
* **Escenario 3: Responsividad y Dark Mode**
    * **Dado** un dispositivo móvil y el Dark Mode activado
    * **Cuando** el usuario hace scroll por las Condiciones del Servicio
    * **Entonces** los textos son legibles, el grid colapsa correctamente a 1 columna y los iconos mantienen su color
      contrastante.