import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // Empty cart icon

const Cart = () => {
  const { cart, loading, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (loading) {
    return <div className="p-6 text-center text-lg font-semibold">Loading...</div>;
  }

  const handleCheckout = () => {
    navigate("/payment");
  };

  const handleQuantityChange = async (product, change) => {
    const newQuantity = product.quantity + change;
    if (newQuantity < 0) return; // Prevent negative quantities
    if (newQuantity === 0) { // Remove if quantity becomes 0
      await removeFromCart(product._id);
    } else {
      await addToCart(product, change);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 text-center">Your Shopping Cart 🛒 </h2>

      <div className="flex items-center mb-5 mt-3  rounded-lg ">
        <i className="fa-regular fa-handshake mr-5 mt-1 text-gray-600 text-4xl"></i>
        <p className="text-sm text-gray-600">
          Buy confidently with Hands&Craft&apos;s Purchase Protection programme for buyers, get a full refund in the rare case your item doesn&apos;t arrive, arrives damaged, or isn&apos;t as described.
        </p>
      </div>

      {cart?.length > 0 ? (
        <>
          <div className="grid gap-6">
            {cart.map((item) => (
              item?.productId && (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-center justify-between p-5 border rounded-lg shadow-md bg-white transition-transform hover:scale-[1.02]"
                >
                  {/* Product Image */}
                  <div className="flex items-center gap-6">
                    <img
                      src={item.productId.img || "/placeholder.jpg"}
                      alt={item.productId.title || "Product Image"}
                      className="w-48 h-48 object-cover rounded-lg border"
                    />

                    {/* Product Details */}
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-lg">{item.productId.title || "No Title"}</h3>
                      <div className="flex gap-4 text-sm text-gray-600 mt-2">
                        <p>Price: <span className="text-black font-medium">₹{item.productId.price || "N/A"}</span></p>
                        <p>Previous: <span className="line-through">₹{item.productId.prev_price || "N/A"}</span></p>
                        <p className="text-green-600">Discount: {item.productId.discount || 0}%</p>
                      </div>
                    </div>
                  </div>



                  {/* Quantity Controls & Remove Button */}
                  <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <div className="flex items-center gap-3 border px-4 py-2 rounded-lg shadow-sm bg-gray-100">
                      <button
                        onClick={() => handleQuantityChange(item.productId, -1)}
                        className="text-lg px-3 py-1 hover:bg-gray-300 rounded transition"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, 1)}
                        className="text-lg px-3 py-1 hover:bg-gray-300 rounded transition"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId._id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Checkout Button */}
          <div className="mt-10 flex justify-end">
            <button
              onClick={handleCheckout}
              className="bg-yellow-500 text-white px-6 py-3 text-lg rounded-full shadow-lg hover:bg-yellow-600 transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        // Empty Cart Design
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-400" />
          <p className="text-gray-500 mt-4 text-lg">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-yellow-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
