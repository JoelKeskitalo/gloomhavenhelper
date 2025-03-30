import express from 'express';
import cors from 'cors';
import config from './config/config';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import characterRoutes from './routes/characterRoutes';
import heroRoutes from './routes/heroRoutes';
import abilityRoutes from './routes/abilityRoutes';
import scenarioRoutes from './routes/scenarioRoutes';
import playedScenarioRoutes from './routes/playedScenarioRoutes';
import itemRoutes from './routes/itemRoutes';
import monsterRoutes from './routes/monsterRoutes';
import deckRoutes from './routes/deckRoutes';
import userSettingsRoutes from './routes/userSettingsRoutes';

const { PORT } = config;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/heroes', heroRoutes);
app.use('/api/abilities', abilityRoutes);
app.use('/api/scenarios', scenarioRoutes);
app.use('/api/played-scenarios', playedScenarioRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/monsters', monsterRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/user-settings', userSettingsRoutes);

app.get('/', (req: any, res: any) => {
    res.send('Api is running...');
});

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error: any) => {
        console.error('MongoDB connection failed: ', error);
        process.exit(1);
    });
