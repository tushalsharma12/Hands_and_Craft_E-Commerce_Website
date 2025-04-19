import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/images/logo_black.png";
import Loader from "../components/utils/Loader";
import { ShoppingCart, Package, LogOut, Edit3 } from "lucide-react";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/profile`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                    setUpdatedName(data.name);
                    setLoading(false);
                }
            } catch (error) {
                toast.error("Error fetching user data");
            }
        };
        fetchUserData();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/update-profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ name: updatedName }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Profile updated successfully!");
                setUser((prev) => ({ ...prev, name: updatedName }));
                setEditing(false);
            } else {
                throw new Error(data.error || "Update failed");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md max-w-lg md:my-12 mx-4 md:mx-auto my-4 ">
            <h2 className="text-3xl text-center text-gray-800 font-bold">Welcome, {user.name}!</h2>
            <div className="text-center mt-6">
                <label className="cursor-pointer group relative">
                    <img
                        src={user.profilePicture ? user.profilePicture : logo}
                        alt="Profile"
                        className="h-28 rounded-full shadow-lg w-28 group-hover:scale-105 mx-auto object-cover transform transition-transform"
                    />
                </label>
                {editing ? (
                    <input
                        type="text"
                        className="border rounded-lg block focus:ring focus:ring-blue-400 mt-3 mx-auto outline-none px-3 py-2"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                    />
                ) : (
                    <h2 className="text-2xl text-gray-900 font-semibold mt-3">{user.name}</h2>
                )}
                <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                <p className="text-gray-500 text-sm">Role: {user.role === "admin" ? "Admin" : "User"}</p>
                <p className="text-gray-500 text-sm">Joined: {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(user.createdAt))}</p>
                <p className="text-gray-500 text-sm">Last Updated: {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(user.updatedAt))}</p>

            </div>

            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={() => navigate("/cart")}
                    className="flex bg-white border border-gray-300 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] gap-2 hover:bg-gray-100 items-center px-4 py-2 transition-all"
                >
                    <ShoppingCart size={18} /> My Cart
                </button>
                <button
                    onClick={() => navigate("/OrdersPage")}
                    className="flex bg-white border border-gray-300 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] gap-2 hover:bg-gray-100 items-center px-4 py-2 transition-all"
                >
                    <Package size={18} /> My Orders
                </button>
            </div>

            <div className="mt-6 space-y-3">
                {editing ? (
                    <button
                        onClick={handleUpdateProfile}
                        className="bg-green-600 rounded-lg text-white w-full hover:bg-green-700 px-4 py-2 transition-all"
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        onClick={() => setEditing(true)}
                        className="flex bg-yellow-500 justify-center rounded-lg text-white w-full gap-2 hover:bg-yellow-600 items-center px-4 py-2 transition-all"
                    >
                        <Edit3 size={18} /> Edit Name
                    </button>
                )}
                <button
                    onClick={handleLogout}
                    className="flex bg-red-500 justify-center rounded-lg text-white w-full gap-2 hover:bg-red-600 items-center px-4 py-2 transition-all"
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
