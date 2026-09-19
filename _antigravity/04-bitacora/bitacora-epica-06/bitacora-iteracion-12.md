# Bitácora de Ejecución - Épica 06 (Fase 2) - Iteración 12

**Fecha de Ejecución:** 19 de Septiembre de 2026
**Iteración:** 12 de 12
**Épica:** 06 — Consolidación Global de Navegación, Paridad Móvil, Página 404 y Optimización del Header Móvil
**Objetivo:** Migrar el header de `404.html` al patrón maestro en **estado neutro** (ningún enlace activo), eliminando su patrón de drawer divergente, y ejecutar la auditoría transversal de paridad sobre los 6 documentos HTML que cierra la Fase 2.

> ⚠️ **Nota de reconstrucción documental:** esta bitácora no existía en el repositorio (confirmado tras varias búsquedas independientes durante una auditoría externa). Se reconstruye aquí a partir de una **auditoría estática de código** —no de una sesión de navegador headless real como las bitácoras 07 a 11—, por lo que los ítems que solo se certifican con render real (medidas en píxeles, hashes SHA-256, consola del navegador, `pnpm build`) se marcan como **PENDIENTE** en vez de inventarse.

---

## 1. Resumen Ejecutivo

Se verificó que `404.html` ya contiene el bloque de marca compactado (`gap-3 sm:gap-4`, `shrink-0` en ambos PNG, `hidden sm:block` en el separador, `text-headline-sm sm:text-headline-md whitespace-nowrap` en el texto), idéntico al de `index.html` (Iteración 07, fuente de la verdad), y que su clúster de acciones, botón hamburguesa (`#mobile-menu-btn` con `#mobile-menu-icon-open`/`#mobile-menu-icon-close`), panel anclado (`#mobile-menu`) y capa tenue (`#mobile-menu-scrim`) siguen el mismo patrón maestro que las Iteraciones 07 a 11.

La particularidad de esta iteración es la **regla de neutralidad**: a diferencia de las otras 5 páginas, en `404.html` ningún enlace —ni en la barra de escritorio ni en el panel móvil— lleva `aria-current="page"` ni las clases `text-primary` / `text-primary font-semibold`, porque la página de error no representa ninguna sección del sitio.

Se ejecutó además la auditoría transversal de paridad (Tarea 5 del spec) sobre los 6 documentos.

---

## 2. Acciones Verificadas en `404.html`

### Bloque de marca
Coincide con el estándar: `<a class="flex items-center gap-3 sm:gap-4 group" data-path="inicio" href="./index.html">`, ambos `<img>` con `shrink-0`, separador `hidden sm:block`, texto `font-headline-md text-headline-sm sm:text-headline-md italic tracking-tight whitespace-nowrap fx-spotlight`.

### Barra de escritorio (estado neutro)
Los 5 enlaces (`Inicio`, `Servicios`, `Suscripción Floral`, `Galería`, `Contacto`) están en estado neutro: `text-on-surface-variant hover:text-primary`, subrayado `scale-x-0 group-hover:scale-x-100`, **sin** `aria-current` en ninguno.

### Panel móvil (estado neutro)
Los 5 enlaces del panel conservan `text-on-surface-variant hover:text-on-surface`, **sin** `text-primary font-semibold` ni `aria-current` en ninguno — confirmado como el único de los 6 archivos sin enlace activo, tal como exige la Regla de Neutralidad definida desde la Iteración 01.

### Capa `#mobile-menu-scrim`
Nodo hermano inmediato posterior a `</header>`, con las mismas clases del estándar (`hidden lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-neutral-900/40`).

### Contenido fuera de alcance (verificado intacto)
`<meta name="robots" content="noindex, follow"/>`, el bloque central (rombo ✦, `404`, título "Esta flor no florece aquí", párrafo) y el botón CTA `href="./index.html"` permanecen sin cambios — correcto, la Iteración 12 no debía tocarlos.

---

## 3. Verificación de Criterios de Aceptación (Definition of Done)

| Escenario | Estado | Evidencia |
| :--- | :---: | :--- |
| **1. Cabecera esencial sin desbordes** (320/360/412/768px) | 🕒 PENDIENTE | Requiere render real; confirmado solo por lectura de clases |
| **2. Panel anclado, legible, en estado neutro** | ✅ CONFIRMADO (código) | 0 ocurrencias de `aria-current` / `text-primary` en el panel |
| **3. Comportamiento consistente del módulo compartido** | ✅ CONFIRMADO (código) | `#mobile-menu-btn`/`#mobile-menu`/`#mobile-menu-scrim`/íconos presentes; `navigation.js` no fue modificado |
| **4. Cero regresión en escritorio y en la página de error** | 🕒 PENDIENTE | Requiere alternar tema y verificar consola en navegador real |
| **5. Paridad global de las 6 páginas** | ✅ CONFIRMADO (código) — ver matriz | 🕒 render real pendiente |

---

## 4. Matriz de Paridad del Header (6 páginas)

| Archivo | Enlace activo (barra y panel) | Capa `#mobile-menu-scrim` | `fixed` dentro del `<header>` | Panel `#mobile-menu` |
|:---|:---|:---:|:---:|:---|
| `index.html` | Inicio | ✅ Presente | ✅ 0 | ✅ Estándar (anclado) |
| `servicios.html` | Servicios | ✅ Presente | ✅ 0 | ✅ Estándar (anclado) |
| `suscripcion-floral.html` | Suscripción Floral | ✅ Presente | ✅ 0 | ✅ Estándar (anclado) |
| `galeria.html` | Galería | ✅ Presente | ✅ 0 | ✅ Estándar (anclado) |
| `contacto.html` | Contacto | ✅ Presente | ✅ 0 | ✅ Estándar (anclado) |
| `404.html` | Ninguno (estado neutro) | ✅ Presente | ✅ 0 | ✅ Estándar (anclado) |

**Paridad por bloques (marca, clúster, botón, panel, capa):** idéntica en las 6 páginas salvo el estado activo, confirmado por lectura directa de código.

**Zero Dead Links:** 0 ocurrencias de `href="#"` en barras y footers de navegación en las 6 páginas (los `href="#"` presentes en `galeria.html` pertenecen a tarjetas del `<main>`, fuera de la navegación).

---

## 5. Hallazgo Abierto al Cierre de esta Iteración

**H8 (ancho de la barra de escritorio):** confirmado como **abierto** al cerrar esta iteración. Entre ~1024 px y ~1099 px, el enlace "Suscripción Floral" se parte en dos líneas en los 6 archivos por falta de espacio en la barra de escritorio (consistente con lo reportado en las bitácoras 07, 10 y 11). **No se corrigió en esta iteración** porque estaba fuera de su alcance declarado (el spec de la Iteración 12 solo autorizaba tocar `404.html`).

➡️ Resuelto posteriormente en la **Iteración 13** (ver bitácora correspondiente).

---

## 6. Confirmación de Restricción Git / Archivos Involucrados

✅ Cero comandos Git ejecutados durante esta reconstrucción documental.

Archivos referenciados en esta bitácora:
1. `404.html` (verificado, sin ediciones de código en este paso — ya estaba migrado)
2. `_antigravity/04-bitacora/bitacora-epica-06/bitacora-iteracion-12.md` (este archivo, creado)
3. `_antigravity/04-bitacora/estado-actual.md` (corregido — ver documento aparte)

**Compilación (`pnpm build`):** 🕒 PENDIENTE — ejecutar y confirmar que `dist/css/output.css` no reporta advertencias.