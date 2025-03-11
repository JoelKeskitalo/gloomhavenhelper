import mongoose, { Schema, Document } from 'mongoose';

export interface IMonster extends Document {
    name: string;
    level: number;
    health: number;
    attack: number;
    defense: number;
    abilities: mongoose.Schema.Types.ObjectId[];
    isBoss: boolean;
    imagePath?: string;
}

const monsterSchema = new Schema<IMonster>({
    name: { type: String, required: true, unique: true },
    level: { type: Number, required: true },
    health: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    abilities: [{ type: Schema.Types.ObjectId, ref: 'Ability', required: true }], // ✅ Koppling till AbilityModel
    isBoss: { type: Boolean, default: false },
    imagePath: { type: String },
});

const Monster = mongoose.model<IMonster>('Monster', monsterSchema);
export default Monster;
