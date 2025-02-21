import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

export const addUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: 'All fields are required',
            });
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User with this email already exists',
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: encryptedPassword,
        });
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
