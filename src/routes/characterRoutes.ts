import express from 'express';
import {
    getAllCharacters,
    getCharacterById,
    updateCharacterStatsById,
} from '../controllers/characterController';

const router = express.Router();

// api/characters
router.get('/', getAllCharacters);
// getCharacterById
router.get('/:id', getCharacterById);
router.put('/:id', updateCharacterStatsById);
// selectCharacterForUser
// removeCharacterById

export default router;
