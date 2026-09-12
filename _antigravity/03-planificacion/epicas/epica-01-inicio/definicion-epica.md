# Épica 01: Refactorización y Setup Base del "index.html"

## 1. Objetivo de la Épica
Establecer los cimientos técnicos del proyecto migrando el archivo `index.html` estático actual hacia un entorno de desarrollo profesional moderno. Esto implica configurar la compilación local de Tailwind CSS v3 mediante PNPM, modularizar la lógica en Vanilla JavaScript (ES6+), estandarizar el uso de iconos SVG nativos, optimizar todos los recursos gráficos a formato WebP y preparar la estructura para inyectar una librería de transición de modo claro/oscuro.

## 2. Alcance
*   **Archivos afectados:** `index.html`, `package.json`, `tailwind.config.js`, directorio `src/`, directorio `public/`.
*   **Fuera de alcance:** Creación de las páginas secundarias (`servicios.html`, `galeria.html`, etc.). Estas serán abordadas en las siguientes épicas.

## 3. Definición de Terminado (DoD - Definition of Done)
*   [ ] El proyecto compila Tailwind CSS exitosamente mediante `pnpm build`.
*   [ ] No existen etiquetas `<style>` ni `<script>` con código en línea en el `index.html`.
*   [ ] Todo el código JS está dividido en módulos ES6+ dentro de `src/js/` y se importa en `main.js`.
*   [ ] No existen dependencias a fuentes de iconos externas (ej. Google Fonts Icons); todos los iconos son SVGs en línea extraídos de Material Symbols Light.
*   [ ] Todas las imágenes (incluyendo la del Hero anteriormente en Unsplash) están alojadas localmente en `public/images/` en formato `.webp`.
*   [ ] El código base está preparado con los *hooks* o selectores necesarios para implementar la librería pública de transición de tema (Dark/Light).