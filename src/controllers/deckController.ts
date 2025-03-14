import { Request, Response } from 'express';
import Deck from '../models/deckModel';
import User from '../models/userModel';

export const getAllDecks = async (req: Request, res: Response): Promise<void> => {
    try {
        const decks = await Deck.find()
            .populate('user', 'email')
            .populate('abilities')
            .populate('items');
        res.status(200).json(decks);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const getDeckById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deck = await Deck.findById(id)
            .populate('user', 'email')
            .populate('abilities')
            .populate('items');

        if (!deck) {
            res.status(404).json({
                message: 'Deck not found',
            });
            return;
        }

        res.status(200).json(deck);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const createDeck = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, user, abilities, items, imagePath } = req.body;

        const existingUser = await User.findById(user);
        if (!existingUser) {
            res.status(404).json({
                message: 'User not found',
            });
            return;
        }

        const newDeck = new Deck({
            name,
            user,
            abilities,
            items,
            imagePath,
        });

        const savedDeck = await newDeck.save();

        res.status(201).json({
            message: 'Deck created successfully',
            deck: savedDeck,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const updateDeck = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedDeck = await Deck.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        })
            .populate('user', 'email')
            .populate('abilities')
            .populate('items');

        if (!updatedDeck) {
            res.status(404).json({
                message: 'Deck not found',
            });
            return;
        }

        res.status(200).json({
            message: 'Deck updated successfully',
            deck: updatedDeck,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const deleteDeck = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedDeck = await Deck.findByIdAndDelete(id);

        if (!deletedDeck) {
            res.status(404).json({ message: 'Deck not found' });
            return;
        }

        res.status(200).json({ message: 'Deck deleted successfully' });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
