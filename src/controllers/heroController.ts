import Hero from '../models/heroModel';
import { Request, Response } from 'express';

export const getAllHeroes = async (req: Request, res: Response): Promise<void> => {
    try {
        const heroes = await Hero.find({});

        res.status(200).json(
            // consider same for similar
            heroes.map((hero) => hero.toJSON())
        );
    } catch (error: unknown) {
        const err = error as Error;

        res.status(500).json({
            error: err.message,
        });
    }
};

export const getHeroById = async (req: Request, res: Response): Promise<void> => {
    try {
        // test if necessary, express might force params
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

        // consider removal of status 200, might be automatic 200 response
        res.status(200).json(hero.toJSON());
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

export const updateHeroDetailsById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates || Object.keys(updates).length === 0) {
            res.status(400).json({ message: 'Please provide at least one field to update' });
            return;
        }

        const updatedHero = await Hero.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedHero) {
            res.status(404).json({ message: 'Hero not found' });
            return;
        }

        res.status(200).json({ message: 'Hero updated', hero: updatedHero });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const deleteHeroById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedHero = await Hero.findByIdAndDelete(id);

        if (!deletedHero) {
            res.status(404).json({ message: 'Hero not found' });
            return;
        }

        res.status(200).json({ message: 'Hero deleted successfully' });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
