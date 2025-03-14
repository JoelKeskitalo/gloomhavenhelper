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

export const createMonster = async (req: Request, res: Response): Promise<void> => {
    try {
        const newMonster = new Monster(req.body);
        const savedMonster = await newMonster.save();
        res.status(201).json({
            message: 'Monster created',
            monster: savedMonster,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const updateMonster = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedMonster = await Monster.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedMonster) {
            res.status(404).json({
                message: 'Monster not found',
            });
        }

        res.status(200).json(updatedMonster);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const deleteMonsterById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedMonster = await Monster.findByIdAndDelete(id);

        if (!deletedMonster) {
            res.status(404).json({ message: 'Monster not found' });
            return;
        }

        res.status(200).json({ message: 'Monster deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting monster', error });
    }
};
