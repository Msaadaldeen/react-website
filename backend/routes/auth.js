import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/AuthUserController.js';

const router = Router();

// Register
router.post('/register', registerUser);

// Login

router.post('/login', loginUser);

export default router;
