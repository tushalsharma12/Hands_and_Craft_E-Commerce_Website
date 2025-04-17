import img1 from "../assets/aboutimg/aboutimg1.webp"
import img4 from "../assets/aboutimg/aboutimg4.webp"
import img5 from "../assets/aboutimg/aboutimg5.png"
import img6 from "../assets/aboutimg/aboutimg6.jpeg"
import img7 from "../assets/aboutimg/aboutimg7.jpg"
import img8 from "../assets/aboutimg/aboutimg8.jpg"
import img9 from "../assets/aboutimg/aboutimg9.jpg"
import img10 from "../assets/aboutimg/aboutimg10.jpg"
import img11 from "../assets/aboutimg/aboutimg11.jpg"
import img12 from "../assets/aboutimg/aboutimg12.png"
import { motion } from "framer-motion";
import { motion_bottom_to_top, banner,motion_left_to_right, motion_right_to_left } from "../variables/animation";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Heading from "../sections/Heading";

const img = [img6, img7, img8, img9, img10, img11];

const About = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#faqs') {
      const element = document.getElementById('faqs');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <section className="About w-full mx-auto  mb-8 sm:mb-12 lg:mb-32">
        
        <Heading heading="About Us" subheading="Get to know our story and passion for handcrafted art!" />

        <div className="max-w-[1360px] mx-auto my-4 sm:my-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
            <motion.div {...motion_left_to_right} className="lg:col-span-6 px-3 md:px-0">
              <img 
                src={img1} 
                alt="Art Workshop" 
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-lg"
              />
            </motion.div>

            <motion.div {...motion_right_to_left} className="lg:col-span-6 flex items-center px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col space-y-4 sm:space-y-6">
                <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold">
                  Experience the Transformative Power of Art at ArtEssence
                </h1>
                <div className="w-20 h-1 bg-amber-600"></div>
                <div className="space-y-4">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold">
                    Let your creativity soar and become a part of our vibrant community.
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                    Our mission is to inspire and empower individuals of all ages and skill levels to explore their creative potential. Through our diverse range of workshops and courses, we provide a platform for artistic growth and self-discovery.
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                    With a team of experienced artists and instructors, we offer a supportive and encouraging environment where creativity flourishes. Whether you are a beginner taking your first steps in the art world or an experienced artist seeking further inspiration, our programs are designed to cater to your needs and aspirations.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section {...motion_bottom_to_top} className="vision px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <div className="md:col-span-4 space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold">
                Learn About Our Mission and Vision
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                We create our workshops with love for hand work and collaboration.
              </p>
            </div>
            
            <div className="md:col-span-4 space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold">Our Mission</h3>
              <div className="space-y-3">
                <p className="text-sm sm:text-base text-gray-700">
                  Our mission at ArtEssence is to ignite creativity, inspire artistic exploration, and nurture a deep appreciation for the arts.
                </p>
                <p className="text-sm sm:text-base text-gray-700">
                  We strive to provide a welcoming and inclusive space where individuals of all backgrounds can unleash their creativity, develop their artistic skills, and express themselves authentically.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 space-y-4 ">
              <h3 className="text-lg sm:text-xl font-semibold">Our Vision</h3>
              <div className="space-y-3">
                <p className="text-sm sm:text-base text-gray-700">
                  We believe that pottery should be accessible to all. We strive to make it easy to come together and create unique pieces of art.
                </p>
                <p className="text-sm sm:text-base text-gray-700">
                  We're committed to fostering a love of pottery in all forms by providing a place where everyone can come to learn, discover, practice and create items that brings them joy and pride.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 sm:mt-24 lg:mt-32 ">
            <img 
              src={img4} 
              alt="Art Workshop" 
              className="w-full h-[200px] sm:h-[300px] lg:h-[450px] object-cover rounded-lg"
            />
          </div>
        </div>
      </motion.section>

      <motion.section {...banner} className="gift pt-8 sm:pt-12 lg:pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-center">
            <div className="flex items-center">
              <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold">
                Place your first order and get 50% off on any product!
              </h2>
            </div>
            <div>
              <img 
                src={img12} 
                alt="Special Offer" 
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...motion_bottom_to_top} className="meetOurSeller pt-8 sm:pt-12 lg:pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">
              Meet Our Sellers
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">
              These artisans carefully design and create handmade products with excellent quality.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-12 gap-x-6 lg:gap-x-32">
            {img.map((item, index) => (
              <div key={index} className="aspect-square">
                <img 
                  src={item} 
                  alt={`Seller ${index + 1}`} 
                  className="w-full h-full object-cover rounded-full transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...motion_bottom_to_top} id="faqs" className="faqs py-8 sm:py-12 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold">
                Have Questions? Read Our Frequently Asked Questions
              </h2>
              <div className="w-20 h-1 bg-amber-600"></div>
              
              <p className="text-base sm:text-lg lg:text-xl text-amber-700">
                If you have any further questions or need more information, please don't hesitate to contact our friendly team.
              </p>

              <div className="space-y-6">
                {[
                  {
                    question: "How can I contact customer support if I have an issue?",
                    answer: "You can reach our customer support via email, phone, or live chat available on our website."
                  },
                  {
                    question: "Do I need to create an account to shop?",
                    answer: "Yes, you need to create an account to place an order and track your purchases."
                  },
                  {
                    question: "Are the handicrafts handmade and authentic?",
                    answer: "Yes, all our products are 100% handmade by skilled artisans using high-quality materials."
                  },
                  {
                    question: "How can I track my order status?",
                    answer: "Once your order is shipped, you will receive a tracking link via email or SMS."
                  },
                  {
                    question: "Can I return a product if I don't like it?",
                    answer: "Yes, we offer easy returns within a specified period. Please check our return policy for details."
                  },
                  {
                    question: "Can I cancel my order after placing it?",
                    answer: "Yes, you can cancel your order within a limited time before it is shipped."
                  },
                  {
                    question: "How long does delivery take?",
                    answer: "Delivery time varies by location, but it usually takes 3-7 business days."
                  }
                ].map((faq, index) => (
                  <div key={index} className="group border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-center cursor-pointer">
                      <h3 className="text-sm sm:text-base lg:text-lg font-semibold">
                        {faq.question}
                      </h3>
                      <span className="text-xl sm:text-2xl lg:text-4xl font-semibold transition-transform duration-300 group-hover:rotate-45">
                        +
                      </span>
                    </div>
                    <p className="mt-2 text-sm sm:text-base text-gray-700 opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-32">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-5 hidden lg:block">
              <img 
                src={img5} 
                alt="FAQ illustration" 
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default About;