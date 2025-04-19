import { useState, useEffect, useContext, useRef } from "react";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import "../assets/styles/style.css";
import logo from "../assets/images/logo_black.png";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import {
    Eye,
    BookOpenText,
    HelpCircle,
    ShieldCheck,
    Truck,
    FileText
} from "lucide-react";

const drop_down = [
    { name: "Home Decor", icon: <i className="fa-solid fa-house text-yellow-500"></i>, path: "/Decor" },
    { name: "Dining & Kitchen", icon: <i className="fa-solid fa-utensils text-red-500"></i>, path: "/Dining" },
    { name: "Lighting", icon: <i className="fa-solid fa-lightbulb text-blue-500"></i>, path: "/Lighting" },
    { name: "Garden & Outdoor", icon: <i className="fa-solid fa-campground text-green-500"></i>, path: "/Garden" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const currentHash = location.hash;
    const [placeholder, setPlaceholder] = useState("");
    const { user, logout } = useContext(AuthContext);
    const { clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [sections, setSections] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isOpensidebar, setIsOpensidebar] = useState(false);
    const [isMore, setIsMore] = useState(false);

    const toggleMore = () => {
        setIsMore(!isMore);
    };


    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            const placeholderText = "Find your favorite handcrafted piece...";
            setPlaceholder(placeholderText.substring(0, index + 1));
            index = (index + 1) % (placeholderText.length + 1);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const sidebar = document.querySelector('.category-btn');
            const toggleButton = document.querySelector('.drop-down');

            if (sidebar && !sidebar.contains(event.target) && toggleButton && !toggleButton.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const sidebarRef = useRef(null);

    // Close sidebar on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpensidebar(true);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            await clearCart();
            localStorage.removeItem("token");
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            if (searchQuery.trim() === "") {
                setFilteredProducts([]);
                setShowDropdown(false);
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/search`, {
                    params: { query: searchQuery }
                });
                setFilteredProducts(response.data);
                setShowDropdown(true);
            } catch (error) {
                console.error("Search Error:", error);
            }
        };

        fetchProducts();
    }, [searchQuery]);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/sections`);
                setSections(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
            } catch (error) {
                console.error("Categories Fetch Error:", error);
            }
        };

        fetchSections();
    }, []);


    useEffect(() => {
        if (!user ) return;
    
        const fetchUserProfile = async () => {

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/profile`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
    
                setUserProfile(res.data); // axios me response directly parsed hota hai
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
    
        fetchUserProfile();
    }, [user]);
    



    return (
        <nav className="sticky top-0 z-50 bg-white border-b-2 border-gray-200">

            {/* desktop */}
            <div className="max-w-[1360px] mx-auto search-container relative  flex  items-center pt-2 relative justify-between hidden lg:flex">
                <motion.div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" width="80px" />
                </motion.div>

                <div className="relative ">
                    <div className="category-btn group lg:flex hidden " >
                        <div className=" flex items-center gap-2  px-3 py-1 cursor-pointer shadow-[0px_5px_0px_rgba(0,0,0,0.1)] rounded-full hover:bg-gray-100 transition-all ease-in duration-300 " onClick={() => setIsOpen(!isOpen)}>
                            <i className="fa-solid fa-layer-group text-sm"></i>
                            <span className="text-sm">Categories</span>
                        </div>
                        {isOpen && (
                            <div className="drop-down absolute -left-7 z-50 top-12 bg-white text-start shadow-[0px_5px_10px_rgba(0,0,0,0.5)]   rounded-lg" onClick={(e) => e.stopPropagation()}>
                                {drop_down.map((item, index) => (
                                    <Link to={item.path} key={index} onClick={() => setIsOpen(!isOpen)}>
                                        <div className={`flex items-center gap-2  py-2 px-3  hover:bg-gray-100   ${currentPath === item.path ? "text-yellow-600" : ""} `} style={{ width: "200px" }}>{item.icon} {item.name}</div>
                                    </Link>
                                ))}

                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:flex w-2/3 mx-5 rounded-full overflow-hidden hidden group shadow-[0px_0px_7px_rgba(0,0,0,0.3)]">
                    <motion.input type="text" name="search" id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                        placeholder={placeholder} className="searchbar w-full  px-4 py-2 outline-none placeholder:text-gray-400 placeholder:text-sm " />

                    <button className="bg-yellow-600 text-white rounded-full group-hover:rounded-none   group-hover:m-0 group-hover:p-1 m-1 transition-all ease-in-out duration-700 "><i className="fa-solid fa-magnifying-glass m-2"></i></button>
                    {showDropdown && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="absolute w-2/3 top-16 mt-1 rounded-xl z-50 shadow-lg border border-gray-200 bg-white
                                   overflow-y-auto max-h-[300px]"
                        >
                            {/* Popular Searches */}
                            {searchQuery.trim() === "" && (
                                <div className="p-4">
                                    <div className="text-gray-600 text-md font-bold flex items-center py-2">
                                        <i className="fa-solid fa-arrow-trend-up mx-2 text-xs"></i>Popular Searches
                                    </div>
                                    {sections.map((product) => (
                                        <Link
                                            key={product}
                                            to={`/${product}`}
                                            onMouseDown={(e) => e.preventDefault()}
                                            className="block cursor-pointer text-sm font-semibold flex justify-between p-2 
                                                   hover:text-yellow-600 hover:bg-gray-100 transition-all duration-300 text-gray-600"
                                        >
                                            <div className="flex items-center gap-2">
                                                <i className="fa-regular fa-eye text-xs"></i>
                                                <span className="">Looking for a {product}</span>
                                            </div>
                                            <i className="fa-solid fa-magnifying-glass text-xs"></i>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Search Results */}
                            {searchQuery.trim() !== "" && (
                                <div className="p-4">
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product) => (
                                            <Link
                                                key={product._id}
                                                to={`/products/${product._id}`}
                                                onMouseDown={(e) => e.preventDefault()}
                                                onClick={() => setShowDropdown(false)}
                                                className="block cursor-pointer text-sm font-semibold flex justify-between p-2 
                                                       hover:text-yellow-600 hover:bg-gray-100 transition-all duration-300 text-gray-600"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <i className="fa-solid fa-magnifying-glass text-xs"></i>
                                                    <div>{product.title}</div>
                                                </div>
                                                <div className="ml-10 text-gray-500">{product.page}</div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="p-3 text-gray-500 text-center">No Results Found</div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>


                {/* <Link to="/Login" className={`hover:bg-yellow-600 hover:text-white text-md font-semibold rounded-full ${currentPath === "/Login" ? "bg-yellow-600 text-white text-md  " : "bg-white text-black"}`}><i className="fa-regular fa-user m-2"></i></Link> */}

                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="relative w-8 h-8 rounded-full overflow-hidden transition-all duration-300">
                            <img
                                src={userProfile?.profilePicture || logo}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = logo;
                                }}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="absolute top-2 translate-x-[-50%] mt-2 w-52 bg-white shadow-lg rounded-md border z-50">
                            <DropdownMenuItem className="hover:outline-none">
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-sm hover:bg-gray-200 w-full"
                                >
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={userProfile?.profilePicture || logo}
                                            alt="Profile"
                                            className="w-9 h-9 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col ">
                                            <span className="font-semibold text-sm">Profile</span>
                                            <span className="text-xs text-gray-500 ">{userProfile?.name || 'Profile'}</span>
                                        </div>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:outline-none">
                                <Link
                                    to="/settings"
                                    className="block px-4 py-2 text-sm hover:bg-gray-200 w-full"
                                >
                                    Account Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:outline-none">
                                <Link

                                    className="block px-4 py-1 text-xs  w-full"
                                >
                                    <p className="text-gray-500">
                                        Joined: {user?.createdAt ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(user.createdAt)) : "N/A"}
                                    </p>

                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:outline-none">
                                <Link
                                    className="block px-4 py-1 text-xs  w-full"
                                >
                                    <p className="text-gray-500">
                                        Last Updated: {user?.updatedAt ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(user.updatedAt)) : "N/A"}
                                    </p>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:outline-none">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-200"
                                >
                                    Logout ⏻
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    // <button
                    //     onClick={handleLogout}
                    //     className="px-5 py-2 text-sm font-semibold rounded-full shadow-md transition-all duration-300 ease-in-out transform  bg-white text-black border border-gray-300 hover:bg-red-600 hover:text-white"
                    // >
                    //     Logout
                    // </button>
                ) : (
                    // Login Button - Professional Look
                    <Link
                        to="/Login"
                        className={` rounded-full shadow-md transition-all duration-300 ease-in-out transform me-2 border border-gray-800  ${currentPath === "/Login"
                            ? "bg-yellow-600 text-white"
                            : "bg-white text-black border border-gray-300 hover:bg-yellow-600  hover:text-white"
                            }`}
                    >

                        <FaUserCircle className="text-[24px] cursor-pointer" />

                    </Link>
                )}


                {user?.role === 'admin' && (
                    <Link
                        to="/Admin2"
                        className={`text-md font-semibold rounded-full ${currentPath === "/Admin2" ? "text-yellow-600" : ""}`}
                    >
                        <i className="fa-solid fa-table-columns p-2 rounded-full text-[20px]"></i>

                    </Link>
                )}



                <Link to="/OrdersPage" className={`text-md font-semibold rounded-full hover:text-yellow-600 ${currentPath === "/OrdersPage" ? " text-yellow-600 " : ""}`}>
                    <i className="fa-solid fa-shopping-bag p-2 rounded-full text-[20px]"></i></Link>

                <Link to="/Cart" className={`text-md font-semibold rounded-full hover:text-yellow-600 ${currentPath === "/Cart" ? " text-yellow-600 " : ""}`}>
                    <i className="fa-solid fa-cart-shopping p-2 rounded-full text-[20px]"></i></Link>

            </div>
            {/* desktop menu */}
            <div className="max-w-screen-xl w-2/4 mx-auto py-1 pb-2 hidden lg:block">
                <ul className="flex justify-between items-center xl:gap-4  ">
                    <li> <Link to="/" className={`text-sm font-semibold rounded-full py-1.5 px-4  border-transparent rounded-3xl hover:text-black hover:bg-gray-200 transition-colors  ease-in-out duration-500 ${currentPath === "/" ? "bg-gray-300 text-black" : "bg-white text-black"}`}> Home</Link></li>
                    <li> <Link to="/Dining" className={`text-sm font-semibold rounded-full py-1.5 px-4  border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${currentPath === "/Dining" ? "bg-gray-200 text-black " : "bg-white text-black"}`}>Dining</Link></li>
                    <li> <Link to="/Lighting" className={`text-sm font-semibold rounded-full py-1.5 px-4  border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${currentPath === "/Lighting" ? "bg-gray-200 text-black " : "bg-white text-black"}`}>Lighting</Link></li>
                    <li> <Link to="/Decor" className={`text-sm font-semibold rounded-full py-1.5 px-4  border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${currentPath === "/Decor" ? "bg-gray-200 text-black " : "bg-white text-black"}`}>Decor</Link></li>
                    <li> <Link to="/Garden" className={`text-sm font-semibold rounded-full py-1.5 px-4  border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${currentPath === "/Garden" ? "bg-gray-200 text-black " : "bg-white text-black"}`}>Garden</Link></li>
                    <li> <Link to="/About" className={`text-sm font-semibold rounded-full py-1.5 px-4  border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${currentPath === "/About" ? "bg-gray-200 text-black " : "bg-white text-black"}`}>About</Link></li>
                    <li><Link to="/Contact" className={`text-sm font-semibold rounded-full py-1.5 px-4  border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${currentPath === "/Contact" ? "bg-gray-200 text-black " : "bg-white text-black"} `}>Contact</Link></li>
                    <li onClick={toggleMore} className={`cursor-pointer relative text-sm font-semibold rounded-full py-1.5 px-4  border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${["/OurVision", "/BlogPage", "/privacypolicy", "/ShippingAndDelivery", "/TermsAndConditions"].some(path => currentPath.startsWith(path)) || (currentPath === "/About" && currentHash === "#faqs")
                        ? "bg-gray-200 text-black " : "bg-white text-black"} `}>More
                        {isMore && (
                            <ul className="absolute top-full left-0 bg-white shadow-xl rounded-xl mt-2 py-2 w-64 z-50 text-sm text-gray-800 border border-gray-200">
                                <li>
                                    <Link
                                        to="/OurVision"
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsMore(false)}
                                    >
                                        <Eye size={18} />
                                        Our Vision
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/BlogPage"
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsMore(false)}
                                    >
                                        <BookOpenText size={18} />
                                        Blog
                                    </Link>
                                </li>


                                {/* Divider */}
                                <hr className="my-2 border-gray-200" />

                                <li>
                                    <Link
                                        to="/privacypolicy"
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsMore(false)}
                                    >
                                        <ShieldCheck size={18} />
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/ShippingAndDelivery"
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsMore(false)}
                                    >
                                        <Truck size={18} />
                                        Shipping & Delivery
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/TermsAndConditions"
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsMore(false)}
                                    >
                                        <FileText size={18} />
                                        Terms & Conditions
                                    </Link>
                                </li>
                            </ul>
                        )}</li>
                </ul>
            </div>




            {/* Mobile sidebar */}
            <div className="lg:hidden">
                <div className="flex max-w-[1360px] gap-2 sm:gap-2 mx-auto items-center justify-between px-4 py-3">
                    <button className="sidebar-toggle text-2xl" onClick={() => setIsOpensidebar(true)}>
                        <i className="fa-solid fa-bars"></i>
                    </button>

                    {/* search input  */}
                    <div className="px-2 w-full py-2" >
                        <input type="search" placeholder="Search products..." className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:border-yellow-500 outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        {searchQuery && (
                            <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg max-h-[200px] overflow-y-auto ">
                                {filteredProducts.map((product) => (
                                    <Link
                                        key={product._id}
                                        to={`/products/${product._id}`}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => {
                                            setIsMobileSearchOpen(false);
                                            setSearchQuery("");
                                        }}
                                    >
                                        {product.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>


                    {/* profile user */}
                    <div className="flex items-center">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="relative  cursor-pointer rounded-full overflow-hidden transition-all duration-300">
                                    <img
                                        src={userProfile?.profilePicture || logo}
                                        alt="Profile"
                                        className="w-16 h-9 rounded-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = logo;
                                        }}
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="absolute top-2 translate-x-[-50%] mt-2 w-52 bg-white shadow-lg rounded-md border z-50">
                                    <DropdownMenuItem className="hover:outline-none">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm hover:bg-gray-200 w-full"
                                        >
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={userProfile?.profilePicture || logo}
                                                    alt="Profile"
                                                    className="w-9 h-9 rounded-full object-cover"
                                                />
                                                <div className="flex flex-col ">
                                                    <span className="font-semibold text-sm">Profile</span>
                                                    <span className="text-xs text-gray-500 ">{userProfile?.name || 'Profile'}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:outline-none">
                                        <Link
                                            to="/settings"
                                            className="block px-4 py-2 text-sm hover:bg-gray-200 w-full"
                                        >
                                            Account Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:outline-none">
                                        <Link

                                            className="block px-4 py-1 text-xs  w-full"
                                        >
                                            <p className="text-gray-500">
                                                Joined: {user?.createdAt ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(user.createdAt)) : "N/A"}
                                            </p>

                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:outline-none">
                                        <Link
                                            className="block px-4 py-1 text-xs  w-full"
                                        >
                                            <p className="text-gray-500">
                                                Last Updated: {user?.updatedAt ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(user.updatedAt)) : "N/A"}
                                            </p>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:outline-none">
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-200"
                                        >
                                            Logout ⏻
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            // <button
                            //     onClick={handleLogout}
                            //     className="px-5 py-2 text-sm font-semibold rounded-full shadow-md transition-all duration-300 ease-in-out transform  bg-white text-black border border-gray-300 hover:bg-red-600 hover:text-white"
                            // >
                            //     Logout
                            // </button>
                        ) : (
                            // Login Button - Professional Look
                            <Link
                                to="/Login"
                                className={` rounded-full shadow-md transition-all duration-300 ease-in-out transform  ${currentPath === "/Login"
                                    ? "bg-yellow-600 text-white"
                                    : "bg-white text-black border border-gray-300 hover:bg-yellow-600  hover:text-white"
                                    }`}
                            >

                                <FaUserCircle className="text-[28px] cursor-pointer" />

                            </Link>
                        )}


                        {user?.role === 'admin' && (

                            <Link
                                to="/Admin2"
                                className={`text-md font-semibold rounded-full ${currentPath === "/Admin2" ? "text-yellow-600" : ""}`}
                            >
                                <i className="fa-solid fa-table-columns rounded-full text-[24px]"></i>

                            </Link>
                        )}
                    </div>

                    <div className="">
                        <Link to="/OrdersPage" className={`text-2xl font-semibold rounded-full hover:text-yellow-600  ${currentPath === "/OrdersPage" ? " text-yellow-600 " : ""}`}>
                            <i className="fa-solid fa-shopping-bag p-2 rounded-full "></i></Link>
                    </div>

                    <div className="">
                        <Link to="/Cart" className="text-2xl">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                    </div>

                </div>

                {/* Mobile Search Bar */}
                {/* <AnimatePresence>
                    {isMobileSearchOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 py-2 border-t border-gray-200"
                        >
                            <div className="relative">
                                <input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:border-yellow-500 outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-[60vh] overflow-y-auto">
                                        {filteredProducts.map((product) => (
                                            <Link
                                                key={product._id}
                                                to={`/products/${product._id}`}
                                                className="block px-4 py-2 hover:bg-gray-100"
                                                onClick={() => {
                                                    setIsMobileSearchOpen(false);
                                                    setSearchQuery("");
                                                }}
                                            >
                                                {product.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                       </motion.div>
                    )}
                </AnimatePresence> */}
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpensidebar && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40"
                            onClick={() => setIsOpensidebar(false)}
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="mobile-sidebar fixed top-0 left-0 w-[80%] max-w-sm h-full bg-white z-50 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center py-1 pe-6 border-b">
                                <Link to="/" className="logo ms-4" onClick={() => setIsOpensidebar(false)}>
                                    <img src={logo} alt="" width="80px" />
                                </Link>
                                <button onClick={() => setIsOpensidebar(false)} className="text-2xl">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>

                            {user ? (
                                <div className="p-4 border-b">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="relative cursor-pointer rounded-full overflow-hidden transition-all duration-300 ms-1" >
                                                    <Link to="/profile" className="block text-sm hover:bg-gray-200 w-full" >
                                                        <img
                                                            src={userProfile?.profilePicture || logo}
                                                            alt="Profile"
                                                            className="w-12 h-12 rounded-full object-cover"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = logo;
                                                            }}
                                                        />
                                                    </Link>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent className="absolute py-2 top-2 translate-x-[-10%] mt-2 w-52 bg-white shadow-lg rounded-md border z-50">
                                                    <DropdownMenuItem className="hover:outline-none">
                                                        <Link
                                                            to="/profile"
                                                            className="block px-4 py-1 text-sm hover:bg-gray-200 w-full" onClick={() => setIsOpensidebar(false)}
                                                        >
                                                            <span className="font-semibold text-sm">Profile</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:outline-none">
                                                        <Link
                                                            to="/settings"
                                                            className="block px-4 py-1 text-sm hover:bg-gray-200 w-full" onClick={() => setIsOpensidebar(false)}
                                                        >
                                                            Account Settings
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div>
                                            <p className="font-semibold">{userProfile?.name || 'User'}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>

                                        {/* Admin Panel Access */}
                                        {user?.role === 'admin' && (
                                            <Link
                                                to="/Admin2"
                                                className={`text-md font-semibold rounded-full ${currentPath === "/Admin2" ? "text-yellow-600" : ""}`}
                                                onClick={() => setIsOpensidebar(false)}
                                            >
                                                <i className="fa-solid fa-table-columns p-2 rounded-full text-[24px] "></i>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                // Login Button - Professional Look

                                <div
                                    className="pb-2 border-b flex items-center gap-2 cursor-pointer"
                                    onClick={() => {
                                        navigate("/Login");
                                        setIsOpensidebar(false);
                                    }}

                                >
                                    <div className="">
                                        <div
                                            className={`rounded-full shadow-md transition-all duration-300 ml-4 mt-4 ease-in-out transform ${location.pathname === "/Login"
                                                ? "bg-yellow-600 text-white"
                                                : "bg-white text-black border border-gray-300 hover:bg-yellow-600 hover:text-white"
                                                }`}
                                            onClick={() => setIsOpensidebar(false)}
                                        >
                                            <FaUserCircle className="text-[28px]" />
                                        </div>
                                    </div>
                                    <p className="font-semibold pt-3">Login</p>
                                </div>
                            )}


                            <div className="py-2">

                                {drop_down.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.path}
                                        className="flex items-center justify-between px-6 py-3 hover:bg-gray-100"
                                        onClick={() => setIsOpensidebar(false)}
                                    >
                                        <div className="flex items-center">
                                            {item.icon}
                                            <span className="ml-3">{item.name}</span>
                                        </div>
                                        <i className="fa-solid fa-chevron-right text-gray-400"></i>
                                    </Link>
                                ))}

                                <div className="border-t mt-2 pt-2">
                                    <Link to="/About"
                                        className="block px-6 py-3 hover:bg-gray-100"
                                        onClick={() => setIsOpensidebar(false)}
                                    >
                                        About Us
                                    </Link>
                                    <Link to="/Contact"
                                        className="block px-6 py-3 hover:bg-gray-100"
                                        onClick={() => setIsOpensidebar(false)}
                                    >
                                        Contact
                                    </Link>
                                    <Link to="/OrdersPage"
                                        className="block px-6 py-3 hover:bg-gray-100"
                                        onClick={() => setIsOpensidebar(false)}
                                    >
                                        My Orders
                                    </Link>

                                    <div className="">
                                        <div
                                            onClick={toggleMore}
                                            className={`px-6 py-3 hover:bg-gray-100 cursor-pointer relative font-semibold rounded-full py-1.5 px-4 border-transparent hover:text-black hover:bg-gray-200 transition-colors ease-in-out duration-500 ${["/OurVision", "/BlogPage", "/privacypolicy", "/ShippingAndDelivery", "/TermsAndConditions"].some(path =>
                                                currentPath.startsWith(path)
                                            ) || (currentPath === "/About" && currentHash === "#faqs")
                                                ? "bg-gray-200 text-black"
                                                : "bg-white text-black"
                                                }`}
                                        >
                                            More
                                        </div>

                                        {isMore && (
                                            <ul className="mt-2 py-2 w-full text-sm text-gray-800 space-y-1">
                                                <li>
                                                    <Link
                                                        to="/OurVision"
                                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
                                                        onClick={() => {
                                                            setIsMore(false);
                                                            setIsOpensidebar(false);
                                                        }}
                                                    >
                                                        <Eye size={18} />
                                                        Our Vision
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/BlogPage"
                                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
                                                        onClick={() => {
                                                            setIsMore(false);
                                                            setIsOpensidebar(false);
                                                        }}
                                                    >
                                                        <BookOpenText size={18} />
                                                        Blog
                                                    </Link>
                                                </li>

                                                <hr className="my-2 border-gray-200" />

                                                <li>
                                                    <Link
                                                        to="/privacypolicy"
                                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
                                                        onClick={() => {
                                                            setIsMore(false);
                                                            setIsOpensidebar(false);
                                                        }}
                                                    >
                                                        <ShieldCheck size={18} />
                                                        Privacy Policy
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/ShippingAndDelivery"
                                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
                                                        onClick={() => {
                                                            setIsMore(false);
                                                            setIsOpensidebar(false);
                                                        }}
                                                    >
                                                        <Truck size={18} />
                                                        Shipping & Delivery
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/TermsAndConditions"
                                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
                                                        onClick={() => {
                                                            setIsMore(false);
                                                            setIsOpensidebar(false);
                                                        }}
                                                    >
                                                        <FileText size={18} />
                                                        Terms & Conditions
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </div>




                                <div className="border-t mt-2 pt-2">
                                    {user ? (
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsOpensidebar(false);
                                            }}
                                            className="w-full text-left px-6 py-3 text-red-600 hover:bg-gray-100"
                                        >
                                            <i className="fa-solid fa-sign-out-alt mr-3"></i>
                                            Logout
                                        </button>
                                    ) : (
                                        <Link
                                            to="/Login"
                                            className="flex items-center px-6 py-3 text-blue-600 hover:bg-gray-100"
                                            onClick={() => setIsOpensidebar(false)}
                                        >
                                            Login
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;