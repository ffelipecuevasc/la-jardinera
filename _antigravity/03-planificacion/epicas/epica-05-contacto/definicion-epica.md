# Épica 05: Página de Contacto Premium ("contacto.html")

## 1. Objetivo de la Épica

Construir una página de contacto directa, elegante y minimalista que ofrezca al usuario dos vías de comunicación rápidas
(WhatsApp y Correo Electrónico). Todo debe enmarcarse en el sistema de tokens de Tailwind CSS validado en el proyecto,
garantizando una estética de lujo y Cero Layout Shift.

## 2. Alcance Estricto

* **Archivos:** Únicamente `contacto.html`. No se requiere JavaScript adicional al ya existente en `main.js`.
* **Diseño:** El Header, Footer y Franja de Beneficios deben ser clones exactos de las vistas previas. El contenido
  central constará de un encabezado editorial y dos tarjetas interactivas de contacto.

## 3. Definition of Done (DoD)

* [ ] **Clonación Perfecta:** Header y Footer idénticos al resto del sitio.
* [ ] **Estado Activo:** El enlace "Contacto" en el Navbar (Desktop y Móvil) refleja visualmente que es la página
  actual.
* [ ] **Cero Dependencias:** Los íconos de WhatsApp y Gmail son SVGs inline con `fill="currentColor"`.
* [ ] **Accesibilidad (a11y) y Dark Mode:** Las tarjetas reaccionan correctamente al foco por teclado, sus enlaces
  funcionan (`wa.me` y `mailto:`) y el contraste en Modo Oscuro es óptimo.