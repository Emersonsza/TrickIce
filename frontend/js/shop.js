const products = [

{
name: "Deck Shadow",
category: "skateboard",
price: 119.99,
image: "imagens/deckshadow.jpg"
},

{
name: "Monochromatic Decks Kit",
category: "skateboard",
price: 319.99,
image: "imagens/doubledecks.webp"
},

{
name: "Deck Nose",
category: "skateboard",
price: 114.99,
image: "imagens/nosedeck.jpg"
},

{
name: "Deck Pinky",
category: "skateboard",
price: 134.99,
image: "imagens/blackpinkdeck.webp"
},

{
name: "Urban Track Hoodie",
category: "streetwear",
price: 80,
image: "imagens/monoHood.png"
},

{
name: "Pitbull RedNBlack Hoodie",
category: "streetwear",
price: 80,
image: "imagens/rednblackhood.png"
},

{
name: "Van Gogh Dark Hoodie",
category: "streetwear",
price: 80,
image: "imagens/gochhood.png"
},

{
name: "Violet Skull Hoodie",
category: "streetwear",
price: 80,
image: "imagens/Violet Skull Hoodie.webp"
},

{
name: "Casual-Street Red Sneakers",
category: "footwear",
price: 64.99,
image: "imagens/redfoot.jpg"
},

{
name: "Violet-Street Sneakers",
category: "footwear",
price: 79.99,
image: "imagens/purplefoot.jpg"
},

{
name: "Orangetone-Street Sneakers",
category: "footwear",
price: 84.99,
image: "imagens/orangefoot.jpg"
},

{
name: "Checkered-casual Sneakers",
category: "footwear",
price: 69.99,
image: "imagens/checkfoot.jpg"
}

];

let currentCategory = "all";

document.addEventListener("DOMContentLoaded", () => {

renderProducts(products);

const buttons = document.querySelectorAll(".category-btn");

buttons.forEach(btn => {

btn.addEventListener("click", () => {

buttons.forEach(b => b.classList.remove("active"));
btn.classList.add("active");

currentCategory = btn.dataset.category;

applyFilters();

});

});

const search = document.getElementById("searchInput");

search.addEventListener("input", applyFilters);

});


function applyFilters(){

const term = document.getElementById("searchInput").value.toLowerCase();

let filtered = products;

if(currentCategory !== "all"){
filtered = filtered.filter(p => p.category === currentCategory);
}

if(term !== ""){
filtered = filtered.filter(p =>
p.name.toLowerCase().includes(term) ||
p.category.toLowerCase().includes(term)
);
}

renderProducts(filtered);

}


function renderProducts(list){

const grid = document.getElementById("shopProductGrid");

if(list.length === 0){

grid.innerHTML = `<p style="text-align:center;width:100%">No products found</p>`;
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

<p class="product-price">$${product.price}</p>

</div>

</div>

`).join("");

}