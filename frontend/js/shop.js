const products = [
    { id: "deck-shadow", category: "Shapes", price: 119.99, name: "Shape Shadow", image: "imagens/deckshadow.jpg" },
    { id: "monochromatic-kit", category: "Shapes", price: 319.99, name: "Kit Shapes Monocromático", image: "imagens/doubledecks.webp" },
    { id: "deck-nose", category: "Shapes", price: 114.99, name: "Shape Nose", image: "imagens/nosedeck.jpg" },
    { id: "deck-pinky", category: "Shapes", price: 134.99, name: "Shape Pinky", image: "imagens/blackpinkdeck.webp" },

    { id: "urban-track-hoodie", category: "streetwear", price: 80.00, name: "Moletom Urban Track", image: "imagens/monoHood.png" },
    { id: "pitbull-hoodie", category: "streetwear", price: 80.00, name: "Moletom Pitbull R&B", image: "imagens/rednblackhood.png" },
    { id: "van-gogh-hoodie", category: "streetwear", price: 80.00, name: "Moletom Van Gogh Dark", image: "imagens/gochhood.png" },
    { id: "violet-skull-hoodie", category: "streetwear", price: 80.00, name: "Moletom Violet Skull", image: "imagens/moletom-violet-skull.webp" },

    { id: "red-sneakers", category: "footwear", price: 64.99, name: "Tênis Casual Red", image: "imagens/redfoot.jpg" },
    { id: "violet-sneakers", category: "footwear", price: 79.99, name: "Tênis Violet-Street", image: "imagens/purplefoot.jpg" },
    { id: "orange-sneakers", category: "footwear", price: 84.99, name: "Tênis Orangetone", image: "imagens/orangefoot.jpg" },
    { id: "checkered-sneakers", category: "footwear", price: 69.99, name: "Tênis Quadriculado", image: "imagens/checkfoot.jpg" },

    { id: "deck-shadow", category: "Skateboard", price: 119.99, name: "Shape Shadow", image: "imagens/skate montado/skate-montado-primitive-peace-rodriguez-07bd60fa0737d4573517701450673126-480-0.webp" },
    { id: "monochromatic-kit", category: "Skateboard", price: 319.99, name: "Kit Shapes Monocromático", image: "imagens/doubledecks.webp" },
    { id: "deck-nose", category: "Skateboard", price: 114.99, name: "Shape Nose", image: "imagens/nosedeck.jpg" },
    { id: "deck-pinky", category: "Skateboard", price: 134.99, name: "Shape Pinky", image: "imagens/blackpinkdeck.webp" },
];

let currentCategory = "all";

/* =========================
   CONTROLE DA SIDEBAR SKATE
========================= */

// 👉 Mostra/esconde a sidebar dependendo da categoria
function toggleSidebar() {
    const sidebar = document.getElementById("skateSidebar");
    if (!sidebar) return;

    if (currentCategory === "skateboard") {
        sidebar.style.display = "block";
    } else {
        sidebar.style.display = "none";
    }
}

/* =========================
   CARRINHO - LocalStorage
========================= */

function loadCart() {
    const saved = localStorage.getItem('trickice_cart');
    return saved ? JSON.parse(saved) : [];
}

function saveCart(cart) {
    localStorage.setItem('trickice_cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(product) {
    let cart = loadCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
}

function removeFromCart(productId) {
    let cart = loadCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateCartQuantity(productId, newQuantity) {
    let cart = loadCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart(cart);
        }
    }
}

function calculateCartTotal() {
    const cart = loadCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    const cart = loadCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

/* =========================
   UI DO CARRINHO
========================= */

function updateCartUI() {
    updateCartBadge();
    if (document.getElementById('cartSidebar').classList.contains('active')) {
        renderCartItems();
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const count = getCartItemCount();

    if (count > 0) {
        badge.textContent = count > 9 ? '9+' : count;
        badge.classList.add('active');
    } else {
        badge.classList.remove('active');
    }
}

function renderCartItems() {
    const cart = loadCart();
    const container = document.getElementById('cartItems');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <ion-icon name="cart-outline"></ion-icon>
                <p>Seu carrinho está vazio</p>
                <a href="shop.html">Continuar Comprando</a>
            </div>
        `;
        document.getElementById('cartCheckoutBtn').disabled = true;
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <p class="cart-item-category">${item.category}</p>
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <span class="cart-qty-label">Qtd:</span>
                    <div class="cart-qty-controls">
                        <button class="cart-qty-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">−</button>
                        <span class="cart-qty-number">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                <ion-icon name="trash-outline"></ion-icon>
            </button>
        </div>
    `).join('');

    document.getElementById('cartTotalPrice').textContent = `R$ ${calculateCartTotal().toFixed(2)}`;
    document.getElementById('cartCheckoutBtn').disabled = false;
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCartItems();
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function checkoutCart() {
    const cart = loadCart();

    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    localStorage.setItem('trickice_checkout_cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}

/* =========================
   COMPRAR AGORA
========================= */

function buyNow(product) {
    localStorage.setItem('trickice_checkout', JSON.stringify({ ...product, quantity: 1 }));
    window.location.href = 'checkout.html';
}

/* =========================
   PRODUTOS
========================= */

function findProductById(productId) {
    return products.find(p => p.id === productId);
}

function renderProducts(list) {
    const grid = document.getElementById("shopProductGrid");

    if (list.length === 0) {
        grid.innerHTML = `<p style="text-align:center;width:100%;color:var(--secondary)">Nenhum produto encontrado</p>`;
        return;
    }

    grid.innerHTML = list.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
            </div>
            <div class="product-actions">
                <button class="add-to-cart-btn" data-product-id="${product.id}">
                    <span>Adicionar ao carrinho</span>
                </button>
                <button class="buy-now-btn" data-product-id="${product.id}">
                    <span>Comprar</span>
                </button>
            </div>
        </div>
    `).join("");

    attachButtonListeners();
}

/* =========================
   BOTÕES PRODUTO
========================= */

function attachButtonListeners() {

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const product = findProductById(this.dataset.productId);
            if (!product) return;

            this.classList.add('loading');
            this.disabled = true;

            setTimeout(() => {
                addToCart(product);

                this.classList.remove('loading');
                this.classList.add('success');
                this.innerHTML = `<ion-icon name="checkmark-outline"></ion-icon><span>Adicionado!</span>`;

                setTimeout(() => {
                    this.classList.remove('success');
                    this.innerHTML = "Adicionar ao carrinho";
                    this.disabled = false;
                }, 2000);
            }, 300);
        });
    });

    document.querySelectorAll('.buy-now-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const product = findProductById(this.dataset.productId);
            if (!product) return;

            this.classList.add('loading');
            this.disabled = true;
            setTimeout(() => buyNow(product), 300);
        });
    });
}

/* =========================
   FILTROS
========================= */

function applyFilters() {
    const term = document.getElementById("searchInput").value.toLowerCase();
    let filtered = products;

    if (currentCategory !== "all") {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    if (term !== "") {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
    }

    renderProducts(filtered);

    // 👉 garante mostrar/esconder corretamente
    toggleSidebar();
}

/* =========================
   INICIALIZAÇÃO
========================= */

document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
    updateCartBadge();

    // 👉 garante que começa escondido corretamente
    toggleSidebar();

    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentCategory = btn.dataset.category;

            applyFilters(); // já controla sidebar
        });
    });

    const search = document.getElementById("searchInput");
    if (search) {
        search.addEventListener("input", applyFilters);
    }

    // Carrinho
    document.getElementById('cartIcon')?.addEventListener('click', openCart);
    document.getElementById('cartIconWrapper')?.addEventListener('click', openCart);
    document.getElementById('cartClose')?.addEventListener('click', closeCart);
    document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
    document.getElementById('cartCheckoutBtn')?.addEventListener('click', checkoutCart);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('cartSidebar').classList.contains('active')) {
            closeCart();
        }
    });
});