//const session = require('express-session');

const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.render('login');
    }

    return next();
}

module.exports = auth;