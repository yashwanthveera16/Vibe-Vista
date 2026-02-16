const btn = document.getElementById("placeOrderBtn");

btn.onclick = async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const token = localStorage.getItem("token");

  if (!cart.length) {
    alert("Cart empty");
    return;
  }

  if (!token) {
    alert("Login first");
    window.location.href = "login.html";
    return;
  }

  const shipping = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    postalCode: document.getElementById("postalCode").value,
  };

  try {
    const res = await fetch("https://vibe-vista.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        items: cart,
        shipping,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Order failed");
      return;
    }

    alert("Order placed successfully");
    localStorage.removeItem("cart");
    window.location.href = "orders.html";

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};