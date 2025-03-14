import express from 'express';
import { getAllMonsters } from '../controllers/monsterController';

const router = express.Router();

// /api/monsters
router.get('/', getAllMonsters);

export default router;
