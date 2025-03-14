import mongoose, { Schema, Document } from 'mongoose';

export interface ICharacter extends Document {
    name: string;
    heroId: mongoose.Schema.Types.ObjectId;
    level: number;
    experience: number;
    gold: number;
    health: number;
    stamina?: number;
    abilities: string[];
    items: mongoose.Types.ObjectId[]; // <--- Item
    perks: string[];
    user: mongoose.Schema.Types.ObjectId;
    imagePath?: string;
    createdAt: Date;
}

const characterSchema = new Schema<ICharacter>(
    {
        name: { type: String, required: true },
        heroId: { type: Schema.Types.ObjectId, ref: 'Hero', required: true },
        level: { type: Number, required: true },
        experience: { type: Number, required: true },
        gold: { type: Number, required: true },
        health: { type: Number, required: true },
        stamina: { type: Number, required: false },
        abilities: { type: [String], required: true },
        items: [{ type: mongoose.Types.ObjectId, ref: 'Item' }],
        perks: { type: [String], required: false },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        imagePath: { type: String, required: false },
    },
    { timestamps: true }
);

export { characterSchema };
const Character = mongoose.model<ICharacter>('Character', characterSchema);
export default Character;
