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
        mainImage: './public/images/servicios/suscripcion.webp',
        description: `<p>Las Flores en tu casa o tu lugar de trabajo tienen un poder silencioso, tienen un efecto de felicidad inmediata, transforman cualquier espacio y nuestro estado de ánimo.</p>
<h4>Así funciona:</h4>
<ul>
    <li>Escoge el plan que te hará feliz.</li>
    <li>Cada miércoles o miércoles por medio te llegará un ramo a la puerta de tu casa o trabajo.</li>
    <li>Cada semana, el ramo varía y es una selección de Flores de estación.</li>
    <li>Si no estarás, ponle pausa, avísanos con 48 horas de anticipación.</li>
</ul>`,
        gallery: [
            './public/images/servicios/galeria/suscripcion-1.webp',
            './public/images/servicios/galeria/suscripcion-2.webp',
            './public/images/servicios/galeria/suscripcion-3.webp',
            './public/images/servicios/galeria/suscripcion-4.webp'
        ]
    },
    'gift-cards': {
        title: 'Gift Cards',
        mainImage: './public/images/servicios/gift-cards.webp',
        description: `<p>Nuestras Gift Cards nacen de una invitación a descubrir el universo de nuestro taller floral y a elegir el momento perfecto para vivirlo. Quien la recibe decide cuándo activarla y cómo disfrutarla.</p>
<h4>Qué puedes regalar</h4>
<ul>
    <li>Ramos de flores de autor, diseñados especialmente para quien los recibe.</li>
    <li>Talleres creativos, una experiencia para aprender y crear con las manos.</li>
    <li>Suscripciones florales, la opción más apreciada: una experiencia que se renueva semana tras semana.</li>
</ul>
<h4>Para cada ocasión</h4>
<p>Una Gift Card es el regalo perfecto para un cumpleaños, una celebración, un agradecimiento o la Navidad.</p>`,
        gallery: [
            './public/images/servicios/galeria/gift-cards-1.webp',
            './public/images/servicios/galeria/gift-cards-2.webp'
        ]
    },
    'novias': {
        title: 'Novias y Novios',
        mainImage: './public/images/servicios/novias.webp',
        description: `<h4>Ramos de Novia</h4>
<p>Cada novia es una mujer única, por eso, nuestro proceso comienza con una conversación, conocer a la mujer, descubrir su personalidad, su forma de entender la belleza y la atmósfera con la que sueña para ese día.</p>
<p>El Ramo es una creación floral profundamente personal que no busca seguir tendencias, sino emocionar. Que acompaña con naturalidad a una mujer que, al llevarlo entre las manos, se siente como si siempre hubiera estado destinado a ella.</p>
<h4>Boutonnière</h4>
<p>Tradicionalmente llevado por el novio y quienes ocupan un lugar especial en la ceremonia, ésta pequeña creación floral complementa el diseño del ramo de la novia.</p>
<p>Cada boutonnière se confecciona de manera artesanal, buscando que refleje el estilo del novio.</p>`,
        gallery: [
            './public/images/servicios/galeria/novias-1.webp',
            './public/images/servicios/galeria/novias-2.webp',
            './public/images/servicios/galeria/novias-3.webp',
            './public/images/servicios/galeria/novias-4.webp'
        ]
    },
    'ramos-de-autor': {
        title: 'Ramos de Autor',
        mainImage: './public/images/servicios/ramos-de-autor.webp',
        description: `<p>En nuestro taller, cada ramo comienza con una inspiración distinta, no a partir de modelos prehechos: cada composición es única, diseñada para la persona que la recibirá.</p>
<h4>Nuestro proceso</h4>
<p>Combinamos flores frescas de temporada sobre una paleta de colores elegida por el cliente, así convertimos cada ramo en una pieza floral con equilibrio e identidad.</p>
<h4>Una pieza viva</h4>
<p>Las flores son vivas y continúan transformándose cada día. Los botones se abren lentamente, nuevas formas aparecen, los colores evolucionan y el ramo regala cada día una nueva sorpresa.</p>`,
        gallery: [
            './public/images/servicios/galeria/ramos-de-autor-1.webp',
            './public/images/servicios/galeria/ramos-de-autor-2.webp',
            './public/images/servicios/galeria/ramos-de-autor-3.webp',
            './public/images/servicios/galeria/ramos-de-autor-4.webp'
        ]
    },
    'matrimonios': {
        title: 'Flores para un Matrimonio',
        mainImage: './public/images/servicios/matrimonios.webp',
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
            './public/images/servicios/galeria/matrimonios-1.webp',
            './public/images/servicios/galeria/matrimonios-2.webp',
            './public/images/servicios/galeria/matrimonios-3.webp',
            './public/images/servicios/galeria/matrimonios-4.webp'
        ]
    },
    'novios-rio': {
        title: 'Novios por el Río',
        mainImage: './public/images/servicios/novios-rio.webp',
        description: `<p>Te invitamos a vivir una navegación pausada por las tranquilas aguas del Río Calle-Calle, en el corazón de Valdivia: un momento para disfrutar, contemplar el paisaje y atesorar.</p>
<h4>Cómo navegamos contigo</h4>
<ul>
    <li>Con ambos novios a bordo, rumbo a la ceremonia.</li>
    <li>Acompañando a la novia en su llegada o traslado hacia la celebración, donde familiares y amigos reciben a los recién casados.</li>
</ul>
<h4>Una experiencia para atesorar</h4>
<p>La calma del río, el entorno natural y el encanto de la navegación crean una atmósfera íntima y dulce, convirtiendo el viaje en parte de la celebración. Es un tiempo para respirar, emocionarse y compartir, mientras cada instante queda en fotografías.</p>`,
        gallery: [
            './public/images/servicios/galeria/novios-rio-1.webp',
            './public/images/servicios/galeria/novios-rio-2.webp',
            './public/images/servicios/galeria/novios-rio-3.webp'
        ]
    },
    'eventos': {
        title: 'Eventos y Celebraciones',
        mainImage: './public/images/servicios/eventos.webp',
        description: `<p>Las flores deben ser parte de la esencia de una celebración. Definen la atmósfera, aportan sensibilidad y transforman un espacio en un lugar inolvidable: para una cena íntima, un cumpleaños, un aniversario, una comida familiar o un cóctel.</p>
<h4>Cómo trabajamos</h4>
<p>Nuestros proyectos nacen de una conversación, porque cada encuentro tiene un carácter distinto y merece una propuesta floral pensada exclusivamente para ti. Nos inspira el espacio, la luz, la estación del año, la mesa, la arquitectura y las personas que la compartirán.</p>
<h4>Nos ocupamos de todo</h4>
<p>Diseñamos y elaboramos cada composición en nuestro taller, realizamos el montaje y proporcionamos todos los soportes y elementos necesarios para un resultado fabuloso.</p>`,
        gallery: [
            './public/images/servicios/galeria/eventos-1.webp',
            './public/images/servicios/galeria/eventos-2.webp'
        ]
    },
    'condolencias': {
        title: 'Condolencias',
        mainImage: './public/images/servicios/condolencias.webp',
        description: `<p>En los momentos de despedida, cuando las emociones son profundas y las palabras pueden quedarse pequeñas, las flores se convierten en un gesto de amor, respeto y acompañamiento. Diseñamos homenajes florales que honran la historia y acompañan a quienes quedan.</p>
<h4>Nuestros homenajes</h4>
<ul>
    <li>Coronas florales.</li>
    <li>Ramos y centros florales.</li>
    <li>Cubre urnas.</li>
    <li>Composiciones especiales, elaboradas en nuestro taller con flores frescas.</li>
</ul>`,
        gallery: [
            './public/images/servicios/galeria/condolencias-1.webp',
            './public/images/servicios/galeria/condolencias-2.webp'
        ]
    }
};