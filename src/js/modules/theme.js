/**
 * src/js/modules/theme.js
 * Arquitectura: ES6 Modular | Frontend nativo
 * Descripción: Manejador del Tema (Dark/Light) con la View Transitions API.
 */

export const initTheme = () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;

    // Función pura para alterar las clases y guardar en LocalStorage
    const switchTheme = () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.replace('dark', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.remove('light');
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    // Función de evaluación de sistema/estado
    const setInitialTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Limpieza precautoria
        htmlElement.classList.remove('light', 'dark');

        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    };

    // Event handler orquestando la View Transitions API
    const handleThemeToggle = () => {
        // Fallback robusto en caso de que el navegador no soporte la API
        if (!document.startViewTransition) {
            switchTheme();
            return;
        }

        // Disparo de la transición nativa
        document.startViewTransition(() => {
            switchTheme();
        });
    };

    if (themeToggleBtn) {
        // Inicializamos el estado 
        setInitialTheme();

        // Atamos el event listener
        themeToggleBtn.addEventListener('click', handleThemeToggle);
    }
};