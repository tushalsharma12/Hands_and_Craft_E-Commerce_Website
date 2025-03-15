import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import "../assets/styles/style.css";
import logo from "../assets/images/logo.png";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

const drop_down = [
    { name: "Home Decor", icon: <i className="fa-solid fa-house w-5 h-5 text-yellow-500"></i>, path: "/Decor" },
    { name: "Dining & Kitchen", icon: <i className="fa-solid fa-utensils w-5 h-5 text-red-500"></i>, path: "/Dining" },
    { name: "Lighting", icon: <i className="fa-solid fa-lightbulb w-5 h-5 text-blue-500"></i>, path: "/Lighting", exact: true },
    { name: "Garden & Outdoor", icon: <i className="fa-solid fa-campground w-5 h-5 text-green-500"></i>, path: "/Garden" },
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [drop_down_Click, set_drop_down_Click] = useState(false);
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const [placeholder, setPlaceholder] = useState("");
    const { user, logout } = useContext(AuthContext);
    const { clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(""); // Search box ka value
    const [filteredProducts, setFilteredProducts] = useState([]); // API se filtered products
    const [showDropdown, setShowDropdown] = useState(false);
    const [isDropdownSearch, setDropdownSearch] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            const placeholderText = "Find your favorite handcrafted piece...";
            setPlaceholder(placeholderText.substring(0, index + 1)); // Animate text letter by letter
            index = (index + 1) % (placeholderText.length + 1); // Loop back to start
        }, 100); // Typing speed (adjustable)

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".drop-down") && !event.target.closest(".category-btn") && !event.target.closest(".search")) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            await clearCart();
            localStorage.removeItem("token");

            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // You might want to show an error message to the user
        }
    };

    const handleSearch = async (query) => {
        if (query.trim().length > 0) {
            try {
                console.log("Sending Search Query:", query); // Debugging

                const response = await axios.get(
                    `http://localhost:5000/api/products/search`,
                    { params: { query: query.trim() } } // Ensure trimmed query
                );

                console.log("Search Results:", response.data); // Debugging
                setFilteredProducts(response.data);
                setShowDropdown(true); // ✅ Show dropdown when results are available
            } catch (error) {
                console.error("Error fetching search results:", error.response?.data || error.message);
            }
        } else {
            setFilteredProducts([]);
            setShowDropdown(false); // ✅ Hide dropdown if query is empty
        }

    };

    useEffect(() => {
        handleSearch(searchQuery); // Jab bhi searchQuery change ho tab API call ho
    }, [searchQuery]);

    const handleSelectProduct = (product) => {
        console.log("Selected Product:", product);
        setSearchQuery(product.title); // ✅ Set searchQuery to selected product
        setFilteredProducts([]); // ✅ Clear search results
        setShowDropdown(false); // ✅ Hide dropdown
    };

    // 🔥 Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Handle dropdown menu
            if (!event.target.closest(".drop-down") &&
                !event.target.closest(".category-btn")) {
                setIsOpen(false);
            }

            // Handle search dropdown
            if (!event.target.closest(".search") && !event.target.closest(".search-dropdown")) {
                setShowDropdown(false);
                setFilteredProducts([]);
                setDropdownSearch(false);
            }
        };

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);


    // Popular Searches ko top 5 products se set karna
    const popularSearches = products.slice(0, 5).map((product) => product.title);

    // Jab koi dropdown option select kare
    const handleSelect = (title) => {
        setSearchQuery(title); // Search bar me text set karega
        setDropdownSearch(false); // Dropdown hide karega
        setShowDropdown(false);
    };

    return (


        <nav className="sticky top-0 z-50 bg-white space-y-2" >
            <div className="max-w-[1360px] mx-auto search-container relative  flex  items-center pt-4 relative justify-between">
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" width="70px" />
                </div>

                <div className="relative ">
                    <button className=" px-3 py-1 rounded-lg overflow-hidden category-btn group lg:flex hidden " onClick={() => setIsOpen(prev => !prev)}>
                        <span className="absolute inset-0 bg-gray-200 scale-0 transition-transform duration-500 group-hover:scale-100 rounded-lg" ></span>
                        <span className="relative flex items-center gap-2 z-10">
                            <i className="fa-solid fa-bars"></i>
                            <span>Categories</span>
                        </span>
                        {isOpen && (
                            <div className="drop-down absolute -left-10 z-50 top-12 bg-white text-start shadow-[0px_5px_10px_rgba(0,0,0,0.5)] transition-all ease-in-out duration-500  rounded-lg">
                                {drop_down.map((item, index) => (
                                    <ul key={index} className=" py-2 px-3  hover:bg-gray-100" style={{ width: "200px" }} >
                                        <Link to={item.path} onClick={() => setIsOpen(false)}>
                                            <li onClick={() => set_drop_down_Click(!drop_down_Click)} className={`flex items-center gap-2 ${currentPath === item.path ? "text-yellow-600" : ""}`}>{item.icon} {item.name}</li>
                                        </Link>
                                    </ul>
                                ))}

                            </div>
                        )}
                    </button>
                </div>

                <div className="lg:flex w-2/3 border-2 border-gray-600 rounded-full overflow-hidden hidden group ">
                    <motion.input type="search" name="" id="search" value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setDropdownSearch(true)} placeholder={placeholder} className="w-full  px-4 py-2 outline-none placeholder:text-sm " />

                    <button className="bg-yellow-600 text-white rounded-full group-hover:rounded-none group-hover:m-0 group-hover:p-1 m-1 transition-all ease-in-out duration-700"><i className="fa-solid fa-magnifying-glass m-2"></i></button>
                    {isDropdownSearch && searchQuery === '' && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className=" absolute w-2/3 top-full  bg-white  bg-gray-200 shadow-md mt-1 rounded-3xl z-50 transition-all ease-in-out duration-500 overflow-y-auto"
                        >
                            <div className="p-2 text-gray-500 font-semibold">Popular Searches</div>
                            {popularSearches.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelect(item)}
                                >
                                    {item}
                                </div>
                            ))}
                        </motion.div>
                    )}
                    {filteredProducts.length > 0 && (
                        <div className="absolute top-full w-2/3  bg-gray-200 shadow-md mt-1 rounded-3xl z-50 transition-all ease-in-out duration-500  ">
                            {filteredProducts.map((product) => (
                                <Link
                                    key={product._id}
                                    to={`/products/${product._id}`}
                                    onClick={() => handleSelectProduct(product)}
                                    className="block p-2 hover:bg-gray-100"
                                >
                                    {product.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex md:gap-5 gap-3 text-lg items-center ">
                    {/* <Link to="/Login" className={`hover:bg-yellow-600 hover:text-white text-md font-semibold rounded-full ${currentPath === "/Login" ? "bg-yellow-600 text-white text-md  " : "bg-white text-black"}`}><i className="fa-regular fa-user m-2"></i></Link> */}

                    {user ? (
                        // Logout Button - Modern Look
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 text-sm font-semibold rounded-full shadow-md transition-all duration-300 ease-in-out transform  bg-white text-black border border-gray-300 hover:bg-red-600 hover:text-white"
                        >
                            Logout
                        </button>
                    ) : (
                        // Login Button - Professional Look
                        <Link
                            to="/Login"
                            className={`px-5 py-2 text-sm font-semibold rounded-full shadow-md transition-all duration-300 ease-in-out transform  ${currentPath === "/Login"
                                ? "bg-yellow-600 text-white"
                                : "bg-white text-black border border-gray-300 hover:bg-yellow-600 hover:text-white"
                                }`}
                        >
                            Login
                        </Link>
                    )}


                    {user?.role === 'admin' && (
                        <Link
                            to="/Admin2"
                            className={`text-md font-semibold rounded-full ${currentPath === "/Admin2" ? "text-yellow-600" : ""}`}
                        >
                            <i className="fa-solid fa-table-columns p-2 rounded-full"></i>
                        </Link>
                    )}

                    <Link to="/OrdersPage" className={`  text-md font-semibold rounded-full ${currentPath === "/OrdersPage" ? " text-yellow-600 " : ""}`}>
                        <i className="fa-solid fa-bag-shopping p-2 rounded-full"></i></Link>

                    <Link to="/Cart" className={`  text-md font-semibold rounded-full ${currentPath === "/Cart" ? " text-yellow-600 " : ""}`}>
                        <i className="fa-solid fa-cart-shopping p-2 rounded-full"></i></Link>


                </div>
            </div>
            <div className="max-w-screen-xl w-2/4 mx-auto py-1 hidden lg:block">
                <ul className="flex justify-between items-center xl:gap-4  ">
                    <li> <Link to="/" className={`text-xs font-bold rounded-full py-1.5 px-4  border-transparent rounded-3xl hover:text-black hover:bg-gray-200 transition-colors  ease-in-out duration-500 ${currentPath === "/" ? "bg-gray-300 text-black" : "bg-white text-black"}`}> Home</Link></li>
                    <li> <Link to="/Dining" className={`text-xs font-bold rounded-full py-1.5 px-4  border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${currentPath === "/Dining" ? "bg-gray-200 text-black " : "bg-white text-black"}`}>Dining</Link></li>
                    <li> <Link to="/Lighting" className={`text-xs font-bold rounded-full py-1.5 px-4  border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${currentPath === "/Lighting" ? "bg-gray-200 text-black " : "bg-white text-black"}`}>Lighting</Link></li>
                    <li> <Link to="/Decor" className={`text-xs font-bold rounded-full py-1.5 px-4  border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${currentPath === "/Decor" ? "bg-gray-200 text-black " : "bg-white text-black"}`}>Decor</Link></li>
                    <li> <Link to="/Garden" className={`text-xs font-bold rounded-full py-1.5 px-4  border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${currentPath === "/Garden" ? "bg-gray-200 text-black " : "bg-white text-black"}`}>Garden</Link></li>
                    <li> <Link to="/About" className={`text-xs font-bold rounded-full py-1.5 px-4  border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${currentPath === "/About" ? "bg-gray-200 text-black " : "bg-white text-black"}`}>About</Link></li>
                    <li><Link to="/Contact" className={`text-xs font-bold rounded-full py-1.5 px-4  border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${currentPath === "/Contact" ? "bg-gray-200 text-black " : "bg-white text-black"} `}>Contact</Link></li>
                </ul>
            </div>
            <div className="max-w-screen-xl mx-auto p-2 pl-4 flex gap-4 justify-between items-center lg:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                    <i className="fa-solid fa-bars text-2xl"></i>  {/* Sidebar Toggle Button */}
                </button>
                <div className="flex w-full border-2 border-gray-600 rounded-full overflow-hidden">
                    <input type="search" placeholder="Search for anything" className="w-full px-4 py-2 outline-none" />
                    <button className="bg-yellow-600 text-white rounded-full hover:rounded-none m-1"><i className="fa-solid fa-magnifying-glass m-2"></i></button>
                </div>
            </div>

            <div className={`w-1/2 p-2 border lg:hidden absolute top-0 left-0 h-screen bg-white z-10 transition duration-500 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}>
                <div className="flex justify-between items-center py-5">
                    <div className="logo">
                        <img src={logo} alt="Logo" width="70px" />
                    </div>
                    <i className="fa-solid fa-xmark pr-4 text-xl" onClick={() => setIsOpen(!isOpen)}></i>

                </div>
                <ul className="sidebar flex flex-col gap-5">
                    <Link to="/" className="flex justify-between hover:bg-gray-200 items-center rounded-full pb-2 p-1 px-3">
                        <li className={`text-lg font-medium  ${currentPath === "/" ? "sidebar-hidden" : ""} `}> Home</li>
                        <i className="fa-solid fa-arrow-right"></i></Link>
                    <Link to="/Dining" className="flex justify-between hover:bg-gray-200 items-center rounded-full pb-2 p-1 px-3">
                        <li className="text-lg font-medium rounded-full  ">Dining </li>
                        <i className="fa-solid fa-arrow-right"></i></Link>
                    <Link to="/Lighting" className="flex justify-between hover:bg-gray-200 items-center rounded-full pb-2 p-1 px-3">
                        <li className="text-lg font-medium rounded-full ">Lighting</li>
                        <i className="fa-solid fa-arrow-right"></i></Link>

                    <Link to="/Decor" className="flex justify-between hover:bg-gray-200 items-center rounded-full pb-2 p-1 px-3">
                        <li className="text-lg font-medium rounded-full ">Decor</li>
                        <i className="fa-solid fa-arrow-right"></i></Link>

                    <Link to="/Garden" className="flex justify-between hover:bg-gray-200 items-center rounded-full pb-2 p-1 px-3">
                        <li className="text-lg font-medium rounded-full ">Garden</li>
                        <i className="fa-solid fa-arrow-right"></i></Link>

                    <Link to="/About" className="flex justify-between hover:bg-gray-200 items-center rounded-full pb-2 p-1 px-3">
                        <li className="text-lg font-medium rounded-full  ">About Us</li>
                        <i className="fa-solid fa-arrow-right"></i></Link>

                    <Link to="/Contact" className="flex justify-between hover:bg-gray-200 items-center rounded-full pb-2 p-1 px-3">
                        <li className="text-lg font-medium">Contact</li>
                        <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </ul>
            </div>

            <hr className="border border-gray-300 w-full" />
        </nav>

    );
}

export default Navbar;


