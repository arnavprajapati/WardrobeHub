import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { WishListDataContext } from '../context/WishListContext.jsx';

const Card = ({ product }) => {
    const navigate = useNavigate();
    const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishListDataContext);

    const isWishlisted = wishlistItems.some(item => item._id === product._id);

    const handleWishlistClick = (e) => {
        e.stopPropagation();

        if (isWishlisted) {
            removeFromWishlist(product._id);
            toast.info("Product removed from wishlist");
        } else {
            addToWishlist(product._id);
            toast.success("Product added to wishlist");
        }
    };

    return (
        <div
            className="product-card w-72 bg-white rounded-xl overflow-hidden shadow-md font-sans cursor-pointer"
            onClick={() => navigate(`/productdetail/${product._id}`)}
        >
            <div className="relative">
                {product.bestseller && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                        Bestseller
                    </div>
                )}

                <button
                    type="button" 
                    className="absolute top-3 right-3 bg-white w-8 h-8 rounded-full flex items-center justify-center z-10 hover:scale-110 transition-transform duration-200"
                    onClick={handleWishlistClick}
                >
                    <span className={`text-lg transition-colors duration-200 cursor-pointer ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}>
                        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                    </span>
                </button>

                <img
                    src={product.image1}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                />
            </div>

            <div className="p-4">
                <h3 className="text-base font-medium text-gray-800 mb-1">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.subDescription}</p>

                <div className="flex items-center justify-between">
                    <div className="price text-lg font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;