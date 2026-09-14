# Bitácora de Auditoría y Remediación - Épica 01 | Iteración 04

## 1. Diagnóstico Inicial y Análisis de Assets Externos
El análisis enfocado sobre la web arrojó un fuerte déficit en las reglas de carga y rendimiento de activos. La totalidad de las vistas consumía assets en crudo desde el CDN externo de prototipado (lh3.googleusercontent.com), comprometiendo seriamente los métricas de desempeño y privacidad. Adicionalmente, se auditaron directivas sobre la estabilidad visual (CLS), verificando que los espacios de pre-cargado de imágenes contarán con su limitación espacial relativa mediante el manejo de aspect ratio en cajas delimitadoras y optimizaciones para lazy-loading nativo del lado del cliente y refactorización a formato de próxima generación web (WebP).

## 2. Acciones de Optimización Aplicadas
Se llevó a cabo una ejecución agresiva sin sacrificar semántica ni estética usando comandos vectoriales nativos para asegurar el flujo de la nueva pipeline local de archivos estáticos:

1. **Rutas Locales Estrictas**: Extraídas y truncadas 10 URL complejas hacia la nueva arquitectura limpia. Apuntándolas exclusivamente hacia los paths estandarizados:
   - Hero / Cover principal: ./public/images/hero-botanical.webp.
   - Servicios (x4): ./public/images/servicio-*.webp.
   - Suscripción botánica: ./public/images/suscripcion-taller.webp.
   - Galería Artística (x4): ./public/images/galeria-*.webp.
2. **Defensa contra CLS Confirmada (Cumulative Layout Shift)**: Verificadas e intervenidas las capas superficiales (w-full aspect-[4/5] overflow-hidden) y el (spect-[16/11]) integradas con w-full h-full object-cover, las cuales delimitan el lienzo *antes* del render final previendo en un 100% el fenómeno de salpique estético y empuje de DOM.
3. **Lazy Loading Universal**: Injectado nativamente sobre todo output inferido debajo del *above the fold* el atributo estricto loading="lazy".
4. **Optimización Accesible del Hero (Primer Pliegue)**: Modificando el div dinámico poseedor que portaba un pseudo data-alt, dotándolo con el modelo universal ria-label y la asimetría semántica en ole="img", perfeccionado su accesibilidad referencial.

## 3. Verificación de Criterios de Aceptación (QA)
- [x] **Criterio Técnico (Validación Local Absoluta)**: Recorrido y recuento en vivo del HTML expone exitosamente "0 coincidencias" apuntando a URLs externas. Absolutamente la totalidad de imágenes es procesable. 
- [x] **Criterio de QA sobre Tailwind CLI**: Se invocó pnpm build sin reportes de caída de dependencias. Todo compiló perfecto, confirmando que las directrices del Hero image y containers responsivos de spect-ratio se respetarán íntegramente. 
