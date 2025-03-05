import express from 'express';
import { getAllHeroes, getHeroById } from '../controllers/heroController';

const router = express.Router();

// /api/heroes
router.get('/', getAllHeroes);
router.get('/:id', getHeroById);
// createHero (admin use)
// updateHeroDetails (admin use)
// deleteHeroById (admin use)

export default router;
