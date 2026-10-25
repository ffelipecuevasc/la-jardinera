/**
 * src/js/modules/navigation.js
 * Arquitectura: ES6 Modular | Frontend nativo
 * Descripción: Menú móvil (panel anclado bajo el header) con cierre por teclado,
 *              trampa de foco, capa tenue, cambio de ícono y semántica ARIA dinámica.
 */

const LABEL_OPEN = 'Abrir menú';
const LABEL_CLOSE = 'Cerrar menú';
const DESKTOP_QUERY = '(min-width: 1024px)'; // Breakpoint `lg` de Tailwind

export function initNavigation() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (!menuBtn || !menu) return;

    // Elementos opcionales: garantizan retrocompatibilidad con páginas aún no migradas
    const scrim = document.getElementById('mobile-menu-scrim');
    const iconOpen = document.getElementById('mobile-menu-icon-open');
    const iconClose = document.getElementById('mobile-menu-icon-close');
    const desktopMedia = window.matchMedia(DESKTOP_QUERY);

    // Ciclo de foco del panel abierto (SM-02): la hamburguesa y los enlaces y botones del panel.
    // En el DOM la hamburguesa va antes del panel, así que es el primer elemento del ciclo y el
    // último enfocable del panel (Instagram) es el último. El botón de tema queda fuera.
    const panelFocusables = menu.querySelectorAll('a[href], button:not([disabled])');
    const firstPanelItem = panelFocusables[0];
    const lastInCycle = panelFocusables[panelFocusables.length - 1];

    const isOpen = () => !menu.classList.contains('hidden');

    const setOpen = (open) => {
        menu.classList.toggle('hidden', !open);
        scrim?.classList.toggle('hidden', !open);
        iconOpen?.classList.toggle('hidden', open);
        iconClose?.classList.toggle('hidden', !open);
        document.body.classList.toggle('overflow-hidden', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? LABEL_CLOSE : LABEL_OPEN);
    };

    // 1. Botón de menú: alterna el estado. Al abrir, el foco pasa al primer enlace del panel
    menuBtn.addEventListener('click', () => {
        const open = !isOpen();
        setOpen(open);
        if (open) firstPanelItem?.focus();
    });

    // 2. Delegación de eventos: cualquier enlace dentro del panel cierra el menú
    menu.addEventListener('click', (event) => {
        if (event.target.closest('a')) setOpen(false);
    });

    // 3. Capa tenue: tocar fuera del panel cierra el menú y devuelve el foco al botón
    scrim?.addEventListener('click', () => {
        setOpen(false);
        menuBtn.focus();
    });

    // 4. Teclado: Escape cierra el menú y devuelve el foco al botón
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isOpen()) {
            setOpen(false);
            menuBtn.focus();
        }
    });

    // 5. Trampa de foco (SM-02): con el panel abierto, Tab desde el último elemento vuelve a la
    //    hamburguesa y Shift+Tab desde la hamburguesa va al último. Con el panel cerrado no actúa.
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab' || !isOpen() || !lastInCycle) return;

        if (event.shiftKey && document.activeElement === menuBtn) {
            event.preventDefault();
            lastInCycle.focus();
        } else if (!event.shiftKey && document.activeElement === lastInCycle) {
            event.preventDefault();
            menuBtn.focus();
        }
    });

    // 6. Al alcanzar el breakpoint de escritorio, el menú móvil se cierra solo
    desktopMedia.addEventListener('change', (event) => {
        if (event.matches && isOpen()) setOpen(false);
    });
}
