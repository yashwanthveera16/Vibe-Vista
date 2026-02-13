const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

const app = express();

/* =====================
   MIDDLEWARE
===================== */
app.use(cors());
app.use(express.json());

/* =====================
   API ROUTES
===================== */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

/* =====================
   SERVE FRONTEND
===================== */

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// Default route to load dashboard
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dashboard/dashboard.html"));
});

/* =====================
   DB CONNECTION
===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

/* =====================
   SERVER
===================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
