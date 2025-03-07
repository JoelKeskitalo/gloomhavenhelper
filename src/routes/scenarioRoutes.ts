import express from 'express';
import { getAllScenarios, getScenarioById } from '../controllers/scenarioController';

const router = express.Router();

// /api/scenarios

router.get('/', getAllScenarios);
router.get('/:id', getScenarioById);
// createANewScenario (admin use)
// updateScenarioDetailsById (admin use)
// deleteScenarioById

export default router;
