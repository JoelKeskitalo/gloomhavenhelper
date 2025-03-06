import express from 'express';
import {
    getAllAbilities,
    getAbilityCardById,
    getAbilitiesByCharacterId,
    updateCharacterAbilityDeck,
} from '../controllers/abilityController';

const router = express.Router();

// /api/abilities
router.get('/', getAllAbilities);
router.get('/:id', getAbilityCardById);
router.get('/character/:id', getAbilitiesByCharacterId);
router.patch('/character/:id/deck', updateCharacterAbilityDeck);

export default router;
