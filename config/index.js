/**
 *      CONFIG
 *      -------------
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require(path.resolve(__dirname, './server'));
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, '../views'));

/**
 *      MIDDLEWARE
 *      -------------
 */
const bodyParser = require('body-parser');
const helmet = require('helmet');
const session = require(path.resolve(__dirname, './session'));
const userSettings = require(path.resolve(__dirname, '../middleware/userSettings'));

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(helmet());
app.use(session);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userSettings);

/**
 *      ROUTES
 *      -------------
 */
const home = require(path.resolve(__dirname, '../routes/home'));
const users = require(path.resolve(__dirname, '../routes/users'));
const titles = require(path.resolve(__dirname, '../routes/titles'));
const watchlsits = require(path.resolve(__dirname, '../routes/watchlists'));
const ratings = require(path.resolve(__dirname, '../routes/ratings'));

app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/', home);
app.use('/title', titles);
app.use('/user', users);
app.use('/watchlist', watchlsits);
app.use('/rating', ratings);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

module.exports = app;