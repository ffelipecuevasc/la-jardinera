/**
 * @file subscription.js
 * @description Orquestador de interactividad para la página de Suscripción Floral:
 * - Cross-fade rotativo en el Hero Banner.
 * - Despliegue suave (Reveal / Accordion) de la sección de Planes con scrollIntoView.
 */

export function initSubscription() {
    initHeroCrossFade();
    initPlansAccordion();
}

/**
 * Gestiona el fundido suave infinito de imágenes en el Hero.
 */
function initHeroCrossFade() {
    const bannerCarousel = document.getElementById('banner-carousel');
    if (!bannerCarousel) return;

    const images = bannerCarousel.querySelectorAll('img');
    if (images.length < 2) return;

    let currentIndex = 0;

    setInterval(() => {
        // Desvanecer imagen activa
        images[currentIndex].classList.remove('opacity-100');
        images[currentIndex].classList.add('opacity-0');

        // Avanzar a la siguiente imagen cíclicamente
        currentIndex = (currentIndex + 1) % images.length;

        // Mostrar nueva imagen
        images[currentIndex].classList.remove('opacity-0');
        images[currentIndex].classList.add('opacity-100');
    }, 4000);
}

/**
 * Controla el despliegue animado y contracción de la sección de planes de suscripción.
 */
function initPlansAccordion() {
    const showPlansBtn = document.getElementById('show-plans-btn');
    const hidePlansBtn = document.getElementById('hide-plans-btn');
    const plansSection = document.getElementById('planes');

    if (!plansSection) return;

    if (showPlansBtn) {
        showPlansBtn.addEventListener('click', () => {
            // Revelar sección de planes
            plansSection.classList.remove('h-0', 'opacity-0', 'overflow-hidden');
            plansSection.classList.add('max-h-[3000px]', 'opacity-100');

            // Scroll suave hacia la cabecera de la sección
            setTimeout(() => {
                plansSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        });
    }

    if (hidePlansBtn) {
        hidePlansBtn.addEventListener('click', () => {
            // Volver con scroll suave a la sección de información
            const infoSection = document.getElementById('info-suscripcion');
            if (infoSection) {
                infoSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Colapsar sección tras el inicio del desplazamiento
            setTimeout(() => {
                plansSection.classList.remove('max-h-[3000px]', 'opacity-100');
                plansSection.classList.add('h-0', 'opacity-0', 'overflow-hidden');
            }, 300);
        });
    }
}
