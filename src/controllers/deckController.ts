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
