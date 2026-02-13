// =====================
// TOGGLE LOGIN / REGISTER
// =====================
function showRegister() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
}

function showLogin() {
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

/* =====================
   LOGIN
===================== */
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const error = document.getElementById("loginError");

  error.innerText = "";

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      error.innerText = data.message || "Login failed";
      return;
    }

    // Save token and role
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    // Redirect based on role
    if (data.role === "admin") {
      window.location.href = "/admin/admin.html";
    } else {
      window.location.href = "/dashboard/dashboard.html";
    }

  } catch (err) {
    console.error(err);
    error.innerText = "Cannot connect to server";
  }
});

/* =====================
   REGISTER
===================== */
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const confirm = document.getElementById("regConfirm").value.trim();
  const error = document.getElementById("registerError");

  error.innerText = "";

  if (password !== confirm) {
    error.innerText = "Passwords do not match";
    return;
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      error.innerText = data.message || "Registration failed";
      return;
    }

    alert("Account created successfully");
    showLogin();

  } catch (err) {
    console.error(err);
    error.innerText = "Cannot connect to server";
  }
});
