# Bitácora de Auditoría y Cierre - Épica 01 | Iteración 05 

## 1. Implementación de Interactividad Modular 
Resueltos positivamente todos los desafíos de UI y Accesibilidad mediante JS Vanilla enfocado siempre en programación defensiva (
ull-checks) sin polución en el objeto window/global:

- **Componente Modal (modal.js)**: 
  - Se orquestó la lógica para que los botones portando el atributo de acceso data-modal-target="contact-modal" disparen la interfaz superpuesta. (Previamente se maquetó el modal ausente al final del DOM index.html bajo el <main> manteniendo la etiqueta ria-hidden="true").
  - **Scroll Lock**: Efectuamos manipulación del objeto document.body encendiendo overflow-hidden nativo en Tailwind impidiendo que el lienzo primario sufra desbalance al hacer scroll dentro del modal. 
  - **Focus Trap**: Funcionalidad premium de accesibilidad aplicada. Se instanciaron escuchas condicionales anudadas en un NodeList interceptando pulsaciones del teclado (TAB y Shift+TAB) iterando cíclicamente sobre los inputs del modal, sin dejar escapar la atención del usuario a elementos del fondo, y recuperando inteligentemente el elemento original (previouslyFocusedElement) al momento de cerrar (mediante Escape, Click outside/overlay y Close button X).
  
- **Deslizador Nativo / Carrusel (carousel.js)**:
  - En el HTML reconvertimos el grid rígido a una lista de desplazamiento horizontal lex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar. Las instancias hijas pasaron a ser lex-none snap-center.
  - El core API utilizado interactúa nativamente a base a método de desplazamiento vectorial en 2D estandar scrollBy(), sumando el offset o margen estatuido con relación al cálculo dinámico del tamaño del primer nodo (clientWidth + gap).

## 2. QA y Verificación Final
- [x] **A11y/Escapes de Interfaz**: Corroborada la funcionalidad de cierre por escape físico (keydown="Escape") e indirecto, junto al resguardo del índice de foco de accesibilidad.  
- [x] **Prevención de Mutaciones Indeseadas**: Código 100% blindado contra caídas prematuras mediante validación defensiva en todas y cada una de las variables del DOM (if (!track) return;). 
- [x] **Flujo Unificado**: Todo Event Listener está resguardado e instanciado debajo el estado DOMContentLoaded operado en main.js. 
