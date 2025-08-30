import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx"; 

const ProtectedRoute = ({ children }) => {
    const { userData } = useContext(userDataContext); 
    const location = useLocation();

    if (!userData) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children; 
};

export default ProtectedRoute;
