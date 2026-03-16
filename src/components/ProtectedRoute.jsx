import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Token ki jagah Authenticated flag check karein
  const isAuth = localStorage.getItem("isAdminAuthenticated") === "true";
  const location = useLocation();

  if (!isAuth) {
    console.warn("Access Denied: No authentication flag found.");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Agar flag true hai, toh dashboard dikhao
  // Asli security backend handle kar lega (Cookie check karke)
  return children;
};

export default ProtectedRoute;