import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImageOff } from "lucide-react";

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
                    headers: { Authorization: `Bearer ${token}` },
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
    }, [navigate]);

    const handleImageError = (e) => {
        const fallbackElement = e.target.parentElement.querySelector(".fallback-image");
        if (fallbackElement) {
            e.target.style.display = "none";
            fallbackElement.style.display = "flex";
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500 border-solid"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">🛍️ Your Orders</h1>

            {error ? (
                <p className="text-red-600 text-center text-lg">{error}</p>
            ) : orders.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white shadow-lg rounded-2xl p-5 transition hover:shadow-2xl border border-gray-100"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-sm font-semibold text-gray-600">
                                    Order ID:{" "}
                                    <span className="text-gray-900 font-medium">{order._id.slice(-6)}</span>
                                </h2>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        order.paymentStatus === "paid"
                                            ? "bg-green-100 text-green-700 border border-green-300"
                                            : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                                    }`}
                                >
                                    {order.paymentStatus}
                                </span>
                            </div>

                            {/* Items */}
                            <div className="divide-y divide-gray-200">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 py-3">
                                        <div className="relative w-14 h-14">
                                            <img
                                                src={item.productId?.img || item.img || "/placeholder.jpg"}
                                                alt={item.productId?.title || "Product"}
                                                className="w-full h-full object-cover rounded-md"
                                                onError={handleImageError}
                                            />
                                            <div className="fallback-image hidden absolute inset-0 bg-gray-100 rounded-md items-center justify-center">
                                                <ImageOff className="w-6 h-6 text-gray-400" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-800">
                                                {item.productId?.title || item.title || "N/A"}
                                            </p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-700">
                                            ₹{item.productId?.price || item.price}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Total & Date */}
                            <div className="mt-4 flex justify-between items-center border-t pt-3 text-sm text-gray-700">
                                <span className="font-semibold">Total:</span>
                                <span className="text-yellow-600 font-bold text-lg">₹{order.totalAmount}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-2 text-right">
                                📅 {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-16">
                    <p className="text-xl">No orders yet! 😕</p>
                    <p className="text-sm mt-2">Looks like you haven't made any purchases.</p>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
