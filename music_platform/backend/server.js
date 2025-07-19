const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

const port = 3000;

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced successfully.');
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(err => console.error('DB sync error:', err));
