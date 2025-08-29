import express from 'express'
import { getCurrentUser, getAdmin } from '../controllers/userController.js'
import isAuth from '../middleware/isAuth.js'; 
import adminAuth   from '../middleware/adminAuth.js'

const router = express.Router() 
router.get('/getcurrentuser', isAuth, getCurrentUser)
router.get("/getadmin", adminAuth, getAdmin)

export default router