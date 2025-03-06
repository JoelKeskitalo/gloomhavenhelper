import { Request, Response } from 'express';
import Ability from '../models/abilityModel';

export const getAllAbilities = async (req: Request, res: Response): Promise<void> => {
    try {
        const abilities = await Ability.find({});

        if (abilities.length === 0) {
            res.status(404).json({
                message: 'No abilities found in database.',
            });
            return;
        }

        res.status(200).json({
            abilities: abilities.map((ability) => ({
                name: ability.name,
                abilityId: ability._id,
                characterId: ability.characterId,
                initiative: ability.initiative,
            })),
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const getAbilityCardById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const ability = await Ability.findById(id);

        if (!ability) {
            res.status(404).json({ message: 'Ability card not found' });
            return;
        }

        res.status(200).json({
            message: 'Ability card found',
            ability,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
