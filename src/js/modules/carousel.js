import {reviews} from '../data/reviews.js';

export function initCarousel() {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const counter = document.getElementById('carousel-counter');

    if (!track || !prevBtn || !nextBtn) return;

    const starSvg = `<svg class="text-[16px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;

    const getInitial = (name) => name.trim().charAt(0).toUpperCase();

    // Render de cada reseña
    const generateCardHtml = (review) => {
        const stars = starSvg.repeat(review.rating);
        return `
    <div role="listitem" class="flex flex-col justify-between bg-surface p-space-4 rounded-xl shadow-sm border border-outline-variant/20 flex-none min-w-[300px] w-[85vw] md:w-[380px] snap-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div>
            <div class="flex items-center justify-between mb-space-3">
                <div class="flex items-center text-warning gap-0.5" aria-label="Calificación de ${review.rating} de 5 estrellas">
                    ${stars}
                </div>
                <img src="./public/icons/google.svg" alt="Google" class="h-4 w-auto opacity-90" width="97" height="32" loading="lazy"/>
            </div>
            <p class="font-headline-sm text-body-md text-on-surface italic leading-relaxed line-clamp-6">
                ${review.text}
            </p>
        </div>
        <div class="flex items-center gap-space-2 mt-space-4 pt-space-3 border-t border-outline-variant/30">
            <div class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-label-md text-label-md font-semibold flex-shrink-0">
                ${getInitial(review.author)}
            </div>
            <div class="flex flex-col min-w-0">
                <h4 class="font-label-md text-label-md text-on-surface truncate">${review.author}</h4>
                <span class="font-body-xs text-body-xs text-on-surface-variant">${review.date}</span>
            </div>
        </div>
    </div>`;
    };

    track.innerHTML = reviews.map(generateCardHtml).join('');

    // Lógica de scroll del carrusel
    const scrollAmount = () => {
        const firstCard = track.firstElementChild;
        // el gap es space-4 (2rem / 32px) según tailwind.config.js
        return firstCard ? firstCard.clientWidth + 32 : 380;
    };

    // Contador sincronizado con la posición real de scroll
    const updateCounter = () => {
        if (!counter) return;
        const amount = scrollAmount();
        const index = amount ? Math.round(track.scrollLeft / amount) : 0;
        const current = Math.min(reviews.length, index + 1);
        counter.textContent = `${String(current).padStart(2, '0')} / ${String(reviews.length).padStart(2, '0')}`;
    };

    let scrollTimeout;
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateCounter, 100);
    });

    prevBtn.addEventListener('click', () => {
        track.scrollBy({left: -scrollAmount(), behavior: 'smooth'});
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({left: scrollAmount(), behavior: 'smooth'});
    });

    updateCounter();
}