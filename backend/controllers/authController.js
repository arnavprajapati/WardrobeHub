import { generateAuthToken, genToken1 } from '../config/token.js'
import User from '../models/usersModel.js'
import bcrypt from 'bcrypt'

const signUp = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        let user = await User.create({ name, email, password: hashPassword })

        const token = await generateAuthToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        user = user.toObject()
        delete user.password

        return res.status(201).json(user)
    } catch (err) {
        console.log("signUp error", err)
        return res.status(500).json({ message: `signUp Error: ${err.message}` })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        const token = await generateAuthToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        user = user.toObject()
        delete user.password

        return res.status(200).json(user)
    } catch (err) {
        console.log("login error", err)
        return res.status(500).json({ message: `login Error: ${err.message}` })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "Strict"
        })
        return res.status(200).json({ message: "Logout Successfully" })
    } catch (err) {
        return res.status(500).json({ message: `logout Error: ${err.message}` })
    }
}

const googleLogin = async (req, res) => {
    try {
        let { name, email } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({
                name, email
            })
        }

        let token = await generateAuthToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user)

    } catch (error) {
        console.log("googleLogin error")
        return res.status(500).json({ message: `googleLogin error ${error}` })
    }

}

const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let token = await genToken1(email)
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 1 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json(token)
        }
        return res.status(400).json({ message: "Invaild creadintials" })
    } catch (error) {
        console.log("AdminLogin error")
        return res.status(500).json({ message: `AdminLogin error ${error}` })
    }
}


export { signUp, login, logout, googleLogin, adminLogin }
