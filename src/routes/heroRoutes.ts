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
router.post('/', createHero);
router.patch('/:id', updateHeroDetailsById);
router.delete('/:id', deleteHeroById);

export default router;
