import User from "../models/UserModel.js";
import { unauthenticatedError } from "../utils/customError.js";
import { generateToken } from "../utils/JWTUtils.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req, res) => {
    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    await User.create(req.body);
    res.status(201).json({ message: 'User registered successfully' });
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new unauthenticatedError('Password and email do not match');

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) throw new unauthenticatedError('Password and email do not match');

    const token = generateToken({ userId: user._id, role: user.role });

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1-day
        secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ user });
};

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
export const logout = async (req, res) => {
    res.cookie('token', "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(200).json({ message: 'User logged out successfully' });
};