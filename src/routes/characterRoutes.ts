import express from 'express';
import {
    getAllCharacters,
    getCharacterById,
    updateCharacterStatsById,
    removeCharacterById,
} from '../controllers/characterController';

const router = express.Router();

// api/characters
router.get('/', getAllCharacters);
router.get('/:id', getCharacterById);
router.put('/:id', updateCharacterStatsById);
router.delete('/:id', removeCharacterById);

export default router;
