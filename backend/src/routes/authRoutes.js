const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../validators/authValidators');
const validateRequest = require('../middleware/validateRequest');

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new customer account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Test User
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               phone:
 *                 type: string
 *                 example: "08012345678"
 *     responses:
 *       201:
 *         description: Account created successfully, returns JWT and user info
 *       400:
 *         description: Validation error or email already registered
 */
router.post('/signup', signupValidation, validateRequest, signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in and receive a JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT and user info
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', loginValidation, validateRequest, login);

module.exports = router;
