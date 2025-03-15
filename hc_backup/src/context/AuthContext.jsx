  import { createContext,useState, useEffect } from "react";
  import PropTypes from "prop-types";
  import axios from "axios";
  // import { AuthContext } from "./AuthContextFile";

  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     if (token) {
  //         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     }
  //     else {
  //       delete axios.defaults.headers.common["Authorization"];
  //   }
  // }, [token]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      const userData = JSON.parse(storedUser);
            setUser(userData);
            axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setLoading(false);
}, []);

//   const login = async (email, password) => {
//     try {
//         const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//         setUser(res.data.user);
//         setToken(res.data.token);
//         localStorage.setItem("token", res.data.token);
//         return { success: true, user: res.data.user };
//     } catch (error) {
//         return { success: false, message: error.response?.data?.message || "Login failed" };
//     }
// };

//     const logout = () => {
//       localStorage.removeItem("user");
//       setUser(null);
//       setToken("");
//     };

    const login = (userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
  };

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  

  const logout = () => {
    setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      // setToken("");
      delete axios.defaults.headers.common["Authorization"];
  };

    return (
      <AuthContext.Provider value={{ user, login, logout,isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        loading  }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  

  