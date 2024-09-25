// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the user is logged in

  return token ? children : <Navigate to="/login" />; // If not logged in, redirect to login
};

export default PrivateRoute;
