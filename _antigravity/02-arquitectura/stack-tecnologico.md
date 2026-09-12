# Stack Tecnológico y Reglas de Arquitectura

## 1. Núcleo Tecnológico

| Capa | Tecnología Seleccionada | Versión / Especificación | Propósito |
| :--- | :--- | :--- | :--- |
| **Gestor de Paquetes** | PNPM | `^9.x` o superior | Gestión eficiente, rápida y determinista de dependencias |
| **Entorno de Ejecución** | Node.js | LTS (`v20.x` o `v22.x`) | Herramientas de build y compilación local |
| **Estructura** | HTML5 Semántico | Estándar W3C / WHATWG | Marcado estructurado y accesible en 5 archivos independientes |
| **Estilos** | Tailwind CSS | `v3.4.x` | Motor de utilidades CSS compilado localmente |
| **Interactividad** | JavaScript | ES6+ Vanilla (Nativo) | Manipulación de DOM, menús, filtros y modales sin sobrecarga |
| **Alojamiento Fase 1**| GitHub Pages | GitHub Actions o rama `gh-pages` | Entorno de desarrollo y pruebas público |
| **Alojamiento Fase 2**| Netlify | Producción | Despliegue continuo final con soporte de Netlify Forms |

---

## 2. Configuración de Tailwind CSS v3

### Paleta de Colores Corporativa (`tailwind.config.js`)
El diseño debe reflejar vivacidad, frescura botánica y calidez floral. La configuración de Tailwind debe extender la paleta por defecto con nombres semánticos:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.html"
  ],
  theme: {
    extend: {
      colors: {
        jardinera: {
          rosa: '#E63956',        // Fucsia floral vibrante (acentos, botones principales)
          coral: '#FF6F59',       // Coral cálido (etiquetas, promociones, detalles)
          girasol: '#F4A261',     // Ocre/amarillo floral cálido
          verde: {
            claro: '#8CB369',    // Verde hoja fresca
            bosque: '#2B4A34',   // Verde profundo selva valdiviana (textos oscuros, footer)
            oliva: '#4A5B40'
          },
          crema: '#FDFBF7',       // Fondo general cálido (evitar blanco puro estéril)
          tierra: '#5C4033',      // Detalles orgánicos y tipografía secundaria
          carbon: '#1C1E1B'       // Texto principal de alta legibilidad
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'], // Títulos elegantes
        body: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'] // Lectura limpia y moderna
      }
    },
  },
  plugins: [],
}