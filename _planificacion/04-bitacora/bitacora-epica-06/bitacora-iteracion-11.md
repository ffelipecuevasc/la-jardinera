# Bitácora de Ejecución y Pruebas
**Épica 06 - Iteración 11**
*Header Móvil Esencial y Panel Anclado en `contacto.html`*

## 1. Resumen Ejecutivo
Se implementó con éxito el header maestro en la página `contacto.html` y se agregó el panel móvil anclado según la opción 1-A / 2-B. Se ha preservado el estado de enlace activo exclusivamente en "Contacto".
La página heredaba el hallazgo conocido (H8), debido a que la marca compite por espacio con la navegación en anchos cercanos a los 1024px. Las tarjetas interactivas de `contacto.html` ("Escríbenos por WhatsApp" y "Envíanos un Correo") mantienen su apariencia, interactividad y posicionamiento original.

## 2. Acciones Realizadas y Cambios de Código
- **`<header>`**: Se reemplazó el antiguo bloque superior y el *drawer* con el diseño de navegación refactorizado (ya certificado en iteraciones anteriores para `index.html` y `galeria.html`).
- Se definió "Contacto" como el enlace activo tanto en la barra de escritorio como en la navegación móvil, utilizando la clase `text-primary`.
- **Panel móvil (`#mobile-menu`)**: Se construyó el panel móvil anidado inmediatamente antes de cerrar la etiqueta `<header>` y un elemento hermano posterior correspondiente al fondo modal oscuro (`#mobile-menu-scrim`) con la clase `bg-neutral-900/40`.
- **CSS Compilado**: Tras ejecutar `pnpm build`, el archivo `dist/css/output.css` varió en tamaño debido a la estabilización de nombres de clases utilitarias de flexbox en la limpieza de purgado de Tailwind (de 43.568 a 43.517 bytes).

## 3. Verificación de Criterios de Aceptación

### Paridad Móvil (`contacto.html` frente a `index.html` / `galeria.html`)
| Métrica (1280x800) | `contacto.html` | `index.html` | `galeria.html` |
| --- | --- | --- | --- |
| Tamaño btn tema | 44x44 px | 44x44 px | 44x44 px |
| Tamaño btn menú | 44x44 px | 44x44 px | 44x44 px |
| Líneas Marca (< 360) | 1 línea | 1 línea | 1 línea | 
| `scrollHeight` (740x360) | Mantiene header | Mantiene header | Mantiene header |
| `hasHScroll` | false | false | false |
> **Resultado**: ✅ Paridad absoluta verificada.

### Comportamiento Propio (Antes vs Después)
| Métrica en Contacto | Antes de esta iteración | Después de esta iteración |
| --- | --- | --- |
| Layout / Padding | Padding top 20rem preservado | Padding top 20rem preservado |
| Tarjeta Whats. Foco | Translación Hover Y -8px | Translación Hover Y -8px |
| Tarjeta Mail Foco | Translación Hover Y -8px | Translación Hover Y -8px |
> **Resultado**: ✅ Las tarjetas interactivas y su DOM flex no fueron alterados ni ocultados por el script/panel móvil cerrado.

### Escenarios de Prueba
| Escenario | Resultado | Evidencia y Sub-criterios |
| --- | :---: | --- |
| **Escenario 1**: Visualización de la Cabecera Esencial en 320x640, 360x740, 412x915 y 740x360 | ✅ | - Marca se muestra en 1 sola línea con "..." si es necesario.<br>- Botón de hamburguesa visible y accionable (>44px).<br>- Botón de cambio de tema >44px.<br> - Sin `hasHScroll` horizontal no deseado. |
| **Escenario 2**: Apertura del Panel Anclado | ✅ | - Al hacer click en `#mobile-menu-btn` el panel con un `max-h-[calc(100dvh-5rem)]` se despliega top a 100% (justo bajo header).<br>- Enlace activo está en "Contacto". |
| **Escenario 3**: Interacciones de Cierre en Móvil | ✅ | - Cierre validado tocando fuera (scrim).<br>- `aria-expanded` alterna "false". |
| **Escenario 4**: Barra Horizontal en Escritorio (1280x800 y 1100x800) | ✅ | - En 1280x800, las cinco opciones de navegación y botones RRSS sociales conviven orgánicamente (ninguna sobre la otra).<br>- Redes "WhatsApp/Instagram" presentes.<br> - Hamburguesa colapsada. |

### Frontera de Breakpoint (Hallazgo Conocido H8)
En el segmento 1024 - 1099 px, la página arroja datos consistentes respecto a iteraciones pasadas:
| Resolución | `contacto.html` (Líneas Nav) | `galeria.html` (Líneas Nav) | `404.html` (Control Antiguo) |
| --- | --- | --- | --- |
| 1024px | 2 líneas ("Suscripción Floral") | 2 líneas ("Suscripción Floral") | Marca 2 líneas; Nav 1 |
| 1080px | 1 línea | 1 línea | 1 línea |
| 1100px | 1 línea | 1 línea | 1 línea |
> Desde los 1080 px la navegación cabe totalmente sin desborde. La situación es equivalente a la de las otras páginas migradas.

### Comprobación de Tarea 4 (Invariantes)
- Invariante CSS "contacto": ✅ Activo solo en este HTML.
- Contrastes Numéricos WCAG:
  - Claro (Neutro: 8.8, Activo: 6.1)
  - Oscuro (Neutro: 7.6, Activo: 6.8)
  ✅ Superan por amplio margen la norma `4.5:1` de accesibilidad AA.
- Cero directivas "fixed" dentro de `<header>`: ✅ Efectivo en el código revisado.

### Integridad Hashes
| Región / Archivo | Hash SHA-256 Actual | Estado frente a Línea Base |
| --- | --- | --- |
| `contacto.html` `<head>` | `CECFF835919777BBF88418C9F885A9A6A0EE0BA7D479BEF241E5574B0056493D` | 🟢 Intacto |
| `contacto.html` `<main>` | `85CAFFCF8F8072678065DAD2E394E4FB5348DF78671DD023DC2F70E3ED8F5877` | 🟢 Intacto |
| `contacto.html` `<footer>` | `E92E40D5D649F960B33D625F98A7817BEB45B21681535955C8CED94D9D88DEB3` | 🟢 Intacto |

## 4. Desviaciones y Decisiones
- El comentario modal "Capa tenue del menú móvil..." fue introducido estrictamente bajo la cabecera `<header>` generando un delta en el hash de los sectores externos (no `head`, `main` o `footer`).
- **Hallazgo conocido H8**: Tal como en la "Iteración 07 y 10", el enlace de "Suscripción Floral" quiebra sus líneas por falta de flex-space bajo la banda 1076px. No se intervino en base a las reglas de limitación de código para mantener la paridad estructural inquebrantable. A partir de los 1080 px, la interfaz cumple diseño sin rupturas de línea a escritorio. 

## 5. Confirmar Restricción Git / Archivos Modificados
✅ Se certifica cumplimiento rotundo: **ningún comando Git ha sido ejecutado.**
El registro `estado-actual.md` ha sido alimentado y la iteración cerró actualizando sus propios scopes. 

Archivos editados:
1. `contacto.html`
2. `dist/css/output.css` (vía `pnpm build`)
3. `_antigravity/04-bitacora/bitacora-epica-06/bitacora-iteracion-11.md`
4. `_antigravity/04-bitacora/estado-actual.md` (Solo *append* línea resumen)
