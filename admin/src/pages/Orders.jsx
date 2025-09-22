import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext';
import ClipLoader from 'react-spinners/ClipLoader';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { serverURL } = useContext(authDataContext);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${serverURL}/api/order/list`, {}, { withCredentials: true });
            setOrders(response.data.orders);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            toast.error("Failed to fetch orders.");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            await axios.post(
                `${serverURL}/api/order/status`,
                { orderId, status: newStatus },
                { withCredentials: true }
            );
            toast.success("Order status updated successfully!");
            fetchOrders(); 
        } catch (error) {
            console.error("Failed to update status:", error);
            toast.error("Failed to update status.");
        }
    };

    const handleDetails = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        if (status === 'Order Placed') return 'bg-yellow-100 text-yellow-800';
        if (status === 'Processing') return 'bg-blue-100 text-blue-800';
        if (status === 'Shipped') return 'bg-indigo-100 text-indigo-800';
        if (status === 'Delivered') return 'bg-green-100 text-green-800';
        return 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="h-[calc(100vh-5rem)] mt-18 pt-6 bg-gray-50 text-gray-800">
            <div className="max-w-7xl mx-auto p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                    <h2 className="text-2xl font-bold">Customer Orders</h2>
                    <button 
                        onClick={fetchOrders}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition cursor-pointer"
                    >
                        Refresh Orders
                    </button>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3">Order ID</th>
                                    <th className="px-4 py-3 hidden sm:table-cell">Customer</th>
                                    <th className="px-4 py-3">Items</th>
                                    <th className="px-4 py-3 hidden sm:table-cell">Amount</th>
                                    <th className="px-4 py-3 hidden sm:table-cell">Status</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                                            <div className="flex justify-center items-center space-x-2">
                                                <ClipLoader color="#9B59B6" size={25} />
                                                <span>Loading orders...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                                            No orders found.
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-4 py-3 text-sm font-medium">{order._id.slice(-6)}</td>
                                            <td className="px-4 py-3 text-sm hidden sm:table-cell">{order.address.firstName} {order.address.lastName}</td>
                                            <td className="px-4 py-3 text-sm">{order.items.length} items</td>
                                            <td className="px-4 py-3 text-sm font-medium hidden sm:table-cell">₹{order.amount.toLocaleString()}</td>
                                            <td className="px-4 py-3 hidden sm:table-cell">
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <select
                                                        onChange={(e) => updateStatus(order._id, e.target.value)}
                                                        value={order.status}
                                                        className="border border-gray-300 rounded-md p-1 text-xs sm:text-sm focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
                                                    >
                                                        <option value="Order Placed">Order Placed</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select>
                                                    <button
                                                        onClick={() => handleDetails(order)}
                                                        className="text-purple-600 hover:text-purple-800 font-medium text-sm transition cursor-pointer"
                                                    >
                                                        Details
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="relative p-6">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold cursor-pointer"
                            >
                                &times;
                            </button>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Details</h2>

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Order Information</h3>
                                <p className="text-sm text-gray-600"><strong>Order ID:</strong> {selectedOrder._id}</p>
                                <p className="text-sm text-gray-600"><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600"><strong>Amount:</strong> ₹{selectedOrder.amount.toLocaleString()}</p>
                                <p className="text-sm text-gray-600"><strong>Payment:</strong> {selectedOrder.payment ? 'Paid' : 'Pending'}</p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Customer Details</h3>
                                <p className="text-sm text-gray-600"><strong>Name:</strong> {selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                                <p className="text-sm text-gray-600"><strong>Email:</strong> {selectedOrder.address.email}</p>
                                <p className="text-sm text-gray-600"><strong>Phone:</strong> {selectedOrder.address.phone}</p>
                                <p className="text-sm text-gray-600"><strong>Address:</strong> {selectedOrder.address.street}, {selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.pincode}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Ordered Items</h3>
                                <div className="space-y-2">
                                    {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 p-2 border rounded-lg">
                                            <img src={item.image1} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{item.name}</p>
                                                <p className="text-sm text-gray-600">Size: {item.size} | Qty: {item.quantity}</p>
                                                <p className="text-sm text-gray-800 font-semibold">₹{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={closeModal}
                                className="w-full mt-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition font-medium cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Orders;