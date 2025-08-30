import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

const router = express.Router()

//for User
router.post("/placeorder", isAuth, placeOrder)
router.post("/razorpay", isAuth, placeOrderRazorpay)
router.post("/userorder", isAuth, userOrders)
router.post("/verifyrazorpay", isAuth, verifyRazorpay)

//for Admin
router.post("/list", adminAuth, allOrders)
router.post("/status", adminAuth, updateStatus)

export default router