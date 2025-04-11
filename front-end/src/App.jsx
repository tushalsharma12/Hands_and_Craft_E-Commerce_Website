// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/utils/Scroll_top.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import AdminRoute from "./components/AdminRoute";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Loader from "./components/utils/Loader.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Dining = lazy(() => import("./pages/Dining.jsx"));
const Lighting = lazy(() => import("./pages/Lighting.jsx"));
const Decor = lazy(() => import("./pages/Decor.jsx"));
const Garden = lazy(() => import("./pages/Garden.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const Checkout = lazy(() => import("./components/Checkout"));
const Showmore = lazy(() => import("./pages/Showmore.jsx"));
const Admin2 = lazy(() => import("./pages/Admin2.jsx"));
const OrdersPage = lazy(() => import("./pages/OrdersPage.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Settings = lazy(() => import("./pages/Settings.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions.jsx"));
import ShippingAndDelivery from "./pages/ShippingAndDelivery.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import OurVision from "./pages/OurVision.jsx";
import BlogDetailPage from "./pages/BlogDetailPage.jsx";



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
            <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
              <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
              <Route path="/ShippingAndDelivery" element={<ShippingAndDelivery />} />
              <Route path="/BlogPage" element={<BlogPage />} />
              <Route path="/OurVision" element={<OurVision />} /> 
              <Route path="/BlogPage/:id" element={<BlogDetailPage />} />
              <Route path="/Admin2" element={<AdminRoute> <Admin2 /> </AdminRoute>} />
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
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            </Suspense>
            <Footer />
          </Router>
        </ErrorBoundary>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;


