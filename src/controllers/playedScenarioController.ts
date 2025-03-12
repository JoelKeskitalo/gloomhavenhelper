import { Request, Response } from 'express';
import PlayedScenario from '../models/playedScenarioModel';

export const getPlayedScenarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const scenarios = await PlayedScenario.find().populate('user scenario receivedItems');
        res.status(200).json(scenarios);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const getUserPlayedScenarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const scenarios = await PlayedScenario.find({ user: userId }).populate(
            'scenario receivedItems'
        );

        if (!scenarios.length) {
            res.status(404).json({ message: 'No played scenarios found for this user' });
            return;
        }

        res.status(200).json(scenarios);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const addPlayedScenario = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            userId,
            scenarioId,
            receivedItems,
            receivedExperience,
            receivedGold,
            success,
            perks,
        } = req.body;

        const newScenario = new PlayedScenario({
            user: userId,
            scenario: scenarioId,
            receivedItems,
            receivedExperience,
            receivedGold,
            success,
            perks,
        });

        const savedScenario = await newScenario.save();
        res.status(201).json(savedScenario);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const deletePlayedScenario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { scenarioId } = req.params;
        const deletedScenario = await PlayedScenario.findByIdAndDelete(scenarioId);

        if (!deletedScenario) {
            res.status(404).json({ message: 'Scenario not found' });
            return;
        }

        res.status(200).json({ message: 'Scenario deleted successfully' });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
