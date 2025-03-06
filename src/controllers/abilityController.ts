import { Request, Response } from 'express';
import Ability from '../models/abilityModel';
import Character from '../models/characterModel';

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

export const getAbilitiesByCharacterId = async (req: Request, res: Response): Promise<void> => {
    try {
        const characterId = req.params.id;

        const abilities = await Ability.find({ characterId });

        if (abilities.length === 0) {
            res.status(400).json({
                message: 'No abilities found',
            });
            return;
        }

        res.status(200).json({
            message: 'Abilities attached to character id found',
            characterId: characterId,
            abilities: abilities.map((ability) => ({
                name: ability.name,
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

export const updateCharacterAbilityDeck = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { abilityId, action } = req.body;

        if (!id || !abilityId || !action) {
            res.status(400).json({
                message: 'Character ID, ability ID and action are required',
            });
            return;
        }

        const character = await Character.findById(id);
        if (!character) {
            res.status(404).json({
                message: 'Character not found',
            });
            return;
        }

        const ability = await Ability.findById(abilityId);
        if (!ability) {
            res.status(404).json({
                message: 'Ability not found',
            });
            return;
        }

        if (action === 'add') {
            if (!character.abilities.includes(abilityId)) {
                character.abilities.push(abilityId);
            }
        } else if (action === 'remove') {
            character.abilities = character.abilities.filter((id) => id.toString() !== abilityId);
        } else {
            res.status(400).json({
                message: 'Invalid action. Use "add" or "remove"',
            });
            return;
        }

        await character.save();

        res.status(200).json({
            message: `Abilty ${action === 'add' ? 'added to: ' : 'removed from '} character`,
            character,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
