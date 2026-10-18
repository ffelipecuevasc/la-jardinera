// Fuente única de la navegación del sitio (Épica 08 · Iteración 03). La usa SiteFooter.astro y la usará SiteHeader.astro
// (Iteración 04). Las etiquetas están copiadas textualmente del marcado; header y footer las tienen idénticas.
export const NAVEGACION = [
    { clave: 'inicio',             etiqueta: 'Inicio',             ruta: '/' },
    { clave: 'servicios',          etiqueta: 'Servicios',          ruta: '/servicios' },
    { clave: 'suscripcion-floral', etiqueta: 'Suscripción Floral', ruta: '/suscripcion-floral' },
    { clave: 'galeria',            etiqueta: 'Galería',            ruta: '/galeria' },
    { clave: 'contacto',           etiqueta: 'Contacto',           ruta: '/contacto' },
];
