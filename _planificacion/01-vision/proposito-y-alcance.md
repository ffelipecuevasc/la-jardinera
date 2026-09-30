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

El proyecto es estrictamente una **Multi-Page Application (MPA)**. Consta de 6 archivos HTML físicos independientes:
cinco páginas interconectadas por una barra de navegación y una página de error. **Prohibido el uso de enrutadores
JavaScript (History API) o emulaciones de Single Page Application (SPA).**

1. **Inicio (`index.html`):** Hero, propuesta de valor, resumen de servicios, modelo de suscripción y reseñas (carrusel
   vanilla JS).
2. **Servicios (`servicios.html`):** Catálogo de 8 servicios (`src/js/data/services.js`) con modal de detalle dinámico;
   su llamado a la acción lleva a `contacto.html?service=...`.
3. **Suscripción Floral (`suscripcion-floral.html`):** 3 planes de suscripción (Esencial, Premiere y Luxe) para hogar u
   oficina.
4. **Galería (`galeria.html`):** Acordeón horizontal por capítulos y visor Lightbox multimodal (imágenes y video). No
   tiene filtros.
5. **Contacto (`contacto.html`):** Tarjetas de WhatsApp y correo, y formulario cuyo envío abre WhatsApp con el mensaje
   armado (`src/js/modules/contact-form.js`). No hay mapa incrustado ni Netlify Forms.
6. **Página no encontrada (`404.html`):** Página de error con `noindex, follow`, sin enlace activo en la navegación.

## 3. Límites del Alcance (Scope Boundaries)

### ✅ Dentro del Alcance (Tu Jurisdicción)

* **Maquetación Semántica:** HTML5 estructurado (SEO y Accesibilidad nativa).
* **Estilizado Restringido:** Tailwind CSS v3 compilado localmente, mapeado 1:1 con los tokens oficiales.
* **Interactividad Ligera:** JavaScript Vanilla (ES6+) para menús móviles, modales, carruseles básicos y toggles de Dark
  Mode.
* **Optimización de Assets:** Rutas locales a imágenes `.webp` con prevención de CLS (ancho/alto explícito).

### ❌ Fuera del Alcance (Prohibido Implementar)

* **Lógica de Backend / CMS:** Cero bases de datos, cero paneles de administración dinámicos.
* **Pasarelas de Pago:** No programes integraciones con Webpay, Stripe o carritos de compra. Todo C2A (Call to Action)
  redirige a WhatsApp.
* **Frameworks JS:** Cero dependencias pesadas de UI (React, Vue, Alpine.js, jQuery).

> **Nota:** La Épica 08 (planificada, pendiente de aprobación) propone componentes React con renderizado estático; su
> aprobación exige actualizar este documento.