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

export const getMonsterById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const monster = await Monster.findById(id).populate('abilities');

        if (!monster) {
            res.status(404).json({
                message: 'Monster not found',
            });
            return;
        }

        res.status(200).json(monster);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
