import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopDataContext } from '../context/ShopContext.jsx';
import { authDataContext } from '../context/AuthContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const navigate = useNavigate();
    const { cartItem, setCartItem, getCartAmount, delivery_charge, products, currency } = useContext(ShopDataContext);
    const { serverURL } = useContext(authDataContext);
    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: '',
        phone: ''
    });

    // Load Razorpay script
    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                if (window.Razorpay) {
                    setRazorpayLoaded(true);
                    resolve(true);
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => {
                    setRazorpayLoaded(true);
                    resolve(true);
                };
                script.onerror = () => {
                    toast.error('Failed to load payment gateway');
                    resolve(false);
                };
                document.body.appendChild(script);
            });
        };

        loadRazorpayScript();
    }, []);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const initPay = (order) => {
        if (!window.Razorpay) {
            toast.error('Payment gateway not loaded. Please refresh and try again.');
            setLoading(false);
            return;
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    setLoading(true);
                    const { data } = await axios.post(
                        serverURL + '/api/order/verifyrazorpay',
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        },
                        { withCredentials: true }
                    );

                    if (data.success) {
                        setCartItem({});
                        toast.success("Order Placed Successfully!");
                        setTimeout(() => {
                            navigate("/order");
                        }, 1000);
                    } else {
                        toast.error(data.message || "Payment Verification Failed");
                    }
                } catch {
                    toast.error("Payment verification failed. Please contact support.");
                } finally {
                    setLoading(false);
                }
            },
            modal: {
                ondismiss: () => {
                    setLoading(false);
                    toast.info("Payment cancelled by user.");
                }
            },
            theme: {
                color: '#000000'
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
            setLoading(false);
            toast.error('Payment failed: ' + response.error.description);
        });
        rzp.open();
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (getCartAmount() === 0) {
            toast.error("Your cart is empty. Please add items before placing an order.");
            setLoading(false);
            return;
        }

        const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'pinCode', 'country', 'phone'];
        const missingFields = requiredFields.filter(field => !formData[field].trim());

        if (missingFields.length > 0) {
            toast.error('Please fill in all required fields');
            setLoading(false);
            return;
        }

        try {
            let orderItems = [];
            for (const items in cartItem) {
                for (const item in cartItem[items]) {
                    if (cartItem[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItem[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            if (orderItems.length === 0) {
                toast.error("No valid items found in cart");
                setLoading(false);
                return;
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_charge
            };

            switch (method) {
                case 'cod':
                    const result = await axios.post(
                        serverURL + "/api/order/placeorder",
                        orderData,
                        { withCredentials: true }
                    );

                    if (result.data.success) {
                        setCartItem({});
                        toast.success("Order Placed Successfully!");
                        setTimeout(() => {
                            navigate("/order");
                        }, 1000);
                    } else {
                        toast.error(result.data.message || "Order placement failed");
                    }
                    setLoading(false);
                    break;

                case 'razorpay':
                    if (!razorpayLoaded) {
                        toast.error('Payment gateway is loading. Please wait and try again.');
                        setLoading(false);
                        break;
                    }

                    const resultRazorpay = await axios.post(
                        serverURL + "/api/order/razorpay",
                        orderData,
                        { withCredentials: true }
                    );

                    if (resultRazorpay.data.success) {
                        initPay(resultRazorpay.data.data);
                    } else {
                        toast.error(resultRazorpay.data.message || "Failed to initialize payment");
                        setLoading(false);
                    }
                    break;

                default:
                    setLoading(false);
                    toast.error("Please select a payment method");
                    break;
            }
        } catch (error) {
            toast.error("Order placement failed. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className='relative top-[70px] w-full min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8'>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3 bg-white border border-gray-200 rounded-xl p-6 flex-grow">
                    <form id='place-order-form' onSubmit={onSubmitHandler} className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-black">Delivery Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: 'firstName', placeholder: 'First name', type: 'text' },
                                { name: 'lastName', placeholder: 'Last name', type: 'text' },
                                { name: 'email', placeholder: 'Email address', type: 'email', span: true },
                                { name: 'street', placeholder: 'Street', type: 'text', span: true },
                                { name: 'city', placeholder: 'City', type: 'text' },
                                { name: 'state', placeholder: 'State', type: 'text' },
                                { name: 'pinCode', placeholder: 'Pincode', type: 'text' },
                                { name: 'country', placeholder: 'Country', type: 'text' },
                                { name: 'phone', placeholder: 'Phone', type: 'tel', span: true },
                            ].map((field, i) => (
                                <input
                                    key={i}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className={`w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${field.span ? 'md:col-span-2' : ''}`}
                                    required
                                    onChange={onChangeHandler}
                                    name={field.name}
                                    value={formData[field.name]}
                                />
                            ))}
                        </div>
                        <button
                            type='submit'
                            disabled={loading}
                            className='lg:hidden w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center disabled:opacity-50'
                        >
                            {loading ? <ClipLoader size={20} color='white' /> : "PLACE ORDER"}
                        </button>
                    </form>
                </div>
                <div className='lg:w-1/3 flex flex-col gap-6'>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-black mb-4">Cart Total</h2>
                        <div className="space-y-4 text-gray-800 font-medium">
                            <div className="flex justify-between">
                                <span>Sub Total</span>
                                <span className="text-black">{currency} {getCartAmount().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span className="text-black">{currency} {delivery_charge.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-4 text-xl font-bold flex justify-between">
                                <span>Total</span>
                                <span className="text-black">{currency} {(getCartAmount() + delivery_charge).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-black mb-4">Payment Method</h2>
                        <div className='flex items-center gap-4'>
                            <button
                                type="button"
                                onClick={() => setMethod('razorpay')}
                                className={`w-1/2 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${method === 'razorpay' ? 'border-black ring-2 ring-black' : 'border-gray-400 hover:border-gray-600'}`}
                            >
                                <img src='https://res.cloudinary.com/dm9d1j35j/image/upload/v1721597405/e-commerce/razorpay-icon_g0rckp.png' className='w-full h-full object-contain p-2' alt="Razorpay" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMethod('cod')}
                                className={`w-1/2 h-16 bg-gray-100 text-black font-bold rounded-lg overflow-hidden border-2 transition-all duration-200 ${method === 'cod' ? 'border-black ring-2 ring-black' : 'border-gray-400 hover:border-gray-600'}`}
                            >
                                Cash on Delivery
                            </button>
                        </div>
                    </div>
                    <button
                        type='submit'
                        form='place-order-form'
                        disabled={loading}
                        className='hidden lg:flex w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 items-center justify-center disabled:opacity-50'
                    >
                        {loading ? <ClipLoader size={20} color='white' /> : "PLACE ORDER"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
