// src/components/Card.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="product-card w-72 bg-white rounded-xl overflow-hidden shadow-md font-sans cursor-pointer">
            <div className="relative">
                {product.bestseller && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                        Bestseller
                    </div>
                )}

                {/* <button
                    className="absolute top-3 right-3 bg-gray-800 bg-opacity-90 w-10 h-10 rounded-full flex items-center justify-center z-10"
                    onClick={toggleFavorite}
                >
                    <span className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-white'}`}>
                        ♥
                    </span>
                </button> */}

                <img
                    src={product.image1}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                    onClick={() => navigate(`/productdetail/${product._id}`)}
                />
            </div>

            <div className="p-4">
                <h3 className="text-base font-medium text-gray-800 mb-1">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.subDescription}</p>

                <div className="flex items-center justify-between">
                    <div className="price text-lg font-bold text-gray-900">
                        ${product.price.toLocaleString()}
                    </div>
                    <button className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-1.5 rounded-md transition cursor-pointer">
                        <span>❤️</span>
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;