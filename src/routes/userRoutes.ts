import express from 'express';
import {
    registerUser,
    getAllUsers,
    loginUser,
    getUserById,
    removeUserById,
    selectCharacterForUser,
} from '../controllers/userController';

const router = express.Router();

// api/users
router.post('/register', registerUser);
router.get('', getAllUsers);
router.post('/login', loginUser);
router.get('/:userId', getUserById);
router.delete('/:userId', removeUserById);
router.post('/:userId/select-character', selectCharacterForUser);

export default router;
