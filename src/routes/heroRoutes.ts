import express from 'express';
import { getAllHeroes } from '../controllers/heroController';

const router = express.Router();

// /api/heroes
router.get('/', getAllHeroes);

export default router;
