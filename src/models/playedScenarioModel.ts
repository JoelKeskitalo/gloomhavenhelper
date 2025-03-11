import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayedScenario extends Document {
    user: mongoose.Schema.Types.ObjectId;
    scenario: mongoose.Schema.Types.ObjectId;
    playedAt: Date;
    receivedItems: string[];
    receivedExperience: number;
    receivedGold: number;
    success: boolean;
    perks?: string[];
}

const playedScenarioSchema = new Schema<IPlayedScenario>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    scenario: { type: Schema.Types.ObjectId, ref: 'Scenario', required: true },
    playedAt: { type: Date, default: Date.now },
    receivedItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    receivedExperience: { type: Number, required: true },
    receivedGold: { type: Number, required: true },
    success: { type: Boolean, required: true },
    perks: { type: [String], required: false },
});

const PlayedScenario = mongoose.model<IPlayedScenario>('PlayedScenario', playedScenarioSchema);

export default PlayedScenario;
