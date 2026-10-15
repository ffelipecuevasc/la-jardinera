// Instantánea de referencia del sitio (Épica 08 · Iteración 01).
//
// Lee las páginas HTML de `referencia/sitio/` (copia de `_site/` tomada antes de migrar a Astro) y genera
// `referencia/inventario.json`: la línea base contra la que la Iteración 02 compara la salida de Astro.
//
// Por página registra: <title>, metas, conteo de elementos por etiqueta, IDs (con duplicados), valores de
// href / src / srcset / data-src y el texto visible normalizado.
//
// Uso: node scripts/instantanea-referencia.mjs
// Sin dependencias externas. Solo escribe dentro de `referencia/`.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIR_REFERENCIA = join(RAIZ, 'referencia');
const DIR_SITIO = join(DIR_REFERENCIA, 'sitio');
const ARCHIVO_SALIDA = join(DIR_REFERENCIA, 'inventario.json');

// Etiquetas sin cierre: no abren un nodo con hijos.
const ETIQUETAS_VACIAS = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr',
]);

// Etiquetas cuyo contenido es texto crudo (no se interpreta como marcado) y nunca es texto visible.
const ETIQUETAS_TEXTO_CRUDO = new Set(['script', 'style', 'textarea', 'title']);

// Etiquetas cuyo contenido no se considera texto visible.
const ETIQUETAS_SIN_TEXTO = new Set(['script', 'style', 'template', 'noscript']);

const ENTIDADES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

/** Guarda: este script nunca escribe fuera de `referencia/`. */
function asegurarDentroDeReferencia(ruta) {
    const rel = relative(DIR_REFERENCIA, resolve(ruta));
    if (rel === '' || rel.startsWith('..') || rel.split(sep)[0] === '..') {
        throw new Error(`Ruta de escritura fuera de referencia/: ${ruta}`);
    }
}

/** Decodifica las entidades HTML más comunes y las numéricas. */
function decodificarEntidades(texto) {
    return texto.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (coincidencia, cuerpo) => {
        if (cuerpo[0] === '#') {
            const codigo = cuerpo[1].toLowerCase() === 'x' ? parseInt(cuerpo.slice(2), 16) : parseInt(cuerpo.slice(1), 10);
            return Number.isFinite(codigo) ? String.fromCodePoint(codigo) : coincidencia;
        }
        return ENTIDADES[cuerpo.toLowerCase()] ?? coincidencia;
    });
}

/** Colapsa cualquier secuencia de espacios (incluido el espacio duro) en un solo espacio. */
function normalizarEspacios(texto) {
    return texto.replace(/[\s ]+/g, ' ').trim();
}

/** Extrae los atributos de una etiqueta de apertura respetando comillas simples y dobles. */
function leerAtributos(cuerpo) {
    const atributos = {};
    const patron = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
    let m;
    while ((m = patron.exec(cuerpo)) !== null) {
        const nombre = m[1].toLowerCase();
        const valor = m[2] ?? m[3] ?? m[4] ?? '';
        if (!(nombre in atributos)) atributos[nombre] = decodificarEntidades(valor);
    }
    return atributos;
}

/** Busca el `>` que cierra una etiqueta, ignorando los que aparecen dentro de comillas. */
function buscarFinDeEtiqueta(html, inicio) {
    let comilla = null;
    for (let i = inicio; i < html.length; i++) {
        const c = html[i];
        if (comilla) {
            if (c === comilla) comilla = null;
        } else if (c === '"' || c === "'") {
            comilla = c;
        } else if (c === '>') {
            return i;
        }
    }
    return -1;
}

/** Recorre el HTML una sola vez y devuelve el inventario de la página. */
function inventariarPagina(html) {
    const conteo = {};
    const ids = [];
    const hrefs = [];
    const srcs = [];
    const srcsets = [];
    const dataSrcs = [];
    const metas = [];
    const fragmentosTexto = [];
    let titulo = '';

    let enBody = false;
    let profundidadSinTexto = 0;
    const pilaSinTexto = []; // etiquetas abiertas dentro de zonas sin texto visible
    let svgTituloAbierto = 0; // <title> y <desc> dentro de <svg> no son texto visible
    let profundidadSvg = 0;

    let i = 0;
    while (i < html.length) {
        const lt = html.indexOf('<', i);
        if (lt === -1) {
            if (enBody && profundidadSinTexto === 0 && svgTituloAbierto === 0) fragmentosTexto.push(html.slice(i));
            break;
        }
        if (lt > i && enBody && profundidadSinTexto === 0 && svgTituloAbierto === 0) {
            fragmentosTexto.push(html.slice(i, lt));
        }

        // Comentarios
        if (html.startsWith('<!--', lt)) {
            const fin = html.indexOf('-->', lt + 4);
            i = fin === -1 ? html.length : fin + 3;
            continue;
        }
        // <!DOCTYPE ...>
        if (html.startsWith('<!', lt)) {
            const fin = html.indexOf('>', lt);
            i = fin === -1 ? html.length : fin + 1;
            continue;
        }
        // Etiqueta de cierre
        if (html[lt + 1] === '/') {
            const fin = html.indexOf('>', lt);
            const nombre = html.slice(lt + 2, fin === -1 ? html.length : fin).trim().toLowerCase();
            if (pilaSinTexto.length && pilaSinTexto[pilaSinTexto.length - 1] === nombre) {
                pilaSinTexto.pop();
                profundidadSinTexto--;
            }
            if (nombre === 'svg' && profundidadSvg > 0) profundidadSvg--;
            if ((nombre === 'title' || nombre === 'desc') && svgTituloAbierto > 0) svgTituloAbierto--;
            i = fin === -1 ? html.length : fin + 1;
            continue;
        }
        // Etiqueta de apertura
        const fin = buscarFinDeEtiqueta(html, lt + 1);
        if (fin === -1) break;
        const interior = html.slice(lt + 1, fin);
        const mNombre = /^([a-zA-Z][^\s\/>]*)/.exec(interior);
        if (!mNombre) {
            // No es una etiqueta ("<" suelto en el texto): se trata como texto.
            if (enBody && profundidadSinTexto === 0 && svgTituloAbierto === 0) fragmentosTexto.push('<');
            i = lt + 1;
            continue;
        }
        const nombre = mNombre[1].toLowerCase();
        const atributos = leerAtributos(interior.slice(mNombre[0].length));
        const autoCerrada = interior.trimEnd().endsWith('/');

        conteo[nombre] = (conteo[nombre] ?? 0) + 1;
        if (atributos.id !== undefined) ids.push(atributos.id);
        if (atributos.href !== undefined) hrefs.push(atributos.href);
        if (atributos.src !== undefined) srcs.push(atributos.src);
        if (atributos.srcset !== undefined) srcsets.push(atributos.srcset);
        if (atributos['data-src'] !== undefined) dataSrcs.push(atributos['data-src']);
        if (nombre === 'meta') metas.push(atributos);
        if (nombre === 'body') enBody = true;

        i = fin + 1;

        // Contenido crudo: se salta hasta el cierre correspondiente.
        if (ETIQUETAS_TEXTO_CRUDO.has(nombre) && !autoCerrada) {
            if (nombre === 'title' && profundidadSvg > 0) {
                svgTituloAbierto++; // <title> de un SVG: contenido de marcado normal, no visible
                continue;
            }
            const cierre = new RegExp(`</${nombre}\\s*>`, 'i');
            const resto = html.slice(i);
            const m = cierre.exec(resto);
            const contenido = m ? resto.slice(0, m.index) : resto;
            if (nombre === 'title' && !titulo) titulo = normalizarEspacios(decodificarEntidades(contenido));
            i += m ? m.index + m[0].length : resto.length;
            continue;
        }

        if (ETIQUETAS_VACIAS.has(nombre) || autoCerrada) continue;

        if (nombre === 'svg') profundidadSvg++;
        if ((nombre === 'title' || nombre === 'desc') && profundidadSvg > 0) svgTituloAbierto++;
        if (ETIQUETAS_SIN_TEXTO.has(nombre)) {
            pilaSinTexto.push(nombre);
            profundidadSinTexto++;
        }
    }

    const textoVisible = normalizarEspacios(decodificarEntidades(fragmentosTexto.join(' ')));
    const conteoOrdenado = Object.fromEntries(Object.entries(conteo).sort(([a], [b]) => a.localeCompare(b)));

    const vistos = new Set();
    const duplicados = new Set();
    for (const id of ids) {
        if (vistos.has(id)) duplicados.add(id);
        vistos.add(id);
    }

    return {
        titulo,
        metas,
        conteoEtiquetas: conteoOrdenado,
        totalElementos: Object.values(conteo).reduce((a, b) => a + b, 0),
        ids,
        idsDuplicados: [...duplicados],
        hrefs,
        srcs,
        srcsets,
        dataSrcs,
        textoVisible,
    };
}

function main() {
    const archivos = readdirSync(DIR_SITIO)
        .filter((nombre) => nombre.toLowerCase().endsWith('.html'))
        .sort();

    if (archivos.length === 0) {
        throw new Error('No hay páginas .html en referencia/sitio/. Ejecuta antes pnpm run build:cf y copia _site/.');
    }

    const paginas = {};
    for (const archivo of archivos) {
        const html = readFileSync(join(DIR_SITIO, archivo), 'utf8').replace(/^﻿/, '');
        paginas[archivo] = inventariarPagina(html);
    }

    const inventario = {
        descripcion: 'Línea base del sitio antes de la migración a Astro (Épica 08 · Iteración 01).',
        fuente: 'referencia/sitio/*.html (copia de _site/ generada por pnpm run build:cf)',
        totalPaginas: archivos.length,
        paginas,
    };

    asegurarDentroDeReferencia(ARCHIVO_SALIDA);
    writeFileSync(ARCHIVO_SALIDA, JSON.stringify(inventario, null, 2) + '\n', 'utf8');
    console.log(`[instantanea-referencia] ${archivos.length} páginas inventariadas en referencia/inventario.json`);
}

main();
