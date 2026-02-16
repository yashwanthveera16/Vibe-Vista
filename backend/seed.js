require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany([

      // ================= MEN JACKETS =================
      { name: "Men Jacket Black", category: "men", type: "jacket", price: 2999, sizes: ["S","M","L"], image: "images/men/jackets/jacket_1.jpg" },
      { name: "Men Jacket Blue", category: "men", type: "jacket", price: 3499, sizes: ["M","L","XL"], image: "images/men/jackets/jacket_2.jpg" },
      { name: "Men Jacket Grey", category: "men", type: "jacket", price: 2799, sizes: ["S","M"], image: "images/men/jackets/jacket_3.jpg" },
      { name: "Men Jacket Olive", category: "men", type: "jacket", price: 3199, sizes: ["M","L"], image: "images/men/jackets/jacket_4.jpg" },
      { name: "Men Jacket Brown", category: "men", type: "jacket", price: 3899, sizes: ["L","XL"], image: "images/men/jackets/jacket_5.jpg" },
      { name: "Men Jacket Winter Pro", category: "men", type: "jacket", price: 4499, sizes: ["M","L","XL"], image: "images/men/jackets/jacket_6.jpg" },
      { name: "Men Jacket Street Fit", category: "men", type: "jacket", price: 3299, sizes: ["S","M","L"], image: "images/men/jackets/jacket_7.jpg" },
      { name: "Men Jacket Urban", category: "men", type: "jacket", price: 3699, sizes: ["M","L"], image: "images/men/jackets/jacket_8.jpg" },

      // ================= MEN JEANS =================
      { name: "Men Jeans Classic Blue", category: "men", type: "jeans", price: 1999, sizes: ["S","M","L"], image: "images/men/jeans/jeans_1.jpg" },
      { name: "Men Jeans Slim Fit", category: "men", type: "jeans", price: 2199, sizes: ["M","L"], image: "images/men/jeans/jeans_2.jpg" },
      { name: "Men Jeans Dark Wash", category: "men", type: "jeans", price: 2399, sizes: ["S","M","L"], image: "images/men/jeans/jeans_3.jpg" },
      { name: "Men Jeans Straight Fit", category: "men", type: "jeans", price: 1899, sizes: ["M","L"], image: "images/men/jeans/jeans_4.jpg" },
      { name: "Men Jeans Casual", category: "men", type: "jeans", price: 2099, sizes: ["S","M"], image: "images/men/jeans/jeans_5.jpg" },
      { name: "Men Jeans Urban Fit", category: "men", type: "jeans", price: 2499, sizes: ["M","L","XL"], image: "images/men/jeans/jeans_6.jpg" },
      { name: "Men Jeans Street Style", category: "men", type: "jeans", price: 2299, sizes: ["M","L"], image: "images/men/jeans/jeans_7.jpg" },
      { name: "Men Jeans Comfort Fit", category: "men", type: "jeans", price: 1899, sizes: ["S","M"], image: "images/men/jeans/jeans_8.jpg" },
      { name: "Men Jeans Regular", category: "men", type: "jeans", price: 1799, sizes: ["S","M","L"], image: "images/men/jeans/jeans_9.jpg" },

      // ================= MEN TSHIRTS =================
      { name: "Men T-Shirt White", category: "men", type: "tshirt", price: 999, sizes: ["S","M","L"], image: "images/men/tshirts/tshirt_1.jpg" },
      { name: "Men T-Shirt Black", category: "men", type: "tshirt", price: 1099, sizes: ["M","L"], image: "images/men/tshirts/tshirt_2.jpg" },
      { name: "Men T-Shirt Printed", category: "men", type: "tshirt", price: 1199, sizes: ["S","M"], image: "images/men/tshirts/tshirt_3.jpg" },
      { name: "Men T-Shirt Oversized", category: "men", type: "tshirt", price: 1399, sizes: ["M","L","XL"], image: "images/men/tshirts/tshirt_4.jpg" },
      { name: "Men T-Shirt Casual", category: "men", type: "tshirt", price: 899, sizes: ["S","M","L"], image: "images/men/tshirts/tshirt_5.jpg" },
      { name: "Men T-Shirt Streetwear", category: "men", type: "tshirt", price: 1499, sizes: ["M","L"], image: "images/men/tshirts/tshirt_6.jpg" },
      { name: "Men T-Shirt Graphic", category: "men", type: "tshirt", price: 1299, sizes: ["S","M"], image: "images/men/tshirts/tshirt_7.jpg" },

      // ================= WOMEN BAGS =================
      { name: "Women Hand Bag Classic", category: "women", type: "bag", price: 2599, sizes: ["Free"], image: "dashboard/images/women/bags/bag_1.jpg" },
      { name: "Women Bag Casual", category: "women", type: "bag", price: 2299, sizes: ["Free"], image: "dashboard/images/women/bags/bag_2.jpg" },
      { name: "Women Bag Premium", category: "women", type: "bag", price: 3199, sizes: ["Free"], image: "dashboard/images/women/bags/bag_3.jpg" },
      { name: "Women Bag Office", category: "women", type: "bag", price: 2899, sizes: ["Free"], image: "dashboard/images/women/bags/bag_4.jpg" },
      { name: "Women Bag Trendy", category: "women", type: "bag", price: 3499, sizes: ["Free"], image: "dashboard/images/women/bags/bag_5.jpg" },
      { name: "Women Bag Fashion", category: "women", type: "bag", price: 2799, sizes: ["Free"], image: "dashboard/images/women/bags/bag_6.jpg" },

      // ================= WOMEN SANDALS =================
      { name: "Women Sandals Comfort", category: "women", type: "sandals", price: 1799, sizes: ["S","M","L"], image: "dashboard/images/women/sandals/sandles_1.jpg" },
      { name: "Women Sandals Elegant", category: "women", type: "sandals", price: 1999, sizes: ["M","L"], image: "dashboard/images/women/sandals/sandles_2.jpg" },

      // ================= WOMEN SHIRTS =================
      { name: "Women Shirt Casual", category: "women", type: "shirt", price: 1599, sizes: ["S","M"], image: "dashboard/images/women/shirts/shirts_1.jpg" },
      { name: "Women Shirt Office", category: "women", type: "shirt", price: 1799, sizes: ["M","L"], image: "dashboard/images/women/shirts/shirts_2.jpg" },
      { name: "Women Shirt Trendy", category: "women", type: "shirt", price: 1899, sizes: ["S","M"], image: "dashboard/images/women/shirts/shirts_3.jpg" },
      { name: "Women Shirt Cotton", category: "women", type: "shirt", price: 1499, sizes: ["S","M","L"], image: "dashboard/images/women/shirts/shirts_4.jpg" },
      { name: "Women Shirt Elegant", category: "women", type: "shirt", price: 1999, sizes: ["M","L"], image: "dashboard/images/women/shirts/shirts_5.jpg" },
      { name: "Women Shirt Daily Wear", category: "women", type: "shirt", price: 1399, sizes: ["S","M"], image: "images/women/shirts/shirts_6.jpg" }

    ]);

    console.log("ALL products seeded successfully");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });