import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopDataContext } from '../context/ShopContext';
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
    const { products, currency, cartItem, updateQuantity } = useContext(ShopDataContext);
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const tempData = [];
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItem[items][item],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItem]);

    const subTotal = cartData.reduce((acc, cartProduct) => {
        const productInfo = products.find((p) => p._id === cartProduct._id);
        if (productInfo) {
            return acc + productInfo.price * cartProduct.quantity;
        }
        return acc;
    }, 0);

    const discount = subTotal * 0.10;
    const deliveryFee = 50;
    const total = subTotal - discount + deliveryFee;

    const handleDeleteClick = (productId, size) => {
        const isConfirmed = window.confirm("Are you sure you want to remove this item?");
        if (isConfirmed) {
            updateQuantity(productId, size, 0);
        }
    };

    return (
        <div className='relative top-[70px] w-full h-[calc(100vh-100px)] py-10 px-4 sm:px-6 lg:px-8'>
            <div className="max-w-7xl mx-auto h-full flex flex-col">

                {cartData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <p className="text-xl text-gray-500 mb-4">Your cart is empty.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                            Back to Shop
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 h-full">
                        <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-6 flex-grow flex flex-col">
                            <div className="hidden md:grid grid-cols-5 text-gray-400 uppercase text-sm border-b pb-4 mb-4">
                                <span className="col-span-2">Product</span>
                                <span>Quantity</span>
                                <span>Total</span>
                                <span>Action</span>
                            </div>

                            <div className="space-y-6 overflow-y-auto pr-2">
                                {cartData.map((item, index) => {
                                    const productData = products.find((product) => product._id === item._id);
                                    if (!productData) return null;

                                    const itemTotal = productData.price * item.quantity;

                                    return (
                                        <div key={index} className="flex flex-col md:grid md:grid-cols-5 items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                                            <div className="col-span-2 flex items-center space-x-4 w-full">
                                                <img className="w-20 h-20 rounded-md object-cover" src={productData.image1} alt={productData.name} />
                                                <div className="flex flex-col">
                                                    <span className="text-lg text-black">{productData.name}</span>
                                                    <span className="text-sm text-gray-700">Size: {item.size}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-start space-x-2">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="text-black">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <span className="text-black md:text-center mt-2 md:mt-0">
                                                {currency} {itemTotal.toFixed(2)}
                                            </span>

                                            <div className="text-gray-400 hover:text-gray-900 cursor-pointer md:text-center mt-2 md:mt-0">
                                                <RiDeleteBin6Line className="w-6 h-6 mx-auto" onClick={() => handleDeleteClick(item._id, item.size)} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="lg:w-1/3 bg-white rounded-xl shadow-lg p-6 h-fit">
                            <h2 className="text-2xl text-black mb-6">Order Summary</h2>

                            <div className="flex items-center space-x-2 mb-6">
                                <input
                                    type="text"
                                    placeholder="Discount voucher"
                                    className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                                />
                                <button className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200">
                                    Apply
                                </button>
                            </div>

                            <div className="space-y-4 text-gray-700">
                                <div className="flex justify-between">
                                    <span>Sub Total</span>
                                    <span className="text-black">{currency} {subTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount (10%)</span>
                                    <span className="text-black">- {currency} {discount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery fee</span>
                                    <span className="text-black">{currency} {deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-4 text-xl flex justify-between">
                                    <span>Total</span>
                                    <span className="text-black">{currency} {total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
                                <p>
                                    <span className="text-black">90 Day Limited Warranty</span> against manufacturer's defects. <a href="#" className="underline text-gray-800">Details</a>
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    if (cartData.length > 0) {
                                        navigate('/placeorder');
                                    } else {
                                        console.log('Your cart is empty!');
                                    }
                                }}
                                className="mt-6 w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            >
                                Proceed to checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
