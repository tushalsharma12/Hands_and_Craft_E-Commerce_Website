import React from 'react';
import Heading from '../sections/Heading';


const ShippingAndDelivery = () => {
    return (
        <div className="w-full mx-auto bg-white text-gray-800">
            {/* Header Section */}
            <Heading heading="Shipping & Delivery" subheading="Your guide to our shipping policies and delivery timelines" />

            {/* Main Content */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 py-4 sm:py-8 text-justify space-y-4">
                <p className="text-base leading-relaxed">
                    At ExclusiveLane, we strive to ensure your orders are delivered to you safely and on time. This Shipping & Delivery policy outlines our shipping methods, timelines, charges, and other related information.
                </p>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">1. Shipping Locations</h2>
                    <p>
                        We currently ship across India to all serviceable pin codes. For remote or restricted areas, delivery timelines may be longer.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">2. Shipping Charges</h2>
                    <p>
                        We offer <span className="font-medium">free shipping</span> on all prepaid orders. For COD (Cash on Delivery) orders, a nominal COD fee may be applicable and will be displayed during checkout.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">3. Order Processing Time</h2>
                    <p>
                        Orders are usually processed within 1–2 business days after successful payment. Orders placed on weekends or holidays are processed the next working day.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">4. Estimated Delivery Time</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Metro cities: 3–5 business days</li>
                        <li>Other cities: 5–7 business days</li>
                        <li>Remote areas: 7–10 business days</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">5. Order Tracking</h2>
                    <p>
                        Once your order is shipped, you will receive an email and/or SMS with a tracking number and link.
                        You can use it to track your order’s real-time status.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">6. Delays & Issues</h2>
                    <p>
                        Delivery times are estimates and may be affected by external factors such as weather, courier delays, or unforeseen circumstances. We are not responsible for delays beyond our control, but we will assist you in tracking the shipment.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">7. Damaged or Lost Packages</h2>
                    <p>
                        If your package arrives damaged or appears to be lost in transit, please contact our support team within 48 hours. We will investigate and resolve the issue as soon as possible.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">8. International Shipping</h2>
                    <p>
                        Currently, we do not offer international shipping. Stay tuned for updates as we expand our services in the future.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ShippingAndDelivery;
