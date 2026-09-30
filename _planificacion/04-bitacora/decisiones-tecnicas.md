
## Automatización de SVGs (Build Tool)
Se creó un script de Node.js en la carpeta scripts/replace-icons.js para inyectar SVGs puros extrayendo las clases relativas a Tailwind de los spans originales (heredando propiedades interactivas y dimensiones). Esta decisión garantiza el 100% de fidelidad de diseño estático y se ha preservado de manera estándar como una herramienta automatizada (Build Tool) vital para procesar y optimizar velozmente todo futuro archivo HTML generado para las siguientes vistas de este proyecto Multi-Page (MPA).

## Aplazamiento de Google Places API (Fase 2)
Por decisión del negocio y priorizando la velocidad de lanzamiento y estabilidad del DOM, se ha optado por suspender la integración en tiempo real o en *Build-Time* pura con Google Cloud Platform (Google Places API). 
Esta funcionalidad se retomará como un "Mini-proyecto" en la Fase 2 del desarrollo web. 

Para suplantar este vacío, se estructuró una base de datos local y estática en `src/js/data/reviews.js`. Un módulo ES6 renderiza dichas tarjetas del lado del cliente (`carousel.js`) empleando Template Literals; este esquema mantiene la independencia de conectividad, garantizando renderizado inmediato, elegancia mediante tipografías cruzadas (Noto Serif para las comillas, Montserrat para metadatos) y Cero Dependencias de backend o *workflows* complejos en CI/CD por el momento.

## Despliegue por lista blanca (`_site/`) — Épica 07, Iteración 01
Cloudflare Pages publica solo la carpeta `_site/`, que `pnpm run build:cf` genera con `scripts/stage-site.mjs` copiando las 6 páginas HTML, `dist/`, `public/` y `src/js/` (más `_headers`, `_redirects`, `robots.txt` y `sitemap.xml` si existen). `_site/` es desechable y está en `.gitignore`.

Motivos:

1. Una lista blanca no puede filtrar por olvido lo que una lista negra sí: todo archivo nuevo de la raíz (documentación, configuración, planificación) queda fuera por construcción.
2. El script falla si falta un directorio requerido, y un build fallido no reemplaza el despliegue vigente en producción.
3. La configuración de Cloudflare queda estable entre ramas: cada rama define qué hace `build:cf` en su propio `package.json` (clave para la Épica 08).
4. Límites de Cloudflare Pages vigilados: 25 MiB por archivo y 20 000 archivos por despliegue. Medición al cerrar la iteración: 112 archivos; el mayor, `nmg2.mp4`, pesa 22.715.000 bytes (86,7 % del límite).

Guardas de `stage-site.mjs` (todas se evalúan antes de borrar `_site/`; si una falla, se aborta sin borrar nada):

* Hay páginas `.html` en la raíz y existen `dist/`, `public/` y `src/js/`.
* `_site/` no contiene código fuente (`src/css`, `tailwind.config.js`, `package.json`): la carpeta de salida nunca es de trabajo.
* **Nueva (Iteración 01, tras el incidente de `_site/`):** `scripts.build` de `package.json` (leído sin BOM) no contiene `_site` y sí contiene `dist/css/output.css`, y `dist/css/output.css` existe con más de 0 bytes. Evita publicar en silencio un CSS desactualizado cuando la compilación escribe fuera de `dist/`.
