import User from '../models/usersModel.js'

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.status(200).json(user)
    } catch (err) {
        console.log("getUser error", err)
        return res.status(500).json({ message: `getUser Error: ${err.message}` })
    }
}

export default getCurrentUser