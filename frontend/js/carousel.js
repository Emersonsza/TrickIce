/* =====================================================
   TRICKICE - CAROUSEL
   ===================================================== */

function initCarousel() {

    const carouselContainer = document.getElementById('featuredCarousel');
    if (!carouselContainer) return;

    const carouselItems = [
        {
            image: "imagens/slide1.png",
            title: "Street Essentials",
            subtitle: "New Collection",
        },
        {
            image: "imagens/slide2.png",
            title: "Built for the streets",
            subtitle: "Lifestyle"
        },
        {
            image: "imagens/slide3.png",
            title: "Ride or die",
            subtitle: "Brand Values"
        }
    ];

    carouselContainer.innerHTML = carouselItems.map(item => `
        <div class="carousel-slide">
            <img src="${item.image}" alt="${item.title}">
            <div class="carousel-overlay">
                <div class="carousel-content">
                    <h2 class="carousel-title">${item.title}</h2>
                    ${item.subtitle ? `<p class="carousel-subtitle">${item.subtitle}</p>` : ''}
                    <div class="carousel-line"></div>    
                </div>
            </div>
        </div>
    `).join('');

    $('#featuredCarousel').slick({

        slidesToShow: 1,
        slidesToScroll: 1,

        infinite: true,
        fade: true,

        autoplay: true,
        autoplaySpeed: 5000,

        speed: 900,

        dots: true,
        arrows: true,

        prevArrow: `
        <button class="carousel-arrow prev">
            <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        `,

        nextArrow: `
        <button class="carousel-arrow next">
            <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
        `
    });
}

document.addEventListener("DOMContentLoaded", initCarousel);