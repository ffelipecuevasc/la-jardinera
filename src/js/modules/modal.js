/**
 * Módulo de Modales - La Jardinera Florería
 * Controla la interacción, accesibilidad (Focus Trap, Esc), animación SVG y renderizado dinámico.
 */
import { servicesData } from '../data/services.js';

export function initModal() {
    initGenericModals();
    initServiceModal();
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
 * Manejo del Modal de Detalle de Servicios con Inyección Dinámica (MVC) y Animación SVG
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
    const svgCircle = serviceModal.querySelector('#modal-svg-circle') || serviceModal.querySelector('.modal-border');

    let previouslyFocusedBtn = null;
    const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

    const openModal = (serviceId, triggerBtn) => {
        const service = servicesData[serviceId];
        if (!service) {
            console.error(`[modal.js] Servicio no encontrado para ID: "${serviceId}"`);
            return;
        }

        previouslyFocusedBtn = triggerBtn;

        // 1. Inyección de contenido dinámico
        if (modalTitle) modalTitle.textContent = service.title;
        if (modalMainImage) {
            modalMainImage.src = service.mainImage;
            modalMainImage.alt = service.title;
        }
        if (modalDescription) modalDescription.innerHTML = service.description;

        // 2. Galería dinámica con clases Anti-CLS y Lazy Loading
        if (modalGalleryContainer) {
            modalGalleryContainer.innerHTML = '';
            if (Array.isArray(service.gallery) && service.gallery.length > 0) {
                service.gallery.forEach((imgSrc, index) => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = `${service.title} - Fotografía ${index + 1}`;
                    img.loading = 'lazy';
                    img.width = 200;
                    img.height = 200;
                    img.className = 'w-full aspect-square object-cover rounded-lg shadow-sm hover:opacity-90 transition-opacity';
                    modalGalleryContainer.appendChild(img);
                });
            }
        }

        // 3. CTA dinámico con parámetro de servicio
        if (modalCotizarBtn) {
            modalCotizarBtn.href = `./contacto.html?service=${encodeURIComponent(service.title)}`;
        }

        // 4. Mostrar modal con animación de entrada
        serviceModal.classList.remove('hidden');
        serviceModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');

        requestAnimationFrame(() => {
            serviceModal.classList.remove('opacity-0');
            if (panel) panel.classList.remove('translate-y-full');
        });

        // 5. Microinteracción SVG: Animar el anillo trazando stroke-dashoffset a 0
        if (svgCircle) {
            setTimeout(() => {
                svgCircle.style.strokeDashoffset = '0';
            }, 50);
        }

        // 6. Accesibilidad y Focus Trap
        const focusableElements = serviceModal.querySelectorAll(focusableElementsString);
        if (focusableElements.length > 0) {
            // Foco inicial en el botón de cerrar o primer elemento
            closeBtn?.focus() || focusableElements[0].focus();
        }

        document.addEventListener('keydown', onKeyDown);
    };

    const closeModal = () => {
        // 1. Resetear animación del anillo SVG a 578
        if (svgCircle) {
            svgCircle.style.strokeDashoffset = '578';
        }

        // 2. Transición de salida
        serviceModal.classList.add('opacity-0');
        if (panel) panel.classList.add('translate-y-full');

        setTimeout(() => {
            serviceModal.classList.add('hidden');
            serviceModal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('overflow-hidden');

            if (previouslyFocusedBtn) {
                previouslyFocusedBtn.focus();
                previouslyFocusedBtn = null;
            }
        }, 300);

        document.removeEventListener('keydown', onKeyDown);
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
