import "../assets/styles/style.css";
import logo from "../assets/images/logo_white.png";
import { motion } from "framer-motion";
import { motion_bottom_to_top } from "../variables/animation";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className="bg-[#1e293b] text-white pt-10 pb-5">
            <div className="max-w-[1360px] mx-auto px-5">
                <hr className="border-gray-700 mb-8" />
                <motion.div {...motion_bottom_to_top} className="grid md:grid-cols-4 grid-cols-2 gap-10">

                    {/* Logo Section */}
                    <div className="col-span-1 flex items-center justify-center">
                        <img className="w-28" src={logo} alt="logo" />
                    </div>

                    {/* About Company */}
                    <div className="col-span-1">
                        <h4 className="text-base font-semibold mb-3">About Company</h4>
                        <ul className="space-y-2 text-sm ">
                            <li><a className="hover:text-yellow-400 transition text-white" href="#" onClick={(e) => { e.preventDefault(); navigate("/About"); }}>About Us</a></li>
                            <li><a className="hover:text-yellow-400 transition text-white" href="/OurVision">Our Vision</a></li>
                            <li><a className="hover:text-yellow-400 transition text-white" href="/BlogPage">Blog</a></li>
                            <li><a className="hover:text-yellow-400 transition text-white" href="/About#faqs">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div className="col-span-1">
                        <h4 className="text-base font-semibold mb-3">Customer Care</h4>
                        <ul className="space-y-2 text-sm ">
                            <li><a className="hover:text-yellow-400 transition text-white" href="/PrivacyPolicy">Privacy Policy</a></li>
                            <li><a className="hover:text-yellow-400 transition text-white" href="/ShippingAndDelivery">Shipping & Delivery</a></li>
                            <li><a className="hover:text-yellow-400 transition text-white" href="/TermsAndConditions">Terms & Conditions</a></li>
                            <li><a className="hover:text-yellow-400 transition text-white" href="/contact">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact & Social Media */}
                    <div className="col-span-1 space-y-6 ">
                        <div>
                            <h4 className="text-base font-semibold mb-3">Get in Touch</h4>
                            <div className="flex items-center hover:text-yellow-400 transition text-white">
                                <i className="fa-solid fa-phone "></i>
                                <p className="ml-2 text-sm cursor-pointer">+91 1234567890</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-base font-semibold mb-3">Follow Us</h4>
                            <ul className="flex space-x-4 text-lg">
                                <li><a href="/about" className="hover:text-yellow-400 transition text-white"><i className="fa-brands fa-instagram"></i></a></li>
                                <li><a href="/about" className="hover:text-yellow-400 transition text-white"><i className="fa-brands fa-facebook"></i></a></li>
                                <li><a href="/about" className="hover:text-yellow-400 transition text-white"><i className="fa-brands fa-linkedin"></i></a></li>
                                <li><a href="/contact" className="hover:text-yellow-400 transition text-white"><i className="fa-brands fa-twitter"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
                <hr className="border-gray-700 mt-8" />

                {/* Copyright Section */}
                <div className="text-center text-gray-400 text-sm mt-5">
                    © 2025 Hands&Craft™. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
