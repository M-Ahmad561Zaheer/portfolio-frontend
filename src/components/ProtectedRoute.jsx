{/*import React from 'react';
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

export default ProtectedRoute;*/}

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const location = useLocation(); // User kahan jana chah raha tha, ye save kar lein

  if (!token) {
    console.warn("Access Denied: No authentication token found.");
    
    // state={{ from: location }} se hum user ka original path save kar sakte hain
    // taake login ke baad woh direct wapas wahin jaye jahan wo jana chahta tha
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Token mil gaya!
  return children;
};

export default ProtectedRoute;