import mongoose, { Schema, Document } from 'mongoose';

export interface IDeck extends Document {
    name: string;
    user: mongoose.Schema.Types.ObjectId;
    abilities: mongoose.Schema.Types.ObjectId[];
    items: mongoose.Schema.Types.ObjectId[];
    imagePath?: string;
}

const deckSchema = new Schema<IDeck>({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    abilities: [{ type: Schema.Types.ObjectId, ref: 'Ability', required: true }],
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    imagePath: { type: String },
});

const Deck = mongoose.model<IDeck>('Deck', deckSchema);
export default Deck;
