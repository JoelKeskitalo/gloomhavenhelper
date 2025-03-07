import express from 'express';
import {
    getAllScenarios,
    getScenarioById,
    createScenario,
    updateScenarioDetailsById,
} from '../controllers/scenarioController';

const router = express.Router();

// /api/scenarios

router.get('/', getAllScenarios);
router.get('/:id', getScenarioById);
router.post('/', createScenario);
// updateScenarioDetailsById (admin use)
router.patch('/:id', updateScenarioDetailsById);
// deleteScenarioById

export default router;
