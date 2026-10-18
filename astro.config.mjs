import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://lajardinerafloreria.cl',
    outDir: './_site',
    trailingSlash: 'never',
    compressHTML: false,           // conserva los espacios entre texto y etiquetas en línea («Nombre <span>*</span>»)
    build: {
        format: 'file',            // servicios.html, como hoy
        inlineStylesheets: 'never' // cero CSS en línea
    },
    vite: {
        build: { assetsInlineLimit: 0 } // cero JS en línea
    }
});
