import Monster from '../models/monsterModel';
import { Request, Response } from 'express';

export const getAllMonsters = async (req: Request, res: Response): Promise<void> => {
    try {
        const monsters = await Monster.find().populate('abilities');
        res.status(200).json(monsters);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
