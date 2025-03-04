import express from 'express';
import { getAllCharacters } from '../controllers/characterController';

const router = express.Router();

// api/characters
router.get('/', getAllCharacters);
// getCharacterById
// updateCharacterStatsById
// selectCharacterForUser
// removeCharacterById

export default router;
