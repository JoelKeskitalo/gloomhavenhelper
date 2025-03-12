import express from 'express';
import {
    getPlayedScenarios,
    getUserPlayedScenarios,
    addPlayedScenario,
    deletePlayedScenario,
} from '../controllers/playedScenarioController';

const router = express.Router();

// /api/played-scenarios

router.get('/', getPlayedScenarios);
router.get('/:userId', getUserPlayedScenarios);
router.post('/', addPlayedScenario);
router.delete('/:scenarioId', deletePlayedScenario);

export default router;
