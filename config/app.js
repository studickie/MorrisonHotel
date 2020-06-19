const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, '../views'));

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('index');
}); 

module.exports = app