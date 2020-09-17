const User = require('../models/userModel');

exports.findUserMiddlware = async (req, res, next) => {
    //~ ---------------------------------------------------------
    //~     'isAuth' to be set before by running isAuthMiddleware
    //~ ---------------------------------------------------------
    if (req.isAuth) {
        try {
            const user = await User.findById(req.session.user);
            req.user = user;

            return next();

        } catch (e) {
            return next(e);
        }
    } else {
        return next();
    }
}