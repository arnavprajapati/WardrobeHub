import Wishlist from '../models/wishList.js';
import User from '../models/usersModel.js'
import Product from "../models/productsModel.js"

export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId; 

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product ID is required' });
        }

        const existingItem = await Wishlist.findOne({ userId, productId });
        if (existingItem) {
            return res.status(200).json({ success: false, message: 'Product is already in wishlist' });
        }

        const newWishlistItem = new Wishlist({
            userId,
            productId,
        });

        await newWishlistItem.save();
        res.status(201).json({ success: true, message: 'Product added to wishlist' });
    } catch (error) {
        console.error('Add to wishlist error:', error);
        res.status(500).json({ success: false, message: 'Failed to add to wishlist' });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;

        await Wishlist.deleteOne({ userId, productId });
        res.status(200).json({ success: true, message: 'Product removed from wishlist' });
    } catch (error) {
        console.error('Remove from wishlist error:', error);
        res.status(500).json({ success: false, message: 'Failed to remove from wishlist' });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const userId = req.userId;

        const wishlist = await Wishlist.find({ userId }).populate('productId');

        const wishlistProducts = wishlist.map(item => item.productId);

        res.status(200).json({ success: true, wishlist: wishlistProducts });
    } catch (error) {
        console.error('Get wishlist error:', error);
        res.status(500).json({ success: false, message: 'Failed to get wishlist' });
    }
};