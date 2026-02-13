const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "../loginpage/login.html";
}

/* =====================
   FETCH PROFILE
===================== */
fetch("https://vibe-vista.onrender.com/api/user/me", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(res => {
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
  })
  .then(data => {
    // EMAIL
    document.getElementById("email").innerText = data.email;

    // ORDERS
    const ordersDiv = document.getElementById("orders");
    ordersDiv.innerHTML = "";

    if (!data.orders || data.orders.length === 0) {
      ordersDiv.innerHTML = "<p class='empty'>No orders yet</p>";
      return;
    }

    data.orders.forEach(order => {
      const div = document.createElement("div");
      div.className = "order";
      div.innerText = `₹${order.totalAmount} • ${order.items.length} items`;
      ordersDiv.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Profile error:", err);
    localStorage.clear();
    window.location.href = "../loginpage/login.html";
  });

/* =====================
   LOGOUT
===================== */
document.getElementById("logoutBtn").onclick = () => {
  localStorage.clear();
  window.location.href = "../loginpage/login.html";
};
