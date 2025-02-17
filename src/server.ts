import express from 'express';
import cors from 'cors';
import config from './config/config';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';

const { PORT } = config;

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

app.get('/', (req: any, res: any) => {
    res.send('Api is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
