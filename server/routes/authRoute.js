import express from 'express';
import { login, signUp } from '../controllers/auth.js';
import { body } from 'express-validator';

const router = express.Router()

router.post("/login",[body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 6 })], login);
router.post("/signUp",[body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 6 })], signUp);
export default router;