# Épica 09: Revisión Móvil y Contenidos de la Clienta

> **Estado:** 🚧 en curso. Definición aprobada por el desarrollador el 21-10-2026 y ampliada el 24-10-2026 con los
> pedidos de la clienta (textos, carrusel del hero y desplazamiento de las modales de Servicios).
> **Origen:** solicitudes de mejora SM-01, SM-02 y SM-03 de `_planificacion/README.md` §14, trasladadas al cerrar la
> Épica 08 (19-10-2026), y pedidos de la clienta recibidos el 24-10-2026 (documento «MODIFICACIONES OCTUBRE 2026 -
> Textos web», fuera del repositorio; su contenido se transcribe en `iteracion-01.md`).
> **Prerrequisitos:** Épica 08 fusionada a `main` (cumplido, 21-10-2026).
> **Rama de trabajo:** `feat/revision-movil` (creada por el desarrollador desde `main@8f68443`).
>
> Las decisiones de esta épica las toma el desarrollador y se registran con su fecha en cada iteración. Lo marcado
> «Pendiente de definir» es un vacío, no una decisión: ninguna iteración lo resuelve por su cuenta.

---

## 1. Objetivo de la Épica

1. Ajustar la interfaz y el comportamiento del sitio en móvil (SM-01 a SM-03).
2. Aplicar los cambios de contenido y de comportamiento pedidos por la clienta: textos de Inicio, Servicios y
   Suscripción Floral; carrusel automático de fotografías en el hero del Inicio; y corrección del desplazamiento inicial
   de las modales de Servicios.

Todo **sin regresiones de paridad** respecto del sitio que deja la Épica 08: mismo diseño fuera de lo que cada pedido
cambia, mismos módulos Vanilla, misma configuración de Cloudflare Pages.

---

## 2. Alcance

### 2.1 Solicitudes de mejora (`_planificacion/README.md` §14)

| ID    | Página              | Viewport                 | Solicitud                                                                                                                                         | Dónde vive | Iteración |
|:------|:--------------------|:-------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------|:-----------|:---------:|
| SM-01 | Inicio (`#titular`) | Móvil (menos de 768 px)  | Reducir el tamaño del título y del párrafo del hero; ocultar el ícono SVG y la fila «Valdivia, Región de Los Ríos, Chile»; dejar solo «Descubrir más» con su flecha. | `src/pages/index.astro` | 02 |
| SM-02 | Todas (header)      | Móvil (menos de 1024 px) | Panel móvil: trampa de foco con Tab y Shift+Tab. Hoy el foco sale del panel y solo Escape lo devuelve a la hamburguesa. No es una regresión.       | `src/js/modules/navigation.js` | 03 |
| SM-03 | Todas (tema)        | Todos                    | Primera visita: `setInitialTheme()` guarda en `localStorage` la preferencia del sistema como si fuera una elección. No guardar hasta que se alterne con el botón. | `src/js/modules/theme.js` | 04 |

### 2.2 Pedidos de la clienta (24-10-2026)

| Pedido | Página | Solicitud | Dónde vive | Iteración |
|:-------|:-------|:----------|:-----------|:---------:|
| Textos de la clienta | Inicio, Servicios, Suscripción Floral | Reemplazo y ajuste de textos según el documento de la clienta (transcrito en `iteracion-01.md`). | `src/pages/index.astro`, `src/js/data/services.js`, `src/pages/suscripcion-floral.astro` | 01 |
| Carrusel del hero | Inicio (`#titular`) | Reemplazar la fotografía estática del hero por 4 fotografías que cambian solas con un desplazamiento horizontal. | `src/pages/index.astro`, `src/css/input.css`, nuevo módulo en `src/js/modules/`, `public/images/` | 02 |
| Desplazamiento de las modales | Servicios | Al abrir una modal de servicio se ve el final del contenido y hay que subir a mano hasta el inicio. | `src/js/modules/modal.js` | 03 |

### 2.3 Restricciones registradas

* **Contraste del hero:** se calibró en la Épica 01 · Iteración 08 (tinte `/45`, percentil 95 del fondo bajo la
  tarjeta, 7 viewports, 2 temas) con una sola fotografía. El carrusel y SM-01 cambian la foto y el tamaño del texto, así
  que la medición se repite **una sola vez, en la Iteración 02, para las 4 fotografías**.
* **DT-20** (contraste del acento «La Jardinera» `#ffc2c6`, bajo 3:1 en 412×915 y 740×360) se vuelve a medir en la
  Iteración 02: cambia la fotografía, que es su condición de revisión.
* **Umbral de contraste según tamaño:** un texto es «grande» desde 24 px, o desde 18,66 px en negrita. El `h1` móvil
  de 32 px en `font-semibold` sigue siendo grande (3:1); el párrafo de 16 px exige 4,5:1.
* **Tokens:** tamaños, colores y espaciados solo de `DESIGN.md` / `tailwind.config.js`; lo que falte se entrega como
  propuesta -/+ al desarrollador.
* **Movimiento:** todo efecto continuo declara su alternativa en `prefers-reduced-motion` (`DESIGN.md` §12) y todo
  contenido que se mueve solo más de 5 s tiene un control de pausa (WCAG 2.2.2).
* **Imágenes del hero:** pasan a `public/images/<sección>/` cuando se toque de nuevo el hero (`DESIGN.md` §5, punto 10,
  y §13).

---

## 3. Heredado de la Épica 08

| Tema | Estado |
|:-----|:-------|
| Safari y dispositivo Apple | Sin probar. Se retoma en esta épica si el desarrollador consigue un dispositivo Apple (decisión del desarrollador, 19-10-2026). |
| Render real solo en Chrome *headless* | Reserva abierta de la Épica 08. Firefox y celular real fueron probados a mano por el desarrollador, sin diferencias. |
| Ruido de píxeles de Servicios | Reserva abierta de la Épica 08 («atribuido por analogía, no demostrado»): 3.576 píxeles fuera de zonas planificadas (0,0015 %), diferencia máxima de 29 niveles [medido, bitácora de la It. 08, §5]. Se revisa al probar en un dispositivo Apple: si no se ve diferencia en las fotos de Servicios, se cierra (decisión del desarrollador, 21-10-2026). |

---

## 4. Fuera de alcance

* **Rendimiento y Lighthouse:** corresponden a la Épica 10 (DT-21 a DT-29, según el destino de cada fila en
  `_planificacion/README.md` §12), incluida DT-27. DT-30 (Node 22) tiene destino Mantenimiento. El carrusel sí debe
  cuidar que las fotografías nuevas no compitan con la carga de la primera (Iteración 02).
* Cambios de contenido que no estén en el documento de la clienta; rediseño fuera de los pedidos de §2; migración a
  Tailwind 4, frameworks de interfaz y renderizado en servidor, igual que en la Épica 08.
* Las modales «Flores para un Matrimonio» y «Novios por el Río», que el documento de la clienta no menciona.

---

## 5. Plan de Iteraciones (aprobado por el desarrollador, 24-10-2026)

| It. | Entregable | Resultado verificable | Obligatoria |
|:----|:-----------|:----------------------|:-----------:|
| 01 | Textos de la clienta (Inicio, 6 modales de Servicios, Suscripción Floral) | Textos idénticos a la transcripción de `iteracion-01.md`, con las erratas evidentes corregidas y listadas para aprobación del desarrollador; sin cambios de diseño. | Sí |
| 02 | Carrusel automático del hero (4 fotografías) + SM-01 (hero móvil), con ADR-004 | Carrusel con pausa, movimiento reducido y pausas automáticas; hero móvil según SM-01; contraste medido para las 4 fotos en 7 viewports y 2 temas. | Sí |
| 03 | SM-02 (trampa de foco del panel móvil) + desplazamiento inicial de las modales de Servicios | Tab y Shift+Tab ciclan en el panel; cada modal abre mostrando el inicio de su contenido. | Sí |
| 04 | SM-03 (tema en la primera visita) + cierre de la épica | Primera visita sin escritura en `localStorage`; bitácora de cierre y propuestas -/+ para protegidos. | Sí |

La It. 01 va primero porque no depende de las fotografías y cambia textos antes de medir el hero. La It. 02 junta el
carrusel y SM-01 para medir el contraste una sola vez.

---

## 6. Definition of Done

* [ ] Textos de la clienta aplicados según `iteracion-01.md`, con la lista de erratas corregidas aprobada por el
  desarrollador.
* [ ] Carrusel del hero con 4 fotografías, intervalo de 7 s, botón de pausa/reproducir de al menos 44×44 px, pausa
  automática con la pestaña oculta o el hero fuera de pantalla, y foto fija con movimiento reducido; ADR-004 registrado.
* [ ] SM-01 hecha según las decisiones del 21-10-2026, con la medición del tamaño renderizado del `h1`.
* [ ] Contraste del hero medido para las 4 fotografías en los 7 viewports y los 2 temas: cumple AA o la desviación queda
  registrada con números y una decisión del desarrollador (incluida DT-20).
* [ ] SM-02 hecha: Tab y Shift+Tab se mantienen en el ciclo «enlaces del panel + hamburguesa»; Escape cierra y devuelve
  el foco a la hamburguesa.
* [ ] Las modales de Servicios abren mostrando el inicio de su contenido, en cualquier orden de apertura.
* [ ] SM-03 hecha sin cambiar el script de arranque del tema (ADR-003).
* [ ] Sin regresiones de paridad en 320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768 y 1280×800, en modo claro y
  oscuro, fuera de lo que cada pedido cambia.
* [ ] Invariantes de `AGENTS.md` §5 intactos (en particular los del header, regla 7).
* [ ] Documentos protegidos actualizados por el desarrollador mediante propuestas -/+ (`DESIGN.md` §5, §12 y §13;
  `_planificacion/README.md` §14; `README.md`).
* [ ] Safari y dispositivo Apple: probados si el desarrollador consigue el dispositivo; si no, la reserva se mantiene. En
  ese caso, revisar también las fotos de Servicios (reserva de ruido de píxeles de la Épica 08).

---

## 7. Riesgos

| Riesgo | Mitigación |
|:-------|:-----------|
| Alguna fotografía nueva no alcanza el contraste del hero con el tinte `/45` | Medir las 4 en la It. 02 antes de cerrar; si una falla, reportar números y opciones (subir el tinte para todas o descartar esa foto) y esperar la decisión del desarrollador. |
| Las fotografías 2 a 4 empeoran la carga inicial (DT-21) | Solo la primera foto lleva `fetchpriority="high"`; las demás se piden después de la carga y se mide que no compitan. |
| El carrusel distrae o marea | Botón de pausa, foto fija con movimiento reducido y pausa con la pestaña oculta o el hero fuera de pantalla. |
| La trampa de foco rompe el cierre con Escape o el foco inicial | Probar con teclado real en el panel abierto y cerrado; módulo con cláusula de guarda (`AGENTS.md` §5). |
| Un texto de la clienta rompe el diseño de una modal o de una sección | Verificación en render de cada modal en 360×740 y 1280×800, en ambos temas. |
| Sin dispositivo Apple, Safari sigue sin probarse | Mantener la reserva abierta y registrarla en el cierre. |