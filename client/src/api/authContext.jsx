import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track auth state loading
  const navigate = useNavigate();

  // Initialize auth state from token on app load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        // Extract user data from token (adjust based on your backend)
        const { userId, email, role } = decoded; // Ensure these match your JWT payload
        
        setUser({ 
          token,
          id: userId, 
          email,
          role: role || 'user' // Default role if not provided
        });
      } catch (error) {
        console.error("Invalid token:", error);
        logout(); // Clear corrupted/invalid token
      }
    }
    setLoading(false);
  }, []);

  // Login function (call this after successful API login)
  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      const { userId, email, role } = decoded;

      localStorage.setItem("authToken", token);
      setUser({ 
        token,
        id: userId,
        email,
        role: role || 'user'
      });
      
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Failed to decode token");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
  };

  // Update user data (if needed)
  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  // Skip rendering children until auth state is initialized
  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        updateUser,
        isAuthenticated: !!user // Helper flag
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};