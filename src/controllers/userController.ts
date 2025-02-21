import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User with this email already exists' });
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: encryptedPassword,
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};
