import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Sirf ye check karein ke localStorage mein token hai ya nahi
  const token = localStorage.getItem("adminToken");

  // Agar token bilkul khali hai (null ya undefined), toh nikaal do
  if (!token) {
    console.log("No token found, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  // Agar token maujood hai, toh dashboard khulne do
  // Dashboard ke andar jab API call hogi, toh backend khud check kar lega ke token "len5616" hai ya nahi
  return children;
};

export default ProtectedRoute;