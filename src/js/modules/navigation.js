/**
 * src/js/modules/navigation.js
 * Arquitectura: ES6 Modular | Frontend nativo
 * Descripción: Menú móvil (panel anclado bajo el header) con cierre por teclado,
 *              capa tenue, cambio de ícono y semántica ARIA dinámica.
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

    // 1. Botón de menú: alterna el estado
    menuBtn.addEventListener('click', () => setOpen(!isOpen()));

    // 2. Delegación de eventos: cualquier enlace dentro del panel cierra el menú
    menu.addEventListener('click', (event) => {
        if (event.target.closest('a')) setOpen(false);
    });

    // 3. Capa tenue: tocar fuera del panel cierra el menú
    scrim?.addEventListener('click', () => setOpen(false));

    // 4. Teclado: Escape cierra el menú y devuelve el foco al botón
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isOpen()) {
            setOpen(false);
            menuBtn.focus();
        }
    });

    // 5. Al alcanzar el breakpoint de escritorio, el menú móvil se cierra solo
    desktopMedia.addEventListener('change', (event) => {
        if (event.matches && isOpen()) setOpen(false);
    });
}
