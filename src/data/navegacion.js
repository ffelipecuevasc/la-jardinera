// Fuente única de la navegación del sitio (Épica 08 · Iteración 03). La usa SiteFooter.astro y la usará SiteHeader.astro
// (Iteración 04). Las etiquetas están copiadas textualmente del marcado; header y footer las tienen idénticas.
export const NAVEGACION = [
    { clave: 'inicio',             etiqueta: 'Inicio',             ruta: '/',
      descripcion: 'Diseño floral artesanal y curaduría de eventos para celebrar la belleza efímera de la naturaleza en Valdivia, Chile.' },
    { clave: 'servicios',          etiqueta: 'Servicios',          ruta: '/servicios',
      descripcion: 'Explora nuestros servicios florales: suscripciones, ramos de novia, decoración de eventos y más. Diseño floral con un toque editorial en Valdivia.' },
    { clave: 'suscripcion-floral', etiqueta: 'Suscripción Floral', ruta: '/suscripcion-floral',
      descripcion: 'Recibe flores frescas en tu puerta con nuestros planes de suscripción. Alegría y belleza de temporada para tu hogar u oficina en Valdivia.' },
    { clave: 'galeria',            etiqueta: 'Galería',            ruta: '/galeria',
      descripcion: 'Explora nuestro portfolio de diseño floral. Una muestra curada de nuestro trabajo en ramos de novia, decoración, suscripciones y más en Valdivia.' },
    { clave: 'contacto',           etiqueta: 'Contacto',           ruta: '/contacto',
      descripcion: 'Ponte en contacto con La Jardinera Florería en Valdivia. Escríbenos por WhatsApp o envíanos un correo para agendar reuniones, cotizar eventos o resolver dudas.' },
];
