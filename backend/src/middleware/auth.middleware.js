import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

export const authenticateToken = asyncHandler(async (req, res, next) => {
    // Get token from cookie or Authorization header
    const token = req.cookies?.token ;

    if (!token) {
        throw new AppError('Authentication required. Please login.', 401);
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            throw new AppError('User no longer exists', 401);
        }

        // Attach user ID to request
        req.userId = decoded.userId;
        req.user = user;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            throw new AppError('Invalid token', 401);
        }
        if (error.name === 'TokenExpiredError') {
            throw new AppError('Token expired. Please login again.', 401);
        }
        throw error;
    }
});

