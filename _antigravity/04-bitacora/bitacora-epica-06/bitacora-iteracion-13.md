# Bitácora de Ejecución - Épica 06 (Fase 2) - Iteración 13 (Extensión no planificada)

**Fecha de Ejecución:** 19 de Septiembre de 2026
**Iteración:** 13 (adicional a las 12 planificadas originalmente)
**Épica:** 06 — Consolidación Global de Navegación, Paridad Móvil, Página 404 y Optimización del Header Móvil
**Objetivo:** Resolver el **Hallazgo H8** (ruptura de línea de "Suscripción Floral" entre ~1024 px y ~1099 px en la barra de escritorio), documentado como abierto desde la Iteración 07 y confirmado sin resolver al cierre de la Iteración 12.

---

## 1. Origen del Hallazgo

H8 fue detectado en pruebas de las Iteraciones 07, 10 y 11: en el rango aproximado de 1024 a 1079/1099 px, el enlace "Suscripción Floral" de la barra de escritorio se parte en dos líneas por falta de espacio horizontal. El spec original de la Épica 06 (Fase 2) no autorizaba corregirlo dentro de las Iteraciones 07 a 12 ("no se intervino en base a las reglas de limitación de código para mantener la paridad estructural", bitácora 11).

## 2. Diagnóstico (Estimación Estática, no medición en render real)

Se estimó el ancho requerido por la barra a 1024 px sumando: marca (~209 px), navegación de 5 enlaces con `px-4` (16 px) y `tracking-[0.16em]`, y clúster de íconos con `gap-space-3` (24 px). Resultado: **ancho requerido entre ~950 px y ~1015 px, contra ~929 px disponibles** — un déficit de entre 14 y 86 px según cómo el navegador mida el ancho real de los glifos.

> 🕒 Esta cifra es una **estimación aritmética**, no una medición de navegador. Debe tratarse como diagnóstico, no como certificación.

## 3. Solución Aplicada

Se introdujo una compactación **responsiva** de la barra de escritorio, activa solo entre `lg` (1024px) y `xl` (1280px), restaurando el espaciado original desde `xl` en adelante — de modo que la experiencia en monitores grandes (≥1280px) permanece visualmente idéntica a la original:

| Elemento | Antes | Después |
|:---|:---|:---|
| Padding horizontal de cada enlace del nav | `px-4` | `px-2.5 xl:px-4` |
| Espaciado entre letras (`tracking`) | `tracking-[0.16em]` | `tracking-[0.1em] xl:tracking-[0.16em]` |
| Subrayado activo/hover (`left`/`right`) | `left-4 right-4` | `left-2.5 right-2.5 xl:left-4 xl:right-4` |
| Espacio entre íconos sociales y tema | `lg:gap-space-3` (24px) | `lg:gap-2 xl:gap-space-3` (8px → 24px) |

Aplicado **idénticamente** en los 6 archivos HTML (`index.html`, `servicios.html`, `suscripcion-floral.html`, `galeria.html`, `contacto.html`, `404.html`), tocando únicamente el `<nav>` de escritorio y el contenedor de íconos sociales dentro del `<header>`; el resto del header, el panel móvil y la capa tenue no se modificaron.

## 4. Estimación del Resultado (no medición en render real)

Con los valores nuevos, el margen de sobra a 1024 px pasa de **negativo** (faltaban entre 14 y 86 px) a **positivo, entre +48 px y +105 px** según el escenario de ancho de glifo considerado. La estimación indica que el defecto queda resuelto con margen de seguridad, pero **esto no reemplaza la verificación en navegador real**.

## 5. Verificación de Criterios de Aceptación (Definition of Done)

| Criterio | Estado | Evidencia |
| :--- | :---: | :--- |
| Sin ruptura de línea en "Suscripción Floral" entre 1024–1099 px | 🕒 PENDIENTE | Estimación aritmética favorable; falta confirmación en navegador |
| Escritorio ≥1280px visualmente idéntico al original | 🕒 PENDIENTE | Las clases `xl:` restauran los valores originales por diseño; falta captura antes/después |
| Paridad de los 6 archivos entre sí | ✅ CONFIRMADO (código) | Mismo patrón de clases aplicado en los 6 |
| `navigation.js` sin modificar | ✅ CONFIRMADO (código) | Cambio limitado a clases Tailwind del `<header>` |
| Panel móvil y capa tenue sin alteración | ✅ CONFIRMADO (código) | No se tocó `#mobile-menu` ni `#mobile-menu-scrim` |
| `pnpm build` sin advertencias | 🕒 PENDIENTE | Debe ejecutarse tras pegar los 6 archivos |

## 6. Matriz de Paridad Transversal (post-corrección)

| Archivo | `px-2.5 xl:px-4` en nav | `tracking-[0.1em] xl:tracking-[0.16em]` | `lg:gap-2 xl:gap-space-3` en clúster |
|:---|:---:|:---:|:---:|
| `index.html` | ✅ | ✅ | ✅ |
| `servicios.html` | ✅ | ✅ | ✅ |
| `suscripcion-floral.html` | ✅ | ✅ | ✅ |
| `galeria.html` | ✅ | ✅ | ✅ |
| `contacto.html` | ✅ | ✅ | ✅ |
| `404.html` | ✅ | ✅ | ✅ |

## 7. Confirmación de Restricción Git y Archivos Modificados

✅ Cero comandos Git ejecutados.

Archivos editados:
1. `index.html`
2. `servicios.html`
3. `suscripcion-floral.html`
4. `galeria.html`
5. `contacto.html`
6. `404.html`
7. `dist/css/output.css` — 🕒 PENDIENTE (recompilar con `pnpm build`)
8. `_antigravity/04-bitacora/bitacora-epica-06/bitacora-iteracion-13.md` (este archivo, creado)
9. `_antigravity/04-bitacora/estado-actual.md` (actualizado)

## 8. Comprobación Manual Pendiente (obligatoria antes de certificar H8 como cerrado)

- [ ] Achicar la ventana del navegador entre 1024 px y 1099 px en las 6 páginas y confirmar 0 rupturas de línea.
- [ ] Comparar captura de pantalla a 1280px antes/después: debe ser idéntica.
- [ ] `pnpm build` sin advertencias nuevas.
- [ ] Verificar en modo oscuro además de claro.