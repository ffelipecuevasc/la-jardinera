# Iteración 01: Configuración del Entorno Tailwind y Build

**Objetivo:** Eliminar el archivo CSS precompilado y configurar el entorno de desarrollo local con Node.js, PNPM y Tailwind CSS v3.

## Tareas
1. Inicializar el proyecto con `pnpm init` y configurar los scripts `dev` y `build` en el `package.json`.
2. Instalar `tailwindcss` como dependencia de desarrollo.
3. Generar y configurar `tailwind.config.js` incorporando las fuentes (Fraunces, Montserrat) y la paleta de colores "jardinera".
4. Crear el archivo de entrada `src/css/input.css` con las directivas de Tailwind.
5. Modificar el `<head>` del `index.html` para enlazar el archivo CSS resultante (`dist/css/output.css`) en lugar del antiguo `./static/css/tailwind.css`[cite: 1].

## Criterios de Aceptación

*   **Escenario 1: Compilación exitosa**
    *   **Dado** que el desarrollador ejecuta `pnpm build`
    *   **Cuando** el proceso finaliza
    *   **Entonces** se debe generar un archivo minificado en `dist/css/output.css` sin errores en consola.

*   **Escenario 2: Limpieza de dependencias**
    *   **Dado** el archivo `index.html`
    *   **Cuando** se inspecciona el `<head>`
    *   **Entonces** no debe existir el enlace al archivo CSS antiguo ni CSS en línea.