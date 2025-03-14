import express from 'express';
import { getAllDecks, getDeckById } from '../controllers/deckController';

const router = express.Router();

// /api/decks
router.get('/', getAllDecks);
router.get('/:id', getDeckById);

export default router;
