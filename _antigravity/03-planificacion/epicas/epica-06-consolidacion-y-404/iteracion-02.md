# Iteración 02: Paridad Móvil y Normalización de Enlaces en "index.html"

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
El archivo `index.html` es la portada del proyecto y la primera página que refactorizamos en la Épica 01. Sin embargo,
arrastra dos deudas técnicas históricas:

1) El contenedor `#mobile-menu` existe en el marcado pero está **completamente vacío** (lo que provoca que el menú
   hamburguesa no muestre nada en móviles).
2) Enlaces principales del Header aún conservan marcadores de posición temporales (`href="#"`). Tu objetivo en esta
   iteración es intervenir quirúrgicamente **únicamente `index.html`** para saldar ambas deudas sin alterar ningún otro
   bloque visual.

## 1. Objetivo de la Iteración

Equipar a `index.html` con el drawer de menú móvil estandarizado (con sus 5 enlaces poblados y funcionales), activar de
forma exclusiva el estado activo en "Inicio" dentro de dicho menú móvil, y normalizar todos los atributos `href` de la
navegación superior y del pie de página para que apunten a las rutas relativas locales reales del sitio.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Poblado del Contenedor `#mobile-menu` en `index.html`:**
    * Localizar la etiqueta vacía
      `<div id="mobile-menu" class="hidden fixed inset-0 z-40 bg-surface/95 backdrop-blur-md flex-col items-center justify-center pt-20"></div>`.
    * Reemplazarla por el contenedor estandarizado con soporte de Dark Mode y espaciado:
      ```html
      <div id="mobile-menu" class="hidden fixed inset-0 z-40 bg-surface/95 dark:bg-dark-surface-container-low/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 pt-20">
          <a aria-current="page" class="font-label-md text-label-md uppercase tracking-wider transition-colors py-space-1 text-primary font-semibold" data-path="inicio" href="./index.html">Inicio</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="servicios" href="./servicios.html">Servicios</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="suscripcion-floral" href="./suscripcion-floral.html">Suscripción Floral</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="galeria" href="./galeria.html">Galería</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="contacto" href="./contacto.html">Contacto</a>
      </div>
      ```

2. **Normalización de Enlaces en el Header Desktop (`<nav>`):**
    * Inspeccionar la etiqueta `<nav class="hidden lg:flex ...">`.
    * Reemplazar cualquier `href="#"` restante por su ruta relativa explícita:
        - Inicio: `./index.html` (conserva `aria-current="page"` y `text-primary font-semibold`).
        - Servicios: `./servicios.html`.
        - Suscripción Floral: `./suscripcion-floral.html`.
        - Galería: `./galeria.html`.
        - Contacto: `./contacto.html`.

3. **Normalización de Enlaces en el `<footer>`:**
    * En la columna 2 ("Navegación"), sustituir los `href="#"` residuales por las mismas rutas relativas locales
      (`./servicios.html`, `./suscripcion-floral.html`, `./galeria.html`, `./contacto.html`), manteniendo el resalte
      activo en `Inicio`.

4. **Auditoría de No-Regresión:**
    * Verificar que las secciones del Hero, Beneficios Operativos, Servicios Destacados, Suscripción Floral, Galería
      Kinfolk, Reseñas y Newsletter permanezcan 100% intactas.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Operatividad Móvil en el Home**
    * **Dado** el archivo `index.html` en un dispositivo o viewport móvil (`< lg`)
    * **Cuando** el usuario hace clic en el botón hamburguesa `#mobile-menu-btn`
    * **Entonces** el menú `#mobile-menu` se despliega mostrando los 5 enlaces con espaciado uniforme, y el enlace
      "Inicio" resalta claramente en color verde primario (`text-primary font-semibold`).
* **Escenario 2: Enrutamiento Bidireccional (Zero Dead Links)**
    * **Dado** el Navbar y el Footer de `index.html`
    * **Cuando** el usuario hace clic en "Servicios", "Suscripción Floral", "Galería" o "Contacto"
    * **Entonces** el navegador navega exitosamente hacia el archivo `.html` respectivo sin quedar atrapado en anclas
      vacías (`href="#"`).
* **Escenario 3: Cero Regresión en Modo Oscuro**
    * **Dado** el nuevo menú móvil desplegado en `index.html`
    * **Cuando** se alterna el conmutador de tema (`#theme-toggle-btn`)
    * **Entonces** el fondo del drawer móvil adopta el tono `dark:bg-dark-surface-container-low/95` y los textos se
      mantienen legibles con contraste WCAG adecuado.