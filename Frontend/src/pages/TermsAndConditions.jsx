import React from 'react';
import Heading from '../sections/Heading';


const TermsAndConditions = () => {
    return (
        <div className="w-full mx-auto bg-white text-gray-800">
            {/* Header Section */}
            <Heading heading="Terms & Conditions" subheading="Your guide to using our services responsibly" />

            {/* Main Content */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 py-4 sm:py-8 text-justify space-y-4">
                <p className="text-base leading-relaxed">
                    These Terms and Conditions ("Terms") govern your use of the website operated by ExclusiveLane
                    ("we", "us", "our"). By accessing or using our website or services, you agree to be bound by these Terms.
                </p>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">1. Use of the Site</h2>
                    <p>
                        You agree to use our Site only for lawful purposes. You must not use the Site to engage in any activity
                        that is harmful, offensive, or otherwise violates any laws or these Terms.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">2. Account Registration</h2>
                    <p>
                        If you create an account, you are responsible for maintaining the confidentiality of your account
                        credentials. You agree to provide accurate and complete information and to notify us of any
                        unauthorized use of your account.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property</h2>
                    <p>
                        All content on the Site including text, graphics, logos, images, and software is our property or
                        licensed to us. You may not copy, modify, distribute, or reproduce any part of the Site without
                        our written permission.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">4. Product Information</h2>
                    <p>
                        We strive to display accurate product descriptions and prices, but we do not warrant that all
                        information is complete or error-free. We reserve the right to correct errors and update product
                        information at any time without prior notice.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">5. Orders & Payments</h2>
                    <p>
                        All orders are subject to acceptance and availability. We reserve the right to cancel or refuse
                        any order. Payment must be made in full before shipment. Prices are subject to change without notice.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">6. Returns & Refunds</h2>
                    <p>
                        Please refer to our Return Policy for information on how to return products and request refunds.
                        We reserve the right to deny returns or exchanges that do not comply with our policies.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">7. Limitation of Liability</h2>
                    <p>
                        We shall not be liable for any indirect, incidental, special, or consequential damages arising out
                        of your use of the Site or Services, to the extent permitted by law.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">8. Indemnification</h2>
                    <p>
                        You agree to indemnify and hold us harmless from any claims, damages, or losses arising from your
                        violation of these Terms or any applicable laws.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">9. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of India. Any disputes
                        shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">10. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these Terms at any time. Changes will be posted on this page with
                        an updated "Last updated" date. Your continued use of the Site constitutes acceptance of those changes.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default TermsAndConditions;
