import mongoose, { Schema, Document } from 'mongoose';

export interface IAbility extends Document {
    _id: string;
    name: string;
    heroId: string;
    initiative: number;
    effects?: string[];
    element?: 'Fire' | 'Ice' | 'Air' | 'Light' | 'Dark' | null;
    imagePath?: string;
}

const abilitySchema = new Schema<IAbility>(
    {
        name: { type: String, required: true, unique: true },
        heroId: { type: String, required: true, unique: true },
        initiative: { type: Number, required: true, unique: false },
        effects: { type: [String], required: false, unique: false },
        element: {
            type: String,
            enum: ['Fire', 'Ice', 'Air', 'Light', 'Dark', null],
            required: false,
            unique: false,
        },
        imagePath: { type: String, required: false, unique: true },
    },
    { timestamps: true }
);

const Ability = mongoose.model<IAbility>('Ability', abilitySchema);

export default Ability;
