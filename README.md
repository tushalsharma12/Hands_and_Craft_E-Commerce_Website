# 🛍️ Hands&Craft – Handcrafted E-Commerce Website (MERN Stack)

Welcome to **Hands&Craft**, a fully responsive and feature-rich handcrafted e-commerce platform built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This platform allows users to browse unique handcrafted items, securely log in, manage their cart, and make payments.

---

## 📌 Features

### 👥 User Side
- ✅ Register / Login (JWT Authentication)
- ✅ Browse products by **category** (Home, Decor, Dining, Garden)
- ✅ Explore products by **sections** (Trending Now, Best Sellers, Big Deals)
- ✅ Add to Cart & Checkout
- ✅ Stripe Payment Integration
- ✅ Search bar with dynamic filtering (by title/category)
- ✅ Profile management with profile picture upload

### 🛠️ Admin Side
- ✅ Admin login
- ✅ Add / Update / Delete Products with images (Multer)
- ✅ Product category and section-wise filtering
- ✅ Manage all uploaded products

---

## 🧱 Tech Stack

| Tech       | Usage                           |
|------------|---------------------------------|
| React.js   | Frontend UI with Tailwind CSS   |
| Node.js    | Backend runtime                 |
| Express.js | Server-side logic               |
| MongoDB    | NoSQL database with Mongoose    |
| Multer     | Image upload handling (backend) |
| Stripe API | Payment processing              |
| JWT        | Secure Authentication           |
| Vercel     | Frontend Deployment             |
| Render     | Backend Deployment              |

---

## 📁 Project Structure

hands&craft-ecommerce/
│
├── backend/                  # Node.js + Express + MongoDB backend
│   ├── controllers/          # Route handlers (products, auth, payment etc.)
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── uploads/              # Multer image uploads
│   ├── middleware/           # Auth, error handling
│   ├── server.js             # Backend entry point
│   ├── package.json              # Root-level package.json
│   └── .env                  # Environment variables (not committed)
│
├── frontend/                 # React.js + Tailwind CSS frontend
│   ├── public/               # Static files
│   ├── src/
│   │   ├── assets/           # Images, styles
│   │   ├── sections/         # Reusable UI components
│   │   ├── pages/            # Page-level components (Home, ProductDetails, Login etc.)
│   │   ├── admin/            # Admin panel pages (CRUD for products)
│   │   ├── context/          # Context API setup for auth/cart
│   │   ├── components/       # utils(Loader,Scroll_top) and Navbar,Footer,Receipt etc.
│   │   └── App.jsx           # Frontend entry point
│   ├── package.json              # Root-level package.json
│   └── .env                  # Frontend environment variables
│
└── README.md                 # Project Documentation
