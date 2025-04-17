    import { useState, useEffect, useRef } from "react";
    import { toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import logo from "../assets/images/logo_black.png";
    import { CameraIcon, LoaderCircle, CheckCircle, Save } from "lucide-react";

    const Settings = () => {
        const [formData, setFormData] = useState({
            name: "",
            email: "",
            password: "",
            newPassword: "",
            profilePic: null,
            profilePicUrl: "",
        });
        const [loading, setLoading] = useState(false);
        const fileInputRef = useRef(null);

        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("⚠️ No token found, redirecting to login...");
                    return;
                }
        
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/profile`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
        
                if (!res.ok) throw new Error("Failed to fetch user data");
                const data = await res.json();
        
                setFormData(prev => ({
                    ...prev,
                    email: data.email,
                    name: data.name,
                    profilePicUrl: data.profilePicture || logo
                }));
            } catch (error) {
                console.error("Fetch user data error:", error);
                
            }
        };
    
        useEffect(() => {
            fetchUserData();
        }, []);
        

        const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setFormData((prev) => ({
                    ...prev,
                    profilePic: file,
                    profilePicUrl: imageUrl,
                }));
            }
        };

        const handleImageClick = () => {
            fileInputRef.current.click();
        };

        const handleProfilePicUpload = async () => {
            if (!formData.profilePic) {
                toast.error("⚠️ Please select an image");
                return;
            }
        
            try {
                const token = localStorage.getItem("token");
                const formDataUpload = new FormData();
                formDataUpload.append("profilePic", formData.profilePic);
        
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/upload-profile`, {
                    method: "POST",
                    headers: { 
                        "Authorization": `Bearer ${token}`
                    },
                    body: formDataUpload
                });
        
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Upload failed");
        
                // Update state with the backend URL
                setFormData(prev => ({
                    ...prev,
                    profilePicUrl: data.profilePicUrl
                }));
        
                toast.success("✅ Profile picture updated successfully!");
                
                // Refresh user data to get updated profile
                await fetchUserData();
            } catch (error) {
                console.error("Upload error:", error);
                toast.error("❌ Error uploading profile picture");
            }
        };

        const handleSaveProfile = async () => {
            const confirmSave = window.confirm("🛠️ Are you sure you want to save changes?");
            if (!confirmSave) return;

            setLoading(true);
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/update-profile`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ name: formData.name, password: formData.password, newPassword: formData.newPassword }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Update failed");

                toast.success("✅ Profile updated successfully!");
            } catch (error) {
                toast.error(`❌ ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="max-w-xl md:mx-auto p-8 bg-white shadow-lg rounded-xl md:my-10 my-4 mx-4 border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
                    <CheckCircle className="text-green-500" size={26} />
                    Manage Your Account
                </h2>
                
                <div className="flex flex-col items-center mt-6 space-y-4">
                    <div className="relative cursor-pointer" onClick={handleImageClick}>
                        <img 
                            src={formData.profilePicUrl || logo}  
                            alt="Profile"
                            className="w-28 h-28 rounded-full hover:opacity-80 transition-all object-cover border border-gray-300 shadow-sm"
                        />
                        <div className="absolute bottom-1 right-1 bg-gray-800 text-white p-2 rounded-full">
                            <CameraIcon size={18} />
                        </div>
                    </div>

                    <input 
                        type="file" 
                        accept="image/*" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                    />

                    <button
                        onClick={handleProfilePicUpload}
                        className="py-1 px-4 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-all duration-300 flex items-center gap-2"
                    >
                        <CameraIcon size={18} />
                        Upload
                    </button>
                </div>

                <form className="space-y-6 mt-8">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">👤 Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">📧 Email</label>
                        <input type="email" name="email" value={formData.email} readOnly disabled className="w-full px-4 py-2 border rounded-lg bg-gray-100" />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">🔑 Current Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">🔒 New Password</label>
                        <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <button
                        onClick={handleSaveProfile}
                        className="w-full py-2 px-4 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition flex items-center justify-center gap-2"
                    >
                        {loading ? <LoaderCircle className="animate-spin" size={20} /> : <Save size={20} />}
                        {loading ? "Saving..." : "Save Profile"}
                    </button>
                </form>
            </div>
        );
    };

    export default Settings;
