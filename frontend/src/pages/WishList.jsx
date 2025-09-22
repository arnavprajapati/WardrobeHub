import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext';
import ClipLoader from 'react-spinners/ClipLoader';
import Card from '../components/Card.jsx'; // Assuming you have a Card component

const Wishlist = () => {
    const { serverURL } = useContext(authDataContext);
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverURL}/api/wishlist`, { withCredentials: true });
            setWishlistProducts(response.data.wishlist);
        } catch (error) {
            console.error('Fetch wishlist error:', error);
            toast.error('Failed to load wishlist.');
            setWishlistProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <ClipLoader color="#9B59B6" size={50} />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-16 bg-gray-50">
            <div className="max-w-7xl mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>
                {wishlistProducts.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">Your wishlist is empty.</p>
                        <p className="text-sm mt-2">Add some products to your wishlist to see them here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistProducts.map(product => (
                            <div key={product._id}>
                                <Card product={product} isWishlisted={true} fetchWishlist={fetchWishlist} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;