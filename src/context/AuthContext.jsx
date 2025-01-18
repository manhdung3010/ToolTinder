import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const handleInputChange = (e) => {
    setToken(e.target.value);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
  };

  const checkAuth = () => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      setToken(token);
    } else {
      logout();
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = () => {
    localStorage.setItem("auth_token", token);
  };

  return (
    <AuthContext.Provider value={{ token, handleInputChange, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
