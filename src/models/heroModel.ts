import mongoose, { Schema, Document } from 'mongoose';

export interface IHero extends Document {
    name: string;
    class: 'Hatchet' | 'Red Guard' | 'VoidWarden' | 'Demolitionist';
    healthPerLevel: number[];
    startingAbilities: Schema.Types.ObjectId[]; // itemModel
    imagePath?: string;
}

// check if toJsonSchema needs explicit typing
const heroSchema = new Schema<IHero>({
    name: { type: String, required: true },
    class: {
        type: String,
        enum: ['Hatchet', 'Red Guard', 'VoidWarden', 'Demolitionist'],
        required: true,
    },
    healthPerLevel: { type: [Number], required: true },
    startingAbilities: { type: [{ type: Schema.Types.ObjectId, ref: 'Ability' }], required: true },
    imagePath: { type: String, required: false },
});

const Hero = mongoose.model<IHero>('Hero', heroSchema);

export default Hero;
