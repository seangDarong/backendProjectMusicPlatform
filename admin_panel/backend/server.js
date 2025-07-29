require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const songRoutes = require('./routes/songRoutes');
const artistRoutes = require('./routes/artistRoute');
const albumRoutes = require('./routes/albumRoute');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get('/', (req, res) => {
    res.send('Welcome to the Admin panel');
});

app.use('/roles', roleRoutes);
app.use('/users', userRoutes);
app.use('/songs', songRoutes);
app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced sucessfully.');
    app.listen(3002, () => {
        console.log('Admin Panel Server running on http://localhost:3002')
    });
}).catch(err => console.error('DB sync error:', err));