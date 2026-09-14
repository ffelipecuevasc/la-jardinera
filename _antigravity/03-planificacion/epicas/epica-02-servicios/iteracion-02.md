# Iteración 02: Grilla de Servicios, SVGs y Migración a WebP (Rendimiento y CLS)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Tu objetivo es reconstruir el contenido principal (`<main>`) del archivo `servicios.html` antiguo, pero **elevando su
diseño al estándar premium de la Épica 01**. Debes reemplazar la grilla vieja y plana por el lenguaje visual que usamos
en el `index.html` (tarjetas con `bg-surface`, `rounded-xl`, `hover:-translate-y-1`, sombras sutiles y bordes suaves).
Todas las imágenes deben apuntar a rutas locales ficticias o reales en formato `.webp` y estar blindadas contra el
Cumulative Layout Shift (CLS).

## 1. Objetivo de la Iteración

Migrar el catálogo de las 8 tarjetas de servicios y la franja inferior de beneficios operativos. El enfoque técnico
crítico es la eliminación total de llamadas de red a imágenes externas, la aplicación de `aspect-ratio` para estabilizar
el layout, y el reemplazo de los iconos de Google Fonts por `<svg>` nativos.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Refactorización del Encabezado de la Sección:**
    * Extraer el texto "Catálogo de servicios" y su descripción del archivo antiguo.
    * Aplicar la estructura tipográfica de lujo de la Épica 01: usar
      `font-headline-xl text-headline-lg lg:text-headline-xl text-on-surface` para el título.
    * Reemplazar la línea animada antigua por el divisor elegante utilizado en el home (línea con el rombo/estrella `✦`
      en el centro).

2. **Reconstrucción de la Grilla de 8 Tarjetas:**
    * Crear un contenedor de grilla moderno: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-4`.
    * Para cada tarjeta (Suscripción, Gift Cards, Novias, etc.), aplicar la estructura premium:
        - Contenedor principal:
          `group flex flex-col bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`.
    * **Imágenes y Anti-CLS:**
        - En lugar de imágenes circulares pequeñas, usaremos contenedores fluidos en la parte superior de la tarjeta:
          `relative w-full aspect-[4/5] overflow-hidden bg-surface-container`.
        - Inyectar la imagen con las clases
          `w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out`.
        - **Obligatorio:** Atributo `loading="lazy"` en todas las imágenes.
        - **Obligatorio:** Mapear las rutas externas a locales (Ej: cambiar la de *amarteasi.uy* por
          `./public/images/servicios/suscripcion.webp`, la de bodas.net por `./public/images/servicios/novias.webp`,
          etc.).
    * **Textos y Botones:**
        - Aplicar `font-headline-md` a los títulos y `font-body-sm text-on-surface-variant` a las descripciones.
        - Conservar temporalmente los atributos `data-*` (title, main-image, description, gallery) en los botones "Ver
          más", ya que serán intervenidos en la Iteración 03.

3. **Migración de la Franja de Beneficios (Bottom Section):**
    * Ubicar la sección inferior que contiene "Delivery sin costo..." y "Todos los productos...".
    * Reemplazar las etiquetas `<span class="material-symbols-outlined">...</span>` por íconos `<svg>` nativos.
        - Sustituir `local_shipping` por un SVG de un camión de reparto.
        - Sustituir `receipt_long` por un SVG de un documento/factura.
    * Aplicar `fill="currentColor"` a los SVGs para que hereden el color `text-primary`.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Estabilidad Visual y Rendimiento (Core Web Vitals)**
    * **Dado** el nuevo archivo `servicios.html` cargando en una red simulada lenta (Fast 3G)
    * **Cuando** se inspecciona el renderizado del DOM
    * **Entonces** las tarjetas reservan exactamente el espacio visual de las fotografías gracias a `aspect-[4/5]`,
      logrando un **Cumulative Layout Shift (CLS) de 0.0**.
* **Escenario 2: Independencia Gráfica Absoluta**
    * **Dado** la grilla de servicios y la sección de beneficios
    * **Cuando** el inspector de red audita las peticiones
    * **Entonces** NO debe existir ninguna llamada hacia dominios externos (bodas.net, jumpseller, sony.eu,
      fonts.googleapis). Todas las fuentes de imágenes terminan en `.webp`.
* **Escenario 3: Consistencia del Sistema de Diseño**
    * **Dado** el catálogo de servicios
    * **Cuando** el usuario hace hover sobre las tarjetas
    * **Entonces** el comportamiento visual (sombras, elevación de tarjeta, zoom suave en la imagen) es exactamente
      idéntico al comportamiento de las tarjetas del `index.html`.