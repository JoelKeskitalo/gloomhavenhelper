import { Request, Response } from 'express';
import Item from '../models/itemModel';

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
