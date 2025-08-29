import jwt from 'jsonwebtoken'

const generateAuthToken = (userId) => {
    if (!process.env.JWT_TOKEN) {
        throw new Error("JWT_TOKEN is not defined in environment variables")
    }
    try {
        const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
            expiresIn: '1d'
        })
        return token
    } catch (err) {
        console.error("Token generation error:", err.message)
        throw new Error("Failed to generate token")
    }
}

const genToken1 = async (email) => {
    try {
        let token = await jwt.sign({ email }, process.env.JWT_TOKEN, { expiresIn: "7d" })
        return token
    } catch (error) {
        console.log("token error")
    }
}


export { generateAuthToken, genToken1 }