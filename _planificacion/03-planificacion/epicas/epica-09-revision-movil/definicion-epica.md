# Épica 09: Revisión Móvil

> **Estado:** ⏳ planificada, pendiente de aprobación del desarrollador.
> **Origen:** solicitudes de mejora SM-01, SM-02 y SM-03 de `_planificacion/README.md` §14, trasladadas al cerrar la
> Épica 08 (19-10-2026).
> **Prerrequisitos:** Épica 08 fusionada a `main` (cumplido, 21-10-2026).
> **Rama de trabajo:** Pendiente de definir.
>
> Todo lo marcado «a confirmar por el desarrollador» o «Pendiente de definir» es una propuesta o un vacío, no una
> decisión. Esta definición no inventa diseños ni cifras: solo ordena lo que ya está registrado en el repositorio.

---

## 1. Objetivo de la Épica

Ajustar la interfaz y el comportamiento del sitio en móvil, **sin regresiones de paridad** respecto del sitio que deja
la Épica 08: mismo contenido, mismo diseño fuera de lo que cada solicitud cambia, mismos módulos Vanilla, misma
configuración de Cloudflare Pages.

---

## 2. Alcance

Tres solicitudes de mejora, tal como están en `_planificacion/README.md` §14 (estado «Pendiente de definir» las tres):

| ID    | Página                  | Viewport                 | Solicitud                                                                                                                                                                                                 | Dónde vive |
|:------|:------------------------|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------|
| SM-01 | Inicio (`#titular`)     | Móvil                    | Reducir el tamaño del título y del párrafo del hero; ocultar en móvil el ícono SVG y la fila «Valdivia, Región de Los Ríos, Chile»; dejar solo «Descubrir más» con su flecha.                              | `src/pages/index.astro` |
| SM-02 | Todas (header)          | Móvil (menos de 1024 px) | Panel móvil: trampa de foco con Tab y Shift+Tab. Hoy el foco sale del panel hacia el contenido y solo Escape lo devuelve a la hamburguesa. Idéntico a la referencia: no es una regresión de la Épica 08. | `src/js/modules/navigation.js` |
| SM-03 | Todas (tema)            | Todos                    | Primera visita: `setInitialTheme()` guarda en `localStorage` la preferencia del sistema como si fuera una elección del usuario. Evaluar no guardar hasta que se alterne con el botón. No es una regresión. | `src/js/modules/theme.js` (`setInitialTheme()`) |

**SM-01 incluye una medición pendiente:** el tamaño renderizado del `h1` del hero no se midió (🕒 PENDIENTE para la
Épica 09 en `_planificacion/README.md` §14, «Detalle de SM-01»). Hoy el `h1` usa `text-headline-xl` hasta `lg`
(48/56 px según `DESIGN.md`); `DESIGN.md` define además `display-hero-mobile` (40/48 px) y `headline-xl-mobile` (32/40 px).

**Pendiente de definir (SM-01, según su detalle en `_planificacion/README.md` §14):**

* Tamaños de texto objetivo.
* Alineación de «Descubrir más».
* Comportamiento desde 768 px.
* Qué anchos exactos cuentan como «móvil».
* Qué pasa con los botones «Explorar Servicios» y «Suscripción Floral», que la solicitud no menciona.

**Restricciones ya registradas para SM-01** (recomendación del asesor, no decisión):

* El contraste del hero se calibró en la Épica 01 · Iteración 08 (tinte mínimo /45, percentil 95 de la tarjeta, 7
  viewports, 2 temas). Cualquier cambio de tamaño o de composición exige repetir esa medición.
* Los tamaños deben salir de la escala de `DESIGN.md`; si falta alguno, se entrega como propuesta de edición que aplica
  el desarrollador.
* Ocultar la ubicación quita texto visible con señal local: conviene que «Valdivia» quede visible en otro lugar.

**Ubicaciones:** las líneas citadas en el detalle de SM-01 (`index.html` L257 a L296) son las de los HTML anteriores a la
Épica 08; se regeneran sobre `src/pages/*.astro` y `src/components/` al planificar las iteraciones (nota de
`_planificacion/README.md` §12).

---

## 3. Heredado de la Épica 08

| Tema | Estado |
|:-----|:-------|
| Safari y dispositivo Apple | Sin probar. Se retoma en esta épica si el desarrollador consigue un dispositivo Apple (decisión del desarrollador, 19-10-2026). |
| Render real solo en Chrome *headless* | Reserva abierta de la Épica 08. Firefox y celular real fueron probados a mano por el desarrollador, sin diferencias. |

---

## 4. Fuera de alcance

* **Rendimiento y Lighthouse:** corresponden a la Épica 10 (DT-21 a DT-30, según el destino de cada fila en
  `_planificacion/README.md` §12), incluida DT-27 (Suscripción Floral en Lighthouse).
* Cambios de contenido comercial, rediseño fuera de las tres solicitudes, migración a Tailwind 4, frameworks de interfaz
  y renderizado en servidor, igual que en la Épica 08.

---

## 5. Plan de Iteraciones (propuesto, a confirmar por el desarrollador)

| It. | Entregable propuesto                                                    | Resultado verificable                                                                                  | Obligatoria |
|:----|:------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------|:-----------:|
| 01  | SM-01: hero móvil del Inicio                                            | Pendiente de definir (depende de los tamaños objetivo y de la medición del `h1`).                      | Pendiente de definir |
| 02  | SM-02: trampa de foco del panel móvil (`navigation.js`)                  | Pendiente de definir.                                                                                  | Pendiente de definir |
| 03  | SM-03: guardado del tema en la primera visita (`setInitialTheme()`) y cierre de la épica | Pendiente de definir.                                                                         | Pendiente de definir |

El orden y la agrupación (una iteración por solicitud, con el cierre en la última) son una propuesta: a confirmar por el
desarrollador.

---

## 6. Definition of Done (propuesto, a confirmar por el desarrollador)

* [ ] SM-01 hecha según lo que el desarrollador defina (tamaños, alineación y comportamiento desde 768 px: Pendiente de
  definir), con la medición del tamaño renderizado del `h1` y el contraste del hero repetido en los 7 viewports y los 2
  temas.
* [ ] SM-02 hecha: Tab y Shift+Tab se mantienen dentro del panel móvil abierto y Escape lo cierra devolviendo el foco a
  la hamburguesa. Criterio de aceptación exacto: Pendiente de definir.
* [ ] SM-03 resuelta o descartada por decisión del desarrollador, sin cambiar el comportamiento ya aprobado del script de
  arranque del tema (ADR-003).
* [ ] Sin regresiones de paridad en 320×640, 360×740, 412×915, 768×1024, 740×360, 1024×768 y 1280×800, en modo claro y
  oscuro, fuera de lo que cada solicitud cambia.
* [ ] Invariantes de `AGENTS.md` §5 intactos (en particular los del header, regla 7).
* [ ] Documentos afectados actualizados por el desarrollador (los protegidos, mediante propuesta).
* [ ] Safari y dispositivo Apple: probados si el desarrollador consigue el dispositivo; si no, la reserva se mantiene.

---

## 7. Riesgos

| Riesgo                                                                 | Mitigación propuesta (a confirmar)                                                                 |
|:-----------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------|
| Cambiar el tamaño del hero rompe el contraste calibrado en la Épica 01 | Repetir la medición de contraste (7 viewports, 2 temas) antes de cerrar SM-01.                     |
| La trampa de foco rompe el cierre con Escape o el foco inicial         | Probar con teclado real en el panel abierto y cerrado; módulo con cláusula de guarda (`AGENTS.md` §5). |
| Ocultar la ubicación del hero quita una señal local                    | Dejar «Valdivia» visible en otro lugar del Inicio; decisión del desarrollador.                      |
| Sin dispositivo Apple, Safari sigue sin probarse                       | Mantener la reserva abierta y registrarla en el cierre.                                            |
