let checkoutData = null;
let isCartCheckout = false;

document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutData();
    setupFormValidation();
    setupInputMasks();
});

// CARREGAR DADOS DO CHECKOUT
function loadCheckoutData() {
    // PRIORIDADE 1: Checkout do carrinho (múltiplos produtos)
    const cartData = localStorage.getItem('trickice_checkout_cart');
    if (cartData) {
        checkoutData = JSON.parse(cartData);
        isCartCheckout = true;
        renderCartCheckout(checkoutData);
        return;
    }
    
    // PRIORIDADE 2: Comprar Agora (produto único)
    const productData = localStorage.getItem('trickice_checkout');
    if (productData) {
        checkoutData = JSON.parse(productData);
        isCartCheckout = false;
        renderSingleProduct(checkoutData);
        return;
    }
    
    // Nenhum produto selecionado
    alert('Nenhum produto selecionado. Redirecionando para a loja...');
    window.location.href = 'shop.html';
}

// RENDERIZAR PRODUTO ÚNICO (Comprar Agora)
function renderSingleProduct(product) {
    const container = document.getElementById('orderProduct');
    
    container.innerHTML = `
        <div class="product-item">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <div class="quantity-control">
                    <label>Qtd:</label>
                    <div class="qty-btns">
                        <button type="button" onclick="updateQuantity(-1)">−</button>
                        <span id="quantity">${product.quantity}</span>
                        <button type="button" onclick="updateQuantity(1)">+</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    updateTotals();
}

// RENDERIZAR CARRINHO (Múltiplos Produtos)
function renderCartCheckout(cart) {
    const container = document.getElementById('orderProduct');
    
    container.innerHTML = cart.map(item => `
        <div class="product-item" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e5e7eb;">
            <img src="${item.image}" alt="${item.name}">
            <div class="product-info">
                <p class="product-category">${item.category}</p>
                <h3 class="product-name">${item.name}</h3>
                <p class="product-price">R$ ${item.price.toFixed(2)} × ${item.quantity}</p>
            </div>
        </div>
    `).join('');
    
    updateTotals();
}

// ATUALIZAR QUANTIDADE (Só para produto único)
function updateQuantity(change) {
    if (isCartCheckout) return; // Não permite edição no checkout de carrinho
    
    checkoutData.quantity += change;
    
    if (checkoutData.quantity < 1) {
        checkoutData.quantity = 1;
    }
    
    localStorage.setItem('trickice_checkout', JSON.stringify(checkoutData));
    
    document.getElementById('quantity').textContent = checkoutData.quantity;
    updateTotals();
}

// ATUALIZAR TOTAIS
function updateTotals() {
    let subtotal = 0;
    
    if (isCartCheckout) {
        // Carrinho: soma todos os itens
        subtotal = checkoutData.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    } else {
        // Produto único
        subtotal = checkoutData.price * checkoutData.quantity;
    }
    
    const total = subtotal; // Frete grátis
    
    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('totalPrice').textContent = `R$ ${total.toFixed(2)}`;
}

// MÁSCARAS DE INPUT (Formatação automática)
function setupInputMasks() {
    // Cartão: 0000 0000 0000 0000
    const cardInput = document.getElementById('cardNumber');
    if (cardInput) {
        cardInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formatted;
        });
    }
    
    // Expiração: MM/AA
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // CVV: apenas números
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
    
    // Telefone: (11) 98765-4321
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            }
            e.target.value = value;
        });
    }
}

// VALIDAÇÃO E SUBMIT
function setupFormValidation() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            email: document.getElementById('email').value,
            fullName: document.getElementById('fullName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            zipCode: document.getElementById('zipCode').value,
            phone: document.getElementById('phone').value,
            cardNumber: document.getElementById('cardNumber').value,
            expiry: document.getElementById('expiry').value,
            cvv: document.getElementById('cvv').value
        };
        
        // Validações
        if (formData.cardNumber.replace(/\s/g, '').length < 13) {
            alert('Por favor, insira um número de cartão válido');
            return;
        }
        
        const expiryParts = formData.expiry.split('/');
        if (expiryParts.length !== 2 || expiryParts[0].length !== 2 || expiryParts[1].length !== 2) {
            alert('Por favor, insira uma data de validade válida (MM/AA)');
            return;
        }
        
        if (formData.cvv.length < 3) {
            alert('Por favor, insira um CVV válido');
            return;
        }
        
        await processOrder(formData);
    });
}

// PROCESSAR PEDIDO
async function processOrder(formData) {
    const submitBtn = document.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;
    
    // Carregamento (Loading)
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <span>Processando...</span>
        <ion-icon name="hourglass-outline"></ion-icon>
    `;
    
    // Simula tempo de processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Sucesso
    submitBtn.innerHTML = `
        <span>Pedido Confirmado!</span>
        <ion-icon name="checkmark-circle-outline"></ion-icon>
    `;
    
    // Calcula total
    let total = 0;
    let itemsSummary = '';
    
    if (isCartCheckout) {
        total = checkoutData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        itemsSummary = checkoutData.map(item => `${item.name} (${item.quantity}x)`).join(', ');
    } else {
        total = checkoutData.price * checkoutData.quantity;
        itemsSummary = `${checkoutData.name} (${checkoutData.quantity}x)`;
    }
    
    // Salva pedido no histórico
    const order = {
        items: isCartCheckout ? checkoutData : [checkoutData],
        customer: formData,
        total: total.toFixed(2),
        date: new Date().toISOString()
    };
    
    let orders = JSON.parse(localStorage.getItem('trickice_orders') || '[]');
    orders.push(order);
    localStorage.setItem('trickice_orders', JSON.stringify(orders));
    
    // Limpa dados de checkout e carrinho do navegador
    localStorage.removeItem('trickice_checkout');
    localStorage.removeItem('trickice_checkout_cart');
    localStorage.removeItem('trickice_cart'); 
    
    // Mensagem final de confirmação
    setTimeout(() => {
        alert(`✓ Pedido Confirmado!\n\nItens: ${itemsSummary}\nTotal: R$ ${total.toFixed(2)}\n\nObrigado pela sua compra!`);
        window.location.href = 'index.html';
    }, 1000);
}