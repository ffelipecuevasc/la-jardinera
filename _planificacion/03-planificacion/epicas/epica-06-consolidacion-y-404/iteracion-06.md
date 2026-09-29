# Iteración 06: Paridad Móvil en "contacto.html" y Cierre de Enrutamiento Global

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
Esta es la iteración final de la Épica 06 y marca el cierre técnico transversal de la arquitectura de navegación de todo
el sitio web. En esta etapa debes: 1) Ajustar y estandarizar el menú móvil y los enlaces en `contacto.html`. 2) Realizar
una comprobación integral de no-regresión y conectividad de enlaces entre los **6 documentos HTML** (`index.html`,
`servicios.html`, `suscripcion-floral.html`, `galeria.html`, `contacto.html`, `404.html`) para garantizar paridad
absoluta y cero enlaces muertos antes de dar por cerrada la épica.

## 1. Objetivo de la Iteración

Culminar la paridad móvil en `contacto.html` validando que su drawer `#mobile-menu` y sus menús desktop y footer
mantengan activo de forma exclusiva el enlace "Contacto". Efectuar una auditoría final de interconexión global para
asegurar que cualquier usuario pueda transitar libremente entre las 6 páginas del sitio sin encontrar enlaces rotos,
saltos de layout o inconsistencias en modo oscuro.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Alineación del Menú Móvil en `contacto.html`:**
    * En el `<header>` de `contacto.html`, verificar o inyectar el drawer `#mobile-menu` unificado con "Contacto" como
      único ítem activo:
      ```html
      <div id="mobile-menu" class="hidden fixed inset-0 z-40 bg-surface/95 dark:bg-dark-surface-container-low/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 pt-20">
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="inicio" href="./index.html">Inicio</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="servicios" href="./servicios.html">Servicios</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="suscripcion-floral" href="./suscripcion-floral.html">Suscripción Floral</a>
          <a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-space-1" data-path="galeria" href="./galeria.html">Galería</a>
          <a aria-current="page" class="font-label-md text-label-md uppercase tracking-wider transition-colors py-space-1 text-primary font-semibold" data-path="contacto" href="./contacto.html">Contacto</a>
      </div>
      ```

2. **Normalización Definitiva de Enlaces en `contacto.html`:**
    * Revisar minuciosamente la navegación de escritorio (`<nav>`) y la columna de Navegación del `<footer>`.
    * Garantizar que todos los enlaces apunten a sus rutas relativas locales reales (`./index.html`, etc.) y que no
      exista ningún `href="#"`.

3. **Verificación Transversal de Cierre (Matriz de 6 Páginas):**
    * Realizar una comprobación de lectura rápida sobre los 6 archivos HTML del proyecto para certificar:
        - **Presencia de `#mobile-menu`:** Presente en los 6 archivos con clases idénticas.
        - **Estados Activos Correctos:**
            - `index.html` ➔ "Inicio" activo (`aria-current="page"`).
            - `servicios.html` ➔ "Servicios" activo.
            - `suscripcion-floral.html` ➔ "Suscripción Floral" activo.
            - `galeria.html` ➔ "Galería" activo.
            - `contacto.html` ➔ "Contacto" activo.
            - `404.html` ➔ Ningún enlace activo (estado neutro).
        - **Zero Dead Links:** Cero ocurrencias de `href="#"` en barras de navegación o listas de navegación del footer
          en todo el proyecto.
        - **Rutas de Retorno:** El logotipo del `<header>` en todas las páginas enlaza limpiamente a `./index.html`.

4. **Auditoría de No-Regresión en Tarjetas de Contacto:**
    * Confirmar que las tarjetas de WhatsApp y Email en `contacto.html` mantengan sus animaciones de elevación,
      resplandores y enlaces externos intactos.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Paridad Móvil Total del Sitio**
    * **Dado** cualquiera de los 6 documentos HTML abiertos en un dispositivo móvil
    * **Cuando** el usuario pulsa el botón `#mobile-menu-btn`
    * **Entonces** el menú se despliega de forma idéntica, con soporte para modo claro/oscuro, y refleja con precisión
      el estado activo de la página en la que se encuentra.
* **Escenario 2: Red de Enrutamiento 100% Conexa**
    * **Dado** un usuario navegando por cualquier sección del sitio
    * **Cuando** hace clic en cualquier opción de menú o footer
    * **Entonces** puede saltar de forma fluida y bidireccional entre las 6 vistas sin encontrar páginas rotas ni anclas
      inactivas (`#`).
* **Escenario 3: Certificación Global de Calidad**
    * **Dado** el proyecto compilado con `pnpm build`
    * **Cuando** se ejecuta la inspección global de estilos y JavaScript
    * **Entonces** no existen errores en consola, la *View Transitions API* funciona uniformemente en todas las páginas
      y el sitio queda certificado para producción.