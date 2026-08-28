// ==========================================================================
// 1. DATA STRUCTURE (Array of Objects - Rubric Requirement)
// ==========================================================================
const bakeryProducts = [
  {
    id: "sourdough",
    name: "Artisan Sourdough",
    description: "Naturally leavened with a crispy crust and airy interior. Baked fresh every morning.",
    priceRange: "$8.00 – $10.00",
    price: 8.00,
    category: "Breads"
  },
  {
    id: "whole-wheat",
    name: "Whole Wheat Loaf",
    description: "Hearty, 100% organic whole grain bread packed with roasted seeds and honey.",
    priceRange: "$6.50 – $8.00",
    price: 6.50,
    category: "Breads"
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    description: "Traditional French-style flaky pastry made with rich European cultured butter.",
    priceRange: "$4.00 – $5.50",
    price: 4.00,
    category: "Pastries"
  },
  {
    id: "almond-danish",
    name: "Almond Danishes",
    description: "Flaky dough topped with house-made almond cream and toasted sliced almonds.",
    priceRange: "$4.50 – $6.00",
    price: 4.50,
    category: "Pastries"
  },
  {
    id: "chocolate-cake",
    name: "Classic Chocolate Layer Cake",
    description: "Rich cocoa sponge cake layered with dark chocolate ganache and fudge frosting.",
    priceRange: "$35.00 – $55.00",
    price: 35.00,
    category: "Cakes"
  },
  {
    id: "berry-cake",
    name: "Fresh Berry Cream Cake",
    description: "Light vanilla chiffon cake filled with whipped mascarpone cream and fresh seasonal berries.",
    priceRange: "$40.00 – $65.00",
    price: 40.00,
    category: "Cakes"
  }
];

// ==========================================================================
// 2. DYNAMIC RENDERING FUNCTIONS
// ==========================================================================

// Render Product Cards on products.html
function renderProductCatalog() {
  const breadsGrid = document.getElementById("breads-grid");
  const pastriesGrid = document.getElementById("pastries-grid");
  const cakesGrid = document.getElementById("cakes-grid");

  // Exit if not on products.html page
  if (!breadsGrid || !pastriesGrid || !cakesGrid) return;

  // Clear existing content
  breadsGrid.innerHTML = "";
  pastriesGrid.innerHTML = "";
  cakesGrid.innerHTML = "";

  bakeryProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <span class="price-range">${product.priceRange}</span>
    `;

    if (product.category === "Breads") {
      breadsGrid.appendChild(card);
    } else if (product.category === "Pastries") {
      pastriesGrid.appendChild(card);
    } else if (product.category === "Cakes") {
      cakesGrid.appendChild(card);
    }
  });
}

// Populate Select Dropdown on contact.html
function populateProductDropdown() {
  const selectElement = document.getElementById("product-select");
  if (!selectElement) return;

  bakeryProducts.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = `${product.name} (${product.priceRange})`;
    selectElement.appendChild(option);
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderProductCatalog();
  populateProductDropdown();
});
