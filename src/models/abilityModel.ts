import mongoose, { Schema, Document } from 'mongoose';

export interface IAbility extends Document {
    name: string;
    characterId: string;
    initiative: number;
    effects?: string[];
    element?: 'Fire' | 'Ice' | 'Air' | 'Light' | 'Dark' | null;
    imagePath?: string;
    createdAt: Date;
}

const abilitySchema = new Schema<IAbility>(
    {
        name: { type: String, required: true, unique: true },
        characterId: { type: String, required: true },
        initiative: { type: Number, required: true },
        effects: { type: [String] },
        element: {
            type: String,
            enum: ['Fire', 'Ice', 'Air', 'Light', 'Dark', null],
        },
        imagePath: { type: String, unique: true },
    },
    { timestamps: true }
);

const Ability = mongoose.model<IAbility>('Ability', abilitySchema);

export default Ability;
