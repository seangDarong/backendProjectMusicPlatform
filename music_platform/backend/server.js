const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const userRouter = require("./routes/user.js");
const songRouter = require("./routes/song.js");
const artistRouter = require("./routes/artist.js");
const albumRouter = require("./routes/album.js");
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

const port = 3000;


app.use('/api/users', userRouter);
app.use('/api/songs', songRouter);
app.use('/api/artists', artistRouter);
app.use('/api/albums', albumRouter);

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced successfully.');
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(err => console.error('DB sync error:', err));