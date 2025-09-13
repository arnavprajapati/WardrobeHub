import React, { createContext } from 'react';

export const authDataContext = createContext();

function AuthContext({ children }) {
    const serverURL = window.location.hostname === 'localhost'
    ? 'http://localhost:4000'
    : 'https://wardrobehub-backened.onrender.com';

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
