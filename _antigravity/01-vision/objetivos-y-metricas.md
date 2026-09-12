# Objetivos y Métricas de Éxito

Este documento fija los estándares cualitativos y cuantitativos que el agente Antigravity debe monitorear y respetar durante todo el ciclo de desarrollo.

---

## 1. Objetivos Estratégicos (Cualitativos)

1. **Impacto Visual Floral:** El diseño debe comunicar frescura, color y elegancia artesanal desde los primeros 3 segundos de navegación.
2. **Navegación Intuitiva y Sin Fricción:** Estructura limpia donde cualquier usuario pueda encontrar un servicio, ver fotos reales de arreglos y contactar a la florería en menos de 2 clics.
3. **Claridad en la Suscripción Floral:** Explicar el modelo recurrente de forma tan sencilla y atractiva que los visitantes comprendan de inmediato el beneficio de recibir flores periódicas.
4. **Identidad Valdiviana:** Incorporar sutiles guiños a la identidad de la ciudad (ríos, lluvia, naturaleza verde profunda contrastada con tonos florales vivos).

---

## 2. Métricas Técnicas y Rendimiento (Cuantitativos)

| Métrica | Meta / Umbral | Herramienta de Medición |
| :--- | :--- | :--- |
| **Lighthouse: Performance** | $\ge 95$ en escritorio / $\ge 90$ en móvil | Google Lighthouse / PageSpeed Insights |
| **Lighthouse: Accessibility (a11y)** | $100$ | Google Lighthouse / axe DevTools |
| **Lighthouse: Best Practices** | $100$ | Google Lighthouse |
| **Lighthouse: SEO** | $100$ (Metadatos Open Graph, Twitter Cards, semántica) | Google Lighthouse |
| **Tiempo de Carga Inicial (FCP)** | $\le 1.2\text{ s}$ en conexión 4G | Chrome DevTools |
| **Peso total de la página (excl. fotos)** | $\le 150\text{ KB}$ (HTML + CSS purgado + JS minificado) | Network Tab |
| **Errores en Consola** | $0$ errores y $0$ warnings | Consola del navegador |

---

## 3. Criterios de Aceptación Globales (DoD - Definition of Done)

Para dar por terminada cualquier página o componente:
1. **Consistencia de Navegación:** El encabezado (`header`) con el menú de navegación y el pie de página (`footer`) deben ser consistentes en las 5 páginas, marcando claramente la página activa (`aria-current="page"` y clase visual distintiva).
2. **Compatibilidad Multi-Dispositivo:** Visualización impecable comprobada en viewports móviles (360px, 390px), tablets (768px, 820px) y pantallas de escritorio (1280px, 1920px).
3. **Optimización de Medios:** Todas las imágenes deben utilizar formatos modernos (WebP/AVIF), contar con dimensiones explícitas (`width`, `height`) para prevenir Cumulative Layout Shift (CLS) y atributos `loading="lazy"` en imágenes bajo el primer pliegue.
4. **Respaldo de Compatibilidad de Hosting:** Las rutas deben funcionar tanto en subdirectorios de GitHub Pages (ej. `https://usuario.github.io/la-jardinera/`) como en el dominio raíz de Netlify (ej. `https://lajardinera.cl/` o `https://lajardinera.netlify.app/`).