import Hero from '../models/heroModel';
import { Request, Response } from 'express';

export const getAllHeroes = async (req: Request, res: Response): Promise<void> => {
    try {
        const heroes = await Hero.find({});

        if (heroes.length === 0) {
            res.status(404).json({
                message: 'No heroes found',
            });
            return;
        }

        res.status(200).json({
            message: 'All heroes in database: ',
            heroes: heroes.map((hero) => ({
                name: hero.name,
                class: hero.class,
                healthPerLevel: hero.healthPerLevel,
                startingAbilities: hero.startingAbilities,
            })),
        });
    } catch (error: unknown) {
        const err = error as Error;

        res.status(500).json({
            error: err.message,
        });
    }
};
