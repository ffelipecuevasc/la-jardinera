# Iteración 01: Textos de la Clienta

**⚠️ DIRECTIVA DE INICIO (Chain of Thought):** Antes de tocar cualquier archivo, lee `AGENTS.md` (§2 y §5, reglas 2,
4, 5 y 10), `DESIGN.md` §8 (contrato de datos de la modal de servicio: etiquetas permitidas `<p>`, `<h4>`, `<ul>`,
`<li>`, `<strong>`, `<em>`, sin clases de Tailwind), la definición de la épica, `src/pages/index.astro`,
`src/js/data/services.js` y `src/pages/suscripcion-floral.astro`. Verifica con `git status` y `git log -1` que estás en
`feat/revision-movil`, sin cambios pendientes. **La fuente de la verdad de los textos es la §1.2 de este documento**
(transcripción literal del documento de la clienta, que no está en el repositorio). Esta iteración solo cambia texto y
su estructura semántica: no cambia clases, tokens, diseño ni JS.

**Autorización explícita de esta iteración:** puedes editar únicamente `src/pages/index.astro` (solo la sección
«Flores frescas a tu puerta»), `src/js/data/services.js`, `src/pages/suscripcion-floral.astro`, la bitácora de la
iteración y agregar una línea al final de `_planificacion/04-bitacora/estado-actual.md`. No edites el hero
(`#titular`), que es de la Iteración 02. No edites archivos protegidos (`AGENTS.md`, `README.md`, `DESIGN.md`,
`_planificacion/README.md`, `_planificacion/01-vision/**`, `_planificacion/02-arquitectura/**`): si algo ahí debe
cambiar, entrégalo como propuesta -/+ con líneas completas e idénticas al repositorio. Git es de solo lectura.

---

## 1. Objetivo de la Iteración

Aplicar los textos que pidió la clienta el 24-10-2026, corrigiendo solo las erratas ortográficas evidentes y
entregando la lista de correcciones para que el desarrollador la apruebe. La clienta no se consulta por erratas.

### 1.1 Decisiones del desarrollador (24-10-2026)

| ID | Decisión |
|:---|:---------|
| D-01 | **Erratas:** se corrigen solo las ortográficas evidentes (tildes, letras cambiadas, mayúsculas indebidas, palabras separadas). Puntuación de estilo, concordancia y redacción **no** se tocan: se listan como observación. Toda corrección queda en la bitácora con el texto original y el corregido, para aprobación del desarrollador. |
| D-02 | **Párrafos destacados** («párrafo destacado, quizás en negritas»): párrafo propio con `<p><strong><em>…</em></strong></p>`. Sin CSS ni tokens nuevos. Aplica a los textos marcados ★ en §1.2. |
| D-03 | **Modal «Novias y Novios»:** el subtema «Boutonnière» y sus 2 párrafos se mantienen sin cambios. |
| D-04 | **Modal «Condolencias»:** lista de 5 ítems (Coronas, Ramos, Centros florales, Cubre urnas, Composiciones especiales) y después un párrafo de cierre: «Todos son elaborados en nuestro taller con flores frescas.» |
| D-05 | **Suscripción Floral · «Condiciones del Servicio»:** orden del documento (Flores de temporada → Entrega → Pausa) y el párrafo de Pausa destacado según D-02. Cada bloque se mueve completo (ícono incluido). |
| D-06 | **Párrafo del hero:** el texto del documento es idéntico al actual; no se toca en esta iteración (el hero es de la It. 02). |
| D-07 | Las modales «Flores para un Matrimonio» y «Novios por el Río» no se tocan (el documento no las menciona). |

### 1.2 Transcripción literal del documento de la clienta

Texto copiado tal cual, **con sus erratas**. ★ = párrafo destacado (D-02). Lo que dice «se mantiene» queda igual al
repositorio.

**A. Inicio (`index.astro`), sección «Flores frescas a tu puerta»** — 4 párrafos (hoy son 3: el segundo se divide):

1. «Nuestras flores acompañan los pequeños momentos de cada día: el primer café de la mañana, una conversación alrededor de la mesa, la luz de la tarde entrando por una ventana o las horas de trabajo. Las flores transforman la manera en que vivimos.»
2. «Después ocurre algo maravilloso, los días pasan y el ramo va cambiando y la composición te mostrará una belleza distinta cada día.»
3. «Con el tiempo, casi todas nuestras suscriptoras terminan diciéndonos lo mismo: ya no pueden imaginar su día a día sin flores, les cambia la forma de mirar, les aporta calma, inspiración y una belleza serena que las acompaña. Es un pequeño lujo cotidiano que acaba convirtiéndose en una necesidad.»
4. «Quien empieza a vivir con flores, difícilmente quiere volver a vivir sin ellas.» (se mantiene con su `<strong>` actual; no está marcado como destacado nuevo).

**B. Modal «Suscripción floral» (`services.js`, clave `suscripcion`)** — sin título inicial:

* `<p>` «Las flores tienen un poder silencioso, tienen un efecto de felicidad Inmediato, transforman cualquier espacio y nuestro estado de ánimo.»
* ★ «Tener flores en tu casa o tu lugar de trabajo.» (justo después del párrafo anterior)
* `<h4>` «¿Cómo funciona?» (reemplaza «Así funciona:»)
* `<ul>`:
    * «Escoge el plan que te hará feliz»
    * «Cada miércoles o miércoles por medio te llagará un ramo a la puerta de tu casa o trabajo.»
    * «Cada semana, el ramo varía y es una selección de flores de estación.»
    * «Ponle pausa cuando quieras (avisar con 48 horas de anticipación).»

**C. Modal «Ramos de Autor» (clave `ramos-de-autor`):**

* `<p>` «En nuestro taller, cada ramo comienza con una inspiración distinta y no a partir de modelos pre hechos, cada composición es una única, diseñada para la persona que la recibirá.»
* `<h4>` «Nuestro proceso» (se mantiene)
* `<p>` «Combinamos flores frescas de temporada sobre una paleta de colores elegida por el cliente, así convertimos cada ramo en una pieza floral con identidad propia y equilibrio.»
* `<h4>` «Una pieza viva» (se mantiene)
* `<p>` «Las Flores son vivas, continúan transformándose cada día. Los botones se abren lentamente, nuevas formas aparecen, los colores evolucionan y los ramos regalan cada día una nueva experiencia.»

**D. Modal «Novias y Novios» (clave `novias`):**

* `<h4>` «Ramos de Novia» (se mantiene)
* `<p>` «Cada novia es una mujer única, por eso, nuestro proceso comienza con una conversación, conocer a la mujer, descubrir su personalidad, su forma de entender la belleza y la atmósfera con la que sueña para ese día.»
* ★ «No diseñamos un ramo para un matrimonio; creamos un ramo para una mujer.»
* `<p>` «El Ramo es una creación floral profundamente personal que no busca seguir tendencias, sino emocionar. Que acompaña con naturalidad a una mujer que, al llevarlo entre las manos, se siente como si siempre hubiera estado destinado a ella.»
* ★ «Nuestros ramos no son el ramo perfecto, es el ramo que habla de ti.»
* «Boutonnière» y sus 2 párrafos: sin cambios (D-03).

**E. Modal «Eventos y Celebraciones» (clave `eventos`):**

* `<h4>` «Las flores tienen la capacidad de hacer los momentos inolvidables» (subtema nuevo, al inicio)
* `<p>` «Las flores deben ser parte de la esencia de una celebración. Definen la atmósfera, aportan sensibilidad y transforman un espacio en un lugar inolvidable.»
* `<h4>` «Cómo trabajamos» (se mantiene)
* `<p>` «Para una cena íntima, cumpleaños, aniversario, comida familiar, un cóctel u otra celebración. Nuestros proyectos nacen de una conversación, porque cada encuentro tiene un carácter distinto y merece una propuesta floral pensada exclusivamente para ti.»
* `<p>` «Nos inspira el espacio, la luz, la estación del año, la mesa, la arquitectura y las personas que la compartirán, así creamos arreglos florales de autor.»
* `<h4>` «Nos ocupamos de todo» (se mantiene)
* `<p>` «Diseñamos y elaboramos cada composición en nuestro taller, realizamos el montaje y proporcionamos todos los soportes y elementos necesarios para un resultado fabuloso.»
* ★ «Nuestro propósito es que tú solo tengas que vivir el momento.»

**F. Modal «Condolencias» (clave `condolencias`):**

* ★ «Las flores tienen el delicado lenguaje de decir aquello que las palabras no alcanzan a expresar.»
* `<p>` «En los momentos de despedida, cuando las emociones son profundas y las palabras pueden quedarse pequeñas, las flores se convierten en un gesto de amor, respeto y acompañamiento.»
* `<p>` «Diseñamos homenajes florales que honran la historia y acompañan a quienes quedan.»
* `<h4>` «Nuestros homenajes» (se mantiene)
* `<ul>` de 5 ítems y párrafo de cierre, según D-04 (cada ítem termina en punto, como hoy).

**G. Modal «Gift Cards» (clave `gift-cards`):**

* ★ «Hay regalos que se disfrutan en un instante. Otros que se disfrutan mucho después de recibirlos.»
* `<p>` «Nuestras Gift Cards nacen de una invitación a descubrir el universo de nuestro taller floral y a elegir el momento perfecto para vivirlo.»
* `<h4>` «¿Qué puedes regalar?» (reemplaza «Qué puedes regalar»)
* Se elimina la lista actual y se reemplaza por 3 párrafos:
    * «Una Gift Card puede consistir en cualquiera de nuestras experiencias, un ramo de flores de autor, talleres creativos o suscripciones florales. Quien la recibe decide cuándo activarla y cómo disfrutarla, en el momento que más le inspire.»
    * «Las más apreciadas son nuestras suscripciones florales. Regalar uno, dos o varios meses de flores es regalar una experiencia que se renueva semana tras semana.»
    * «Los talleres también son una linda alternativa, son encuentros donde las flores se descubren desde otra mirada: una experiencia para aprender, crear con las manos y conectar con otras como tú.»
* `<h4>` «Para cada ocasión» (se mantiene)
* `<p>` «Una Gift Card es el regalo perfecto para un cumpleaños, una celebración, un agradecimiento o la Navidad.»

**H. Suscripción Floral (`suscripcion-floral.astro`):**

* `<h1>` «Suscripciones Florales» (se mantiene).
* En el mismo contenedor del `<h1>`, el párrafo actual se divide en dos:
    * ★ «Hay personas que reciben flores de vez en cuando. Y hay quienes eligen vivir con ellas.»
    * «Nuestras suscripciones florales son para quienes han descubierto que la belleza no debería reservarse para las grandes ocasiones. Que una mesa, una cocina, un estudio o un espacio de trabajo cambian por completo cuando las flores pasan a formar parte de la vida cotidiana.»
* «Condiciones del Servicio», en este orden (D-05):
    * «Flores de temporada:» «Cada ramo es una creación floral de autor, irrepetible, donde las variedades y los colores evolucionan con las estaciones.»
    * «Entrega:» «Cada miércoles, o cada quince días, te enviaremos un nuevo ramo de flores frescas de temporada. (Se consideran 4 miércoles por mes)»
    * «Pausa:» ★ «Puedes pausar o cancelar tu suscripción cuando lo necesites, con un aviso de al menos 48 horas antes de tu próxima entrega programada.»

### 1.3 Erratas candidatas detectadas por el asesor (no es una lista cerrada)

Claude Code confirma cada una, puede agregar otras que cumplan D-01 y las registra todas en la bitácora:

| Texto | Original | Corrección propuesta | Tipo |
|:------|:---------|:---------------------|:-----|
| B | «te llagará» | «te llegará» | Letra cambiada |
| B | «felicidad Inmediato» | «felicidad inmediato» | Mayúscula indebida. «inmediato» concuerda con «efecto» y es correcto; hoy el sitio dice «inmediata»: reportar la diferencia, no elegir |
| C | «pre hechos» | «prehechos» | Palabra separada (RAE: prefijo unido) |
| C | «es una única» | «es única» | Palabra sobrante |
| C | «Las Flores son vivas» | «Las flores son vivas» | Mayúscula indebida |
| D | «El Ramo es» | «El ramo es» | Mayúscula indebida (hoy el sitio ya dice «El Ramo»: reportar) |
| B | «Escoge el plan que te hará feliz» (sin punto) | con punto final | **Observación**, no se corrige (puntuación de estilo) salvo aprobación |
| D | «no son el ramo perfecto, es el ramo» | — | **Observación** de concordancia, no se corrige |
| B | «Tener flores en tu casa o tu lugar de trabajo.» | — | **Observación**: frase sin verbo principal; se copia tal cual |

---

## 2. Tareas Técnicas (Ejecución Estricta)

### Tarea 0: Línea base (solo lectura)

1. `git status`, `git log -1 --oneline`, rama actual (`feat/revision-movil`, sin cambios).
2. `pnpm install --frozen-lockfile` y `pnpm run build:cf`. Anota páginas y archivos de `_site/` (referencia: 6
   páginas, 109 archivos).
3. Guarda fuera del repositorio una copia del HTML compilado de las 6 páginas para comparar en la Tarea 4.
4. Con Chrome *headless* y perfil aislado, captura (fuera del repositorio) la sección «Flores frescas a tu puerta», la
   cabecera y las condiciones de Suscripción Floral y las 6 modales afectadas, en 360×740 y 1280×800, en claro y oscuro.

### Tarea 1: Inicio (`index.astro`)

Aplica §1.2 A: divide el segundo párrafo en dos `<p>` con **las mismas clases** que los párrafos vecinos. No toques
ninguna otra sección, ni el hero.

### Tarea 2: Modales (`services.js`)

1. Aplica §1.2 B a G respetando el contrato de datos de la cabecera del archivo y de `DESIGN.md` §8: solo etiquetas
   permitidas, sin clases, enumeraciones en `<ul>`/`<li>`.
2. No cambies `title`, `mainImage`, `gallery` ni el orden de las claves. No toques `matrimonios` ni `novios-rio`.

### Tarea 3: Suscripción Floral (`suscripcion-floral.astro`)

1. Divide el párrafo de la cabecera en dos `<p>` con las mismas clases del actual; el primero destacado según D-02.
2. Reordena los bloques de «Condiciones del Servicio» según D-05, moviendo cada bloque completo con su comentario
   (actualiza el número del comentario «Condición N» para que siga el orden nuevo). El texto de Pausa va destacado.

### Tarea 4: Compilación y verificación

1. `pnpm run build:cf` sin errores ni advertencias nuevas; mismo número de páginas y archivos.
2. Diff del HTML compilado contra la Tarea 0.3: solo cambian Inicio (sección «Flores frescas») y Suscripción Floral;
   las otras 4 páginas, idénticas. `services.js` cambia solo en el *bundle* de JS.
3. Render real (perfil aislado): las 6 modales afectadas, la sección del Inicio y la página de Suscripción, en 360×740
   y 1280×800, en claro y oscuro. Sin desbordes, viñetas dibujadas por el CSS, espaciado regular de `.modal-prose`.
4. Contraste de los párrafos destacados en ambos temas: mismo color que el texto vecino, por lo que no debe cambiar;
   confírmalo con una medición.
5. Texto renderizado idéntico a §1.2 más las correcciones de la lista aprobable (extrae el texto de cada modal y
   compáralo con un script).

### Tarea 5: Registro

1. Bitácora `_planificacion/04-bitacora/bitacora-epica-09/bitacora-iteracion-01.md` (crea la carpeta), con la
   plantilla de `_planificacion/README.md` §8.2: decisiones D-01 a D-07 con fecha, línea base, cambios por archivo,
   verificación con etiquetas [código], [medido], [render] o [informado], **tabla de erratas corregidas y
   observaciones (original → corregido) para aprobación del desarrollador**, desviaciones y hallazgos.
2. Una línea al final de `estado-actual.md` con el formato de `_planificacion/README.md` §8.1. El archivo es
   *append-only*: UTF-8 con BOM, CRLF, sin salto final. Verifica los bytes antes y después con Python.
3. Archivos nuevos o editados: CRLF, sin BOM (salvo `estado-actual.md`). Verifica en el *working tree*.
4. Mensaje de commit sugerido: `Épica 09 - Iteración 01: Textos de la clienta en Inicio, Servicios y Suscripción Floral`.

---

## 3. Auditoría de No-Regresión e Invariantes

* Hero del Inicio (`#titular`) sin cambios (diff vacío en esas líneas).
* Ninguna clase de Tailwind agregada ni quitada; ningún token nuevo; cero JS o CSS en línea (reglas 2, 4 y 5).
* Header intacto (regla 7): ningún descendiente de `<header>` con `fixed`; `#mobile-menu-scrim` inmediatamente después
  de `</header>`.
* Las modales siguen abriéndose y cerrándose igual (el desplazamiento inicial es de la It. 03: no lo corrijas aquí,
  pero anota si lo observas).
* Las otras 4 páginas, idénticas en el HTML compilado.

---

## 4. Criterios de Aceptación (Definition of Done)

* **Escenario 1: Textos aplicados**
    * **Dado** el sitio compilado,
    * **Cuando** se extrae el texto del Inicio («Flores frescas»), de las 6 modales y de Suscripción Floral,
    * **Entonces** coincide con §1.2, salvo las correcciones listadas en la bitácora.
* **Escenario 2: Destacados**
    * **Dado** los textos marcados ★,
    * **Cuando** se renderizan en claro y oscuro,
    * **Entonces** son un párrafo propio en `<strong><em>`, sin clases ni CSS nuevos.
* **Escenario 3: Orden y contenido conservado**
    * **Dado** Suscripción Floral y las modales Novias y Condolencias,
    * **Entonces** las condiciones van en el orden Temporada → Entrega → Pausa, «Boutonnière» sigue en su lugar y
      Condolencias muestra 5 ítems y la frase de cierre.
* **Escenario 4: Sin regresiones**
    * **Dado** las otras 4 páginas, el hero y el header,
    * **Entonces** el HTML compilado y el render no cambian.
* **Escenario 5: Registro**
    * **Dado** el cierre de la iteración,
    * **Entonces** existen la bitácora con la tabla de erratas para aprobación y la línea de `estado-actual.md`, sin
      commits hechos por Claude Code.