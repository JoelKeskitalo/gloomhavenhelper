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
                id: scenario._id,
            })),
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const getScenarioById = async (req: Request, res: Response): Promise<void> => {
    try {
        const scenarioId = req.params.id;

        if (!scenarioId) {
            res.status(400).json({
                message: 'Enter a valid scenario ID',
            });
            return;
        }

        const scenario = await Scenario.findById(scenarioId);

        if (!scenario) {
            res.status(404).json({
                message: 'Scenario not found',
            });
            return;
        }

        res.status(200).json({
            scenario: scenario,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const createScenario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, location, rewards, requirements } = req.body;

        if (!name || !description || !location) {
            res.status(400).json({
                message: 'Please enter name, description and location of the scenario',
            });
            return;
        }

        const existingScenario = await Scenario.findOne({ name });
        if (existingScenario) {
            res.status(400).json({
                message: 'Scenario already exists',
            });
            return;
        }

        const scenario = new Scenario({
            name: name,
            description: description,
            location: location,
            rewards: rewards,
            requirements: requirements,
        });

        await scenario.save();

        res.status(200).json({
            message: 'Scenario created successfully',
            scenario: scenario,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const updateScenarioDetailsById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates || Object.keys(updates).length === 0) {
            res.status(400).json({ message: 'No update data provided' });
            return;
        }

        const updatedScenario = await Scenario.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedScenario) {
            res.status(404).json({ message: 'Scenario not found' });
            return;
        }

        res.status(200).json({
            message: 'Scenario updated successfully',
            scenario: updatedScenario,
        });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteScenarioById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedScenario = await Scenario.findByIdAndDelete(id);

        if (!deletedScenario) {
            res.status(404).json({
                message: 'Scenario not found',
            });
            return;
        }

        res.status(200).json({
            message: 'Scenario deleted successfully',
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
