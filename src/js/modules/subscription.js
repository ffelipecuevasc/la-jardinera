export function initSubscription() {
    const frequencyButtons = document.querySelectorAll('.freq-btn');
    if (!frequencyButtons.length) return;

    const detailEl = document.getElementById('frequency-detail');
    const priceEl = document.getElementById('frequency-price');

    frequencyButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Reset all buttons in the container
            frequencyButtons.forEach(btn => {
                btn.className = 'freq-btn py-2.5 px-3 rounded-lg text-center font-label-md text-label-md uppercase transition-all bg-surface-container text-on-surface hover:bg-surface-container-high';
            });

            // Highlight active button
            button.className = 'freq-btn py-2.5 px-3 rounded-lg text-center font-label-md text-label-md uppercase transition-all bg-primary text-on-primary shadow-sm';

            // Update details
            if (detailEl && button.dataset.detail) {
                detailEl.innerText = button.dataset.detail;
            }
            if (priceEl && button.dataset.price) {
                priceEl.innerText = button.dataset.price;
            }
        });
    });
}
