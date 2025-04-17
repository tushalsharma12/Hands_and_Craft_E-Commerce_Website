import React from 'react';
import Heading from '../sections/Heading';


const PrivacyPolicy = () => {
  return (
    <div className="w-full mx-auto bg-white text-gray-800">
      {/* Header Section */}
    
      <Heading heading="Privacy Policy" subheading="Your privacy is important to us" />


      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 py-4 sm:py-8 text-justify space-y-4">
        <p className="text-base leading-relaxed">
          This Privacy Policy describes how ExclusiveLane (the "Site", "we", "us", or "our") collects, uses,
          and discloses your personal information when you visit, use our services, or make a purchase from
          exclusivelane.com or otherwise communicate with us.
        </p>

        <p className="text-base leading-relaxed">
          By using any of our Services, you agree to this Privacy Policy. If you do not agree, please do not
          access or use the Services.
        </p>

        {/* Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes to our practices or legal
            requirements. The latest version will always be posted on our Site.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">How We Collect and Use Your Personal Information</h2>
          <p>
            To provide the Services, we collect personal information from a variety of sources. This depends on
            how you interact with us. This may include contact details, account information, shopping behavior,
            and support communication.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">What Personal Information We Collect</h2>
          <h3 className="font-medium mt-4">Information We Collect Directly from You:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Contact details including your name, address, phone number, and email.</li>
            <li>Order information including billing/shipping address and payment confirmation.</li>
            <li>Account info including your username, password, and security questions.</li>
            <li>Shopping history like items viewed, in cart, saved, or purchased.</li>
            <li>Customer support messages you send us.</li>
          </ul>

          <h3 className="font-medium mt-4">Information We Collect about Your Usage:</h3>
          <p>
            We collect certain information automatically through cookies and similar tools (browser/device info, IP, etc.).
          </p>

          <h3 className="font-medium mt-4">Information We Obtain from Third Parties:</h3>
          <p>
            This includes payment partners, analytics tools, marketing platforms, and fulfillment partners.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">How We Use Your Personal Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To fulfill and manage orders and provide Services.</li>
            <li>Marketing and promotional messaging.</li>
            <li>Fraud detection and account security.</li>
            <li>Service support and experience enhancement.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">How We Disclose Personal Information</h2>
          <p>
            We may share your info with vendors, partners, and affiliates for business operations, support,
            analytics, legal obligations, or corporate restructuring.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">User Generated Content</h2>
          <p>
            Content like reviews submitted publicly is visible to others. We are not liable for third-party
            misuse of such content.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Third Party Websites and Links</h2>
          <p>
            Our Site may contain links to other sites. We are not responsible for their privacy practices.
            Always review their policies.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Security and Retention of Your Information</h2>
          <p>
            We use standard industry security measures to protect your information. We retain data only for as
            long as required for legal or operational reasons.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
          <p>
            Depending on your location, you may request access, correction, deletion, or transfer of your
            personal data. Contact us to exercise these rights.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
