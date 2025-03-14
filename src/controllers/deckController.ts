import { Request, Response } from 'express';
import Deck from '../models/deckModel';

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
        }

        res.status(200).json(deck);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
