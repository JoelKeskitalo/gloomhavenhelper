import express from 'express';
import { getAllHeroes, getHeroById, createHero } from '../controllers/heroController';

const router = express.Router();

// /api/heroes
router.get('/', getAllHeroes);
router.get('/:id', getHeroById);
router.post('/', createHero);
// updateHeroDetails (admin use)
// deleteHeroById (admin use)

export default router;
