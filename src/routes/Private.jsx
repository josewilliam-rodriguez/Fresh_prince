import React from 'react'
import { Navigate } from 'react-router-dom';

const Private = ({ children }) => {
    const adminSession = JSON.parse(localStorage.getItem("adminSession"));

    return adminSession ? children : <Navigate to="/Shop" />;
  };
   

export default Private