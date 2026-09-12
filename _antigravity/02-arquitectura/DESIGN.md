# DESIGN.md — La Jardinera Florería

Este documento es la fuente de verdad para el sistema de diseño oficial de la marca, definiendo color, tipografía y tokens visuales[cite: 2].

## 1. Tipografía y Escala Base
*   **Logotipo y Hero:** Se requiere la familia tipográfica Instrument Serif en su estilo Itálica con un peso de 400[cite: 2]. La itálica se reserva para momentos hero y no debe usarse en párrafos largos para evitar la fatiga de lectura[cite: 2].
*   **Subtítulos y Encabezados:** Se utiliza Instrument Serif en estilo Normal con un peso de 400[cite: 2].
*   **Cuerpo y UI:** La tipografía Montserrat en estilo Normal y pesos entre 300 y 600 se usa para párrafos, navegación, botones y formularios[cite: 2].
*   **Importación y Fallbacks:** Las fuentes deben cargarse desde Google Fonts[cite: 2]. El sistema debe contemplar fuentes de respaldo: Georgia o "Times New Roman" para serif, y -apple-system o "Segoe UI" para sans-serif[cite: 2].

## 2. Paleta de Colores y Temas
| Token semántico | Modo Claro (HEX) | Modo Oscuro (HEX) |
| :--- | :--- | :--- |
| **Primary** | `#8CC79A`[cite: 2] | `#8CC79A`[cite: 2] |
| **Primary Container** | `#B7D8BF`[cite: 2] | `#B7D8BF`[cite: 2] |
| **On Primary** | `#1F2421`[cite: 2] | `#1F2421`[cite: 2] |
| **Background** | `#F8F7F3`[cite: 2] | `#1F2421`[cite: 2] |
| **On Background** | `#35363A`[cite: 2] | `#F3F3F0`[cite: 2] |
| **Surface Variant** | `#D9DDD8`[cite: 2] | `#5A615D`[cite: 2] |
| **Secondary** | `#F4B8BC`[cite: 2] | N/A |
| **Success** | `#6FBF73`[cite: 2] | N/A |

## 3. Radios, Espaciado y Sombras
*   **Radios de Borde:** Definidos en una escala que incluye `--radius-sm` de 0.25rem (4px), `--radius-lg` de 0.5rem (8px), `--radius-xl` de 0.75rem (12px) y `--radius-full` de 9999px[cite: 2].
*   **Espaciado Base y Contenedores:** Se establece un `--space-unit` de 8px, `--space-gutter` de 24px y un margen de 40px[cite: 2]. El gap para secciones es de 120px y el contenedor máximo mide 1280px[cite: 2].
*   **Sombras:** Configuración de elevación en tres niveles (`--shadow-sm`, `--shadow-md` y `--shadow-lg`) construidas utilizando el modelo rgba con la base `53,54,58`[cite: 2].

## 4. Directrices de Accesibilidad
*   El color `primary` (`#8CC79A`) no alcanza el contraste AA con texto blanco; por lo tanto, se debe usar `#1F2421` para textos sobre estas superficies[cite: 2].
*   En modo claro, el texto principal (`#35363A`) sobre el fondo base (`#F8F7F3`) cumple con el nivel AAA[cite: 2].
*   El texto secundario (`on-surface-variant`) sobre el fondo base cumple con el contraste AA aplicable para tamaños de fuente de al menos 14px[cite: 2].