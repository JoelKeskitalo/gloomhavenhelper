import mongoose, { Schema, Document } from 'mongoose';

export interface IUserSettings extends Document {
    user: mongoose.Schema.Types.ObjectId;
    enableDarkMode: boolean;
    preferredLanguage: string;
    showAdvancedStats: boolean;
}

const userSettingsSchema = new Schema<IUserSettings>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    enableDarkMode: { type: Boolean, default: false },
    preferredLanguage: { type: String, default: 'en' },
    showAdvancedStats: { type: Boolean, default: false },
});

const UserSettings = mongoose.model<IUserSettings>('UserSettings', userSettingsSchema);
export default UserSettings;
