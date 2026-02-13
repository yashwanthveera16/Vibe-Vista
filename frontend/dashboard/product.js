const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../loginpage/login.html";
}

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const imageEl = document.getElementById("productImage");
const titleEl = document.getElementById("productTitle");
const priceEl = document.getElementById("productPrice");
const sizeOptions = document.getElementById("sizeOptions");
const addToCartBtn = document.getElementById("addToCart");
const wishlistBtn = document.getElementById("addToWishlist");
const toast = document.getElementById("toast");

let selectedSize = null;
let PRODUCT = null;

/* =====================
   STORAGE
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

/* =====================
   TOAST
===================== */
function showToast(msg) {
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

/* =====================
   LOAD PRODUCT
===================== */
async function loadProduct() {
  try {
    const res = await fetch(
      `http://localhost:5000/api/products/${productId}`
    );

    if (!res.ok) {
      alert("Failed to load product");
      return;
    }

    PRODUCT = await res.json();

    imageEl.src = PRODUCT.image;
    titleEl.innerText = PRODUCT.name;
    priceEl.innerText = `₹${PRODUCT.price}`;

    renderSizes(PRODUCT.sizes);
  } catch (err) {
    alert("Failed to load product");
  }
}

/* =====================
   RENDER SIZES
===================== */
function renderSizes(sizes) {
  sizeOptions.innerHTML = "";

  sizes.forEach(size => {
    const btn = document.createElement("button");
    btn.className = "size-btn";
    btn.innerText = size;

    btn.onclick = () => {
      document
        .querySelectorAll(".size-btn")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");
      selectedSize = size;
    };

    sizeOptions.appendChild(btn);
  });
}

/* =====================
   ADD TO CART
===================== */
addToCartBtn.onclick = () => {
  if (!selectedSize) {
    alert("Please select a size");
    return;
  }

  const cart = getCart();

  const existing = cart.find(
    i => i.id === PRODUCT._id && i.size === selectedSize
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: PRODUCT._id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      image: PRODUCT.image,
      size: selectedSize,
      qty: 1
    });
  }

  saveCart(cart);
  showToast("Added to cart");
};

/* =====================
   WISHLIST
===================== */
wishlistBtn.onclick = () => {
  let wishlist = getWishlist();

  if (wishlist.includes(PRODUCT._id)) {
    wishlist = wishlist.filter(id => id !== PRODUCT._id);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(PRODUCT._id);
    showToast("Added to wishlist");
  }

  saveWishlist(wishlist);
};

loadProduct();
