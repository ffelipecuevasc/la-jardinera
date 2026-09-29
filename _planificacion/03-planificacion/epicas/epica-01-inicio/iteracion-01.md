# Iteración 01: Setup Arquitectónico, Compilación Local y Fidelidad de Tokens

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
El objetivo primordial de esta iteración NO es solo instalar Tailwind, sino **migrar el entorno sin perder ni una sola
clase del diseño original**. Debes analizar los estilos en línea actuales (`<style>`) y el objeto de configuración del
CDN (`<script id="tailwind-config">`) para trasladarlos fielmente al entorno local antes de compilar.

## 1. Objetivo de la Iteración

Eliminar la dependencia del CDN de Tailwind CSS (`<script src="https://cdn.tailwindcss.com">`) y configurar un entorno
de compilación local robusto basado en Node.js y PNPM, garantizando que el 100% de los tokens de diseño (colores,
fuentes, espaciados) sean absorbidos por el nuevo `tailwind.config.js`.

## 2. Tareas Técnicas (Ejecución Estricta)

1. **Inicialización de Entorno:** Ejecutar `pnpm init`. Configurar en `package.json` los scripts:
    * `"dev": "tailwindcss -i ./src/css/input.css -o ./dist/css/output.css --watch"`
    * `"build": "tailwindcss -i ./src/css/input.css -o ./dist/css/output.css --minify"`
2. **Instalación de Dependencias:** Instalar `tailwindcss` (v3) como dependencia de desarrollo vía `pnpm`.
3. **Mapeo de Tokens (CRÍTICO):** Generar `tailwind.config.js`.
    * **Prohibido:** Inventar paletas genéricas.
    * **Obligatorio:** Traspasar exactamente la configuración del objeto `tailwind.config` presente en el `<script>` del
      `index.html` original (incluyendo la paleta extensa de colores, `fontFamily`, `spacing`, y `darkMode: "class"`).
4. **Preservación de Capa Base:** Crear `src/css/input.css`.
    * Añadir `@tailwind base; @tailwind components; @tailwind utilities;`.
    * Migrar a este archivo todo el CSS contenido en la etiqueta `<style>@layer base {...}</style>` del `index.html`
      (reseteo de márgenes y ocultamiento de scrollbar).
5. **Limpieza y Vinculación del DOM:**
    * Eliminar del `<head>` el CDN de Tailwind y las etiquetas `<script>`/`<style>` originales.
    * Vincular el nuevo archivo local: `<link rel="stylesheet" href="./dist/css/output.css" />`.

## 3. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Compilación sin Regresión Visual (Pixel Perfect)**
    * **Dado** la ejecución del comando `pnpm build`
    * **Cuando** se visualiza el `index.html` en el navegador
    * **Entonces** el archivo `output.css` debe contener todas las clases semánticas utilizadas (ej.
      `bg-surface-container-low`), y el sitio no debe haber perdido ningún color, fuente o espaciado respecto al
      original.
* **Escenario 2: Limpieza Absoluta del Head**
    * **Dado** el archivo `index.html`
    * **Cuando** se inspecciona su código fuente
    * **Entonces** no deben existir scripts de configuración de Tailwind ni CSS en línea.