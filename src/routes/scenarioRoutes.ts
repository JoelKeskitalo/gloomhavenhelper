import express from 'express';
import {
    getAllScenarios,
    getScenarioById,
    createScenario,
} from '../controllers/scenarioController';

const router = express.Router();

// /api/scenarios

router.get('/', getAllScenarios);
router.get('/:id', getScenarioById);
// createANewScenario (admin use)
router.post('/', createScenario);
// updateScenarioDetailsById (admin use)
// deleteScenarioById

export default router;
