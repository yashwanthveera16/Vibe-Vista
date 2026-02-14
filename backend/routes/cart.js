const express = require("express");
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/temp");

const router = express.Router();

/* =====================
   GET MY CART
===================== */
router.get("/", authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      cart = await Cart.create({ user: req.userId, items: [] });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

/* =====================
   ADD TO CART
===================== */
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { product, name, price, image, size } = req.body;

    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      cart = await Cart.create({ user: req.userId, items: [] });
    }

    const existing = cart.items.find(
      i => i.product.toString() === product && i.size === size
    );

    if (existing) {
      existing.qty += 1;
    } else {
      cart.items.push({ product, name, price, image, size, qty: 1 });
    }

    await cart.save();

    res.json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

/* =====================
   REMOVE ITEM
===================== */
router.post("/remove", authMiddleware, async (req, res) => {
  try {
    const { product, size } = req.body;

    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) return res.status(400).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      i => !(i.product.toString() === product && i.size === size)
    );

    await cart.save();

    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item" });
  }
});

/* =====================
   CLEAR CART
===================== */
router.post("/clear", authMiddleware, async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.userId },
      { items: [] }
    );

    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
});

module.exports = router;
