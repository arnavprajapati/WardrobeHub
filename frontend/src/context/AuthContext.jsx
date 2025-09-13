import React from 'react'
import { createContext } from 'react'
export const authDataContext = createContext()
function AuthContext({ children }) {
    const serverURL = window.location.hostname === 'localhost'
    ? 'http://localhost:4000'
    : 'https://wardrobehub-backened.onrender.com';

    let value = {
        serverURL
    }
    return (
        <div>
            <authDataContext.Provider value={value}>
                {children}
            </authDataContext.Provider>

        </div>
    )
}

export default AuthContext
