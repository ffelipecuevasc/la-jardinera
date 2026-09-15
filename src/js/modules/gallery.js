/**
 * @file gallery.js
 * @description Orquestador de interactividad, rendimiento y accesibilidad WCAG 2.1 para la Página de Galería:
 * - IntersectionObserver para pausar videos de cuadrícula fuera del viewport y ahorrar GPU/batería.
 * - Lightbox multimodal dinámico (imágenes y videos) con controles nativos accesibles.
 * - Silenciado inmediato de audio al cerrar (corrección de fuga acústica QA).
 * - Focus Trap estricto con ciclado en controles del visor y restauración de foco al botón de apertura.
 * - Ocultamiento semántico y funcional del fondo (inert y aria-hidden) mientras el modal permanece activo.
 * - Navegación universal por teclado (Escape, Tabulador, Flechas de dirección).
 */

export function initGallery() {
    const lightbox = document.getElementById('lightbox');
    const cards = Array.from(document.querySelectorAll('.gallery-carousel-card, [data-type][data-src]'));

    // Guard clause: verificar presencia en la vista actual
    if (!lightbox || cards.length === 0) return;

    initGridVideoObserver(cards);
    initLightboxController(lightbox, cards);
}

/**
 * Optimiza la reproducción de videos en la cuadrícula de acordeón.
 * Pausa la reproducción cuando el video sale del viewport y la reanuda cuando entra.
 * @param {HTMLElement[]} cards
 */
function initGridVideoObserver(cards) {
    const gridVideos = [];
    cards.forEach((card) => {
        const v = card.querySelector('video');
        if (v) gridVideos.push(v);
    });

    if (gridVideos.length === 0) return;

    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(() => {
                        // Reproducción automática controlada por el navegador
                    });
                } else {
                    video.pause();
                }
            });
        }, {
            threshold: 0.1
        });

        gridVideos.forEach((video) => videoObserver.observe(video));

        // Pausar reproducción cuando la pestaña pasa a segundo plano
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                gridVideos.forEach((v) => v.pause());
            }
        });
    }
}

/**
 * Controlador principal y accesible del Lightbox multimodal.
 * @param {HTMLElement} lightbox
 * @param {HTMLElement[]} cards
 */
function initLightboxController(lightbox, cards) {
    const lightboxContent = document.getElementById('lightbox-content');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!lightboxContent) return;

    let currentIndex = 0;
    let isOpen = false;
    let lastActiveElement = null;

    /**
     * Obtiene los elementos estructurales de fondo para aislarlos semántica y funcionalmente.
     * @returns {HTMLElement[]}
     */
    function getBackgroundElements() {
        const candidates = [
            document.querySelector('header'),
            document.querySelector('main'),
            document.querySelector('footer'),
            ...document.querySelectorAll('section:not(#lightbox)')
        ];
        return candidates.filter(Boolean);
    }

    /**
     * Aplica inert y aria-hidden al contenido de fondo para blindar lectores de pantalla.
     */
    function lockBackground() {
        getBackgroundElements().forEach((el) => {
            el.setAttribute('inert', '');
            el.setAttribute('aria-hidden', 'true');
        });
    }

    /**
     * Remueve inert y aria-hidden del contenido de fondo.
     */
    function unlockBackground() {
        getBackgroundElements().forEach((el) => {
            el.removeAttribute('inert');
            el.removeAttribute('aria-hidden');
        });
    }

    /**
     * Inyecta el nodo correspondiente al elemento actual en el Lightbox.
     * Destruye cualquier nodo previo para liberar memoria y evitar audio residual.
     * @param {number} index
     */
    function renderMedia(index) {
        // Silenciar y destruir cualquier nodo multimedia existente
        const oldVideo = lightboxContent.querySelector('video');
        if (oldVideo) {
            oldVideo.pause();
            oldVideo.src = '';
        }
        lightboxContent.innerHTML = '';

        const card = cards[index];
        if (!card) return;

        const type = card.getAttribute('data-type');
        const src = card.getAttribute('data-src');
        const altText = card.querySelector('img')?.getAttribute('alt') ||
                        card.getAttribute('aria-label') ||
                        'Elemento de galería';

        if (type === 'video') {
            const video = document.createElement('video');
            video.src = src;
            video.autoplay = true;
            video.controls = true;
            video.playsInline = true;
            video.className = 'max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl transition-all duration-300';
            lightboxContent.appendChild(video);
            video.play().catch(() => {});
        } else {
            const img = document.createElement('img');
            img.src = src;
            img.alt = altText;
            img.loading = 'eager';
            img.className = 'max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl transition-all duration-300';
            lightboxContent.appendChild(img);
        }
    }

    /**
     * Abre el visor Lightbox en el índice seleccionado, gestionando el foco y semántica ARIA.
     * @param {number} index
     */
    function openLightbox(index) {
        lastActiveElement = document.activeElement;
        currentIndex = index;
        isOpen = true;

        // 1. Bloquear scroll global y contenido de fondo
        document.body.style.overflow = 'hidden';
        lockBackground();

        // 2. Actualizar semántica ARIA del diálogo
        lightbox.setAttribute('aria-hidden', 'false');

        // 3. Mostrar contenedor y activar transición de opacidad
        lightbox.classList.remove('hidden');
        requestAnimationFrame(() => {
            lightbox.classList.remove('opacity-0');
            lightbox.classList.add('opacity-100');
        });

        // 4. Renderizar contenido multimedia
        renderMedia(currentIndex);

        // 5. Focus Management: posicionar foco de teclado en el botón de cierre
        requestAnimationFrame(() => {
            closeBtn?.focus();
        });
    }

    /**
     * Cierra el visor Lightbox, silencia el audio de inmediato y restaura el foco al activador.
     */
    function closeLightbox() {
        if (!isOpen) return;
        isOpen = false;

        // RESOLUCIÓN QA WARNING: Silenciado y pausa INMEDIATA del video antes de la animación
        const currentVideo = lightboxContent.querySelector('video');
        if (currentVideo) {
            currentVideo.pause();
            currentVideo.muted = true;
        }

        // 1. Actualizar estado ARIA y restaurar accesibilidad del fondo
        lightbox.setAttribute('aria-hidden', 'true');
        unlockBackground();

        // 2. Iniciar animación de salida
        lightbox.classList.remove('opacity-100');
        lightbox.classList.add('opacity-0');

        // 3. Restaurar scroll del body
        document.body.style.overflow = '';

        // 4. Restauración de foco inmediata al elemento disparador
        if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
            lastActiveElement.focus();
        }

        // 5. Destrucción final del nodo al concluir la transición CSS
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightboxContent.innerHTML = '';
        }, 300);
    }

    /**
     * Navega en la dirección especificada de forma circular.
     * @param {number} direction -1 para anterior, 1 para siguiente
     */
    function navigate(direction) {
        if (!isOpen) return;
        currentIndex = (currentIndex + direction + cards.length) % cards.length;
        renderMedia(currentIndex);
    }

    /**
     * Implementa Focus Trap estricto para mantener el foco dentro del Lightbox.
     * @param {KeyboardEvent} e
     */
    function handleFocusTrap(e) {
        if (e.key !== 'Tab') return;

        const focusableElements = lightbox.querySelectorAll(
            'button:not([disabled]), [tabindex]:not([tabindex="-1"]), video[controls]'
        );
        const focusable = Array.from(focusableElements).filter(
            (el) => el.offsetParent !== null || el.offsetWidth > 0 || el.offsetHeight > 0
        );

        if (focusable.length === 0) return;

        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }

    // 1. Conectar eventos de clic en las tarjetas
    cards.forEach((card, idx) => {
        card.addEventListener('click', () => openLightbox(idx));
    });

    // 2. Conectar botón de cierre
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    }

    // 3. Conectar botón anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigate(-1);
        });
    }

    // 4. Conectar botón siguiente
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigate(1);
        });
    }

    // 5. Cierre al hacer clic en el backdrop exterior
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Evitar que clics sobre el contenido multimedia cierren el visor
    lightboxContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // 6. Listeners globales de teclado (Atajos universales y Focus Trap)
    document.addEventListener('keydown', (e) => {
        if (!isOpen) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigate(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigate(1);
        } else if (e.key === 'Tab') {
            handleFocusTrap(e);
        }
    });
}
