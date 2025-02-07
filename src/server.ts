const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/config');
const dbConnect = require('./config/db');

dbConnect();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: any, res: any) => {
    res.send('Api is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
