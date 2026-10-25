# Épica 10: Rendimiento y Calidad Lighthouse

> **Estado:** ⏳ Planificada y aprobada. Decisiones D-01 a D-05 tomadas por el desarrollador el 25-10-2026 (§6);
> D-06 se decide en la Iteración 06. Lista para ejecutar la Iteración 01.
> **Origen:** deuda técnica de `_planificacion/README.md` §12 con destino «Épica 10» (DT-21 a DT-29, DT-35 y DT-36),
> hoja de ruta de `README.md` §15 y mediciones de PageSpeed Insights del cierre de la Épica 09 (24 y 25-10-2026).
> **Prerrequisitos:** Épica 09 fusionada a `main` (cumplido, 25-10-2026, `0a59e02`); planificación de esta épica
> commiteada en `main@def7edb`.
> **Rama de trabajo:** `feat/rendimiento-calidad`, creada desde `main@def7edb` (D-02).
>
> Las decisiones de esta épica las toma el desarrollador y se registran con su fecha en cada iteración. Lo marcado
> «Pendiente de definir» es un vacío, no una decisión: ninguna iteración lo resuelve por su cuenta. Las iteraciones 02
> a 06 se ajustan con los resultados de la Iteración 01 antes de ejecutarse.

---

## 1. Objetivo de la Épica

1. Acercar el sitio a las metas de `01-vision/objetivos-y-metricas.md` §2 (Performance, Accesibilidad, Best Practices,
   FCP y CLS) atacando las causas medidas: entrega de imágenes, fuentes y CSS que bloquean el renderizado, videos de la
   Galería y desplazamientos de diseño.
2. Saldar la deuda de accesibilidad y calidad pendiente (encabezados, ARIA, movimiento automático sin pausa y código
   muerto).

Todo **sin cambiar el diseño visible** fuera de lo que cada iteración especifique: misma paleta, misma tipografía, mismo
contenido y mismos módulos Vanilla.

---

## 2. Alcance

### 2.1 Deuda técnica incluida (`_planificacion/README.md` §12)

| ID | Tema | Dónde vive hoy | Iteración |
|:---|:-----|:---------------|:---------:|
| DT-21 | Performance móvil bajo la meta (línea base de la Épica 08: 68 a 83, mediana 74) | Transversal | 01 (diagnóstico) y 06 (cierre) |
| DT-22 | Logotipos PNG de 3446×3504 px (306.435 B y 229.345 B) mostrados a 44×44 px; el original también es el favicon | `SiteHeader.astro`, `BaseLayout.astro`, `public/logos/` | 02 |
| DT-23 | Imágenes sin `width`/`height` (9 en el Inicio, 24 en la Galería) | `index.astro`, `galeria.astro` | 02 |
| DT-24 | Accesibilidad del Inicio (ARIA prohibido en reseñas, enlaces solo de ícono) | `carousel.js`, `index.astro` | 06 |
| DT-25 | Orden de encabezados (Inicio, Servicios, 404, reseñas) | `index.astro`, `servicios.astro`, `404.astro`, `carousel.js`, `SiteFooter.astro` | 06 |
| DT-26 | Galería con 10 `<video>` en reproducción automática, sin `preload` ni `poster` (48,8 MB) | `galeria.astro`, `public/images/galeria/` | 04 |
| DT-27 | Suscripción Floral bajo la referencia anterior a Astro (escritorio 89, LCP móvil 8,45 s) | `suscripcion-floral.astro` | 05 |
| DT-28 | *Beacon* de Web Analytics con error en las vistas previas `pages.dev` | Cloudflare | 06 (decisión) |
| DT-29 | Código muerto en `subscription.js` (`#show-plans-btn`, `#hide-plans-btn`) | `subscription.js` | 05 |
| DT-35 | CLS móvil de 0,074 sin causa determinada; peso de las fotos 2 a 4 del carrusel del Inicio | `index.astro`, `hero-carousel.js` | 01 (causa), 02 o 03 (corrección) |
| DT-36 | Hero de Suscripción Floral sin pausa ni movimiento reducido; intervalo de 4 s | `subscription.js`, `suscripcion-floral.astro` | 05 |

### 2.2 Hallazgos del asesor al planificar (25-10-2026, [código])

* **Fuentes de Google bloqueantes:** `BaseLayout.astro` carga desde `fonts.googleapis.com` 8 estilos de Montserrat y 4
  de Noto Serif. Es una hoja de estilos externa que bloquea el renderizado; PageSpeed estimó 2.090 a 2.670 ms de ahorro
  por bloqueo en móvil (24-10-2026). → Iteración 03.
* **CSS propio bloqueante:** un archivo de 46.947 B. `astro.config.mjs` fija `inlineStylesheets: 'never'` por
  `AGENTS.md` §5, regla 2 (cero CSS en línea), así que no se puede incrustar sin cambiar esa regla. → Iteración 03.
* **Imágenes mal comprimidas:** `galeria-2.webp` (1.342.888 B), `servicio-novias.webp` (1.051.730 B) y
  `servicio-magu.webp` (1.025.868 B) miden solo 928×1152 px; el problema es la compresión, no el tamaño. → Iteración 02.
* **Hero de Suscripción Floral:** las 4 fotos miden 2752×1536 px (horizontales) pero el marcado declara proporciones
  verticales que no coinciden: `width="720" height="1280"` en `hero-1` a `hero-3` y `width="1440" height="1621"` en
  `hero-4`. No hay variante móvil (`<picture>`): un celular descarga la foto de escritorio completa. → Iteración 05.
* **Doble descarga del logotipo (revisión del 25-10-2026, [código], hipótesis):** `SiteHeader.astro` incluye las dos
  variantes del logotipo (original y blanca) y oculta una con `hidden` / `dark:hidden`. Una imagen oculta con CSS se
  descarga igual, así que cada página pediría ambos PNG (535.780 B en total) para mostrar uno de 44 px. La Iteración 01
  lo confirma con la lista de peticiones de PageSpeed; se corrige dentro de DT-22. → Iteración 02.
* **Videos de la Galería y WCAG 2.2.2:** los 10 videos se reproducen solos y en bucle, sin control de pausa. Es el mismo
  criterio que obligó al botón de pausa del carrusel del Inicio (ADR-004) y que motivó DT-36. → Iteración 04.

### 2.3 Restricciones registradas

* **Reglas de `AGENTS.md` §5:** cero JS y CSS en línea (regla 2), imágenes `.webp` en `public/images/` con `width`,
  `height`, `alt` y `loading="lazy"` bajo el pliegue (regla 9), accesibilidad (regla 10). Si una mejora exige cambiar
  una regla, se entrega como propuesta y espera la decisión del desarrollador.
* **Sin dependencias nuevas en `package.json`** salvo decisión explícita del desarrollador. Las herramientas de
  optimización (por ejemplo `sharp`) se ejecutan con `pnpm dlx` y versión fija.
* **Diseño:** colores, tamaños y espaciados solo de `DESIGN.md` / `tailwind.config.js`. Una imagen recomprimida no debe
  verse distinta a simple vista en los 7 viewports.
* **Contraste del hero del Inicio:** calibrado en la Épica 09 · It. 02 (tinte `/60`, 416 mediciones). Si cambia una foto
  del carrusel (recompresión o recorte), se repite la medición para esa foto.
* **Método de medición:** el de D-03 (§6.1), igual en la línea base, en cada iteración y en el cierre. No se comparan
  cifras de herramientas distintas: Lighthouse local no se usa para puntajes en esta épica.

---

## 3. Heredado de la Épica 09

| Tema | Estado |
|:-----|:-------|
| Safari y dispositivo Apple | Sin probar. Se retoma si el desarrollador consigue un dispositivo Apple. |
| Ruido de píxeles de Servicios | Reserva abierta de la Épica 08; se cierra al probar en Apple sin diferencia visible. |
| DT-31, DT-32 y DT-33 | Destino «Por decidir» (decisión del desarrollador, 25-10-2026); se deciden en esta épica (D-06). |
| DT-34 | Limitación aceptada (24-10-2026). No se toca. |
| PageSpeed del Inicio al cierre de la Épica 09 | Producción, móvil: 73 (1 corrida, 25-10-2026). Escritorio: 92 / 97 / 97 (mediana 97). Accesibilidad 91, Recomendaciones 100, SEO 100. |

---

## 4. Fuera de alcance

* **DT-30 (Node.js 22):** destino Mantenimiento, antes de abril de 2027, salvo que el desarrollador decida incluirlo
  (D-05).
* Cambios de contenido, rediseño, nuevas páginas o funciones; migración a Tailwind 4, frameworks de interfaz o
  renderizado en servidor.
* Reemplazar fotografías o videos por otros distintos: se optimizan los existentes. Un recorte o un póster nuevo sale
  del mismo archivo.
* La categoría experimental «Navegación con agentes» de Lighthouse.

---

## 5. Plan de Iteraciones (propuesta del asesor, pendiente de aprobación)

| It. | Entregable | Resultado verificable | Obligatoria |
|:----|:-----------|:----------------------|:-----------:|
| 01 | Línea base y diagnóstico (solo lectura) | Cifras de las 5 páginas indexables en móvil y escritorio con el método de D-03; elemento LCP y origen del CLS por página; lista priorizada de imágenes, fuentes y recursos bloqueantes. Sin cambios de código. | Sí |
| 02 | Imágenes: logotipos y favicon, dimensiones declaradas, recompresión y carga de las fotos 2 a 4 del carrusel | DT-22 y DT-23 resueltas; bytes de imagen antes y después por página; sin cambios visibles. | Sí |
| 03 | Fuentes y CSS que bloquean el renderizado | Menos tiempo de bloqueo medido; CLS por fuentes corregido si la It. 01 lo confirma (DT-35); tipografía idéntica a la vista. | Sí |
| 04 | Galería: videos con carga diferida y control del movimiento | DT-26 resuelta; bytes de la carga inicial de la Galería antes y después; videos que cumplen WCAG 2.2.2. | Sí |
| 05 | Suscripción Floral: hero, LCP y código muerto | DT-36, DT-27 y DT-29 resueltas o con desviación registrada. | Sí |
| 06 | Accesibilidad y calidad transversal + cierre de la épica | DT-24 y DT-25 resueltas; DT-28 y DT-31 a DT-33 decididas; medición final con el mismo método; bitácora de cierre y propuestas -/+. | Sí |

La It. 01 va primero porque las demás dependen de saber qué pesa más en cada página. Imágenes (02) va antes que fuentes
(03) porque es el mayor ahorro estimado. La 05 junta los tres cambios de Suscripción Floral para medir esa página una
sola vez.

---

## 6. Decisiones pendientes de la épica

| ID | Decisión | Opciones | Estado |
|:---|:---------|:---------|:-------|
| D-01 | Metas de la épica | **b) Metas por dispositivo**, por página y en producción (mediana de 3 corridas): Performance de escritorio ≥ 95, Performance móvil ≥ 85, Accesibilidad 100, Best Practices 100, SEO 100 y CLS ≤ 0,1 en ambos dispositivos. El FCP se registra sin umbral. `01-vision/objetivos-y-metricas.md` §2 se actualiza al cierre con una propuesta -/+ (Iteración 06, Tarea 5). | Decidido (25-10-2026) |
| D-02 | Nombre de la rama | `feat/rendimiento-calidad`, creada desde `main@def7edb` (el commit de planificación de esta épica, posterior a la fusión `0a59e02`). | Decidido (25-10-2026) |
| D-03 | Método de medición | **Solo PageSpeed Insights**, ejecutado por Claude Code mediante su API oficial (mismo motor que `pagespeed.web.dev`). Los JSON crudos se guardan en el repositorio. Sin Lighthouse local para puntajes. Chrome *headless* con perfil aislado queda permitido solo para inventario de red y render (bytes, orden y prioridad de descarga, capturas), sin puntajes ni métricas de rendimiento. Detalle en §6.1. | Decidido (25-10-2026) |
| D-04 | Páginas medidas | Las 5 indexables (Inicio, Servicios, Suscripción Floral, Galería, Contacto). La 404 queda fuera. | Decidido (25-10-2026) |
| D-05 | DT-30 (Node.js 22) | **a) Fuera** de esta épica: destino Mantenimiento, antes de abril de 2027. | Decidido (25-10-2026) |
| D-06 | Destino de DT-31, DT-32 y DT-33 | Se decide en la It. 06 con los resultados de Accesibilidad. | Pendiente de definir |

### 6.1 Protocolo de medición (D-03)

| Aspecto | Regla |
|:--------|:------|
| Herramienta | API oficial de PageSpeed Insights v5 (`https://www.googleapis.com/pagespeedonline/v5/runPagespeed`), con las 4 categorías (`performance`, `accessibility`, `best-practices`, `seo`) y `strategy` `mobile` o `desktop`. La ejecuta Claude Code con `curl` (sin dependencias nuevas). |
| Clave de API | Opcional. Si la cuota sin clave se agota (HTTP 429), el desarrollador define la variable de entorno `PSI_API_KEY` en su sesión. La clave **nunca** se escribe en archivos, bitácoras ni mensajes, ni queda dentro de los JSON guardados. |
| Corridas | 3 por página y dispositivo, **secuenciales** (nunca en paralelo), con al menos 15 s entre corridas. Se informa la mediana de cada métrica y el detalle de cada corrida. Una corrida con error se repite y se registra el error. |
| Páginas | Las 5 de D-04: `/`, `/servicios`, `/suscripcion-floral`, `/galeria` y `/contacto`. |
| Dónde | Línea base (It. 01): producción, `https://lajardinerafloreria.cl` (la rama aún tiene el mismo código que `main`). Iteraciones 02 a 05: la vista previa de la rama en Cloudflare Pages tras el push del desarrollador, **solo en las páginas tocadas**. Cierre: vista previa de la rama y producción tras la fusión, en las 5 páginas. |
| Antes y después | La medición posterior a la iteración N se ejecuta en la Tarea 0 de la iteración N+1 (su «después» es el «antes» de la siguiente) y se registra en esa bitácora. La de la It. 06 se hace en el cierre. |
| Vistas previas | En `*.pages.dev`, SEO (indexación bloqueada) y Best Practices (DT-28) no son comparables con producción: solo cuentan Performance, Accesibilidad y las métricas (FCP, LCP, TBT, CLS, Speed Index). |
| Datos reales (CrUX) | Si la respuesta trae datos de campo (`loadingExperience`), se registran aparte; no reemplazan a las cifras de laboratorio. |
| Archivos | `_planificacion/04-bitacora/bitacora-epica-10/pagespeed/itNN-<entorno>-<pagina>-<dispositivo>-cN.json` (por ejemplo `it01-produccion-inicio-movil-c1.json`), tal como los entrega la API. Entorno: `produccion` o `vista-previa`. |
| Evidencia | Cada cifra en la bitácora lleva la etiqueta [medido] y el nombre del JSON de origen. |

---

## 7. Definition of Done

* [ ] Línea base registrada con el método de D-03 (It. 01) y medición final con el mismo método (It. 06).
* [ ] Metas de D-01 cumplidas, o la brecha registrada con números, causa y decisión del desarrollador.
* [ ] DT-22, DT-23, DT-24, DT-25, DT-26, DT-29 y DT-36 resueltas con evidencia.
* [ ] DT-21, DT-27 y DT-35 resueltas o con desviación registrada y destino.
* [ ] DT-28 y DT-31 a DT-33 con decisión del desarrollador registrada.
* [ ] Todo movimiento automático de más de 5 s tiene control de pausa y respeta `prefers-reduced-motion` (WCAG 2.2.2,
  `DESIGN.md` §12.4).
* [ ] Sin regresiones visuales en 320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768 y 1280×800, en modo claro y
  oscuro, fuera de lo que cada iteración cambia.
* [ ] Invariantes de `AGENTS.md` §5 intactos, incluido el script del tema (ADR-003, SHA-256 `5b490c26…`).
* [ ] Documentos protegidos actualizados por el desarrollador mediante propuestas -/+.
* [ ] Producción verificada tras la fusión (SEO 100, Best Practices 100 y las cifras de la medición final).

---

## 8. Riesgos

| Riesgo | Mitigación |
|:-------|:-----------|
| Las cifras de PageSpeed varían entre corridas (se vio 92 y 97 en escritorio con el mismo sitio) | 3 corridas y mediana; ninguna conclusión con 1 sola corrida. |
| La API de PageSpeed limita la cuota sin clave (HTTP 429) | Corridas secuenciales con pausa; si se agota, el desarrollador define `PSI_API_KEY` en su sesión, sin escribirla en archivos. |
| Sin Lighthouse local no hay cifras antes del push | Dentro de cada iteración se verifica con bytes y render (Chrome *headless*); los puntajes se miden en la vista previa al inicio de la iteración siguiente. |
| Una imagen recomprimida pierde calidad visible | Comparación visual antes/después por imagen y aprobación del desarrollador para las fotos del hero. |
| Las fuentes propias cambian el aspecto del texto | Mismas familias, pesos y estilos; comparación de render en los 7 viewports. |
| La meta de Performance móvil ≥ 95 no es alcanzable con un sitio de fotografía en una red 4G lenta emulada | D-01 decide la meta antes de empezar; la brecha se registra con su causa. |
| Cambiar la carga de los videos rompe la reproducción o la ampliación de la Galería | Pruebas de reproducción al entrar en pantalla y de la ampliación en los 7 viewports. |
| Una optimización exige cambiar una regla de `AGENTS.md` | Se entrega como propuesta y espera la decisión del desarrollador. |