function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

const cartItemsEl = document.getElementById("cartItems");
const itemCountEl = document.getElementById("itemCount");
const totalPriceEl = document.getElementById("totalPrice");

const modal = document.getElementById("orderModal");
const checkoutBtn = document.getElementById("checkoutBtn");
const closeModal = document.getElementById("closeModal");
const orderForm = document.getElementById("orderForm");

/* =====================
   RENDER CART
===================== */
function renderCart() {
  const cart = getCart();
  cartItemsEl.innerHTML = "";

  if (!cart.length) {
    cartItemsEl.innerHTML = "<p>Your cart is empty 🛒</p>";
    itemCountEl.innerText = 0;
    totalPriceEl.innerText = 0;
    return;
  }

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalItems += item.qty;
    totalPrice += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" style="width:120px;height:120px;object-fit:contain;">
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
        <p><strong>Size:</strong> ${item.size}</p>

        <div class="qty-control">
          <button class="decrease">-</button>
          <span>${item.qty}</span>
          <button class="increase">+</button>
        </div>

        <button class="remove">Remove</button>
      </div>
    `;

    div.querySelector(".increase").onclick = () => {
      cart[index].qty += 1;
      saveCart(cart);
      renderCart();
    };

    div.querySelector(".decrease").onclick = () => {
      if (cart[index].qty > 1) {
        cart[index].qty -= 1;
      } else {
        cart.splice(index, 1);
      }
      saveCart(cart);
      renderCart();
    };

    div.querySelector(".remove").onclick = () => {
      cart.splice(index, 1);
      saveCart(cart);
      renderCart();
    };

    cartItemsEl.appendChild(div);
  });

  itemCountEl.innerText = totalItems;
  totalPriceEl.innerText = totalPrice;
}

/* =====================
   MODAL OPEN/CLOSE
===================== */
checkoutBtn.onclick = () => {
  const cart = getCart();
  if (!cart.length) {
    alert("Cart is empty");
    return;
  }
  modal.classList.add("show");
};

closeModal.onclick = () => modal.classList.remove("show");

/* =====================
   ORDER SUBMIT
===================== */
orderForm.onsubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const cart = getCart();

  if (!cart.length) {
    alert("Cart empty");
    return;
  }

  const shipping = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    postalCode: document.getElementById("postal").value
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  try {
    const res = await fetch("https://vibe-vista.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        items: cart,
        totalAmount,
        shipping
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Order failed");
      return;
    }

    localStorage.removeItem("cart");
    modal.classList.remove("show");
    alert("Order placed successfully 🎉");
    renderCart();

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

renderCart();
if (checkoutBtn) {
  checkoutBtn.onclick = () => {
    const cart = getCart();
    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      window.location.href = "login.html";
      return;
    }

    modal.style.display = "block";
  };
}

closeModal.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};