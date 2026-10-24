/**
 * Diccionario de Datos de Servicios - La Jardinera Florería
 * Arquitectura MVC: Capa de Modelo (Model) para renderizado dinámico del catálogo y modal.
 *
 * CONTRATO DE DATOS (ver DESIGN.md §8.2):
 * El campo "description" debe contener HTML semántico SIN clases de Tailwind.
 * Su tipografía la gobierna el ámbito .modal-prose declarado en src/css/input.css.
 * Añadir clases aquí produce conflictos de especificidad con ese ámbito y un
 * espaciado irregular que además difiere entre modo claro y oscuro.
 *
 * Etiquetas permitidas: <p>, <h4>, <ul>, <li>, <strong>, <em>.
 * Las enumeraciones van en <ul>/<li>, nunca en párrafos separados por <br>
 * ni con el carácter "•" escrito dentro del texto: la viñeta la dibuja el CSS.
 */
export const servicesData = {
    'suscripcion': {
        title: 'Suscripción floral',
        mainImage: '/images/servicios/suscripcion.webp',
        description: `<p>Las flores tienen un poder silencioso, tienen un efecto de felicidad inmediato, transforman cualquier espacio y nuestro estado de ánimo.</p>
<p><strong><em>Tener flores en tu casa o tu lugar de trabajo.</em></strong></p>
<h4>¿Cómo funciona?</h4>
<ul>
    <li>Escoge el plan que te hará feliz</li>
    <li>Cada miércoles o miércoles por medio te llegará un ramo a la puerta de tu casa o trabajo.</li>
    <li>Cada semana, el ramo varía y es una selección de flores de estación.</li>
    <li>Ponle pausa cuando quieras (avisar con 48 horas de anticipación).</li>
</ul>`,
        gallery: [
            '/images/servicios/galeria/suscripcion-1.webp',
            '/images/servicios/galeria/suscripcion-2.webp',
            '/images/servicios/galeria/suscripcion-3.webp',
            '/images/servicios/galeria/suscripcion-4.webp'
        ]
    },
    'gift-cards': {
        title: 'Gift Cards',
        mainImage: '/images/servicios/gift-cards.webp',
        description: `<p><strong><em>Hay regalos que se disfrutan en un instante. Otros que se disfrutan mucho después de recibirlos.</em></strong></p>
<p>Nuestras Gift Cards nacen de una invitación a descubrir el universo de nuestro taller floral y a elegir el momento perfecto para vivirlo.</p>
<h4>¿Qué puedes regalar?</h4>
<p>Una Gift Card puede consistir en cualquiera de nuestras experiencias, un ramo de flores de autor, talleres creativos o suscripciones florales. Quien la recibe decide cuándo activarla y cómo disfrutarla, en el momento que más le inspire.</p>
<p>Las más apreciadas son nuestras suscripciones florales. Regalar uno, dos o varios meses de flores es regalar una experiencia que se renueva semana tras semana.</p>
<p>Los talleres también son una linda alternativa, son encuentros donde las flores se descubren desde otra mirada: una experiencia para aprender, crear con las manos y conectar con otras como tú.</p>
<h4>Para cada ocasión</h4>
<p>Una Gift Card es el regalo perfecto para un cumpleaños, una celebración, un agradecimiento o la Navidad.</p>`,
        gallery: [
            '/images/servicios/galeria/gift-cards-1.webp',
            '/images/servicios/galeria/gift-cards-2.webp'
        ]
    },
    'novias': {
        title: 'Novias y Novios',
        mainImage: '/images/servicios/novias.webp',
        description: `<h4>Ramos de Novia</h4>
<p>Cada novia es una mujer única, por eso, nuestro proceso comienza con una conversación, conocer a la mujer, descubrir su personalidad, su forma de entender la belleza y la atmósfera con la que sueña para ese día.</p>
<p><strong><em>No diseñamos un ramo para un matrimonio; creamos un ramo para una mujer.</em></strong></p>
<p>El ramo es una creación floral profundamente personal que no busca seguir tendencias, sino emocionar. Que acompaña con naturalidad a una mujer que, al llevarlo entre las manos, se siente como si siempre hubiera estado destinado a ella.</p>
<p><strong><em>Nuestros ramos no son el ramo perfecto, es el ramo que habla de ti.</em></strong></p>
<h4>Boutonnière</h4>
<p>Tradicionalmente llevado por el novio y quienes ocupan un lugar especial en la ceremonia, ésta pequeña creación floral complementa el diseño del ramo de la novia.</p>
<p>Cada boutonnière se confecciona de manera artesanal, buscando que refleje el estilo del novio.</p>`,
        gallery: [
            '/images/servicios/galeria/novias-1.webp',
            '/images/servicios/galeria/novias-2.webp',
            '/images/servicios/galeria/novias-3.webp',
            '/images/servicios/galeria/novias-4.webp'
        ]
    },
    'ramos-de-autor': {
        title: 'Ramos de Autor',
        mainImage: '/images/servicios/ramos-de-autor.webp',
        description: `<p>En nuestro taller, cada ramo comienza con una inspiración distinta y no a partir de modelos prehechos, cada composición es una única, diseñada para la persona que la recibirá.</p>
<h4>Nuestro proceso</h4>
<p>Combinamos flores frescas de temporada sobre una paleta de colores elegida por el cliente, así convertimos cada ramo en una pieza floral con identidad propia y equilibrio.</p>
<h4>Una pieza viva</h4>
<p>Las flores son vivas, continúan transformándose cada día. Los botones se abren lentamente, nuevas formas aparecen, los colores evolucionan y los ramos regalan cada día una nueva experiencia.</p>`,
        gallery: [
            '/images/servicios/galeria/ramos-de-autor-1.webp',
            '/images/servicios/galeria/ramos-de-autor-2.webp',
            '/images/servicios/galeria/ramos-de-autor-3.webp',
            '/images/servicios/galeria/ramos-de-autor-4.webp'
        ]
    },
    'matrimonios': {
        title: 'Flores para un Matrimonio',
        mainImage: '/images/servicios/matrimonios.webp',
        description: `<p>Nuestro trabajo comienza con mucho tiempo de anticipación, nos reunimos con cada pareja para conocer su historia, sus gustos, el estilo con el que sueñan. A partir de esa inspiración, diseñamos una propuesta floral sólo para ellos.</p>
<p>Creamos ambientes románticos, naturales, contemporáneos, minimalistas, silvestres, elegantes o llenos de color. Trabajamos cuidadosamente la paleta de colores, las formas, las texturas y los volúmenes para lograr una composición armónica, capaz de transformar el espacio en un escenario increíble.</p>
<h4>Qué ambientamos</h4>
<ul>
    <li>Salones, mesas, mesa de novios, aéreos y bufette.</li>
    <li>Iglesias: bancas, altar y púlpito.</li>
    <li>Arcos de ceremonia.</li>
    <li>Espejos de bienvenida, rincones de recordación y spot de fotos.</li>
</ul>`,
        gallery: [
            '/images/servicios/galeria/matrimonios-1.webp',
            '/images/servicios/galeria/matrimonios-2.webp',
            '/images/servicios/galeria/matrimonios-3.webp',
            '/images/servicios/galeria/matrimonios-4.webp'
        ]
    },
    'novios-rio': {
        title: 'Novios por el Río',
        mainImage: '/images/servicios/novios-rio.webp',
        description: `<p>Te invitamos a vivir una navegación pausada por las tranquilas aguas del Río Calle-Calle, en el corazón de Valdivia: un momento para disfrutar, contemplar el paisaje y atesorar.</p>
<h4>Cómo navegamos contigo</h4>
<ul>
    <li>Con ambos novios a bordo, rumbo a la ceremonia.</li>
    <li>Acompañando a la novia en su llegada o traslado hacia la celebración, donde familiares y amigos reciben a los recién casados.</li>
</ul>
<h4>Una experiencia para atesorar</h4>
<p>La calma del río, el entorno natural y el encanto de la navegación crean una atmósfera íntima y dulce, convirtiendo el viaje en parte de la celebración. Es un tiempo para respirar, emocionarse y compartir, mientras cada instante queda en fotografías.</p>`,
        gallery: [
            '/images/servicios/galeria/novios-rio-1.webp',
            '/images/servicios/galeria/novios-rio-2.webp',
            '/images/servicios/galeria/novios-rio-3.webp'
        ]
    },
    'eventos': {
        title: 'Eventos y Celebraciones',
        mainImage: '/images/servicios/eventos.webp',
        description: `<h4>Las flores tienen la capacidad de hacer los momentos inolvidables</h4>
<p>Las flores deben ser parte de la esencia de una celebración. Definen la atmósfera, aportan sensibilidad y transforman un espacio en un lugar inolvidable.</p>
<h4>Cómo trabajamos</h4>
<p>Para una cena íntima, cumpleaños, aniversario, comida familiar, un cóctel u otra celebración. Nuestros proyectos nacen de una conversación, porque cada encuentro tiene un carácter distinto y merece una propuesta floral pensada exclusivamente para ti.</p>
<p>Nos inspira el espacio, la luz, la estación del año, la mesa, la arquitectura y las personas que la compartirán, así creamos arreglos florales de autor.</p>
<h4>Nos ocupamos de todo</h4>
<p>Diseñamos y elaboramos cada composición en nuestro taller, realizamos el montaje y proporcionamos todos los soportes y elementos necesarios para un resultado fabuloso.</p>
<p><strong><em>Nuestro propósito es que tú solo tengas que vivir el momento.</em></strong></p>`,
        gallery: [
            '/images/servicios/galeria/eventos-1.webp',
            '/images/servicios/galeria/eventos-2.webp'
        ]
    },
    'condolencias': {
        title: 'Condolencias',
        mainImage: '/images/servicios/condolencias.webp',
        description: `<p><strong><em>Las flores tienen el delicado lenguaje de decir aquello que las palabras no alcanzan a expresar.</em></strong></p>
<p>En los momentos de despedida, cuando las emociones son profundas y las palabras pueden quedarse pequeñas, las flores se convierten en un gesto de amor, respeto y acompañamiento.</p>
<p>Diseñamos homenajes florales que honran la historia y acompañan a quienes quedan.</p>
<h4>Nuestros homenajes</h4>
<ul>
    <li>Coronas.</li>
    <li>Ramos.</li>
    <li>Centros florales.</li>
    <li>Cubre urnas.</li>
    <li>Composiciones especiales.</li>
</ul>
<p>Todos son elaborados en nuestro taller con flores frescas.</p>`,
        gallery: [
            '/images/servicios/galeria/condolencias-1.webp',
            '/images/servicios/galeria/condolencias-2.webp'
        ]
    }
};