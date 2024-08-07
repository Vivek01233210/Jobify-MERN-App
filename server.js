import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import express, { application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

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
app.use(express.static(path.resolve(__dirname, './client/dist')));


// GLOBAL MIDDLEWARES
// app.use(cors({
//     origin: [process.env.CLIENT_URL_1, process.env.CLIENT_URL_2],
//     credentials: true  // useful during cookie setting
// }));
// app.use(cors({
//     origin: ["http://localhost:5173"],
//     credentials: true  // useful during cookie setting
// }));
const corsOptions = {
    // origin: "http://localhost:5173",
    origin: (origin, callback) => {
        // Check if the origin is allowed
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:4173",
            "http://jobifybyvivek.online",
            "http://www.jobifybyvivek.online",
        ];
        const isAllowed = allowedOrigins.includes(origin);
        callback(null, isAllowed ? origin : false);
    },
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());

// ROUTES
app.use('/api/v1/jobs', protect, jobRouter);
app.use('/api/v1/users', protect, userRouter);
app.use('/api/v1/auth', authRouter);

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
// });

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