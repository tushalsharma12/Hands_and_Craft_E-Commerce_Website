import "../assets/styles/style.css";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/CartContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
    const { fetchCart } = useContext(CartContext);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);    

    
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { email, password });
            localStorage.setItem("token", response.data.token);
            fetchCart();
            const { user } = response.data;   //const user = response.data.user => same
            localStorage.setItem("userRole", user.role);
            localStorage.setItem("user", JSON.stringify(user));
            login(user);
            toast.success(user.role === "admin" ? "Welcome Admin!" : "Login Successful!");
            navigate(user.role === "admin" ? "/Admin2" : "/");
        } catch (error) {
            setError(error.response?.data?.error || "Login failed. Please try again.");
            toast.error(error.response?.data?.error || "Login failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-50  p-5">
            <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 w-full max-w-sm">
                <h2 className="text-center text-xl font-bold text-gray-800">Sign in to Your Account</h2>
                {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
                <form onSubmit={handleLogin} className="mt-4 flex flex-col gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                               className="w-full p-2 border rounded-lg focus:ring focus:ring-yellow-600" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-1 relative">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required 
                               className="w-full p-2 border rounded-lg focus:ring focus:ring-yellow-600" placeholder="Enter your password" />
                               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform ">{showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</button>
                    </div>
                    <button type="submit" disabled={loading} 
                            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-semibold  transition-all duration-300">
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <button onClick={() => navigate('/Signup')} className="text-yellow-600 hover:text-yellow-700 font-medium hover:underline">Create an account</button>
                </div>
            </div>
        </div>
    );
};
export default Login;
