import React, { useContext, useEffect, useState } from 'react';
import { ShopDataContext } from '../context/ShopContext.jsx';
import { authDataContext } from '../context/authContext.jsx';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currency } = useContext(ShopDataContext);
    const { serverURL, token } = useContext(authDataContext);
    const navigate = useNavigate();

    const loadOrderData = async () => {
        setLoading(true);
        try {
            if (!serverURL) {
                toast.error("Server URL is not defined.");
                setLoading(false);
                return;
            }
            const result = await axios.post(serverURL + '/api/order/userorder', {}, { withCredentials: true });
            const orders = result.data.orders || result.data;
            if (Array.isArray(orders) && orders.length > 0) {
                let allOrdersItem = [];
                orders.forEach((order) => {
                    order.items.forEach((item) => {
                        item.status = order.status || 'Order Placed';
                        item.payment = order.payment;
                        item.paymentMethod = order.paymentMethod;
                        item.date = order.date;
                        item.orderId = order._id;
                        allOrdersItem.push(item);
                    });
                });
                setOrderData(allOrdersItem.reverse());
            } else {
                setOrderData([]);
            }
        } catch (error) {
            console.error("Failed to load orders:", error);
            toast.error("Failed to load orders. Please try again.");
            setOrderData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (serverURL) loadOrderData();
        else navigate('/');
    }, [serverURL]);

    const getStatusColor = (status) => {
        if (status === 'Order Placed') return 'bg-yellow-500';
        if (status === 'Processing') return 'bg-blue-500';
        if (status === 'Shipped') return 'bg-indigo-500';
        if (status === 'Delivered') return 'bg-green-500';
        return 'bg-gray-500';
    };
    
    const getPaymentStatusText = (payment, paymentMethod) => {
        if (paymentMethod === 'COD') return 'Cash on Delivery';
        return payment ? 'Paid' : 'Pending';
    };

    const getPaymentStatusColor = (payment, paymentMethod) => {
        if (paymentMethod === 'COD') return 'text-gray-900';
        return payment ? 'text-green-600' : 'text-yellow-600';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <ClipLoader color="#000000" size={40} />
            </div>
        );
    }

    return (
        <div className="relative top-[60px] lg:top-[70px] w-full flex items-center justify-center h-[calc(100vh-70px)] py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-black mb-8 text-center">My Orders</h1>

                {orderData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-100 rounded-xl shadow-lg p-8">
                        <div className="text-center">
                            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Found</h3>
                            <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Start Shopping
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                        {orderData.map((item, index) => (
                            <div key={index} className="bg-gray-100 rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
                                    {/* Product Image & Details */}
                                    <div className="flex items-start lg:items-center space-x-4 flex-grow">
                                        <img
                                            src={item.image1}
                                            alt={item.name}
                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-gray-300 flex-shrink-0"
                                        />
                                        <div className="flex flex-col space-y-1">
                                            <h3 className="text-lg font-bold text-black truncate">{item.name}</h3>
                                            <div className="flex flex-wrap gap-x-4 text-sm text-gray-700">
                                                <span>Price: <span className="text-black font-semibold">{currency}{item.price}</span></span>
                                                <span>Qty: <span className="text-black font-semibold">{item.quantity}</span></span>
                                                <span>Size: <span className="text-black font-semibold">{item.size}</span></span>
                                            </div>
                                            <p className="text-gray-500 text-sm">
                                                Order Date: <span className="text-black font-medium">{new Date(item.date).toLocaleDateString('en-IN')}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Status, Payment, and Actions */}
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mt-4 lg:mt-0">
                                        {/* Order Status */}
                                        <div className="flex items-center gap-2">
                                            <span className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></span>
                                            <p className="text-black font-bold text-sm min-w-[100px]">{item.status || 'Order Placed'}</p>
                                        </div>
                                        
                                        {/* Payment Status */}
                                        <div className="flex flex-col items-start lg:items-center min-w-[120px]">
                                            <p className="text-xs text-gray-700">Payment</p>
                                            <p className={`text-sm font-semibold ${getPaymentStatusColor(item.payment, item.paymentMethod)}`}>
                                                {getPaymentStatusText(item.payment, item.paymentMethod)}
                                            </p>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={loadOrderData}
                                            className="px-4 py-2 text-sm font-semibold rounded-lg text-white bg-black hover:bg-gray-800 transition-colors duration-200 flex-shrink-0"
                                        >
                                            Refresh Orders
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;