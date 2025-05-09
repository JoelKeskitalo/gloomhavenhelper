import express from 'express';
import {
    registerUser,
    getAllUsers,
    loginUser,
    getUserById,
    removeUserById,
    selectCharacterForUser,
} from '../controllers/userController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

// api/users
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authenticateUser, getAllUsers);
router.get('/:userId', authenticateUser, getUserById);
router.delete('/:userId', authenticateUser, removeUserById);
router.post('/:userId/select-character', authenticateUser, selectCharacterForUser);

export default router;
