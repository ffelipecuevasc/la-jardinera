export function initModal() {
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
        document.body.classList.add('overflow-hidden'); // Scroll lock

        // Focus trap
        const focusableElements = modal.querySelectorAll(focusableElementsString);
        if (focusableElements.length) {
            focusableElements[0].focus();
        } else {
            modal.querySelector('.modal-panel')?.focus();
        }

        // Attach listeners for closing
        const closeBtns = modal.querySelectorAll('.modal-close');
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

        // Clean up listeners
        const closeBtns = activeModal.querySelectorAll('.modal-close');
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
