import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
    name: string;
    type: 'weapon' | 'armor' | 'consumable' | 'misc';
    effect: string;
    cost: number;
    uses?: number;
    imagePath?: string;
}

const itemSchema = new Schema<IItem>({
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: ['weapon', 'armor', 'consumable', 'misc'], required: true },
    effect: { type: String, required: true },
    cost: { type: Number, required: true },
    uses: { type: Number },
    imagePath: { type: String },
});

const Item = mongoose.model<IItem>('Item', itemSchema);
export default Item;
