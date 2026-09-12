# Objetivos y Métricas de Éxito (QA & Performance)

Este documento fija los estándares cualitativos y cuantitativos que el agente Antigravity debe monitorear. Las métricas
no son sugerencias, son requisitos obligatorios (Definition of Done) para cada iteración.

---

## 1. Criterios de Calidad Estética (Cualitativos)

1. **Fidelidad Visual (Anti-Regresión):** El resultado renderizado (HTML + CSS local) debe ser visualmente idéntico o
   superior al diseño y estructura del template HTML original. Perder estilos o estructura se considera un fallo
   crítico.
2. **Impacto Botánico:** El diseño debe transmitir la frescura húmeda del sur de Chile utilizando estrictamente la
   paleta y tipografías (Noto Serif / Montserrat) declaradas en el `DESIGN.md`.
3. **Consistencia de Interfaz:** Los componentes transversales (Navegación, Pie de página) deben comportarse de forma
   idéntica en todas las vistas (MPA).

---

## 2. Métricas Técnicas y Estrategias de Implementación (Cuantitativos)

| Métrica                  | Umbral             | Herramienta      | Estrategia de Código Obligatoria (Cómo lograrlo)                                                                                                                         |
|:-------------------------|:-------------------|:-----------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Performance**          | $\ge 95$           | Lighthouse       | Precarga de fuentes (`<link rel="preload">` + `display=swap`). Imagen del Hero como `eager`, el resto de imágenes bajo el pliegue con `loading="lazy"`.                  |
| **Accesibilidad (a11y)** | $100$              | Lighthouse / axe | Todo botón debe tener `aria-label`. Contrastes verificados (On-Primary vs Primary). Modales con bloqueo de scroll y atrapamiento de foco.                                |
| **Best Practices**       | $100$              | Lighthouse       | Consola limpia (Cero errores de JS, cero warnings de Tailwind). Uso de extensiones correctas en módulos importados (`.js`).                                              |
| **Tiempo (FCP)**         | $\le 1.2\text{ s}$ | Network Tab      | Las imágenes estáticas pesadas deben ser convertidas a formato `.webp` u optimizadas, referenciadas siempre localmente.                                                  |
| **Estabilidad (CLS)**    | $0$                | Lighthouse       | Toda etiqueta `<img>` sin excepción debe contar con las clases de Tailwind de aspecto (ej. `aspect-[4/5]`) o estar en un contenedor estricto que evite saltos de diseño. |

---

## 3. Criterios de Aceptación Globales (Definition of Done)

Para dar por terminada cualquier iteración o componente, Antigravity debe asegurar:

1. **Cero JS en línea:** El HTML no contiene scripts en línea ni eventos en atributos (`onclick`).
2. **Compilación Exitosa:** El CSS generado incluye las clases esperadas tras ejecutar el build.
3. **Responsividad Comprobada:** Los componentes escalan y reaccionan de manera predecible en pantallas móviles (menú
   hamburguesa) y desktop (navegación extendida).
4. **Rutas Inquebrantables:** Las referencias a assets (imágenes, CSS, JS) funcionan universalmente usando rutas
   relativas seguras (`./` o `./src/...`).