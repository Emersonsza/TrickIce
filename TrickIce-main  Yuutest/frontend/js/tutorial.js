document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.category-btn');
    const cards = document.querySelectorAll('.tutorial-card');

    filters.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Remove classe 'active' de todos e adiciona no clicado
            filters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // 2. Lógica de filtro
            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || category === cardCategory) {
                    card.style.display = 'block';
                    // Opcional: adicionar uma pequena animação de fade
                    card.style.opacity = '0';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});