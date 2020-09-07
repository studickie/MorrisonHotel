const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');

const homeRouter = require('./routes/homeRoute');
const titleRouter = require('./routes/titleRoute');
const watchlistRouter = require('./routes/watchlistRoute');
const ratingRouter = require('./routes/ratingRoute');
const authRouter = require('./routes/authRoute');
const { isAuthMiddleware: isAuth } = require('./middleware/isAuthMiddleware');
const { findUserMiddlware: findUser } = require('./middleware/userMiddleware');

const app = express();

const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: 'sessions'
});

store.on('error', (error) => {
    console.log('Store session error: ', error);
});

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

app.use(helmet());
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true,
        maxAge: new Date().getTime() + (24 * 60 * 60 * 1000),
        //sameSite: true,
        //secure: true
    },
    store: store,
    resave: true,
    saveUninitialized: false,
    unset: 'destroy'
}));
app.use(express.static(path.resolve(__dirname, './public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/', isAuth, homeRouter);
app.use('/title', findUser, titleRouter);
app.use('/watchlist', watchlistRouter);
app.use('/rating', ratingRouter);
app.use('/auth', authRouter);

module.exports = app;