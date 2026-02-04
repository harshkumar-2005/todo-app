import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          // Verify the token by making a request to a protected endpoint
          await axios.get(
            "https://todo-app-0iqg.onrender.com/v1/api/todo/get/all/todos",
            {
              withCredentials: true,
            },
          );
          setUser(JSON.parse(storedUser));
        } catch (error) {
          // Token invalid, clear storage
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "https://todo-app-0iqg.onrender.com/v1/api/todo/user/login",
        { email, password },
        { withCredentials: true },
      );
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (username, email, password) => {
    try {
      const res = await axios.post(
        "https://todo-app-0iqg.onrender.com/v1/api/todo/user/signup",
        { username, email, password },
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "https://todo-app-0iqg.onrender.com/v1/api/todo/user/logout",
        {},
        { withCredentials: true },
      );
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed", error);
      // Even if the request fails, clear the user state
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
