# Propósito y Alcance del Producto

## 1. Identidad y Contexto
* **Nombre comercial:** Florería La Jardinera
* **Ubicación:** Valdivia, Región de Los Ríos, Chile.
* **Rubro:** Diseño floral artesanal, arreglos para ocasiones especiales, decoración de espacios, suscripciones florales periódicas para hogares y empresas.
* **Carácter de marca:** Orgánica, cálida, vibrante, arraigada en la naturaleza húmeda y exuberante del sur de Chile, con énfasis en flores frescas y arreglos de autor.

---

## 2. Propósito del Sitio Web
Crear una presencia digital oficial, atractiva y moderna que posicione a **La Jardinera** como referente floral en Valdivia. La plataforma debe ser una vitrina digital viva que inspire confianza, deleite visualmente al visitante y facilite el contacto directo para cotizaciones, pedidos personalizados y suscripciones.

---

## 3. Público Objetivo
1. **Compradores locales (Valdivia):** Habitantes que buscan arreglos para aniversarios, cumpleaños, condolencias, decoración de interiores o celebraciones.
2. **Empresas, cafeterías y hoteles locales:** Clientes B2B interesados en suscripciones florales para ambientación semanal o quincenal de sus locales.
3. **Compradores a distancia:** Personas que residen en otras ciudades de Chile o en el extranjero y desean enviar flores a familiares o amigos en Valdivia.

---

## 4. Secciones del Sitio (Arquitectura de Páginas)
El sitio se estructura en 5 páginas HTML independientes interconectadas mediante una barra de navegación fija y responsiva:

1. **Inicio (`index.html`):**
    * Banner principal (Hero) con mensaje de bienvenida y fotografía floral de impacto.
    * Resumen de propuesta de valor (flores frescas, diseño local, entregas en Valdivia).
    * Muestra destacada de servicios y llamado a la acción (CTA) a suscripciones.
    * Testimonios o reseñas de clientes.

2. **Servicios (`servicios.html`):**
    * Catálogo detallado de servicios: ramos de ocasión, arreglos nupciales, eventos corporativos, coronas y ambientación floral.
    * Descripción de cada servicio y botón de cotización directa por WhatsApp.

3. **Suscripción Floral (`suscripcion-floral.html`):**
    * Explicación del modelo de suscripción (semanal, quincenal, mensual).
    * Planes orientados a hogares y a empresas/cafeterías.
    * Beneficios, tipos de flores de temporada y proceso de entrega en Valdivia.

4. **Galería (`galeria.html`):**
    * Vitrina visual vibrante con fotografía de arreglos reales en alta resolución.
    * Filtros visuales interactivos mediante JavaScript (ej. Todos, Ramos, Eventos, Suscripciones).
    * Visualizador de fotos ampliado (modal/lightbox ligero).

5. **Contacto (`contacto.html`):**
    * Formulario de contacto directo (preparado para Netlify Forms en la fase final).
    * Enlace directo a WhatsApp con mensaje precargado.
    * Mapa de cobertura de entrega en Valdivia e información de horarios y ubicación.

---

## 5. Límites del Alcance (Dentro vs. Fuera de Alcance)

### Dentro del Alcance (In-Scope)
* Maquetación 100% estática multi-página en HTML5 semántico.
* Estilizado con Tailwind CSS v3 personalizado con paleta floral viva.
* Interactividad frontend en JavaScript moderno (menú móvil, filtros de galería, acordeones de preguntas frecuentes, modal de fotos).
* Integración de enlaces rápidos hacia WhatsApp con mensajes dinámicos o contextuales.
* Despliegue provisional en **GitHub Pages** y configuración final para despliegue en **Netlify**.

### Fuera del Alcance (Out-of-Scope para esta etapa)
* Pasarela de pagos automatizada (Webpay Plus, Mercado Pago, Stripe). Las ventas se canalizan y cierran por WhatsApp/teléfono.
* Base de datos o autenticación de usuarios/clientes.
* Panel de administración de contenidos (CMS) dinámico.