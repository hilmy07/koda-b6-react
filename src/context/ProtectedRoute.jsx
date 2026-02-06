import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
// import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const useAuth = () => useContext(AuthContext);
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;
