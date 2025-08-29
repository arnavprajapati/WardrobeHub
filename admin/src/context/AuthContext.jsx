import React, { createContext } from 'react';

export const authDataContext = createContext();

function AuthContext({ children }) {
    const serverURL = "http://localhost:4000";

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
