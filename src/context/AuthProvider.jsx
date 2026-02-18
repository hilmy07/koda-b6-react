import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useSelector } from "react-redux";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState();
  // const [isLoggedIn, setIsLoggedIn] = useState(() => {
  //   const stored = localStorage.getItem("isLoggedIn");
  //   return stored === "true";
  // });

  const reduxIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    setIsLoggedIn(reduxIsLoggedIn);
  }, [reduxIsLoggedIn]);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
