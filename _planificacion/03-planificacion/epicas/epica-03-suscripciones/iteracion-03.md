# Iteración 03: Tarjetas de Precios y Módulo JavaScript (Interactividad)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
El archivo `suscripcion-floral.html` antiguo esconde la sección de planes de suscripción y tiene un carrusel de fondo en
el Hero que cambiaba por opacidad. Tu misión es construir la grilla de precios aplicando los tokens de lujo (sin
dependencias externas) y crear el módulo `src/js/modules/subscription.js` en Vanilla JS para orquestar ambas
interacciones (Cross-fade del Hero y Despliegue de Planes), garantizando cero saltos bruscos en el DOM.

## 1. Objetivo de la Iteración

Diseñar el catálogo de 3 planes de suscripción (Esencial, Premiere, Luxe) elevando su UI al estándar premium del
proyecto. Posteriormente, enlazar la vista con un nuevo módulo JavaScript que controle la transición automática de las
fotografías del Hero y la expansión suave (Reveal) de la sección de precios al hacer clic en los botones.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Reconstrucción de UI - Tarjetas de Planes (`#planes`):**
    * Crear la grilla de 3 columnas: `grid grid-cols-1 md:grid-cols-3 gap-space-6`.
    * Para cada tarjeta (Esencial, Premiere, Luxe) aplicar la estructura de lujo:
      `group flex flex-col bg-surface rounded-xl shadow-sm border border-outline-variant/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`.
    * **Assets y SVGs:**
        - Mapear las imágenes de los planes a rutas locales: `./public/images/suscripcion/plan-esencial.webp`,
          `plan-premiere.webp`, `plan-luxe.webp`. Incluir `aspect-[4/3]`, `object-cover` y `loading="lazy"`.
        - Reemplazar todos los `<span class="material-symbols-outlined">check</span>` de las listas de beneficios por
          `<svg>` nativos con `fill="currentColor" text-primary`.
    * **Badge "Más Popular":** A la tarjeta Premiere, diseñarle un *badge* superpuesto elegante:
      `absolute top-4 right-4 bg-primary text-on-primary font-label-sm uppercase tracking-widest px-3 py-1 rounded-full shadow-md`.

2. **Creación del Módulo JS (`src/js/modules/subscription.js`):**
    * Crear el archivo e importar/exportar `initSubscription()` desde `main.js`.
    * **Lógica 1: Hero Cross-fade:**
        - Seleccionar las imágenes dentro de `#banner-carousel`.
        - Crear un `setInterval` (ej. 4000ms) que quite la clase `opacity-100` a la imagen activa y se la agregue a la
          siguiente, aprovechando la transición CSS `duration-1000` ya definida.
    * **Lógica 2: Reveal de Planes (Acordeón Suave):**
        - Seleccionar `#show-plans-btn`, `#hide-plans-btn` y el contenedor `#planes`.
        - Al hacer clic en "Ver Planes", reemplazar dinámicamente las clases del contenedor para revelar el contenido
          (ej. remover `h-0 opacity-0 overflow-hidden` y calcular el `scrollHeight` o usar un
          `max-h-[3000px] opacity-100` con `transition-all duration-700 ease-in-out`).
        - Asegurar que al abrirse, la página haga un ligero *scroll* (`scrollIntoView`) hacia el título de los planes.
        - Al hacer clic en "Cerrar Planes", revertir las clases para colapsar la sección.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Hero Vivo (Cero librerías externas)**
    * **Dado** la carga inicial de la página
    * **Cuando** el usuario observa el banner superior durante más de 4 segundos
    * **Entonces** la imagen de fondo realiza una transición de fundido suave (cross-fade) hacia la siguiente sin
      generar repintados forzados ni afectar el texto central.
* **Escenario 2: Acordeón Funcional y Estético**
    * **Dado** la sección de planes oculta
    * **Cuando** se hace clic en el botón "Ver Planes de Suscripción"
    * **Entonces** el contenedor se expande verticalmente de manera fluida, revelando 3 tarjetas de diseño exquisito. Al
      clicar "Cerrar Planes", el contenedor vuelve a colapsar.
* **Escenario 3: Independencia de Iconografía**
    * **Dado** las listas de beneficios dentro de las tarjetas
    * **Cuando** se inspecciona el código
    * **Entonces** todos los iconos de "check" son SVGs puros en línea, eliminando la latencia de fuentes externas.