import React, { createContext } from 'react';

export const authDataContext = createContext();

function AuthContext({ children }) {
    const serverURL = process.env.VITE_SERVER_URL;

    const value = {
        serverURL
    };

    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    );
}

export default AuthContext;
