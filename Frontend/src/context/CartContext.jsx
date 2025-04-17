import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("✅ Cart Response:", response.data);

      if (response.data && response.data.products) {
        setCart(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    };

    CartProvider.propTypes = {
      children: PropTypes.node.isRequired,
    };
  };

  const addToCart = async (product, quantity = 1) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart/add`,
        {
          productId: product._id,
          quantity: quantity
        },
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        }
      );
      console.log("Cart response:", response.data); // Debug log
      if (response.data && response.data.cart) {
        setCart(response.data.cart.products);
        toast.success(quantity > 0 ? "Added to cart!" : "Updated cart quantity");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data) {
        setCart(prevCart => prevCart.filter(item => item.productId._id !== productId));
        toast.success("Item removed from cart");
      }

    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      loading,
      addToCart,
      removeFromCart,
      clearCart,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};