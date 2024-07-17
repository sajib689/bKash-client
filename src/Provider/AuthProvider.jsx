import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setLoading(true);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user)); // Saving user object as a string
    setUser(userData.user);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove user data from localStorage
    setLoading(true);
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
      if (token && userString) {
        try {
          const userData = JSON.parse(userString); // Parse user string back to object
          setUser(userData);
        } catch (error) {
          console.error(error);
          logout();
        }
      } else {
        logout(); // Logout if token or user data is missing
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const authInfo = {
    user, login, logout, loading, setUser // Include setUser in the context value
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
