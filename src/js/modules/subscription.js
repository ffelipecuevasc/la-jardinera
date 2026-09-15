/**
 * @file subscription.js
 * @description Orquestador de interactividad y accesibilidad para la página de Suscripción Floral:
 * - Cross-fade optimizado con IntersectionObserver y visibilityState en el Hero Banner.
 * - Despliegue suave (Reveal / Accordion) con CSS Grid (0fr -> 1fr).
 * - Focus Management guiado hacia el lector de pantalla y teclado.
 * - Sincronización de atributos accesibles aria-expanded y aria-hidden.
 */

export function initSubscription() {
    initHeroCrossFade();
    initPlansAccordion();
}

/**
 * Gestiona el fundido suave infinito de imágenes en el Hero,
 * pausando la ejecución cuando el elemento no es visible o la pestaña está en segundo plano.
 */
function initHeroCrossFade() {
    const bannerCarousel = document.getElementById('banner-carousel');
    if (!bannerCarousel) return;

    const images = bannerCarousel.querySelectorAll('img');
    if (images.length < 2) return;

    let currentIndex = 0;
    let timer = null;
    let isElementVisible = true;

    function nextSlide() {
        images[currentIndex].classList.remove('opacity-100');
        images[currentIndex].classList.add('opacity-0');

        currentIndex = (currentIndex + 1) % images.length;

        images[currentIndex].classList.remove('opacity-0');
        images[currentIndex].classList.add('opacity-100');
    }

    function startTimer() {
        if (!timer && isElementVisible && document.visibilityState === 'visible') {
            timer = setInterval(nextSlide, 4000);
        }
    }

    function stopTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    // 1. Pausa cuando la pestaña está en segundo plano
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            startTimer();
        } else {
            stopTimer();
        }
    });

    // 2. Pausa cuando el Hero se desplaza fuera del viewport
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                isElementVisible = entry.isIntersecting;
                if (isElementVisible) {
                    startTimer();
                } else {
                    stopTimer();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(bannerCarousel);
    } else {
        startTimer();
    }
}

/**
 * Controla el acordeón suave de la sección de planes, la gestión de foco y atributos ARIA.
 */
function initPlansAccordion() {
    const showPlansBtn = document.getElementById('show-plans-btn');
    const hidePlansBtn = document.getElementById('hide-plans-btn');
    const plansSection = document.getElementById('planes');
    const planesTitle = document.getElementById('planes-title');

    if (!plansSection) return;

    if (showPlansBtn) {
        showPlansBtn.addEventListener('click', () => {
            // 1. Expandir sección mediante CSS Grid y Opacidad
            plansSection.classList.add('is-expanded', 'opacity-100');
            plansSection.classList.remove('opacity-0');

            // 2. Actualizar semántica ARIA
            showPlansBtn.setAttribute('aria-expanded', 'true');
            plansSection.setAttribute('aria-hidden', 'false');

            // 3. Scroll suave hacia los planes
            setTimeout(() => {
                plansSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);

            // 4. Focus Management: Guiar lector de pantalla al título de la sección
            setTimeout(() => {
                planesTitle?.focus();
            }, 750);
        });
    }

    if (hidePlansBtn) {
        hidePlansBtn.addEventListener('click', () => {
            // 1. Desplazamiento suave hacia la sección de información
            const infoSection = document.getElementById('info-suscripcion');
            if (infoSection) {
                infoSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // 2. Colapsar acordeón y actualizar atributos ARIA
            plansSection.classList.remove('is-expanded', 'opacity-100');
            plansSection.classList.add('opacity-0');
            showPlansBtn?.setAttribute('aria-expanded', 'false');
            plansSection.setAttribute('aria-hidden', 'true');

            // 3. Focus Management: Devolver el foco al botón original
            setTimeout(() => {
                showPlansBtn?.focus();
            }, 750);
        });
    }
}
