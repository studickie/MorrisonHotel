const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')});

function userSettings (req, res, next) {
    req.isAuth = req.session.user ? true : false;
    req.apiUrl = process.env.API_URL;
    
    return next();
}

module.exports = userSettings;