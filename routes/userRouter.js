import express from 'express';
import { getApplicationStats, getCurrentUser, updateUser } from '../controllers.js/userController.js';
import { protect } from '../middleware/protect.js';
import { validateUpdateUserInput } from '../middleware/validate.js';
import { isAdmin } from '../middleware/isAdmin.js';
import upload from '../middleware/multerMiddleware.js';

const router = express.Router();

router.get('/current-user',protect, getCurrentUser);

router.get('/admin/app-stats',isAdmin, getApplicationStats);

router.patch('/update-user',upload.single('avatar'), validateUpdateUserInput, updateUser);

export default router;