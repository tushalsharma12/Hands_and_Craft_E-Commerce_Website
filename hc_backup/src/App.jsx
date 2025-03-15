// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./componants/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./componants/Footer.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Dining from "./pages/Dining.jsx";
import Lighting from "./pages/Lighting.jsx";
import Decor from "./pages/Decor.jsx";
import Garden from "./pages/Garden.jsx";
import About from "./pages/About.jsx";
import Signup from './pages/Signup.jsx';
import ProductDetails from "./pages/ProductDetails.jsx";
import Checkout from "./componants/Checkout";
import Showmore from "./pages/Showmore.jsx";
import ScrollToTop from "./pages/Scroll_top.jsx";
import Admin2 from "./pages/Admin2.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Cart from "./pages/Cart.jsx";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./componants/ErrorBoundary.jsx";
import AdminRoute from "./componants/AdminRoute";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrdersPage from "./pages/OrdersPage.jsx";

function App() {

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  return (
    <AuthProvider>
      <CartProvider>
        <ErrorBoundary>
          <Router>
            <ScrollToTop />
            <Navbar />
            <ToastContainer position="top-center" style={{ marginTop: "80px" }} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Admin2" element={<AdminRoute> <Admin2 /> </AdminRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/Checkout" element={<Elements stripe={stripePromise}><Checkout /></Elements>} />
              <Route path="/Dining" element={<Dining />} />
              <Route path="/Lighting" element={<Lighting />} />
              <Route path="/Decor" element={<Decor />} />
              <Route path="/Garden" element={<Garden />} />
              <Route path="/About" element={<About />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/OrdersPage" element={<OrdersPage />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Showmore" element={<Showmore />} />
            </Routes>
            <Footer />
          </Router>
        </ErrorBoundary>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;


