import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {

  const storedUser = localStorage.getItem("currentUser");
  const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const [loading, setLoading] = useState(true);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  function isUserLoggedIn() {
    //!! converts into truthy or falsy
    return !!currentUser; 
  }

  useEffect(() => {
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);


  const value = {
    currentUser,
    logout,
    setCurrentUser,
    isUserLoggedIn
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
