import express from 'express';
import { getAllDecks } from '../controllers/deckController';

const router = express.Router();

// /api/decks
router.get('/', getAllDecks);

export default router;
