const API = "http://localhost:5000/api/products";
const token = localStorage.getItem("token");

if (!token) {
  alert("Login required");
  window.location.href = "../loginpage/login.html";
}

const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const logoutBtn = document.getElementById("logoutBtn");
const backBtn = document.getElementById("backBtn");

let editingId = null;

/* ======================
   LOAD PRODUCTS
====================== */
async function loadProducts() {
  try {
    const res = await fetch(API);
    const products = await res.json();

    renderProducts(products);
  } catch (err) {
    console.error(err);
  }
}

/* ======================
   RENDER PRODUCTS
====================== */
function renderProducts(products) {
  productList.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <img src="${product.image}" />
      <div class="product-info">
        <h4>${product.name}</h4>
        <p>₹${product.price}</p>
        <p>${product.category} | ${product.type}</p>
        <p>Sizes: ${product.sizes.join(", ")}</p>
      </div>
      <div class="actions">
        <button onclick="editProduct('${product._id}')">Edit</button>
        <button onclick="deleteProduct('${product._id}')">Delete</button>
      </div>
    `;

    productList.appendChild(div);
  });
}

/* ======================
   ADD / UPDATE PRODUCT
====================== */
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const productData = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    type: document.getElementById("type").value,
    price: document.getElementById("price").value,
    sizes: document.getElementById("sizes").value.split(","),
    image: document.getElementById("image").value
  };

  try {
    if (editingId) {
      await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      editingId = null;
    } else {
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
    }

    productForm.reset();
    loadProducts();

  } catch (err) {
    console.error(err);
  }
});

/* ======================
   EDIT PRODUCT
====================== */
window.editProduct = async function (id) {
  const res = await fetch(`${API}/${id}`);
  const product = await res.json();

  document.getElementById("name").value = product.name;
  document.getElementById("category").value = product.category;
  document.getElementById("type").value = product.type;
  document.getElementById("price").value = product.price;
  document.getElementById("sizes").value = product.sizes.join(",");
  document.getElementById("image").value = product.image;

  editingId = id;
};

/* ======================
   DELETE PRODUCT
====================== */
window.deleteProduct = async function (id) {
  if (!confirm("Delete this product?")) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  loadProducts();
};

/* ======================
   LOGOUT
====================== */
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "../loginpage/login.html";
});

/* ======================
   BACK
====================== */
backBtn.addEventListener("click", () => {
  window.location.href = "../dashboard/dashboard.html";
});

loadProducts();
