import { useState } from "react";
import PropTypes from "prop-types";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Receipt from "./Receipt";

const PaymentForm = ({ amount, cartItems }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showReceipt, setShowReceipt] = useState(false);
    const [orderData, setOrderData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login to make payment");
                navigate("/login");
                return;
            }

            // Create payment intent
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/payment/create-payment-intent`,
                { amount: Math.round(amount * 100) },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!data.clientSecret) {
                throw new Error("Failed to initialize payment");
            }

            // Process payment
            const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: localStorage.getItem("userName") || 'Customer',
                        },
                    },
                }
            );

            if (paymentError) {
                throw new Error(paymentError.message);
            }

            if (paymentIntent.status === 'succeeded') {
                try {
                    // Create order after successful payment
                    const orderResponse = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}/api/order/add`,
                        {
                            items: cartItems.map(item => ({
                                productId: item.productId._id,
                                title: item.productId.title,
                                price: Number(item.productId.price.replace(/[^0-9.-]+/g, "")),
                                quantity: item.quantity
                            })),
                            totalAmount: amount,
                            paymentIntentId: paymentIntent.id
                        },
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    );

                    // Set order data for receipt
                    setOrderData({
                        orderId: orderResponse.data._id,
                        paymentIntentId: paymentIntent.id,
                        items: cartItems.map(item => ({
                            title: item.productId.title,
                            quantity: item.quantity,
                            price: Number(item.productId.price.replace(/[^0-9.-]+/g, ""))
                        })),
                        totalAmount: amount
                    });

                    setShowReceipt(true);
                    toast.success('Order placed successfully!');
                } catch (orderError) {
                    console.error("Order creation failed:", orderError);
                    toast.error("Payment successful but order creation failed");
                }
            }
        } catch (error) {
            console.error("Payment error:", error);
            const errorMessage = error.response?.data?.error || error.message || "Payment failed";
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseReceipt = () => {
        setShowReceipt(false);
        navigate('/OrdersPage', { replace: true });
    };

    return (
        <>
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6" role="form">
                    <div className="p-4 border rounded-md bg-gray-50">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Details
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                    hidePostalCode: true
                                }}
                                className="mt-3"
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={!stripe || loading}
                        className={`w-full py-2 px-4 rounded-md text-white font-medium
                            ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-yellow-600 hover:bg-yellow-700'
                            }`}
                        aria-busy={loading}
                    >
                        {loading ? "Processing..." : `Pay ₹${amount}`}
                    </button>

                    {error && (
                        <div role="alert" className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                </form>
            </div>

            {showReceipt && orderData && (
                <Receipt orderData={orderData} onClose={handleCloseReceipt} />
            )}
        </>
    );
};

PaymentForm.propTypes = {
    amount: PropTypes.number.isRequired,
    cartItems: PropTypes.array.isRequired
};

export default PaymentForm;