import mongoose, { Schema, Document } from 'mongoose';

export interface IScenario extends Document {
    name: string;
    description: string;
    location: string;
    rewards?: string;
    requirements?: string;
}

const scenarioSchema = new Schema<IScenario>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    rewards: { type: String },
    requirements: { type: String },
});

const Scenario = mongoose.model<IScenario>('Scenario', scenarioSchema);

export default Scenario;
