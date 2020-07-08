const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(404).json({ message: 'User already exists' });
        }

        const newUser = new User({ email, password });

        await newUser.save();

        req.session.user = newUser;
        res.render('index', { message: 'User created' });

    } catch (e) {
        res.status(500).json({ message: 'Oops! Something went wrong', error: e });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user  || !user.validatePassword(password)) {
            return res.status(404).json({ message: 'Incorrect email or password' });
        }

        req.session.user = user;
        res.render('index');

    } catch (e) {
        res.status(500).json({ message: 'Oops! Something went wrong', error: e });
    }
});

router.post('/signout', async (req, res) => {
    req.session.destroy();
    res.render('index');
});

module.exports = router;