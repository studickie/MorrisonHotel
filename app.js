const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./task/task.route');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/task', taskRouter);

module.exports = app