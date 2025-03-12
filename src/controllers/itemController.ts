import { Request, Response } from 'express';
import Item from '../models/itemModel';

export const getAllItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await Item.find({});
        if (items.length === 0) {
            res.status(404).json({ message: 'No items found' });
            return;
        }
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getItemById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }
        res.status(200).json({ item });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const createItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, type, effect, cost, uses, imagePath } = req.body;
        if (!name || !type || !effect || !cost) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const newItem = new Item({ name, type, effect, cost, uses, imagePath });
        await newItem.save();
        res.status(201).json({ message: 'Item created successfully', newItem });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteItemById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
