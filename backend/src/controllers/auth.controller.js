import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import dotenv from 'dotenv';
import { sendVerificationEmail } from '../services/verifyEmail.js';
import { getErrorHTML, getSuccessHTML } from '../html/verificationHtml.js';
import redisClient from '../services/redis.service.js';
dotenv.config();


// Register Controller
export const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });
    const userExists = await redisClient.get(username);

    if (existingUser || userExists) {
        console.log(existingUser,userExists)
        throw new AppError('User with this email or username already exists', 400);
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    

    const token = jwt.sign({
        username,
        email,
        password: hashedPassword
    }, process.env.JWT_SECRET,{expiresIn: '15m'});
    await redisClient.set(username, false, 'EX', 15 * 60); // Store token in Redis with 15 minutes expiration
    

    sendVerificationEmail(username,email,token)
    res.status(200).json({
        success: true,
        message: 'Verfication email sent to your inbox',    

        
    });

});

// Login Controller
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
    }

    if(!user.verified){
        
        throw new AppError('Please verify your email before logging in and try again ,Email sent for verification', 401);
    }


    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            verified: user.verified
        },
        token
    });
});

// Logout Controller
export const logout = asyncHandler(async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});

// Get Current User Controller
export const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId);

    if (!user) {
        throw new AppError('User not found', 404);
    }

    res.status(200).json({
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            verified: user.verified
        }
    });
});

// Verify Email
export const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).send(getErrorHTML("Invalid verification link"));
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(400).send(
            getErrorHTML("Verification link expired or invalid")
        );
    }

    const { email, username, password } = decoded;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).send(
            getErrorHTML("Account already exists or already verified")
        );
    }
    await redisClient.set(username, true); // Mark user as verified in Redis

    await User.create({
        email,
        username,
        password,
        verified: true
    });

    return res.send(getSuccessHTML());
});

// Check Verification Status
export const checkVerificationStatus = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const status = await redisClient.get(username);
    if (status === null) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, verified: status });
});
