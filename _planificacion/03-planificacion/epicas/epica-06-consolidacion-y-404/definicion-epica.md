# Épica 06: Consolidación Global de Navegación, Paridad Móvil, Página 404 y Optimización del Header Móvil

> **📌 Nota de reapertura:** al completarse la Iteración 06, esta épica quedó registrada como cerrada en
> `04-bitacora/estado-actual.md`. Se **reabre formalmente** para ejecutar la **Fase 2 (Iteraciones 07 a 12)**, originada
> por una prueba en teléfono real. Las Iteraciones 01 a 06 (Fase 1) están **completadas y congeladas**: no deben
> modificarse, rehacerse ni re-auditarse.

## 1. Objetivo de la Épica (Visión Senior)

### Fase 1 — Iteraciones 01 a 06 (completada)

Cerrar el ciclo de desarrollo del sitio web de La Jardinera resolviendo de forma transversal la deuda técnica de
navegación móvil (drawer `#mobile-menu`) e interconexión de rutas relativas (`routing`). Adicionalmente, se construirá
desde cero la página de error `404.html` respetando los tokens de diseño, tipografías y soporte de *Dark Mode*, logrando
una experiencia de usuario (UX) 100% cohesionada en los 6 documentos HTML del proyecto.

### Fase 2 — Iteraciones 07 a 12 (pendiente)

La Fase 1 certificó la paridad móvil comprobando que el drawer *existiera* en el marcado de los 6 documentos. Una prueba
posterior en un teléfono real (≈ 360–410 px de ancho) demostró que existir no es lo mismo que funcionar:

1. **Header sobrecargado.** Logotipo PNG + nombre en texto + Instagram + WhatsApp + conmutador de tema + botón
   hamburguesa compiten por el mismo ancho. Estimado a partir de las clases del código, la barra necesita ≈ 470 px: el
   nombre "La Jardinera" se parte en dos líneas y se monta sobre los botones.
2. **Menú hamburguesa inutilizable.** El drawer está declarado como capa de pantalla completa (`fixed inset-0`), pero
   vive *dentro* del `<header>`, que tiene el efecto de vidrio esmerilado (`backdrop-blur-xl`, es decir, CSS
   `backdrop-filter`). Un elemento con ese efecto pasa a ser el bloque contenedor de sus descendientes `fixed`, de modo
   que "pantalla completa" se mide contra la barra de 80 px y no contra la pantalla. Los 5 enlaces se desbordan hacia
   arriba y hacia abajo de la barra: "Inicio" queda fuera del viewport, "Servicios" cae sobre el fondo claro del header y
   el resto cae sobre el Hero oscuro con texto oscuro (ilegible).

El objetivo de la Fase 2 es dejar el `<header>` optimizado para móviles en los 6 documentos aplicando la **Opción 1-A
(Cabecera esencial en móvil)** y la **Opción 2-B (Panel desplegable anclado bajo la cabecera)**, sin alterar la
experiencia de escritorio (`>= lg`) y elevando el estándar de verificación: la conformidad móvil se certifica sobre el
**render real en un viewport móvil**, no solo sobre el marcado.

## 2. Hallazgos de la Auditoría que Originan la Fase 2

| #  | Hallazgo                                                                                                                                                        | Impacto                                                                 | Se resuelve en                |
|:---|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------|:------------------------------|
| H1 | Barra móvil sobrecargada (≈ 470 px requeridos frente a 360–410 px disponibles); el nombre de la marca se repite 3 veces (PNG, texto y `<h1>` del Hero)           | Nombre partido en dos líneas y solapado con los botones                 | It. 07–12 (Opción 1-A)        |
| H2 | Drawer `fixed inset-0` anidado en un `<header>` con `backdrop-filter` (5 de 6 archivos)                                                                          | Menú colapsado a 80 px de alto; enlaces ilegibles o fuera de pantalla   | It. 07–12 (Opción 2-B)        |
| H3 | `404.html` usa un patrón de drawer distinto (`absolute top-full` + `lg:hidden`), contradiciendo la matriz de "clases idénticas" de la Iteración 06               | Inconsistencia estructural entre páginas                                | It. 12                        |
| H4 | En 5 archivos el drawer no se oculta solo al ensanchar el viewport (falta `lg:hidden`)                                                                           | En una tablet rotada el panel podría quedar abierto sin botón de cierre | It. 07–12                     |
| H5 | `navigation.js` solo abre y cierra: no cierra con `Escape` ni al pasar a escritorio; el botón conserva `aria-label="Abrir Menú"` abierto y no cambia de ícono    | Accesibilidad por teclado y por lector de pantalla incompleta           | It. 07                        |
| H6 | Botones táctiles de 32–36 px, por debajo de los 44 px recomendados                                                                                               | Toques imprecisos en móvil                                              | It. 07–12                     |
| H7 | La certificación de la Iteración 06 verificó presencia en el DOM, no el render                                                                                   | El defecto llegó a producción sin ser detectado                         | Regla transversal 6           |

## 3. Decisiones de Diseño Adoptadas (Fase 2)

| Decisión                        | Especificación                                                                                                                                                                                         | Justificación                                                                                                                                  |
|:--------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------|
| **Problema 1 — Header**         | **Opción 1-A.** En `< lg` la barra muestra solo la marca (PNG + nombre), el conmutador de tema y el botón de menú. Instagram y WhatsApp salen de la barra y pasan al panel. En `>= lg` no cambia nada  | Patrón estándar; cabe incluso en 320 px y libera espacio para botones táctiles de 44 px                                                        |
| **Problema 2 — Menú**           | **Opción 2-B.** Panel de ancho completo que cuelga directamente bajo la barra (`absolute top-full`), con altura según su contenido y scroll interno si no cabe                                          | Anclado al header por construcción: no se descoloca ni tapa los botones de la barra. Es el patrón que ya usaba la 404                          |
| Marca en móvil                  | PNG + nombre en **una sola línea** (`whitespace-nowrap`): 18 px (`headline-sm`) bajo `sm` y 24 px (`headline-md`) desde `sm`; separador vertical oculto bajo `sm`                                      | Conserva la identidad sin partir el nombre; ambos elementos caben incluso en 320 px                                                            |
| Conmutador de tema              | Permanece en la barra móvil, con 44 × 44 px                                                                                                                                                            | Preferencia de uso frecuente a un toque; con 3 elementos la barra respira                                                                      |
| Redes en el panel               | Fila inferior con dos botones de 48 px de alto: **WhatsApp primero** (énfasis reactivo `bg-primary/10 text-primary`) e Instagram (`bg-surface-container`)                                              | WhatsApp encabeza la página de Contacto y es el canal directo de consulta. No se usa `primary-brand`: DESIGN.md §2.4 lo reserva al CTA del Hero |
| Fondo del panel                 | Sólido: `bg-surface dark:bg-dark-surface-container-low`, sin transparencia ni blur                                                                                                                     | Un `backdrop-filter` anidado no desenfoca el contenido de la página, y la opacidad garantiza contraste sobre el Hero oscuro                    |
| Capa tenue (scrim)              | `#mobile-menu-scrim`, **hermana** de `<header>`, desde `top-20`; al tocarla cierra el menú                                                                                                             | Enfoca la atención y permite "tocar fuera para cerrar". Dentro del header repetiría el defecto raíz                                            |
| Interacción                     | Cierre por botón, enlace, capa tenue, `Escape` (devuelve el foco al botón) y cruce a `>= lg`. Ícono ☰ ↔ ✕ y `aria-label` "Abrir menú" / "Cerrar menú"                                                  | Accesibilidad por teclado y semántica ARIA completas                                                                                           |
| Animaciones                     | Ninguna en esta fase                                                                                                                                                                                   | Reduce el riesgo y respeta `prefers-reduced-motion` por defecto                                                                                |

## 4. Alcance Estricto

**Fase 1 (heredado):**

* **Archivos afectados:** `index.html`, `servicios.html`, `suscripcion-floral.html`, `galeria.html`, `contacto.html` y
  la creación de `404.html`.
* **Límite de la Épica:** No se alterará la lógica interna de los módulos JS (`modal.js`, `gallery.js`,
  `subscription.js`, `carousel.js`), limitando los cambios a la estructura del `<header>` (menú móvil) y la correcta
  parametrización de los atributos `href` y `aria-current="page"`.

**Fase 2:**

* **Archivos afectados:** `index.html`, `servicios.html`, `suscripcion-floral.html`, `galeria.html`, `contacto.html`,
  `404.html` y `src/js/modules/navigation.js`.
* **Zonas permitidas en cada HTML:** únicamente el bloque `<header>` y la capa tenue `#mobile-menu-scrim`, que se
  inserta inmediatamente después de `</header>`. `<head>`, `<main>` y `<footer>` permanecen intactos.
* **Límite de la Fase 2:** No se alterará `modal.js`, `gallery.js`, `subscription.js`, `carousel.js`, `theme.js`,
  `main.js`, `tailwind.config.js`, `src/css/input.css` ni `DESIGN.md`. La única excepción autorizada es
  `navigation.js`, que se actualiza **una sola vez** (Iteración 07) y debe ser retrocompatible.
* **Compilación:** las clases nuevas, incluidas las de valor arbitrario, las detecta el `content` de Tailwind
  (`./*.html`, `./src/**/*.{html,js}`). Cada iteración debe cerrar con `pnpm build` sin advertencias.
* **Escritorio intocable:** a partir de `lg` (1024 px) el header debe permanecer visual y funcionalmente idéntico.

## 5. Plan de Iteraciones

| Iteración | Archivo(s)                         | Entregable principal                                                                | Estado                    |
|:----------|:-----------------------------------|:------------------------------------------------------------------------------------|:--------------------------|
| 01        | `404.html`                         | Creación y maquetación integral de la página 404                                    | ✅ Completada (congelada)  |
| 02        | `index.html`                       | Paridad móvil y normalización de enlaces                                            | ✅ Completada (congelada)  |
| 03        | `servicios.html`                   | Paridad móvil y normalización de enlaces                                            | ✅ Completada (congelada)  |
| 04        | `suscripcion-floral.html`          | Paridad móvil y normalización de enlaces                                            | ✅ Completada (congelada)  |
| 05        | `galeria.html`                     | Paridad de menú móvil y normalización de enlaces                                    | ✅ Completada (congelada)  |
| 06        | `contacto.html`                    | Paridad móvil y cierre de enrutamiento global                                       | ✅ Completada (congelada)  |
| **07**    | `index.html` + `navigation.js`     | **Header maestro (1-A + 2-B)** y módulo de navegación retrocompatible               | ⏳ Pendiente               |
| **08**    | `servicios.html`                   | Réplica del header maestro                                                          | ⏳ Pendiente               |
| **09**    | `suscripcion-floral.html`          | Réplica del header maestro                                                          | ⏳ Pendiente               |
| **10**    | `galeria.html`                     | Réplica del header maestro                                                          | ⏳ Pendiente               |
| **11**    | `contacto.html`                    | Réplica del header maestro                                                          | ⏳ Pendiente               |
| **12**    | `404.html`                         | Alineación del patrón divergente, matriz de paridad global y cierre de la Fase 2    | ⏳ Pendiente               |

* **Orden obligatorio:** la Iteración 07 debe completarse antes que las Iteraciones 08 a 12, porque `index.html` es la
  fuente de la verdad y `navigation.js` se actualiza una sola vez allí.
* **Registro:** al completar cada iteración se añade su línea a `04-bitacora/estado-actual.md` con el formato habitual
  ("Épica 06 - Iteración NN: ...").
* **Estado transitorio esperado:** entre las Iteraciones 07 y 12 conviven páginas con el header nuevo y páginas con el
  drawer anterior. Es intencional; `navigation.js` es retrocompatible para que ninguna se rompa.

## 6. Reglas Transversales de la Fase 2 (Invariantes)

1. **Cero descendientes `fixed` dentro del `<header>`.** Es la causa raíz del defecto. Solo el propio `<header>` puede
   ser `fixed`; todo lo que deba cubrir la pantalla (la capa tenue) vive fuera de él.
2. **Acoplamiento de alturas.** La barra mide `h-20` (5 rem). El panel (`top-full`, `max-h-[calc(100dvh-5rem)]`) y la
   capa tenue (`top-20`) dependen de ese valor: si cambia, deben cambiar juntos.
3. **Tokens autorizados.** Solo tokens de `tailwind.config.js` y `DESIGN.md`. En el panel se usan únicamente tokens
   reactivos (más `dark:bg-dark-surface-container-low`, ya autorizado en el patrón anterior). Prohibido `primary-brand`
   y prohibido mezclar un fondo reactivo con un primer plano congelado (DESIGN.md §2.1).
4. **Ingeniería JS.** Cero JS/CSS en línea, módulos ES6, selectores en caché, delegación de eventos, sin contaminar
   `window` y módulos desacoplados (`stack-tecnologico.md` §3).
5. **Mobile-first.** La base es el comportamiento móvil; el prefijo `lg:` restituye el escritorio.
6. **Verificación en render real.** La conformidad se demuestra con el viewport emulado (o navegador headless), no solo
   leyendo el marcado. Viewports mínimos: 320×640, 360×740, 412×915, 768×1024, 740×360 (horizontal), 1024×768 y
   1280×800, en modo claro y en modo oscuro.
7. **Una iteración, un archivo.** Cada iteración interviene únicamente su archivo. `index.html` (Iteración 07) es la
   fuente de la verdad y sus 5 réplicas difieren de él solo en el estado activo.
8. **Retrocompatibilidad durante la migración.** `navigation.js` debe seguir funcionando con las páginas que aún
   conserven el drawer anterior.

## 7. Riesgos y Mitigaciones

| Riesgo                                                                                       | Mitigación                                                                                                                  |
|:---------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------|
| Estado mixto durante la migración (páginas con drawer anterior + `navigation.js` nuevo)      | Módulo retrocompatible con elementos opcionales; la Iteración 07 lo prueba también contra `servicios.html` sin migrar       |
| Deriva del header entre 6 archivos duplicados (el sitio no usa includes ni framework)        | `index.html` como fuente de la verdad y matriz de paridad por bloques en la Iteración 12                                    |
| Desincronización de alturas (`h-20` frente a `top-full`, `top-20` y `max-h`)                 | Regla transversal 2 y verificación explícita en cada iteración                                                              |
| Clases de valor arbitrario no compiladas por Tailwind                                        | `pnpm build` y verificación de `output.css` en las Iteraciones 07 y 12                                                      |
| Contraste insuficiente en modo oscuro                                                        | Solo tokens reactivos en el panel y verificación en ambos temas en cada iteración                                           |

## 8. Definition of Done (DoD - Lista de Verificación Obligatoria)

Para que el agente dé por superada esta Épica, debe auditar y confirmar positivamente lo siguiente:

### Fase 1 (heredado — verificado en las Iteraciones 01 a 06)

* [ ] **Paridad Móvil Absoluta:** El contenedor `#mobile-menu` está presente, estilizado y operativo en los 6 archivos
  HTML, respondiendo de forma idéntica al botón `#mobile-menu-btn` en pantallas pequeñas (`< lg`).
* [ ] **Wayfinding y Estados Activos:** Cada uno de los 6 documentos HTML resalta de forma exclusiva su propia sección
  en el Navbar (Desktop y Móvil) mediante la clase `text-primary font-semibold` y el atributo de accesibilidad
  `aria-current="page"`.
* [ ] **Rutas Bidireccionales Limpias (Zero Dead Links):** Se erradicaron todos los enlaces ficticios `href="#"` de la
  navegación principal. Todos los enlaces del Header y Footer apuntan con precisión a sus rutas relativas locales
  (`./index.html`, `./servicios.html`, `./suscripcion-floral.html`, `./galeria.html`, `./contacto.html`).
* [ ] **Página 404 Premium:** El archivo `404.html` está creado con su `<head>` optimizado, mismo Header y Footer, y una
  sección central elegante que informa el error y provee un botón CTA de regreso al Inicio (`./index.html`).
* [ ] **Compatibilidad Dark Mode en 404:** La nueva página `404.html` reacciona fluidamente a la *View Transitions API*
  (`theme.js`) sin parpadeos ni fondos transparentes.

### Fase 2 (Iteraciones 07 a 12)

* [ ] **Header Esencial en Móvil (Opción 1-A):** En los 6 archivos, entre 320 y 1023 px, la barra muestra solo el
  logotipo PNG, "La Jardinera" en una sola línea, el conmutador de tema y el botón de menú, sin solapamientos ni scroll
  horizontal. Los botones de tema y menú miden al menos 44 × 44 px.
* [ ] **Redes Sociales Reubicadas:** Instagram y WhatsApp están ocultos en la barra por debajo de `lg`, visibles en la
  barra desde `lg`, y accesibles como botones dentro del panel móvil (WhatsApp primero) con sus `href` originales.
* [ ] **Panel Anclado Legible (Opción 2-B):** En los 6 archivos, `#mobile-menu` se despliega inmediatamente bajo la
  barra, a ancho completo y con fondo sólido, con los 5 enlaces y los botones sociales legibles (contraste WCAG AA) en
  modo claro y oscuro, incluso sobre el Hero oscuro. Ningún descendiente del `<header>` usa la clase `fixed`.
* [ ] **Interacción y Accesibilidad:** El menú se cierra con el botón, un enlace, la capa tenue, `Escape` (devolviendo el
  foco al botón) y al alcanzar `lg`. `aria-expanded`, el ícono (☰ ↔ ✕) y el `aria-label` ("Abrir menú" / "Cerrar
  menú") se mantienen sincronizados. El foco de teclado es visible en enlaces y botones del panel.
* [ ] **Escritorio Sin Regresión:** A partir de `lg` el header es idéntico al de la Fase 1 (navegación extendida, redes y
  tema visibles, hamburguesa oculta, panel y capa tenue nunca visibles).
* [ ] **Paridad Estructural de las 6 Páginas:** Marca, clúster de acciones, botón de menú, panel y capa tenue son
  idénticos en los 6 archivos; solo difiere el estado activo (y en `404.html`, que es neutro, ninguno).
* [ ] **Compilación Limpia:** `pnpm build` finaliza sin advertencias, `dist/css/output.css` contiene las clases nuevas y
  la consola del navegador no registra errores en ninguna de las 6 páginas.
* [ ] **Verificación en Render Real:** Cada iteración adjunta evidencia visual del render en los viewports de la Regla
  transversal 6, en ambos temas.