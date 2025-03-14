import express from 'express';
import { getAllDecks, getDeckById, createDeck, updateDeck } from '../controllers/deckController';

const router = express.Router();

// /api/decks
router.get('/', getAllDecks);
router.get('/:id', getDeckById);
router.post('/', createDeck);
router.put('/:id', updateDeck);

export default router;
