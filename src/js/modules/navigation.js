export function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            document.body.classList.remove('overflow-hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close on link click inside menu
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}
