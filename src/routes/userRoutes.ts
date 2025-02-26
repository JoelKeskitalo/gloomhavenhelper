import express from 'express';
import {
    registerUser,
    getAllUsers,
    loginUser,
    getUserById,
    removeUserById,
} from '../controllers/userController';

const router = express.Router();

// api/users
router.post('/register', registerUser);
router.get('', getAllUsers);
router.post('/login', loginUser);
router.get('/:userId', getUserById);
router.delete('/:userId', removeUserById);

export default router;
