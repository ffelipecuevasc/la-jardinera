# Bitácora de Auditoría y Remediación - Épica 01 | Iteración 02

## 1. Diagnóstico Inicial
Se auditó la implementación arquitectónica de modularidad y deudas técnicas provenientes de la **Iteración 02 (Modularización JS)**. El escaneo profundo evidenció el siguiente estado irregular al inicio de la intervención frente a la actual política estricta de la compañía:
- **Alta acoplación DOM y Comportamiento**: Múltiples referencias inyectadas directamente de variables y ejecuciones desde la propiedad visual de HTML, vulnerando masívamente la regla de segregación ("Cero JS en línea"). Notable evidencia encontrada en la invocación de la función selectFrequency en un bloque script del pié de página y mediante la propiedad onclick="" repartida en tres botones diferentes, inyectando código con datos duros desde las plantillas. Además, el toggle del Dark Theme aún dependía de una instancia inline onclick.

## 2. Acciones de Remediación Aplicadas
- **Modularización Pura (Vanilla ES6+)**: Creación de las estructuras de organización correspondientes en src/js/modules/ configurando la arquitectura por separación de responsabilidades:
  - 	heme.js (Alternancia del Modo Oscuro con soporte en LocalStorage).
  - subscription.js (Sistema base de planes dinámicos).
  - Componentes placeholder para menús, modales y carruseleras (
avigation.js, modal.js, carousel.js). 
- **Refactorización a Datos Variables y Delegación de Eventos (Dataset)**:
   En el HTML base, se sustituyeron los eventos encriptados onclick desde los botones de frecuencia y se integraron datos al patrón nativos de HTML (ej: data-name="Mensual" data-price="...") que luego interceden funcionalmente en la estructura mediante eventos ddEventListener('click', ...) montados en el listener superior. 
- **Inyección Centralizada**: Construcción de src/js/main.js montando cada inicialización (imports) bajo la envoltura document.addEventListener('DOMContentLoaded', ...). 
- **Purificación del HTML**: Expurgo exitoso de todo bloque <script> incrustado y todo atributo onClick, apuntado ahora el documento entero a invocar únicamente <script type="module" src="./src/js/main.js"></script>.

## 3. Verificación de Criterios de Aceptación (QA)
- [x] **Criterio Técnico - Cero Acoplamiento DOM**: Inspección automatizada ejecutada en terminal (vía iteraciones Regex de Select-String) comprueba que no existe ningún remanente de propiedades onclick, ni inyecciones de script al margen, garantizando limpieza semántica extrema en el código.
- [x] **Criterio Funcional - Event Listeners Vanilla**: Se confirmó la implementación con uso nativo Vanilla ES6+ sin uso de librerías dependientes ajenas al core API. Los imports mantienen requerimientos relacionales locales con el tipo estricto .js.
