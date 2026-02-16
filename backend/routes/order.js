const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/*
=================================
CREATE ORDER FROM FRONTEND CART
=================================
*/

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, shipping } = req.body;

    // Validate cart items
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    
    // Create order
    const order = new Order({
      user: req.user.id, // IMPORTANT: from decoded token
      items: items.map(i=> ({
        product: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
        size: i.size,
        image: i.image
      })),
      totalAmount,
      shipping,
    });

    await order.save();

    res.json({ message: "Order placed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/*
=======================
GET MY ORDERS
=======================
*/

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
