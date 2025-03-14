import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Item from '../models/itemModel';
import Character from '../models/characterModel';

export const getAllItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const getItemById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);

        if (!item) {
            res.status(404).json({
                message: 'Item not found',
            });
            return;
        }

        res.status(200).json({
            message: 'Item found',
            item: item,
        });
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
    } catch (error) {
        res.status(500).json({ message: 'Error updating character inventory', error });
    }
};
