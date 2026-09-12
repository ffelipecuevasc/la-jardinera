import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initCarousel } from './modules/carousel.js';
import { initModal } from './modules/modal.js';
import { initSubscription } from './modules/subscription.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initCarousel();
    initModal();
    initSubscription();
});
