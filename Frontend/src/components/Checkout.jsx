import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { Package, Truck, CreditCard, Shield } from 'lucide-react';
import PaymentForm from "../components/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
    const location = useLocation();
    const product = location.state?.product || {};
    const [quantity, setQuantity] = React.useState(product.quantity || 1);

    const calculateSubtotal = () => {
        const price = parseFloat(product.price?.replace(/[^0-9.-]+/g, "")) || 0;
        return (price * quantity).toFixed(2);
    };

    const calculateTotal = () => {
        const subtotal = parseFloat(calculateSubtotal());
        const shipping = 50;
        return (subtotal + shipping).toFixed(2);
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const cartItem = {
        productId: {
            _id: product._id,
            title: product.title,
            price: product.price,
            img: product.img
        },
        quantity: quantity
    };

    return (
        <Elements stripe={stripePromise}>
            <div className="min-h-screen bg-gray-50 py-5 px-3 md:py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Order Summary</h2>
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
                            <div className="w-32 h-32 rounded-lg overflow-hidden">
                                <img 
                                    src={product.img} 
                                    alt={product.title} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                                <div className="flex justify-center md:justify-start items-center space-x-2 mt-2">
                                    <span className="text-sm text-gray-600">Quantity:</span>
                                    <input 
                                        type="number" 
                                        value={quantity} 
                                        min="1" 
                                        onChange={(e) => handleQuantityChange(Number(e.target.value))}
                                        className="w-16 border rounded p-1 text-center"
                                    />
                                </div>
                                <div className="mt-2 flex justify-center md:justify-start items-center space-x-2">
                                    <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                                    {product.prev_price && (
                                        <span className="text-sm text-gray-500 line-through">₹{product.prev_price}</span>
                                    )}
                                </div>
                                {product.discount && (
                                    <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded mt-2">
                                        {product.discount}% OFF
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-gray-600">Subtotal</dt>
                                    <dd className="font-medium text-gray-900">₹{calculateSubtotal()}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-600">Shipping</dt>
                                    <dd className="font-medium text-gray-900">₹50</dd>
                                </div>
                                <div className="flex justify-between border-t border-gray-200 pt-3">
                                    <dt className="font-medium text-gray-900">Total</dt>
                                    <dd className="font-bold text-gray-900">₹{calculateTotal()}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                                <Package className="w-5 h-5 text-indigo-600" />
                                <span>Handcrafted Quality</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Truck className="w-5 h-5 text-indigo-600" />
                                <span>Fast Delivery</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-indigo-600" />
                                <span>Secure Shopping</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CreditCard className="w-5 h-5 text-indigo-600" />
                                <span>Easy Payments</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Payment Details</h2>
                        <PaymentForm 
                            amount={parseFloat(calculateTotal())} 
                            cartItems={[cartItem]} 
                        />
                    </div>
                </div>
            </div>
        </Elements>
    );
};

export default Checkout;