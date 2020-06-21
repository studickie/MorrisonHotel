const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const movieRouter = require('./routes/movie.route');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
}); 

app.use('/movies', movieRouter);

module.exports = app