# Iteración 04: Rendimiento Gráfico (WebP), Prevención de CLS y Semántica

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Antes de modificar el código, debes analizar todas las etiquetas `<img>` y elementos con fondos CSS en el HTML. Tu
objetivo es eliminar dependencias de imágenes externas, forzar el uso del formato moderno `.webp` y proteger la métrica
de Estabilidad Visual (CLS - Cumulative Layout Shift) asegurando que cada imagen tenga un espacio reservado exacto en el
DOM antes de cargar.

## 1. Objetivo de la Iteración

Desvincular el proyecto de recursos de imagen alojados en servidores externos (como Unsplash o Googleusercontent) e
implementar una estrategia estricta de rendimiento gráfico local. Todas las imágenes deben ser referenciadas desde
`public/images/` en formato `.webp`, optimizadas para SEO (`alt` descriptivo) y para Performance (`lazy loading` y
`aspect-ratio`).

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Migración de Assets a Local:**
    * Reemplazar todas las URLs externas en los atributos `src` de las etiquetas `<img>` y en los
      `style="background-image: ..."` por rutas locales relativas que apunten a `./public/images/[nombre-archivo].webp`.
    * *(Nota para el agente: Si no tienes capacidad de descargar y convertir las imágenes reales en el entorno, debes
      dejar el código preparado con las rutas locales correctas asumiendo que los archivos `.webp` existirán físicamente
      allí).*
2. **Optimización del First Contentful Paint (Hero Section):**
    * La imagen de fondo del Hero (`#titular`) o cualquier imagen por encima del pliegue (Above the Fold) debe cargar
      inmediatamente. No debe llevar lazy loading.
    * Si es una etiqueta `<img>`, asegurar que tenga el atributo `fetchpriority="high"`.
3. **Prevención de Cumulative Layout Shift (CLS):**
    * Para TODAS las imágenes de las tarjetas de Servicios, Suscripción y Galería:
    * Debes garantizar que el contenedor padre de la imagen tenga clases de ratio de aspecto explícitas de Tailwind (ej.
      `aspect-[4/5]`, `aspect-square`, `aspect-[16/11]`).
    * Las imágenes deben poseer las clases `w-full h-full object-cover` para rellenar el espacio sin deformarse.
4. **Implementación de Lazy Loading:**
    * Añadir el atributo nativo `loading="lazy"` a **todas** las imágenes que se encuentren por debajo del Hero Section
      (Servicios, Galería, Testimonios).
5. **Auditoría de Accesibilidad (a11y) en Imágenes:**
    * Verificar que toda etiqueta `<img>` cuente con un atributo `alt` semántico y descriptivo (nunca vacío para
      imágenes de contenido).

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Carga de Recursos Independiente (Offline)**
    * **Dado** el archivo `index.html` compilado
    * **Cuando** se inspecciona el código y se desactiva internet
    * **Entonces** no debe existir ninguna URL que comience con `http://` o `https://` en atributos `src` o
      `background-image`. Todo apunta a `./public/images/*.webp`.
* **Escenario 2: Prevención Estricta de CLS**
    * **Dado** las grillas de imágenes en Galería y Servicios
    * **Cuando** la página carga en una conexión lenta
    * **Entonces** la estructura de la página no debe "saltar". Los contenedores vacíos deben reservar el tamaño exacto
      gracias a las clases `aspect-*` de Tailwind.
* **Escenario 3: Rendimiento de Carga (Lighthouse)**
    * **Dado** el documento HTML
    * **Cuando** es analizado
    * **Entonces** solo las imágenes ocultas inicialmente deben tener `loading="lazy"`, respetando la carga rápida
      (eager) para el Hero principal.