import express from 'express';
import {
    getAllHeroes,
    getHeroById,
    createHero,
    updateHeroDetailsById,
    deleteHeroById,
} from '../controllers/heroController';

const router = express.Router();

// /api/heroes
router.get('/', getAllHeroes);
router.get('/:id', getHeroById);
router.post('/', createHero); // dev/admin use
router.patch('/:id', updateHeroDetailsById); // dev/admin use
router.delete('/:id', deleteHeroById); // dev/admin use
// develop function for development environment confirmation

export default router;
