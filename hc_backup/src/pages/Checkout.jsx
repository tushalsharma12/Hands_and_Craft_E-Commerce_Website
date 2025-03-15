// import React from "react";
import PaymentForm from "../componants/PaymentForm";
import PropTypes from 'prop-types';
import { useMemo } from "react";

const Checkout = ({amount}) => {
    const finalAmount = useMemo(() => {
        if (!amount) return 5000; // Default ₹50 if amount is missing
    
        const numericAmount =
          typeof amount === "string"
            ? Number(amount.replace(/,/g, ""))
            : Number(amount);
    
        return isNaN(numericAmount) ? 5000 : Math.round(numericAmount);
      }, [amount]);
    return (    
        <div>
            <h2>checkout</h2>
            <PaymentForm amount={finalAmount} />
        </div>
    );
};
Checkout.propTypes = {
    amount: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
};

export default Checkout;
