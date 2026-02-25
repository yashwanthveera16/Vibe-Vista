# 🛍️ Vibe Vista — Full-Stack E-Commerce Platform

Live Demo: https://vibe-vista.onrender.com  

Vibe Vista is a full-stack e-commerce web application built with the MERN stack architecture.  
It provides a complete shopping experience including product browsing, cart, wishlist, authentication, order placement, and an admin product management panel.

---

## 🚀 Features

### 👤 User Features
- User registration & login (JWT authentication)
- Browse products with filters & search
- Product detail view with size selection
- Add to Cart & Wishlist
- Place orders with checkout details
- View order history in profile

### 🛒 Shopping System
- Persistent cart using localStorage
- Wishlist management
- Dynamic product loading from MongoDB
- Real-time cart totals & quantity controls

### 🔐 Authentication & Security
- JWT-based authentication
- Protected API routes
- Role-based access (admin / user)
- Secure password hashing (bcrypt)

### 🧑‍💼 Admin Panel
- Admin-only product management
- Add new products
- Delete products
- Product catalog stored in MongoDB Atlas
- Live update across dashboard

### 🌐 Deployment
- Backend deployed on Render
- MongoDB Atlas cloud database
- Static frontend served via Express
- Fully live MERN stack app

---

## 🧱 Tech Stack

*Frontend*
- HTML
- CSS
- JavaScript
- Responsive layout

*Backend*
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt

*Deployment*
- Render (Backend + Static hosting)
- GitHub

---

## 📁 Project Structure

vibe-vista/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   ├── seed.js
│   └── server.js
│
├── frontend/
│   ├── admin/
│   │   ├── admin.html
│   │   ├── admin.css
│   │   └── admin.js
│   │
│   ├── dashboard/
│   │   ├── images/
│   │   ├── dashboard.html
│   │   ├── dashboard.css
│   │   ├── dashboard.js
│   │   ├── product.html
│   │   ├── product.css
│   │   ├── product.js
│   │   ├── cart.html
│   │   ├── cart.css
│   │   ├── cart.js
│   │   ├── wishlist.html
│   │   ├── wishlist.css
│   │   └── wishlist.js
│   │
│   ├── loginpage/
│   │   ├── login.html
│   │   ├── auth.css
│   │   └── auth.js
│   │
│   └── profile/
│       ├── profile.html
│       ├── profile.css
│       └── profile.js
│
├── .gitignore
