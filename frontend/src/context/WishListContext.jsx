import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext';
import { toast } from 'react-toastify';

export const WishListDataContext = createContext();

const WishListContext = ({ children }) => {
    const { serverURL } = useContext(authDataContext);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [wishlistCount, setWishlistCount] = useState(0);

    const fetchWishlist = async () => {
        try {
            const response = await axios.get(`${serverURL}/api/wishlist`, { withCredentials: true });
            const products = response.data.wishlist || [];
            setWishlistItems(products);
            setWishlistCount(products.length);
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
            setWishlistItems([]);
            setWishlistCount(0);
        }
    };

    const addToWishlist = async (productId) => {
        try {
            const response = await axios.post(
                `${serverURL}/api/wishlist/add`,
                { productId },
                { withCredentials: true }
            );
            if (response.data.success) {
                await fetchWishlist();
            } else {
                toast.info(response.data.message || 'Product is already in wishlist.');
            }
        } catch (error) {
            console.error('Failed to add to wishlist:', error);
            toast.error('Failed to add product to wishlist.');
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const response = await axios.post(
                `${serverURL}/api/wishlist/remove`,
                { productId },
                { withCredentials: true }
            );
            if (response.data.success) {
                await fetchWishlist();
            }
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
            toast.error('Failed to remove product from wishlist.');
        }
    };

    useEffect(() => {
        if (serverURL) {
            fetchWishlist();
        }
    }, [serverURL]);

    const contextValue = {
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        fetchWishlist,
    };

    return (
        <WishListDataContext.Provider value={contextValue}>
            {children}
        </WishListDataContext.Provider>
    );
};

export default WishListContext;