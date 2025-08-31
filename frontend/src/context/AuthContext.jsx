import React from 'react'
import { createContext } from 'react'
export const authDataContext = createContext()
function AuthContext({ children }) {
    let serverURL = process.env.VITE_SERVER_URL

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
