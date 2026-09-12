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
