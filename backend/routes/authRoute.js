import express from 'express'
import { login, logout, signUp, googleLogin, adminLogin } from '../controllers/authController.js'

const router = express.Router() 
router.post('/signup', signUp)
router.post('/login', login)
router.get('/logout', logout)
router.post('/google-login', googleLogin)
router.post("/adminlogin", adminLogin)


export default router