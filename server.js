const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');

const options = {
    user: process.env.DB_USER,
    pass:process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect(process.env.DB_URI, options);

// Upon successful connection
mongoose.connection.on('connected', () => {  
    console.log('Mongoose connection open');
});

// If the connection throws an error
mongoose.connection.on('error', (error) => {  
    console.log('Mongo errored connections: ' + error);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {  
    console.log('Mongoose disconnected');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});