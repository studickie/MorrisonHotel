
exports.isAuthMiddleware = (req, res, next) => {
    req.isAuth = req.session && req.session.user ? true : false;
    return next();
}