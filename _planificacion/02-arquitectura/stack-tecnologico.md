# Stack Tecnológico y Reglas de Arquitectura

**⚠️ DIRECTRIZ ESTRICTA PARA AGENTES IA:**
Este documento rige la arquitectura de software del proyecto. Cualquier desviación de estas directrices (ej. incrustar
scripts en HTML o inventar configuraciones de Tailwind) será considerada una regresión crítica.

## 1. Núcleo Tecnológico

| Capa                   | Tecnología Seleccionada          | Propósito                                                                  |
|:-----------------------|:---------------------------------|:---------------------------------------------------------------------------|
| **Gestor de Paquetes** | pnpm `11.24.0` (Node `>= 22.22`) | Gestión determinista de dependencias (versión fijada en `packageManager`)  |
| **Estructura**         | Astro `7.x`, salida estática (MPA) | Seis páginas en `src/pages/`; layout y componentes compilados a HTML. Cero SPA, cero islas. |
| **Estilos**            | Tailwind CSS `v3.4.x` vía PostCSS | Procesado por Astro; CSS con *hash* en `_site/_astro/`                    |
| **Interactividad**     | JavaScript Vanilla (ES6+)        | Módulos estrictos. Cero jQuery, cero frameworks de interfaz (React/Vue/Preact). |
| **Despliegue**         | GitHub + Cloudflare Pages        | Despliegue continuo desde `main`, vistas previas por rama, comando `pnpm run build:cf` (`astro build`), salida `_site/`. |

El sistema de diseño vive en **`DESIGN.md`, en la raíz del repositorio**. `_planificacion/02-arquitectura/DESIGN.md` es
solo una redirección.

---

## 2. Configuración Estricta de Tailwind CSS

El agente **NO DEBE** alterar el archivo `tailwind.config.js` inyectando paletas de colores ficticias. El archivo debe
reflejar el 100% de los tokens definidos en `DESIGN.md` (raíz del repositorio). La configuración autorizada incluye la directiva
`darkMode: 'class'` y la importación íntegra del objeto de colores original (Surface, Primary, Tertiary, etc.).

**Reglas de CSS:**

* ❌ **Prohibido:** Estilos en línea (`style="..."`).
* ❌ **Prohibido:** Enlazar Tailwind mediante CDN (`<script src="https://cdn.tailwindcss.com"></script>`).
* ✅ **Obligatorio:** Importar `src/css/input.css` una sola vez, en el *frontmatter* de `BaseLayout.astro`.
* ✅ **Obligatorio:** `build.inlineStylesheets: 'never'` y `vite.build.assetsInlineLimit: 0` en `astro.config.mjs`.
* ✅ **Obligatorio:** `compressHTML: false` en `astro.config.mjs`: con la compresión por defecto, Astro elimina el espacio
  entre un texto y la etiqueta en línea siguiente (`Nombre <span>*</span>` pasaría a `Nombre<span>*</span>`).
* ✅ **Obligatorio:** Mantener la capa `@layer base` en `src/css/input.css` para resets globales (ej. reset de
  scrollbar).
* ✅ **Obligatorio:** Las clases de Tailwind se escriben siempre en forma literal; Tailwind no detecta clases armadas con
  plantillas.

---

## 3. Arquitectura JavaScript (Estándar Senior)

El código JavaScript debe tratarse como software de nivel producción. Se aplican las siguientes reglas obligatorias:

1. **Cero JS en línea:** Prohibido el uso de atributos como `onclick`, `onchange` o bloques `<script>` con lógica
   incrustada en el HTML.
2. **Módulos ES6:** Toda la lógica debe residir en `src/js/modules/*.js` e importarse de forma **estática** desde
   `src/js/main.js`, que `BaseLayout.astro` carga al final del `<body>` con un `<script>` procesado por Astro.
3. **Encapsulamiento y Scope:** Prohibido contaminar el objeto global `window`. Las variables deben estar encapsuladas
   en sus respectivos módulos exportados.
4. **Eficiencia DOM (Caché):** Si un elemento del DOM se utiliza más de una vez en un módulo, su selección
   (`querySelector`) debe guardarse en una constante al inicio de la función.
5. **Event Delegation:** Para listas, grillas o múltiples botones similares, se debe usar delegación de eventos
   adjuntando el listener a un contenedor padre, en lugar de iterar y crear decenas de listeners individuales.
6. **Desacoplamiento:** Los módulos (ej. `theme.js`, `navigation.js`) no deben conocerse ni depender entre sí a menos
   que sea estrictamente necesario.