/* =====================
   AUTH GUARD
===================== */
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../loginpage/login.html";
}

/* =====================
   GLOBAL STATE
===================== */
let PRODUCTS = [];

/* =====================
   STORAGE HELPERS
===================== */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(list) {
  localStorage.setItem("wishlist", JSON.stringify(list));
}

function updateCounts() {
  const cart = getCart();
  const wishlist = getWishlist();

  const cartCountEl = document.getElementById("cart-count");
  const wishlistCountEl = document.getElementById("wishlist-count");

  if (cartCountEl) {
    cartCountEl.innerText = cart.reduce((s, i) => s + i.qty, 0);
  }

  if (wishlistCountEl) {
    wishlistCountEl.innerText = wishlist.length;
  }
}

/* =====================
   TOAST
===================== */
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.innerText = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2000);
}

/* =====================
   PRODUCT CARD
===================== */
function createProductCard(p) {
  const card = document.createElement("div");
  card.className = "product";

  const wishlist = getWishlist();
  const isWishlisted = wishlist.includes(p._id);

  card.innerHTML = `
    <img src="${p.image}">
    <h4>${p.name}</h4>
    <div class="price">₹${p.price}</div>
    <div class="size-info">Sizes: ${p.sizes.join(" • ")}</div>

    <div class="product-actions">
      <button class="add-cart">Add to Cart</button>
      <button class="wishlist-btn ${isWishlisted ? "active" : ""}">♥</button>
    </div>
  `;

  /* OPEN PRODUCT PAGE */
  card.querySelector("img").onclick =
  card.querySelector("h4").onclick = () => {
    window.location.href = `product.html?id=${p._id}`;
  };

  /* ADD TO CART */
  card.querySelector(".add-cart").onclick = (e) => {
    e.stopPropagation();

    const cart = getCart();
    const size = p.sizes[0]; // auto select first size

    const existing = cart.find(
      item => item.id === p._id && item.size === size
    );

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: p._id,
        name: p.name,
        price: p.price,
        image: p.image,
        size: size,
        qty: 1
      });
    }

    saveCart(cart);
    updateCounts();
    showToast("Added to cart");
  };

  /* WISHLIST TOGGLE */
  card.querySelector(".wishlist-btn").onclick = (e) => {
    e.stopPropagation();

    let wishlist = getWishlist();

    if (wishlist.includes(p._id)) {
      wishlist = wishlist.filter(id => id !== p._id);
      e.target.classList.remove("active");
    } else {
      wishlist.push(p._id);
      e.target.classList.add("active");
      showToast("Added to wishlist");
    }

    saveWishlist(wishlist);
    updateCounts();
  };

  return card;
}

/* =====================
   FETCH PRODUCTS
===================== */
async function loadProducts() {
  try {
    const res = await fetch("http://localhost:5000/api/products");
    PRODUCTS = await res.json();
    renderFeatured();
  } catch (err) {
    console.error("Failed to load products", err);
  }
}

/* =====================
   RENDER
===================== */
const featuredGrid = document.getElementById("featuredGrid");
const productGrid = document.getElementById("productGrid");
const featuredTitle = document.querySelector(".section-title");
const exploreSection = document.getElementById("exploreSection");

function renderFeatured() {
  if (!featuredGrid) return;

  featuredGrid.innerHTML = "";
  PRODUCTS.slice(0, 8).forEach(p =>
    featuredGrid.appendChild(createProductCard(p))
  );
}

function renderProducts(list) {
  if (!productGrid) return;

  productGrid.innerHTML = "";
  list.forEach(p =>
    productGrid.appendChild(createProductCard(p))
  );
}

/* =====================
   FILTERS
===================== */
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sizeFilter = document.getElementById("sizeFilter");
const priceRange = document.getElementById("priceRange");
const priceSort = document.getElementById("priceSort");

function applyFilters() {
  let list = [...PRODUCTS];

  if (featuredGrid) featuredGrid.style.display = "none";
  if (featuredTitle) featuredTitle.style.display = "none";
  if (exploreSection) exploreSection.classList.remove("hidden");

  if (searchInput && searchInput.value) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }

  if (categoryFilter && categoryFilter.value !== "all") {
    list = list.filter(p => p.category === categoryFilter.value);
  }

  if (sizeFilter && sizeFilter.value !== "all") {
    list = list.filter(p => p.sizes.includes(sizeFilter.value));
  }

  if (priceRange) {
    if (priceRange.value === "below-2000")
      list = list.filter(p => p.price < 2000);

    if (priceRange.value === "2000-5000")
      list = list.filter(p => p.price >= 2000 && p.price <= 5000);

    if (priceRange.value === "above-5000")
      list = list.filter(p => p.price > 5000);
  }

  if (priceSort) {
    if (priceSort.value === "low-high")
      list.sort((a, b) => a.price - b.price);

    if (priceSort.value === "high-low")
      list.sort((a, b) => b.price - a.price);
  }

  renderProducts(list);
}

[searchInput, categoryFilter, sizeFilter, priceRange, priceSort]
  .forEach(el => {
    if (el) el.addEventListener("change", applyFilters);
  });

/* =====================
   UI CONTROLS
===================== */
const filterToggle = document.getElementById("filterToggle");
if (filterToggle) {
  filterToggle.onclick = () => {
    document.getElementById("filterPanel").classList.toggle("active");
  };
}

const exploreBtn = document.getElementById("exploreBtn");
if (exploreBtn) {
  exploreBtn.onclick = () => {
    if (featuredGrid) featuredGrid.style.display = "none";
    if (featuredTitle) featuredTitle.style.display = "none";
    if (exploreSection) exploreSection.classList.remove("hidden");
    renderProducts(PRODUCTS);
  };
}

/* =====================
   INIT
===================== */
updateCounts();
loadProducts();
