const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/signin');
    }

    return next();
}

module.exports = auth;