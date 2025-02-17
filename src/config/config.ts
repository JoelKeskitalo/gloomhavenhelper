import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/gloomhavenhelper',
    PORT: process.env.PORT || 5000,
};
