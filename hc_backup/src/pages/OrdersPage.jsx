import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("Please login to view orders");
                    return;
                }

                const { data } = await axios.get("http://localhost:5000/api/order/user", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log("Fetched orders:", data);
                setOrders(data);
            } catch (err) {
                console.error("Fetch Orders Error:", err);
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
        <div className="max-w-6xl mx-auto p-6 min-h-96 my-2">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                Your Orders 📦
            </h1>

            {error ? (
                <div className="text-red-500 text-center text-lg font-medium">{error}</div>
            ) : orders?.length > 0 ? (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border border-gray-200 shadow-md rounded-xl p-6">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Order ID: <span className="text-gray-700">{order._id}</span>
                                </h2>
                                <span className={`px-4 py-1 text-sm font-medium rounded-full 
                                    ${order.paymentStatus === 'paid'
                                        ? 'bg-green-100 text-green-700 border border-green-300'
                                        : 'bg-yellow-100 text-yellow-700 border border-yellow-300'}`}>
                                    {order.paymentStatus}
                                </span>
                            </div>

                            <div className="space-y-3 border-t border-gray-200 pt-4">
                                {order.items?.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center border-b border-gray-200 pb-3">
                                        {item.productId?.img && (
                                            <img
                                                src={item.productId.img}
                                                alt={item.productId.title}
                                                className="w-16 h-16 object-cover rounded"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'fallback-image-url';
                                                }}
                                            />
                                        )}
                                        <p className="font-medium text-gray-800">
                                            {item.productId?.title || item.title || "Product Unavailable"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Quantity: {item.quantity}
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            Price: ₹{item.productId?.price || item.price || "N/A"}
                                        </p>
                                    </div>
                                ))}

                                <div className="flex justify-between items-center pt-3">
                                    <p className="font-bold text-gray-900">Total Amount:</p>
                                    <p className="font-bold text-xl text-yellow-600">₹{order.totalAmount}</p>
                                </div>
                            </div>

                            <div className="mt-3 text-sm text-gray-500 text-right">
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
