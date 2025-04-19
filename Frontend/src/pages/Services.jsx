import React from 'react';
import Heading from '../sections/Heading';
import Service_1 from '../assets/images/Service_1.png';
import Service_2 from '../assets/images/service_2.jpeg';
import Service_3 from '../assets/images/Service_3.jpeg';
import Service_4 from '../assets/images/Service_4.jpg';

const Services = () => {
  return (
    <div className="w-full mx-auto bg-white text-gray-800">
      {/* Header Section */}
      <Heading
        heading="Our Premium Handcrafted Services"
        subheading="Explore the unique, bespoke offerings crafted just for you"
      />

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 py-6 sm:py-12 space-y-12">
        {/* Service 1 */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <img
            src={Service_1}
            alt="Custom Furniture"
            className="w-full md:w-1/2 h-60 object-cover rounded-lg shadow-lg"
          />
          <div className="md:w-1/2 text-justify">
            <h2 className="text-2xl font-semibold mb-3">Custom Furniture</h2>
            <p className="mb-4">
              We specialize in creating one-of-a-kind furniture pieces tailored to your style and space. Each item
              is handcrafted using premium materials and expert techniques to ensure durability and elegance.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fully customizable designs</li>
              <li>Sustainable, high-quality materials</li>
              <li>Expert craftsmanship with attention to detail</li>
            </ul>
          </div>
        </div>

        {/* Service 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center space-y-6 md:space-y-0 md:space-x-8">
          <img
            src={Service_2}
            alt="Home Décor"
            className="w-full md:w-1/2 h-60 object-cover rounded-lg shadow-lg"
          />
          <div className="md:w-1/2 text-justify">
            <h2 className="text-2xl font-semibold mb-3">Home Décor</h2>
            <p className="mb-4">
              Our curated décor pieces add warmth and personality to any room. From wall art to table accents, each
              creation brings a unique, artisanal touch to your home.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Handcrafted with passion</li>
              <li>Unique artistic designs</li>
              <li>Ideal for any interior style</li>
            </ul>
          </div>
        </div>

        {/* Service 3 */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <img
            src={Service_3}
            alt="Outdoor Craft"
            className="w-full md:w-1/2 h-60 object-cover rounded-lg shadow-lg"
          />
          <div className="md:w-1/2 text-justify">
            <h2 className="text-2xl font-semibold mb-3">Outdoor Craft</h2>
            <p className="mb-4">
              Enhance your outdoor living area with our durable and stylish garden furniture and décor. Each piece
              is designed to withstand the elements while maintaining a handcrafted charm.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Weather-resistant designs</li>
              <li>Eco-friendly materials</li>
              <li>Built for durability and beauty</li>
            </ul>
          </div>
        </div>

        {/* Service 4 */}
        <div className="flex flex-col md:flex-row-reverse items-center space-y-6 md:space-y-0 md:space-x-8">
          <img
            src={Service_4}
            alt="Custom Wooden Creations"
            className="w-full md:w-1/2 h-60 object-cover rounded-lg shadow-lg"
          />
          <div className="md:w-1/2 text-justify">
            <h2 className="text-2xl font-semibold mb-3">Custom Wooden Creations</h2>
            <p className="mb-4">
              From bespoke shelving to intricate sculptures, our artisans bring your vision to life with custom
              wooden designs. Every project is tailored to your preferences and space requirements.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Premium hand-selected woods</li>
              <li>Innovative, custom designs</li>
              <li>Precision craftsmanship</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;