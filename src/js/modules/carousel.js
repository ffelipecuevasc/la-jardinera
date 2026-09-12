import { reviews } from '../data/reviews.js';

export function initCarousel() {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (!track || !prevBtn || !nextBtn) return;

    // Render reviews
    const starSvg = `<svg class="text-[18px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    const verificationBadgeSvg = `<svg class="text-[14px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.49 9.63c-.18-2.79-1.31-5.51-3.43-7.63a12.188 12.188 0 0 0-3.55 7.63c1.28.68 2.46 1.56 3.49 2.63 1.03-1.06 2.21-1.94 3.49-2.63zm-3.44-4.44c.63 1.03 1.07 2.18 1.3 3.38-.47.3-.91.63-1.34.98-.42-.34-.87-.67-1.33-.97.25-1.2.71-2.35 1.37-3.39zM12 15.45a12.11 12.11 0 0 0-3.06-3.2c-.13-.09-.27-.16-.4-.26.13.09.27.17.39.25A11.777 11.777 0 0 0 2 10c0 5.32 3.36 9.82 8.03 11.49.63.23 1.29.4 1.97.51.68-.12 1.33-.29 1.97-.51C18.64 19.82 22 15.32 22 10c-4.18 0-7.85 2.17-10 5.45zm1.32 4.15c-.44.15-.88.27-1.33.37-.44-.09-.87-.21-1.28-.36-3.29-1.18-5.7-3.99-6.45-7.35 1.1.26 2.15.71 3.12 1.33l-.02.01c.13.09.26.18.39.25l.07.04c.99.72 1.84 1.61 2.51 2.65L12 19.1l1.67-2.55a10.19 10.19 0 0 1 2.53-2.66l.07-.05c.09-.05.18-.11.27-.17l-.01-.02c.98-.65 2.07-1.13 3.21-1.4-.75 3.37-3.15 6.18-6.42 7.35zm-4.33-7.32c-.02-.01-.04-.03-.05-.04 0 0 .01 0 .01.01.01.01.02.02.04.03z"/></svg>`;

    const generateCardHtml = (review) => {
        let stars = starSvg.repeat(review.rating);
        return `
    <div class="flex flex-col justify-between bg-surface p-space-6 rounded-2xl shadow-sm border border-outline-variant/30 flex-none min-w-[300px] w-[85vw] md:w-[380px] snap-center hover:shadow-md transition-shadow">
        <div>
            <div class="flex items-center justify-between mb-space-4">
                <div class="flex text-warning" aria-label="Calificación de ${review.rating} estrellas">
                    ${stars}
                </div>
                <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-secondary uppercase tracking-wider bg-secondary/10 px-2.5 py-1 rounded-full">
                    ${verificationBadgeSvg} Google Review
                </span>
            </div>
            <p class="font-headline-sm text-headline-sm italic text-on-surface mb-space-4 leading-relaxed opacity-90">
                "${review.text}"
            </p>
        </div>
        <div class="pt-space-4 border-t border-outline-variant/30 flex items-center justify-between">
            <h4 class="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">${review.author}</h4>
            <span class="text-[12px] text-on-surface-variant font-medium">${review.date}</span>
        </div>
    </div>`;
    };

    track.innerHTML = reviews.map(generateCardHtml).join('');

    // Carousel scrolling logic
    const scrollAmount = () => {
        const firstCard = track.firstElementChild;
        // gap is space-4 (2rem / 32px) according to tailwind config
        return firstCard ? firstCard.clientWidth + 32 : 380; 
    };

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
}
