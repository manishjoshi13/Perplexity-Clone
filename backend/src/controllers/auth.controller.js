import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import dotenv from 'dotenv';
import { sendVerificationEmail } from '../services/verifyEmail.js';
dotenv.config();

// Generate JWT Token


// Register Controller
export const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        throw new AppError('User with this email or username already exists', 400);
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    const emailVerifyToken = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7m'});

    sendVerificationEmail(user,emailVerifyToken)

    // Generate token
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN}
    );

    // Set cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return user data (without password)
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            verified: user.verified
        },
        
    });
});

// Login Controller
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user and include password (since select: false)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return user data (without password)
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
export const verifyEmail=asyncHandler(async(req,res)=>{
    let token=req.query.token
    let {email}=jwt.verify(token,process.env.JWT_SECRET)
    
    await User.findOneAndUpdate({email},{verified:true})
    res.status(200).json({message:"Verified Successfully"})
    

})

