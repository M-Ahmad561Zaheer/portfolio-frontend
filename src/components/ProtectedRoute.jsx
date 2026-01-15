import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // 1. .env se secret key uthayein (jo backend wali hai e.g., len5616)
  const adminSecret = import.meta.env.VITE_ADMIN_SECRET_KEY; 
  
  // 2. localStorage se token uthayein
  const token = localStorage.getItem("adminToken");

  // 3. Check karein ke kya token maujood hai aur wo secret key se match karta hai
  const isAuthenticated = token === adminSecret;
  
  if (!isAuthenticated) {
    // Agar login nahi hai, toh seedha Home page par bhej dein
    return <Navigate to="/login" replace />;
  }

  // Agar authenticated hai, toh Dashboard dikhayein
  return children;
};

export default ProtectedRoute;