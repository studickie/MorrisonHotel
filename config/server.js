require('dotenv').config();
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
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