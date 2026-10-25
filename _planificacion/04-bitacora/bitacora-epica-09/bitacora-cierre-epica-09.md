# Bitácora de Cierre - Épica 09

**Fecha de cierre:** 25-10-2026
**Agente:** Claude Code
**Estado:** Completada con reservas; fusionada a `main` el 25-10-2026. Reservas abiertas: Safari y dispositivo Apple.

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

**10 casillas cumplidas (1 con reserva) y 1 abierta** (Safari y dispositivo Apple).

| # | Casilla | Estado | Fuente |
|:-:|:--|:-:|:--|
| 1 | Textos de la clienta con erratas aprobadas | [x] | It. 01, §1 y §4.3 [render] [informado] |
| 2 | Carrusel: 4 fotos, 7 s, pausa ≥ 44 px, pausas automáticas, movimiento reducido, ADR-004 | [x] | It. 02, §8.7 [render]; pestaña oculta y pantalla bloqueada en celular real [informado] (§8) |
| 3 | SM-01 con medición del `h1` | [x] | It. 02, §4.1 y §8.7 [render] |
| 4 | Contraste del hero, 4 fotos × 7 viewports × 2 temas, incluida DT-20 | [x] | It. 02, §8.6 [render]: 0 fallas con `/60` |
| 5 | SM-02: Tab y Shift+Tab en el ciclo; Escape devuelve el foco | [x] | It. 03, §4.2 [render]; It. 04, §4.4 [render]; teclado real [informado] (§8) |
| 6 | Modales abren mostrando el inicio | [x] | It. 03, §4.3 [render] (168 de 168); celular real [informado] (§8) |
| 7 | SM-03 sin cambiar el script de arranque (ADR-003) | [x] | It. 04, §4.1 y §4.2 [render] [medido]; perfil limpio en navegador real [informado] (§8) |
| 8 | Sin regresiones en 7 viewports × 2 temas | [x] con reserva | It. 04, §4.4 [render] (84 de 84 frente al build de `3dbc5cf`), celular real, teclado real y Firefox [informado] (§8). Reserva: Safari/iOS sin probar |
| 9 | Invariantes de `AGENTS.md` §5 (regla 7) | [x] | It. 04, §4.1 [medido] |
| 10 | Documentos protegidos actualizados mediante propuestas -/+ | [x] | `DESIGN.md` §5, §12 y §13 (`d0e9ad9`); P-5 a P-10 aplicadas por el desarrollador (25-10-2026) |
| 11 | Safari y dispositivo Apple | [ ] | No probados [informado]: la reserva sigue abierta, junto con la del ruido de píxeles de Servicios |

El DoD no tiene casilla de rendimiento: Lighthouse queda fuera de alcance (§4 de la definición). Las cifras del §3.3 son
informativas.

### 3.3 Lighthouse [informado]

PageSpeed Insights, Lighthouse 13.5.0, mismo método que la Épica 08, sobre la vista previa `pages.dev` de la rama y
sobre producción (`main`). Móvil medido el 24-10-2026; escritorio, el 25-10-2026 (3 corridas por cada entorno).

| Medida | Rama, móvil (3) | Rama, escritorio (3) | Producción, móvil (1) | Producción, escritorio (3) |
|:--|:--|:--|:--|:--|
| Performance | 72 / 71 / 70 (mediana 71) | 98 / 96 / 98 (mediana 98) | 71 | 97 / 97 / 96 (mediana 97) |
| FCP | 3,6 / 3,2 / 3,2 s | 0,9 s en las 3 | 3,5 s | 0,9 s en las 3 |
| LCP | 4,8 / 5,9 / 6,3 s | 1,0 / 1,3 / 1,0 s | 5,7 s | 1,2 / 1,1 / 1,2 s |
| TBT | 0 ms | 0 ms | 0 ms | 0 ms |
| CLS | 0 / 0,074 / 0,074 | 0,003 | 0,029 | 0,003 |
| Speed Index | 4,8 / 3,2 / 3,2 s | 1,0 / 0,9 / 0,9 s | 3,9 s | 1,0 / 0,9 / 1,1 s |
| Peso | 3.625 KiB | 5.823 KiB | 3.258 KiB | 5.087 KiB |
| Accesibilidad | 91 | 91 | 91 | 91 |
| SEO / Recomendaciones | 69 / 96 | 69 / 96 | 100 / 100 | 100 / 100 |

SEO 69 y Recomendaciones 96 en la rama se deben a que las vistas previas `pages.dev` bloquean la indexación y a un aviso
de errores en consola coherente con DT-28 (*beacon* de Web Analytics); producción da 100 y 100.

**Conclusión:** sin regresión de rendimiento. Móvil: 71 en la rama frente a 71 en producción. Escritorio: mediana 98 en la
rama frente a 97 en producción (la corrida de 92 del 24-10-2026 fue ruido).

**Observaciones abiertas para la Épica 10 (sin diagnóstico):** CLS móvil de 0,074 en 2 de 3 corridas, causa no
determinada (producción: 0,029), y aumento de peso por las fotos 2 a 4 del carrusel (+367 KiB en móvil, +736 KiB en
escritorio), que no afecta a FCP ni a LCP.

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
| DT-35 (nueva, P-7 aplicada) | Observaciones de Lighthouse de la Épica 09 (§3.3): CLS móvil de 0,074 y peso de las fotos 2 a 4 del carrusel. El LCP de escritorio se midió de nuevo y no es un problema | Épica 10 |
| DT-36 (nueva, detectada en el cierre) | Hero de Suscripción Floral sin botón de pausa (WCAG 2.2.2) ni movimiento reducido; anterior a la épica y fuera de su alcance | Épica 10 |

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
| Render automático solo en Chrome *headless* | Cerrada (25-10-2026) | Probado en celular real, teclado real y Firefox (§8) |
| Lighthouse de escritorio de la rama con 1 corrida | Cerrada (25-10-2026) | 3 corridas en la rama y 3 en producción: sin regresión (§3.3) |

## 7. Desviaciones del plan y observaciones de proceso

* It. 01: 2 fotos del hero versionadas antes de tiempo en `ff48a96` (H-01); se renombraron en la It. 02.
* It. 02: intervalo de 7 s entre inicios de transición (D-1) y tema oscuro mal medido en la ejecución, corregido al
  cierre (§8.4).
* It. 03: `min-h-0` no bastó en horizontal; se resolvió con P-4 en la It. 04.
* It. 04: el ADR-003 quedó desactualizado en un párrafo (H-18, P-5).

## 8. Pruebas manuales del desarrollador (lista de comprobación)

Resultados [informado] por el desarrollador el 25-10-2026, sobre la vista previa de la rama. Sin hallazgos en ninguna
prueba; lo que requiere un dispositivo Apple queda pendiente. Dispositivo utilizado Samsung Galaxy A55+, con Android 16 y
Google Chrome más Mozilla Firefox.

* [x] Celular real: pestaña oculta y pantalla bloqueada; el carrusel no avanza y retoma al volver. [informado] Sin hallazgos.
* [x] Celular real: con el dedo, las 8 modales en vertical y en horizontal hasta el último párrafo, la galería y el
  botón «Cotizar este servicio» completo; abrir dos modales seguidas y comprobar que la segunda parte en el inicio.
  [informado] Sin hallazgos.
* [x] Celular real: rotación fluida, botón de pausa alcanzable con el pulgar y SM-01 legible a pleno sol. [informado]
  Sin hallazgos.
* [x] Teclado real en un navegador de escritorio angosto (< 1024 px): ciclo de Tab, Escape y capa tenue del panel.
  [informado] Sin hallazgos.
* [x] Tema en un navegador real con perfil limpio: primera visita sin `theme` en `localStorage` (DevTools →
  Application); alternar, recargar y navegar mantienen la elección. [informado] Sin hallazgos.
* [ ] 🕒 Safari/iOS (dispositivo Apple): `<picture>` por orientación, transición, `backdrop-filter`, modales en horizontal y
  fotos de Servicios (reserva de ruido de píxeles). No probado: el desarrollador no tiene dispositivo Apple.
* [x] Firefox: carrusel, panel, modales y tema. [informado] Sin hallazgos.
* [x] Lector de pantalla (NVDA o VoiceOver): solo se lee la foto visible y el botón de pausa anuncia su nombre.
  [informado] Sin hallazgos.
* [x] PageSpeed Insights en la vista previa y en producción, móvil [informado] (§3.3).
* [x] PageSpeed Insights de escritorio: 3 corridas en la vista previa de la rama y 3 en producción (25-10-2026)
  [informado]. Rama: Performance 98 / 96 / 98 (mediana 98), LCP 1,0 / 1,3 / 1,0 s, CLS 0,003. Producción: Performance
  97 / 97 / 96 (mediana 97), LCP 1,2 / 1,1 / 1,2 s, CLS 0,003. Sin regresión; la corrida de 92 del 24-10-2026 fue ruido.

## 9. Verificación posterior a la fusión (25-10-2026) [informado]

* [x] Despliegue de producción de `main` correcto en Cloudflare Pages.
* [x] PageSpeed Insights de producción con **SEO 100 y Recomendaciones 100**, en móvil y en escritorio (en la vista previa
  daban 69 y 96 por `pages.dev`). Móvil: Performance 73 y Accesibilidad 91. Escritorio, 3 corridas: 92 / 97 / 97
  (mediana 97); la de 92 fue ruido. Sin regresión de rendimiento.
* [x] `https://lajardinerafloreria.cl`: carrusel, modales en horizontal y primera visita sin tema guardado, revisados a
  ojo sin hallazgos.

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
* **Épica 10 — Rendimiento y calidad Lighthouse:** por planificar. Hereda DT-21 a DT-29, DT-35 y DT-36 (CLS móvil de 0,074 y
  peso del carrusel).
