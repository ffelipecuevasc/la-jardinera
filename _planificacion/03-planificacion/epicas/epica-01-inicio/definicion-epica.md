# Épica 01: Refactorización y Setup Base del "index.html"

## 1. Objetivo de la Épica (Visión Senior)

El archivo original de prototipado dependía del CDN de Tailwind y tenía estilos en línea que rompían las buenas
prácticas. El objetivo de esta épica es establecer los cimientos de la arquitectura profesional (compilación local de
Tailwind, módulos ES6, SVGs nativos y optimización de imágenes), **pero garantizando una regresión visual CERO.** El
diseño final debe verse exactamente igual o superior al original.

## 2. Alcance Estricto

* **Archivos permitidos para modificar:** `index.html`, `package.json`, `tailwind.config.js`, `src/css/input.css`,
  carpeta `src/js/` y carpeta `public/`.
* **Límite de la Épica:** Solo se trabajará sobre la página de Inicio (`index.html`). Queda estrictamente prohibido
  crear o planificar `servicios.html`, `galeria.html`, etc., hasta que esta épica esté 100% cerrada.

## 3. Definition of Done (DoD - Lista de Verificación Obligatoria)

Para que el agente dé por superada esta Épica, debe auditar y confirmar positivamente los siguientes puntos:

*   [ ] **Validación de Compilación:** El comando `pnpm build` genera un `./dist/css/output.css` que contiene
    exitosamente las clases reales del diseño (verificando que no hubo colisión con el `tailwind.config.js`).
*   [ ] **Fidelidad Visual (Anti-Regresión):** El diseño renderizado no ha perdido ningún estilo visual (colores,
    espaciados, tipografías) respecto al HTML original.
*   [ ] **Limpieza HTML:** No existen etiquetas `<style>`, atributos `style="..."`, atributos `onclick`, ni etiquetas
    `<script>` con código lógico dentro del `index.html`.
*   [ ] **Modularización JS:** Todo el comportamiento interactivo está dividido en submódulos ES6 (ej. `theme.js`,
    `navigation.js`) e importado correctamente en un único `main.js`.
*   [ ] **Independencia Gráfica:** Todos los iconos externos fueron reemplazados por etiquetas `<svg>` nativas, y las
    imágenes de Unsplash fueron descargadas, convertidas a `.webp` y enrutadas localmente desde `public/images/`.
*   [ ] **Preparación de Tema (Dark Mode):** La lógica de JS está preparada (`toggleTheme`) para alternar la clase
    `dark` en el `<html>` sin errores.