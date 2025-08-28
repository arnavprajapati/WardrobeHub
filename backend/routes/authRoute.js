import express from 'express'
import { login, logout, signUp, googleLogin } from '../controllers/authController.js'

const router = express.Router() 
router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', logout)
router.post('/google-login', googleLogin)

export default router