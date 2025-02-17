import express from 'express';
const router = express.Router();
import { addUser } from '../controllers/userController';

// api/users
router.post('/', addUser);

export default router;
