import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initCarousel } from './modules/carousel.js';
import { initModal } from './modules/modal.js';
import { initSubscription } from './modules/subscription.js';
import { initGallery } from './modules/gallery.js';
import { initContactForm } from './modules/contact-form.js';

// El nombre se escribe a mano: el empaquetador puede renombrar las funciones y `init.name` dejaría de ser legible.
const modules = [
    { fn: 'initTheme',        init: initTheme        },
    { fn: 'initNavigation',   init: initNavigation   },
    { fn: 'initCarousel',     init: initCarousel     },
    { fn: 'initModal',        init: initModal        },
    { fn: 'initSubscription', init: initSubscription },
    { fn: 'initGallery',      init: initGallery      },
    { fn: 'initContactForm',  init: initContactForm  },
];

document.addEventListener('DOMContentLoaded', () => {
    modules.forEach(({ fn, init }) => {
        try {
            init();
        } catch (err) {
            console.error(`[main.js] Falló "${fn}":`, err);
        }
    });
});
