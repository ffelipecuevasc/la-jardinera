# Iteración 04: Header y Panel Móvil como Componente

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):**
El header es el bloque con más historia de defectos del proyecto (Épica 06, Fase 2, Iteraciones 07 a 13). Su marcado
pasa a `SiteHeader.astro` **sin ninguna mejora**: mismos IDs, mismas clases, mismos atributos ARIA y el mismo orden.
`navigation.js` y `theme.js` no se tocan; si algo obliga a tocarlos, la iteración está mal planteada y se detiene.

Fuente de la verdad: `AGENTS.md` §5.7 (invariantes del header), `DESIGN.md` §9 y el header de `src/pages/index.astro`.

**Autorización explícita de esta iteración:** creación de `src/components/SiteHeader.astro`; edición de
`src/layouts/BaseLayout.astro` y de las 6 páginas (solo para retirar su header y su capa tenue).

## 1. Objetivo de la Iteración

Que el header, el panel móvil y la capa tenue existan una sola vez y se generen en las 6 páginas con el estado activo
correcto, sin diferencia en el DOM respecto de la referencia salvo espacios en blanco.

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Diferencias actuales (solo lectura)

Normaliza espacios y compara los 6 headers contra el de Inicio. Diferencias esperadas: el enlace activo
(`aria-current="page"` y `text-primary` en lugar de `text-on-surface-variant hover:text-primary`) en barra de escritorio
y panel móvil, y un comentario distinto en la 404. Cualquier otra diferencia se reporta antes de seguir.

### Tarea 1: `SiteHeader.astro`

1. Recibe `paginaActiva` (`null` en la 404: estado neutro, igual que hoy).
2. Marcado copiado del header de Inicio. Los enlaces de la barra y del panel se generan desde `NAVEGACION`
   (`src/data/navegacion.js`), con las clases activa e inactiva como **cadenas literales completas**.
3. El componente devuelve **dos nodos hermanos**: `<header>…</header>` seguido inmediatamente de
   `<div id="mobile-menu-scrim" …>`. Así se mantiene el invariante de que la capa tenue es el hermano inmediato posterior
   al header.
4. Íconos SVG en línea: se copian tal cual (Astro admite atributos con guion; no hay traducción).

### Tarea 2: Layout y páginas

`BaseLayout` renderiza `<SiteHeader paginaActiva={paginaActiva} />` como primer hijo de `<body>`. Se retiran el header y
la capa tenue de las 6 páginas.

### Tarea 3: Verificación

1. `scripts/comparar-con-referencia.mjs`: 0 diferencias en header y capa tenue.
2. Invariantes por búsqueda en `_site/`: ningún descendiente de `<header>` con `fixed`; `#mobile-menu-scrim` justo
   después de `</header>`; `h-20`, `top-full`, `max-h-[calc(100dvh-5rem)]` y `top-20` presentes; IDs únicos.
3. Render real: apertura y cierre del panel móvil (botón, capa tenue, tecla Escape, foco atrapado y devuelto), barra de
   escritorio entre 1024 y 1279 px sin quiebre de "Suscripción Floral" (H8), cambio de tema, en los 7 viewports y ambos
   temas.
4. Consola limpia en las 6 páginas.

### Tarea 4: Registro

Bitácora, `estado-actual.md` y commit sugerido `Épica 08 - Iteración 04: Unifica el header y el panel móvil en un componente Astro.`

## 3. Auditoría de No-Regresión e Invariantes

* `navigation.js`, `theme.js` e `input.css` sin cambios (`git diff` vacío en esos archivos).
* Clases literales; ningún token nuevo.

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Fuente única**
    * **Dado** el código fuente
    * **Cuando** se buscan `<header` y `mobile-menu-scrim`
    * **Entonces** aparecen solo en `SiteHeader.astro` (y en los selectores de los módulos JS).
* **Escenario 2: DOM equivalente**
    * **Dado** la referencia de la It. 01
    * **Cuando** se compara el header de las 6 páginas
    * **Entonces** no hay diferencias salvo espacios en blanco y cierre de etiquetas vacías.
* **Escenario 3: Menú móvil intacto**
    * **Dado** un viewport de 360×740
    * **Cuando** se abre y cierra el menú con el botón, la capa tenue y Escape
    * **Entonces** se comporta igual que en la referencia y el foco vuelve al botón.
* **Escenario 4: Estado neutro en la 404**
    * **Dado** `/a/b/inexistente`
    * **Cuando** se inspecciona el header
    * **Entonces** ningún enlace tiene `aria-current`.
