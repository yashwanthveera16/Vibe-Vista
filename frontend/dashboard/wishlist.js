/* =====================
   STORAGE
===================== */
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =====================
   RENDER
===================== */
const wishlistGrid = document.getElementById("wishlistGrid");

async function loadWishlist() {
  try {
    const wishlistIds = getWishlist();

    if (!wishlistGrid) return;

    if (wishlistIds.length === 0) {
      wishlistGrid.innerHTML = "<p>Your wishlist is empty ❤️</p>";
      return;
    }

    const res = await fetch("https://vibe-vista.onrender.com/api/products");
    const products = await res.json();

    const filtered = products.filter(p =>
      wishlistIds.includes(p._id)
    );

    renderWishlist(filtered);

  } catch (err) {
    console.error("Failed to load wishlist", err);
  }
}

function renderWishlist(items) {
  wishlistGrid.innerHTML = "";

  if (!items.length) {
    wishlistGrid.innerHTML = "<p>Your wishlist is empty ❤️</p>";
    return;
  }

  items.forEach(p => {
    const card = document.createElement("div");
    card.className = "wishlist-card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>

      <div class="actions">
        <button class="add-cart">Add to Cart</button>
        <button class="remove">Remove</button>
      </div>
    `;

    /* ADD TO CART */
    card.querySelector(".add-cart").onclick = () => {
      const cart = getCart();
      const size = p.sizes?.[0] || "Default";

      const existing = cart.find(
        i => i.id === p._id && i.size === size
      );

      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          id: p._id,
          name: p.name,
          price: p.price,
          image: p.image,
          size,
          qty: 1
        });
      }

      saveCart(cart);
      alert("Added to cart");
    };

    /* REMOVE */
    card.querySelector(".remove").onclick = () => {
      let wishlist = getWishlist();
      wishlist = wishlist.filter(id => id !== p._id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      loadWishlist();
    };

    wishlistGrid.appendChild(card);
  });
}

/* =====================
   INIT
===================== */
loadWishlist();
