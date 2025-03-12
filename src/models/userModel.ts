import mongoose, { Schema, Document } from 'mongoose';
import characterSchema, { ICharacter } from './characterModel';

export interface IUser extends Document {
    email: string;
    password: string;
    character: ICharacter;
    playedScenarios: mongoose.Schema.Types.ObjectId[];
    settings: {
        enableDarkMode: boolean;
        preferredLanguage: string;
        showAdvancedStats: boolean;
    };
    createdAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        character: { type: Schema.Types.ObjectId, ref: 'Character' },
        playedScenarios: [{ type: Schema.Types.ObjectId, ref: 'PlayedScenario' }],
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
