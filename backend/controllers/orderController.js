import Order from "../models/orderModel.js";
import User from '../models/usersModel.js'
import razorpay from 'razorpay'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

const currency = 'inr'
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// for User
export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        await User.findByIdAndUpdate(userId, { cartData: {} })

        return res.status(201).json({ success: true, message: 'Order Placed' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Order Place error' })
    }
}

export const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        // Validate required fields
        if (!items || !amount || !address || !userId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields' 
            });
        }

        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100, // Amount in smallest currency unit (paise)
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
            notes: {
                userId: userId,
                orderType: 'ecommerce'
            }
        }

        const order = await razorpayInstance.orders.create(options);
        
        return res.status(200).json({ 
            success: true, 
            data: order,
            key: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.log('Razorpay Order Creation Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create Razorpay order'
        })
    }
}

export const verifyRazorpay = async (req, res) => {
    try {
        const userId = req.userId;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Missing payment verification data'
            });
        }

        // Verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Fetch order info to get receipt (order ID in our database)
            const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
            
            // Update order status
            await Order.findByIdAndUpdate(orderInfo.receipt, { 
                payment: true,
                paymentId: razorpay_payment_id,
                razorpayOrderId: razorpay_order_id
            });
            
            // Clear user cart
            await User.findByIdAndUpdate(userId, { cartData: {} });
            
            res.status(200).json({
                success: true,
                message: 'Payment Successful'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment verification failed - Invalid signature'
            });
        }
    } catch (error) {
        console.log('Payment Verification Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Payment verification failed'
        })
    }
}

export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId }).sort({ date: -1 });
        return res.status(200).json({ success: true, orders })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "userOrders error" })
    }
}

//for Admin
export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ date: -1 });
        res.status(200).json({ success: true, orders })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "adminAllOrders error" })
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        if (!orderId || !status) {
            return res.status(400).json({
                success: false,
                message: 'Order ID and status are required'
            });
        }

        await Order.findByIdAndUpdate(orderId, { status })
        return res.status(200).json({ success: true, message: 'Status Updated' })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}