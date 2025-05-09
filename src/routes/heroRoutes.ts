import express from 'express';
import {
    getAllHeroes,
    getHeroById,
    createHero,
    updateHeroDetailsById,
    deleteHeroById,
    selectHeroForUser,
} from '../controllers/heroController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

// /api/heroes
router.get('/', getAllHeroes);
router.get('/:id', getHeroById);
router.post('/', createHero); // dev/admin use
router.patch('/:id', updateHeroDetailsById); // dev/admin use
router.delete('/:id', deleteHeroById); // dev/admin use
router.patch('/:id/choose-hero', authenticateUser, selectHeroForUser); // middleware to ensure user is authenticated when choosing a hero

export default router;
