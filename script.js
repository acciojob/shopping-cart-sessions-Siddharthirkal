// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ---- SESSION STORAGE HELPERS ---- //
function getCartFromSession() {
  const cartData = window.sessionStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
}

function saveCartToSession(cart) {
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ---- RENDER PRODUCT LIST ---- //
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(Number(btn.dataset.id));
    });
  });
}

// ---- RENDER CART ---- //
function renderCart() {
  cartList.innerHTML = "";

  const cart = getCartFromSession();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// ---- ADD TO CART ---- //
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cart = getCartFromSession();

  cart.push(product);
  saveCartToSession(cart);
  renderCart();
}

// ---- CLEAR CART ---- //
function clearCart() {
  window.sessionStorage.removeItem("cart");
  renderCart();
}

clearCartBtn.addEventListener("click", clearCart);

// ---- PERSIST CART ACROSS PAGE RELOADS FOR CYPRESS ---- //
window.addEventListener("beforeunload", () => {
  const cart = getCartFromSession();
  sessionStorage.setItem("cart", JSON.stringify(cart));
});

// ---- INITIAL ---- //
renderProducts();
renderCart();