# Bitácora de Auditoría y Remediación - Épica 01 | Iteración 01

## 1. Diagnóstico Inicial

Durante la auditoría de adherencia a la nueva arquitectura y Definition of Done para la **Iteración 01 (Configuración
del Entorno Tailwind y Build)**, se detectaron las siguientes omisiones y deudas técnicas:

- **Residuos de CSS Incrustado**: Persistía un bloque <style> en el <head> del index.html que incluía configuraciones
  esenciales del CSS (@layer base, ocultamiento y comportamiento del scrollbar). Esto violaba radicalmente la regla
  "Cero JS/CSS en línea".
- **Colisión de Tokens de Diseño**: Los tokens de colores, tipografías y variables dictados por la primera redacción
  pasiva del stack-tecnologico.md no se alineaban con las clases utilitarias ya utilizadas en el maquetado del HTML (ej:
  ext-on-surface, g-surface-container-low), lo cual causaba que Tailwind CLI las depurara erróneamente del archivo CSS
  final, corrompiendo el aspecto visual.

## 2. Acciones de Remediación Aplicadas

Para alinear estricta y funcionalmente esta iteración al estándar, se aplicaron los siguientes cambios:

- **Sobreescritura Forense de CSS**: Se trasladó todo el contenido original del antiguo <style> del DOM hacia
  src/css/input.css bajo la convención propia @layer base.
- **Limpieza Definitiva de index.html**: Se purgaron usando manipulación de archivos y Regex los style y configuraciones
  CDN del archivo principal.
- **Configuración Real del Sistema de Diseño**: Inyección directa en el ailwind.config.js de la lista unificada de
  tokens avanzados (colores y paletas surface completas, fuentes Noto Serif/Montserrat, espaciados en formato rem
  iterables, etc.) requeridos exactamente por el archivo de vista index.html.

## 3. Verificación de Criterios de Aceptación (QA)

- [x] **Criterio - Escenario 1: Compilación exitosa**: Se ejecutó pnpm build luego de resolver las fallas de inyección
  de configuración en Tailwind. El minificador iteró y escaneó a la perfección y arrojó el output en dist/css/output.css
  sin alertas críticas en consola.
- [x] **Criterio - Escenario 2: Limpieza de dependencias**: La inspección manual del documento base revela que no
  existen enlaces CDN a CSS pre-compilados ni bloques <style>, dependiento ahora puramente de una única carga al
  dist/css/output.css.
