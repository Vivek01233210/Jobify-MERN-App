import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

// public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import { errorHandlerMiddleware } from './middleware/errorHandler.js';
import { protect } from './middleware/protect.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './public')));


// GLOBAL MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use('/api/v1/jobs', protect, jobRouter);
app.use('/api/v1/users', protect, userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'));
  });

// NOT FOUND MIDDLEWARE
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// ERROR MIDDLEWARE
app.use(errorHandlerMiddleware);


// SERVER AND DB CONNECTION
const port = process.env.PORT || 5100;
try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB connected successfully");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
} catch (error) {
    console.log(error)
    process.exit(1);
}