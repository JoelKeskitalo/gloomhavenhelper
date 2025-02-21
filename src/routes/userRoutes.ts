import express from 'express';
import { registerUser } from '../controllers/userController';

const router = express.Router();

// api/users
router.post('/', registerUser);

export default router;
