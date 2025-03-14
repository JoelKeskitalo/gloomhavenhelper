import express from 'express';
import { getAllDecks, getDeckById, createDeck } from '../controllers/deckController';

const router = express.Router();

// /api/decks
router.get('/', getAllDecks);
router.get('/:id', getDeckById);
router.post('/', createDeck);

export default router;
