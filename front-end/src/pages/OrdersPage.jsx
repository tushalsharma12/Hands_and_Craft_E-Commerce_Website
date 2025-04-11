import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/order/user`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setOrders(data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to load orders");
                toast.error("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 md:py-4 text-center">
                Your Orders 📦
            </h1>

            {error ? (
                <div className="text-red-500 text-center text-lg font-medium">{error}</div>
            ) : orders?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border border-gray-200 shadow-md rounded-xl p-4 sm:p-6">
                            {/* Order Header */}
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                                    Order ID: <span className="text-gray-700">{order._id}</span>
                                </h2>
                                <span className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-full 
                                    ${order.paymentStatus === 'paid'
                                        ? 'bg-green-100 text-green-700 border border-green-300'
                                        : 'bg-yellow-100 text-yellow-700 border border-yellow-300'}`}>
                                    {order.paymentStatus}
                                </span>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-3 border-t border-gray-200 pt-4">
                                {order.items?.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 border-b border-gray-200 pb-3">
                                        {item.productId?.img && (
                                            <img
                                                src={item.productId.img}
                                                alt={item.productId.title}
                                                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'fallback-image-url';
                                                }}
                                            />
                                        )}
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800 text-xs sm:text-sm md:text-base">
                                                {item.productId?.title || item.title || "Product Unavailable"}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-600">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-medium text-gray-900 text-sm sm:text-base">
                                            ₹{item.productId?.price || item.price || "N/A"}
                                        </p>
                                    </div>
                                ))}

                                {/* Order Total */}
                                <div className="flex justify-between items-center pt-3">
                                    <p className="font-bold text-gray-900">Total Amount:</p>
                                    <p className="font-bold text-lg sm:text-xl text-yellow-600">₹{order.totalAmount}</p>
                                </div>
                            </div>

                            {/* Order Date */}
                            <div className="mt-3 text-xs sm:text-sm text-gray-500 text-right">
                                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">No orders found 😞</p>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
