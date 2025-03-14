import express from 'express';
import { getAllItems } from '../controllers/itemController';

const router = express.Router();

// /api/items
router.get('/', getAllItems);

export default router;
