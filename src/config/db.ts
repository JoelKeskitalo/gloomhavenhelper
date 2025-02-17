import mongoose from 'mongoose';
import config from './config';

const { MONGO_URI } = config;

const connectDB = async (): Promise<void> => {
    try {
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined');
        }

        const connect = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
