import express from 'express';
import cors from 'cors';
import config from './config/config';
import connectDB from './config/db';

const { PORT } = config;

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
