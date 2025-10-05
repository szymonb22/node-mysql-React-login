import express from 'express';
import { verifyToken } from '../controllers/auth.js';
import { getUser } from '../controllers/user.js';
const router = express.Router()

router.get("/user",verifyToken ,getUser);
export default router;