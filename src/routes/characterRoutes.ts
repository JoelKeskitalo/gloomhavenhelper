import express from 'express';
import { getAllCharacters, getCharacterById } from '../controllers/characterController';

const router = express.Router();

// api/characters
router.get('/', getAllCharacters);
// getCharacterById
router.get('/:id', getCharacterById);
// updateCharacterStatsById
// selectCharacterForUser
// removeCharacterById

export default router;
