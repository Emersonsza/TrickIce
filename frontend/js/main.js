/* =====================================================
   TRICKICE - MAIN JS
   General scripts and utilities (SEM API)
   ===================================================== */

// =====================================================
// MOBILE MENU TOGGLE
// =====================================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Se não encontrar os elementos, sai da função
    if (!menuBtn || !mobileMenu) return;

    // ABRE/FECHA menu ao clicar no botão
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // FECHA menu ao clicar em um link
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // FECHA menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
}

// =====================================================
// SCROLL ANIMATIONS (Fade In ao rolar)
// =====================================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,           // 10% do elemento visível
        rootMargin: '0px 0px -50px 0px'  // Ativa 50px antes
    };

    // IntersectionObserver = detecta quando elemento entra na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Elemento entrou na tela → adiciona classe 'visible'
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observa todos os elementos com classes de animação
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
}

// =====================================================
// SMOOTH SCROLL (Scroll suave ao clicar em âncoras)
// =====================================================
function initSmoothScroll() {
    // Pega todos os links que começam com #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Se o link é #alguma-coisa (não só #)
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();  // Não faz o scroll padrão
                const target = document.querySelector(href);
                
                if (target) {
                    // Scroll suave até o elemento
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// =====================================================
// FALLBACK PARA IMAGENS QUEBRADAS
// =====================================================
function handleImageErrors() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // Cria uma div de fallback
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 100%;
                height: 100%;
                background: var(--muted);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--muted-foreground);
                font-size: 0.875rem;
            `;
            fallback.textContent = this.alt || 'Imagem não disponível';
            
            // Substitui a imagem quebrada pela div
            this.parentNode.replaceChild(fallback, this);
        });
    });
}

// =====================================================
// INICIALIZA TUDO QUANDO A PÁGINA CARREGAR
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    handleImageErrors();
});

// Exporta função para uso em outros scripts
window.initScrollAnimations = initScrollAnimations;