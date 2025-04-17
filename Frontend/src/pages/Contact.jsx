import { useState } from "react";
import axios from "axios";
import "../assets/styles/style.css";
import { motion } from "framer-motion";
import { motion_left_to_right, motion_right_to_left } from "../variables/animation";
import Heading from "../sections/Heading";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/contact/submit`, formData);
            setResponseMessage(response.data.message);
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setResponseMessage(error.response.data.message);
        }
    };

    return (
        <>
            {/* <section className="bg-gray-100 md:py-12 py-6"> */}
                {/* <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800">Get in Touch</h2>
                    <p className="text-gray-600 mt-2 px-2">We&apos;d love to hear from you! Reach out to us with any inquiries.</p>
                </div> */}
                <Heading heading="Contact Us" subheading="We are here to assist you with any questions or concerns." />
            {/* </section> */}

            <section className="max-w-6xl mx-auto px-4 lg:px-12 md:py-12 py-4 grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div {...motion_left_to_right} className="bg-white shadow-lg rounded-xl md:p-8 p-4">
                    <h3 className="text-2xl font-semibold text-gray-800">Contact Information</h3>
                    <p className="text-gray-600 mt-2">Feel free to reach out to us via phone, email, or visit our office.</p>
                    <div className="mt-6 space-y-4">
                        <div className="flex items-center space-x-4">
                            <i className="fa-solid fa-phone text-xl text-yellow-600"></i>
                            <div>
                                <p className="text-lg font-medium">+1 (234) 567 89 00</p>
                                <p className="text-gray-600 text-sm">support@example.com</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <i className="fa-solid fa-location-dot text-xl text-yellow-600"></i>
                            <div>
                                <p className="text-lg font-medium">123 Clay Street, Ahmedabad</p>
                                <p className="text-gray-600 text-sm">382345, India</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <i className="fa-solid fa-clock text-xl text-yellow-600"></i>
                            <div>
                                <p className="text-lg font-medium">Monday - Friday: 9 AM - 6 PM</p>
                                <p className="text-gray-600 text-sm">Saturday: 10 AM - 4 PM</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div {...motion_right_to_left} className="bg-white shadow-lg rounded-xl md:p-8 p-4">
                    <h3 className="text-2xl font-semibold text-gray-800">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring focus:ring-yellow-600 text-gray-800"
                            placeholder="Your Name"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring focus:ring-yellow-600 text-gray-800"
                            placeholder="Your Email"
                            required
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring focus:ring-yellow-600 text-gray-800 h-32"
                            placeholder="Your Message"
                            required
                        ></textarea>
                        <button type="submit" className="w-full bg-yellow-600 text-white font-bold py-3 rounded-lg hover:bg-yellow-700 transition">
                            Submit
                        </button>
                        {responseMessage && <p className="text-center text-green-600 mt-3">{responseMessage}</p>}
                    </form>
                </motion.div>
            </section>
        </>
    );
};

export default Contact;
