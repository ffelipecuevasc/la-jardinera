export function initCarousel() {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = () => {
        const firstCard = track.firstElementChild;
        return firstCard ? firstCard.clientWidth + 16 : 300; // 16px gap (space-4) roughly
    };

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
}
