import { useParams } from "react-router-dom";
import "../assets/styles/style.css";
import { motion } from "framer-motion"
import Slide from "../sections/Slide";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { FaStar, FaCalendarAlt, FaTimesCircle } from "react-icons/fa";
import { FaTruckFast, FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";
import Button from "../sections/Button.jsx";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const showmore = () => {
        navigate("/showmore")
    }
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Save the current page as the source when viewing product details
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/products/')) {
            sessionStorage.setItem('lastPath', currentPath);
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on mount
        // ✅ Backend se data fetch karna
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                console.log("API Response:", response);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                console.log("Product Data:", data);

                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load products.");
                setLoading(false);
            });
    }, []);

    if (!product) {
        return <div className="text-center py-20 text-red-500">Product not found</div>;
    }

    const handleAddToCart = async () => {
        try {
            if (!product) {
                toast.error("Product not available");
                return;
            }

            console.log("Adding product to cart:", { product, quantity }); // Debug log
            await addToCart(product, quantity);
        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error("Failed to add to cart");
        }
    };

    const open_payment = () => {
        navigate(`/checkout`, { state: { product } });
    }
    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }
    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }
    const getSectionProducts = (page) => {
        return products.filter(product => product.page === page && product.id !== id);
    };
    const relatedProducts = product ? getSectionProducts(product.page) : [];

    return (
        <div className="max-w-screen-2xl">
            <div className="max-w-[1360px]  mx-auto     ">
                <div className="max-w-7xl mx-auto p-6 lg:my-10 md:my-7 my-5">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-16 items-start">
                        {/* Product Image */}
                        <div className="relative border border-gray-300 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={product.img}
                                alt={product.title}
                                className="w-full  object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>


                            {/* Price & Discount */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <p className="text-3xl font-bold text-yellow-600">₹{product.price}</p>
                                    <p className="text-lg line-through text-gray-400">₹{product.prev_price}</p>
                                    <span className="bg-yellow-500 text-white font-semibold text-sm px-3 py-1 rounded-xl">{product.discount}% off</span>

                                </div>
                                <div className="flex items-center gap-2 text-yellow-600">
                                    <span className="text-lg font-semibold">{product.rating}</span>
                                    <FaStar className="text-xl" />
                                </div>
                            </div>

                            <p className="text-sm text-gray-600">Local taxes included (where applicable)</p>

                            {/* Quantity & Buttons */}
                            <div className="flex flex-col gap-4">
                                <label className="text-md font-semibold">Quantity</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="w-20 text-lg text-center border border-gray-400 rounded-lg py-2"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-black text-white px-5 py-3 rounded-full text-lg font-bold hover:bg-gray-800 w-full"
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart<i className="fa-solid fa-cart-plus ml-2"></i>
                                    </motion.button>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-yellow-600 text-white px-5 py-3 rounded-full text-lg font-bold hover:bg-yellow-500 w-full"
                                    onClick={open_payment}
                                >
                                    Buy Now <i className="fa-solid fa-credit-card ml-2"></i>

                                </motion.button>
                            </div>

                            {/* Delivery Information */}
                            <div className=" p-5 rounded-xl shadow-[0_0_7px_rgba(0,0,0,0.4)]">
                                <p className="text-lg font-semibold mb-2">Delivery & Return Policies</p>
                                <div className="flex items-center gap-2 text-gray-700 mb-2">
                                    <FaCalendarAlt />
                                    <p>Dispatches within 1–3 business days</p>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700 mb-2">
                                    <FaTimesCircle />
                                    <p>Returns & exchanges not accepted</p>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700 mb-2">
                                    <FaTruckFast />
                                    <p>Delivery cost: ₹50</p>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <FaLocationDot />
                                    <p>Dispatched from: United States</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <Slide today_big_deals={relatedProducts.slice(0, 8)} heading={"You may also like"} />
                <Slide today_big_deals={relatedProducts.slice(8, 16)} heading={"More from this shop"} />
                <Slide today_big_deals={relatedProducts.slice(16, 24)} showHeading={false} />
                <Slide today_big_deals={relatedProducts.slice(24, 32)} showHeading={false} />
                <Slide today_big_deals={relatedProducts.slice(32, 40)} showHeading={false} />
                <Button onClick={showmore}>Show More</Button>
            </div>
        </div>
    );
}

export default ProductDetails;
