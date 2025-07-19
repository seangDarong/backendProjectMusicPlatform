const express = require('express');
const cors = require('cors');
const { sequelize } = require('./modles');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');

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

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced sucessfully.');
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000')
    });
}).catch(err => console.error('DB sync error:', err));