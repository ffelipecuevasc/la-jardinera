// Sitemap generado desde la fuente única de navegación (Épica 08 · Iteración 05). Las URLs salen de `site` y de `ruta`
// (sin extensión), igual que el `canonical` de cada página. Sin lastmod, changefreq ni priority.
import { NAVEGACION } from '../data/navegacion.js';

export function GET({ site }) {
    const urls = NAVEGACION.map(({ ruta }) => `    <url><loc>${new URL(ruta, site).href}</loc></url>`).join('\n');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

    return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
