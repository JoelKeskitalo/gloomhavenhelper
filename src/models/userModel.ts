import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    character: mongoose.Schema.Types.ObjectId; // reference to character
    progress: {
        completedScenarios: number;
        unlockedScenarios: number[];
    };
    settings: {
        enableDarkMode: boolean;
        preferredLanguage: string;
        showAdvancedStats: boolean;
    };
    createdAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        character: { type: mongoose.Schema.Types.ObjectId, ref: 'Character' },
        progress: {
            completedScenarios: { type: Number, default: 0 },
            unlockedScenarios: { type: [Number], default: [] },
        },
        settings: {
            enableDarkMode: { type: Boolean, default: false },
            preferredLanguage: { type: String, default: 'en' },
            showAdvancedStats: { type: Boolean, default: false },
        },
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
