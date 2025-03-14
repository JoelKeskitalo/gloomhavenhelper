import Character, { characterSchema } from '../models/characterModel';
import User from '../models/userModel';
import Ability from '../models/abilityModel';
import Item from '../models/itemModel';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

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
                items: character.items,
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

        const abilities = await Ability.find({ characterId });

        res.status(200).json({
            message: 'Character found: ',
            character: {
                name: foundCharacter.name,
                id: foundCharacter.id,
                user: foundCharacter.user,
                level: foundCharacter.level,
                experience: foundCharacter.experience,
                abilities: abilities,
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

export const removeCharacterById = async (req: Request, res: Response): Promise<void> => {
    try {
        const characterId = req.params.id;

        if (!characterId) {
            res.status(400).json({ message: 'Character ID is required' });
            return;
        }

        const character = await Character.findById(characterId);
        if (!character) {
            res.status(404).json({ message: 'Character not found' });
            return;
        }

        // Removing the reference from User
        await User.updateMany({ character: characterId }, { $unset: { character: '' } });

        await character.deleteOne();

        res.status(200).json({
            message: 'Character deleted successfully and removed from associated users.',
            characterId,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const getCharacterItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const { characterId } = req.params;
        const character = await Character.findById(characterId).populate('items');

        if (!character) {
            res.status(404).json({ message: 'Character not found' });
            return;
        }

        res.status(200).json({ items: character.items });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const updateCharacterInventory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { characterId } = req.params;
        const { item, action } = req.body;

        const character = await Character.findById(characterId);
        if (!character) {
            res.status(404).json({ message: 'Character not found' });
            return;
        }

        const existingItem = await Item.findById(item);
        if (!existingItem) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        // making sure character.items is always an array
        if (!Array.isArray(character.items)) {
            character.items = [];
        }

        const itemObjectId = new mongoose.mongo.ObjectId(item);

        if (action === 'add') {
            character.items.push(itemObjectId);
        } else if (action === 'remove') {
            character.items = character.items.filter(
                (existingItem) => existingItem.toString() !== itemObjectId.toString()
            );
        } else {
            res.status(400).json({ message: 'Invalid action, must be "add" or "remove"' });
            return;
        }

        await character.save();
        res.status(200).json({ message: `Item ${action}ed successfully`, items: character.items });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
