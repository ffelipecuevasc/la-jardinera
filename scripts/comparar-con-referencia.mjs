// Comparación de la salida de Astro con la referencia (Épica 08 · Iteración 02).
//
// Compara cada página de `_site/` con su HTML original (por defecto `referencia/sitio/`, la copia tomada antes de
// migrar) token por token: etiquetas con sus atributos EN ORDEN, texto (con sus espacios de borde) y comentarios.
// Antes de comparar aplica al original la tabla de equivalencias de rutas de la Iteración 02:
//   ./public/…        →  /…
//   ./index.html…     →  /…
//   ./pagina.html…    →  /pagina…
//
// Diferencias esperadas (se listan aparte, no cuentan como regresión):
//   - <head>: el layout pone <meta charset> primero, retira <base href="/"> de la 404 y cambia el <link> del CSS.
//   - Final del <body>: el <script> de main.js pasa de `./src/js/main.js` a un archivo con hash en `/_astro/`.
//   - <body>: Astro omite en la salida los comentarios HTML que son hijos directos del <body> (los del código fuente se conservan).
//
// Uso: node scripts/comparar-con-referencia.mjs [directorio-original]
// Sin dependencias externas. Es de solo lectura. Termina con código 1 si el <body> tiene diferencias no esperadas.

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIR_ORIGINAL = resolve(process.argv[2] ?? join(RAIZ, 'referencia', 'sitio'));
const DIR_SALIDA = join(RAIZ, '_site');
const PAGINAS = ['index', 'servicios', 'suscripcion-floral', 'galeria', 'contacto', '404'];

const ETIQUETAS_VACIAS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const ETIQUETAS_TEXTO_CRUDO = new Set(['script', 'style', 'textarea', 'title']);
const ATRIBUTOS_DE_RUTA = new Set(['href', 'src', 'srcset', 'data-src']);
const ENTIDADES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

const decodificar = (texto) =>
    texto.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, cuerpo) => {
        if (cuerpo[0] === '#') {
            const codigo = cuerpo[1].toLowerCase() === 'x' ? parseInt(cuerpo.slice(2), 16) : parseInt(cuerpo.slice(1), 10);
            return Number.isFinite(codigo) ? String.fromCodePoint(codigo) : m;
        }
        return ENTIDADES[cuerpo.toLowerCase()] ?? m;
    });

const colapsar = (texto) => texto.replace(/[\s ]+/g, ' ').trim();

/**
 * Token de texto sensible a los espacios: una secuencia de espacios se colapsa a uno solo, pero se conserva si estaba al
 * borde («Nombre <span>*</span>» no es lo mismo que «Nombre<span>*</span>»). El texto solo con espacios es `#ws`.
 */
const tokenDeTexto = (texto) => {
    const limpio = decodificar(texto).replace(/[\s\u00a0]+/g, ' ');
    return limpio === ' ' ? '#ws' : `#texto «${limpio}»`;
};

/** Tabla de equivalencias de rutas de la Iteración 02, aplicada al original. */
const reescribirRuta = (valor) =>
    valor
        .replaceAll('./public/', '/')
        .replace(/\.\/index\.html(?=$|[#?])/g, '/')
        .replace(/\.\/([a-z-]+)\.html(?=$|[#?])/g, '/$1');

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

/** Atributos en el orden en que aparecen; un atributo sin valor equivale a valor vacío. */
function leerAtributos(cuerpo) {
    const lista = [];
    const patron = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
    let m;
    while ((m = patron.exec(cuerpo)) !== null) {
        lista.push([m[1], decodificar(m[2] ?? m[3] ?? m[4] ?? '')]);
    }
    return lista;
}

/** Convierte un documento en { head: string[], body: string[] } con un token por etiqueta, texto o comentario. */
function tokenizar(html, esOriginal) {
    const zonas = { head: [], body: [], nivelesBody: [] }; // nivelesBody: profundidad de cada token del <body>
    let zona = null;
    let nivel = 0;
    let i = 0;
    const agregar = (token) => {
        if (!zona) return;
        zonas[zona].push(token);
        if (zona === 'body') zonas.nivelesBody.push(nivel);
    };

    while (i < html.length) {
        const lt = html.indexOf('<', i);
        const texto = html.slice(i, lt === -1 ? html.length : lt);
        if (zona && texto !== '') agregar(tokenDeTexto(texto));
        if (lt === -1) break;

        if (html.startsWith('<!--', lt)) {
            const fin = html.indexOf('-->', lt + 4);
            const cuerpo = html.slice(lt + 4, fin === -1 ? html.length : fin);
            agregar(`#comentario ${colapsar(cuerpo)}`);
            i = fin === -1 ? html.length : fin + 3;
            continue;
        }
        if (html.startsWith('<!', lt)) {
            const fin = html.indexOf('>', lt);
            i = fin === -1 ? html.length : fin + 1;
            continue;
        }
        if (html[lt + 1] === '/') {
            const fin = html.indexOf('>', lt);
            const nombre = html.slice(lt + 2, fin === -1 ? html.length : fin).trim();
            if (nombre.toLowerCase() === 'head') zona = null;
            if (nombre.toLowerCase() === 'body') zona = null;
            if (zona === 'body') nivel--;
            agregar(`</${nombre}>`);
            i = fin === -1 ? html.length : fin + 1;
            continue;
        }
        const fin = buscarFinDeEtiqueta(html, lt + 1);
        if (fin === -1) break;
        const autocerrada = html[fin - 1] === '/';
        const interior = html.slice(lt + 1, fin).replace(/\/$/, '');
        const nombre = /^([a-zA-Z][^\s\/>]*)/.exec(interior)?.[1];
        if (!nombre) { i = lt + 1; continue; }
        const minuscula = nombre.toLowerCase();
        const atributos = leerAtributos(interior.slice(nombre.length)).map(([k, v]) => {
            let valor = ATRIBUTOS_DE_RUTA.has(k.toLowerCase()) && esOriginal ? reescribirRuta(v) : v;
            if (k === 'class') valor = colapsar(valor);
            return v === '' ? k : `${k}="${valor}"`;
        });
        const etiqueta = `<${nombre}${atributos.length ? ' ' + atributos.join(' ') : ''}>`;
        if (minuscula === 'head') zona = 'head';
        if (minuscula === 'body') { zona = 'body'; nivel = 0; }
        agregar(etiqueta);
        // <path/> en el original equivale a <path></path> en la salida de Astro: se normaliza a abrir y cerrar.
        if (autocerrada && !ETIQUETAS_VACIAS.has(minuscula)) agregar(`</${nombre}>`);
        else if (zona === 'body' && !ETIQUETAS_VACIAS.has(minuscula)) nivel++;
        i = fin + 1;

        if (ETIQUETAS_TEXTO_CRUDO.has(minuscula) && !ETIQUETAS_VACIAS.has(minuscula)) {
            const cierre = html.toLowerCase().indexOf(`</${minuscula}`, i);
            const crudo = html.slice(i, cierre === -1 ? html.length : cierre);
            if (colapsar(crudo) !== '') agregar(`#crudo ${colapsar(crudo)}`);
            i = cierre === -1 ? html.length : cierre;
        }
    }
    return zonas;
}

/** Diferencia de secuencias por LCS (suficiente para secuencias de unos pocos miles de tokens). */
function diferencias(a, b) {
    const n = a.length, m = b.length;
    const tabla = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            tabla[i][j] = a[i] === b[j] ? tabla[i + 1][j + 1] + 1 : Math.max(tabla[i + 1][j], tabla[i][j + 1]);
        }
    }
    const resultado = [];
    let i = 0, j = 0;
    while (i < n && j < m) {
        if (a[i] === b[j]) { i++; j++; }
        else if (tabla[i + 1][j] >= tabla[i][j + 1]) { resultado.push({ origen: 'original', token: a[i], posicion: i }); i++; }
        else { resultado.push({ origen: 'salida', token: b[j], posicion: j }); j++; }
    }
    for (; i < n; i++) resultado.push({ origen: 'original', token: a[i], posicion: i });
    for (; j < m; j++) resultado.push({ origen: 'salida', token: b[j], posicion: j });
    return resultado;
}

const esScriptPrincipal = (token) => token.startsWith('<script') && token.includes('type="module"');

let diferenciasInesperadas = 0;
const filas = [];

for (const pagina of PAGINAS) {
    const rutaOriginal = join(DIR_ORIGINAL, `${pagina}.html`);
    const rutaSalida = join(DIR_SALIDA, `${pagina}.html`);
    if (!existsSync(rutaOriginal) || !existsSync(rutaSalida)) {
        console.error(`Falta ${existsSync(rutaOriginal) ? rutaSalida : rutaOriginal}`);
        process.exit(2);
    }
    const original = tokenizar(readFileSync(rutaOriginal, 'utf8').replace(/^﻿/, ''), true);
    const salida = tokenizar(readFileSync(rutaSalida, 'utf8'), false);

    const difBody = diferencias(original.body, salida.body);
    // Esperada: el <script> de main.js (y su cierre no cambia).
    const esperadasBody = difBody.filter((d) => esScriptPrincipal(d.token));
    // Astro omite los comentarios que son hijos directos del <body> dentro del layout (nivel 1); el resto se conserva.
    const comentariosOmitidos = difBody.filter((d) => d.origen === 'original' && d.token.startsWith('#comentario') && original.nivelesBody[d.posicion] === 1);
    const posicionesOmitidas = new Set(comentariosOmitidos.map((d) => d.posicion));
    // Al desaparecer el comentario, el espacio que lo rodeaba queda fusionado con el contiguo: es parte de la misma omisión.
    const espaciosFusionados = difBody.filter((d) => d.origen === 'original' && d.token === '#ws' && original.nivelesBody[d.posicion] === 1
        && (posicionesOmitidas.has(d.posicion - 1) || posicionesOmitidas.has(d.posicion + 1)));
    const omitidos = [...comentariosOmitidos, ...espaciosFusionados];
    const inesperadasBody = difBody.filter((d) => !esScriptPrincipal(d.token) && !omitidos.includes(d));
    const comentariosOtroNivel = comentariosOmitidos.length;
    const difHead = diferencias(original.head, salida.head);

    diferenciasInesperadas += inesperadasBody.length;
    filas.push({
        pagina,
        'tokens body (original)': original.body.length,
        'tokens body (salida)': salida.body.length,
        'dif. body inesperadas': inesperadasBody.length,
        'dif. body esperadas (script)': esperadasBody.length,
        'comentarios de nivel 1 omitidos': comentariosOtroNivel,
        'dif. head': difHead.length,
    });

    console.log(`\n=== ${pagina}.html`);
    if (inesperadasBody.length) {
        console.log('  <body> — diferencias NO esperadas:');
        for (const d of inesperadasBody.slice(0, 40)) console.log(`    [${d.origen} #${d.posicion}] ${d.token.slice(0, 220)}`);
    } else {
        console.log('  <body>: 0 diferencias no esperadas.');
    }
    for (const d of esperadasBody) console.log(`  <body> esperada [${d.origen}] ${d.token}`);
    for (const d of comentariosOmitidos) console.log(`  <body> comentario omitido por Astro (hijo directo del layout) #${d.posicion}: ${d.token.slice(12, 100)}`);
    console.log('  <head> — diferencias (se explican en la bitácora):');
    for (const d of difHead) console.log(`    [${d.origen} #${d.posicion}] ${d.token.slice(0, 200)}`);
}

console.log('\nResumen:');
console.table(filas);
console.log(`Diferencias de <body> no esperadas (total): ${diferenciasInesperadas}`);
process.exit(diferenciasInesperadas === 0 ? 0 : 1);
