function userAuth (req, res, next) {
    if (!req.isAuth) {
        return res.redirect('/user/auth/signin');
    }
    
    return next();
}

module.exports = userAuth;