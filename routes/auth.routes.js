import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { asyncHandler } from '../utilities/helpers.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { registerValidator, loginValidator } from '../validators/auth.validators.js';
import { validateRequest } from '../middlewares/validator.middleware.js';

const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a user and return a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UserRegistration' }
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Validation error or email already used
 */
router.post('/register',
    registerValidator,
    validateRequest,
    asyncHandler(authController.register)
);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Login' }
 *     responses:
 *       200:
 *         description: JWT returned
 *       404:
 *         description: Invalid credentials
 */
router.post('/login',
    loginValidator,
    validateRequest,
    asyncHandler(authController.login)
);

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     tags: [Authentication]
 *     summary: Return the authenticated user
 *     security: [{ tokenAuth: [] }]
 *     responses:
 *       200:
 *         description: Current user profile
 *       401:
 *         description: Missing token
 */
router.get('/me', authenticateUser, asyncHandler(authController.getCurrentUser));

export default router;
