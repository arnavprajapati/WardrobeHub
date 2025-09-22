import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaBox, FaShoppingBasket, FaMoneyBillWave, FaUser } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Home() {
    const { serverURL } = useContext(authDataContext);
    const [stats, setStats] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${serverURL}/api/order/list`, {}, { withCredentials: true });
            const orders = response.data.orders;

            // Filter for paid orders only
            const paidOrders = orders.filter(order => order.payment);

            // Calculate the statistics based on all orders
            const totalOrders = orders.length;
            const totalProducts = orders.reduce((sum, order) => {
                return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
            }, 0);
            const uniqueCustomers = new Set(orders.map(order => order.userId));
            const totalCustomers = uniqueCustomers.size;

            // Calculate Total Revenue based ONLY on paid orders
            const totalRevenue = paidOrders.reduce((sum, order) => sum + order.amount, 0);

            // Generate chart data from paid orders
            const dailyRevenue = {};
            paidOrders.forEach(order => {
                const date = new Date(order.date).toLocaleDateString();
                if (dailyRevenue[date]) {
                    dailyRevenue[date] += order.amount;
                } else {
                    dailyRevenue[date] = order.amount;
                }
            });

            const formattedChartData = Object.keys(dailyRevenue).map(date => ({
                date,
                revenue: dailyRevenue[date],
            })).sort((a, b) => new Date(a.date) - new Date(b.date));

            setStats({ totalOrders, totalRevenue, totalProducts, totalCustomers });
            setChartData(formattedChartData);
        } catch (error) {
            console.error("Failed to fetch dashboard stats:", error);
            toast.error("Failed to load dashboard data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <ClipLoader color="#9B59B6" size={50} />
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <p className="text-xl text-gray-500">No data available.</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-5rem)] mt-18 pt-6 bg-gray-50 text-gray-800">
            <div className="max-w-7xl mx-auto p-4">
                <h2 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stat Card: Total Products */}
                    <div className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-shadow duration-300">
                        <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                            <FaBox size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Total Products</h3>
                            <p className="text-3xl font-bold text-purple-600">{stats.totalProducts.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Stat Card: Total Orders */}
                    <div className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-shadow duration-300">
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                            <FaShoppingBasket size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Total Orders</h3>
                            <p className="text-3xl font-bold text-blue-600">{stats.totalOrders.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Stat Card: Total Revenue */}
                    <div className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-shadow duration-300">
                        <div className="p-3 bg-green-100 rounded-full text-green-600">
                            <FaMoneyBillWave size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Total Revenue</h3>
                            <p className="text-3xl font-bold text-green-600">₹{stats.totalRevenue.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Stat Card: Total Customers */}
                    <div className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-shadow duration-300">
                        <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
                            <FaUser size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Total Customers</h3>
                            <p className="text-3xl font-bold text-yellow-600">{stats.totalCustomers.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Graph Section */}
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Revenue Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    {chartData.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">Not enough paid orders to display the graph.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;