/**
 * scripts/stage-site.mjs
 * Arquitectura: Node.js ESM | Multiplataforma (Windows, macOS y el Linux de Cloudflare Pages)
 *
 * Prepara la carpeta publicable `_site/` para Cloudflare Pages copiando SOLO lo que el
 * sitio necesita (lista blanca). Todo lo demás queda fuera del despliegue sin tener que
 * enumerarlo: `_planificacion/`, AGENTS.md, README.md, DESIGN.md, `.claude/`, `scripts/`,
 * `src/css/`, archivos de configuración, etc.
 *
 * Uso: `pnpm build && node scripts/stage-site.mjs`  (o `pnpm run build:cf`)
 *
 * SEGURIDAD: `_site/` es una carpeta GENERADA y desechable. Este script:
 *   1. valida TODO antes de borrar nada;
 *   2. se niega a borrar `_site/` si esta contiene código fuente (por ejemplo `src/css/`),
 *      porque eso significa que alguien la está usando como carpeta de trabajo.
 */
import {cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync} from 'node:fs';
import {join} from 'node:path';

const OUT_DIR = '_site';

// Directorios que el sitio carga en tiempo de ejecución.
const REQUIRED_DIRS = ['dist', 'public', 'src/js'];

// Archivos opcionales de Cloudflare Pages y SEO: se copian si existen.
const OPTIONAL_ROOT_FILES = ['_headers', '_redirects', 'robots.txt', 'sitemap.xml'];

// Rutas que JAMÁS aparecen en una salida generada. Si existen dentro de `_site/`, esa carpeta
// contiene código fuente y no se toca.
const SOURCE_SIGNATURES = ['src/css', 'tailwind.config.js', 'package.json'];

// 1. VALIDAR (no se modifica nada del disco en este bloque)
const pages = readdirSync('.').filter((file) => file.endsWith('.html'));
if (pages.length === 0) {
    throw new Error(
        '[stage-site] No hay páginas .html en la raíz del proyecto. Se aborta SIN borrar nada. ' +
        'Si tu código fuente está dentro de "_site/", esa carpeta no puede ser la de salida.'
    );
}

const missingDirs = REQUIRED_DIRS.filter((dir) => !existsSync(dir));
if (missingDirs.length > 0) {
    throw new Error(
        `[stage-site] Faltan directorios requeridos: ${missingDirs.join(', ')}. ` +
        'Se aborta SIN borrar nada. ¿Se ejecutó "pnpm build"?'
    );
}

const sourceFound = SOURCE_SIGNATURES.filter((sig) => existsSync(join(OUT_DIR, sig)));
if (sourceFound.length > 0) {
    throw new Error(
        `[stage-site] "${OUT_DIR}/" contiene código fuente (${sourceFound.join(', ')}). ` +
        'Se aborta SIN borrar nada: la carpeta de salida debe ser generada, no de trabajo.'
    );
}

// Si "pnpm build" escribe fuera de `dist/`, el `dist/` copiado sería el de una compilación anterior
// y se publicaría un CSS desactualizado sin ningún error.
const CSS_FILE = 'dist/css/output.css';
const buildScript = JSON.parse(readFileSync('package.json', 'utf8').replace(/^﻿/, '')).scripts?.build ?? '';
if (buildScript.includes('_site') || !buildScript.includes(CSS_FILE)) {
    throw new Error(
        `[stage-site] El script "build" de package.json no compila hacia "${CSS_FILE}" ("${buildScript}"). ` +
        'Se aborta SIN borrar nada: se publicaría un CSS desactualizado.'
    );
}

if (!existsSync(CSS_FILE) || statSync(CSS_FILE).size === 0) {
    throw new Error(
        `[stage-site] Falta "${CSS_FILE}" o está vacío. Se aborta SIN borrar nada. ¿Se ejecutó "pnpm build"?`
    );
}

// 2. GENERAR
rmSync(OUT_DIR, {recursive: true, force: true});
mkdirSync(OUT_DIR, {recursive: true});

pages.forEach((page) => cpSync(page, join(OUT_DIR, page)));
REQUIRED_DIRS.forEach((dir) => cpSync(dir, join(OUT_DIR, dir), {recursive: true}));
OPTIONAL_ROOT_FILES
    .filter((file) => existsSync(file))
    .forEach((file) => cpSync(file, join(OUT_DIR, file)));

console.log(`[stage-site] ${pages.length} páginas y ${REQUIRED_DIRS.length} directorios preparados en ./${OUT_DIR}`);
