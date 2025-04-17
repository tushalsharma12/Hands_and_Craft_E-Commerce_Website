import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, formData);
            toast.success("Registration Successful! 🎉", { autoClose: 2000 });
            setFormData({ name: "", email: "", password: "" });
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!", { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border border-gray-200">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Create Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Firstname Middlename Lastname"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-yellow-600"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-yellow-600"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="********"
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-yellow-600"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-2 text-white font-semibold rounded-lg transition-all duration-300 bg-yellow-600 hover:bg-yellow-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">Already have an account? <span className="text-yellow-600 font-semibold hover:underline hover-text-yellow-700 cursor-pointer" onClick={() => navigate("/login")} >Login</span></p>
            </div>
        </div>
    );
};

export default Signup;