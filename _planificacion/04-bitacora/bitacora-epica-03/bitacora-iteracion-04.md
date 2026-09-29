# Bitácora de Auditoría y Desarrollo - Épica 03 | Iteración 04 (Final)

## 1. Resumen Ejecutivo
Se coronó la **Épica 03 (Página de Suscripción Floral)** con la culminación de la **Iteración 04**:
- **Accesibilidad Web (WCAG 2.1 AA):** Se inyectó semántica ARIA estricta para sincronizar estados dinámicos del acordeón (`aria-expanded`, `aria-controls`, `aria-hidden`, `aria-labelledby`, `aria-label`).
- **Focus Management (Navegación por Teclado):** Se programó la transferencia guiada del foco hacia el encabezado del catálogo de planes (`#planes-title` con `tabindex="-1"`) al expandirse, y la devolución explícita del foco al botón desencadenador (`#show-plans-btn`) al contraerse.
- **Interpolación Matemática con CSS Grid (Mejora QA):** Se reemplazó la técnica basada en `max-h` por la técnica moderna de CSS Grid (`grid-template-rows: 0fr` a `1fr`), garantizando una animación continua, suave y sin saltos discretos ni dependencia de `scrollHeight`.
- **Rendimiento y Optimización de Ciclos (Mejora QA):** Se dotó al Hero Cross-fade de un observador `IntersectionObserver` y un receptor del evento `visibilitychange`, pausando la rotación de diapositivas cuando el Hero sale del viewport o cuando el usuario cambia de pestaña.
- **Pulido Dark Mode:** Contraste elevado para etiquetas de precio (`dark:text-primary-fixed`), botones de acción con contraste AA (`text-white dark:text-neutral-950`) y fondos enriquecidos (`dark:bg-dark-surface-container-low`).

---

## 2. Acciones Realizadas y Cambios de Código

### A. Semántica ARIA y Accesibilidad
1. **Botón de Apertura (`#show-plans-btn`):**
   - Atributos declarados: `aria-controls="planes"` y `aria-expanded="false"`.
   - Actualización dinámica en JavaScript a `aria-expanded="true"` al revelar el catálogo.
2. **Contenedor de Planes (`#planes`):**
   - Atributos declarados: `aria-hidden="true"` y `aria-labelledby="planes-title"`.
   - Actualización dinámica en JavaScript a `aria-hidden="false"` durante la apertura y reversión a `aria-hidden="true"` al colapso.
3. **Botón de Cierre (`#hide-plans-btn`):**
   - Atributos declarados: `aria-controls="planes"` y `aria-label="Cerrar catálogo de planes de suscripción"`.
4. **Encabezado Guía (`#planes-title`):**
   - Declarado con `tabindex="-1"` y clase de supresión de outline predeterminado (`focus:outline-none`), listo para recibir foco programático vía `.focus()`.

### B. Focus Management en `src/js/modules/subscription.js`
- **Al abrir los planes:**
  Tras iniciarse el desplazamiento suave (`scrollIntoView`) y transcurridos 750ms (tiempo necesario para concluir la animación de 700ms), se ejecuta `planesTitle?.focus()`, asegurando que lectores de pantalla y usuarios de teclado queden posicionados en el inicio del nuevo contenido.
- **Al cerrar los planes:**
  Tras replegar el acordeón y retornar suavemente hacia `#info-suscripcion`, se ejecuta `showPlansBtn?.focus()`, restituyendo el foco a su origen lógico y previniendo la pérdida de posición de navegación.

### C. Acordeón Continuo con CSS Grid (`src/css/input.css`)
Se incorporaron las reglas para el acordeón basado en CSS Grid:
```css
.accordion-grid {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 700ms var(--expo-out), opacity 700ms ease-in-out;
}
.accordion-grid.is-expanded {
    grid-template-rows: 1fr;
}
```
Envuelta por un contenedor interno con `overflow-hidden min-h-0`, esta arquitectura logra una expansión vertical continua sin calcular dimensiones en píxeles.

### D. Optimización del Hero Banner con `IntersectionObserver`
- Se instrumentó `document.addEventListener('visibilitychange')` para pausar el temporizador del carrusel cuando la pestaña pasa a segundo plano.
- Se configuró una instancia de `IntersectionObserver` sobre `#banner-carousel` (umbral de visibilidad 10%) que detiene el `setInterval` cuando el Hero es rebasado por el scroll y lo reanuda automáticamente al regresar al tope de la página.

### E. Pulido de Tokens en Modo Oscuro
- **Precios:** Clases `text-primary dark:text-primary-fixed` asignadas a las 3 tarjetas de planes para garantizar ratio de contraste superior a 7:1 en fondos oscuros.
- **Botones de Selección:** Contraste robusto garantizado mediante `text-white dark:text-neutral-950 bg-primary hover:bg-primary/90`.
- **Caja Central Glassmorphism:** Fondo adaptativo `bg-surface/85 dark:bg-dark-surface-container-low/85 backdrop-blur-md` con borde `border-outline-variant/30 dark:border-dark-surface-variant`.

---

## 3. Verificación de Criterios de Aceptación (Definition of Done)

| Criterio | Estado | Evidencia |
| :--- | :---: | :--- |
| **Sincronización ARIA** | ✅ CUMPLIDO | `aria-expanded` y `aria-hidden` se conmutan de forma bidireccional y reactiva en el DOM. |
| **Focus Management** | ✅ CUMPLIDO | Foco transferido al H2 de planes al abrir y devuelto a `#show-plans-btn` al cerrar. |
| **Interpolación CSS Grid** | ✅ CUMPLIDO | Acordeón animado mediante `grid-template-rows: 0fr` a `1fr` con soporte para `prefers-reduced-motion`. |
| **Ahorro de Recursos (Observer)** | ✅ CUMPLIDO | Hero carrusel pausado en pestañas inactivas y fuera del viewport. |
| **Contraste Modo Oscuro** | ✅ CUMPLIDO | `dark:text-primary-fixed` y `dark:bg-dark-surface-container-low` implementados. |
| **Compilación Tailwind** | ✅ CUMPLIDO | `pnpm build` ejecutado en 570ms sin incidencias. |
