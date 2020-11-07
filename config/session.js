const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: 'sessions'
});

store.on('error', (error) => {
    console.log('Store session error: ', error);
});

module.exports = session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true,
        maxAge: 30 * (60 * 1000),
    },
    store: store,
    resave: true,
    saveUninitialized: false,
    unset: 'destroy'
});