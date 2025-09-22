import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';

export const adminDataContext = createContext();

function AdminContext({ children }) {
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { serverURL } = useContext(authDataContext);

    const getAdmin = async () => {
        try {
            const result = await axios.get(`${serverURL}/api/user/getadmin`, { withCredentials: true });
            setAdminData(result.data);
        } catch (error) {
            setAdminData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAdmin();
    }, []);

    const value = {
        adminData,
        setAdminData,
        getAdmin,
        loading 
    };

    return (
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    );
}

export default AdminContext;