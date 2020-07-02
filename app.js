const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const movieRouter = require('./routes/movie.route');
const titleRouter = require('./routes/title.route');
const watchlistRouter = require('./routes/watchlist.route');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
}); 

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/movies', movieRouter);
app.use('/title', titleRouter);
app.use('/watchlist', watchlistRouter);

module.exports = app