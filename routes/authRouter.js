import express from 'express';
import rateLimiter from 'express-rate-limit';
const router = express.Router();

import { login, logout, register } from '../controllers.js/authController.js';
import { validateLoginInput, validateRegisterInput } from '../middleware/validate.js';

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: { msg: 'You have exceeded the number of requests, retry after some time!' },
    headers: true,
});

router.post('/register', apiLimiter, validateRegisterInput, register);
router.post('/login', apiLimiter, validateLoginInput, login);
router.get('/logout', logout);

export default router;