import express from 'express';
import { registerUser, getAllUsers, loginUser } from '../controllers/userController';

const router = express.Router();

// api/users
router.post('/register', registerUser);
router.get('', getAllUsers);
router.post('/login', loginUser);

export default router;
