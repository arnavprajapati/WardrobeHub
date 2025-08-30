import express from 'express'

import isAuth from '../middleware/isAuth.js'
import { addToCart, getUserCart, UpdateCart } from '../controllers/cartController.js'
const router = express.Router()

router.post('/get',isAuth,getUserCart)
router.post('/add',isAuth,addToCart)
router.post('/update',isAuth,UpdateCart)


export default router