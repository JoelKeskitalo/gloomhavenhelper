import Scenario from '../models/scenarioModel';
import { Request, Response } from 'express';

export const getAllScenarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const scenarios = await Scenario.find({});

        if (scenarios.length === 0) {
            res.status(404).json({
                message: 'No scenarios found in database',
            });
            return;
        }

        res.status(200).json({
            scenarios: scenarios.map((scenario) => ({
                name: scenario.name,
                description: scenario.description,
                location: scenario.location,
                rewards: scenario.rewards,
                requirements: scenario.requirements,
            })),
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
