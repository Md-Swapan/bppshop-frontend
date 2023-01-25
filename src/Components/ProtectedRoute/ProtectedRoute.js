import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({children }) => {
  const location = useLocation();
  const {isAuthenticated} = useSelector((state) => state.user);
  

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }
    const decodedToken = jwt_decode(token);
    const currentTime = new Date().getTime() / 1000;
    return decodedToken.exp > currentTime;
  };

  if (isAuthenticated === false && !isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;