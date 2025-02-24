import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find({});

        if (!users) {
            res.status(400).json({
                message: 'No users found in database',
            });
        }

        res.status(200).json({
            message: 'Users found in database: ',
            users: users.map((user) => ({
                email: user.email,
                password: user.password,
            })),
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: { email: string; password: string } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: 'All fields are required',
            });
            return;
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({
                message: 'User cannot be found, type in a valid email & password',
            });
            return;
        }

        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({
                message: 'Invalid email or password',
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: '7h',
        });

        res.status(200).json({
            message: 'Logged in successfully: ',
            user: {
                id: user._id,
                email: user.email,
                token: token,
            },
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
