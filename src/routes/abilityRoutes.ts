import express from 'express';
import {
    getAllAbilities,
    getAbilityCardById,
    getAbilitiesByCharacterId,
} from '../controllers/abilityController';

const router = express.Router();

// /api/abilities
router.get('/', getAllAbilities);
router.get('/:id', getAbilityCardById);
router.get('/character/:id', getAbilitiesByCharacterId);
// updateCharacterAbilityDeck (remove/add)

export default router;
