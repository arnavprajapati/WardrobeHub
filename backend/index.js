import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",")
    : ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(cookieParser());
app.use(express.json());

import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/poductRoutes.js'
import cartRouter from './routes/cartRoute.js'

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)

app.get('/', (req, res) => {
    res.send('API is running...');
});

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("MongoDB connection error:", error));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});