import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

const AdminRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    
    // Wait for auth check
    if (loading) {
        return <div>Loading...</div>;
    }

    // Check authentication
    if (!user || !token) {
        return <Navigate to="/login" />;
    }

    // Check admin role
    if (user.role !== "admin") {
        toast.error("Access denied! Admin only area.");
        return <Navigate to="/" />;
    }

    return children;
};
AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminRoute;
