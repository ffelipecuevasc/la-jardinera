/**
 * @file gallery.js
 * @description Orquestador del motor JavaScript para la Página de Galería:
 * - IntersectionObserver para pausar videos de la cuadrícula fuera del viewport y ahorrar CPU/batería.
 * - Lightbox multimodal dinámico (imágenes y videos) con controles nativos.
 * - Navegación secuencial circular (Prev / Next) y soporte de teclado (Escape, Flechas).
 * - Destrucción completa de nodos del DOM al cerrar para evitar fugas de memoria y audio residual.
 */

export function initGallery() {
    const lightbox = document.getElementById('lightbox');
    const cards = Array.from(document.querySelectorAll('.gallery-carousel-card, [data-type][data-src]'));

    // Guard clause: si no estamos en la página de galería o no hay tarjetas
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
    cards.forEach(card => {
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
                        // Reproducción automática bloqueada por el navegador hasta interacción
                    });
                } else {
                    video.pause();
                }
            });
        }, {
            threshold: 0.1
        });

        gridVideos.forEach(video => videoObserver.observe(video));

        // Pausa cuando la pestaña pasa a segundo plano
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                gridVideos.forEach(v => v.pause());
            }
        });
    }
}

/**
 * Controlador principal del Lightbox multimodal.
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

    /**
     * Inyecta el nodo correspondiente al elemento actual en el Lightbox.
     * Destruye cualquier nodo previo para liberar memoria y evitar audio residual.
     * @param {number} index
     */
    function renderMedia(index) {
        // Destrucción inmediata del nodo multimedia previo
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
     * Abre el visor Lightbox en el índice seleccionado.
     * @param {number} index
     */
    function openLightbox(index) {
        currentIndex = index;
        isOpen = true;

        // Bloquear scroll global del documento
        document.body.style.overflow = 'hidden';

        // Mostrar contenedor y realizar transición de opacidad
        lightbox.classList.remove('hidden');
        requestAnimationFrame(() => {
            lightbox.classList.remove('opacity-0');
            lightbox.classList.add('opacity-100');
        });

        renderMedia(currentIndex);
    }

    /**
     * Cierra el visor Lightbox y destruye el contenido para evitar consumo de memoria.
     */
    function closeLightbox() {
        if (!isOpen) return;
        isOpen = false;

        lightbox.classList.remove('opacity-100');
        lightbox.classList.add('opacity-0');

        // Restaurar el scroll del body
        document.body.style.overflow = '';

        setTimeout(() => {
            lightbox.classList.add('hidden');
            // Destrucción garantizada del nodo de video/imagen
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

    // 5. Cierre al hacer clic en el backdrop/overlay
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Evitar que clics dentro del contenido multimedia cierren el modal
    lightboxContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // 6. Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (!isOpen) return;
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigate(-1);
        } else if (e.key === 'ArrowRight') {
            navigate(1);
        }
    });
}
