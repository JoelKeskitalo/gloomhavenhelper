import express from 'express';
import {
    getAllScenarios,
    getScenarioById,
    createScenario,
    updateScenarioDetailsById,
    deleteScenarioById,
} from '../controllers/scenarioController';

const router = express.Router();

// /api/scenarios
router.get('/', getAllScenarios);
router.get('/:id', getScenarioById);
router.post('/', createScenario);
router.patch('/:id', updateScenarioDetailsById);
router.delete('/:id', deleteScenarioById);

export default router;
