const token = localStorage.getItem("token");

if (!token) {
  alert("Login required");
  window.location.href = "../loginpage/login.html";
}

/* =====================
   ADD PRODUCT
===================== */
document.getElementById("productForm").onsubmit = async (e) => {
  e.preventDefault();

  const product = {
    name: name.value,
    category: category.value,
    type: type.value,
    price: Number(price.value),
    image: image.value,
    sizes: sizes.value.split(",").map(s => s.trim())
  };

  const res = await fetch("http://localhost:5000/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });

  const data = await res.json();
  alert(data.message);

  loadProducts();
};

/* =====================
   LOAD PRODUCTS
===================== */
async function loadProducts() {
  const res = await fetch("http://localhost:5000/api/products");
  const products = await res.json();

  const box = document.getElementById("adminProducts");
  box.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-row";

    div.innerHTML = `
      <span>${p.name} - ₹${p.price}</span>
      <div>
        <button onclick="editProduct('${p._id}')">Edit</button>
        <button class="delete-btn" onclick="deleteProduct('${p._id}')">Delete</button>
      </div>
    `;

    box.appendChild(div);
  });
}

/* =====================
   EDIT PRODUCT
===================== */
async function editProduct(id) {

  const name = prompt("New name:");
  const price = prompt("New price:");
  const image = prompt("New image URL:");
  const sizes = prompt("Sizes comma separated:");

  if (!name || !price) return;

  const updated = {
    name,
    price: Number(price),
    image,
    sizes: sizes.split(",").map(s => s.trim())
  };

  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updated)
  });

  const data = await res.json();
  alert(data.message);

  loadProducts();
}

/* =====================
   DELETE PRODUCT
===================== */
async function deleteProduct(id) {
  if (!confirm("Delete product?")) return;

  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  alert(data.message);

  loadProducts();
}

loadProducts();
