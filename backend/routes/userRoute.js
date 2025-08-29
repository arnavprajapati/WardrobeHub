import express from 'express'
import getCurrentUser from '../controllers/userController.js'
import isAuth from '../middleware/isAuth.js'

const router = express.Router() 
router.get('/getcurrentuser', isAuth, getCurrentUser)

export default router