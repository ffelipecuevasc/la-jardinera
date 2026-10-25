/**
 * src/js/modules/theme.js
 * Arquitectura: ES6 Modular | Frontend nativo
 * Descripción: Manejador del Tema (Dark/Light) con la View Transitions API.
 */

export const initTheme = () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;

    // El almacenamiento puede estar bloqueado (modo privado, política del navegador): se ignora el error y manda el sistema
    const readTheme = () => {
        try {
            return localStorage.getItem('theme');
        } catch (err) {
            return null;
        }
    };

    const saveTheme = (value) => {
        try {
            localStorage.setItem('theme', value);
        } catch (err) {
            // Sin almacenamiento, la elección vale solo para esta página
        }
    };

    // Función pura para alterar las clases y guardar en LocalStorage
    const switchTheme = () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.replace('dark', 'light');
            saveTheme('light');
        } else {
            htmlElement.classList.remove('light');
            htmlElement.classList.add('dark');
            saveTheme('dark');
        }
    };

    // Función de evaluación de sistema/estado
    const setInitialTheme = () => {
        const storedTheme = readTheme();
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Limpieza precautoria
        htmlElement.classList.remove('light', 'dark');

        // Solo aplica la clase: nada se guarda hasta que el usuario alterne el tema (SM-03)
        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.add('light');
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