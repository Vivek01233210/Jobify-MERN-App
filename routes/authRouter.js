import express from 'express';
import { login, logout, register } from '../controllers.js/authController.js';
import { validateLoginInput, validateRegisterInput } from '../middleware/validate.js';

const router = express.Router();

router.post('/register', validateRegisterInput, register);
router.post('/login',validateLoginInput, login);
router.get('/logout', logout);

export default router;