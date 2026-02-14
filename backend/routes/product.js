const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/temp");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

/* =====================
   GET ALL PRODUCTS
===================== */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/* =====================
   GET SINGLE PRODUCT
===================== */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

/* =====================
   ADD PRODUCT (ADMIN ONLY)
===================== */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.json({ message: "Product added successfully" });
    } catch (err) {
      res.status(400).json({ message: "Invalid product data" });
    }
  }
);

/* =====================
   DELETE PRODUCT (ADMIN ONLY)
===================== */
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  }
);

module.exports = router;
