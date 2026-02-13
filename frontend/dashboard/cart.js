function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

const cartItemsEl = document.getElementById("cartItems");
const itemCountEl = document.getElementById("itemCount");
const totalPriceEl = document.getElementById("totalPrice");

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

renderCart();
