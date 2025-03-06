import express from 'express';
import {
    getAllHeroes,
    getHeroById,
    createHero,
    updateHeroDetailsById,
} from '../controllers/heroController';

const router = express.Router();

// /api/heroes
router.get('/', getAllHeroes);
router.get('/:id', getHeroById);
router.post('/', createHero);
router.patch('/:id', updateHeroDetailsById);
// deleteHeroById (admin use)

export default router;
