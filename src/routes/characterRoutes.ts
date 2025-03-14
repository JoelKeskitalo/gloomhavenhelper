import express from 'express';
import {
    getAllCharacters,
    getCharacterById,
    updateCharacterStatsById,
    removeCharacterById,
    getCharacterItems,
    updateCharacterInventory,
} from '../controllers/characterController';

const router = express.Router();

// api/characters
router.get('/', getAllCharacters);
router.get('/:id', getCharacterById);
router.put('/:id', updateCharacterStatsById);
router.delete('/:id', removeCharacterById);
router.get('/:characterId/items', getCharacterItems);
router.patch('/:characterId/inventory', updateCharacterInventory);

export default router;
