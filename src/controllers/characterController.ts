import Character from '../models/characterModel';
import { Request, Response } from 'express';

export const getAllCharacters = async (req: Request, res: Response): Promise<void> => {
    try {
        const characters = await Character.find({});

        if (!characters) {
            res.status(400).json({
                message: 'No characters found in database',
            });
            return;
        }

        res.status(200).json({
            message: 'Characters in the database: ',
            characters: characters.map((character) => ({
                character: character.name,
                id: character._id,
                level: character.level,
                experience: character.experience,
            })),
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const getCharacterById = async (req: Request, res: Response): Promise<void> => {
    try {
        const characterId = req.params.id;

        if (!characterId) {
            res.status(400).json({
                message: 'Input a valid ID',
            });
            return;
        }

        const foundCharacter = await Character.findOne({ _id: characterId });

        if (!foundCharacter) {
            res.status(404).json({
                message: 'No user found by that ID',
            });
            return;
        }

        res.status(200).json({
            message: 'Character found: ',
            character: {
                name: foundCharacter.name,
                id: foundCharacter.id,
                user: foundCharacter.user,
                level: foundCharacter.level,
                experience: foundCharacter.experience,
            },
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const updateCharacterStatsById = async (req: Request, res: Response): Promise<void> => {
    try {
        const characterId = req.params.id;
        const updates = req.body;

        if (!characterId) {
            res.status(400).json({
                message: 'Character ID is required',
            });
            return;
        }

        if (!updates) {
            res.status(400).json({
                message: 'Enter valid update-stats',
            });
            return;
        }

        const updatedCharacter = await Character.findByIdAndUpdate(
            characterId,
            updates,

            { new: true, runValidators: true }
        );

        if (!updatedCharacter) {
            res.status(404).json({
                message: 'Character not found',
            });
            return;
        }

        res.status(200).json({
            message: 'Character stats updated succesfully',
            character: updatedCharacter,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
