import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from "../context/AuthContext.jsx";
import axios from 'axios'

export const userDataContext = createContext()
function UserContext({ children }) {
    let [userData, setUserData] = useState("")
    let { serverURL } = useContext(authDataContext)


    const getCurrentUser = async () => {
        try {
            let result = await axios.get(serverURL + "/api/user/getcurrentuser", { withCredentials: true })

            setUserData(result.data)
            // console.log(result.data)

        } catch (error) {
            setUserData(null)
            // console.log(error)
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])



    let value = {
        userData, setUserData, getCurrentUser
    }


    return (
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext
