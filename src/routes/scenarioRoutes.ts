import express from 'express';
import { getAllScenarios } from '../controllers/scenarioController';

const router = express.Router();

// /api/scenarios

router.get('/', getAllScenarios);
// getScenarioById
// createANewScenario (admin use)
// updateScenarioDetailsById (admin use)
// deleteScenarioById

export default router;
