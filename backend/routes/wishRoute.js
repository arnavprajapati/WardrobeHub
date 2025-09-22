import express from 'express';
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishListController.js';
import isAuth from '../middleware/isAuth.js';
const router = express.Router();

router.post('/add', isAuth, addToWishlist);
router.post('/remove', isAuth, removeFromWishlist);
router.get('/', isAuth, getWishlist);

export default router;