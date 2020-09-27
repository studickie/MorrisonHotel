const path = require('path');
const express = require('express');
const router = express.Router();
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const User = require('../models/userModel');
const { userValidationRules, userValidation } = require('../middleware/userValidation');

router.get('/auth/signin', (req, res) => {
    return res.render('signin');
});

router.post('/auth/signin', userValidationRules(), userValidation, async (req, res) => {
    if (req.errors) {
        return res.render('signin', { errors: req.errors });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !user.validatePassword(password)) {
            return res.render('signin', { userInvalidError: true });
        }

        req.session.user = { userId: user._id };
        return res.redirect('/');

    } catch (e) {
        console.log('Error - signin', e);
    }
});

router.post('/auth/signin?mode=guest', async (req, res) => {
    try {
        const user = await User.findOne({ email: process.env.GUEST_EMAIL });

        req.session.user = user._id;
        res.redirect('/');
        
    } catch (e) {
        console.log('Error - signin', e);
    }
});

router.post('/auth/signup', userValidationRules(), userValidation, async (req, res) => {
    if (req.errors) {
        return res.render('signin', { errors: req.errors });
    }

    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.render('signin', { userInvalidError: true });
        }

        const newUser = await User.create({ email, password })
        req.session.user = { userId: newUser._id };

        return res.redirect('/');

    } catch (e) {

    }
});

router.post('/auth/signout', async (req, res) => {
    req.session.destroy();
    return res.status(200).json({ message: 'signout success'});
});

module.exports = router;