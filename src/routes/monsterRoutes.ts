import express from 'express';
import { getAllMonsters, getMonsterById } from '../controllers/monsterController';

const router = express.Router();

// /api/monsters
router.get('/', getAllMonsters);
router.get('/:id', getMonsterById);

export default router;
