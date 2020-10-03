function userAuth (req, res, next) {
    if (!req.isAuth) {
        console.log('redirect')
        return res.redirect('/user/auth/signin');
    }
    
    return next();
}

module.exports = userAuth;