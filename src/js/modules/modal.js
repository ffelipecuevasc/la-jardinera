/**
 * Módulo de Modales - La Jardinera Florería
 * Controla la interacción, accesibilidad WCAG 2.1 (Focus Trap, Esc, inert / aria-hidden),
 * animación SVG y renderizado dinámico con soporte total para Dark Mode.
 */
import { servicesData } from '../data/services.js';

export function initModal() {
    initGenericModals();
    initServiceModal();
}

/**
 * Aplica o remueve inert y aria-hidden a los contenedores de fondo
 * para aislar completamente el modal de lectores de pantalla.
 */
function setBackgroundAriaHidden(isHidden) {
    const backgroundElements = document.querySelectorAll('header, main, footer');
    backgroundElements.forEach(el => {
        if (isHidden) {
            el.setAttribute('aria-hidden', 'true');
            if ('inert' in el) {
                el.inert = true;
            } else {
                el.setAttribute('inert', '');
            }
        } else {
            el.removeAttribute('aria-hidden');
            if ('inert' in el) {
                el.inert = false;
            }
            el.removeAttribute('inert');
        }
    });
}

/**
 * Manejo de modales genéricos mediante data-modal-target (ej. Contact Modal)
 */
function initGenericModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    if (modalTriggers.length === 0) return;

    let activeModal = null;
    let previouslyFocusedElement = null;
    const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        previouslyFocusedElement = document.activeElement;
        activeModal = modal;

        // Ocultar fondo a lectores de pantalla (WCAG 2.1)
        setBackgroundAriaHidden(true);

        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');

        const focusableElements = modal.querySelectorAll(focusableElementsString);
        if (focusableElements.length) {
            focusableElements[0].focus();
        } else {
            modal.querySelector('.modal-panel')?.focus();
        }

        const closeBtns = modal.querySelectorAll('.modal-close, .close-modal-btn');
        closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
        
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) overlay.addEventListener('click', closeModal);
        
        document.addEventListener('keydown', handleEscape);
        modal.addEventListener('keydown', trapTabKey);
    };

    const closeModal = () => {
        if (!activeModal) return;

        // Restaurar visibilidad del fondo para lectores de pantalla
        setBackgroundAriaHidden(false);

        activeModal.classList.add('hidden');
        activeModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overflow-hidden');

        const closeBtns = activeModal.querySelectorAll('.modal-close, .close-modal-btn');
        closeBtns.forEach(btn => btn.removeEventListener('click', closeModal));
        
        const overlay = activeModal.querySelector('.modal-overlay');
        if (overlay) overlay.removeEventListener('click', closeModal);
        
        document.removeEventListener('keydown', handleEscape);
        activeModal.removeEventListener('keydown', trapTabKey);

        if (previouslyFocusedElement) previouslyFocusedElement.focus();
        activeModal = null;
    };

    const handleEscape = (e) => {
        if (e.key === 'Escape') closeModal();
    };

    const trapTabKey = (e) => {
        if (e.key !== 'Tab') return;
        const focusableElements = activeModal.querySelectorAll(focusableElementsString);
        if (focusableElements.length === 0) return;

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    };

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-modal-target');
            if (targetId) openModal(targetId);
        });
    });
}

/**
 * Manejo del Modal de Detalle de Servicios con Inyección Dinámica (MVC), Focus Trap y Animación SVG
 */
function initServiceModal() {
    const serviceModal = document.getElementById('service-modal');
    if (!serviceModal) return;

    const openButtons = document.querySelectorAll('.open-modal-btn');
    if (openButtons.length === 0) return;

    const closeBtn = serviceModal.querySelector('.close-modal-btn');
    const overlay = serviceModal.querySelector('.modal-overlay');
    const panel = serviceModal.querySelector('.modal-panel');

    const modalTitle = document.getElementById('modal-title');
    const modalMainImage = document.getElementById('modal-main-image');
    const modalDescription = document.getElementById('modal-description');
    const modalGalleryContainer = document.getElementById('modal-gallery-container');
    const modalCotizarBtn = document.getElementById('modal-cotizar-btn');
    const modalGallerySection = document.getElementById('modal-gallery-section');

    let previouslyFocusedBtn = null;
    let closeTimeout = null;
    const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

    const openModal = (serviceId, triggerBtn) => {
        const service = servicesData[serviceId];
        if (!service) {
            console.error(`[modal.js] Servicio no encontrado para ID: "${serviceId}"`);
            return;
        }

        previouslyFocusedBtn = triggerBtn;

        // Cancela un cierre en curso. Sin esto, reabrir la modal antes de
        // que terminen los 300ms de la animación de salida deja vivo el
        // temporizador anterior, que vuelve a ocultar la ventana recién
        // abierta. Es una condición de carrera real, no teórica.
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            closeTimeout = null;
        }

        // 1. Inyección de contenido dinámico
        if (modalTitle) modalTitle.textContent = service.title;
        if (modalMainImage) {
            modalMainImage.src = service.mainImage;
            modalMainImage.alt = service.title;
        }
        if (modalDescription) modalDescription.innerHTML = service.description;

        // 2. Galería dinámica: envoltorio con recorte + zoom al pasar el
        //    cursor, el mismo lenguaje que las tarjetas de la página.
        if (modalGalleryContainer) {
            modalGalleryContainer.innerHTML = '';
            const hasGallery = Array.isArray(service.gallery) && service.gallery.length > 0;

            // Ajusta las columnas al número real de fotos: una galería de dos
            // imágenes en una rejilla de cuatro deja media fila vacía.
            modalGalleryContainer.className =
                `grid grid-cols-2 gap-space-2 sm:grid-cols-${Math.min(service.gallery?.length || 2, 4)}`;

            if (hasGallery) {
                service.gallery.forEach((imgSrc, index) => {
                    const frame = document.createElement('div');
                    frame.className = 'group/thumb relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-container border border-outline-variant/20';

                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = `${service.title} — fotografía ${index + 1}`;
                    img.loading = 'lazy';
                    img.width = 400;
                    img.height = 500;
                    img.className = 'w-full h-full object-cover transition-transform duration-700 ease-out group-hover/thumb:scale-105';

                    frame.appendChild(img);
                    modalGalleryContainer.appendChild(frame);
                });
            }

            // Si un servicio no trae galería, se oculta también el titular
            // de la sección en vez de dejar un encabezado huérfano.
            if (modalGallerySection) {
                modalGallerySection.classList.toggle('hidden', !hasGallery);
            }
        }

        // 3. CTA dinámico con parámetro de servicio
        if (modalCotizarBtn) {
            modalCotizarBtn.href = `./contacto.html?service=${encodeURIComponent(service.title)}`;
        }

        // 4. Bloqueo de Screen Readers en fondo (WCAG 2.1)
        setBackgroundAriaHidden(true);

        // 5. Mostrar modal con animación de entrada
        serviceModal.classList.remove('hidden');
        serviceModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');

        requestAnimationFrame(() => {
            serviceModal.classList.remove('opacity-0');
            if (panel) panel.classList.remove('translate-y-full');
        });


        // 7. Focus Trap: Foco inicial inmediato en el botón de cierre
        requestAnimationFrame(() => {
            if (closeBtn) {
                closeBtn.focus();
            } else {
                const focusable = serviceModal.querySelectorAll(focusableElementsString);
                if (focusable.length > 0) focusable[0].focus();
            }
        });

        document.addEventListener('keydown', onKeyDown);
    };

    const closeModal = () => {
        // 1. Transición de salida
        serviceModal.classList.add('opacity-0');
        if (panel) panel.classList.add('translate-y-full');

        document.removeEventListener('keydown', onKeyDown);

        closeTimeout = setTimeout(() => {
            serviceModal.classList.add('hidden');
            serviceModal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('overflow-hidden');

            // 2. El fondo se devuelve a los lectores de pantalla DESPUÉS de
            //    que la modal desaparece, no antes. Restaurarlo al inicio
            //    dejaba 300ms en que el fondo era navegable con la ventana
            //    todavía en pantalla.
            setBackgroundAriaHidden(false);

            if (previouslyFocusedBtn) {
                previouslyFocusedBtn.focus();
                previouslyFocusedBtn = null;
            }

            closeTimeout = null;
        }, 300);
    };

    const onKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            return;
        }

        if (e.key === 'Tab') {
            const focusableElements = serviceModal.querySelectorAll(focusableElementsString);
            if (focusableElements.length === 0) return;

            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    };

    // Registrar listeners
    openButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceId = btn.getAttribute('data-service-id');
            if (serviceId) {
                openModal(serviceId, btn);
            }
        });
    });

    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);
}
