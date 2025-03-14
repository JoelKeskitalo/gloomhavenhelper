import mongoose, { Schema, Document } from 'mongoose';

export interface IAbility extends Document {
    name: string;
    characterId?: mongoose.Schema.Types.ObjectId;
    monsterId?: mongoose.Schema.Types.ObjectId;
    initiative: number;
    effects?: string[];
    element?: 'Fire' | 'Ice' | 'Air' | 'Light' | 'Dark' | null;
    imagePath?: string;
    createdAt: Date;
}

const abilitySchema = new Schema<IAbility>(
    {
        name: { type: String, required: true, unique: true },
        characterId: { type: Schema.Types.ObjectId, ref: 'Character', required: false },
        monsterId: { type: Schema.Types.ObjectId, ref: 'Monster', required: false },
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
