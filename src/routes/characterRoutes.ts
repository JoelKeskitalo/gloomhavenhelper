import express from 'express';
import {
    getAllCharacters,
    getCharacterById,
    updateCharacterStatsById,
} from '../controllers/characterController';

const router = express.Router();

// api/characters
router.get('/', getAllCharacters);
router.get('/:id', getCharacterById);
router.put('/:id', updateCharacterStatsById);
// removeCharacterById

export default router;
