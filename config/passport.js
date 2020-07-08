const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user || !user.validatePassword(password)) {
            return done(null, false, { errors: 'Incorrect email or password' });
        }

        return done(null, user);
    } catch (e) {
        return done(e);
    }
}));

module.exports = passport;