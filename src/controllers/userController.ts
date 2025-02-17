import { Request, Response } from 'express';
import User from '../models/userModel';

export const addUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json({
            message: 'User created successfully: ',
            user,
        });
    } catch (error: unknown) {
        const err = error as Error;

        res.status(500).json({
            error: err.message,
        });
    }
};
