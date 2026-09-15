const modules = [
    { path: './modules/theme.js',        fn: 'initTheme'        },
    { path: './modules/navigation.js',   fn: 'initNavigation'   },
    { path: './modules/carousel.js',     fn: 'initCarousel'     },
    { path: './modules/modal.js',        fn: 'initModal'        },
    { path: './modules/subscription.js', fn: 'initSubscription' },
    { path: './modules/gallery.js',      fn: 'initGallery'      },
];

document.addEventListener('DOMContentLoaded', () => {
    modules.forEach(async ({ path, fn }) => {
        try {
            const mod = await import(path);
            mod[fn]?.();
        } catch (err) {
            console.error(`[main.js] Falló "${fn}" (${path}):`, err);
        }
    });
});