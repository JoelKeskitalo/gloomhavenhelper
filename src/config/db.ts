const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/config');

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
