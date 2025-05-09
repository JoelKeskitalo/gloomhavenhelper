import Hero from '../models/heroModel';
import User from '../models/userModel';
import Character from '../models/characterModel';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
    user?: {
        userId: mongoose.Types.ObjectId;
    };
}

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
        const { class: heroClass, healthPerLevel, startingAbilities } = req.body;

        if (!heroClass || !healthPerLevel || !startingAbilities) {
            res.status(400).json({
                message: 'Enter the required fields',
            });
            return;
        }

        const existingHero = await Hero.findOne({ class: heroClass });
        if (existingHero) {
            res.status(400).json({
                message: 'Hero already exists',
            });
        }

        const hero = new Hero({
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

export const selectHeroForUser = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        console.log('🔥 Received request:', {
            params: req.params,
            body: req.body,
            user: req.user,
        });

        const { characterName } = req.body;

        if (!characterName || characterName.trim() === '') {
            res.status(400).json({ message: 'Character name is required' });
            return;
        }

        const heroId = req.params.id;

        if (!req.user || !req.user.userId) {
            res.status(401).json({ message: 'Unauthorized: User ID missing in token' });
            return;
        }

        const userId = req.user.userId;

        if (!heroId) {
            res.status(400).json({ message: 'Hero ID is required' });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const hero = await Hero.findById(heroId);
        if (!hero) {
            res.status(404).json({ message: 'Hero not found' });
            return;
        }

        const character = new Character({
            name: characterName,
            heroId: new mongoose.Types.ObjectId(heroId),
            user: new mongoose.Types.ObjectId(userId),
            level: 1,
            experience: 0,
            gold: 0,
            health: hero.healthPerLevel[0],
            stamina: 10,
            abilities: [],
            items: [],
            perks: [],
            createdAt: new Date(),
        });

        await character.save();

        user.character = character._id as mongoose.Types.ObjectId;
        await user.save();

        console.log('Character created:', character);

        res.status(200).json({
            message: 'Hero successfully selected and Character created for user.',
            user: {
                id: user._id,
                email: user.email,
                character: {
                    id: character._id,
                    hero: hero._id,
                },
            },
        });
    } catch (error: unknown) {
        console.error('Error in selectHeroForUser:', error);
        res.status(500).json({ error: (error as Error).message });
    }
};
