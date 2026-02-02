



document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.gallery-item');
    const nextBtn = document.getElementById('gallery-next');
    const prevBtn = document.getElementById('gallery-prev');
    let currentIndex = 0;
    function updateGallery() {
        items.forEach((item, index) => {
            item.classList.remove('is-active', 'is-prev', 'is-next', 'is-far-prev', 'is-far-next');
            item.setAttribute('aria-hidden', 'true');

            if (index === currentIndex) {
                item.classList.add('is-active');
                item.setAttribute('aria-hidden', 'false');
            } else if (index === (currentIndex - 1 + items.length) % items.length) {
                item.classList.add('is-prev');
            } else if (index === (currentIndex + 1) % items.length) {
                item.classList.add('is-next');
            } else if (index === (currentIndex - 2 + items.length) % items.length) {
                item.classList.add('is-far-prev');
            } else if (index === (currentIndex + 2) % items.length) {
                item.classList.add('is-far-next');
            }
        });

        // Update screen reader announcement
        const status = document.getElementById('gallery-status');
        if (status) {
            status.textContent = `Slide ${currentIndex + 1} of ${items.length}`;
        }
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateGallery();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateGallery();
    });

    // Run on init
    updateGallery();

    document.querySelectorAll(".faq-question").forEach(btn => {
        btn.addEventListener("click", () => {
            const item = btn.closest(".faq-item");
            const isOpen = item.classList.contains("open");

            // Toggle state
            item.classList.toggle("open");

            // Update ARIA attributes
            btn.setAttribute("aria-expanded", !isOpen);

            const answer = item.querySelector(".faq-answer");
            answer.setAttribute("id", answer.id || `faq-${Math.random().toString(36).substr(2, 9)}`);
            btn.setAttribute("aria-controls", answer.id);
        });

        // Set initial ARIA attributes
        btn.setAttribute("aria-expanded", "false");
        const answer = btn.closest(".faq-item").querySelector(".faq-answer");
        const answerId = `faq-${Math.random().toString(36).substr(2, 9)}`;
        answer.setAttribute("id", answerId);
        answer.setAttribute("role", "region");
        btn.setAttribute("aria-controls", answerId);
    });
});
