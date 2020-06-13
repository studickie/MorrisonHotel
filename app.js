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

app.get('/login', (req, res) => {
    res.render('login');
});

app.use('/task', taskRouter);

app.use((req, res, next) => {
    return res.status(404).render('404');
});

app.use((err, req, res, next) => {
    return res.status(500).render('500');
})

module.exports = app