import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext.jsx";
import { FaStar, FaCalendarAlt, FaTimesCircle } from "react-icons/fa";
import { FaTruckFast, FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";
import Slide from "../sections/Slide";
import Button from "../sections/Button.jsx";
import Loader from "../components/utils/Loader.jsx";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/products/')) {
            sessionStorage.setItem('lastPath', currentPath);
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
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

    const handleAddToCart = async () => {
        try {
            if (!product) {
                toast.error("Product not available");
                return;
            }
            await addToCart(product, quantity);
        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error("Failed to add to cart");
        }
    };

    const open_payment = () => {
        const modifiedProduct = {
            id: product._id,
            title: product.title,
            price: product.price,
            prev_price: product.prev_price,
            discount: product.discount,
            img: product.img,
            quantity: product.quantity,
        };
        navigate(`/checkout`, { state: { product: modifiedProduct } });
    };

    if (loading) return <Loader />;
    if (error) return <div className="text-center text-red-500 py-10 sm:py-16 lg:py-20">{error}</div>;
    if (!product) return <div className="text-center text-red-500 py-10 sm:py-16 lg:py-20">Product not found</div>;

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 lg:px-0 lg:py-8">
                {/* Breadcrumb */}
                <nav className="mb-4 sm:mb-6 lg:mb-8">
                    <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                        <li><a href="/" className="hover:text-gray-900 transition-colors">Home</a></li>
                        <li>/</li>
                        <li><a href="/products" className="hover:text-gray-900 transition-colors">Products</a></li>
                        <li>/</li>
                        <li className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">{product.title}</li>
                    </ol>
                </nav>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    {/* Image gallery */}
                    <div className="flex flex-col">
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="aspect-square overflow-hidden rounded-2xl bg-white"
                            >
                                <img
                                    src={product.img}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                />
                            </motion.div>
                            {product.discount && (
                                <div className="absolute left-4 top-4 bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full">
                                    {product.discount}% OFF
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mt-6 sm:mt-8 lg:mt-0 px-0 sm:px-4 lg:px-0">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">{product.title}</h1>

                        <div className="mt-3 sm:mt-4">
                            <div className="flex items-center space-x-4">
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">₹{product.price}</p>
                                {product.prev_price && (
                                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 line-through">₹{product.prev_price}</p>
                                )}
                            </div>
                            <div className="flex items-center mt-2 sm:mt-3 space-x-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < product.rating ? 'text-yellow-600' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <span className="text-xs sm:text-sm text-gray-500">({product.rating} out of 5 stars)</span>
                            </div>
                        </div>

                        {/* Quantity selector */}
                        <div className="mt-4 sm:mt-6">
                            <div className="flex items-center space-x-4">
                                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                                    Quantity
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-2 sm:px-3 py-1 sm:py-2 text-gray-600 hover:text-gray-700 transition-colors"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        id="quantity"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="w-12 sm:w-16 py-1 sm:py-2 text-center border-x border-gray-300"
                                    />
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-2 sm:px-3 py-1 sm:py-2 text-gray-600 hover:text-gray-700 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Add to cart and Buy Now buttons */}
                        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-2 sm:py-3 px-4 sm:px-6 text-base sm:text-lg font-semibold text-white bg-gray-700 rounded-full hover:bg-gray-900 transition-colors duration-200"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-2 sm:py-3 px-4 sm:px-6 text-base sm:text-lg font-semibold text-white bg-yellow-600 rounded-full hover:bg-yellow-700 transition-colors duration-200"
                                onClick={open_payment}
                            >
                                Buy Now
                            </motion.button>
                        </div>

                        {/* Delivery information */}
                        <div className="mt-6 sm:mt-8 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Delivery & Returns</h3>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center space-x-3">
                                    <FaTruckFast className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                                    <span className="text-sm sm:text-base text-gray-600">Free delivery on orders over ₹999</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaCalendarAlt className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                                    <span className="text-sm sm:text-base text-gray-600">Dispatches within 1–3 business days</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaLocationDot className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                                    <span className="text-sm sm:text-base text-gray-600">Ships from our local warehouse</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaTimesCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                                    <span className="text-sm sm:text-base text-gray-600">7-day return policy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related products */}
            <div className="mt-4 sm:mt-12 lg:mt-16 px-3 md:px-0">
                <Slide products={products.filter(p => p.page === product.page && p.id !== id).slice(0, 8)} heading="You may also like" />
                <Slide products={products.filter(p => p.page === product.page && p.id !== id).slice(8, 16)} heading="More from this shop" />
                <Slide products={products.filter(p => p.page === product.page && p.id !== id).slice(16, 24)} showHeading={false} />
                <Slide products={products.filter(p => p.page === product.page && p.id !== id).slice(24, 32)} showHeading={false} />
                <Slide products={products.filter(p => p.page === product.page && p.id !== id).slice(32, 40)} showHeading={false} />
                <div className="text-center mt-6 sm:mt-8 lg:mt-10">
                    <Button onClick={() => navigate("/showmore")}>Show More</Button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;