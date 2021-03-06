/**
 *      CONFIG
 *      -------------
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require(path.resolve(__dirname, './server'));
const express = require('express');

const app = express();

app.set('query parser', 'simple');
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
const userAuth = require(path.resolve(__dirname, '../middleware/userAuth'));
const { logErrors } = require(path.resolve(__dirname, '../middleware/handleError'));

app.use(helmet());
app.use(session);
app.use(userSettings);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../public')));

/**
 *      ROUTES
 *      -------------
 */
const home = require(path.resolve(__dirname, '../routes/home'));
const users = require(path.resolve(__dirname, '../routes/users'));
const titles = require(path.resolve(__dirname, '../routes/titles'));
const watchlists = require(path.resolve(__dirname, '../routes/watchlists'));
const ratings = require(path.resolve(__dirname, '../routes/ratings'));
const lists = require(path.resolve(__dirname, '../routes/lists'));

app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/', home);
app.use('/title', titles);
app.use('/user', users);
app.use('/watchlist', userAuth, watchlists);
app.use('/ratings', userAuth, ratings);
app.use('/lists', lists);

app.use(logErrors);
app.use((req, res) => {
    res.status(404);
    res.render('notFound', {
        isAuth: req.isAuth,
        apiUrl: req.apiUrl
    });
});

app.use((req, res) => {
    res.status(500);
    res.render('notFound', {
        isAuth: req.isAuth,
        apiUrl: req.apiUrl
    });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

module.exports = app;