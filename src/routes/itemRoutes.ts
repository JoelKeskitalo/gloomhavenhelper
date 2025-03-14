import express from 'express';
import { getAllItems, getItemById, updateCharacterInventory } from '../controllers/itemController';

const router = express.Router();

// /api/items
router.get('/', getAllItems);
router.get('/:id', getItemById);

export default router;
