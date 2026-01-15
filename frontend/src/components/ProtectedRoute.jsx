import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  // បើមិនទាន់ Login ទេ វានឹងរុញទៅទំព័រ Login ដោយស្វ័យប្រវត្តិ
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;