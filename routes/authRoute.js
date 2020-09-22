const path = require('path');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const User = require('../models/userModel');

router.get('/signin', (req, res) => res.render('signin'));

router.post('/signin', [
    //~ form validation with express-validator
    body('email').isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password').isLength({ min: 8, max: 16})
        .withMessage('Must be between 8-16 characters')    
        .trim()
        .escape()

], async (req, res) => {
    //~ act on any form validation errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('signin', { errors: errors.array() });
    }
    
    try {
        const { email, password } = req.body;

        // find user, validate password
        const user = await User.findOne({ email });
        if (!user || !user.validatePassword(password)) {
            return res.render('signin', { userInvalidError: true });
        }

        req.session.user = user._id;
        res.redirect('/');

    } catch (e) {
        console.log('Error - signin', e);
    }
});

router.post('/signin?mode=guest', async (req, res) => {
    try {
        const user = await User.findOne({ email: process.env.GUEST_EMAIL });

        req.session.user = user._id;
        res.redirect('/');
        
    } catch (e) {
        console.log('Error - signin', e);
    }
});

router.post('/signout', async (req, res) => {
    req.session.destroy();
    return res.status(200).json({ message: 'signout success'});
});

module.exports = router;