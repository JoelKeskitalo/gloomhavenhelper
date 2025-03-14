import { Request, Response } from 'express';
import UserSettings from '../models/userSettingsModel';
import User from '../models/userModel';

export const getUserSettings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const settings = await UserSettings.findOne({ user: userId });

        if (!settings) {
            res.status(404).json({
                message: 'User settings not found',
            });
            return;
        }

        res.status(200).json(settings);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};

export const updateUserSettings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const { enableDarkMode, preferredLanguage, showAdvancedStats } = req.body;

        const userExists = await User.findById(userId);
        if (!userExists) {
            res.status(404).json({
                message: 'User not found',
            });
            return;
        }

        const updatedSettings = await UserSettings.findOneAndUpdate(
            { user: userId },
            { enableDarkMode, preferredLanguage, showAdvancedStats },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            message: 'User settings updated',
            settings: updatedSettings,
        });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({
            error: err.message,
        });
    }
};
