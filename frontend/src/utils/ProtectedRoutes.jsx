import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx";
import ClipLoader from 'react-spinners/ClipLoader';

const ProtectedRoute = ({ children }) => {
    const { userData } = useContext(userDataContext);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <ClipLoader color="#f97316" size={40} />
            </div>
        );
    }

    if (!userData) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children;
};

export default ProtectedRoute;