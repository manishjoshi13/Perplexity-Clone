import express from 'express';
import { register, login, logout, getCurrentUser, verifyEmail } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { validateRegister, validateLogin } from '../validators/auth.validator.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Protected routes
router.post('/logout', authenticateToken, logout);
router.get('/get-me', authenticateToken, getCurrentUser);
router.get('/verify-email',verifyEmail)

export default router;

