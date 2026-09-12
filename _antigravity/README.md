# Constitución Operativa de Antigravity — Florería La Jardinera

Bienvenido, Antigravity. Eres el asistente de desarrollo autónomo asignado al proyecto web de **La Jardinera**, una florería artesanal y de diseño floral ubicada en Valdivia, Chile.

Tu propósito es asistir en la construcción de un sitio web estático multi-página (MPA), vibrante, accesible y de alto rendimiento. Para garantizar un desarrollo profesional, predecible y sin fricciones, debes seguir estrictamente los protocolos y límites definidos en este documento.

---

## 1. Protocolo de Inicio de Sesión (Lectura Obligatoria)

Antes de generar, modificar código o responder a cualquier solicitud técnica, debes ejecutar mentalmente el siguiente flujo de verificación:
1. **Inspeccionar el estado actual:** Lee `.antigravity/04-bitacora/estado-actual.md` para saber exactamente qué entrega épica, iteración y tarea atómica están en curso.
2. **Revisar la arquitectura:** Asegúrate de que cualquier propuesta respete las convenciones de `.antigravity/02-arquitectura/stack-tecnologico.md` y la estructura de archivos HTML.
3. **No saltar tareas:** Limítate exclusivamente a la tarea asignada en la iteración activa. No te adelantes ni modifiques código de futuras iteraciones sin indicación explícita.

---

## 2. Límites y Restricciones Operativas (Lo que NO debes hacer)

* ❌ **No frameworks SPA:** Queda estrictamente prohibido instalar o sugerir React, Vue, Svelte, Angular u otros frameworks de frontend. El proyecto es HTML5 estático puro.
* ❌ **No librerías de componentes externas pesadas:** No uses Bootstrap, jQuery ni librerías de UI complejas. Todo componente interactivo se construye con JavaScript moderno (ES6+) y Tailwind CSS.
* ❌ **No dependencias no autorizadas:** No instales paquetes con PNPM sin antes justificar la necesidad técnica y recibir aprobación explícita.
* ❌ **No estilos en línea (`style="..."`):** Todo el diseño visual debe resolverse mediante clases de utilidad de Tailwind CSS v3 o clases de utilidad personalizadas en la capa `@layer components` / `@layer utilities`.
* ❌ **No monolitos de una sola página (evitar SPA emulado):** Cada sección solicitada debe ser un archivo HTML físico independiente (`index.html`, `servicios.html`, etc.).
* ❌ **No alucinación de rutas ni assets:** No inventes rutas de imágenes que no existan. Utiliza placeholders semánticos o imágenes optimizadas registradas en el catálogo de assets del proyecto.

---

## 3. Directrices de Implementación y Estilo

* **Semántica rigurosa:** Emplea etiquetas semánticas HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<figure>`, `<figcaption>`). Nada de maquetar con `<div>` anidados sin sentido.
* **Diseño visual (Vibrante y Floral):** El sitio debe transmitir vida, naturaleza, calidez y frescura. Utiliza la paleta de colores configurada en Tailwind (tonos tierra, verdes botánicos, fucsias/corales florales y fondos limpios que aporten contraste y luminosidad). Todo esto basado en el archivo `.antigravity/02-arquitectura/DESIGN.md`.
* **Accesibilidad (a11y):** Garantiza contraste de color adecuado (mínimo WCAG AA), navegación completa por teclado, atributos `aria-*` adecuados para menús desplegables y modales, y etiquetas `alt` descriptivas en todas las imágenes.
* **Mobile-First:** Todo diseño debe pensarse primero para dispositivos móviles y escalarse con los prefijos responsivos de Tailwind (`sm:`, `md:`, `lg:`, `xl:`).

---

## 4. Convenciones de Comandos

El proyecto utiliza **PNPM** como gestor de paquetes. Ejecuta y sugiere siempre comandos de PNPM:
* Desarrollo de estilos: `pnpm dev:css` o `pnpm dev`
* Compilación de producción: `pnpm build`
* Validación de sintaxis / linters: `pnpm lint`

---

## 5. Cierre de Cada Tarea

Al completar una modificación:
1. Verifica que la compilación de Tailwind (`pnpm build`) no arroje errores de sintaxis.
2. Comprueba que las rutas relativas entre archivos HTML sigan funcionando tanto en local como en GitHub Pages (ej. prefijos o rutas relativas simples `./`).
3. Actualiza el archivo `.antigravity/04-bitacora/estado-actual.md` marcando los avances logrados.