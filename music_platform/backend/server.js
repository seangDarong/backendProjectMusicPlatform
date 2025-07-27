require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const userRouter = require("./routes/user.js");
const playlistRouter = require("./routes/playlist.js");
const albumRouter = require("./routes/album.js");
const playHistoryRouter = require("./routes/playhistory.js");
const songRouter = require("./routes/song.js");
const artistRouter = require("./routes/artist.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// All API routes:
app.use('/api/users', userRouter);
app.use('/api/playlists', playlistRouter);
app.use('/api/albums', albumRouter);
app.use('/api/playhistory', playHistoryRouter);
app.use('/api/songs', songRouter);
app.use('/api/artists', artistRouter);

const port = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced successfully.');
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(err => console.error('DB sync error:', err));
