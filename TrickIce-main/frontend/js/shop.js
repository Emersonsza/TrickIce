const API = {
  async getProducts() {
    return [
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
        image: "https://via.placeholder.com/300"
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
      },



    ];
  },

  async getProductsByCategory(category) {
    const products = await this.getProducts();
    return products.filter(p => p.category === category);
  }
};