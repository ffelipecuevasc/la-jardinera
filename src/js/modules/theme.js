export function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isNowDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('jardinera-theme', isNowDark ? 'dark' : 'light');
}

export function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    // Load preference from local storage
    const isDark = localStorage.getItem('jardinera-theme') === 'dark';
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    themeBtn.addEventListener('click', toggleTheme);
}
