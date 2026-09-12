# Iteración 07: Social Proof Elegante (Testimonios Reales en Cliente)

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Se ha cancelado la extracción de datos vía API de Google por decisiones de negocio (Postergado a Fase 2). Tu misión es
crear un diccionario de datos (Array de Objetos) en Vanilla JS con 10 reseñas reales proporcionadas, y consumir ese
diccionario desde el módulo del carrusel para renderizar las tarjetas dinámicamente en el DOM. Debes auditar y elevar la
elegancia del carrusel, aplicando un diseño premium con tipografías serif, estrellas SVG nativas y scroll horizontal
fluido (CSS Scroll Snap).

## 1. Objetivo de la Iteración

Implementar la sección de testimonios utilizando 10 reseñas reales extraídas de Google Places, gestionadas a través de
un diccionario de JavaScript puro (`src/js/data/reviews.js`). El carrusel debe lucir impecable, responsivo, y funcionar
sin la inclusión de avatares fotográficos, basando su atractivo visual en el uso exquisito de la tipografía y la
iconografía vectorial.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Estructura de Datos (`src/js/data/reviews.js`):**
    * Crear este nuevo archivo exportando una constante (ej. `reviewsData`).
    * Mapear las 10 reseñas proporcionadas estructurando los campos: `author`, `date` (ej. "Hace 2 meses"), `text`, y
      `rating` (5).
2. **Lógica de Renderizado (`src/js/modules/carousel.js`):**
    * Limpiar el contenido *hardcodeado* actual dentro del contenedor `#testimonials-track` en el `index.html`.
    * Importar `reviewsData`.
    * Crear una función que itere sobre los datos y construya el HTML de cada tarjeta (`document.createElement` o
      Template Literals) inyectándolo en el contenedor.
    * **Defensa XSS:** Asegúrate de sanitizar o inyectar el texto de manera segura.
3. **UI/UX Premium y Refinamiento del Carrusel:**
    * Las tarjetas deben usar las clases de Tailwind pre-aprobadas: `bg-surface`, `rounded-xl`, `shadow-sm`, y medir un
      ancho fijo lógico (ej. `w-[85vw] md:w-[360px]`) con `flex-none` y `snap-center`.
    * El texto de la reseña debe usar la tipografía elegante del proyecto (`font-headline-sm italic`). El autor en
      `font-label-md`.
    * Inyectar 5 estrellas SVG color `text-warning` por cada tarjeta.
    * Asegurar que los botones `#carousel-prev` y `#carousel-next` hagan un `scrollBy` calculando el ancho dinámico de
      las nuevas tarjetas renderizadas.
4. **Deuda Técnica Planificada (Roadmap):**
    * Anotar explícitamente en `.antigravity/04-bitacora/decisiones-tecnicas.md` que la integración automática en tiempo
      real con Google Places API queda registrada como "Deuda Técnica Voluntaria / Mini-proyecto Fase 2" para cuando el
      cliente habilite facturación en GCP.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Renderizado Dinámico Client-Side**
    * **Dado** el `index.html` compilado
    * **Cuando** el script `main.js` se ejecuta en el navegador
    * **Entonces** el contenedor del carrusel se puebla automáticamente con 10 tarjetas generadas a partir del
      diccionario JS.
* **Escenario 2: Interacción Premium**
    * **Dado** la sección de testimonios renderizada
    * **Cuando** el usuario presiona las flechas de navegación o hace *swipe* en móviles
    * **Entonces** el carrusel se desplaza con `scroll-behavior: smooth` encajando perfectamente la tarjeta en el centro
      visual (`snap-center`).
* **Escenario 3: Estética Limpia (Sin imágenes rotas)**
    * **Dado** las tarjetas generadas
    * **Cuando** se inspecciona visualmente
    * **Entonces** no deben existir avatares o espacios vacíos para fotos, el diseño debe sostenerse puramente en texto,
      SVG de estrellas y espaciados correctos.