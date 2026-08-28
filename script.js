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

// Render Product Cards on products.html with working Add to Cart buttons
function renderProductCatalog() {
  const breadsGrid = document.getElementById("breads-grid");
  const pastriesGrid = document.getElementById("pastries-grid");
  const cakesGrid = document.getElementById("cakes-grid");

  // Exit gracefully if not on products.html
  if (!breadsGrid || !pastriesGrid || !cakesGrid) return;

  // Clear existing static/placeholder content
  breadsGrid.innerHTML = "";
  pastriesGrid.innerHTML = "";
  cakesGrid.innerHTML = "";

  bakeryProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    // Build internal HTML including product details and the button
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-card-footer">
        <span class="price-range">${product.priceRange}</span>
        <button type="button" class="add-cart-btn" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;

    // Attach event listener to the button
    const btn = card.querySelector(".add-cart-btn");
    btn.addEventListener("click", () => {
      addToCart(product.id);
    });

    // Append card to its matching category grid
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

// ==========================================================================
// 1. CART STATE & LOCALSTORAGE (Array of Objects)
// ==========================================================================
let cart = JSON.parse(localStorage.getItem("bakery_cart")) || [];

// Save cart array to localStorage
function saveCart() {
  localStorage.setItem("bakery_cart", JSON.stringify(cart));
  updateCartUI();
}

// Add product to cart by ID
function addToCart(productId) {
  const product = bakeryProducts.find(item => item.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  saveCart();
  alert(`${product.name} added to your cart!`);
}

// Update Header Cart Count Display
function updateCartUI() {
  const cartBadge = document.getElementById("cart-count");
  if (!cartBadge) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;
}

// Open & Close Cart Modal Controls
function setupCartModalEvents() {
  const modal = document.getElementById("cart-modal");
  const openBtn = document.getElementById("cart-toggle-btn");
  const closeBtn = document.getElementById("close-cart-btn");
  const clearBtn = document.getElementById("clear-cart-btn");

  if (!modal || !openBtn) return;

  openBtn.addEventListener("click", () => {
    renderCartModalItems();
    modal.classList.add("active");
  });

  closeBtn?.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  clearBtn?.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCartModalItems();
  });
}

// Render Saved Items inside Modal
function renderCartModalItems() {
  const container = document.getElementById("cart-items-container");
  const totalPriceEl = document.getElementById("cart-total-price");
  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    if (totalPriceEl) totalPriceEl.textContent = "$0.00";
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement("div");
    row.className = "cart-item-row";
    row.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <div>$${item.price.toFixed(2)} × ${item.quantity}</div>
      </div>
      <strong>$${itemTotal.toFixed(2)}</strong>
    `;
    container.appendChild(row);
  });

  if (totalPriceEl) totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

// Attach listener on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  setupCartModalEvents();
  updateCartUI();
});

function setupFormValidation() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Stop page reload

    // Form inputs
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const requestTypeInput = document.getElementById("request-type");
    const detailsInput = document.getElementById("item-details");

    // Error feedback containers
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const requestTypeError = document.getElementById("request-type-error");
    const detailsError = document.getElementById("details-error");
    const successMsg = document.getElementById("form-success-msg");

    // Reset messages
    nameError.textContent = "";
    emailError.textContent = "";
    requestTypeError.textContent = "";
    detailsError.textContent = "";
    if (successMsg) successMsg.textContent = "";

    let isValid = true;

    // 1. Name: Required + Minimum Length Check
    if (!nameInput.value.trim()) {
      nameError.textContent = "Full name is required.";
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Name must be at least 2 characters long.";
      isValid = false;
    }

    // 2. Email: Email Format Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email address is required.";
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // 3. Request Type: Required Selection Check
    if (!requestTypeInput.value) {
      requestTypeError.textContent = "Please select a request type.";
      isValid = false;
    }

    // 4. Details: Required Field Check
    if (!detailsInput.value.trim()) {
      detailsError.textContent = "Please provide item details or inquiry notes.";
      isValid = false;
    }

    // On Successful Validation
    if (isValid) {
      if (successMsg) {
        successMsg.textContent = "Thank you! Your request has been sent successfully.";
      }
      form.reset();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupFormValidation();
});
