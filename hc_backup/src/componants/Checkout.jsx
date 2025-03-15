// import PropTypes from "prop-types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import PaymentForm from "../componants/PaymentForm.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
    const location = useLocation();
    const product = location.state?.product || {};  // Ensure product is not undefined

    return (
        <Elements stripe={stripePromise}>  {/* ✅ Wrap Elements at the top */}
            <div className="max-w-lg mx-auto p-5">
                <h2 className="text-xl font-semibold">Checkout</h2>
                <p>{product.title}</p>
                <p className="text-yellow-600 text-2xl">₹{product.price}</p>
                <PaymentForm amount={product.price} cartItems={[]} />  {/* ✅ Corrected usage */}
            </div>
        </Elements>
    );
};

export default Checkout;
