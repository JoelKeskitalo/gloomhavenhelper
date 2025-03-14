import express from 'express';
import {
    getAllMonsters,
    getMonsterById,
    createMonster,
    updateMonster,
    deleteMonsterById,
} from '../controllers/monsterController';

const router = express.Router();

// /api/monsters
router.get('/', getAllMonsters);
router.get('/:id', getMonsterById);
router.post('/', createMonster);
router.put('/:id', updateMonster);
router.delete('/:id', deleteMonsterById);

export default router;
