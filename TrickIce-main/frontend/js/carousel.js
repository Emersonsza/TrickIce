/* =====================================================
   TRICKICE - CAROUSEL MODULE (SIMPLIFICADO)
   Carousel sem API - imagens locais
   ===================================================== */

function initCarousel() {
    const carouselContainer = document.getElementById('featuredCarousel');
    
    // Se não encontrar o container, sai da função
    if (!carouselContainer) return;

    // =====================================================
    // SEUS DADOS DO CAROUSEL - MUDE AQUI!
    // =====================================================
    const carouselItems = [
        {
            image: "imagens/slide1.webp",  // ← MUDE O CAMINHO AQUI
            title: "Street Essentials",
            subtitle: "New Collection"
        },
        {
            image: "imagens/slide1.webp",  // ← MUDE O CAMINHO AQUI
            title: "Built for the streets",
            subtitle: "Lifestyle"
        },
        {
            image: "imagens/slide1.webp",  // ← MUDE O CAMINHO AQUI
            title: "Ride or die",
            subtitle: "Brand Values"
        }
    ];

    // =====================================================
    // RENDERIZA OS SLIDES NO HTML
    // =====================================================
    // .map() percorre cada item e cria o HTML
    // .join('') junta tudo em uma string única
    carouselContainer.innerHTML = carouselItems.map(item => `
        <div class="carousel-slide">
            <img src="${item.image}" alt="${item.title}">
            <div class="carousel-overlay">
                <div class="carousel-content">
                    ${item.subtitle ? `<p class="carousel-subtitle">${item.subtitle}</p>` : ''}
                    <h2 class="carousel-title">${item.title}</h2>
                    <div class="carousel-line"></div>
                </div>
            </div>
        </div>
    `).join('');

    // =====================================================
    // INICIALIZA O SLICK CAROUSEL (biblioteca externa)
    // =====================================================
    $(carouselContainer).slick({
        dots: true,              // Bolinhas de navegação
        infinite: true,          // Loop infinito
        speed: 1800,             // 1.8 segundos de transição (suave)
        slidesToShow: 1,         // Mostra 1 slide por vez
        slidesToScroll: 1,       // Avança 1 slide por vez
        autoplay: true,          // Auto-play ativado
        autoplaySpeed: 5000,     // 5 segundos por slide
        arrows: true,            // Setas de navegação
        fade: true,              // Fade entre slides (não slide)
        cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Easing suave
        pauseOnHover: true,      // Pausa quando mouse está em cima
        lazyLoad: 'progressive', // Carrega imagens progressivamente
        
        // Setas customizadas com SVG
        prevArrow: '<button type="button" class="slick-prev"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><polyline points="15 18 9 12 15 6"></polyline></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><polyline points="9 18 15 12 9 6"></polyline></svg></button>'
    });
}

// =====================================================
// INICIALIZA QUANDO A PÁGINA CARREGAR
// =====================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}