import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import Character from '../models/characterModel';

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

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: '7h',
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                email: user.email,
                token: token,
            },
        });
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
            return;
        }

        res.status(200).json({
            message: 'Users found in database: ',
            users: users.map((user) => ({
                id: user._id,
                email: user.email,
                password: user.password,
                character: user.character,
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

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({
                message: 'Invalid email or password',
            });
            return;
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

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({ message: 'Enter a valid id' });
            return;
        }

        const existingUser = await User.findById(userId).populate({
            path: 'character',
            populate: {
                path: 'heroId',
                model: 'Hero',
            },
        });

        if (!existingUser) {
            res.status(404).json({ message: 'No user found by that ID' });
            return;
        }

        res.status(200).json({
            message: 'User found in database:',
            user: existingUser,
            token: req.headers.authorization?.split(' ')[1],
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const removeUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({
                message: 'Enter a correct user id',
            });
            return;
        }

        const existingUser = await User.findOne({ _id: userId });

        if (!existingUser) {
            res.status(404).json({
                message: 'No user found by that ID',
            });
            return;
        }

        await User.deleteOne({ _id: userId });

        res.status(200).json({
            message: 'User deleted successfully: ',
            user: existingUser,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const selectCharacterForUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId;
        const { characterId } = req.body;

        if (!userId || !characterId) {
            res.status(400).json({
                message: 'Both userId and characterId are required',
            });
            return;
        }

        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({
                message: 'User not found',
            });
            return;
        }

        if (user.character) {
            res.status(400).json({
                message: 'User already has a selected character',
            });
        }

        const character = await Character.findById(characterId);

        if (!character) {
            res.status(404).json({
                message: 'Character not found',
            });
            return;
        }

        user.character = characterId;
        await user.save();

        res.status(200).json({
            message: 'Character successfully selected for user.',
            user: {
                id: user._id,
                email: user.email,
                character: character._id,
            },
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

// updateUserById
