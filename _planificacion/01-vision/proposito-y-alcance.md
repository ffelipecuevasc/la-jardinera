# Propósito y Alcance del Producto

**⚠️ DIRECTRIZ ESTRICTA PARA AGENTES IA:**
Este documento define los límites absolutos del producto. Bajo ninguna circunstancia debes sugerir, planificar o
implementar características que caigan en la sección "Fuera de Alcance".

## 1. Identidad y Contexto de Negocio

* **Marca:** Florería La Jardinera (Valdivia, Región de Los Ríos, Chile).
* **Identidad Visual:** Orgánica, cálida, vibrante. Arraigada en la naturaleza húmeda del sur de Chile.
* **Traducción Técnica:** El código UI debe reflejar esta identidad utilizando **exclusivamente** el sistema de diseño
  estricto definido en `DESIGN.md` (tipografías Serif elegantes, colores botánicos, bordes curvos, y contrastes
  precisos).
* **Publicación:** repositorio en GitHub y despliegue continuo con Cloudflare Pages (`lajardinerafloreria.cl`).

## 2. Arquitectura de Navegación (Restricción MPA)

El proyecto es estrictamente una **Multi-Page Application (MPA)**. Consta de 6 páginas (`src/pages/*.astro`) que Astro compila a 6 archivos HTML independientes:
cinco páginas interconectadas por una barra de navegación y una página de error. **Prohibido el uso de enrutadores
JavaScript (History API) o emulaciones de Single Page Application (SPA).**

1. **Inicio (`/`):** Hero, propuesta de valor, resumen de servicios, modelo de suscripción y reseñas (carrusel
   vanilla JS).
2. **Servicios (`/servicios`):** Catálogo de 8 servicios (`src/js/data/services.js`) con modal de detalle dinámico;
   su llamado a la acción lleva a `/contacto?service=...`.
3. **Suscripción Floral (`/suscripcion-floral`):** 3 planes de suscripción (Esencial, Premiere y Luxe) para hogar u
   oficina.
4. **Galería (`/galeria`):** Acordeón horizontal por capítulos y visor Lightbox multimodal (imágenes y video). No
   tiene filtros.
5. **Contacto (`/contacto`):** Tarjetas de WhatsApp y correo, y formulario cuyo envío abre WhatsApp con el mensaje
   armado (`src/js/modules/contact-form.js`). No hay mapa incrustado ni Netlify Forms.
6. **Página no encontrada (cualquier ruta inexistente; se publica como `404.html`):** Página de error con `noindex, follow`, sin enlace activo en la navegación.

## 3. Límites del Alcance (Scope Boundaries)

### ✅ Dentro del Alcance (Tu Jurisdicción)

* **Maquetación Semántica:** HTML5 estructurado (SEO y Accesibilidad nativa).
* **Estilizado Restringido:** Tailwind CSS v3 compilado vía PostCSS en la compilación de Astro, mapeado 1:1 con los tokens oficiales.
* **Interactividad Ligera:** JavaScript Vanilla (ES6+) para menús móviles, modales, carruseles básicos y toggles de Dark
  Mode.
* **Optimización de Assets:** Rutas locales a imágenes `.webp` con prevención de CLS (ancho/alto explícito).

### ❌ Fuera del Alcance (Prohibido Implementar)

* **Lógica de Backend / CMS:** Cero bases de datos, cero paneles de administración dinámicos.
* **Pasarelas de Pago:** No programes integraciones con Webpay, Stripe o carritos de compra. Todo C2A (Call to Action)
  redirige a WhatsApp.
* **Frameworks JS de interfaz:** Cero dependencias de UI en el navegador (React, Vue, Preact, Alpine.js, jQuery).
  Astro se usa solo como generador estático en compilación y no envía JavaScript propio.