import express from 'express';
import { getUserSettings, updateUserSettings } from '../controllers/userSettingsController';

const router = express.Router();

// /api/user-settings/
router.get('/:userId', getUserSettings);
router.put('/:userId', updateUserSettings);

export default router;
