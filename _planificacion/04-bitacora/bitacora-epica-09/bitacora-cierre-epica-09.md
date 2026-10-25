# Bitácora de Cierre - Épica 09

**Fecha de cierre:** 25-10-2026
**Agente:** Claude Code
**Estado:** Completada con reservas; pendiente de fusión a `main` (la hace el desarrollador).

> Rótulos: [código] (lectura del repositorio), [medido] y [render] (Claude Code, en las bitácoras citadas o en la It. 04),
> [informado] (el desarrollador), 🕒 PENDIENTE. Esta bitácora resume las bitácoras de las Iteraciones 01 a 04 y los datos
> que entregó el desarrollador.

## 1. Resumen de la épica

**Objetivo:** ajustar el sitio en móvil (SM-01 a SM-03) y aplicar los pedidos de la clienta (textos, carrusel del hero y
desplazamiento de las modales de Servicios), sin regresiones de paridad fuera de lo pedido.

| Iteración | Resultado | Último commit | Bitácora |
|:--|:--|:--:|:--|
| 01 · Textos de la clienta | Completada con reservas: textos en Inicio, 6 modales y Suscripción Floral; itálica 600 y 700 de Montserrat. | `706f2b4` | [bitacora-iteracion-01.md](bitacora-iteracion-01.md) |
| 02 · Carrusel del hero y SM-01 (ADR-004) | Completada con reservas: 4 fotos, pausa de 44 px, tinte `/60` con 0 fallas de contraste en 416 mediciones; DT-20 resuelta. | `d0e9ad9` | [bitacora-iteracion-02.md](bitacora-iteracion-02.md) |
| 03 · SM-02 y modales de Servicios | Completada con reservas: trampa de foco del panel; modales alcanzables en vertical y abiertas en el inicio (168 de 168). | `3dbc5cf` | [bitacora-iteracion-03.md](bitacora-iteracion-03.md) |
| 04 · SM-03, P-4 y cierre | Completada con reservas: primera visita sin escritura en `localStorage`; modal en dos columnas en horizontal bajo 768 px. | sin commit (lo hace el desarrollador) | [bitacora-iteracion-04.md](bitacora-iteracion-04.md) |

Hashes tomados de `git log main..HEAD` en solo lectura [código].

## 2. Resultado final del DoD (`definicion-epica.md` §6)

**9 casillas cumplidas (2 con reserva) y 2 abiertas** (documentos protegidos, que aplica el desarrollador, y Safari).

| # | Casilla | Estado | Fuente |
|:-:|:--|:-:|:--|
| 1 | Textos de la clienta con erratas aprobadas | [x] | It. 01, §1 y §4.3 [render] [informado] |
| 2 | Carrusel: 4 fotos, 7 s, pausa ≥ 44 px, pausas automáticas, movimiento reducido, ADR-004 | [x] con reserva | It. 02, §8.7 [render]; pestaña oculta y pantalla bloqueada en celular real 🕒 PENDIENTE |
| 3 | SM-01 con medición del `h1` | [x] | It. 02, §4.1 y §8.7 [render] |
| 4 | Contraste del hero, 4 fotos × 7 viewports × 2 temas, incluida DT-20 | [x] | It. 02, §8.6 [render]: 0 fallas con `/60` |
| 5 | SM-02: Tab y Shift+Tab en el ciclo; Escape devuelve el foco | [x] | It. 03, §4.2 [render]; It. 04, §4.4 [render]. Teclado real 🕒 PENDIENTE |
| 6 | Modales abren mostrando el inicio | [x] | It. 03, §4.3 [render] (168 de 168) |
| 7 | SM-03 sin cambiar el script de arranque (ADR-003) | [x] | It. 04, §4.1 y §4.2 [render] [medido] |
| 8 | Sin regresiones en 7 viewports × 2 temas | [x] con reserva | It. 04, §4.4 [render] (84 de 84 frente al build de `3dbc5cf`) y regresiones de cada iteración. Reserva: render automático solo en Chrome *headless* |
| 9 | Invariantes de `AGENTS.md` §5 (regla 7) | [x] | It. 04, §4.1 [medido] |
| 10 | Documentos protegidos actualizados mediante propuestas -/+ | [ ] | `DESIGN.md` §5, §12 y §13 ya aplicados (`d0e9ad9`); quedan P-6 a P-10 (§10), las aplica el desarrollador |
| 11 | Safari y dispositivo Apple | [ ] | No probados [informado]: la reserva sigue abierta, junto con la del ruido de píxeles de Servicios |

El DoD no tiene casilla de rendimiento: Lighthouse queda fuera de alcance (§4 de la definición). Las cifras del §3.3 son
informativas.

## 3. Cifras finales

### 3.1 Compilación [medido]

`pnpm run build:cf` con código 0, 6 páginas, 0 advertencias y **114 archivos** en `_site/`. CSS `BaseLayout.CkTHFWtT.css`
(46.947 B).

### 3.2 Auditoría estática [medido]

0 `style="`, 0 `onclick`, 0 `<style>`, 1 `<script>` sin `src` por página (717 caracteres, SHA-256 `5b490c26…`, igual que
en la Épica 08), IDs únicos, 0 `href="#"` en header y footer, 0 `./public/`, invariantes del header intactos.

### 3.3 Lighthouse [informado]

24-10-2026, PageSpeed Insights, Lighthouse 13.5.0, mismo método que la Épica 08, sobre la vista previa `pages.dev` de la
rama y sobre producción (`main`).

| Medida | Rama, móvil (3 corridas) | Rama, escritorio (1 corrida) | Producción, móvil (1) | Producción, escritorio (1) |
|:--|:--|:--|:--|:--|
| Performance | 72 / 71 / 70 (mediana 71) | 92 | 71 | 97 |
| FCP | 3,6 / 3,2 / 3,2 s | 0,9 s | 3,5 s | — |
| LCP | 4,8 / 5,9 / 6,3 s | 1,8 s | 5,7 s | 1,1 s |
| TBT | 0 ms | 0 ms | — | — |
| CLS | 0 / 0,074 / 0,074 | 0,003 | 0,029 | — |
| Speed Index | 4,8 / 3,2 / 3,2 s | — | — | — |
| Peso | 3.625 KiB | 5.823 KiB | 3.258 KiB | 5.087 KiB |
| Accesibilidad | 91 | 91 | — | — |
| SEO / Recomendaciones | 69 / 96 (indexación bloqueada por `pages.dev` y un aviso de errores en consola) | 69 / 96 | 100 / 100 | 100 / 100 |

**Observaciones abiertas para la Épica 10 (sin diagnóstico):** CLS de 0,074 en 2 de 3 corridas móviles, causa no
determinada; aumento de peso por las fotos 2 a 4 del carrusel (+367 KiB en móvil, +736 KiB en escritorio); LCP de
escritorio (1,8 s en la rama frente a 1,1 s en producción). El escritorio de la rama tiene 1 sola corrida: queda por
confirmar (§8).

## 4. Deuda técnica (verificada contra `_planificacion/README.md` §12)

### 4.1 Resuelta en la épica

| Deuda | Resuelta en |
|:--|:--|
| DT-20 · Contraste del acento «La Jardinera» | It. 02 (tinte `/60`: ≥ 3,71:1); ya figura como resuelta en §12 |
| SM-01, SM-02 y SM-03 (§14) | It. 02, It. 03 e It. 04 (estado «Hecha»: propuesta P-6) |

### 4.2 Abiertas y nuevas

| Deuda | Tema | Destino |
|:--|:--|:--|
| DT-11 (abierta) | Archivos con BOM (incluye `theme.js`, `modal.js` y `navigation.js`) | Oportunista |
| DT-12 (abierta) | Deuda de diseño de `DESIGN.md` §5 | Según iteración |
| DT-21 a DT-29 (abiertas) | Rendimiento, imágenes, accesibilidad, encabezados, videos, Suscripción Floral, `rum` y código muerto | Épica 10 |
| DT-30 (abierta) | Fin de soporte de Node 22 | Mantenimiento (antes de abril de 2027) |
| DT-31 (nueva, propuesta P-7) | H-12: en 740×360 el panel móvil cubre todo el viewport; no hay capa tenue donde tocar. P-4 no lo cambia | Por decidir |
| DT-32 (nueva, propuesta P-7) | H-13: al cruzar a ≥ 1024 px con el foco en el panel, el foco queda en `body` | Por decidir |
| DT-33 (nueva, propuesta P-7) | H-14: contraste del anillo de foco del botón de cierre de la modal no medido de forma concluyente | Por decidir |
| DT-34 (nueva, propuesta P-7) | H-15: con el panel abierto, tras un clic de ratón en el botón de tema, Shift+Tab va al logotipo. Aceptada como limitación conocida (SM-02 D-01) | Limitación aceptada |
| DT-35 (nueva, propuesta P-7) | Observaciones de Lighthouse de la Épica 09 (§3.3) | Épica 10 |

## 5. Decisiones

* **ADR-003:** sin cambios en el script; P-5 propone actualizar su párrafo de consecuencias por SM-03.
* **ADR-004** (carrusel automático del hero): Aprobada (24-10-2026).
* **Decisiones del desarrollador:** SM-03 D-01 (21-10-2026); P-4 con 3 clases `landscape:` (24-10-2026); H-15 aceptada y
  SM-02 D-01 se mantiene (24-10-2026); todas las pruebas manuales van en este cierre (24-10-2026).

## 6. Reservas finales y su destino

| Reserva | Estado | Destino |
|:--|:-:|:--|
| Safari y dispositivo Apple sin probar | Abierta | Siguiente épica en que haya dispositivo Apple |
| Ruido de píxeles de Servicios («atribuido por analogía, no demostrado») | Abierta | Se cierra al probar en Apple sin diferencia visible |
| Render automático solo en Chrome *headless* | Abierta | Pruebas manuales del §8 |
| Lighthouse de escritorio de la rama con 1 corrida | Abierta | §8 |

## 7. Desviaciones del plan y observaciones de proceso

* It. 01: 2 fotos del hero versionadas antes de tiempo en `ff48a96` (H-01); se renombraron en la It. 02.
* It. 02: intervalo de 7 s entre inicios de transición (D-1) y tema oscuro mal medido en la ejecución, corregido al
  cierre (§8.4).
* It. 03: `min-h-0` no bastó en horizontal; se resolvió con P-4 en la It. 04.
* It. 04: el ADR-003 quedó desactualizado en un párrafo (H-18, P-5).

## 8. Pruebas manuales del desarrollador (lista de comprobación)

* [ ] 🕒 Celular real: pestaña oculta y pantalla bloqueada; el carrusel no avanza y retoma al volver.
* [ ] 🕒 Celular real: con el dedo, las 8 modales en vertical y en horizontal hasta el último párrafo, la galería y el
  botón «Cotizar este servicio» completo; abrir dos modales seguidas y comprobar que la segunda parte en el inicio.
* [ ] 🕒 Celular real: rotación fluida, botón de pausa alcanzable con el pulgar y SM-01 legible a pleno sol.
* [ ] 🕒 Teclado real en un navegador de escritorio angosto (< 1024 px): ciclo de Tab, Escape y capa tenue del panel.
* [ ] 🕒 Tema en un navegador real con perfil limpio: primera visita sin `theme` en `localStorage` (DevTools →
  Application); alternar, recargar y navegar mantienen la elección.
* [ ] 🕒 Safari/iOS (dispositivo Apple): `<picture>` por orientación, transición, `backdrop-filter`, modales en horizontal y
  fotos de Servicios (reserva de ruido de píxeles).
* [ ] 🕒 Firefox: carrusel, panel, modales y tema.
* [ ] 🕒 Lector de pantalla (NVDA o VoiceOver): solo se lee la foto visible y el botón de pausa anuncia su nombre.
* [x] PageSpeed Insights en la vista previa y en producción, móvil [informado] (§3.3).
* [ ] 🕒 PageSpeed Insights de escritorio: 3 corridas en la vista previa de la rama y 3 en producción.

## 9. Verificación posterior a la fusión (🕒 PENDIENTE, desarrollador)

* Despliegue de producción de `main` correcto en Cloudflare Pages.
* PageSpeed Insights de producción con **SEO 100 y Recomendaciones 100** (en la vista previa dan 69 y 96 por `pages.dev`).
* `https://lajardinerafloreria.cl`: carrusel, modales en horizontal y primera visita sin tema guardado.

## 10. Bytes de los documentos y propuestas para archivos protegidos

Ver la respuesta final de la ejecución de la It. 04 (propuestas P-5 a P-10, con líneas completas verificadas contra el
repositorio). Resumen:

| Propuesta | Archivo y sección | Cambio |
|:--|:--|:--|
| P-5 | `decisiones-tecnicas.md`, ADR-003, «Consecuencias» | `setInitialTheme()` ya no escribe en la primera visita (SM-03) |
| P-6 | `_planificacion/README.md` §14 | SM-01 a SM-03: destino Épica 09 y estado «Hecha» |
| P-7 | `_planificacion/README.md` §12 | Filas DT-31 a DT-35 |
| P-8 | `README.md` §15 | Épica 09 «completada con reservas» |
| P-9 | `DESIGN.md` §8.1 | Disposición en dos columnas en horizontal bajo 768 px |
| P-10 | `DESIGN.md` §15 | Entrada de la Épica 09 · Iteración 04 |

## 11. Siguiente paso

* **Fusión de `feat/revision-movil` a `main`** (desarrollador) y verificación del §9.
* **Épica 10 — Rendimiento y calidad Lighthouse:** por planificar. Hereda DT-21 a DT-29 y DT-35 (CLS 0,074, peso del
  carrusel, LCP de escritorio).
