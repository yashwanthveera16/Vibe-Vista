const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const authMiddleware = require("/backend/middleware/authMiddleware");

const router = express.Router();

/* =====================
   CREATE ORDER FROM CART
===================== */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { shipping } = req.body;

    const cart = await Cart.findOne({ user: req.userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const order = new Order({
      user: req.userId,
      items: cart.items,
      totalAmount,
      shipping
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.json({ message: "Order placed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/my", authMiddleware, async (req, res) => {
  const orders = await Order.find({ user: req.userId })
    .sort({ createdAt: -1 });

  res.json(orders);
});

module.exports = router;
