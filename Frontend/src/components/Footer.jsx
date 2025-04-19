import "../assets/styles/style.css";
import logo from "../assets/images/logo_white.png";
import { motion } from "framer-motion";
import { motion_bottom_to_top } from "../variables/animation";
import { Link } from "react-router-dom";

const Footer = () => {
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
                        <ul className="space-y-2 text-sm">
                            <li><Link className="hover:text-yellow-400 transition text-white" to="/About">About Us</Link></li>
                            <li><Link className="hover:text-yellow-400 transition text-white" to="/OurVision">Our Vision</Link></li>
                            <li><Link className="hover:text-yellow-400 transition text-white" to="/BlogPage">Blog</Link></li>
                            <li><Link className="hover:text-yellow-400 transition text-white" to="/Services">Services</Link></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div className="col-span-1">
                        <h4 className="text-base font-semibold mb-3">Customer Care</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link className="hover:text-yellow-400 transition text-white" to="/PrivacyPolicy">Privacy Policy</Link></li>
                            <li><Link className="hover:text-yellow-400 transition text-white" to="/ShippingAndDelivery">Shipping & Delivery</Link></li>
                            <li><Link className="hover:text-yellow-400 transition text-white" to="/TermsAndConditions">Terms & Conditions</Link></li>
                            <li><Link className="hover:text-yellow-400 transition text-white" to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Social Media */}
                    <div className="col-span-1 space-y-6">
                        <div>
                            <h4 className="text-base font-semibold mb-3">Get in Touch</h4>
                            <a href="tel:+911234567890" className="flex items-center hover:text-yellow-400 transition text-white">
                                <i className="fa-solid fa-phone"></i>
                                <p className="ml-2 text-sm cursor-pointer">+91 1234567890</p>
                            </a>
                        </div>

                        <div>
                            <h4 className="text-base font-semibold mb-3">Follow Us</h4>
                            <ul className="flex space-x-4 text-lg">
                                <li><a href="https://www.instagram.com" className="hover:text-yellow-400 transition text-white"><i className="fa-brands fa-instagram"></i></a></li>
                                <li><a href="https://www.facebook.com" className="hover:text-yellow-400 transition text-white"><i className="fa-brands fa-facebook"></i></a></li>
                                <li><a href="https://www.linkedin.com" className="hover:text-yellow-400 transition text-white"><i className="fa-brands fa-linkedin"></i></a></li>
                                <li><a href="https://www.twitter.com" className="hover:text-yellow-400 transition text-white"><i className="fa-brands fa-twitter"></i></a></li>
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
