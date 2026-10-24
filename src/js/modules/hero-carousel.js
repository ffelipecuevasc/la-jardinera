/**
 * @file hero-carousel.js
 * @description Carrusel automático del hero del Inicio (ADR-004):
 * - Avanza cada 7 s; la foto entrante llega desde la derecha y la saliente sale por la izquierda (1 s, input.css).
 * - Pausa automática solo con la pestaña en segundo plano o con el hero fuera de pantalla (D-04).
 * - Botón de pausa/reanudación (WCAG 2.2.2, D-03): la pausa del usuario prevalece sobre las reanudaciones automáticas.
 * - Movimiento reducido (D-05): foto 1 fija, sin rotación y sin botón; escucha el cambio de la preferencia.
 * - Las fotos 2 a 4 se muestran (y por lo tanto se descargan) recién después del evento load.
 */

const INTERVALO_MS = 7000;
const TRANSICION_MS = 1000; // Igual a la duración de .hero-slide en input.css.
const ETIQUETA_PAUSAR = 'Pausar presentación de imágenes';
const ETIQUETA_REANUDAR = 'Reanudar presentación de imágenes';

export function initHeroCarousel() {
    const hero = document.getElementById('titular');
    if (!hero) return;

    const slides = Array.from(hero.querySelectorAll('.hero-slide'));
    const toggle = document.getElementById('hero-carousel-toggle');
    if (slides.length < 2 || !toggle) return;

    const iconPause = toggle.querySelector('.hero-carousel-icon-pause');
    const iconPlay = toggle.querySelector('.hero-carousel-icon-play');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let current = 0;
    let timer = null;
    let busy = false;
    let pausedByUser = false;
    let heroVisible = true;
    let ready = false; // true cuando las fotos 2 a 4 ya están habilitadas (después de load).

    const canRun = () => ready && !reducedMotion.matches && !pausedByUser && heroVisible
        && document.visibilityState === 'visible';

    function stopTimer() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    function startTimer() {
        if (timer || !canRun()) return;
        timer = setTimeout(() => {
            timer = null;
            advance();
        }, INTERVALO_MS);
    }

    function advance() {
        if (busy || !canRun()) return;
        busy = true;

        const leaving = slides[current];
        current = (current + 1) % slides.length;
        const entering = slides[current];

        // La entrante parte a la derecha sin animación (por si quedó a la izquierda en otro ciclo).
        entering.classList.add('is-instant');
        entering.classList.remove('is-leaving');
        entering.removeAttribute('aria-hidden');
        void entering.offsetWidth; // Fuerza el cálculo para que la transición arranque desde la derecha.
        entering.classList.remove('is-instant');

        leaving.classList.remove('is-active');
        leaving.classList.add('is-leaving');
        leaving.setAttribute('aria-hidden', 'true');
        entering.classList.add('is-active');

        // El intervalo de 7 s se cuenta entre el inicio de dos transiciones.
        startTimer();

        setTimeout(() => {
            leaving.classList.add('is-instant');
            leaving.classList.remove('is-leaving');
            void leaving.offsetWidth;
            leaving.classList.remove('is-instant');
            busy = false;
        }, TRANSICION_MS);
    }

    function renderToggle() {
        toggle.setAttribute('aria-label', pausedByUser ? ETIQUETA_REANUDAR : ETIQUETA_PAUSAR);
        iconPause.classList.toggle('hidden', pausedByUser);
        iconPlay.classList.toggle('hidden', !pausedByUser);
    }

    // Movimiento reducido: vuelve a la foto 1, sin animación, y oculta el botón.
    function applyMotionPreference() {
        if (reducedMotion.matches) {
            stopTimer();
            slides.forEach((slide, i) => {
                slide.classList.add('is-instant');
                slide.classList.remove('is-leaving');
                slide.classList.toggle('is-active', i === 0);
                if (i > 0) slide.hidden = true;
            });
            slides[0].removeAttribute('aria-hidden');
            current = 0;
            busy = false;
            toggle.classList.add('hidden');
            return;
        }
        if (!ready) return;
        slides.forEach((slide, i) => {
            slide.classList.remove('is-instant');
            slide.hidden = false;
            if (i !== current) slide.setAttribute('aria-hidden', 'true');
        });
        toggle.classList.remove('hidden');
        startTimer();
    }

    toggle.addEventListener('click', () => {
        pausedByUser = !pausedByUser;
        renderToggle();
        if (pausedByUser) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    // 1. Pausa con la pestaña en segundo plano (mismo patrón que subscription.js).
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            startTimer();
        } else {
            stopTimer();
        }
    });

    // 2. Pausa con el hero fuera de pantalla.
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                heroVisible = entry.isIntersecting;
                if (heroVisible) {
                    startTimer();
                } else {
                    stopTimer();
                }
            });
        }, { threshold: 0.1 });
        observer.observe(hero);
    }

    reducedMotion.addEventListener('change', applyMotionPreference);

    // Las fotos 2 a 4 se habilitan después de load: no compiten con la foto 1 (LCP).
    const enable = () => {
        ready = true;
        renderToggle();
        applyMotionPreference();
    };
    if (document.readyState === 'complete') {
        enable();
    } else {
        window.addEventListener('load', enable, { once: true });
    }
}
