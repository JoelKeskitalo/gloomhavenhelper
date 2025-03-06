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
                startingAbilities: hero.startingAbilities,
                id: hero._id,
            })),
        });
    } catch (error: unknown) {
        const err = error as Error;

        res.status(500).json({
            error: err.message,
        });
    }
};

export const getHeroById = async (req: Request, res: Response): Promise<void> => {
    try {
        const heroId = req.params.id;

        if (!heroId) {
            res.status(400).json({
                message: 'Enter a valid hero id',
            });
            return;
        }

        const hero = await Hero.findById(heroId);

        if (!hero) {
            res.status(404).json({
                message: 'Hero not found',
            });
            return;
        }

        res.status(200).json({
            message: 'Hero found: ',
            hero: hero.name,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const createHero = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, class: heroClass, healthPerLevel, startingAbilities } = req.body;

        if (!name || !heroClass || !healthPerLevel || !startingAbilities) {
            res.status(400).json({
                message: 'Enter the required fields',
            });
            return;
        }

        const existingHero = await Hero.findOne({ name });
        if (existingHero) {
            res.status(400).json({
                message: 'Hero already exists',
            });
        }

        const hero = new Hero({
            name: name,
            class: heroClass,
            healthPerLevel: healthPerLevel,
            startingAbilities: startingAbilities,
        });

        await hero.save();

        res.status(200).json({
            message: 'Hero created successfully',
            hero: hero,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
